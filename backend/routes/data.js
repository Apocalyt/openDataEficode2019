var express = require('express');
var request = require('request');
var router = express.Router();

var bodies = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json("placeholde");
});

module.exports = router;
