### Schema

CREATE DATABASE unBoxedDB;
USE unBoxedDB;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	userName VARCHAR(30) UNIQUE NOT NULL,
    firstName VARCHAR(50),
	lastName VARCHAR(50),
    email 
    location INT(5),
    -- Zip code for location? We'll need to see what makes it easier to match users
    matchOnline BOOLEAN,
    -- for matching for online gaming (roll20, tabletopSim, etc)
	PRIMARY KEY (id)
);

CREATE TABLE games
(
	id int NOT NULL AUTO_INCREMENT,
	name VARCHAR(80) UNIQUE NOT NULL,
    -- Other info from imported files
	PRIMARY KEY (id)
);
