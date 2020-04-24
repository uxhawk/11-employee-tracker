const inquirer = require("inquirer");
const mysql = require("mysql");
const figlet = require("figlet");
const chalk = require("chalk");

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

    console.log(chalk.green(figlet.textSync('Connected to DB!')));
    actionPrompt();
});


function adios() {
    console.log(chalk.red(figlet.textSync('Adios!')));
}

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
                adios();
                connection.end();
                break;
        }
    });
}

function addPrompt() {
    inquirer.prompt({
        name: "add",
        type: "list",
        message: "What would you like to add?",
        choices: [
            "Department",
            "Role",
            "Employee",
            "Cancel"
        ]
    }).then(answer => {
        switch (answer.add) {
            case "Department":
                addDepartment();
                break;

            case "Role":
                addRole();
                break;

            case "Employee":
                addEmployee();
                break;

            case "Cancel":
            default:
                actionPrompt();
                break;
        }
    });
}

function viewPrompt() {
    inquirer.prompt({
        name: "view",
        type: "list",
        message: "What would you like to view?",
        choices: [
            "Department",
            "Role",
            "Employee",
            "Cancel"
        ]
    }).then(answer => {
        switch (answer.view) {
            case "Department":
                viewDepartment();
                break;

            case "Role":
                viewRole();
                break;

            case "Employee":
                viewEmployee();
                break;

            case "Cancel":
            default:
                actionPrompt();
                break;
        }
    });
}

function editPrompt() {
    inquirer.prompt({
        name: "update",
        type: "list",
        message: "What would you like to update?",
        choices: [
            "Department",
            "Role",
            "Employee",
            "Cancel"
        ]
    }).then(answer => {
        switch (answer.update) {
            case "Department":
                updateDepartment();
                break;

            case "Role":
                updateRole();
                break;

            case "Employee":
                updateEmployee();
                break;

            case "Cancel":
            default:
                actionPrompt();
                break;
        }
    });
}