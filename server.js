const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the the employee_db database.')
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

const addRole = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: "Enter the role's title:",
        },
      ])
      .then((answers) => {
        const sql = 'INSERT INTO role (title) VALUES (?)';
        const params = [answers.title];
  
        db.query(sql, params, (err, result) => {
          if (err) {
            console.log('Error adding role:', err);
            return;
          }
          console.log('Role added successfully!');
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
      ])
      .then((answers) => {
        const sql = 'INSERT INTO employee (first_name, last_name) VALUES (?, ?)';
        const params = [answers.first_name, answers.last_name];
  
        db.query(sql, params, (err, result) => {
          if (err) {
            console.log('Error adding employee:', err);
            return;
          }
          console.log('Employee added successfully!');
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
                });
              });
          });
        });
    });
  };

app.get('/departments', (req, res) => {
    const departments = viewAllDepartments();
    res.json(departments);
});

app.get('/roles', (req, res) => {
    const roles = viewAllRoles();
    res.json(roles);
});

app.get('/employees', (req, res) => {
    const roles = viewAllEmployees();
    res.json(employees);
});

app.post('/api/add-role', (req, res) => {
    addRole();
    res.json({ message: 'Adding role.' });
  });

  app.post('/api/add-employee', (req, res) => {
    addEmployee();
    res.json({ message: 'Adding employee.' });
  });

  app.post('/api/update-employee-role', (req, res) => {
    updateEmployeeRole();
    res.json({ message: 'Updating employee role.' });
  });

