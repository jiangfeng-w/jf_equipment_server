const TrainService = require('../../service/web/TrainService')

const TrainController = {
    // 获取培训课程列表
    trainCourseList: async (req, res) => {
        const { iden: student_number } = req.params
        const time = Date.now()
        try {
            // 查出当前用户已经报名的课程
            let myList = await TrainService.myCourseList(student_number)
            // 筛选出已报名的课程id
            myList = myList
                .filter(i => {
                    return [0, 2, 3, 4].includes(i.state)
                })
                .map(i => {
                    return (i = i.course_id)
                })
            // 取出课程列表
            const list = await TrainService.trainCourseList()
            const newList = list.map(i => {
                if (time < i.signup_deadline) {
                    i.state = 0
                    return i
                } else if (i.signup_deadline < time < i.train_start) {
                    i.state = 1
                    return i
                } else if (i.train_start < time < i.train_end) {
                    i.state = 2
                    return i
                } else if (time > i.train_end) {
                    i.state = 3
                    return i
                }
            })
            // 设置课程状态
            await TrainService.setState(newList)

            res.status(200).send({
                message: '获取培训课程成功',
                data: newList,
                myList,
                customData: req.customData,
            })
        } catch (error) {
            res.status(500).send({
                error: error.message,
                customData: req.customData,
            })
        }
    },
    // 报名培训课程
    signUpCourse: async (req, res) => {
        const data = req.body
        data.create_time = Date.now()
        data.signup_count += 1
        try {
            await TrainService.plusCourseCount(data.course_id, data.signup_count)
            await TrainService.signUpCourse(data)
            res.status(201).send({
                message: '报名课程成功',
                customData: req.customData,
            })
        } catch (error) {
            res.status(500).send({
                error: error.message,
                customData: req.customData,
            })
        }
    },
    // 获取我报名的课程
    myCourseList: async (req, res) => {
        const { iden: student_number } = req.params
        try {
            const list = await TrainService.myCourseList(student_number)
            res.status(200).send({
                message: '报名课程查询成功',
                data: list,
                customData: req.customData,
            })
        } catch (error) {
            res.status(500).send({
                error: error.message,
                customData: req.customData,
            })
        }
    },
}

module.exports = TrainController
