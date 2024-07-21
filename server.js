const inquirer = require('inquirer');
const prompts = require('./prompts');
const express = require('express');
const { Pool } = require('pg');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
  {
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    database: 'employees_db',
  },
  console.log('Connected!')
);

pool.connect();

async function getDepartments() {
  try {
    const response = await pool.query(`SELECT name FROM department`);
    console.table(response.rows);
  } catch (error) {
    console.error('There was an error getting departments', error);
    throw error;
  }
}

async function addDepartments(name) {
  console.log('name', name);
  try {
    const response = await pool.query(
      `INSERT INTO department (name) VALUES ($1) RETURNING name`,
      [name]
    );
    console.log(response.rows[0]);
  } catch (error) {
    console.error('There was an error adding a department', error);
    throw error;
  }
}

async function getRoles() {
  try {
    const response = await pool.query(
      `SELECT title, id, salary, department FROM role`
    );
    console.table(response.rows);
  } catch (error) {
    console.error('There was an error getting roles', error);
    throw error;
  }
}

async function getEmployees() {
  try {
    const response = await pool.query(
      `SELECT id, first_name, last_name, role_id, manager_id FROM employee`
    );
    console.table(response.rows);
  } catch (error) {
    console.error('There was an error getting employees', error);
    throw error;
  }
}

function init() {
  inquirer.prompt(prompts).then((response) => {
    switch (response?.question1) {
      case 'viewDepartments':
        getDepartments().then(() => init());
        break;
      case 'viewRoles':
        getRoles().then(() => init());
        break;
      case 'viewEmployees':
        getEmployees().then(() => init());
        break;
      case 'addDepartment':
        inquirer
          .prompt({
            message: 'Enter name of the department',
            name: 'department',
          })
          .then((deptRes) => {
            addDepartments(deptRes.department).then(() => init());
          });
        console.log('add department');
        break;
      case 'addRole':
        console.log('add role');
        break;
      case 'addEmployee':
        console.log('add employee');
        break;
      case 'updateEmployeeRole':
        console.log('update employee role');
        break;
      case 'quit':
        process.exit(0);
      default:
        console.log('there was an error');
        break;
    }
  });
}

init();
