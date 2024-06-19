const express = require('express');
const {findUserId, resetUserPassword} = require('./findUserInfo');
const authJWT = require('../../utils/authJWT');

const router = express.Router();

router.post('/findUserId', findUserId);



module.exports = router;