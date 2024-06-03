var express = require('express');
var router = express.Router();
const maria = require('../database/connect/maria');
const QUERY = require('../database/source/query_info');

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
  console.log(req.body);
  maria.query(QUERY.USER_LOGIN, req.body.id, (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send({ error: "Error deleting record." });
    } else {
      console.log(result[0]);
      res.send(result[0]);
    }
  });
  // res.send('respond with a resource');
});

module.exports = router;
