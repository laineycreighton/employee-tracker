INSERT INTO
    department (name)
VALUES
    ("Executive"),
    ("HR"),
    ("Finance"),
    ("Operations"),
    ("Sales");

INSERT INTO
    role (title, salary, department_id)
VALUES
    ("Associate", 75000.00, (2, 3, 4, 5)),
    ("Supervisor", 100000.00, (2, 3, 4, 5)),
    ("Manager", 125000.00, (2, 3, 4, 5)),
    ("District Manager", 175000.00, 1),
    ("Vice President", 250000.00, 1),
    ("CEO", 350000.00, 1);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Lainey", "Creighton", 6),
    ("Ashley", "Huskey", 5, 6),
    ("Salmon", "Creighton", 4, 5),
    ("Tilapia", "Creighton", 3, 4),
    ("Amora", "Huskey", 2, 3),
    ("Lyla", "Aldridge", 1, 2);
