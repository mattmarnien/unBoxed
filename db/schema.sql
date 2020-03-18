### Schema

CREATE DATABASE unBoxedDB;
USE unBoxedDB;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	userName VARCHAR(30) UNIQUE NOT NULL,
    firstName VARCHAR(50),
	lastName VARCHAR(50),
    email VARCHAR(100),
    location INT(5),
    -- Zip code for location? We'll need to see what makes it easier to match users
    matchOnline BOOLEAN,
    -- for matching for online gaming (roll20, tabletopSim, etc)
	PRIMARY KEY (id)
);

CREATE TABLE games
(
    ranks INT NOT NULL,
    bgg_url VARCHAR(255),
    game_id INT NOT NULL,
    names VARCHAR(100) NOT NULL,
    min_players INT NOT NULL,
    max_players INT NOT NULL,
    avg_time INT NOT NULL,
    min_time INT NULL,
    max_time INT NULL,
    year INT NOT NULL,
    avg_rating INT,
    geek_rating INT,
    num_votes INT NOT NULL,
    image_url VARCHAR(255),
    age INT NOT NULL,
    mechanic VARCHAR(350),
    owned INT,
    category VARCHAR(255),
    designer VARCHAR(255),
    weight INT,
    -- Other info from imported files
	PRIMARY KEY (ranks)
);
