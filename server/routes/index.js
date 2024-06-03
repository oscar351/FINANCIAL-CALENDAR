var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  /**
  * #swagger.tags= ['test']
  * #swagger.summary = 'test'
  * #swagger.description = 'test'
  */
  res.send('respond with a resource');
});

module.exports = router;
