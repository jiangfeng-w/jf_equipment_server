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
        equip_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apply_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apply_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apply_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
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
        manager_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        test_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        book_date: {
            type: DataTypes.BIGINT,
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
        refuse_reason: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false,
        tableName: 'jf_equipment_book',
        // collate: 'zh_CN.UTF-8',
    }
)

module.exports = Equipment
