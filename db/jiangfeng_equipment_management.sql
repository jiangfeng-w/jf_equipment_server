/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : jiangfeng_equipment_management

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 07/05/2023 10:33:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for jf_admin
-- ----------------------------
DROP TABLE IF EXISTS `jf_admin`;
CREATE TABLE `jf_admin`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'id',
  `number` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学工号',
  `name` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '姓名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `phone_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号码',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
  `email_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '验证码',
  `academy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学院',
  `lab` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '所属实验室',
  `role` smallint(0) NOT NULL DEFAULT 2 COMMENT '系统管理员',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' COMMENT '头像',
  `create_time` bigint(13) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000000000000 COMMENT '时间戳',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_admin_name`(`name`) USING BTREE,
  INDEX `fk_admin_number`(`number`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_admin
-- ----------------------------
INSERT INTO `jf_admin` VALUES ('01e00c03-bf24-422c-822f-1870ae3297e1', '201931061459', '周明天', '$2b$10$0fHTWdY7slqjLrqvZqigg.usHqAmeV4JdxymXOX5NUTRZLclaxSoW', '16654546546', '354562136@qq.com', NULL, '石油与天然气工程学院', '石工院_实验室B', 2, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', 1682396098532);
INSERT INTO `jf_admin` VALUES ('4785d959-c09a-4784-8b72-bb50451f0b65', '201931061457', '周俊威', '$2b$10$Y.yW37ZWa/2YTLIot40S8eYD7HUHbbkdFLEw85gVk5I8IoAPSZKjS', '19828928560', '2814936441@qq.com', 'BB6272', '计算机科学学院', '计科院_实验室B', 2, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', 1681730173744);
INSERT INTO `jf_admin` VALUES ('6b86b358-3994-4747-90a8-00790a697eb0', '201931061458', '李淳', '$2b$10$A6X0L04ZkOfkD19Ep.5mzuqmilZvQ7sXb6DmAb7CbG4l/0z/9uPeK', '16454546546', '165456213@qq.com', NULL, '石油与天然气工程学院', '石工院_实验室B', 2, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', 1682396069036);
INSERT INTO `jf_admin` VALUES ('7ddcdb75-5dea-466b-b35a-a32f80413b43', '201931061456', '胡伟', '$2b$10$Bx5NPqpj0PxVafl9lGBc8uNkQ0WrPcAkL0887g3Gv.sp2hm8gz86C', '15892332354', '1076048708@qq.com', NULL, '计算机科学学院', '计科院_实验室A', 2, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', 1681730044159);
INSERT INTO `jf_admin` VALUES ('c0369c7f-6fc0-4771-a3c9-8c0b18723cd8', '201931061455', '王鸿博', '$2b$10$lW7t5ck48kCobD6hYGRgE.J9L.om1HoKloc.ZJrCpULpLlNQQioB2', '14679854654', '727329691@qq.com', '143146', '石油与天然气工程学院', '石工院_实验室B', 2, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', 1681827025287);

-- ----------------------------
-- Table structure for jf_equipment
-- ----------------------------
DROP TABLE IF EXISTS `jf_equipment`;
CREATE TABLE `jf_equipment`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT '设备id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备名称',
  `price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备价格',
  `price_range` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备价格区间',
  `buy_time` bigint(13) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000000000000 COMMENT '设备购置的时间 (时间戳)',
  `pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'https://jfpicgo.oss-cn-chengdu.aliyuncs.com/test/%E8%AE%BE%E5%A4%87%E5%9B%BE.jpg' COMMENT '设备图片',
  `manager_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备负责人（设备管理员学工号）',
  `manager_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备负责人（设备管理员姓名）',
  `manager_phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '负责人手机号',
  `manager_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '负责人邮箱',
  `model` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备型号',
  `specification` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备规格',
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备的产地国家',
  `manufacturer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备生产厂商',
  `classification` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备分类',
  `discipline_classification` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备学科分类',
  `manage_classification` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备管理分类',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备所属单位',
  `place` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备安置地点',
  `function_range` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备功能应用范围',
  `technical_indicators` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备主要技术指标',
  `reason_application` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '申请理由',
  `state` smallint(0) NOT NULL DEFAULT 0 COMMENT '设备状态\r\n0:正常状态-可预约\r\n1:维修申请状态\r\n2:维修申请未通过\r\n3:维修状态\r\n4:报废申请状态\r\n5:报废申请未通过\r\n6.报废状态',
  `borrow_count` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '借用次数',
  `create_time` bigint(13) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000000000000 COMMENT '表单创建时间 (时间戳)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_equipment
-- ----------------------------
INSERT INTO `jf_equipment` VALUES (00000001, '红外光谱仪', '412376.14万', '20万-50万', 1298908800000, 'http://localhost:3000/images/equipmentPics/7ab4aca566752825b6b3c7c772d44af9', '201931061456', '胡伟', '15892332354', '1076048708@qq.com', 'Nicolet 6700', '配FW-4A型12吨压片机', '美国', 'Thermo Scientific(美国热电公司）', '特种检测仪器', '材料科学', '公共服务类', '新能源与材料学院', '成都校区', '红外光谱仪可用于研究分子的结构和化学键；也可以作为表征和鉴别化学物种的方法. 具有高度特征性,可以采用与标准化合物的红外光谱对比的方法来做分析鉴定.利用化学键的特征波数来鉴别化合物的类型,并可用于定量测定.可用于不同种类高分子材料的鉴别研究等', '1. 光谱范围：7800 - 350 cm-1。 2．分辨率：优于0.1 cm-1 3. 信噪比：优于45000:1（峰/峰值，4 cm-1分辨率，1分钟样品/背景扫描） 4. 光源：中远红外光源，空气冷却。 5. 红外分束器：KBr分束器（7800-350 cm-1） 6. 双红外检测器 ：KBr窗口的DLaTGS 检测器（12500-350 cm-1）、液氮冷却高灵敏度MCT-A检测器（12500-350 cm-1）， 7. 线性度：&lt;0.07%T （ASTM 1421方法） 8. 波数精度：优于0.01 cm-1', '', 0, 0, 1681735814399);
INSERT INTO `jf_equipment` VALUES (00000002, '实时荧光定量PCR仪', '360600.00万', '20万-50万', 1543766400000, 'http://localhost:3000/images/equipmentPics/8318b1de7367daf0899f1ae6ac5ab098', '201931061456', '胡伟', '15892332354', '1076048708@qq.com', 'CFX96 ，C1000 Tocuh', '1.1 样品容量：96孔 x 0.2ml, 可以使用单个反应管，8联管和96孔板1.2 样品+反应体积：1-50μ', '美国', '美国Bio-Rad', '', '环境科学技术及资源科学技术', '学术方向类', '化学化工学院', '成都校区明德楼A421(明德楼)', '可以做5ul反应体积的定量PCR实验，从而节省试剂成本。+1.3 升降温方式：采用半导体加热，制冷1.4 最大升温速度：5°C/秒。', '96孔，工作温度0-100°C', '', 0, 1, 1681736202913);
INSERT INTO `jf_equipment` VALUES (00000003, '微机伺服岩石三轴试验机', '415000.00万', '20万-50万', 1635696000000, 'http://localhost:3000/images/equipmentPics/0c28b4853f1d9d88373cf1eab526d5dd', '201931061456', '胡伟', '15892332354', '1076048708@qq.com', 'YSS-600', '含岩石切割机、钻心机、磨平机', '中国', '长沙亚星数控技术有限公司', '物理性能测试仪器', '地球科学', '学术方向类', '土木工程与测绘学院', '彩钢房', '微机伺服岩石三轴试验机，用于高应力、岩石试件在静荷载下的力学性质研究，可进行静荷载条件下的单轴全应力应变试验、三轴压缩试验、流变试验、疲劳试验以及加载过程中的实时声波检测，测定岩石的强度、变形指标和流变参数，获得试件单轴、三轴全应力-应变曲线及其波动性的变化规律。', '静态试验参数： 1、轴向最大试验力：0—600kN 2、轴向负荷精度：±1% 3、轴向活塞行程：±50mm 位移量测范围：±50mm 4、轴向位移精度：10-5 5、轴向变形量测量范围：0-10mm 6、轴向变形精度：10-5 7、轴向试验控制方式：力（应力）、变形（应变）、位移、保载时间、应力路径多级加载等多种 8、径向变形量测范围：0-5mm 9、径向变形量测精度：±0.5% 10、压力室可承受周围压力：10Mpa 11、周围压力精度：1级 12、试样尺寸：圆试样Φ50×100mm、Φ100×200mm 13、液压源： 13.1 系统压力21MPa，流量30L/min； 13.2 过滤精度5μ； 13.3 有超压保护、油污染报警、温升报警功能； 动态试验参数： 1、轴向最大试验力： （1）、静态负荷：0—600kN （2）、动态振幅值： 600kN 2、轴向负荷精度： （1）、静负荷精度：±1% （2）、动态平均负荷波动度：±1% （3）、动态负荷幅值波动度：±1% 3、轴向加载试验频率：0—10Hz（依试样的刚性而定） 4、轴向动态试验控制波形：正弦波、三角波、方波、随机波等多种 5、试样尺寸：圆试样Φ50×100mm、Φ100×200mm 6、液压源：', '', 0, 0, 1681736561146);
INSERT INTO `jf_equipment` VALUES (00000004, '多视域透反射偏光显微镜', '463664.00万', '20万-50万', 1386000000000, 'http://localhost:3000/images/equipmentPics/26f0a97c568a731f37edf64fbc215e4e', '201931061457', '周俊威', '19828928560', '2814936441@qq.com', 'LV100PO', '配偏光显微镜CCD', '日本', '日本尼康', '特种检测仪器', '地球科学', '公共服务类', '地球科学与技术学院', '成都明辨楼D503', '矿物、岩石的偏光特征、成分及结构组成；分析岩石的沉积、成岩环境、孔隙演化过程', '1倍、5倍、10倍、20倍、50倍', NULL, 0, 0, 1681737371802);
INSERT INTO `jf_equipment` VALUES (00000005, '偏光显微镜', '210000.00万', '20万-50万', 1070208000000, 'http://localhost:3000/images/equipmentPics/2540346015b978466007e7c2075ad53b', '201931061457', '周俊威', '19828928560', '2814936441@qq.com', 'BX51-P-DP12', '(BX51TRF)', '日本', '日本OLYMPUS光学株式会社', '特种检测仪器', '环境科学技术及资源科学技术', '教学类', '地球科学与技术学院', '成都明辩楼D513', '用于研究生教学、岩矿鉴定、沉积、成岩作用和储层研究。', '限远轴向和径向及空间三重色差校正；防止眩光的光陷阱技术；高级偏光暗黑背景', '', 0, 1, 1681737497335);
INSERT INTO `jf_equipment` VALUES (00000006, '太阳能电池制备集成系统', '1100000.00元', '100万-500万', 1524499200000, 'http://localhost:3000/images/equipmentPics/5a929505a34f6483a31b1fbbe0cf7f48', '201931061456', '胡伟', '15892332354', '1076048708@qq.com', '定制', '极限真空：小于等于8x10-3Pa量级，工作真空：进入10-2Pa量级，采用DC-等离子体部分：离子体轰击和对基片加热方式', '中国', '沈阳市超高真空应用技术研究所', '电子测量仪器', '材料科学', '学术方向类', '光伏产业技术研究院', '逸夫楼2楼光伏院', '制备钙钛矿薄膜电池，蒸镀有机材料和金属材料，旋涂薄膜材料', '设备整体泄漏率&lt;0.05vol%/h（ISO10648-2标准，Class1 级） 手套箱前后方安装有聚碳酸酯面板，每个前面板安装有2个手套孔和手套。手套孔圈采用聚甲醛材质。手套为丁基橡胶材质。 气体净化系统： 单柱气体净化系统，每个手套箱配置1个净化柱 净化柱可再生，自动再生程序。 可得气体纯度：H2O&lt;1ppm, O2&lt;1ppm 工作气体：氮气，氩气或氦气。 ▲再生气体：氮气/氢气混合气或者氩气/氢气混合气，再生程序可根据再生气中的氢气浓度调整（&lt;4% 或 &gt;4%氢气浓度对应不同再生程序）。', '', 0, 0, 1681825271935);
INSERT INTO `jf_equipment` VALUES (00000007, '激光粒度分析仪', '400707.86元', '20万-50万', 1220198400000, 'http://localhost:3000/images/equipmentPics/823f84edcd3a333681d9c73e3defaa5e', '201931061457', '周俊威', '19828928560', '2814936441@qq.com', 'Master sizer 2000', '', '英国', '英国马尔文仪器公司', '', '工程与技术科学基础学科', '公共服务类', '新能源与材料学院', '成都校区明德楼B213（明德楼）', '适用于乳化液、悬浮液和干粉的测量', '1.粒度测试范围：0.02-2000微米。 2.全量程采用激光衍射法和完全米氏理论，仪器无须校准，软件必须提供包含样品的折射率和吸收率的数据库。 3.测量速度: 要求扫描速度不低于1000次/秒, 测量速度用户可调。 4.重复性≤±0.5%， 准确性≤±1%。 5.光源：高稳定氦-氖激光器和独立固体蓝光光源。全套装置符合激光产品一级标准。 6.仪器光路：反傅立叶变换光学系统。 7.检测器：主检测器采用非均匀交叉面积补偿扇形排列技术，辅以前向、侧向、大角度和背向辅助检测器。 8.激光衍射光路检测角度：0？～135？，采用单镜头，无须更换镜头。 9.仪器的光学测量系统（主机）与样品分散系统完全独立。样品槽采用插入式设计，使得样品槽更换、样品池清洁更加方便、快捷。 10. 工作条件：220V±10%，50Hz，温度10～30℃, 湿度20-70% 符合ISO13320激光衍射粒度分析国际标准。', '', 0, 0, 1681826642269);
INSERT INTO `jf_equipment` VALUES (00000008, '阴极发光显微镜', '468710.00元', '20万-50万', 1220198400000, 'http://localhost:3000/images/equipmentPics/1235d082e83f8086643bf49c72a823df', '201931061455', '王鸿博', '14679854654', '727329691@qq.com', 'CL 8200 MK5', '', '英国', 'CAMBRIDGE IMAGE TECHNOLOGV LTD', '特种检测仪器', '地球科学', '公共服务类', '地球科学与技术学院', '成都明辨楼D601', '用于岩矿鉴定、储层矿物发光和生长的精确测定、胶结物世代分析。为储层预测、成岩史研究提供实验支持', '全自动电子束控制，高速响应真空阀电子控制，稳定的电子束流可达到30Kv的高压，2mA的最大束流，0.003 mBar的真空度。', '', 0, 0, 1681827493568);
INSERT INTO `jf_equipment` VALUES (00000009, '红外热成像系统', '537191.94元', '50万-100万', 1495123200000, 'http://localhost:3000/images/equipmentPics/8e005beab79ec5b21b561dd608434d25', '201931061455', '王鸿博', '14679854654', '727329691@qq.com', 'VanoCam-HD research980', '光谱响应范围: 7.5～14um测量精度: ± 1.5℃(0~100℃);±2%(<0 或>100℃)', '德国', 'InfraTec/德国英福泰克红外传感与测量技术公司', '特种检测仪器', '机械工程', '公共服务类', '机电工程学院', '成都校区明志楼B103（明志楼）', '物体表面温度测量', '1.非制冷微量热型焦平面探测器 2.★高灵敏度探测器规格: 1,024 x 768像素（非软件插值法）。 3.★ORI功能：可拍摄2,048 x 1,536像素高清红外热图（非软件插值法）。 4.光谱响应范围: 7.5～14um 5.★帧频：30Hz（满帧：1,024 x 768像素）；60 Hz (半帧：640 x 480像素) ；120 Hz (1/4帧：384 x 288像素)； 240 Hz (1.024 x 96像素)； 6.★标准测温范围:- 40～+ 2000°C 7.热灵敏度: 0.05oC@ 30 °C 8.测量精度: ± 1.5℃(0~100℃);±2%(&lt;0 或&gt;100℃) 9.调焦模式:手动,自动两种模式 10.5.6英寸液晶显示屏:显示分辨率1,280 x 800像素;带翻转镜功能; 11.内置带有LED辅助照明灯的800万像素CMOS彩色数码相机 12.激光测距功能：有效范围：70m/波长：635nm（red）/激光等级：2级； 13.数字接口GigE-Vision', '', 0, 2, 1681828689615);
INSERT INTO `jf_equipment` VALUES (00000010, '微区形貌及原位多组分快速元素分析系统', '1993600.00元', '100万-500万', 1608048000000, 'http://localhost:3000/images/equipmentPics/0de622f471f22ba99eb8532ca1c18075', '201931061455', '王鸿博', '14679854654', '727329691@qq.com', '德国徕卡DM6M LIBS', '*1.含激光诱导击穿光谱技术，337nm紫外激光器，15um光斑，200-1100nm光谱系统,探测范围360-700nm；2.具备高倍光学放大倍率范围50x-1000x；3.软件为徕卡原厂原件，包含元素分析，金相组织分析，图像显示测量拍摄', '德国', 'Leica Microsystems CMS GmbH', '激光共焦显微镜', '地球科学', '学术方向类', '地球科学与技术学院', '成都校区明理楼C518', '黄铁矿等矿物形貌观察以及草莓状黄铁矿直径的统计。', '机身搭载大尺寸触摸屏，实时显示系统配置和状态，并可进行参数设置 ？ 全自动光源管理系统，自动调节光强，光澜大小，达到最佳观察结果 ？ 2000万像素原厂摄像头。全自动控制系统，所有操作均可在软件界面上完成。', '', 0, 0, 1681829025168);
INSERT INTO `jf_equipment` VALUES (00000011, '超低渗气体渗透率测量仪', '897600.00元', '50万-100万', 1434643200000, 'http://localhost:3000/images/equipmentPics/1a15094d5cb19df6efc03c35e0dd017d', '201931061458', '李淳', '16454546546', '165456213@qq.com', ' Low Gas Permeability Measuurement 700，ST RS 422 BL14F', '岩样直径 1\"和1-1/2\",岩样长度 3/4\"-3\",渗透率测量范围 0.00001mD-10mD+', '法国', 'Sanchez Technologies 桑切斯技术公司', '', '能源科学技术', '公共服务类', '油气藏地质及开发工程国家重点实验室', '成都校区国重A208-国重', '测量岩心渗透率（最低可测10nD）以及孔隙度', '岩样直径 1', NULL, 0, 0, 1682571687083);
INSERT INTO `jf_equipment` VALUES (00000012, '原位变温高压激光共聚焦显微拉曼光谱仪', ' 1640000.00元', '100万-500万', 1572969600000, 'http://localhost:3000/images/equipmentPics/1e1eecdc12bc387dad9c05984b151c03', '201931061458', '李淳', '16454546546', '165456213@qq.com', 'LabRam HR Evolution', 'LabRAM HR Evolution完全集成型共焦显微拉曼系统。可实现全自动。该系统包括一个800毫米焦长的Czer', '法国', '堀场中国贸易有限公司HORIBA FRANCE SAS', '特种检测仪器', '矿山工程技术', '公共服务类', '海洋天然气水合物研究院', '水合物实验室303', '用于水合物测试、烃类检测、矿物鉴定、包裹体试验、宝石鉴定等', '473、633两组激光器；光谱范围：220nm～2200nm；光谱分辨率：0.35cm-1/pixel；-180～600℃冷热台；光纤探头；LabSpec软件包', NULL, 0, 0, 1682571826427);
INSERT INTO `jf_equipment` VALUES (00000013, '分散稳定性分析仪', '248094.62元', '20万-50万', 0928166400000, 'http://localhost:3000/images/equipmentPics/fd23a46ba6b558a7f4384103edfed8f2', '201931061458', '李淳', '16454546546', '165456213@qq.com', ' MA2000', '', '法国', ' 法国劳雷公司', '', '能源科学技术', '学术方向类', '石油与天然气工程学院', '成都国重楼A309', '分析和测定钻井液（或油井工作液）的稳定状况', '红外光源：850nm样品扫描高度：65mm', '', 0, 0, 1682571926731);
INSERT INTO `jf_equipment` VALUES (00000014, '增压稠化仪', '296000.00元', '20万-50万', 1246377600000, 'http://localhost:3000/images/equipmentPics/e0df5a5fc10186bdc1a6969198e983a3', '201931061459', '周明天', '16654546546', '354562136@qq.com', ' OWC-9380', '200MPa 250℃', '中国', '沈阳航空工业学院应用技术研究所', '', '材料科学', '科研经费购置类', '新能源与材料学院', '成都校区成都校区明德楼B103（明德楼）', '本仪器是严格按照GB10238-1998和美国石油学会API规范10的要求进行设计制造的，是测定油井水泥浆稠化时间的仪器。增压稠化仪主要由高压釜、磁力传动装置、超高压气驱液压泵、液压管路系统、釜盖起吊装置、稠度测量显示及报警系统、温度和压力控制系统、电器控制系统、不锈钢机箱、加热器、冷却水、压缩空气系统等组成。', '最高工作温度250℃；最高压力200MPa；最高工作压力200MPa；输入电压单相 220V /50Hz；输入最大功率5kw； ；热器功率4kw；浆杯转速150r/min±15r/min；升温速率：≤3℃/min（37°F/min）；稠度测量范围0-100Bc；外形尺寸：85X75X170㎝3 ；环境温度10-40℃；环境湿度≤70%RH；冷却水压0.2~0.6MPa(30~85psi)；压缩空气0.5~0.8MPa(70~120psi)；总重量：600㎏', NULL, 0, 0, 1682572078278);
INSERT INTO `jf_equipment` VALUES (00000015, '场发射扫描电镜', '2310585.22元', '100万-500万', 1526832000000, 'http://localhost:3000/images/equipmentPics/6cc441f941d0df579833d3b64719f74f', '201931061459', '周明天', '16654546546', '354562136@qq.com', 'FEI Quanta 650 FEG', '高分辨高稳定性Schottky场发射电子枪，自动操作。物镜光阑系统具有自动清+洁功能。高真空二次电子像分辨率：30kv下优于1.0nm（SE)', '', 'FEI Czech Republic S.r.o', '特种检测仪器', '地球科学', '公共服务类', '地球科学与技术学院', '成都校区明辨楼A110（明辨楼）', 'SE、CBS、EDS', '3.2.1 高真空模式分辨率 3.2.1.1 高真空二次电子像分辨率：30kv下优于1.0nm（SE）； 3.2.1.2高真空二次电子像分辨率：1kV下优于3.0nm（SE）；1kV下2.3nm（SE）（配镜筒内探头ICD）； 3.2.1.3 高真空背散射像分辨率：2.5 nm（BSE）。 3.2.2 低真空模式分辨率： 3.2.2.1低真空二次电子像分辨率：30 kV下为1.4nm ； 3.2.2.2低真空二次电子像分辨率3 kV下为3.0 nm（SE） 3.2.2.3 低真空，背散射像辨率：为2.5 nm（BSE）。 3.2.3超低真空（4000Pa）模式（即环境真空ESEM）分辨率：二次电子像分辨率：30kV下1.4nm（SE）；', NULL, 0, 0, 1682573639182);
INSERT INTO `jf_equipment` VALUES (00000016, '水环境碳氮综合测定仪', ' 384000.00元', '20万-50万', 1543766400000, 'http://localhost:3000/images/equipmentPics/7ee6f36a3d51dd9ec0d3614d98ac041b', '201931061459', '周明天', '16654546546', '354562136@qq.com', 'SHIMADZU TOC-LCP,SSM-5000AH', '', '日本', ' 日本岛津（SHIMADZU）', '', '环境科学技术及资源科学技术', '公共服务类', '化学化工学院', '成都校区明德楼A424(明德楼)', '1、采用720℃固定温度铂金催化燃烧氧化法，针对低分子量有机化合物，不溶+性及大分子有机化合物达到100%的氧化回收率。2、测量范围4μg/L~30000mg/L+；3、 能用于 TC，IC，TOC （= TC - IC）和 NPOC 测量；+选配能测定 POC（挥发性有机碳），TOC（通过 POC+ NPOC）以及 TN（总氮）测量（TNM-L）。', '液体样品TC,IC重复测量相对标准偏差&lt;1.5％ 液体样品需0.45um滤膜过滤，浓度在0~100ppm范围内', NULL, 0, 0, 1682573836380);
INSERT INTO `jf_equipment` VALUES (00000017, '高温高压岩石综合测试系统', '6541800.00元', '500万-1000万', 1633622400000, 'http://localhost:3000/images/equipmentPics/9b0239e0070208c2466709faf1931f69', '201931061459', '周明天', '16654546546', '354562136@qq.com', ' RTR-1500', '＊1.1加载方式：电液伺服闭环控制，静态最大加载力：1500kN；最大拉伸力：850kN； 1.2加载行程：50mm，位移精度：±0.25%； ＊1.3最大动态加载频率：10Hz；', '美国', 'Geotechnical Consulting&Testing Systems L.L.C', '', '', '公共服务类', '石油与天然气工程学院', '成都校区国重A108', '单轴压缩试验，三轴压缩试验，真三轴试验、巴西劈裂、循环应力加载、断裂韧性试验、声发射测试等', '围压：210MPa；孔压：210MPa；温度：常温-200度；静态最大加载力：1500kN；最大拉伸力：850kN；加载行程：50mm，位移精度：±0.25%；最大动态加载频率：10Hz', NULL, 0, 0, 1682574045253);
INSERT INTO `jf_equipment` VALUES (00000018, '扫描电子显微镜', '1678500.00元', '100万-500万', 1431360000000, 'http://localhost:3000/images/equipmentPics/98ebe1af3b6f601cf3d3fd1f93cf0886', '201931061456', '胡伟', '15892332354', '1076048708@qq.com', 'ZEISS EV0 MA15', ' 含：2个工作台、软件', '', '卡尔蔡司显微图像有限公司', '特种检测仪器', '环境科学技术及资源科学技术', '公共服务类', '新能源与材料学院', '成都校区成都校区明德楼B108（明德楼）', '二次电子可以观察表观形貌，大小，分布。背散射可以看元素分布，相分布，夹杂。 EDS可以做定性和定量成分测量，截面元素分布，线扫描，面扫描。 EBSD可以做相分布，相鉴定，织构，取向分布，应力分析等。', '图像放大倍数为5x到1,000,000x，并且连续可调；加速电压范围：0.2到30kV+，并以10V步长连续可调；图像分辨率：二次电子探头等', NULL, 0, 0, 1682603542785);
INSERT INTO `jf_equipment` VALUES (00000019, 'X射线衍射仪', '1665111.56元', '100万-500万', 1288540800000, 'http://localhost:3000/images/equipmentPics/056bbd092135c1129cac8b67202943d8', '201931061456', '胡伟', '15892332354', '1076048708@qq.com', 'X Pert PRO MPD', '', '荷兰', '荷兰帕纳科公司', '', '化学工程', '公共服务类', '化学化工学院', '成都校区明德楼A118(明德楼)', '晶体物质的物相分析，主要用于固体粉末样品测试', 'Cu靶，配有超能探测器和闪烁计数器，最低起始角度0.5度', NULL, 0, 1, 1682603706795);
INSERT INTO `jf_equipment` VALUES (00000020, '红外光谱仪', '412376.14元', '20万-50万', 1251734400000, 'http://localhost:3000/images/equipmentPics/4b6159d6b2c51852e341c6bf657503ac', '201931061455', '王鸿博', '14679854654', '727329691@qq.com', 'Nicolet 6700', '配FW-4A型12吨压片机', '美国', 'Thermo Scientific(美国热电公司）', '特种检测仪器', '材料科学', '公共服务类', '新能源与材料学院', '成都校区', '红外光谱仪可用于研究分子的结构和化学键；也可以作为表征和鉴别化学物种的方法. 具有高度特征性,可以采用与标准化合物的红外光谱对比的方法来做分析鉴定.利用化学键的特征波数来鉴别化合物的类型,并可用于定量测定.可用于不同种类高分子材料的鉴别研究等', '1. 光谱范围：7800 - 350 cm-1。 2．分辨率：优于0.1 cm-1 3. 信噪比：优于45000:1（峰/峰值，4 cm-1分辨率，1分钟样品/背景扫描） 4. 光源：中远红外光源，空气冷却。 5. 红外分束器：KBr分束器（7800-350 cm-1） 6. 双红外检测器 ：KBr窗口的DLaTGS 检测器（12500-350 cm-1）、液氮冷却高灵敏度MCT-A检测器（12500-350 cm-1）， 7. 线性度：&lt;0.07%T （ASTM 1421方法） 8. 波数精度：优于0.01 cm-1', NULL, 0, 1, 1682603853312);
INSERT INTO `jf_equipment` VALUES (00000021, '热分析仪', '540487.25元', '50万-100万', 1225468800000, 'http://localhost:3000/images/equipmentPics/c74cf9261e5d89055b97ab554469776a', '201931061455', '王鸿博', '14679854654', '727329691@qq.com', 'DSC823 TGA/SDTA85/e', '', '瑞士', '瑞士梅特勒-托利多', '', '', '公共服务类', '新能源与材料学院', '成都校区明德楼B212（明德楼）', '热分析仪可用于材料、化工、医药、生命、食品、能源等领域，用于测试和分析物质或过程的热事件，如：熔点、沸点、固相转变临界点、居里温度、玻璃转化温度、结晶时间、结晶温度、结晶度、融化热、反应热、多成分材料的组成、材料的热稳定性、材料氧化安定性、氧化诱导期、固化速度与程度、反应动力学、裂解动力学、水份和挥发物质的含量等。', '1.DSC 灵敏度：0.04μw 量热精度： ±0.1% 测量温度范围：-50~700℃ 温度精度：±0.02℃ 温度准确度：±0.1℃ 基线稳定性： 漂移小于±10μW（-100°C ~400°C） TAWN分辨/灵敏度：0.12/11.9 2.TAG 温度范围：室温~1600℃ 温度准确度：±0.25℃ 天平灵敏度：0.1μg', NULL, 0, 0, 1682603972268);
INSERT INTO `jf_equipment` VALUES (00000022, '场发射扫描电镜', '2310585.22元', '100万-500万', 1526832000000, 'http://localhost:3000/images/equipmentPics/6a07c0f04ecf661fa35b0e54c8c5e174', '201931061457', '周俊威', '19828928560', '2814936441@qq.com', 'FEI Quanta 650 FEG', '高分辨高稳定性Schottky场发射电子枪，自动操作。物镜光阑系统具有自动清+洁功能。高真空二次电子像分辨率：30kv下优于1.0nm（SE)', '', 'FEI Czech Republic S.r.o', '特种检测仪器', '地球科学', '公共服务类', '地球科学与技术学院', '成都校区明辨楼A110（明辨楼）', 'SE、CBS、EDS', '3.2.1 高真空模式分辨率 3.2.1.1 高真空二次电子像分辨率：30kv下优于1.0nm（SE）； 3.2.1.2高真空二次电子像分辨率：1kV下优于3.0nm（SE）；1kV下2.3nm（SE）（配镜筒内探头ICD）； 3.2.1.3 高真空背散射像分辨率：2.5 nm（BSE）。 3.2.2 低真空模式分辨率： 3.2.2.1低真空二次电子像分辨率：30 kV下为1.4nm ； 3.2.2.2低真空二次电子像分辨率3 kV下为3.0 nm（SE） 3.2.2.3 低真空，背散射像辨率：为2.5 nm（BSE）。 3.2.3超低真空（4000Pa）模式（即环境真空ESEM）分辨率：二次电子像分辨率：30kV下1.4nm（SE）；', NULL, 0, 0, 1682604121580);
INSERT INTO `jf_equipment` VALUES (00000023, '多视域透反射偏光显微镜', '463664.00元', '20万-50万', 1386000000000, 'http://localhost:3000/images/equipmentPics/a19ad11cfb1b8a547c1a0faed30d96e9', '201931061457', '周俊威', '19828928560', '2814936441@qq.com', 'LV100PO', '配偏光显微镜CCD', '日本', '日本尼康', '特种检测仪器', '地球科学', '公共服务类', '地球科学与技术学院', '成都明辨楼D503', '矿物、岩石的偏光特征、成分及结构组成；分析岩石的沉积、成岩环境、孔隙演化过程', '1倍、5倍、10倍、20倍、50倍', NULL, 0, 0, 1682604277555);
INSERT INTO `jf_equipment` VALUES (00000024, '环境扫描电子显微镜', '2096000.00元', '100万-500万', 1288540800000, 'http://localhost:3000/images/equipmentPics/12bef7a6f135c41f719a55d380e821fe', '201931061458', '李淳', '16454546546', '165456213@qq.com', 'Quanta 450', '含EDAX XM2 LX-射线能谱仪', '美国', '美国FEI公司', '特种检测仪器', '地球科学', '公共服务类', '油气藏地质及开发工程国家重点实验室', '成都校区成都', '微观形貌、结构分析', '加速电压: 200V–30KV；放大倍数: 6x – 100,000 x；分 辨 率：高真空模式：30kV时 3.0nm', NULL, 0, 0, 1682604393915);
INSERT INTO `jf_equipment` VALUES (00000025, '电化学工作站', '440087.84元', '20万-50万', 1346428800000, 'http://localhost:3000/images/equipmentPics/d8e549af47f11abd9608a1dcbdd66b06', '201931061458', '李淳', '16454546546', '165456213@qq.com', 'PGSTAT302N', '', '瑞士', '瑞士', '', '能源科学技术', '公共服务类', '新能源和非常规油气研究院', '成都', '循环伏安、交流阻抗测试', '支持的电极体系2、3或4电极；最大输出电压：30V；最大输出电流2A等', NULL, 0, 0, 1682604495931);
INSERT INTO `jf_equipment` VALUES (00000026, '电信通信平台', '782000.00元', '50万-100万', 1220198400000, 'http://localhost:3000/images/equipmentPics/a0eb61bd5199d9153620c51ab55977d4', '201931061459', '周明天', '16654546546', '354562136@qq.com', '', '', '中国', '中国中兴通讯', '', '电子与通信技术', '教学类', '电气信息学院', '成都明理楼A301', '程控交换实验、光传输网络技术实验、ADSL数据传输实验、智能网传输实验', 'ZXR10-1800(路由器) 路由器类型： 模块化接入路由器 传输速率： 10/100/1000Mbps 端口结构： 模块化 其它端口： 1个Console接口,2个GE Combo端口 防火墙：内置防火墙 Qos支持：支持 VPN支持：支持 ZXR10-2604(模块化接入路由器) 路由器类型：模块化接入路由器 其他端口：Console 包转发率：50kbps Qos支持：支持 支持VPN：支持 扩展模块：4 ZXR10-3608(模块化接入路由器) 路由器类型：模块化接入路由器 其它端口：Console 扩展模块：8 包转发率：200Kbps Qos支持：支持 VPN支持：支持 ZXR10-2826(百兆POE交换机) 产品类型：快速以太网交换机 应用层级：二层 传输速率：10/100Mbps 交换方式：存储-转发 背板带宽：2.8Gbps MAC地址表：8K 端口结构：非模块化/纠错 端口数量：24个 端口描述：24个固定10/100Mbps以太网口 扩展模块：1个扩展插槽 传输模式：支持全双工 ZXR10-2852s(二层百兆网管交换机) 产品类型：快速以太网交换机 应用层级：二层 传输速率：10/100Mbps 交换方式：存储-转发 背板带宽：25.6Gbps MAC地址表：8K 端口结构：非模块化 端口数量：52个 端口描述：48个固定的10/100Mbps以太网口，2个固定的1000Mbps光口，2个固定的10/100/1000Mbps自适应电口 纠错 传输模式：支持全双工 ZXR10-3928(三层智能以太网交换机) 产品类型：智能交换机 应用层级：三层 传输速率：10/100/1000Mbps 交换方式：存储-转发 背板带宽：32Gbps MAC地址表：16K 端口结构：非模块化 端口数量：28个 扩展模块：2个GE扩展插槽 传输模式：支持全双工 光环路通信网络 环网数量：3个 光纤通道数：4对 用户路数：1000户 数据吞吐率：400Mbps 电视电话会议：支持 远程视频：支持 程控交换网络 用户数量：50路 ADSL：支持 用户线路带宽：5Mbps 局间模拟：支持', NULL, 0, 0, 1682604609037);
INSERT INTO `jf_equipment` VALUES (00000027, '界面参数一体测量系统', '433500.00元', '20万-50万', 1401206400000, 'http://localhost:3000/images/equipmentPics/8aa277e833602aaf023239e3db651781', '201931061459', '周明天', '16654546546', '354562136@qq.com', 'KRUSS DSA30S', '张力0.01-2000mN/m 分辨率：0.01mN/m，粘度1000mPas', '德国', ' 德国KRUSS', '', '化学', '公共服务类', '化学化工学院', '成都明德楼A427', '测定接触角、表面张力、界面张力和界面扩张模量', '\r\n1、接触角测量范围和精度： 0～180°，精度：±0.1°，分辨率：±0.01°； 2、表界面张力测量范围和精度：0.01～2000mN/m，分辨率：±0.01mN/m； 3、光学系统：连续变焦的6倍变焦透镜，相机速度为52幅图像/秒； 4、视频系统调节：视频系统的倾斜度可以进行调节； 5、注射单元控制及精度：注射单元精度为0.0067μl；注射体积与注射速度可以软件进行控制；注射液体既可通过软件，亦可通过手动按钮控制液体注射； 6、振荡滴附件： 恒定体积（面积）模式：0～600μm轴对称液滴外形振荡 谐函数体积（面积）模式：0～20μl 弛豫模式（膨胀液滴法）：0～20μl 程序化波形：正弦波（振荡滴）、步进波（弛豫效应）、 锯齿波、三角波、任意波 粘度范围：可达50mPas 动态界面张力测量范围：0.01～2000mN/m 频率范围：0～50Hz', NULL, 0, 0, 1682604706507);

-- ----------------------------
-- Table structure for jf_equipment_book
-- ----------------------------
DROP TABLE IF EXISTS `jf_equipment_book`;
CREATE TABLE `jf_equipment_book`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT '预约单的id',
  `equip_id` int(0) NOT NULL COMMENT '设备的id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '预约设备的名字',
  `pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备图片',
  `apply_number` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '申请人学工号',
  `apply_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '申请人名字',
  `apply_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '申请人邮箱',
  `role` smallint(0) NOT NULL COMMENT '预约的角色',
  `manager_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备负责人（设备管理员学工号）',
  `manager_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备负责人（设备管理员姓名）',
  `manager_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '负责人邮箱',
  `test_content` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '测试内容',
  `state` smallint(0) NOT NULL DEFAULT 0 COMMENT '设备预约申请状态\r\n0:正在申请\r\n1:申请通过\r\n2:申请未通过\r\n3:已归还\r\n4:过期（未审核且已过预约时间）\r\n5:取消预约',
  `book_date` bigint(0) NOT NULL COMMENT '预约的日期',
  `apply_time` bigint(0) NOT NULL COMMENT '申请时间',
  `approve_time` bigint(0) NULL DEFAULT NULL COMMENT '审批时间',
  `refuse_reason` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '拒绝申请的原因',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_equipment_book
-- ----------------------------
INSERT INTO `jf_equipment_book` VALUES (00000001, 9, '红外热成像系统', 'http://localhost:3000/images/equipmentPics/8e005beab79ec5b21b561dd608434d25', '200754654654', '老师4', 'rfgdfg@qq.com', 3, '201931061455', '王鸿博', '727329691@qq.com', '测试项目测试项目测试项目测试项目测试项目测试项目测试项目测试项目测试项目测试项目测试项目测试项目测试项目测试项目测试项目测试项目测试项目测试项目', 4, 1682870400000, 1682822772515, NULL, NULL);
INSERT INTO `jf_equipment_book` VALUES (00000002, 9, '红外热成像系统', 'http://localhost:3000/images/equipmentPics/8e005beab79ec5b21b561dd608434d25', '200851546546', '老师5', 'fdgfdg@qq.com', 3, '201931061455', '王鸿博', '727329691@qq.com', '实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 3, 1683043200000, 1682826441929, 1683082714934, NULL);
INSERT INTO `jf_equipment_book` VALUES (00000003, 9, '红外热成像系统', 'http://localhost:3000/images/equipmentPics/8e005beab79ec5b21b561dd608434d25', '201065465465', '老师6', 'rrfef@sfdfs.com', 3, '201931061455', '王鸿博', '727329691@qq.com', '实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 3, 1683129600000, 1682835072745, 1683036766281, NULL);
INSERT INTO `jf_equipment_book` VALUES (00000004, 9, '红外热成像系统', 'http://localhost:3000/images/equipmentPics/8e005beab79ec5b21b561dd608434d25', '202065452146', '瑞克五代', '2649436465@qq.com', 4, '201931061455', '王鸿博', '727329691@qq.com', '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', 5, 1683216000000, 1682836876581, 1683019979329, '拒绝原因');
INSERT INTO `jf_equipment_book` VALUES (00000005, 8, '阴极发光显微镜', 'http://localhost:3000/images/equipmentPics/1235d082e83f8086643bf49c72a823df', '202065452146', '瑞克五代', '2649436465@qq.com', 4, '201931061455', '王鸿博', '727329691@qq.com', '实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 2, 1682956800000, 1682842112688, 1683036773732, '拒绝原因');
INSERT INTO `jf_equipment_book` VALUES (00000006, 2, '实时荧光定量PCR仪', 'http://localhost:3000/images/equipmentPics/8318b1de7367daf0899f1ae6ac5ab098', '202231064655', '王源', 'wankh12138@outlook.com', 4, '201931061456', '胡伟', '1076048708@qq.com', '实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 4, 1682956800000, 1682864024308, NULL, NULL);
INSERT INTO `jf_equipment_book` VALUES (00000007, 20, '红外光谱仪', 'http://localhost:3000/images/equipmentPics/4b6159d6b2c51852e341c6bf657503ac', '202231064655', '王源', 'wankh12138@outlook.com', 4, '201931061455', '王鸿博', '727329691@qq.com', '实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 3, 1683043200000, 1682864034891, 1683018807351, NULL);
INSERT INTO `jf_equipment_book` VALUES (00000008, 20, '红外光谱仪', 'http://localhost:3000/images/equipmentPics/4b6159d6b2c51852e341c6bf657503ac', '200354545565', '老师1', '1832697406@qq.com', 3, '201931061455', '王鸿博', '727329691@qq.com', '红外光谱仪——实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 2, 1684252800000, 1683083022396, 1683083098255, '拒绝原因拒绝原因拒绝原因拒绝原因拒绝原因拒绝原因');
INSERT INTO `jf_equipment_book` VALUES (00000009, 5, '偏光显微镜', 'http://localhost:3000/images/equipmentPics/2540346015b978466007e7c2075ad53b', '200354545565', '老师1', '1832697406@qq.com', 3, '201931061457', '周俊威', '2814936441@qq.com', '偏光显微镜——实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 5, 1684080000000, 1683083066194, NULL, NULL);
INSERT INTO `jf_equipment_book` VALUES (00000010, 19, 'X射线衍射仪', 'http://localhost:3000/images/equipmentPics/056bbd092135c1129cac8b67202943d8', '202231064655', '王源', 'wankh12138@outlook.com', 4, '201931061456', '胡伟', '1076048708@qq.com', 'X射线衍射仪——实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 5, 1683648000000, 1683103140538, NULL, NULL);
INSERT INTO `jf_equipment_book` VALUES (00000011, 5, '偏光显微镜', 'http://localhost:3000/images/equipmentPics/2540346015b978466007e7c2075ad53b', '200851546546', '老师5', 'fdgfdg@qq.com', 3, '201931061457', '周俊威', '2814936441@qq.com', '偏光显微镜——实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 3, 1683216000000, 1683104532281, 1683271939716, NULL);
INSERT INTO `jf_equipment_book` VALUES (00000012, 2, '实时荧光定量PCR仪', 'http://localhost:3000/images/equipmentPics/8318b1de7367daf0899f1ae6ac5ab098', '202231064655', '王源', 'wankh12138@outlook.com', 4, '201931061456', '胡伟', '1076048708@qq.com', '实时荧光定量PCR仪——实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 1, 1683561600000, 1683273428065, 1683273468581, NULL);
INSERT INTO `jf_equipment_book` VALUES (00000013, 19, 'X射线衍射仪', 'http://localhost:3000/images/equipmentPics/056bbd092135c1129cac8b67202943d8', '200354545565', '老师1', '1832697406@qq.com', 3, '201931061456', '胡伟', '1076048708@qq.com', 'X射线衍射仪——实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 1, 1683734400000, 1683360358019, 1683360431318, NULL);

-- ----------------------------
-- Table structure for jf_equipment_repair
-- ----------------------------
DROP TABLE IF EXISTS `jf_equipment_repair`;
CREATE TABLE `jf_equipment_repair`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL COMMENT '维修设备的id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '维修设备的名字',
  `now_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备现状图片',
  `manager_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备负责人（设备管理员学工号）',
  `manager_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备负责人（设备管理员姓名）',
  `manager_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '负责人邮箱',
  `repair_person` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '维修公司',
  `reason_application` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '申请理由',
  `state` smallint(0) NOT NULL COMMENT '设备维修申请状态\r\n0:正在申请\r\n1:申请未通过\r\n2:申请通过',
  `apply_time` bigint(0) NOT NULL COMMENT '维修设备申请时间',
  `approve_time` bigint(0) NULL DEFAULT NULL COMMENT '维修设备通过时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_equipment_repair
-- ----------------------------

-- ----------------------------
-- Table structure for jf_equipment_result
-- ----------------------------
DROP TABLE IF EXISTS `jf_equipment_result`;
CREATE TABLE `jf_equipment_result`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT '成果id',
  `book_id` int(0) NOT NULL COMMENT '预约单的id',
  `equip_id` int(0) NOT NULL COMMENT '设备的id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备的名字',
  `pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备图片',
  `apply_number` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '使用人学工号',
  `apply_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '使用人名字',
  `apply_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '使用人邮箱',
  `role` smallint(0) NOT NULL COMMENT '预约的角色',
  `manager_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备负责人（设备管理员学工号）',
  `manager_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备负责人（设备管理员姓名）',
  `manager_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '负责人邮箱',
  `test_content` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '测试内容',
  `book_date` bigint(0) NOT NULL COMMENT '预约的日期',
  `use_results` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '使用成果',
  `submit_time` bigint(0) NOT NULL COMMENT '提交时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_equipment_result
-- ----------------------------
INSERT INTO `jf_equipment_result` VALUES (00000001, 7, 20, '红外光谱仪', 'http://localhost:3000/images/equipmentPics/4b6159d6b2c51852e341c6bf657503ac', '202231064655', '王源', 'wankh12138@outlook.com', 4, '201931061455', '王鸿博', '727329691@qq.com', '实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 1683043200000, '红外光谱仪——使用成果使用成果使用成果使用成果使用成果使用成果使用成果使用成果使用成果使用成果', 1683102841675);
INSERT INTO `jf_equipment_result` VALUES (00000002, 2, 9, '红外热成像系统', 'http://localhost:3000/images/equipmentPics/8e005beab79ec5b21b561dd608434d25', '200851546546', '老师5', 'fdgfdg@qq.com', 3, '201931061455', '王鸿博', '727329691@qq.com', '实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 1683043200000, '红外热成像系统——使用成果使用成果使用成果使用成果使用成果使用成果使用成果使用成果使用成果使用成果', 1683103536803);
INSERT INTO `jf_equipment_result` VALUES (00000003, 3, 9, '红外热成像系统', 'http://localhost:3000/images/equipmentPics/8e005beab79ec5b21b561dd608434d25', '201065465465', '老师6', 'rrfef@sfdfs.com', 3, '201931061455', '王鸿博', '727329691@qq.com', '实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 1683129600000, '红外热成像系统——使用成果使用成果使用成果使用成果使用成果使用成果使用成果使用成果使用成果', 1683252851560);
INSERT INTO `jf_equipment_result` VALUES (00000004, 11, 5, '偏光显微镜', 'http://localhost:3000/images/equipmentPics/2540346015b978466007e7c2075ad53b', '200851546546', '老师5', 'fdgfdg@qq.com', 3, '201931061457', '周俊威', '2814936441@qq.com', '偏光显微镜——实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容实验内容', 1683216000000, '偏光显微镜——使用成果使用成果使用成果使用成果使用成果使用成果使用成果使用成果使用成果使用成果', 1683272029150);

-- ----------------------------
-- Table structure for jf_equipment_scrap
-- ----------------------------
DROP TABLE IF EXISTS `jf_equipment_scrap`;
CREATE TABLE `jf_equipment_scrap`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL COMMENT '报废设备的id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '报废设备的名字',
  `now_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备现状图片',
  `manager_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备负责人（设备管理员学工号）',
  `manager_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备负责人（设备管理员姓名）',
  `manager_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '负责人邮箱',
  `reason_application` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '申请理由',
  `state` smallint(0) NOT NULL COMMENT '设备报废申请状态 0:正在申请 1:申请未通过 2:申请通过',
  `apply_time` bigint(0) NOT NULL COMMENT '报废设备申请时间',
  `approve_time` bigint(0) NULL DEFAULT NULL COMMENT '报废设备通过时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_equipment_scrap
-- ----------------------------

-- ----------------------------
-- Table structure for jf_smtp
-- ----------------------------
DROP TABLE IF EXISTS `jf_smtp`;
CREATE TABLE `jf_smtp`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
  `pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '授权码',
  `host` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `port` int(0) NOT NULL,
  `current` smallint(0) NOT NULL COMMENT '当前选择',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_smtp
-- ----------------------------
INSERT INTO `jf_smtp` VALUES (1, '1832697406@qq.com', 'xqceatjsbfbfejcc', 'smtp.qq.com', 465, 0);
INSERT INTO `jf_smtp` VALUES (2, '3096690147@qq.com', 'rawbyjhnyiqddfag', 'smtp.qq.com', 465, 1);

-- ----------------------------
-- Table structure for jf_student
-- ----------------------------
DROP TABLE IF EXISTS `jf_student`;
CREATE TABLE `jf_student`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'id',
  `number` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学号',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学生姓名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `phone_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号码',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `email_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '验证码',
  `is_bind_email` smallint(0) NOT NULL DEFAULT 0 COMMENT '0：未绑定 1：已绑定',
  `role` smallint(0) NOT NULL DEFAULT 4 COMMENT '系统管理员',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' COMMENT '头像',
  `academy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学院',
  `major` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '专业',
  `degree` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学历，研究生或者本科',
  `grade` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '年级',
  `trained` smallint(0) NOT NULL DEFAULT 0 COMMENT '是否已培训 0：未培训 1：培训中 2：培训完成',
  `train_number` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '培训老师学工号',
  `train_teacher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '培训老师',
  `create_time` bigint(13) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000000000000 COMMENT '时间戳',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_student_number`(`number`) USING BTREE,
  INDEX `fk_student_name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_student
-- ----------------------------
INSERT INTO `jf_student` VALUES ('0197f1cc-c3ce-44a9-8eeb-9100c18b94b6', '202065452146', '瑞克五代', '$2b$10$Lyk8Mht5X3b3P4cn6ekEN.TacEd4W/e7y3G.uQ7btnLifiYg3Z75O', '15654545655', '2649436465@qq.com', NULL, 1, 4, 'http://localhost:3000/images/avatars/207b82f4e7dece0f8a22e7ce9385897f', '机械工程学院', '材料成型及控制工程', '本科生', '本2020级', 2, NULL, NULL, 1681386992749);
INSERT INTO `jf_student` VALUES ('13379964-cb93-465b-b78d-3cdfefbfe660', '202231064655', '王源', '$2b$10$39eJtYKMpmaZa/gRA/WunuhhrAByyRBUMW1Oy5Qr54VANtzMpQKAK', '', 'wankh12138@outlook.com', NULL, 1, 4, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '石油与天然气工程学院', '油气储运工程', '研究生', '研2022级', 2, NULL, NULL, 1681386862196);
INSERT INTO `jf_student` VALUES ('45e2ca40-82dd-4620-bbe5-a0f60d5454e0', '202275634563', '狮豹者', '$2b$10$zZDFUyWjpj6V1136XcEV/.cZmc4U7xLyxhFDyrTFXL2TSg3G7Yo5S', NULL, NULL, '', 0, 4, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '石油与天然气工程学院', '油气储运工程', '本科生', '本2022级', 0, NULL, NULL, 1681387032051);
INSERT INTO `jf_student` VALUES ('92ac6a96-1b30-43a6-abf5-bb7293a5b8e8', '201963453453', '及你太美', '$2b$10$ZEwnfz13BZRxzl14OiwA2elvwqEuN5HPEa6lN15Acr7ae9Ki8QLcG', NULL, NULL, NULL, 0, 4, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '机械工程学院', '工业设计', '本科生', '本2019级', 0, NULL, NULL, 1681386944078);
INSERT INTO `jf_student` VALUES ('980fdeb7-f93c-4f56-b102-549ffe452cb9', '202246532135', '王俊凯', '$2b$10$hJ/qhqrr/nR6paKeM1Pa.O7K1VAHnshGP.z5zoVc3YnVQqNLBQaVO', NULL, NULL, NULL, 0, 4, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '计算机科学学院', '数据科学与大数据技术', '本科生', '本2022级', 0, NULL, NULL, 1681386922078);
INSERT INTO `jf_student` VALUES ('b4c0b0f6-296e-4648-a1af-543b1aac62b7', '202163434534', '贞德士尼鸭', '$2b$10$htzbTX9PHMalvDrcu//wZe0xLFMhBJvMQOJS0OmgIExjYuQHH6b2S', NULL, NULL, NULL, 0, 4, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '石油与天然气工程学院', '油气储运工程', '本科生', '本2021级', 0, NULL, NULL, 1681386967355);
INSERT INTO `jf_student` VALUES ('b4db2e7e-e34c-499a-bab3-5ecb4a1d164d', '202164564565', '易烊千玺', '$2b$10$gqjSKVBh3XzIYGh4pPKlKOEuwvGhbIqv0V7j01fnvazqLkfZqo9oW', NULL, NULL, NULL, 0, 4, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '计算机科学学院', '网络空间安全', '研究生', '研2021级', 0, NULL, NULL, 1681386888112);
INSERT INTO `jf_student` VALUES ('b56d6687-a239-44b2-b19f-33b6e0a2e36e', '201931064655', '丁真', '$2b$10$oNOgiTr5Ch30pQM65SkhyeTfmFcNOkfdTKOncKolbsg319wOwEF4S', NULL, NULL, NULL, 0, 4, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '计算机科学学院', '计算机科学与技术', '本科生', '本2020级', 0, NULL, NULL, 1681386849374);
INSERT INTO `jf_student` VALUES ('b65db8d8-cdb5-4f33-b3b5-4cd9bfeebb6d', '202254654654', '芝士雪豹', '$2b$10$thbmTnRfvnogaiyxceProOtrLn39kRb5p4xeNmuOY7uXCBKyvdWu.', NULL, '1832697406@qq.com', NULL, 1, 4, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '油气藏地质及开发工程学院', '勘查技术与工程', '本科生', '本2022级', 0, NULL, NULL, 1681386899319);
INSERT INTO `jf_student` VALUES ('c082d7b3-c44e-4640-b05e-40eddcd037dc', '202187567656', '纯鹿人', '$2b$10$5ta61xpUHEkrADb6pi5wsOo3jJ6Yl1dQxQdQfR6uH8VdTcim.kKya', NULL, NULL, NULL, 0, 4, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '计算机科学学院', '软件工程', '研究生', '研2021级', 0, NULL, NULL, 1681386912077);
INSERT INTO `jf_student` VALUES ('dee9b962-e6a3-4026-ae11-faa09dfc790f', '202156434565', '芝士猞猁', '$2b$10$A72HUphIEln6jA.iHSUzkOoBve9FouKgAfP/UeXM1T9WOBKFh.twq', NULL, NULL, NULL, 0, 4, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '计算机科学学院', '物联网工程', '研究生', '研2021级', 0, NULL, NULL, 1681386877676);
INSERT INTO `jf_student` VALUES ('f542576d-d5d0-404d-b8ad-417148be58f8', '202046135646', '哇哈哈', '$2b$10$5Wwe9pqIMHCoPBSAXrsWXOipPsbn.jq.uZt5oCH.7O5McLM8pJRUO', NULL, NULL, NULL, 0, 4, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '石油与天然气工程学院', '油气储运工程', '本科生', '本2020级', 0, NULL, NULL, 1682661227441);

-- ----------------------------
-- Table structure for jf_super_admin
-- ----------------------------
DROP TABLE IF EXISTS `jf_super_admin`;
CREATE TABLE `jf_super_admin`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'id',
  `number` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学工号',
  `name` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '姓名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `phone_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号码',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '系统管理员' COMMENT '邮箱',
  `email_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '验证码',
  `role` smallint(0) NOT NULL DEFAULT 1 COMMENT '系统管理员',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' COMMENT '头像',
  `create_time` bigint(13) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000000000000 COMMENT '时间戳',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_super_number`(`number`) USING BTREE,
  INDEX `fk_super_name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_super_admin
-- ----------------------------
INSERT INTO `jf_super_admin` VALUES ('3c4a8a6a-665a-4975-8d69-f63fb1675963', '201931061460', '江峰', '$2b$10$7N0p861DgfrdE.643.2ZXehiwg/g.4Dn8FhU3OYsenrQJddjJ1Ycm', '15023996683', 'wankh12138@126.com', '0A01CA', 1, 'http://localhost:3000/images/avatars/983ec597dd7db4150ca7cd5e0a59eb5b', 1680315465465);

-- ----------------------------
-- Table structure for jf_teacher
-- ----------------------------
DROP TABLE IF EXISTS `jf_teacher`;
CREATE TABLE `jf_teacher`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'id',
  `number` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '老师学工号（账号）',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '老师姓名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `phone_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号码',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
  `email_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '验证码',
  `role` smallint(0) NOT NULL DEFAULT 3 COMMENT '角色',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' COMMENT '头像',
  `academy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学院',
  `lab` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '所属实验室',
  `create_time` bigint(13) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000000000000 COMMENT '时间戳',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_teacher_number`(`number`) USING BTREE,
  INDEX `fk_teacher_name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_teacher
-- ----------------------------
INSERT INTO `jf_teacher` VALUES ('0f2158fd-ac91-4d75-9b4f-e385b4e263f9', '200754654654', '老师4', '$2b$10$hHYjd34xnoisC.sBCGhjleYHI6TGxs9l841kzGmaqrgBLn8ZWiT0.', '19435345443', 'rfgdfg@qq.com', NULL, 3, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '计算机科学学院', '计科院_实验室A', 1681387187806);
INSERT INTO `jf_teacher` VALUES ('a8f6a6e7-b641-4f2c-8115-8754e94ec6c8', '200851546546', '老师5', '$2b$10$1bZjfYO0F2jXyMGjyueAUePEhHDg29wB/ZHSP.AK/fCg/MNPglqPK', '13898797898', 'fdgfdg@qq.com', NULL, 3, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '石油与天然气工程学院', '石工院_实验室C', 1681387154587);
INSERT INTO `jf_teacher` VALUES ('b193d201-33cc-4dd9-8177-b44a804ac4c5', '200656465465', '老师3', '$2b$10$4Tz3DNADccq2QmvOSpiv8eDYVGzfDyyXmwoTfUq0CElyE7Q5Oc7/G', '13786786786', 'dfgdrgre@qq.com', NULL, 3, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '石油与天然气工程学院', '石工院_实验室B', 1681387107483);
INSERT INTO `jf_teacher` VALUES ('e2ab8b82-22ce-41a2-9f9f-72ed062d3aab', '201065465465', '老师6', '$2b$10$sLZCOQrL1hcy1z/T1UHo4ea.eCwEdR44N3JQ3pX1ZbImq8Rjx35fW', '15612368655', 'rrfef@sfdfs.com', NULL, 3, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '计算机科学学院', '计科院_实验室A', 1681386314790);
INSERT INTO `jf_teacher` VALUES ('e512eb86-5c71-4ab9-a066-4d0d9231871f', '200354545565', '老师1', '$2b$10$5FCJrt1ulZZJ8LtZaNY/mug9eTVQbYOVU.vqfH0qbocVK/dFNYoTu', '13456479456', '1832697406@qq.com', NULL, 3, 'http://localhost:3000/images/avatars/3cbcd7adf8510679180c9cd50c94a15e', '计算机科学学院', '计科院_实验室A', 1681387084864);
INSERT INTO `jf_teacher` VALUES ('f4d8947a-6655-4361-852d-b87c7df445e2', '200316545646', '老师2', '$2b$10$hpV2bGfODnG2g8NldkOAougvcEl9ID.f.4L6daQi4NJePHKHKTQZ2', '19345634534', 'dfgdfg@qq.com', NULL, 3, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '石油与天然气工程学院', '石工院_实验室A', 1681387134479);

-- ----------------------------
-- Table structure for jf_train_course
-- ----------------------------
DROP TABLE IF EXISTS `jf_train_course`;
CREATE TABLE `jf_train_course`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT '培训课程id',
  `equip_id` int(0) NOT NULL COMMENT '培训设备id',
  `equip_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '培训设备名称',
  `project_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '项目名称',
  `train_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '培训内容',
  `train_total_count` int(0) NOT NULL COMMENT '培训总人数',
  `train_place` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '培训地点',
  `manager_number` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '培训老师学工号',
  `manager_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '培训老师姓名',
  `manager_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '培训老师邮箱',
  `signup_count` int(0) NOT NULL DEFAULT 0 COMMENT '当前报名人数',
  `signup_deadline` bigint(0) NOT NULL COMMENT '报名截止时间',
  `train_start` bigint(0) NOT NULL COMMENT '培训开始时间',
  `train_end` bigint(0) NOT NULL COMMENT '培训结束时间',
  `state` smallint(0) NOT NULL COMMENT '0：正在报名\r\n1：报名结束\r\n2：开始培训\r\n3：培训结束',
  `tips` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '补充说明',
  `create_time` bigint(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `signup_count`(`signup_count`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_train_course
-- ----------------------------
INSERT INTO `jf_train_course` VALUES (00000001, 9, '红外热成像系统', '2023春季培训（第十一期）-机电-红外热成像系统(00000009)', '', 5, '明志楼B306A', '201931061455', '王鸿博', '727329691@qq.com', 1, 1685462400000, 1682870400000, 1685462400000, 0, '', 1683212111840);
INSERT INTO `jf_train_course` VALUES (00000002, 20, '红外光谱仪', '2023春季培训（第十一期）-新材院-红外光谱仪(00000020)', '红外光谱的操作', 10, '明德楼B209', '201931061455', '王鸿博', '727329691@qq.com', 2, 1683422035000, 1683475200000, 1688054400000, 0, '', 1683212322458);
INSERT INTO `jf_train_course` VALUES (00000003, 2, '实时荧光定量PCR仪', '2023春季培训（第十一期）-机电-实时荧光定量PCR仪(00000002)', '实时荧光定量PCR仪的使用', 5, '明辨楼E909', '201931061456', '胡伟', '1076048708@qq.com', 2, 1683388800000, 1684166400000, 1686672000000, 0, '', 1683359274502);
INSERT INTO `jf_train_course` VALUES (00000004, 19, 'X射线衍射仪', '2023春季培训（第十一期）-新材院-X射线衍射仪（00000019）', '', 20, '明德楼B212', '201931061456', '胡伟', '1076048708@qq.com', 2, 1684112400000, 1684684800000, 1686326400000, 0, '', 1683359740064);
INSERT INTO `jf_train_course` VALUES (00000005, 8, '阴极发光显微镜', '2023春季培训（第十一期）-机电-阴极发光显微镜(00000008)', '', 10, '校内', '201931061455', '王鸿博', '727329691@qq.com', 1, 1683475200000, 1684252800000, 1686585600000, 0, '', 1683360155751);

-- ----------------------------
-- Table structure for jf_train_student
-- ----------------------------
DROP TABLE IF EXISTS `jf_train_student`;
CREATE TABLE `jf_train_student`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT '培训编号',
  `student_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学生学号',
  `student_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学生姓名',
  `student_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学生邮箱',
  `academy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学院',
  `major` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '专业',
  `grade` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '年级',
  `state` smallint(0) NOT NULL COMMENT '0：正在报名\r\n1：报名拒绝\r\n2：报名成功\r\n3：正在培训\r\n4：培训完成',
  `tips` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '报名备注',
  `approval_time` bigint(0) NULL DEFAULT NULL COMMENT '审核时间',
  `course_id` int(0) NOT NULL COMMENT '课程id',
  `equip_id` int(0) NOT NULL COMMENT '培训设备id',
  `equip_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '培训设备名称',
  `project_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '项目名称',
  `train_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '培训内容',
  `train_total_count` int(0) NOT NULL COMMENT '培训总人数',
  `train_place` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '培训地点',
  `manager_number` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '培训老师学工号',
  `manager_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '培训老师姓名',
  `manager_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '培训老师邮箱',
  `signup_deadline` bigint(0) NOT NULL COMMENT '报名截止时间',
  `train_start` bigint(0) NOT NULL COMMENT '培训开始时间',
  `train_end` bigint(0) NOT NULL COMMENT '培训结束时间',
  `course_tips` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '课程补充说明',
  `create_time` bigint(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jf_train_student
-- ----------------------------
INSERT INTO `jf_train_student` VALUES (00000001, '202231064655', '王源', 'wankh12138@outlook.com', '石油与天然气工程学院', '油气储运工程', '研2022级', 4, '', 1683343334841, 2, 20, '红外光谱仪', '2023春季培训（第十一期）-新材院-红外光谱仪(00000020)', '红外光谱的操作', 10, '明德楼B209', '201931061455', '王鸿博', '727329691@qq.com', 1683422035000, 1683475200000, 1688054400000, '', 1683290797847);
INSERT INTO `jf_train_student` VALUES (00000002, '202231064655', '王源', 'wankh12138@outlook.com', '石油与天然气工程学院', '油气储运工程', '研2022级', 4, '', 1683365638978, 3, 2, '实时荧光定量PCR仪', '2023春季培训（第十一期）-机电-实时荧光定量PCR仪(00000002)', '实时荧光定量PCR仪的使用', 5, '明辨楼E909', '201931061456', '胡伟', '1076048708@qq.com', 1683388800000, 1684166400000, 1686672000000, '', 1683359371447);
INSERT INTO `jf_train_student` VALUES (00000003, '202231064655', '王源', 'wankh12138@outlook.com', '石油与天然气工程学院', '油气储运工程', '研2022级', 4, '', 1683359757341, 4, 19, 'X射线衍射仪', '2023春季培训（第十一期）-新材院-X射线衍射仪（00000019）', '', 20, '明德楼B212', '201931061456', '胡伟', '1076048708@qq.com', 1684112400000, 1684684800000, 1686326400000, '', 1683359749722);
INSERT INTO `jf_train_student` VALUES (00000004, '202065452146', '瑞克五代', '2649436465@qq.com', '机械工程学院', '材料成型及控制工程', '本2020级', 1, '', 1683359933413, 1, 9, '红外热成像系统', '2023春季培训（第十一期）-机电-红外热成像系统(00000009)', '', 5, '明志楼B306A', '201931061455', '王鸿博', '727329691@qq.com', 1685462400000, 1682870400000, 1685462400000, '', 1683359910299);
INSERT INTO `jf_train_student` VALUES (00000005, '202065452146', '瑞克五代', '2649436465@qq.com', '机械工程学院', '材料成型及控制工程', '本2020级', 4, '', 1683359978271, 1, 9, '红外热成像系统', '2023春季培训（第十一期）-机电-红外热成像系统(00000009)', '', 5, '明志楼B306A', '201931061455', '王鸿博', '727329691@qq.com', 1685462400000, 1682870400000, 1685462400000, '', 1683359971323);
INSERT INTO `jf_train_student` VALUES (00000006, '202065452146', '瑞克五代', '2649436465@qq.com', '机械工程学院', '材料成型及控制工程', '本2020级', 4, '', 1683360194765, 5, 8, '阴极发光显微镜', '2023春季培训（第十一期）-机电-阴极发光显微镜(00000008)', '', 10, '校内', '201931061455', '王鸿博', '727329691@qq.com', 1683475200000, 1684252800000, 1686585600000, '', 1683360181331);
INSERT INTO `jf_train_student` VALUES (00000007, '202065452146', '瑞克五代', '2649436465@qq.com', '机械工程学院', '材料成型及控制工程', '本2020级', 4, '', 1683365287762, 2, 20, '红外光谱仪', '2023春季培训（第十一期）-新材院-红外光谱仪(00000020)', '红外光谱的操作', 10, '明德楼B209', '201931061455', '王鸿博', '727329691@qq.com', 1683422035000, 1683475200000, 1688054400000, '', 1683364520404);
INSERT INTO `jf_train_student` VALUES (00000008, '202065452146', '瑞克五代', '2649436465@qq.com', '机械工程学院', '材料成型及控制工程', '本2020级', 4, '', 1683365641481, 3, 2, '实时荧光定量PCR仪', '2023春季培训（第十一期）-机电-实时荧光定量PCR仪(00000002)', '实时荧光定量PCR仪的使用', 5, '明辨楼E909', '201931061456', '胡伟', '1076048708@qq.com', 1683388800000, 1684166400000, 1686672000000, '', 1683364805596);
INSERT INTO `jf_train_student` VALUES (00000009, '202065452146', '瑞克五代', '2649436465@qq.com', '机械工程学院', '材料成型及控制工程', '本2020级', 1, '', 1683365134662, 4, 19, 'X射线衍射仪', '2023春季培训（第十一期）-新材院-X射线衍射仪（00000019）', '', 20, '明德楼B212', '201931061456', '胡伟', '1076048708@qq.com', 1684112400000, 1684684800000, 1686326400000, '', 1683364809643);
INSERT INTO `jf_train_student` VALUES (00000010, '202065452146', '瑞克五代', '2649436465@qq.com', '机械工程学院', '材料成型及控制工程', '本2020级', 4, '', 1683365156486, 4, 19, 'X射线衍射仪', '2023春季培训（第十一期）-新材院-X射线衍射仪（00000019）', '', 20, '明德楼B212', '201931061456', '胡伟', '1076048708@qq.com', 1684112400000, 1684684800000, 1686326400000, '', 1683365149328);

SET FOREIGN_KEY_CHECKS = 1;
