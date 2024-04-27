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
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (89,_binary '',5,'$2a$10$JGvOAL7Lkl.TWBLRcPyDvet8m9xdGW6.yPQjKP4CZOxSvezr07.fm','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NyIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJNQU5BR0VSIn1dLCJ0eXBlIjoiQWNjZXNzIFRva2VuIiwiaWF0IjoxNzE0MTgyODkzLCJleHAiOjE3MTQ3ODI5Nzh9.zGxDRhBu9jfnkhPjNfEVFGXtZcGIWl8KDrR_yDf-PO8','20110315@student.hcmute.edu.vn',NULL),(105,_binary '',1,'$2a$10$Bun8vntLWKvTmXJGE/ea.ufyrlNUoLDS9Wk1WSyyYD82CBQIwTvee',NULL,'an@gmail.com',''),(106,_binary '',2,'$2a$10$ly/5VBz4qdzMoqu1fV190uNN99L87ScEO7mfDWV.ZkG1N5/s41RnC','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDQiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiU1RBRkYifV0sInR5cGUiOiJBY2Nlc3MgVG9rZW4iLCJpYXQiOjE3MTQxODIzNjksImV4cCI6MTcxNDc4NDk3OX0.NE7FHYGGglDiEgeUxZGSHey0zfh3lD3B9kyXllkXqSw','ho@gmail.com',''),(107,_binary '',1,'$2a$10$olK8od0Nrl97ENV/eJUX/uXKYPvzuiOGOzb.U/HwJrRbpm2LTzgy.','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDUiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInR5cGUiOiJBY2Nlc3MgVG9rZW4iLCJpYXQiOjE3MTQxODQ0ODcsImV4cCI6MTcxNDc4Nzk2MH0.E2ZgECQPnlqIgKMLft9qbKZowRp5T6n1gvA1bpycFew','kimle020102@gmail.com','');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (18,32),(19,34);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_company`
--

LOCK TABLES `bus_company` WRITE;
/*!40000 ALTER TABLE `bus_company` DISABLE KEYS */;
INSERT INTO `bus_company` VALUES (11,'Xe Châu An','2024-04-27','98942334243',1,18),(12,'Xe Châu Phú','2024-04-27','98982234243',1,19);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_type`
--

LOCK TABLES `bus_type` WRITE;
/*!40000 ALTER TABLE `bus_type` DISABLE KEYS */;
INSERT INTO `bus_type` VALUES (5,'limousine_40',40,0,5,'limousine 40 chỗ',11,1),(6,'limousine_33',33,0,6,'limousine 33 chỗ',12,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fixed_schedule`
--

LOCK TABLES `fixed_schedule` WRITE;
/*!40000 ALTER TABLE `fixed_schedule` DISABLE KEYS */;
INSERT INTO `fixed_schedule` VALUES (33,61,'07:00:00',2),(34,61,'07:00:00',3),(35,61,'07:00:00',4),(36,61,'07:00:00',5),(37,61,'07:00:00',6),(38,61,'07:00:00',7),(39,61,'07:00:00',8),(40,62,'21:00:00',2),(41,62,'21:00:00',3),(42,62,'21:00:00',4),(43,62,'21:00:00',5),(44,62,'21:00:00',6),(45,62,'21:00:00',7),(46,62,'21:00:00',8),(47,63,'13:00:00',2),(48,63,'15:00:00',2),(49,63,'13:00:00',3),(50,63,'15:00:00',3),(51,63,'13:00:00',4),(52,63,'15:00:00',4),(53,63,'13:00:00',5),(54,63,'15:00:00',5),(55,63,'13:00:00',6),(56,63,'15:00:00',6),(57,63,'13:00:00',7),(58,63,'15:00:00',7),(59,63,'13:00:00',8),(60,63,'15:00:00',8),(61,64,'07:00:00',2),(62,64,'09:00:00',2),(63,64,'07:00:00',3),(64,64,'09:00:00',3),(65,64,'07:00:00',4),(66,64,'09:00:00',4),(67,64,'07:00:00',5),(68,64,'09:00:00',5),(69,64,'07:00:00',6),(70,64,'09:00:00',6),(71,64,'07:00:00',7),(72,64,'09:00:00',7),(73,64,'07:00:00',8),(74,64,'09:00:00',8);
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (37,'TP. Hồ Chí Minh',1),(38,'Khánh Hòa',1),(39,'Trà Vinh',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (28,37,38,0,1,NULL),(29,37,39,0,1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_assign`
--

LOCK TABLES `route_assign` WRITE;
/*!40000 ALTER TABLE `route_assign` DISABLE KEYS */;
INSERT INTO `route_assign` VALUES (5,11,28),(6,12,29);
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
  PRIMARY KEY (`id`),
  KEY `FKgl8nsr9ti0siey2cae9qlykv` (`special_day_id`),
  KEY `FKhk20mlu1gcwrnrxxkj23qhr0n` (`trip_id`),
  KEY `driver_FK_idx` (`driver_id`),
  KEY `bus_FKHIHI_idx` (`bus_id`),
  CONSTRAINT `bus_FKHIHI` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`id`),
  CONSTRAINT `driver_FK` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`driver_id`),
  CONSTRAINT `FKgl8nsr9ti0siey2cae9qlykv` FOREIGN KEY (`special_day_id`) REFERENCES `special_day` (`id`),
  CONSTRAINT `FKhk20mlu1gcwrnrxxkj23qhr0n` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=721 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (625,'2024-04-28','07:00:00',37,300000,'00:00:00.000000',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây'),(626,'2024-04-28','21:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây'),(627,'2024-04-28','10:00:00',40,300000,'00:00:00.000000',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây'),(628,'2024-04-28','15:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây'),(629,'2024-04-29','07:00:00',40,300000,'00:00:00.000000',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây'),(630,'2024-04-29','21:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây'),(631,'2024-04-29','10:00:00',40,300000,'00:00:00.000000',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây'),(632,'2024-04-29','15:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây'),(633,'2024-04-30','07:00:00',40,300000,'00:00:00.000000',NULL,61,NULL,NULL,''),(634,'2024-05-01','07:00:00',40,300000,'00:00:00.000000',NULL,61,NULL,NULL,''),(635,'2024-04-30','21:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,''),(636,'2024-05-01','21:00:00',40,300000,'00:00:00.000000',NULL,62,NULL,NULL,''),(637,'2024-04-28','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(638,'2024-04-28','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(639,'2024-04-28','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(640,'2024-04-28','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(641,'2024-04-28','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(642,'2024-04-28','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(643,'2024-04-29','07:00:00',31,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(644,'2024-04-29','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(645,'2024-04-29','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(646,'2024-04-29','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(647,'2024-04-29','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(648,'2024-04-29','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(649,'2024-04-30','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(650,'2024-04-30','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(651,'2024-04-30','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(652,'2024-04-30','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(653,'2024-04-30','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(654,'2024-04-30','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(655,'2024-05-01','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(656,'2024-05-01','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(657,'2024-05-01','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(658,'2024-05-01','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(659,'2024-05-01','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(660,'2024-05-01','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(661,'2024-05-02','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(662,'2024-05-02','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(663,'2024-05-02','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(664,'2024-05-02','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(665,'2024-05-02','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(666,'2024-05-02','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(667,'2024-05-03','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(668,'2024-05-03','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(669,'2024-05-03','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(670,'2024-05-03','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(671,'2024-05-03','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(672,'2024-05-03','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(673,'2024-05-04','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(674,'2024-05-04','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(675,'2024-05-04','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(676,'2024-05-04','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(677,'2024-05-04','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(678,'2024-05-04','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(679,'2024-05-05','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(680,'2024-05-05','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(681,'2024-05-05','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(682,'2024-05-05','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(683,'2024-05-05','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(684,'2024-05-05','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(685,'2024-05-06','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(686,'2024-05-06','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(687,'2024-05-06','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(688,'2024-05-06','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(689,'2024-05-06','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(690,'2024-05-06','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(691,'2024-05-07','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(692,'2024-05-07','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(693,'2024-05-07','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(694,'2024-05-07','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(695,'2024-05-07','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(696,'2024-05-07','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(697,'2024-05-08','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(698,'2024-05-08','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(699,'2024-05-08','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(700,'2024-05-08','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(701,'2024-05-08','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(702,'2024-05-09','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(703,'2024-05-08','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(704,'2024-05-09','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(705,'2024-05-09','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(706,'2024-05-09','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(707,'2024-05-09','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(708,'2024-05-09','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(709,'2024-05-10','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(710,'2024-05-10','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(711,'2024-05-10','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(712,'2024-05-10','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(713,'2024-05-10','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(714,'2024-05-11','13:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(715,'2024-05-10','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(716,'2024-05-11','15:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(717,'2024-05-11','07:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(718,'2024-05-11','20:00:00',33,120000,'00:00:00.000000',NULL,63,NULL,NULL,'Xe có đi qua cao tốc'),(719,'2024-05-11','09:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc'),(720,'2024-05-11','23:00:00',33,120000,'00:00:00.000000',NULL,64,NULL,NULL,'Xe có đi qua cao tốc');
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
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (131,0,2,1,5,'A03',1),(132,1,0,1,5,'A04',1),(133,1,1,1,5,'A05',1),(134,1,2,1,5,'A06',1),(135,2,0,1,5,'A07',1),(136,2,1,1,5,'A08',1),(137,2,2,1,5,'A09',1),(138,3,0,1,5,'A10',1),(139,3,1,1,5,'A11',1),(140,3,2,1,5,'A12',1),(141,4,0,1,5,'A13',1),(142,4,1,1,5,'A14',1),(143,4,2,1,5,'A15',1),(144,5,0,1,5,'A16',1),(145,5,1,1,5,'A17',1),(146,5,2,1,5,'A18',1),(147,6,0,1,5,'A19',1),(148,6,1,1,5,'A20',1),(149,6,2,1,5,'A21',1),(150,0,0,2,5,'B01',1),(151,0,1,2,5,'B02',1),(152,0,2,2,5,'B03',1),(153,1,0,2,5,'B04',1),(154,1,1,2,5,'B05',1),(155,1,2,2,5,'B06',1),(156,2,0,2,5,'B07',1),(157,2,1,2,5,'B08',1),(158,2,2,2,5,'B09',1),(159,3,0,2,5,'B10',1),(160,3,1,2,5,'B11',1),(161,3,2,2,5,'B12',1),(162,4,0,2,5,'B13',1),(163,4,1,2,5,'B14',1),(164,4,2,2,5,'B15',1),(165,5,0,2,5,'B16',1),(166,5,1,2,5,'B17',1),(167,5,2,2,5,'B18',1),(168,6,0,2,5,'B19',1),(169,6,1,2,5,'B20',1),(170,6,2,2,5,'B21',1),(171,0,2,1,6,'A03',1),(172,1,0,1,6,'A04',1),(173,1,1,1,6,'A05',1),(174,1,2,1,6,'A06',1),(175,2,0,1,6,'A07',1),(176,2,1,1,6,'A08',1),(177,2,2,1,6,'A09',1),(178,3,0,1,6,'A10',1),(179,3,1,1,6,'A11',1),(180,3,2,1,6,'A12',1),(181,4,0,1,6,'A13',1),(182,4,1,1,6,'A14',1),(183,4,2,1,6,'A15',1),(184,5,0,1,6,'A16',1),(185,5,1,1,6,'A17',1),(186,5,2,1,6,'A18',1),(187,0,0,2,6,'B01',1),(188,0,2,2,6,'B03',1),(189,1,0,2,6,'B04',1),(190,1,1,2,6,'B05',1),(191,1,2,2,6,'B06',1),(192,2,0,2,6,'B07',1),(193,2,1,2,6,'B08',1),(194,2,2,2,6,'B09',1),(195,3,0,2,6,'B10',1),(196,3,1,2,6,'B11',1),(197,3,2,2,6,'B12',1),(198,4,0,2,6,'B13',1),(199,4,1,2,6,'B14',1),(200,4,2,2,6,'B15',1),(201,5,0,2,6,'B16',1),(202,5,1,2,6,'B17',1),(203,5,2,2,6,'B18',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat_map`
--

LOCK TABLES `seat_map` WRITE;
/*!40000 ALTER TABLE `seat_map` DISABLE KEYS */;
INSERT INTO `seat_map` VALUES (5,7,3,2),(6,6,3,2);
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
  PRIMARY KEY (`id`),
  KEY `trid_idx` (`system_transaction_id`),
  KEY `cid_idx` (`company_id`),
  CONSTRAINT `cid` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `trid` FOREIGN KEY (`system_transaction_id`) REFERENCES `system_transaction` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_fee`
--

LOCK TABLES `service_fee` WRITE;
/*!40000 ALTER TABLE `service_fee` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES ('2024-04-27',32,103,'567890464564','Thủ Đức','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Châu An',11),('2024-04-27',33,104,'098673530459','Gò Vấp, Hồ Chí Minh','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Lê Hò',11),('2024-04-27',34,105,'567222464564','Bình Tân','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Châu Phú',12);
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `station`
--

LOCK TABLES `station` WRITE;
/*!40000 ALTER TABLE `station` DISABLE KEYS */;
INSERT INTO `station` VALUES (38,'Miền Đông','Bến xe Miền Đông, Dinh Bo Linh, Ward 26, Binh Thanh District, Ho Chi Minh City, 72309, Vietnam',37,10.81494470,106.71069170,1,NULL),(39,'Phía Nam Nha Trang','Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam',38,12.25839475,109.13485589,1,NULL),(40,'Ngã tư Thủ Đức','Thu Duc Intersection, Cầu vượt Ngã tư Thủ Đức, Binh Tho Ward, Thủ Đức, Ho Chi Minh City, 00848, Vietnam',37,10.84912750,106.77403120,1,11),(41,'Bến xe Cam Ranh','Lê Duẩn, Phường Cam Lộc, Cam Ranh, Khánh Hòa Province, Vietnam',38,11.91803368,109.14670324,1,11),(42,'Miền Tây','Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam',37,10.74012710,106.61940059,1,NULL),(43,'Trà Vinh','Bến xe Trà Vinh, Trà Vinh',39,0.00000000,0.00000000,1,NULL),(44,'Trạm xe Thanh Thủy, Bình Phú','National Route 53, Xã Bình Phú, Càng Long District, Trà Vinh Province, Vietnam',39,9.96000815,106.24510484,1,12);
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
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stop_station`
--

LOCK TABLES `stop_station` WRITE;
/*!40000 ALTER TABLE `stop_station` DISABLE KEYS */;
INSERT INTO `stop_station` VALUES (193,61,38,'pick',0,1),(194,61,39,'drop',0,1),(195,62,38,'drop',0,1),(196,62,39,'pick',0,1),(197,61,40,'pick',0,1),(198,62,40,'drop',0,1),(199,62,41,'pick',0,1),(200,61,41,'drop',0,1),(201,63,42,'pick',0,1),(202,63,43,'drop',0,1),(203,64,42,'drop',0,1),(204,64,43,'pick',0,1),(205,64,44,'pick',0,1),(206,63,44,'drop',0,1);
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
  `company_id` int DEFAULT NULL,
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
-- Table structure for table `ticket_save`
--

DROP TABLE IF EXISTS `ticket_save`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_save` (
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
-- Dumping data for table `ticket_save`
--

LOCK TABLES `ticket_save` WRITE;
/*!40000 ALTER TABLE `ticket_save` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_save` ENABLE KEYS */;
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
  `schedule` varchar(250) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (61,38,39,28,_binary '',1,11,300000,5,'BX Phía Nam Nha Trang - QL1A - QL13 - BX Miền Đông',6,450),(62,38,39,28,_binary '\0',1,11,300000,5,'BX Miền Đông - QL13 - QL1A - BX Phía Nam Nha Trang',6,450),(63,42,43,29,_binary '',1,12,120000,6,'BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - QL60 - QL53 - QL54 - BX Trà Vinh',1.8,135),(64,42,43,29,_binary '\0',1,12,120000,6,'BX Trà Vinh - QL54 - QL53 - QL60 - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây',1.8,135);
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
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (89,_binary '',87,'032050000','20110315@student.hcmute.edu.vn','Lê Yên'),(105,_binary '',103,'0334457434','an@gmail.com','Nguyễn Châu An'),(106,_binary '\0',104,'0495134695','ho@gmail.com','Lê Hò'),(107,_binary '',105,'0334467434','kimle020102@gmail.com','Nguyễn Châu Phú');
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

-- Dump completed on 2024-04-27  9:30:31
