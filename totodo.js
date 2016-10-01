#!/usr/bin/env node
'use strict'
const fs = require('fs')
const path = require('path')

const difference = require('lodash.difference')
const pify = require('pify')

const askForNewTodo = require(path.join(__dirname, 'src', 'ask-for-new-todo'))
const showMainMenu = require(path.join(__dirname, 'src', 'show-main-menu'))
const showTodos = require(path.join(__dirname, 'src', 'show-todos'))

const todoFile = path.join(process.env.HOME, '.totodo.json')

const log = console.log.bind(console)

const readTodos = () => pify(fs.readFile)(todoFile, 'utf8')
  .catch(error => {
    return (error.code === 'ENOENT') ? '[]' : error
  })
  .then(fileContents => {
    if (fileContents) {
      return JSON.parse(fileContents)
    } else {
      return []
    }
  })

const writeTodos = (todos) => pify(fs.writeFile)(todoFile, JSON.stringify(todos)).catch(log)

function runLoop () {
  showMainMenu()
    .then(answers => {
      if (answers.mainMenu === 'add') {
        return askForNewTodo()
      } else if (answers.mainMenu === 'view') {
        return readTodos().then(showTodos)
      } else if (answers.mainMenu === 'exit') {
        return Promise.resolve({ exit: true })
      }
    })
    .then(answers => {
      if (answers.newTodo) {
        return readTodos().then(todos => writeTodos(todos.concat(answers.newTodo)))
      } else if (answers.todoList) {
        return readTodos().then(todos => writeTodos(difference(todos, answers.todoList)))
      } else if (answers.exit) {
        return Promise.resolve({ exit: true })
      }
    })
    .then(answers => {
      if (answers && answers.exit) {
        process.exit()
      } else {
        runLoop()
      }
    })
    .catch(log)
}

runLoop()
