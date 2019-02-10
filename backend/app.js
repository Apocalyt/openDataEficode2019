require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var schedule = require('node-schedule');
var request = require('request');

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
client.connect();

const requestOptions = {
  url: 'https://opendata.hopefully.works/api/events',
  headers: {
    'Authorization': 'Bearer ' + process.env.API_TOKEN
  }
}

// Write eficode open data to database 
var j = schedule.scheduleJob('1 * * * *', function(){
   request(requestOptions, function(error, response, body) {
     console.log('error: ', error);
     console.log('statusCode: ', response && response.statusCode);
     if(!error && response && response.statusCode == 200) {
       let parsed = JSON.parse(body);
       let names = ["sensor1", "sensor2", "sensor3", "sensor4"];
       let values = [parsed["sensor1"], parsed["sensor2"], parsed["sensor3"], parsed["sensor4"]];
       console.log(names);
       console.log(values);
       for(let i = 0; i < names.length; i++) {
         let params = [names[i],values[i],parsed["date"]];
         client.query('INSERT INTO data(sensor_name, value, value_ts) VALUES ($1,$2,$3) RETURNING *;',params, (err, res) => {
           console.log(err ? err.stack : res.rows);         
         });
       }
     }
  });
});


//var indexRouter = require('./routes/index');
var dataRouter = require('./routes/data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use('/',express.static("../frontend/build"));
}

//app.use('/', indexRouter);
app.use('/data', dataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var http = require('http');
module.exports = app;



var server = http.createServer(app);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

server.listen(port);
