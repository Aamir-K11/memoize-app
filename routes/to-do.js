const express = require('express');
const router  = express.Router();
const ToDo    = require('../schemas/to-do');
require('express-async-errors');

router.post('/', async (req, res) => {

    const ToDoObject = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
    };

    const ToDoDocument = await ToDo.create(ToDoObject);
    return res.send(ToDoDocument);
});

router.get('/', async (req, res) => {
    const ToDos = await ToDo.find();
    return res.send(ToDos);
});

module.exports = router;