const TrainService = require('../../service/admin/TrainService')

const TrainController = {
    // 添加培训课程
    addCourse: async (req, res) => {
        const {
            equip_id,
            equip_name,
            project_name,
            train_content,
            train_total_count,
            train_place,
            manager_number,
            manager_name,
            manager_email,
            signup_deadline,
            train_start,
            train_end,
            tips,
        } = req.body

        try {
            await TrainService.addCourse({
                equip_id,
                equip_name,
                project_name,
                train_content,
                train_total_count,
                train_place,
                manager_number,
                manager_name,
                manager_email,
                signup_count: 0,
                is_full_count: 0,
                signup_deadline,
                train_start,
                train_end,
                state: 0,
                tips,
                create_time: Date.now(),
            })
            res.status(201).send({
                message: '培训课程添加成功',
            })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    },
    // 培训课程列表
    trainCourseList: async (req, res) => {
        let manager_number
        if (req.params.iden) {
            manager_number = req.params.iden
        }

        try {
            const list = await TrainService.trainCourseList(manager_number)
            res.status(200).send({
                message: '获取培训课程成功',
                data: list,
            })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    },
}

module.exports = TrainController
