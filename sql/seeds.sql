USE bamazon_db;

INSERT INTO products 
  (item_id, product_name, department_name, price, stock_quantity)
  VALUES
  ( 1 , "Sponges", "Home Appliances", 10, 3000), 
  ( 2 , "Power Ranger", "Toys" , 30, 12000), 
  ( 3 , "Oil", "Auto", 40, 2000); 

SELECT * FROM bamazon_db.products;

