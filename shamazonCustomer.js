var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
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
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.table([{ "ID": res[i].item_id, "Product name": res[i].product_name, "Department": res[i].department_name, "Price": res[i].price, "Stock": res[i].stock_quantity }])
    }
  })
  buyPrompt();
};


function buyPrompt() {
  //connect to products table
  connection.query("SELECT * FROM products", function(err, res) {
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
              shamazon();
            });


          } else if (res[0].stock_quantity - quantity <= res[0].stock_quantity && res[0].stock_quantity !== 0) {
            console.log("We're sorry, we were unable to complete your order because we only have " + res[0].stock_quantity + ' in stock, please update your desired amount.');
            shamazon();
          } else {
            console.log("We're sorry, we were unable to complete your order, the item is no longer in stock. Please check back with us soon!");
            shamazon();
        }
      });

    });
  });
}