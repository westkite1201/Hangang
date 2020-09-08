var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment');
require('moment-timezone');
let bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
let hangangRouter = require('./routes/api/hangangController');
let fileRouter = require('./routes/api/fileController');
let authRouter = require('./routes/api/authController');
var cors = require('cors')();
var app = express();
require('dotenv').config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors);
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/hangang', hangangRouter);
app.use('/api/file', fileRouter);
app.use('/api/auth', authRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

var mongoose = require('mongoose');
var db = mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    var date = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    console.log('mongodb connection success ', date);
  })
  .catch((e) => console.error(e));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
