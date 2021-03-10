
CREATE DATABASE streamsearch_db;

USE  streamsearch_db;

CREATE TABLE service(
    id INTEGER AUTO_INCREMENT NOT NULL,
    netflix BOOLEAN,
    prime BOOLEAN,
    disney BOOLEAN,
    hbo BOOLEAN,
    hulu BOOLEAN,
    peacock BOOLEAN,
    PRIMARY KEY(id)
);

CREATE TABLE users(
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE medias(
    id INTEGER AUTO_INCREMENT NOT NULL,
    service VARCHAR(25),
    country VARCHAR(25),
    age INTEGER,
    cast VARCHAR(255),
    genres VARCHAR(50),
    rating INTEGER,
    title VARCHAR(255),
    overview VARCHAR(500),
    poster VARCHAR(500),
    PRIMARY KEY(id)
);