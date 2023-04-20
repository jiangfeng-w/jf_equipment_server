const EquipmentService = require('../../service/admin/EquipmentService')
const deleteEquipmentPic = require('../../utils/deleteEquipmentPic')

const EquipmentController = {
    // 添加设备
    addEquipment: async (req, res) => {
        // 把数据解构出来
        const {
            name,
            price,
            price_range,
            buy_time,
            model,
            specification,
            country,
            manufacturer,
            classification,
            discipline_classification,
            manage_classification,
            unit,
            place,
            function_range,
            technical_indicators,
            manager_number,
            manager_name,
            manager_phone_number,
            manager_email,
        } = req.body
        // 生成时间戳
        const create_time = Date.now()
        // 设备图片地址
        const pic = `http://localhost:3000/images/equipmentPics/${req.file.filename}`
        // 将数据传到service
        try {
            const result = await EquipmentService.addEquipment({
                name,
                price,
                price_range,
                buy_time,
                pic,
                model,
                specification,
                country,
                manufacturer,
                classification,
                discipline_classification,
                manage_classification,
                unit,
                place,
                function_range,
                technical_indicators,
                manager_number,
                manager_name,
                manager_phone_number,
                manager_email,
                create_time,
            })
            res.status(201).send({
                message: '设备添加成功',
            })
        } catch (error) {
            res.status(500).send({ error: '设备添加失败' })
        }
    },
    // 获取设备
    getEquipmentList: async (req, res) => {
        try {
            const list = await EquipmentService.getEquipmentList(req.params)
            res.status(200).send({
                message: req.params.iden ? '获取设备信息成功' : '获取设备列表成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: req.params.iden ? '获取设备信息失败' : '获取设备列表失败',
                error: err.message,
            })
        }
    },
    // 获取options
    getOptions: async (req, res) => {
        await EquipmentService.getOptions()
        try {
            const list = await EquipmentService.getOptions()
            res.status(200).send({
                message: '获取options成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: '获取options失败',
                error: err.message,
            })
        }
    },
    // 修改设备信息
    editEquipment: async (req, res) => {
        // 把数据解构出来
        const {
            id,
            name,
            price,
            price_range,
            buy_time,
            oldPic,
            model,
            specification,
            country,
            manufacturer,
            classification,
            discipline_classification,
            manage_classification,
            unit,
            place,
            function_range,
            technical_indicators,
            manager_number,
            manager_name,
            manager_phone_number,
            manager_email,
        } = req.body
        let pic
        if (!req.file) {
            // 如果没有上传文件，头像使用旧头像地址
            pic = oldPic
        } else {
            // 如果更改了头像,即有文件上传
            // 删除原来的头像
            deleteEquipmentPic(oldPic)
            // 头像地址
            pic = `http://localhost:3000/images/avatars/${req.file.filename}`
        }
        // 更改数据
        try {
            const result = await EquipmentService.editEquipment({
                id,
                name,
                price,
                price_range,
                buy_time,
                pic,
                model,
                specification,
                country,
                manufacturer,
                classification,
                discipline_classification,
                manage_classification,
                unit,
                place,
                function_range,
                technical_indicators,
                manager_number,
                manager_name,
                manager_phone_number,
                manager_email,
            })
            res.status(201).send({
                message: '设备信息修改成功',
            })
        } catch (error) {
            res.status(500).send({ error: '设备信息修改失败' })
        }
    },

    // 维修/报废申请
    application: async (req, res) => {
        try {
            if (req.body.state === 1) {
                // 维修申请
                const { id, name, manager_number, repair_person, manager_name, reason_application } = req.body
                // 申请时间
                const apply_time = Date.now()
                await EquipmentService.application(req.body)
                await EquipmentService.repair({
                    id,
                    name,
                    manager_number,
                    manager_name,
                    reason_application,
                    apply_time,
                    repair_person,
                    state: 0,
                })
            } else if (req.body.state === 3) {
                // 报废申请
                const { id, name, manager_number, manager_name, reason_application } = req.body
                // 申请时间
                const apply_time = Date.now()
                await EquipmentService.application(req.body)
                await EquipmentService.scrap({
                    id,
                    name,
                    manager_number,
                    manager_name,
                    reason_application,
                    apply_time,
                    state: 0,
                })
            }
            res.status(201).send({
                message: '申请成功',
            })
        } catch (error) {
            res.status(500).send({ error: `${error} 申请失败` })
        }
    },
}

module.exports = EquipmentController
