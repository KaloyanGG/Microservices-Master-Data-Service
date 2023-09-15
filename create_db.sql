CREATE DATABASE IF NOT EXISTS `microservices_invoices_app_db`;
USE `microservices_invoices_app_db`;


CREATE TABLE IF NOT EXISTS `organization` (
  `registration_id` INT AUTO_INCREMENT,
  `name` varchar(255) NOT NULL UNIQUE,
  `date_of_registration` date NOT NULL DEFAULT (curdate()),
  `contact_number` varchar(20) NOT NULL,
  `email` varchar(55) NOT NULL,
  PRIMARY KEY (`registration_id`)
);


CREATE TABLE IF NOT EXISTS `invoice_header` (
  `id` INT PRIMARY KEY AUTO_INCREMENT, 
  `invoice_number` varchar(16) NOT NULL UNIQUE DEFAULT (concat('INV-',
  		substr(md5(rand()),1,3),'-',
  		substr(md5(rand()),4,3),'-',
  		substr(md5(rand()),7,3))),
  `invoice_date` DATE NOT NULL DEFAULT (curdate()),
  `item_amount` float(10,2) NOT NULL DEFAULT 0,
  `invoice_amount` float(10,2) NOT NULL DEFAULT 0,
  `buyer_name` VARCHAR(255),
  FOREIGN KEY (`buyer_name`) REFERENCES `organization` (name)
);

CREATE TABLE IF NOT EXISTS `item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` float(10,2) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `invoice_line_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(16) DEFAULT NULL,
  `item_id` int NOT NULL,
  `quantity` int NOT NULL,
  `item_amount` float(10,2),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`invoice_number`) REFERENCES `invoice_header` (`invoice_number`),
  FOREIGN KEY (`item_id`) REFERENCES `item` (`id`)
);

CREATE TABLE IF NOT EXISTS `account` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`organization_id` INT NOT NULL UNIQUE,
	`balance` float(10,2),
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

INSERT INTO item (name, price)
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
    ('Water Pump', 55.00),
	 ('Test_item_1', 10),
	 ('Test_item_2', 20);
    
    

INSERT INTO organization (name, contact_number, email)
VALUES
    ('ABC Corp', '+359 883761', 'abc.corp@abccorp.com'),
    ('Tech Solutions', '123-456-7890', 'info@techsolutions.com'),
    ('Auto Parts Ltd.', '987-654-3210', 'kaloyan.georgiev01@sap.com'),
    ('Green Energy Co.', '555-123-4567', 'kaloyan.georgiev01@sap.com'),
    ('HealthCare Services', '888-555-1234', 'koko.gg@abv.bg'),
    ('Fashion Trends', '777-888-9999', 'kokicha.gg@gmail.com');

INSERT INTO invoice_header (buyer_name,invoice_number)
VALUES
	('HealthCare Services', 'INV-5ec-19e-bb7'), ('Fashion Trends', 'INV-c9b-de1-f63'), ('Tech Solutions','INV-c3f-r3f-2re');

INSERT INTO invoice_line_item (invoice_number, item_id, quantity)
VALUES
	('INV-5ec-19e-bb7', 10, 20), ('INV-5ec-19e-bb7', 8, 15), ('INV-c9b-de1-f63', 4, 30), ('INV-5ec-19e-bb7', 10, 1000);

UPDATE `account` a
SET a.balance = 5000
where a.organization_id = 2;

UPDATE `account` a
SET a.balance = 55000
where a.organization_id = 3;

UPDATE `account` a
SET a.balance = 4000
where a.organization_id = 4;
	
UPDATE `account` a
SET a.balance = 100000
WHERE a.organization_id IN (SELECT o.registration_id FROM `organization` o WHERE o.`name`= 'ABC Corp');