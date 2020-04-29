# Employee Tracker
-- link to video
--screenshot


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Roadmap](#roadmap)

## Installation
Run `npm i` to install the following dependencies:
* mysql
* inquirer
* figlet
* console.table
* ascii-art
* chalk

Use `db/schema.sql` and `db/seeds.sql` to create an `employees_db` database populated with starter employees, departments, roles, and managers.

## Usage
Run `node server.js` to launch the application. Navigate the prompts to view/add the following: 
* departments
* roles
* employees
* budgets 

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contributing
[<img src="https://avatars.githubusercontent.com/u/16821657?" width="60px" style="border-radius:30px">](https://github.com/uxhawk)

## Roadmap
This application reuses verbose queries and lives in callback hell. Updates to this application will employ ORM to make modules more readable. Additionally, database queries will be promisified to remove the over-abundant nesting of callback functions.

