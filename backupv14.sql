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
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (89,_binary '',5,'$2a$10$JGvOAL7Lkl.TWBLRcPyDvet8m9xdGW6.yPQjKP4CZOxSvezr07.fm','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NyIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJNQU5BR0VSIn1dLCJ0eXBlIjoiUmVmcmVzaCBUb2tlbiIsImlhdCI6MTcyMDk4MTUyMiwiZXhwIjoxNzIxNTg2MzIyfQ.imPez6lJi4d_i07LTNdHVrpGctNEvcGdVitHnORy_Js','20110315@student.hcmute.edu.vn',NULL),(105,_binary '',1,'$2a$10$Bun8vntLWKvTmXJGE/ea.ufyrlNUoLDS9Wk1WSyyYD82CBQIwTvee',NULL,'an@gmail.com',''),(106,_binary '',2,'$2a$10$ly/5VBz4qdzMoqu1fV190uNN99L87ScEO7mfDWV.ZkG1N5/s41RnC',NULL,'ho@gmail.com',''),(107,_binary '',1,'$2a$10$olK8od0Nrl97ENV/eJUX/uXKYPvzuiOGOzb.U/HwJrRbpm2LTzgy.',NULL,'kimle02012@gmail.com',''),(108,_binary '',1,'$2a$10$CpAihBYYdeyvp6fVNZGkmegRYtShfOaop09Fl8kJb.oYaQWJuRxzS',NULL,'thuan@gmail.com',''),(109,_binary '',1,'$2a$10$dGA9vsvvUxt94fJgKYysy.ixF7/TQdwHr.ioGDjH.4mPJ2OJ17ISS',NULL,'hoang@gmail.com',''),(110,_binary '',1,'$2a$10$9/zCbvP0CuoOWynLGegp3uQD0szCVEcobZ4QIgeWMxbnR.w9AuBrq','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDgiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInR5cGUiOiJSZWZyZXNoIFRva2VuIiwiaWF0IjoxNzE3MzQ0Nzg3LCJleHAiOjE3MTc5NDk1ODd9.sF87H81lRQ4In8X3FFjpWaL6S7ELhxIctvaWnlW2Dc8','hoangn@gmail.com',''),(111,_binary '',1,'$2a$10$CHHrDb4bw8e9PWwRH/TxyO7vc40DSrlbA1u7NvwG7IYuaffE1WsPK',NULL,'donthandochai23@gmail.com',''),(112,_binary '',1,'$2a$10$m02V2DRQtSPtLEE0Piion.a7ga9/NlJEHaTr8Y5.XfjTZQ/Ss9LfG',NULL,'kimle020102@gmail.com',''),(113,_binary '',3,'$2a$10$N72H0wvi2l6zDVTsJftYd.DAigTwkDnNfoIwrxVDZdzLzrmTyOUwO',NULL,'tho@gmail.com',''),(114,_binary '',3,'$2a$10$CzpYWxCKZcV9Zw71E/y4dus3x0LTwyQoBdzfnSwytPHVL8bjKkRH.',NULL,'nam@gmail.com',''),(115,_binary '',3,'$2a$10$v8SA3mi6LqcgNFeSlv7c4eXCknDFep1Xojp0/xKDbnq8v4I3eLO7W',NULL,'chau@gmail.com',''),(116,_binary '',3,'$2a$10$hC34PzPiTJRLx6fGu7ieI.n7fTanApT3rpwfCz17R8ZRPVApsKOiW',NULL,'chi@gmail.com',''),(117,_binary '',4,'$2a$10$VoK3trPiYLrVb7g1AxoXnOLB20AtRL8.8D8u/BjvGDnZesWoBWt5S','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTUiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQ1VTVE9NRVIifV0sInR5cGUiOiJBY2Nlc3MgVG9rZW4iLCJpYXQiOjE3MjA5NzQ4NTMsImV4cCI6MTcyMTU1ODA4OH0.OTgWZKmDbJyXpXYq0WccioRqLTWPQLA3YOBmE_3Qt30','+84842281119','108577443841809503650'),(118,_binary '',3,'$2a$10$yTTswCmxQ1wMw592xlnaDuhoASC8oLOSZiyLXYYYuLomyQQnGScYS',NULL,'ngo@gmail.com',''),(119,_binary '',1,'$2a$10$uPjTXNxtcRe58ek0Z1840uhCSBKLPf/Oj916xbuTDheZL2oFFqkFK',NULL,'hoa@gmail.com',''),(120,_binary '',3,'$2a$10$sTjiTYj3.d7p7bctDvMlLe8rgA8w357yddapBILFCaJZWQahjZRI6',NULL,'kimmin@gma',''),(121,_binary '',3,'$2a$10$6RKQPNkcI14A21DedQlyvue9GM2c9gzfqa4u7D/ua0h4xfVVSoHcm',NULL,'hung.nguyen@gmail.com',''),(122,_binary '',3,'$2a$10$GHofSDyZG2HwXrY65gEp5ObkFaHe7hx/qnJPStqucPiRjDEL47iVu',NULL,'lam.nguyen@gmail.com',''),(123,_binary '',5,'$2a$10$PAJgWgejtk/5TIT7rQNjeORIgcSYqkeiR1Q0LzmSpjk41nGg9mtu2','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjEiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiTUFOQUdFUiJ9XSwidHlwZSI6IkFjY2VzcyBUb2tlbiIsImlhdCI6MTcxNzgwOTM1NywiZXhwIjoxNzE4NDEzODQwfQ.6xx6vgcE9d9BwT6GoJt-vpsFou-hsxGxTCLIw3BcuRs','phunghx@hcmute.edu.vn',''),(124,_binary '',5,'$2a$10$DwAikwTnH5o.LUHewTUCQeRqcUGFK.qDxRsWH5sWZaBKFzDfdhNTm',NULL,'nganguyen@hcmute.edu.vn',''),(125,_binary '',5,'$2a$10$Sz7CjkAGcXTWt1U86hsgou7a.43/kVPT5S0JPwApZCU98G82M7x3i',NULL,'lannguyen@hcmute.edu.vn',''),(126,_binary '',5,'$2a$10$20Aho3FfA.JTIo5yX.HRc.if21bHYThuoVkPXFtVu1kUDKYU5GWX6',NULL,'anhnguyen@hcmute.edu.vn',''),(127,_binary '',5,'$2a$10$yhoHObxWdGKfM1mvSqmdTuzR.gyuzy13.ttQ5g71rSoWg1guNjy5G',NULL,'bangnguyen@hcmute.edu.vn',''),(128,_binary '',1,'$2a$10$/bcu9F/qbVM1fhiD..2TgO56hlYZz/gLG9ivChOX8WFwb6E1TpykS','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjYiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInR5cGUiOiJBY2Nlc3MgVG9rZW4iLCJpYXQiOjE3MjA5ODM3NjEsImV4cCI6MTcyMTU4Njk5Mn0.PfC021oGa8rUK_yJ-KFLIFHv4TOpsY3wr5vPZtt1-_k','hoangluu@gmail.com',''),(129,_binary '',2,'$2a$10$nkRh10Lkfg7pJsJS/Q8esuBWO7a/lEAYux0eDyTjR9GdevAu8ovwO',NULL,'kim@gmail.com',''),(130,_binary '',2,'$2a$10$G1CdT3h.iwcWUkE5ArHYnu7KNCD/IkvFLWHiEfcG6oRLsupgNPXL6',NULL,'nhung@gmai.com',''),(131,_binary '',2,'$2a$10$jPbiHMePf8dsoU79Ehtn9.4y.RIvY3a1UgBDtenWhy/.1StLw9oJi',NULL,'baonguyen123@gmail.com',''),(132,_binary '',2,'$2a$10$6mNX5p6Plr377/GWwKCzsumpLFRj.ZDooT8wJZ32/SXDapcfTddtO',NULL,'kiman123@gmai.com',''),(133,_binary '',3,'$2a$10$a5G2K/J25d8g0xDJ6b6Ut.NQPduRQRz5l6naEjgph5kWA7CQo2Kwe',NULL,'cuongle@gmail.com',''),(134,_binary '',3,'$2a$10$UjOxWhoGCg3.H6fUQNAdJ.YLm71WlFsN60XtliZdnh66YgE/eSQ/.','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMzIiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiRFJJVkVSIn1dLCJ0eXBlIjoiQWNjZXNzIFRva2VuIiwiaWF0IjoxNzIwODk5MDQ2LCJleHAiOjE3MjE0ODM3NjJ9.rYzbwM6kSQchjbIxLbb_nnRzWSJp7GRyRgh0hFJ7te8','hungphi@gmai.com',''),(135,_binary '',3,'$2a$10$6DK3i8ELkWg9Yj45VbuqtOH4eFOG1R1MNxgyuhm1ciVfAtYypub0m',NULL,'khoa@gmail.com',''),(136,_binary '',3,'$2a$10$9QnljojvNz7PQhleJd/AgO3Gl9khTqW3XwNfyJzcdLnne6M/d/qbC',NULL,'dien@gmai.com',''),(137,_binary '',3,'$2a$10$UU4nQEyW5QpIAyvzLluLaOjEBHrgMIWDvRw1.fgfNNXLyqmmpX8AG',NULL,'cuonglele@gmail.com',''),(138,_binary '',3,'$2a$10$VWuIRp28pnKco6jPo2RaBe25QSly.bQ0ZXWmZBU.91Op7TCKNJ5GK',NULL,'hungphiphi@gmai.com',''),(139,_binary '',3,'$2a$10$DQ8XqPh3cWKq1FPLT0gSreyTA1EjBtPM2/6j90o3Z317Sd7myM2YG',NULL,'khoakhoa@gmail.com',''),(140,_binary '',3,'$2a$10$4RQMW8KE3hovXt3u5bquGOhiDO1dE8JlsICWLYqJjvQhedsbw5Kj6',NULL,'diendien@gmai.com',''),(141,_binary '',2,'$2a$10$Oh9gR8Z39rTuMVVFO6ifRuxSWBXusQH83nXnfEfvo7vSxKa/BsqPm',NULL,'qhhh@gmail.com',''),(142,_binary '',3,'$2a$10$gAx6gGswpEXfR.Ze15kuJeUzeSoOk9.tS7FDqbflzt1Gb00lkZYQy',NULL,'lamlam@gmail.com',''),(143,_binary '',3,'$2a$10$z7BIDtfSmhGpY8wW1I9tpOkqDklFlgtqsrKkE6GJ9jn5.DBQtqSHe',NULL,'phanhuy@gmail.com',''),(144,_binary '',3,'$2a$10$7jeUuIZGIy04s3D5mRXynOACd7YfRhNkHdOi1XXPJvrX2VPhoYjOW',NULL,'phanlam@gmail.com','');
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (18,32),(19,34),(20,35),(21,36),(22,37),(23,38),(24,39),(25,40),(26,41);
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
) ENGINE=InnoDB AUTO_INCREMENT=617 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (438,'HE7TFQL'),(439,'C89LJ64'),(440,'RHTJ6TO'),(441,'1JU9RVY'),(442,'I00M178'),(443,'A8BM7Y2'),(450,'LAAZ1L6'),(451,'G1QOE40'),(452,'ZZX73LB'),(453,'27MKLPS'),(454,'9GASQ1C'),(455,'44H45BN'),(456,'P6W27BM'),(457,'ME2FZV1'),(458,'DHOWK84'),(459,'7SEHQVN'),(460,'L4VL0RJ'),(461,'RHHVLO1'),(462,'4J0C6OZ'),(463,'DWLXISV'),(464,'NMRQDBA'),(465,'ETM2EWX'),(466,'LE6C2Y8'),(467,'M5J5AGE'),(468,'757EGYB'),(469,'MC7XG5L'),(470,'2QLQ7LE'),(471,'75RHTWX'),(472,'03E8W7G'),(473,'VYXMD5I'),(474,'3JUIBUX'),(475,'MSLHNCW'),(476,'5KPGJSD'),(477,'8RF198L'),(478,'6TL0PPL'),(479,'8VW9Z11'),(480,'ZENKZAF'),(481,'I30XZKH'),(482,'7QOKPSA'),(483,'XYS22WM'),(484,'7RPOWN9'),(485,'84CQCM3'),(486,'CDFU9KW'),(487,'XZATJOP'),(488,'SY42B8P'),(489,'K6X5QL8'),(490,'FEX8HX7'),(491,'7TOM8JS'),(492,'DT9NI7K'),(493,'XUB16DM'),(494,'A97QXQA'),(495,'DOPTR80'),(496,'U89HJYK'),(497,'W69MM6Z'),(498,'U455O7W'),(499,'K1H6PQR'),(500,'AZBB84H'),(501,'WIC5L95'),(502,'ZTRBIAT'),(503,'HV3RMIW'),(504,'3775IT0'),(505,'9HFKH9B'),(506,'1TB2XRX'),(507,'Y5UMNR9'),(508,'KRB2FH5'),(509,'OV5EBEU'),(510,'2G7MPEW'),(511,'BPAPXM0'),(512,'H9VSMVF'),(513,'ZH1R15A'),(514,'6VP3WNL'),(515,'O3G0HH9'),(516,'PHHF3N3'),(537,'UA6F4QD'),(538,'IBPMZMQ'),(539,'X1V0ZGB'),(540,'D0WMSQQ'),(541,'F588VKS'),(542,'J55ORX3'),(543,'COGYLA4'),(544,'YXB3V7S'),(545,'FQTTDP4'),(546,'T6I7FQ5'),(547,'JTIFAYL'),(548,'GTM3OWT'),(549,'Y5JGMYR'),(550,'XOE2WJ3'),(551,'H9GV73K'),(552,'GII3DPF'),(553,'8T1735D'),(554,'TMTDIMR'),(555,'9NM2OWC'),(556,'Q9R2KPL'),(557,'AD2XBZ2'),(558,'GML9O2S'),(559,'6ZAY8NQ'),(560,'KFA3R09'),(561,'DI3WU7N'),(562,'E32POVB'),(563,'0ILAME7'),(564,'QC6T6QO'),(565,'N39YQ5Q'),(566,'3J4RVX0'),(567,'HY6G60Z'),(568,'TOIMGSY'),(569,'E20DRKS'),(570,'GCLVEKH'),(571,'GUEL3KS'),(572,'3JUX6BY'),(573,'7S7WEQ5'),(574,'ZE4CDIV'),(575,'5H1WA1B'),(576,'FVHHM9W'),(577,'OSVZMFD'),(578,'J48Y07H'),(579,'VF70TUQ'),(580,'HC2E6WS'),(581,'PMLCUVA'),(582,'H1VD37B'),(583,'Y19P76J'),(584,'MQ5OWVH'),(585,'916HEC4'),(586,'CTIX6JA'),(587,'CPA5P00'),(588,'JZB6QBC'),(589,'BSK6SWE'),(590,'GXV8LB1'),(591,'7055GW7'),(592,'FF7IKFW'),(593,'B3K2ZB0'),(594,'EZ50J1R'),(595,'PF2LHYJ'),(596,'UEKJDX6'),(597,'91RHMTV'),(598,'YTCD9ND'),(599,'BUJG1L4'),(600,'FSS6LF7'),(601,'BFI2XZ2'),(602,'HISI4VI'),(603,'MFU7Z4V'),(604,'B1O6C1R'),(605,'R4N8V31'),(606,'N6IOTS7'),(607,'JTH7UJ1'),(608,'0S6IBOV'),(609,'IJ2ILE8'),(610,'N35QWRM'),(611,'53RPYKS'),(612,'IQ6U5U1'),(613,'YSCHC0K'),(614,'1TC7Z9H'),(615,'J336J2Z'),(616,'JRD3FFT');
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
  KEY `FK81p15i3m6sq98wnog6dyuygxc` (`booking_user_id`),
  KEY `FKjjrugfvtfq4dwf7npgj5c80a8` (`conduct_staff_id`),
  KEY `FKerce2395050fsisr39jeuu0at` (`drop_station`),
  KEY `FKklv1yj5xnmnxix57eptr1p038` (`pick_station`),
  KEY `FKkp5ujmgvd2pmsehwpu2vyjkwb` (`trip_id`),
  KEY `FK_transaction_frk_idx` (`transaction_id`),
  CONSTRAINT `FK81p15i3m6sq98wnog6dyuygxc` FOREIGN KEY (`booking_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_transaction_frk` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`),
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
INSERT INTO `booking` VALUES (NULL,NULL,195,_binary '\0',196,2,NULL,62,'06POWF','2024-06-01 21:17:52.600117','anma@gmail.com','Đã hủy','0495134695','Lê','97158089'),(NULL,NULL,194,_binary '',193,5,260,61,'0D8V95','2024-06-30 17:22:12.193412','my@gmail.com','Thành công','0495414695','Mỹ Mỹ','02863826'),(115,NULL,195,_binary '\0',196,5,266,62,'1JRCV3','2024-07-14 23:34:42.008035','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','00574917'),(NULL,NULL,272,_binary '\0',271,3,252,97,'1Y082B','2024-06-22 12:27:53.502748','my@gmail.com','Thành công','0495414695','Mỹ Mỹ','74874705'),(NULL,NULL,194,_binary '\0',193,5,NULL,61,'22B05T','2024-07-14 16:42:32.376478','kimmin@gma','Đã hủy','0495134601','Lê','70488938'),(NULL,NULL,195,_binary '\0',196,2,NULL,62,'34PGUH','2024-06-01 22:23:57.010949','kim@gma','Giữ chỗ','0495134695','Lê','77208699'),(NULL,NULL,195,_binary '\0',196,2,NULL,62,'38UOV4','2024-06-01 21:30:22.941066','kimmin@gma','Giữ chỗ','09090909090','Lê','37557897'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'3K6X8P','2024-06-01 23:34:45.109114','my@gmail.com','Giữ chỗ','0909090901','Mỹ Mỹ','20341578'),(NULL,NULL,194,_binary '\0',193,3,NULL,61,'3OK9P0','2024-07-14 17:24:10.234869','kim@gma','Đã hủy','0495414695','Lê','85023431'),(115,NULL,195,_binary '\0',196,2,245,62,'4A29YT','2024-06-09 22:07:29.185993','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','64820975'),(115,NULL,194,_binary '\0',193,5,266,61,'4EE8DD','2024-07-14 23:34:42.008035','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','00574917'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'4F86CD','2024-06-02 13:29:42.556823','anma@gmail.com','Giữ chỗ','0495134695','Lê','39889485'),(NULL,NULL,195,_binary '\0',196,3,241,62,'4G57IR','2024-06-09 21:21:24.653690','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','33569403'),(NULL,NULL,195,_binary '\0',196,1,229,62,'4I6FL7','2024-06-02 13:50:44.460720','anma@gmail.com','Thành công','0495134695','Lê','62105432'),(NULL,NULL,195,_binary '\0',196,1,NULL,62,'60JNXU','2024-06-01 23:02:27.349771','my@gmail.com','Giữ chỗ','0909090901','Mỹ Mỹ','62546905'),(NULL,NULL,194,_binary '\0',193,5,263,61,'6DVR8I','2024-07-14 17:33:48.569042','kimmin@gma','Thành công','0495414695','Lê','63844608'),(115,NULL,195,_binary '\0',196,2,236,62,'6VPB2F','2024-06-04 05:52:40.470388','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','11275050'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'759HKD','2024-06-02 11:29:13.680530','kimmin@gma','Giữ chỗ','09090909090','Lê','85818951'),(115,NULL,194,_binary '\0',193,1,234,61,'7CTYZZ','2024-06-04 05:49:10.726010','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','61756788'),(115,NULL,194,_binary '\0',193,2,245,61,'7DB9RG','2024-06-09 22:07:29.185993','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','64820975'),(NULL,NULL,194,_binary '\0',193,5,249,61,'7NWVMW','2024-06-17 21:53:15.087661','my@gmail.com','Thành công','0495134645','Mỹ Mỹ','11680610'),(NULL,NULL,194,_binary '\0',193,3,NULL,61,'7V9MKQ','2024-07-14 13:43:12.899092','phanhuy@gmail.com','Giữ chỗ','0909090901','Phan Huy','19874165'),(115,NULL,198,_binary '\0',196,2,NULL,62,'8TE5LG','2024-06-09 21:44:10.968339','20110248@student.hcmute.edu.vn','Giữ chỗ','+84842281119','Le Thi Kim Le','24523149'),(NULL,NULL,194,_binary '\0',193,2,233,61,'99KEFH','2024-06-02 14:18:26.491575','my@gmail.com','Thành công','0495404695','Mỹ Mỹ','07600814'),(NULL,NULL,194,_binary '\0',293,5,257,61,'9ALMYR','2024-04-22 13:03:28.976542','lekima@gmail.com','Thành công','0495414000','Lê','91507033'),(115,NULL,194,_binary '\0',193,2,NULL,61,'9KSRAZ','2024-06-09 23:35:00.241861','20110248@student.hcmute.edu.vn','Đã hủy','+84842281119','Le Thi Kim Le','24092895'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'9TCIJI','2024-06-01 23:09:09.433571','kimmin@gma','Giữ chỗ','0495414695','Lê','67279862'),(115,NULL,195,_binary '\0',196,1,NULL,62,'A18W68','2024-06-09 21:35:02.481435','20110248@student.hcmute.edu.vn','Đã hủy','+84842281119','Le Thi Kim Le','73958310'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'AZWBOR','2024-06-02 14:13:44.691780','anma@gmail.com','Giữ chỗ','0495134695','Lê','17304943'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'BG5352','2024-06-02 12:15:20.936643','kimmin@gma','Giữ chỗ','0495134695','Lê','32904427'),(NULL,NULL,200,_binary '\0',197,5,256,61,'BGHZ1M','2024-04-20 12:57:31.739532','anna@gmail.com','Thành công','0495414695','Kim Jennie','29259492'),(NULL,NULL,195,_binary '\0',196,1,NULL,62,'BPSNIK','2024-06-02 13:29:42.556823','anma@gmail.com','Giữ chỗ','0495134695','Lê','39889485'),(115,NULL,195,_binary '\0',199,5,NULL,62,'C492DZ','2024-07-14 17:35:58.206429','20110248@student.hcmute.edu.vn','Đã hủy','+84842281119','Le Thi Kim Le','12838814'),(NULL,NULL,195,_binary '\0',196,2,239,62,'CAN0QX','2024-06-09 20:54:03.758186','kimmin@gma','Thành công','0495134601','Lê','42613692'),(115,NULL,194,_binary '\0',197,2,NULL,61,'CJD5WX','2024-06-09 21:44:10.968339','20110248@student.hcmute.edu.vn','Giữ chỗ','+84842281119','Le Thi Kim Le','24523149'),(NULL,NULL,195,_binary '\0',196,2,233,62,'CS935J','2024-06-02 14:18:26.491575','my@gmail.com','Thành công','0495404695','Mỹ Mỹ','07600814'),(115,NULL,194,_binary '\0',193,1,NULL,61,'D9O8ZD','2024-06-09 21:35:02.480349','20110248@student.hcmute.edu.vn','Đã hủy','+84842281119','Le Thi Kim Le','73958310'),(NULL,NULL,194,_binary '\0',193,1,230,61,'DCAH25','2024-06-02 13:53:26.886653','kimmin@gma','Thành công','0495414695','Lê','66199265'),(115,NULL,195,_binary '\0',199,5,264,62,'E0SR9T','2024-07-14 18:08:30.489273','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','18437618'),(115,NULL,195,_binary '\0',196,2,NULL,62,'EJB3AU','2024-06-09 23:27:51.473302','20110248@student.hcmute.edu.vn','Giữ chỗ','+84842281119','Le Thi Kim Le','74081009'),(NULL,NULL,194,_binary '\0',193,2,NULL,61,'ESPVKU','2024-07-14 14:45:03.370733','phanhuy@gmail.com','Giữ chỗ','0909090901','Phan Huy','37126026'),(NULL,NULL,195,_binary '\0',196,1,NULL,62,'EVUV6O','2024-06-02 13:41:13.636426','kimmin@gma','Giữ chỗ','0495134695','Lê','79762841'),(NULL,NULL,194,_binary '\0',193,3,253,61,'F31Z37','2024-06-22 12:28:36.614676','my@gmail.com','Thành công','0495414695','Mỹ Mỹ','99891714'),(NULL,NULL,200,_binary '\0',193,3,NULL,61,'FPBFLI','2024-07-14 11:52:42.741468','phanlam@gmail.com','Giữ chỗ','0909090901','Phan Lâm','88549297'),(NULL,NULL,194,_binary '\0',193,2,NULL,61,'G6C3N4','2024-06-01 22:23:57.012108','kim@gma','Giữ chỗ','0495134695','Lê','77208699'),(NULL,NULL,203,_binary '\0',205,2,225,64,'GDNQC5','2024-04-27 09:15:32.723789','anma@gmail.com','Thành công','09090909091','Lê','39614240'),(NULL,NULL,200,_binary '\0',193,3,224,61,'GH1PFJ','2024-04-27 08:53:09.463440','anma@gmail.com','Thành công','09090909091','Lê','63926086'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'GIRBJU','2024-06-02 13:41:13.636426','kimmin@gma','Giữ chỗ','0495134695','Lê','79762841'),(115,NULL,194,_binary '\0',193,2,243,61,'GZVGLH','2024-06-09 21:36:52.953434','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','01543230'),(NULL,32,194,_binary '\0',193,1,251,61,'H5V2UV','2024-06-22 00:52:35.773482','','Thành công','0495414894','Lê Thanh','25570065'),(115,NULL,195,_binary '\0',196,2,238,62,'HE28SP','2024-06-04 22:06:46.071511','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','97546133'),(NULL,40,272,_binary '\0',271,12,255,97,'HK45JJ','2024-06-22 12:49:33.887182','','Thành công','0909090978','Lê Thị Kim Lệ','48902261'),(NULL,NULL,195,_binary '\0',196,1,NULL,62,'IGBMLW','2024-06-02 13:23:58.827375','kimmin@gma','Giữ chỗ','0495134695','Lê','53679782'),(115,NULL,195,_binary '\0',196,2,237,62,'II2O64','2024-06-04 05:53:32.881389','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','20844682'),(115,NULL,200,_binary '\0',193,1,244,61,'IL8KI2','2024-06-09 22:00:10.633391','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','08178407'),(115,NULL,200,_binary '\0',193,5,264,61,'INMQZL','2024-07-14 18:08:30.489273','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','18437618'),(NULL,NULL,194,_binary '\0',193,2,240,61,'IS2W08','2024-06-09 21:19:41.502176','kimmin@gma','Thành công','0495134601','Lê','10039138'),(NULL,NULL,194,_binary '\0',193,2,239,61,'JKS99H','2024-06-09 20:54:03.758186','kimmin@gma','Thành công','0495134601','Lê','42613692'),(NULL,NULL,195,_binary '\0',196,1,NULL,62,'JTK1ZI','2024-06-01 23:34:45.109114','my@gmail.com','Giữ chỗ','0909090901','Mỹ Mỹ','20341578'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'K4QE3R','2024-06-02 00:44:00.085966','anma@gmail.com','Đã hủy','09090909090','Lê','18822441'),(NULL,NULL,195,_binary '\0',196,2,240,62,'KI0D3Z','2024-06-09 21:19:41.502176','kimmin@gma','Thành công','0495134601','Lê','10039138'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'KJK668','2024-06-02 00:46:40.408659','kim@gma','Giữ chỗ','0495134695','Lê','68530891'),(115,NULL,194,_binary '\0',193,1,246,61,'KPX0LS','2024-06-09 22:09:37.776474','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','18426944'),(NULL,NULL,194,_binary '\0',193,2,NULL,61,'KQBBXF','2024-06-01 21:13:29.570889','anma@gmail.com','Đã hủy','09090909090','Lê','83846522'),(115,NULL,194,_binary '\0',197,1,NULL,61,'KT6ZGZ','2024-06-09 21:33:43.559573','20110248@student.hcmute.edu.vn','Đã hủy','+84842281119','Le Thi Kim Le','80295959'),(115,NULL,194,_binary '\0',193,4,NULL,61,'LGR9L7','2024-07-13 20:59:14.804693','20110248@student.hcmute.edu.vn','Đã hủy','+84842281119','Le Thi Kim Le','54263454'),(NULL,NULL,194,_binary '\0',193,2,NULL,61,'LRA6AM','2024-06-01 21:17:52.599119','anma@gmail.com','Đã hủy','0495134695','Lê','97158089'),(NULL,NULL,195,_binary '\0',196,1,230,62,'MVDZCT','2024-06-02 13:53:26.886653','kimmin@gma','Thành công','0495414695','Lê','66199265'),(NULL,NULL,194,_binary '\0',193,1,231,61,'MW1JFG','2024-06-02 13:59:57.271013','kimmin@gma','Thành công','0495134695','Lê','28073610'),(NULL,NULL,195,_binary '\0',196,1,NULL,62,'ND962V','2024-06-02 14:13:44.691780','anma@gmail.com','Giữ chỗ','0495134695','Lê','17304943'),(NULL,NULL,194,_binary '\0',193,1,232,61,'O9397I','2024-06-02 14:16:28.679840','kimmin@gma','Thành công','0495414695','Lê','84777505'),(115,NULL,195,_binary '\0',196,2,NULL,62,'OAHDNK','2024-06-09 23:35:00.241861','20110248@student.hcmute.edu.vn','Đã hủy','+84842281119','Le Thi Kim Le','24092895'),(115,NULL,194,_binary '\0',193,3,261,61,'ODJVRS','2024-07-13 21:47:14.093774','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','23140020'),(NULL,NULL,195,_binary '\0',196,1,NULL,62,'OJWQX4','2024-06-01 23:09:09.433571','kimmin@gma','Giữ chỗ','0495414695','Lê','67279862'),(115,NULL,200,_binary '\0',193,5,NULL,61,'OR9VSH','2024-07-14 17:35:58.206429','20110248@student.hcmute.edu.vn','Đã hủy','+84842281119','Le Thi Kim Le','12838814'),(NULL,NULL,194,_binary '\0',193,2,262,61,'PH9BYM','2024-07-14 17:24:52.489180','kimmin@gma','Thành công','0495414695','Lê','67469367'),(115,NULL,194,_binary '\0',193,2,248,61,'PQN1Y3','2024-06-09 23:27:51.473302','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','74081009'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'PZBCXL','2024-06-01 23:02:27.349771','my@gmail.com','Giữ chỗ','0909090901','Mỹ Mỹ','62546905'),(NULL,NULL,195,_binary '\0',196,3,235,62,'Q06XNW','2024-06-04 05:50:48.934356','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','80736486'),(115,NULL,194,_binary '\0',193,2,238,61,'QIALUF','2024-06-04 22:06:46.071511','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','97546133'),(NULL,NULL,195,_binary '\0',196,1,242,62,'QKUJ99','2024-06-09 21:24:38.588518','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','57881279'),(115,NULL,194,_binary '\0',193,1,259,61,'R3JN92','2024-06-28 05:16:23.882227','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','81094059'),(NULL,NULL,195,_binary '\0',196,2,NULL,62,'R5I1UZ','2024-06-01 21:13:29.570889','anma@gmail.com','Đã hủy','09090909090','Lê','83846522'),(NULL,NULL,194,_binary '\0',193,3,265,61,'R6I55A','2024-07-14 16:54:59.203597','kimmin@gma','Thành công','09090909090','Lê','80544246'),(NULL,NULL,194,_binary '\0',193,1,229,61,'RHH570','2024-06-02 13:50:44.459722','anma@gmail.com','Thành công','0495134695','Lê','62105432'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'RQVRYF','2024-06-02 12:27:35.056757','my@gmail.com','Đã hủy','0909090901','Mỹ Mỹ','23267969'),(NULL,NULL,272,_binary '\0',271,5,258,97,'RZ9DVW','2024-04-22 13:16:06.281287','anma@gmail.com','Thành công','0495414695','Lê','64652612'),(115,NULL,195,_binary '\0',196,2,243,62,'S912VK','2024-06-09 21:36:52.953434','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','01543230'),(NULL,NULL,194,_binary '\0',193,3,235,61,'SB6SLY','2024-06-04 05:50:48.934356','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','80736486'),(115,NULL,195,_binary '\0',196,1,244,62,'SRZ83I','2024-06-09 22:00:10.633391','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','08178407'),(NULL,NULL,195,_binary '\0',196,1,232,62,'T58KOS','2024-06-02 14:16:28.680840','kimmin@gma','Thành công','0495414695','Lê','84777505'),(NULL,NULL,194,_binary '\0',193,1,NULL,61,'TRVUEE','2024-06-02 11:25:54.883353','kimmin@gma','Giữ chỗ','0495134645','Lê','36079794'),(NULL,NULL,195,_binary '\0',196,1,231,62,'UCXWMK','2024-06-02 13:59:57.271013','kimmin@gma','Thành công','0495134695','Lê','28073610'),(NULL,32,194,_binary '\0',193,7,254,61,'UNW1T7','2024-06-22 12:48:08.133172','','Thành công','0495414894','Lê Thanh','32336580'),(NULL,NULL,194,_binary '\0',193,2,NULL,61,'VMBTXW','2024-06-01 21:30:22.941066','kimmin@gma','Đã hủy','09090909090','Lê','37557897'),(115,NULL,194,_binary '\0',193,4,NULL,61,'VROWT3','2024-07-13 21:36:50.787074','20110248@student.hcmute.edu.vn','Giữ chỗ','+84842281119','Le Thi Kim Le','79575573'),(NULL,32,194,_binary '\0',193,20,NULL,61,'WKBI8D','2024-06-19 06:13:29.344323','','Thành công','0495414444','Lê Thanh','89787938'),(115,NULL,198,_binary '\0',196,1,NULL,62,'WKWB9N','2024-06-09 21:33:43.559573','20110248@student.hcmute.edu.vn','Đã hủy','+84842281119','Le Thi Kim Le','80295959'),(115,NULL,194,_binary '\0',193,1,247,61,'WQUWFY','2024-06-09 23:00:38.427810','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','97554348'),(NULL,NULL,194,_binary '\0',193,2,NULL,61,'XP2BV7','2024-07-14 13:53:46.276970','kimmin@gma','Giữ chỗ','09090909090','Lê','88118611'),(115,NULL,195,_binary '\0',196,1,246,62,'YAVQQV','2024-06-09 22:09:37.776474','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','18426944'),(NULL,NULL,194,_binary '\0',193,1,242,61,'YCJUVD','2024-06-09 21:24:38.588518','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','57881279'),(NULL,NULL,194,_binary '\0',193,3,241,61,'YDS828','2024-06-09 21:21:24.653690','20110248@student.hcmute.edu.vn','Thành công','+84842281119','Le Thi Kim Le','33569403'),(NULL,NULL,194,_binary '\0',193,3,NULL,61,'YPOBH3','2024-07-14 15:06:03.214214','phanhuy@gmail.com','Giữ chỗ','0495134645','Phan Huy','64367675'),(NULL,NULL,194,_binary '\0',193,1,226,61,'ZVR3N2','2024-06-02 13:24:14.161569','kimmin@gma','Thành công','0495134695','Lê','40265057');
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus`
--

LOCK TABLES `bus` WRITE;
/*!40000 ALTER TABLE `bus` DISABLE KEYS */;
INSERT INTO `bus` VALUES (26,5,'79C-097.79',2022,'Cam','Sẵn sàng',26,11),(27,5,'67C-097.00',2022,'Cam','Sẵn sàng',27,11),(28,5,'67C-097.03',2022,'Cam','Sẵn sàng',28,11),(29,5,'79C-097.89',2022,'Cam','Sẵn sàng',29,11),(30,7,'67C-097.99',2022,'Cam','Sẵn sàng',30,11),(31,7,'79C.587.31',2022,'Cam','Sẵn sàng',31,11),(32,5,'80A.456.67',2024,'Vàng','Sẵn sàng',32,11),(33,9,'79C.587.90',2023,'Cam','Sẵn sàng',33,18),(34,9,'80A.456.90',2024,'Vàng','Sẵn sàng',34,18),(35,9,'69C.587.90',2023,'Cam','Sẵn sàng',35,18),(36,9,'60A.456.90',2024,'Vàng','Sẵn sàng',36,18),(37,5,'67C-097.05',2023,'Cam','Sẵn sàng',37,11),(38,5,'67C-097.06',2023,'Cam','Sẵn sàng',38,11);
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
  `policy` varchar(9999) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_company`
--

LOCK TABLES `bus_company` WRITE;
/*!40000 ALTER TABLE `bus_company` DISABLE KEYS */;
INSERT INTO `bus_company` VALUES (11,'Xe Châu An','2024-04-27','98942334243',1,18,'<p></p><p><strong>An toàn Covid-19</strong></p><ul><li>Yêu cầu đeo khẩu trang khi lên xe</li></ul><p><strong>Yêu cầu khi lên xe</strong></p><ul><li>Có mặt tại văn phòng/quầy vé/bến xe trước 30 phút để làm thủ tục lên xe</li><li>Đổi vé giấy trước khi lên xe</li><li>Xuất trình SMS/Email đặt vé trước khi lên xe</li><li>Không mang đồ ăn, thức ăn có mùi lên xe</li><li>Không hút thuốc, uống rượu, sử dụng chất kích thích trên xe</li><li>Không mang các vật dễ cháy nổ lên xe</li><li>Không vứt rác trên xe</li><li>Không làm ồn, gây mất trật tự trên xe</li><li>Không mang giày, dép trên xe</li></ul><p><strong>Hành lý xách tay</strong></p><ul><li>Tổng trọng lượng hành lý không vượt quá 20 kg</li><li>Không vận chuyển hàng hóa cồng kềnh</li><li>Không hoàn tiền trong trường hợp huỷ đơn hàng do vi phạm các quy định về hành lý</li></ul><p><strong>Trẻ em và phụ nữ có thai</strong></p><ul><li>Trẻ em từ 10 tuổi hoặc cao từ 100 cm trở lên mua vé như người lớn</li><li>Phụ nữ có thai cần đảm bảo sức khỏe trong suốt quá trình di chuyển</li><li>Nhà xe có quyền từ chối phục vụ nếu hành khách không tuân thủ quy định về trẻ em và phụ nữ có thai</li></ul><p><strong>Động vật cảnh/Thú cưng</strong></p><ul><li>Hành khách có động vật đi cùng vui lòng báo trước khi khởi hành và có mặt trước giờ khởi hành ít nhất 90 phút</li><li>Động vật cảnh phải đảm bảo có sức khỏe tốt, thân thiện với con người, đã được tiêm phòng đầy đủ, không có mùi khó chịu, không gây ảnh hưởng đến hành khách và tài sản của họ</li><li>Thú cưng cần phải được đeo rọ mõm, nhốt trong lồng, túi, balo phi hành gia để đảm bảo cho việc vận chuyển an toàn, phòng tránh việc thú cưng chạy ra ngoài</li><li>Hãng xe chỉ chấp nhận vận chuyển động vật như là một hành lý ký gửi; không cho phép mang lên xe cùng hành khách</li><li>Nhiệt độ thời tiết trong quá trình vận chuyển đôi khi ảnh hưởng đến sức khỏe của động vật cảnh, nhà xe không chịu trách nhiệm về sức khỏe động vật trong suốt chuyến đi</li></ul><p><strong>Xuất hóa đơn GTGT</strong></p><ul><li>Nhà xe có cung cấp hóa đơn GTGT cho dịch vụ xe khách, phí xuất hóa đơn là 10 % trên giá dịch vụ quý khách đã mua</li><li>Quý khách vui lòng cung cấp đầy đủ, chính xác thông tin hóa đơn </li></ul>'),(12,'Xe Châu Phú','2024-04-27','98982234243',1,19,NULL),(13,'Xe Châu Thuận','2024-04-28','98988334443',1,20,NULL),(14,'Xe Liên Hoàng','2024-04-29','98988774443',1,21,NULL),(15,'Xe Liên Hưng','2024-04-29','98988774443',0,22,NULL),(16,'Xe Thành Liên','2024-05-05','9865HIJUIJ',1,23,NULL),(17,'Xe Phú Mỹ','2024-05-05','98C423945',1,24,NULL),(18,'Xe Hòa Hảo','2024-05-23','98C423111',1,25,'<p><strong>Yêu cầu khi lên xe</strong></p><p><em>--- Đang cập nhật ---</em></p><p><strong>Hành lý xách tay</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Trẻ em và phụ nữ có thai</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Động vật cảnh/Thú cưng</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Xuất hóa đơn GTGT</strong></p><p><em>--- Đang cập nhật ---</em> </p>'),(19,'Xe Hoàng Lưu','2024-06-16','98942334123',1,26,'<p><strong>Yêu cầu khi lên xe</strong></p><p><em>--- Đang cập nhật ---</em></p><p><strong>Hành lý xách tay</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Trẻ em và phụ nữ có thai</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Động vật cảnh/Thú cưng</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Xuất hóa đơn GTGT</strong></p><p><em>--- Đang cập nhật ---</em> </p>');
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_quality`
--

LOCK TABLES `bus_quality` WRITE;
/*!40000 ALTER TABLE `bus_quality` DISABLE KEYS */;
INSERT INTO `bus_quality` VALUES (26,'2024-05-14','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(27,'2024-06-30','Tốt','Tốt','Tốt','Tốt quá','Tốt','Tốt','Tốt','Tốt','Bình thường'),(28,'2024-05-14','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(29,'2024-06-30','Tốt','Tốt','Tốt','Tốt quá luôn, Xe mới lắm','Tốt','Tốt','Tốt','Tốt','Bình thường'),(30,'2024-06-08','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(31,'2024-06-22','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(32,'2024-06-22','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(33,'2024-06-22','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(34,'2024-06-22','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(35,'2024-06-22','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(36,'2024-06-22','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(37,'2024-07-13','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường'),(38,'2024-07-13','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Tốt','Bình thường');
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
  `wifi` tinyint(1) DEFAULT NULL,
  `water` tinyint(1) DEFAULT NULL,
  `cool_tissue` tinyint(1) DEFAULT NULL,
  `phone_charge` tinyint(1) DEFAULT NULL,
  `blanket` tinyint(1) DEFAULT NULL,
  `pillow` tinyint(1) DEFAULT NULL,
  `breaking_hammer` tinyint(1) DEFAULT NULL,
  `conditioner` tinyint(1) DEFAULT NULL,
  `toilet` tinyint(1) DEFAULT NULL,
  `reading_light` tinyint(1) DEFAULT NULL,
  `curtain` tinyint(1) DEFAULT NULL,
  `tivi_led` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_lk5jd2xt4w731pppyfgrwx36x` (`seatmap_id`),
  KEY `cpnid5_idx` (`company_id`),
  CONSTRAINT `cpnid5` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `FKeidjcxjck2oefj001gdfa1p6w` FOREIGN KEY (`seatmap_id`) REFERENCES `seat_map` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_type`
--

LOCK TABLES `bus_type` WRITE;
/*!40000 ALTER TABLE `bus_type` DISABLE KEYS */;
INSERT INTO `bus_type` VALUES (5,'limousine_40',40,20000,5,'limousine 40 chỗ',11,1,'/api/images/1715964799709-bus1.jpeg',1,1,1,1,1,1,1,1,0,1,1,0),(6,'limousine_33',33,0,6,'limousine 33 chỗ',12,1,NULL,0,1,1,0,1,1,0,1,0,1,1,0),(7,'bus_20',20,50000,7,'Xe khách 20 chỗ',11,0,NULL,1,1,1,1,0,1,0,1,1,1,1,0),(8,'normal_1',30,20000,10,'Xe giường nằm thường',11,1,'/api/static/images/1718271796692-nhung.jpg',0,1,1,0,0,1,0,1,1,0,1,1),(9,'VIPPRO_40',36,50000,11,'Xe giường nằm 40 chỗ',18,1,'/api/static/images/1718513181194-bus.jpeg',0,1,1,0,1,1,0,1,1,0,1,0);
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
INSERT INTO `customer` VALUES (26,115,'/api/static/images/1716128497598-Picture11.png');
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
  `driver_license` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`driver_id`),
  UNIQUE KEY `UK_83rhth06evmv49g4liabxacc2` (`id_card`),
  UNIQUE KEY `UK_9yq25nknyh5y5gihylet1ypy9` (`license_number`),
  UNIQUE KEY `UK_g3oju5uudgl1cct873m6f2bfy` (`user_id`),
  KEY `cpniddriver_idx` (`company_id`),
  CONSTRAINT `cpniddriver` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `FKkux9gqt7e9mh4rd4oo4i5ov0f` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES (32,111,'2024-05-14 07:00:00.000000','2024-05-14 07:00:00.000000','098673530411','6886T03970','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'D'),(33,112,'2024-05-14 07:00:00.000000','2024-05-14 07:00:00.000000','098673530412','6886T03972','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'E'),(34,113,'2024-05-14 07:00:00.000000','2024-05-14 07:00:00.000000','098673530415','6886T03975','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'D'),(35,114,'2024-05-14 07:00:00.000000','2024-05-14 07:00:00.000000','098673530424','6886T03981','Gò Vấp, Hồ Chí Minh','http://localhost:5000/api/images/1715962583271-LeThiKimLe.jpg',11,'E'),(36,116,'2024-05-16 07:00:00.000000','2024-05-16 07:00:00.000000','098673530435','6886T03935','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'E'),(37,118,'2024-06-06 07:00:00.000000','2024-05-26 07:00:00.000000','056897380009','6886T03900','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'D'),(38,119,'2024-06-06 07:00:00.000000','2024-05-26 07:00:00.000000','056897381111','6886T03911','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'E'),(39,120,'2024-06-07 07:00:00.000000','2024-06-07 07:00:00.000000','056897382222','6886T03922','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'D'),(40,131,'2022-10-10 00:00:00.000000','2022-04-12 00:00:00.000000','225123227','473U43F','Cam Ranh, Khánh Hòa','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'D'),(41,132,'2022-10-24 00:00:00.000000','2022-04-13 00:00:00.000000','049123020','473U43D','Cam Phúc Bắc, Cam Phước','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'E'),(42,133,'2022-10-10 00:00:00.000000','2022-04-12 00:00:00.000000','225120007','473U2TF','Cam Ranh, Khánh Hòa','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'D'),(43,134,'2022-10-24 00:00:00.000000','2022-04-13 00:00:00.000000','049345020','473U5YD','Hồ Chí Minh','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'E'),(44,135,'2022-10-10 00:00:00.000000','2022-04-12 00:00:00.000000','225123228','153U43F','Cam Ranh, Khánh Hòa','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',18,'D'),(45,136,'2022-10-24 00:00:00.000000','2022-04-13 00:00:00.000000','049123229','153U43D','Cam Phúc Bắc, Cam Phước','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',18,'E'),(46,137,'2022-10-10 00:00:00.000000','2022-04-12 00:00:00.000000','225120333','460U2TF','Cam Ranh, Khánh Hòa','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',18,'D'),(47,138,'2022-10-24 00:00:00.000000','2022-04-13 00:00:00.000000','049345021','47306YD','Hồ Chí Minh','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',18,'E'),(48,140,'2024-06-30 07:00:00.000000','2024-06-30 07:00:00.000000','022123532228','6886T34987','Gò Vấp, Hồ Chí Minh','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'D'),(49,141,'2024-07-13 07:00:00.000000','2024-07-13 07:00:00.000000','098123531215','6886T03984','Gò Vấp, Hồ Chí Minh','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'E'),(50,142,'2024-07-13 07:00:00.000000','2024-07-13 07:00:00.000000','098123532321','6886T03994','Gò Vấp, Hồ Chí Minh','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg',11,'E');
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
) ENGINE=InnoDB AUTO_INCREMENT=455 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fixed_schedule`
--

LOCK TABLES `fixed_schedule` WRITE;
/*!40000 ALTER TABLE `fixed_schedule` DISABLE KEYS */;
INSERT INTO `fixed_schedule` VALUES (33,61,'07:00:00',2),(34,61,'07:00:00',3),(35,61,'07:00:00',4),(36,61,'07:00:00',5),(37,61,'07:00:00',6),(38,61,'07:00:00',7),(39,61,'07:00:00',8),(40,62,'21:00:00',2),(41,62,'21:00:00',3),(42,62,'21:00:00',4),(43,62,'21:00:00',5),(44,62,'21:00:00',6),(45,62,'21:00:00',7),(46,62,'21:00:00',8),(47,63,'13:00:00',2),(48,63,'15:00:00',2),(49,63,'13:00:00',3),(50,63,'15:00:00',3),(51,63,'13:00:00',4),(52,63,'15:00:00',4),(53,63,'13:00:00',5),(54,63,'15:00:00',5),(55,63,'13:00:00',6),(56,63,'15:00:00',6),(57,63,'13:00:00',7),(58,63,'15:00:00',7),(59,63,'13:00:00',8),(60,63,'15:00:00',8),(61,64,'07:00:00',2),(62,64,'09:00:00',2),(63,64,'07:00:00',3),(64,64,'09:00:00',3),(65,64,'07:00:00',4),(66,64,'09:00:00',4),(67,64,'07:00:00',5),(68,64,'09:00:00',5),(69,64,'07:00:00',6),(70,64,'09:00:00',6),(71,64,'07:00:00',7),(72,64,'09:00:00',7),(73,64,'07:00:00',8),(74,64,'09:00:00',8),(75,65,'08:00:00',2),(76,65,'09:00:00',2),(77,65,'08:00:00',3),(78,65,'09:00:00',3),(79,65,'08:00:00',4),(80,65,'09:00:00',4),(81,65,'08:00:00',5),(82,65,'09:00:00',5),(83,65,'08:00:00',6),(84,65,'09:00:00',6),(85,65,'08:00:00',7),(86,65,'09:00:00',7),(87,65,'08:00:00',8),(88,65,'09:00:00',8),(89,66,'10:00:00',2),(90,66,'12:00:00',2),(91,66,'10:00:00',3),(92,66,'12:00:00',3),(93,66,'10:00:00',4),(94,66,'12:00:00',4),(95,66,'10:00:00',5),(96,66,'12:00:00',5),(97,66,'10:00:00',6),(98,66,'12:00:00',6),(99,66,'10:00:00',7),(100,66,'12:00:00',7),(101,66,'10:00:00',8),(102,66,'12:00:00',8),(103,67,'07:00:00',2),(104,67,'15:00:00',2),(105,67,'07:00:00',3),(106,67,'15:00:00',3),(107,67,'07:00:00',4),(108,67,'15:00:00',4),(109,67,'07:00:00',5),(110,67,'15:00:00',5),(111,67,'07:00:00',6),(112,67,'15:00:00',6),(113,67,'07:00:00',7),(114,67,'15:00:00',7),(115,67,'07:00:00',8),(116,67,'15:00:00',8),(117,68,'20:00:00',2),(118,68,'20:00:00',3),(119,68,'20:00:00',4),(120,68,'20:00:00',5),(121,68,'20:00:00',6),(122,68,'20:00:00',7),(123,68,'20:00:00',8),(124,69,'07:00:00',2),(125,69,'16:00:00',2),(126,69,'07:00:00',3),(127,69,'16:00:00',3),(128,69,'07:00:00',4),(129,69,'16:00:00',4),(130,69,'07:00:00',5),(131,69,'16:00:00',5),(132,69,'07:00:00',6),(133,69,'16:00:00',6),(134,69,'07:00:00',7),(135,69,'16:00:00',7),(136,69,'07:00:00',8),(137,69,'16:00:00',8),(138,70,'18:00:00',2),(139,70,'18:00:00',3),(140,70,'18:00:00',4),(141,70,'18:00:00',5),(142,70,'18:00:00',6),(143,70,'18:00:00',7),(144,70,'18:00:00',8),(145,71,'07:00:00',2),(146,71,'07:00:00',3),(147,71,'07:00:00',4),(148,71,'07:00:00',5),(149,71,'07:00:00',6),(150,71,'07:00:00',7),(151,71,'07:00:00',8),(152,72,'08:00:00',2),(153,72,'08:00:00',3),(154,72,'08:00:00',4),(155,72,'08:00:00',5),(156,72,'08:00:00',6),(159,72,'08:00:00',7),(160,71,'09:00:00',8),(161,73,'07:00:00',2),(162,73,'07:00:00',3),(163,73,'07:00:00',4),(164,73,'07:00:00',5),(165,73,'07:00:00',6),(166,73,'07:00:00',7),(167,73,'07:00:00',8),(168,74,'07:00:00',2),(169,74,'07:00:00',3),(170,74,'07:00:00',4),(171,74,'07:00:00',5),(172,74,'07:00:00',6),(173,74,'07:00:00',7),(174,74,'07:00:00',8),(175,75,'10:00:00',2),(176,75,'10:00:00',3),(177,75,'10:00:00',4),(178,75,'10:00:00',5),(179,75,'10:00:00',6),(180,75,'10:00:00',7),(181,75,'10:00:00',8),(182,76,'22:00:00',2),(183,76,'22:00:00',3),(184,76,'22:00:00',4),(185,76,'22:00:00',5),(186,76,'22:00:00',6),(187,76,'22:00:00',7),(188,76,'22:00:00',8),(189,77,'07:00:00',2),(190,77,'07:00:00',3),(191,77,'07:00:00',4),(192,77,'07:00:00',5),(193,77,'07:00:00',6),(194,77,'07:00:00',7),(195,77,'07:00:00',8),(196,78,'07:00:00',2),(197,78,'07:00:00',3),(198,78,'07:00:00',4),(199,78,'07:00:00',5),(200,78,'07:00:00',6),(201,78,'07:00:00',7),(202,78,'07:00:00',8),(203,79,'07:00:00',2),(204,79,'07:00:00',3),(205,79,'07:00:00',4),(206,79,'07:00:00',5),(207,79,'07:00:00',6),(208,79,'07:00:00',7),(209,79,'07:00:00',8),(210,80,'07:00:00',2),(211,80,'07:00:00',3),(212,80,'07:00:00',4),(213,80,'07:00:00',5),(214,80,'07:00:00',6),(215,80,'07:00:00',7),(216,80,'07:00:00',8),(217,81,'07:00:00',2),(218,81,'07:00:00',3),(219,81,'07:00:00',4),(220,81,'07:00:00',5),(221,81,'07:00:00',6),(222,81,'07:00:00',7),(223,81,'07:00:00',8),(224,82,'07:00:00',2),(225,82,'07:00:00',3),(226,82,'07:00:00',4),(227,82,'07:00:00',5),(228,82,'07:00:00',6),(229,82,'07:00:00',7),(230,82,'07:00:00',8),(231,83,'07:00:00',2),(232,83,'07:00:00',3),(233,83,'07:00:00',4),(234,83,'07:00:00',5),(235,83,'07:00:00',6),(236,83,'07:00:00',7),(237,83,'07:00:00',8),(238,84,'07:00:00',2),(239,84,'07:00:00',3),(240,84,'07:00:00',4),(241,84,'07:00:00',5),(242,84,'07:00:00',6),(243,84,'07:00:00',7),(244,84,'07:00:00',8),(245,85,'07:00:00',2),(246,85,'07:00:00',3),(247,85,'07:00:00',4),(248,85,'07:00:00',5),(249,85,'07:00:00',6),(250,85,'07:00:00',7),(251,85,'07:00:00',8),(252,86,'07:00:00',2),(253,86,'07:00:00',3),(254,86,'07:00:00',4),(255,86,'07:00:00',5),(256,86,'07:00:00',6),(257,86,'07:00:00',7),(258,86,'07:00:00',8),(259,87,'07:00:00',2),(260,87,'07:00:00',3),(261,87,'07:00:00',4),(262,87,'07:00:00',5),(263,87,'07:00:00',6),(264,87,'07:00:00',7),(265,87,'07:00:00',8),(266,88,'07:00:00',2),(267,88,'07:00:00',3),(268,88,'07:00:00',4),(269,88,'07:00:00',5),(270,88,'07:00:00',6),(271,88,'07:00:00',7),(272,88,'07:00:00',8),(273,89,'07:00:00',2),(274,89,'09:00:00',2),(275,89,'07:00:00',3),(276,89,'09:00:00',3),(277,89,'07:00:00',4),(278,89,'09:00:00',4),(279,89,'07:00:00',5),(280,89,'09:00:00',5),(281,89,'07:00:00',6),(282,89,'09:00:00',6),(283,89,'07:00:00',7),(284,89,'09:00:00',7),(285,89,'07:00:00',8),(286,89,'09:00:00',8),(287,90,'10:00:00',2),(288,90,'13:00:00',2),(289,90,'10:00:00',3),(290,90,'13:00:00',3),(291,90,'10:00:00',4),(292,90,'13:00:00',4),(293,90,'10:00:00',5),(294,90,'13:00:00',5),(295,90,'10:00:00',6),(296,90,'13:00:00',6),(297,90,'10:00:00',7),(298,90,'13:00:00',7),(299,90,'10:00:00',8),(300,90,'13:00:00',8),(301,91,'07:00:00',2),(302,91,'07:00:00',3),(303,91,'07:00:00',4),(304,91,'07:00:00',5),(305,91,'07:00:00',6),(306,91,'07:00:00',7),(307,91,'07:00:00',8),(308,92,'07:00:00',2),(309,92,'07:00:00',3),(310,92,'07:00:00',4),(311,92,'07:00:00',5),(312,92,'07:00:00',6),(313,92,'07:00:00',7),(314,92,'07:00:00',8),(315,93,'07:00:00',2),(316,93,'07:00:00',3),(317,93,'07:00:00',4),(318,93,'07:00:00',5),(319,93,'07:00:00',6),(320,93,'07:00:00',7),(321,93,'07:00:00',8),(322,94,'08:00:00',2),(323,94,'08:00:00',3),(324,94,'08:00:00',4),(325,94,'08:00:00',5),(326,94,'08:00:00',6),(327,94,'08:00:00',7),(328,94,'08:00:00',8),(329,95,'07:00:00',2),(330,95,'07:00:00',3),(331,95,'07:00:00',4),(332,95,'07:00:00',5),(333,95,'07:00:00',6),(334,95,'07:00:00',7),(335,95,'07:00:00',8),(336,96,'07:00:00',2),(337,96,'07:00:00',3),(338,96,'07:00:00',4),(339,96,'07:00:00',5),(340,96,'07:00:00',6),(341,96,'07:00:00',7),(342,96,'07:00:00',8),(343,97,'21:00:00',2),(344,97,'23:00:00',2),(345,97,'21:00:00',3),(346,97,'23:00:00',3),(347,97,'21:00:00',4),(348,97,'23:00:00',4),(349,97,'21:00:00',5),(350,97,'23:00:00',5),(351,97,'21:00:00',6),(352,97,'23:00:00',6),(353,97,'21:00:00',7),(354,97,'23:00:00',7),(355,97,'21:00:00',8),(356,97,'23:00:00',8),(357,98,'07:00:00',2),(358,98,'08:00:00',2),(359,98,'07:00:00',3),(360,98,'08:00:00',3),(361,98,'07:00:00',4),(362,98,'08:00:00',4),(363,98,'07:00:00',5),(364,98,'08:00:00',5),(365,98,'07:00:00',6),(366,98,'08:00:00',6),(367,98,'07:00:00',7),(368,98,'08:00:00',7),(369,98,'07:00:00',8),(370,98,'08:00:00',8),(371,99,'08:00:00',2),(372,99,'09:00:00',2),(373,99,'08:00:00',3),(374,99,'09:00:00',3),(375,99,'08:00:00',4),(376,99,'09:00:00',4),(377,99,'08:00:00',5),(378,99,'09:00:00',5),(379,99,'08:00:00',6),(380,99,'09:00:00',6),(381,99,'08:00:00',7),(382,99,'09:00:00',7),(383,99,'08:00:00',8),(384,99,'09:00:00',8),(385,100,'10:00:00',2),(386,100,'12:00:00',2),(387,100,'10:00:00',3),(388,100,'12:00:00',3),(389,100,'10:00:00',4),(390,100,'12:00:00',4),(391,100,'10:00:00',5),(392,100,'12:00:00',5),(393,100,'10:00:00',6),(394,100,'12:00:00',6),(395,100,'10:00:00',7),(396,100,'12:00:00',7),(397,100,'10:00:00',8),(398,100,'12:00:00',8),(399,101,'07:00:00',2),(400,101,'07:00:00',3),(401,101,'07:00:00',4),(402,101,'07:00:00',5),(403,101,'07:00:00',6),(404,101,'07:00:00',7),(405,101,'07:00:00',8),(406,102,'10:00:00',2),(407,102,'10:00:00',3),(408,102,'10:00:00',4),(409,102,'10:00:00',5),(410,102,'10:00:00',6),(411,102,'10:00:00',7),(412,102,'10:00:00',8),(415,103,'21:00:00',3),(416,103,'23:00:00',3),(417,103,'21:00:00',4),(418,103,'23:00:00',4),(421,103,'21:00:00',6),(422,103,'23:00:00',6),(423,103,'21:00:00',7),(424,103,'23:00:00',7),(427,104,'12:00:00',2),(428,104,'15:00:00',2),(429,104,'12:00:00',3),(430,104,'15:00:00',3),(431,104,'12:00:00',4),(432,104,'15:00:00',4),(433,104,'12:00:00',5),(434,104,'15:00:00',5),(435,104,'12:00:00',6),(436,104,'15:00:00',6),(437,104,'12:00:00',7),(438,104,'15:00:00',7),(439,104,'12:00:00',8),(440,104,'15:00:00',8),(441,105,'07:00:00',2),(442,105,'07:00:00',3),(443,105,'07:00:00',4),(444,105,'07:00:00',5),(445,105,'07:00:00',6),(446,105,'07:00:00',7),(447,105,'07:00:00',8),(448,106,'07:00:00',2),(449,106,'07:00:00',3),(450,106,'07:00:00',4),(451,106,'07:00:00',5),(452,106,'07:00:00',6),(453,106,'07:00:00',7),(454,106,'07:00:00',8);
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
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (117,8,857,NULL,115,'2024-06-08 18:27:57.246542','Đổi'),(118,1,903,250,103,'2024-06-18 06:21:06.874817','Hủy');
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
INSERT INTO `location` VALUES (37,'TP. Hồ Chí Minh',1),(38,'Khánh Hòa',1),(39,'Trà Vinh',1),(40,'Bình Định',1),(41,'Cà Mau',1),(42,'Hà Nội',1),(43,'Nam Định',1),(44,'Lào Cai',1),(45,'Cao Bằng',1),(46,'Phú Thọ',1),(47,'Hải Phòng',1),(48,'Điện Biên',1),(49,'Hòa Bình',1),(50,'Quảng Ninh',1),(51,'Thái Bình',1),(52,'Lâm Đồng',1),(53,'Tuyên Quang',1),(54,'Hà Giang',1),(55,'Sơn La',1),(56,'Lai Châu',1),(57,'Bà Rịa - Vũng Tàu',1),(58,'Thái Nguyên',1),(59,'Thanh Hoá',1),(60,'Bắc Giang',1),(61,'Quảng Trị',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (2,3,115,810,'2024-06-04 05:55:12.685003','Tạm ổn. Tài xế thân thiện','Đã phê duyệt'),(3,4,115,801,'2024-06-04 05:55:34.922641','Tuyệt vời, lần thứ 2 mình chọn hãng xe này','Đã phê duyệt'),(4,2,115,798,'2024-06-04 05:55:59.008480','Hơi tệ, xe đón khách không đúng giờ','Đã hủy'),(5,5,115,812,'2024-06-09 09:38:40.479284','Xe chất lượng nha, có nhà vệ sinh riêng, tài xế thân thiện. Nói chung là ok nha mn','Đã phê duyệt');
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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (28,37,38,0,1),(29,37,39,0,1),(30,37,40,0,1),(31,37,41,0,1),(32,42,37,0,1),(33,43,44,0,1),(34,45,46,0,1),(35,48,49,0,1),(36,50,51,0,1),(37,43,37,0,1),(38,45,52,0,1),(39,53,54,0,1),(40,51,55,0,1),(41,51,46,0,1),(42,56,55,0,1),(43,37,57,0,1),(44,50,58,0,1),(45,59,60,0,1),(46,42,61,0,1),(47,47,58,0,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_assign`
--

LOCK TABLES `route_assign` WRITE;
/*!40000 ALTER TABLE `route_assign` DISABLE KEYS */;
INSERT INTO `route_assign` VALUES (5,11,28,'2024-04-27 00:00:00'),(6,12,29,'2024-04-27 00:00:00'),(7,13,30,'2024-04-28 00:00:00'),(8,13,31,'2024-04-28 00:00:00'),(9,13,32,'2024-04-28 00:00:00'),(10,15,34,'2024-04-29 00:00:00'),(11,14,36,'2024-04-29 00:00:00'),(12,14,37,'2024-04-29 00:00:00'),(13,15,38,'2024-04-29 00:00:00'),(14,12,39,'2024-04-27 00:00:00'),(15,12,40,'2024-04-27 00:00:00'),(16,12,41,'2024-04-27 00:00:00'),(17,12,42,'2024-04-27 00:00:00'),(18,11,43,'2024-04-27 00:00:00'),(19,16,44,'2024-05-05 00:00:00'),(20,12,45,'2024-04-27 00:00:00'),(21,12,46,'2024-04-27 00:00:00'),(22,17,29,'2024-05-05 00:00:00'),(23,18,28,'2024-05-23 00:00:00'),(24,18,29,'2024-05-23 00:00:00'),(25,19,28,'2024-06-16 16:58:16'),(26,19,47,'2024-06-29 21:49:44');
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
) ENGINE=InnoDB AUTO_INCREMENT=1136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (625,'2024-04-28','07:00:00',30,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,'Hoàn thành',279),(626,'2024-04-28','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,'Hoàn thành',279),(627,'2024-04-28','10:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,'Hoàn thành',279),(628,'2024-04-28','15:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,'Hoàn thành',279),(629,'2024-04-29','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,'Hoàn thành',279),(630,'2024-04-29','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,'Hoàn thành',279),(631,'2024-04-29','10:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,'Hoàn thành',279),(632,'2024-04-29','15:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'Xe đi qua cao tốc Long Thành, Dầu Giây',NULL,'Hoàn thành',279),(633,'2024-04-30','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'',NULL,'Hoàn thành',279),(634,'2024-05-01','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,NULL,NULL,'',NULL,'Hoàn thành',279),(635,'2024-04-30','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'',NULL,'Hoàn thành',279),(636,'2024-05-01','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,NULL,NULL,'',NULL,'Hoàn thành',279),(637,'2024-04-28','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',279),(638,'2024-04-28','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(639,'2024-04-28','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(640,'2024-04-28','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(641,'2024-04-28','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(642,'2024-04-28','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(643,'2024-04-29','07:00:00',31,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(644,'2024-04-29','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(645,'2024-04-29','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(646,'2024-04-29','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(647,'2024-04-29','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(648,'2024-04-29','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(649,'2024-04-30','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(650,'2024-04-30','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(651,'2024-04-30','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(652,'2024-04-30','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(653,'2024-04-30','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(654,'2024-04-30','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(655,'2024-05-01','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(656,'2024-05-01','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(657,'2024-05-01','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(658,'2024-05-01','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(659,'2024-05-01','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(660,'2024-05-01','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(661,'2024-05-02','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(662,'2024-05-02','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(663,'2024-05-02','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(664,'2024-05-02','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(665,'2024-05-02','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(666,'2024-05-02','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(667,'2024-05-03','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(668,'2024-05-03','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(669,'2024-05-03','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(670,'2024-05-03','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(671,'2024-05-03','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(672,'2024-05-03','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(673,'2024-05-04','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(674,'2024-05-04','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(675,'2024-05-04','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(676,'2024-05-04','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(677,'2024-05-04','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(678,'2024-05-04','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(679,'2024-05-05','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(680,'2024-05-05','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(681,'2024-05-05','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(682,'2024-05-05','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(683,'2024-05-05','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(684,'2024-05-05','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(685,'2024-05-06','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(686,'2024-05-06','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(687,'2024-05-06','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(688,'2024-05-06','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(689,'2024-05-06','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(690,'2024-05-06','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(691,'2024-05-07','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(692,'2024-05-07','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(693,'2024-05-07','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(694,'2024-05-07','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(695,'2024-05-07','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(696,'2024-05-07','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(697,'2024-05-08','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(698,'2024-05-08','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(699,'2024-05-08','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(700,'2024-05-08','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(701,'2024-05-08','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(702,'2024-05-09','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(703,'2024-05-08','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(704,'2024-05-09','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(705,'2024-05-09','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(706,'2024-05-09','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(707,'2024-05-09','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(708,'2024-05-09','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(709,'2024-05-10','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(710,'2024-05-10','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(711,'2024-05-10','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(712,'2024-05-10','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(713,'2024-05-10','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(714,'2024-05-11','13:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(715,'2024-05-10','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(716,'2024-05-11','15:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(717,'2024-05-11','07:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(718,'2024-05-11','20:00:00',33,120000,'2024-05-26 00:00:00',NULL,63,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(719,'2024-05-11','09:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(720,'2024-05-11','23:00:00',33,120000,'2024-05-26 00:00:00',NULL,64,NULL,NULL,'Xe có đi qua cao tốc',NULL,'Hoàn thành',NULL),(721,'2024-05-15','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,28,'',NULL,'Hoàn thành',NULL),(722,'2024-05-15','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,26,'',36,'Hoàn thành',NULL),(723,'2024-05-15','22:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,29,'',NULL,'Hoàn thành',NULL),(724,'2024-05-15','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,27,'',NULL,'Hoàn thành',NULL),(725,'2024-05-16','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,27,'',NULL,'Hoàn thành',NULL),(726,'2024-05-16','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,26,'',NULL,'Hoàn thành',NULL),(727,'2024-05-17','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,29,'',NULL,'Hoàn thành',NULL),(728,'2024-05-17','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,28,'',NULL,'Hoàn thành',NULL),(729,'2024-05-16','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,28,'',NULL,'Hoàn thành',NULL),(730,'2024-05-18','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,27,'',NULL,'Hoàn thành',NULL),(731,'2024-05-18','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,26,'',NULL,'Hoàn thành',NULL),(732,'2024-05-16','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,29,'',NULL,'Hoàn thành',NULL),(733,'2024-05-19','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,29,'',NULL,'Hoàn thành',NULL),(734,'2024-05-17','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,26,'',NULL,'Hoàn thành',NULL),(735,'2024-05-19','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,28,'',NULL,'Hoàn thành',NULL),(736,'2024-05-17','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,27,'',NULL,'Hoàn thành',NULL),(737,'2024-05-20','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,29,'',NULL,'Hoàn thành',NULL),(738,'2024-05-20','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,28,'',NULL,'Hoàn thành',NULL),(739,'2024-05-18','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,28,'',NULL,'Hoàn thành',NULL),(740,'2024-05-21','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,27,'',NULL,'Hoàn thành',NULL),(741,'2024-05-18','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,29,'',NULL,'Hoàn thành',NULL),(742,'2024-05-19','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,26,'',NULL,'Hoàn thành',NULL),(743,'2024-05-21','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,26,'',NULL,'Hoàn thành',NULL),(744,'2024-05-19','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,27,'',NULL,'Hoàn thành',NULL),(745,'2024-05-22','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,29,'',NULL,'Hoàn thành',NULL),(746,'2024-05-22','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,36,28,'',NULL,'Hoàn thành',NULL),(747,'2024-05-20','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,26,'',NULL,'Hoàn thành',NULL),(748,'2024-05-23','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,27,'',NULL,'Hoàn thành',280),(749,'2024-05-20','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,27,'',NULL,'Hoàn thành',280),(750,'2024-05-23','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,26,'',NULL,'Hoàn thành',280),(751,'2024-05-21','07:00:00',20,300000,'2024-05-26 00:00:00',NULL,61,36,28,'',NULL,'Hoàn thành',280),(752,'2024-05-21','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,29,'',NULL,'Hoàn thành',280),(753,'2024-05-24','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,36,29,'',NULL,'Hoàn thành',280),(754,'2024-05-22','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,26,'',NULL,'Hoàn thành',280),(755,'2024-05-24','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,28,'',NULL,'Hoàn thành',280),(756,'2024-05-25','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,27,'',NULL,'Hoàn thành',280),(757,'2024-05-22','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,27,'',NULL,'Hoàn thành',280),(758,'2024-05-23','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,28,'',NULL,'Hoàn thành',280),(759,'2024-05-25','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,26,'',NULL,'Hoàn thành',280),(760,'2024-05-23','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,36,29,'',NULL,'Hoàn thành',280),(761,'2024-05-26','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,29,'',NULL,'Hoàn thành',280),(762,'2024-05-26','12:00:00',40,300000,'2024-05-28 23:11:31',NULL,62,34,28,'',NULL,'Hoàn thành',280),(763,'2024-05-24','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,26,'',NULL,'Hoàn thành',280),(764,'2024-05-27','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,36,29,'',NULL,'Hoàn thành',280),(765,'2024-05-24','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,27,'',NULL,'Hoàn thành',280),(766,'2024-05-27','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,28,'',NULL,'Hoàn thành',280),(767,'2024-05-25','07:00:00',40,300000,'2024-05-26 23:26:19',NULL,61,34,28,'',NULL,'Hoàn thành',280),(768,'2024-05-25','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,29,'',NULL,'Hoàn thành',280),(769,'2024-05-28','21:00:00',40,300000,'2024-05-28 23:26:45',NULL,62,34,27,'',NULL,'Hoàn thành',280),(770,'2024-05-26','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,36,26,'',NULL,'Hoàn thành',280),(771,'2024-05-28','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,26,'',NULL,'Hoàn thành',280),(772,'2024-05-26','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,27,'',NULL,'Hoàn thành',280),(773,'2024-05-29','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,32,29,'',NULL,'Hoàn thành',280),(774,'2024-05-27','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,26,'',NULL,'Hoàn thành',280),(775,'2024-05-29','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,28,'',NULL,'Hoàn thành',280),(776,'2024-05-27','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,27,'',NULL,'Hoàn thành',280),(777,'2024-05-30','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,33,27,'',NULL,'Hoàn thành',280),(778,'2024-05-28','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,28,'',NULL,'Hoàn thành',280),(779,'2024-05-30','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,36,26,'',NULL,'Hoàn thành',280),(780,'2024-05-28','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,29,'',NULL,'Hoàn thành',280),(781,'2024-05-29','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,36,26,'',NULL,'Hoàn thành',280),(782,'2024-05-31','21:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,35,29,'',NULL,'Hoàn thành',280),(783,'2024-05-29','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,33,27,'',NULL,'Hoàn thành',280),(784,'2024-05-31','12:00:00',40,300000,'2024-05-26 00:00:00',NULL,62,34,28,'',NULL,'Hoàn thành',280),(785,'2024-05-30','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,34,28,'',NULL,'Hoàn thành',280),(786,'2024-05-30','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,35,29,'',NULL,'Hoàn thành',280),(787,'2024-05-31','07:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,32,26,'',NULL,'Hoàn thành',280),(788,'2024-05-31','09:00:00',40,300000,'2024-05-26 00:00:00',NULL,61,36,27,'',NULL,'Hoàn thành',280),(789,'2024-06-01','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,32,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(790,'2024-06-01','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,33,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(791,'2024-06-02','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,36,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(792,'2024-06-02','07:00:00',37,310000,'2024-05-26 00:00:00',NULL,61,34,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(793,'2024-06-03','21:00:00',38,310000,'2024-05-26 00:00:00',NULL,62,33,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(794,'2024-06-03','07:00:00',35,310000,'2024-05-26 00:00:00',NULL,61,32,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(795,'2024-06-04','21:00:00',30,310000,'2024-05-26 00:00:00',NULL,62,34,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(796,'2024-06-04','07:00:00',27,310000,'2024-05-26 00:00:00',NULL,61,35,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(797,'2024-06-05','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,32,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(798,'2024-06-05','07:00:00',37,310000,'2024-05-26 00:00:00',NULL,61,36,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(799,'2024-06-06','21:00:00',38,310000,'2024-05-26 00:00:00',NULL,62,35,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(800,'2024-06-06','07:00:00',37,310000,'2024-05-26 00:00:00',NULL,61,33,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(801,'2024-06-07','21:00:00',38,310000,'2024-05-26 00:00:00',NULL,62,36,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(802,'2024-06-08','21:00:00',37,310000,'2024-05-26 00:00:00',NULL,62,33,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(803,'2024-06-07','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,34,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(804,'2024-06-09','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,34,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(805,'2024-06-10','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,32,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(806,'2024-06-08','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,32,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(807,'2024-06-11','21:00:00',39,310000,'2024-05-26 00:00:00',NULL,62,35,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(808,'2024-06-09','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,35,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(809,'2024-06-10','07:00:00',28,310000,'2024-05-26 00:00:00',NULL,61,33,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(810,'2024-06-12','21:00:00',30,310000,'2024-05-26 00:00:00',NULL,62,39,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(811,'2024-06-13','21:00:00',30,310000,'2024-05-26 00:00:00',NULL,62,33,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(812,'2024-06-11','07:00:00',28,310000,'2024-05-26 00:00:00',NULL,61,34,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(813,'2024-06-14','21:00:00',35,310000,'2024-05-26 00:00:00',NULL,62,34,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(814,'2024-06-12','07:00:00',34,310000,'2024-05-26 00:00:00',NULL,61,36,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(815,'2024-06-13','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,32,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(816,'2024-06-15','21:00:00',35,310000,'2024-05-26 00:00:00',NULL,62,36,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(817,'2024-06-16','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,32,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(818,'2024-06-14','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,35,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(819,'2024-06-17','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,33,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',279),(820,'2024-06-15','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,39,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(821,'2024-06-16','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,33,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(822,'2024-06-18','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,39,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',279),(823,'2024-06-19','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,32,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',279),(824,'2024-06-17','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,32,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',NULL),(825,'2024-06-18','07:00:00',36,310000,'2024-05-26 00:00:00',NULL,61,36,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',279),(826,'2024-06-20','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,36,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',279),(827,'2024-06-19','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,33,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',279),(828,'2024-06-21','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,33,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',279),(829,'2024-06-20','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,39,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',279),(830,'2024-06-22','21:00:00',40,310000,'2024-05-26 00:00:00',NULL,62,35,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',279),(831,'2024-06-21','07:00:00',40,310000,'2024-05-26 00:00:00',NULL,61,32,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',279),(832,'2024-06-22','07:00:00',39,310000,'2024-05-26 00:00:00',NULL,61,34,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',279),(833,'2024-06-10','07:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(834,'2024-06-10','10:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(835,'2024-06-10','15:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(836,'2024-06-10','09:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(837,'2024-06-11','07:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(838,'2024-06-11','10:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(839,'2024-06-11','09:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(840,'2024-06-11','15:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(841,'2024-06-12','10:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(842,'2024-06-12','07:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(843,'2024-06-12','15:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(844,'2024-06-12','09:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(845,'2024-06-13','07:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(846,'2024-06-13','10:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(847,'2024-06-13','15:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(848,'2024-06-13','09:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(849,'2024-06-14','07:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(850,'2024-06-14','10:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(851,'2024-06-14','09:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(852,'2024-06-14','15:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(853,'2024-06-15','10:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(854,'2024-06-15','07:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(855,'2024-06-15','15:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(856,'2024-06-15','09:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(857,'2024-06-16','07:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(858,'2024-06-16','10:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(859,'2024-06-16','15:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(860,'2024-06-16','09:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(861,'2024-06-17','10:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(862,'2024-06-17','07:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(863,'2024-06-17','15:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',0),(864,'2024-06-17','09:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',0),(865,'2024-06-18','10:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',279),(866,'2024-06-18','07:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',279),(867,'2024-06-18','15:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',279),(868,'2024-06-18','09:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',279),(869,'2024-06-19','10:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',279),(870,'2024-06-19','15:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',279),(871,'2024-06-19','07:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',279),(872,'2024-06-20','10:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',279),(873,'2024-06-19','09:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',279),(874,'2024-06-20','07:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',279),(875,'2024-06-20','15:00:00',20,200000,'2024-06-08 23:42:20',NULL,102,NULL,NULL,'',NULL,'Hoàn thành',279),(876,'2024-06-20','09:00:00',20,200000,'2024-06-08 23:42:20',NULL,101,NULL,NULL,'',NULL,'Hoàn thành',279),(879,'2024-06-17','23:30:00',40,310000,'2024-06-16 00:27:31',NULL,62,35,29,'',NULL,'Hoàn thành',0),(880,'2024-06-17','10:00:00',40,310000,'2024-06-16 00:27:31',NULL,61,34,27,'',NULL,'Hoàn thành',0),(881,'2024-06-18','22:00:00',40,310000,'2024-06-16 00:27:31',NULL,62,41,27,'',NULL,'Hoàn thành',279),(882,'2024-06-18','10:00:00',40,310000,'2024-06-16 00:27:31',NULL,61,40,31,'',NULL,'Hoàn thành',279),(883,'2024-06-19','10:00:00',40,310000,'2024-06-16 00:27:31',NULL,61,35,29,'',NULL,'Hoàn thành',279),(884,'2024-06-19','22:00:00',40,310000,'2024-06-16 00:27:31',NULL,62,34,31,'',NULL,'Hoàn thành',279),(885,'2024-06-20','10:00:00',40,310000,'2024-06-16 00:27:31',NULL,61,41,27,'',NULL,'Hoàn thành',279),(886,'2024-06-20','22:00:00',40,310000,'2024-06-16 00:27:31',NULL,62,40,29,'',NULL,'Hoàn thành',279),(887,'2024-06-20','07:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,44,33,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(888,'2024-06-20','21:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,46,35,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(889,'2024-06-20','23:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,47,36,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(890,'2024-06-20','08:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,45,34,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(891,'2024-06-21','21:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,44,33,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(892,'2024-06-21','07:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,46,35,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(893,'2024-06-21','23:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,45,34,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(894,'2024-06-21','08:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,47,36,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(895,'2024-06-22','21:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,46,35,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(896,'2024-06-22','07:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,44,33,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(897,'2024-06-22','23:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,47,36,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(898,'2024-06-22','08:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,45,34,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(899,'2024-06-23','21:00:00',21,350000,'2024-06-19 22:35:38',NULL,97,44,33,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(900,'2024-06-23','07:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,46,35,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(901,'2024-06-23','23:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,45,34,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(902,'2024-06-23','08:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,47,36,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(903,'2024-06-24','21:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,46,35,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(904,'2024-06-24','07:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,44,33,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(905,'2024-06-24','23:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,47,36,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(906,'2024-06-24','08:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,45,34,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(907,'2024-06-25','07:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,46,35,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(908,'2024-06-25','21:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,44,33,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(909,'2024-06-25','23:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,45,34,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(910,'2024-06-25','08:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,47,36,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(911,'2024-06-26','07:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,44,33,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(912,'2024-06-26','21:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,46,35,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(913,'2024-06-26','23:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,47,36,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(914,'2024-06-26','08:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,45,34,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(915,'2024-06-27','21:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,44,33,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(916,'2024-06-27','07:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,46,35,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(917,'2024-06-27','08:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,47,36,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(918,'2024-06-27','23:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,45,34,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(919,'2024-06-28','07:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,44,33,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(920,'2024-06-28','21:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,46,35,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(921,'2024-06-28','08:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,45,34,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(922,'2024-06-28','23:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,47,36,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(923,'2024-06-29','21:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,44,33,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(924,'2024-06-29','07:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,46,35,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(925,'2024-06-29','08:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,47,36,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(926,'2024-06-29','23:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,45,34,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(927,'2024-06-30','07:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,44,33,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(928,'2024-06-30','21:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,46,35,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(929,'2024-06-30','23:00:00',36,350000,'2024-06-19 22:35:38',NULL,97,47,36,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(930,'2024-06-30','08:00:00',36,350000,'2024-06-19 22:35:38',NULL,98,45,34,'Xe có đi qua cao tốc. Không trả dọc đường. Chi tiết liên hệ nhà xe.',NULL,'Hoàn thành',0),(931,'2024-06-23','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,36,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(932,'2024-06-23','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,39,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(933,'2024-06-23','10:00:00',30,310000,'2024-06-22 12:12:00',NULL,61,40,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(934,'2024-06-23','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,41,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(935,'2024-06-24','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,32,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(936,'2024-06-24','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,33,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(937,'2024-06-24','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,35,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(938,'2024-06-24','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,34,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(939,'2024-06-25','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,39,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(940,'2024-06-25','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,36,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(941,'2024-06-25','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,40,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(942,'2024-06-25','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,41,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(943,'2024-06-26','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,32,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(944,'2024-06-26','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,33,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(945,'2024-06-26','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,34,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(946,'2024-06-26','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,35,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(947,'2024-06-27','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,36,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(948,'2024-06-27','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,39,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(949,'2024-06-27','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,40,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(950,'2024-06-27','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,41,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(951,'2024-06-28','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,32,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(952,'2024-06-28','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,33,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(953,'2024-06-28','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,34,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(954,'2024-06-28','10:00:00',39,310000,'2024-06-22 12:12:00',NULL,61,35,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(955,'2024-06-29','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,36,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(956,'2024-06-29','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,39,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(957,'2024-06-29','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,40,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(958,'2024-06-29','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,41,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(959,'2024-06-30','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,33,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(960,'2024-06-30','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,32,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(961,'2024-06-30','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,35,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(962,'2024-06-30','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,34,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(963,'2024-07-01','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,32,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(964,'2024-07-01','07:00:00',35,310000,'2024-06-22 12:12:00',NULL,61,33,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(965,'2024-07-01','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,34,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(966,'2024-07-01','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,35,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(967,'2024-07-02','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,39,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(968,'2024-07-02','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,36,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(969,'2024-07-02','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,41,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(970,'2024-07-02','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,40,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(971,'2024-07-03','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,33,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(972,'2024-07-03','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,32,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(973,'2024-07-03','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,35,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(974,'2024-07-03','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,34,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(975,'2024-07-04','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,36,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(976,'2024-07-04','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,39,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(977,'2024-07-04','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,41,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(978,'2024-07-04','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,40,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(979,'2024-07-05','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,33,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(980,'2024-07-05','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,32,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(981,'2024-07-05','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,34,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(982,'2024-07-05','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,35,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(983,'2024-07-06','21:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,39,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(984,'2024-07-06','07:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,36,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(985,'2024-07-06','22:00:00',40,310000,'2024-06-22 12:12:00',NULL,62,41,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(986,'2024-07-06','10:00:00',40,310000,'2024-06-22 12:12:00',NULL,61,40,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Hoàn thành',0),(987,'2024-05-24','21:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,46,35,'',NULL,'Hoàn thành',0),(988,'2024-05-24','07:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,44,33,'',NULL,'Hoàn thành',0),(989,'2024-05-24','23:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,47,36,'',NULL,'Hoàn thành',0),(990,'2024-05-24','08:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,45,34,'',NULL,'Hoàn thành',0),(991,'2024-05-25','21:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,44,33,'',NULL,'Hoàn thành',0),(992,'2024-05-25','07:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,46,35,'',NULL,'Hoàn thành',0),(993,'2024-05-25','23:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,45,34,'',NULL,'Hoàn thành',0),(994,'2024-05-25','08:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,47,36,'',NULL,'Hoàn thành',0),(995,'2024-05-26','07:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,44,33,'',NULL,'Hoàn thành',0),(996,'2024-05-26','21:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,46,35,'',NULL,'Hoàn thành',0),(997,'2024-05-26','23:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,47,36,'',NULL,'Hoàn thành',0),(998,'2024-05-26','08:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,45,34,'',NULL,'Hoàn thành',0),(999,'2024-05-27','07:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,44,33,'',NULL,'Hoàn thành',0),(1000,'2024-05-27','21:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,46,35,'',NULL,'Hoàn thành',0),(1001,'2024-05-27','23:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,47,36,'',NULL,'Hoàn thành',0),(1002,'2024-05-27','08:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,45,34,'',NULL,'Hoàn thành',0),(1003,'2024-05-28','21:00:00',31,350000,'2024-04-22 13:13:16',NULL,97,44,33,'',NULL,'Hoàn thành',0),(1004,'2024-05-28','07:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,46,35,'',NULL,'Hoàn thành',0),(1005,'2024-05-28','23:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,45,34,'',NULL,'Hoàn thành',0),(1006,'2024-05-28','08:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,47,36,'',NULL,'Hoàn thành',0),(1007,'2024-05-29','21:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,46,35,'',NULL,'Hoàn thành',0),(1008,'2024-05-29','07:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,44,33,'',NULL,'Hoàn thành',0),(1009,'2024-05-29','08:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,45,34,'',NULL,'Hoàn thành',0),(1010,'2024-05-29','23:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,47,36,'',NULL,'Hoàn thành',0),(1011,'2024-05-30','07:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,46,35,'',NULL,'Hoàn thành',0),(1012,'2024-05-30','21:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,44,33,'',NULL,'Hoàn thành',0),(1013,'2024-05-30','08:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,47,36,'',NULL,'Hoàn thành',0),(1014,'2024-05-30','23:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,45,34,'',NULL,'Hoàn thành',0),(1015,'2024-05-31','21:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,46,35,'',NULL,'Hoàn thành',0),(1016,'2024-05-31','07:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,44,33,'',NULL,'Hoàn thành',0),(1017,'2024-05-31','23:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,47,36,'',NULL,'Hoàn thành',0),(1018,'2024-05-31','08:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,45,34,'',NULL,'Hoàn thành',0),(1019,'2024-06-01','07:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,46,35,'',NULL,'Hoàn thành',0),(1020,'2024-06-01','21:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,44,33,'',NULL,'Hoàn thành',0),(1021,'2024-06-01','08:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,47,36,'',NULL,'Hoàn thành',0),(1022,'2024-06-01','23:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,45,34,'',NULL,'Hoàn thành',0),(1023,'2024-06-02','07:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,44,33,'',NULL,'Hoàn thành',0),(1024,'2024-06-02','21:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,46,35,'',NULL,'Hoàn thành',0),(1025,'2024-06-02','23:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,47,36,'',NULL,'Hoàn thành',0),(1026,'2024-06-02','08:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,45,34,'',NULL,'Hoàn thành',0),(1027,'2024-06-03','21:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,44,35,'',NULL,'Hoàn thành',0),(1028,'2024-06-03','07:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,46,33,'',NULL,'Hoàn thành',0),(1029,'2024-06-03','23:00:00',36,350000,'2024-04-22 13:13:16',NULL,97,45,36,'',NULL,'Hoàn thành',0),(1030,'2024-06-03','08:00:00',36,350000,'2024-04-22 13:13:16',NULL,98,47,34,'',NULL,'Hoàn thành',0),(1031,'2024-07-07','21:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,33,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1032,'2024-07-07','07:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,32,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1033,'2024-07-07','08:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,34,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1034,'2024-07-07','23:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,35,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1035,'2024-07-08','07:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,33,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1036,'2024-07-08','21:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,32,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1037,'2024-07-08','08:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,35,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1038,'2024-07-08','23:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,34,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1039,'2024-07-09','07:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,39,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1040,'2024-07-09','21:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,36,37,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1041,'2024-07-09','08:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,41,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1042,'2024-07-09','23:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,40,38,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1043,'2024-07-10','07:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,32,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1044,'2024-07-10','21:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,48,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1045,'2024-07-10','23:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,49,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1046,'2024-07-10','08:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,34,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1047,'2024-07-11','21:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,50,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1048,'2024-07-11','07:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,36,37,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1049,'2024-07-11','08:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,40,38,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1050,'2024-07-11','23:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,33,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1051,'2024-07-12','21:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,35,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1052,'2024-07-12','07:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,48,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1053,'2024-07-12','23:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,39,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1054,'2024-07-12','08:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,49,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1055,'2024-07-13','21:00:00',40,310000,'2024-07-13 20:56:48',NULL,62,41,37,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Đang đi',281),(1056,'2024-07-13','07:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,50,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1057,'2024-07-13','23:00:00',40,310000,'2024-06-30 15:31:50',NULL,62,32,38,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1058,'2024-07-13','08:00:00',40,310000,'2024-06-30 15:31:50',NULL,61,33,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1059,'2024-07-01','12:00:00',40,310000,'2024-06-30 17:10:24',NULL,61,48,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,'Đang đi',279),(1060,'2024-07-02','12:00:00',40,310000,'2024-06-30 15:45:13',NULL,61,49,37,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1061,'2024-07-03','12:00:00',40,310000,'2024-06-30 15:45:13',NULL,61,50,38,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1062,'2024-07-14','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1064,'2024-07-14','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1066,'2024-07-15','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,33,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1068,'2024-07-15','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,34,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1070,'2024-07-16','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,36,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1073,'2024-07-16','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,40,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1075,'2024-07-17','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,48,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1076,'2024-07-17','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,49,37,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1078,'2024-07-18','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,50,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1079,'2024-07-18','07:00:00',7,310000,'2024-07-13 15:37:06',NULL,61,35,38,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1080,'2024-07-18','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,32,38,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1081,'2024-07-18','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,39,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1082,'2024-07-19','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,35,27,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1083,'2024-07-19','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,41,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1084,'2024-07-19','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,33,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1085,'2024-07-19','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,39,28,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1086,'2024-07-20','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,34,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1087,'2024-07-20','21:00:00',35,310000,'2024-07-13 15:37:06',NULL,62,41,29,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1088,'2024-07-20','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,36,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1089,'2024-07-20','22:00:00',35,310000,'2024-07-13 15:37:06',NULL,62,33,30,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1090,'2024-07-21','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,34,31,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1091,'2024-07-21','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,40,37,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1092,'2024-07-21','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,36,37,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1093,'2024-07-21','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,48,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1094,'2024-07-22','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1095,'2024-07-22','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1096,'2024-07-22','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1097,'2024-07-22','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1098,'2024-07-23','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1099,'2024-07-23','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1100,'2024-07-23','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1101,'2024-07-23','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1102,'2024-07-24','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1103,'2024-07-24','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1104,'2024-07-24','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1105,'2024-07-25','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1106,'2024-07-24','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1107,'2024-07-25','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1108,'2024-07-25','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1109,'2024-07-25','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1110,'2024-07-26','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1111,'2024-07-26','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1112,'2024-07-26','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1113,'2024-07-27','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1114,'2024-07-26','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1115,'2024-07-27','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1116,'2024-07-27','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1117,'2024-07-27','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1118,'2024-07-28','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1119,'2024-07-28','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1120,'2024-07-28','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1121,'2024-07-29','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1122,'2024-07-28','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1123,'2024-07-29','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1124,'2024-07-29','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1125,'2024-07-29','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1126,'2024-07-30','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1127,'2024-07-30','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1128,'2024-07-30','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1129,'2024-07-30','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1130,'2024-07-31','21:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1131,'2024-07-31','07:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1132,'2024-07-31','22:00:00',40,310000,'2024-07-13 15:37:06',NULL,62,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1133,'2024-07-31','09:00:00',40,310000,'2024-07-13 15:37:06',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1134,'2024-07-14','07:00:00',36,310000,'2024-07-13 17:45:24',NULL,61,NULL,NULL,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0),(1135,'2024-07-15','07:00:00',37,310000,'2024-07-13 17:45:24',NULL,61,32,26,'Xe có đi qua cao tốc. Không hỗ trợ trả dọc đường',NULL,NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=350 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (131,0,2,1,5,'A03',1),(132,1,0,1,5,'A04',1),(133,1,1,1,5,'A05',1),(134,1,2,1,5,'A06',1),(135,2,0,1,5,'A07',1),(136,2,1,1,5,'A08',1),(137,2,2,1,5,'A09',1),(138,3,0,1,5,'A10',1),(139,3,1,1,5,'A11',1),(140,3,2,1,5,'A12',1),(141,4,0,1,5,'A13',1),(142,4,1,1,5,'A14',1),(143,4,2,1,5,'A15',1),(144,5,0,1,5,'A16',1),(145,5,1,1,5,'A17',1),(146,5,2,1,5,'A18',1),(147,6,0,1,5,'A19',1),(148,6,1,1,5,'A20',1),(149,6,2,1,5,'A21',1),(150,0,0,2,5,'B01',1),(151,0,1,2,5,'B02',1),(152,0,2,2,5,'B03',1),(153,1,0,2,5,'B04',1),(154,1,1,2,5,'B05',1),(155,1,2,2,5,'B06',1),(156,2,0,2,5,'B07',1),(157,2,1,2,5,'B08',1),(158,2,2,2,5,'B09',1),(159,3,0,2,5,'B10',1),(160,3,1,2,5,'B11',1),(161,3,2,2,5,'B12',1),(162,4,0,2,5,'B13',1),(163,4,1,2,5,'B14',1),(164,4,2,2,5,'B15',1),(165,5,0,2,5,'B16',1),(166,5,1,2,5,'B17',1),(167,5,2,2,5,'B18',1),(168,6,0,2,5,'B19',1),(169,6,1,2,5,'B20',1),(170,6,2,2,5,'B21',1),(171,0,2,1,6,'A03',1),(172,1,0,1,6,'A04',1),(173,1,1,1,6,'A05',1),(174,1,2,1,6,'A06',1),(175,2,0,1,6,'A07',1),(176,2,1,1,6,'A08',1),(177,2,2,1,6,'A09',1),(178,3,0,1,6,'A10',1),(179,3,1,1,6,'A11',1),(180,3,2,1,6,'A12',1),(181,4,0,1,6,'A13',1),(182,4,1,1,6,'A14',1),(183,4,2,1,6,'A15',1),(184,5,0,1,6,'A16',1),(185,5,1,1,6,'A17',1),(186,5,2,1,6,'A18',1),(187,0,0,2,6,'B01',1),(188,0,2,2,6,'B03',1),(189,1,0,2,6,'B04',1),(190,1,1,2,6,'B05',1),(191,1,2,2,6,'B06',1),(192,2,0,2,6,'B07',1),(193,2,1,2,6,'B08',1),(194,2,2,2,6,'B09',1),(195,3,0,2,6,'B10',1),(196,3,1,2,6,'B11',1),(197,3,2,2,6,'B12',1),(198,4,0,2,6,'B13',1),(199,4,1,2,6,'B14',1),(200,4,2,2,6,'B15',1),(201,5,0,2,6,'B16',1),(202,5,1,2,6,'B17',1),(203,5,2,2,6,'B18',1),(204,0,2,1,7,'C01',1),(205,0,3,1,7,'D01',1),(206,1,0,1,7,'A02',1),(207,1,1,1,7,'B02',1),(208,1,2,1,7,'C02',1),(209,1,3,1,7,'D02',1),(210,2,0,1,7,'A03',1),(211,2,1,1,7,'B03',1),(212,2,2,1,7,'C03',1),(213,2,3,1,7,'D03',1),(214,3,0,1,7,'A04',1),(215,3,1,1,7,'B04',1),(216,3,2,1,7,'C04',1),(217,3,3,1,7,'D04',1),(218,4,0,1,7,'A05',1),(219,4,1,1,7,'B05',1),(220,4,2,1,7,'C05',1),(221,4,3,1,7,'D05',1),(222,5,0,1,7,'A06',1),(223,5,3,1,7,'D06',1),(224,0,0,1,8,'A01',1),(225,0,1,1,8,'A02',1),(226,0,2,1,8,'A03',1),(227,1,0,1,8,'A04',1),(228,1,1,1,8,'A05',1),(229,1,2,1,8,'A06',1),(230,2,0,1,8,'A07',1),(231,2,1,1,8,'A08',1),(232,2,2,1,8,'A09',1),(233,3,0,1,8,'A10',1),(234,3,1,1,8,'A11',1),(235,3,2,1,8,'A12',1),(236,4,0,1,8,'A13',1),(237,4,1,1,8,'A14',1),(238,4,2,1,8,'A15',1),(239,0,0,2,8,'B01',1),(240,0,1,2,8,'B02',1),(241,0,2,2,8,'B03',1),(242,1,0,2,8,'B04',1),(243,1,1,2,8,'B05',1),(244,1,2,2,8,'B06',1),(245,2,0,2,8,'B07',1),(246,2,1,2,8,'B08',1),(247,2,2,2,8,'B09',1),(248,3,0,2,8,'B10',1),(249,3,1,2,8,'B11',1),(250,3,2,2,8,'B12',1),(251,4,0,2,8,'B13',1),(252,4,1,2,8,'B14',1),(253,4,2,2,8,'B15',1),(254,0,0,1,9,'A01',1),(255,0,1,1,9,'A02',1),(256,0,2,1,9,'A03',1),(257,1,0,1,9,'A04',1),(258,1,1,1,9,'A05',1),(259,1,2,1,9,'A06',1),(260,2,0,1,9,'A07',1),(261,2,1,1,9,'A08',1),(262,2,2,1,9,'A09',1),(263,3,0,1,9,'A10',1),(264,3,1,1,9,'A11',1),(265,3,2,1,9,'A12',1),(266,4,0,1,9,'A13',1),(267,4,1,1,9,'A14',1),(268,4,2,1,9,'A15',1),(269,0,0,2,9,'B01',1),(270,0,1,2,9,'B02',1),(271,0,2,2,9,'B03',1),(272,1,0,2,9,'B04',1),(273,1,1,2,9,'B05',1),(274,1,2,2,9,'B06',1),(275,2,0,2,9,'B07',1),(276,2,1,2,9,'B08',1),(277,2,2,2,9,'B09',1),(278,3,0,2,9,'B10',1),(279,3,1,2,9,'B11',1),(280,3,2,2,9,'B12',1),(281,4,0,2,9,'B13',1),(282,4,1,2,9,'B14',1),(283,4,2,2,9,'B15',1),(284,0,0,1,10,'A01',1),(285,0,1,1,10,'A02',1),(286,0,2,1,10,'A03',1),(287,1,0,1,10,'A04',1),(288,1,1,1,10,'A05',1),(289,1,2,1,10,'A06',1),(290,2,0,1,10,'A07',1),(291,2,1,1,10,'A08',1),(292,2,2,1,10,'A09',1),(293,3,0,1,10,'A10',1),(294,3,1,1,10,'A11',1),(295,3,2,1,10,'A12',1),(296,4,0,1,10,'A13',1),(297,4,1,1,10,'A14',1),(298,4,2,1,10,'A15',1),(299,0,0,2,10,'B01',1),(300,0,1,2,10,'B02',1),(301,0,2,2,10,'B03',1),(302,1,0,2,10,'B04',1),(303,1,1,2,10,'B05',1),(304,1,2,2,10,'B06',1),(305,2,0,2,10,'B07',1),(306,2,1,2,10,'B08',1),(307,2,2,2,10,'B09',1),(308,3,0,2,10,'B10',1),(309,3,1,2,10,'B11',1),(310,3,2,2,10,'B12',1),(311,4,0,2,10,'B13',1),(312,4,1,2,10,'B14',1),(313,4,2,2,10,'B15',1),(314,0,0,1,11,'A01',1),(315,0,1,1,11,'B01',1),(316,0,2,1,11,'C01',1),(317,1,0,1,11,'A02',1),(318,1,1,1,11,'B02',1),(319,1,2,1,11,'C02',1),(320,2,0,1,11,'A03',1),(321,2,1,1,11,'B03',1),(322,2,2,1,11,'C03',1),(323,3,0,1,11,'A04',1),(324,3,1,1,11,'B04',1),(325,3,2,1,11,'C04',1),(326,4,0,1,11,'A05',1),(327,4,1,1,11,'B05',1),(328,4,2,1,11,'C05',1),(329,5,0,1,11,'A06',1),(330,5,1,1,11,'B06',1),(331,5,2,1,11,'C06',1),(332,0,0,2,11,'A07',1),(333,0,1,2,11,'B07',1),(334,0,2,2,11,'C07',1),(335,1,0,2,11,'A08',1),(336,1,1,2,11,'B08',1),(337,1,2,2,11,'C08',1),(338,2,0,2,11,'A09',1),(339,2,1,2,11,'B09',1),(340,2,2,2,11,'C09',1),(341,3,0,2,11,'A10',1),(342,3,1,2,11,'B10',1),(343,3,2,2,11,'C10',1),(344,4,0,2,11,'A11',1),(345,4,1,2,11,'B11',1),(346,4,2,2,11,'C11',1),(347,5,0,2,11,'A12',1),(348,5,1,2,11,'B12',1),(349,5,2,2,11,'C12',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat_map`
--

LOCK TABLES `seat_map` WRITE;
/*!40000 ALTER TABLE `seat_map` DISABLE KEYS */;
INSERT INTO `seat_map` VALUES (5,7,3,2),(6,6,3,2),(7,6,4,1),(8,5,3,2),(9,5,3,2),(10,5,3,2),(11,6,3,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_fee`
--

LOCK TABLES `service_fee` WRITE;
/*!40000 ALTER TABLE `service_fee` DISABLE KEYS */;
INSERT INTO `service_fee` VALUES (1,4522000,'Đã thanh toán','2024-05-12',4,12,'69337686'),(2,374000,'Đã thanh toán','2024-05-20',6,17,'24856769'),(3,782000,'Đã thanh toán','2024-05-12',1,11,'23102855'),(4,144000,'Đã thanh toán','2024-05-13',8,13,'23102855'),(5,255000,'Đã thanh toán','2024-05-14',10,14,'23102856'),(6,133000,'Chờ thanh toán','2024-05-14',NULL,15,'23102857'),(7,130030,'Chờ thanh toán','2024-05-20',NULL,16,'23102858'),(8,2040000,'Đã thanh toán','2024-06-05',2,11,'16845359'),(9,2108000,'Đã thanh toán','2024-07-05',3,11,'51792033'),(10,2108000,'Chờ thanh toán','2024-08-05',NULL,11,'34454075'),(11,7140000,'Đã thanh toán','2024-06-05',5,12,'51619845'),(12,7378000,'Chờ thanh toán','2024-07-05',NULL,12,'40509894'),(13,1020000,'Đã thanh toán','2024-06-05',7,17,'32548100'),(14,1054000,'Chờ thanh toán','2024-07-05',NULL,17,'39495573'),(15,3060000,'Đã thanh toán','2024-06-05',9,13,'13476759'),(16,3162000,'Chờ thanh toán','2024-07-05',NULL,13,'26597846'),(17,2040000,'Đã thanh toán','2024-06-05',11,14,'09094632'),(18,2108000,'Chờ thanh toán','2024-07-05',NULL,14,'05683975'),(19,2108000,'Đã thanh toán','2024-05-22',12,18,'05683999'),(20,2040000,'Đã thanh toán','2024-06-05',13,18,'98169279'),(21,2108000,'Đã thanh toán','2024-07-05',25,18,'17249590'),(22,1020000,'Đã thanh toán','2024-07-01',27,19,'48104815'),(23,2108000,'Đã thanh toán','2024-08-05',26,18,'74989711'),(24,2040000,'Chờ thanh toán','2024-09-05',NULL,18,'92917108'),(25,2108000,'Đã thanh toán','2024-08-05',29,19,'04931890'),(26,2040000,'Đã thanh toán','2024-09-05',30,19,'66708987'),(28,2108000,'Đã thanh toán','2024-10-05',31,19,'58625657'),(29,2040000,'Chờ thanh toán','2024-11-05',NULL,19,'37511885');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_day`
--

LOCK TABLES `special_day` WRITE;
/*!40000 ALTER TABLE `special_day` DISABLE KEYS */;
INSERT INTO `special_day` VALUES (19,'2024-09-02',100000,12),(20,'2024-09-03',100000,12),(21,'2024-09-01',100000,11),(22,'2024-07-05',100000,11);
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES ('2024-04-27',32,103,'567890464513','Bình Nguyên Vô Tâm','/api/static/images/1717858075564-anh-chipi-16.jpg','NV: Nguyễn Châu An',11),('2024-04-27',33,104,'098673530459','Gò Vấp, Hồ Chí Minh','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Lê Hò',11),('2024-04-27',34,105,'567222464564','Bình Tân','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Châu Phú',12),('2024-04-28',35,106,'645635645747','Bình Hưng, Cam Ranh','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Châu Thuận',13),('2024-04-29',36,107,'567890123111','Bình Hưng Hòa','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Liên Hoàng',14),('2024-04-29',37,108,'567890464500','Hà Nội','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Liên Hoàng',15),('2024-05-05',38,109,'849485235','Cam Ranh, Khánh Hòa','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Lê Thành Liên',16),('2024-05-05',39,110,'567123489346','Hà Nội','https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg','NV: Nguyễn Phú Mỹ',17),('2024-05-23',40,117,'567890464333','Gò Vấp, Hồ Chí Minh','https://vexe.workon.space/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','NV: Nguyễn Hòa',18),('2024-06-16',41,126,'567890123908','Cam Ranh, Khánh Hòa','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','NV: Nguyễn Hoàng Lưu Bão',19),('2022-10-10',42,127,'225827227','Cam Ranh, Khánh Hòa','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','NV: Kim Lệ',11),('2022-10-24',43,128,'049059020','Cam Phúc Bắc, Cam Phước','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','NV: Kim Nhung',11),('2022-10-10',44,129,'225827117','Cam Ranh, Khánh Hòa','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','NV: Bảo Nguyên',11),('2022-10-24',45,130,'049059110','Cam Phúc Bắc, Cam Phước','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','NV: Kim An',11),('2024-06-09',46,139,'084495965511','Cam Ranh, Khánh Hòa','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','NV: Lê Quang',11);
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
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `station`
--

LOCK TABLES `station` WRITE;
/*!40000 ALTER TABLE `station` DISABLE KEYS */;
INSERT INTO `station` VALUES (38,'Miền Đông','Bến xe Miền Đông, Dinh Bo Linh, Ward 26, Binh Thanh District, Ho Chi Minh City, 72309, Vietnam',37,10.81494470,106.71069170,1,NULL),(39,'Phía Nam Nha Trang','Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam',38,12.25839475,109.13485589,1,NULL),(40,'Ngã tư Thủ Đức','Thu Duc Intersection, Cầu vượt Ngã tư Thủ Đức, Binh Tho Ward, Thủ Đức, Ho Chi Minh City, 00848, Vietnam',37,10.84912750,106.77403120,1,11),(41,'Bến xe Cam Ranh','Lê Duẩn, Phường Cam Lộc, Cam Ranh, Khánh Hòa Province, Vietnam',38,11.91803368,109.14670324,1,11),(42,'Miền Tây','Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam',37,10.74012710,106.61940059,1,NULL),(43,'Trà Vinh','Bến xe Trà Vinh, Trà Vinh',39,0.00000000,0.00000000,1,NULL),(44,'Trạm xe Thanh Thủy, Bình Phú','National Route 53, Xã Bình Phú, Càng Long District, Trà Vinh Province, Vietnam',39,9.96000815,106.24510484,1,12),(45,'An Sương','Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam',37,10.84525430,106.61334520,1,NULL),(46,'Quy Nhơn','Quy Nhon Bus Station, Quốc lộ 1D, Ghềnh Ráng, Phường Ghềnh Ráng, Quy Nhơn, Bình Định Province, 59000, Vietnam',40,13.75333960,109.20890740,1,NULL),(47,'Ngã Tư Ga','Bến xe Ngã tư Ga, Quốc lộ 1, Phường Thạnh Lộc, District 12, Ho Chi Minh City, 71514, Vietnam',37,10.86232380,106.67872000,1,NULL),(48,'Cà Mau','Bến xe Cà Mau, Lý Thường Kiệt, Phường 6, Xã Định Bình, Cà Mau, Cà Mau Province, Vietnam',41,9.17577040,105.17094360,1,NULL),(49,'Giáp Bát','Bến xe Giáp Bát, Đường Giải Phóng, Phường Giáp Bát, Hoang Mai District, Hà Nội, 11718, Vietnam',42,20.98042550,105.84146350,1,NULL),(50,'Miền Đông Mới','Bến xe Miền Đông mới, Đường số 13, Long Binh Ward, Thủ Đức, Ho Chi Minh City, Dĩ An, Bình Dương Province, 71300, Vietnam',37,10.87856780,106.81498810,1,NULL),(51,'Quất Lâm','Bến xe Quất Lâm, Nam Định',43,0.00000000,0.00000000,1,NULL),(52,'Trung tâm Lào Cai','Bến xe Trung tâm Lào Cai, Đường Bình Minh, Pom Han Ward, Lào Cai, Lào Cai Province, Vietnam',44,22.42530190,104.03022146,1,NULL),(53,'Liên tỉnh TP Cao Bằng','City interprovincial bus station, Cao Bang, National Highway 3, Cao Bằng, Hòa An District, Cao Bằng Province, 21110, Vietnam',45,22.68086165,106.20209994,1,NULL),(54,'Việt Trì','Bến xe Việt Trì, Phú Thọ',46,0.00000000,0.00000000,1,NULL),(55,'Cẩm Hải','Bến xe Cẩm Hải, Quảng Ninh',50,0.00000000,0.00000000,1,NULL),(56,'Huyện Tiền Hải','Bến xe Huyện Tiền Hải, Thái Bình',51,0.00000000,0.00000000,1,NULL),(57,'Nghĩa Hưng','Bến xe Nghĩa Hưng, Nam Định',43,0.00000000,0.00000000,1,NULL),(58,'Đức Long Bảo Lộc','Bến xe Đức Long Bảo Lộc, Lâm Đồng',52,0.00000000,0.00000000,1,NULL),(59,'TP Tuyên Quang','Bến xe TP Tuyên Quang, Tuyên Quang',53,0.00000000,0.00000000,1,NULL),(60,'Đồng Văn','Dong Van Bus Station, 3 February Road, Quyết Tiến, Quán Xín Ngài, Đồng Văn Town, Đồng Văn District, Hà Giang Province, Vietnam',54,23.27813465,105.35096316,1,NULL),(61,'TP Sơn La','Son La Bus Station, Đường Lê Duẩn, Sơn La, Sơn La Province, Vietnam',55,21.30140700,103.94344310,1,NULL),(62,'Trung tâm TP Thái Bình','Bến xe khách Trung tâm Thái Bình, Lý Bôn, Thái Bình, Thái Bình Province, 06118, Vietnam',51,20.44901175,106.33447339,1,NULL),(63,'Lai Châu','Lai Chau Bus Station, 30 April Road, Đông Phong Ward, Tân Phong Ward, Lai Châu, Lai Châu Province, Vietnam',56,22.38275665,103.48753264,1,NULL),(64,'Vǜng Tàu','Bến xe Vũng Tàu, 192, Nam Kỳ Khởi Nghĩa, Khu phố 2, Ward 3, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam',57,10.35033630,107.08715520,1,NULL),(65,'Móng Cái','Mong Cai Coach Terminal, Phạm Ngũ Lão, Quarter 2, Ka Long Ward, Móng Cái, Quảng Ninh Province, 02033, Vietnam',50,21.53037160,107.95833081,1,NULL),(66,'Phú Bình','Bến xe Phú Bình, Thái Nguyên',58,0.00000000,0.00000000,1,NULL),(67,'Huyên Hồng','Bến xe Huyên Hồng, Thanh Hoá',59,0.00000000,0.00000000,1,NULL),(68,'Bắc Giang','Bến xe Bắc Giang, Bắc Giang',60,0.00000000,0.00000000,1,NULL),(69,'Nước Ngầm','Bến xe Nước Ngầm, Đường Ngọc Hồi, Phường Hoàng Liệt, Hoang Mai District, Hà Nội, 11718, Vietnam',42,20.96475770,105.84223830,1,NULL),(70,'Lao Bảo','Bến xe Lao Bảo, Quảng Trị',61,0.00000000,0.00000000,1,NULL),(71,'Thị xã Duyên Hải','Bến xe Thị xã Duyên Hải, Trà Vinh',39,0.00000000,0.00000000,1,NULL),(72,'Bãi đỗ xe Cam Ranh','Bus to Center Nha Trang, Hùng Vương, Phường Cam Lợi, Cam Ranh, Khánh Hòa Province, Vietnam',38,11.91649264,109.14502045,1,11),(73,'Bãi đỗ xe Châu An, Tân Phú','Đường Số 138, Topaz Mansion, Tan Phu Ward, Thủ Đức, Ho Chi Minh City, 71216, Vietnam',37,10.86183420,106.80828903,1,11),(74,'Trạm dừng chân Hưng Thịnh','PV Oil, Trần Hưng Đạo, Phường Bình Hưng, Phan Thiết, Bình Thuận Province, Vietnam',38,10.92908714,108.10511040,1,11),(75,'Xuyên Mộc','Bến xe khách Xuyên Mộc, Xuyên Phước Cơ, Thạnh Sơn 1A, Xóm Rẫy, Phuoc Thuan Commune, Xuyên Mộc District, Bà Rịa - Vũng Tàu Province, Vietnam',57,10.53253630,107.39265166,1,NULL),(76,'Bãi đỗ xe Toàn Thắng','Toàn Thắng, Trưng Trắc, Front Beach, Ward 1, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam',57,10.34818194,107.07580229,1,11),(77,'Trạm dừng chân km237','Trạm dừng chân km237, Hanoi - Lao Cai Expressway, Bao Thang District, Lào Cai Province, Vietnam',57,22.36362420,104.08223261,1,11),(78,'Bãi Đỗ Xe Nha Trang','Bãi Đỗ Xe, Ngõ 415 Cổ Nhuế, Co Nhue 2 Ward, North Tu Liem District, Hà Nội, 12500, Vietnam',38,21.06752815,105.77827472,1,11),(79,'Cam Ranh','Bến xe Cam Ranh, Khánh Hòa',38,0.00000000,0.00000000,1,NULL),(80,'Bãi đỗ Hòa Hảo 1','Huỳnh Thúc Kháng, Phường Cam Lộc, Cam Ranh, Khánh Hòa Province, Vietnam',38,11.91758299,109.14229583,1,18),(81,'Bãi đỗ Hòa Hảo 2','Võ Văn Ngân, Linh Chieu Ward, Thủ Đức, Ho Chi Minh City, 00848, Vietnam',37,10.84983530,106.77224320,1,18),(82,'Phía Bắc Hải Phòng','Bến xe Phía Bắc Hải Phòng, Hải Phòng',47,0.00000000,0.00000000,1,NULL),(83,'Đại Từ','Bến xe Đại Từ, Thái Nguyên',58,0.00000000,0.00000000,1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stop_station`
--

LOCK TABLES `stop_station` WRITE;
/*!40000 ALTER TABLE `stop_station` DISABLE KEYS */;
INSERT INTO `stop_station` VALUES (193,61,38,'pick',2,1),(194,61,39,'drop',7,1),(195,62,38,'drop',7,1),(196,62,39,'pick',2,1),(197,61,40,'pick',4,0),(198,62,40,'drop',5,1),(199,62,41,'pick',3,1),(200,61,41,'drop',6,1),(201,63,42,'pick',1,1),(202,63,43,'drop',4,1),(203,64,42,'drop',4,1),(204,64,43,'pick',1,1),(205,64,44,'pick',2,1),(206,63,44,'drop',3,1),(207,65,45,'pick',0,1),(208,65,46,'drop',0,1),(209,66,45,'drop',0,1),(210,66,46,'pick',0,1),(211,67,47,'pick',0,1),(212,67,48,'drop',0,1),(213,68,47,'drop',0,1),(214,68,48,'pick',0,1),(215,69,49,'pick',0,1),(216,69,50,'drop',0,1),(217,70,49,'drop',0,1),(218,70,50,'pick',0,1),(219,71,53,'pick',0,1),(220,71,54,'drop',0,1),(221,72,53,'drop',0,1),(222,72,54,'pick',0,1),(223,73,55,'pick',0,1),(224,73,56,'drop',0,1),(225,74,55,'drop',0,1),(226,74,56,'pick',0,1),(227,75,57,'pick',0,1),(228,75,45,'drop',0,1),(229,76,57,'drop',0,1),(230,76,45,'pick',0,1),(231,77,53,'pick',0,1),(232,77,58,'drop',0,1),(233,78,53,'drop',0,1),(234,78,58,'pick',0,1),(235,79,59,'pick',0,1),(236,79,60,'drop',0,1),(237,80,59,'drop',0,1),(238,80,60,'pick',0,1),(239,81,56,'pick',0,1),(240,81,61,'drop',0,1),(241,82,56,'drop',0,1),(242,82,61,'pick',0,1),(243,83,62,'pick',0,1),(244,83,54,'drop',0,1),(245,84,62,'drop',0,1),(246,84,54,'pick',0,1),(247,85,63,'pick',0,1),(248,85,61,'drop',0,1),(249,86,63,'drop',0,1),(250,86,61,'pick',0,1),(251,87,42,'pick',1,1),(252,87,64,'drop',2,1),(253,88,42,'drop',2,1),(254,88,64,'pick',1,1),(255,89,65,'pick',0,1),(256,89,66,'drop',0,1),(257,90,65,'drop',0,1),(258,90,66,'pick',0,1),(259,91,67,'pick',0,1),(260,91,68,'drop',0,1),(261,92,67,'drop',0,1),(262,92,68,'pick',0,1),(263,93,69,'pick',0,1),(264,93,70,'drop',0,1),(265,94,69,'drop',0,1),(266,94,70,'pick',0,1),(267,95,42,'pick',0,1),(268,95,71,'drop',0,1),(269,96,42,'drop',0,1),(270,96,71,'pick',0,1),(271,97,42,'pick',2,1),(272,97,39,'drop',4,1),(273,98,42,'drop',4,1),(274,98,39,'pick',2,1),(275,99,42,'pick',0,1),(276,99,43,'drop',0,1),(277,100,42,'drop',0,1),(278,100,43,'pick',0,1),(279,61,73,'park-start',1,1),(280,62,73,'park-end',8,1),(281,62,72,'park-start',1,1),(282,61,72,'park-end',8,1),(283,61,74,'stop',5,1),(284,62,74,'stop',4,1),(285,101,45,'pick',2,1),(286,101,75,'drop',6,1),(287,102,45,'drop',6,1),(288,102,75,'pick',2,1),(289,101,73,'park-start',1,1),(290,102,73,'park-end',7,1),(291,102,76,'park-start',1,1),(292,101,76,'park-end',7,1),(293,61,47,'pick',3,0),(294,62,47,'drop',6,1),(295,101,77,'stop',4,1),(296,102,77,'stop',4,1),(297,101,47,'pick',3,1),(298,102,47,'drop',5,1),(299,102,64,'pick',3,1),(300,101,64,'drop',5,1),(301,63,45,'pick',2,1),(302,64,45,'drop',3,1),(303,103,38,'pick',1,1),(304,103,79,'drop',2,1),(305,104,38,'drop',2,1),(306,104,79,'pick',1,1),(307,97,79,'stop',3,1),(308,98,79,'stop',3,1),(309,97,81,'park-start',1,1),(310,98,81,'park-end',5,1),(311,98,80,'park-start',1,1),(312,97,80,'park-end',5,1),(313,105,82,'pick',0,1),(314,105,83,'drop',0,1),(315,106,82,'drop',0,1),(316,106,83,'pick',0,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_manager`
--

LOCK TABLES `system_manager` WRITE;
/*!40000 ALTER TABLE `system_manager` DISABLE KEYS */;
INSERT INTO `system_manager` VALUES (1,'Vũng Tàu','/api/static/images/1718553050117-LeThiKimLe.jpg','3020201010103',87,'2024-03-24'),(2,'Hồ Chí Minh','/api/static/images/1717808497111-anh-chipi-16.jpg','056897383433',121,'2024-06-08'),(3,'Hồ Chí Minh','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','056897381313',122,'2024-06-08'),(4,'Hồ Chí Minh','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','056897381414',123,'2024-06-08'),(5,'Hồ Chí Minh','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','056897381415',124,'2024-06-08'),(6,'Hồ Chí Minh','/api/images/1715520603997-8a7f35bf32c98be58464948536016e37.jpg','056897381416',125,'2024-06-08');
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_transaction`
--

LOCK TABLES `system_transaction` WRITE;
/*!40000 ALTER TABLE `system_transaction` DISABLE KEYS */;
INSERT INTO `system_transaction` VALUES (1,'Thanh toán','14437538',782000,'2024-05-31 05:58:40','VNPay'),(2,'Thanh toán','14437540',2040000,'2024-05-31 06:01:45','VNPay'),(3,'Thanh toán','14440613',2108000,'2024-06-02 22:04:20','VNPay'),(4,'Thanh toán','14450087',4522000,'2024-06-08 23:17:22','VNPay'),(5,'Thanh toán','14450088',7140000,'2024-06-08 23:17:49','VNPay'),(6,'Thanh toán','14450438',374000,'2024-06-09 15:19:30','VNPay'),(7,'Thanh toán','14450446',1020000,'2024-06-09 15:24:31','VNPay'),(8,'Thanh toán','14450454',144000,'2024-06-09 15:33:20','VNPay'),(9,'Thanh toán','14450459',3060000,'2024-06-09 15:35:13','VNPay'),(10,'Thanh toán','14450470',255000,'2024-06-09 15:45:02','VNPay'),(11,'Thanh toán','14450481',2040000,'2024-06-09 15:55:32','VNPay'),(12,'Thanh toán','14450494',2108000,'2024-06-09 16:08:57','VNPay'),(13,'Thanh toán','14450518',2040000,'2024-06-09 16:29:53','VNPay'),(14,'Hoàn tiền','20468095',1400000,'2024-06-22 23:06:30','VNPay'),(15,'Hoàn tiền','76406769',0,'2024-06-22 23:22:57','VNPay'),(16,'Hoàn tiền','82143812',0,'2024-06-22 23:23:00','VNPay'),(17,'Hoàn tiền','32165353',0,'2024-06-22 23:29:15','VNPay'),(18,'Hoàn tiền','69775221',0,'2024-06-22 23:29:20','VNPay'),(19,'Hoàn tiền','55373129',0,'2024-06-22 23:30:02','VNPay'),(20,'Hoàn tiền','93518980',0,'2024-06-22 23:31:21','VNPay'),(21,'Hoàn tiền','79842204',0,'2024-06-22 23:33:15','VNPay'),(22,'Hoàn tiền','25650971',0,'2024-06-22 23:35:27','VNPay'),(23,'Hoàn tiền','72355529',192000,'2024-06-22 23:39:22','VNPay'),(24,'Hoàn tiền','07468756',3120000,'2024-06-22 23:39:39','VNPay'),(25,'Thanh toán','pi_3PcWf4GlLuaJqSOV1GhOqpJu',2108000,'2024-07-15 01:06:22','Stripe'),(26,'Thanh toán','pi_3PcX13GlLuaJqSOV0lUmopK8',2108000,'2024-07-15 01:28:42','Stripe'),(27,'Thanh toán','pi_3PcXBMGlLuaJqSOV0stXbFNi',1020000,'2024-07-15 01:30:18','Stripe'),(28,'Thanh toán','pi_3PcXBvGlLuaJqSOV0l9m5K1P',2108000,'2024-07-15 01:31:45','Stripe'),(29,'Thanh toán','pi_3PcXBvGlLuaJqSOV0l9m5K1P',2108000,'2024-07-15 01:34:27','Stripe'),(30,'Thanh toán','pi_3PcXNMGlLuaJqSOV0fVtkN1Z',2040000,'2024-07-15 01:44:06','Stripe'),(31,'Thanh toán','pi_3PcXhfGlLuaJqSOV08cbS7pu',2108000,'2024-07-15 02:03:38','Stripe');
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
) ENGINE=InnoDB AUTO_INCREMENT=1047 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (438,_binary '',789,625,300000,'GH1PFJ','B03','Đã thanh toán',NULL),(439,_binary '',790,625,300000,'GH1PFJ','B06','Đã thanh toán',NULL),(440,_binary '',791,625,300000,'GH1PFJ','B09','Đã thanh toán',NULL),(441,_binary '',792,643,120000,'GDNQC5','B03','Đã thanh toán',NULL),(442,_binary '',793,643,120000,'GDNQC5','B06','Đã thanh toán',NULL),(NULL,_binary '\0',794,792,310000,'KQBBXF','B03','Đã hủy',NULL),(NULL,_binary '\0',795,792,310000,'KQBBXF','B06','Đã hủy',NULL),(NULL,_binary '\0',796,791,310000,'R5I1UZ','B03','Đã hủy',NULL),(NULL,_binary '\0',797,791,310000,'R5I1UZ','B06','Đã hủy',NULL),(NULL,_binary '\0',798,792,310000,'LRA6AM','B10','Đã hủy',NULL),(NULL,_binary '\0',799,792,310000,'LRA6AM','B13','Đã hủy',NULL),(NULL,_binary '\0',800,791,310000,'06POWF','B13','Đã hủy',NULL),(NULL,_binary '\0',801,791,310000,'06POWF','B16','Đã hủy',NULL),(NULL,_binary '\0',802,792,310000,'VMBTXW','B20','Đã hủy',NULL),(NULL,_binary '\0',803,792,310000,'VMBTXW','B17','Đã hủy',NULL),(NULL,_binary '\0',804,791,310000,'38UOV4','B05','Đã hủy',NULL),(NULL,_binary '\0',805,791,310000,'38UOV4','B08','Đã hủy',NULL),(NULL,_binary '\0',806,793,310000,'34PGUH','B07','Chờ thanh toán',NULL),(NULL,_binary '\0',807,793,310000,'34PGUH','B10','Chờ thanh toán',NULL),(NULL,_binary '\0',808,798,310000,'G6C3N4','B01','Chờ thanh toán',NULL),(NULL,_binary '\0',809,798,310000,'G6C3N4','B04','Chờ thanh toán',NULL),(NULL,_binary '\0',810,794,310000,'PZBCXL','B20','Chờ thanh toán',NULL),(NULL,_binary '\0',811,807,310000,'60JNXU','B17','Chờ thanh toán',NULL),(NULL,_binary '\0',812,794,310000,'9TCIJI','B18','Chờ thanh toán',NULL),(NULL,_binary '\0',813,799,310000,'OJWQX4','B12','Chờ thanh toán',NULL),(NULL,_binary '\0',814,794,310000,'3K6X8P','B08','Chờ thanh toán',NULL),(NULL,_binary '\0',815,799,310000,'JTK1ZI','B14','Chờ thanh toán',NULL),(NULL,_binary '\0',816,792,310000,'K4QE3R','B05','Đã hủy',NULL),(NULL,_binary '\0',817,792,310000,'KJK668','B03','Chờ thanh toán',NULL),(NULL,_binary '\0',818,794,310000,'TRVUEE','B11','Chờ thanh toán',NULL),(NULL,_binary '\0',819,794,310000,'759HKD','B15','Chờ thanh toán',NULL),(NULL,_binary '\0',820,796,310000,'BG5352','B03','Chờ thanh toán',NULL),(NULL,_binary '\0',822,796,310000,'RQVRYF','B12','Đã hủy',NULL),(443,_binary '',823,796,310000,'ZVR3N2','B06','Đã thanh toán',NULL),(NULL,_binary '\0',824,795,310000,'IGBMLW','B03','Chờ thanh toán',NULL),(NULL,_binary '\0',825,796,310000,'4F86CD','B21','Chờ thanh toán',NULL),(NULL,_binary '\0',826,795,310000,'BPSNIK','B21','Chờ thanh toán',NULL),(NULL,_binary '\0',827,796,310000,'GIRBJU','B12','Chờ thanh toán',NULL),(NULL,_binary '\0',828,795,310000,'EVUV6O','B12','Chờ thanh toán',NULL),(450,_binary '',829,796,310000,'RHH570','B09','Đã thanh toán',NULL),(452,_binary '',830,795,310000,'4I6FL7','B06','Đã thanh toán',NULL),(453,_binary '',831,796,310000,'DCAH25','B17','Đã thanh toán',NULL),(455,_binary '',832,795,310000,'MVDZCT','B11','Đã thanh toán',NULL),(456,_binary '',833,796,310000,'MW1JFG','B05','Đã thanh toán',NULL),(458,_binary '',834,795,310000,'UCXWMK','B08','Đã thanh toán',NULL),(NULL,_binary '\0',835,796,310000,'AZWBOR','B08','Chờ thanh toán',NULL),(NULL,_binary '\0',836,795,310000,'ND962V','B05','Chờ thanh toán',NULL),(459,_binary '',837,796,310000,'O9397I','B15','Đã thanh toán',NULL),(460,_binary '',838,795,310000,'T58KOS','B09','Đã thanh toán',NULL),(461,_binary '',839,796,310000,'99KEFH','B01','Đã thanh toán',NULL),(462,_binary '',840,796,310000,'99KEFH','B02','Đã thanh toán',NULL),(463,_binary '',841,795,310000,'CS935J','B01','Đã thanh toán',NULL),(464,_binary '',842,795,310000,'CS935J','B02','Đã thanh toán',NULL),(465,_binary '',843,798,310000,'7CTYZZ','B09','Đã thanh toán',NULL),(466,_binary '',844,800,310000,'SB6SLY','B01','Đã thanh toán',NULL),(467,_binary '',845,800,310000,'SB6SLY','B04','Đã thanh toán',NULL),(468,_binary '',846,800,310000,'SB6SLY','B07','Đã thanh toán',NULL),(469,_binary '',847,802,310000,'Q06XNW','B07','Đã thanh toán',NULL),(470,_binary '',848,802,310000,'Q06XNW','B10','Đã thanh toán',NULL),(471,_binary '',849,802,310000,'Q06XNW','B13','Đã thanh toán',NULL),(472,_binary '',850,801,310000,'6VPB2F','B03','Đã thanh toán',NULL),(473,_binary '',851,801,310000,'6VPB2F','B06','Đã thanh toán',NULL),(474,_binary '',852,810,310000,'II2O64','B12','Đã thanh toán',NULL),(475,_binary '',853,810,310000,'II2O64','B09','Đã thanh toán',NULL),(476,_binary '',854,812,310000,'QIALUF','A03','Đã thanh toán',NULL),(477,_binary '',855,812,310000,'QIALUF','A06','Đã thanh toán',NULL),(478,_binary '',856,811,310000,'HE28SP','A09','Đã thanh toán',NULL),(479,_binary '',857,811,310000,'HE28SP','B07','Đã thanh toán',NULL),(480,_binary '',858,809,310000,'JKS99H','B01','Đã thanh toán',NULL),(481,_binary '',859,809,310000,'JKS99H','B02','Đã thanh toán',NULL),(482,_binary '',860,810,310000,'CAN0QX','B01','Đã thanh toán',NULL),(483,_binary '',861,810,310000,'CAN0QX','B02','Đã thanh toán',NULL),(484,_binary '',862,809,310000,'IS2W08','B04','Đã thanh toán',NULL),(485,_binary '',863,809,310000,'IS2W08','B05','Đã thanh toán',NULL),(486,_binary '',864,810,310000,'KI0D3Z','B04','Đã thanh toán',NULL),(487,_binary '',865,810,310000,'KI0D3Z','B05','Đã thanh toán',NULL),(488,_binary '',866,809,310000,'YDS828','B08','Đã thanh toán',NULL),(489,_binary '',867,809,310000,'YDS828','B11','Đã thanh toán',NULL),(490,_binary '',868,809,310000,'YDS828','B14','Đã thanh toán',NULL),(491,_binary '',869,810,310000,'4G57IR','B11','Đã thanh toán',NULL),(492,_binary '',870,810,310000,'4G57IR','B14','Đã thanh toán',NULL),(493,_binary '',871,810,310000,'4G57IR','B17','Đã thanh toán',NULL),(494,_binary '',872,810,310000,'4G57IR','B20','Đã thanh toán',NULL),(495,_binary '',873,814,310000,'YCJUVD','B03','Đã thanh toán',NULL),(496,_binary '',874,813,310000,'QKUJ99','B03','Đã thanh toán',NULL),(NULL,_binary '\0',875,814,310000,'KT6ZGZ','B02','Đã hủy',NULL),(NULL,_binary '\0',876,813,310000,'WKWB9N','B02','Đã hủy',NULL),(NULL,_binary '\0',877,814,310000,'D9O8ZD','B01','Đã hủy',NULL),(NULL,_binary '\0',878,813,310000,'A18W68','B01','Đã hủy',NULL),(497,_binary '',879,809,310000,'GZVGLH','B09','Đã thanh toán',NULL),(498,_binary '',880,809,310000,'GZVGLH','B12','Đã thanh toán',NULL),(499,_binary '',881,816,310000,'S912VK','B09','Đã thanh toán',NULL),(500,_binary '',882,816,310000,'S912VK','B12','Đã thanh toán',NULL),(NULL,_binary '\0',883,809,310000,'CJD5WX','B07','Chờ thanh toán',NULL),(NULL,_binary '\0',884,809,310000,'CJD5WX','B10','Chờ thanh toán',NULL),(NULL,_binary '\0',885,816,310000,'8TE5LG','B01','Chờ thanh toán',NULL),(NULL,_binary '\0',886,816,310000,'8TE5LG','B04','Chờ thanh toán',NULL),(501,_binary '',887,809,310000,'IL8KI2','B03','Đã thanh toán',NULL),(502,_binary '',888,816,310000,'SRZ83I','B03','Đã thanh toán',NULL),(503,_binary '',889,812,310000,'7DB9RG','B01','Đã thanh toán',NULL),(504,_binary '',890,812,310000,'7DB9RG','B04','Đã thanh toán',NULL),(505,_binary '',891,811,310000,'4A29YT','B01','Đã thanh toán',NULL),(506,_binary '',892,811,310000,'4A29YT','B04','Đã thanh toán',NULL),(507,_binary '',893,812,310000,'KPX0LS','B02','Đã thanh toán',NULL),(508,_binary '',894,811,310000,'YAVQQV','B02','Đã thanh toán',NULL),(509,_binary '',895,812,310000,'WQUWFY','B05','Đã thanh toán',NULL),(510,_binary '',896,812,310000,'PQN1Y3','B15','Đã thanh toán',NULL),(511,_binary '',897,812,310000,'PQN1Y3','B18','Đã thanh toán',NULL),(NULL,_binary '\0',898,811,310000,'EJB3AU','B09','Chờ thanh toán',NULL),(NULL,_binary '\0',899,811,310000,'EJB3AU','B12','Chờ thanh toán',NULL),(NULL,_binary '\0',900,812,310000,'9KSRAZ','B09','Đã hủy',NULL),(NULL,_binary '\0',901,812,310000,'9KSRAZ','B12','Đã hủy',NULL),(NULL,_binary '\0',902,811,310000,'OAHDNK','A18','Đã hủy',NULL),(512,_binary '',903,825,310000,'7NWVMW','B03','Đã hủy',NULL),(513,_binary '',904,825,310000,'7NWVMW','B06','Đã thanh toán',NULL),(514,_binary '',905,825,310000,'7NWVMW','B09','Đã thanh toán',NULL),(515,_binary '',906,825,310000,'7NWVMW','B12','Đã thanh toán',NULL),(516,_binary '',907,825,310000,'7NWVMW','B15','Đã thanh toán',NULL),(NULL,_binary '\0',908,751,300000,'WKBI8D','A03','Đã thanh toán',NULL),(NULL,_binary '\0',909,751,300000,'WKBI8D','A05','Đã thanh toán',NULL),(NULL,_binary '\0',910,751,300000,'WKBI8D','A04','Đã thanh toán',NULL),(NULL,_binary '\0',911,751,300000,'WKBI8D','A06','Đã thanh toán',NULL),(NULL,_binary '\0',912,751,300000,'WKBI8D','A07','Đã thanh toán',NULL),(NULL,_binary '\0',913,751,300000,'WKBI8D','A08','Đã thanh toán',NULL),(NULL,_binary '\0',914,751,300000,'WKBI8D','A09','Đã thanh toán',NULL),(NULL,_binary '\0',915,751,300000,'WKBI8D','A12','Đã thanh toán',NULL),(NULL,_binary '\0',916,751,300000,'WKBI8D','A11','Đã thanh toán',NULL),(NULL,_binary '\0',917,751,300000,'WKBI8D','A10','Đã thanh toán',NULL),(NULL,_binary '\0',918,751,300000,'WKBI8D','A13','Đã thanh toán',NULL),(NULL,_binary '\0',919,751,300000,'WKBI8D','A14','Đã thanh toán',NULL),(NULL,_binary '\0',920,751,300000,'WKBI8D','A15','Đã thanh toán',NULL),(NULL,_binary '\0',921,751,300000,'WKBI8D','A18','Đã thanh toán',NULL),(NULL,_binary '\0',922,751,300000,'WKBI8D','A17','Đã thanh toán',NULL),(NULL,_binary '\0',923,751,300000,'WKBI8D','A16','Đã thanh toán',NULL),(NULL,_binary '\0',924,751,300000,'WKBI8D','A19','Đã thanh toán',NULL),(NULL,_binary '\0',925,751,300000,'WKBI8D','A20','Đã thanh toán',NULL),(NULL,_binary '\0',926,751,300000,'WKBI8D','A21','Đã thanh toán',NULL),(NULL,_binary '\0',927,751,300000,'WKBI8D','B02','Đã thanh toán',NULL),(537,_binary '\0',928,832,310000,'H5V2UV','A03','Đã thanh toán',NULL),(538,_binary '\0',929,899,350000,'1Y082B','B07','Đã thanh toán',NULL),(539,_binary '\0',930,899,350000,'1Y082B','B08','Đã thanh toán',NULL),(540,_binary '\0',931,899,350000,'1Y082B','B09','Đã thanh toán',NULL),(541,_binary '\0',932,933,310000,'F31Z37','B03','Đã thanh toán',NULL),(542,_binary '\0',933,933,310000,'F31Z37','B06','Đã thanh toán',NULL),(543,_binary '\0',934,933,310000,'F31Z37','B09','Đã thanh toán',NULL),(544,_binary '\0',935,933,310000,'UNW1T7','A04','Đã thanh toán',NULL),(545,_binary '\0',936,933,310000,'UNW1T7','A05','Đã thanh toán',NULL),(546,_binary '\0',937,933,310000,'UNW1T7','A06','Đã thanh toán',NULL),(547,_binary '\0',938,933,310000,'UNW1T7','A03','Đã thanh toán',NULL),(548,_binary '\0',939,933,310000,'UNW1T7','A07','Đã thanh toán',NULL),(549,_binary '\0',940,933,310000,'UNW1T7','A08','Đã thanh toán',NULL),(550,_binary '\0',941,933,310000,'UNW1T7','A09','Đã thanh toán',NULL),(551,_binary '\0',942,899,350000,'HK45JJ','A01','Đã thanh toán',NULL),(552,_binary '\0',943,899,350000,'HK45JJ','B01','Đã thanh toán',NULL),(553,_binary '\0',944,899,350000,'HK45JJ','C01','Đã thanh toán',NULL),(554,_binary '\0',945,899,350000,'HK45JJ','A02','Đã thanh toán',NULL),(555,_binary '\0',946,899,350000,'HK45JJ','B02','Đã thanh toán',NULL),(556,_binary '\0',947,899,350000,'HK45JJ','C02','Đã thanh toán',NULL),(557,_binary '\0',948,899,350000,'HK45JJ','A03','Đã thanh toán',NULL),(558,_binary '\0',949,899,350000,'HK45JJ','B03','Đã thanh toán',NULL),(559,_binary '\0',950,899,350000,'HK45JJ','C03','Đã thanh toán',NULL),(560,_binary '\0',951,899,350000,'HK45JJ','A04','Đã thanh toán',NULL),(561,_binary '\0',952,899,350000,'HK45JJ','B04','Đã thanh toán',NULL),(562,_binary '\0',953,899,350000,'HK45JJ','C04','Đã thanh toán',NULL),(563,_binary '\0',954,625,300000,'BGHZ1M','B12','Đã thanh toán',NULL),(564,_binary '\0',955,625,300000,'BGHZ1M','B15','Đã thanh toán',NULL),(565,_binary '\0',956,625,300000,'BGHZ1M','B18','Đã thanh toán',NULL),(566,_binary '\0',957,625,300000,'BGHZ1M','B17','Đã thanh toán',NULL),(567,_binary '\0',958,625,300000,'BGHZ1M','B14','Đã thanh toán',NULL),(568,_binary '\0',959,625,300000,'9ALMYR','A03','Đã thanh toán',NULL),(569,_binary '\0',960,625,300000,'9ALMYR','A06','Đã thanh toán',NULL),(570,_binary '\0',961,625,300000,'9ALMYR','A05','Đã thanh toán',NULL),(571,_binary '\0',962,625,300000,'9ALMYR','A04','Đã thanh toán',NULL),(572,_binary '\0',963,625,300000,'9ALMYR','A07','Đã thanh toán',NULL),(573,_binary '\0',964,1003,350000,'RZ9DVW','C01','Đã thanh toán',NULL),(574,_binary '\0',965,1003,350000,'RZ9DVW','B01','Đã thanh toán',NULL),(575,_binary '\0',966,1003,350000,'RZ9DVW','A01','Đã thanh toán',NULL),(576,_binary '\0',967,1003,350000,'RZ9DVW','A02','Đã thanh toán',NULL),(577,_binary '\0',968,1003,350000,'RZ9DVW','B02','Đã thanh toán',NULL),(578,_binary '\0',969,954,310000,'R3JN92','B02','Đã thanh toán',NULL),(579,_binary '',970,964,310000,'0D8V95','A03','Đã thanh toán',NULL),(580,_binary '\0',971,964,310000,'0D8V95','A06','Đã thanh toán',NULL),(581,_binary '\0',972,964,310000,'0D8V95','A09','Đã thanh toán',NULL),(582,_binary '\0',973,964,310000,'0D8V95','A12','Đã thanh toán',NULL),(583,_binary '\0',974,964,310000,'0D8V95','A15','Đã thanh toán',NULL),(NULL,_binary '\0',975,1134,310000,'LGR9L7','B03','Đã hủy',NULL),(NULL,_binary '\0',976,1134,310000,'LGR9L7','B06','Đã hủy',NULL),(NULL,_binary '\0',977,1134,310000,'LGR9L7','B09','Đã hủy',NULL),(NULL,_binary '\0',978,1134,310000,'LGR9L7','A21','Đã hủy',NULL),(NULL,_binary '\0',979,1134,310000,'VROWT3','B03','Chờ thanh toán',NULL),(NULL,_binary '\0',980,1134,310000,'VROWT3','B06','Chờ thanh toán',NULL),(NULL,_binary '\0',981,1134,310000,'VROWT3','B09','Chờ thanh toán',NULL),(NULL,_binary '\0',982,1134,310000,'VROWT3','B12','Chờ thanh toán',NULL),(584,_binary '\0',983,1135,310000,'ODJVRS','B03','Đã thanh toán',NULL),(585,_binary '\0',984,1135,310000,'ODJVRS','B06','Đã thanh toán',NULL),(586,_binary '\0',985,1135,310000,'ODJVRS','B09','Đã thanh toán',NULL),(NULL,_binary '\0',986,1079,310000,'FPBFLI','B06','Chờ thanh toán',NULL),(NULL,_binary '\0',987,1079,310000,'FPBFLI','B09','Chờ thanh toán',NULL),(NULL,_binary '\0',988,1079,310000,'FPBFLI','B12','Chờ thanh toán',NULL),(NULL,_binary '\0',989,1079,310000,'7V9MKQ','B04','Chờ thanh toán',NULL),(NULL,_binary '\0',990,1079,310000,'7V9MKQ','B01','Chờ thanh toán',NULL),(NULL,_binary '\0',991,1079,310000,'7V9MKQ','B02','Chờ thanh toán',NULL),(NULL,_binary '\0',992,1079,310000,'XP2BV7','B15','Chờ thanh toán',NULL),(NULL,_binary '\0',993,1079,310000,'XP2BV7','B18','Chờ thanh toán',NULL),(NULL,_binary '\0',994,1079,310000,'ESPVKU','B14','Chờ thanh toán',NULL),(NULL,_binary '\0',995,1079,310000,'ESPVKU','B17','Chờ thanh toán',NULL),(NULL,_binary '\0',996,1079,310000,'YPOBH3','B05','Chờ thanh toán',NULL),(NULL,_binary '\0',997,1079,310000,'YPOBH3','B08','Chờ thanh toán',NULL),(NULL,_binary '\0',998,1079,310000,'YPOBH3','B11','Chờ thanh toán',NULL),(NULL,_binary '\0',999,1079,310000,'22B05T','B03','Đã hủy',NULL),(NULL,_binary '\0',1000,1079,310000,'22B05T','A03','Đã hủy',NULL),(NULL,_binary '\0',1001,1079,310000,'22B05T','A06','Đã hủy',NULL),(NULL,_binary '\0',1002,1079,310000,'22B05T','A09','Đã hủy',NULL),(NULL,_binary '\0',1003,1079,310000,'22B05T','A12','Đã hủy',NULL),(604,_binary '\0',1004,1079,310000,'R6I55A','A09','Đã thanh toán',NULL),(605,_binary '\0',1005,1079,310000,'R6I55A','A12','Đã thanh toán',NULL),(606,_binary '\0',1006,1079,310000,'R6I55A','A15','Đã thanh toán',NULL),(NULL,_binary '\0',1007,1079,310000,'3OK9P0','A06','Đã hủy',NULL),(NULL,_binary '\0',1008,1079,310000,'3OK9P0','A05','Đã hủy',NULL),(NULL,_binary '\0',1009,1079,310000,'3OK9P0','A08','Đã hủy',NULL),(587,_binary '\0',1010,1079,310000,'PH9BYM','A03','Đã thanh toán',NULL),(588,_binary '\0',1011,1079,310000,'PH9BYM','A06','Đã thanh toán',NULL),(589,_binary '\0',1012,1079,310000,'6DVR8I','B07','Đã thanh toán',NULL),(590,_binary '\0',1013,1079,310000,'6DVR8I','B10','Đã thanh toán',NULL),(591,_binary '\0',1014,1079,310000,'6DVR8I','B13','Đã thanh toán',NULL),(592,_binary '\0',1015,1079,310000,'6DVR8I','B16','Đã thanh toán',NULL),(593,_binary '\0',1016,1079,310000,'6DVR8I','B19','Đã thanh toán',NULL),(NULL,_binary '\0',1017,1081,310000,'OR9VSH','B03','Đã hủy',NULL),(NULL,_binary '\0',1018,1081,310000,'OR9VSH','B06','Đã hủy',NULL),(NULL,_binary '\0',1019,1081,310000,'OR9VSH','B09','Đã hủy',NULL),(NULL,_binary '\0',1020,1081,310000,'OR9VSH','B12','Đã hủy',NULL),(NULL,_binary '\0',1021,1081,310000,'OR9VSH','B15','Đã hủy',NULL),(NULL,_binary '\0',1022,1087,310000,'C492DZ','A04','Đã hủy',NULL),(NULL,_binary '\0',1023,1087,310000,'C492DZ','A07','Đã hủy',NULL),(NULL,_binary '\0',1024,1087,310000,'C492DZ','A10','Đã hủy',NULL),(NULL,_binary '\0',1025,1087,310000,'C492DZ','A13','Đã hủy',NULL),(NULL,_binary '\0',1026,1087,310000,'C492DZ','A16','Đã hủy',NULL),(594,_binary '\0',1027,1079,310000,'INMQZL','A05','Đã thanh toán',NULL),(595,_binary '\0',1028,1079,310000,'INMQZL','A08','Đã thanh toán',NULL),(596,_binary '\0',1029,1079,310000,'INMQZL','A11','Đã thanh toán',NULL),(597,_binary '\0',1030,1079,310000,'INMQZL','A14','Đã thanh toán',NULL),(598,_binary '\0',1031,1079,310000,'INMQZL','A17','Đã thanh toán',NULL),(599,_binary '\0',1032,1089,310000,'E0SR9T','A03','Đã thanh toán',NULL),(600,_binary '\0',1033,1089,310000,'E0SR9T','A06','Đã thanh toán',NULL),(601,_binary '\0',1034,1089,310000,'E0SR9T','A09','Đã thanh toán',NULL),(602,_binary '\0',1035,1089,310000,'E0SR9T','A12','Đã thanh toán',NULL),(603,_binary '\0',1036,1089,310000,'E0SR9T','A15','Đã thanh toán',NULL),(607,_binary '\0',1037,1079,310000,'4EE8DD','A04','Đã thanh toán',NULL),(608,_binary '\0',1038,1079,310000,'4EE8DD','A07','Đã thanh toán',NULL),(609,_binary '\0',1039,1079,310000,'4EE8DD','A10','Đã thanh toán',NULL),(610,_binary '\0',1040,1079,310000,'4EE8DD','A13','Đã thanh toán',NULL),(611,_binary '\0',1041,1079,310000,'4EE8DD','A16','Đã thanh toán',NULL),(612,_binary '\0',1042,1087,310000,'1JRCV3','A04','Đã thanh toán',NULL),(613,_binary '\0',1043,1087,310000,'1JRCV3','A07','Đã thanh toán',NULL),(614,_binary '\0',1044,1087,310000,'1JRCV3','A10','Đã thanh toán',NULL),(615,_binary '\0',1045,1087,310000,'1JRCV3','A13','Đã thanh toán',NULL),(616,_binary '\0',1046,1087,310000,'1JRCV3','A16','Đã thanh toán',NULL);
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
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tranid_idx` (`system_transaction_id`),
  KEY `compayd_key_idx` (`company_id`),
  CONSTRAINT `compayd_key` FOREIGN KEY (`company_id`) REFERENCES `bus_company` (`id`),
  CONSTRAINT `tranid` FOREIGN KEY (`system_transaction_id`) REFERENCES `system_transaction` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_sale`
--

LOCK TABLES `ticket_sale` WRITE;
/*!40000 ALTER TABLE `ticket_sale` DISABLE KEYS */;
INSERT INTO `ticket_sale` VALUES (91,'2024-05-01','2024-05-31',0,0,19,11),(92,'2024-05-01','2024-05-31',0,0,18,12),(93,'2024-05-01','2024-05-31',0,0,17,13),(94,'2024-05-01','2024-05-31',0,0,16,14),(95,'2024-05-01','2024-05-31',0,0,NULL,15),(96,'2024-05-01','2024-05-31',0,0,NULL,16),(97,'2024-05-01','2024-05-31',0,0,15,17),(98,'2024-05-01','2024-05-31',1750000,1400000,14,18),(99,'2024-05-01','2024-05-31',0,0,NULL,19),(100,'2024-04-01','2024-04-30',3900000,3120000,24,11),(101,'2024-04-01','2024-04-30',240000,192000,23,12),(102,'2024-04-01','2024-04-30',0,0,22,13),(103,'2024-04-01','2024-04-30',0,0,21,14),(104,'2024-04-01','2024-04-30',0,0,20,15),(105,'2024-04-01','2024-04-30',0,0,NULL,16),(106,'2024-04-01','2024-04-30',0,0,NULL,17),(107,'2024-04-01','2024-04-30',0,0,NULL,18),(108,'2024-04-01','2024-04-30',0,0,NULL,19);
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
) ENGINE=InnoDB AUTO_INCREMENT=267 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (900000,224,'2024-04-27 08:53:27.000000','VNPay','Thanh toán','14394511'),(240000,225,'2024-04-27 09:15:49.000000','VNPay','Thanh toán','14394519'),(310000,226,'2024-06-02 13:24:32.000000','VNPay','Thanh toán','14440138'),(930000,229,'2024-06-02 13:51:03.000000','VNPay','Thanh toán','14440165'),(930000,230,'2024-06-02 13:53:44.000000','VNPay','Thanh toán','14440170'),(930000,231,'2024-06-02 14:00:12.000000','VNPay','Thanh toán','14440174'),(620000,232,'2024-06-02 14:16:44.000000','VNPay','Thanh toán','14440189'),(1240000,233,'2024-06-02 14:18:42.000000','VNPay','Thanh toán','14440192'),(310000,234,'2024-06-04 05:49:27.000000','VNPay','Thanh toán','14442474'),(1860000,235,'2024-06-04 05:51:07.000000','VNPay','Thanh toán','14442475'),(620000,236,'2024-06-04 05:52:55.000000','VNPay','Thanh toán','14442476'),(620000,237,'2024-06-04 05:53:46.000000','VNPay','Thanh toán','14442477'),(1240000,238,'2024-06-04 22:07:01.000000','VNPay','Thanh toán','14443867'),(1240000,239,'2024-06-09 20:54:21.000000','VNPay','Thanh toán','14450784'),(1240000,240,'2024-06-09 21:19:57.000000','VNPay','Thanh toán','14450825'),(2170000,241,'2024-06-09 21:21:41.000000','VNPay','Thanh toán','14450830'),(620000,242,'2024-06-09 21:24:57.000000','VNPay','Thanh toán','14450834'),(1240000,243,'2024-06-09 21:37:31.000000','VNPay','Thanh toán','14450858'),(620000,244,'2024-06-09 22:00:30.000000','VNPay','Thanh toán','14450886'),(1240000,245,'2024-06-09 22:07:44.000000','VNPay','Thanh toán','14450904'),(620000,246,'2024-06-09 22:09:53.000000','VNPay','Thanh toán','14450905'),(310000,247,'2024-06-09 23:00:56.000000','VNPay','Thanh toán','14450970'),(620000,248,'2024-06-09 23:28:14.000000','VNPay','Thanh toán','14451014'),(1550000,249,'2024-06-17 21:53:31.000000','VNPay','Thanh toán','14464003'),(217000,250,'2024-06-18 06:21:06.552143','VNPay','Hoàn tiền',NULL),(310000,251,'2024-06-22 00:54:17.948890','Cash','Thanh toán','34416203'),(1050000,252,'2024-06-22 12:28:06.000000','VNPay','Thanh toán','14472691'),(930000,253,'2024-06-22 12:28:49.000000','VNPay','Thanh toán','14472692'),(2170000,254,'2024-06-22 12:48:19.909527','Cash','Thanh toán','75514856'),(4200000,255,'2024-06-22 12:49:45.156662','Cash','Thanh toán','16009897'),(1500000,256,'2024-04-22 13:02:33.493741','VNPay','Thanh toán','67790437'),(1500000,257,'2024-04-22 13:10:47.164528','VNPay','Thanh toán','24765925'),(1750000,258,'2024-04-22 13:16:57.388858','Cash','Thanh toán','15877111'),(310000,259,'2024-06-28 05:16:38.000000','VNPay','Thanh toán','14482726'),(1550000,260,'2024-06-30 17:22:27.000000','VNPay','Thanh toán','14486254'),(930000,261,'2024-07-13 21:48:24.648585','VNPay','Thanh toán','48050393'),(620000,262,'2024-07-14 17:32:43.000000','Stripe','Thanh toán','pi_3PcPgaGlLuaJqSOV167WWrsq'),(1550000,263,'2024-07-14 17:34:23.000000','Stripe','Thanh toán','pi_3PcPkeGlLuaJqSOV096gK0nz'),(3100000,264,'2024-07-14 18:08:53.000000','Stripe','Thanh toán','pi_3PcQI8GlLuaJqSOV1KTxGgoN'),(930000,265,'2024-07-14 20:42:08.628047','VNPay','Thanh toán','42464945'),(3100000,266,'2024-07-14 23:35:14.000000','Stripe','Thanh toán','pi_3PcVNqGlLuaJqSOV1qpLJVxI');
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
) ENGINE=InnoDB AUTO_INCREMENT=1319 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportation_order`
--

LOCK TABLES `transportation_order` WRITE;
/*!40000 ALTER TABLE `transportation_order` DISABLE KEYS */;
INSERT INTO `transportation_order` VALUES (1,731,'Đã hoàn thành','2024-05-18 12:00:24',NULL,'','RKLAJ5MYMZ'),(2,735,'Đã hoàn thành','2024-05-18 20:37:30','2024-05-19 11:23:14','/api/images/1716092593756-lvc.jpg','IH0A462P7T'),(3,763,'Đã hoàn thành','2024-05-23 22:10:13',NULL,'','HAWDGECW6C'),(4,765,'Đã hoàn thành','2024-05-23 22:10:18',NULL,'','5OWT8X42YO'),(5,755,'Đã hoàn thành','2024-05-23 22:10:22',NULL,'','CULCV8NKBX'),(7,767,'Đã hoàn thành','2024-05-24 22:47:14','2024-05-26 23:26:14','/api/static/images/1716740774275-Screenshot_2024-05-05_085210.png','1B2DLJ9H3L'),(8,768,'Đã hoàn thành','2024-05-24 22:47:20',NULL,'','P64A3JXDTR'),(9,759,'Đã hoàn thành','2024-05-24 22:47:25',NULL,'','Y8GJYB2SUG'),(10,756,'Đã hoàn thành','2024-05-24 22:47:30',NULL,'','ALC62PH48I'),(11,770,'Đã hoàn thành','2024-05-25 22:14:20',NULL,'','GKHX2SQ0CK'),(12,772,'Đã hoàn thành','2024-05-25 22:14:27',NULL,'','7RMBJ49SBW'),(13,762,'Đã hoàn thành','2024-05-25 22:14:32','2024-05-28 22:28:01','/api/static/images/1716739531942-Screenshot_2024-05-05_102421.png','9L8H1A2ORC'),(14,761,'Đã hoàn thành','2024-05-25 22:14:36',NULL,'','L52TII00XF'),(15,778,'Đã hoàn thành','2024-05-28 06:07:41',NULL,'','MU3R53XHDQ'),(16,780,'Đã hoàn thành','2024-05-28 06:08:49',NULL,'','89O883DIT9'),(17,771,'Đã hoàn thành','2024-05-28 06:08:54',NULL,'','6JX57JTSHT'),(18,769,'Đã hoàn thành','2024-05-28 06:09:00','2024-05-28 23:25:34','/api/static/images/1716911305535-Screenshot_2024-04-20_222104.png','1JN5I0BWTX'),(19,781,'Đã hoàn thành','2024-05-28 20:55:05',NULL,'','CW05AISQB9'),(20,783,'Đã hoàn thành','2024-05-28 20:55:11',NULL,'','YT7THW9AJR'),(21,775,'Đã hoàn thành','2024-05-28 20:55:17',NULL,'','YM4P37D4FX'),(22,773,'Đã hoàn thành','2024-05-28 23:09:11',NULL,'','U1L7OSQ1WH'),(23,794,'Đã hoàn thành','2024-06-02 16:54:27',NULL,'','3CGGZ7K7TZ'),(24,791,'Đã hoàn thành','2024-06-02 16:55:10',NULL,'','DHCJ1Y63OY'),(25,808,'Đã hoàn thành','2024-06-08 20:40:15','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png','QD2KSVMSXW'),(26,804,'Đã hoàn thành','2024-06-08 23:38:55',NULL,'','U69LXYTI7L'),(27,809,'Đã hoàn thành','2024-06-08 23:44:40',NULL,'','PTLSPVE6C6'),(28,810,'Đã hoàn thành','2024-06-12 06:11:24',NULL,'','NZ99L3UCB9'),(29,815,'Đã hoàn thành','2024-06-12 06:11:26',NULL,'','DAJNMUI96J'),(30,814,'Đã hoàn thành','2024-06-12 06:11:29',NULL,'','XWLXZD9NXE'),(31,811,'Đã hoàn thành','2024-06-12 06:11:30',NULL,'','89FEVAK4VA'),(32,887,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(33,888,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(34,889,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(35,890,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(36,891,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(37,892,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(38,893,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(39,894,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(40,895,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(41,896,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(42,897,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(43,898,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(44,899,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(45,900,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(46,901,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(47,902,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(48,903,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(49,904,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(50,905,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(51,906,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(52,907,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(53,908,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1084,909,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1085,910,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1086,911,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1087,912,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1088,913,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1089,914,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1090,915,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1091,916,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1092,917,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1093,918,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1094,919,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1095,920,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1096,921,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1097,922,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1098,923,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1099,924,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1100,925,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1101,926,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1102,927,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1103,928,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1104,929,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1105,930,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1106,931,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1107,932,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1108,933,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1109,934,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1110,935,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1111,936,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1112,937,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1113,938,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1114,939,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1115,940,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1116,941,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1117,942,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1118,943,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1119,944,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1120,945,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1121,946,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1122,947,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1123,948,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1124,949,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1125,950,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1126,951,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1127,952,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1128,953,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1129,954,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1130,955,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1131,956,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1132,957,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1133,958,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1134,959,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1135,960,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1136,961,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1137,962,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1138,963,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1139,964,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1140,965,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1141,966,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1142,967,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1143,968,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1144,969,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1145,970,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1146,971,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1147,972,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1148,973,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1149,974,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1150,975,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1151,976,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1152,977,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1153,978,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1154,979,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1155,980,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1156,981,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1157,982,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1158,983,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1159,984,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1160,985,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1161,986,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1162,987,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1163,988,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1164,989,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1165,990,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1166,991,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1167,992,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1168,993,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1169,994,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1170,995,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1171,996,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1172,997,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1173,998,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1174,999,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1175,1000,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1176,1001,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1177,1002,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1178,1003,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1179,1004,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1180,1005,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1181,1006,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1182,1007,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1183,1008,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1184,1009,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1185,1010,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1186,1011,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1187,1012,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1188,1013,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1189,1014,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1190,1015,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1191,1016,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1192,1017,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1193,1018,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1194,1019,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1195,1020,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1196,1021,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1197,1022,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1198,1023,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1199,1024,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1200,1025,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1201,1026,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1202,1027,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1203,1028,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1204,1029,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1205,1030,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1206,751,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1207,625,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1208,626,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1209,627,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1210,628,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1211,629,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1212,630,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1213,631,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1214,632,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1215,633,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1216,634,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1217,635,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1218,636,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1219,637,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1220,638,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1221,639,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1222,640,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1223,641,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1224,642,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1225,643,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1226,644,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1227,645,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1228,646,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1229,647,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1230,648,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1231,649,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1232,650,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1233,651,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1234,652,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1235,653,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1236,654,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1237,655,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1238,656,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1239,657,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1240,658,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1241,659,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1242,660,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1243,661,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1244,662,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1245,663,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1246,664,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1247,665,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1248,666,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1249,667,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1250,668,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1251,669,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1252,670,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1253,671,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1254,672,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1255,673,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1256,674,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1257,675,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1258,676,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1259,677,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1260,678,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1261,679,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1262,680,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1263,681,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1264,682,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1265,683,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1266,684,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1267,685,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1268,686,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1269,687,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1270,688,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1271,689,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1272,690,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1273,691,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1274,692,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1275,693,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1276,694,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1277,695,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1278,696,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1279,697,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1280,698,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1281,699,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1282,700,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1283,701,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1284,702,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1285,703,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1286,704,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1287,705,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1288,706,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1289,707,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1290,708,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1291,709,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1292,710,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1293,711,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1294,712,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1295,713,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1296,714,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1297,715,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1298,716,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1299,717,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1300,718,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1301,719,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1302,720,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1303,721,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1304,722,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1305,723,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1306,724,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1307,725,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1308,726,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1309,727,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1310,728,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1311,729,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1312,730,'Đã hoàn thành','2024-06-12 06:11:30','2024-06-08 20:54:44','/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png',NULL),(1316,1059,'Đã nhận lệnh','2024-06-30 16:28:04','2024-06-30 16:34:37','/api/static/images/1719740077253-driver.jpg','VX2FEU1XJ5'),(1317,1055,'Xuất bến','2024-07-13 20:48:44','2024-07-14 02:11:03','/api/static/images/1720897862819-image.jpeg','1Q0AQ5NEJO'),(1318,1057,'Đã cấp lệnh','2024-07-13 20:48:46',NULL,'','FZ60XF3R90');
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
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (61,38,39,28,_binary '',1,11,300000,5,'BX Phía Nam Nha Trang - QL1A - QL13 - BX Miền Đông',6,450,'5079.1111.A'),(62,39,38,28,_binary '\0',1,11,300000,5,'BX Miền Đông - QL13 - QL1A - BX Phía Nam Nha Trang',6,450,'5079.1111.A'),(63,42,43,29,_binary '',1,12,120000,6,'BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - QL60 - QL53 - QL54 - BX Trà Vinh',1.8,135,'5084.1211.C'),(64,43,42,29,_binary '\0',1,12,120000,6,'BX Trà Vinh - QL54 - QL53 - QL60 - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây',1.8,135,'5084.1211.C'),(65,45,46,30,_binary '',1,13,0,NULL,'BX An Sương - QL22 - QL1 - QL1D - BX Quy Nhơn',8.7,649,'5077.1411.A'),(66,46,45,30,_binary '\0',1,13,0,NULL,'BX Quy Nhơn - QL1D - QL1 - QL22 - BX An Sương',8.7,649,'5077.1411.A'),(67,47,48,31,_binary '',1,13,0,NULL,'BX Cà Mau - QL1A - BX Ngã Tư Ga',4.9,366,'5069.1611.A'),(68,48,47,31,_binary '\0',1,13,0,NULL,'BX Ngã Tư Ga - QL1A - BX Cà Mau',4.9,366,'5069.1611.A'),(69,49,50,32,_binary '',1,13,0,NULL,'BX Miền Đông Mới - QL1A - BX Giáp Bát',23.3,1750,'2950.1117.A'),(70,50,49,32,_binary '\0',1,13,0,NULL,'BX Giáp Bát - QL1A - BX Miền Đông Mới',23.3,1750,'2950.1117.A'),(71,53,54,34,_binary '',1,15,0,NULL,'BX Việt Trì - QL2 - Ngã ba Kim Anh Vĩnh Yên - QL3 - BX Liên tỉnh TP Cao Bằng',4.2,314,'1119.1811.A'),(72,54,53,34,_binary '\0',1,15,0,NULL,'BX Liên tỉnh TP Cao Bằng - QL3 - Ngã ba Kim Anh Vĩnh Yên - QL2 - BX Việt Trì',4.2,314,'1119.1811.A'),(73,55,56,36,_binary '',1,14,0,NULL,'BX Cẩm Hải - QL18 - Cao tốc Hạ Long Hải Phòng - Cao tốc Hải Phòng Hà Nội - QL10 - ĐT458 - QL37B - BX Tiền Hải',2.7,200,'1417.2722.B'),(74,56,55,36,_binary '\0',1,14,0,NULL,'BX Tiền Hải - QL37B - ĐT458 - QL10 - Cao tốc Hải Phòng Hà Nội - Cao tốc Hạ Long Hải Phòng - QL18 - BX Cẩm Hải',2.7,200,'1417.2722.B'),(75,57,45,37,_binary '',1,14,0,NULL,'BX Nghĩa Hưng - TL490C - Đường Lê Đức Thọ - QL10 - QL1A - QL22 - BX An Sương',22.7,1700,'1850.1814.A'),(76,45,57,37,_binary '\0',1,14,0,NULL,'BX An Sương - QL22 - QL1A - QL10 - Đường Lê Đức Thọ - TL490C - BX Nghĩa Hưng',22.7,1700,'1850.1814.A'),(77,53,58,38,_binary '',1,15,0,NULL,'BX Đức Long Bảo Lộc - QL20 - QL27 - QL1A - Pháp Vân - Vành đai 3 trên cao (Đoạn Pháp Vân - Cầu Thanh Trì) - Cầu Thanh Trì - QL1 - QL3 - BX Liên tỉnh TP Cao Bằng',24.1,1805,'1149.1812.A'),(78,58,53,38,_binary '\0',1,15,0,NULL,'BX Liên tỉnh TP Cao Bằng - QL3 - QL1 - Cầu Thanh Trì - Cầu Thanh Trì) - Vành đai 3 trên cao (Đoạn Pháp Vân - Pháp Vân - QL1A - QL27 - QL20 - BX Đức Long Bảo Lộc',24.1,1805,'1149.1812.A'),(79,59,60,39,_binary '',1,12,200000,6,'BX Đồng Văn - QL4C - Yên Minh - Quản Bạ - Quyết Tiến - QL4C - QL2 - TP Hà Giang - QL2 - Bắc Quang - Hàm Yên - BX Tuyên Quang',4.1,305,'2223.1116.A'),(80,60,59,39,_binary '\0',1,12,200000,6,'BX Tuyên Quang - Hàm Yên - Bắc Quang - QL2 - TP Hà Giang - QL2 - QL4C - Quyết Tiến - Quản Bạ - Yên Minh - QL4C - BX Đồng Văn',4.1,305,'2223.1116.A'),(81,56,61,40,_binary '',1,12,250000,6,'BX Sơn La - QL6 - Vành đai 3 - QL5 - QL39 - QL10 - ĐT458 - QL37B - BX Tiền Hải',5.1,383,'1726.2211.A'),(82,61,56,40,_binary '\0',1,12,250000,6,'BX Tiền Hải - QL37B - ĐT458 - QL10 - QL39 - QL5 - Vành đai 3 - QL6 - BX Sơn La',5.1,383,'1726.2211.A'),(83,62,54,41,_binary '',1,12,0,NULL,'BX Trung tâm TP Thái Bình - QL10 - QL21 - QL1 - Pháp Vân Cầu Giẽ - Cầu Thanh Trì - QL5 - QL2 - BX Việt Trì',2.7,200,'1719.1111.A'),(84,54,62,41,_binary '\0',1,12,0,NULL,'BX Việt Trì - QL2 - QL5 - Cầu Thanh Trì - Pháp Vân Cầu Giẽ - QL1 - QL21 - QL10 - BX Trung tâm TP Thái Bình',2.7,200,'1719.1111.A'),(85,63,61,42,_binary '',1,12,0,NULL,'BX Lai Châu - QL4D - QL32 - QL279 - QL6 - BX Sơn La',3.3,250,'2526.1111.A'),(86,61,63,42,_binary '\0',1,12,0,NULL,'BX Sơn La - QL6 - QL279 - QL32 - QL4D - BX Lai Châu',3.3,250,'2526.1111.A'),(87,42,64,43,_binary '',0,11,100000,7,'BX Vǜng Tàu - Nam KǶ Khởi Nghĩa - Lê Hồng Phong - QL51 - QL1A - Kinh Dương Võ Văn Kiệt - BX Miền Tây',1.6,123,'5072.1212.A'),(88,64,42,43,_binary '\0',0,11,100000,7,'BX Miền Tây - Kinh Dương Võ Văn Kiệt - QL1A - QL51 - Lê Hồng Phong - Nam KǶ Khởi Nghĩa - BX Vǜng Tàu',1.6,123,'5072.1212.A'),(89,65,66,44,_binary '',1,16,0,NULL,'BX Móng Cái - QL18 - Sao Đỏ - Bắc Ninh - QL1 - QL37 - BX Phú Bình',4.9,370,'1420.1215.A'),(90,66,65,44,_binary '\0',1,16,0,NULL,'BX Phú Bình - QL37 - QL1 - Bắc Ninh - Sao Đỏ - QL18 - BX Móng Cái',4.9,370,'1420.1215.A'),(91,67,68,45,_binary '',1,12,0,NULL,'BX Huyên Hồng - QL47 - TP Thanh Hóa (Theo phân luồng của TP) - QL1A - Cao tốc Ninh Bình - Vành đai 3 trên cao - Cầu Thanh Trì - Cao tốc Hà Nội Bắc Giang - QL17 - ĐT295B - Đường Thân Nhân Trung - Đường Xương Giang - BX Bắc Giang',3.1,230,'3698.1211.A'),(92,68,67,45,_binary '\0',1,12,0,NULL,'BX Bắc Giang - Đường Xương Giang - Đường Thân Nhân Trung - ĐT295B - QL17 - Cao tốc Hà Nội Bắc Giang - Cầu Thanh Trì - Vành đai 3 trên cao - Cao tốc Ninh Bình - QL1A - TP Thanh Hóa (Theo phân luồng của TP) - QL47 - BX Huyên Hồng',3.1,230,'3698.1211.A'),(93,69,70,46,_binary '',1,12,0,NULL,'BX Lao Bảo - QL9 - Đường Hồ Chí Minh - Ngã Tư Sòng - QL1 - BX Nước Ngầm',8,600,'2974.1512.A'),(94,70,69,46,_binary '\0',1,12,0,NULL,'BX Nước Ngầm - QL1 - Ngã Tư Sòng - Đường Hồ Chí Minh - QL9 - BX Lao Bảo',8,600,'2974.1512.A'),(95,42,71,29,_binary '',1,17,0,NULL,'BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - Bến Tre - QL60 - QL53 - BX Duyên Hải',3.4,253,'5084.1213.A'),(96,71,42,29,_binary '\0',1,17,0,NULL,'BX Duyên Hải - QL53 - QL60 - Bến Tre - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây',3.4,253,'5084.1213.A'),(97,42,39,28,_binary '',1,18,300000,9,'BX Miền Tây - Đường Kinh Dương Vương - Ngã Ba cây Dầu Đôi - QL1 - Đường 23/10 - BX Phía Nam Nha Trang',6.1,460,'5079.1211.A'),(98,39,42,28,_binary '\0',1,18,300000,9,'BX Phía Nam Nha Trang - Đường 23/10 - QL1 - Ngã Ba cây Dầu Đôi - Đường Kinh Dương Vương - BX Miền Tây',6.1,460,'5079.1211.A'),(99,42,43,29,_binary '',1,18,0,NULL,'BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - QL53 - QL54 - BX Trà Vinh',2,151,'5084.1211.B'),(100,43,42,29,_binary '\0',1,18,0,NULL,'BX Trà Vinh - QL54 - QL53 - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây',2,151,'5084.1211.B'),(101,45,75,43,_binary '',1,11,150000,7,'BX Xuyên Mộc - QL55 - QL51 - QL1 - QL22 - BX An Sương',1.6,120,'5072.1420.A'),(102,75,45,43,_binary '\0',1,11,150000,7,'BX An Sương - QL22 - QL1 - QL51 - QL55 - BX Xuyên Mộc',1.6,120,'5072.1420.A'),(103,38,79,28,_binary '',1,19,0,NULL,'BX Miền Đông - QL13 - QL1 - BX Cam Ranh',5.2,390,'5079.1113.A'),(104,79,38,28,_binary '\0',1,19,0,NULL,'BX Cam Ranh - QL1 - QL13 - BX Miền Đông',5.2,390,'5079.1113.A'),(105,82,83,47,_binary '',1,19,0,NULL,'BX Phía Bắc Hải Phòng - QL5 - QL18 - QL3 - QL37 - BX Đại Từ',2.7,200,'1620.1612.A'),(106,83,82,47,_binary '\0',1,19,0,NULL,'BX Đại Từ - QL37 - QL3 - QL18 - QL5 - BX Phía Bắc Hải Phòng',2.7,200,'1620.1612.A');
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
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_bus`
--

LOCK TABLES `trip_bus` WRITE;
/*!40000 ALTER TABLE `trip_bus` DISABLE KEYS */;
INSERT INTO `trip_bus` VALUES (61,61,26),(62,62,26),(63,61,27),(64,62,27),(65,61,28),(66,62,28),(67,61,29),(68,62,29),(69,61,30),(70,62,30),(71,61,31),(72,62,31),(73,101,32),(74,102,32),(75,97,33),(76,98,33),(77,97,34),(78,98,34),(79,97,35),(80,98,35),(81,97,36),(82,98,36),(83,61,37),(84,62,37),(85,61,38),(86,62,38);
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
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_driver`
--

LOCK TABLES `trip_driver` WRITE;
/*!40000 ALTER TABLE `trip_driver` DISABLE KEYS */;
INSERT INTO `trip_driver` VALUES (71,61,32),(72,62,32),(73,61,33),(74,62,33),(75,61,34),(76,62,34),(77,61,35),(78,62,35),(79,61,36),(80,62,36),(81,61,39),(82,62,39),(85,101,38),(86,102,38),(87,101,37),(88,102,37),(89,61,40),(90,62,40),(91,61,41),(92,62,41),(93,101,42),(94,102,42),(95,101,43),(96,102,43),(97,97,44),(98,98,44),(99,97,45),(100,98,45),(101,97,46),(102,98,46),(103,97,47),(104,98,47),(105,61,48),(106,62,48),(107,61,49),(108,62,49),(109,61,50),(110,62,50);
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
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (89,_binary '',87,'032050000','20110315@student.hcmute.edu.vn','Lê Yên'),(105,_binary '',103,'0346623721','an@gmail.com','Nguyễn Châu An'),(106,_binary '\0',104,'0495134695','ho@gmail.com','Lê Hò'),(107,_binary '',105,'0334467434','kimle02012@gmail.com','Nguyễn Châu Phú'),(108,_binary '',106,'0334457422','thuan@gmail.com','Nguyễn Châu Thuận'),(109,_binary '',107,'0334457477','hoang@gmail.com','Nguyễn Liên Hoàng'),(110,_binary '',108,'0224457477','hoangn@gmail.com','Nguyễn Liên Hoàng'),(111,_binary '',109,'0248798687','donthandochai1243@gmail.com','Lê Thành Liên'),(112,_binary '',110,'0553798645','kimle020102@gmail.com','Nguyễn Phú Mỹ'),(113,_binary '\0',111,'0495134645','tho@gmail.com','Lê Văn Thọ'),(114,_binary '\0',112,'0495134646','nam@gmail.com','Lê Văn Nam'),(115,_binary '\0',113,'0495134640','chau@gmail.com','Lê Văn Châu'),(116,_binary '\0',114,'0495134639','chi@gmail.com','Lê Văn Chí'),(117,_binary '',115,'+84842281119','20110248@student.hcmute.edu.vn','Le Thi Kim Le'),(118,_binary '\0',116,'0495134635','ngo@gmail.com','Lê Ngô'),(119,_binary '',117,'0333967111','hoa@gmail.com','Nguyễn Hòa'),(120,_binary '\0',118,'0495134600','kimmin@gma','Lê'),(121,_binary '\0',119,'0495134611','hung.nguyen@gmail.com','Nguyễn Hùng'),(122,_binary '\0',120,'0495134622','lam.nguyen@gmail.com','Nguyễn Văn Lam'),(123,_binary '\0',121,'0968574909','phunghx@hcmute.edu.vn','Thầy Phụng'),(124,_binary '',122,'0968574913','nganguyen@hcmute.edu.vn','Nguyễn Nga'),(125,_binary '',123,'0968574914','lannguyen@hcmute.edu.vn','Nguyễn Lân'),(126,_binary '\0',124,'0968574915','anhnguyen@hcmute.edu.vn','Nguyễn Anh'),(127,_binary '\0',125,'0968574916','bangnguyen@hcmute.edu.vn','Nguyễn Băng'),(128,_binary '',126,'0334245434','hoangluu@gmail.com','Nguyễn Hoàng Lưu Bão'),(129,_binary '\0',127,'943435423','kim@gmail.com','Kim Lệ'),(130,_binary '',128,'0939884884','nhung@gmai.com','Kim Nhung'),(131,_binary '',129,'9434356780','baonguyen123@gmail.com','Bảo Nguyên'),(132,_binary '\0',130,'0939334884','kiman123@gmai.com','Kim An'),(133,_binary '',131,'911135423','cuongle@gmail.com','Lê Cường'),(134,_binary '',132,'0931114884','hungphi@gmai.com','Phi Hùng'),(135,_binary '',133,'911135543','khoa@gmail.com','Lê Khoa'),(136,_binary '',134,'0931114678','dien@gmai.com','Phi Điền'),(137,_binary '',135,'9111354230','cuonglele@gmail.com','Lê Cường'),(138,_binary '',136,'0931114881','hungphiphi@gmai.com','Phi Hùng'),(139,_binary '',137,'9111355432','khoakhoa@gmail.com','Lê Khoa'),(140,_binary '',138,'0931114670','diendien@gmai.com','Phi Điền'),(141,_binary '',139,'0303030303','qhhh@gmail.com','Lê Quang'),(142,_binary '\0',140,'0499034600','lamlam@gmail.com','Lê Lâm'),(143,_binary '\0',141,'0495134656','phanhuy@gmail.com','Phan Huy'),(144,_binary '\0',142,'0495134649','phanlam@gmail.com','Phan Lâm');
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

-- Dump completed on 2024-07-15  6:17:37
