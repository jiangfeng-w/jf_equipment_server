const UserService = require('../../service/web/UserService')
const JWT = require('../../utils/JWT')
const deleteAvatar = require('../../utils/deleteAvatar')
const { hashPassword, comparePassword } = require('../../utils/encryptPassword')
const { generateVerificationCode, sendVerificationCodeEmail, saveEmail } = require('../../utils/email')
const { v4: uuidv4 } = require('uuid')

const UserController = {
    // 登录
    login: async (req, res) => {
        // console.log(req.body)
        const { number, password } = req.body
        const teacher = await UserService.teacherLogin(number)
        const student = await UserService.studentLogin(number)

        if (teacher) {
            // 存在老师账户
            // 验证密码
            const result = await comparePassword(password, teacher.password)
            if (!result) {
                res.status(401).send({ error: '密码错误' })
            } else {
                // 设置token
                const token = JWT.generate(
                    {
                        id: teacher.id,
                        number: teacher.number,
                        role: teacher.role,
                    },
                    '1h'
                )
                // 放在请求头中返回给前端
                res.header('Authorization', token)
                res.status(200).send({
                    message: '登录成功',
                    data: {
                        id: teacher.id,
                        number: teacher.number,
                        name: teacher.name,
                        avatar: teacher.avatar,
                        phone_number: teacher.phone_number,
                        email: teacher.email,
                        role: teacher.role,
                        academy: teacher.academy,
                        create_time: teacher.create_time,
                    },
                })
            }
        } else if (student) {
            // 存在学生账户
            // 验证密码
            const result = await comparePassword(password, student.password)
            if (!result) {
                res.status(401).send({ error: '密码错误' })
            } else {
                // 设置token
                const token = JWT.generate(
                    {
                        id: student.id,
                        number: student.number,
                        role: student.role,
                    },
                    '1h'
                )
                // 放在请求头中返回给前端
                res.header('Authorization', token)
                res.status(200).send({
                    message: '登录成功',
                    data: {
                        id: student.id,
                        number: student.number,
                        name: student.name,
                        avatar: student.avatar,
                        phone_number: student.phone_number,
                        email: student.email,
                        role: student.role,
                        academy: student.academy,
                        create_time: student.create_time,
                        is_bind_email: student.is_bind_email,
                    },
                })
            }
        } else {
            // 登录失败
            res.status(404).send({
                error: '没有此用户',
            })
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
        // 更改对应角色的表的信息
        await UserService.changeOwnInfo({
            id: origin.id,
            email,
            phone_number,
            avatar,
            role: origin.role,
        })
        try {
            // 从角色对应的表表中获取用户角色
            const user = await UserService.getInfoByID(origin.id, origin.role)
            // 是老师
            if (origin.role === 3) {
                res.status(200).send({
                    message: '个人信息更新成功',
                    data: {
                        id: user.id,
                        number: user.number,
                        name: user.name,
                        avatar: user.avatar,
                        phone_number: user.phone_number,
                        email: user.email,
                        role: user.role,
                        academy: user.academy,
                        create_time: user.create_time,
                    },
                    customData: req.customData,
                })
            } else {
                res.status(200).send({
                    message: '个人信息更新成功',
                    data: {
                        id: user.id,
                        number: user.number,
                        name: user.name,
                        avatar: user.avatar,
                        phone_number: user.phone_number,
                        email: user.email,
                        role: user.role,
                        academy: user.academy,
                        create_time: user.create_time,
                        is_bind_email: user.is_bind_email,
                    },
                    customData: req.customData,
                })
            }
        } catch (error) {
            res.status(500).send({
                error: error.message,
                customData: req.customData,
            })
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
        // 密码对比
        const isRight = await comparePassword(oldPassword, user.password)

        // isRight为false，则原密码错误
        if (!isRight) {
            res.status(500).send({
                message: '原密码错误',
                customData: req.customData,
            })
        } else {
            try {
                // 对新密码加密
                const password = await hashPassword(newPassword)
                // 传到service层
                await UserService.changePass({
                    id: user.id,
                    role: user.role,
                    password,
                })
                res.status(200).send({
                    message: '密码修改成功',
                    customData: req.customData,
                })
            } catch (error) {
                res.status(500).send({
                    message: error.message,
                    customData: req.customData,
                })
            }
        }
    },
    // 发送邮件
    sendEmail: async (req, res) => {
        // 解构出邮箱
        const { email } = req.body
        // 用token获取id
        const token = req.headers['authorization'].split(' ')[1]
        const origin = JWT.verify(token)
        // 生成验证码
        const email_code = generateVerificationCode()
        try {
            // 获取SMTP服务邮箱
            await saveEmail()
            // 发送邮件
            await sendVerificationCodeEmail(email, email_code)
            // 向数据库存储验证码
            await UserService.sendEmail(origin.id, origin.role, email_code)
            res.status(201).send({
                message: '验证码已发送，请注意查看邮箱',
            })
        } catch (error) {
            res.status(500).send({ error })
        }
    },
    // 学生绑定邮箱
    bindEmail: async (req, res) => {
        // 解构出邮箱
        const { email, email_code } = req.body
        // 用token获取id
        const token = req.headers['authorization'].split(' ')[1]
        const origin = JWT.verify(token)
        // 取出数据
        const student = await UserService.studentLogin(origin.number)
        // 验证码正确
        if (email_code === student.email_code) {
            try {
                await UserService.bindEmail(origin.id, email)
                res.status(201).send({
                    message: '邮箱绑定成功',
                    data: {
                        id: student.id,
                        number: student.number,
                        name: student.name,
                        email: student.email,
                        is_bind_email: 1,
                        avatar: student.avatar,
                        role: student.role,
                    },
                    customData: req.customData,
                })
            } catch (error) {
                res.status(500).send({ error })
            }
        } else {
            res.status(500).send({
                error: '验证码不正确',
            })
        }
    },
}

module.exports = UserController
