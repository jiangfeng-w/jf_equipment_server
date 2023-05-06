const EquipmentService = require('../../service/web/EquipmentService')

const EquipmentController = {
    // 获取设备预约列表
    getHomeBookList: async (req, res) => {
        const { date } = req.params
        try {
            // 设置预约状态过期
            await EquipmentService.setExpire(date)
            // 获取列表
            const list = await EquipmentService.getHomeBookList(date)
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
    // 获取首页热门设备排行榜
    getRangList: async (req, res) => {
        try {
            // 获取列表
            const list = await EquipmentService.getRangList()
            res.status(200).send({
                message: '获取排行榜成功',
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
            // 从培训表中查询出已经培训过的学生
            const list = await EquipmentService.getTrainedList(id)
            const trainedList = list.map(i => i.student_number)

            const data = await EquipmentService.getEquipmentBook(id)
            res.status(200).send({
                message: '获取设备预约情况成功',
                data,
                trainedList,
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
    // 获取设备预约列表
    getBookList: async (req, res) => {
        let iden
        if (req.params.iden) {
            iden = req.params.iden
        }
        try {
            const list = await EquipmentService.getBookList(iden)
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

    // 取消预约
    cancelBook: async (req, res) => {
        const { id } = req.body
        try {
            await EquipmentService.cancelBook(id)
            res.status(200).send({
                message: '预约取消成功',
                customData: req.customData,
            })
        } catch (error) {
            res.status(500).send({
                error: error.message,
                customData: req.customData,
            })
        }
    },
    // 使用完成
    useOutput: async (req, res) => {
        const {
            id: book_id,
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
            use_results,
        } = req.body
        const submit_time = Date.now()
        try {
            await EquipmentService.useOutput({
                book_id,
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
                use_results,
                submit_time,
            })
            res.status(201).send({
                message: '成果提交成功',
                customData: req.customData,
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).send({
                error: error.message,
                customData: req.customData,
            })
        }
    },

    // 成果列表
    getResultList: async (req, res) => {
        const { iden } = req.params
        try {
            const list = await EquipmentService.getResultList(iden)
            res.status(200).send({
                message: '获取产出成果列表成功',
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

module.exports = EquipmentController
