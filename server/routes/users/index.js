const express = require('express');
const {findUserId, resetUserPassword, updateUserPassword} = require('./findUserInfo');
const {checkEmail, register} = require('./register');
const { getMyInfo } = require('./getMyInfo');
const authJWT = require('../../utils/authJWT');

const router = express.Router();

router.post('/findUserId', findUserId);
router.post('/resetUserPassword', resetUserPassword);
router.put('/updateUserPassword', updateUserPassword);
router.post('/register', register);
router.get('/checkEmail', checkEmail);
router.get('/getmyInfo', authJWT, getMyInfo);





module.exports = router;