const express = require('express')
const UserController = require('../../controllers/web/UserController')
const multer = require('multer')
const avatar = multer({ dest: 'public/images/avatars/' })

const router = express.Router()

// 登录接口
router.post('/web/user/login', UserController.login)
// 个人中心更新信息
router.post('/web/changeOwnInfo', avatar.single('file'), UserController.changeOwnInfo)
// 个人中心更改密码
router.post('/web/changePass', UserController.changePass)
// 发送邮件
router.post('/web/sendEmail', UserController.sendEmail)
// 学生绑定邮箱
router.post('/web/student/bindEmail', UserController.bindEmail)
// 忘记密码重置
router.post('/web/resetPass', UserController.resetPass)

module.exports = router
