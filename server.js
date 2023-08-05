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
//retrieve departments here
};

const viewAllRoles = () => {
    //retrieve roles here
};

const viewAllEmployees = () => {
    //retrieve employees here
};

const addRole = () => {
    //prompt user for role details
    //add and execute a role and connection to the database
};

const addEmployee = () => {
    //prompt user for employee details
    //add and execute an employee and connection to the database
};

const updateEmployeeRole = () => {
    //prompt user for the 
}

