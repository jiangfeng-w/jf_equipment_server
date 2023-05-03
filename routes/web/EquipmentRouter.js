const express = require('express')
const EquipmentController = require('../../controllers/web/EquipmentController')

const router = express.Router()
// 获取设备预约列表
router.get('/web/equipment/getBookList/:date', EquipmentController.getHomeBookList)
// 获取设备列表
router.post('/web/equipment/list', EquipmentController.getEquipmentList)
// 获取设备信息--id
router.get('/web/equipment/equipdata/:id', EquipmentController.getEquipmentData)
// 获取设备预约情况--id
router.get('/web/equipment/book/:id', EquipmentController.getEquipmentBook)
// 预约设备
router.post('/web/equipment/book', EquipmentController.bookEquipment)

// 设备预约列表
router.post('/web/equipment/getBookList/:iden', EquipmentController.getBookList)
router.post('/web/equipment/getBookList', EquipmentController.getBookList)
// 取消预约
router.post('/web/book/cancel', EquipmentController.cancelBook)
// 使用完成
router.post('/web/book/useOutput', EquipmentController.useOutput)
module.exports = router
