const StudentModel = require('../../models/StudentModel')
const TeacherModel = require('../../models/TeacherModel')
const AdminModel = require('../../models/AdminModel')
const SuperModel = require('../../models/SuperModel')
const { Op } = require('sequelize')

const UserService = {
    // 登录，用用户名获取信息
    login: async ({ number, role }) => {
        if (role === 1) {
            return SuperModel.findOne({
                where: { number },
            })
        } else {
            return AdminModel.findOne({
                where: { number },
            })
        }
    },
    // 通过id获取信息
    getInfoByID: async (id, role) => {
        if (role === 1) {
            return SuperModel.findOne({
                where: { id },
            })
        } else {
            return AdminModel.findOne({
                where: { id },
            })
        }
    },
    // 个人中心修改信息
    changeOwnInfo: async ({ id, email, phone_number, avatar, role }) => {
        if (role === 1) {
            return SuperModel.update(
                { email, phone_number, avatar },
                {
                    where: {
                        id,
                    },
                }
            )
        } else {
            return AdminModel.update(
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
        if (role === 1) {
            return SuperModel.update({ password }, { where: { id } })
        } else {
            return AdminModel.update({ password }, { where: { id } })
        }
    },
    // 存储验证码
    sendEmail: async ({ number, role, email_code }) => {
        if (role === 1) {
            return SuperModel.update({ email_code }, { where: { number } })
        } else {
            return AdminModel.update({ email_code }, { where: { number } })
        }
    },
    // 删除验证码
    removeEmailCode: async ({ id, role }) => {
        if (role === 1) {
            return SuperModel.update({ email_code: null }, { where: { id } })
        } else {
            return AdminModel.update({ email_code: null }, { where: { id } })
        }
    },

    //#region 学生
    // 向学生表添加
    addStudent: async ({ id, number, name, password, academy, major, degree, grade, create_time }) => {
        return StudentModel.create({
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
    },
    // 获取长度
    getStudentListLength: async (name, major, grade, trained) => {
        return StudentModel.count({
            where: {
                name: { [Op.like]: `%${name || ''}%` },
                trained: trained.length ? { [Op.in]: trained } : { [Op.ne]: null },
                major: major.length ? { [Op.in]: major } : { [Op.ne]: null },
                grade: grade.length ? { [Op.in]: grade } : { [Op.ne]: null },
            },
        })
    },
    // 用id查询学生信息/查询全部信息
    getStudentList: async (id, name, major, grade, trained, pageSize, currentPage) => {
        if (id) {
            return StudentModel.findOne({
                where: { id },
                attributes: { exclude: ['password'] },
            })
        } else {
            return StudentModel.findAll({
                where: {
                    name: { [Op.like]: `%${name || ''}%` },
                    trained: trained.length ? { [Op.in]: trained } : { [Op.ne]: null },
                    major: major.length ? { [Op.in]: major } : { [Op.ne]: null },
                    grade: grade.length ? { [Op.in]: grade } : { [Op.ne]: null },
                },
                attributes: { exclude: ['password'] },
                order: [['number', 'ASC']],
                offset: (currentPage - 1) * pageSize,
                limit: pageSize,
            })
        }
    },
    // 用学号查询学生信息
    getStudentByNumber: async ({ number }) => {
        return StudentModel.findOne({
            where: { number },
        })
    },
    // 修改学生信息
    changeStudentInfo: async ({ id, number, name, academy, major, degree, grade }) => {
        return StudentModel.update({ number, name, academy, major, degree, grade }, { where: { id } })
    },
    // 删除学生
    deleteStudent: async ({ ids }) => {
        return StudentModel.destroy({ where: { id: { [Op.in]: ids } } })
    },
    // 查学生专业
    getMajors: async () => {
        return StudentModel.findAll({
            attributes: ['academy', 'major', 'degree', 'grade', 'trained'],
        })
    },
    //#endregion

    //#region 老师
    // 向老师表添加
    addTeacher: async ({ id, number, name, password, phone_number, email, academy, lab, create_time }) => {
        return TeacherModel.create({ id, number, name, password, phone_number, email, academy, lab, create_time })
    },
    // 获取长度
    getTeacherListLength: async (name, lab) => {
        return TeacherModel.count({
            where: {
                name: { [Op.like]: `%${name || ''}%` },
                lab: lab.length ? { [Op.in]: lab } : { [Op.ne]: null },
            },
        })
    },

    // 用id查询老师信息
    getTeacherList: async (id, name, lab, pageSize, currentPage) => {
        if (id) {
            return TeacherModel.findOne({
                where: { id },
                attributes: { exclude: ['password'] },
            })
        } else {
            return TeacherModel.findAll({
                where: {
                    name: { [Op.like]: `%${name || ''}%` },
                    lab: lab.length ? { [Op.in]: lab } : { [Op.ne]: null },
                },
                attributes: { exclude: ['password'] },
                order: [['number', 'ASC']],
                offset: (currentPage - 1) * pageSize,
                limit: pageSize,
            })
        }
    },
    // 用学工号查询老师信息
    getTeacherByNumber: async ({ number }) => {
        return TeacherModel.findOne({
            where: { number },
        })
    },
    // 修改老师
    changeTeacherInfo: async ({ id, number, name, password, phone_number, email, academy, lab }) => {
        return TeacherModel.update(
            {
                number,
                name,
                password,
                phone_number,
                email,
                academy,
                lab,
            },
            { where: { id } }
        )
    },
    // 删除老师
    deleteTeacher: async ({ ids }) => {
        return TeacherModel.destroy({ where: { id: { [Op.in]: ids } } })
    },
    //#endregion

    //#region 设备管理员
    // 添加管理员
    addAdmin: async ({ id, number, name, password, academy, lab, phone_number, email, create_time }) => {
        return AdminModel.create({
            id,
            number,
            name,
            password,
            academy,
            lab,
            phone_number,
            email,
            create_time,
        })
    },
    // 获取长度
    getAdminListLength: async (name, lab) => {
        return AdminModel.count({
            where: {
                name: { [Op.like]: `%${name || ''}%` },
                lab: lab.length ? { [Op.in]: lab } : { [Op.ne]: null },
            },
        })
    },
    // 用id查询管理员信息
    getAdminList: async (id, name, lab, pageSize, currentPage) => {
        if (id) {
            return AdminModel.findOne({
                where: { id },
                attributes: { exclude: ['password'] },
            })
        } else {
            return AdminModel.findAll({
                where: {
                    name: { [Op.like]: `%${name || ''}%` },
                    lab: lab.length ? { [Op.in]: lab } : { [Op.ne]: null },
                },
                attributes: { exclude: ['password'] },
                order: [['number', 'ASC']],
                offset: (currentPage - 1) * pageSize,
                limit: pageSize,
            })
        }
    },
    // 用学工号查询管理员信息
    getAdminByNumber: async ({ number }) => {
        return AdminModel.findOne({
            where: { number },
        })
    },
    // 修改管理员信息
    changeAdminInfo: async ({ id, number, name, password, phone_number, email, academy, lab }) => {
        return AdminModel.update(
            {
                number,
                name,
                password,
                phone_number,
                email,
                academy,
                lab,
            },
            { where: { id } }
        )
    },
    // 删除管理员
    deleteAdmin: async ({ ids }) => {
        return AdminModel.destroy({ where: { id: { [Op.in]: ids } } })
    },
    //#endregion
}

module.exports = UserService
