-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Server: 127.0.0.1
-- Creation Date and time: 24-04-2020 a las 03:31:28
-- Server version: 10.4.11-MariaDB
-- PHP version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Data base: `delilah_resto_project`
--

-- --------------------------------------------------------

--
-- 'Orders' table structure 
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Status` varchar(10) NOT NULL,
  `Time` time NOT NULL DEFAULT current_timestamp(),
  `Payment` varchar(60) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Data dump in `orders` table
--

INSERT INTO `orders` (`id`, `Status`, `Time`, `Payment`, `CustomerID`,`Date`) VALUES
(1, 'CONFIRM', '10:34:23', 'pending', 2, '2020-06-17'),
(2, 'NEW', '19:55:06', 'pending', 3, '2020-06-17'),
(3, 'NEW', '22:35:41', 'pending', 3, '2020-06-17'),
(4, 'NEW', '22:39:31', 'pending', 3, '2020-06-17'),
(5, 'NEW', '23:51:38', 'pending', 1, '2020-06-17'),
(6, 'NEW', '16:17:00', 'pending', 3, '2020-06-17'),
(7, 'NEW', '20:31:14', 'pending', 3, '2020-06-17');

-- --------------------------------------------------------

--
--  'Products' table structure 
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(60) NOT NULL,
  `price` float NOT NULL,
  `image_url` varchar(220) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--  Data dump in `products` table
--

INSERT INTO `products` (`id`, `name`, `price`, `imagen_url`) VALUES
(1, 'Big burger', 280, 'https://image.freepik.com/foto-gratis/hamburguesa-papas-fritas-tabla-cortar_23-2148273000.jpg'),
(2, 'Pizza ', 600, 'https://image.freepik.com/foto-gratis/arreglo-encantador-cena-dia-san-valentin-pizza-forma-corazon-espacio-copia_23-2148392074.jpg'),
(3, 'French fries', 240, 'https://image.freepik.com/foto-gratis/vista-superior-papas-fritas-salsa-tomate_23-2148272963.jpg'),
(4, 'Special fries', 240, 'https://image.freepik.com/foto-gratis/tazon-papas-fritas-espacio-copia_23-2148272959.jpg'),
(5, 'Finger chiken', 280, 'https://image.freepik.com/foto-gratis/bocaditos-crujientes-pollo-palitos-ketcup-sobre-tabla-madera_114579-1416.jpg'),
(6, 'Muzzarela pizza', 380, 'https://image.freepik.com/foto-gratis/lay-flat-pizza-mesa-madera_23-2148273088.jpg'),
(7, 'Beer', 180, 'https://image.freepik.com/foto-gratis/vaso-lleno-cerveza-lager_73989-5043.jpg'),
(8, 'Coke', 130, 'https://image.freepik.com/foto-gratis/vidrio-cola-hielo_1339-6220.jpg'),
(9, 'Beer', 160, 'https://image.freepik.com/foto-gratis/lata-cerveza-madera_19-127481.jpg'),
(10, 'Special meet', 230, 'https://image.freepik.com/foto-gratis/brochetas-barbacoa-carne-verdura-sobre-pizarra-circular-negra_23-2148206998.jpg');

-- --------------------------------------------------------

--
-- 'orders_by_products' table structure 
--

CREATE TABLE `orders_by_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Data dump in `orders_by_products` table
--

INSERT INTO `orders_by_products` (`id`, `order_id`, `product_id`) VALUES
(1, 1, 2),
(2, 1, 5),
(3, 2, 2),
(4, 2, 4),
(5, 3, 2),
(6, 3, 8),
(7, 4, 3),
(8, 4, 9),
(9, 5, 10),
(10, 5, 7),
(11, 6, 9),
(12, 7, 1),
(13, 7, 2);

-- --------------------------------------------------------

--
-- 'customers' table structure 
--

CREATE TABLE `customers` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `user_name` varchar(40) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` int(20) NOT NULL,
  `adress` varchar(60) NOT NULL,
  `user_type` varchar(30) NOT NULL DEFAULT 'user',
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Data dump in `customers` table
--

INSERT INTO `customers` (`id`, `name`, `last_name`, `user_name`, `email`, `phone`, `adress`, `user_type`, `password`) VALUES
(1, 'Moises', 'Perez', 'Moi', 'moises@gmail.com', 159753, 'California', 'administrator', '10'),
(2, 'John', 'Doe','jd', 'john@gmail.com', 123456, 'Miami', 'user','10'),
(3, 'name', 'lastname', 'username', 'email@email.com', 123456, 'his house', 'user', '10');
