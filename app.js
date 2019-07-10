var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var _ = require('lodash');

var QRCode = require('qrcode');

//for windton logger
// var winston = require('./winston').winston;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var mobileRouter = require('./routes/mobile');


 
/* QRCode.toDataURL('I am a pony!', function (err, url) {
  console.log(url)
}) */


/* QRCode.toString('venkatesh', function (err, string) {
  if (err) throw err
  console.log(string)
}) */

// Setting up port
var PORT = process.env.PORT || 8080;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* app.use(session({secret: 'testkey'})); */
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/mob', mobileRouter);
//app.use('/users', usersRouter);

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

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

module.exports = app;
