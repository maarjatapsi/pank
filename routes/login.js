const router = require('express').Router();
const User = require('../models/User');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const verify = require('./tokenVerify');


router.post('/', async (req, res) => {
        const { username, password} = req.body;
        const user = await User.findOne({ username });
        if (!user) {return (res.status(400).json({error:"Username does not exist"}))};
        const validPassword = (password === user.password);
        if (!validPassword) {return (res.status(400).json({error:"Wrong password"}))};
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.header('auth-jwt-token', token).json ({access_token: token});

});
router.get('/', verify, (req, res) => {
        res.status(200).json({id: req.user._id});
});

module.exports = router;