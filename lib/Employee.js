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
        SELECT employee.last_name, employee.first_name, role.title, role.salary, department.dept_name, manager.lname, manager.fname
            FROM employee
                LEFT JOIN role ON role.id = employee.role_id
                    LEFT JOIN department ON role.department_id = department.id
                        LEFT JOIN manager on manager.id = employee.manager_id
                            ORDER BY department.dept_name ASC;`;
        connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            data.forEach(row => {
                let details = [];
                let manager = "";
                details.push(row.last_name);
                details.push(row.first_name);
                details.push(row.title);
                details.push(`$${row.salary}`);
                details.push(row.dept_name);
                if (row.fname === null) {

                } else {
                    manager += `${row.fname} ${row.lname}`;
                }
                details.push(manager);
                employeesArr.push(details);
            });

            console.log(chalk.yellow(figlet.textSync(`\nAll Employees`, {
                font: "mini"
            })));
            console.table([chalk.magenta("Last Name"), chalk.magenta("First Name"), chalk.magenta("Title"), chalk.magenta("Salary"), chalk.magenta("Department"), chalk.magenta("Manager")], employeesArr);

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
                                ORDER BY department.dept_name ASC;`;

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

                    console.log(chalk.yellow(figlet.textSync(`\nAll Employees in ${answer.department}`, {
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

        const query1 = `
        SELECT last_name, first_name FROM employee ORDER BY last_name ASC;`;

        connection.query(query1, (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            data.forEach(row => {
                let tempDetails = "";
                tempDetails += row.first_name;
                tempDetails += " ";
                tempDetails += row.last_name;
                employeesArr.push(tempDetails);
            });
            inquirer.prompt({
                type: "list",
                name: "name",
                message: "For which employee would you like to update a role?",
                choices: employeesArr
            }).then(answer => {
                let nameArr = answer.name.split(" ");
                const fName = nameArr[0];
                const lName = nameArr[1];

                //need to query for all of the available roles before launching the inquirer prompt
                connection.query(`SELECT title FROM role`, (err, data) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    let choices = [];
                    data.forEach(row => {
                        choices.push(row.title);
                    });
                    inquirer.prompt({
                        type: "list",
                        name: "role",
                        message: `What new role do you want ${fName} ${lName} to have?`,
                        choices: choices
                    }).then(answer => {
                        //get the id for the selected role title from the db
                        const newRole = answer.role;
                        var roleID;
                        connection.query(`SELECT id FROM role WHERE title = ?`, [newRole], (err, data) => {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                            data.forEach(row => {
                                roleID = row.id;
                            });

                            //this is the id for the user that needs to be updated
                            connection.query(`SELECT id from EMPLOYEE WHERE first_name = ? AND last_name = ?`, [fName, lName], (err, data) => {
                                var employeeID;
                                if (err) {
                                    console.log(err);
                                    throw (err);
                                }
                                data.forEach(row => {
                                    employeeID = row.id;
                                });
                                connection.query(`UPDATE EMPLOYEE SET role_id = ? WHERE id = ?`, [roleID, employeeID], (err, res) => {
                                    if (err) {
                                        console.log(err);
                                        throw err;
                                    }
                                    //need a fun success  message here
                                    queries.actionPrompt();
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    async addEmployee() {
        //need to query for roles, departments, and managers

        await inquirer.prompt([{
                type: "input",
                name: "firstName",
                message: "What is the first name of the new employee?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of the new employee?"
            },
        ]).then(async answer => {
            const fName = answer.firstName;
            const lName = answer.lastName;
            let departmentArr = [];
            connection.query(`SELECT dept_name FROM department;`, async (err, data) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                data.forEach(row => {
                    departmentArr.push(row.dept_name);
                });
                await inquirer.prompt({
                    type: "list",
                    name: "department",
                    message: `Into which department would you like to add ${fName} ${lName}?`,
                    choices: departmentArr
                }).then(async answer => {
                    const newDept = answer.department;
                    const rolesArr = [];
                    const query = `
                    SELECT role.title, department.dept_name
                        FROM department
                            left JOIN role on role.department_id = department.id WHERE dept_name = ?`;
                    connection.query(query, [newDept], (err, data) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        data.forEach(row => {
                            rolesArr.push(row.title);
                        });
                        inquirer.prompt({
                            type: "list",
                            name: "role",
                            message: `What role in ${newDept} do you want ${fName} ${lName} to have?`,
                            choices: rolesArr
                        }).then(async answer => {
                            const newRole = answer.role;
                            const managerArr = ["No manager"];
                            connection.query(`SELECT fname, lname FROM manager;`, (err, data) => {

                                if (err) {
                                    console.log(err);
                                    throw err;
                                }
                                data.forEach(row => {
                                    let name = "";
                                    name += `${row.fname} ${row.lname}`;
                                    managerArr.unshift(name);
                                });

                                inquirer.prompt({
                                    type: "list",
                                    name: "manager",
                                    message: `Who should ${fName} ${lName} have as a manager?`,
                                    choices: managerArr
                                }).then(answer => {
                                    const manager = answer.manager.split(" ");
                                    const managerFirstName = manager[0];
                                    const managerLastName = manager[1];

                                    //need to query to get manager ID
                                    connection.query(`SELECT id FROM manager WHERE lname = ? AND fname = ?`, [managerLastName, managerFirstName], (err, data) => {
                                        if (err) {
                                            console.log(err);
                                            throw err;
                                        }
                                        var managerID;
                                        data.forEach(row => {
                                            managerID = row.id;
                                        });

                                        //need to query to get role ID
                                        connection.query(`SELECT id FROM role WHERE title = ?`, [newRole], (err, data) => {
                                            if (err) {
                                                console.log(err);
                                                throw err;
                                            }
                                            var roleID;
                                            data.forEach(row => {
                                                roleID = row.id;
                                            });

                                            //final query to post to DB
                                            connection.query(`INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?,?)`, [fName, lName, roleID, managerID], (err, res) => {
                                                if (err) {
                                                    console.log(err);
                                                    throw err;
                                                }
                                                console.log("success");
                                                queries.actionPrompt();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    async updateManager() {
        const employeesArr = [];

        const query1 = `
        SELECT last_name, first_name FROM employee ORDER BY last_name ASC;`;

        connection.query(query1, (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            data.forEach(row => {
                let tempDetails = "";
                tempDetails += row.first_name;
                tempDetails += " ";
                tempDetails += row.last_name;
                employeesArr.push(tempDetails);
            });
            inquirer.prompt({
                type: "list",
                name: "name",
                message: "For which employee would you like to update the manager?",
                choices: employeesArr
            }).then(answer => {
                let nameArr = answer.name.split(" ");
                const fName = nameArr[0];
                const lName = nameArr[1];

                //need to query for all of the available roles before launching the inquirer prompt
                connection.query(`SELECT lname, fname FROM manager`, (err, data) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    let managerArr = ["No manager"];
                    data.forEach(row => {
                        let name = "";
                        name += `${row.fname} ${row.lname}`;
                        managerArr.unshift(name);
                    });
                    inquirer.prompt({
                        type: "list",
                        name: "manager",
                        message: `Which manager do you want ${fName} ${lName} to have?`,
                        choices: managerArr
                    }).then(answer => {
                        //get the id for the selected role manager from the db
                        var manager = answer.manager;
                        manager = manager.split(" ");
                        const newManagerFirstName = manager[0];
                        const newManagerLastName = manager[1];
                        var managerID;
                        connection.query(`SELECT id FROM manager WHERE lname = ? AND fname = ?`, [newManagerLastName, newManagerFirstName], (err, data) => {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                            data.forEach(row => {
                                managerID = row.id;
                            });

                            //this is the id for the user that needs to be updated
                            connection.query(`SELECT id from EMPLOYEE WHERE first_name = ? AND last_name = ?`, [fName, lName], (err, data) => {
                                var employeeID;
                                if (err) {
                                    console.log(err);
                                    throw (err);
                                }
                                data.forEach(row => {
                                    employeeID = row.id;
                                });
                                connection.query(`UPDATE EMPLOYEE SET manager_id = ? WHERE id = ?`, [managerID, employeeID], (err, res) => {
                                    if (err) {
                                        console.log(err);
                                        throw err;
                                    }
                                    //need a fun success  message here
                                    queries.actionPrompt();
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}


module.exports = Employee;