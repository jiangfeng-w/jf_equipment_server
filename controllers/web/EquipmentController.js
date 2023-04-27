const EquipmentService = require('../../service/web/EquipmentService')

const EquipmentController = {
    // 获取设备列表
    getEquipmentList: async (req, res) => {
        const { pageSize = 12, currentPage = 1 } = req.body

        try {
            const list = await EquipmentService.getEquipmentList(pageSize, currentPage)
            res.status(200).send({
                message: '获取设备列表成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                error: err.message,
            })
        }
    },
    // 获取设备信息--id
    getEquipmentData: async (req, res) => {
        const { id } = req.params

        try {
            const data = await EquipmentService.getEquipmentData(id)
            res.status(200).send({
                message: '获取设备信息成功',
                data,
            })
        } catch (error) {
            res.status(500).send({
                error: err.message,
            })
        }
    },
}

module.exports = EquipmentController
