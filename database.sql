CREATE DATABASE  IF NOT EXISTS `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `Admin_Email` varchar(255) NOT NULL,
  PRIMARY KEY (`Admin_Email`),
  UNIQUE KEY `Admin_Email` (`Admin_Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES ('admin@project.com');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `Event_ID` int NOT NULL AUTO_INCREMENT,
  `Location` varchar(30) DEFAULT NULL,
  `Description` varchar(30) DEFAULT NULL,
  `Title` varchar(30) NOT NULL,
  `Start_Date` datetime DEFAULT NULL,
  `End_Date` datetime DEFAULT NULL,
  `Calendar_Name` varchar(30) NOT NULL,
  PRIMARY KEY (`Event_ID`),
  KEY `Calendar_Name` (`Calendar_Name`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`Calendar_Name`) REFERENCES `schedule` (`Calendar_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Calgary','attend concert','Concert','2022-03-08 00:00:00','2022-03-09 00:00:00','My calendar'),(2,'Calgary','attend concert','Concert','2022-03-08 00:00:00','2022-03-09 00:00:00','work');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `profile_Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Setting_id` int NOT NULL AUTO_INCREMENT,
  `User_eMail` varchar(255) NOT NULL,
  PRIMARY KEY (`profile_Email`,`Username`),
  UNIQUE KEY `profile_Email` (`profile_Email`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Setting_id` (`Setting_id`),
  UNIQUE KEY `User_eMail` (`User_eMail`),
  CONSTRAINT `features_ibfk_1` FOREIGN KEY (`profile_Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `features_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`),
  CONSTRAINT `features_ibfk_3` FOREIGN KEY (`Setting_id`) REFERENCES `settings` (`Setting_id`),
  CONSTRAINT `features_ibfk_4` FOREIGN KEY (`User_eMail`) REFERENCES `user` (`User_eMail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features_sp`
--

DROP TABLE IF EXISTS `features_sp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features_sp` (
  `profile_Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Share_Profiles` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`profile_Email`,`Username`),
  UNIQUE KEY `profile_Email` (`profile_Email`),
  UNIQUE KEY `Username` (`Username`),
  CONSTRAINT `features_sp_ibfk_1` FOREIGN KEY (`profile_Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `features_sp_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features_sp`
--

LOCK TABLES `features_sp` WRITE;
/*!40000 ALTER TABLE `features_sp` DISABLE KEYS */;
/*!40000 ALTER TABLE `features_sp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `has_friend`
--

DROP TABLE IF EXISTS `has_friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `has_friend` (
  `Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  PRIMARY KEY (`Email`,`Username`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Username` (`Username`),
  CONSTRAINT `has_friend_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `has_friend_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has_friend`
--

LOCK TABLES `has_friend` WRITE;
/*!40000 ALTER TABLE `has_friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `has_friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modify`
--

DROP TABLE IF EXISTS `modify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modify` (
  `Admin_Email` varchar(255) NOT NULL,
  `profile_Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  PRIMARY KEY (`Admin_Email`,`profile_Email`),
  UNIQUE KEY `Admin_Email` (`Admin_Email`),
  UNIQUE KEY `profile_Email` (`profile_Email`),
  UNIQUE KEY `Username` (`Username`),
  CONSTRAINT `modify_ibfk_1` FOREIGN KEY (`Admin_Email`) REFERENCES `administrator` (`Admin_Email`),
  CONSTRAINT `modify_ibfk_2` FOREIGN KEY (`profile_Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `modify_ibfk_3` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modify`
--

LOCK TABLES `modify` WRITE;
/*!40000 ALTER TABLE `modify` DISABLE KEYS */;
/*!40000 ALTER TABLE `modify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monthly_stats`
--

DROP TABLE IF EXISTS `monthly_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monthly_stats` (
  `profile_Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Month_Year` date NOT NULL,
  `Total_Events` int DEFAULT NULL,
  `Total_Tasks` int DEFAULT NULL,
  `Total_Notes` int DEFAULT NULL,
  `Total_Reminders` int DEFAULT NULL,
  `Year` year NOT NULL,
  PRIMARY KEY (`profile_Email`,`Username`,`Month_Year`),
  UNIQUE KEY `profile_Email` (`profile_Email`),
  UNIQUE KEY `Username` (`Username`),
  KEY `Year` (`Year`),
  CONSTRAINT `monthly_stats_ibfk_1` FOREIGN KEY (`profile_Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `monthly_stats_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`),
  CONSTRAINT `monthly_stats_ibfk_3` FOREIGN KEY (`Year`) REFERENCES `yearly` (`Year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monthly_stats`
--

LOCK TABLES `monthly_stats` WRITE;
/*!40000 ALTER TABLE `monthly_stats` DISABLE KEYS */;
/*!40000 ALTER TABLE `monthly_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `profile_Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Note_ID` int NOT NULL AUTO_INCREMENT,
  `Date_Created` datetime DEFAULT NULL,
  `Title` varchar(50) DEFAULT NULL,
  `Content` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`profile_Email`,`Username`,`Note_ID`),
  UNIQUE KEY `profile_Email` (`profile_Email`),
  UNIQUE KEY `Username` (`Username`),
  KEY `Note_ID` (`Note_ID`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`profile_Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `B_Date` date DEFAULT NULL,
  `Profile_Pic` text,
  `User_Email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Email`,`Username`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Username` (`Username`),
  KEY `User_Email` (`User_Email`),
  CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`User_Email`) REFERENCES `user` (`User_eMail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES ('ana','ana@gmail.com','_ana_','password','1885-02-01','ana.jpg','ana@gmail.com'),('derek','derek@gmail.com','_derek_','password','0000-12-25','derek.jpg','derek@gmail.com'),('Parth','parth@gmail.com','_Parth_','password','2000-08-31','parth.jpg','parth@gmail.com');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminder`
--

DROP TABLE IF EXISTS `reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reminder` (
  `Reminder_ID` int NOT NULL AUTO_INCREMENT,
  `Location` varchar(30) DEFAULT NULL,
  `Description` varchar(30) DEFAULT NULL,
  `Title` varchar(30) NOT NULL,
  `Calendar_Name` varchar(30) NOT NULL,
  PRIMARY KEY (`Reminder_ID`),
  KEY `Calendar_Name` (`Calendar_Name`),
  CONSTRAINT `reminder_ibfk_1` FOREIGN KEY (`Calendar_Name`) REFERENCES `schedule` (`Calendar_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminder`
--

LOCK TABLES `reminder` WRITE;
/*!40000 ALTER TABLE `reminder` DISABLE KEYS */;
/*!40000 ALTER TABLE `reminder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `profile_Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Calendar_Name` varchar(30) NOT NULL,
  `Theme` enum('Dark','Light') DEFAULT NULL,
  PRIMARY KEY (`profile_Email`,`Username`,`Calendar_Name`),
  UNIQUE KEY `profile_Email` (`profile_Email`),
  UNIQUE KEY `Username` (`Username`),
  KEY `Calendar_Name` (`Calendar_Name`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`profile_Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES ('derek@gmail.com','_derek_','work','Dark'),('parth@gmail.com','_Parth_','My Calendar','Dark');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `send_report`
--

DROP TABLE IF EXISTS `send_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `send_report` (
  `User_eMail` varchar(255) NOT NULL,
  `Admin_eMail` varchar(255) NOT NULL,
  `Log` varchar(255) DEFAULT NULL,
  `ReportID` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`User_eMail`,`Admin_eMail`),
  UNIQUE KEY `User_eMail` (`User_eMail`),
  UNIQUE KEY `Admin_eMail` (`Admin_eMail`),
  CONSTRAINT `send_report_ibfk_1` FOREIGN KEY (`User_eMail`) REFERENCES `user` (`User_eMail`),
  CONSTRAINT `send_report_ibfk_2` FOREIGN KEY (`Admin_eMail`) REFERENCES `administrator` (`Admin_Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `send_report`
--

LOCK TABLES `send_report` WRITE;
/*!40000 ALTER TABLE `send_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `send_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Setting_id` int NOT NULL AUTO_INCREMENT,
  `Date_Format` enum('dd/mm/yyyy','mm/dd/yyyy') DEFAULT NULL,
  `Time_Format` enum('24:00','12:00') DEFAULT NULL,
  `TimeZone` varchar(3) DEFAULT NULL,
  `Language` enum('English','French') DEFAULT NULL,
  `Theme` enum('Dark','Light') DEFAULT NULL,
  `Country` varchar(20) DEFAULT NULL,
  `Notification` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Email`,`Username`,`Setting_id`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Setting_id` (`Setting_id`),
  CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `settings_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('derek@gmail.com','_derek_',3,'dd/mm/yyyy','12:00','MDT','English','Dark','Canada','There are no new notifications'),('parth@gmail.com','_Parth_',1,'dd/mm/yyyy','12:00','MDT','English','Dark','Canada','There are no new notifications');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `profile_Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Header` varchar(20) NOT NULL,
  `Task_ID` int NOT NULL AUTO_INCREMENT,
  `Deadline` datetime DEFAULT NULL,
  `Completion_Status` tinyint(1) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Title` varchar(30) DEFAULT NULL,
  `Location` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`profile_Email`,`Username`,`Header`,`Task_ID`),
  UNIQUE KEY `profile_Email` (`profile_Email`),
  UNIQUE KEY `Username` (`Username`),
  KEY `Task_ID` (`Task_ID`),
  KEY `Header` (`Header`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`profile_Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`),
  CONSTRAINT `task_ibfk_3` FOREIGN KEY (`Header`) REFERENCES `task_list` (`Header`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_list`
--

DROP TABLE IF EXISTS `task_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_list` (
  `profile_Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Header` varchar(20) NOT NULL,
  `Theme` enum('Dark','Light') DEFAULT NULL,
  PRIMARY KEY (`profile_Email`,`Username`,`Header`),
  UNIQUE KEY `profile_Email` (`profile_Email`),
  UNIQUE KEY `Username` (`Username`),
  KEY `Header` (`Header`),
  CONSTRAINT `task_list_ibfk_1` FOREIGN KEY (`profile_Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `task_list_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_list`
--

LOCK TABLES `task_list` WRITE;
/*!40000 ALTER TABLE `task_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usage_statistics`
--

DROP TABLE IF EXISTS `usage_statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usage_statistics` (
  `profile_Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Title` varchar(255) NOT NULL,
  PRIMARY KEY (`profile_Email`,`Username`),
  UNIQUE KEY `profile_Email` (`profile_Email`),
  UNIQUE KEY `Username` (`Username`),
  CONSTRAINT `usage_statistics_ibfk_1` FOREIGN KEY (`profile_Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `usage_statistics_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usage_statistics`
--

LOCK TABLES `usage_statistics` WRITE;
/*!40000 ALTER TABLE `usage_statistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `usage_statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `User_eMail` varchar(255) NOT NULL,
  PRIMARY KEY (`User_eMail`),
  UNIQUE KEY `User_eMail` (`User_eMail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('ana@gmail.com'),('derek@gmail.com'),('parth@gmail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `view`
--

DROP TABLE IF EXISTS `view`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `view` (
  `Admin_Email` varchar(255) NOT NULL,
  `profile_Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  PRIMARY KEY (`Admin_Email`,`profile_Email`),
  UNIQUE KEY `Admin_Email` (`Admin_Email`),
  UNIQUE KEY `profile_Email` (`profile_Email`),
  UNIQUE KEY `Username` (`Username`),
  CONSTRAINT `view_ibfk_1` FOREIGN KEY (`Admin_Email`) REFERENCES `administrator` (`Admin_Email`),
  CONSTRAINT `view_ibfk_2` FOREIGN KEY (`profile_Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `view_ibfk_3` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `view`
--

LOCK TABLES `view` WRITE;
/*!40000 ALTER TABLE `view` DISABLE KEYS */;
/*!40000 ALTER TABLE `view` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yearly`
--

DROP TABLE IF EXISTS `yearly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yearly` (
  `profile_Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Year` year NOT NULL,
  PRIMARY KEY (`profile_Email`,`Username`,`Year`),
  UNIQUE KEY `profile_Email` (`profile_Email`),
  UNIQUE KEY `Username` (`Username`),
  KEY `yearly` (`Year`),
  CONSTRAINT `yearly_ibfk_1` FOREIGN KEY (`profile_Email`) REFERENCES `profile` (`Email`),
  CONSTRAINT `yearly_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `profile` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yearly`
--

LOCK TABLES `yearly` WRITE;
/*!40000 ALTER TABLE `yearly` DISABLE KEYS */;
/*!40000 ALTER TABLE `yearly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'project'
--

--
-- Dumping routines for database 'project'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-22 19:29:39
