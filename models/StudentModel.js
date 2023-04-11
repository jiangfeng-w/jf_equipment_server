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
        trained: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        train_teacher: {
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
        tableName: 'jf_student',
    }
)

module.exports = Student
