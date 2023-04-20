const EquipmentModel = require('../../models/EquipmentModel')
const RepairModel = require('../../models/RepairModel')
const ScrapModel = require('../../models/ScrapModel')
const { Sequelize } = require('sequelize')

const EquipmentService = {
    // 添加设备
    addEquipment: async data => {
        return EquipmentModel.create(data)
    },
    // 用id查询设备信息
    getEquipmentList: async ({ iden }) => {
        if (iden) {
            // 用学工号查询
            if (iden.length === 12) {
                return EquipmentModel.findAll({
                    where: { manager_number: iden },
                })
            } else {
                // 用id查询单个设备
                return EquipmentModel.findOne({
                    where: { id: iden },
                })
            }
        } else {
            return EquipmentModel.findAll()
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
        manager_number,
        manager_name,
        reason_application,
        repair_person,
        apply_time,
        state,
    }) => {
        return RepairModel.create({
            id,
            name,
            manager_number,
            manager_name,
            reason_application,
            repair_person,
            apply_time,
            state,
        })
    },
    // 改变报废表
    scrap: async ({ id, name, manager_number, manager_name, reason_application, apply_time, state }) => {
        return ScrapModel.create({
            id,
            name,
            manager_number,
            manager_name,
            reason_application,
            apply_time,
            state,
        })
    },
}

module.exports = EquipmentService
