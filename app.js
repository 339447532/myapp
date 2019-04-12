var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var redisStore  = require('connect-redis')(session);

var bodyParser = require('body-parser');
var ejs = require('ejs');
var flash = require('connect-flash');
var cfg = require('./config/appcfg');
var db = require('./db/sql.db');
var rd = require('./tools/render');    
var index = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');
var menu = require('./routes/menu');
var role = require('./routes/role');
var verifyImg = require('./routes/verifyImg'); 
require('./model/websocket');

var app = express();
app.use(session({
  store: new redisStore(cfg.redis.session),
  secret: 'zhanqi', // 可修改
  cookie: { maxAge: 10 * 60 * 1000 },
  resave: true,
  saveUninitialized: false
}));

app.use(flash());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express); 
app.set('view engine', 'html');




// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// //登录拦截器
app.all('/*', function(req, res, next){
  res.setHeader("Content-Type", "text/html")
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  var arry = ["","login","menu","verifyImg","test"];//放行的
   console.log( req.url.split('/'))
     var arr = req.url.split('/');
    for (var i = 0, length = arr.length; i < length; i++) {// 去除 GET 请求路径上携带的参数
      arr[i] = arr[i].split('?')[0];
    }
    if (arr.length > 1 && arry.indexOf(arr[1])>-1) {// 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
      next();
    } else {
      db.findToken('select * from users where  token=?',  [req.cookies.token], function (result, fields) {
        console.log("---------------------"+result);
        if(result){
          next();
        }else{
          res.send(rd.renderLoginFail("你的账号在别处登录")) ;
        } 
      });
      }
});


app.use('/', index);
app.use('/users', users);
app.use('/test', test);
app.use('/menu', menu);
app.use('/role', role);
app.use('/verifyImg', verifyImg);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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