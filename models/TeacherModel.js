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
        academy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lab: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        train_student: {
            type: DataTypes.STRING,
            allowNull: true,
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
