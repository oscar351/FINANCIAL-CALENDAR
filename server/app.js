var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');
var cors = require('cors');
const kakao = require("./utils/kakaoStrategy");
const passport = require("passport");
const jwt = require('./utils/jwt-util');


require('dotenv').config();


const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./config/swagger-output.json')

const router = require('./routes');

var app = express();

//Cors정책
let corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // 쿠키 등 credential 정보 허용
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'], // 허용할 메서드
  allowedHeaders: ['Content-Type', 'Authorization'] // 허용할 헤더
}

app.use(cors(corsOptions));

//Swagger 적용
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.COOKIE_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //   httpOnly: true,
  //   secure: false,
  // },
}));


app.use(passport.initialize());
app.use(passport.session());

kakao(); // kakaoStrategy.js의 module.exports를 실행합니다.

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', router);

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

module.exports = app;
