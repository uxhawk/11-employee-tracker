DROP
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

        CREATE TABLE manager
        (
            id INT NOT NULL
            auto_increment,
    fname VARCHAR
            (30) not null,
    lname VARCHAR
            (30) not null,
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
