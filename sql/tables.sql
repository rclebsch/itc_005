# SQL Manager 2007 for MySQL 4.3.3.2
# ---------------------------------------
# Host     : localhost
# Port     : 3306
# Database : itc_005


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

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



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
