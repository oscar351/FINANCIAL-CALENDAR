const express = require('express');
const {findUserId, resetUserPassword, updateUserPassword} = require('./findUserInfo');
const authJWT = require('../../utils/authJWT');

const router = express.Router();

router.post('/findUserId', findUserId);
router.post('/resetUserPassword', resetUserPassword);
router.put('/updateUserPassword', updateUserPassword);




module.exports = router;