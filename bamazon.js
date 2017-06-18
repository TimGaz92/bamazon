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
connection.connect(function(err){
	if (err)  throw err;
//log everything availible for sale 
console.log("welcome to Bamazon, please see our products below");
console.log("Product ID-----NAME-----DEPARTMENT-----PRICE-----STOCK");
console.log("-------------------------------------------------");

	connection.query("select * from productTable", function(err, result){
		if (err) throw err;
			for (var i = 0; i < result.length; i++) {
				console.log(result[i].id + "---------" + result[i].name + "---------" + result[i].department
				 + "---------" + result[i].price + "---------" + result[i].stock_quant);
			}
	makePurchase(result);		
	})

})//end of connection function	
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
	]).then(function(answer, result){	
//check if the store has enough inventory
		if (answer.confirm === true) {
			// connection.query("UPDATE productTable SET ? WHERE ?", {
			// stock_quant: result[answer.selection].stock_quant -= answer.selectionQuant,
			// id:[answer.selection]
			//},function(error, result){console.log(result)});
//6-18 916AM GETTTING AN ERRROR ON STOCK_QUANT VARIABLE 
//6-18 now it's telling me that result is undefined at this point
			if (answer.selectionQuant >= result[answer.selection].stock_quant) {
				connection.query("UPDATE productTable SET ? WHERE ?", {
				stock_quant: result[answer.selection].stock_quant -= answer.selectionQuant,
				id:[answer.selection]
				},function(error, result){console.log(result)});
			}
		}

	});//end of the

}//end of inquire function