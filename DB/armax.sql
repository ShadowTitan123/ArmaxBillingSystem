-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2021 at 11:49 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `armax`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_google_admin`
--

CREATE TABLE `tbl_google_admin` (
  `id` int(50) NOT NULL,
  `google_id` varchar(150) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photo_path` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_google_admin`
--

INSERT INTO `tbl_google_admin` (`id`, `google_id`, `first_name`, `last_name`, `email`, `photo_path`, `created_date`) VALUES
(16, '106425852628549016504', 'Purple', 'Zero', 'shadowtitan77@gmail.com', 'https://lh3.googleusercontent.com/a-/AOh14GiDl297KpIs8Nq3tDIqGesBmJK-OaJHMdmPqNW6=s96-c', '2021-01-25 17:57:34'),
(17, '107518683978956232484', 'Mohammed', 'Adil', 'mdadilehsan77@gmail.com', 'https://lh3.googleusercontent.com/a-/AOh14Gj9CL1e1SIwQwUuP3KUhd4BtTByJf6fBH0XR3v5Ww=s96-c', '2021-01-25 19:08:55');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders`
--

CREATE TABLE `tbl_orders` (
  `id` int(50) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `product_id` int(50) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Address` longtext NOT NULL,
  `Address2` longtext NOT NULL,
  `Country` varchar(255) NOT NULL,
  `State` varchar(255) NOT NULL,
  `Zip` int(50) NOT NULL,
  `CardName` varchar(255) NOT NULL,
  `CreditCard` int(100) NOT NULL,
  `Expiration` int(100) NOT NULL,
  `CVV` int(100) NOT NULL,
  `session_user` varchar(255) NOT NULL,
  `status` int(50) NOT NULL,
  `created_Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_orders`
--

INSERT INTO `tbl_orders` (`id`, `order_id`, `product_id`, `firstName`, `LastName`, `Email`, `Address`, `Address2`, `Country`, `State`, `Zip`, `CardName`, `CreditCard`, `Expiration`, `CVV`, `session_user`, `status`, `created_Date`) VALUES
(13, '4726', 1, 'Mohammed', 'Zabeeh-ur-Rahman', 'mdadilehsan77@gmail.com', 'S K Garden, Chinnapa Garden, Benson Town, Bengaluru, Karnataka, India', '#2, 5th cross, 1st main', 'United States', 'California', 560046, 'Adil', 123, 121, 121, 'Purple Zero', 1, '2021-01-26 10:24:40'),
(14, '6189', 10, 'Mohammed', 'Adil', 'mdadilehsan77@gmail.com', 'S K Garden, Chinnapa Garden, Benson Town, Bengaluru, Karnataka, India', '#2, 5th cross, 1st main', 'India', 'Delhi', 560046, 'Adil', 132, 123, 123, 'Mohammed Adil', 1, '2021-01-26 10:36:22');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `id` int(50) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_type` varchar(255) NOT NULL,
  `product_price` int(255) NOT NULL,
  `product_image` varchar(500) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`id`, `product_name`, `product_type`, `product_price`, `product_image`, `created_date`) VALUES
(1, 'Product 1', 'Shirt', 1000, 'http://localhost:3000/products/1.jpg', '2021-01-25 11:20:59'),
(2, 'Product 2', 'Shirt', 2000, 'http://localhost:3000/products/1.jpg', '2021-01-25 11:20:59'),
(3, 'Product 3', 'Shirt', 3000, 'http://localhost:3000/products/1.jpg', '2021-01-25 11:20:59'),
(10, 'Product 4', 'Shirt', 4000, 'http://localhost:3000/products/1.jpg', '2021-01-26 09:26:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_google_admin`
--
ALTER TABLE `tbl_google_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_google_admin`
--


--
-- AUTO_INCREMENT for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_products`
--
ALTER TABLE `tbl_products`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
