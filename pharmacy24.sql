-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2025 at 04:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmacy24`
--

-- --------------------------------------------------------

--
-- Table structure for table `orderhistory`
--

CREATE TABLE `orderhistory` (
  `id` int(100) NOT NULL,
  `customername` varchar(100) NOT NULL,
  `total` int(100) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderhistory`
--

INSERT INTO `orderhistory` (`id`, `customername`, `total`, `date`) VALUES
(1, 'Mariam', 23, '2022-08-14'),
(2, 'Mariam', 20, '2022-08-14'),
(3, 'Mariam', 20, '2022-08-14'),
(4, 'Mariam', 20, '2022-08-14'),
(5, 'Mariam', 20, '2022-08-14'),
(6, 'Mariam', 20, '2022-08-14'),
(7, 'Mariam', 23, '2022-08-15');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `company`, `price`, `created_at`) VALUES
(2, 'Ibuprofen 200mg', 'HealthCorp', 3.75, '2025-09-15 13:09:26'),
(3, 'Vitamin C 1000mg', 'NutriLife', 5.20, '2025-09-15 13:09:26'),
(4, 'Amoxicillin 250mg', 'MediCare Ltd', 8.90, '2025-09-15 13:09:26'),
(5, 'Cetirizine 10mg', 'AllergoPharm', 1.99, '2025-09-15 13:09:26'),
(6, 'Azithromycin 500mg', 'BioPharma', 12.00, '2025-09-15 13:09:26'),
(7, 'Loratadine 10mg', 'Wellness Labs', 4.50, '2025-09-15 13:09:26'),
(8, 'Omeprazole 20mg', 'Digestix', 6.80, '2025-09-15 13:09:26'),
(9, 'Insulin Glargine', 'DiabeCare', 25.00, '2025-09-15 13:09:26'),
(10, 'Hydroxychloroquine 200mg', 'GlobalMed', 15.40, '2025-09-15 13:09:26'),
(11, 'Metformin 500mg', 'GlucoseCare', 7.20, '2025-09-15 13:14:14'),
(12, 'Aspirin 81mg', 'HeartWell', 2.10, '2025-09-15 13:14:14'),
(13, 'Atorvastatin 20mg', 'CardioPharm', 14.50, '2025-09-15 13:14:14'),
(14, 'Losartan 50mg', 'RenalHealth', 9.80, '2025-09-15 13:14:14'),
(15, 'Simvastatin 40mg', 'CholestMed', 12.30, '2025-09-15 13:14:14'),
(16, 'Furosemide 40mg', 'Diurex Labs', 6.40, '2025-09-15 13:14:14'),
(17, 'Levothyroxine 100mcg', 'EndoLife', 10.00, '2025-09-15 13:14:14'),
(18, 'Clopidogrel 75mg', 'Thrombix', 13.70, '2025-09-15 13:14:14'),
(19, 'Warfarin 5mg', 'CoaguloCare', 11.20, '2025-09-15 13:14:14'),
(20, 'Amlodipine 10mg', 'BP Pharma', 8.60, '2025-09-15 13:14:14'),
(21, 'Doxycycline 100mg', 'AntiBioTech', 5.90, '2025-09-15 13:14:14'),
(22, 'Ciprofloxacin 500mg', 'CureWell', 7.80, '2025-09-15 13:14:14'),
(23, 'Metoprolol 50mg', 'BetaBlock Pharma', 9.30, '2025-09-15 13:14:14'),
(24, 'Hydrochlorothiazide 25mg', 'DiureCare', 4.20, '2025-09-15 13:14:14'),
(25, 'Lisinopril 10mg', 'ACEWell', 8.00, '2025-09-15 13:14:14'),
(26, 'Spironolactone 25mg', 'MineralCare', 7.10, '2025-09-15 13:14:14'),
(27, 'Gabapentin 300mg', 'NeuroPharma', 16.40, '2025-09-15 13:14:14'),
(28, 'Pregabalin 75mg', 'NeuroMed', 18.90, '2025-09-15 13:14:14'),
(29, 'Alprazolam 0.5mg', 'CalmMeds', 5.70, '2025-09-15 13:14:14'),
(30, 'Diazepam 10mg', 'TranquilCare', 6.90, '2025-09-15 13:14:14'),
(31, 'Sertraline 50mg', 'MoodLift', 12.40, '2025-09-15 13:14:14'),
(32, 'Fluoxetine 20mg', 'MindCare Labs', 11.60, '2025-09-15 13:14:14'),
(33, 'Escitalopram 10mg', 'Sereno Pharma', 13.20, '2025-09-15 13:14:14'),
(34, 'Venlafaxine 75mg', 'BalanceMeds', 14.80, '2025-09-15 13:14:14'),
(35, 'Quetiapine 200mg', 'PsyCare', 20.00, '2025-09-15 13:14:14'),
(36, 'Olanzapine 10mg', 'SchizoPharm', 19.70, '2025-09-15 13:14:14'),
(37, 'Risperidone 2mg', 'NeuroBalance', 15.30, '2025-09-15 13:14:14'),
(38, 'Haloperidol 5mg', 'PsyStabil', 8.50, '2025-09-15 13:14:14'),
(39, 'Montelukast 10mg', 'AsthmaRelief', 9.90, '2025-09-15 13:14:14'),
(40, 'Salbutamol Inhaler', 'BreathWell', 12.60, '2025-09-15 13:14:14'),
(41, 'Budesonide Inhaler', 'AirFlow Labs', 18.40, '2025-09-15 13:14:14'),
(42, 'Fluticasone Nasal Spray', 'AllergoCare', 11.10, '2025-09-15 13:14:14'),
(43, 'Beclomethasone Inhaler', 'PulmoPharm', 15.20, '2025-09-15 13:14:14'),
(44, 'Prednisolone 10mg', 'Steroidix', 7.80, '2025-09-15 13:14:14'),
(45, 'Hydrocortisone Cream', 'SkinWell', 4.90, '2025-09-15 13:14:14'),
(46, 'Clotrimazole Cream', 'FungiStop', 3.70, '2025-09-15 13:14:14'),
(47, 'Ketoconazole Shampoo', 'ScalpCare', 6.40, '2025-09-15 13:14:14'),
(48, 'Terbinafine 250mg', 'AntiFungix', 9.50, '2025-09-15 13:14:14'),
(49, 'Aciclovir 400mg', 'ViroCure', 10.80, '2025-09-15 13:14:14'),
(50, 'Valacyclovir 500mg', 'HerpFree Labs', 14.10, '2025-09-15 13:14:14'),
(51, 'Oseltamivir 75mg', 'FluStop', 19.40, '2025-09-15 13:14:14'),
(52, 'Zidovudine 300mg', 'HIVCare', 22.30, '2025-09-15 13:14:14'),
(53, 'Tenofovir 300mg', 'ViroLife', 24.70, '2025-09-15 13:14:14'),
(54, 'Dolutegravir 50mg', 'HIVShield', 28.60, '2025-09-15 13:14:14'),
(55, 'Lamivudine 150mg', 'ViroMedix', 21.40, '2025-09-15 13:14:14'),
(56, 'Methotrexate 10mg', 'AutoImmune Labs', 16.90, '2025-09-15 13:14:14'),
(57, 'Cyclophosphamide 50mg', 'ChemoCare', 25.00, '2025-09-15 13:14:14'),
(58, 'Cisplatin Injection', 'OncoMed', 35.00, '2025-09-15 13:14:14'),
(59, 'Paclitaxel Injection', 'CancerCure', 40.00, '2025-09-15 13:14:14'),
(60, 'Morphine 10mg', 'PainRelief Pharma', 18.00, '2025-09-15 13:14:14'),
(62, 'Paracetamol 500mg	', 'ACME Pharma', 2.50, '2025-09-17 14:11:01');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `amount`, `description`, `created_at`) VALUES
(3, 2, 50.00, 'Purchase of item A', '2025-09-16 16:20:05'),
(4, 2, 75.00, 'Purchase of item B', '2025-09-16 16:20:05'),
(5, 2, 31.39, 'Checkout of 4 item(s)', '2025-09-16 17:00:51'),
(6, 2, 19.60, 'Checkout of 3 item(s)', '2025-09-17 13:02:12'),
(7, 2, 55.19, 'Checkout of 6 item(s)', '2025-09-17 14:17:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `phone`, `address`, `created_at`) VALUES
(1, 'Test User', 'user1@example.com', '$2a$10$0j1z1X0Z6z8X7Y8X9Z0A1u.8X9Z0A1u2X3Y4Z5A6B7C8D9E0F1G2', 'user', '1234567890', '123 Test St, City, Country', '2025-09-16 15:57:28'),
(2, 'MOHAMMED IFTE', 'ifte.phoenix@gmail.com', '$2b$10$5.B85v/yn9wLPhF3RlBqc.2AUgFrEXvKrK55fpBcoow.h12KaM38C', 'user', '01774592045', 'Dhaka, Bangladesh', '2025-09-16 16:04:48'),
(3, 'General', 'mohammed.iftekhar.41980@gmail.com', '$2b$10$nJ2nDZmGbgK7zg77hMEXquvm771cddcgOKKwBFcwr71JBCSLcdakW', 'admin', '01720318054', '262, Sk Mujib Road, Dewanhat, Chattogram', '2025-09-16 17:02:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orderhistory`
--
ALTER TABLE `orderhistory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orderhistory`
--
ALTER TABLE `orderhistory`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
