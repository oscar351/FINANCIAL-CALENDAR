var express = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');



var router = express.Router();


router.use('/users', usersRouter);
router.use('/auth', authRouter);

module.exports = router;
