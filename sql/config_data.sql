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
# Data for the `app_border` table  (LIMIT 0,500)
#

INSERT INTO `app_border` (`borderId`, `borderName`) VALUES
  (1,'Kayanza'),
  (2,'Kobero'),
  (3,'Muyinga');
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
# Data for the `app_contactafiliation` table  (LIMIT 0,500)
#

INSERT INTO `app_contactafiliation` (`contactAfiliationId`, `contactAfiliationName`) VALUES
  (3,'Itezimbere Mukenyezi WIBCT Association'),
  (1,'NyakiraWICBT Association'),
  (2,'Nyorohereza Ndengane WICBT Association');
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
  (8,'Logistic Service Providers',0);
COMMIT;

#
# Data for the `app_contactstatus` table  (LIMIT 0,500)
#

INSERT INTO `app_contactstatus` (`contactStatusId`, `contactStatusDesc`) VALUES
  (2,'Approved'),
  (4,'Disabled'),
  (1,'New'),
  (3,'Rejected');
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



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
