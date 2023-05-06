const { DataTypes } = require('sequelize')
const sequelize = require('../db/dbConfig')

const Course = sequelize.define(
    'Course',
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
        equip_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        project_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        train_content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        train_total_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        train_place: {
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
        manager_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        signup_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        signup_deadline: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        train_start: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        train_end: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tips: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        create_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'jf_train_course',
        // collate: 'zh_CN.UTF-8',
    }
)

module.exports = Course
