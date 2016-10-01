'use strict'
const inquirer = require('inquirer')

module.exports = (todos) => inquirer.prompt({
  type: 'checkbox',
  name: 'todoList',
  message: 'Here are your tasks',
  choices: todos
})
