const express = require('express');
const router  = express.Router();
const {BadRequestError} = require('../errors');
require('express-async-errors');

const toDos = [
    "Watch cloud guru course",
    "Watch Nodejs course",
    "Learn about Jira",
];

router.get('/', async (req, res) => {
    throw new BadRequestError("No tasks in queue");
});

module.exports = router;