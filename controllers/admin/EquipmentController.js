const EquipmentService = require('../../service/admin/EquipmentService')

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
            maneger_email,
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
                maneger_email,
                create_time,
            })
            res.status(201).send({
                message: '设备添加成功',
            })
        } catch (error) {
            res.status(500).send({ error: '设备添加失败' })
        }
    },
}

module.exports = EquipmentController
