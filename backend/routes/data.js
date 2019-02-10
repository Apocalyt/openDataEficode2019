var express = require('express');
var request = require('request');
var router = express.Router();

const options = {
  url: 'https://opendata.hopefully.works/api/events',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImVtYWlsIjoiamFha2tvLnQuay5sYWluZUBnbWFpbC5jb20iLCJpYXQiOjE1NDk3MjYxMTN9.d_YZ7ahYSo44oCBJhz9WHLe3Gu70ykVhfrJ76sBuGaY'
  }
}

var bodies = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  request(options, function(error, response, body) {
    console.log('error: ', error);
    console.log('statusCode: ', response && response.statusCode);
    console.log('body: ', body);
    
    bodies.push(JSON.parse(body));
    res.json(bodies);
  });
});

module.exports = router;
