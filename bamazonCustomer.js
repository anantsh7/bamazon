var inquirer = require("inquirer");
var connection = require("./config/connection")

var displayitems = function () {
	console.log("Display all items avilable:");
	connection.query('SELECT * FROM products', function (error, res) {
		if (error) {
			console.log(error)
		}
		else {
			console.log(res)
		}
		selectitem();
	});
};

displayitems();

var selectitem = function () {
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: function (input) {
				if (input === '') {
					console.log('Please enter valid Id');
					return false;
				} else {
					return true;
				}
			},
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: function (input) {
				if (input === '') {
					console.log('Please enter a quantity:');
					return false;
				} else {
					return true;
				}
			},
		}
	]).then(function (input) {
		var item = input.item_id;
		var quantity = input.quantity;
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, { item_id: item }, function (err, res) {
			if (res.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				displayitem();

			} else {
				var product = res[0];
				// If the quantity requested by the user is in stock
				if (quantity <= product.stock_quantity) {
					console.log('Processing Order');
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (product.stock_quantity - quantity) + ' WHERE item_id = ' + item;
					var totalcost = product.price * quantity;

					connection.query(updateQueryStr, function (err, res) {
						if (err) throw err;
						console.log('Thank you for shopping with us!');
						connection.end();
					})
				} else {
					console.log('It seems that you have exceeded the quantity. Please review your order')

					displayitems();
				}
			}
		})
	})
}