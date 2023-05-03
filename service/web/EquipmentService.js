const EquipmentModel = require('../../models/EquipmentModel')
const BookModel = require('../../models/BookModel')
const ReaultModel = require('../../models/ResultModel')
const { Sequelize } = require('sequelize')
const { Op } = require('sequelize')

const EquipmentService = {
    // 设置预约设备过期
    setExpire: async date => {
        return BookModel.update(
            { state: 4 },
            {
                where: {
                    book_date: {
                        [Op.lt]: date,
                    },
                    state: 0,
                },
            }
        )
    },
    // 获取首页热门设备排行榜
    getRangList: async () => {
        return EquipmentModel.findAll({
            order: [['borrow_count', 'DESC']],
            offset: 0,
            limit: 10,
            attributes: ['name', 'borrow_count'],
        })
    },

    // 首页设备预约列表
    getHomeBookList: async date => {
        return BookModel.findAll({
            where: {
                // state: { [Op.ne]: 4 },
                state: {
                    [Op.in]: [0, 1, 2],
                },
                book_date: {
                    [Op.gte]: date,
                },
            },
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
                state: {
                    [Op.in]: [0, 1],
                },
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
    // 设备预约列表
    getBookList: async iden => {
        if (iden && iden.length === 12) {
            return BookModel.findAll({
                where: { apply_number: iden },
                order: [['apply_time', 'DESC']],
            })
        } else {
            return BookModel.findAll({
                order: [['apply_time', 'DESC']],
            })
        }
    },

    // 取消预约
    cancelBook: async id => {
        return BookModel.update({ state: 5 }, { where: { id } })
    },
    // 使用完成——成果提交
    useOutput: async ({
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
    }) => {
        BookModel.update({ state: 3 }, { where: { id: book_id } })
        return ReaultModel.create({
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
    },

    // 成果列表
    getResultList: async iden => {
        return ReaultModel.findAll({
            where: { apply_number: iden },
            // order: [['id', 'DESC']],
        })
    },
}

module.exports = EquipmentService
