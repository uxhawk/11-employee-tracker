const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const connection = require("./Connection");
const table = require("console.table");
const queries = require("./Queries");

class Employee {

    viewEmployees() {
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

            queries.actionPrompt();
        });
    }

    viewEmployeesByDept() {
        let departmentArr = [];

        const query = `
        SELECT department.dept_name
            FROM department
                LEFT JOIN role on role.id = department.id;`;
        connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            data.forEach(row => {
                departmentArr.push(row.dept_name);
            });
            inquirer.prompt({
                name: "department",
                type: "list",
                message: "For which department would you like to see the employee list?",
                choices: departmentArr
            }).then(answer => {
                const tempEmployeeArr = [];
                const query = `
                SELECT employee.last_name, employee.first_name, role.title, role.salary, department.dept_name
                    FROM employee
                        LEFT JOIN role ON role.id = employee.role_id
                            LEFT JOIN department ON role.department_id = department.id WHERE department.dept_name = ?
                                ORDER BY Last_name ASC;`;

                connection.query(query, answer.department, (err, data) => {
                    if (err) {
                        console.log(err);
                        throw err
                    }
                    data.forEach(row => {
                        let details = [];

                        details.push(row.last_name);
                        details.push(row.first_name);
                        details.push(row.title);
                        details.push(`$${row.salary}`);
                        details.push(row.dept_name);
                        tempEmployeeArr.push(details);
                    });

                    console.log(chalk.cyan(figlet.textSync(`\nAll Employees in ${answer.department}`, {
                        font: "mini"
                    })));
                    console.table([chalk.magenta("Last Name"), chalk.magenta("First Name"), chalk.magenta("Title"), chalk.magenta("Salary"), chalk.magenta("Department")], tempEmployeeArr);
                    queries.actionPrompt();
                });
            });
        });
    }

    updatePrompt() {
        const employeesArr = [];

        const query = `
        SELECT last_name, first_name FROM employee ORDER BY last_name ASC;`;

        connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            data.forEach(row => {
                let tempDetails = "";
                tempDetails += row.last_name;
                tempDetails += " ";
                tempDetails += row.first_name;
                employeesArr.push(tempDetails);
            });
            console.log(employeesArr);
            inquirer.prompt({
                type: "list",
                name: "name",
                message: "For which employee would you like to update a role?",
                choices: employeesArr
            });

        });
    }
}


module.exports = Employee;