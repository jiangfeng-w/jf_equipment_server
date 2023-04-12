const UserModel = require('../../models/UserModel')
const StudentModel = require('../../models/StudentModel')
const TeacherModel = require('..//../models/TeacherModel')
const AdminModel = require('..//../models/AdminModel')
const { Op } = require('sequelize')

const UserService = {
    // 登录，用用户名获取信息
    login: async ({ number }) => {
        return UserModel.findOne({
            where: {
                number,
            },
        })
    },
    // 修改用户密码
    changeUserPassword: async data => {
        return UserModel.update(data, { where: { id: data.id } })
    },
    // 向用户表添加
    addUser: async ({ id, number, name, password, role, create_time }) => {
        return UserModel.create({
            id,
            number,
            name,
            password,
            role,
            create_time,
        })
    },
    // 删除用户
    deleteUser: async ({ ids }) => {
        return UserModel.destroy({ where: { id: { [Op.in]: ids } } })
    },

    // 向学生表添加
    addStudent: async ({ id, number, name, academy, major, degree, grade, trained, create_time }) => {
        return StudentModel.create({
            id,
            number,
            name,
            academy,
            major,
            degree,
            grade,
            trained,
            create_time,
        })
    },
    // 查询学生信息
    getStudentList: async ({ id }) => {
        if (id) {
            return StudentModel.findOne({
                where: {
                    id,
                },
            })
        } else {
            return StudentModel.findAll({
                order: [['create_time', 'ASC']],
            })
        }
    },
    // 修改学生信息
    changeStudentInfo: async ({ id, number, name, academy, major, degree, grade }) => {
        return StudentModel.update({ number, name, academy, major, degree, grade }, { where: { id } })
    },

    // 向老师表添加
    addTeacher: async ({ id, number, name, academy, phone_number, email, lab, create_time }) => {
        return TeacherModel.create({ id, number, name, academy, phone_number, email, lab, create_time })
    },
    // 查询老师信息
    getTeacherList: async ({ id }) => {
        if (id) {
            return TeacherModel.findOne({
                where: {
                    id,
                },
            })
        } else {
            return TeacherModel.findAll({
                order: [['create_time', 'ASC']],
            })
        }
    },
    // 修改老师
    changeTeacherInfo: async ({ id, number, name, academy, phone_number, email, lab }) => {
        return TeacherModel.update({ number, name, academy, phone_number, email, lab }, { where: { id } })
    },

    // 添加管理员
    addAdmin: async ({ id, number, name, phone_number, email, create_time }) => {
        return AdminModel.create({
            id,
            number,
            name,
            phone_number,
            email,
            create_time,
        })
    },
    // 查询管理员信息
    getAdminList: async ({ id }) => {
        if (id) {
            return AdminModel.findOne({
                where: {
                    id,
                },
            })
        } else {
            return AdminModel.findAll({
                order: [['create_time', 'ASC']],
            })
        }
    },
    // 修改管理员信息
    changeAdminInfo: async ({ id, number, name, phone_number, email }) => {
        return AdminModel.update(
            {
                number,
                name,
                phone_number,
                email,
            },
            { where: { id } }
        )
    },
    // // 更新用户信息
    // upload: async ({ id, username, gender, introduction, avatar }) => {
    //     return UserModel.update({ username, gender, introduction, avatar }, { where: { id } })
    // },
    // // 添加用户
    // add: async ({ id, username, password, role, gender, introduction, avatar, createTime }) => {
    //     return UserModel.create({ id, username, password, role, gender, introduction, avatar, createTime })
    // },
    // // 用id获取信息
    // getInfo: async ({ id }) => {
    //     return UserModel.findOne({
    //         where: {
    //             id,
    //         },
    //     })
    // },
    // // 更改密码
    // changePass: async ({ id, password }) => {
    //     return UserModel.update({ password }, { where: { id } })
    // },
    // // 获取用户列表
    // getList: async ({ id }) => {
    //     if (id) {
    //         return UserModel.findOne({
    //             where: {
    //                 id,
    //             },
    //             attributes: { exclude: ['password', 'avatar', 'gender'] },
    //         })
    //     } else {
    //         return UserModel.findAll({
    //             order: [['createTime', 'ASC']],
    //             attributes: { exclude: ['password', 'gender'] },
    //         })
    //     }
    // },
    // // 删除用户
    // delList: async ({ id }) => {
    //     return UserModel.destroy({
    //         where: {
    //             id,
    //         },
    //     })
    // },
    // // 更新用户信息
    // putList: async newData => {
    //     return UserModel.update(newData, { where: { id: newData.id } })
    // },
}

module.exports = UserService
