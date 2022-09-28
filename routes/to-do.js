const express = require('express')
const router = express.Router()
const JwtAuth = require('../middleware/jwt-auth')
const ToDoController = require('../controllers/to-do')

router.post('/', JwtAuth, ToDoController.createNewToDo)

router.get('/', JwtAuth, ToDoController.getToDos)

router.put('/', JwtAuth, ToDoController.updateToDos)

router.delete('/', JwtAuth, ToDoController.deleteToDo)

module.exports = router
