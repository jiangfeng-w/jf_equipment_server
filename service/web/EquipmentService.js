const EquipmentModel = require('../../models/EquipmentModel')
const BookModel = require('../../models/BookModel')
const ReaultModel = require('../../models/ResultModel')
const TrainModel = require('../../models/TrainModel')
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
    getEquipmentList: async (
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
            offset: (currentPage - 1) * pageSize,
            limit: pageSize,
        })
    },
    // 查询长度
    getEquipmentListLength: async (
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
    },
    // 获取options
    getOptions: async () => {
        // 国别
        const uniqueCountry = await EquipmentModel.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('country')), 'country']],
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
        // 所属单位
        const uniqueUnit = await EquipmentModel.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('unit')), 'unit']],
            raw: true,
        })

        // 合并
        const obj = {
            countrys: uniqueCountry.map(i => i.country),
            classifications: uniqueClassification.map(i => i.classification),
            discipline_classifications: uniqueDiscipline.map(i => i.discipline_classification),
            units: uniqueUnit.map(i => i.unit),
        }
        return obj
    },

    // 从培训表中获取已经培训的学生列表
    getTrainedList: async id => {
        // 获取设备名称
        const equip_name = await EquipmentModel.findOne({
            where: { id },
            attributes: ['name'],
        })
        // 再用设备名称在培训表找出所有培训完成的学生
        return TrainModel.findAll({
            where: {
                equip_name: equip_name.dataValues.name,
                state: 4,
            },
            attributes: ['student_number'],
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
