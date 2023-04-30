const express = require('express')
const UserController = require('../../controllers/web/UserController')

const router = express.Router()

// 登录接口
router.post('/web/user/login', UserController.login)
// 发送邮件
router.post('/web/sendEmail', UserController.sendEmail)
// 学生绑定邮箱
router.post('/web/student/bindEmail', UserController.bindEmail)

module.exports = router
