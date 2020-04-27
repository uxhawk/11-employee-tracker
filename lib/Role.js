const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const connection = require("./Connection");
const table = require("console.table");

class Role {

    async addRole() {
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
            inquirer.prompt([{
                    type: "input",
                    name: "name",
                    message: "What is the name of this role?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary for this role?"
                },
                {
                    type: "list",
                    name: "department",
                    message: "To what department does this role belong?",
                    choices: departmentArr
                }
            ]).then(answers => {
                let deptID;
                const query1 = `SELECT id FROM department WHERE dept_name = ?`;
                connection.query(query1, [answers.department], (err, data) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    data.forEach(row => {
                        deptID = row.id;
                    });

                    const query2 = `insert into role (title, salary, department_id) VALUES(?, ?, ?)`;
                    connection.query(query2, [answers.name, answers.salary, deptID], (err, result) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    });
                    actionPrompt();
                });


            });
        });
    }

    async viewRoles() {
        let rolesArr = [];

        const query = `
        SELECT role.title, role.salary, department.dept_name
            FROM role
                LEFT JOIN department on role.department_id = department.id;`;
        connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            data.forEach(row => {
                let details = [];
                details.push(row.dept_name);
                details.push(row.title);
                details.push(row.salary);
                rolesArr.push(details);
            });

            console.log(chalk.cyan(figlet.textSync(`\nAll Roles`, {
                font: "mini"
            })));
            console.table([chalk.magenta("Department"), chalk.magenta("Title"), chalk.magenta("Salary")], rolesArr);
            actionPrompt();
        });
    }

}


module.exports = Role;