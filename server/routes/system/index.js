const express = require('express');
const authJWT = require('../../utils/authJWT');
const {getSystemPerformance} = require('./systemPerformance');
const router = express.Router();

router.get('/performance', authJWT, getSystemPerformance);



module.exports = router;