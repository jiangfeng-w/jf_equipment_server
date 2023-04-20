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
        manager_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manager_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reason_application: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        apply_time: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        approve_time: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
    },
    {
        timestamps: false,
        tableName: 'jf_equipment_scrap',
        // collate: 'zh_CN.UTF-8',
    }
)

module.exports = Equipment
