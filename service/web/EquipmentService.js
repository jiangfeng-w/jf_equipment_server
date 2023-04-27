const EquipmentModel = require('../../models/EquipmentModel')
const { Sequelize } = require('sequelize')
const { Op } = require('sequelize')

const EquipmentService = {
    // 获取设备列表
    getEquipmentList: async (pageSize, currentPage) => {
        return EquipmentModel.findAll({
            order: [['manager_number', 'ASC']],
            offset: (currentPage - 1) * pageSize,
            limit: pageSize,
        })
    },
    // 获取设备信息--id
    getEquipmentData: async id => {
        return EquipmentModel.findOne({
            where: {
                id,
            },
        })
    },
}

module.exports = EquipmentService
