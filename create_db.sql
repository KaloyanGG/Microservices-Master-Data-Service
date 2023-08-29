-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS test;

-- Use the test_db
USE test;

-- Create a table
CREATE TABLE IF NOT EXISTS people(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

-- Insert values into the table
INSERT INTO people (name) VALUES ('John');
INSERT INTO people (name) VALUES ('Koko');
