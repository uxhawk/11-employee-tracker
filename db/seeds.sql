
use employees_db;

-- #seed data
-- for managers
insert into manager
    (fname, lname)
VALUES("David", "Hawkins");
insert into manager
    (fname, lname)
VALUES("Divah", "Hawkins");
insert into manager
    (fname, lname)
VALUES("Wayne", "Ernest");

-- #seed data for departments
insert into department
    (dept_name)
VALUES("Accounting");
insert into department
    (dept_name)
VALUES("Software Development");
insert into department
    (dept_name)
VALUES("Marketing");

-- #seed data for roles
-- #accounting
insert into role
    (title, salary, department_id)
VALUES("Controller", 90000, 1);
insert into role
    (title, salary, department_id)
VALUES("Finance Intern", 60000, 1);

-- #software
insert into role
    (title, salary, department_id)
VALUES("Front End Developer", 110000, 2);
insert into role
    (title, salary, department_id)
VALUES("Back End Developer", 115000, 2);

-- #marketing
insert into role
    (title, salary, department_id)
VALUES("Graphic Designer", 75000, 3);
insert into role
    (title, salary, department_id)
VALUES("Video Editor", 80000, 3);

-- #employees
-- #insert into employee
-- (first_name, last_name, role_id, manager_id) VALUES
-- (?, ?, ?,?);
-- #software employees
insert into employee
    (first_name, last_name, role_id)
VALUES
    ("David", "Hawkins", 3);
insert into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Paul", "Johnson", 4, 1);

-- #finance employees
insert into employee
    (first_name, last_name, role_id)
VALUES
    ("Divah", "Hawkins", 1);
insert into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Violet", "Christensen", 2, 2);

-- #marketing employees
insert into employee
    (first_name, last_name, role_id)
VALUES
    ("Wayne", "Ernest", 5);
insert into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Lee", "Magner", 6, 3);

