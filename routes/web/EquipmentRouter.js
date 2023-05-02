const express = require('express')
const EquipmentController = require('../../controllers/web/EquipmentController')

const router = express.Router()
// 获取设备预约列表
router.get('/web/equipment/getBookList/:date', EquipmentController.getBookList)
// 获取设备列表
router.post('/web/equipment/list', EquipmentController.getEquipmentList)
// 获取设备信息--id
router.get('/web/equipment/equipdata/:id', EquipmentController.getEquipmentData)
// 获取设备预约情况--id
router.get('/web/equipment/book/:id', EquipmentController.getEquipmentBook)
// 预约设备
router.post('/web/equipment/book', EquipmentController.bookEquipment)

module.exports = router
