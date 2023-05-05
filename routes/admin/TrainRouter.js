const express = require('express')
const TrainController = require('../../controllers/admin/TrainController')
const router = express.Router()

// 添加培训课程
router.post('/admin/train/addCourse', TrainController.addCourse)
// 培训课程列表
router.get('/admin/train/trainCourseList', TrainController.trainCourseList)
router.get('/admin/train/trainCourseList/:iden', TrainController.trainCourseList)

module.exports = router
