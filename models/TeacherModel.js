const { DataTypes } = require('sequelize')
const sequelize = require('../db/dbConfig')

const Teacher = sequelize.define(
    'Teacher',
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
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
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
        lab: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        create_time: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'jf_teacher',
    }
)

module.exports = Teacher
