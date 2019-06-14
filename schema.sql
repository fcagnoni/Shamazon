DROP DATABASE IF EXISTS shamazon_db;
CREATE DATABASE shamazon_db;

USE shamazon_db;

CREATE TABLE products(
  id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(40) NOT NULL,
  department_name VARCHAR(40) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(99) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE products MODIFY `id` INT;
ALTER TABLE products DROP PRIMARY KEY;
ALTER TABLE products ADD COLUMN item_id INT NOT NULL FIRST;
ALTER TABLE products ADD CONSTRAINT id PRIMARY KEY (item_id);
ALTER TABLE products DROP COLUMN id;
ALTER TABLE products MODIFY item_id INT NOT NULL  AUTO_INCREMENT;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Super NES", "Electronics", 80, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bass Amp", "Electronics", 200, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("OLED TV", "Electronics", 2000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Food", "Pet supplies", 10, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Litter", "Pet supplies", 12, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Brush", "Pet supplies", 5, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Litter Box", "Pet Supplies", 8, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kindle E-reader", "Electronics", 90, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bear mace", "Outdoors", 20, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Actual mace", "Medieval Weaponry", 800, 1);