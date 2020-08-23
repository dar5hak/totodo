'use strict'
const inquirer = require('inquirer')

module.exports = () => inquirer.prompt({
  type: 'list',
  name: 'mainMenu',
  message: 'What would you like totodo to do?',
  choices: [
    {
      name: 'Add a new task',
      value: 'add',
      short: 'Add'
    },
    {
      name: 'View your agenda',
      value: 'view',
      short: 'View'
    },
    {
      name: 'Exit',
      value: 'exit'
    }
  ]
})
