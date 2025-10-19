var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ api_name: "Api BackEnd Test", version: "1.0.0"});
});

router.get('/status', function(req, res, next) {
  res.send({ api_name: "Api BackEnd Test", version: "active"});
});

module.exports = router;
