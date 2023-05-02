const EquipmentModel = require('../../models/EquipmentModel')
const RepairModel = require('../../models/RepairModel')
const ScrapModel = require('../../models/ScrapModel')
const BookModel = require('../../models/BookModel')
const { Sequelize } = require('sequelize')
const { Op } = require('sequelize')

const EquipmentService = {
    // 添加设备
    addEquipment: async data => {
        return EquipmentModel.create(data)
    },
    // 查询长度
    getEquipmentListLength: async (
        iden,
        name,
        function_range,
        classification,
        discipline_classification,
        unit,
        country,
        price_range,
        buy_time,
        state
    ) => {
        if (iden) {
            return EquipmentModel.count({
                where: {
                    manager_number: iden,
                    name: { [Op.like]: `%${name || ''}%` },
                    function_range: { [Op.like]: `%${function_range || ''}%` },
                    classification: classification.length ? { [Op.in]: classification } : { [Op.ne]: null },
                    discipline_classification: discipline_classification.length
                        ? { [Op.in]: discipline_classification }
                        : { [Op.ne]: null },
                    unit: unit.length ? { [Op.in]: unit } : { [Op.ne]: null },
                    country: country.length ? { [Op.in]: country } : { [Op.ne]: null },
                    price_range: price_range.length ? { [Op.in]: price_range } : { [Op.ne]: null },
                    state: state.length ? { [Op.in]: state } : { [Op.ne]: null },
                    buy_time: buy_time.length === 2 ? { [Op.between]: buy_time } : { [Op.ne]: null },
                },
            })
        } else {
            return EquipmentModel.count({
                where: {
                    name: { [Op.like]: `%${name || ''}%` },
                    function_range: { [Op.like]: `%${function_range || ''}%` },
                    classification: classification.length ? { [Op.in]: classification } : { [Op.ne]: null },
                    discipline_classification: discipline_classification.length
                        ? { [Op.in]: discipline_classification }
                        : { [Op.ne]: null },
                    unit: unit.length ? { [Op.in]: unit } : { [Op.ne]: null },
                    country: country.length ? { [Op.in]: country } : { [Op.ne]: null },
                    price_range: price_range.length ? { [Op.in]: price_range } : { [Op.ne]: null },
                    state: state.length ? { [Op.in]: state } : { [Op.ne]: null },
                    buy_time: buy_time.length === 2 ? { [Op.between]: buy_time } : { [Op.ne]: null },
                },
            })
        }
    },

    // 用id查询设备信息/查询全部设备
    getEquipmentList: async (
        iden,
        name,
        function_range,
        classification,
        discipline_classification,
        unit,
        country,
        price_range,
        buy_time,
        state,
        pageSize,
        currentPage
    ) => {
        if (iden) {
            // 用学工号查询
            if (iden.length === 12) {
                return EquipmentModel.findAll({
                    where: {
                        manager_number: iden,
                        name: { [Op.like]: `%${name || ''}%` },
                        function_range: { [Op.like]: `%${function_range || ''}%` },
                        classification: classification.length ? { [Op.in]: classification } : { [Op.ne]: null },
                        discipline_classification: discipline_classification.length
                            ? { [Op.in]: discipline_classification }
                            : { [Op.ne]: null },
                        unit: unit.length ? { [Op.in]: unit } : { [Op.ne]: null },
                        country: country.length ? { [Op.in]: country } : { [Op.ne]: null },
                        price_range: price_range.length ? { [Op.in]: price_range } : { [Op.ne]: null },
                        state: state.length ? { [Op.in]: state } : { [Op.ne]: null },
                        buy_time: buy_time.length === 2 ? { [Op.between]: buy_time } : { [Op.ne]: null },
                    },
                    order: [['manager_number', 'ASC']],
                    offset: (currentPage - 1) * pageSize,
                    limit: pageSize,
                })
            } else {
                // 用id查询单个设备
                return EquipmentModel.findOne({
                    where: { id: iden },
                })
            }
        } else {
            return EquipmentModel.findAll({
                where: {
                    name: { [Op.like]: `%${name || ''}%` },
                    function_range: { [Op.like]: `%${function_range || ''}%` },
                    classification: classification.length ? { [Op.in]: classification } : { [Op.ne]: null },
                    discipline_classification: discipline_classification.length
                        ? { [Op.in]: discipline_classification }
                        : { [Op.ne]: null },
                    unit: unit.length ? { [Op.in]: unit } : { [Op.ne]: null },
                    country: country.length ? { [Op.in]: country } : { [Op.ne]: null },
                    price_range: price_range.length ? { [Op.in]: price_range } : { [Op.ne]: null },
                    state: state.length ? { [Op.in]: state } : { [Op.ne]: null },
                    buy_time: buy_time.length === 2 ? { [Op.between]: buy_time } : { [Op.ne]: null },
                },
                order: [['manager_number', 'ASC']],
                offset: (currentPage - 1) * pageSize,
                limit: pageSize,
            })
        }
    },

    // 获取options
    getOptions: async () => {
        // 国别
        const uniqueCountry = await EquipmentModel.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('country')), 'country']],
            raw: true,
        })
        // 厂商
        const uniqueManufacturer = await EquipmentModel.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('manufacturer')), 'manufacturer']],
            raw: true,
        })
        // 设备分类
        const uniqueClassification = await EquipmentModel.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('classification')), 'classification']],
            raw: true,
        })
        // 学科分类
        const uniqueDiscipline = await EquipmentModel.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('discipline_classification')), 'discipline_classification'],
            ],
            raw: true,
        })
        // 管理分类
        const uniqueManage = await EquipmentModel.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('manage_classification')), 'manage_classification']],
            raw: true,
        })
        // 管理分类
        const uniqueUnit = await EquipmentModel.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('unit')), 'unit']],
            raw: true,
        })

        // 合并
        const obj = {
            countrys: uniqueCountry.map(i => i.country),
            manufacturers: uniqueManufacturer.map(i => i.manufacturer),
            classifications: uniqueClassification.map(i => i.classification),
            discipline_classifications: uniqueDiscipline.map(i => i.discipline_classification),
            manage_classifications: uniqueManage.map(i => i.manage_classification),
            units: uniqueUnit.map(i => i.unit),
        }
        return obj
    },
    // 修改信息
    editEquipment: async ({
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
    }) => {
        EquipmentModel.update(
            {
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
            },
            {
                where: {
                    id,
                },
            }
        )
    },

    // 维修/报废申请  改变主表
    application: async ({ id, state, reason_application }) => {
        return EquipmentModel.update({ state, reason_application }, { where: { id } })
    },
    // 改变维修表
    repair: async ({
        id,
        name,
        now_pic,
        manager_number,
        manager_name,
        manager_email,
        reason_application,
        repair_person,
        apply_time,
        state,
    }) => {
        return RepairModel.create({
            id,
            name,
            now_pic,
            manager_number,
            manager_name,
            manager_email,
            reason_application,
            repair_person,
            apply_time,
            state,
        })
    },
    // 改变报废表
    scrap: async ({
        id,
        name,
        now_pic,
        manager_number,
        manager_name,
        manager_email,
        reason_application,
        apply_time,
        state,
    }) => {
        return ScrapModel.create({
            id,
            name,
            now_pic,
            manager_number,
            manager_name,
            manager_email,
            reason_application,
            apply_time,
            state,
        })
    },

    //#region 维修
    // 设备维修列表
    getRepairList: async ({ iden }) => {
        if (iden) {
            // 用学工号查询
            if (iden.length === 12) {
                return RepairModel.findAll({
                    where: { manager_number: iden },
                })
            } else {
                // 用id查询单个设备
                return RepairModel.findOne({
                    where: { id: iden },
                })
            }
        } else {
            return RepairModel.findAll()
        }
    },
    // 再次申请维修
    reApplyRepairEquip: async ({ id }) => {
        return EquipmentModel.update({ state: 1 }, { where: { id } })
    },
    reApplyRepair: async ({ id }) => {
        return RepairModel.update({ state: 0 }, { where: { id } })
    },
    // 维修完成/取消维修
    repairCompletedEquip: async ({ id }) => {
        return EquipmentModel.update({ reason_application: '', state: 0 }, { where: { id } })
    },
    repairCompleted: async ({ id }) => {
        return RepairModel.destroy({ where: { id } })
    },
    // 同意维修申请
    agreeRepairEquip: async ({ id }) => {
        return EquipmentModel.update({ state: 3 }, { where: { id } })
    },
    agreeRepair: async ({ id, approve_time }) => {
        return RepairModel.update({ state: 2, approve_time }, { where: { id } })
    },
    // 拒绝维修申请
    refuseRepairEquip: async ({ id }) => {
        return EquipmentModel.update({ state: 2 }, { where: { id } })
    },
    refuseRepair: async ({ id, approve_time }) => {
        return RepairModel.update({ state: 1, approve_time }, { where: { id } })
    },
    //#endregion

    //#region 报废
    // 设备报废列表
    getScrapList: async ({ iden }) => {
        if (iden) {
            // 用学工号查询
            if (iden.length === 12) {
                return ScrapModel.findAll({
                    where: { manager_number: iden },
                })
            } else {
                // 用id查询单个设备
                return ScrapModel.findOne({
                    where: { id: iden },
                })
            }
        } else {
            return ScrapModel.findAll()
        }
    },
    // 再次申请维修
    reApplyScrapEquip: async ({ id }) => {
        return EquipmentModel.update({ state: 1 }, { where: { id } })
    },
    reApplyScrap: async ({ id }) => {
        return ScrapModel.update({ state: 0 }, { where: { id } })
    },
    // 取消报废申请
    scrapCompletedEquip: async ({ id }) => {
        return EquipmentModel.update({ reason_application: '', state: 0 }, { where: { id } })
    },
    scrapCompleted: async ({ id }) => {
        return ScrapModel.destroy({ where: { id } })
    },
    // 同意报废申请
    agreeScrapEquip: async ({ id }) => {
        return EquipmentModel.update({ state: 6 }, { where: { id } })
    },
    agreeScrap: async ({ id, approve_time }) => {
        return ScrapModel.update({ state: 2, approve_time }, { where: { id } })
    },
    // 拒绝报废申请
    refuseScrapEquip: async ({ id }) => {
        return EquipmentModel.update({ state: 5 }, { where: { id } })
    },
    refuseScrap: async ({ id, approve_time }) => {
        return ScrapModel.update({ state: 1, approve_time }, { where: { id } })
    },
    //#endregion

    //#region 设备预约
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
    // 首页预约列表
    getHomeBookList: async date => {
        return BookModel.findAll({
            where: {
                state: { [Op.ne]: 4 },
                book_date: {
                    [Op.gte]: date,
                },
            },
            order: [['apply_time', 'DESC']],
            offset: 0,
            limit: 10,
        })
    },
    getBookList: async iden => {
        if (iden && iden.length === 12) {
            return BookModel.findAll({
                where: { manager_number: iden },
                order: [
                    ['state', 'ASC'],
                    ['apply_time', 'DESC'],
                ],
            })
        } else {
            return BookModel.findAll({
                order: [['apply_time', 'DESC']],
                offset: 0,
                limit: 10,
            })
        }
    },
    // 同意报废申请
    agreeBook: async (id, approve_time) => {
        return BookModel.update({ state: 2, approve_time }, { where: { id } })
    },
    // 添加预约次数
    agreeBookEquip: async id => {
        return EquipmentModel.increment({ borrow_count: 1 }, { where: { id } })
    },
    // 拒绝报废申请
    refuseBook: async (id, approve_time) => {
        return BookModel.update({ state: 1, approve_time }, { where: { id } })
    },

    //#endregion
}

module.exports = EquipmentService
