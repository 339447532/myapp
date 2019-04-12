var express = require('express');
var UUID = require('uuid');
let db = require('../db/sql.db');
let rd = require('../tools/render');    
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
   var url = '../admin/login.html';
   res.redirect(url);
 // res.render('dist/login', { title: 'Express' });

});
router.post('/login', function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let verity = req.body.verity;
  let sql = 'select * from users where username=? and password=md5(?) ';
  let params = [username, password];
  db.findFirst(sql, params, function (result, fields) {
    console.log('查询结果：');
    console.log(result);
    if (result == undefined || result.length==0) {
      res.send(rd.renderFail("用户或者密码错误"));
    }else if(verity.toUpperCase()!=req.session.captcha.toUpperCase()){
      res.send(rd.renderFail("验证码不正确"));
    }else {
      // 1、uuid.v1(); -->基于时间戳生成  （time-based）2、uuid.v4(); -->随机生成  (random)通常我们使用基于时间戳  v1()  生成的UID，随机生成  v4()  还是有一定几率重复的。
      let ID = UUID.v1();
      req.session.user=result;
      req.session.token = ID;
      res.cookie('token', ID);
      let params = [ID, username];
      let sql = 'update users set token=? where username=? ';
      db.query(sql, params, function (result, fields) {
        res.send(rd.renderMsg("ok", []));
      });
    }
  });
});

module.exports = router;
