/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50509
Source Host           : localhost:3306
Source Database       : fandian_development

Target Server Type    : MYSQL
Target Server Version : 50509
File Encoding         : 65001

Date: 2013-12-22 14:32:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `areas`
-- ----------------------------
DROP TABLE IF EXISTS `areas`;
CREATE TABLE `areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city_id` int(11) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of areas
-- ----------------------------
INSERT INTO `areas` VALUES ('1', '华东大厦', '1', '1', null, null);
INSERT INTO `areas` VALUES ('2', '新梁溪人家', '1', '1', null, null);
INSERT INTO `areas` VALUES ('3', '阳光广场', '1', '1', null, null);
INSERT INTO `areas` VALUES ('4', '茂业大厦', '2', '1', null, null);

-- ----------------------------
-- Table structure for `areas_shops`
-- ----------------------------
DROP TABLE IF EXISTS `areas_shops`;
CREATE TABLE `areas_shops` (
  `area_id` int(11) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of areas_shops
-- ----------------------------
INSERT INTO `areas_shops` VALUES ('1', '1');
INSERT INTO `areas_shops` VALUES ('1', '2');
INSERT INTO `areas_shops` VALUES ('1', '3');
INSERT INTO `areas_shops` VALUES ('2', '1');
INSERT INTO `areas_shops` VALUES ('2', '4');

-- ----------------------------
-- Table structure for `cities`
-- ----------------------------
DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `class_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of cities
-- ----------------------------
INSERT INTO `cities` VALUES ('1', '滨湖区', 'bh', '1', null, null);
INSERT INTO `cities` VALUES ('2', '南长区', 'nc', '1', null, null);
INSERT INTO `cities` VALUES ('3', '崇安区', 'ca', '1', null, null);
INSERT INTO `cities` VALUES ('4', '新区', 'xq', '1', null, null);
INSERT INTO `cities` VALUES ('5', '北塘区', 'bt', '1', null, null);
INSERT INTO `cities` VALUES ('6', '锡山区', 'xs', '1', null, null);
INSERT INTO `cities` VALUES ('7', '惠山区', 'hs', '1', null, null);

-- ----------------------------
-- Table structure for `foods`
-- ----------------------------
DROP TABLE IF EXISTS `foods`;
CREATE TABLE `foods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `food_type_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `sort_id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` float NOT NULL,
  `food_state` int(11) NOT NULL,
  `food_unit` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `activity_state` int(11) NOT NULL,
  `is_new` tinyint(1) DEFAULT NULL,
  `is_sign` tinyint(1) DEFAULT NULL,
  `is_hot` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `original_price` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of foods
-- ----------------------------
INSERT INTO `foods` VALUES ('1', '1', '飘香拌面', '1', '1', null, '3.5', '0', '份', '0', null, null, null, null, null, '4');
INSERT INTO `foods` VALUES ('2', '1', '拌粉干', '1', '2', null, '4', '0', '份', '0', null, null, null, null, null, '4');
INSERT INTO `foods` VALUES ('3', '1', '香拌蒸饺', '1', '3', null, '5', '0', '份', '0', '1', null, null, null, null, '5');
INSERT INTO `foods` VALUES ('4', '2', '排骨汤面', '1', '1', null, '10', '0', '份', '0', null, null, null, null, null, '11');
INSERT INTO `foods` VALUES ('5', '2', '老鸭汤面', '1', '2', null, '10', '0', '份', '0', null, null, null, null, null, '11');
INSERT INTO `foods` VALUES ('6', '2', '猪脑汤粉', '1', '3', null, '11', '0', '份', '0', null, null, null, null, null, '12');
INSERT INTO `foods` VALUES ('7', '3', '茶树菇排骨汤', '1', '1', '清凉去火', '7', '0', '份', '0', null, null, null, null, null, '7');
INSERT INTO `foods` VALUES ('8', '3', '玉竹老鸭汤', '1', '2', '益气补肾', '7', '0', '份', '0', null, null, null, null, null, '7');
INSERT INTO `foods` VALUES ('9', '3', '莲子猪肚汤', '1', '3', null, '8', '0', '份', '0', null, null, null, null, null, '8');
INSERT INTO `foods` VALUES ('10', '3', '花旗参鸽子汤', '1', '4', '滋补养肾', '11', '0', '份', '0', null, '1', null, null, null, '12');
INSERT INTO `foods` VALUES ('11', '5', '大碗牛肉汤', '1', '1', null, '13', '0', '份', '0', null, null, null, null, null, '14');

-- ----------------------------
-- Table structure for `food_types`
-- ----------------------------
DROP TABLE IF EXISTS `food_types`;
CREATE TABLE `food_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `shop_id` int(11) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `sort_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of food_types
-- ----------------------------
INSERT INTO `food_types` VALUES ('1', '营养面食', '1', '1', '1', null, null);
INSERT INTO `food_types` VALUES ('2', '营养汤面', '1', '1', '2', null, null);
INSERT INTO `food_types` VALUES ('3', '营养炖汤', '1', '1', '3', null, null);
INSERT INTO `food_types` VALUES ('4', '经济套餐', '1', '1', '4', null, null);
INSERT INTO `food_types` VALUES ('5', '牛肉汤', '2', '1', '1', null, null);

-- ----------------------------
-- Table structure for `number_manages`
-- ----------------------------
DROP TABLE IF EXISTS `number_manages`;
CREATE TABLE `number_manages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `number` int(11) NOT NULL,
  `lock_version` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of number_manages
-- ----------------------------
INSERT INTO `number_manages` VALUES ('1', 'Order', '9', '9', '2013-10-18 14:43:14', '2013-12-15 21:46:11');

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_num` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `original_price` float NOT NULL,
  `current_price` float NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `altphone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('1', '2013-10-18    3', '15', '10', '12313131231', '华东大蛇丸', 'creating', '972344281', '1', '1', '2013-10-18 23:18:22', '2013-10-18 23:18:22', '', '');
INSERT INTO `orders` VALUES ('2', '2013102200004', '15', '10', '12313131231', '华东大蛇丸', 'creating', '972344281', '1', '1', '2013-10-22 22:19:56', '2013-10-22 22:19:56', '', '');
INSERT INTO `orders` VALUES ('3', '2013102200005', '15', '10', '12313131231', '华东大蛇丸', 'creating', '972344281', '1', '1', '2013-10-22 22:28:47', '2013-10-22 22:28:47', '', '');
INSERT INTO `orders` VALUES ('4', '2013102200006', '15', '10', '12313131231', '华东大蛇丸', 'creating', '972344281', '1', '1', '2013-10-22 22:40:07', '2013-10-22 22:40:07', '', '');
INSERT INTO `orders` VALUES ('5', '2013121500007', '15', '44', '12313131231', '华东大蛇丸', 'creating', '971978865', '1', '1', '2013-12-15 21:40:19', '2013-12-15 21:40:19', '', '');
INSERT INTO `orders` VALUES ('6', '2013121500008', '15', '44', '12313131231', '华东大蛇丸', 'creating', '971978865', '1', '1', '2013-12-15 21:44:13', '2013-12-15 21:44:13', '', '');
INSERT INTO `orders` VALUES ('7', '2013121500009', '15', '44', '12313131231', '华东大蛇丸', 'creating', '971978865', '1', '1', '2013-12-15 21:46:11', '2013-12-15 21:46:11', '', '辣一点 多加米 22:45送出');

-- ----------------------------
-- Table structure for `order_details`
-- ----------------------------
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `number` int(11) NOT NULL,
  `price` float NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of order_details
-- ----------------------------
INSERT INTO `order_details` VALUES ('1', '5', '4', '排骨汤面', '4', '10', '2013-12-15 21:40:19', '2013-12-15 21:40:19');
INSERT INTO `order_details` VALUES ('2', '5', '2', '拌粉干', '1', '4', '2013-12-15 21:40:19', '2013-12-15 21:40:19');
INSERT INTO `order_details` VALUES ('3', '6', '4', '排骨汤面', '4', '10', '2013-12-15 21:44:13', '2013-12-15 21:44:13');
INSERT INTO `order_details` VALUES ('4', '6', '2', '拌粉干', '1', '4', '2013-12-15 21:44:13', '2013-12-15 21:44:13');
INSERT INTO `order_details` VALUES ('5', '7', '4', '排骨汤面', '4', '10', '2013-12-15 21:46:11', '2013-12-15 21:46:11');
INSERT INTO `order_details` VALUES ('6', '7', '2', '拌粉干', '1', '4', '2013-12-15 21:46:11', '2013-12-15 21:46:11');

-- ----------------------------
-- Table structure for `order_logs`
-- ----------------------------
DROP TABLE IF EXISTS `order_logs`;
CREATE TABLE `order_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of order_logs
-- ----------------------------

-- ----------------------------
-- Table structure for `primary_businesses`
-- ----------------------------
DROP TABLE IF EXISTS `primary_businesses`;
CREATE TABLE `primary_businesses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `enable` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of primary_businesses
-- ----------------------------
INSERT INTO `primary_businesses` VALUES ('1', '中式', '1', null, null);
INSERT INTO `primary_businesses` VALUES ('2', '西式', '1', null, null);
INSERT INTO `primary_businesses` VALUES ('3', '日韩', '1', null, null);
INSERT INTO `primary_businesses` VALUES ('4', '烧烤', '1', null, null);
INSERT INTO `primary_businesses` VALUES ('5', '饮品', null, null, null);
INSERT INTO `primary_businesses` VALUES ('99', '其它', null, null, null);

-- ----------------------------
-- Table structure for `primary_businesses_shops`
-- ----------------------------
DROP TABLE IF EXISTS `primary_businesses_shops`;
CREATE TABLE `primary_businesses_shops` (
  `primary_business_id` int(11) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of primary_businesses_shops
-- ----------------------------
INSERT INTO `primary_businesses_shops` VALUES ('1', '1');
INSERT INTO `primary_businesses_shops` VALUES ('1', '2');
INSERT INTO `primary_businesses_shops` VALUES ('2', '3');
INSERT INTO `primary_businesses_shops` VALUES ('4', '1');

-- ----------------------------
-- Table structure for `schema_migrations`
-- ----------------------------
DROP TABLE IF EXISTS `schema_migrations`;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of schema_migrations
-- ----------------------------
INSERT INTO `schema_migrations` VALUES ('20130821153059');
INSERT INTO `schema_migrations` VALUES ('20130823142922');
INSERT INTO `schema_migrations` VALUES ('20130902135418');
INSERT INTO `schema_migrations` VALUES ('20130906143937');
INSERT INTO `schema_migrations` VALUES ('20130910145642');
INSERT INTO `schema_migrations` VALUES ('20130918123944');
INSERT INTO `schema_migrations` VALUES ('20130918124509');
INSERT INTO `schema_migrations` VALUES ('20130918125245');
INSERT INTO `schema_migrations` VALUES ('20130920090125');
INSERT INTO `schema_migrations` VALUES ('20130920090810');
INSERT INTO `schema_migrations` VALUES ('20130920111614');
INSERT INTO `schema_migrations` VALUES ('20130921103833');
INSERT INTO `schema_migrations` VALUES ('20130921104944');
INSERT INTO `schema_migrations` VALUES ('20130924143605');
INSERT INTO `schema_migrations` VALUES ('20130924143844');
INSERT INTO `schema_migrations` VALUES ('20130924143942');
INSERT INTO `schema_migrations` VALUES ('20131005071443');
INSERT INTO `schema_migrations` VALUES ('20131018132519');
INSERT INTO `schema_migrations` VALUES ('20131018140002');

-- ----------------------------
-- Table structure for `shops`
-- ----------------------------
DROP TABLE IF EXISTS `shops`;
CREATE TABLE `shops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `logo_path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `star` float DEFAULT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `order_commond_num` int(11) DEFAULT '0',
  `supplier_remark` text COLLATE utf8_unicode_ci,
  `send_food_price` int(11) DEFAULT '0',
  `location` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `send_food_rate` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of shops
-- ----------------------------
INSERT INTO `shops` VALUES ('1', '沙县小吃', '/images/shops/1_logo.jpeg', null, '1', null, null, '200', '沙县小吃源远流长，历史悠久，起源自古代夏商周、晋、宋中原黄河流域华夏民族-汉族食文化，在民间具有浓厚的历史文化基础，尤以品种繁多风味独特和经济实惠著称，是中华饮食文化百花园中的一朵奇葩，早已享誉海内外。', '15', '无锡市滨湖区稻香路15号', '15');
INSERT INTO `shops` VALUES ('2', '淮南牛肉汤', '/images/shops/2_logo.jpeg', null, '1', null, null, '0', '淮南地处淮河南岸，毗邻淮南岸边，盛养牛羊，当地古沟一带又是回民居住地，对牛肉酷爱。', '20', '无锡市滨湖区稻香路65号', '20');
INSERT INTO `shops` VALUES ('3', '华莱士', '/images/shops/3_logo.jpeg', null, '1', null, null, '0', '便宜又好吃', '30', '无锡市滨湖区稻香路7号', '25');
INSERT INTO `shops` VALUES ('4', '小蜀娘', null, null, '1', null, null, '0', '狠辣啊', '50', '无锡市滨湖区', '15');

-- ----------------------------
-- Table structure for `shop_hours`
-- ----------------------------
DROP TABLE IF EXISTS `shop_hours`;
CREATE TABLE `shop_hours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) NOT NULL,
  `start_time` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `end_time` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of shop_hours
-- ----------------------------
INSERT INTO `shop_hours` VALUES ('1', '1', '11:00', '17:00', null, null);
INSERT INTO `shop_hours` VALUES ('2', '1', '17:00', '23:59', null, null);
INSERT INTO `shop_hours` VALUES ('3', '3', '8:00', '17:00', null, null);

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nickname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------

-- ----------------------------
-- Table structure for `user_contacts`
-- ----------------------------
DROP TABLE IF EXISTS `user_contacts`;
CREATE TABLE `user_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(20) NOT NULL,
  `addr` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `altphone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_contacts
-- ----------------------------
INSERT INTO `user_contacts` VALUES ('1', '943019896', '华东大厦', '12312312312', null, '1', '2013-10-05 08:28:00', '2013-10-05 08:28:00');
INSERT INTO `user_contacts` VALUES ('2', '972344281', '华东大厦', '12312232312', null, '1', '2013-10-05 08:32:40', '2013-10-05 08:32:40');
INSERT INTO `user_contacts` VALUES ('3', '971978865', '华东大蛇丸', '12313131231', null, '1', '2013-12-08 12:36:58', '2013-12-08 12:36:58');
