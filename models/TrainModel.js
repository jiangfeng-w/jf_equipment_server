const { DataTypes } = require('sequelize')
const sequelize = require('../db/dbConfig')

const Train = sequelize.define(
    'Train',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        student_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        student_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        student_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        academy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        major: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        approval_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tips: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        course_state: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        course_tips: {
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
        tableName: 'jf_train_student',
        // collate: 'zh_CN.UTF-8',
    }
)

module.exports = Train
