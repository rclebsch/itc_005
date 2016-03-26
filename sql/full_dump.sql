# SQL Manager 2007 for MySQL 4.3.3.2
# ---------------------------------------
# Host     : localhost
# Port     : 3306
# Database : itc_005


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE `itc_005`
    CHARACTER SET 'utf8'
    COLLATE 'utf8_general_ci';

USE `itc_005`;

#
# Structure for the `app_border` table : 
#

DROP TABLE IF EXISTS `app_border`;

CREATE TABLE `app_border` (
  `borderId` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `borderName` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`borderId`),
  UNIQUE KEY `borderName` (`borderName`)

)ENGINE=InnoDB
AUTO_INCREMENT=4 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `app_contactactivity` table : 
#

DROP TABLE IF EXISTS `app_contactactivity`;

CREATE TABLE `app_contactactivity` (
  `contactActivityId` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `contactActivityName` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`contactActivityId`),
  UNIQUE KEY `contactActivityName` (`contactActivityName`)

)ENGINE=InnoDB
AUTO_INCREMENT=4 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `app_contactafiliation` table : 
#

DROP TABLE IF EXISTS `app_contactafiliation`;

CREATE TABLE `app_contactafiliation` (
  `contactAfiliationId` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `contactAfiliationName` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`contactAfiliationId`),
  UNIQUE KEY `contactAfiliationName` (`contactAfiliationName`)

)ENGINE=InnoDB
AUTO_INCREMENT=4 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `app_contactcategory` table : 
#

DROP TABLE IF EXISTS `app_contactcategory`;

CREATE TABLE `app_contactcategory` (
  `contactCategoryId` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `contactCategoryName` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `isIndividual` TINYINT(1) NOT NULL,
  PRIMARY KEY (`contactCategoryId`),
  UNIQUE KEY `contactCategoryName` (`contactCategoryName`)

)ENGINE=InnoDB
AUTO_INCREMENT=8 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `app_contactstatus` table : 
#

DROP TABLE IF EXISTS `app_contactstatus`;

CREATE TABLE `app_contactstatus` (
  `contactStatusId` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `contactStatusDesc` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`contactStatusId`),
  UNIQUE KEY `contactStatusDesc` (`contactStatusDesc`)

)ENGINE=InnoDB
AUTO_INCREMENT=5 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `app_country` table : 
#

DROP TABLE IF EXISTS `app_country`;

CREATE TABLE `app_country` (
  `countryId` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `countryName` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `countryCode` VARCHAR(2) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `orderPriority` INTEGER(11) NOT NULL,
  `phonePrefix` VARCHAR(4) COLLATE utf8_general_ci DEFAULT NULL,
  `visible` TINYINT(1) NOT NULL,
  PRIMARY KEY (`countryId`),
  UNIQUE KEY `countryName` (`countryName`),
  UNIQUE KEY `countryCode` (`countryCode`),
  UNIQUE KEY `phonePrefix` (`phonePrefix`)

)ENGINE=InnoDB
AUTO_INCREMENT=249 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `app_contact` table : 
#

DROP TABLE IF EXISTS `app_contact`;

CREATE TABLE `app_contact` (
  `contactId` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) COLLATE utf8_general_ci DEFAULT NULL,
  `lastName` VARCHAR(255) COLLATE utf8_general_ci DEFAULT NULL,
  `organizationName` VARCHAR(255) COLLATE utf8_general_ci DEFAULT NULL,
  `activityFree` VARCHAR(255) COLLATE utf8_general_ci DEFAULT NULL,
  `borderLocationFree` VARCHAR(255) COLLATE utf8_general_ci DEFAULT NULL,
  `contactAfiliationFree` VARCHAR(255) COLLATE utf8_general_ci DEFAULT NULL,
  `phoneLocalNumber` VARCHAR(255) COLLATE utf8_general_ci DEFAULT NULL,
  `email` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `rejectReason` LONGTEXT,
  `created` DATETIME NOT NULL,
  `lastUpdate` DATETIME NOT NULL,
  `activityFromList_id` INTEGER(11) DEFAULT NULL,
  `borderLocationFromList_id` INTEGER(11) DEFAULT NULL,
  `contactAfiliationFromList_id` INTEGER(11) DEFAULT NULL,
  `contactCountry_id` INTEGER(11) NOT NULL,
  `contactStatus_id` INTEGER(11) NOT NULL,
  `contactCategory_id` INTEGER(11) NOT NULL,
  PRIMARY KEY (`contactId`),
  UNIQUE KEY `email` (`email`),
  KEY `app_contact_52ad71e9` (`activityFromList_id`),
  KEY `app_contact_5c176377` (`borderLocationFromList_id`),
  KEY `app_contact_031649d0` (`contactAfiliationFromList_id`),
  KEY `app_contact_673c90b4` (`contactCountry_id`),
  KEY `app_contact_591d9c24` (`contactStatus_id`),
  KEY `app_contact_24342551` (`contactCategory_id`),
  CONSTRAINT `bfdcddd01bba1e907edf3d45264e3ce5` FOREIGN KEY (`contactCategory_id`) REFERENCES `app_contactcategory` (`contactCategoryId`),
  CONSTRAINT `app_contact_contactCountry_id_a8db9164_fk_app_country_countryId` FOREIGN KEY (`contactCountry_id`) REFERENCES `app_country` (`countryId`),
  CONSTRAINT `app_co_borderLocationFromList_id_e29b3519_fk_app_border_borderId` FOREIGN KEY (`borderLocationFromList_id`) REFERENCES `app_border` (`borderId`),
  CONSTRAINT `a_contactStatus_id_9a84e9d3_fk_app_contactstatus_contactStatusId` FOREIGN KEY (`contactStatus_id`) REFERENCES `app_contactstatus` (`contactStatusId`),
  CONSTRAINT `D4d2d78499068c8dfeceff6c0b403738` FOREIGN KEY (`contactAfiliationFromList_id`) REFERENCES `app_contactafiliation` (`contactAfiliationId`),
  CONSTRAINT `D66ba014e36639b4a4065ede8f97da69` FOREIGN KEY (`activityFromList_id`) REFERENCES `app_contactactivity` (`contactActivityId`)

)ENGINE=InnoDB
AUTO_INCREMENT=2 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `app_event` table : 
#

DROP TABLE IF EXISTS `app_event`;

CREATE TABLE `app_event` (
  `eventId` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `eventTitle` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `eventDate` DATETIME NOT NULL,
  `eventLocation` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mainDocument` VARCHAR(100) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `additionalDocument` VARCHAR(100) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `contactInfo` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `objectives` LONGTEXT NOT NULL,
  `communication` LONGTEXT NOT NULL,
  `created` DATETIME NOT NULL,
  `lastUpdate` DATETIME NOT NULL,
  `eventCountry_id` INTEGER(11) DEFAULT NULL,
  PRIMARY KEY (`eventId`),
  UNIQUE KEY `eventTitle` (`eventTitle`),
  UNIQUE KEY `eventLocation` (`eventLocation`),
  UNIQUE KEY `contactInfo` (`contactInfo`),
  KEY `app_event_eventCountry_id_2fd89768_fk_app_country_countryId` (`eventCountry_id`),
  CONSTRAINT `app_event_eventCountry_id_2fd89768_fk_app_country_countryId` FOREIGN KEY (`eventCountry_id`) REFERENCES `app_country` (`countryId`)

)ENGINE=InnoDB
AUTO_INCREMENT=2 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `app_language` table : 
#

DROP TABLE IF EXISTS `app_language`;

CREATE TABLE `app_language` (
  `languageId` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `languageName` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`languageId`),
  UNIQUE KEY `languageName` (`languageName`)

)ENGINE=InnoDB
AUTO_INCREMENT=4 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `app_resourcecategory` table : 
#

DROP TABLE IF EXISTS `app_resourcecategory`;

CREATE TABLE `app_resourcecategory` (
  `resourceCategoryId` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `resourceCategoryName` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `created` DATETIME NOT NULL,
  `lastUpdate` DATETIME NOT NULL,
  PRIMARY KEY (`resourceCategoryId`),
  UNIQUE KEY `resourceCategoryName` (`resourceCategoryName`)

)ENGINE=InnoDB
AUTO_INCREMENT=5 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `app_resource` table : 
#

DROP TABLE IF EXISTS `app_resource`;

CREATE TABLE `app_resource` (
  `resourceId` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `pdfFile` VARCHAR(100) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `firstPagePicture` VARCHAR(100) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `description` LONGTEXT NOT NULL,
  `created` DATETIME NOT NULL,
  `lastUpdate` DATETIME NOT NULL,
  `language_id` INTEGER(11) DEFAULT NULL,
  `resourceCategory_id` INTEGER(11) DEFAULT NULL,
  PRIMARY KEY (`resourceId`),
  UNIQUE KEY `title` (`title`),
  KEY `app_resource_language_id_9bfedf87_fk_app_language_languageId` (`language_id`),
  KEY `app_resource_5b396e13` (`resourceCategory_id`),
  CONSTRAINT `db0c8dc349da18b39dcdbe521884b8ce` FOREIGN KEY (`resourceCategory_id`) REFERENCES `app_resourcecategory` (`resourceCategoryId`),
  CONSTRAINT `app_resource_language_id_9bfedf87_fk_app_language_languageId` FOREIGN KEY (`language_id`) REFERENCES `app_language` (`languageId`)

)ENGINE=InnoDB
AUTO_INCREMENT=2 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `auth_group` table : 
#

DROP TABLE IF EXISTS `auth_group`;

CREATE TABLE `auth_group` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)

)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `django_content_type` table : 
#

DROP TABLE IF EXISTS `django_content_type`;

CREATE TABLE `django_content_type` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `app_label` VARCHAR(100) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `model` VARCHAR(100) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_76bd3d3b_uniq` (`app_label`, `model`)

)ENGINE=InnoDB
AUTO_INCREMENT=19 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `auth_permission` table : 
#

DROP TABLE IF EXISTS `auth_permission`;

CREATE TABLE `auth_permission` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `content_type_id` INTEGER(11) NOT NULL,
  `codename` VARCHAR(100) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_01ab375a_uniq` (`content_type_id`, `codename`),
  CONSTRAINT `auth_permissi_content_type_id_2f476e4b_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)

)ENGINE=InnoDB
AUTO_INCREMENT=55 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `auth_group_permissions` table : 
#

DROP TABLE IF EXISTS `auth_group_permissions`;

CREATE TABLE `auth_group_permissions` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `group_id` INTEGER(11) NOT NULL,
  `permission_id` INTEGER(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_0cd325b0_uniq` (`group_id`, `permission_id`),
  KEY `auth_group_permissi_permission_id_84c5c92e_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `auth_group_permissi_permission_id_84c5c92e_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)

)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `auth_user` table : 
#

DROP TABLE IF EXISTS `auth_user`;

CREATE TABLE `auth_user` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(128) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `last_login` DATETIME DEFAULT NULL,
  `is_superuser` TINYINT(1) NOT NULL,
  `username` VARCHAR(30) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `first_name` VARCHAR(30) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `last_name` VARCHAR(30) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `email` VARCHAR(254) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `is_staff` TINYINT(1) NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `date_joined` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)

)ENGINE=InnoDB
AUTO_INCREMENT=2 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `auth_user_groups` table : 
#

DROP TABLE IF EXISTS `auth_user_groups`;

CREATE TABLE `auth_user_groups` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER(11) NOT NULL,
  `group_id` INTEGER(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_94350c0c_uniq` (`user_id`, `group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)

)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `auth_user_user_permissions` table : 
#

DROP TABLE IF EXISTS `auth_user_user_permissions`;

CREATE TABLE `auth_user_user_permissions` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER(11) NOT NULL,
  `permission_id` INTEGER(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_14a6b632_uniq` (`user_id`, `permission_id`),
  KEY `auth_user_user_perm_permission_id_1fbb5f2c_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `auth_user_user_perm_permission_id_1fbb5f2c_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)

)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `django_admin_log` table : 
#

DROP TABLE IF EXISTS `django_admin_log`;

CREATE TABLE `django_admin_log` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `action_time` DATETIME NOT NULL,
  `object_id` LONGTEXT,
  `object_repr` VARCHAR(200) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `action_flag` SMALLINT(5) UNSIGNED NOT NULL,
  `change_message` LONGTEXT NOT NULL,
  `content_type_id` INTEGER(11) DEFAULT NULL,
  `user_id` INTEGER(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin__content_type_id_c4bce8eb_fk_django_content_type_id` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin__content_type_id_c4bce8eb_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)

)ENGINE=InnoDB
AUTO_INCREMENT=38 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `django_migrations` table : 
#

DROP TABLE IF EXISTS `django_migrations`;

CREATE TABLE `django_migrations` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `app` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `name` VARCHAR(255) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `applied` DATETIME NOT NULL,
  PRIMARY KEY (`id`)

)ENGINE=InnoDB
AUTO_INCREMENT=17 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `django_session` table : 
#

DROP TABLE IF EXISTS `django_session`;

CREATE TABLE `django_session` (
  `session_key` VARCHAR(40) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `session_data` LONGTEXT NOT NULL,
  `expire_date` DATETIME NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_de54fa62` (`expire_date`)

)ENGINE=InnoDB
CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Structure for the `django_site` table : 
#

DROP TABLE IF EXISTS `django_site`;

CREATE TABLE `django_site` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `domain` VARCHAR(100) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `name` VARCHAR(50) COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)

)ENGINE=InnoDB
AUTO_INCREMENT=2 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

#
# Data for the `app_border` table  (LIMIT 0,500)
#

INSERT INTO `app_border` (`borderId`, `borderName`) VALUES
  (1,'Kayanza'),
  (2,'Kobero'),
  (3,'Muyinga');
COMMIT;

#
# Data for the `app_contactcategory` table  (LIMIT 0,500)
#

INSERT INTO `app_contactcategory` (`contactCategoryId`, `contactCategoryName`, `isIndividual`) VALUES
  (1,'National Trade Support Institutions',0),
  (2,'Joint Border Committees',0),
  (3,'Trade Hubs',0),
  (4,'Women Associations at the Border',0),
  (5,'National Women Associations',0),
  (6,'Women Trading across border in EAC',1),
  (7,'Border or Regulatory Agencies',0);
COMMIT;

#
# Data for the `app_country` table  (LIMIT 0,500)
#

INSERT INTO `app_country` (`countryId`, `countryName`, `countryCode`, `orderPriority`, `phonePrefix`, `visible`) VALUES
  (1,'Anonymous Proxy','A1',0,NULL,1),
  (2,'Satellite Provider','A2',0,NULL,1),
  (3,'Andorra','AD',0,NULL,1),
  (4,'United Arab Emirates','AE',0,NULL,1),
  (5,'Afghanistan','AF',0,NULL,1),
  (6,'Antigua and Barbuda','AG',0,NULL,1),
  (7,'Anguilla','AI',0,NULL,1),
  (8,'Albania','AL',0,NULL,1),
  (9,'Armenia','AM',0,NULL,1),
  (10,'Netherlands Antilles','AN',0,NULL,1),
  (11,'Angola','AO',0,NULL,1),
  (12,'Asia/Pacific Region','AP',0,NULL,1),
  (13,'Antarctica','AQ',0,NULL,1),
  (14,'Argentina','AR',0,NULL,1),
  (15,'American Samoa','AS',0,NULL,1),
  (16,'Austria','AT',0,NULL,1),
  (17,'Australia','AU',0,NULL,1),
  (18,'Aruba','AW',0,NULL,1),
  (19,'Aland Islands','AX',0,NULL,1),
  (20,'Azerbaijan','AZ',0,NULL,1),
  (21,'Bosnia and Herzegovina','BA',0,NULL,1),
  (22,'Barbados','BB',0,NULL,1),
  (23,'Bangladesh','BD',0,NULL,1),
  (24,'Belgium','BE',0,NULL,1),
  (25,'Burkina Faso','BF',0,NULL,1),
  (26,'Bulgaria','BG',0,NULL,1),
  (27,'Bahrain','BH',0,NULL,1),
  (28,'Burundi','BI',0,NULL,1),
  (29,'Benin','BJ',0,NULL,1),
  (30,'Bermuda','BM',0,NULL,1),
  (31,'Brunei Darussalam','BN',0,NULL,1),
  (32,'Bolivia','BO',0,NULL,1),
  (33,'Brazil','BR',0,NULL,1),
  (34,'Bahamas','BS',0,NULL,1),
  (35,'Bhutan','BT',0,NULL,1),
  (36,'Bouvet Island','BV',0,NULL,1),
  (37,'Botswana','BW',0,NULL,1),
  (38,'Belarus','BY',0,NULL,1),
  (39,'Belize','BZ',0,NULL,1),
  (40,'Canada','CA',0,NULL,1),
  (41,'Cocos (Keeling) Islands','CC',0,NULL,1),
  (42,'Congo  The Democratic Republic of the','CD',0,NULL,1),
  (43,'Central African Republic','CF',0,NULL,1),
  (44,'Congo','CG',0,NULL,1),
  (45,'Switzerland','CH',0,NULL,1),
  (46,'Cote d''Ivoire','CI',0,NULL,1),
  (47,'Cook Islands','CK',0,NULL,1),
  (48,'Chile','CL',0,NULL,1),
  (49,'Cameroon','CM',0,NULL,1),
  (50,'China','CN',0,NULL,1),
  (51,'Colombia','CO',0,NULL,1),
  (52,'Costa Rica','CR',0,NULL,1),
  (53,'Cuba','CU',0,NULL,1),
  (54,'Cape Verde','CV',0,NULL,1),
  (55,'Christmas Island','CX',0,NULL,1),
  (56,'Cyprus','CY',0,NULL,1),
  (57,'Czech Republic','CZ',0,NULL,1),
  (58,'Germany','DE',0,NULL,1),
  (59,'Djibouti','DJ',0,NULL,1),
  (60,'Denmark','DK',0,NULL,1),
  (61,'Dominica','DM',0,NULL,1),
  (62,'Dominican Republic','DO',0,NULL,1),
  (63,'Algeria','DZ',0,NULL,1),
  (64,'Ecuador','EC',0,NULL,1),
  (65,'Estonia','EE',0,NULL,1),
  (66,'Egypt','EG',0,NULL,1),
  (67,'Western Sahara','EH',0,NULL,1),
  (68,'Eritrea','ER',0,NULL,1),
  (69,'Spain','ES',0,NULL,1),
  (70,'Ethiopia','ET',0,NULL,1),
  (71,'Europe','EU',0,NULL,1),
  (72,'Finland','FI',0,NULL,1),
  (73,'Fiji','FJ',0,NULL,1),
  (74,'Falkland Islands (Malvinas)','FK',0,NULL,1),
  (75,'Micronesia  Federated States of','FM',0,NULL,1),
  (76,'Faroe Islands','FO',0,NULL,1),
  (77,'France','FR',0,NULL,1),
  (78,'Gabon','GA',0,NULL,1),
  (79,'United Kingdom','GB',0,NULL,1),
  (80,'Grenada','GD',0,NULL,1),
  (81,'Georgia','GE',0,NULL,1),
  (82,'French Guiana','GF',0,NULL,1),
  (83,'Guernsey','GG',0,NULL,1),
  (84,'Ghana','GH',0,NULL,1),
  (85,'Gibraltar','GI',0,NULL,1),
  (86,'Greenland','GL',0,NULL,1),
  (87,'Gambia','GM',0,NULL,1),
  (88,'Guinea','GN',0,NULL,1),
  (89,'Guadeloupe','GP',0,NULL,1),
  (90,'Equatorial Guinea','GQ',0,NULL,1),
  (91,'Greece','GR',0,NULL,1),
  (92,'South Georgia and the South Sandwich Islands','GS',0,NULL,1),
  (93,'Guatemala','GT',0,NULL,1),
  (94,'Guam','GU',0,NULL,1),
  (95,'Guinea-Bissau','GW',0,NULL,1),
  (96,'Guyana','GY',0,NULL,1),
  (97,'Hong Kong','HK',0,NULL,1),
  (98,'Heard Island and McDonald Islands','HM',0,NULL,1),
  (99,'Honduras','HN',0,NULL,1),
  (100,'Croatia','HR',0,NULL,1),
  (101,'Haiti','HT',0,NULL,1),
  (102,'Hungary','HU',0,NULL,1),
  (103,'Indonesia','ID',0,NULL,1),
  (104,'Ireland','IE',0,NULL,1),
  (105,'Israel','IL',0,NULL,1),
  (106,'Isle of Man','IM',0,NULL,1),
  (107,'India','IN',0,NULL,1),
  (108,'British Indian Ocean Territory','IO',0,NULL,1),
  (109,'Iraq','IQ',0,NULL,1),
  (110,'Iran  Islamic Republic of','IR',0,NULL,1),
  (111,'Iceland','IS',0,NULL,1),
  (112,'Italy','IT',0,NULL,1),
  (113,'Jersey','JE',0,NULL,1),
  (114,'Jamaica','JM',0,NULL,1),
  (115,'Jordan','JO',0,NULL,1),
  (116,'Japan','JP',0,NULL,1),
  (117,'Kenya','KE',0,NULL,1),
  (118,'Kyrgyzstan','KG',0,NULL,1),
  (119,'Cambodia','KH',0,NULL,1),
  (120,'Kiribati','KI',0,NULL,1),
  (121,'Comoros','KM',0,NULL,1),
  (122,'Saint Kitts and Nevis','KN',0,NULL,1),
  (123,'Korea  Democratic People''s Republic of','KP',0,NULL,1),
  (124,'Korea  Republic of','KR',0,NULL,1),
  (125,'Kuwait','KW',0,NULL,1),
  (126,'Cayman Islands','KY',0,NULL,1),
  (127,'Kazakhstan','KZ',0,NULL,1),
  (128,'Lao People''s Democratic Republic','LA',0,NULL,1),
  (129,'Lebanon','LB',0,NULL,1),
  (130,'Saint Lucia','LC',0,NULL,1),
  (131,'Liechtenstein','LI',0,NULL,1),
  (132,'Sri Lanka','LK',0,NULL,1),
  (133,'Liberia','LR',0,NULL,1),
  (134,'Lesotho','LS',0,NULL,1),
  (135,'Lithuania','LT',0,NULL,1),
  (136,'Luxembourg','LU',0,NULL,1),
  (137,'Latvia','LV',0,NULL,1),
  (138,'Libyan Arab Jamahiriya','LY',0,NULL,1),
  (139,'Morocco','MA',0,NULL,1),
  (140,'Monaco','MC',0,NULL,1),
  (141,'Moldova  Republic of','MD',0,NULL,1),
  (142,'Montenegro','ME',0,NULL,1),
  (143,'Madagascar','MG',0,NULL,1),
  (144,'Marshall Islands','MH',0,NULL,1),
  (145,'Macedonia','MK',0,NULL,1),
  (146,'Mali','ML',0,NULL,1),
  (147,'Myanmar','MM',0,NULL,1),
  (148,'Mongolia','MN',0,NULL,1),
  (149,'Macao','MO',0,NULL,1),
  (150,'Northern Mariana Islands','MP',0,NULL,1),
  (151,'Martinique','MQ',0,NULL,1),
  (152,'Mauritania','MR',0,NULL,1),
  (153,'Montserrat','MS',0,NULL,1),
  (154,'Malta','MT',0,NULL,1),
  (155,'Mauritius','MU',0,NULL,1),
  (156,'Maldives','MV',0,NULL,1),
  (157,'Malawi','MW',0,NULL,1),
  (158,'Mexico','MX',0,NULL,1),
  (159,'Malaysia','MY',0,NULL,1),
  (160,'Mozambique','MZ',0,NULL,1),
  (161,'Namibia','NA',0,NULL,1),
  (162,'New Caledonia','NC',0,NULL,1),
  (163,'Niger','NE',0,NULL,1),
  (164,'Norfolk Island','NF',0,NULL,1),
  (165,'Nigeria','NG',0,NULL,1),
  (166,'Nicaragua','NI',0,NULL,1),
  (167,'Netherlands','NL',0,NULL,1),
  (168,'Norway','NO',0,NULL,1),
  (169,'Nepal','NP',0,NULL,1),
  (170,'Nauru','NR',0,NULL,1),
  (171,'Niue','NU',0,NULL,1),
  (172,'New Zealand','NZ',0,NULL,1),
  (173,'Oman','OM',0,NULL,1),
  (174,'Panama','PA',0,NULL,1),
  (175,'Peru','PE',0,NULL,1),
  (176,'French Polynesia','PF',0,NULL,1),
  (177,'Papua New Guinea','PG',0,NULL,1),
  (178,'Philippines','PH',0,NULL,1),
  (179,'Pakistan','PK',0,NULL,1),
  (180,'Poland','PL',0,NULL,1),
  (181,'Saint Pierre and Miquelon','PM',0,NULL,1),
  (182,'Pitcairn','PN',0,NULL,1),
  (183,'Puerto Rico','PR',0,NULL,1),
  (184,'Palestinian Territory','PS',0,NULL,1),
  (185,'Portugal','PT',0,NULL,1),
  (186,'Palau','PW',0,NULL,1),
  (187,'Paraguay','PY',0,NULL,1),
  (188,'Qatar','QA',0,NULL,1),
  (189,'Reunion','RE',0,NULL,1),
  (190,'Romania','RO',0,NULL,1),
  (191,'Serbia','RS',0,NULL,1),
  (192,'Russian Federation','RU',0,NULL,1),
  (193,'Rwanda','RW',0,NULL,1),
  (194,'Saudi Arabia','SA',0,NULL,1),
  (195,'Solomon Islands','SB',0,NULL,1),
  (196,'Seychelles','SC',0,NULL,1),
  (197,'Sudan','SD',0,NULL,1),
  (198,'Sweden','SE',0,NULL,1),
  (199,'Singapore','SG',0,NULL,1),
  (200,'Saint Helena','SH',0,NULL,1),
  (201,'Slovenia','SI',0,NULL,1),
  (202,'Svalbard and Jan Mayen','SJ',0,NULL,1),
  (203,'Slovakia','SK',0,NULL,1),
  (204,'Sierra Leone','SL',0,NULL,1),
  (205,'San Marino','SM',0,NULL,1),
  (206,'Senegal','SN',0,NULL,1),
  (207,'Somalia','SO',0,NULL,1),
  (208,'Suriname','SR',0,NULL,1),
  (209,'Sao Tome and Principe','ST',0,NULL,1),
  (210,'El Salvador','SV',0,NULL,1),
  (211,'Syrian Arab Republic','SY',0,NULL,1),
  (212,'Swaziland','SZ',0,NULL,1),
  (213,'Turks and Caicos Islands','TC',0,NULL,1),
  (214,'Chad','TD',0,NULL,1),
  (215,'French Southern Territories','TF',0,NULL,1),
  (216,'Togo','TG',0,NULL,1),
  (217,'Thailand','TH',0,NULL,1),
  (218,'Tajikistan','TJ',0,NULL,1),
  (219,'Tokelau','TK',0,NULL,1),
  (220,'Timor-Leste','TL',0,NULL,1),
  (221,'Turkmenistan','TM',0,NULL,1),
  (222,'Tunisia','TN',0,NULL,1),
  (223,'Tonga','TO',0,NULL,1),
  (224,'Turkey','TR',0,NULL,1),
  (225,'Trinidad and Tobago','TT',0,NULL,1),
  (226,'Tuvalu','TV',0,NULL,1),
  (227,'Taiwan','TW',0,NULL,1),
  (228,'Tanzania  United Republic of','TZ',0,NULL,1),
  (229,'Ukraine','UA',0,NULL,1),
  (230,'Uganda','UG',0,NULL,1),
  (231,'United States Minor Outlying Islands','UM',0,NULL,1),
  (232,'United States','US',0,NULL,1),
  (233,'Uruguay','UY',0,NULL,1),
  (234,'Uzbekistan','UZ',0,NULL,1),
  (235,'Holy See (Vatican City State)','VA',0,NULL,1),
  (236,'Saint Vincent and the Grenadines','VC',0,NULL,1),
  (237,'Venezuela','VE',0,NULL,1),
  (238,'Virgin Islands  British','VG',0,NULL,1),
  (239,'Virgin Islands  U.S.','VI',0,NULL,1),
  (240,'Vietnam','VN',0,NULL,1),
  (241,'Vanuatu','VU',0,NULL,1),
  (242,'Wallis and Futuna','WF',0,NULL,1),
  (243,'Samoa','WS',0,NULL,1),
  (244,'Yemen','YE',0,NULL,1),
  (245,'Mayotte','YT',0,NULL,1),
  (246,'South Africa','ZA',0,NULL,1),
  (247,'Zambia','ZM',0,NULL,1),
  (248,'Zimbabwe','ZW',0,NULL,1);
COMMIT;

#
# Data for the `app_contactstatus` table  (LIMIT 0,500)
#

INSERT INTO `app_contactstatus` (`contactStatusId`, `contactStatusDesc`) VALUES
  (1,'New'),
  (2,'Approved'),
  (3,'Rejected'),
  (4,'Disabled');
COMMIT;

#
# Data for the `app_contactafiliation` table  (LIMIT 0,500)
#

INSERT INTO `app_contactafiliation` (`contactAfiliationId`, `contactAfiliationName`) VALUES
  (1,'NyakiraWICBT Association'),
  (2,'Nyorohereza Ndengane WICBT Association'),
  (3,'Itezimbere Mukenyezi WIBCT Association');
COMMIT;

#
# Data for the `app_contactactivity` table  (LIMIT 0,500)
#

INSERT INTO `app_contactactivity` (`contactActivityId`, `contactActivityName`) VALUES
  (1,'Boutique'),
  (2,'Haricots'),
  (3,'Utensils');
COMMIT;

#
# Data for the `app_language` table  (LIMIT 0,500)
#

INSERT INTO `app_language` (`languageId`, `languageName`) VALUES
  (1,'English'),
  (2,'Español'),
  (3,'Française');
COMMIT;

#
# Data for the `app_resourcecategory` table  (LIMIT 0,500)
#

INSERT INTO `app_resourcecategory` (`resourceCategoryId`, `resourceCategoryName`, `created`, `lastUpdate`) VALUES
  (1,'Brochures','2016-03-20 23:41:15','2016-03-20 23:41:40'),
  (2,'Training Manuals','2016-03-20 23:43:03','2016-03-20 23:43:03'),
  (3,'Agricultural Model Contracts','2016-03-20 23:43:16','2016-03-20 23:43:16'),
  (4,'Tools and Forms','2016-03-20 23:43:27','2016-03-20 23:43:27');
COMMIT;

#
# Data for the `django_content_type` table  (LIMIT 0,500)
#

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
  (1,'auth','permission'),
  (2,'auth','group'),
  (3,'auth','user'),
  (4,'contenttypes','contenttype'),
  (5,'sessions','session'),
  (6,'sites','site'),
  (7,'admin','logentry'),
  (8,'app','country'),
  (9,'app','border'),
  (10,'app','language'),
  (11,'app','event'),
  (12,'app','resourcecategory'),
  (13,'app','resource'),
  (14,'app','contactcategory'),
  (15,'app','contactstatus'),
  (16,'app','contactactivity'),
  (17,'app','contactafiliation'),
  (18,'app','contact');
COMMIT;

#
# Data for the `auth_permission` table  (LIMIT 0,500)
#

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
  (1,'Can add permission',1,'add_permission'),
  (2,'Can change permission',1,'change_permission'),
  (3,'Can delete permission',1,'delete_permission'),
  (4,'Can add group',2,'add_group'),
  (5,'Can change group',2,'change_group'),
  (6,'Can delete group',2,'delete_group'),
  (7,'Can add user',3,'add_user'),
  (8,'Can change user',3,'change_user'),
  (9,'Can delete user',3,'delete_user'),
  (10,'Can add content type',4,'add_contenttype'),
  (11,'Can change content type',4,'change_contenttype'),
  (12,'Can delete content type',4,'delete_contenttype'),
  (13,'Can add session',5,'add_session'),
  (14,'Can change session',5,'change_session'),
  (15,'Can delete session',5,'delete_session'),
  (16,'Can add site',6,'add_site'),
  (17,'Can change site',6,'change_site'),
  (18,'Can delete site',6,'delete_site'),
  (19,'Can add log entry',7,'add_logentry'),
  (20,'Can change log entry',7,'change_logentry'),
  (21,'Can delete log entry',7,'delete_logentry'),
  (22,'Can add Country',8,'add_country'),
  (23,'Can change Country',8,'change_country'),
  (24,'Can delete Country',8,'delete_country'),
  (25,'Can add Border',9,'add_border'),
  (26,'Can change Border',9,'change_border'),
  (27,'Can delete Border',9,'delete_border'),
  (28,'Can add language',10,'add_language'),
  (29,'Can change language',10,'change_language'),
  (30,'Can delete language',10,'delete_language'),
  (31,'Can add event',11,'add_event'),
  (32,'Can change event',11,'change_event'),
  (33,'Can delete event',11,'delete_event'),
  (34,'Can add Resource Category',12,'add_resourcecategory'),
  (35,'Can change Resource Category',12,'change_resourcecategory'),
  (36,'Can delete Resource Category',12,'delete_resourcecategory'),
  (37,'Can add resource',13,'add_resource'),
  (38,'Can change resource',13,'change_resource'),
  (39,'Can delete resource',13,'delete_resource'),
  (40,'Can add Contact Category',14,'add_contactcategory'),
  (41,'Can change Contact Category',14,'change_contactcategory'),
  (42,'Can delete Contact Category',14,'delete_contactcategory'),
  (43,'Can add contact status',15,'add_contactstatus'),
  (44,'Can change contact status',15,'change_contactstatus'),
  (45,'Can delete contact status',15,'delete_contactstatus'),
  (46,'Can add Contact Activity',16,'add_contactactivity'),
  (47,'Can change Contact Activity',16,'change_contactactivity'),
  (48,'Can delete Contact Activity',16,'delete_contactactivity'),
  (49,'Can add Contact Afiliation',17,'add_contactafiliation'),
  (50,'Can change Contact Afiliation',17,'change_contactafiliation'),
  (51,'Can delete Contact Afiliation',17,'delete_contactafiliation'),
  (52,'Can add contact',18,'add_contact'),
  (53,'Can change contact',18,'change_contact'),
  (54,'Can delete contact',18,'delete_contact');
COMMIT;

#
# Data for the `django_migrations` table  (LIMIT 0,500)
#

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
  (1,'contenttypes','0001_initial','2016-03-23 06:14:14'),
  (2,'auth','0001_initial','2016-03-23 06:14:14'),
  (3,'admin','0001_initial','2016-03-23 06:14:14'),
  (4,'admin','0002_logentry_remove_auto_add','2016-03-23 06:14:14'),
  (5,'app','0001_initial','2016-03-23 06:14:15'),
  (6,'contenttypes','0002_remove_content_type_name','2016-03-23 06:14:15'),
  (7,'auth','0002_alter_permission_name_max_length','2016-03-23 06:14:15'),
  (8,'auth','0003_alter_user_email_max_length','2016-03-23 06:14:15'),
  (9,'auth','0004_alter_user_username_opts','2016-03-23 06:14:15'),
  (10,'auth','0005_alter_user_last_login_null','2016-03-23 06:14:15'),
  (11,'auth','0006_require_contenttypes_0002','2016-03-23 06:14:15'),
  (12,'auth','0007_alter_validators_add_error_messages','2016-03-23 06:14:15'),
  (13,'sessions','0001_initial','2016-03-23 06:14:15'),
  (14,'sites','0001_initial','2016-03-23 06:14:15'),
  (15,'sites','0002_alter_domain_unique','2016-03-23 06:14:15'),
  (16,'app','0002_auto_20160323_0710','2016-03-23 07:14:00');
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
