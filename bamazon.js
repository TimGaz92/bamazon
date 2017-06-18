//adding mysql package 
var mysql = require('mysql');
//save the first 3 proceesses that run on node for UI 
// var searchTermA = process.argv[2];
// var searchTermB = process.argv[3];
// var searchTermC = process.argv[4];
var inquirer = require('inquirer');


//db connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	//your username
	user: "root",
	//your password
	password:"",
	database: "Bamazon_db"

});
connection.connect(function start(err){
	if (err)  throw err;
//log everything availible for sale 
console.log("welcome to Bamazon, please see our products below");
console.log("Product ID-----NAME-----DEPARTMENT-----PRICE-----STOCK");
console.log("-------------------------------------------------");

var inventory = connection.query("select * from productTable", function(err, result){
		if (err) throw err;
			for (var i = 0; i < result.length; i++) {
				console.log(result[i].id + "---------" + result[i].name + "---------" + result[i].department
				 + "---------" + result[i].price + "---------" + result[i].stock_quant);
			}
		
	// function updateStock(){
	// 	connection.query("UPDATE productTable SET ? WHERE ?", {
	// 		id:[answer.selection],
	// 		stock_quant: stock_quant - answer.selectionQuant,
	// 			},function(error, result){console.log(result)});
	// 	}
			makePurchase(result);
	})
function makePurchase(result){
	//prompt the user for an action, purchase by product key
inquirer.prompt([
{	type: "input",
	message: "What would you like to buy?",
	name: "selection",
},
{	type: "input",
	message: "How many would you like?",
	name: "selectionQuant",
},
{	type: "confirm", 
	message: "are you sure?",
	name: "confirm", 
	default: true,
}
	]).then(function(answer){	
		if (answer.confirm === true && answer.selectionQuant > 0) {
		  //if (answer.selectionQuant > inventory.stock_quant) {	
			connection.query("UPDATE productTable SET ? WHERE ?", [ //this isn't working
			{stock_quant: 10},
			{id:[answer.selection]}
				],function(err, result){console.log(result)});
			start();
		 //}
		}
		else{
			console.log("sorry not enough in stock");
			start();
		}

	});//end of the then function

}//end of inquire function

})//end of connection function	

