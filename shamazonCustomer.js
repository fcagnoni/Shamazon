var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 8080,
  user: "root",
  password: "omologator",
  database: "shamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  shamazon();
});

function shamazon() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    var table = new Table({
      head: ['ID', 'Product Name', 'Department Name', 'Price']
    });
    for (var i = 0; i < result.length; i++) {
      table.push([result[i].item_id, result[i].product_name, result[i].department_name, result[i].price])
    }
  

  });

  buyItem();
}

function buyItem() {
  //connect to products
  connection.query("SELECT * FROM products", function(err, results) {
    //take user input to make selection
    inquirer.prompt([{
      name: 'id',
      type: 'input',
      message: 'Input the ID of the item you wish to buy',
      //validates that user input is a number and requires it
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }, {
      name: 'quantity',
      type: 'input',
      message: 'How many do you want to buy?',
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
      //do this when user input is entered
      
    }]).then(function(order) {
      //takes in user input

      var productID = order.id;
      var quantity = order.quantity;

      //user input to get item id

      connection.query('SELECT * FROM products WHERE item_id=' + productID, function(err, res) {
        if (err) throw err;
        if (res[0].stock_quantity - quantity >= 0) {
          connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [res[0].stock_quantity - quantity, productID],
            function(err, shamazon) {
              if (err) throw err;
            
              //shamazon();
            });


        } else if (res[0].stock_quantity - quantity <= res[0].stock_quantity && res[0].stock_quantity !== 0) {
          console.log("Sorry, we do not have enough items in stock to fulfill your order");
          shamazon();
        }
      });

    });
  });
}