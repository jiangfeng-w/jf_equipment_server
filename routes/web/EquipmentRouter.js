const express = require('express')
const EquipmentController = require('../../controllers/web/EquipmentController')

const router = express.Router()
// 获取设备列表
router.post('/web/equipment/list', EquipmentController.getEquipmentList)
// 获取设备信息--id
router.get('/web/equipment/equipdata/:id', EquipmentController.getEquipmentData)

module.exports = router
