const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const connection = require("./Connection");
const table = require("console.table");
const queries = require("./Queries");

class Department {

    async addDepartment() {
        await inquirer.prompt({
            type: "input",
            name: "name",
            message: "What is the name of the new department?"
        }).then(answer => {
            connection.query(`insert into department (dept_name) VALUES(?)`, answer.name, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log({
                    id: result.insertId
                });
            });
        });
        queries.actionPrompt();
    }

    viewDepartments() {
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
                let tempDetails = [];
                tempDetails.push(row.dept_name)
                departmentArr.push(tempDetails);
            });

            console.log(chalk.yellow(figlet.textSync(`\nAll Departments`, {
                font: "mini"
            })));

            console.table([chalk.magenta("Department")], departmentArr);
            queries.actionPrompt();
        });
    }

    viewBudgetByDept() {
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
                message: "For which department would you like to see the budget?",
                choices: departmentArr
            }).then(answer => {
                var budget = 0;
                const query = `
                SELECT role.salary
                    FROM employee
                        LEFT JOIN role ON role.id = employee.role_id 
                            LEFT JOIN department ON role.department_id = department.id 
                                WHERE department.dept_name = ?
                                    ORDER BY manager_id ASC;`;

                connection.query(query, answer.department, (err, data) => {
                    if (err) {
                        console.log(err);
                        throw err
                    }
                    data.forEach(row => {
                        budget += row.salary;
                    });

                    console.log(budget);

                    console.log(chalk.yellow(figlet.textSync(`\nTotal Utilized Budget`, {
                        font: "mini"
                    })));
                    console.table([{
                        Budget: budget
                    }]);
                    queries.actionPrompt();
                });
            });
        });
    }
}

module.exports = Department;