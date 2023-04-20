const express = require('express')
const EquipmentController = require('../../controllers/admin/EquipmentController')
const multer = require('multer')
const equipmentPic = multer({ dest: 'public/images/equipmentPics/' })

const router = express.Router()

// 添加设备
router.post('/admin/equipment/add', equipmentPic.single('file'), EquipmentController.addEquipment)
// 修改设备信息
router.post('/admin/equipment/edit', equipmentPic.single('file'), EquipmentController.editEquipment)
// 获取设备信息
router.get('/admin/equipment/list/:iden', EquipmentController.getEquipmentList)
router.get('/admin/equipment/list', EquipmentController.getEquipmentList)
// 获取options
router.get('/admin/equipment/options', EquipmentController.getOptions)
// 设备维修申请
router.post('/admin/equipment/application', EquipmentController.application)

module.exports = router
