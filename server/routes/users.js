var express = require('express');
var router = express.Router();
const maria = require('../database/connect/maria');
const QUERY = require('../database/source/query_info');


/* GET users listing. */

router.get('/', function(req, res, next) {
  /**
  * #swagger.tags= ['test']
  * #swagger.summary = 'test'
  * #swagger.description = 'test'
  */

  res.send('respond with a resource');
});

module.exports = router;
