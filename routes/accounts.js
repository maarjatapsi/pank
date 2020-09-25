const User = require('../models/User');
const Account = require('../models/Account');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const account = await Account.find({
            user: res.locals.loggedInUser._id
        })
        if (!account) return next(new Error('This user doesnt have an account.'));
        res.status(201).json({
            message: "Success",
            code: 201,
            account_data: account
          });
    } catch (error) {
        next(error);
    }
});

module.exports = router;