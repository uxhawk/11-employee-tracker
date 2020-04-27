const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const connection = require("./Connection");

//classes to organize queries
const Employee = require("./Employee");
const Manager = require("./Manager");
const Department = require("./Department");
const Role = require("./Role");

//instances of classes 
const employee = new Employee();
const manager = new Manager();
const department = new Department();
const role = new Role();

const actionPrompt = function() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "View All Employees By Department",
            "Add Employees, Deparments, and Roles",
            "Update Employee Role",
            "BONUS -- Update Employee Manager",
            "BONUS -- View All Employees By Manager",
            "BONUS -- Remove Employee/roles/department",
            "Exit"
        ]
    }).then(async answer => {
        switch (answer.action) {
            case "View All Employees":
                employee.viewEmployees();
                break;

            case "View All Employees By Department":
                employee.viewEmployeesByDept();
                break;

            case "View All Departments":
                department.viewDepartments();
                break;

            case "Add Employees, Deparments, and Roles":
                addPrompt();
                break;

            case "View All Roles":
                role.viewRoles();
                break;

            case "Update Employee Role":
                employee.updatePrompt();
                break;

            case "Exit":
            default:
                adios();
                connection.end();
                break;
        }
    });
}

const addPrompt = function() {
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
                department.addDepartment();
                break;

            case "Role":
                role.addRole();
                break;

            case "Employee":
                employee.addEmployee();
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


exports.actionPrompt = actionPrompt;
exports.addPrompt = addPrompt;