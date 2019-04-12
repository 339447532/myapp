var express = require('express');
var router = express.Router();
let db = require('../db/sql.db');
let rd = require('../tools/render');    
/* GET users listing. */
router.get('/list', function(req, res, next) {
// 查询实例
let sql="select id,realname from users order by realname desc ";
db.query(sql, [],function(result,fields){
  res.send(rd.render(result))
});
});

router.get('/del', function(req, res, next) {
 let username=req.query.username;
 console.log(req.query);
  //删除实例
let sql="delete from users where username=? ";
let  params =[username];
db.query(sql,params,function(result,fields){
    console.log('删除成功')
    res.send(rd.renderSuccess('删除成功'))
  });
});
router.get('/add', function(req, res, next) {
//添加实例
let  sql = 'INSERT INTO users ( realname, username, password, avatar, token, status, department, job) VALUES ( ?, ?, ?,?,?,?,?,?)';
let  params =[ '测试', 'cs', 'e10adc3949ba59abbe56e057f20f883e', 'images/user_logo/20170926103645_1.jpg', '58d29cd0-542d-11e9-a637-75321a5cca53', 'offline', '解决方案部', '开发工程师'];
db.query(sql,params,function(result,fields){
    console.log('添加成功')
    res.send(rd.renderSuccess('添加成功'))
  });
});

router.get('/update', function(req, res, next) {
 let token=req.query.token;
 let username=req.query.username;
 console.log(req.query);
  //更新实例
let sql="update users set token=? where username=? ";
let  params =[token, username];
db.query(sql,params,function(result,fields){
    console.log('更新成功')
    res.send(rd.renderSuccess('更新成功'))
  });
});
module.exports = router;
