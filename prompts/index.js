const {
  VIEW_DEPARTMENTS,
  VIEW_EMPLOYEES,
  VIEW_ROLES,
  ADD_DEPARTMENT,
  ADD_EMPLOYEE,
  ADD_ROLE,
  QUIT_OPTION,
} = require('./actions');

const prompts = [
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

module.exports = prompts;
