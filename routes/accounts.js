const User = require('../models/User');
const Account = require('../models/Account');
const express = require('express');
const router = express.Router();
const verify = require('./tokenVerify');


router.get('/', verify, async (req, res, next) => {

    try {
        const account = await Account.findOne({
            user: req.user._id
        });
        if(!account) return res.status(400).json({error: "No account was found"});
        res.status(200).json({
            account_info: account
        })
    } catch (e) {
        next(e);
    }
});


module.exports = router;