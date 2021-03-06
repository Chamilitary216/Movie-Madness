
CREATE DATABASE tickets_db;

USE DATA streamsafe_db;

CREATE TABLE tickets(
    id INTEGTER AUTO_INCREMENT NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE user(
    id INTEGTER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    
    PRIMARY KEY(id)
);

CREATE TABLE preferences(
    id INTEGTER AUTO_INCREMENT NOT NULL,
    
    PRIMARY KEY(id)
);

