-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Ships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Ships` (
  `Id` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `MaxSpeed` FLOAT NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Countries` (
  `Id` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `CountryCode` INT NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Ports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Ports` (
  `Id` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Id_Country` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `Id_Country_idx` (`Id_Country` ASC) VISIBLE,
  CONSTRAINT `Id_Country`
    FOREIGN KEY (`Id_Country`)
    REFERENCES `mydb`.`Countries` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Voyages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Voyages` (
  `Id` INT NOT NULL,
  `VoyageDate` DATETIME NOT NULL,
  `StartTime` DATETIME NULL,
  `EndTime` DATETIME NULL,
  `Id_DeparturePort` INT NOT NULL,
  `Id_ArrivalPort` INT NOT NULL,
  `Id_Ship` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `Id_DeparturePort_idx` (`Id_DeparturePort` ASC) VISIBLE,
  INDEX `Id_ArrivalPort_idx` (`Id_ArrivalPort` ASC) VISIBLE,
  INDEX `Id_Ship_idx` (`Id_Ship` ASC) VISIBLE,
  CONSTRAINT `Id_DeparturePort`
    FOREIGN KEY (`Id_DeparturePort`)
    REFERENCES `mydb`.`Ports` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Id_ArrivalPort`
    FOREIGN KEY (`Id_ArrivalPort`)
    REFERENCES `mydb`.`Ports` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Id_Ship`
    FOREIGN KEY (`Id_Ship`)
    REFERENCES `mydb`.`Ships` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
