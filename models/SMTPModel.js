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
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        current: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        host: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        port: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'jf_smtp',
        // collate: 'zh_CN.UTF-8',
    }
)

module.exports = Equipment
