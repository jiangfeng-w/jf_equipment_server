const UserService = require('../../service/admin/UserService')
const JWT = require('../../utils/JWT')
const deleteAvatar = require('../../utils/deleteAvatar')
const { hashPassword, comparePassword } = require('../../utils/encryptPassword')
const { generateVerificationCode, sendVerificationCodeEmail } = require('../../utils/email')
const { v4: uuidv4 } = require('uuid')

const UserController = {
    // 登录
    login: async (req, res) => {
        // 从数据库读取用户信息
        const user = await UserService.login(req.body)
        if (!user) {
            res.status(404).send({
                error: '没有此用户',
            })
        } else {
            // 校验密码
            const { password } = req.body
            const result = await comparePassword(password, user.password)
            // 如果result为false，则密码错误
            if (!result) {
                res.status(401).send({ error: '密码错误' })
            } else {
                // 设置token
                const token = JWT.generate(
                    {
                        id: user.id,
                        number: user.number,
                        role: user.role,
                    },
                    '1h'
                )
                // 放在请求头中返回给前端
                res.header('Authorization', token)
                res.status(200).send({
                    message: '登录成功',
                    data: {
                        id: user.id,
                        number: user.number,
                        name: user.name,
                        phone_number: user.phone_number,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar,
                        create_time: user.create_time,
                    },
                })
            }
        }
    },
    // 个人中心更改信息
    changeOwnInfo: async (req, res) => {
        // 把用户信息解构出来
        const { phone_number, email, oldAvatar } = req.body
        let avatar
        if (!req.file) {
            // 如果没有上传文件，头像使用旧头像地址
            avatar = oldAvatar
        } else {
            // 如果更改了头像,即有文件上传
            // 删除原来的头像
            deleteAvatar(oldAvatar)
            // 头像地址
            avatar = `http://localhost:3000/images/avatars/${req.file.filename}`
        }
        // 用token获取id和角色role
        const token = req.headers['authorization'].split(' ')[1]
        const origin = JWT.verify(token)
        // 从角色对应的表表中获取用户角色
        const user = await UserService.getInfoByID(origin.id, origin.role)
        // 更改对应角色的表的信息
        const result = await UserService.changeOwnInfo({
            id: user.id,
            email,
            phone_number,
            avatar,
            role: user.role,
        })
        if (result[0] === 1) {
            res.status(200).send({
                message: '用户信息更新成功',
                data: {
                    id: user.id,
                    number: user.number,
                    name: user.name,
                    phone_number: phone_number,
                    email: email,
                    role: user.role,
                    avatar,
                    create_time: user.create_time,
                },
            })
        } else {
            res.status(400).send({ error: '用户信息更新失败' })
        }
    },
    // 个人中心修改密码
    changePass: async (req, res) => {
        // 把数据解构出来
        const { oldPassword, newPassword } = req.body

        // 用token获取id
        const token = req.headers['authorization'].split(' ')[1]
        const origin = JWT.verify(token)
        // 从数据库读取用户信息
        const user = await UserService.getInfoByID(origin.id, origin.role)
        console.log(user)
        // 密码对比
        const isRight = await comparePassword(oldPassword, user.password)
        // isRight为false，则原密码错误
        if (!isRight) {
            res.status(400).send({ message: '原密码错误' })
        } else {
            // 对新密码加密
            const password = await hashPassword(newPassword)
            // 传到service层
            const result = await UserService.changePass({
                id: origin.id,
                role: origin.role,
                password,
            })
            if (result[0] === 1) {
                res.status(201).send({
                    message: '密码修改成功',
                })
            } else {
                res.status(400).send({ message: '密码修改失败' })
            }
        }
    },
    // 忘记密码重置
    sendEmail: async (req, res) => {
        // 从数据库读取用户信息
        // console.log(req.body)
        const user = await UserService.login(req.body)
        if (!user) {
            res.status(404).send({
                error: '没有此用户',
            })
        } else {
            // console.log(user.email, user.password)
            // 如果邮箱错误
            if (!(req.body.email === user.email)) {
                res.status(404).send({
                    error: '邮箱错误',
                })
            } else {
                // 生成验证码
                const rightAuthCode = generateVerificationCode()
                try {
                    // 发送邮件
                    await sendVerificationCodeEmail(user.email, rightAuthCode)
                    // 向数据库存储验证码
                    await UserService.sendEmail({ number: user.number, role: user.role, email_code: rightAuthCode })
                    res.status(201).send({
                        message: '验证码已发送，请注意查看邮箱',
                    })
                } catch (error) {
                    // console.log(error)
                    res.status(404).send({
                        error,
                    })
                }
            }
        }
    },
    resetPass: async (req, res) => {
        // console.log(req.body)
        // 解构出所需数据
        const { number, role, authCode, newPassword } = req.body

        // 取出数据
        const user = await UserService.login({ number, role })
        // 验证码正确
        if (authCode === user.email_code) {
            // 对新密码加密
            const password = await hashPassword(newPassword)
            // 更新密码
            const result = await UserService.changePass({
                id: user.id,
                role,
                password,
            })
            if (result[0] === 1) {
                // 删除验证码
                await UserService.removeEmailCode({
                    id: user.id,
                    role,
                })
                res.status(201).send({
                    message: '密码修改成功',
                })
            } else {
                res.status(400).send({ error: '密码修改失败' })
            }
        } else {
            res.status(404).send({
                error: '验证码不正确',
            })
        }
    },

    //#region 学生管理
    // 添加学生
    addStudent: async (req, res) => {
        // console.log(req.body)
        // 查找数据库是否已存在用户
        const user = await UserService.getStudentByNumber(req.body)
        // 如果用户不存在
        if (!user) {
            // 把数据解构出来
            let { number, name, password, academy, major, degree, grade } = req.body
            // 对密码加密
            password = await hashPassword(password)
            // 生成uuid
            const id = uuidv4()
            // 生成时间戳
            const create_time = Date.now()
            // 向users表添加数据

            try {
                const result = await UserService.addStudent({
                    id,
                    number,
                    name,
                    password,
                    academy,
                    major,
                    degree,
                    grade,
                    create_time,
                })
                res.status(201).send({
                    message: '学生添加成功',
                })
            } catch (error) {
                res.status(500).send({ error: '学生添加失败' })
            }
        } else {
            res.status(409).send({ error: '该学生已存在' })
        }
    },
    // 查询学生信息
    getStudentList: async (req, res) => {
        try {
            const list = await UserService.getStudentList(req.params)
            res.status(200).send({
                message: req.params.id ? '获取学生信息成功' : '获取学生列表成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: req.params.id ? '获取学生信息失败' : '获取学生列表失败',
                error: err.message,
            })
        }
    },
    // 更新学生信息
    changeStudentInfo: async (req, res) => {
        // console.log(req.body)
        // 解构出数据
        let { id, number, name, password, academy, major, degree, grade } = req.body
        // 若更改了密码
        if (password) {
            // 对密码加密
            // console.log('修改密码')
            password = await hashPassword(password)
        }

        const result = await UserService.changeStudentInfo({
            id,
            number,
            name,
            password,
            academy,
            major,
            degree,
            grade,
        })
        if (result[0] === 1) {
            res.status(200).send({
                message: '学生信息更新成功',
            })
        } else {
            res.status(400).send({ error: '学生信息更新失败' })
        }
    },
    // 删除学生
    deleteStudent: async (req, res) => {
        const result = await UserService.deleteStudent(req.body)
        if (result !== 0) {
            res.status(200).send({
                message: '删除成功',
            })
        } else {
            res.status(400).send({
                error: '删除失败',
            })
        }
    },
    //#endregion

    //#region 老师管理
    // 添加老师
    addTeacher: async (req, res) => {
        // console.log(req.body)
        // 查找数据库是否已存在用户
        const user = await UserService.getTeacherByNumber(req.body)
        // 如果用户不存在
        if (!user) {
            // 把数据解构出来
            let { number, name, password, phone_number, email, academy, lab } = req.body
            // 对密码加密
            password = await hashPassword(password)
            // 生成uuid
            const id = uuidv4()
            // 生成时间戳
            const create_time = Date.now()
            try {
                // 向teacher表添加
                const result = await UserService.addTeacher({
                    id,
                    number,
                    name,
                    password,
                    phone_number,
                    email,
                    academy,
                    lab,
                    create_time,
                })
                res.status(201).send({
                    message: '老师添加成功',
                })
            } catch (error) {
                res.status(500).send({ error: '老师添加失败' })
            }
        } else {
            res.status(409).send({ error: '该老师已存在' })
        }
    },
    // 查询老师信息
    getTeacherList: async (req, res) => {
        try {
            const list = await UserService.getTeacherList(req.params)
            res.status(200).send({
                message: req.params.id ? '获取老师信息成功' : '获取老师列表成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: req.params.id ? '获取老师信息失败' : '获取老师列表失败',
                error: err.message,
            })
        }
    },
    // 更新老师信息
    changeTeacherInfo: async (req, res) => {
        // console.log(req.body)
        // 解构出数据
        let { id, number, name, password, phone_number, email, academy, lab } = req.body
        // 若更改了密码
        if (password) {
            // 对密码加密
            // console.log('修改密码')
            password = await hashPassword(password)
        }

        // console.log('user更新完成')
        const result = await UserService.changeTeacherInfo({
            id,
            number,
            name,
            password,
            phone_number,
            email,
            academy,
            lab,
        })
        if (result[0] === 1) {
            res.status(200).send({
                message: '老师信息更新成功',
            })
        } else {
            res.status(400).send({ error: '老师信息更新失败' })
        }
    },
    // 删除老师
    deleteTeacher: async (req, res) => {
        const result = await UserService.deleteTeacher(req.body)
        if (result !== 0) {
            res.status(200).send({
                message: '删除成功',
            })
        } else {
            res.status(400).send({
                error: '删除失败',
            })
        }
    },
    //#endregion

    //#region 设备管理员
    // 添加设备管理员
    addAdmin: async (req, res) => {
        // 查找数据库是否已存在用户
        const user = await UserService.getAdminByNumber(req.body)
        // 如果用户不存在
        if (!user) {
            // 把数据解构出来
            let { number, name, password, phone_number, email } = req.body
            // 对密码加密
            password = await hashPassword(password)
            // 生成uuid
            const id = uuidv4()
            // 生成时间戳
            const create_time = Date.now()
            try {
                // 向teacher表添加
                const result = await UserService.addAdmin({
                    id,
                    number,
                    name,
                    password,
                    phone_number,
                    email,
                    create_time,
                })
                res.status(201).send({
                    message: '管理员添加成功',
                })
            } catch (error) {
                res.status(500).send({ error: '管理员添加失败' })
            }
        } else {
            res.status(409).send({ error: '该管理员已存在' })
        }
    },
    // 查询管理员信息
    getAdminList: async (req, res) => {
        try {
            const list = await UserService.getAdminList(req.params)
            res.status(200).send({
                message: req.params.id ? '获取管理员信息成功' : '获取管理员列表成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: req.params.id ? '获取管理员信息失败' : '获取管理员列表失败',
                error: err.message,
            })
        }
    },
    // 更新管理员信息
    changeAdminInfo: async (req, res) => {
        // 解构出数据
        let { id, number, name, password, phone_number, email, academy, lab } = req.body
        // 若更改了密码
        if (password) {
            // 对密码加密
            // console.log('修改密码')
            password = await hashPassword(password)
        }

        const result = await UserService.changeAdminInfo({
            id,
            number,
            name,
            password,
            phone_number,
            email,
        })
        if (result[0] === 1) {
            res.status(200).send({
                message: '管理员信息更新成功',
            })
        } else {
            res.status(400).send({ error: '管理员信息更新失败' })
        }
    },
    deleteAdmin: async (req, res) => {
        const result = await UserService.deleteAdmin(req.body)
        if (result !== 0) {
            res.status(200).send({
                message: '删除成功',
            })
        } else {
            res.status(400).send({
                error: '删除失败',
            })
        }
    },
    //#endregion
}

module.exports = UserController
