const UserService = require('../../service/admin/UserService')
const JWT = require('../../utils/JWT')
const deleteAvatar = require('../../utils/deleteAvatar')
const { hashPassword, comparePassword } = require('../../utils/encryptPassword')
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
                    },
                    '1h'
                )
                // 放在请求头中返回给前端
                res.header('Authorization', token)
                res.status(200).send({
                    error: '登录成功',
                    data: {
                        number: user.number,
                        name: user.name,
                        role: user.role,
                        avatar: user.avatar,
                    },
                })
            }
        }
    },
    // 获取用户信息
    getUserInfo: async (req, res) => {
        // 用token获取id
        const token = req.headers['authorization'].split(' ')[1]
        const origin = JWT.verify(token)
        // console.log(origin)
        // 从user表中获取用户角色
        const user = await UserService.getInfoByID(origin.id)
        // 从角色对应的表中查询数据
        const specificInfo = await UserService.getSpecificInfo({
            id: origin.id,
            role: user.role,
        })
        res.status(200).send({
            message: '获取用户信息成功',
            data: specificInfo,
        })
    },
    // 删除用户信息
    deleteUser: async (req, res) => {
        // console.log(req.body)
        const result = await UserService.deleteUser(req.body)
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

    // 个人中心
    changeOwnInfo: async (req, res) => {
        // console.log(req.body)
        // console.log(req.file)
        // 把用户信息解构出来
        const { number, name, phone_number, email, oldAvatar } = req.body
        let avatar
        if (!req.file) {
            // 如果没有上传文件，头像使用旧头像地址
            avatar = oldAvatar
        } else {
            // 如果更改了头像,即有文件上传
            // 头像地址
            avatar = `http://localhost:3000/images/avatars/${req.file.filename}`
            // 删除原来的头像
            deleteAvatar(oldAvatar)
        }
        // 用token获取id
        const token = req.headers['authorization'].split(' ')[1]
        const origin = JWT.verify(token)
        // console.log(origin)

        // 从user表中获取用户角色
        const user = await UserService.getInfoByID(origin.id)

        try {
            // 更改user表信息
            const result1 = await UserService.changeUserInfo({
                id: origin.id,
                number,
                name,
                avatar,
            })
            // // 更改对应角色的表的信息
            const result2 = await UserService.changeOwnInfo({
                id: origin.id,
                email,
                phone_number,
                role: user.role,
            })
            res.status(200).send({
                message: '用户信息更新成功',
                data: {
                    number,
                    name,
                    avatar,
                    role: user.role,
                },
            })
        } catch (error) {
            res.status(400).send({ error: '用户信息更新失败' })
        }
        // // console.log(result)
        // if (result[0] === 1) {
        //     res.status(200).send({
        //         message: '用户信息更新成功',
        //         data: {
        //             username,
        //             gender: Number(gender),
        //             introduction,
        //             avatar,
        //         },
        //     })
        // } else {
        //     res.status(400).send({ message: '用户信息更新失败' })
        // }
    },

    //#region 学生管理
    // 添加学生
    addStudent: async (req, res) => {
        // console.log(req.body)
        // 查找数据库是否已存在用户
        const user = await UserService.login(req.body)
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
                const result1 = await UserService.addUser({
                    id,
                    number,
                    name,
                    password,
                    role: 4,
                    create_time,
                })

                const result2 = await UserService.addStudent({
                    id,
                    number,
                    name,
                    academy,
                    major,
                    degree,
                    trained: 0,
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

        // 提交给user表的数据
        const data1 = {
            id,
            number,
            name,
        }
        // 若更改了密码
        if (password) {
            // 对密码加密
            // console.log('修改密码')
            data1.password = await hashPassword(password)
        }
        try {
            const result1 = await UserService.changeUserInfo(data1)
            console.log('user更新完成')
            const result2 = await UserService.changeStudentInfo({
                id,
                number,
                name,
                academy,
                major,
                degree,
                grade,
            })
            res.status(200).send({
                message: '学生信息更新成功',
            })
        } catch (error) {
            res.status(400).send({ error: '学生信息更新失败' })
        }
    },
    //#endregion

    //#region 老师管理
    // 添加老师
    addTeacher: async (req, res) => {
        // console.log(req.body)
        // 查找数据库是否已存在用户
        const user = await UserService.login(req.body)
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
                // 向users表添加数据
                const result1 = await UserService.addUser({
                    id,
                    number,
                    name,
                    password,
                    role: 3,
                    create_time,
                })
                // 向teacher表添加
                const result2 = await UserService.addTeacher({
                    id,
                    number,
                    name,
                    academy,
                    phone_number,
                    email,
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

        // 提交给user表的数据
        const data1 = {
            id,
            number,
            name,
        }
        // 若更改了密码
        if (password) {
            // 对密码加密
            // console.log('修改密码')
            data1.password = await hashPassword(password)
        }
        try {
            const result1 = await UserService.changeUserPassword(data1)
            // console.log('user更新完成')
            const result2 = await UserService.changeTeacherInfo({
                id,
                number,
                name,
                academy,
                phone_number,
                email,
                lab,
            })
            res.status(200).send({
                message: '老师信息更新成功',
            })
        } catch (error) {
            res.status(400).send({ error: '老师信息更新失败' })
        }
    },

    //#endregion

    //#region 设备管理员
    // 添加设备管理员
    addAdmin: async (req, res) => {
        console.log(req.body)
        // console.log(req.body)
        // 查找数据库是否已存在用户
        const user = await UserService.login(req.body)
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
                // 向users表添加数据
                const result1 = await UserService.addUser({
                    id,
                    number,
                    name,
                    password,
                    role: 2,
                    create_time,
                })
                // 向teacher表添加
                const result2 = await UserService.addAdmin({
                    id,
                    number,
                    name,
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
        // console.log(req.body)
        // 解构出数据
        let { id, number, name, password, phone_number, email, academy, lab } = req.body

        // 提交给user表的数据
        const data1 = {
            id,
            number,
            name,
        }
        // 若更改了密码
        if (password) {
            // 对密码加密
            // console.log('修改密码')
            data1.password = await hashPassword(password)
        }
        try {
            const result1 = await UserService.changeUserPassword(data1)
            // console.log('user更新完成')
            const result2 = await UserService.changeAdminInfo({
                id,
                number,
                name,
                phone_number,
                email,
            })
            res.status(200).send({
                message: '管理员信息更新成功',
            })
        } catch (error) {
            res.status(400).send({ error: '管理员信息更新失败' })
        }
    },
    //#endregion
    // // 更新信息，上传文件
    // upload: async (req, res) => {
    //     // 把用户信息解构出来
    //     const { username, gender, introduction, oldAvatar } = req.body
    //     let avatar
    //     if (!req.file) {
    //         // 如果没有上传文件，头像使用旧头像地址
    //         avatar = oldAvatar
    //     } else {
    //         // 如果更改了头像,即有文件上传
    //         // 头像地址
    //         avatar = `http://localhost:3000/images/avatars/${req.file.filename}`
    //         // 删除原来的头像
    //         deleteAvatar(oldAvatar)
    //     }
    //     // 用token获取id
    //     const token = req.headers['authorization'].split(' ')[1]
    //     const origin = JWT.verify(token)
    //     // console.log(origin)

    //     // 传到service层
    //     const result = await UserService.upload({
    //         id: origin.id,
    //         username,
    //         gender: Number(gender),
    //         introduction,
    //         avatar,
    //     })
    //     // console.log(result)
    //     if (result[0] === 1) {
    //         res.status(200).send({
    //             message: '用户信息更新成功',
    //             data: {
    //                 username,
    //                 gender: Number(gender),
    //                 introduction,
    //                 avatar,
    //             },
    //         })
    //     } else {
    //         res.status(400).send({ message: '用户信息更新失败' })
    //     }
    // },

    // // 修改密码
    // changePass: async (req, res) => {
    //     // console.log(req.body)
    //     // 把数据解构出来
    //     const { oldPassword, newPassword } = req.body

    //     // 用token获取id
    //     const token = req.headers['authorization'].split(' ')[1]
    //     const origin = JWT.verify(token)
    //     // 从数据库读取用户信息
    //     const user = await UserService.getInfo({ id: origin.id })
    //     // 密码对比
    //     const isRight = await comparePassword(oldPassword, user.password)
    //     // isRight为false，则原密码错误
    //     if (!isRight) {
    //         res.status(400).send({ message: '原密码错误' })
    //     } else {
    //         // 对新密码加密
    //         const password = await hashPassword(newPassword)
    //         // 传到service层
    //         const result = await UserService.changePass({
    //             id: origin.id,
    //             password,
    //         })
    //         if (result[0] === 1) {
    //             res.status(200).send({
    //                 message: '密码更新成功',
    //             })
    //         } else {
    //             res.status(400).send({ message: '密码更新失败' })
    //         }
    //     }
    // },

    // // 添加用户
    // add: async (req, res) => {
    //     // 从数据库读取用户信息
    //     const user = await UserService.login(req.body)
    //     // 如果用户不存在，则可以存入信息
    //     if (!user) {
    //         // 把用户信息解构出来
    //         let { username, password, gender, role, introduction } = req.body
    //         // 获取头像
    //         let avatar
    //         if (!req.file) {
    //             // 如果没有上传文件
    //             avatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    //         } else {
    //             // 如果更改了头像,即有文件上传
    //             // 头像地址
    //             avatar = `http://localhost:3000/images/avatars/${req.file.filename}`
    //             // 删除原来的头像
    //             deleteAvatar('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
    //         }
    //         // 对密码加密
    //         password = await hashPassword(password)
    //         // 生成uuid
    //         const id = uuidv4()
    //         // 生成时间戳
    //         const createTime = Date.now()
    //         try {
    //             // 传到service层
    //             const result = await UserService.add({
    //                 id,
    //                 username,
    //                 password,
    //                 role: Number(role),
    //                 gender: Number(gender),
    //                 introduction,
    //                 avatar,
    //                 createTime,
    //             })
    //             res.status(201).send({
    //                 message: '用户添加成功',
    //             })
    //         } catch (error) {
    //             res.status(500).send({ message: '用户添加失败' })
    //         }
    //     } else {
    //         res.status(409).send({ message: '用户已存在' })
    //     }
    // },

    // // 获取用户信息
    // getList: async (req, res) => {
    //     try {
    //         const list = await UserService.getList(req.params)
    //         res.status(200).send({
    //             message: req.params.id ? '获取用户信息成功' : '获取用户列表成功',
    //             data: list,
    //         })
    //     } catch (err) {
    //         res.status(500).send({
    //             message: req.params.id ? '获取用户信息失败' : '获取用户列表失败',
    //             error: err.message,
    //         })
    //     }
    // },

    // // 删除用户
    // delList: async (req, res) => {
    //     // console.log(req.params.id)
    //     // console.log(req.body)
    //     const result = await UserService.delList(req.params)
    //     if (result === 1) {
    //         // 删除头像
    //         deleteAvatar(req.body.avatar)
    //         res.status(200).send({
    //             message: '删除成功',
    //         })
    //     } else {
    //         res.status(400).send({
    //             message: '删除失败',
    //         })
    //     }
    // },

    // // 编辑用户
    // putList: async (req, res) => {
    //     // 把数据解构出来
    //     const { id, username, password, role, introduction } = req.body
    //     let newData = {
    //         id,
    //         username,
    //         role,
    //         introduction,
    //     }
    //     if (password) {
    //         // 对密码加密
    //         const hashedPassword = await hashPassword(password)
    //         newData.password = hashedPassword
    //     }
    //     const result = await UserService.putList(newData)
    //     if (result[0] === 1) {
    //         res.status(200).send({
    //             message: '更新成功',
    //         })
    //     } else {
    //         res.status(400).send({
    //             message: '更新失败',
    //         })
    //     }
    // },
}

module.exports = UserController
