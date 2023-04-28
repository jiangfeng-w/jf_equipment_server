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
}

module.exports = UserService
