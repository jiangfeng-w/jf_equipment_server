const express = require('express')
const UserController = require('../../controllers/web/UserController')

const router = express.Router()

// 登录接口
router.post('/web/user/login', UserController.login)

module.exports = router
