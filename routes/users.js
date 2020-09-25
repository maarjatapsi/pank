const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Account = require('../models/Account');
const { check,validationResult } = require('express-validator');
const e = require('express');

//registers an user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });
    const account = new Account({ user: user._id, balance: 200 });
    try {
        const savedUser = await user.save();
        const savedAccount = await account.save();
        res.json(savedUser);
    } catch (e) {
        res.statusCode = 400
        //res.json({message: err });
        res.json({error: e.message});
    }
});



module.exports = router;