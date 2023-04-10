// 连接数据库

const Sequelize = require('sequelize')

const sequelize = new Sequelize('jiangfeng_equipment_management', 'root', 'root123', {
    host: '127.0.0.1',
    dialect: 'mysql',
})

sequelize
    .authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err))

module.exports = sequelize
