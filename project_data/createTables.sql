-- CREATE DATABASE IF NOT EXISTS anywherefitness;  
-- USE anywherefitness;

-- CREATE TABLE Users (
--     user_id 	int  	NOT NULL AUTO_INCREMENT,
--     name    	varchar(50),
-- 	password	varchar(100),
--     level   	int DEFAULT 0,
--     age     	int,
--     PRIMARY KEY(user_id)
-- );

-- CREATE TABLE Sensors(
-- sensor_id	int	NOT NULL AUTO_INCREMENT,
-- sensor_type	varchar(50),
-- PRIMARY KEY(sensor_id)
-- );

-- CREATE TABLE sensor_data(
-- sensor_data_id int NOT NULL auto_increment,
-- sensor_id int,
-- user_id int,
-- instant timestamp(2),
-- x_axis double,
-- y_axis double,
-- z_axis double,
-- PRIMARY KEY(sensor_data_id),
-- FOREIGN KEY(sensor_id) REFERENCES Sensors(sensor_id),
-- FOREIGN KEY(user_id) REFERENCES Users(user_id)	ON DELETE CASCADE
-- );



SET FOREIGN_KEY_CHECKS = 0;
drop table IF EXISTS Sensors;
drop table IF EXISTS Users;
drop table IF EXISTS Sensor_data;
drop table IF EXISTS sensortodata;
SET FOREIGN_KEY_CHECKS = 1;


show tables; 





