const express = require('express')
const TrainController = require('../../controllers/web/TrainController')
const router = express.Router()

// 获取培训课程列表
router.get('/web/train/trainCourseList/:iden', TrainController.trainCourseList)
// 报名培训课程
router.post('/web/train/signUpCourse', TrainController.signUpCourse)
// 获取我报名的课程列表
router.get('/web/train/myCourseList/:iden', TrainController.myCourseList)

module.exports = router
