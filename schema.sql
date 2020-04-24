#DROP
DATABASE
IF EXISTS employees_db;

CREATE DATABASE employees_db;

use employees_db;

CREATE TABLE department
(
    id INT NOT NULL
    auto_increment,
    dept_name VARCHAR
    (30) NOT NULL,
    PRIMARY KEY
    (id)
);

    CREATE TABLE role
    (
        id INT NOT NULL
        auto_increment,
    title VARCHAR
        (30) NOT NULL,
    salary DECIMAL
        (10,2) NOT NULL,
    department_id INT,
    PRIMARY KEY
        (id)
);

        CREATE TABLE employee
        (
            id INT NOT NULL
            auto_increment,
    first_name VARCHAR
            (30) NOT NULL,
    last_name VARCHAR
            (30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY
            (id)
);

            insert into department
                (dept_name)
            VALUES("Accounting");
            insert into role
                (title, salary, department_id)
            VALUES("Controller", 90000, 1);
            insert into role
                (title, salary, department_id)
            VALUES("Finance Intern", 60000, 1);

            insert into department
                (dept_name)
            VALUES("Software Development");
            insert into role
                (title, salary, department_id)
            VALUES("Front End Developer", 110000, 2);
            insert into role
                (title, salary, department_id)
            VALUES("Back End Developer", 115000, 2);

            insert into department
                (dept_name)
            VALUES("Marketing");
            insert into role
                (title, salary, department_id)
            VALUES("Graphic Designer", 75000, 3);
            insert into role
                (title, salary, department_id)
            VALUES("Video Editor", 80000, 3);

            insert into employee
                (first_name, last_name, role_id)
            VALUES
                ("David", "Hawkins", 3);
            insert into employee
                (first_name, last_name, role_id)
            VALUES
                ("Divah", "Hawkins", 5);
            insert into employee
                (first_name, last_name, role_id)
            VALUES
                ("John", "Payne", 2);
            insert into employee
                (first_name, last_name, role_id)
            VALUES
                ("Amanda", "Losa", 2);
            insert into employee
                (first_name, last_name, role_id)
            VALUES
                ("Christina", "Johnson", 1);
            insert into employee
                (first_name, last_name, role_id)
            VALUES
                ("Paul", "Thompson", 4);
            insert into employee
                (first_name, last_name, role_id)
            VALUES
                ("Jackie", "Christensen", 6);
            insert into employee
                (first_name, last_name, role_id)
            VALUES
                ("Charles", "Cahn", 4);
            insert into employee
                (first_name, last_name, role_id)
            VALUES
                ("Wayne", "Ernest", 3);


