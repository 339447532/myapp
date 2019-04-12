 
var express = require('express');
let cfg = require('../config/appcfg');
let db = require('../db/sql.db');
let rd = require('../tools/render');
var router = express.Router();

 router.get('/', function (req, res, next) {
    res.send(cfg.redis);

})

router.get('/list', function (req, res, next) {
    let token = req.cookies.token;
    let sql_token = "select id from users where token=? ";
    db.findFirst(sql_token, [token], function (result, fields) {
    let userid = result.id;//用户id
      let sql_menu = "SELECT * from menus where display='启用' ";
      db.query(sql_menu, [userid], function (result, fields) {
       // console.log('查询结果：');
      //  console.log(JSON.stringify(rd.toTree(result)));
      let sql_role = "SELECT id from menus where id in (SELECT DISTINCT menuid from rolemenu where roleid in (SELECT roleid from  roleuser where userid=?)) ";
      db.query(sql_role, [userid], function (role, fields) {
      let checkedId=[];
      for(var i=0;i<role.length;i++){
        console.log(role[i].id)
        checkedId[checkedId.length]=role[i].id
      }
     
        res.send((rd.render(rd.authtree(result,checkedId,[ 1 ]))));
    });
      });
    });  
  });
module.exports = router;