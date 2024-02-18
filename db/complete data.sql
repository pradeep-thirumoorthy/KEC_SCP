-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2024 at 06:21 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sgp`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_info`
--

CREATE TABLE `admin_info` (
  `Id` int(11) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `Designation` varchar(100) NOT NULL,
  `PhoneNo` bigint(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Department` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_info`
--

INSERT INTO `admin_info` (`Id`, `Name`, `Designation`, `PhoneNo`, `Email`, `Department`) VALUES
(1, 'Dr.N.Shanthi', 'Professor,Head', 9842013355, 'shanthi.cse@kongu.edu', 'CSE'),
(2, 'Dr.R.R.Rajalaxmi', 'Professor', 9486561199, 'rrr.cse@kongu.edu', 'CSE'),
(3, 'Dr.K.Kousalya', 'Professor', 9942214795, 'kouse.cse@kongu.edu', 'CSE'),
(4, 'Dr.S.Malliga', 'Professor', 9842278780, 'mallisenthil.cse@kongu.edu', 'CSE'),
(5, 'Dr.R.C.Suganthe', 'Professor', 9842350051, 'suganthe_rc.cse@kongu.edu', 'CSE'),
(6, 'Dr. R.Thamilselvan', 'Professor', 9443916069, 'r_thamilselvan@kongu.edu', 'CSE'),
(7, 'Dr.P.Jayanthi', 'Associate Professor', 7373898953, 'jayanthime.cse@kongu.edu', 'CSE'),
(8, 'Dr.K.Nirmala Devi', 'Associate Professor', 9500500036, 'k_nirmal.cse@kongu.edu', 'CSE'),
(9, 'Dr.K.Sangeetha', 'Associate Professor', 9943070702, 'sangeetha_k.cse@kongu.edu', 'CSE'),
(10, 'Dr.P.Vishnu Raja', 'Associate Professor', 9865277122, 'pvishnu.cse@kongu.edu', 'CSE'),
(11, 'Dr.S.Shanthi', 'Associate Professor', 9942911551, 'shanthis.mca@kongu.edu', 'CSE'),
(12, 'Dr.R.S.Latha', 'Associate Professor', 9500459161, 'latha.cse@kongu.edu', 'CSE'),
(13, 'Mr.N.P.Saravanan', 'Assistant Professor[SLG]', 9976874089, 'npsaravanan.cse@kongu.edu', 'CSE'),
(14, 'Dr.PCD.Kalaivaani', 'Assistant Professor[SLG]', 9659447988, 'kalairupa.cse@kongu.edu', 'CSE'),
(15, 'Dr.M.Geetha', 'Assistant Professor[SLG]', 9489241573, 'geetha.cse@kongu.edu', 'CSE'),
(16, 'Ms.N.Sasipriyaa', 'Assistant Professor[SRG]', 9976798392, 'sasipriya.cse@kongu.edu', 'CSE'),
(17, 'Mr.T.Kumaravel', 'Assistant Professor[SRG]', 9842739296, 'tkumar.cse@kongu.edu', 'CSE'),
(18, 'Ms.S.Ramya', 'Assistant Professor[SRG]', 9787080129, 'sramya.cse@kongu.edu', 'CSE'),
(19, 'Mr.K.Devendran', 'Assistant Professor[SRG]', 9942504690, 'skdeva.cse@kongu.edu', 'CSE'),
(20, 'Mr.B.Bizu', 'Assistant Professor[SRG]', 9865165228, 'bizu.cse@kongu.edu', 'CSE'),
(21, 'Ms.D.Deepa', 'Assistant Professor[SRG]', 7868040150, 'deepa.cse@kongu.edu', 'CSE'),
(22, 'Ms.C.Sagana', 'Assistant Professor[SRG]', 8144163614, 'sagana.c.cse@kongu.edu', 'CSE'),
(23, 'Mr.B.Krishnakumar', 'Assistant Professor[SRG]', 9788642524, 'krishnakumar.cse@kongu.edu', 'CSE'),
(24, 'Dr.K.Dinesh', 'Assistant Professor[SRG]', 9944846480, 'dinesh.cse@kongu.edu', 'CSE'),
(25, 'Ms.S.Mohana Saranya', 'Assistant Professor', 9942974490, 'mohanasaranya.cse@kongu.edu', 'CSE'),
(26, 'Ms.S.Mohanapriya', 'Assistant Professor', 7418825624, 'mohanapriyas.cse@kongu.edu', 'CSE'),
(27, 'Ms.P.S.Nandhini', 'Assistant Professor', 9962073299, 'nandhini.cse@kongu.edu', 'CSE'),
(28, 'Dr.Vani Rajasekar', 'Assistant Professor', 9659902769, 'vanikecit.cse@kongu.edu', 'CSE'),
(29, 'Ms.K.Venu', 'Assistant Professor', 7200004511, 'venu.cse@kongu.edu', 'CSE'),
(30, 'Dr.K.Nithya', 'Assistant Professor', 8973989274, 'nithya.cse@kongu.edu', 'CSE'),
(31, 'Ms.J.Gowthami', 'Assistant Professor', 9095732025, 'gowthami.cse@kongu.edu', 'CSE'),
(32, 'Ms.K.Pugazharasi', 'Assistant Professor', 9688006850, 'pugazharasi.cse@kongu.edu', 'CSE'),
(33, 'Ms.S.Gayathri', 'Assistant Professor', 6374773783, 'gayathri.cse@kongu.edu', 'CSE'),
(34, 'Ms.R.S.Shudapreyaa', 'Assistant Professor', 8778413640, 'shudapreyaa.cse@kongu.edu', 'CSE'),
(35, 'Ms.S.Kavitha', 'Assistant Professor', 8526102486, 'kavitha.cse@kongu.edu', 'CSE'),
(36, 'Dr.C.Sharmila', 'Assistant Professor', 9944422227, 'sharmila.cse@kongu.edu', 'CSE'),
(37, 'Mr.M.Muthuraja', 'Assistant Professor', 8870735165, 'muthuraja.cse@kongu.edu', 'CSE'),
(38, 'Ms.P.Santhiya', 'Assistant Professor', 9629896226, 'psanthiya.cse@kongu.edu', 'CSE'),
(39, 'Ms.K.Kavitha', 'Assistant Professor', 9790687533, 'kavithak.cse@kongu.edu', 'CSE'),
(40, 'Mr.V.Manimaran', 'Assistant Professor', 9578088626, 'manimaran.cse@kongu.edu', 'CSE'),
(41, 'Ms.P.Kalaivani ', 'Assistant Professor', 9894999684, 'kalaivanip.cse@kongu.edu', 'CSE'),
(42, 'Ms.C.Roopa', 'Assistant Professor', 8760983048, 'roopa.cse@kongu.edu', 'CSE'),
(43, 'Ms.K.Suvalakshmi', 'Assistant Professor', 9384538700, 'suvalakshmi.cse@kongu.edu', 'CSE'),
(44, 'Ms.A.Aadhishri ', 'Assistant Professor', 6381332300, 'aadhishri.cse@kongu.edu', 'CSE'),
(45, 'Mr.R.Karunamoorthi', 'Assistant Professor', 9025044806, 'rkarunamoorthi.cse@kongu.edu', 'CSE'),
(46, 'Mr.K.Suresh Kumar', 'Assistant Professor', 9952561965, 'sureshkumar.cse@kongu.edu', 'CSE'),
(47, 'Mr.T.Arunkumar', 'Assistant Professor', 9629813491, 'arunkumar.cse@kongu.edu', 'CSE'),
(48, 'Ms.T.Nagamani', 'Assistant Professor', 9385850403, 'nagamani.cse@kongu.edu', 'CSE'),
(49, 'Ms.M.Kannukkiniyal', 'Assistant Professor', 6374088547, 'kannukkiniyal.cse@kongu.edu', 'CSE'),
(50, 'Mr.N.Aravindhraj', 'Assistant Professor', 9487883339, 'aravindhraj.cse@kongu.edu', 'CSE'),
(51, 'Pradeep T', 'Assistant Professor', 9842752513, 'pradeept.21cse@kongu.edu', 'CSE');

-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

CREATE TABLE `admin_login` (
  `Id` int(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_login`
--

INSERT INTO `admin_login` (`Id`, `Email`, `Password`) VALUES
(1, 'shanthi.cse@kongu.edu', 'kecse@123'),
(2, 'rrr.cse@kongu.edu', 'kecse@123'),
(3, 'kouse.cse@kongu.edu', 'kecse@123'),
(4, 'mallisenthil.cse@kongu.edu', 'kecse@123'),
(5, 'suganthe_rc.cse@kongu.edu', 'kecse@123'),
(6, 'r_thamilselvan@kongu.edu', 'kecse@123'),
(7, 'jayanthime.cse@kongu.edu', 'kecse@123'),
(8, 'k_nirmal.cse@kongu.edu', 'kecse@123'),
(9, 'sangeetha_k.cse@kongu.edu', 'kecse@123'),
(10, 'pvishnu.cse@kongu.edu', 'kecse@123'),
(11, 'shanthis.mca@kongu.edu', 'kecse@123'),
(12, 'latha.cse@kongu.edu', 'kecse@123'),
(13, 'npsaravanan.cse@kongu.edu', 'kecse@123'),
(14, 'kalairupa.cse@kongu.edu', 'kecse@123'),
(15, 'geetha.cse@kongu.edu', 'kecse@123'),
(16, 'sasipriya.cse@kongu.edu', 'kecse@123'),
(17, 'tkumar.cse@kongu.edu', 'kecse@123'),
(18, 'sramya.cse@kongu.edu', 'kecse@123'),
(19, 'skdeva.cse@kongu.edu', 'kecse@123'),
(20, 'bizu.cse@kongu.edu', 'kecse@123'),
(21, 'deepa.cse@kongu.edu', 'kecse@123'),
(22, 'sagana.c.cse@kongu.edu', 'kecse@123'),
(23, 'krishnakumar.cse@kongu.edu', 'kecse@123'),
(24, 'dinesh.cse@kongu.edu', 'kecse@123'),
(25, 'mohanasaranya.cse@kongu.edu', 'kecse@123'),
(26, 'mohanapriyas.cse@kongu.edu', 'kecse@123'),
(27, 'nandhini.cse@kongu.edu', 'kecse@123'),
(28, 'vanikecit.cse@kongu.edu', 'kecse@123'),
(29, 'venu.cse@kongu.edu', 'kecse@123'),
(30, 'nithya.cse@kongu.edu', 'kecse@123'),
(31, 'gowthami.cse@kongu.edu', 'kecse@123'),
(32, 'pugazharasi.cse@kongu.edu', 'kecse@123'),
(33, 'gayathri.cse@kongu.edu', 'kecse@123'),
(34, 'shudapreyaa.cse@kongu.edu', 'kecse@123'),
(35, 'kavitha.cse@kongu.edu', 'kecse@123'),
(36, 'sharmila.cse@kongu.edu', 'kecse@123'),
(37, 'muthuraja.cse@kongu.edu', 'kecse@123'),
(38, 'psanthiya.cse@kongu.edu', 'kecse@123'),
(39, 'kavithak.cse@kongu.edu', 'kecse@123'),
(40, 'manimaran.cse@kongu.edu', 'kecse@123'),
(41, 'kalaivanip.cse@kongu.edu', 'kecse@123'),
(42, 'roopa.cse@kongu.edu', 'kecse@123'),
(43, 'suvalakshmi.cse@kongu.edu', 'kecse@123'),
(44, 'aadhishri.cse@kongu.edu', 'kecse@123'),
(45, 'rkarunamoorthi.cse@kongu.edu', 'kecse@123'),
(46, 'sureshkumar.cse@kongu.edu', 'kecse@123'),
(47, 'arunkumar.cse@kongu.edu', 'kecse@123'),
(48, 'nagamani.cse@kongu.edu', 'kecse@123'),
(49, 'kannukkiniyal.cse@kongu.edu', 'kecse@123'),
(50, 'aravindhraj.cse@kongu.edu', 'kecse@123'),
(51, 'pradeept.21cse@kongu.edu', 'qwe123@,./'),
(52, 'sabarishv.21cse@kongu.edu', 'qwe1234');

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

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
  `Extra` varchar(10000) NOT NULL,
  `Level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`Id`, `Complaint_Id`, `email`, `Name`, `Roll_No`, `Department`, `Class`, `Batch`, `Type`, `Description`, `Status`, `Forward_To`, `CreateTime`, `info1`, `info2`, `info3`, `info4`, `Extra`, `Level`) VALUES
(1, '5604bb2426bab383', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'World@124qwer', 'Resolved', 'pradeept.21cse@kongu.edu', '07:25:00', '2023-10-02', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-02 10:50:05\"]},{\"Forwarded\":[\"Dr.R.R.Rajalaxmi\",\"2023-10-02 07:26:25\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-02 07:27:05\"]}]', '[{\"2023-10-02 07:27:21\":\"Hello World\"},{\"2023-10-02 07:27:32\":\"12345678\"}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(2, '052cd000a6e4d7b5', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', '123qwe', 'Accepted', 'pradeept.21cse@kongu.edu', '07:30:00', '2023-10-02', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-02 10:55:43\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-02 08:32:14\"]}]', '[{}]', '', '', 0),
(3, '700882a8f8e1b06b', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', '2 fans are not working', 'Arrived', 'pradeept.21cse@kongu.edu', '12:05:29', '2023-10-02', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-02 12:05:29\"]}]', '[{}]', '', '', 0),
(4, '5e757f2d3c8c1ddc', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Hello World', 'Rejected', 'pradeept.21cse@kongu.edu', '12:16:51', '2023-10-02', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-02 12:16:51\"]},{\"Rejected\":[\"Pradeep T\",\"2023-10-02 08:48:36\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '', 0),
(5, '5a330c6dc9cb3e21', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Courses', '1234567890qwertyuio', 'Arrived', '', '14:57:39', '2023-10-02', '[{\"Forwarded\":[\"Default Faculty Name\",\"2023-10-02 14:57:39\"]}]', '[{}]', '', '', 0),
(6, '2423db44ff09721f', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Problems with restroom facilities and maintenance.', 'Arrived', 'sabarishv.21cse@kongu.edu', '14:00:36', '2023-10-11', '[{\"Forwarded\":[\"Default Faculty Name\",\"2023-10-11 14:00:36\"]}]', '[{}]', '', '', 0),
(7, 'cc31836105075eda', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Environmental sustainability concerns.', 'Resolved', 'pradeept.21cse@kongu.edu', '14:12:02', '2023-10-11', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-11 14:12:02\"]},{\"Rejected\":[\"Pradeep T\",\"2023-10-18 02:58:39\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-20 03:18:41\"]}]', '[{\"2023-10-20 03:19:13\":\"Hello\"}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(8, 'b8d5e60474b3b035', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Environmental sustainability concerns.', 'Accepted', 'pradeept.21cse@kongu.edu', '14:36:04', '2023-10-11', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-11 14:36:04\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-18 02:58:14\"]}]', '[{}]', '', '', 0),
(9, '28c7efbdb9480dae', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Inadequate parking and transportation facilities.', 'Accepted', 'pradeept.21cse@kongu.edu', '14:37:45', '2023-10-11', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-11 14:37:45\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-17 06:45:43\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-17 06:53:28\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-17 06:56:38\"]},{\"Rejected\":[\"Pradeep T\",\"2023-10-18 02:53:14\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-18 02:53:26\"]}]', '[{}]', '', '', 0),
(10, 'c16f3723ace4655e', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Structural issues in buildings or facilities.', 'Accepted', 'pradeept.21cse@kongu.edu', '14:39:09', '2023-10-11', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-11 14:39:09\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-17 06:44:15\"]}]', '[{}]', '', '', 0),
(11, 'a27eeec5842e7720', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Issues with classroom seating arrangements and comfort.', 'Accepted', 'pradeept.21cse@kongu.edu', '14:41:58', '2023-10-11', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-11 14:41:58\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-17 06:42:32\"]}]', '[{}]', '', '', 0),
(12, '974b88f469b851e8', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Environmental sustainability concerns.', 'Accepted', 'pradeept.21cse@kongu.edu', '14:45:21', '2023-10-11', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-11 14:45:21\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-17 06:37:29\"]}]', '[{\"2023-10-20 03:11:06\":\"hjtgf\"},{\"2023-10-20 03:13:11\":\"hello\"},{\"2023-10-20 03:15:16\":\"1234\"},{\"2023-10-20 03:16:51\":\"Hello\"}]', '', '', 0),
(13, '7208088d8e6cf6fa', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Maintenance of outdoor areas and landscaping.', 'Resolved', 'pradeept.21cse@kongu.edu', '14:46:26', '2023-10-11', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-11 14:46:26\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-17 06:35:44\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(14, '9097cd4aff6d8447', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Issues with classroom seating arrangements and comfort.', 'Resolved', 'pradeept.21cse@kongu.edu', '14:51:34', '2023-10-11', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-11 14:51:34\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-14 17:05:28\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-17 06:33:24\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(15, '1e85ae259dcb7801', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Lab', 'Problems with calibration and maintenance of equipment.', 'Arrived', 'muthuraja.cse@kongu.edu', '14:54:40', '2023-10-11', '[{\"Forwarded\":[\"Mr.M.Muthuraja\",\"2023-10-11 14:54:40\"]}]', '[{}]', '', '', 0),
(16, '9f5505f1f2ea42ce', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Inadequate parking and transportation facilities.', 'Resolved', 'pradeept.21cse@kongu.edu', '15:17:56', '2023-10-11', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-11 15:17:56\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-14 13:46:21\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-14 13:51:14\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-14 13:54:11\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-14 13:56:51\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-14 17:00:11\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-14 17:02:45\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-14 17:08:20\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-17 05:42:24\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-10-17 05:43:25\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-17 06:29:25\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-17 06:32:41\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(17, 'd7e1d629736ead67', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Problems with restroom facilities and maintenance.', 'Resolved', 'mallisenthil.cse@kongu.edu', '12:37:48', '2023-10-19', '[{\"Forwarded\":[\"Dr.S.Malliga\",\"2023-10-19 12:37:48\"]},{\"Accepted\":[\"Dr.S.Malliga\",\"2023-10-19 09:12:19\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '{\"category\":\"Classroom\",\"Floor\":\"Ground Floor\",\"data\":\"Room 2\"}', 0),
(18, 'eca55ec56cf25d71', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Struggles with comprehending advanced topics.', 'Arrived', 'mallisenthil.cse@kongu.edu', '12:44:24', '2023-10-21', '[{\"Forwarded\":[\"Dr.S.Malliga\",\"2023-10-21 12:44:24\"]}]', '[{}]', '', '', 0),
(19, 'a5d3493c1a33e417', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Acadamic', 'Difficulty in relating subject content to real-life scenarios.', 'Arrived', 'pradeept.21cse@kongu.edu', '13:10:37', '2023-10-21', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-21 13:10:37\"]}]', '', '', '', 0),
(20, '7c7b1023d8cc50cd', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Problems in applying theoretical knowledge practically.', 'Arrived', 'pradeept.21cse@kongu.edu', '13:11:39', '2023-10-21', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-21 13:11:39\"]}]', '', '', '', 0),
(21, '480cc83654be978f', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Struggles with comprehending advanced topics.', 'Arrived', 'pradeept.21cse@kongu.edu', '15:24:40', '2023-10-21', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-21 15:24:40\"]}]', '', '', '', 0),
(22, 'e9c9c077f0044400', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Others', 'Hello', 'Rejected', 'pradeept.21cse@kongu.edu', '15:27:09', '2023-10-21', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-21 15:27:09\"]},{\"Rejected\":[\"Pradeep T\",\"2023-10-22 10:51:34\"]}]', '', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '', 0),
(23, '625f8efac290d9e7', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Lack of updated and relevant course textbooks.', 'Arrived', 'pradeept.21cse@kongu.edu', '13:15:47', '2023-10-22', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-22 13:15:47\"]}]', '', '', '', 0),
(24, '196830215c13fc2b', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Others', 'Difficulty in relating subject content to real-life scenarios.', 'Rejected', 'pradeept.21cse@kongu.edu', '13:18:02', '2023-10-22', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-22 13:18:02\"]},{\"Rejected\":[\"Pradeep T\",\"2023-10-22 10:50:04\"]}]', '', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '', 0),
(25, '34142e74e1b60091', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Struggles with comprehending advanced topics.', 'Arrived', 'pradeept.21cse@kongu.edu', '23:01:49', '2023-10-22', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-22 23:01:49\"]}]', '', '', '', 0),
(26, 'dc5dc22ff7d0af2b', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Struggles with comprehending advanced topics.', 'Arrived', 'pradeept.21cse@kongu.edu', '23:12:09', '2023-10-22', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-22 23:12:09\"]}]', '[{}]', '', '', 0),
(27, 'b6482af44a165c2c', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Insufficient reference materials for in-depth learning.', 'Arrived', 'pradeept.21cse@kongu.edu', '23:14:28', '2023-10-22', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-22 23:14:28\"]}]', '[{}]', '', '{\"category\":\"Restroom\",\"Floor\":\"Second Floor\"}', 0),
(28, 'b0fcb22cdf1237b0', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Struggles with comprehending advanced topics.', 'Arrived', 'pradeept.21cse@kongu.edu', '23:17:30', '2023-10-22', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-22 23:17:30\"]}]', '[{}]', '', '{\"category\":\"Classroom\",\"Floor\":\"First Floor\",\"data\":\"Room A\"}', 0),
(29, '5393505ecf1d3083', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Difficulties in grasping complex concepts.', 'Arrived', 'pradeept.21cse@kongu.edu', '23:18:23', '2023-10-22', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-22 23:18:23\"]}]', '[{}]', '', '{\"category\":\"Classroom\",\"Floor\":\"First Floor\",\"data\":\"Room C\"}', 0),
(30, 'd797b9354ac6843f', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Struggles with comprehending advanced topics.', 'Arrived', 'pradeept.21cse@kongu.edu', '23:20:05', '2023-10-22', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-22 23:20:05\"]}]', '[{}]', '', '{\"category\":\"Restroom\",\"Floor\":\"First Floor\",\"data\":\"Male\"}', 0),
(32, '85e61a663b337eab', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Courses', 'Struggles with comprehending advanced topics.', 'Arrived', 'pradeept.21cse@kongu.edu', '13:09:45', '2023-10-24', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-24 13:09:45\"]}]', '', '', '', 0),
(33, '1f172aebd0337164', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Courses', 'Difficulty in relating subject content to real-life scenarios.', 'Arrived', 'pradeept.21cse@kongu.edu', '13:14:27', '2023-10-24', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-24 13:14:27\"]}]', '', '', '', 0),
(34, '011a2ac785f065a7', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Difficulty in relating subject content to real-life scenarios.', 'Arrived', 'pradeept.21cse@kongu.edu', '13:50:17', '2023-10-24', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-24 13:50:17\"]}]', '[{}]', '', '', 0),
(35, 'db6e0ed1153486fa', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Confusion due to unclear subject explanations.', 'Arrived', 'pradeept.21cse@kongu.edu', '14:04:27', '2023-10-24', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-24 14:04:27\"]}]', '[{}]', '', '{\"category\":\"Classroom\",\"Floor\":\"First Floor\",\"data\":\"Room C\"}', 0),
(36, 'e3d791fc0ecc3a46', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Difficulties in grasping complex concepts.', 'Arrived', 'pradeept.21cse@kongu.edu', '14:07:55', '2023-10-24', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-24 14:07:55\"]}]', '[{}]', '', '', 0),
(37, 'adb6de1dfb9f7540', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Courses', 'Difficulties in grasping complex concepts.', 'Arrived', 'pradeept.21cse@kongu.edu', '11:39:30', '2023-10-25', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-25 11:39:30\"]}]', '[{}]', '', '', 0),
(38, 'b77bdf065a085ec4', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Courses', 'Confusion due to unclear subject explanations.', 'Arrived', 'pradeept.21cse@kongu.edu', '11:40:55', '2023-10-25', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-25 11:40:55\"]}]', '[{}]', '', '', 0),
(39, '6c4717f38c3cfa7b', 'santhoshm.21cse@kongu.edu', 'SANTHOSH M', '21CSR178', 'CSE', 'C', 2025, 'Maintenance', 'Struggles with comprehending advanced topics.', 'Resolved', 'pradeept.21cse@kongu.edu', '12:29:49', '2023-10-25', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-25 12:29:49\"]},{\"Accepted\":[\"Pradeep T\",\"2023-10-25 09:01:12\"]}]', '[{\"2023-10-25 09:01:51\":\"Helllo\"}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '{\"category\":\"Classroom\",\"Floor\":\"First Floor\",\"data\":\"Room B\"}', 0),
(40, '0eb5357a163a7de7', 'sabarnikas.21cse@kongu.edu', 'SABARNIKA S', '21CSR168', 'CSE', 'C', 2025, 'Academic', 'Difficulties in grasping complex concepts.', 'Resolved', 'deepa.cse@kongu.edu', '14:50:25', '2023-10-25', '[{\"Forwarded\":[\"Ms.D.Deepa\",\"2023-10-25 14:50:25\"]},{\"Accepted\":[\"Ms.D.Deepa\",\"2023-10-25 11:26:03\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(41, '7b6f816e6eb7d117', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Courses', 'Confusion due to unclear subject explanations.', 'Rejected', 'pradeept.21cse@kongu.edu', '19:58:08', '2023-10-25', '[{\"Forwarded\":[\"Pradeep T\",\"2023-10-25 19:58:08\"]},{\"Rejected\":[\"Pradeep T\",\"2024-01-07 10:32:46\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '', 0),
(42, 'b7e89d16a847a9ab', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Company specific questions are not posted regularly', 'Accepted', 'vanikecit.cse@kongu.edu', '06:01:41', '2023-10-26', '[{\"Forwarded\":[\"Dr.Vani Rajasekar\",\"2023-10-26 06:01:41\"]},{\"Accepted\":[\"Dr.Vani Rajasekar\",\"2023-10-26 02:41:14\"]}]', '[{\"2023-10-26 02:42:19\":\"Shshdndn\"},{\"2023-10-26 02:43:57\":\"Hello\"}]', '', '{\"category\":\"Classroom\",\"Floor\":\"Ground Floor\",\"data\":\"Room 2\"}', 0),
(43, '967d849dad360246', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', '3 Lights are Damaged', 'Resolved', 'pradeept.21cse@kongu.edu', '11:38:21', '2023-11-04', '[{\"Forwarded\":[\"Pradeep T\",\"2023-11-04 11:38:21\"]},{\"Accepted\":[\"Pradeep T\",\"2024-01-14 16:01:43\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '{\"category\":\"Classroom\",\"Floor\":\"Ground Floor\",\"data\":\"Room 2\"}', 0),
(44, '3dc9609e42345c9f', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'It\'s convenient for us if the credit classes are scheduled on regular days like other Departments', 'Resolved', 'pradeept.21cse@kongu.edu', '08:19:59', '2023-12-01', '[{\"Forwarded\":[\"Pradeep T\",\"2023-12-01 08:19:59\"]},{\"Accepted\":[\"Pradeep T\",\"2023-12-01 05:56:14\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(45, '1d4012dcc8f6db9f', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Company specific questions are not posted regularly', 'Resolved', 'pradeept.21cse@kongu.edu', '10:49:32', '2023-12-01', '[{\"Forwarded\":[\"Pradeep T\",\"2023-12-01 10:49:32\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-12-01 06:21:27\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-12-01 06:22:43\"]},{\"Accepted\":[\"Pradeep T\",\"2023-12-01 06:24:12\"]}]', '[[],{\"2023-12-01 06:24:42\":\"Hello\"}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(46, '69b8b48aa282fc12', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Company specific questions are not posted regularly', 'Resolved', 'pradeept.21cse@kongu.edu', '11:02:49', '2023-12-01', '[{\"Forwarded\":[\"Pradeep T\",\"2023-12-01 11:02:49\"]},{\"Accepted\":[\"Pradeep T\",\"2023-12-01 06:33:50\"]}]', '[[],{\"2023-12-01 06:36:31\":\"Hello\"}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(47, '928a42b7a3acdd3b', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'It\'s convenient for us if the credit classes are scheduled on regular days like other Departments', 'Arrived', 'pradeept.21cse@kongu.edu', '11:34:13', '2023-12-01', '[{\"Forwarded\":[\"Pradeep T\",\"2023-12-01 11:34:13\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-12-02 05:25:14\"]}]', '[{}]', '', '', 2),
(48, '3f7d7310301fb9a8', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'It\'s good to us if more hours for practicing coding is provided', 'Resolved', 'pradeept.21cse@kongu.edu', '11:35:53', '2023-12-01', '[{\"Forwarded\":[\"Pradeep T\",\"2023-12-01 11:35:53\"]},{\"Accepted\":[\"Pradeep T\",\"2023-12-01 07:07:40\"]}]', '[[],{\"2023-12-01 07:09:07\":\"JVH\"}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(49, 'b6007cfde7156dcf', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'It\'s good to us if more hours for practicing coding is provided', 'Resolved', 'pradeept.21cse@kongu.edu', '17:02:15', '2023-12-01', '[{\"Forwarded\":[\"Pradeep T\",\"2023-12-01 17:02:15\"]},{\"Forwarded\":[\"Pradeep T\",\"2023-12-01 12:33:35\"]},{\"Accepted\":[\"Pradeep T\",\"2023-12-01 12:35:05\"]}]', '[[],{\"2024-01-13 03:49:56\":\"Hello\"}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(50, '4271ff736f5ba356', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', '1 Fan is Damaged', 'Rejected', 'pradeept.21cse@kongu.edu', '10:19:51', '2023-12-26', '[{\"Forwarded\":[\"Pradeep T\",\"2023-12-26 10:19:51\"]},{\"Rejected\":[\"Pradeep T\",\"2024-01-14 15:59:20\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '{\"category\":\"Classroom\",\"Floor\":\"First Floor\",\"data\":\"Room A\"}', 0),
(51, '6d335757bab009a7', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'It\'s good to us if more hours for practicing coding is provided', 'Arrived', 'pradeept.21cse@kongu.edu', '10:47:09', '2024-01-13', '[{\"Forwarded\":[\"Pradeep T\",\"2024-01-13 10:47:09\"]}]', '[{}]', '', '', 0),
(52, 'cd8b8ae9714a3158', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Company specific questions are not posted regularly', 'Arrived', 'pradeept.21cse@kongu.edu', '10:50:03', '2024-01-13', '[{\"Forwarded\":[\"Pradeep T\",\"2024-01-13 10:50:03\"]}]', '[{}]', '', '', 0),
(53, '655ffa04d5f8125e', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Special concern for project is required', 'Rejected', 'pradeept.21cse@kongu.edu', '10:51:39', '2024-01-13', '[{\"Forwarded\":[\"Pradeep T\",\"2024-01-13 10:51:39\"]},{\"Rejected\":[\"Pradeep T\",\"2024-01-14 15:56:43\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '', 0),
(54, 'fd9c7c94359072fb', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Students attending super PACC should be given special permission for rescheduling SPD related activities', 'Rejected', 'pradeept.21cse@kongu.edu', '10:54:29', '2024-01-13', '[{\"Forwarded\":[\"Pradeep T\",\"2024-01-13 10:54:29\"]},{\"Rejected\":[\"Pradeep T\",\"2024-01-14 15:55:08\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '', 0),
(55, '866192d8fbaffb67', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'It\'s good to us if more hours for practicing coding is provided', 'Rejected', 'pradeept.21cse@kongu.edu', '10:57:24', '2024-01-13', '[{\"Forwarded\":[\"Pradeep T\",\"2024-01-13 10:57:24\"]},{\"Rejected\":[\"Pradeep T\",\"2024-01-14 15:54:09\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '', 0),
(57, '629d26ba2c888e66', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', '1 Fan is Damaged', 'Rejected', 'pradeept.21cse@kongu.edu', '16:10:35', '2024-01-13', '[{\"Forwarded\":[\"Pradeep T\",\"2024-01-13 16:10:35\"]},{\"Rejected\":[\"Pradeep T\",\"2024-01-14 15:52:20\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '{\"category\":\"Classroom\",\"Floor\":\"Ground Floor\",\"data\":\"Room 1\"}', 0),
(61, '6241b2b5e68d824f', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'It\'s good to us if more hours for practicing coding is provided', 'Resolved', 'pradeept.21cse@kongu.edu', '12:00:09', '2024-02-07', '[{\"Forwarded\":[\"Pradeep T\",\"2024-02-07 12:00:09\"]},{\"Accepted\":[\"Pradeep T\",\"2024-02-17 07:30:06\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:30:37\"]', '', 0),
(62, 'b3afd15bed13c360', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'It\'s good to us if more hours for practicing coding is provided', 'Rejected', 'pradeept.21cse@kongu.edu', '12:00:35', '2024-02-07', '[{\"Forwarded\":[\"Pradeep T\",\"2024-02-07 12:00:35\"]},{\"Rejected\":[\"Pradeep T\",\"2024-02-17 07:03:22\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '', 0),
(63, 'e7b69e545960ce05', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Maintenance', 'Light are not working', 'Arrived', 'pradeept.21cse@kongu.edu', '12:01:42', '2024-02-07', '[{\"Forwarded\":[\"Pradeep T\",\"2024-02-07 12:01:42\"]}]', '[{}]', '', '{\"category\":\"Restroom\",\"Floor\":\"Ground Floor\",\"data\":\"Male\"}', 0),
(64, '5bd7b9c330ef176f', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Students attending super PACC should be given special permission for rescheduling SPD related activities', 'Rejected', 'pradeept.21cse@kongu.edu', '06:58:38', '2024-02-08', '[{\"Forwarded\":[\"Pradeep T\",\"2024-02-08 06:58:38\"]},{\"Rejected\":[\"Pradeep T\",\"2024-02-16 16:32:45\"]},{\"Rejected\":[\"Pradeep T\",\"2024-02-16 16:39:56\"]},{\"Rejected\":[\"Pradeep T\",\"2024-02-16 16:42:48\"]},{\"Rejected\":[\"Pradeep T\",\"2024-02-16 16:45:31\"]},{\"Rejected\":[\"Pradeep T\",\"2024-02-16 16:48:33\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '', 0),
(65, 'cd77535f618c280d', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Academic', 'Company-specific questions are not posted regularly', 'Rejected', 'pradeept.21cse@kongu.edu', '07:01:10', '2024-02-08', '[{\"Forwarded\":[\"Pradeep T\",\"2024-02-08 07:01:10\"]},{\"Rejected\":[\"Pradeep T\",\"2024-02-16 16:29:39\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', '', 3),
(66, 'cefd1e03778e93d0', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Courses', 'Confusion due to unclear subject explanations.', 'Arrived', 'pradeept.21cse@kongu.edu', '18:54:51', '2024-02-08', '[{\"Forwarded\":[\"Pradeep T\",\"2024-02-08 18:54:51\"]}]', '[{}]', '', ' 20CST61', 0),
(67, '43799851c9b868e2', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Others', 'Difficulties in grasping complex concepts.', 'Arrived', 'pradeept.21cse@kongu.edu', '19:13:13', '2024-02-08', '[{\"Forwarded\":[\"Pradeep T\",\"2024-02-08 19:13:13\"]}]', '[{}]', '', '', 0),
(68, '2207f207ce56c003', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 2025, 'Lab', 'Difficulties in grasping complex concepts.', 'Rejected', 'pradeept.21cse@kongu.edu', '19:39:33', '2024-02-08', '[{\"Forwarded\":[\"Pradeep T\",\"2024-02-08 19:39:33\"]},{\"Rejected\":[\"Pradeep T\",\"2024-02-17 07:05:17\"]}]', '[{}]', '[\"Pradeep T\",\"2024-02-17 07:05:17\",\"A3\"]', ' 20CSL62', 0);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `Id` int(11) NOT NULL,
  `Email` varchar(70) NOT NULL,
  `Limits` int(11) NOT NULL DEFAULT 1,
  `Formdata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `event_id` varchar(32) NOT NULL,
  `IntervalTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Title` varchar(40) NOT NULL,
  `Status` varchar(20) DEFAULT 'open',
  `Date` date DEFAULT NULL,
  `visible` varchar(40) NOT NULL DEFAULT 'Private',
  `constraints` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`Id`, `Email`, `Limits`, `Formdata`, `event_id`, `IntervalTime`, `Title`, `Status`, `Date`, `visible`, `constraints`) VALUES
(1, 'pradeept.21cse@kongu.edu', 7, '{\"title\":\"Pradeep\",\"description\":\"ddc\",\"inputs\":[{\"label\":\"NAme\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Hello\",\"type\":\"text\",\"choices\":[]}]}', 'd8b9a4d4555525f6dcf2f04de2773f1d', '2024-01-08 18:30:00', 'Pradeep', 'closed', '2023-10-05', 'Private', ''),
(2, 'pradeept.21cse@kongu.edu', 4, '{\"title\":\"Apple\",\"description\":\"it is a fruit\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Roll No\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Gender\",\"type\":\"radio\",\"choices\":[\"Male\",\"Female\"]}]}', '11f5ff6e3dc5307ab7640d26141c3817', '2024-01-30 18:30:00', 'Apple', 'closed', '2023-09-09', 'constraint', '[\"CSE\",\"2025\",\"C\"]'),
(3, 'pradeept.21cse@kongu.edu', 4, '{\"title\":\"Event\",\"description\":\"msdjhfsefe\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Rollno\",\"type\":\"text\",\"choices\":[]}]}', '71fa164755c78b94ee24cffdae9d205e', '2024-02-06 01:26:51', 'Event', 'closed', '2023-09-07', 'Private', ''),
(5, 'pradeept.21cse@kongu.edu', 1, '{\"title\":\"Pradeepd\",\"description\":\"kjdnkje\",\"inputs\":[{\"label\":\"sldksejnk\",\"type\":\"text\",\"choices\":[]}]}', '7d4e265958b8dfa0dfdb6c1bf13b8b1b', '2024-02-22 18:30:00', 'Pradeepd', 'closed', '2023-09-09', 'constraint', '[\"CSE\",\"2025\",\"Not Applied\"]'),
(6, 'pradeept.21cse@kongu.edu', 1, '{\"title\":\"Pradeep5\",\"description\":\"sejfjer\",\"inputs\":[{\"label\":\"sdkjnkjew\",\"type\":\"text\",\"choices\":[]}]}', '835d4b48d331629666cbd4bbd91fa1d8', '2023-09-27 18:30:00', 'Pradeep5', 'closed', '2023-09-28', 'Public', ''),
(7, 'pradeept.21cse@kongu.edu', 1, '{\"title\":\"asdsdssfd\",\"description\":\"weuygyuewjhwd\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Roll No\",\"type\":\"text\",\"choices\":[]}]}', '5d1a104874e5f012acfe57a278909aeb', '2023-09-14 18:30:00', 'asdsdssfd', 'closed', '2023-09-15', 'Public', ''),
(8, 'pradeept.21cse@kongu.edu', 4, '{\"title\":\"Simple\",\"description\":\"d,nsdkjsdf\",\"inputs\":[{\"label\":\"Hello\",\"type\":\"text\",\"choices\":[]},{\"label\":\"aswed\",\"type\":\"text\",\"choices\":[]}]}', '1ccea27a6dd82827c94ff7a6663e5a56', '2023-10-25 18:30:00', 'Simple', 'closed', '2023-10-23', 'Public', ''),
(11, 'pradeept.21cse@kongu.edu', 1, '{\"title\":\"Pradeepqss\",\"description\":\"d,ndsndkj\",\"inputs\":[{\"label\":\"Hello\",\"type\":\"text\",\"choices\":[]}]}', 'b301b3c0f49edda1d9f1ec88f68a1567', '2023-11-03 18:30:00', 'Pradeepqss', 'closed', '2023-11-04', 'Public', ''),
(12, 'pradeept.21cse@kongu.edu', 1, '{\"title\":\"Hen\",\"description\":\"demo\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]}]}', '1247feba2da552dcf891b71e302d81d1', '2023-12-03 18:30:00', 'Hen', 'closed', '2023-12-01', 'Public', ''),
(13, 'pradeept.21cse@kongu.edu', 7, '{\"title\":\"ssaa\",\"description\":\"Hello World\",\"inputs\":[{\"label\":\"Willing\",\"type\":\"radio\",\"choices\":[\"Yes\",\"No\"]}]}', '0d70ffecd3154ad9c876db20d47c0d23', '2024-01-07 18:30:00', 'ssaa', 'closed', '2023-12-31', 'constraint', '[\"CSE\",\"2026\",\"C\"]'),
(14, 'pradeept.21cse@kongu.edu', 1, '{\"title\":\"sdfg\",\"description\":\"qweasd123\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Roll\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Hello\",\"type\":\"checkbox\",\"choices\":[\"water\"]},{\"label\":\"mini\",\"type\":\"number\",\"choices\":[]}]}', '06c2f764e0993d9d8479aee883d5621e', '2024-01-11 18:30:00', 'sdfg', 'closed', '2023-12-31', 'constraint', '[\"CSE\",\"2024\",\"A\"]'),
(16, 'pradeept.21cse@kongu.edu', 1, '{\"title\":\"qweasd\",\"description\":\"qqqqqqqqq\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Roll\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Interested\",\"type\":\"text\",\"choices\":[]}]}', '380056b3a57abea8d23d189b33ca9d49', '2024-02-06 01:26:49', 'qweasd', 'closed', '2024-01-08', 'Private', ''),
(17, 'pradeept.21cse@kongu.edu', 1, '{\"title\":\"Derimdsc\",\"description\":\"ascsdfsv\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Roll\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Hello\",\"type\":\"text\",\"choices\":[]}]}', '466d176613c4e8a7ae31e016d7a2b26f', '2024-02-06 01:26:44', 'Derimdsc', 'closed', '2024-01-08', 'Private', ''),
(18, 'pradeept.21cse@kongu.edu', 1, '{\"title\":\"From\",\"description\":\"qweasd\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Roll\",\"type\":\"text\",\"choices\":[]},{\"label\":\"abc\",\"type\":\"number\",\"choices\":[]}]}', 'ea6581d1b508721a38ca29f9d26c0d29', '2024-02-06 01:26:41', 'From', 'closed', '2024-01-08', 'Private', ''),
(19, 'pradeept.21cse@kongu.edu', 40, '{\"title\":\"qweasd\",\"description\":\"from\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Roll\",\"type\":\"text\",\"choices\":[]},{\"label\":\"asd\",\"type\":\"text\",\"choices\":[]}]}', '6c956e4aea8bcd46953aab162cd39b17', '2024-08-08 18:30:00', 'qweasd', 'open', '2024-01-08', 'Private', ''),
(20, 'pradeept.21cse@kongu.edu', 22, '{\"title\":\"Hello\",\"description\":\"sdjhbdsfhjf\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Roll\",\"type\":\"text\",\"choices\":[]},{\"label\":\"asd\",\"type\":\"text\",\"choices\":[]}]}', '5d7fabef9bf1905947fd68b3c2a3aa2f', '2025-07-08 18:30:00', 'Hello', 'open', '2024-01-08', 'constraint', '[\"CSE\",\"2024\",\"C\"]'),
(21, 'pradeept.21cse@kongu.edu', 16, '{\"title\":\"qewew\",\"description\":\"grdgrtded\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Roll\",\"type\":\"text\",\"choices\":[]},{\"label\":\"what\",\"type\":\"text\",\"choices\":[]}]}', 'f09782e6ef434652a17c9a80bbe5f80d', '2026-07-22 18:30:00', 'qewew', 'open', '2024-01-08', 'constraint', '[\"CSE\",\"2025\",\"D\"]'),
(22, 'pradeept.21cse@kongu.edu', 1, '{\"title\":\"Hello\",\"description\":\"qweasd\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Roll\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Willing\",\"type\":\"radio\",\"choices\":[\"Yes\",\"No\"]}]}', 'c8facd3d20ac2ba91940117461f29068', '2024-02-06 01:26:37', 'Hello', 'closed', '2024-01-12', 'Public', ''),
(23, 'pradeept.21cse@kongu.edu', 4, '{\"title\":\"Pradeep Event\",\"description\":\"qwesd\",\"inputs\":[{\"label\":\"Name\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Roll\",\"type\":\"text\",\"choices\":[]},{\"label\":\"Willing\",\"type\":\"radio\",\"choices\":[\"Yes\",\"No\"]}]}', '0c9e7bdbdae14be3e365b5bc62972d86', '2024-02-06 01:26:57', 'Pradeep Event', 'closed', '2024-01-12', 'Private', '[\"Not Applied\",\"Not Applied\",\"Not Applied\"]');

-- --------------------------------------------------------

--
-- Table structure for table `events_response`
--

CREATE TABLE `events_response` (
  `Id` int(11) NOT NULL,
  `Event_Id` varchar(32) NOT NULL,
  `ResponseTime` datetime NOT NULL,
  `Response` varchar(10000) NOT NULL,
  `Email` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events_response`
--

INSERT INTO `events_response` (`Id`, `Event_Id`, `ResponseTime`, `Response`, `Email`) VALUES
(4, 'd8b9a4d4555525f6dcf2f04de2773f1d', '2023-09-05 09:36:01', '\"{\"Name\":\"Sabarish\",\"Hello\":\"Wanted\"}\"', 'sabarishv.21cse@kongu.edu'),
(16, '11f5ff6e3dc5307ab7640d26141c3817', '2023-09-05 14:22:05', '\"{\"Name\":\"GhostTamil GhostTamil\",\"Roll No\":\"sd,jsndkjsdff\",\"Gender\":\"Male\"}\"', 'sabarishv.21cse@kongu.edu'),
(17, '11f5ff6e3dc5307ab7640d26141c3817', '2023-09-05 22:34:08', '\"{\"Name\":\"Aplle\",\"Roll No\":\"1111111\",\"Gender\":\"Male\"}\"', 'santhoshm.21cse@kongu.edu'),
(18, 'd8b9a4d4555525f6dcf2f04de2773f1d', '2023-09-06 13:25:50', '\"{\"Name\":\"Hello\",\"Hello\":\"kdsdjvnsd\"}\"', 'santhoshm.21cse@kongu.edu'),
(19, 'd8b9a4d4555525f6dcf2f04de2773f1d', '2023-09-06 13:29:07', '\"{\"Name\":\"skdjsef\",\"Hello\":\"skdbhjsef\"}\"', 'niganths.21cse@kongu.edu'),
(22, 'd8b9a4d4555525f6dcf2f04de2773f1d', '2023-09-08 07:16:39', '\"{\"Name\":\"Pradeep\",\"Hello\":\"sdlkkdsf\"}\"', 'prithivirajp.21cse@kongu.edu'),
(23, '5d1a104874e5f012acfe57a278909aeb', '2023-09-15 05:24:24', '\"{\"Name\":\"Pradeep\",\"Roll No\":\"21CSR141\"}\"', 'pradeept.21cse@kongu.edu'),
(24, '71fa164755c78b94ee24cffdae9d205e', '2023-11-04 11:47:25', '\"{\"Name\":\"Pradeep.T\",\"Rollno\":\"21CSR141\"}\"', 'pradeept.21cse@kongu.edudsd'),
(25, 'd8b9a4d4555525f6dcf2f04de2773f1d', '2023-11-07 12:40:17', '\"{\"Name\":\"Prawqertyhjydfghjgfdghjk\",\"Hello\":\"frwreryiuyhtfl.kjm\"}\"', 'pradeept.21cse@kongu.edu'),
(26, '1247feba2da552dcf891b71e302d81d1', '2023-12-01 10:57:52', '\"{\"Name\":\"Hello\"}\"', 'pradeept.21cse@kongu.edu'),
(38, '06c2f764e0993d9d8479aee883d5621e', '2024-01-07 13:56:15', '\"{\"Name\":\"PRADEEP T\",\"Roll\":\"21CSR141\",\"Hello\":\"water\",\"mini\":\"5\"}\"', 'pradeept.21cse@kongu.edu');

-- --------------------------------------------------------

--
-- Table structure for table `faculty_complaints`
--

CREATE TABLE `faculty_complaints` (
  `Id` int(11) NOT NULL,
  `Complaint_Id` varchar(50) NOT NULL COMMENT '16 digit Random Number',
  `email` varchar(80) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `Roll_No` varchar(8) NOT NULL,
  `Department` varchar(11) NOT NULL,
  `Class` varchar(1) NOT NULL,
  `Type` varchar(50) NOT NULL DEFAULT '''Public''',
  `Description` varchar(200) NOT NULL,
  `Status` varchar(20) NOT NULL COMMENT 'Arrived, Completed,Rejected',
  `CreateTime` varchar(20) NOT NULL,
  `info1` varchar(1000) NOT NULL,
  `info3` varchar(1000) NOT NULL DEFAULT '[{}]',
  `info4` varchar(1000) NOT NULL,
  `Batch` int(11) NOT NULL,
  `Subjectname` varchar(40) NOT NULL,
  `FacultyName` varchar(40) NOT NULL,
  `FacultyEmail` varchar(40) NOT NULL,
  `Handler` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty_complaints`
--

INSERT INTO `faculty_complaints` (`Id`, `Complaint_Id`, `email`, `Name`, `Roll_No`, `Department`, `Class`, `Type`, `Description`, `Status`, `CreateTime`, `info1`, `info3`, `info4`, `Batch`, `Subjectname`, `FacultyName`, `FacultyEmail`, `Handler`) VALUES
(1, '5861148bbba55034', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 'Public', 'Limited availability of subject-specific software or tools.', 'Rejected', '16:00:06', '2023-10-24', '', '[\"Pradeep T\",\"2024-01-07 10:23:53\"]', 2025, 'Agile Methodologies', 'Pradeep T', 'pradeept.21cse@kongu.edu', 'pradeept.21cse@kongu.edu'),
(2, '3d64b6eb6a86b61f', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 'Public', 'Can teach slower as we can\'t catch with their speed of teaching', 'Rejected', '09:43:57', '2023-12-01', '', '', 2025, 'Agile Methodologies', 'Pradeep T', 'pradeept.21cse@kongu.edu', 'pradeept.21cse@kongu.edu'),
(3, 'f76607ee534188ab', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'C', 'Public', 'Can send materials / refrences on ongoing topics', 'Accepted', '10:31:14', '2023-12-26', '[{}]', '', 2025, 'Agile Methodologies', 'Pradeep T', 'pradeept.21cse@kongu.edu', 'pradeept.21cse@kongu.edu'),
(6, '2528db03e11df1b2', 'pradeept.21cse@kongu.edu', '--/--', '--/--', 'CSE', 'F', 'Anonymous', 'Can send materials / refrences on ongoing topics', 'Arrived', '07:53:33', '2024-01-08', '[{}]', '', 2025, 'Agile Methodologies', 'Pradeep T', 'pradeept.21cse@kongu.edu', NULL),
(8, '99a5a792bac76635', 'pradeept.21cse@kongu.edu', 'PRADEEP T', '21CSR141', 'CSE', 'F', 'Public', 'Can teach slower as we can\'t catch with their speed of teaching', 'Arrived', '08:10:35', '2024-01-08', '[{}]', '', 2025, 'Agile Methodologies', 'Pradeep T', 'pradeept.21cse@kongu.edu', NULL),
(9, '546e3bf833e7d56c', 'pradeept.21cse@kongu.edu', '--/--', '--/--', 'CSE', '-', 'Anonymous', 'Can teach slower as we can\'t catch with their speed of teaching', 'Resolved', '08:11:31', '2024-01-08', '[[],{\"2024-01-08 03:44:11\":\"Hello\"}]', '[\"Pradeep T\",\"2024-02-08 03:08:52\"]', 2025, 'Agile Methodologies', 'Pradeep T', 'pradeept.21cse@kongu.edu', 'pradeept.21cse@kongu.edu');

-- --------------------------------------------------------

--
-- Table structure for table `semester`
--

CREATE TABLE `semester` (
  `semester_id` int(11) NOT NULL,
  `batch` int(11) DEFAULT NULL,
  `class` varchar(10) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `Semester` int(11) NOT NULL,
  `Year_Incharge` varchar(50) DEFAULT NULL,
  `HOD` varchar(50) DEFAULT NULL,
  `Maintenance` varchar(50) DEFAULT NULL,
  `Advisor1` varchar(70) NOT NULL DEFAULT 'kongu.edu',
  `Advisor2` varchar(70) NOT NULL DEFAULT 'kongu.edu',
  `Advisor3` varchar(70) NOT NULL DEFAULT 'kongu.edu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semester`
--

INSERT INTO `semester` (`semester_id`, `batch`, `class`, `department`, `Semester`, `Year_Incharge`, `HOD`, `Maintenance`, `Advisor1`, `Advisor2`, `Advisor3`) VALUES
(1, 2025, 'A', 'CSE', 6, 'rrr.cse@kongu.edu ', 'mallisenthil.cse@kongu.edu', 'tkumar.cse@kongu.edu', 'latha.cse@kongu.edu', 'sasipriya.cse@kongu.edu', 'sureshkumar.cse@kongu.edu'),
(2, 2025, 'B', 'CSE', 6, 'rrr.cse@kongu.edu ', 'mallisenthil.cse@kongu.edu', 'tkumar.cse@kongu.edu', 'npsaravanan.cse@kongu.edu', 'kalaivanip.cse@kongu.edu', 'tkumar.cse@kongu.edu'),
(3, 2025, 'C', 'CSE', 6, 'rrr.cse@kongu.edu ', 'mallisenthil.cse@kongu.edu', 'tkumar.cse@kongu.edu', 'vanikecit.cse@kongu.edu', 'muthuraja.cse@kongu.edu', 'kavitha.cse@kongu.edu'),
(4, 2025, 'D', 'CSE', 6, 'rrr.cse@kongu.edu ', 'mallisenthil.cse@kongu.edu', 'tkumar.cse@kongu.edu', 'geetha.cse@kongu.edu', 'kavithak.cse@kongu.edu', 'aadhishri.cse@kongu.edu');

-- --------------------------------------------------------

--
-- Table structure for table `semestersubject`
--

CREATE TABLE `semestersubject` (
  `id` int(11) NOT NULL,
  `semester_id` int(11) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `course_name` varchar(80) NOT NULL,
  `advisor_email` varchar(50) DEFAULT NULL,
  `Type` varchar(50) NOT NULL DEFAULT 'Others'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semestersubject`
--

INSERT INTO `semestersubject` (`id`, `semester_id`, `semester`, `course_code`, `course_name`, `advisor_email`, `Type`) VALUES
(1, 1, 6, ' 20CST61', 'Principles of Compiler Design', ' sramya.cse@kongu.edu', 'Courses'),
(2, 1, 6, ' 20CST62', 'Internet of Things and Cloud', ' pnandhini.cse@kongu.edu', 'Courses'),
(3, 1, 6, ' 20CST63', 'Mobile Communication', ' ddeepa.cse@kongu.edu', 'Courses'),
(4, 1, 6, ' 20MAO03', 'Data Analytics using R Programming', ' kradhika.cse@kongu.edu', 'OE'),
(5, 1, 6, ' 20MAO04', 'Number Theory and Cryptography', ' mdhavamani.cse@kongu.edu', 'OE'),
(6, 1, 6, ' 20ITO06', 'Advanced Java Programming', ' tabirami.cse@kongu.edu', 'OE'),
(7, 1, 6, ' 20ITO08', 'Disaster Management for Information Technology', ' dvijayanand.cse@kongu.edu', 'OE'),
(8, 1, 6, ' 20CDO03', 'Introduction to Mobile Game Design', ' sselvaraj.cse@kongu.edu', 'OE'),
(9, 1, 6, ' 20CSL61', 'Compiler Design Lab', ' sramya.cse@kongu.edu', 'Lab'),
(10, 1, 6, ' 20CSL62', 'Internet of Things and Cloud Lab', ' pnandhini.cse@kongu.edu', 'Lab'),
(11, 1, 6, ' 20CSL63', 'Open Source Systems Lab', ' ksureshkumar.cse@kongu.edu', 'Lab'),
(12, 1, 6, ' 20GEP61', 'Comprehensive Test/Viva', 'suvalakshmi.cse@kongu.edu', 'Courses'),
(13, 1, 6, ' 20MNT31', 'Environmental Science', ' pkrishnamoorthy.cse@kongu.edu', 'Courses'),
(14, 1, 6, ' 20CSP61', 'Project Work 1', ' nsasipriya.cse@kongu.edu', 'Courses'),
(15, 1, 6, ' 20CSH03', 'Text and Speech Analytics', ' rthangarajan.cse@kongu.edu', 'Courses'),
(16, 1, 6, ' 20CSH04', 'Image and Video Analytics', ' rrr.cse@kongu.edu', 'Courses'),
(17, 1, 6, ' SPD', 'Student Personality Development', ' ksureshkumar.cse@kongu.edu', 'Others'),
(18, 1, 6, ' COUN', 'Counselling', ' rlatha.cse@kongu.edu', 'Others'),
(19, 1, 6, ' LIB', 'Library', ' nsasipriya.cse@kongu.edu', 'Others'),
(20, 1, 6, ' SS', 'Soft Skills', ' tarunkumar.cse@kongu.edu', 'Others'),
(21, 1, 6, ' PT', 'Placement Training', ' csagana.cse@kongu.edu', 'Others'),
(22, 2, 6, ' 20CST61', 'Principles of Compiler Design', ' tkumaravel.cse@kongu.edu', 'Courses'),
(23, 2, 6, ' 20CST62', 'Internet of Things and Cloud', ' pkalaivani.cse@kongu.edu', 'Courses'),
(24, 2, 6, ' 20CST63', 'Mobile Communication', ' csharmila.cse@kongu.edu', 'Courses'),
(25, 2, 6, ' 20MAO03', 'Data Analytics using R Programming', ' kradhika.cse@kongu.edu', 'OE'),
(26, 2, 6, ' 20MAO04', 'Number Theory and Cryptography', ' mdhavamani.cse@kongu.edu', 'OE'),
(27, 2, 6, ' 20ITO06', 'Advanced Java Programming', ' tabirami.cse@kongu.edu', 'OE'),
(28, 2, 6, ' 20ITO08', 'Disaster Management for Information Technology', ' dvijayanand.cse@kongu.edu', 'OE'),
(29, 2, 6, ' 20CDO03', 'Introduction to Mobile Game Design', ' sselvaraj.cse@kongu.edu', 'OE'),
(30, 2, 6, ' 20CSL61', 'Compiler Design Lab', ' tkumaravel.cse@kongu.edu', 'Lab'),
(31, 2, 6, ' 20CSL62', 'Internet of Things and Cloud Lab', ' pkalaivani.cse@kongu.edu', 'Lab'),
(32, 2, 6, ' 20CSL63', 'Open Source Systems Lab', ' psanthiya.cse@kongu.edu', 'Lab'),
(33, 2, 6, ' 20GEP61', 'Comprehensive Test/Viva', ' sgayathri.cse@kongu.edu', 'Courses'),
(34, 2, 6, ' 20MNT31', 'Environmental Science', ' kmanjularani.cse@kongu.edu', 'Courses'),
(35, 2, 6, ' 20CSP61', 'Project Work 1', ' pkalaivani.cse@kongu.edu', 'Courses'),
(36, 2, 6, ' 20CSH03', 'Text and Speech Analytics', ' rthangarajan.cse@kongu.edu', 'Courses'),
(37, 2, 6, ' 20CSH04', 'Image and Video Analytics', ' rrr.cse@kongu.edu', 'Courses'),
(38, 2, 6, ' SPD', 'Student Personality Development', ' tkumaravel.cse@kongu.edu', 'Others'),
(39, 2, 6, ' COUN', 'Counselling', ' npsaravanan.cse@kongu.edu', 'Others'),
(40, 2, 6, ' LIB', 'Library', ' pkalaivani.cse@kongu.edu', 'Others'),
(41, 2, 6, ' SS', 'Soft Skills', ' naravindhraj.cse@kongu.edu', 'Others'),
(42, 2, 6, ' PT', 'Placement Training', ' rkarunamoorthi.cse@kongu.edu', 'Others'),
(43, 3, 6, ' 20CST61', 'Principles of Compiler Design', ' mmuthuraja.cse@kongu.edu', 'Courses'),
(44, 3, 6, ' 20CST62', 'Internet of Things and Cloud', ' rsshudapreyaa.cse@kongu.edu', 'Courses'),
(45, 3, 6, ' 20CST63', 'Mobile Communication', ' ksangeetha.cse@kongu.edu', 'Courses'),
(46, 3, 6, ' 20MAO03', 'Data Analytics using R Programming', ' kradhika.cse@kongu.edu', 'OE'),
(47, 3, 6, ' 20MAO04', 'Number Theory and Cryptography', ' kvtamilselvi.cse@kongu.edu', 'OE'),
(48, 3, 6, ' 20ITO06', 'Advanced Java Programming', ' tabirami.cse@kongu.edu', 'OE'),
(49, 3, 6, ' 20ITO08', 'Disaster Management for Information Technology', ' dvijayanand.cse@kongu.edu', 'OE'),
(50, 3, 6, ' 20CDO03', 'Introduction to Mobile Game Design', ' sselvaraj.cse@kongu.edu', 'OE'),
(51, 3, 6, ' 20CSL61', 'Compiler Design Lab', ' mmuthuraja.cse@kongu.edu', 'Lab'),
(52, 3, 6, ' 20CSL62', 'Internet of Things and Cloud Lab', ' rsshudapreyaa.cse@kongu.edu', 'Lab'),
(53, 3, 6, ' 20CSL63', 'Open Source Systems Lab', ' csharmila.cse@kongu.edu', 'Lab'),
(54, 3, 6, ' 20GEP61', 'Comprehensive Test/Viva', ' vanirajasekar.cse@kongu.edu', 'Courses'),
(55, 3, 6, ' 20MNT31', 'Environmental Science', ' kkrishnaveni.cse@kongu.edu', 'Courses'),
(56, 3, 6, ' 20CSP61', 'Project Work 1', ' mmuthuraja.cse@kongu.edu', 'Courses'),
(57, 3, 6, ' 20CSH03', 'Text and Speech Analytics', ' rthangarajan.cse@kongu.edu', 'Courses'),
(58, 3, 6, ' 20CSH04', 'Image and Video Analytics', ' rrr.cse@kongu.edu', 'Courses'),
(59, 3, 6, ' SPD', 'Student Personality Development', ' skavitha.cse@kongu.edu', 'Others'),
(60, 3, 6, ' COUN', 'Counselling', ' vanirajasekar.cse@kongu.edu', 'Others'),
(61, 3, 6, ' LIB', 'Library', ' mmuthuraja.cse@kongu.edu', 'Others'),
(62, 3, 6, ' SS', 'Soft Skills', ' vmanimaran.cse@kongu.edu', 'Others'),
(63, 3, 6, ' PT', 'Placement Training', ' csharmila.cse@kongu.edu', 'Others'),
(64, 4, 6, ' 20CST61', 'Principles of Compiler Design', ' ddeepa.cse@kongu.edu', 'Courses'),
(65, 4, 6, ' 20CST62', 'Internet of Things and Cloud', ' mgeetha.cse@kongu.edu', 'Courses'),
(66, 4, 6, ' 20CST63', 'Mobile Communication', ' psanthiya.cse@kongu.edu', 'Courses'),
(67, 4, 6, ' 20MAO03', 'Data Analytics using R Programming', ' kradhika.cse@kongu.edu', 'OE'),
(68, 4, 6, ' 20MAO04', 'Number Theory and Cryptography', ' kvtamilselvi.cse@kongu.edu', 'OE'),
(69, 4, 6, ' 20ITO06', 'Advanced Java Programming', ' tabirami.cse@kongu.edu', 'OE'),
(70, 4, 6, ' 20ITO08', 'Disaster Management for Information Technology', ' dvijayanand.cse@kongu.edu', 'OE'),
(71, 4, 6, ' 20CDO03', 'Introduction to Mobile Game Design', ' sselvaraj.cse@kongu.edu', 'OE'),
(72, 4, 6, ' 20CSL61', 'Compiler Design Lab', ' ddeepa.cse@kongu.edu', 'Lab'),
(73, 4, 6, ' 20CSL62', 'Internet of Things and Cloud Lab', ' mgeetha.cse@kongu.edu', 'Lab'),
(74, 4, 6, ' 20CSL63', 'Open Source Systems Lab', ' smohanasaranya.cse@kongu.edu', 'Lab'),
(75, 4, 6, ' 20GEP61', 'Comprehensive Test/Viva', ' aadhishri.cse@kongu.edu', 'Courses'),
(76, 4, 6, ' 20MNT31', 'Environmental Science', ' psrinivasan.cse@kongu.edu', 'Courses'),
(77, 4, 6, ' 20CSP61', 'Project Work 1', ' sgayathri.cse@kongu.edu', 'Courses'),
(78, 4, 6, ' 20CSH03', 'Text and Speech Analytics', ' rthangarajan.cse@kongu.edu', 'Courses'),
(79, 4, 6, ' 20CSH04', 'Image and Video Analytics', ' rrr.cse@kongu.edu', 'Courses'),
(80, 4, 6, ' SPD', 'Student Personality Development', ' aadhishri.cse@kongu.edu', 'Others'),
(81, 4, 6, ' COUN', 'Counselling', ' kkavitha.cse@kongu.edu', 'Others'),
(82, 4, 6, ' LIB', 'Library', ' mgeetha.cse@kongu.edu', 'Others'),
(83, 4, 6, ' SS', 'Soft Skills', ' kkavitha.cse@kongu.edu', 'Others'),
(84, 4, 6, ' PT', 'Placement Training', ' smohanapriya.cse@kongu.edu', 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `student_info`
--

CREATE TABLE `student_info` (
  `Id` int(11) NOT NULL,
  `Roll_No` varchar(8) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Department` varchar(8) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Class` varchar(3) NOT NULL,
  `Batch` int(11) NOT NULL,
  `Gender` varchar(20) NOT NULL,
  `Electives` varchar(70) NOT NULL COMMENT 'end the list with comma'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_info`
--

INSERT INTO `student_info` (`Id`, `Roll_No`, `Name`, `Department`, `Email`, `Class`, `Batch`, `Gender`, `Electives`) VALUES
(1, '21CSL253', 'AKILESH S', 'CSE', 'akileshs.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(2, '21CSL255', 'ARSHATH AHAMED M', 'CSE', 'arshathahamedm.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(3, '21CSL256', 'DANEESH M', 'CSE', 'daneeshm.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(4, '21CSL257', 'DHARSHAN P', 'CSE', 'dharshanp.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(5, '21CSL258', 'HARIHARAN M', 'CSE', 'hariharanm.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(6, '21CSL259', 'INDRA B', 'CSE', 'indrab.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(7, '21CSL260', 'KANISHKAR B', 'CSE', 'kanishakarb.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(8, '21CSL261', 'KANISHK P', 'CSE', 'kanishkp.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(9, '21CSL262', 'KIRUTHIKA R', 'CSE', 'kiruthikar.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(10, '21CSL263', 'LOGESHWAR R', 'CSE', 'logeshwarr.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(11, '21CSL264', 'NAVIEN B R', 'CSE', 'navienbr.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(12, '21CSL265', 'NITHISH S V', 'CSE', 'nithishsv.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(13, '21CSL266', 'PERINBAN S', 'CSE', 'perinbans.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(14, '21CSL267', 'POOVARASAN V', 'CSE', 'poovarasanv.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(15, '21CSL268', 'PRADEEP S', 'CSE', 'pradeeps.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(16, '21CSL269', 'PRASANTH T', 'CSE', 'prasantht.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(17, '21CSL270', 'RAAHUL SIV V K', 'CSE', 'raahulsivvk.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(18, '21CSL271', 'SANDEEP KRISHNA T', 'CSE', 'sandeepkrishnat.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(19, '21CSL272', 'SAVITHA S', 'CSE', 'savithas.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(20, '21CSR001', 'AAKASH S', 'CSE', 'aakashs.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(21, '21CSR002', 'ABINAYA B', 'CSE', 'abinayab.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(22, '21CSR003', 'ABISHEK R', 'CSE', 'abishekr.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(23, '21CSR004', 'AGALYA L R', 'CSE', 'agalyalr.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(24, '21CSR005', 'AGILAN V S', 'CSE', 'agilanvs.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(25, '21CSR006', 'AISHWARYA SREE V', 'CSE', 'aishwaryasreev.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(26, '21CSR007', 'ANGEL SHALINI P', 'CSE', 'angelshalinip.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(27, '21CSR008', 'ARULKUMAR A', 'CSE', 'arulkumara.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(28, '21CSR009', 'ARUMUGAM A K', 'CSE', 'arumugamak.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(29, '21CSR010', 'ARUNKUMAR K', 'CSE', 'arunkumark.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(30, '21CSR011', 'ASMA MALICA J', 'CSE', 'asmamalicaj.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(31, '21CSR012', 'ASWIN S', 'CSE', 'aswins.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(32, '21CSR013', 'ATHISH S K', 'CSE', 'athishsk.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(33, '21CSR015', 'BADRI NAARAYAN C G', 'CSE', 'badrinaarayancg.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(34, '21CSR016', 'BHARAT KUMAARAN P', 'CSE', 'bharatkumaaranp.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(35, '21CSR017', 'BHARATHI G', 'CSE', 'bharathig.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(36, '21CSR018', 'BHARATHI T', 'CSE', 'bharathit.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(37, '21CSR019', 'BHAVADHARANI K', 'CSE', 'bhavadharanik.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(38, '21CSR020', 'BOMMISRILEKKHAA G', 'CSE', 'bommisrilekkhaag.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(39, '21CSR021', 'BOOPATHI RAJA S', 'CSE', 'boopathirajas.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(40, '21CSR022', 'CHOWDRI S', 'CSE', 'chowdris.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(41, '21CSR023', 'DAYANITHI E K', 'CSE', 'dayanithiek.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(42, '21CSR024', 'DEEPAK RAAJAN N', 'CSE', 'deepakraanjann.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(43, '21CSR025', 'DEJAS VIGAS P', 'CSE', 'dejasvigasp.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(44, '21CSR026', 'DEV KHARTHIK A P', 'CSE', 'devkharthikap.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(45, '21CSR027', 'DEVAYANI M', 'CSE', 'devayanim.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(46, '21CSR028', 'DHANAESWARAN R', 'CSE', 'dhanaeswaranr.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(47, '21CSR029', 'DHANAVANDHAN M', 'CSE', 'dhanavandhanm.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(48, '21CSR030', 'DHANUSH A', 'CSE', 'dhanusha.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(49, '21CSR031', 'DHANUSHIKA T', 'CSE', 'dhanushikat.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(50, '21CSR032', 'DHANUSHKUMAR R ', 'CSE', 'dhanushkumarr.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(51, '21CSR033', 'DHANUSHKUMAR R ', 'CSE', 'rdhanushkumar.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(52, '21CSR034', 'DHANYAJOTHI R', 'CSE', 'dhanyajothir.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(53, '21CSR035', 'DHARANEEDHARAN P', 'CSE', 'dharaneedharanp.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(54, '21CSR036', 'DHARANEESH S', 'CSE', 'dharaneeshs.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(55, '21CSR037', 'DHARSHANA V', 'CSE', 'dharshanav.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(56, '21CSR038', 'DHARSHINI G', 'CSE', 'dharshinig.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(57, '21CSR039', 'DHARSHINI K ', 'CSE', 'dharshinik.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(58, '21CSR040', 'DHARSHINI K ', 'CSE', 'kdharshini.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(59, '21CSR041', 'DHIVYA K', 'CSE', 'dhivyak.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(60, '21CSR042', 'DHIVYA BHARATHI T', 'CSE', 'dhivyabharathit.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(61, '21CSR043', 'DHIVYA K', 'CSE', 'kdhivya.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(62, '21CSR044', 'DINESH K', 'CSE', 'dineshk.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(63, '21CSR045', 'DINESH V', 'CSE', 'dineshv.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(64, '21CSR046', 'ELAVARASU P', 'CSE', 'elavarasup.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(65, '21CSR047', 'GAYATHIRI E', 'CSE', 'gayathirie.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(66, '21CSR048', 'GAYATHRI S S', 'CSE', 'gayathriss.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(67, '21CSR049', 'GIRIDAR PRASAD P', 'CSE', 'giridarprasadp.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(68, '21CSR050', 'GOBI V', 'CSE', 'gobiv.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(69, '21CSR051', 'GODWIN J', 'CSE', 'godwinj.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(70, '21CSR052', 'GOKHUL RAAJ K', 'CSE', 'gokhulraajk.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(71, '21CSR053', 'GOKUL P', 'CSE', 'gokulp.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(72, '21CSR054', 'GOKULSUNDAR S', 'CSE', 'gokulsundars.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(73, '21CSR055', 'GOWTHAM S ', 'CSE', 'gowthams.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(74, '21CSR056', 'GOWTHAM K', 'CSE', 'gowthamk.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(75, '21CSR057', 'GOWTHAM M', 'CSE', 'gowthamm.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(76, '21CSR058', 'GOWTHAM S ', 'CSE', 'sgowtham.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(77, '21CSR059', 'GUNASEELAN N', 'CSE', 'gunaseelann.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(78, '21CSR060', 'HARI R P', 'CSE', 'harirp.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(79, '21CSR061', 'HARIMONIKA S', 'CSE', 'harimonikas.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(80, '21CSR062', 'HARISH L', 'CSE', 'harishl.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(81, '21CSR063', 'HARSHA A B', 'CSE', 'harshaab.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(82, '21CSR064', 'HARSHA VARDHINI R A', 'CSE', 'harshavardhinira.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(83, '21CSR065', 'INIKA N', 'CSE', 'inikan.21cse@kongu.edu', 'A', 2025, '', ' 20CDO03,'),
(84, '21CSR066', 'JAISHRUTHIE S M', 'CSE', 'jaishruthiesm.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(85, '21CSR067', 'JAYANTH J R', 'CSE', 'jayanthjr.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(86, '21CSR068', 'JAYAVARSHINI S', 'CSE', 'jayavarshinis.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(87, '21CSR069', 'JEEVASREE G', 'CSE', 'jeevasreeg.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(88, '21CSR070', 'JEGAN S', 'CSE', 'jegans.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(89, '21CSR071', 'JESSICA S', 'CSE', 'jessicas.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(90, '21CSR072', 'KALAISELVAN K', 'CSE', 'kalaiselvank.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(91, '21CSR073', 'KALAIVANI B', 'CSE', 'kalaivanib.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(92, '21CSR074', 'KALPANADEVI G', 'CSE', 'kalpanadevig.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(93, '21CSR075', 'KAMALESH J', 'CSE', 'kamaleshj.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(94, '21CSR076', 'KANISHA A', 'CSE', 'Kanishaa.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(95, '21CSR077', 'KARAN M', 'CSE', 'Karanm.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(96, '21CSR078', 'KARTHICK P', 'CSE', 'karthickp.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(97, '21CSR079', 'KARTHICK S', 'CSE', 'karthicks.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(98, '21CSR080', 'KARTHICKRAJAN S', 'CSE', 'karthickrajans.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(99, '21CSR081', 'KARTHIK RAJ E', 'CSE', 'karthikraje.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(100, '21CSR082', 'KARTHIK S', 'CSE', 'karthiks.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(101, '21CSR083', 'KARTHIKA K', 'CSE', 'karthikak.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(102, '21CSR084', 'KAVIN B', 'CSE', 'kavinb.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(103, '21CSR085', 'KAVIN NISHANTHAN P D', 'CSE', 'kavinnishanthanpd.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(104, '21CSR086', 'KAVIN R', 'CSE', 'kavinr.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(105, '21CSR087', 'KAVIPRIYAN R K', 'CSE', 'kavipriyanrk.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(106, '21CSR088', 'KAVIYA K', 'CSE', 'kaviyak.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(107, '21CSR089', 'KAVIYA P (30.06.2004)', 'CSE', 'kaviyap.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(108, '21CSR090', 'KAVYA P (06.10.2003)', 'CSE', 'kavyap.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(109, '21CSR091', 'KAVYA S', 'CSE', 'kavyas.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(110, '21CSR092', 'KEERTHANA G', 'CSE', 'keerthanag.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(111, '21CSR093', 'KEERTHANA DEVI S', 'CSE', 'keerthanadevis.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(112, '21CSR094', 'KEERTHIBALA A T', 'CSE', 'keerthibalaat.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(113, '21CSR095', 'KIRUTHIYAASHREE S P', 'CSE', 'kiruthiyaashreesp.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(114, '21CSR096', 'KOWSIKA P', 'CSE', 'kowsikap.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(115, '21CSR097', 'KRISHNA B', 'CSE', 'krishnab.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(116, '21CSR098', 'LINGESHWARAN S', 'CSE', 'lingeshwarans.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(117, '21CSR099', 'LOKESH A', 'CSE', 'lokesha.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(118, '21CSR100', 'MADHAVAN R', 'CSE', 'madhavanr.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(119, '21CSR101', 'MADHU BALAJI V S', 'CSE', 'madhubalajivs.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(120, '21CSR102', 'MADHUCHERAN R', 'CSE', 'madhucheranr.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(121, '21CSR103', 'MADHUMITA C', 'CSE', 'madhumitac.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(122, '21CSR104', 'MADHURAJYOTHI VK', 'CSE', 'madhurajyothivk.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(123, '21CSR105', 'MAHAPRABU S', 'CSE', 'mahaprabus.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(124, '21CSR106', 'MALARVIZHI V', 'CSE', 'malarvizhiv.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(125, '21CSR107', 'MALATHI S', 'CSE', 'malathis.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(126, '21CSR108', 'MANIPRABHA S', 'CSE', 'maniprabhas.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(127, '21CSR109', 'MANO SUNDAR M', 'CSE', 'manosundarm.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(128, '21CSR110', 'MATHAN KUMAR A', 'CSE', 'mathankumara.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(129, '21CSR111', 'MOHAMMED YUNUS M', 'CSE', 'mohammedyunusm.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(130, '21CSR112', 'MOHANRAJ C M', 'CSE', 'mohanrajcm.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(131, '21CSR113', 'MOHIT K S', 'CSE', 'mohitks.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(132, '21CSR114', 'MONISH M M', 'CSE', 'monishmm.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(133, '21CSR115', 'MOUNISH N', 'CSE', 'mounishn.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(134, '21CSR116', 'MRUDHULA SHRI M', 'CSE', 'mrudhulashrim.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(135, '21CSR117', 'MUGHIL J', 'CSE', 'mughilj.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(136, '21CSR118', 'MUKHIL KUMARAN S', 'CSE', 'mukhilkumarans.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(137, '21CSR119', 'MURUGANANTHAM T', 'CSE', 'murugananthamt.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(138, '21CSR120', 'MUTHU KARUPPAN P', 'CSE', 'muthukaruppan.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(139, '21CSR121', 'MYTHILI S', 'CSE', 'mythilis.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(140, '21CSR122', 'NAHUL ATHITHYA M', 'CSE', 'nahulathithyam.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(141, '21CSR123', 'NANDHINI K', 'CSE', 'nandhinik.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(142, '21CSR124', 'NAVEENKRISHNA KR', 'CSE', 'naveenkrishnakr.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(143, '21CSR125', 'NEKELASH I L', 'CSE', 'nekelashil.21cse@kongu.edu', 'B', 2025, '', ' 20CDO03,'),
(144, '21CSR126', 'NIGANTH S', 'CSE', 'niganths.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(145, '21CSR127', 'NIKITHA S', 'CSE', 'nikithas.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(146, '21CSR128', 'NIMESH S V', 'CSE', 'nimeshsv.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(147, '21CSR129', 'NIRANJANSIVAA N', 'CSE', 'niranjansivaan.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(148, '21CSR130', 'NITHESH R', 'CSE', 'nitheshr.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(149, '21CSR131', 'NITHIL PRASATH K', 'CSE', 'nithilprasathk.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(150, '21CSR132', 'NITHISH P', 'CSE', 'nithishp.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(151, '21CSR133', 'NITHISH R', 'CSE', 'nithishr.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(152, '21CSR134', 'NITIISH S', 'CSE', 'nithishs.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(153, '21CSR136', 'PONHARISHKUMAR.S', 'CSE', 'ponharishkumars.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(154, '21CSR137', 'PONRANJITH L', 'CSE', 'ponranjithl.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(155, '21CSR138', 'PONSUDHAN V', 'CSE', 'ponsudhanv.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(156, '21CSR139', 'POOJA M', 'CSE', 'poojam.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(157, '21CSR140', 'POORNA SHREE T', 'CSE', 'poornashreet.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(158, '21CSR141', 'PRADEEP T', 'CSE', 'pradeept.21cse@kongu.edu', 'C', 2025, 'Male', ' 20CDO03,'),
(159, '21CSR142', 'PRADEEP D', 'CSE', 'pradeepd.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(160, '21CSR143', 'PRANESH.A.C', 'CSE', 'praneshac.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(161, '21CSR144', 'PRATEEKSHA V', 'CSE', 'prateekshav.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(162, '21CSR145', 'PRATHIISH R', 'CSE', 'prathiishr.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(163, '21CSR146', 'PRATHIKSHA V S', 'CSE', 'prathikshavs.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(164, '21CSR147', 'PRATOSH S', 'CSE', 'pratoshs.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(165, '21CSR148', 'PREM SUNDAR G', 'CSE', 'premsundarg.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(166, '21CSR149', 'PRESANNA WENKATESAN K', 'CSE', 'presannawenkatesank.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(167, '21CSR150', 'PRITHIVI RAJ P', 'CSE', 'prithivirajp.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(168, '21CSR151', 'PRIYADHARSHINI.K', 'CSE', 'priyadharshinik.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(169, '21CSR152', 'RAAGUL N S', 'CSE', 'raagulns.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(170, '21CSR153', 'RAGAVI S', 'CSE', 'ragavis.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(171, '21CSR154', 'RAGHUL L', 'CSE', 'raghull.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(172, '21CSR155', 'RAGUL M', 'CSE', 'ragulm.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(173, '21CSR156', 'RAHUL R', 'CSE', 'rahulr.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(174, '21CSR157', 'RAJDEEPAK S', 'CSE', 'rajdeepaks.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(175, '21CSR158', 'RAJDHILIP G', 'CSE', 'rajdhilipg.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(176, '21CSR159', 'RAJESHWARI M', 'CSE', 'rajeshwarim.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(177, '21CSR160', 'RAKESH K', 'CSE', 'rakeshk.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(178, '21CSR161', 'RAM AKAASHU B', 'CSE', 'ramakaashub.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(179, '21CSR162', 'RAMANA K', 'CSE', 'ramanak.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(180, '21CSR163', 'RASIL RISAM F', 'CSE', 'rasilrisamf.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(181, '21CSR164', 'RATHI DEVI K', 'CSE', 'rathidevik.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(182, '21CSR165', 'REVANTH K', 'CSE', 'revanthk.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(183, '21CSR166', 'SABARI M', 'CSE', 'sabarim.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(184, '21CSR167', 'SABARISH V', 'CSE', 'sabarishv.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(185, '21CSR168', 'SABARNIKA S', 'CSE', 'sabarnikas.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(186, '21CSR169', 'SACHIDHANAND S S', 'CSE', 'sachidhanandss.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(187, '21CSR170', 'SADHANAND S S', 'CSE', 'sadhanandss.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(188, '21CSR171', 'SAHANA PRIYA S', 'CSE', 'sahanapriyas.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(189, '21CSR172', 'SAKIRAM G', 'CSE', 'sakiramg.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(190, '21CSR173', 'SAMUVEL V', 'CSE', 'samuvelv.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(191, '21CSR174', 'SANJAY B', 'CSE', 'sanjayb.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(192, '21CSR175', 'SANJEEV M S', 'CSE', 'sanjeevms.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(193, '21CSR176', 'SANJEEV RATHAN R', 'CSE', 'sanjeevrathanr.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(194, '21CSR177', 'SANTHIYA P', 'CSE', 'santhiyap.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(195, '21CSR178', 'SANTHOSH M', 'CSE', 'santhoshm.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(196, '21CSR179', 'SARAA R', 'CSE', 'saraar.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(197, '21CSR180', 'SARAN S', 'CSE', 'sarans.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(198, '21CSR181', 'SARANKANTH K', 'CSE', 'sarankanthk.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(199, '21CSR182', 'SARANRAJ S', 'CSE', 'saranrajs.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(200, '21CSR183', 'SARATHI P', 'CSE', 'sarathip.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(201, '21CSR184', 'SENTHAN VIGAS M', 'CSE', 'senthanvigasm.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(202, '21CSR185', 'SHARAN R', 'CSE', 'sharanr.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(203, '21CSR186', 'SHARVITHAA D', 'CSE', 'sharvithaad.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(204, '21CSR187', 'SHIVAANI J', 'CSE', 'shivaanij.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(205, '21CSR188', 'SHREE ISWARIYA J', 'CSE', 'shreeiswariyaj.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(206, '21CSR189', 'SHRINITHA R P', 'CSE', 'shrinitharp.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(207, '21CSR190', 'SHRINITHI G', 'CSE', 'shrinithig.21cse@kongu.edu', 'C', 2025, '', ' 20CDO03,'),
(208, '21CSR191', 'SHYAMGANESH S', 'CSE', 'shyamganeshs.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(209, '21CSR192', 'SINDHU K S', 'CSE', 'sindhuks.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(210, '21CSR193', 'SIVASHREE R', 'CSE', 'sivashreer.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(211, '21CSR194', 'SIVAVIKASH K', 'CSE', 'sivavikashk.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(212, '21CSR195', 'SNEHAA C', 'CSE', 'snehaac.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(213, '21CSR196', 'SNEKA A', 'CSE', 'snekaa.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(214, '21CSR198', 'SOWMIYA S', 'CSE', 'sowmiyas.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(215, '21CSR199', 'SOWRABHA A', 'CSE', 'sowrabhaa.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(216, '21CSR200', 'SRI HARI KRISHNAN E V', 'CSE', 'sriharikrishnanev.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(217, '21CSR201', 'SRI SARAVANA KISHORE P', 'CSE', 'srisaravanakishorep.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(218, '21CSR202', 'SRIDHAR K K', 'CSE', 'sridharkk.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(219, '21CSR203', 'SRIDHAR D', 'CSE', 'sridhard.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(220, '21CSR204', 'SRIKANTH R', 'CSE', 'srikanthr.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(221, '21CSR205', 'SRINATH S', 'CSE', 'srinaths.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(222, '21CSR206', 'SRINATH V V', 'CSE', 'srinathvv.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(223, '21CSR207', 'SRIRAM C', 'CSE', 'sriramc.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(224, '21CSR208', 'SRIRAM S S', 'CSE', 'sriramss.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(225, '21CSR209', 'SUBHA SHREE V S', 'CSE', 'subhashreevs.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(226, '21CSR210', 'SUBIGA N', 'CSE', 'subigan.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(227, '21CSR211', 'SUBITH J', 'CSE', 'subithj.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(228, '21CSR212', 'SUCHETA N', 'CSE', 'suchetan.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(229, '21CSR213', 'SUDHARSHAN P', 'CSE', 'sudharshanp.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(230, '21CSR214', 'SUDHIR G', 'CSE', 'sudhirg.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(231, '21CSR215', 'SUGANTHAN S', 'CSE', 'suganthans.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(232, '21CSR216', 'SUGUNA V P T', 'CSE', 'sugunavpt.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(233, '21CSR217', 'SUHAS C', 'CSE', 'suhasc.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(234, '21CSR218', 'SURIYA BALAJI B', 'CSE', 'suriyabalajib.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(235, '21CSR219', 'SURUTHI V', 'CSE', 'suruthiv.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(236, '21CSR220', 'SURYA PRASATH S K', 'CSE', 'suryaprasathsk.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(237, '21CSR221', 'SUTHAAN S', 'CSE', 'suthaans.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(238, '21CSR222', 'SUTHEKSA P', 'CSE', 'sutheksap.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(239, '21CSR223', 'SUWETHA R N', 'CSE', 'suwetharn.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(240, '21CSR224', 'SWETHA S (26.04.2003)', 'CSE', 'swethas.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(241, '21CSR225', 'SWETHA S (17.05.2004)', 'CSE', 'sswetha.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(242, '21CSR226', 'TAMILVANAN S', 'CSE', 'tamilvanans.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(243, '21CSR227', 'THANIYAARRSHINII S', 'CSE', 'thaniyaarrshinis.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(244, '21CSR228', 'THANUSHUIA V', 'CSE', 'thanushuiav.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(245, '21CSR229', 'THARUN KUMAR S', 'CSE', 'tharunkumars.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(246, '21CSR230', 'THEEBASEHARAN M S', 'CSE', 'theebaseharanms.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(247, '21CSR231', 'THIRISHA G', 'CSE', 'thirishag.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(248, '21CSR232', 'THULASIRAJAN S', 'CSE', 'thulasirajans.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(249, '21CSR233', 'VARSHA S', 'CSE', 'varshas.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(250, '21CSR234', 'VARSHINI V', 'CSE', 'varshiniv.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(251, '21CSR235', 'VARSHINI G', 'CSE', 'varshinig.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(252, '21CSR237', 'VIDHARSHANA A R', 'CSE', 'vidharshnaar.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(253, '21CSR238', 'VIGNESHKUMAR M', 'CSE', 'vigneshkumarm.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(254, '21CSR239', 'VIKASH NARAYANAN M', 'CSE', 'vikashnarayananm.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(255, '21CSR240', 'VIKNESHVARAN S U', 'CSE', 'vikneshvaransu.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(256, '21CSR241', 'VIMAL M', 'CSE', 'vimalm.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(257, '21CSR242', 'VINEETH PRABHU V', 'CSE', 'Vineethprabhuv.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(258, '21CSR243', 'VINIETH S S', 'CSE', 'viniethss.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(259, '21CSR244', 'VISHAL A M', 'CSE', 'vishalam.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(260, '21CSR245', 'VISHAL M (04.01.2004)', 'CSE', 'vishalm.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(261, '21CSR246', 'VISHAL M (08.12.2003)', 'CSE', 'mvishal.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(262, '21CSR247', 'VISHAL V', 'CSE', 'vishalv.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(263, '21CSR248', 'VISHNU PRASAD S', 'CSE', 'vishnuprasads.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(264, '21CSR249', 'VISHWA N', 'CSE', 'vishwan.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(265, '21CSR250', 'YUVANSRIRAM S B', 'CSE', 'yuvansriramsb.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(266, '21CSR251', 'HEJAZEE BIN ALTAF', 'CSE', 'hejazeebinaltaf.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,'),
(267, '21CSR252', 'KAISAR AHMAD BHAT', 'CSE', 'kaisarahmadbhat.21cse@kongu.edu', 'D', 2025, '', ' 20CDO03,');

-- --------------------------------------------------------

--
-- Table structure for table `student_login`
--

CREATE TABLE `student_login` (
  `email` varchar(50) NOT NULL,
  `Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_login`
--

INSERT INTO `student_login` (`email`, `Password`) VALUES
('aakashs.21cse@kongu.edu', '21CSR001'),
('abinayab.21cse@kongu.edu', '21CSR002'),
('abishekr.21cse@kongu.edu', '21CSR003'),
('agalyalr.21cse@kongu.edu', '21CSR004'),
('agilanvs.21cse@kongu.edu', '21CSR005'),
('aishwaryasreev.21cse@kongu.edu', '21CSR006'),
('akileshs.21cse@kongu.edu', '21CSL253'),
('angelshalinip.21cse@kongu.edu', '21CSR007'),
('arshathahamedm.21cse@kongu.edu', '21CSL255'),
('arulkumara.21cse@kongu.edu', '21CSR008'),
('arumugamak.21cse@kongu.edu', '21CSR009'),
('arunkumark.21cse@kongu.edu', '21CSR010'),
('asmamalicaj.21cse@kongu.edu', '21CSR011'),
('aswins.21cse@kongu.edu', '21CSR012'),
('athishsk.21cse@kongu.edu', '21CSR013'),
('badrinaarayancg.21cse@kongu.edu', '21CSR015'),
('bharathig.21cse@kongu.edu', '21CSR017'),
('bharathit.21cse@kongu.edu', '21CSR018'),
('bharatkumaaranp.21cse@kongu.edu', '21CSR016'),
('bhavadharanik.21cse@kongu.edu', '21CSR019'),
('bommisrilekkhaag.21cse@kongu.edu', '21CSR020'),
('boopathirajas.21cse@kongu.edu', '21CSR021'),
('chowdris.21cse@kongu.edu', '21CSR022'),
('daneeshm.21cse@kongu.edu', '21CSL256'),
('dayanithiek.21cse@kongu.edu', '21CSR023'),
('deepakraanjann.21cse@kongu.edu', '21CSR024'),
('dejasvigasp.21cse@kongu.edu', '21CSR025'),
('devayanim.21cse@kongu.edu', '21CSR027'),
('devkharthikap.21cse@kongu.edu', '21CSR026'),
('dhanaeswaranr.21cse@kongu.edu', '21CSR028'),
('dhanavandhanm.21cse@kongu.edu', '21CSR029'),
('dhanusha.21cse@kongu.edu', '21CSR030'),
('dhanushikat.21cse@kongu.edu', '21CSR031'),
('dhanushkumarr.21cse@kongu.edu', '21CSR032'),
('dhanyajothir.21cse@kongu.edu', '21CSR034'),
('dharaneedharanp.21cse@kongu.edu', '21CSR035'),
('dharaneeshs.21cse@kongu.edu', '21CSR036'),
('dharshanav.21cse@kongu.edu', '21CSR037'),
('dharshanp.21cse@kongu.edu', '21CSL257'),
('dharshinig.21cse@kongu.edu', '21CSR038'),
('dharshinik.21cse@kongu.edu', '21CSR039'),
('dhivyabharathit.21cse@kongu.edu', '21CSR042'),
('dhivyak.21cse@kongu.edu', '21CSR041'),
('dineshk.21cse@kongu.edu', '21CSR044'),
('dineshv.21cse@kongu.edu', '21CSR045'),
('elavarasup.21cse@kongu.edu', '21CSR046'),
('gayathirie.21cse@kongu.edu', '21CSR047'),
('gayathriss.21cse@kongu.edu', '21CSR048'),
('giridarprasadp.21cse@kongu.edu', '21CSR049'),
('gobiv.21cse@kongu.edu', '21CSR050'),
('godwinj.21cse@kongu.edu', '21CSR051'),
('gokhulraajk.21cse@kongu.edu', '21CSR052'),
('gokulp.21cse@kongu.edu', '21CSR053'),
('gokulsundars.21cse@kongu.edu', '21CSR054'),
('gowthamk.21cse@kongu.edu', '21CSR056'),
('gowthamm.21cse@kongu.edu', '21CSR057'),
('gowthams.21cse@kongu.edu', '21CSR055'),
('gunaseelann.21cse@kongu.edu', '21CSR059'),
('hariharanm.21cse@kongu.edu', '21CSL258'),
('harimonikas.21cse@kongu.edu', '21CSR061'),
('harirp.21cse@kongu.edu', '21CSR060'),
('harishl.21cse@kongu.edu', '21CSR062'),
('harshaab.21cse@kongu.edu', '21CSR063'),
('harshavardhinira.21cse@kongu.edu', '21CSR064'),
('hejazeebinaltaf.21cse@kongu.edu', '21CSR251'),
('indrab.21cse@kongu.edu', '21CSL259'),
('inikan.21cse@kongu.edu', '21CSR065'),
('jaishruthiesm.21cse@kongu.edu', '21CSR066'),
('jayanthjr.21cse@kongu.edu', '21CSR067'),
('jayavarshinis.21cse@kongu.edu', '21CSR068'),
('jeevasreeg.21cse@kongu.edu', '21CSR069'),
('jegans.21cse@kongu.edu', '21CSR070'),
('jessicas.21cse@kongu.edu', '21CSR071'),
('kaisarahmadbhat.21cse@kongu.edu', '21CSR252'),
('kalaiselvank.21cse@kongu.edu', '21CSR072'),
('kalaivanib.21cse@kongu.edu', '21CSR073'),
('kalpanadevig.21cse@kongu.edu', '21CSR074'),
('kamaleshj.21cse@kongu.edu', '21CSR075'),
('Kanishaa.21cse@kongu.edu', '21CSR076'),
('kanishakarb.21cse@kongu.edu', '21CSL260'),
('kanishkp.21cse@kongu.edu', '21CSL261'),
('Karanm.21cse@kongu.edu', '21CSR077'),
('karthickp.21cse@kongu.edu', '21CSR078'),
('karthickrajans.21cse@kongu.edu', '21CSR080'),
('karthicks.21cse@kongu.edu', '21CSR079'),
('karthikak.21cse@kongu.edu', '21CSR083'),
('karthikraje.21cse@kongu.edu', '21CSR081'),
('karthiks.21cse@kongu.edu', '21CSR082'),
('kavinb.21cse@kongu.edu', '21CSR084'),
('kavinnishanthanpd.21cse@kongu.edu', '21CSR085'),
('kavinr.21cse@kongu.edu', '21CSR086'),
('kavipriyanrk.21cse@kongu.edu', '21CSR087'),
('kaviyak.21cse@kongu.edu', '21CSR088'),
('kaviyap.21cse@kongu.edu', '21CSR089'),
('kavyap.21cse@kongu.edu', '21CSR090'),
('kavyas.21cse@kongu.edu', '21CSR091'),
('kdharshini.21cse@kongu.edu', '21CSR040'),
('kdhivya.21cse@kongu.edu', '21CSR043'),
('keerthanadevis.21cse@kongu.edu', '21CSR093'),
('keerthanag.21cse@kongu.edu', '21CSR092'),
('keerthibalaat.21cse@kongu.edu', '21CSR094'),
('kiruthikar.21cse@kongu.edu', '21CSL262'),
('kiruthiyaashreesp.21cse@kongu.edu', '21CSR095'),
('kowsikap.21cse@kongu.edu', '21CSR096'),
('krishnab.21cse@kongu.edu', '21CSR097'),
('lingeshwarans.21cse@kongu.edu', '21CSR098'),
('logeshwarr.21cse@kongu.edu', '21CSL263'),
('lokesha.21cse@kongu.edu', '21CSR099'),
('madhavanr.21cse@kongu.edu', '21CSR100'),
('madhubalajivs.21cse@kongu.edu', '21CSR101'),
('madhucheranr.21cse@kongu.edu', '21CSR102'),
('madhumitac.21cse@kongu.edu', '21CSR103'),
('madhurajyothivk.21cse@kongu.edu', '21CSR104'),
('mahaprabus.21cse@kongu.edu', '21CSR105'),
('malarvizhiv.21cse@kongu.edu', '21CSR106'),
('malathis.21cse@kongu.edu', '21CSR107'),
('maniprabhas.21cse@kongu.edu', '21CSR108'),
('manosundarm.21cse@kongu.edu', '21CSR109'),
('mathankumara.21cse@kongu.edu', '21CSR110'),
('mohammedyunusm.21cse@kongu.edu', '21CSR111'),
('mohanrajcm.21cse@kongu.edu', '21CSR112'),
('mohitks.21cse@kongu.edu', '21CSR113'),
('monishmm.21cse@kongu.edu', '21CSR114'),
('mounishn.21cse@kongu.edu', '21CSR115'),
('mrudhulashrim.21cse@kongu.edu', '21CSR116'),
('mughilj.21cse@kongu.edu', '21CSR117'),
('mukhilkumarans.21cse@kongu.edu', '21CSR118'),
('murugananthamt.21cse@kongu.edu', '21CSR119'),
('muthukaruppan.21cse@kongu.edu', '21CSR120'),
('mvishal.21cse@kongu.edu', '21CSR246'),
('mythilis.21cse@kongu.edu', '21CSR121'),
('nahulathithyam.21cse@kongu.edu', '21CSR122'),
('nandhinik.21cse@kongu.edu', '21CSR123'),
('naveenkrishnakr.21cse@kongu.edu', '21CSR124'),
('navienbr.21cse@kongu.edu', '21CSL264'),
('nekelashil.21cse@kongu.edu', '21CSR125'),
('niganths.21cse@kongu.edu', '21CSR126'),
('nikithas.21cse@kongu.edu', '21CSR127'),
('nimeshsv.21cse@kongu.edu', '21CSR128'),
('niranjansivaan.21cse@kongu.edu', '21CSR129'),
('nitheshr.21cse@kongu.edu', '21CSR130'),
('nithilprasathk.21cse@kongu.edu', '21CSR131'),
('nithishp.21cse@kongu.edu', '21CSR132'),
('nithishr.21cse@kongu.edu', '21CSR133'),
('nithishs.21cse@kongu.edu', '21CSR134'),
('nithishsv.21cse@kongu.edu', '21CSL265'),
('perinbans.21cse@kongu.edu', '21CSL266'),
('ponharishkumars.21cse@kongu.edu', '21CSR136'),
('ponranjithl.21cse@kongu.edu', '21CSR137'),
('ponsudhanv.21cse@kongu.edu', '21CSR138'),
('poojam.21cse@kongu.edu', '21CSR139'),
('poornashreet.21cse@kongu.edu', '21CSR140'),
('poovarasanv.21cse@kongu.edu', '21CSL267'),
('pradeepd.21cse@kongu.edu', '21CSR142'),
('pradeeps.21cse@kongu.edu', '21CSL268'),
('pradeept.21cse@kongu.edu', 'qwe123@,./'),
('praneshac.21cse@kongu.edu', '21CSR143'),
('prasantht.21cse@kongu.edu', '21CSL269'),
('prateekshav.21cse@kongu.edu', '21CSR144'),
('prathiishr.21cse@kongu.edu', '21CSR145'),
('prathikshavs.21cse@kongu.edu', '21CSR146'),
('pratoshs.21cse@kongu.edu', '21CSR147'),
('premsundarg.21cse@kongu.edu', '21CSR148'),
('presannawenkatesank.21cse@kongu.edu', '21CSR149'),
('prithivirajp.21cse@kongu.edu', '21CSR150'),
('priyadharshinik.21cse@kongu.edu', '21CSR151'),
('raagulns.21cse@kongu.edu', '21CSR152'),
('raahulsivvk.21cse@kongu.edu', '21CSL270'),
('ragavis.21cse@kongu.edu', '21CSR153'),
('raghull.21cse@kongu.edu', '21CSR154'),
('ragulm.21cse@kongu.edu', '21CSR155'),
('rahulr.21cse@kongu.edu', '21CSR156'),
('rajdeepaks.21cse@kongu.edu', '21CSR157'),
('rajdhilipg.21cse@kongu.edu', '21CSR158'),
('rajeshwarim.21cse@kongu.edu', '21CSR159'),
('rakeshk.21cse@kongu.edu', '21CSR160'),
('ramakaashub.21cse@kongu.edu', '21CSR161'),
('ramanak.21cse@kongu.edu', '21CSR162'),
('rasilrisamf.21cse@kongu.edu', '21CSR163'),
('rathidevik.21cse@kongu.edu', '21CSR164'),
('rdhanushkumar.21cse@kongu.edu', '21CSR033'),
('revanthk.21cse@kongu.edu', '21CSR165'),
('sabarim.21cse@kongu.edu', '21CSR166'),
('sabarishv.21cse@kongu.edu', '21CSR167'),
('sabarnikas.21cse@kongu.edu', '21CSR168'),
('sachidhanandss.21cse@kongu.edu', '21CSR169'),
('sadhanandss.21cse@kongu.edu', '21CSR170'),
('sahanapriyas.21cse@kongu.edu', '21CSR171'),
('sakiramg.21cse@kongu.edu', '21CSR172'),
('samuvelv.21cse@kongu.edu', '21CSR173'),
('sandeepkrishnat.21cse@kongu.edu', '21CSL271'),
('sanjayb.21cse@kongu.edu', 'sanjay123'),
('sanjeevms.21cse@kongu.edu', '21CSR175'),
('sanjeevrathanr.21cse@kongu.edu', '21CSR176'),
('santhiyap.21cse@kongu.edu', '21CSR177'),
('santhoshm.21cse@kongu.edu', '21CSR178'),
('saraar.21cse@kongu.edu', '21CSR179'),
('sarankanthk.21cse@kongu.edu', '21CSR181'),
('saranrajs.21cse@kongu.edu', '21CSR182'),
('sarans.21cse@kongu.edu', '21CSR180'),
('sarathip.21cse@kongu.edu', '21CSR183'),
('savithas.21cse@kongu.edu', '21CSL272'),
('senthanvigasm.21cse@kongu.edu', '21CSR184'),
('sgowtham.21cse@kongu.edu', '21CSR058'),
('sharanr.21cse@kongu.edu', '21CSR185'),
('sharvithaad.21cse@kongu.edu', '21CSR186'),
('shivaanij.21cse@kongu.edu', '21CSR187'),
('shreeiswariyaj.21cse@kongu.edu', '21CSR188'),
('shrinitharp.21cse@kongu.edu', '21CSR189'),
('shrinithig.21cse@kongu.edu', '21CSR190'),
('shyamganeshs.21cse@kongu.edu', '21CSR191'),
('sindhuks.21cse@kongu.edu', '21CSR192'),
('sivashreer.21cse@kongu.edu', '21CSR193'),
('sivavikashk.21cse@kongu.edu', '21CSR194'),
('snehaac.21cse@kongu.edu', '21CSR195'),
('snekaa.21cse@kongu.edu', '21CSR196'),
('sowmiyas.21cse@kongu.edu', '21CSR198'),
('sowrabhaa.21cse@kongu.edu', '21CSR199'),
('sridhard.21cse@kongu.edu', '21CSR203'),
('sridharkk.21cse@kongu.edu', '21CSR202'),
('sriharikrishnanev.21cse@kongu.edu', '21CSR200'),
('srikanthr.21cse@kongu.edu', '21CSR204'),
('srinaths.21cse@kongu.edu', '21CSR205'),
('srinathvv.21cse@kongu.edu', '21CSR206'),
('sriramc.21cse@kongu.edu', '21CSR207'),
('sriramss.21cse@kongu.edu', '21CSR208'),
('srisaravanakishorep.21cse@kongu.edu', '21CSR201'),
('sswetha.21cse@kongu.edu', '21CSR225'),
('subhashreevs.21cse@kongu.edu', '21CSR209'),
('subigan.21cse@kongu.edu', '21CSR210'),
('subithj.21cse@kongu.edu', '21CSR211'),
('suchetan.21cse@kongu.edu', '21CSR212'),
('sudharshanp.21cse@kongu.edu', '21CSR213'),
('sudhirg.21cse@kongu.edu', '21CSR214'),
('suganthans.21cse@kongu.edu', '21CSR215'),
('sugunavpt.21cse@kongu.edu', '21CSR216'),
('suhasc.21cse@kongu.edu', '21CSR217'),
('suriyabalajib.21cse@kongu.edu', '21CSR218'),
('suruthiv.21cse@kongu.edu', '21CSR219'),
('suryaprasathsk.21cse@kongu.edu', '21CSR220'),
('suthaans.21cse@kongu.edu', '21CSR221'),
('sutheksap.21cse@kongu.edu', '21CSR222'),
('suwetharn.21cse@kongu.edu', '21CSR223'),
('swethas.21cse@kongu.edu', '21CSR224'),
('tamilvanans.21cse@kongu.edu', '21CSR226'),
('thaniyaarrshinis.21cse@kongu.edu', '21CSR227'),
('thanushuiav.21cse@kongu.edu', '21CSR228'),
('tharunkumars.21cse@kongu.edu', '21CSR229'),
('theebaseharanms.21cse@kongu.edu', '21CSR230'),
('thirishag.21cse@kongu.edu', '21CSR231'),
('thulasirajans.21cse@kongu.edu', '21CSR232'),
('varshas.21cse@kongu.edu', '21CSR233'),
('varshinig.21cse@kongu.edu', '21CSR235'),
('varshiniv.21cse@kongu.edu', '21CSR234'),
('vidharshnaar.21cse@kongu.edu', '21CSR237'),
('vigneshkumarm.21cse@kongu.edu', '21CSR238'),
('vikashnarayananm.21cse@kongu.edu', '21CSR239'),
('vikneshvaransu.21cse@kongu.edu', '21CSR240'),
('vimalm.21cse@kongu.edu', '21CSR241'),
('Vineethprabhuv.21cse@kongu.edu', '21CSR242'),
('viniethss.21cse@kongu.edu', '21CSR243'),
('vishalam.21cse@kongu.edu', '21CSR244'),
('vishalm.21cse@kongu.edu', '21CSR245'),
('vishalv.21cse@kongu.edu', '21CSR247'),
('vishnuprasads.21cse@kongu.edu', '21CSR248'),
('vishwan.21cse@kongu.edu', '21CSR249'),
('yuvansriramsb.21cse@kongu.edu', '21CSR250');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_info`
--
ALTER TABLE `admin_info`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Email_2` (`Email`);

--
-- Indexes for table `admin_login`
--
ALTER TABLE `admin_login`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `event_id` (`event_id`);

--
-- Indexes for table `events_response`
--
ALTER TABLE `events_response`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `faculty_complaints`
--
ALTER TABLE `faculty_complaints`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Complaint_Id` (`Complaint_Id`);

--
-- Indexes for table `semester`
--
ALTER TABLE `semester`
  ADD PRIMARY KEY (`semester_id`);

--
-- Indexes for table `semestersubject`
--
ALTER TABLE `semestersubject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_info`
--
ALTER TABLE `student_info`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Roll_No` (`Roll_No`,`Email`);

--
-- Indexes for table `student_login`
--
ALTER TABLE `student_login`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `events_response`
--
ALTER TABLE `events_response`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `faculty_complaints`
--
ALTER TABLE `faculty_complaints`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `semestersubject`
--
ALTER TABLE `semestersubject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `student_info`
--
ALTER TABLE `student_info`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=268;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `update_event_status` ON SCHEDULE EVERY 1 HOUR STARTS '2024-02-06 06:54:02' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    UPDATE events
    SET Status = 'closed'
    WHERE Status = 'open' AND IntervalTime < NOW() - INTERVAL 1 DAY;
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
