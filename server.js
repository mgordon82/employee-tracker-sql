const inquirer = require('inquirer');
const prompts = require('./prompts');

function init() {
  inquirer.prompt(prompts).then((response) => {
    switch (response?.question1) {
      case 'viewDepartments':
        console.log('view Departments');
        break;
      case 'viewRoles':
        console.log('view roles');
        break;
      case 'viewEmployees':
        console.log('view employees');
        break;
      case 'addDepartment':
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
      default:
        console.log('there was an error');
        break;
    }
  });
}

init();
