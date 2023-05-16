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
        state,
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
            state,
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
    // 设置课程状态
    setState: async newList => {
        for (const item of newList) {
            const { id, state } = item
            await CourseModel.update({ state }, { where: { id } })
        }
    },
    // 根据课程id获取报名表
    signUpList: async course_id => {
        return TrainModel.findAll({
            where: { course_id, state: 0 },
        })
    },
    // 同意报名
    agree: async (id, approval_time = Date.now()) => {
        return TrainModel.update({ state: 2, approval_time }, { where: { id } })
    },
    // 拒绝报名
    refuse: async (id, course_id, approval_time = Date.now()) => {
        // 减少报名人数
        await CourseModel.decrement({ signup_count: 1 }, { where: { id: course_id } })
        // 改变报名状态
        await TrainModel.update({ state: 1, approval_time }, { where: { id } })
    },

    // 课程学员
    courseStudents: async course_id => {
        return TrainModel.findAll({
            where: {
                course_id,
                state: {
                    [Op.in]: [2, 3, 4],
                },
            },
        })
    },
    // 完成培训
    completed: async ({ ids }) => {
        await TrainModel.update({ state: 4 }, { where: { id: { [Op.in]: ids } } })
    },
}

module.exports = TrainService
