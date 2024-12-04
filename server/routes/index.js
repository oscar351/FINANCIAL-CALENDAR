var express = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');
const systemRouter = require('./system');


var router = express.Router();


router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/system', systemRouter);

module.exports = router;
