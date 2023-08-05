INSERT INTO departments (name) VALUES ("Executive");
INSERT INTO departments (name) VALUES ("HR");
INSERT INTO departments (name) VALUES ("Finance");


INSERT INTO role (title, salary, department_id) VALUES ("Associate", 75000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Supervisor", 100000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Manager", 125000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("District Manager", 175000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Vice President", 250000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("CEO", 350000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Lainey", "Creighton", 6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ashley", "Huskey", 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Salmon", "Creighton", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tilapia", "Creighton", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Amora", "Huskey", 2, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Lyla", "Aldridge", 1, 5);
