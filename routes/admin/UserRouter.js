const express = require('express')
const UserController = require('../../controllers/admin/UserController')
// const multer = require('multer')
// const upload = multer({ dest: 'public/images/avatars/' })

const router = express.Router()

// 检查token是否过期
router.get('/admin/user/checkToken', () => {})

// 登录接口
router.post('/admin/user/login', UserController.login)
// 添加学生
router.post('/admin/student/add', UserController.addStudent)
// 查询学生
router.get('/admin/student/list', UserController.getStudentList)
router.get('/admin/student/list/:id', UserController.getStudentList)
// 更改学生信息
router.post('/admin/student/changeInfo', UserController.changeStudentInfo)
// 删除学生信息
router.post('/admin/student/delete', UserController.deleteStudent)

// // 更新信息
// router.post('/admin/user/upload', upload.single('file'), UserController.upload)
// // 修改密码
// router.post('/admin/user/changePass', UserController.changePass)

// // 用户列表的增删改查
// router.get('/admin/user/list/', UserController.getList)
// router.get('/admin/user/list/:id', UserController.getList)
// // 增
// router.post('/admin/user/add', upload.single('file'), UserController.add)
// // 删
// router.put('/admin/user/list/:id', UserController.delList)
// // 改
// router.put('/admin/user/list/:id', UserController.putList)

module.exports = router
