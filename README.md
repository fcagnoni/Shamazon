# Shamazon

This MySQL app works like a simplified online store, using mysql to create, read, and update a product table, and inquirer to handle prompts.

When the user starts the app, they will see a list of 10 items to buy along with their IDs, price, department and quantity left in stock. Then inquirer prompts the user to enter in the ID number of the item they wish to buy, and then the quantity they wish to buy. If the item is out of stock, it will return a message letting user know that the order can't be completed. If the item is in stock, the quantity in the SQL database will update accordingly. (This part is roken right now)
