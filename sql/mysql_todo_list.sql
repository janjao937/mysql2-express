 DROP DATABASE IF EXISTS `mysql_todo_list`;
 
 CREATE DATABASE IF NOT EXISTS `mysql_todo_list`;
 USE `mysql_todo_list`;
 
 CREATE TABLE IF NOT EXISTS `users` (
	`id` INT AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL UNIQUE,
    `password` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`)
 );
 
 CREATE TABLE IF NOT EXISTS `todos` (
	`id` INT AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT FALSE,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
 );