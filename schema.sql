DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);


CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100)  NULL,
    salary DECIMAL(10,3)  NULL,
    department_id INT  NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);


CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100)  NULL,
    last_name VARCHAR(100)  NULL,
    role_id INT  NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- select common ids between departments and role department ids
USE employees_db;

SELECT roles.title, roles.salary, roles.department_id
FROM roles INNER JOIN departments ON roles.department_id = departments.id 
WHERE roles.department_id = 1; 

--selects all employee data 
USE employees_db;
SELECT employees.first_name, employees.last_name, employees.role_id, roles.title, roles.salary, roles.department_id FROM employees INNER JOIN roles ON employees.role_id = roles.id