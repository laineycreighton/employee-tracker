const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db',
  },
  console.log('Connected to the employee_db database.')
);

const viewAllDepartments = () => {
  const sql = 'SELECT * FROM departments';
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

const viewAllRoles = () => {
  const sql = 'SELECT * FROM role';
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

const viewAllEmployees = () => {
  const sql = 'SELECT * FROM employee';
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the department's name:",
      },
    ])
    .then((answers) => {
      const sql = 'INSERT INTO departments (name) VALUES (?)';
      const params = [answers.name];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log('Error adding department:', err);
          return;
        }
        console.log('Department added successfully!');
        viewAllDepartments().then((departments) => {
          console.table(departments);
          startApp();
        });
      });
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: "Enter the role's title:",
      },
      {
        type: 'input',
        name: 'salary',
        message: "Enter the role's salary (Format: 00000.00):",
      },
      {
        type: 'list',
        name: 'department',
        message: "Select the role's department (1: HR, 2: Finance, 3: Executive):",
        choices:[
          "1",
          "2",
          "3",
        ],
      },
    ])
    .then((answers) => {
      const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      const params = [answers.title, answers.salary, answers.department];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log('Error adding role:', err);
          return;
        }
        console.log('Role added successfully!');
        viewAllRoles().then((roles) => {
          console.table(roles);
          startApp();
        });
      });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:",
      },
      {
        type: 'input',
        name: 'role_id',
        message: "Select the employee's role (1: Associate, 2: Supervisor, 3: Manager, 4: District Manager, 5: Vice President, 6: CEO):",
        choices:[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
        ],
      },
      {
        type: 'input',
        name: 'manager_id',
        message: "Select the employee's manager (1: CEO, 2: Vice President, 3: Disctrict Manager, 4: Manager, 5: Supervisor):",
        choices:[
          "1",
          "2",
          "3",
          "4",
          "5",
        ],
      },
    ])
    .then((answers) => {
      const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log('Error adding employee:', err);
          return;
        }
        console.log('Employee added successfully!');
        viewAllEmployees().then((employees) => {
          console.table(employees);
          startApp();
        });
      });
    });
};

const updateEmployeeRole = () => {
  // First, retrieve a list of employees from the database
  viewAllEmployees().then((employees) => {
    // Use the list of employees to create choices for the user prompt
    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    // Prompt the user to select an employee to update
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select an employee to update:',
          choices: employeeChoices,
        },
      ])
      .then((answers) => {
        const employeeId = answers.employeeId;

        // Next, retrieve a list of roles from the database
        viewAllRoles().then((roles) => {
          // Use the list of roles to create choices for the user prompt
          const roleChoices = roles.map((role) => ({
            name: role.title,
            value: role.id,
          }));

          // Prompt the user to select a new role for the employee
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'roleId',
                message: 'Select the new role for the employee:',
                choices: roleChoices,
              },
            ])
            .then((answers) => {
              const roleId = answers.roleId;

              // Now that we have the employeeId and roleId, we can update the database
              const updateSql = 'UPDATE employee SET role_id = ? WHERE id = ?';
              const params = [roleId, employeeId];

              db.query(updateSql, params, (err, result) => {
                if (err) {
                  console.log('Error updating employee role:', err);
                  return;
                }
                console.log('Employee role updated successfully!');
                viewAllEmployees().then((employees) => {
                  console.table(employees);
                  startApp();
                });
              });
            });
        });
      });
  });
};

const startApp = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          viewAllDepartments().then((departments) => {
            console.table(departments);
            startApp();
          });
          break;
        case 'View all roles':
          viewAllRoles().then((roles) => {
            console.table(roles);
            startApp();
          });
          break;
        case 'View all employees':
          viewAllEmployees().then((employees) => {
            console.table(employees);
            startApp();
          });
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit(0);
        default:
          console.log('Invalid action.');
          startApp();
      }
    })
    .catch((error) => {
      console.error('Error occurred:', error);
      process.exit(1);
    });
};

startApp();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});