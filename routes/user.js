const express = require('express')
const router = express.Router()
const User = require('../schemas/user')
const { BadRequestError } = require('../errors')
const { ToDoList } = require('../schemas/to-do-list')
require('express-async-errors')

router.post('/signup', async (req, res) => {
  const newUser =
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password
        }

  const existingUser = await User.findOne({ email: newUser.email })

  if (existingUser) throw new BadRequestError('Email already associated with a user')

  newUser.todolist = await ToDoList.create({})

  const createdUser = await User.create(newUser)
  return res.send(createdUser)
})

// router.post('/createlist', [JwtAuth] ,async(req, res) => {

//     const listExists = await User.findOne({_id: req.user.user_id}, 'todolist');

//     if(listExists.todolist) throw new BadRequestError('A ToDo list already exists for this user');

//     const newList = await ToDoList.create({});
//     const updatedUser = await User.updateOne({_id: req.user.user_id}, {todolist: newList._id});

//     if(updatedUser.modifiedCount == 0)
//     {
//         throw new InternalServerError('ToDo list couldnot be added. Some unknown error has occured');
//     }

//     return res.send(`ToDo List created Successfully`);
// });

module.exports = router
