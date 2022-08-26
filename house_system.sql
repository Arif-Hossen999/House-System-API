-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2022 at 07:28 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `house_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(95) NOT NULL,
  `status` int(11) NOT NULL COMMENT '1=enable,0=disable',
  `created_at` varchar(55) NOT NULL,
  `updated_at` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Clothes', 1, '2022-08-25 12:06:06.638', '2022-08-25 12:06:06.638'),
(2, 'Jewellry', 1, '2022-08-25 12:26:45.150', '2022-08-25 12:26:45.150'),
(7, 'Electronic', 1, '2022-08-26 11:14:05.365', '2022-08-26 11:14:05.365');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(95) NOT NULL,
  `status` int(11) NOT NULL COMMENT '1=enable,0=disable	',
  `category_id` int(11) NOT NULL,
  `created_at` varchar(55) NOT NULL,
  `updated_at` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `status`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Shirt', 1, 1, '2022-08-25 23:18:22.981', '2022-08-25 23:18:22.981'),
(2, 'Pant', 0, 1, '2022-08-25 23:19:05.925', '2022-08-25 23:19:05.925'),
(3, 'Rings', 1, 2, '2022-08-25 23:20:38.568', '2022-08-25 23:20:38.568'),
(4, 'Necklaces', 1, 2, '2022-08-25 23:21:01.461', '2022-08-25 23:21:01.461'),
(9, 'Remotes', 1, 7, '2022-08-26 11:14:44.385', '2022-08-26 11:14:44.385'),
(10, 'Computer', 1, 7, '2022-08-26 11:14:52.923', '2022-08-26 11:14:52.923');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_name` varchar(55) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1=admin,0=employee',
  `created_at` varchar(55) NOT NULL,
  `updated_at` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `password`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Ponir', '$2b$10$jqZR3Xq8fW.ErLqqlauxkuryh.vCYwav9a4ndpanpenP3bBUPA8xS', 1, '2022-08-24 21:31:58.452', '2022-08-24 21:31:58.452'),
(2, 'Alamin', '$2b$10$kDHW8fZ7jRQ.PzyxACNiOODxdcA4frrsipe3i2kbENiVuqjNiV/1u', 0, '2022-08-24 21:51:13.764', '2022-08-24 21:51:13.764'),
(3, 'Rana', '$2b$10$rEJZu87FMZp9KwO317PiguGsQ6pWVIrOdsAyX4boFJJ3N.1K5FN6u', 0, '2022-08-25 12:30:32.580', '2022-08-25 12:30:32.580');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
