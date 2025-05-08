CREATE DATABASE MaritimeDb
USE MaritimeDb

-- -----------------------------------------------------
-- Table Ships
-- -----------------------------------------------------

CREATE TABLE dbo.Ships(
Id INT IDENTITY(1,1),
ShipName VARCHAR(45) NOT NULL,
MaxSpeed FLOAT NOT NULL
)

-- -----------------------------------------------------
-- Table Countries
-- -----------------------------------------------------
CREATE TABLE dbo.Countries(
Id INT IDENTITY(1,1),
CountriesName VARCHAR(45) NOT NULL,
CountryCode INT NOT NULL
)

-- -----------------------------------------------------
-- Table Ports
-- -----------------------------------------------------
CREATE TABLE dbo.Ports(
Id INT IDENTITY(1,1),
PortName VARCHAR(45) NOT NULL,
Id_Country INT NOT NULL,
)

-- -----------------------------------------------------
-- Table Voyages
-- -----------------------------------------------------
CREATE TABLE dbo.Voyages(
Id INT IDENTITY(1,1),
VoyageDate DATETIME NOT NULL,
StartTime DATETIME NULL,
EndTime DATETIME NULL,
Id_DeparturePort INT NOT NULL,
Id_ArrivalPort INT NOT NULL,
Id_Ship INT NOT NULL
)

select * from dbo.Voyages