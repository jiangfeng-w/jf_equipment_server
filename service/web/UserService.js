const StudentModel = require('../../models/StudentModel')
const TeacherModel = require('../../models/TeacherModel')
const { Op } = require('sequelize')

const UserService = {
    // 登录，用用户名获取信息
    studentLogin: async number => {
        return StudentModel.findOne({
            where: { number },
        })
    },
    teacherLogin: async number => {
        return TeacherModel.findOne({
            where: { number },
        })
    },
    // 个人中心修改信息
    changeOwnInfo: async ({ id, email, phone_number, avatar, role }) => {
        if (role === 3) {
            return TeacherModel.update(
                { email, phone_number, avatar },
                {
                    where: {
                        id,
                    },
                }
            )
        } else {
            return StudentModel.update(
                { email, phone_number, avatar },
                {
                    where: {
                        id,
                    },
                }
            )
        }
    },
    // 个人中心密码
    changePass: async ({ id, role, password }) => {
        if (role === 3) {
            return TeacherModel.update({ password }, { where: { id } })
        } else {
            return StudentModel.update({ password }, { where: { id } })
        }
    },
    // 获取用户信息
    getInfoByID: async (id, role) => {
        if (role === 3) {
            return TeacherModel.findOne({
                where: { id },
            })
        } else {
            return StudentModel.findOne({
                where: { id },
            })
        }
    },

    // 存储验证码
    sendEmail: async (id, role, email_code) => {
        if (role === 3) {
            return TeacherModel.update({ email_code }, { where: { id } })
        } else {
            return StudentModel.update({ email_code }, { where: { id } })
        }
    },

    // 学生绑定邮箱
    bindEmail: async (id, email) => {
        // 删除验证码，并存储邮箱
        StudentModel.update({ email, email_code: null, is_bind_email: 1 }, { where: { id } })
    },
}

module.exports = UserService
