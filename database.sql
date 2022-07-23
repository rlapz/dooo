DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
	`id`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(64)     NOT NULL COLLATE utf8mb4_unicode_ci,
	`last_name`  VARCHAR(64)     DEFAULT NULL COLLATE utf8mb4_unicode_ci,
	`username`   VARCHAR(16)     NOT NULL COLLATE utf8mb4_unicode_ci,
	`email`      VARCHAR(32)     NOT NULL COLLATE utf8mb4_unicode_ci,
	`password`   VARCHAR(255)    NOT NULL COLLATE utf8mb4_unicode_ci,

	-- true: enabled, false: disabled -- 
	`status`     BOOLEAN         NOT NULL,
	`created_at` DATETIME        NOT NULL,
	`updated_at` DATETIME        DEFAULT NULL,

	PRIMARY KEY (`id`),
	UNIQUE  KEY `username`  (`username`),
	UNIQUE  KEY `email`     (`email`),
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
	`id`      BIGINT UNSIGNED     NOT NULL AUTO_INCREMENT,
	`user_id` BIGINT UNSIGNED     NOT NULL,
	`title`   VARCHAR(32)         NOT NULL COLLATE utf8mb4_unicode_ci,
	`detail`  TEXT                DEFAULT NULL COLLATE utf8mb4_unicode_ci,

	-- p: pending, f: finished, c: cancelled --
	`status`  ENUM('p', 'f', 'c') NOT NULL COLLATE utf8mb4_unicode_ci,

	PRIMARY KEY(`id`),
	KEY        `user_id` (`user_id`),
	KEY        `title`   (`title`),
	KEY        `status`  (`status`),

	CONSTRAINT `todo_fk1` FOREIGN KEY (`user_id`)
		REFERENCES `users` (`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `todo` WRITE;
UNLOCK TABLES;
