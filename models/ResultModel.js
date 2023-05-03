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
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        use_results: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        book_date: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        submit_time: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'jf_equipment_result',
        // collate: 'zh_CN.UTF-8',
    }
)

module.exports = Equipment
