const { DataTypes } = require('sequelize')
const sequelize = require('../db/dbConfig')

const Student = sequelize.define(
    'Student',
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_bind_email: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        academy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        major: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        degree: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        create_time: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'jf_student',
    }
)

module.exports = Student
