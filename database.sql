DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
	`id`         bigint unsigned     NOT NULL AUTO_INCREMENT,
	`first_name` varchar(64)         NOT NULL COLLATE utf8mb4_unicode_ci,
	`last_name`  varchar(64)         NOT NULL COLLATE utf8mb4_unicode_ci,
	`username`   varchar(16)         NOT NULL COLLATE utf8mb4_unicode_ci,
	`password`   text                NOT NULL COLLATE utf8mb4_unicode_ci,
	`status`     enum('b', 'd', 'e') NOT NULL,
	`created_at` datetime            NOT NULL,
	`updated_at` datetime            DEFAULT NULL,

	PRIMARY KEY (`id`),
	UNIQUE  KEY `username`  (`username`),
	KEY         `first_name`(`first_name`),
	KEY         `last_name` (`last_name`),
	KEY         `status`    (`status`),
	KEY         `created_at`(`created_at`),
	KEY         `updated_at`(`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `users` WRITE;
UNLOCK TABLES;


DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo` (
	`id`      bigint unsigned     NOT NULL AUTO_INCREMENT,
	`user_id` bigint unsigned     NOT NULL,
	`title`   varchar(32)         NOT NULL COLLATE utf8mb4_unicode_ci,
	`detail`  text                DEFAULT NULL COLLATE utf8mb4_unicode_ci,
	`status`  enum('p', 'f', 's') NOT NULL COLLATE utf8mb4_unicode_ci,
	PRIMARY KEY(`id`),
	KEY        `user_id` (`user_id`),
	UNIQUE KEY `title`   (`title`),
	KEY        `status`  (`status`),

	CONSTRAINT `todo_fk1` FOREIGN KEY (`user_id`)
		REFERENCES `users` (`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `todo` WRITE;
UNLOCK TABLES;
