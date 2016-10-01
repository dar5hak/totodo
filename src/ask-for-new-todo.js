'use strict'
const inquirer = require('inquirer')

module.exports = () => inquirer.prompt({
  type: 'input',
  name: 'newTodo',
  message: 'Add a task:'
})
