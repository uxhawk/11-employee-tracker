# Employee Tracker
<img src="https://lh3.googleusercontent.com/-VT_wLmfuip2-jgOhL30hb5afgC_MwievnU-o85Gh3D32NOb-Vnj2ICHAnKqYnIqaYPG8kjB2KoWNcpcJMFgNV2UPS74qXoeN0dt-uSVM3KyXS-R6pf1-kC9CchTdjmBDn-ShtvY7bOuJwtlXIxEH8cUY74WXyxbJUiDehd_0tE8T02ywssBo-pBIuC5oZq3NTQ0EFEsO-9uhaRzGq306Le2DFt1oZvP66ayIMELRm6NYmiQlYjCY7n-ptNUpzkgjgQFZqLt-NQp5tmo4KL_c805sgD5CoivcFExflHCaxtSEPDPScUGBW93MlWWV1oOP-sPAYdyxnnl90_WjDEW_mjkINzKJKGPjXW0a71kkL4pkkfzR63Jv052DxzkoECQ2AwwJK7oDrBidRhNs79ycRI-G2RGii0J8S8oy5N4zPEDruLBPi4e3JDdaxOTeIhNQbg2q9eo0CqbnlPVcr8tDVrzv-9G5ZJCogidaCaG6FbSnDiZPPjsdR9yaFs3bushfluPakDpRj36JI9oGJRU91qyxCMqfl2tTqcKn4OoSZbgqvkFpqBDkBxyLow0BooTNEgoJLpNCUyQF-7c6k_fPfjymZTPglmtdkgIFpDzBw5LmO2ykpbBwozlA2-CAtdKm5Jbk_-laKiWOlho3HB9wWNtaP_cEvgU1KuRJEzBueSba932rHEFe0Lu-NjUbaovx2WxXMgeKJjvBg6XQ4--0GIgqYL3altXZS0nSEhWsltHEh-fjDQdTg=w489-h217-no" width="500px">

This is a CMS application for viewing, editing, and adding company details stored in an employees_db MySQL database. Watch a video demo of the application in action here:
https://youtu.be/xlN-Mdjrgbk 

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

