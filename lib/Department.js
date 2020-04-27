class Department {

    addDepartment() {
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
        actionPrompt();
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

            console.log(chalk.cyan(figlet.textSync(`\nAll Departments`, {
                font: "mini"
            })));

            console.table([chalk.magenta("Department")], departmentArr);
            actionPrompt();
        });
    }
}

module.exports = Department;