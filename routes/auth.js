const express = require('express');
const router  = express.Router();
const User    = require('../schemas/user');
const bcrypt  = require('bcrypt');
const { BadRequestError } = require('../errors');
require('express-async-errors');

router.post('/login', async (req, res) => {

    const user = await User.findOne({email: req.body.email});

    if(!user) throw new BadRequestError('Invalid Email or Password');

    const confirmPassword  = await bcrypt.compare(req.body.password, user.password);

    if(!confirmPassword) throw new BadRequestError('Invalid Email or Password');

    return res.send({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    });

});

module.exports = router;