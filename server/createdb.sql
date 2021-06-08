-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema proposalsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `proposalsdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `proposalsdb` ;

-- -----------------------------------------------------
-- Table `proposalsdb`.`boat_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proposalsdb`.`boat_type` ;

CREATE TABLE IF NOT EXISTS `proposalsdb`.`boat_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `proposalsdb`.`boat_type`
(`id`, `name`)
VALUES
(1,"Motor Boat"),
(2,"Sail Boat"),
(3,"Speed Boat"),
(4,"Yacht"),
(5,"Dinghy");
-- -----------------------------------------------------
-- Table `proposalsdb`.`user_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proposalsdb`.`user_role` ;

CREATE TABLE IF NOT EXISTS `proposalsdb`.`user_role` (
  `id` INT NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `id_UNIQUE` ON `proposalsdb`.`user_role` (`id` ASC) VISIBLE;

CREATE UNIQUE INDEX `role_UNIQUE` ON `proposalsdb`.`user_role` (`role` ASC) VISIBLE;

INSERT INTO `proposalsdb`.`user_role`
(`id`, `role`)
VALUES
(1,"app_user"),
(2,"company_user");

-- -----------------------------------------------------
-- Table `proposalsdb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proposalsdb`.`user` ;

CREATE TABLE IF NOT EXISTS `proposalsdb`.`user` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `user_role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_user_role_id`
    FOREIGN KEY (`user_role_id`)
    REFERENCES `proposalsdb`.`user_role` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `name_UNIQUE` ON `proposalsdb`.`user` (`name` ASC) VISIBLE;

CREATE INDEX `user_user_role_id_idx` ON `proposalsdb`.`user` (`user_role_id` ASC) VISIBLE;

INSERT INTO `proposalsdb`.`user`
(`id`, `name`, `password`, `user_role_id`)
VALUES
(13,"User 1","$2b$10$0IXAanUXuyRdM1ZWUSaZPe/nOT6VDej2nbAX.Ru.GukLfKhd6RE8u",2),
(14,"User 2","$2b$10$Kjt0y6oQdUg/8GrwbNifm.43vKn7nBaOBsvOJFPGng7kxoEWBw2Ja",2),
(15,"User 3","$2b$10$3tf58742sKI0G22i3Tfs3OgpS9pRsDLNOsNAlNFR3L.QcLeb7SRnm",2),
(16,"User 4","$2b$10$43Xyi7//id5sf5yKyr3a2O3TaDb39vEYA/qQd4qf8XVOgB0L.xkoq",2),
(17,"User 5","$2b$10$CZWHCglDmMQwdClQmVI0je2gyRIOxCcDBcijTdelLEpbxPt/n.r4S",1),
(18,"User 6","$2b$10$JPtAzq/T71aFAFHl2B0ZouAUlI66EgMtBFj8krkecV3Os9rIKZ95.",1),
(19,"User 7","$2b$10$xlmSDetYUjCLEMjjEw0GHuqFiByLJKX19Gj8o.Ihd/GpnCVJ7b7H2",2),
(20,"User 8","$2b$10$Kwlpn5lxDkvhu3pZbtAfzuko9MODX1TIuvEmD/9wJez/lTkN2UXm.",1),
(21,"User 9","$2b$10$b3n491H5IP7Gz5MhJ2fOv.Kn46ghg8Z4Cw33Dxhdvy0/01gaFMlNy",1),
(22,"User 10","$2b$10$Km04PgXJpKonPB1U3sHzLeSVMw4jyU2KC0Qym/t19SAwLv67COp0u",1),
(23,"User 11","$2b$10$NXeIiNOHhu0dVKtsbaqokOoa94P2TwvuQgqqj79TMrLLXYBoK9xPi",1),
(24,"User 12","$2b$10$M6DEsz.U5DPhRyt1XbidnO4cKCIbOPczTQuicPRvj.OH48GzpW5/i",1),
(25,"User 13","$2b$10$.Kc1cUSrcefoGYyFlOS2oehoH4QAN/11wXfBOKsvmxIUeX3spzOG2",1);

-- -----------------------------------------------------
-- Table `proposalsdb`.`boat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proposalsdb`.`boat` ;

CREATE TABLE IF NOT EXISTS `proposalsdb`.`boat` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `boat_type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `boat_boat_type_id`
    FOREIGN KEY (`boat_type_id`)
    REFERENCES `proposalsdb`.`boat_type` (`id`),
  CONSTRAINT `boat_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `proposalsdb`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `id_UNIQUE` ON `proposalsdb`.`boat` (`id` ASC) VISIBLE;

CREATE INDEX `boat_boat_type_id_idx` ON `proposalsdb`.`boat` (`boat_type_id` ASC) VISIBLE;

CREATE INDEX `boat_user_id_idx` ON `proposalsdb`.`boat` (`user_id` ASC) VISIBLE;

INSERT INTO `proposalsdb`.`boat`
(`id`, `user_id`, `city`, `boat_type_id`)
VALUES
(1,17,"Copenhagen",1),
(2,17,"Fredriksberg",2),
(3,17,"Valby",3),
(4,18,"Copenhagen",4),
(5,18,"Fredriksberg",5),
(6,18,"Valby",1),
(7,20,"Copenhagen",2),
(8,20,"Fredriksberg",4),
(9,21,"Valby",1),
(10,22,"Copenhagen",3),
(11,22,"Fredriksberg",5),
(12,23,"Copenhagen",1),
(13,24,"Valby",4),
(14,25,"Fredriksberg",3),
(15,25,"Copenhagen",1),
(16,25,"Valby",4);

-- -----------------------------------------------------
-- Table `proposalsdb`.`company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proposalsdb`.`company` ;

CREATE TABLE IF NOT EXISTS `proposalsdb`.`company` (
  `id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `company_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `proposalsdb`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = armscii8;

CREATE INDEX `company_user_id_idx` ON `proposalsdb`.`company` (`user_id` ASC) VISIBLE;

INSERT INTO `proposalsdb`.`company`
(`id`, `name`, `user_id`)
VALUES
(1,"Company 1 ApS",13),
(2,"Company 2 ApS",14),
(3,"Company 3 ApS",15),
(4,"Company 4 ApS",16),
(5,"Company 5 ApS",19);

-- -----------------------------------------------------
-- Table `proposalsdb`.`service`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proposalsdb`.`service` ;

CREATE TABLE IF NOT EXISTS `proposalsdb`.`service` (
  `id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `id_UNIQUE` ON `proposalsdb`.`service` (`id` ASC) VISIBLE;

INSERT INTO `proposalsdb`.`service`
(`id`, `name`)
VALUES
(1,"Engine repair"),
(2,"Sail repair"),
(3,"painting");

-- -----------------------------------------------------
-- Table `proposalsdb`.`job`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proposalsdb`.`job` ;

CREATE TABLE IF NOT EXISTS `proposalsdb`.`job` (
  `id` INT NOT NULL,
  `is_emergency` TINYINT(1) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `user_id` INT NOT NULL,
  `boat_id` INT NOT NULL,
  `is_done` TINYINT(1) NOT NULL,
  `service_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `job_boat_id`
    FOREIGN KEY (`boat_id`)
    REFERENCES `proposalsdb`.`boat` (`id`),
  CONSTRAINT `job_service_id`
    FOREIGN KEY (`service_id`)
    REFERENCES `proposalsdb`.`service` (`id`),
  CONSTRAINT `job_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `proposalsdb`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `id_UNIQUE` ON `proposalsdb`.`job` (`id` ASC) VISIBLE;

CREATE INDEX `job_boat_id_idx` ON `proposalsdb`.`job` (`boat_id` ASC) VISIBLE;

CREATE INDEX `job_service_id_idx` ON `proposalsdb`.`job` (`service_id` ASC) VISIBLE;

CREATE INDEX `job_user_id_idx` ON `proposalsdb`.`job` (`user_id` ASC) VISIBLE;

INSERT INTO `proposalsdb`.`job`
(`id`, `is_emergency`, `title`, `user_id`, `boat_id`, `is_done`, `service_id`)
VALUES
(19,0,"Repair the boat",17,1,0,1),
(20,0,"Repair the boat",17,2,0,2),
(21,1,"Repair the boat",17,3,0,1),
(22,0,"Repair the boat",18,4,1,3),
(23,0,"Repair the boat",18,4,0,1),
(24,0,"Repair the boat",18,5,0,3),
(25,0,"Repair the boat",18,6,0,1),
(26,1,"Repair the boat",20,7,1,2),
(27,0,"Repair the boat",20,8,0,3),
(28,0,"Repair the boat",21,9,0,1),
(29,1,"Repair the boat",22,10,1,1),
(30,0,"Repair the boat",22,10,0,3),
(31,0,"Repair the boat",22,11,0,1),
(32,0,"Repair the boat",23,12,0,1),
(33,1,"Repair the boat",24,13,0,1),
(34,0,"Repair the boat",25,14,0,1),
(35,0,"Repair the boat",25,15,0,3),
(36,1,"Repair the boat",25,16,0,3);


-- -----------------------------------------------------
-- Table `proposalsdb`.`proposal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `proposalsdb`.`proposal` ;

CREATE TABLE IF NOT EXISTS `proposalsdb`.`proposal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` ENUM('pending', 'accepted', 'rejected', 'cancelled') NOT NULL,
  `company_id` INT NOT NULL,
  `job_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `proposal_company_id`
    FOREIGN KEY (`company_id`)
    REFERENCES `proposalsdb`.`company` (`id`),
  CONSTRAINT `proposal_job_id`
    FOREIGN KEY (`job_id`)
    REFERENCES `proposalsdb`.`job` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 65
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `id_UNIQUE` ON `proposalsdb`.`proposal` (`id` ASC) VISIBLE;

CREATE INDEX `proposal_company_id_idx` ON `proposalsdb`.`proposal` (`company_id` ASC) VISIBLE;

CREATE INDEX `proposal_job_id_idx` ON `proposalsdb`.`proposal` (`job_id` ASC) VISIBLE;

INSERT INTO `proposalsdb`.`proposal`
(`id`, `status`, `company_id`, `job_id`)
VALUES
(1,"pending",1,19),
(2,"pending",3,19),
(3,"pending",4,19),
(4,"pending",5,19),
(5,"pending",1,20),
(6,"pending",2,20),
(7,"pending",4,20),
(8,"pending",5,20),
(9,"pending",1,21),
(10,"pending",2,21),
(11,"pending",4,21),
(12,"pending",5,21),
(13,"pending",3,22),
(14,"pending",2,22),
(15,"pending",4,22),
(16,"pending",5,22),
(17,"pending",3,23),
(18,"pending",2,23),
(19,"pending",4,23),
(20,"pending",5,23),
(21,"accepted",3,24),
(22,"rejected",2,24),
(23,"rejected",1,24),
(24,"rejected",5,24),
(25,"accepted",4,25),
(26,"rejected",2,25),
(27,"rejected",1,25),
(28,"rejected",5,25),
(29,"accepted",4,26),
(30,"rejected",2,26),
(31,"cancelled",1,26),
(32,"rejected",5,26),
(33,"pending",4,27),
(34,"pending",2,27),
(35,"pending",1,27),
(36,"pending",5,27),
(37,"pending",4,28),
(38,"pending",2,28),
(39,"pending",1,28),
(40,"pending",3,28),
(41,"pending",4,29),
(42,"pending",2,29),
(43,"pending",1,29),
(44,"pending",3,29),
(45,"cancelled",4,30),
(46,"rejected",2,30),
(47,"accepted",1,30),
(48,"rejected",3,30),
(49,"pending",4,31),
(50,"pending",5,31),
(51,"pending",1,31),
(52,"pending",3,31),
(53,"rejected",4,34),
(54,"rejected",2,34),
(55,"rejected",1,34),
(56,"cancelled",3,34),
(57,"pending",4,35),
(58,"pending",2,35),
(59,"pending",5,35),
(60,"pending",3,35),
(61,"rejected",4,36),
(62,"cancelled",2,36),
(63,"accepted",5,36),
(64,"rejected",3,36);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
