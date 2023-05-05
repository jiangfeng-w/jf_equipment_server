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
}

module.exports = TrainService
