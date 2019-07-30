const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const request = require('request');
const multer = require('multer');
// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart({ maxFields: 10000 , uploadDir: './uploads/' });


const app = express();
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));

mongoose.connect('mongodb://localhost:27017/photosharing2', { useNewUrlParser: true })
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const hashTagRouter = require('./routes/hashTag');
const messageRouter = require('./routes/message');


app.use('/user', usersRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/hashTag', hashTagRouter);
app.use('/message', messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
