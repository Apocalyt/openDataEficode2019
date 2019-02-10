var express = require('express');
var request = require('request');
var router = express.Router();
const { Pool, Client } = require('pg');

if (process.env.NODE_ENV === "production") {
  var clientParams = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
} else {
  var clientParams = {
    connectionString: process.env.DATABASE_URL
  };
}
const client = new Client(clientParams);

const query = "SELECT * FROM data;"

client.connect();

/* GET data listing. */
router.get('/', function(req, res, next) {
    client.query(query, (error, response) => {
    console.log(error ? error.stack : response.rows);         
    res.json(response.rows);
  });
});

module.exports = router;
