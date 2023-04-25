const EquipmentService = require('../../service/admin/EquipmentService')
const deleteEquipmentPic = require('../../utils/deleteEquipmentPic')

const EquipmentController = {
    // 添加设备
    addEquipment: async (req, res) => {
        // 把数据解构出来
        const {
            name,
            price,
            price_range,
            buy_time,
            model,
            specification,
            country,
            manufacturer,
            classification,
            discipline_classification,
            manage_classification,
            unit,
            place,
            function_range,
            technical_indicators,
            manager_number,
            manager_name,
            manager_phone_number,
            manager_email,
        } = req.body
        // 生成时间戳
        const create_time = Date.now()
        // 设备图片地址
        const pic = `http://localhost:3000/images/equipmentPics/${req.file.filename}`
        // 将数据传到service
        try {
            const result = await EquipmentService.addEquipment({
                name,
                price,
                price_range,
                buy_time,
                pic,
                model,
                specification,
                country,
                manufacturer,
                classification,
                discipline_classification,
                manage_classification,
                unit,
                place,
                function_range,
                technical_indicators,
                manager_number,
                manager_name,
                manager_phone_number,
                manager_email,
                create_time,
            })
            res.status(201).send({
                message: '设备添加成功',
            })
        } catch (error) {
            res.status(500).send({ error: '设备添加失败' })
        }
    },
    // 获取列表长度
    getEquipmentListLength: async (req, res) => {
        let {
            iden,
            name = '',
            function_range = '',
            classification = [],
            discipline_classification = [],
            unit = [],
            country = [],
            price_range = [],
            buy_time = [],
            state = [],
        } = req.body
        try {
            const length = await EquipmentService.getEquipmentListLength(
                iden,
                name,
                function_range,
                classification,
                discipline_classification,
                unit,
                country,
                price_range,
                buy_time,
                state
            )
            res.status(200).send({
                message: '获取长度成功',
                data: length,
            })
        } catch (error) {
            res.status(500).send({
                message: '获取长度失败',
            })
        }
    },
    // 获取设备
    getEquipmentList: async (req, res) => {
        let {
            iden,
            name = '',
            function_range = '',
            classification = [],
            discipline_classification = [],
            unit = [],
            country = [],
            price_range = [],
            buy_time = [],
            state = [],
            pageSize = 5,
            currentPage = 1,
        } = req.body

        // 如果有iden
        if (req.params.iden) {
            iden = req.params.iden
        }

        try {
            const list = await EquipmentService.getEquipmentList(
                iden,
                name,
                function_range,
                classification,
                discipline_classification,
                unit,
                country,
                price_range,
                buy_time,
                state,
                pageSize,
                currentPage
            )
            res.status(200).send({
                message: req.params.iden ? '获取设备信息成功' : '获取设备列表成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: req.params.iden ? '获取设备信息失败' : '获取设备列表失败',
                error: err.message,
            })
        }
    },
    // 获取options
    getOptions: async (req, res) => {
        await EquipmentService.getOptions()
        try {
            const list = await EquipmentService.getOptions()
            res.status(200).send({
                message: '获取options成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: '获取options失败',
                error: err.message,
            })
        }
    },
    // 修改设备信息
    editEquipment: async (req, res) => {
        // 把数据解构出来
        const {
            id,
            name,
            price,
            price_range,
            buy_time,
            oldPic,
            model,
            specification,
            country,
            manufacturer,
            classification,
            discipline_classification,
            manage_classification,
            unit,
            place,
            function_range,
            technical_indicators,
            manager_number,
            manager_name,
            manager_phone_number,
            manager_email,
        } = req.body
        let pic
        if (!req.file) {
            // 如果没有上传文件，头像使用旧头像地址
            pic = oldPic
        } else {
            // 如果更改了头像,即有文件上传
            // 删除原来的头像
            deleteEquipmentPic(oldPic)
            // 头像地址
            pic = `http://localhost:3000/images/equipmentPics/${req.file.filename}`
        }
        // 更改数据
        try {
            const result = await EquipmentService.editEquipment({
                id,
                name,
                price,
                price_range,
                buy_time,
                pic,
                model,
                specification,
                country,
                manufacturer,
                classification,
                discipline_classification,
                manage_classification,
                unit,
                place,
                function_range,
                technical_indicators,
                manager_number,
                manager_name,
                manager_phone_number,
                manager_email,
            })
            res.status(201).send({
                message: '设备信息修改成功',
            })
        } catch (error) {
            res.status(500).send({ error: '设备信息修改失败' })
        }
    },

    // 维修/报废申请
    application: async (req, res) => {
        const { id, name, manager_number, manager_name, manager_email, reason_application } = req.body
        let pic = `http://localhost:3000/images/equipmentPics/${req.file.filename}`
        try {
            if (req.body.state == 1) {
                console.log('维修申请')
                // 维修申请
                // 申请时间
                const apply_time = Date.now()
                await EquipmentService.application(req.body)
                await EquipmentService.repair({
                    id,
                    name,
                    now_pic: pic,
                    manager_number,
                    manager_name,
                    manager_email,
                    reason_application,
                    apply_time,
                    repair_person: req.body.repair_person,
                    state: 0,
                })
            } else if (req.body.state == 4) {
                // 报废申请
                // 申请时间
                const apply_time = Date.now()
                await EquipmentService.application(req.body)
                await EquipmentService.scrap({
                    id,
                    name,
                    now_pic: pic,
                    manager_number,
                    manager_name,
                    manager_email,
                    reason_application,
                    apply_time,
                    state: 0,
                })
            }
            res.status(201).send({
                message: '申请成功',
            })
        } catch (error) {
            res.status(500).send({ error: `${error} 申请失败` })
        }
    },

    //#region 维修
    // 设备维修列表
    getRepairList: async (req, res) => {
        try {
            const list = await EquipmentService.getRepairList(req.params)
            res.status(200).send({
                message: req.params.iden ? '获取维修信息成功' : '获取维修列表成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: req.params.iden ? '获取维修信息失败' : '获取维修列表失败',
                error: err.message,
            })
        }
    },
    // 再次申请维修
    reApplyRepair: async (req, res) => {
        try {
            await EquipmentService.reApplyRepairEquip(req.body)
            await EquipmentService.reApplyRepair(req.body)
            res.status(201).send({
                message: '操作成功',
            })
        } catch (error) {
            res.status(500).send({ error: `${error} 操作失败` })
        }
    },
    // 维修完成/取消维修
    repairCompleted: async (req, res) => {
        try {
            // 删除图片
            deleteEquipmentPic(req.body.pic)
            await EquipmentService.repairCompletedEquip(req.body)
            await EquipmentService.repairCompleted(req.body)
            res.status(201).send({
                message: '操作成功',
            })
        } catch (error) {
            res.status(500).send({ error: `${error} 操作失败` })
        }
    },
    // 同意维修申请
    agreeRepair: async (req, res) => {
        // 审批时间
        const approve_time = Date.now()
        try {
            await EquipmentService.agreeRepairEquip(req.body)
            await EquipmentService.agreeRepair({ id: req.body.id, approve_time })
            res.status(201).send({
                message: '操作成功',
            })
        } catch (error) {
            res.status(500).send({ error: `${error} 操作失败` })
        }
    },
    // 拒绝维修申请
    refuseRepair: async (req, res) => {
        // 审批时间
        const approve_time = Date.now()
        try {
            await EquipmentService.refuseRepairEquip(req.body)
            await EquipmentService.refuseRepair({ id: req.body.id, approve_time })
            res.status(201).send({
                message: '操作成功',
            })
        } catch (error) {
            res.status(500).send({ error: `${error} 操作失败` })
        }
    },
    //#endregion

    //#region 报废
    // 设备报废列表
    getScrapList: async (req, res) => {
        try {
            const list = await EquipmentService.getScrapList(req.params)
            res.status(200).send({
                message: req.params.iden ? '获取报废信息成功' : '获取报废列表成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: req.params.iden ? '获取报废信息失败' : '获取报废列表失败',
                error: err.message,
            })
        }
    },
    // 再次申请报废
    reApplyScrap: async (req, res) => {
        try {
            await EquipmentService.reApplyScrapEquip(req.body)
            await EquipmentService.reApplyScrap(req.body)
            res.status(201).send({
                message: '操作成功',
            })
        } catch (error) {
            res.status(500).send({ error: `${error} 操作失败` })
        }
    },
    // 取消报废申请
    scrapCompleted: async (req, res) => {
        try {
            // 删除图片
            deleteEquipmentPic(req.body.pic)
            await EquipmentService.scrapCompletedEquip(req.body)
            await EquipmentService.scrapCompleted(req.body)
            res.status(201).send({
                message: '操作成功',
            })
        } catch (error) {
            res.status(500).send({ error: `${error} 操作失败` })
        }
    },
    // 同意报废申请
    agreeScrap: async (req, res) => {
        // 审批时间
        const approve_time = Date.now()
        try {
            await EquipmentService.agreeScrapEquip(req.body)
            await EquipmentService.agreeScrap({ id: req.body.id, approve_time })
            res.status(201).send({
                message: '操作成功',
            })
        } catch (error) {
            res.status(500).send({ error: `${error} 操作失败` })
        }
    },
    // 拒绝报废申请
    refuseScrap: async (req, res) => {
        // 审批时间
        const approve_time = Date.now()
        try {
            await EquipmentService.refuseScrapEquip(req.body)
            await EquipmentService.refuseScrap({ id: req.body.id, approve_time })
            res.status(201).send({
                message: '操作成功',
            })
        } catch (error) {
            res.status(500).send({ error: `${error} 操作失败` })
        }
    },
    //#endregion
}

module.exports = EquipmentController
