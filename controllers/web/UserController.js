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
                res.status(200).send({
                    message: '登录成功',
                    data: {
                        id: teacher.id,
                        number: teacher.number,
                        name: teacher.name,
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
                res.status(200).send({
                    message: '登录成功',
                    data: {
                        id: student.id,
                        number: student.number,
                        name: student.name,
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
}

module.exports = UserController
