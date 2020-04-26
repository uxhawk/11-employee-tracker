const inquirer = require("inquirer");
const mysql = require("mysql");
const figlet = require("figlet");
const chalk = require("chalk");
// const {
//     table
// } = require("table");

const table = require("console.table");

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

    console.log(chalk.green(figlet.textSync(`Employee\nManager`)));
    actionPrompt();
});

function actionPrompt() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Employees By Department",
            "Add Employees, Deparments, and Roles",
            "Update Employee Role",
            "BONUS -- Update Employee Manager",
            "BONUS -- View All Employees By Manager",
            "BONUS -- Remove Employee/roles/department",
            "Exit"
        ]
    }).then(answer => {
        switch (answer.action) {
            case "View All Employees":
                viewEmployees();
                break;

            case "View All Employees By Department":
                viewEmployeesByDept();
                break;

            case "View All Departments":
                viewDepartments();
                break;

            case "Add Employees, Deparments, and Roles":
                addPrompt();
                break;

            case "Update Employee Role":
                updatePrompt();
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



function viewEmployees() {
    let employeesArr = [];

    const query = `
    SELECT employee.last_name, employee.first_name, role.title, role.salary, department.dept_name
        FROM employee
            LEFT JOIN role ON role.id = employee.role_id
                LEFT JOIN department ON role.department_id = department.id
                    ORDER BY Last_name ASC;`;
    connection.query(query, (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        data.forEach(row => {
            let details = [];

            details.push(row.last_name);
            details.push(row.first_name);
            details.push(row.title);
            details.push(`$${row.salary}`);
            details.push(row.dept_name);
            employeesArr.push(details);
        });

        console.log(chalk.cyan(figlet.textSync(`\nAll Employees`, {
            font: "mini"
        })));
        console.table([chalk.magenta("Last Name"), chalk.magenta("First Name"), chalk.magenta("Title"), chalk.magenta("Salary"), chalk.magenta("Department")], employeesArr);

        actionPrompt();
    });
}

function viewDepartments() {
    let departmentData = [
        ["Department Name"]
    ];

    const query = "SELECT * FROM department";
    connection.query(query, (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        data.forEach(row => {
            let details = [];
            details.push(row.dept_name);
            departmentData.push(details);
        });

        console.log(chalk.cyan(figlet.textSync(`\nAll Departments`, {
            font: "mini"
        })));

        printTable(departmentData);
        actionPrompt();
    });
}

// function printTable(tableContent) {
//     let output;
//     output = table(tableContent);
//     console.log(output);
// }


function viewEmployeesByDept() {

}

function updatePrompt() {
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

function adios() {
    console.log(chalk.red(figlet.textSync('Adios!')));
}