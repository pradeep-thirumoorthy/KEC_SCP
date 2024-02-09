SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";




CREATE TABLE `admin_info` (
  `Id` int(11) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `Designation` varchar(100) NOT NULL,
  `PhoneNo` bigint(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Department` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `admin_login` (
  `Id` int(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `complaints` (
  `Id` int(11) NOT NULL,
  `Complaint_Id` varchar(50) NOT NULL COMMENT '16 digit Random Number',
  `email` varchar(80) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `Roll_No` varchar(8) NOT NULL,
  `Department` varchar(11) NOT NULL,
  `Class` varchar(1) NOT NULL,
  `Batch` int(11) NOT NULL,
  `Type` varchar(30) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Status` varchar(20) NOT NULL COMMENT 'Arrived, Inprogress, Completed,Rejected',
  `Forward_To` varchar(50) NOT NULL COMMENT 'Email',
  `CreateTime` varchar(20) NOT NULL,
  `info1` varchar(1000) NOT NULL,
  `info2` varchar(1000) NOT NULL,
  `info3` varchar(1000) NOT NULL DEFAULT '[{}]',
  `info4` varchar(1000) NOT NULL,
  `Extra` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `events` (
  `Id` int(11) NOT NULL,
  `Email` varchar(70) NOT NULL,
  `Limits` int(11) NOT NULL DEFAULT 1,
  `Formdata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `event_id` varchar(32) NOT NULL,
  `IntervalTime` date NOT NULL,
  `Title` varchar(40) NOT NULL,
  `Status` varchar(20) DEFAULT 'open',
  `Date` date DEFAULT NULL,
  `visible` varchar(40) NOT NULL DEFAULT 'Private',
  `constraints` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `events_response` (
  `Id` int(11) NOT NULL,
  `Event_Id` varchar(32) NOT NULL,
  `ResponseTime` datetime NOT NULL,
  `Response` varchar(10000) NOT NULL,
  `Email` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `faculty_complaints` (
  `Id` int(11) NOT NULL,
  `Complaint_Id` varchar(50) NOT NULL COMMENT '16 digit Random Number',
  `email` varchar(80) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `Roll_No` varchar(8) NOT NULL,
  `Department` varchar(11) NOT NULL,
  `Class` varchar(1) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Status` varchar(20) NOT NULL COMMENT 'Arrived, Completed,Rejected',
  `CreateTime` varchar(20) NOT NULL,
  `info1` varchar(1000) NOT NULL,
  `Batch` int(11) NOT NULL,
  `Subjectname` varchar(40) NOT NULL,
  `FacultyName` varchar(40) NOT NULL,
  `Subject` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `student_info` (
  `Id` int(11) NOT NULL,
  `Roll_No` varchar(8) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Department` varchar(8) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Class` varchar(3) NOT NULL,
  `Batch` int(11) NOT NULL,
  `Gender` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `student_login` (
  `email` varchar(50) NOT NULL,
  `Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `subject` (
  `Id` int(11) NOT NULL,
  `Batch` int(11) NOT NULL,
  `Class` varchar(1) NOT NULL,
  `Department` varchar(50) NOT NULL,
  `Subject_1` varchar(100) NOT NULL,
  `Subject_2` varchar(100) NOT NULL,
  `Subject_3` varchar(100) NOT NULL,
  `Subject_4` varchar(100) NOT NULL,
  `Subject_5` varchar(100) NOT NULL,
  `Subject_6` varchar(100) NOT NULL,
  `Advisor1` varchar(50) NOT NULL,
  `Advisor2` varchar(50) NOT NULL,
  `Advisor3` varchar(50) NOT NULL,
  `Maintenance` varchar(50) NOT NULL DEFAULT 'email',
  `Year_Incharge` varchar(50) NOT NULL,
  `HOD` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



ALTER TABLE `admin_info`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);




ALTER TABLE `admin_login`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);



ALTER TABLE `complaints`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Complaint_Id` (`Complaint_Id`);


ALTER TABLE `events`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `event_id` (`event_id`);


ALTER TABLE `events_response`
  ADD PRIMARY KEY (`Id`);



ALTER TABLE `faculty_complaints`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Complaint_Id` (`Complaint_Id`);



ALTER TABLE `student_info`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Roll_No` (`Roll_No`,`Email`);



ALTER TABLE `student_login`
  ADD PRIMARY KEY (`email`);



ALTER TABLE `subject`
  ADD PRIMARY KEY (`Id`);



ALTER TABLE `complaints`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;



ALTER TABLE `events`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;



ALTER TABLE `events_response`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;



ALTER TABLE `faculty_complaints`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;



ALTER TABLE `student_info`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=268;



ALTER TABLE `subject`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;