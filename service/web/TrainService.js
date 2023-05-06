const CourseModel = require('../../models/CourseModel')
const TrainModel = require('../../models/TrainModel')
const { Op } = require('sequelize')

const TrainService = {
    // 获取培训课程列表
    trainCourseList: async () => {
        return CourseModel.findAll({
            order: [['state', 'ASC']],
        })
    },
    // 设置课程状态
    setState: async newList => {
        for (const item of newList) {
            const { id, state } = item
            await CourseModel.update({ state }, { where: { id } })
            await TrainModel.update({ state }, { where: { equip_id: id } })
        }
    },

    // 报名培训课程
    // 课程表
    plusCourseCount: async (id, signup_count) => {
        return CourseModel.update({ signup_count }, { where: { id } })
    },
    // 报名表
    signUpCourse: async data => {
        return TrainModel.create(data)
    },

    // 我的报名课程
    myCourseList: async student_number => {
        return TrainModel.findAll({
            where: { student_number },
        })
    },
}

module.exports = TrainService
