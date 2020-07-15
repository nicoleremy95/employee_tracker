USE employees_db;

--id 1
INSERT INTO departments (name)
VALUES ("sales");
--id2
INSERT INTO departments (name)
VALUES ("hr");
--id3
INSERT INTO departments (name)
VALUES ("customer service");
--4
INSERT INTO departments (name)
VALUES ("marketing");
--1
INSERT INTO roles (title, salary, department_id)
VALUES ("associate", 60000, 1);
--2
INSERT INTO roles (title, salary, department_id)
VALUES ("senior", 60000, 1);
--3
INSERT INTO roles (title, salary, department_id)
VALUES ("manager", 200000, 2);
--4
INSERT INTO roles (title, salary, department_id)
VALUES ("associate", 200000, 2);
--5
INSERT INTO roles (title, salary, department_id)
VALUES ("sales lead", 200000, 4);
--6
INSERT INTO roles (title, salary, department_id)
VALUES ("sales lead", 200000, 4);
--7
INSERT INTO roles (title, salary, department_id)
VALUES ("associate", 200000, 3);
--8
INSERT INTO roles (title, salary, department_id)
VALUES ("manager", 200000, 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("betty", "cooper", 1);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("veronica", "lodge", 2);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("judghead", "jones", 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("archie", "andrews", 4);