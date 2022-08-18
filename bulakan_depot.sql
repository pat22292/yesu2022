-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2021 at 10:00 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bulakan_depot`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `origin_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `id` int(10) UNSIGNED NOT NULL,
  `img_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`id`, `img_id`, `product_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'op8eapjybajudlvnjalv', 3, '2021-12-04 05:14:59', '2021-12-04 05:14:59', NULL),
(2, 'bwbaqwzyw3qzvodkdguk', 3, '2021-12-04 05:15:01', '2021-12-04 05:15:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(2, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(3, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(4, '2016_06_01_000004_create_oauth_clients_table', 1),
(5, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(6, '2020_05_03_014734_create_users_table', 1),
(7, '2021_01_13_124230_create_products_table', 1),
(8, '2021_01_14_101407_create_stores_table', 1),
(9, '2021_01_14_101508_create_riders_table', 1),
(10, '2021_01_14_101531_create_categories_table', 1),
(11, '2021_01_14_101646_create_galleries_table', 1),
(12, '2021_01_14_101746_create_ratings_table', 1),
(13, '2021_01_14_104305_create_carts_table', 1),
(14, '2021_01_14_104324_create_orders_table', 1),
(15, '2021_06_30_032214_create_variations_table', 1),
(16, '2021_06_30_032225_create_variation_options_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('6432fa04a6fc3b011407b8e443257d74a5fcca5c4d2f77f5e8f959a7b475a0dfadb330951ce8c2ed', 1, 1, 'Token Name', '[]', 0, '2021-12-01 06:51:26', '2021-12-01 06:51:26', '2022-12-01 06:51:26');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Lumen Personal Access Client', 'DVVHbjmpwI4DTDBoJdYlAiMniBJWDc3oK6ppJaqT', NULL, 'http://localhost', 1, 0, 0, '2021-12-01 06:41:37', '2021-12-01 06:41:37'),
(2, NULL, 'Lumen Password Grant Client', 'wxp2fqw9S8tpvovYWDeu2NIUXNpesZzC7TcPFGnz', 'users', 'http://localhost', 0, 1, 0, '2021-12-01 06:41:37', '2021-12-01 06:41:37');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2021-12-01 06:41:37', '2021-12-01 06:41:37');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `origin_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `variation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `variation_option` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `package_length` decimal(8,2) NOT NULL,
  `package_width` decimal(8,2) NOT NULL,
  `package_height` decimal(8,2) NOT NULL,
  `package_weight` decimal(8,2) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `img_id`, `description`, `variation`, `variation_option`, `price`, `package_length`, `package_width`, `package_height`, `package_weight`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Buchi', 'hd5amfdbuih8y7fjjgdn', 'test', 'Flavor', 'Size', 0, '1.00', '1.00', '1.00', '1.00', 1, '2021-12-01 06:55:03', '2021-12-01 06:55:03', NULL),
(2, 'CROCS NA PEKE', 'u5wsgiw37eybidfkdhic', 'TEST', 'Color', 'Size', 0, '1.00', '1.00', '1.00', '1.00', 1, '2021-12-04 03:59:27', '2021-12-04 03:59:27', NULL),
(3, 'Digital Piano', 'ajqal0dibmll8au40eof', 'test', '', '', 5000, '1.00', '1.00', '1.00', '1.00', 1, '2021-12-04 05:14:58', '2021-12-04 05:14:58', NULL),
(4, 'SOLO VALVE ADJUSTER WITH TAPPET 4 VARIATION (8MM , 9MM , 10MM , SET) DURABLE TOOLS HEAVY DUTY', 'eikuzkawmk5qmpl1cymu', 'test', 'Sizes', '', 0, '1.00', '1.00', '1.00', '1.00', 1, '2021-12-07 04:10:47', '2021-12-07 04:10:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(10) UNSIGNED NOT NULL,
  `rating` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `riders`
--

CREATE TABLE `riders` (
  `id` int(10) UNSIGNED NOT NULL,
  `rider_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` int(10) UNSIGNED NOT NULL,
  `store_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `municipality` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cellphone_number` bigint(20) NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `v_code` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cart` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `address`, `municipality`, `profile_picture`, `email`, `cellphone_number`, `password`, `v_code`, `cart`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Dream', 'App builder', '973 Pulo Street', 'Matungao, Bulakan, Bulacan', NULL, 'dream.appbuilders@gmail.com', 639288381555, '$2y$10$.Jev9sgTPftDcvFJU/bOwOPHCiXalF/GAk.laPEz8gDt8lUJGIx6S', '2219', '{\r\n    \"cart\": [\r\n        {\r\n            \"product_id\": 1,\r\n            \"variation_id\": 1,\r\n            \"variation_option\": 0,\r\n            \"quantity\": 2\r\n        },\r\n        {\r\n            \"product_id\": 1,\r\n            \"variation_id\": 2,\r\n            \"variation_option\": 0,\r\n            \"quantity\": 3\r\n        },\r\n        {\r\n            \"product_id\": 1,\r\n            \"variation_id\": 3,\r\n            \"variation_option\": 1,\r\n            \"quantity\": 3\r\n        },\r\n        {\r\n            \"product_id\": 2,\r\n            \"variation_id\": 4,\r\n            \"variation_option\": 0,\r\n            \"quantity\": 1\r\n        },\r\n        {\r\n            \"product_id\": 3,\r\n            \"variation_id\": null,\r\n            \"variation_option\": null,\r\n            \"quantity\": 1\r\n        },\r\n        {\r\n            \"product_id\": 4,\r\n            \"variation_id\": 11,\r\n            \"variation_option\": null,\r\n            \"quantity\": 1\r\n        }\r\n    ]\r\n}', '2021-12-01 06:51:25', '2021-12-01 06:51:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `variations`
--

CREATE TABLE `variations` (
  `id` int(10) UNSIGNED NOT NULL,
  `has_option` tinyint(1) NOT NULL DEFAULT 0,
  `variation_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variation_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variation_price` int(11) DEFAULT NULL,
  `variation_option` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`variation_option`)),
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `variations`
--

INSERT INTO `variations` (`id`, `has_option`, `variation_name`, `variation_image`, `variation_price`, `variation_option`, `product_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 0, 'Ube', 'zuw9htlmtqfojimd4xjp', NULL, '{\"Small\":\"100\",\"Large\":\"200\"}', 1, '2021-12-01 06:55:05', '2021-12-01 06:55:05', NULL),
(2, 0, 'Keso', 'ztrr3etzhplngqnlkrk7', NULL, '{\"Small\":\"100\",\"Large\":\"200\"}', 1, '2021-12-01 06:55:07', '2021-12-01 06:55:07', NULL),
(3, 0, 'Monggo', 'qrnacbzhwylpicpnwtog', NULL, '{\"Small\":\"80\",\"Large\":\"180\"}', 1, '2021-12-01 06:55:09', '2021-12-01 06:55:09', NULL),
(4, 0, 'Black', 'pkmppkc9yvpgiytlseqx', NULL, '{\"41\":\"129\",\"42\":\"130\",\"43\":\"131\",\"44\":\"132\",\"45\":\"133\"}', 2, '2021-12-04 03:59:30', '2021-12-04 03:59:30', NULL),
(5, 0, 'Red', 'bwri8zcfe5noen5nygw9', NULL, '{\"41\":\"129\",\"42\":\"130\",\"43\":\"131\",\"44\":\"132\",\"45\":\"133\"}', 2, '2021-12-04 03:59:32', '2021-12-04 03:59:32', NULL),
(6, 0, 'Grey', 'j6odef0drs2kea8qy93z', NULL, '{\"41\":\"129\",\"42\":\"130\",\"43\":\"131\",\"44\":\"132\",\"45\":\"133\"}', 2, '2021-12-04 03:59:34', '2021-12-04 03:59:34', NULL),
(7, 0, 'Blue', 'yogtyxqgyvo5ro3xw3fp', NULL, '{\"41\":\"129\",\"42\":\"130\",\"43\":\"131\",\"44\":\"132\",\"45\":\"133\"}', 2, '2021-12-04 03:59:36', '2021-12-04 03:59:36', NULL),
(8, 0, 'Army Green', 'ytvgtczl4aijoejtmfnl', NULL, '{\"41\":\"129\",\"42\":\"130\",\"43\":\"131\",\"44\":\"132\",\"45\":\"133\"}', 2, '2021-12-04 03:59:38', '2021-12-04 03:59:38', NULL),
(9, 0, '8mm', 'izvdvpkpxgdjrdsgazm6', 109, NULL, 4, '2021-12-07 04:10:49', '2021-12-07 04:10:49', NULL),
(10, 0, '9mm', 'btgl2ahz9q5pjlaizf2k', 109, NULL, 4, '2021-12-07 04:10:51', '2021-12-07 04:10:51', NULL),
(11, 0, '10mm', 'xnhm0g18kyy2otwldcpg', 109, NULL, 4, '2021-12-07 04:10:53', '2021-12-07 04:10:53', NULL),
(12, 0, 'SET', 'kumg950wso5xrhu15j4p', 327, NULL, 4, '2021-12-07 04:10:55', '2021-12-07 04:10:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `variation_options`
--

CREATE TABLE `variation_options` (
  `id` int(10) UNSIGNED NOT NULL,
  `variation_option_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variation_option_price` int(11) DEFAULT NULL,
  `variation_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `riders`
--
ALTER TABLE `riders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_cellphone_number_unique` (`cellphone_number`);

--
-- Indexes for table `variations`
--
ALTER TABLE `variations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `variation_options`
--
ALTER TABLE `variation_options`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `riders`
--
ALTER TABLE `riders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `variations`
--
ALTER TABLE `variations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `variation_options`
--
ALTER TABLE `variation_options`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
