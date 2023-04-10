const { DataTypes } = require('sequelize')
const sequelize = require('../db/dbConfig')

const User = sequelize.define(
    'User',
    {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        user_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_gender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_create_time: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'jf_users',
    }
)

module.exports = User
