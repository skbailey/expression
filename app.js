var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

// Setup mongo database
var mongoose = require('mongoose');
var db = mongoose.connect(process.env.MONGOHQ_URL).connection;
db.on('error', function(){ console.error('connection error'); });
db.once('open', function callback () {
  console.log('Connected to Mongo database!')
});

var app = express();
app.locals.title = "Expression";
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// Setup routes

require('./routes')(app);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.format({
          json: function(){
            res.json(404, {message: "Couldn't find route"});
          },

          html: function(){
            res.render('error', {
              message: err.message,
              error: err
            });
          }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.format({
      json: function(){
        res.json(404, {message: "Couldn't find route"});
      },

      html: function(){
        res.render('error', {
          message: err.message,
          error: {}
        });
      }
    });
});


var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

// Shutdown hook
process.on('SIGTERM', function () {
    db.close(function(){
        console.log('Closed Mongo database connection\nClosing server...');
        process.exit(0);
    });
});