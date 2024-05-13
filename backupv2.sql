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
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (89,_binary '',5,'$2a$10$JGvOAL7Lkl.TWBLRcPyDvet8m9xdGW6.yPQjKP4CZOxSvezr07.fm','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NyIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJNQU5BR0VSIn1dLCJ0eXBlIjoiQWNjZXNzIFRva2VuIiwiaWF0IjoxNzE0ODQ0NTY2LCJleHAiOjE3MTU0NDYzMTF9.Xrek5tKREeE-bJXOSCF2RGwwvXbU7lfccpcP-0FwJhU','20110315@student.hcmute.edu.vn',NULL),(105,_binary '',1,'$2a$10$Bun8vntLWKvTmXJGE/ea.ufyrlNUoLDS9Wk1WSyyYD82CBQIwTvee','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDMiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInR5cGUiOiJBY2Nlc3MgVG9rZW4iLCJpYXQiOjE3MTQ2OTExNDUsImV4cCI6MTcxNTI5NTI1Nn0.UxgNo3GeGyIzzTVc2LGDVik-S__r3402T9PzDkJ_zeQ','an@gmail.com',''),(106,_binary '',2,'$2a$10$ly/5VBz4qdzMoqu1fV190uNN99L87ScEO7mfDWV.ZkG1N5/s41RnC','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDQiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiU1RBRkYifV0sInR5cGUiOiJBY2Nlc3MgVG9rZW4iLCJpYXQiOjE3MTQxODUxMTMsImV4cCI6MTcxNDc4NDk3OX0.GWC2XI2ca7PMIjGL3jV3Twk44HYjNBlTeF0Q_Q18aOI','ho@gmail.com',''),(107,_binary '',1,'$2a$10$olK8od0Nrl97ENV/eJUX/uXKYPvzuiOGOzb.U/HwJrRbpm2LTzgy.','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDUiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInR5cGUiOiJBY2Nlc3MgVG9rZW4iLCJpYXQiOjE3MTQ4NDAzMjksImV4cCI6MTcxNTQ0MDQwNn0.7ceVJvYOTXjLt1nebGyKPobewds2M6vAvi8on-mEj14','kimle02012@gmail.com',''),(108,_binary '',1,'$2a$10$CpAihBYYdeyvp6fVNZGkmegRYtShfOaop09Fl8kJb.oYaQWJuRxzS',NULL,'thuan@gmail.com',''),(109,_binary '',1,'$2a$10$dGA9vsvvUxt94fJgKYysy.ixF7/TQdwHr.ioGDjH.4mPJ2OJ17ISS',NULL,'hoang@gmail.com',''),(110,_binary '',1,'$2a$10$9/zCbvP0CuoOWynLGegp3uQD0szCVEcobZ4QIgeWMxbnR.w9AuBrq',NULL,'hoangn@gmail.com',''),(111,_binary '',1,'$2a$10$CHHrDb4bw8e9PWwRH/TxyO7vc40DSrlbA1u7NvwG7IYuaffE1WsPK',NULL,'donthandochai23@gmail.com',''),(112,_binary '',1,'$2a$10$m02V2DRQtSPtLEE0Piion.a7ga9/NlJEHaTr8Y5.XfjTZQ/Ss9LfG',NULL,'kimle020102@gmail.com','');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (18,32),(19,34),(20,35),(21,36),(22,37),(23,38),(24,39);
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus`
--

LOCK TABLES `bus` WRITE;
/*!40000 ALTER TABLE `bus` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_company`
--

LOCK TABLES `bus_company` WRITE;
/*!40000 ALTER TABLE `bus_company` DISABLE KEYS */;
INSERT INTO `bus_company` VALUES (11,'Xe Châu An','2024-04-27','98942334243',1,18),(12,'Xe Châu Phú','2024-04-27','98982234243',1,19),(13,'Xe Châu Thuận','2024-04-28','98988334443',1,20),(14,'Xe Liên Hoàng','2024-04-29','98988774443',1,21),(15,'Xe Liên Hưng','2024-04-29','98988774443',1,22),(16,'Xe Thành Liên','2024-05-05','9865HIJUIJ',1,23),(17,'Xe Phú Mỹ','2024-05-05','98C423945',1,24);
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_quality`
--

LOCK TABLES `bus_quality` WRITE;
/*!40000 ALTER TABLE `bus_quality` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_lk5jd2xt4w731pppyfgrwx36x` (`seatmap_id`),
  KEY `cpnid5_idx` (`company_id`),
  CONSTRAINT `cpnid5` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `FKeidjcxjck2oefj001gdfa1p6w` FOREIGN KEY (`seatmap_id`) REFERENCES `seat_map` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_type`
--

LOCK TABLES `bus_type` WRITE;
/*!40000 ALTER TABLE `bus_type` DISABLE KEYS */;
INSERT INTO `bus_type` VALUES (5,'limousine_40',40,0,5,'limousine 40 chỗ',11,1),(6,'limousine_33',33,0,6,'limousine 33 chỗ',12,1),(7,'bus_20',20,0,7,'Xe khách 20 chỗ',11,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=343 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fixed_schedule`
--

LOCK TABLES `fixed_schedule` WRITE;
/*!40000 ALTER TABLE `fixed_schedule` DISABLE KEYS */;
INSERT INTO `fixed_schedule` VALUES (33,61,'07:00:00',2),(34,61,'07:00:00',3),(35,61,'07:00:00',4),(36,61,'07:00:00',5),(37,61,'07:00:00',6),(38,61,'07:00:00',7),(39,61,'07:00:00',8),(40,62,'21:00:00',2),(41,62,'21:00:00',3),(42,62,'21:00:00',4),(43,62,'21:00:00',5),(44,62,'21:00:00',6),(45,62,'21:00:00',7),(46,62,'21:00:00',8),(47,63,'13:00:00',2),(48,63,'15:00:00',2),(49,63,'13:00:00',3),(50,63,'15:00:00',3),(51,63,'13:00:00',4),(52,63,'15:00:00',4),(53,63,'13:00:00',5),(54,63,'15:00:00',5),(55,63,'13:00:00',6),(56,63,'15:00:00',6),(57,63,'13:00:00',7),(58,63,'15:00:00',7),(59,63,'13:00:00',8),(60,63,'15:00:00',8),(61,64,'07:00:00',2),(62,64,'09:00:00',2),(63,64,'07:00:00',3),(64,64,'09:00:00',3),(65,64,'07:00:00',4),(66,64,'09:00:00',4),(67,64,'07:00:00',5),(68,64,'09:00:00',5),(69,64,'07:00:00',6),(70,64,'09:00:00',6),(71,64,'07:00:00',7),(72,64,'09:00:00',7),(73,64,'07:00:00',8),(74,64,'09:00:00',8),(75,65,'08:00:00',2),(76,65,'09:00:00',2),(77,65,'08:00:00',3),(78,65,'09:00:00',3),(79,65,'08:00:00',4),(80,65,'09:00:00',4),(81,65,'08:00:00',5),(82,65,'09:00:00',5),(83,65,'08:00:00',6),(84,65,'09:00:00',6),(85,65,'08:00:00',7),(86,65,'09:00:00',7),(87,65,'08:00:00',8),(88,65,'09:00:00',8),(89,66,'10:00:00',2),(90,66,'12:00:00',2),(91,66,'10:00:00',3),(92,66,'12:00:00',3),(93,66,'10:00:00',4),(94,66,'12:00:00',4),(95,66,'10:00:00',5),(96,66,'12:00:00',5),(97,66,'10:00:00',6),(98,66,'12:00:00',6),(99,66,'10:00:00',7),(100,66,'12:00:00',7),(101,66,'10:00:00',8),(102,66,'12:00:00',8),(103,67,'07:00:00',2),(104,67,'15:00:00',2),(105,67,'07:00:00',3),(106,67,'15:00:00',3),(107,67,'07:00:00',4),(108,67,'15:00:00',4),(109,67,'07:00:00',5),(110,67,'15:00:00',5),(111,67,'07:00:00',6),(112,67,'15:00:00',6),(113,67,'07:00:00',7),(114,67,'15:00:00',7),(115,67,'07:00:00',8),(116,67,'15:00:00',8),(117,68,'20:00:00',2),(118,68,'20:00:00',3),(119,68,'20:00:00',4),(120,68,'20:00:00',5),(121,68,'20:00:00',6),(122,68,'20:00:00',7),(123,68,'20:00:00',8),(124,69,'07:00:00',2),(125,69,'16:00:00',2),(126,69,'07:00:00',3),(127,69,'16:00:00',3),(128,69,'07:00:00',4),(129,69,'16:00:00',4),(130,69,'07:00:00',5),(131,69,'16:00:00',5),(132,69,'07:00:00',6),(133,69,'16:00:00',6),(134,69,'07:00:00',7),(135,69,'16:00:00',7),(136,69,'07:00:00',8),(137,69,'16:00:00',8),(138,70,'18:00:00',2),(139,70,'18:00:00',3),(140,70,'18:00:00',4),(141,70,'18:00:00',5),(142,70,'18:00:00',6),(143,70,'18:00:00',7),(144,70,'18:00:00',8),(145,71,'07:00:00',2),(146,71,'07:00:00',3),(147,71,'07:00:00',4),(148,71,'07:00:00',5),(149,71,'07:00:00',6),(150,71,'07:00:00',7),(151,71,'07:00:00',8),(152,72,'08:00:00',2),(153,72,'08:00:00',3),(154,72,'08:00:00',4),(155,72,'08:00:00',5),(156,72,'08:00:00',6),(159,72,'08:00:00',7),(160,71,'09:00:00',8),(161,73,'07:00:00',2),(162,73,'07:00:00',3),(163,73,'07:00:00',4),(164,73,'07:00:00',5),(165,73,'07:00:00',6),(166,73,'07:00:00',7),(167,73,'07:00:00',8),(168,74,'07:00:00',2),(169,74,'07:00:00',3),(170,74,'07:00:00',4),(171,74,'07:00:00',5),(172,74,'07:00:00',6),(173,74,'07:00:00',7),(174,74,'07:00:00',8),(175,75,'10:00:00',2),(176,75,'10:00:00',3),(177,75,'10:00:00',4),(178,75,'10:00:00',5),(179,75,'10:00:00',6),(180,75,'10:00:00',7),(181,75,'10:00:00',8),(182,76,'22:00:00',2),(183,76,'22:00:00',3),(184,76,'22:00:00',4),(185,76,'22:00:00',5),(186,76,'22:00:00',6),(187,76,'22:00:00',7),(188,76,'22:00:00',8),(189,77,'07:00:00',2),(190,77,'07:00:00',3),(191,77,'07:00:00',4),(192,77,'07:00:00',5),(193,77,'07:00:00',6),(194,77,'07:00:00',7),(195,77,'07:00:00',8),(196,78,'07:00:00',2),(197,78,'07:00:00',3),(198,78,'07:00:00',4),(199,78,'07:00:00',5),(200,78,'07:00:00',6),(201,78,'07:00:00',7),(202,78,'07:00:00',8),(203,79,'07:00:00',2),(204,79,'07:00:00',3),(205,79,'07:00:00',4),(206,79,'07:00:00',5),(207,79,'07:00:00',6),(208,79,'07:00:00',7),(209,79,'07:00:00',8),(210,80,'07:00:00',2),(211,80,'07:00:00',3),(212,80,'07:00:00',4),(213,80,'07:00:00',5),(214,80,'07:00:00',6),(215,80,'07:00:00',7),(216,80,'07:00:00',8),(217,81,'07:00:00',2),(218,81,'07:00:00',3),(219,81,'07:00:00',4),(220,81,'07:00:00',5),(221,81,'07:00:00',6),(222,81,'07:00:00',7),(223,81,'07:00:00',8),(224,82,'07:00:00',2),(225,82,'07:00:00',3),(226,82,'07:00:00',4),(227,82,'07:00:00',5),(228,82,'07:00:00',6),(229,82,'07:00:00',7),(230,82,'07:00:00',8),(231,83,'07:00:00',2),(232,83,'07:00:00',3),(233,83,'07:00:00',4),(234,83,'07:00:00',5),(235,83,'07:00:00',6),(236,83,'07:00:00',7),(237,83,'07:00:00',8),(238,84,'07:00:00',2),(239,84,'07:00:00',3),(240,84,'07:00:00',4),(241,84,'07:00:00',5),(242,84,'07:00:00',6),(243,84,'07:00:00',7),(244,84,'07:00:00',8),(245,85,'07:00:00',2),(246,85,'07:00:00',3),(247,85,'07:00:00',4),(248,85,'07:00:00',5),(249,85,'07:00:00',6),(250,85,'07:00:00',7),(251,85,'07:00:00',8),(252,86,'07:00:00',2),(253,86,'07:00:00',3),(254,86,'07:00:00',4),(255,86,'07:00:00',5),(256,86,'07:00:00',6),(257,86,'07:00:00',7),(258,86,'07:00:00',8),(259,87,'07:00:00',2),(260,87,'07:00:00',3),(261,87,'07:00:00',4),(262,87,'07:00:00',5),(263,87,'07:00:00',6),(264,87,'07:00:00',7),(265,87,'07:00:00',8),(266,88,'07:00:00',2),(267,88,'07:00:00',3),(268,88,'07:00:00',4),(269,88,'07:00:00',5),(270,88,'07:00:00',6),(271,88,'07:00:00',7),(272,88,'07:00:00',8),(273,89,'07:00:00',2),(274,89,'09:00:00',2),(275,89,'07:00:00',3),(276,89,'09:00:00',3),(277,89,'07:00:00',4),(278,89,'09:00:00',4),(279,89,'07:00:00',5),(280,89,'09:00:00',5),(281,89,'07:00:00',6),(282,89,'09:00:00',6),(283,89,'07:00:00',7),(284,89,'09:00:00',7),(285,89,'07:00:00',8),(286,89,'09:00:00',8),(287,90,'10:00:00',2),(288,90,'13:00:00',2),(289,90,'10:00:00',3),(290,90,'13:00:00',3),(291,90,'10:00:00',4),(292,90,'13:00:00',4),(293,90,'10:00:00',5),(294,90,'13:00:00',5),(295,90,'10:00:00',6),(296,90,'13:00:00',6),(297,90,'10:00:00',7),(298,90,'13:00:00',7),(299,90,'10:00:00',8),(300,90,'13:00:00',8),(301,91,'07:00:00',2),(302,91,'07:00:00',3),(303,91,'07:00:00',4),(304,91,'07:00:00',5),(305,91,'07:00:00',6),(306,91,'07:00:00',7),(307,91,'07:00:00',8),(308,92,'07:00:00',2),(309,92,'07:00:00',3),(310,92,'07:00:00',4),(311,92,'07:00:00',5),(312,92,'07:00:00',6),(313,92,'07:00:00',7),(314,92,'07:00:00',8),(315,93,'07:00:00',2),(316,93,'07:00:00',3),(317,93,'07:00:00',4),(318,93,'07:00:00',5),(319,93,'07:00:00',6),(320,93,'07:00:00',7),(321,93,'07:00:00',8),(322,94,'08:00:00',2),(323,94,'08:00:00',3),(324,94,'08:00:00',4),(325,94,'08:00:00',5),(326,94,'08:00:00',6),(327,94,'08:00:00',7),(328,94,'08:00:00',8),(329,95,'07:00:00',2),(330,95,'07:00:00',3),(331,95,'07:00:00',4),(332,95,'07:00:00',5),(333,95,'07:00:00',6),(334,95,'07:00:00',7),(335,95,'07:00:00',8),(336,96,'07:00:00',2),(337,96,'07:00:00',3),(338,96,'07:00:00',4),(339,96,'07:00:00',5),(340,96,'07:00:00',6),(341,96,'07:00:00',7),(342,96,'07:00:00',8);
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
  `route_code` varchar(45) DEFAULT NULL,
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
INSERT INTO `route` VALUES (28,37,38,0,1,NULL),(29,37,39,0,1,NULL),(30,37,40,0,1,NULL),(31,37,41,0,1,NULL),(32,42,37,0,1,NULL),(33,43,44,0,1,NULL),(34,45,46,0,1,NULL),(35,48,49,0,1,NULL),(36,50,51,0,1,NULL),(37,43,37,0,1,NULL),(38,45,52,0,1,NULL),(39,53,54,0,1,NULL),(40,51,55,0,1,NULL),(41,51,46,0,1,NULL),(42,56,55,0,1,NULL),(43,37,57,0,1,NULL),(44,50,58,0,1,NULL),(45,59,60,0,1,NULL),(46,42,61,0,1,NULL);
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
  PRIMARY KEY (`id`),
  KEY `routeidsign_idx` (`route_id`),
  KEY `cpnidsign` (`company_id`),
  CONSTRAINT `cpnidsign` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `routeidsign` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_assign`
--

LOCK TABLES `route_assign` WRITE;
/*!40000 ALTER TABLE `route_assign` DISABLE KEYS */;
INSERT INTO `route_assign` VALUES (5,11,28),(6,12,29),(7,13,30),(8,13,31),(9,13,32),(10,15,34),(11,14,36),(12,14,37),(13,15,38),(14,12,39),(15,12,40),(16,12,41),(17,12,42),(18,11,43),(19,16,44),(20,12,45),(21,12,46),(22,17,29);
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
  `finish_time` time(6) NOT NULL,
  `special_day_id` int DEFAULT NULL,
  `trip_id` int DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  `bus_id` int DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  `driver2_id` int DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=721 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (625,'2024-04-28','07:00:00',37,300000,'00:00:00.000000',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL),(626,'2024-04-28','21:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL),(627,'2024-04-28','10:00:00',40,300000,'00:00:00.000000',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL),(628,'2024-04-28','15:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL),(629,'2024-04-29','07:00:00',40,300000,'00:00:00.000000',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL),(630,'2024-04-29','21:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL),(631,'2024-04-29','10:00:00',40,300000,'00:00:00.000000',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL),(632,'2024-04-29','15:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL),(633,'2024-04-30','07:00:00',40,300000,'00:00:00.000000',NULL,61,NULL,NULL,'',NULL),(634,'2024-05-01','07:00:00',40,300000,'00:00:00.000000',NULL,61,NULL,NULL,'',NULL),(635,'2024-04-30','21:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,'',NULL),(636,'2024-05-01','21:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,'',NULL),(637,'2024-04-28','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(638,'2024-04-28','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(639,'2024-04-28','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(640,'2024-04-28','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(641,'2024-04-28','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(642,'2024-04-28','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(643,'2024-04-29','07:00:00',31,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(644,'2024-04-29','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(645,'2024-04-29','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(646,'2024-04-29','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(647,'2024-04-29','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(648,'2024-04-29','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(649,'2024-04-30','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(650,'2024-04-30','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(651,'2024-04-30','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(652,'2024-04-30','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(653,'2024-04-30','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(654,'2024-04-30','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(655,'2024-05-01','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(656,'2024-05-01','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(657,'2024-05-01','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(658,'2024-05-01','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(659,'2024-05-01','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(660,'2024-05-01','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(661,'2024-05-02','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(662,'2024-05-02','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(663,'2024-05-02','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(664,'2024-05-02','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(665,'2024-05-02','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(666,'2024-05-02','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(667,'2024-05-03','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(668,'2024-05-03','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(669,'2024-05-03','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(670,'2024-05-03','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(671,'2024-05-03','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(672,'2024-05-03','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(673,'2024-05-04','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(674,'2024-05-04','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(675,'2024-05-04','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(676,'2024-05-04','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(677,'2024-05-04','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(678,'2024-05-04','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(679,'2024-05-05','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(680,'2024-05-05','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(681,'2024-05-05','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(682,'2024-05-05','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(683,'2024-05-05','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(684,'2024-05-05','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(685,'2024-05-06','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(686,'2024-05-06','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(687,'2024-05-06','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(688,'2024-05-06','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(689,'2024-05-06','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(690,'2024-05-06','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(691,'2024-05-07','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(692,'2024-05-07','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(693,'2024-05-07','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(694,'2024-05-07','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(695,'2024-05-07','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(696,'2024-05-07','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(697,'2024-05-08','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(698,'2024-05-08','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(699,'2024-05-08','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(700,'2024-05-08','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(701,'2024-05-08','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(702,'2024-05-09','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(703,'2024-05-08','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(704,'2024-05-09','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(705,'2024-05-09','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(706,'2024-05-09','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(707,'2024-05-09','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(708,'2024-05-09','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(709,'2024-05-10','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(710,'2024-05-10','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(711,'2024-05-10','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(712,'2024-05-10','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(713,'2024-05-10','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(714,'2024-05-11','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(715,'2024-05-10','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(716,'2024-05-11','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(717,'2024-05-11','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(718,'2024-05-11','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL),(719,'2024-05-11','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL),(720,'2024-05-11','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (131,0,2,1,5,'A03',1),(132,1,0,1,5,'A04',1),(133,1,1,1,5,'A05',1),(134,1,2,1,5,'A06',1),(135,2,0,1,5,'A07',1),(136,2,1,1,5,'A08',1),(137,2,2,1,5,'A09',1),(138,3,0,1,5,'A10',1),(139,3,1,1,5,'A11',1),(140,3,2,1,5,'A12',1),(141,4,0,1,5,'A13',1),(142,4,1,1,5,'A14',1),(143,4,2,1,5,'A15',1),(144,5,0,1,5,'A16',1),(145,5,1,1,5,'A17',1),(146,5,2,1,5,'A18',1),(147,6,0,1,5,'A19',1),(148,6,1,1,5,'A20',1),(149,6,2,1,5,'A21',1),(150,0,0,2,5,'B01',1),(151,0,1,2,5,'B02',1),(152,0,2,2,5,'B03',1),(153,1,0,2,5,'B04',1),(154,1,1,2,5,'B05',1),(155,1,2,2,5,'B06',1),(156,2,0,2,5,'B07',1),(157,2,1,2,5,'B08',1),(158,2,2,2,5,'B09',1),(159,3,0,2,5,'B10',1),(160,3,1,2,5,'B11',1),(161,3,2,2,5,'B12',1),(162,4,0,2,5,'B13',1),(163,4,1,2,5,'B14',1),(164,4,2,2,5,'B15',1),(165,5,0,2,5,'B16',1),(166,5,1,2,5,'B17',1),(167,5,2,2,5,'B18',1),(168,6,0,2,5,'B19',1),(169,6,1,2,5,'B20',1),(170,6,2,2,5,'B21',1),(171,0,2,1,6,'A03',1),(172,1,0,1,6,'A04',1),(173,1,1,1,6,'A05',1),(174,1,2,1,6,'A06',1),(175,2,0,1,6,'A07',1),(176,2,1,1,6,'A08',1),(177,2,2,1,6,'A09',1),(178,3,0,1,6,'A10',1),(179,3,1,1,6,'A11',1),(180,3,2,1,6,'A12',1),(181,4,0,1,6,'A13',1),(182,4,1,1,6,'A14',1),(183,4,2,1,6,'A15',1),(184,5,0,1,6,'A16',1),(185,5,1,1,6,'A17',1),(186,5,2,1,6,'A18',1),(187,0,0,2,6,'B01',1),(188,0,2,2,6,'B03',1),(189,1,0,2,6,'B04',1),(190,1,1,2,6,'B05',1),(191,1,2,2,6,'B06',1),(192,2,0,2,6,'B07',1),(193,2,1,2,6,'B08',1),(194,2,2,2,6,'B09',1),(195,3,0,2,6,'B10',1),(196,3,1,2,6,'B11',1),(197,3,2,2,6,'B12',1),(198,4,0,2,6,'B13',1),(199,4,1,2,6,'B14',1),(200,4,2,2,6,'B15',1),(201,5,0,2,6,'B16',1),(202,5,1,2,6,'B17',1),(203,5,2,2,6,'B18',1),(204,0,2,1,7,'C01',1),(205,0,3,1,7,'D01',1),(206,1,0,1,7,'A02',1),(207,1,1,1,7,'B02',1),(208,1,2,1,7,'C02',1),(209,1,3,1,7,'D02',1),(210,2,0,1,7,'A03',1),(211,2,1,1,7,'B03',1),(212,2,2,1,7,'C03',1),(213,2,3,1,7,'D03',1),(214,3,0,1,7,'A04',1),(215,3,1,1,7,'B04',1),(216,3,2,1,7,'C04',1),(217,3,3,1,7,'D04',1),(218,4,0,1,7,'A05',1),(219,4,1,1,7,'B05',1),(220,4,2,1,7,'C05',1),(221,4,3,1,7,'D05',1),(222,5,0,1,7,'A06',1),(223,5,3,1,7,'D06',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat_map`
--

LOCK TABLES `seat_map` WRITE;
/*!40000 ALTER TABLE `seat_map` DISABLE KEYS */;
INSERT INTO `seat_map` VALUES (5,7,3,2),(6,6,3,2),(7,6,4,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_fee`
--

LOCK TABLES `service_fee` WRITE;
/*!40000 ALTER TABLE `service_fee` DISABLE KEYS */;
INSERT INTO `service_fee` VALUES (1,4522000,'Chờ thanh toán','2024-05-12',NULL,12,'69337686'),(2,374000,'Chờ thanh toán','2024-05-20',NULL,17,'24856769');
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES ('2024-04-27',32,103,'567890464564','Thủ Đức','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Châu An',11),('2024-04-27',33,104,'098673530459','Gò Vấp, Hồ Chí Minh','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Lê Hò',11),('2024-04-27',34,105,'567222464564','Bình Tân','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Châu Phú',12),('2024-04-28',35,106,'645635645747','Bình Hưng, Cam Ranh','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Châu Thuận',13),('2024-04-29',36,107,'567890123111','Bình Hưng Hòa','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Liên Hoàng',14),('2024-04-29',37,108,'567890464500','Hà Nội','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Liên Hoàng',15),('2024-05-05',38,109,'849485235','Cam Ranh, Khánh Hòa','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Lê Thành Liên',16),('2024-05-05',39,110,'567123489346','Hà Nội','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Phú Mỹ',17);
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
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `station`
--

LOCK TABLES `station` WRITE;
/*!40000 ALTER TABLE `station` DISABLE KEYS */;
INSERT INTO `station` VALUES (38,'Miền Đông','Bến xe Miền Đông, Dinh Bo Linh, Ward 26, Binh Thanh District, Ho Chi Minh City, 72309, Vietnam',37,10.81494470,106.71069170,1,NULL),(39,'Phía Nam Nha Trang','Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam',38,12.25839475,109.13485589,1,NULL),(40,'Ngã tư Thủ Đức','Thu Duc Intersection, Cầu vượt Ngã tư Thủ Đức, Binh Tho Ward, Thủ Đức, Ho Chi Minh City, 00848, Vietnam',37,10.84912750,106.77403120,1,11),(41,'Bến xe Cam Ranh','Lê Duẩn, Phường Cam Lộc, Cam Ranh, Khánh Hòa Province, Vietnam',38,11.91803368,109.14670324,1,11),(42,'Miền Tây','Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam',37,10.74012710,106.61940059,1,NULL),(43,'Trà Vinh','Bến xe Trà Vinh, Trà Vinh',39,0.00000000,0.00000000,1,NULL),(44,'Trạm xe Thanh Thủy, Bình Phú','National Route 53, Xã Bình Phú, Càng Long District, Trà Vinh Province, Vietnam',39,9.96000815,106.24510484,1,12),(45,'An Sương','Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam',37,10.84525430,106.61334520,1,NULL),(46,'Quy Nhơn','Quy Nhon Bus Station, Quốc lộ 1D, Ghềnh Ráng, Phường Ghềnh Ráng, Quy Nhơn, Bình Định Province, 59000, Vietnam',40,13.75333960,109.20890740,1,NULL),(47,'Ngã Tư Ga','Bến xe Ngã tư Ga, Quốc lộ 1, Phường Thạnh Lộc, District 12, Ho Chi Minh City, 71514, Vietnam',37,10.86232380,106.67872000,1,NULL),(48,'Cà Mau','Bến xe Cà Mau, Lý Thường Kiệt, Phường 6, Xã Định Bình, Cà Mau, Cà Mau Province, Vietnam',41,9.17577040,105.17094360,1,NULL),(49,'Giáp Bát','Bến xe Giáp Bát, Đường Giải Phóng, Phường Giáp Bát, Hoang Mai District, Hà Nội, 11718, Vietnam',42,20.98042550,105.84146350,1,NULL),(50,'Miền Đông Mới','Bến xe Miền Đông mới, Đường số 13, Long Binh Ward, Thủ Đức, Ho Chi Minh City, Dĩ An, Bình Dương Province, 71300, Vietnam',37,10.87856780,106.81498810,1,NULL),(51,'Quất Lâm','Bến xe Quất Lâm, Nam Định',43,0.00000000,0.00000000,1,NULL),(52,'Trung tâm Lào Cai','Bến xe Trung tâm Lào Cai, Đường Bình Minh, Pom Han Ward, Lào Cai, Lào Cai Province, Vietnam',44,22.42530190,104.03022146,1,NULL),(53,'Liên tỉnh TP Cao Bằng','City interprovincial bus station, Cao Bang, National Highway 3, Cao Bằng, Hòa An District, Cao Bằng Province, 21110, Vietnam',45,22.68086165,106.20209994,1,NULL),(54,'Việt Trì','Bến xe Việt Trì, Phú Thọ',46,0.00000000,0.00000000,1,NULL),(55,'Cẩm Hải','Bến xe Cẩm Hải, Quảng Ninh',50,0.00000000,0.00000000,1,NULL),(56,'Huyện Tiền Hải','Bến xe Huyện Tiền Hải, Thái Bình',51,0.00000000,0.00000000,1,NULL),(57,'Nghĩa Hưng','Bến xe Nghĩa Hưng, Nam Định',43,0.00000000,0.00000000,1,NULL),(58,'Đức Long Bảo Lộc','Bến xe Đức Long Bảo Lộc, Lâm Đồng',52,0.00000000,0.00000000,1,NULL),(59,'TP Tuyên Quang','Bến xe TP Tuyên Quang, Tuyên Quang',53,0.00000000,0.00000000,1,NULL),(60,'Đồng Văn','Dong Van Bus Station, 3 February Road, Quyết Tiến, Quán Xín Ngài, Đồng Văn Town, Đồng Văn District, Hà Giang Province, Vietnam',54,23.27813465,105.35096316,1,NULL),(61,'TP Sơn La','Son La Bus Station, Đường Lê Duẩn, Sơn La, Sơn La Province, Vietnam',55,21.30140700,103.94344310,1,NULL),(62,'Trung tâm TP Thái Bình','Bến xe khách Trung tâm Thái Bình, Lý Bôn, Thái Bình, Thái Bình Province, 06118, Vietnam',51,20.44901175,106.33447339,1,NULL),(63,'Lai Châu','Lai Chau Bus Station, 30 April Road, Đông Phong Ward, Tân Phong Ward, Lai Châu, Lai Châu Province, Vietnam',56,22.38275665,103.48753264,1,NULL),(64,'Vǜng Tàu','Bến xe Vũng Tàu, 192, Nam Kỳ Khởi Nghĩa, Khu phố 2, Ward 3, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam',57,10.35033630,107.08715520,1,NULL),(65,'Móng Cái','Mong Cai Coach Terminal, Phạm Ngũ Lão, Quarter 2, Ka Long Ward, Móng Cái, Quảng Ninh Province, 02033, Vietnam',50,21.53037160,107.95833081,1,NULL),(66,'Phú Bình','Bến xe Phú Bình, Thái Nguyên',58,0.00000000,0.00000000,1,NULL),(67,'Huyên Hồng','Bến xe Huyên Hồng, Thanh Hoá',59,0.00000000,0.00000000,1,NULL),(68,'Bắc Giang','Bến xe Bắc Giang, Bắc Giang',60,0.00000000,0.00000000,1,NULL),(69,'Nước Ngầm','Bến xe Nước Ngầm, Đường Ngọc Hồi, Phường Hoàng Liệt, Hoang Mai District, Hà Nội, 11718, Vietnam',42,20.96475770,105.84223830,1,NULL),(70,'Lao Bảo','Bến xe Lao Bảo, Quảng Trị',61,0.00000000,0.00000000,1,NULL),(71,'Thị xã Duyên Hải','Bến xe Thị xã Duyên Hải, Trà Vinh',39,0.00000000,0.00000000,1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stop_station`
--

LOCK TABLES `stop_station` WRITE;
/*!40000 ALTER TABLE `stop_station` DISABLE KEYS */;
INSERT INTO `stop_station` VALUES (193,61,38,'pick',0,1),(194,61,39,'drop',0,1),(195,62,38,'drop',0,1),(196,62,39,'pick',0,1),(197,61,40,'pick',0,1),(198,62,40,'drop',0,1),(199,62,41,'pick',0,1),(200,61,41,'drop',0,1),(201,63,42,'pick',0,1),(202,63,43,'drop',0,1),(203,64,42,'drop',0,1),(204,64,43,'pick',0,1),(205,64,44,'pick',0,1),(206,63,44,'drop',0,1),(207,65,45,'pick',0,1),(208,65,46,'drop',0,1),(209,66,45,'drop',0,1),(210,66,46,'pick',0,1),(211,67,47,'pick',0,1),(212,67,48,'drop',0,1),(213,68,47,'drop',0,1),(214,68,48,'pick',0,1),(215,69,49,'pick',0,1),(216,69,50,'drop',0,1),(217,70,49,'drop',0,1),(218,70,50,'pick',0,1),(219,71,53,'pick',0,1),(220,71,54,'drop',0,1),(221,72,53,'drop',0,1),(222,72,54,'pick',0,1),(223,73,55,'pick',0,1),(224,73,56,'drop',0,1),(225,74,55,'drop',0,1),(226,74,56,'pick',0,1),(227,75,57,'pick',0,1),(228,75,45,'drop',0,1),(229,76,57,'drop',0,1),(230,76,45,'pick',0,1),(231,77,53,'pick',0,1),(232,77,58,'drop',0,1),(233,78,53,'drop',0,1),(234,78,58,'pick',0,1),(235,79,59,'pick',0,1),(236,79,60,'drop',0,1),(237,80,59,'drop',0,1),(238,80,60,'pick',0,1),(239,81,56,'pick',0,1),(240,81,61,'drop',0,1),(241,82,56,'drop',0,1),(242,82,61,'pick',0,1),(243,83,62,'pick',0,1),(244,83,54,'drop',0,1),(245,84,62,'drop',0,1),(246,84,54,'pick',0,1),(247,85,63,'pick',0,1),(248,85,61,'drop',0,1),(249,86,63,'drop',0,1),(250,86,61,'pick',0,1),(251,87,42,'pick',0,1),(252,87,64,'drop',0,1),(253,88,42,'drop',0,1),(254,88,64,'pick',0,1),(255,89,65,'pick',0,1),(256,89,66,'drop',0,1),(257,90,65,'drop',0,1),(258,90,66,'pick',0,1),(259,91,67,'pick',0,1),(260,91,68,'drop',0,1),(261,92,67,'drop',0,1),(262,92,68,'pick',0,1),(263,93,69,'pick',0,1),(264,93,70,'drop',0,1),(265,94,69,'drop',0,1),(266,94,70,'pick',0,1),(267,95,42,'pick',0,1),(268,95,71,'drop',0,1),(269,96,42,'drop',0,1),(270,96,71,'pick',0,1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_transaction`
--

LOCK TABLES `system_transaction` WRITE;
/*!40000 ALTER TABLE `system_transaction` DISABLE KEYS */;
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
-- Table structure for table `transportstation_order`
--

DROP TABLE IF EXISTS `transportstation_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportstation_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `schedule_id` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kn_idx` (`schedule_id`),
  CONSTRAINT `kn` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportstation_order`
--

LOCK TABLES `transportstation_order` WRITE;
/*!40000 ALTER TABLE `transportstation_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `transportstation_order` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (61,38,39,28,_binary '',1,11,300000,5,'BX Phía Nam Nha Trang - QL1A - QL13 - BX Miền Đông',6,450),(62,38,39,28,_binary '\0',1,11,300000,5,'BX Miền Đông - QL13 - QL1A - BX Phía Nam Nha Trang',6,450),(63,42,43,29,_binary '',1,12,120000,6,'BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - QL60 - QL53 - QL54 - BX Trà Vinh',1.8,135),(64,42,43,29,_binary '\0',1,12,120000,6,'BX Trà Vinh - QL54 - QL53 - QL60 - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây',1.8,135),(65,45,46,30,_binary '',1,13,0,NULL,'BX An Sương - QL22 - QL1 - QL1D - BX Quy Nhơn',8.7,649),(66,45,46,30,_binary '\0',1,13,0,NULL,'BX Quy Nhơn - QL1D - QL1 - QL22 - BX An Sương',8.7,649),(67,47,48,31,_binary '',1,13,0,NULL,'BX Cà Mau - QL1A - BX Ngã Tư Ga',4.9,366),(68,47,48,31,_binary '\0',1,13,0,NULL,'BX Ngã Tư Ga - QL1A - BX Cà Mau',4.9,366),(69,49,50,32,_binary '',1,13,0,NULL,'BX Miền Đông Mới - QL1A - BX Giáp Bát',23.3,1750),(70,49,50,32,_binary '\0',1,13,0,NULL,'BX Giáp Bát - QL1A - BX Miền Đông Mới',23.3,1750),(71,53,54,34,_binary '',1,15,0,NULL,'BX Việt Trì - QL2 - Ngã ba Kim Anh Vĩnh Yên - QL3 - BX Liên tỉnh TP Cao Bằng',4.2,314),(72,53,54,34,_binary '\0',1,15,0,NULL,'BX Liên tỉnh TP Cao Bằng - QL3 - Ngã ba Kim Anh Vĩnh Yên - QL2 - BX Việt Trì',4.2,314),(73,55,56,36,_binary '',1,14,0,NULL,'BX Cẩm Hải - QL18 - Cao tốc Hạ Long Hải Phòng - Cao tốc Hải Phòng Hà Nội - QL10 - ĐT458 - QL37B - BX Tiền Hải',2.7,200),(74,55,56,36,_binary '\0',1,14,0,NULL,'BX Tiền Hải - QL37B - ĐT458 - QL10 - Cao tốc Hải Phòng Hà Nội - Cao tốc Hạ Long Hải Phòng - QL18 - BX Cẩm Hải',2.7,200),(75,57,45,37,_binary '',1,14,0,NULL,'BX Nghĩa Hưng - TL490C - Đường Lê Đức Thọ - QL10 - QL1A - QL22 - BX An Sương',22.7,1700),(76,57,45,37,_binary '\0',1,14,0,NULL,'BX An Sương - QL22 - QL1A - QL10 - Đường Lê Đức Thọ - TL490C - BX Nghĩa Hưng',22.7,1700),(77,53,58,38,_binary '',1,15,0,NULL,'BX Đức Long Bảo Lộc - QL20 - QL27 - QL1A - Pháp Vân - Vành đai 3 trên cao (Đoạn Pháp Vân - Cầu Thanh Trì) - Cầu Thanh Trì - QL1 - QL3 - BX Liên tỉnh TP Cao Bằng',24.1,1805),(78,53,58,38,_binary '\0',1,15,0,NULL,'BX Liên tỉnh TP Cao Bằng - QL3 - QL1 - Cầu Thanh Trì - Cầu Thanh Trì) - Vành đai 3 trên cao (Đoạn Pháp Vân - Pháp Vân - QL1A - QL27 - QL20 - BX Đức Long Bảo Lộc',24.1,1805),(79,59,60,39,_binary '',1,12,200000,6,'BX Đồng Văn - QL4C - Yên Minh - Quản Bạ - Quyết Tiến - QL4C - QL2 - TP Hà Giang - QL2 - Bắc Quang - Hàm Yên - BX Tuyên Quang',4.1,305),(80,59,60,39,_binary '\0',1,12,200000,6,'BX Tuyên Quang - Hàm Yên - Bắc Quang - QL2 - TP Hà Giang - QL2 - QL4C - Quyết Tiến - Quản Bạ - Yên Minh - QL4C - BX Đồng Văn',4.1,305),(81,56,61,40,_binary '',1,12,250000,6,'BX Sơn La - QL6 - Vành đai 3 - QL5 - QL39 - QL10 - ĐT458 - QL37B - BX Tiền Hải',5.1,383),(82,56,61,40,_binary '\0',1,12,250000,6,'BX Tiền Hải - QL37B - ĐT458 - QL10 - QL39 - QL5 - Vành đai 3 - QL6 - BX Sơn La',5.1,383),(83,62,54,41,_binary '',1,12,0,NULL,'BX Trung tâm TP Thái Bình - QL10 - QL21 - QL1 - Pháp Vân Cầu Giẽ - Cầu Thanh Trì - QL5 - QL2 - BX Việt Trì',2.7,200),(84,62,54,41,_binary '\0',1,12,0,NULL,'BX Việt Trì - QL2 - QL5 - Cầu Thanh Trì - Pháp Vân Cầu Giẽ - QL1 - QL21 - QL10 - BX Trung tâm TP Thái Bình',2.7,200),(85,63,61,42,_binary '',1,12,0,NULL,'BX Lai Châu - QL4D - QL32 - QL279 - QL6 - BX Sơn La',3.3,250),(86,63,61,42,_binary '\0',1,12,0,NULL,'BX Sơn La - QL6 - QL279 - QL32 - QL4D - BX Lai Châu',3.3,250),(87,42,64,43,_binary '',1,11,100000,7,'BX Vǜng Tàu - Nam KǶ Khởi Nghĩa - Lê Hồng Phong - QL51 - QL1A - Kinh Dương Võ Văn Kiệt - BX Miền Tây',1.6,123),(88,42,64,43,_binary '\0',1,11,100000,7,'BX Miền Tây - Kinh Dương Võ Văn Kiệt - QL1A - QL51 - Lê Hồng Phong - Nam KǶ Khởi Nghĩa - BX Vǜng Tàu',1.6,123),(89,65,66,44,_binary '',1,16,0,NULL,'BX Móng Cái - QL18 - Sao Đỏ - Bắc Ninh - QL1 - QL37 - BX Phú Bình',4.9,370),(90,65,66,44,_binary '\0',1,16,0,NULL,'BX Phú Bình - QL37 - QL1 - Bắc Ninh - Sao Đỏ - QL18 - BX Móng Cái',4.9,370),(91,67,68,45,_binary '',1,12,0,NULL,'BX Huyên Hồng - QL47 - TP Thanh Hóa (Theo phân luồng của TP) - QL1A - Cao tốc Ninh Bình - Vành đai 3 trên cao - Cầu Thanh Trì - Cao tốc Hà Nội Bắc Giang - QL17 - ĐT295B - Đường Thân Nhân Trung - Đường Xương Giang - BX Bắc Giang',3.1,230),(92,67,68,45,_binary '\0',1,12,0,NULL,'BX Bắc Giang - Đường Xương Giang - Đường Thân Nhân Trung - ĐT295B - QL17 - Cao tốc Hà Nội Bắc Giang - Cầu Thanh Trì - Vành đai 3 trên cao - Cao tốc Ninh Bình - QL1A - TP Thanh Hóa (Theo phân luồng của TP) - QL47 - BX Huyên Hồng',3.1,230),(93,69,70,46,_binary '',1,12,0,NULL,'BX Lao Bảo - QL9 - Đường Hồ Chí Minh - Ngã Tư Sòng - QL1 - BX Nước Ngầm',8,600),(94,69,70,46,_binary '\0',1,12,0,NULL,'BX Nước Ngầm - QL1 - Ngã Tư Sòng - Đường Hồ Chí Minh - QL9 - BX Lao Bảo',8,600),(95,42,71,29,_binary '',1,17,0,NULL,'BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - Bến Tre - QL60 - QL53 - BX Duyên Hải',3.4,253),(96,42,71,29,_binary '\0',1,17,0,NULL,'BX Duyên Hải - QL53 - QL60 - Bến Tre - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây',3.4,253);
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_bus`
--

LOCK TABLES `trip_bus` WRITE;
/*!40000 ALTER TABLE `trip_bus` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_driver`
--

LOCK TABLES `trip_driver` WRITE;
/*!40000 ALTER TABLE `trip_driver` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (89,_binary '',87,'032050000','20110315@student.hcmute.edu.vn','Lê Yên'),(105,_binary '',103,'0334457434','an@gmail.com','Nguyễn Châu An'),(106,_binary '\0',104,'0495134695','ho@gmail.com','Lê Hò'),(107,_binary '',105,'0334467434','kimle02012@gmail.com','Nguyễn Châu Phú'),(108,_binary '',106,'0334457422','thuan@gmail.com','Nguyễn Châu Thuận'),(109,_binary '',107,'0334457477','hoang@gmail.com','Nguyễn Liên Hoàng'),(110,_binary '',108,'0224457477','hoangn@gmail.com','Nguyễn Liên Hoàng'),(111,_binary '',109,'0248798687','donthandochai1243@gmail.com','Lê Thành Liên'),(112,_binary '',110,'0553798645','kimle020102@gmail.com','Nguyễn Phú Mỹ');
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

-- Dump completed on 2024-05-05  7:11:03
