CREATE DATABASE  IF NOT EXISTS `QuanLyNhaXe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `QuanLyNhaXe`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: quanlynhaxe
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_active` bit(1) NOT NULL,
  `role_id` int DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `oauth_id` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_gex1lmaqpg0ir5g1f5eftyaa1` (`username`),
  KEY `FKd4vb66o896tay3yy52oqxr9w0` (`role_id`),
  CONSTRAINT `FKd4vb66o896tay3yy52oqxr9w0` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (89,_binary '',5,'$2a$10$JGvOAL7Lkl.TWBLRcPyDvet8m9xdGW6.yPQjKP4CZOxSvezr07.fm','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NyIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJNQU5BR0VSIn1dLCJ0eXBlIjoiQWNjZXNzIFRva2VuIiwiaWF0IjoxNzE3MjE3OTQ2LCJleHAiOjE3MTc4MTEzMDl9.cXzkhzJlAkAu-3PwieR246sg4fik7ihgEHzNDgQ2wiI','20110315@student.hcmute.edu.vn',NULL),(105,_binary '',1,'$2a$10$Bun8vntLWKvTmXJGE/ea.ufyrlNUoLDS9Wk1WSyyYD82CBQIwTvee','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDMiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInR5cGUiOiJBY2Nlc3MgVG9rZW4iLCJpYXQiOjE3MTcyMjM4MDUsImV4cCI6MTcxNzgyMDAyMn0.D5BQARd9_naGe7AyT0o-dzeAPHBOFBp8dvGMjWDpcso','an@gmail.com',''),(106,_binary '',2,'$2a$10$ly/5VBz4qdzMoqu1fV190uNN99L87ScEO7mfDWV.ZkG1N5/s41RnC','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDQiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiU1RBRkYifV0sInR5cGUiOiJSZWZyZXNoIFRva2VuIiwiaWF0IjoxNzE2Mzk0Mzc0LCJleHAiOjE3MTY5OTkxNzR9.nR-1N33zc_wLo-ABKNjejcYD5HcCU6uVibqCmBSpMZs','ho@gmail.com',''),(107,_binary '',1,'$2a$10$olK8od0Nrl97ENV/eJUX/uXKYPvzuiOGOzb.U/HwJrRbpm2LTzgy.','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDUiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInR5cGUiOiJSZWZyZXNoIFRva2VuIiwiaWF0IjoxNzE2MzkzMDIxLCJleHAiOjE3MTY5OTc4MjF9.5u9BWJPUJGixb-L8bOw7MaQluV4u4uqUlb1XZl3ed0U','kimle02012@gmail.com',''),(108,_binary '',1,'$2a$10$CpAihBYYdeyvp6fVNZGkmegRYtShfOaop09Fl8kJb.oYaQWJuRxzS',NULL,'thuan@gmail.com',''),(109,_binary '',1,'$2a$10$dGA9vsvvUxt94fJgKYysy.ixF7/TQdwHr.ioGDjH.4mPJ2OJ17ISS',NULL,'hoang@gmail.com',''),(110,_binary '',1,'$2a$10$9/zCbvP0CuoOWynLGegp3uQD0szCVEcobZ4QIgeWMxbnR.w9AuBrq',NULL,'hoangn@gmail.com',''),(111,_binary '',1,'$2a$10$CHHrDb4bw8e9PWwRH/TxyO7vc40DSrlbA1u7NvwG7IYuaffE1WsPK',NULL,'donthandochai23@gmail.com',''),(112,_binary '',1,'$2a$10$m02V2DRQtSPtLEE0Piion.a7ga9/NlJEHaTr8Y5.XfjTZQ/Ss9LfG',NULL,'kimle020102@gmail.com',''),(113,_binary '',3,'$2a$10$N72H0wvi2l6zDVTsJftYd.DAigTwkDnNfoIwrxVDZdzLzrmTyOUwO',NULL,'tho@gmail.com',''),(114,_binary '',3,'$2a$10$CzpYWxCKZcV9Zw71E/y4dus3x0LTwyQoBdzfnSwytPHVL8bjKkRH.',NULL,'nam@gmail.com',''),(115,_binary '',3,'$2a$10$v8SA3mi6LqcgNFeSlv7c4eXCknDFep1Xojp0/xKDbnq8v4I3eLO7W','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTMiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiRFJJVkVSIn1dLCJ0eXBlIjoiQWNjZXNzIFRva2VuIiwiaWF0IjoxNzE2OTEzMDY1LCJleHAiOjE3MTc1MTQ3MjR9.NCZoZK5TkXmmKzcun__u9ucYLo11r80A2AR8Uh2e3-Y','chau@gmail.com',''),(116,_binary '',3,'$2a$10$hC34PzPiTJRLx6fGu7ieI.n7fTanApT3rpwfCz17R8ZRPVApsKOiW',NULL,'chi@gmail.com',''),(117,_binary '',4,'$2a$10$VoK3trPiYLrVb7g1AxoXnOLB20AtRL8.8D8u/BjvGDnZesWoBWt5S','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTUiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQ1VTVE9NRVIifV0sInR5cGUiOiJBY2Nlc3MgVG9rZW4iLCJpYXQiOjE3MTYxMjg0OTcsImV4cCI6MTcxNjcxNzI2Mn0.28r91xJXE6cMKuf88MmfLSoG-5uYUHjDjW-LIvpoofM','+84842281119','108577443841809503650'),(118,_binary '',3,'$2a$10$yTTswCmxQ1wMw592xlnaDuhoASC8oLOSZiyLXYYYuLomyQQnGScYS',NULL,'ngo@gmail.com',''),(119,_binary '',1,'$2a$10$uPjTXNxtcRe58ek0Z1840uhCSBKLPf/Oj916xbuTDheZL2oFFqkFK',NULL,'hoa@gmail.com','');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `staff_id` int DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `UK_b9v7hm28yi9p62lbe1497ell7` (`staff_id`),
  CONSTRAINT `FKpfjyosx85te798iryn7m6cw1u` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (18,32),(19,34),(20,35),(21,36),(22,37),(23,38),(24,39),(25,40);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `refer_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=443 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (438,'HE7TFQL'),(439,'C89LJ64'),(440,'RHTJ6TO'),(441,'1JU9RVY'),(442,'I00M178');
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_user_id` int DEFAULT NULL,
  `conduct_staff_id` int DEFAULT NULL,
  `drop_station` int DEFAULT NULL,
  `is_ticketing` bit(1) NOT NULL,
  `pick_station` int DEFAULT NULL,
  `ticket_number` int NOT NULL,
  `transaction_id` int DEFAULT NULL,
  `trip_id` int DEFAULT NULL,
  `code` varchar(7) NOT NULL,
  `booking_date` datetime(6) NOT NULL,
  `email` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `order_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `UK_qb4wlileescdojk32x9qebrjc` (`transaction_id`),
  KEY `FK81p15i3m6sq98wnog6dyuygxc` (`booking_user_id`),
  KEY `FKjjrugfvtfq4dwf7npgj5c80a8` (`conduct_staff_id`),
  KEY `FKerce2395050fsisr39jeuu0at` (`drop_station`),
  KEY `FKklv1yj5xnmnxix57eptr1p038` (`pick_station`),
  KEY `FKkp5ujmgvd2pmsehwpu2vyjkwb` (`trip_id`),
  CONSTRAINT `FK5ify3pjpncs24hq6yexr3tugf` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`),
  CONSTRAINT `FK81p15i3m6sq98wnog6dyuygxc` FOREIGN KEY (`booking_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKerce2395050fsisr39jeuu0at` FOREIGN KEY (`drop_station`) REFERENCES `stop_station` (`id`),
  CONSTRAINT `FKjjrugfvtfq4dwf7npgj5c80a8` FOREIGN KEY (`conduct_staff_id`) REFERENCES `staff` (`staff_id`),
  CONSTRAINT `FKklv1yj5xnmnxix57eptr1p038` FOREIGN KEY (`pick_station`) REFERENCES `stop_station` (`id`),
  CONSTRAINT `FKkp5ujmgvd2pmsehwpu2vyjkwb` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (NULL,NULL,203,_binary '\0',205,2,225,64,'GDNQC5','2024-04-27 09:15:32.723789','anma@gmail.com','Thành công','09090909091','Lê','39614240'),(NULL,NULL,200,_binary '\0',193,3,224,61,'GH1PFJ','2024-04-27 08:53:09.463440','anma@gmail.com','Thành công','09090909091','Lê','63926086');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus`
--

DROP TABLE IF EXISTS `bus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int DEFAULT NULL,
  `license_plate` varchar(255) NOT NULL,
  `manufacture_year` int NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `availability` varchar(45) DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_eufogh6i6sop1npxoho37ncbe` (`state_id`),
  KEY `FKajrtrtb3907na3inrdd4e2hm6` (`type_id`),
  KEY `cpnid4_idx` (`company_id`),
  CONSTRAINT `cpnid4` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `FKajrtrtb3907na3inrdd4e2hm6` FOREIGN KEY (`type_id`) REFERENCES `bus_type` (`id`),
  CONSTRAINT `FKsrcsdbesvw85ool30y1jxthjo` FOREIGN KEY (`state_id`) REFERENCES `bus_quality` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus`
--

LOCK TABLES `bus` WRITE;
/*!40000 ALTER TABLE `bus` DISABLE KEYS */;
INSERT INTO `bus` VALUES (26,5,'79C-097.79',2022,'Cam','Sẵn sàng',26,11),(27,5,'67C-097.00',2022,'Cam','Sẵn sàng',27,11),(28,5,'67C-097.03',2022,'Cam','Sẵn sàng',28,11),(29,5,'79C-097.89',2022,'Cam','Sẵn sàng',29,11);
/*!40000 ALTER TABLE `bus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus_company`
--

DROP TABLE IF EXISTS `bus_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus_company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `coop_day` date NOT NULL,
  `business_license` varchar(250) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_company`
--

LOCK TABLES `bus_company` WRITE;
/*!40000 ALTER TABLE `bus_company` DISABLE KEYS */;
INSERT INTO `bus_company` VALUES (11,'Xe Châu An','2024-04-27','98942334243',1,18),(12,'Xe Châu Phú','2024-04-27','98982234243',1,19),(13,'Xe Châu Thuận','2024-04-28','98988334443',1,20),(14,'Xe Liên Hoàng','2024-04-29','98988774443',1,21),(15,'Xe Liên Hưng','2024-04-29','98988774443',1,22),(16,'Xe Thành Liên','2024-05-05','9865HIJUIJ',1,23),(17,'Xe Phú Mỹ','2024-05-05','98C423945',1,24),(18,'Xe Hòa Hảo','2024-05-23','98C423111',1,25);
/*!40000 ALTER TABLE `bus_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus_quality`
--

DROP TABLE IF EXISTS `bus_quality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus_quality` (
  `id` int NOT NULL AUTO_INCREMENT,
  `update_at` date NOT NULL,
  `air_condition` varchar(255) NOT NULL,
  `brake` varchar(255) NOT NULL,
  `electric` varchar(255) NOT NULL,
  `fuel` varchar(255) NOT NULL,
  `lighting` varchar(255) NOT NULL,
  `mirror` varchar(255) NOT NULL,
  `steering` varchar(255) NOT NULL,
  `tire` varchar(255) NOT NULL,
  `overall_state` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_quality`
--

LOCK TABLES `bus_quality` WRITE;
/*!40000 ALTER TABLE `bus_quality` DISABLE KEYS */;
INSERT INTO `bus_quality` VALUES (26,'2024-05-14','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(27,'2024-05-14','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(28,'2024-05-14','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(29,'2024-05-14','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường');
/*!40000 ALTER TABLE `bus_quality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus_type`
--

DROP TABLE IF EXISTS `bus_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `fee` int DEFAULT NULL,
  `seatmap_id` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_lk5jd2xt4w731pppyfgrwx36x` (`seatmap_id`),
  KEY `cpnid5_idx` (`company_id`),
  CONSTRAINT `cpnid5` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `FKeidjcxjck2oefj001gdfa1p6w` FOREIGN KEY (`seatmap_id`) REFERENCES `seat_map` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_type`
--

LOCK TABLES `bus_type` WRITE;
/*!40000 ALTER TABLE `bus_type` DISABLE KEYS */;
INSERT INTO `bus_type` VALUES (5,'limousine_40',40,10000,5,'limousine 40 chỗ',11,1,'http://localhost:5000/api/images/1715964799709-bus1.jpeg'),(6,'limousine_33',33,0,6,'limousine 33 chỗ',12,1,NULL),(7,'bus_20',20,50000,7,'Xe khách 20 chỗ',11,0,NULL),(8,'normal_1',30,0,10,'Xe giường nằm thường',11,1,'http://localhost:5000/api/images/1715935440122-bus.jpeg');
/*!40000 ALTER TABLE `bus_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancel_request`
--

DROP TABLE IF EXISTS `cancel_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancel_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `policy_id` int DEFAULT NULL,
  `request_time` datetime DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `staff_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `staff_Key_idx` (`staff_id`),
  KEY `p_k_idx` (`policy_id`),
  CONSTRAINT `p_k` FOREIGN KEY (`policy_id`) REFERENCES `policy` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `staff_Key` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancel_request`
--

LOCK TABLES `cancel_request` WRITE;
/*!40000 ALTER TABLE `cancel_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `cancel_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `UK_j7ja2xvrxudhvssosd4nu1o92` (`user_id`),
  CONSTRAINT `FKj8dlm21j202cadsbfkoem0s58` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (26,115,'http://localhost:5000/api/static/images/1716128497598-Picture11.png');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver` (
  `driver_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `begin_work_date` datetime(6) DEFAULT NULL,
  `issue_date` datetime(6) NOT NULL,
  `id_card` varchar(15) NOT NULL,
  `license_number` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`driver_id`),
  UNIQUE KEY `UK_83rhth06evmv49g4liabxacc2` (`id_card`),
  UNIQUE KEY `UK_9yq25nknyh5y5gihylet1ypy9` (`license_number`),
  UNIQUE KEY `UK_g3oju5uudgl1cct873m6f2bfy` (`user_id`),
  KEY `cpniddriver_idx` (`company_id`),
  CONSTRAINT `cpniddriver` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `FKkux9gqt7e9mh4rd4oo4i5ov0f` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES (32,111,'2024-05-14 07:00:00.000000','2024-05-14 07:00:00.000000','098673530411','6886T03970','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11),(33,112,'2024-05-14 07:00:00.000000','2024-05-14 07:00:00.000000','098673530412','6886T03972','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11),(34,113,'2024-05-14 07:00:00.000000','2024-05-14 07:00:00.000000','098673530415','6886T03975','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11),(35,114,'2024-05-14 07:00:00.000000','2024-05-14 07:00:00.000000','098673530424','6886T03981','Gò Vấp, Hồ Chí Minh','http://localhost:5000/api/images/1715962583271-LeThiKimLe.jpg',11),(36,116,'2024-05-16 07:00:00.000000','2024-05-16 07:00:00.000000','098673530435','6886T03935','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11);
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fixed_schedule`
--

DROP TABLE IF EXISTS `fixed_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fixed_schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trip_id` int DEFAULT NULL,
  `time` time DEFAULT NULL,
  `day_of_week` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tripid123_idx` (`trip_id`),
  CONSTRAINT `tripid123` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=413 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fixed_schedule`
--

LOCK TABLES `fixed_schedule` WRITE;
/*!40000 ALTER TABLE `fixed_schedule` DISABLE KEYS */;
INSERT INTO `fixed_schedule` VALUES (33,61,'07:00:00',2),(34,61,'07:00:00',3),(35,61,'07:00:00',4),(36,61,'07:00:00',5),(37,61,'07:00:00',6),(38,61,'07:00:00',7),(39,61,'07:00:00',8),(40,62,'21:00:00',2),(41,62,'21:00:00',3),(42,62,'21:00:00',4),(43,62,'21:00:00',5),(44,62,'21:00:00',6),(45,62,'21:00:00',7),(46,62,'21:00:00',8),(47,63,'13:00:00',2),(48,63,'15:00:00',2),(49,63,'13:00:00',3),(50,63,'15:00:00',3),(51,63,'13:00:00',4),(52,63,'15:00:00',4),(53,63,'13:00:00',5),(54,63,'15:00:00',5),(55,63,'13:00:00',6),(56,63,'15:00:00',6),(57,63,'13:00:00',7),(58,63,'15:00:00',7),(59,63,'13:00:00',8),(60,63,'15:00:00',8),(61,64,'07:00:00',2),(62,64,'09:00:00',2),(63,64,'07:00:00',3),(64,64,'09:00:00',3),(65,64,'07:00:00',4),(66,64,'09:00:00',4),(67,64,'07:00:00',5),(68,64,'09:00:00',5),(69,64,'07:00:00',6),(70,64,'09:00:00',6),(71,64,'07:00:00',7),(72,64,'09:00:00',7),(73,64,'07:00:00',8),(74,64,'09:00:00',8),(75,65,'08:00:00',2),(76,65,'09:00:00',2),(77,65,'08:00:00',3),(78,65,'09:00:00',3),(79,65,'08:00:00',4),(80,65,'09:00:00',4),(81,65,'08:00:00',5),(82,65,'09:00:00',5),(83,65,'08:00:00',6),(84,65,'09:00:00',6),(85,65,'08:00:00',7),(86,65,'09:00:00',7),(87,65,'08:00:00',8),(88,65,'09:00:00',8),(89,66,'10:00:00',2),(90,66,'12:00:00',2),(91,66,'10:00:00',3),(92,66,'12:00:00',3),(93,66,'10:00:00',4),(94,66,'12:00:00',4),(95,66,'10:00:00',5),(96,66,'12:00:00',5),(97,66,'10:00:00',6),(98,66,'12:00:00',6),(99,66,'10:00:00',7),(100,66,'12:00:00',7),(101,66,'10:00:00',8),(102,66,'12:00:00',8),(103,67,'07:00:00',2),(104,67,'15:00:00',2),(105,67,'07:00:00',3),(106,67,'15:00:00',3),(107,67,'07:00:00',4),(108,67,'15:00:00',4),(109,67,'07:00:00',5),(110,67,'15:00:00',5),(111,67,'07:00:00',6),(112,67,'15:00:00',6),(113,67,'07:00:00',7),(114,67,'15:00:00',7),(115,67,'07:00:00',8),(116,67,'15:00:00',8),(117,68,'20:00:00',2),(118,68,'20:00:00',3),(119,68,'20:00:00',4),(120,68,'20:00:00',5),(121,68,'20:00:00',6),(122,68,'20:00:00',7),(123,68,'20:00:00',8),(124,69,'07:00:00',2),(125,69,'16:00:00',2),(126,69,'07:00:00',3),(127,69,'16:00:00',3),(128,69,'07:00:00',4),(129,69,'16:00:00',4),(130,69,'07:00:00',5),(131,69,'16:00:00',5),(132,69,'07:00:00',6),(133,69,'16:00:00',6),(134,69,'07:00:00',7),(135,69,'16:00:00',7),(136,69,'07:00:00',8),(137,69,'16:00:00',8),(138,70,'18:00:00',2),(139,70,'18:00:00',3),(140,70,'18:00:00',4),(141,70,'18:00:00',5),(142,70,'18:00:00',6),(143,70,'18:00:00',7),(144,70,'18:00:00',8),(145,71,'07:00:00',2),(146,71,'07:00:00',3),(147,71,'07:00:00',4),(148,71,'07:00:00',5),(149,71,'07:00:00',6),(150,71,'07:00:00',7),(151,71,'07:00:00',8),(152,72,'08:00:00',2),(153,72,'08:00:00',3),(154,72,'08:00:00',4),(155,72,'08:00:00',5),(156,72,'08:00:00',6),(159,72,'08:00:00',7),(160,71,'09:00:00',8),(161,73,'07:00:00',2),(162,73,'07:00:00',3),(163,73,'07:00:00',4),(164,73,'07:00:00',5),(165,73,'07:00:00',6),(166,73,'07:00:00',7),(167,73,'07:00:00',8),(168,74,'07:00:00',2),(169,74,'07:00:00',3),(170,74,'07:00:00',4),(171,74,'07:00:00',5),(172,74,'07:00:00',6),(173,74,'07:00:00',7),(174,74,'07:00:00',8),(175,75,'10:00:00',2),(176,75,'10:00:00',3),(177,75,'10:00:00',4),(178,75,'10:00:00',5),(179,75,'10:00:00',6),(180,75,'10:00:00',7),(181,75,'10:00:00',8),(182,76,'22:00:00',2),(183,76,'22:00:00',3),(184,76,'22:00:00',4),(185,76,'22:00:00',5),(186,76,'22:00:00',6),(187,76,'22:00:00',7),(188,76,'22:00:00',8),(189,77,'07:00:00',2),(190,77,'07:00:00',3),(191,77,'07:00:00',4),(192,77,'07:00:00',5),(193,77,'07:00:00',6),(194,77,'07:00:00',7),(195,77,'07:00:00',8),(196,78,'07:00:00',2),(197,78,'07:00:00',3),(198,78,'07:00:00',4),(199,78,'07:00:00',5),(200,78,'07:00:00',6),(201,78,'07:00:00',7),(202,78,'07:00:00',8),(203,79,'07:00:00',2),(204,79,'07:00:00',3),(205,79,'07:00:00',4),(206,79,'07:00:00',5),(207,79,'07:00:00',6),(208,79,'07:00:00',7),(209,79,'07:00:00',8),(210,80,'07:00:00',2),(211,80,'07:00:00',3),(212,80,'07:00:00',4),(213,80,'07:00:00',5),(214,80,'07:00:00',6),(215,80,'07:00:00',7),(216,80,'07:00:00',8),(217,81,'07:00:00',2),(218,81,'07:00:00',3),(219,81,'07:00:00',4),(220,81,'07:00:00',5),(221,81,'07:00:00',6),(222,81,'07:00:00',7),(223,81,'07:00:00',8),(224,82,'07:00:00',2),(225,82,'07:00:00',3),(226,82,'07:00:00',4),(227,82,'07:00:00',5),(228,82,'07:00:00',6),(229,82,'07:00:00',7),(230,82,'07:00:00',8),(231,83,'07:00:00',2),(232,83,'07:00:00',3),(233,83,'07:00:00',4),(234,83,'07:00:00',5),(235,83,'07:00:00',6),(236,83,'07:00:00',7),(237,83,'07:00:00',8),(238,84,'07:00:00',2),(239,84,'07:00:00',3),(240,84,'07:00:00',4),(241,84,'07:00:00',5),(242,84,'07:00:00',6),(243,84,'07:00:00',7),(244,84,'07:00:00',8),(245,85,'07:00:00',2),(246,85,'07:00:00',3),(247,85,'07:00:00',4),(248,85,'07:00:00',5),(249,85,'07:00:00',6),(250,85,'07:00:00',7),(251,85,'07:00:00',8),(252,86,'07:00:00',2),(253,86,'07:00:00',3),(254,86,'07:00:00',4),(255,86,'07:00:00',5),(256,86,'07:00:00',6),(257,86,'07:00:00',7),(258,86,'07:00:00',8),(259,87,'07:00:00',2),(260,87,'07:00:00',3),(261,87,'07:00:00',4),(262,87,'07:00:00',5),(263,87,'07:00:00',6),(264,87,'07:00:00',7),(265,87,'07:00:00',8),(266,88,'07:00:00',2),(267,88,'07:00:00',3),(268,88,'07:00:00',4),(269,88,'07:00:00',5),(270,88,'07:00:00',6),(271,88,'07:00:00',7),(272,88,'07:00:00',8),(273,89,'07:00:00',2),(274,89,'09:00:00',2),(275,89,'07:00:00',3),(276,89,'09:00:00',3),(277,89,'07:00:00',4),(278,89,'09:00:00',4),(279,89,'07:00:00',5),(280,89,'09:00:00',5),(281,89,'07:00:00',6),(282,89,'09:00:00',6),(283,89,'07:00:00',7),(284,89,'09:00:00',7),(285,89,'07:00:00',8),(286,89,'09:00:00',8),(287,90,'10:00:00',2),(288,90,'13:00:00',2),(289,90,'10:00:00',3),(290,90,'13:00:00',3),(291,90,'10:00:00',4),(292,90,'13:00:00',4),(293,90,'10:00:00',5),(294,90,'13:00:00',5),(295,90,'10:00:00',6),(296,90,'13:00:00',6),(297,90,'10:00:00',7),(298,90,'13:00:00',7),(299,90,'10:00:00',8),(300,90,'13:00:00',8),(301,91,'07:00:00',2),(302,91,'07:00:00',3),(303,91,'07:00:00',4),(304,91,'07:00:00',5),(305,91,'07:00:00',6),(306,91,'07:00:00',7),(307,91,'07:00:00',8),(308,92,'07:00:00',2),(309,92,'07:00:00',3),(310,92,'07:00:00',4),(311,92,'07:00:00',5),(312,92,'07:00:00',6),(313,92,'07:00:00',7),(314,92,'07:00:00',8),(315,93,'07:00:00',2),(316,93,'07:00:00',3),(317,93,'07:00:00',4),(318,93,'07:00:00',5),(319,93,'07:00:00',6),(320,93,'07:00:00',7),(321,93,'07:00:00',8),(322,94,'08:00:00',2),(323,94,'08:00:00',3),(324,94,'08:00:00',4),(325,94,'08:00:00',5),(326,94,'08:00:00',6),(327,94,'08:00:00',7),(328,94,'08:00:00',8),(329,95,'07:00:00',2),(330,95,'07:00:00',3),(331,95,'07:00:00',4),(332,95,'07:00:00',5),(333,95,'07:00:00',6),(334,95,'07:00:00',7),(335,95,'07:00:00',8),(336,96,'07:00:00',2),(337,96,'07:00:00',3),(338,96,'07:00:00',4),(339,96,'07:00:00',5),(340,96,'07:00:00',6),(341,96,'07:00:00',7),(342,96,'07:00:00',8),(343,97,'21:00:00',2),(344,97,'23:00:00',2),(345,97,'21:00:00',3),(346,97,'23:00:00',3),(347,97,'21:00:00',4),(348,97,'23:00:00',4),(349,97,'21:00:00',5),(350,97,'23:00:00',5),(351,97,'21:00:00',6),(352,97,'23:00:00',6),(353,97,'21:00:00',7),(354,97,'23:00:00',7),(355,97,'21:00:00',8),(356,97,'23:00:00',8),(357,98,'07:00:00',2),(358,98,'08:00:00',2),(359,98,'07:00:00',3),(360,98,'08:00:00',3),(361,98,'07:00:00',4),(362,98,'08:00:00',4),(363,98,'07:00:00',5),(364,98,'08:00:00',5),(365,98,'07:00:00',6),(366,98,'08:00:00',6),(367,98,'07:00:00',7),(368,98,'08:00:00',7),(369,98,'07:00:00',8),(370,98,'08:00:00',8),(371,99,'08:00:00',2),(372,99,'09:00:00',2),(373,99,'08:00:00',3),(374,99,'09:00:00',3),(375,99,'08:00:00',4),(376,99,'09:00:00',4),(377,99,'08:00:00',5),(378,99,'09:00:00',5),(379,99,'08:00:00',6),(380,99,'09:00:00',6),(381,99,'08:00:00',7),(382,99,'09:00:00',7),(383,99,'08:00:00',8),(384,99,'09:00:00',8),(385,100,'10:00:00',2),(386,100,'12:00:00',2),(387,100,'10:00:00',3),(388,100,'12:00:00',3),(389,100,'10:00:00',4),(390,100,'12:00:00',4),(391,100,'10:00:00',5),(392,100,'12:00:00',5),(393,100,'10:00:00',6),(394,100,'12:00:00',6),(395,100,'10:00:00',7),(396,100,'12:00:00',7),(397,100,'10:00:00',8),(398,100,'12:00:00',8),(399,101,'07:00:00',2),(400,101,'07:00:00',3),(401,101,'07:00:00',4),(402,101,'07:00:00',5),(403,101,'07:00:00',6),(404,101,'07:00:00',7),(405,101,'07:00:00',8),(406,102,'10:00:00',2),(407,102,'10:00:00',3),(408,102,'10:00:00',4),(409,102,'10:00:00',5),(410,102,'10:00:00',6),(411,102,'10:00:00',7),(412,102,'10:00:00',8);
/*!40000 ALTER TABLE `fixed_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `policy_id` int DEFAULT NULL,
  `ticket_id` int DEFAULT NULL,
  `transaction_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `timestamp` datetime(6) NOT NULL,
  `action` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKngnerpp7ve3oehbxqaf8grxju` (`policy_id`),
  KEY `FKjwi92n01fb8qq489ln1qpsd62` (`ticket_id`),
  KEY `FKrewni415li435xlgoorwmveb0` (`transaction_id`),
  KEY `FKn4gjyu69m6xa5f3bot571imbe` (`user_id`),
  CONSTRAINT `FKjwi92n01fb8qq489ln1qpsd62` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`),
  CONSTRAINT `FKn4gjyu69m6xa5f3bot571imbe` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKngnerpp7ve3oehbxqaf8grxju` FOREIGN KEY (`policy_id`) REFERENCES `policy` (`id`),
  CONSTRAINT `FKrewni415li435xlgoorwmveb0` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (37,'TP. Hồ Chí Minh',1),(38,'Khánh Hòa',1),(39,'Trà Vinh',1),(40,'Bình Định',1),(41,'Cà Mau',1),(42,'Hà Nội',1),(43,'Nam Định',1),(44,'Lào Cai',1),(45,'Cao Bằng',1),(46,'Phú Thọ',1),(47,'Hải Phòng',1),(48,'Điện Biên',1),(49,'Hòa Bình',1),(50,'Quảng Ninh',1),(51,'Thái Bình',1),(52,'Lâm Đồng',1),(53,'Tuyên Quang',1),(54,'Hà Giang',1),(55,'Sơn La',1),(56,'Lai Châu',1),(57,'Bà Rịa - Vǜng Tàu',1),(58,'Thái Nguyên',1),(59,'Thanh Hoá',1),(60,'Bắc Giang',1),(61,'Quảng Trị',1);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy`
--

DROP TABLE IF EXISTS `policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action` varchar(255) NOT NULL,
  `min_number_required` int NOT NULL,
  `number_required` int NOT NULL,
  `time_required` float NOT NULL,
  `refund_rate` float NOT NULL,
  `for_special_day` tinyint(1) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy`
--

LOCK TABLES `policy` WRITE;
/*!40000 ALTER TABLE `policy` DISABLE KEYS */;
INSERT INTO `policy` VALUES (1,'Hủy',1,3,0.5,0.7,0,'Khách hàng hủy từ 1-3 vé trước ít nhất 30p trước giờ khởi hành sẽ được hoàn 70% tiền vé đối với vé thường'),(2,'Hủy',1,3,4,0.9,0,'Khách hàng hủy từ 1-3 vé trước ít nhất 4 tiếng trước giờ khởi hành sẽ được hoàn 90% tiền vé đối với vé thường'),(3,'Hủy',4,9,24,0.9,0,'Khách hàng hủy từ 4-9 vé trước ít nhất 24 tiếng trước giờ khởi hành sẽ được hoàn 90% tiền vé đối với vé thường'),(4,'Hủy',10,30,48,0.9,0,'Khách hàng hủy từ 10 vé trở lên trước ít nhất 48 tiếng trước giờ khởi hành sẽ được hoàn 90% tiền vé đối với vé thường'),(5,'Hủy',1,3,24,0.7,1,'Khách hàng hủy từ 1-3 vé trở lên trước ít nhất 24 tiếng trước giờ khởi hành sẽ được hoàn 70% tiền vé đối với vé lễ'),(6,'Hủy',4,9,48,0.7,1,'Khách hàng hủy từ 4-9 vé trở lên trước ít nhất 48 tiếng trước giờ khởi hành sẽ được hoàn 70% tiền vé đối với vé lễ'),(7,'Hủy',10,30,72,0.7,1,'Khách hàng hủy từ 10 vé trở lên trước ít nhất 72 tiếng trước giờ khởi hành sẽ được hoàn 70% tiền vé đối với vé lễ'),(8,'Đổi',1,30,24,0,0,'Khách hàng được hỗ trợ đổi vé một lần duy nhất nếu yêu cầu đổi vé trước ít nhất 24 tiếng trước giờ khởi hành'),(9,'Sửa',0,0,4,0,1,'Khách hàng đượ hỗ trợ sửa vé bao gồm thay đổi trạm đón và trạm trả ít nhất 4 tiếng trước giờ khỏi hành');
/*!40000 ALTER TABLE `policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rate` int NOT NULL,
  `reviewer_id` int DEFAULT NULL,
  `schedule_id` int DEFAULT NULL,
  `send_date` datetime(6) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt58e9mdgxpl7j90ketlaosmx4` (`reviewer_id`),
  KEY `FK782ghumk9ybsqm46ygkfab5p9` (`schedule_id`),
  CONSTRAINT `FK782ghumk9ybsqm46ygkfab5p9` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`),
  CONSTRAINT `FKt58e9mdgxpl7j90ketlaosmx4` FOREIGN KEY (`reviewer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN'),(2,'STAFF'),(3,'DRIVER'),(4,'CUSTOMER'),(5,'MANAGER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `id` int NOT NULL AUTO_INCREMENT,
  `departure` int DEFAULT NULL,
  `destination` int DEFAULT NULL,
  `parents` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6dehqee3my0e1od55x7thmn7w` (`departure`),
  KEY `FKp23usym48llu9imd6e8uy5ew9` (`destination`),
  CONSTRAINT `FK6dehqee3my0e1od55x7thmn7w` FOREIGN KEY (`departure`) REFERENCES `location` (`id`),
  CONSTRAINT `FKp23usym48llu9imd6e8uy5ew9` FOREIGN KEY (`destination`) REFERENCES `location` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (28,37,38,0,1),(29,37,39,0,1),(30,37,40,0,1),(31,37,41,0,1),(32,42,37,0,1),(33,43,44,0,1),(34,45,46,0,1),(35,48,49,0,1),(36,50,51,0,1),(37,43,37,0,1),(38,45,52,0,1),(39,53,54,0,1),(40,51,55,0,1),(41,51,46,0,1),(42,56,55,0,1),(43,37,57,0,1),(44,50,58,0,1),(45,59,60,0,1),(46,42,61,0,1);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route_assign`
--

DROP TABLE IF EXISTS `route_assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route_assign` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `route_id` int DEFAULT NULL,
  `assign_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `routeidsign_idx` (`route_id`),
  KEY `cpnidsign` (`company_id`),
  CONSTRAINT `cpnidsign` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `routeidsign` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_assign`
--

LOCK TABLES `route_assign` WRITE;
/*!40000 ALTER TABLE `route_assign` DISABLE KEYS */;
INSERT INTO `route_assign` VALUES (5,11,28,'2024-04-27 00:00:00'),(6,12,29,'2024-04-27 00:00:00'),(7,13,30,'2024-04-28 00:00:00'),(8,13,31,'2024-04-28 00:00:00'),(9,13,32,'2024-04-28 00:00:00'),(10,15,34,'2024-04-29 00:00:00'),(11,14,36,'2024-04-29 00:00:00'),(12,14,37,'2024-04-29 00:00:00'),(13,15,38,'2024-04-29 00:00:00'),(14,12,39,'2024-04-27 00:00:00'),(15,12,40,'2024-04-27 00:00:00'),(16,12,41,'2024-04-27 00:00:00'),(17,12,42,'2024-04-27 00:00:00'),(18,11,43,'2024-04-27 00:00:00'),(19,16,44,'2024-05-05 00:00:00'),(20,12,45,'2024-04-27 00:00:00'),(21,12,46,'2024-04-27 00:00:00'),(22,17,29,'2024-05-05 00:00:00'),(23,18,28,'2024-05-23 00:00:00'),(24,18,29,'2024-05-23 00:00:00');
/*!40000 ALTER TABLE `route_assign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `depart_date` date NOT NULL,
  `depart_time` time NOT NULL,
  `availability` int DEFAULT NULL,
  `ticket_price` int NOT NULL,
  `update_time` datetime NOT NULL,
  `special_day_id` int DEFAULT NULL,
  `trip_id` int DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  `bus_id` int DEFAULT NULL,
  `note` varchar(2000) DEFAULT NULL,
  `driver2_id` int DEFAULT NULL,
  `state` varchar(80) DEFAULT NULL,
  `current_station` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgl8nsr9ti0siey2cae9qlykv` (`special_day_id`),
  KEY `FKhk20mlu1gcwrnrxxkj23qhr0n` (`trip_id`),
  KEY `driver_FK_idx` (`driver_id`) /*!80000 INVISIBLE */,
  KEY `bus_FKHIHI_idx` (`bus_id`),
  KEY `driver_FK_2_idx` (`driver2_id`),
  CONSTRAINT `bus_FKHIHI` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`id`),
  CONSTRAINT `driver_FK` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`driver_id`),
  CONSTRAINT `driver_FK_2` FOREIGN KEY (`driver2_id`) REFERENCES `driver` (`driver_id`),
  CONSTRAINT `FKgl8nsr9ti0siey2cae9qlykv` FOREIGN KEY (`special_day_id`) REFERENCES `special_day` (`id`),
  CONSTRAINT `FKhk20mlu1gcwrnrxxkj23qhr0n` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=833 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (625,'2024-04-28','07:00:00',37,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,NULL,NULL),(626,'2024-04-28','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,NULL,NULL),(627,'2024-04-28','10:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,NULL,NULL),(628,'2024-04-28','15:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,NULL,NULL),(629,'2024-04-29','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,NULL,NULL),(630,'2024-04-29','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,NULL,NULL),(631,'2024-04-29','10:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,NULL,NULL),(632,'2024-04-29','15:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,NULL,NULL),(633,'2024-04-30','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'',NULL,NULL,NULL),(634,'2024-05-01','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'',NULL,NULL,NULL),(635,'2024-04-30','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'',NULL,NULL,NULL),(636,'2024-05-01','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'',NULL,NULL,NULL),(637,'2024-04-28','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(638,'2024-04-28','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(639,'2024-04-28','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(640,'2024-04-28','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(641,'2024-04-28','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(642,'2024-04-28','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(643,'2024-04-29','07:00:00',31,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(644,'2024-04-29','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(645,'2024-04-29','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(646,'2024-04-29','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(647,'2024-04-29','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(648,'2024-04-29','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(649,'2024-04-30','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(650,'2024-04-30','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(651,'2024-04-30','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(652,'2024-04-30','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(653,'2024-04-30','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(654,'2024-04-30','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(655,'2024-05-01','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(656,'2024-05-01','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(657,'2024-05-01','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(658,'2024-05-01','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(659,'2024-05-01','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(660,'2024-05-01','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(661,'2024-05-02','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(662,'2024-05-02','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(663,'2024-05-02','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(664,'2024-05-02','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(665,'2024-05-02','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(666,'2024-05-02','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(667,'2024-05-03','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(668,'2024-05-03','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(669,'2024-05-03','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(670,'2024-05-03','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(671,'2024-05-03','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(672,'2024-05-03','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(673,'2024-05-04','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(674,'2024-05-04','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(675,'2024-05-04','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(676,'2024-05-04','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(677,'2024-05-04','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(678,'2024-05-04','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(679,'2024-05-05','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(680,'2024-05-05','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(681,'2024-05-05','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(682,'2024-05-05','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(683,'2024-05-05','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(684,'2024-05-05','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(685,'2024-05-06','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(686,'2024-05-06','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(687,'2024-05-06','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(688,'2024-05-06','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(689,'2024-05-06','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(690,'2024-05-06','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(691,'2024-05-07','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(692,'2024-05-07','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(693,'2024-05-07','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(694,'2024-05-07','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(695,'2024-05-07','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(696,'2024-05-07','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(697,'2024-05-08','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(698,'2024-05-08','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(699,'2024-05-08','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(700,'2024-05-08','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(701,'2024-05-08','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(702,'2024-05-09','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(703,'2024-05-08','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(704,'2024-05-09','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(705,'2024-05-09','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(706,'2024-05-09','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(707,'2024-05-09','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(708,'2024-05-09','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(709,'2024-05-10','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(710,'2024-05-10','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(711,'2024-05-10','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(712,'2024-05-10','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(713,'2024-05-10','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(714,'2024-05-11','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(715,'2024-05-10','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(716,'2024-05-11','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(717,'2024-05-11','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(718,'2024-05-11','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(719,'2024-05-11','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(720,'2024-05-11','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,NULL,NULL),(721,'2024-05-15','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,28,'',NULL,NULL,NULL),(722,'2024-05-15','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,26,'',36,NULL,NULL),(723,'2024-05-15','22:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,29,'',NULL,NULL,NULL),(724,'2024-05-15','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,27,'',NULL,NULL,NULL),(725,'2024-05-16','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,27,'',NULL,NULL,NULL),(726,'2024-05-16','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,26,'',NULL,NULL,NULL),(727,'2024-05-17','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,29,'',NULL,NULL,NULL),(728,'2024-05-17','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,28,'',NULL,NULL,NULL),(729,'2024-05-16','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,28,'',NULL,NULL,NULL),(730,'2024-05-18','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,27,'',NULL,NULL,NULL),(731,'2024-05-18','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,26,'',NULL,NULL,NULL),(732,'2024-05-16','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,29,'',NULL,NULL,NULL),(733,'2024-05-19','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,29,'',NULL,NULL,NULL),(734,'2024-05-17','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,26,'',NULL,NULL,NULL),(735,'2024-05-19','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,28,'',NULL,NULL,NULL),(736,'2024-05-17','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,27,'',NULL,NULL,NULL),(737,'2024-05-20','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,29,'',NULL,NULL,NULL),(738,'2024-05-20','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,28,'',NULL,NULL,NULL),(739,'2024-05-18','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,28,'',NULL,NULL,NULL),(740,'2024-05-21','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,27,'',NULL,NULL,NULL),(741,'2024-05-18','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,29,'',NULL,NULL,NULL),(742,'2024-05-19','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,26,'',NULL,NULL,NULL),(743,'2024-05-21','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,26,'',NULL,NULL,NULL),(744,'2024-05-19','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,27,'',NULL,NULL,NULL),(745,'2024-05-22','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,29,'',NULL,NULL,NULL),(746,'2024-05-22','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,36,28,'',NULL,NULL,NULL),(747,'2024-05-20','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,26,'',NULL,NULL,NULL),(748,'2024-05-23','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,27,'',NULL,NULL,NULL),(749,'2024-05-20','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,27,'',NULL,NULL,NULL),(750,'2024-05-23','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,26,'',NULL,NULL,NULL),(751,'2024-05-21','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,36,28,'',NULL,NULL,NULL),(752,'2024-05-21','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,29,'',NULL,NULL,NULL),(753,'2024-05-24','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,36,29,'',NULL,NULL,NULL),(754,'2024-05-22','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,26,'',NULL,NULL,NULL),(755,'2024-05-24','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,28,'',NULL,NULL,NULL),(756,'2024-05-25','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,27,'',NULL,NULL,NULL),(757,'2024-05-22','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,27,'',NULL,NULL,NULL),(758,'2024-05-23','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,28,'',NULL,NULL,NULL),(759,'2024-05-25','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,26,'',NULL,NULL,NULL),(760,'2024-05-23','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,36,29,'',NULL,NULL,NULL),(761,'2024-05-26','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,29,'',NULL,NULL,NULL),(762,'2024-05-26','12:00:00',40,300000,'2024-05-28 23:11:31',NULL,62,34,28,'',NULL,'Hoàn thành',280),(763,'2024-05-24','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,26,'',NULL,NULL,NULL),(764,'2024-05-27','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,36,29,'',NULL,NULL,NULL),(765,'2024-05-24','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,27,'',NULL,NULL,NULL),(766,'2024-05-27','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,28,'',NULL,NULL,NULL),(767,'2024-05-25','07:00:00',40,300000,'2024-05-26 23:26:19',NULL,61,34,28,'',NULL,'Rời bãi đỗ',279),(768,'2024-05-25','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,29,'',NULL,NULL,NULL),(769,'2024-05-28','21:00:00',40,300000,'2024-05-28 23:26:45',NULL,62,34,27,'',NULL,'Hoàn thành',280),(770,'2024-05-26','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,36,26,'',NULL,NULL,NULL),(771,'2024-05-28','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,26,'',NULL,NULL,NULL),(772,'2024-05-26','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,27,'',NULL,NULL,NULL),(773,'2024-05-29','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,29,'',NULL,NULL,NULL),(774,'2024-05-27','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,26,'',NULL,NULL,NULL),(775,'2024-05-29','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,28,'',NULL,NULL,NULL),(776,'2024-05-27','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,27,'',NULL,NULL,NULL),(777,'2024-05-30','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,27,'',NULL,NULL,NULL),(778,'2024-05-28','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,28,'',NULL,NULL,NULL),(779,'2024-05-30','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,36,26,'',NULL,NULL,NULL),(780,'2024-05-28','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,29,'',NULL,NULL,NULL),(781,'2024-05-29','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,36,26,'',NULL,NULL,NULL),(782,'2024-05-31','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,29,'',NULL,NULL,NULL),(783,'2024-05-29','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,27,'',NULL,NULL,NULL),(784,'2024-05-31','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,28,'',NULL,NULL,NULL),(785,'2024-05-30','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,28,'',NULL,NULL,NULL),(786,'2024-05-30','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,29,'',NULL,NULL,NULL),(787,'2024-05-31','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,26,'',NULL,NULL,NULL),(788,'2024-05-31','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,36,27,'',NULL,NULL,NULL),(789,'2024-06-01','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,32,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(790,'2024-06-01','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,33,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(791,'2024-06-02','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,36,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(792,'2024-06-02','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,34,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(793,'2024-06-03','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(794,'2024-06-03','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(795,'2024-06-04','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(796,'2024-06-04','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(797,'2024-06-05','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(798,'2024-06-05','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(799,'2024-06-06','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(800,'2024-06-06','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(801,'2024-06-07','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(802,'2024-06-08','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(803,'2024-06-07','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(804,'2024-06-09','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(805,'2024-06-10','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(806,'2024-06-08','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(807,'2024-06-11','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(808,'2024-06-09','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(809,'2024-06-10','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(810,'2024-06-12','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(811,'2024-06-13','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(812,'2024-06-11','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(813,'2024-06-14','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(814,'2024-06-12','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(815,'2024-06-13','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(816,'2024-06-15','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(817,'2024-06-16','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(818,'2024-06-14','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(819,'2024-06-17','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(820,'2024-06-15','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(821,'2024-06-16','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(822,'2024-06-18','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(823,'2024-06-19','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(824,'2024-06-17','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(825,'2024-06-18','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(826,'2024-06-20','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(827,'2024-06-19','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(828,'2024-06-21','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(829,'2024-06-20','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(830,'2024-06-22','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(831,'2024-06-21','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL),(832,'2024-06-22','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,NULL);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `row_id` int NOT NULL,
  `col_id` int NOT NULL,
  `floor_id` int NOT NULL,
  `seatmap_id` int DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK51m8rpr29qxwxlk99drkafcsf` (`seatmap_id`),
  CONSTRAINT `FK51m8rpr29qxwxlk99drkafcsf` FOREIGN KEY (`seatmap_id`) REFERENCES `seat_map` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=314 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (131,0,2,1,5,'A03',1),(132,1,0,1,5,'A04',1),(133,1,1,1,5,'A05',1),(134,1,2,1,5,'A06',1),(135,2,0,1,5,'A07',1),(136,2,1,1,5,'A08',1),(137,2,2,1,5,'A09',1),(138,3,0,1,5,'A10',1),(139,3,1,1,5,'A11',1),(140,3,2,1,5,'A12',1),(141,4,0,1,5,'A13',1),(142,4,1,1,5,'A14',1),(143,4,2,1,5,'A15',1),(144,5,0,1,5,'A16',1),(145,5,1,1,5,'A17',1),(146,5,2,1,5,'A18',1),(147,6,0,1,5,'A19',1),(148,6,1,1,5,'A20',1),(149,6,2,1,5,'A21',1),(150,0,0,2,5,'B01',1),(151,0,1,2,5,'B02',1),(152,0,2,2,5,'B03',1),(153,1,0,2,5,'B04',1),(154,1,1,2,5,'B05',1),(155,1,2,2,5,'B06',1),(156,2,0,2,5,'B07',1),(157,2,1,2,5,'B08',1),(158,2,2,2,5,'B09',1),(159,3,0,2,5,'B10',1),(160,3,1,2,5,'B11',1),(161,3,2,2,5,'B12',1),(162,4,0,2,5,'B13',1),(163,4,1,2,5,'B14',1),(164,4,2,2,5,'B15',1),(165,5,0,2,5,'B16',1),(166,5,1,2,5,'B17',1),(167,5,2,2,5,'B18',1),(168,6,0,2,5,'B19',1),(169,6,1,2,5,'B20',1),(170,6,2,2,5,'B21',1),(171,0,2,1,6,'A03',1),(172,1,0,1,6,'A04',1),(173,1,1,1,6,'A05',1),(174,1,2,1,6,'A06',1),(175,2,0,1,6,'A07',1),(176,2,1,1,6,'A08',1),(177,2,2,1,6,'A09',1),(178,3,0,1,6,'A10',1),(179,3,1,1,6,'A11',1),(180,3,2,1,6,'A12',1),(181,4,0,1,6,'A13',1),(182,4,1,1,6,'A14',1),(183,4,2,1,6,'A15',1),(184,5,0,1,6,'A16',1),(185,5,1,1,6,'A17',1),(186,5,2,1,6,'A18',1),(187,0,0,2,6,'B01',1),(188,0,2,2,6,'B03',1),(189,1,0,2,6,'B04',1),(190,1,1,2,6,'B05',1),(191,1,2,2,6,'B06',1),(192,2,0,2,6,'B07',1),(193,2,1,2,6,'B08',1),(194,2,2,2,6,'B09',1),(195,3,0,2,6,'B10',1),(196,3,1,2,6,'B11',1),(197,3,2,2,6,'B12',1),(198,4,0,2,6,'B13',1),(199,4,1,2,6,'B14',1),(200,4,2,2,6,'B15',1),(201,5,0,2,6,'B16',1),(202,5,1,2,6,'B17',1),(203,5,2,2,6,'B18',1),(204,0,2,1,7,'C01',1),(205,0,3,1,7,'D01',1),(206,1,0,1,7,'A02',1),(207,1,1,1,7,'B02',1),(208,1,2,1,7,'C02',1),(209,1,3,1,7,'D02',1),(210,2,0,1,7,'A03',1),(211,2,1,1,7,'B03',1),(212,2,2,1,7,'C03',1),(213,2,3,1,7,'D03',1),(214,3,0,1,7,'A04',1),(215,3,1,1,7,'B04',1),(216,3,2,1,7,'C04',1),(217,3,3,1,7,'D04',1),(218,4,0,1,7,'A05',1),(219,4,1,1,7,'B05',1),(220,4,2,1,7,'C05',1),(221,4,3,1,7,'D05',1),(222,5,0,1,7,'A06',1),(223,5,3,1,7,'D06',1),(224,0,0,1,8,'A01',1),(225,0,1,1,8,'A02',1),(226,0,2,1,8,'A03',1),(227,1,0,1,8,'A04',1),(228,1,1,1,8,'A05',1),(229,1,2,1,8,'A06',1),(230,2,0,1,8,'A07',1),(231,2,1,1,8,'A08',1),(232,2,2,1,8,'A09',1),(233,3,0,1,8,'A10',1),(234,3,1,1,8,'A11',1),(235,3,2,1,8,'A12',1),(236,4,0,1,8,'A13',1),(237,4,1,1,8,'A14',1),(238,4,2,1,8,'A15',1),(239,0,0,2,8,'B01',1),(240,0,1,2,8,'B02',1),(241,0,2,2,8,'B03',1),(242,1,0,2,8,'B04',1),(243,1,1,2,8,'B05',1),(244,1,2,2,8,'B06',1),(245,2,0,2,8,'B07',1),(246,2,1,2,8,'B08',1),(247,2,2,2,8,'B09',1),(248,3,0,2,8,'B10',1),(249,3,1,2,8,'B11',1),(250,3,2,2,8,'B12',1),(251,4,0,2,8,'B13',1),(252,4,1,2,8,'B14',1),(253,4,2,2,8,'B15',1),(254,0,0,1,9,'A01',1),(255,0,1,1,9,'A02',1),(256,0,2,1,9,'A03',1),(257,1,0,1,9,'A04',1),(258,1,1,1,9,'A05',1),(259,1,2,1,9,'A06',1),(260,2,0,1,9,'A07',1),(261,2,1,1,9,'A08',1),(262,2,2,1,9,'A09',1),(263,3,0,1,9,'A10',1),(264,3,1,1,9,'A11',1),(265,3,2,1,9,'A12',1),(266,4,0,1,9,'A13',1),(267,4,1,1,9,'A14',1),(268,4,2,1,9,'A15',1),(269,0,0,2,9,'B01',1),(270,0,1,2,9,'B02',1),(271,0,2,2,9,'B03',1),(272,1,0,2,9,'B04',1),(273,1,1,2,9,'B05',1),(274,1,2,2,9,'B06',1),(275,2,0,2,9,'B07',1),(276,2,1,2,9,'B08',1),(277,2,2,2,9,'B09',1),(278,3,0,2,9,'B10',1),(279,3,1,2,9,'B11',1),(280,3,2,2,9,'B12',1),(281,4,0,2,9,'B13',1),(282,4,1,2,9,'B14',1),(283,4,2,2,9,'B15',1),(284,0,0,1,10,'A01',1),(285,0,1,1,10,'A02',1),(286,0,2,1,10,'A03',1),(287,1,0,1,10,'A04',1),(288,1,1,1,10,'A05',1),(289,1,2,1,10,'A06',1),(290,2,0,1,10,'A07',1),(291,2,1,1,10,'A08',1),(292,2,2,1,10,'A09',1),(293,3,0,1,10,'A10',1),(294,3,1,1,10,'A11',1),(295,3,2,1,10,'A12',1),(296,4,0,1,10,'A13',1),(297,4,1,1,10,'A14',1),(298,4,2,1,10,'A15',1),(299,0,0,2,10,'B01',1),(300,0,1,2,10,'B02',1),(301,0,2,2,10,'B03',1),(302,1,0,2,10,'B04',1),(303,1,1,2,10,'B05',1),(304,1,2,2,10,'B06',1),(305,2,0,2,10,'B07',1),(306,2,1,2,10,'B08',1),(307,2,2,2,10,'B09',1),(308,3,0,2,10,'B10',1),(309,3,1,2,10,'B11',1),(310,3,2,2,10,'B12',1),(311,4,0,2,10,'B13',1),(312,4,1,2,10,'B14',1),(313,4,2,2,10,'B15',1);
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat_map`
--

DROP TABLE IF EXISTS `seat_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `row_no` int NOT NULL,
  `col_no` int NOT NULL,
  `floor_no` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat_map`
--

LOCK TABLES `seat_map` WRITE;
/*!40000 ALTER TABLE `seat_map` DISABLE KEYS */;
INSERT INTO `seat_map` VALUES (5,7,3,2),(6,6,3,2),(7,6,4,1),(8,5,3,2),(9,5,3,2),(10,5,3,2);
/*!40000 ALTER TABLE `seat_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_fee`
--

DROP TABLE IF EXISTS `service_fee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_fee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fee` double DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `system_transaction_id` int DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `fee_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trid_idx` (`system_transaction_id`),
  KEY `cid_idx` (`company_id`),
  CONSTRAINT `cid` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `trid` FOREIGN KEY (`system_transaction_id`) REFERENCES `system_transaction` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_fee`
--

LOCK TABLES `service_fee` WRITE;
/*!40000 ALTER TABLE `service_fee` DISABLE KEYS */;
INSERT INTO `service_fee` VALUES (1,4522000,'Chờ thanh toán','2024-05-12',NULL,12,'69337686'),(2,374000,'Chờ thanh toán','2024-05-20',NULL,17,'24856769'),(3,782000,'Đã thanh toán','2024-05-12',1,11,'23102855'),(4,144000,'Chờ thanh toán','2024-05-13',NULL,13,'23102855'),(5,255000,'Chờ thanh toán','2024-05-14',NULL,14,'23102856'),(6,133000,'Chờ thanh toán','2024-05-14',NULL,15,'23102857'),(7,130030,'Chờ thanh toán','2024-05-20',NULL,16,'23102858'),(8,2040000,'Đã thanh toán','2024-06-05',2,11,'16845359'),(9,2108000,'Chờ thanh toán','2024-07-05',NULL,11,'51792033');
/*!40000 ALTER TABLE `service_fee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_day`
--

DROP TABLE IF EXISTS `special_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `special_day` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `fee` int NOT NULL,
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cpnid6_idx` (`company_id`),
  CONSTRAINT `cpnid6` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_day`
--

LOCK TABLES `special_day` WRITE;
/*!40000 ALTER TABLE `special_day` DISABLE KEYS */;
/*!40000 ALTER TABLE `special_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `begin_work_date` date DEFAULT NULL,
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `id_card` varchar(15) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `UK_7qatq4kob2sr6rlp44khhj53g` (`user_id`),
  UNIQUE KEY `UK_n6hdm35gyfk1jrmelnqtgp7q1` (`id_card`),
  KEY `companyid_idx` (`company_id`),
  CONSTRAINT `companyid` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `FKbhogfndgswrqk696i1s2stk2g` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES ('2024-04-27',32,103,'567890464564','Bình Nguyên Vô Tận','http://localhost:5000/api/images/1715699536491-âc.jpg','NV: Nguyễn Châu An',11),('2024-04-27',33,104,'098673530459','Gò Vấp, Hồ Chí Minh','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Lê Hò',11),('2024-04-27',34,105,'567222464564','Bình Tân','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Châu Phú',12),('2024-04-28',35,106,'645635645747','Bình Hưng, Cam Ranh','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Châu Thuận',13),('2024-04-29',36,107,'567890123111','Bình Hưng Hòa','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Liên Hoàng',14),('2024-04-29',37,108,'567890464500','Hà Nội','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Liên Hoàng',15),('2024-05-05',38,109,'849485235','Cam Ranh, Khánh Hòa','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Lê Thành Liên',16),('2024-05-05',39,110,'567123489346','Hà Nội','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Phú Mỹ',17),('2024-05-23',40,117,'567890464333','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','NV: Nguyễn Hòa',18);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `station`
--

DROP TABLE IF EXISTS `station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `station` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(255) NOT NULL,
  `location_id` int DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqlnvqs4wbjtf02m0wghvreewo` (`location_id`),
  KEY `companyid1_idx` (`company_id`),
  CONSTRAINT `companyid1` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `FKqlnvqs4wbjtf02m0wghvreewo` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `station`
--

LOCK TABLES `station` WRITE;
/*!40000 ALTER TABLE `station` DISABLE KEYS */;
INSERT INTO `station` VALUES (38,'Miền Đông','Bến xe Miền Đông, Dinh Bo Linh, Ward 26, Binh Thanh District, Ho Chi Minh City, 72309, Vietnam',37,10.81494470,106.71069170,1,NULL),(39,'Phía Nam Nha Trang','Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam',38,12.25839475,109.13485589,1,NULL),(40,'Ngã tư Thủ Đức','Thu Duc Intersection, Cầu vượt Ngã tư Thủ Đức, Binh Tho Ward, Thủ Đức, Ho Chi Minh City, 00848, Vietnam',37,10.84912750,106.77403120,1,11),(41,'Bến xe Cam Ranh','Lê Duẩn, Phường Cam Lộc, Cam Ranh, Khánh Hòa Province, Vietnam',38,11.91803368,109.14670324,1,11),(42,'Miền Tây','Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam',37,10.74012710,106.61940059,1,NULL),(43,'Trà Vinh','Bến xe Trà Vinh, Trà Vinh',39,0.00000000,0.00000000,1,NULL),(44,'Trạm xe Thanh Thủy, Bình Phú','National Route 53, Xã Bình Phú, Càng Long District, Trà Vinh Province, Vietnam',39,9.96000815,106.24510484,1,12),(45,'An Sương','Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam',37,10.84525430,106.61334520,1,NULL),(46,'Quy Nhơn','Quy Nhon Bus Station, Quốc lộ 1D, Ghềnh Ráng, Phường Ghềnh Ráng, Quy Nhơn, Bình Định Province, 59000, Vietnam',40,13.75333960,109.20890740,1,NULL),(47,'Ngã Tư Ga','Bến xe Ngã tư Ga, Quốc lộ 1, Phường Thạnh Lộc, District 12, Ho Chi Minh City, 71514, Vietnam',37,10.86232380,106.67872000,1,NULL),(48,'Cà Mau','Bến xe Cà Mau, Lý Thường Kiệt, Phường 6, Xã Định Bình, Cà Mau, Cà Mau Province, Vietnam',41,9.17577040,105.17094360,1,NULL),(49,'Giáp Bát','Bến xe Giáp Bát, Đường Giải Phóng, Phường Giáp Bát, Hoang Mai District, Hà Nội, 11718, Vietnam',42,20.98042550,105.84146350,1,NULL),(50,'Miền Đông Mới','Bến xe Miền Đông mới, Đường số 13, Long Binh Ward, Thủ Đức, Ho Chi Minh City, Dĩ An, Bình Dương Province, 71300, Vietnam',37,10.87856780,106.81498810,1,NULL),(51,'Quất Lâm','Bến xe Quất Lâm, Nam Định',43,0.00000000,0.00000000,1,NULL),(52,'Trung tâm Lào Cai','Bến xe Trung tâm Lào Cai, Đường Bình Minh, Pom Han Ward, Lào Cai, Lào Cai Province, Vietnam',44,22.42530190,104.03022146,1,NULL),(53,'Liên tỉnh TP Cao Bằng','City interprovincial bus station, Cao Bang, National Highway 3, Cao Bằng, Hòa An District, Cao Bằng Province, 21110, Vietnam',45,22.68086165,106.20209994,1,NULL),(54,'Việt Trì','Bến xe Việt Trì, Phú Thọ',46,0.00000000,0.00000000,1,NULL),(55,'Cẩm Hải','Bến xe Cẩm Hải, Quảng Ninh',50,0.00000000,0.00000000,1,NULL),(56,'Huyện Tiền Hải','Bến xe Huyện Tiền Hải, Thái Bình',51,0.00000000,0.00000000,1,NULL),(57,'Nghĩa Hưng','Bến xe Nghĩa Hưng, Nam Định',43,0.00000000,0.00000000,1,NULL),(58,'Đức Long Bảo Lộc','Bến xe Đức Long Bảo Lộc, Lâm Đồng',52,0.00000000,0.00000000,1,NULL),(59,'TP Tuyên Quang','Bến xe TP Tuyên Quang, Tuyên Quang',53,0.00000000,0.00000000,1,NULL),(60,'Đồng Văn','Dong Van Bus Station, 3 February Road, Quyết Tiến, Quán Xín Ngài, Đồng Văn Town, Đồng Văn District, Hà Giang Province, Vietnam',54,23.27813465,105.35096316,1,NULL),(61,'TP Sơn La','Son La Bus Station, Đường Lê Duẩn, Sơn La, Sơn La Province, Vietnam',55,21.30140700,103.94344310,1,NULL),(62,'Trung tâm TP Thái Bình','Bến xe khách Trung tâm Thái Bình, Lý Bôn, Thái Bình, Thái Bình Province, 06118, Vietnam',51,20.44901175,106.33447339,1,NULL),(63,'Lai Châu','Lai Chau Bus Station, 30 April Road, Đông Phong Ward, Tân Phong Ward, Lai Châu, Lai Châu Province, Vietnam',56,22.38275665,103.48753264,1,NULL),(64,'Vǜng Tàu','Bến xe Vũng Tàu, 192, Nam Kỳ Khởi Nghĩa, Khu phố 2, Ward 3, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam',57,10.35033630,107.08715520,1,NULL),(65,'Móng Cái','Mong Cai Coach Terminal, Phạm Ngũ Lão, Quarter 2, Ka Long Ward, Móng Cái, Quảng Ninh Province, 02033, Vietnam',50,21.53037160,107.95833081,1,NULL),(66,'Phú Bình','Bến xe Phú Bình, Thái Nguyên',58,0.00000000,0.00000000,1,NULL),(67,'Huyên Hồng','Bến xe Huyên Hồng, Thanh Hoá',59,0.00000000,0.00000000,1,NULL),(68,'Bắc Giang','Bến xe Bắc Giang, Bắc Giang',60,0.00000000,0.00000000,1,NULL),(69,'Nước Ngầm','Bến xe Nước Ngầm, Đường Ngọc Hồi, Phường Hoàng Liệt, Hoang Mai District, Hà Nội, 11718, Vietnam',42,20.96475770,105.84223830,1,NULL),(70,'Lao Bảo','Bến xe Lao Bảo, Quảng Trị',61,0.00000000,0.00000000,1,NULL),(71,'Thị xã Duyên Hải','Bến xe Thị xã Duyên Hải, Trà Vinh',39,0.00000000,0.00000000,1,NULL),(72,'Bãi đỗ xe Cam Ranh','Bus to Center Nha Trang, Hùng Vương, Phường Cam Lợi, Cam Ranh, Khánh Hòa Province, Vietnam',38,11.91649264,109.14502045,1,11),(73,'Bãi đỗ xe Châu An, Tân Phú','Đường Số 138, Topaz Mansion, Tan Phu Ward, Thủ Đức, Ho Chi Minh City, 71216, Vietnam',37,10.86183420,106.80828903,1,11),(74,'Trạm dừng chân Hưng Thịnh','PV Oil, Trần Hưng Đạo, Phường Bình Hưng, Phan Thiết, Bình Thuận Province, Vietnam',38,10.92908714,108.10511040,1,11),(75,'Xuyên Mộc','Bến xe khách Xuyên Mộc, Xuyên Phước Cơ, Thạnh Sơn 1A, Xóm Rẫy, Phuoc Thuan Commune, Xuyên Mộc District, Bà Rịa - Vũng Tàu Province, Vietnam',57,10.53253630,107.39265166,1,NULL);
/*!40000 ALTER TABLE `station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stop_station`
--

DROP TABLE IF EXISTS `stop_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stop_station` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trip_id` int DEFAULT NULL,
  `station_id` int DEFAULT NULL,
  `station_type` varchar(255) DEFAULT NULL,
  `arrival_time` float DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKds4vmk7534582fgwcuxx7thsb` (`station_id`),
  KEY `FKfom1acwovya5ikkrkoj2foc06` (`trip_id`),
  CONSTRAINT `FKds4vmk7534582fgwcuxx7thsb` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`),
  CONSTRAINT `FKfom1acwovya5ikkrkoj2foc06` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=289 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stop_station`
--

LOCK TABLES `stop_station` WRITE;
/*!40000 ALTER TABLE `stop_station` DISABLE KEYS */;
INSERT INTO `stop_station` VALUES (193,61,38,'pick',2,1),(194,61,39,'drop',6,1),(195,62,38,'drop',6,1),(196,62,39,'pick',2,1),(197,61,40,'pick',3,1),(198,62,40,'drop',5,1),(199,62,41,'pick',3,1),(200,61,41,'drop',5,1),(201,63,42,'pick',0,1),(202,63,43,'drop',0,1),(203,64,42,'drop',0,1),(204,64,43,'pick',0,1),(205,64,44,'pick',0,1),(206,63,44,'drop',0,1),(207,65,45,'pick',0,1),(208,65,46,'drop',0,1),(209,66,45,'drop',0,1),(210,66,46,'pick',0,1),(211,67,47,'pick',0,1),(212,67,48,'drop',0,1),(213,68,47,'drop',0,1),(214,68,48,'pick',0,1),(215,69,49,'pick',0,1),(216,69,50,'drop',0,1),(217,70,49,'drop',0,1),(218,70,50,'pick',0,1),(219,71,53,'pick',0,1),(220,71,54,'drop',0,1),(221,72,53,'drop',0,1),(222,72,54,'pick',0,1),(223,73,55,'pick',0,1),(224,73,56,'drop',0,1),(225,74,55,'drop',0,1),(226,74,56,'pick',0,1),(227,75,57,'pick',0,1),(228,75,45,'drop',0,1),(229,76,57,'drop',0,1),(230,76,45,'pick',0,1),(231,77,53,'pick',0,1),(232,77,58,'drop',0,1),(233,78,53,'drop',0,1),(234,78,58,'pick',0,1),(235,79,59,'pick',0,1),(236,79,60,'drop',0,1),(237,80,59,'drop',0,1),(238,80,60,'pick',0,1),(239,81,56,'pick',0,1),(240,81,61,'drop',0,1),(241,82,56,'drop',0,1),(242,82,61,'pick',0,1),(243,83,62,'pick',0,1),(244,83,54,'drop',0,1),(245,84,62,'drop',0,1),(246,84,54,'pick',0,1),(247,85,63,'pick',0,1),(248,85,61,'drop',0,1),(249,86,63,'drop',0,1),(250,86,61,'pick',0,1),(251,87,42,'pick',1,1),(252,87,64,'drop',2,1),(253,88,42,'drop',2,1),(254,88,64,'pick',1,1),(255,89,65,'pick',0,1),(256,89,66,'drop',0,1),(257,90,65,'drop',0,1),(258,90,66,'pick',0,1),(259,91,67,'pick',0,1),(260,91,68,'drop',0,1),(261,92,67,'drop',0,1),(262,92,68,'pick',0,1),(263,93,69,'pick',0,1),(264,93,70,'drop',0,1),(265,94,69,'drop',0,1),(266,94,70,'pick',0,1),(267,95,42,'pick',0,1),(268,95,71,'drop',0,1),(269,96,42,'drop',0,1),(270,96,71,'pick',0,1),(271,97,42,'pick',0,1),(272,97,39,'drop',0,1),(273,98,42,'drop',0,1),(274,98,39,'pick',0,1),(275,99,42,'pick',0,1),(276,99,43,'drop',0,1),(277,100,42,'drop',0,1),(278,100,43,'pick',0,1),(279,61,73,'park-start',1,1),(280,62,73,'park-end',7,1),(281,62,72,'park-start',1,1),(282,61,72,'park-end',7,1),(283,61,74,'stop',4,1),(284,62,74,'stop',4,1),(285,101,45,'pick',1,1),(286,101,75,'drop',2,1),(287,102,45,'drop',2,1),(288,102,75,'pick',1,1);
/*!40000 ALTER TABLE `stop_station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_manager`
--

DROP TABLE IF EXISTS `system_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_manager` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(45) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `id_card` varchar(45) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `begin_work_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `us_idx` (`user_id`),
  CONSTRAINT `us` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_manager`
--

LOCK TABLES `system_manager` WRITE;
/*!40000 ALTER TABLE `system_manager` DISABLE KEYS */;
INSERT INTO `system_manager` VALUES (1,'Vũng Tàu','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','3020201010103',87,'2024-03-24');
/*!40000 ALTER TABLE `system_manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_transaction`
--

DROP TABLE IF EXISTS `system_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transaction_type` varchar(45) DEFAULT NULL,
  `transaction_no` varchar(45) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `payment_time` datetime DEFAULT NULL,
  `payment_method` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_transaction`
--

LOCK TABLES `system_transaction` WRITE;
/*!40000 ALTER TABLE `system_transaction` DISABLE KEYS */;
INSERT INTO `system_transaction` VALUES (1,'Thanh toán','14437538',782000,'2024-05-31 05:58:40','VNPay'),(2,'Thanh toán','14437540',2040000,'2024-05-31 06:01:45','VNPay');
/*!40000 ALTER TABLE `system_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `bill_id` int DEFAULT NULL,
  `checked_in` bit(1) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `schedule_id` int DEFAULT NULL,
  `ticket_price` int DEFAULT NULL,
  `booking_code` varchar(7) DEFAULT NULL,
  `seat` varchar(45) NOT NULL,
  `state` varchar(255) NOT NULL,
  `cancel_request_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bill_id_UNIQUE` (`bill_id`),
  KEY `FKf9rrxu78kmw44u3xfarqpaa2r` (`bill_id`),
  KEY `FK8bai57e8m61hh8ri9movc2leo` (`booking_code`),
  KEY `FKdmmaqgvu0kjjlpsivmgnvurl5` (`schedule_id`),
  KEY `c_F_idx` (`cancel_request_id`),
  CONSTRAINT `c_F` FOREIGN KEY (`cancel_request_id`) REFERENCES `cancel_request` (`id`),
  CONSTRAINT `FK8bai57e8m61hh8ri9movc2leo` FOREIGN KEY (`booking_code`) REFERENCES `booking` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKdmmaqgvu0kjjlpsivmgnvurl5` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`),
  CONSTRAINT `FKf9rrxu78kmw44u3xfarqpaa2r` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=794 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (438,_binary '\0',789,625,300000,'GH1PFJ','B03','Đã thanh toán',NULL),(439,_binary '\0',790,625,300000,'GH1PFJ','B06','Đã thanh toán',NULL),(440,_binary '\0',791,625,300000,'GH1PFJ','B09','Đã thanh toán',NULL),(441,_binary '\0',792,643,120000,'GDNQC5','B03','Đã thanh toán',NULL),(442,_binary '\0',793,643,120000,'GDNQC5','B06','Đã thanh toán',NULL);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_sale`
--

DROP TABLE IF EXISTS `ticket_sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_sale` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `ticket_sales` double DEFAULT NULL,
  `profit` double DEFAULT NULL,
  `system_transaction_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tranid_idx` (`system_transaction_id`),
  CONSTRAINT `tranid` FOREIGN KEY (`system_transaction_id`) REFERENCES `system_transaction` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_sale`
--

LOCK TABLES `ticket_sale` WRITE;
/*!40000 ALTER TABLE `ticket_sale` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `amount` double NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_time` datetime(6) NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `transaction_no` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=226 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (900000,224,'2024-04-27 08:53:27.000000','VNPay','Thanh toán','14394511'),(240000,225,'2024-04-27 09:15:49.000000','VNPay','Thanh toán','14394519');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportation_order`
--

DROP TABLE IF EXISTS `transportation_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportation_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `schedule_id` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kn_idx` (`schedule_id`),
  CONSTRAINT `kn` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportation_order`
--

LOCK TABLES `transportation_order` WRITE;
/*!40000 ALTER TABLE `transportation_order` DISABLE KEYS */;
INSERT INTO `transportation_order` VALUES (1,731,'Đã cấp lệnh','2024-05-18 12:00:24',NULL,'','RKLAJ5MYMZ'),(2,735,'Đã nhận lệnh','2024-05-18 20:37:30','2024-05-19 11:23:14','http://localhost:5000/api/images/1716092593756-lvc.jpg','IH0A462P7T'),(3,763,'Đã cấp lệnh','2024-05-23 22:10:13',NULL,'','HAWDGECW6C'),(4,765,'Đã cấp lệnh','2024-05-23 22:10:18',NULL,'','5OWT8X42YO'),(5,755,'Đã cấp lệnh','2024-05-23 22:10:22',NULL,'','CULCV8NKBX'),(7,767,'Đã nhận lệnh','2024-05-24 22:47:14','2024-05-26 23:26:14','https://vexe.workon.space/api/static/images/1716740774275-Screenshot_2024-05-05_085210.png','1B2DLJ9H3L'),(8,768,'Đã cấp lệnh','2024-05-24 22:47:20',NULL,'','P64A3JXDTR'),(9,759,'Đã cấp lệnh','2024-05-24 22:47:25',NULL,'','Y8GJYB2SUG'),(10,756,'Đã cấp lệnh','2024-05-24 22:47:30',NULL,'','ALC62PH48I'),(11,770,'Đã cấp lệnh','2024-05-25 22:14:20',NULL,'','GKHX2SQ0CK'),(12,772,'Đã cấp lệnh','2024-05-25 22:14:27',NULL,'','7RMBJ49SBW'),(13,762,'Đã hoàn thành','2024-05-25 22:14:32','2024-05-28 22:28:01','https://vexe.workon.space/api/static/images/1716739531942-Screenshot_2024-05-05_102421.png','9L8H1A2ORC'),(14,761,'Đã cấp lệnh','2024-05-25 22:14:36',NULL,'','L52TII00XF'),(15,778,'Đã cấp lệnh','2024-05-28 06:07:41',NULL,'','MU3R53XHDQ'),(16,780,'Đã cấp lệnh','2024-05-28 06:08:49',NULL,'','89O883DIT9'),(17,771,'Đã cấp lệnh','2024-05-28 06:08:54',NULL,'','6JX57JTSHT'),(18,769,'Đã hoàn thành','2024-05-28 06:09:00','2024-05-28 23:25:34','https://vexe.workon.space/api/static/images/1716911305535-Screenshot_2024-04-20_222104.png','1JN5I0BWTX'),(19,781,'Đã cấp lệnh','2024-05-28 20:55:05',NULL,'','CW05AISQB9'),(20,783,'Đã cấp lệnh','2024-05-28 20:55:11',NULL,'','YT7THW9AJR'),(21,775,'Đã cấp lệnh','2024-05-28 20:55:17',NULL,'','YM4P37D4FX'),(22,773,'Đã cấp lệnh','2024-05-28 23:09:11',NULL,'','U1L7OSQ1WH');
/*!40000 ALTER TABLE `transportation_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip`
--

DROP TABLE IF EXISTS `trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_station` int DEFAULT NULL,
  `end_station` int DEFAULT NULL,
  `route_id` int DEFAULT NULL,
  `turn` bit(1) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `bus_type_id` int DEFAULT NULL,
  `schedule` varchar(2000) DEFAULT NULL,
  `hours` float DEFAULT NULL,
  `distance` int DEFAULT NULL,
  `route_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe8se5tjehamumdh5b9504ybe8` (`end_station`),
  KEY `FKeva4adpyk6glllffnw5ypj20j` (`route_id`),
  KEY `FK959242365j9j9ry5upw7xvupj` (`start_station`),
  KEY `companyid3_idx` (`company_id`),
  KEY `btid_idx` (`bus_type_id`),
  CONSTRAINT `btid` FOREIGN KEY (`bus_type_id`) REFERENCES `bus_type` (`id`),
  CONSTRAINT `companyid3` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK959242365j9j9ry5upw7xvupj` FOREIGN KEY (`start_station`) REFERENCES `station` (`id`),
  CONSTRAINT `FKe8se5tjehamumdh5b9504ybe8` FOREIGN KEY (`end_station`) REFERENCES `station` (`id`),
  CONSTRAINT `FKeva4adpyk6glllffnw5ypj20j` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (61,38,39,28,_binary '',1,11,300000,5,'BX Phía Nam Nha Trang - QL1A - QL13 - BX Miền Đông',6,450,NULL),(62,39,38,28,_binary '\0',1,11,300000,5,'BX Miền Đông - QL13 - QL1A - BX Phía Nam Nha Trang',6,450,NULL),(63,42,43,29,_binary '',1,12,120000,6,'BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - QL60 - QL53 - QL54 - BX Trà Vinh',1.8,135,NULL),(64,43,42,29,_binary '\0',1,12,120000,6,'BX Trà Vinh - QL54 - QL53 - QL60 - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây',1.8,135,NULL),(65,45,46,30,_binary '',1,13,0,NULL,'BX An Sương - QL22 - QL1 - QL1D - BX Quy Nhơn',8.7,649,NULL),(66,46,45,30,_binary '\0',1,13,0,NULL,'BX Quy Nhơn - QL1D - QL1 - QL22 - BX An Sương',8.7,649,NULL),(67,47,48,31,_binary '',1,13,0,NULL,'BX Cà Mau - QL1A - BX Ngã Tư Ga',4.9,366,NULL),(68,48,47,31,_binary '\0',1,13,0,NULL,'BX Ngã Tư Ga - QL1A - BX Cà Mau',4.9,366,NULL),(69,49,50,32,_binary '',1,13,0,NULL,'BX Miền Đông Mới - QL1A - BX Giáp Bát',23.3,1750,NULL),(70,50,49,32,_binary '\0',1,13,0,NULL,'BX Giáp Bát - QL1A - BX Miền Đông Mới',23.3,1750,NULL),(71,53,54,34,_binary '',1,15,0,NULL,'BX Việt Trì - QL2 - Ngã ba Kim Anh Vĩnh Yên - QL3 - BX Liên tỉnh TP Cao Bằng',4.2,314,NULL),(72,54,53,34,_binary '\0',1,15,0,NULL,'BX Liên tỉnh TP Cao Bằng - QL3 - Ngã ba Kim Anh Vĩnh Yên - QL2 - BX Việt Trì',4.2,314,NULL),(73,55,56,36,_binary '',1,14,0,NULL,'BX Cẩm Hải - QL18 - Cao tốc Hạ Long Hải Phòng - Cao tốc Hải Phòng Hà Nội - QL10 - ĐT458 - QL37B - BX Tiền Hải',2.7,200,NULL),(74,56,55,36,_binary '\0',1,14,0,NULL,'BX Tiền Hải - QL37B - ĐT458 - QL10 - Cao tốc Hải Phòng Hà Nội - Cao tốc Hạ Long Hải Phòng - QL18 - BX Cẩm Hải',2.7,200,NULL),(75,57,45,37,_binary '',1,14,0,NULL,'BX Nghĩa Hưng - TL490C - Đường Lê Đức Thọ - QL10 - QL1A - QL22 - BX An Sương',22.7,1700,NULL),(76,45,57,37,_binary '\0',1,14,0,NULL,'BX An Sương - QL22 - QL1A - QL10 - Đường Lê Đức Thọ - TL490C - BX Nghĩa Hưng',22.7,1700,NULL),(77,53,58,38,_binary '',1,15,0,NULL,'BX Đức Long Bảo Lộc - QL20 - QL27 - QL1A - Pháp Vân - Vành đai 3 trên cao (Đoạn Pháp Vân - Cầu Thanh Trì) - Cầu Thanh Trì - QL1 - QL3 - BX Liên tỉnh TP Cao Bằng',24.1,1805,NULL),(78,58,53,38,_binary '\0',1,15,0,NULL,'BX Liên tỉnh TP Cao Bằng - QL3 - QL1 - Cầu Thanh Trì - Cầu Thanh Trì) - Vành đai 3 trên cao (Đoạn Pháp Vân - Pháp Vân - QL1A - QL27 - QL20 - BX Đức Long Bảo Lộc',24.1,1805,NULL),(79,59,60,39,_binary '',1,12,200000,6,'BX Đồng Văn - QL4C - Yên Minh - Quản Bạ - Quyết Tiến - QL4C - QL2 - TP Hà Giang - QL2 - Bắc Quang - Hàm Yên - BX Tuyên Quang',4.1,305,NULL),(80,60,59,39,_binary '\0',1,12,200000,6,'BX Tuyên Quang - Hàm Yên - Bắc Quang - QL2 - TP Hà Giang - QL2 - QL4C - Quyết Tiến - Quản Bạ - Yên Minh - QL4C - BX Đồng Văn',4.1,305,NULL),(81,56,61,40,_binary '',1,12,250000,6,'BX Sơn La - QL6 - Vành đai 3 - QL5 - QL39 - QL10 - ĐT458 - QL37B - BX Tiền Hải',5.1,383,NULL),(82,61,56,40,_binary '\0',1,12,250000,6,'BX Tiền Hải - QL37B - ĐT458 - QL10 - QL39 - QL5 - Vành đai 3 - QL6 - BX Sơn La',5.1,383,NULL),(83,62,54,41,_binary '',1,12,0,NULL,'BX Trung tâm TP Thái Bình - QL10 - QL21 - QL1 - Pháp Vân Cầu Giẽ - Cầu Thanh Trì - QL5 - QL2 - BX Việt Trì',2.7,200,NULL),(84,54,62,41,_binary '\0',1,12,0,NULL,'BX Việt Trì - QL2 - QL5 - Cầu Thanh Trì - Pháp Vân Cầu Giẽ - QL1 - QL21 - QL10 - BX Trung tâm TP Thái Bình',2.7,200,NULL),(85,63,61,42,_binary '',1,12,0,NULL,'BX Lai Châu - QL4D - QL32 - QL279 - QL6 - BX Sơn La',3.3,250,NULL),(86,61,63,42,_binary '\0',1,12,0,NULL,'BX Sơn La - QL6 - QL279 - QL32 - QL4D - BX Lai Châu',3.3,250,NULL),(87,42,64,43,_binary '',0,11,100000,7,'BX Vǜng Tàu - Nam KǶ Khởi Nghĩa - Lê Hồng Phong - QL51 - QL1A - Kinh Dương Võ Văn Kiệt - BX Miền Tây',1.6,123,NULL),(88,64,42,43,_binary '\0',0,11,100000,7,'BX Miền Tây - Kinh Dương Võ Văn Kiệt - QL1A - QL51 - Lê Hồng Phong - Nam KǶ Khởi Nghĩa - BX Vǜng Tàu',1.6,123,NULL),(89,65,66,44,_binary '',1,16,0,NULL,'BX Móng Cái - QL18 - Sao Đỏ - Bắc Ninh - QL1 - QL37 - BX Phú Bình',4.9,370,NULL),(90,66,65,44,_binary '\0',1,16,0,NULL,'BX Phú Bình - QL37 - QL1 - Bắc Ninh - Sao Đỏ - QL18 - BX Móng Cái',4.9,370,NULL),(91,67,68,45,_binary '',1,12,0,NULL,'BX Huyên Hồng - QL47 - TP Thanh Hóa (Theo phân luồng của TP) - QL1A - Cao tốc Ninh Bình - Vành đai 3 trên cao - Cầu Thanh Trì - Cao tốc Hà Nội Bắc Giang - QL17 - ĐT295B - Đường Thân Nhân Trung - Đường Xương Giang - BX Bắc Giang',3.1,230,NULL),(92,68,67,45,_binary '\0',1,12,0,NULL,'BX Bắc Giang - Đường Xương Giang - Đường Thân Nhân Trung - ĐT295B - QL17 - Cao tốc Hà Nội Bắc Giang - Cầu Thanh Trì - Vành đai 3 trên cao - Cao tốc Ninh Bình - QL1A - TP Thanh Hóa (Theo phân luồng của TP) - QL47 - BX Huyên Hồng',3.1,230,NULL),(93,69,70,46,_binary '',1,12,0,NULL,'BX Lao Bảo - QL9 - Đường Hồ Chí Minh - Ngã Tư Sòng - QL1 - BX Nước Ngầm',8,600,NULL),(94,70,69,46,_binary '\0',1,12,0,NULL,'BX Nước Ngầm - QL1 - Ngã Tư Sòng - Đường Hồ Chí Minh - QL9 - BX Lao Bảo',8,600,NULL),(95,42,71,29,_binary '',1,17,0,NULL,'BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - Bến Tre - QL60 - QL53 - BX Duyên Hải',3.4,253,NULL),(96,71,42,29,_binary '\0',1,17,0,NULL,'BX Duyên Hải - QL53 - QL60 - Bến Tre - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây',3.4,253,NULL),(97,42,39,28,_binary '',1,18,0,NULL,'BX Miền Tây - Đường Kinh Dương Vương - Ngã Ba cây Dầu Đôi - QL1 - Đường 23/10 - BX Phía Nam Nha Trang',6.1,460,'5079.1211.A'),(98,39,42,28,_binary '\0',1,18,0,NULL,'BX Phía Nam Nha Trang - Đường 23/10 - QL1 - Ngã Ba cây Dầu Đôi - Đường Kinh Dương Vương - BX Miền Tây',6.1,460,'5079.1211.A'),(99,42,43,29,_binary '',1,18,0,NULL,'BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - QL53 - QL54 - BX Trà Vinh',2,151,'5084.1211.B'),(100,43,42,29,_binary '\0',1,18,0,NULL,'BX Trà Vinh - QL54 - QL53 - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây',2,151,'5084.1211.B'),(101,45,75,43,_binary '',1,11,0,NULL,'BX Xuyên Mộc - QL55 - QL51 - QL1 - QL22 - BX An Sương',1.6,120,'5072.1420.A'),(102,75,45,43,_binary '\0',1,11,0,NULL,'BX An Sương - QL22 - QL1 - QL51 - QL55 - BX Xuyên Mộc',1.6,120,'5072.1420.A');
/*!40000 ALTER TABLE `trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip_bus`
--

DROP TABLE IF EXISTS `trip_bus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip_bus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trip_id` int NOT NULL,
  `bus_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `trip_idx` (`trip_id`),
  KEY `bus_Ky_idx` (`bus_id`),
  CONSTRAINT `bus_Ky` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `trip_Ky` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_bus`
--

LOCK TABLES `trip_bus` WRITE;
/*!40000 ALTER TABLE `trip_bus` DISABLE KEYS */;
INSERT INTO `trip_bus` VALUES (61,61,26),(62,62,26),(63,61,27),(64,62,27),(65,61,28),(66,62,28),(67,61,29),(68,62,29);
/*!40000 ALTER TABLE `trip_bus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip_driver`
--

DROP TABLE IF EXISTS `trip_driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip_driver` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trip_id` int NOT NULL,
  `driver_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `trip_ky_idx` (`trip_id`),
  KEY `driver_ky_idx` (`driver_id`),
  CONSTRAINT `driver_ky` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`driver_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `trip_ky2` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_driver`
--

LOCK TABLES `trip_driver` WRITE;
/*!40000 ALTER TABLE `trip_driver` DISABLE KEYS */;
INSERT INTO `trip_driver` VALUES (71,61,32),(72,62,32),(73,61,33),(74,62,33),(75,61,34),(76,62,34),(77,61,35),(78,62,35),(79,61,36),(80,62,36);
/*!40000 ALTER TABLE `trip_driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `account_id` int DEFAULT NULL,
  `gender` bit(1) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `tel` varchar(12) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_nbfia2ok6c7at4i0er6uyskkx` (`tel`),
  UNIQUE KEY `UK_nrrhhb0bsexvi8ch6wnon9uog` (`account_id`),
  CONSTRAINT `FKc3b4xfbq6rbkkrddsdum8t5f0` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (89,_binary '',87,'032050000','20110315@student.hcmute.edu.vn','Lê Yên'),(105,_binary '',103,'0346623721','an@gmail.com','Nguyễn Châu An'),(106,_binary '\0',104,'0495134695','ho@gmail.com','Lê Hò'),(107,_binary '',105,'0334467434','kimle02012@gmail.com','Nguyễn Châu Phú'),(108,_binary '',106,'0334457422','thuan@gmail.com','Nguyễn Châu Thuận'),(109,_binary '',107,'0334457477','hoang@gmail.com','Nguyễn Liên Hoàng'),(110,_binary '',108,'0224457477','hoangn@gmail.com','Nguyễn Liên Hoàng'),(111,_binary '',109,'0248798687','donthandochai1243@gmail.com','Lê Thành Liên'),(112,_binary '',110,'0553798645','kimle020102@gmail.com','Nguyễn Phú Mỹ'),(113,_binary '\0',111,'0495134645','tho@gmail.com','Lê Văn Thọ'),(114,_binary '\0',112,'0495134646','nam@gmail.com','Lê Văn Nam'),(115,_binary '\0',113,'0495134640','chau@gmail.com','Lê Văn Châu'),(116,_binary '\0',114,'0495134639','chi@gmail.com','Lê Văn Chí'),(117,_binary '',115,'+84842281119','20110248@student.hcmute.edu.vn','Le Thi Kim Le'),(118,_binary '\0',116,'0495134635','ngo@gmail.com','Lê Ngô'),(119,_binary '',117,'0333967111','hoa@gmail.com','Nguyễn Hòa');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01 13:37:40
