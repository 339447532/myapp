/*
Navicat MySQL Data Transfer

Source Server         : 192.168.99.64(mysql)
Source Server Version : 50631
Source Host           : 192.168.99.64:3306
Source Database       : jx

Target Server Type    : MYSQL
Target Server Version : 50631
File Encoding         : 65001

Date: 2019-04-12 11:30:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `display` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES ('1', '0', '菜单管理', '&#xe699;', '', '0', '启用', '1');
INSERT INTO `menus` VALUES ('2', '1', '后台菜单', '&#xe6b5;', 'menu.html', '0', '启用', '2');
INSERT INTO `menus` VALUES ('3', '1', '前台菜单', '&#xe6c9;', 'admin/role/role-list.jsp', '0', '启用', '2');
INSERT INTO `menus` VALUES ('9', '0', '系统设置', '&#xe6ae;', '', '0', '启用', '1');
INSERT INTO `menus` VALUES ('10', '9', '图标库', '&#xe6e1;', 'unicode.html', '0', '启用', '2');
INSERT INTO `menus` VALUES ('11', '9', '权限管理', '&#xe6e1;', 'role-list.html', '0', '启用', '2');

-- ----------------------------
-- Table structure for operate
-- ----------------------------
DROP TABLE IF EXISTS `operate`;
CREATE TABLE `operate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuid` int(11) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50005 DEFAULT CHARSET=utf8 COMMENT='菜单表id';

-- ----------------------------
-- Records of operate
-- ----------------------------
INSERT INTO `operate` VALUES ('50001', '2', 'del', '删除');
INSERT INTO `operate` VALUES ('50002', '2', 'add', '新增');
INSERT INTO `operate` VALUES ('50003', '3', 'add', '新增');
INSERT INTO `operate` VALUES ('50004', '3', 'del', '删除');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '管理员');
INSERT INTO `role` VALUES ('2', '员工');
INSERT INTO `role` VALUES ('3', '部门经理');

-- ----------------------------
-- Table structure for rolemenu
-- ----------------------------
DROP TABLE IF EXISTS `rolemenu`;
CREATE TABLE `rolemenu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuid` int(11) DEFAULT NULL,
  `roleid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rolemenu
-- ----------------------------
INSERT INTO `rolemenu` VALUES ('111', '9', '3');
INSERT INTO `rolemenu` VALUES ('112', '10', '3');
INSERT INTO `rolemenu` VALUES ('113', '11', '3');
INSERT INTO `rolemenu` VALUES ('252', '1', '1');
INSERT INTO `rolemenu` VALUES ('253', '2', '1');
INSERT INTO `rolemenu` VALUES ('254', '3', '1');
INSERT INTO `rolemenu` VALUES ('255', '4', '1');
INSERT INTO `rolemenu` VALUES ('256', '5', '1');
INSERT INTO `rolemenu` VALUES ('257', '6', '1');
INSERT INTO `rolemenu` VALUES ('258', '7', '1');
INSERT INTO `rolemenu` VALUES ('259', '8', '1');
INSERT INTO `rolemenu` VALUES ('260', '9', '1');
INSERT INTO `rolemenu` VALUES ('261', '10', '1');
INSERT INTO `rolemenu` VALUES ('262', '11', '1');
INSERT INTO `rolemenu` VALUES ('268', '1', '2');
INSERT INTO `rolemenu` VALUES ('269', '2', '2');
INSERT INTO `rolemenu` VALUES ('270', '3', '2');

-- ----------------------------
-- Table structure for roleoperate
-- ----------------------------
DROP TABLE IF EXISTS `roleoperate`;
CREATE TABLE `roleoperate` (
  `roleid` int(11) NOT NULL,
  `operateid` int(11) NOT NULL,
  `menuid` int(11) NOT NULL,
  PRIMARY KEY (`roleid`,`operateid`,`menuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roleoperate
-- ----------------------------
INSERT INTO `roleoperate` VALUES ('1', '50001', '2');
INSERT INTO `roleoperate` VALUES ('1', '50002', '2');
INSERT INTO `roleoperate` VALUES ('1', '50003', '3');
INSERT INTO `roleoperate` VALUES ('2', '50001', '2');
INSERT INTO `roleoperate` VALUES ('2', '50002', '2');
INSERT INTO `roleoperate` VALUES ('2', '50003', '3');

-- ----------------------------
-- Table structure for roleuser
-- ----------------------------
DROP TABLE IF EXISTS `roleuser`;
CREATE TABLE `roleuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `roleid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roleuser
-- ----------------------------
INSERT INTO `roleuser` VALUES ('1', '1000', '1');
INSERT INTO `roleuser` VALUES ('8', '1000', '2');
INSERT INTO `roleuser` VALUES ('9', '4000', '3');
INSERT INTO `roleuser` VALUES ('14', '2000', '3');
INSERT INTO `roleuser` VALUES ('28', '1000', '2');
INSERT INTO `roleuser` VALUES ('52', '4000', '2');

-- ----------------------------
-- Table structure for system_log
-- ----------------------------
DROP TABLE IF EXISTS `system_log`;
CREATE TABLE `system_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_log
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `realname` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `job` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4001 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1000', '占啟', 'zhanqi', '14e1b600b1fd579f47433b88e8d85291', 'images/user_logo/20170926103645_1.jpg', '81ff83b0-5cd0-11e9-b263-1dc5937d93be', 'offline', '解决方案部', '开发工程师');
INSERT INTO `users` VALUES ('2000', '陈丽', 'cl', '14e1b600b1fd579f47433b88e8d85291', 'images/user_logo/20170926103645_1.jpg', '561B1A842A16480595500B678D2EB601', 'offline', '解决方案部', 'UI设计师');
INSERT INTO `users` VALUES ('3000', '熊倩', 'xq', '14e1b600b1fd579f47433b88e8d85291', 'images/user_logo/20170926103645_1.jpg', '0EF99548FD9745D88676E01E1AF2D570', 'offline', '解决方案部', '测试工程师');
INSERT INTO `users` VALUES ('4000', '舒鹏', 'sp', '14e1b600b1fd579f47433b88e8d85291', 'images/user_logo/20170926103645_1.jpg', '1577600CEE534062B8CCB1D45A36122F', 'offline', '解决方案部', '项目经理');
