CREATE DATABASE shoppinglistdb;
USE shoppinglistdb;
CREATE TABLE recipes(
	id int NOT NULL AUTO_INCREMENT,
	recipe_name varchar(255) NOT NULL,
	recipe_id INTEGER(11) NOT NULL,
    contributor VARCHAR(255) NOT NULL,
    servings INTEGER(11) NOT NULL,
    source_url VARCHAR(255) NOT NULL,
    ingredients VARCHAR(5000) NOT NULL,
    instructions VARCHAR(10000) NOT NULL,    
    createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);