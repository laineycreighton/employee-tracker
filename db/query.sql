SELECT id AS department_id, name AS department_name
FROM departments;

SELECT role.id AS role_id, role.title AS role_title, role.salary, departments.name AS department_name
FROM role
INNER JOIN departments ON role.department_id = departments.id;

SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, 
       departments.name AS department_name, role.salary, 
       CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN departments ON role.department_id = departments.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;
