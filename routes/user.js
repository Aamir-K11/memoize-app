const express = require('express');
const router = express.Router();
const User   = require('../schemas/user');
require('express-async-errors');

router.post('/signup', async (req, res) => {

    const UserObject = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };

    const createdUser  = await User.create(UserObject);
    return res.send(createdUser);
});

module.exports = router;