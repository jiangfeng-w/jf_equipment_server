const CourseModel = require('../../models/CourseModel')
const TrainModel = require('../../models/TrainModel')
const { Op } = require('sequelize')

const TrainService = {
    // 添加培训课程
    addCourse: async ({
        equip_id,
        equip_name,
        project_name,
        train_content,
        train_total_count,
        train_place,
        manager_number,
        manager_name,
        manager_email,
        signup_count,
        signup_deadline,
        train_start,
        train_end,
        tips,
        create_time,
    }) => {
        return CourseModel.create({
            equip_id,
            equip_name,
            project_name,
            train_content,
            train_total_count,
            train_place,
            manager_number,
            manager_name,
            manager_email,
            signup_count,
            signup_deadline,
            train_start,
            train_end,
            tips,
            create_time,
        })
    },
    // 获取培训课程列表
    trainCourseList: async manager_number => {
        if (manager_number) {
            return CourseModel.findAll({
                where: {
                    manager_number,
                },
            })
        } else {
            return CourseModel.findAll()
        }
    },
}

module.exports = TrainService
