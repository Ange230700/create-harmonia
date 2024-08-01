-- $ Conceptual data model
-- § Relationship between users and items
-- A user can have many items and an item belongs to a user. (many-to-one, foreign key in the item table)
DROP DATABASE IF EXISTS `User`;

DROP DATABASE IF EXISTS `Item`;

CREATE TABLE
  `User` (
    `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  `Item` (
    `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE
  );