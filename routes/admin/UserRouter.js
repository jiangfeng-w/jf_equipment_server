const express = require('express')
const UserController = require('../../controllers/admin/UserController')
const multer = require('multer')
const avatar = multer({ dest: 'public/images/avatars/' })

const router = express.Router()

// // 检查token是否过期
// router.get('/admin/checkToken', () => {})

// 登录接口
router.post('/admin/user/login', UserController.login)
// 删除用户信息
router.post('/admin/user/delete', UserController.deleteUser)
// 获取用户信息
router.get('/admin/user/info', UserController.getUserInfo)

// 个人中心更新信息
router.post('/admin/user/changeOwnInfo', avatar.single('file'), UserController.changeOwnInfo)

// 添加学生
router.post('/admin/student/add', UserController.addStudent)
// 查询学生
router.get('/admin/student/list', UserController.getStudentList)
router.get('/admin/student/list/:id', UserController.getStudentList)
// 更改学生信息
router.post('/admin/student/changeInfo', UserController.changeStudentInfo)

// 添加老师
router.post('/admin/teacher/add', UserController.addTeacher)
// 查询老师
router.get('/admin/teacher/list', UserController.getTeacherList)
router.get('/admin/teacher/list/:id', UserController.getTeacherList)
// 更改老师信息
router.post('/admin/teacher/changeInfo', UserController.changeTeacherInfo)

// 添加设备管理员
router.post('/admin/admin/add', UserController.addAdmin)
// 查询设备管理员
router.get('/admin/admin/list', UserController.getAdminList)
router.get('/admin/admin/list/:id', UserController.getAdminList)
// 更改设备管理员信息
router.post('/admin/admin/changeInfo', UserController.changeAdminInfo)
// 删除设备管理员信息
// router.post('/admin/teacher/delete', UserController.deleteAdmin)
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
