const UserService = require('../../service/web/UserService')
const JWT = require('../../utils/JWT')
const deleteAvatar = require('../../utils/deleteAvatar')
const { hashPassword, comparePassword } = require('../../utils/encryptPassword')
const { generateVerificationCode, sendVerificationCodeEmail } = require('../../utils/email')
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
                        email: teacher.email,
                        avatar: teacher.avatar,
                        role: teacher.role,
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
                        email: student.email,
                        is_bind_email: student.is_bind_email,
                        avatar: student.avatar,
                        role: student.role,
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
