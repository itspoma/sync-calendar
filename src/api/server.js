var express = require('express')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , nconf = require('nconf')
  , winston = require('winston')
  , app = express();

// preload config
require('./config.js')(app);

// express plugins
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('errorhandler')());
app.use(require('cookie-parser')());
app.use(require('method-override')());
app.use(require('morgan')('common'))
app.use(require('express-cors')({
  allowedOrigins: [
    'github.com', 'google.com',
    'http://127.0.0.1:8080'
  ]
}));

// mongo
mongoose.connect(nconf.get('database_dsn'));

// routes
require('./routes.js')(app);

app.use(function(req, res, next) {
  var response = {
    'error': null,
    'data': res.data,
  };

  return res.json(response);
});

app.use(function(err, req, res, next) {
  var response = {
    'error': err,
    'data': null,
  };

  return res.json(response);
});

// // error handler
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);

//   res.json({
//     message: err.message,
//     error: 'aa'
//   });

//   next(err);
// });

// start server
app.listen(app.get('port'), function () {
  winston.info('[SERVER] Listening on port ' + app.get('port'));
})