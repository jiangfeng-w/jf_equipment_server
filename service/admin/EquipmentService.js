const EquipmentModel = require('../../models/EquipmentModel')

const EquipmentService = {
    // 添加设备
    addEquipment: async data => {
        return EquipmentModel.create(data)
    },
}

module.exports = EquipmentService
