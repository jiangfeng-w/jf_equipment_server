const TrainService = require('../../service/web/TrainService')

const TrainController = {
    // 获取培训课程列表
    trainCourseList: async (req, res) => {
        try {
            const list = await TrainService.trainCourseList()
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
