-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: emprende
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `emprende`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `emprende` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `emprende`;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `categoria_id` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(45) NOT NULL,
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Femenino'),(2,'Masculino'),(3,'Decoracion'),(4,'Artes y manualidades');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `cliente_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`cliente_id`),
  KEY `fk_clients_user1_idx` (`user_id`),
  CONSTRAINT `fk_clients_user1` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,1),(2,3),(3,6),(4,8);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emprendimiento`
--

DROP TABLE IF EXISTS `emprendimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprendimiento` (
  `emprendimiento_id` int NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(45) NOT NULL,
  `rubro_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `estado` tinyint NOT NULL,
  PRIMARY KEY (`emprendimiento_id`,`usuario_id`),
  KEY `fk_emprendimiento_rubro1_idx` (`rubro_id`),
  KEY `fk_emprendimiento_user1_idx` (`usuario_id`),
  CONSTRAINT `fk_emprendimiento_rubro1` FOREIGN KEY (`rubro_id`) REFERENCES `rubro` (`rubro_id`),
  CONSTRAINT `fk_emprendimiento_user1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprendimiento`
--

LOCK TABLES `emprendimiento` WRITE;
/*!40000 ALTER TABLE `emprendimiento` DISABLE KEYS */;
INSERT INTO `emprendimiento` VALUES (1,'Sakila',1,4,1),(2,'Deco Home',3,5,0),(3,'Botanic Art',4,7,0),(4,'Maktub',2,9,1),(5,'Roma',2,10,1);
/*!40000 ALTER TABLE `emprendimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `estado_id` int NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(45) NOT NULL,
  PRIMARY KEY (`estado_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Aprobado'),(2,'En proceso'),(3,'Entregado');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `codigo_pedido` int NOT NULL AUTO_INCREMENT,
  `estado_id` int NOT NULL DEFAULT '1',
  `cliente_id` int NOT NULL,
  `emprendimiento_id` int NOT NULL,
  `fecha_pedido` date NOT NULL,
  PRIMARY KEY (`codigo_pedido`),
  KEY `fk_pedidos_estado1_idx` (`estado_id`),
  KEY `fk_pedidos_clients1_idx` (`cliente_id`),
  KEY `fk_pedidos_emprendimiento1_idx` (`emprendimiento_id`),
  CONSTRAINT `fk_pedidos_clients1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`cliente_id`),
  CONSTRAINT `fk_pedidos_emprendimiento1` FOREIGN KEY (`emprendimiento_id`) REFERENCES `emprendimiento` (`emprendimiento_id`),
  CONSTRAINT `fk_pedidos_estado1` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`estado_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,1,1,4,'2023-11-08'),(2,2,3,4,'2023-11-10'),(3,3,1,5,'2023-07-24'),(6,3,1,5,'2023-08-24');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_detalle`
--

DROP TABLE IF EXISTS `pedido_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_detalle` (
  `pedido_detalle_id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int NOT NULL,
  `codigo_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`pedido_detalle_id`),
  KEY `fk_pedido_details_pedidos1_idx` (`pedido_id`),
  KEY `fk_pedido_details_products1_idx` (`codigo_producto`),
  CONSTRAINT `fk_pedido_details_pedidos1` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`codigo_pedido`),
  CONSTRAINT `fk_pedido_details_products1` FOREIGN KEY (`codigo_producto`) REFERENCES `producto` (`codigo_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_detalle`
--

LOCK TABLES `pedido_detalle` WRITE;
/*!40000 ALTER TABLE `pedido_detalle` DISABLE KEYS */;
INSERT INTO `pedido_detalle` VALUES (1,1,1,1),(2,1,3,2),(3,6,2,3),(4,6,4,1),(5,2,1,2),(6,2,3,2);
/*!40000 ALTER TABLE `pedido_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `persona_id` int NOT NULL AUTO_INCREMENT,
  `last_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  PRIMARY KEY (`persona_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'Garcia','Ana'),(2,'Rodriguez','Juan'),(3,'Lopez','Maria'),(4,'Perez','Javier'),(5,'Martinez','Laura'),(6,'Sanchez','Carlos'),(7,'Gonzalez','Patricia'),(8,'Ramirez','Roberto'),(9,'Flores','Ana Maria'),(10,'Torres','Sergio'),(13,'Niz','Luz'),(14,'test','Persona');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `codigo_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(100) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `precio` double NOT NULL,
  `mas_comprado` tinyint NOT NULL DEFAULT '0',
  `descuento` tinyint NOT NULL DEFAULT '0',
  `img` longtext NOT NULL,
  `categoria_id` int NOT NULL,
  `emprendimiento_id` int NOT NULL,
  PRIMARY KEY (`codigo_producto`),
  KEY `fk_products_categories_idx` (`categoria_id`),
  KEY `fk_products_emprendimiento1_idx` (`emprendimiento_id`),
  CONSTRAINT `fk_products_categories` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`categoria_id`),
  CONSTRAINT `fk_products_emprendimiento1` FOREIGN KEY (`emprendimiento_id`) REFERENCES `emprendimiento` (`emprendimiento_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Essnce Jersey corto unicolor tejido de canalé','remera azul',5250,1,0,'https://img.ltwebstatic.com/images3_pi/2020/08/14/15973735644f1101806bbc2e0d1f77a7c01f597384_thumbnail_600x.webp',1,4),(2,'LUNE Sudadera con estampado de letra con forro','chomba gris',8.32,0,1,'https://img.ltwebstatic.com/images3_pi/2023/07/18/16896441460352109edf60d31c06682784c20608b2_thumbnail_600x.webp',1,5),(3,'Manfinity EMRG Hombres Camiseta con estampado','remera blanca',4300,0,0,'https://img.ltwebstatic.com/images3_pi/2023/04/06/1680759342e8849d12586ae3e69d3f548b3deabee5_thumbnail_600x.webp',2,4),(4,'Manfinity Homme Hombres Capucha japonés carácter & con estampado de onda','short negro',10.27,1,1,'https://img.ltwebstatic.com/images3_pi/2022/08/25/1661394095cc055ccf2d15e73b0394a6c595649835_thumbnail_600x.webp',2,5),(5,'PRUEBA DELETE','prueba',2500,0,0,'https://img.ltwebstatic.com/images3_pi/2020/08/14/15973735644f1101806bbc2e0d1f77a7c01f597384_thumbnail_600x.webp',2,4),(8,'48 piezas/set pendientes de aro','para mujer, Ideal para citas, vacaciones, regalo',3500,0,0,'https://img.ltwebstatic.com/images3_spmp/2023/09/15/63/16947400747b605720ff4f618d04f4d9229dc4a0e0_thumbnail_600x.webp',1,4);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `rol_id` int NOT NULL AUTO_INCREMENT,
  `rol_name` varchar(45) NOT NULL,
  PRIMARY KEY (`rol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Cliente'),(2,'Administrador'),(3,'Emprendedor');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubro`
--

DROP TABLE IF EXISTS `rubro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubro` (
  `rubro_id` int NOT NULL AUTO_INCREMENT,
  `nombre_rubro` varchar(45) NOT NULL,
  PRIMARY KEY (`rubro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubro`
--

LOCK TABLES `rubro` WRITE;
/*!40000 ALTER TABLE `rubro` DISABLE KEYS */;
INSERT INTO `rubro` VALUES (1,'Accesorios'),(2,'Indumentaria'),(3,'Decoracion'),(4,'Arte');
/*!40000 ALTER TABLE `rubro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(45) NOT NULL,
  `persona_id` int NOT NULL,
  `rol_id` int NOT NULL,
  `mail` varchar(45) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  KEY `fk_user_person1_idx` (`persona_id`),
  KEY `fk_user_role1_idx` (`rol_id`),
  CONSTRAINT `fk_user_person1` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`persona_id`),
  CONSTRAINT `fk_user_role1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Tester1$',1,1,'garcia.ana@mail.com'),(2,'Tester2$',2,2,'rodriguez.juan@email.com'),(3,'tester3',3,1,'lopez.maria@email.com'),(4,'Tester4$',4,3,'perez.javier@email.com'),(5,'tester5',5,3,'martinez.laura@email.com'),(6,'tester6',6,1,'sanchez.carlos@email.com'),(7,'tester7',7,3,'gonzalez.patricia@email.com'),(8,'tester8',8,1,'ramirez.roberto@email.com'),(9,'tester9',9,3,'flores.anamaria@email.com'),(10,'tester10',10,3,'torres.sergio@email.com'),(13,'teste01_$',13,3,'tester@post.com'),(14,'teste01_$',13,3,'test@post.com'),(15,'Test01$',14,1,'person.test@email.com');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-20 22:09:06
