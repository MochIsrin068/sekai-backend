-- sekai.news definition

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` TEXT DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- sekai.about_us definition

CREATE TABLE `about_us` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` LONGTEXT DEFAULT NULL,
  `vision` varchar(255) DEFAULT NULL,
  `mission` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.category_page definition

CREATE TABLE `category_page` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.event definition

CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `link` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.highlight_section definition

CREATE TABLE `highlight_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `description` LONGTEXT DEFAULT NULL,
  `section_number` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.job definition

CREATE TABLE `job` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` LONGTEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.marketplace definition

CREATE TABLE `marketplace` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.news definition

CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` LONGTEXT DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.product_category definition

CREATE TABLE `product_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.about_us_yt_embed definition

CREATE TABLE `about_us_yt_embed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` MEDIUMTEXT DEFAULT NULL,
  `about_us_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `about_us_id` (`about_us_id`),
  CONSTRAINT `about_us_yt_embed_ibfk_1` FOREIGN KEY (`about_us_id`) REFERENCES `about_us` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.banner definition

CREATE TABLE `banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_page_id` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `link` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_page_id` (`category_page_id`),
  CONSTRAINT `banner_ibfk_1` FOREIGN KEY (`category_page_id`) REFERENCES `category_page` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.highlight_product definition

CREATE TABLE `highlight_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `highlight_section_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `highlight_product_highlight_section_FK` (`highlight_section_id`),
  CONSTRAINT `highlight_product_highlight_section_FK` FOREIGN KEY (`highlight_section_id`) REFERENCES `highlight_section` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.product definition

CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` LONGTEXT DEFAULT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.product_image definition

CREATE TABLE `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sekai.product_marketplace definition

CREATE TABLE `product_marketplace` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` TEXT DEFAULT NULL,
  `marketplace_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `marketplace_id` (`marketplace_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_marketplace_ibfk_1` FOREIGN KEY (`marketplace_id`) REFERENCES `marketplace` (`id`),
  CONSTRAINT `product_marketplace_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- sekai.product_yt_embed definition
CREATE TABLE `product_yt_embed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` TEXT DEFAULT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_yt_embed_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO rintoday_sekai.event (image,link) VALUES
	 ('event1.jpg','http://example.com/event1'),
	 ('event2.jpg','http://example.com/event2');

INSERT INTO rintoday_sekai.job (title,content) VALUES
	 ('Software Developer','Responsibilities include...'),
	 ('Marketing Specialist','Responsibilities include...');

INSERT INTO rintoday_sekai.news (title,content,created_at,image) VALUES
	 ('Company Launches New Product','We are excited to announce our latest product...','2024-06-03 20:34:40','/assets/1717318997323-github_logo.png'),
	 ('Holiday Sale Announced','<img src="/assets/1717318997323-github_logo.png"/><p>Enjoy great discounts during our holiday sale!</p>','2024-06-03 20:34:40','/assets/1717318997323-github_logo.png');

INSERT INTO rintoday_sekai.highlight_section (title,description,section_number) VALUES
	 ('Healty Lifestyle','Shop our range',1),
	 ('Haalty Product','Innvovation',2);

INSERT INTO rintoday_sekai.highlight_product (image,link,highlight_section_id) VALUES
	 ('/assets/1717318997323-github_logo.png','http://localhost:4000/assets/1717318997323-github_logo.png',1),
	 ('/assets/1717318997323-github_logo.png','http://localhost:4000/assets/1717318997323-github_logo.png',2),
	 ('/assets/1717318997323-github_logo.png','http://localhost:4000/assets/1717318997323-github_logo.png',1);

INSERT INTO rintoday_sekai.about_us (description,vision,mission) VALUES
	 ('We are a leading company...','To be the best...','Our mission is to...');

INSERT INTO rintoday_sekai.about_us_yt_embed (link,about_us_id) VALUES
	 ('http://youtube.com/embed/aboutus',1);

INSERT INTO rintoday_sekai.category_page (name) VALUES
	 ('Home'),
	 ('Products'),
	 ('Services');

INSERT INTO rintoday_sekai.banner (category_page_id,image,link) VALUES
	 (1,'home_banner.jpg','http://example.com/home'),
	 (2,'products_banner.jpg','http://example.com/products');

INSERT INTO rintoday_sekai.product_category (name) VALUES
	 ('Electronics'),
	 ('Furniture'),
	 ('Clothing');

INSERT INTO rintoday_sekai.marketplace (name,image) VALUES
	 ('Amazon','amazon_logo.jpg'),
	 ('eBay','ebay_logo.jpg');

INSERT INTO rintoday_sekai.product (name,description,category_id) VALUES
	 ('Smartphone','Latest model with advanced features',1),
	 ('Sofa','Comfortable and stylish',2);

INSERT INTO rintoday_sekai.product_yt_embed (link,product_id) VALUES
	 ('http://youtube.com/embed/product1',1),
	 ('http://youtube.com/embed/product2',2);

INSERT INTO rintoday_sekai.product_image (image,color,product_id) VALUES
	 ('smartphone.jpg','Black',1),
	 ('sofa.jpg','Blue',2);

INSERT INTO rintoday_sekai.product_marketplace (link,marketplace_id,product_id) VALUES
	 ('http://amazon.com/product1',1,1),
	 ('http://ebay.com/product2',2,2);
