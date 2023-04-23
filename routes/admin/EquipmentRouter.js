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

// 设备维修/报废申请
router.post('/admin/equipment/application', equipmentPic.single('file'), EquipmentController.application)

// 维修列表
router.get('/admin/equipment/repair/:iden', EquipmentController.getRepairList)
router.get('/admin/equipment/repair', EquipmentController.getRepairList)
// 再次申请维修
router.post('/admin/repair/reapply', EquipmentController.reApplyRepair)
// 维修完成/取消维修申请
router.post('/admin/repair/repaircompleted', EquipmentController.repairCompleted)
// 同意维修申请
router.post('/admin/repair/agree', EquipmentController.agreeRepair)
// 拒绝维修申请
router.post('/admin/repair/refuse', EquipmentController.refuseRepair)

// 报废列表
router.get('/admin/equipment/scrap/:iden', EquipmentController.getScrapList)
router.get('/admin/equipment/scrap', EquipmentController.getScrapList)
// 再次申请报废
router.post('/admin/scrap/reapply', EquipmentController.reApplyScrap)
// 取消报废申请
router.post('/admin/scrap/repaircompleted', EquipmentController.scrapCompleted)
// 同意报废申请
router.post('/admin/scrap/agree', EquipmentController.agreeScrap)
// 拒绝维修申请
router.post('/admin/scrap/refuse', EquipmentController.refuseScrap)

module.exports = router
