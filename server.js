const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db"
});

connection.connect(err => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("Successfully connected");
    actionPrompt();
});

function actionPrompt() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add content",
            "View content",
            "Edit content",
            "Exit"
        ]
    }).then(answer => {
        switch (answer.action) {
            case "Add content":
                addPrompt();
                break;

            case "View content":
                viewPrompt();
                break;

            case "Edit content":
                editPrompt();
                break;

            case "Exit":
            default:
                connection.end();
                break;
        }
    });
}