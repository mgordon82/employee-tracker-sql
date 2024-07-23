const inquirer = require('inquirer');
const pool = require('./pools/config');
const {
  VIEW_DEPARTMENTS,
  VIEW_EMPLOYEES,
  VIEW_ROLES,
  ADD_DEPARTMENT,
  ADD_EMPLOYEE,
  ADD_ROLE,
  QUIT_OPTION,
} = require('./prompts/actions');

async function getDepartments() {
  try {
    await pool.query(`SELECT * FROM department`).then(({ rows }) => {
      console.table(rows);
      init();
    });
  } catch (error) {
    console.error('There was an error getting departments', error);
    throw error;
  }
}

async function getRoles() {
  try {
    await pool
      .query(`SELECT title, id, salary, department FROM role`)
      .then(({ rows }) => {
        console.table(rows);
        init();
      });
  } catch (error) {
    console.error('There was an error getting roles', error);
    throw error;
  }
}

async function getEmployees() {
  try {
    await pool
      .query(
        `SELECT id, first_name, last_name, role_id, manager_id FROM employee`
      )
      .then(({ rows }) => {
        console.table(rows);
        init();
      });
  } catch (error) {
    console.error('There was an error getting employees', error);
    throw error;
  }
}

async function addDepartment(name) {
  try {
    await pool
      .query(`INSERT INTO department (name) VALUES ($1)`, [name])
      .then(() => {
        console.log('Department added successfully');
        init();
      });
  } catch (error) {
    console.error('There was an error adding a department', error);
    throw error;
  }
}

async function addRole(name) {
  try {
    const response = await pool.query(`INSERT INTO role (name) VALUES ($1)`, [
      name,
    ]);
    console.log(response.rows[0]);
  } catch (error) {
    console.error('There was an error adding a department', error);
    throw error;
  }
}

async function addEmployee(name) {
  try {
    const response = await pool.query(
      `INSERT INTO employee (first) VALUES ($1)`,
      [name]
    );
    console.log(response.rows[0]);
  } catch (error) {
    console.error('There was an error adding a department', error);
    throw error;
  }
}

function quitPrompt() {
  console.log('Thank you and Goodbye');
  process.exit(0);
}
const prompt = [
  {
    message: 'What would you like to do?',
    name: 'question',
    type: 'list',
    choices: [
      VIEW_DEPARTMENTS,
      VIEW_EMPLOYEES,
      VIEW_ROLES,
      ADD_DEPARTMENT,
      ADD_EMPLOYEE,
      ADD_ROLE,
      QUIT_OPTION,
    ],
  },
];

function init() {
  inquirer.prompt(prompt).then(({ question }) => {
    const options = {
      [VIEW_DEPARTMENTS]: getDepartments,
      [VIEW_ROLES]: getRoles,
      [VIEW_EMPLOYEES]: getEmployees,
      [ADD_DEPARTMENT]: addDepartment,
      [ADD_ROLE]: addRole,
      [ADD_EMPLOYEE]: addEmployee,
      [QUIT_OPTION]: quitPrompt,
    };
    options[question]();
  });
}

init();
