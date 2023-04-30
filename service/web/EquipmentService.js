const EquipmentModel = require('../../models/EquipmentModel')
const BookModel = require('../../models/BookModel')
const { Sequelize } = require('sequelize')
const { Op } = require('sequelize')

const EquipmentService = {
    // 获取设备预约列表
    getBookList: async () => {
        return BookModel.findAll({
            order: [['apply_time', 'DESC']],
        })
    },
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
    // 获取设备预约情况--id
    getEquipmentBook: async id => {
        return BookModel.findAll({
            where: {
                equip_id: id,
            },
            attributes: ['apply_number', 'book_date'],
        })
    },

    // 预约设备
    bookEquipment: async ({
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
        state,
    }) => {
        return BookModel.create({
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
            state,
        })
    },
}

module.exports = EquipmentService
