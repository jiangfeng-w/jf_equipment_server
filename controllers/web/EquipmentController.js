const EquipmentService = require('../../service/web/EquipmentService')

const EquipmentController = {
    // 获取设备预约列表
    getBookList: async (req, res) => {
        try {
            const list = await EquipmentService.getBookList()
            res.status(200).send({
                message: '获取设备预约列表成功',
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
    // 获取设备列表
    getEquipmentList: async (req, res) => {
        const { pageSize = 12, currentPage = 1 } = req.body

        try {
            const list = await EquipmentService.getEquipmentList(pageSize, currentPage)
            res.status(200).send({
                message: '获取设备列表成功',
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
    // 获取设备信息--id
    getEquipmentData: async (req, res) => {
        const { id } = req.params

        try {
            const data = await EquipmentService.getEquipmentData(id)
            res.status(200).send({
                message: '获取设备信息成功',
                data,
                customData: req.customData,
            })
        } catch (error) {
            res.status(500).send({
                error: error.message,
                customData: req.customData,
            })
        }
    },
    // 获取设备预约情况
    getEquipmentBook: async (req, res) => {
        const { id } = req.params

        try {
            const data = await EquipmentService.getEquipmentBook(id)
            res.status(200).send({
                message: '获取设备预约情况成功',
                data,
                customData: req.customData,
            })
        } catch (error) {
            res.status(500).send({
                error: error.message,
                customData: req.customData,
            })
        }
    },

    // 预约设备
    bookEquipment: async (req, res) => {
        const {
            equip_id,
            name,
            pic,
            apply_number,
            apply_name,
            apply_email,
            role,
            manager_number,
            manager_name,
            manager_email,
            test_content,
            book_date,
        } = req.body
        // 申请时间
        const apply_time = Date.now()
        try {
            await EquipmentService.bookEquipment({
                equip_id,
                name,
                pic,
                apply_number,
                apply_name,
                apply_email,
                role,
                manager_number,
                manager_name,
                manager_email,
                test_content,
                book_date,
                apply_time,
                state: 0,
            })
            res.status(201).send({
                message: '预约设备申请成功',
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

module.exports = EquipmentController
