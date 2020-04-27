//node packages
const figlet = require("figlet");
const chalk = require("chalk");

//mysql
const connection = require("./lib/Connection");

//inquirer queries
const queries = require("./lib/Queries");

connection.connect(err => {
    if (err) {
        console.log(err);
        throw err;
    }

    console.log(chalk.green(figlet.textSync(`Employee\nManager`)));
    queries.actionPrompt()
});