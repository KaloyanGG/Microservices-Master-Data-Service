CREATE DATABASE IF NOT EXISTS `microservices_invoices_app_db`;
USE `microservices_invoices_app_db`;


CREATE TABLE IF NOT EXISTS `organization` (
  `registration_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_of_registration` date NOT NULL DEFAULT (curdate()),
  `contact_number` varchar(20) NOT NULL,
  `email` varchar(55) NOT NULL,
  PRIMARY KEY (`registration_id`)
);


CREATE TABLE IF NOT EXISTS `invoice_header` (
  `invoice_number` varchar(16) NOT NULL DEFAULT (concat('INV-',
  		substr(md5(rand()),1,3),'-',
  		substr(md5(rand()),4,3),'-',
  		substr(md5(rand()),7,3))),
  `invoice_date` DATE NOT NULL DEFAULT (curdate()),
  `item_amount` decimal(10,2) NOT NULL,
  `invoice_amount` decimal(10,2) NOT NULL,
  `issued` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`invoice_number`)
);

CREATE TABLE IF NOT EXISTS `item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `invoice_line_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(16) DEFAULT NULL,
  `item_id` int NOT NULL,
  `quantity` int NOT NULL,
  `item_amount` decimal(10,2),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`invoice_number`) REFERENCES `invoice_header` (`invoice_number`),
  FOREIGN KEY (`item_id`) REFERENCES `item` (`id`)
);

CREATE TABLE IF NOT EXISTS `account` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`organization_id` INT NOT NULL UNIQUE,
	`balance` DECIMAL(10,2),
	FOREIGN KEY (`organization_id`) REFERENCES `organization` (`registration_id`)
);

DELIMITER $$
CREATE TRIGGER set_item_amount_default
BEFORE INSERT ON invoice_line_item
FOR EACH ROW
BEGIN
	SET NEW.item_amount = (SELECT price FROM item WHERE id = NEW.item_id) * NEW.quantity;
END$$

CREATE TRIGGER create_account
AFTER INSERT ON organization
FOR EACH ROW
BEGIN
    INSERT INTO account (organization_id, balance) VALUES (NEW.registration_id, 0);
END$$
DELIMITER ;

INSERT INTO item (item_name, price)
VALUES
    ('Spark Plugs', 15.99),
    ('Oil Filter', 8.49),
    ('Air Filter', 12.99),
    ('Brake Pads', 35.75),
    ('Tire Set', 250.00),
    ('Shock Absorbers', 50.50),
    ('Battery', 70.00),
    ('Alternator', 120.00),
    ('Radiator', 85.00),
    ('Water Pump', 55.00);
    
    

INSERT INTO organization (name, contact_number, email)
VALUES
    ('Tech Solutions', '123-456-7890', 'info@techsolutions.com'),
    ('Auto Parts Ltd.', '987-654-3210', 'sales@autoparts.com'),
    ('Green Energy Co.', '555-123-4567', 'contact@greenenergyco.com'),
    ('HealthCare Services', '888-555-1234', 'info@healthcare.org'),
    ('Fashion Trends', '777-888-9999', 'info@fashiontrends.net');

INSERT INTO invoice_header (invoice_number, item_amount, invoice_amount, issued)
VALUES
	('INV-5ec-19e-bb7', 100, 80, 1), ('INV-c9b-de1-f63',18000, 10000, 1), ('INV-c3f-r3f-2re',5500, 1000, 0);

INSERT INTO invoice_line_item (invoice_number, item_id, quantity)
VALUES
	('INV-5ec-19e-bb7', 10, 20), ('INV-5ec-19e-bb7', 8, 15), ('INV-c9b-de1-f63', 4, 30), ('INV-5ec-19e-bb7', 10, 1000);
	
	