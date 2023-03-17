-- Create tasks table (NOT USED)
CREATE TABLE `tasks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `task` VARCHAR(50) NOT NULL,
    `for` INT,
    `priority` INT,
    `length` INT NOT NULL,
    `time_unit` INT,
    `desc` VARCHAR(255) NULL,
    `userid` VARCHAR(50) NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`for`) REFERENCES `reason`(`reason_id`),
    FOREIGN KEY (`priority`) REFERENCES `priority`(`priority_id`),
    FOREIGN KEY (`time_unit`) REFERENCES `time_unit`(`time_unit_id`)
);