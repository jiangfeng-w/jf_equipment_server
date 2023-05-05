const express = require('express')
const TrainController = require('../../controllers/admin/TrainController')
const router = express.Router()

// 添加培训课程
router.post('/admin/train/addCourse', TrainController.addCourse)

module.exports = router
