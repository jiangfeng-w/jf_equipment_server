const { DataTypes } = require('sequelize')
const sequelize = require('../db/dbConfig')

const Equipment = sequelize.define(
    'Equipment',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price_range: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        buy_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        specification: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        manufacturer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        classification: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        discipline_classification: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        manage_classification: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        place: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        function_range: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        technical_indicators: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        manager_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manager_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manager_phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        maneger_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_appointment: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        is_repair: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        is_scrapped: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        create_time: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'jf_equipment',
        // collate: 'zh_CN.UTF-8',
    }
)

module.exports = Equipment
