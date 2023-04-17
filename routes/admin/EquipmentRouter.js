const express = require('express')
const EquipmentController = require('../../controllers/admin/EquipmentController')
const multer = require('multer')
const equipmentPic = multer({ dest: 'public/images/equipmentPics/' })

const router = express.Router()

router.post('/admin/equipment/add', equipmentPic.single('file'), EquipmentController.addEquipment)

module.exports = router
