var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session)
var logger = require('morgan');
var cors = require('cors');
const kakao = require("./utils/kakaoStrategy");
const naver = require("./utils/NaverStrategy");
const google = require("./utils/GoogleStrategy");
const passport = require("passport");
const jwt = require('./utils/jwt-util');
const client = require('./client');

require('dotenv').config();


const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./config/swagger-output.json')

const router = require('./routes');

var app = express();

//Cors정책
let corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // 쿠키 등 credential 정보 허용
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 메서드
  allowedHeaders: ['Content-Type', 'authorization'] // 허용할 헤더
}

app.use(cors(corsOptions));

//Swagger 적용
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));

const skipLogging = (req, res) => {
  return req.path === '/system/performance' || res.statusCode === 304;
}

app.use(logger('dev', { skip : skipLogging }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.COOKIE_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({ checkPeriod: 60 * 1000 })
  // cookie: {
  //   httpOnly: true,
  //   secure: false,
  // },
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((token, done) => {
  console.log("token : " + token);
  done(null, token);
});

passport.deserializeUser(async (token, done) => {
  // 토큰을 이용하여 사용자를 인증 또는 사용자 정보를 가져오는 로직 구현
  // 예시: 토큰에서 userId를 추출하여 사용자 정보를 가져옴
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("test");
  const userId = decoded.userId;

  const user = await client.users.findFirst({
    where: {
      email: userId
    }
  })
  if (user) {
    done(null, token);
  } else {
    done(err);
  }

  // Users.findByPk(userId)
  //   .then((user) => {
  //     done(null, user); // 사용자 객체를 세션에서 가져옴
  //   })
  //   .catch((err) => {
  //     done(err);
  //   });
});

kakao(); // kakaoStrategy.js의 module.exports를 실행합니다.
naver();
google();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', router);

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
