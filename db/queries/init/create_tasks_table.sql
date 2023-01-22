-- Create tasks table
CREATE TABLE `tasks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `task` VARCHAR(50) NOT NULL,
    `for` VARCHAR(25) NOT NULL,
    `priority` VARCHAR(10) NOT NULL,
    `length` INT NOT NULL,
    `time_unit` VARCHAR(10) NOT NULL,
    `status` INT NOT NULL,
    PRIMARY KEY (`id`)
);