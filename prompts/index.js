const prompts = [
  {
    message: 'What would you like to do?',
    name: 'question1',
    type: 'list',
    choices: [
      {
        value: 'viewDepartments',
        name: 'View All Departments',
      },
      {
        value: 'viewRoles',
        name: 'View All Roles',
      },
      {
        value: 'viewEmployees',
        name: 'View All Employees',
      },
      {
        value: 'addDepartment',
        name: 'Add a Department',
      },
      {
        value: 'addRole',
        name: 'Add a Role',
      },
      {
        value: 'addEmployee',
        name: 'Add an Employee',
      },
      {
        value: 'updateEmployeeRole',
        name: 'Update an Employee Role',
      },
      {
        value: 'quit',
        name: 'Quit',
      },
    ],
  },
];

module.exports = prompts;
