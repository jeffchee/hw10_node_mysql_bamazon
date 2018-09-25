var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("connected");

    start();
});






function start() {
    inquirer
        .prompt({
            name: "StartScreen",
            type: "list",
            message: "Welcome to Bamazon! What would you like to purchase? Please choose from the following options! ",
            choices: ["Food", "School_Supplies", "Electronic"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions

            switch (answer.StartScreen) {
                case "Food":
                    postFood();
                    break;
                case "School_Supplies":
                    postSchool_Supplies();
                    break;
                case "Electronic":
                    postElectronic();
                    break;
                default:
                    console.log("Incorrect input.");
                    break;
            }
        })

}

function postFood(input) {

    inquirer
        .prompt({
            name: "Selection",
            type: "list",
            message: "What Food would you like to buy?",
            choices: ["Cereal", "Chips", "Steak", "Pasta", "Ice Cream"]

        })
        .then(function (input) {
            // console.log("hello" + JSON.stringify(input.Selection));
            var userChoice = input.Selection;
            console.log(userChoice)
            // var query = "SELECT * FROM `products` WHERE `department_name` = “Food”"
            var query = "SELECT * FROM products";
            // var query = "SELECT * FROM products WHERE department_name=" + userChoice;
            // console.log(query);
            connection.query(query, function (err, res, fields) {
                var ProductSelected = {

                    userItem: null,
                    userPrice: null,
                    userQuantity: null
                }
                if (err) {
                    console.log(err);
                }

                for (i = 0; i < res.length; i++) {

                    if (userChoice === res[i].product_name) {
                        ProductSelected.userItem = res[i].product_name;
                        ProductSelected.userPrice = res[i].price;
                        ProductSelected.userQuantity = res[i].stock_quantity;
                        console.log(ProductSelected);

                        if (ProductSelected.userQuantity <= 0) {
                            console.log("Sorry for the Inconvenience, buy " + userChoice + " is out of stock. Please Choose another product, Thank You!");
                            start();

                        } else {

                            userDecisionF(ProductSelected, userChoice);

                        }
                    }
                }

            })

        })
}

function postSchool_Supplies(input) {

    inquirer
        .prompt({
            name: "Selection",
            type: "list",
            message: "What Food would you like to buy?",
            choices: ["Pen", "Book", "NotePad", "BackPack", "Binder"]

        })
        .then(function (input) {
            // console.log("hello" + JSON.stringify(input.Selection));
            var userChoice = input.Selection;
            console.log(userChoice)
            // var query = "SELECT * FROM `products` WHERE `department_name` = “Food”"
            var query = "SELECT * FROM products";
            // var query = "SELECT * FROM products WHERE department_name=" + userChoice;
            // console.log(query);
            connection.query(query, function (err, res, fields) {
                var ProductSelected = {

                    userItem: null,
                    userPrice: null,
                    userQuantity: null
                }
                if (err) {
                    console.log(err);
                }

                for (i = 0; i < res.length; i++) {

                    if (userChoice === res[i].product_name) {
                        ProductSelected.userItem = res[i].product_name;
                        ProductSelected.userPrice = res[i].price;
                        ProductSelected.userQuantity = res[i].stock_quantity;
                        console.log(ProductSelected);

                        if (ProductSelected.userQuantity <= 0) {
                            console.log("Sorry for the Inconvenience, buy " + userChoice + " is out of stock. Please Choose another product, Thank You!");
                            start();

                        } else {

                            userDecisionF(ProductSelected, userChoice);

                        }
                    }
                }

            })

        })
}

function postElectronic(input) {

    inquirer
        .prompt({
            name: "Selection",
            type: "list",
            message: "What Food would you like to buy?",
            choices: ["TV", "Laptop", "Monitor", "Radio", "Cellphones"]

        })
        .then(function (input) {
            // console.log("hello" + JSON.stringify(input.Selection));
            var userChoice = input.Selection;
            console.log(userChoice)
            // var query = "SELECT * FROM `products` WHERE `department_name` = “Food”"
            var query = "SELECT * FROM products";
            // var query = "SELECT * FROM products WHERE department_name=" + userChoice;
            // console.log(query);
            connection.query(query, function (err, res, fields) {
                var ProductSelected = {

                    userItem: null,
                    userPrice: null,
                    userQuantity: null
                }
                if (err) {
                    console.log(err);
                }

                for (i = 0; i < res.length; i++) {

                    if (userChoice === res[i].product_name) {
                        ProductSelected.userItem = res[i].product_name;
                        ProductSelected.userPrice = res[i].price;
                        ProductSelected.userQuantity = res[i].stock_quantity;
                        console.log(ProductSelected);

                        if (ProductSelected.userQuantity <= 0) {
                            console.log("Sorry for the Inconvenience, buy " + userChoice + " is out of stock. Please Choose another product, Thank You!");
                            start();

                        } else {

                            userDecisionF(ProductSelected, userChoice);

                        }
                    }
                }

            })

        })
}

function userDecisionF(data, userChoice) {
    console.log(data)

    inquirer
        .prompt({
            name: "Cost",
            type: "list",
            message: "One " + userChoice + " would cost $" + data.userPrice + ". We have " + data.userQuantity + " in stock. How many would you like to purchase? ",
            choices: ["1", "2", "3", "4", "5", "10"]
        })
        .then(function (input1) {
            // console.log("hello" + JSON.stringify(input.Selection));
            var originalFQ = data.userQuantity;
            console.log(typeof (originalFQ), originalFQ);
            console.log("/n originalFQ");

            var userQuantity = parseInt(input1.Cost);
            console.log(typeof (userQuantity), userQuantity);
            console.log("/n userQuantity");



            var finalFC = originalFQ - userQuantity;

            console.log(typeof (data.userPrice));

            var userTotalF = userQuantity * data.userPrice;
            console.log(userTotalF);


            console.log(typeof (finalFC), finalFC);
            userConfirmation(userTotalF, userChoice, finalFC)
        })

    function userConfirmation(userTotalF, userChoice, finalFC) {
        var finishFood = userTotalF.toFixed(2);
        inquirer
            .prompt({
                name: "Confirmation",
                type: "list",
                message: "Your total purchase of " + userChoice + " is $" + finishFood + ". If this is correct, select true, otherwise select false to be redirected to the start menu.",
                // needs to have the setup regarding prices/quantity
                choices: ["true", "false"]
            })
            .then(function (uConfirming) {

                switch (uConfirming.Confirmation) {
                    case "true":
                        console.log("you got it")
                        runUpdateF(userChoice, finalFC);
                        break;

                    case "false":
                        console.log("Sorry we got your order wrong, lets start again!")
                        start();
                        break;
                }
            })
    }
    function runUpdateF(userChoice, finalFC) {
        console.log("running update");
        var query = connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: finalFC
                },
                {
                    product_name: userChoice
                }
            ],
            function (err, res) {
                console.log(res + " products updated!\n");
            })
        console.log(query.sql);
        buyMore();
    }
    function buyMore() {
        inquirer
            .prompt({
                name: "Again",
                type: "list",
                message: "Would you like to buy more? If you would like to buy more, choose yes, otherwise press no, thank you for shopping at bamazon!",
                // needs to have the setup regarding prices/quantity
                choices: ["yes", "no"]
            }).then(function (repeat) {

                switch (repeat.Again) {
                    case "yes":
                        console.log("you got it, bruh!")
                        start();
                        break;

                    case "no":
                        console.log("bye!")
                        connection.end();
                        break;
                }
            })
    }
};



