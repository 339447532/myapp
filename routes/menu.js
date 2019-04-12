var express = require('express');
let db = require('../db/sql.db');
let rd = require('../tools/render');
var router = express.Router();

router.get('/', function (req, res, next) {
  let token = req.cookies.token;
  let sql_token = "select id from users where token=? ";
  db.findFirst(sql_token, [token], function (result, fields) {
    let userid = result.id;//用户id

    let sql_menu = "SELECT * from menus where id in (SELECT DISTINCT menuid from rolemenu where roleid in (SELECT roleid from  roleuser where userid=?)) ";
    sql_menu += "and display='启用' ";
    db.query(sql_menu, [userid], function (result, fields) {
      // console.log('查询结果：');
      //  console.log(JSON.stringify(rd.toTree(result)));
      res.send(rd.toTree(result))
    });

  });

});
router.get('/list', function (req, res, next) {
  let token = req.cookies.token;
  let sql_token = "select id from users where token=? ";
  db.findFirst(sql_token, [token], function (result, fields) {
    let userid = result.id;//用户id
    let sql_menu = "SELECT * from menus ";
    db.query(sql_menu, [userid], function (result, fields) {
      // console.log('查询结果：');
      //  console.log(JSON.stringify(rd.toTree(result)));
      res.send(rd.render(result))
    });
  });
});

router.get('/select', function (req, res, next) {
  let token = req.cookies.token;
  let sql_token = "select id from users where token=? ";
  db.findFirst(sql_token, [token], function (result, fields) {
    let userid = result.id;//用户id
    let sql_menu = "SELECT * from menus ";
    db.query(sql_menu, [userid], function (result, fields) {
      // console.log('查询结果：');
      //  console.log(JSON.stringify(rd.toTree(result)));
      res.send(rd.toTree(result))
    });
  });
});
router.get('/detail', function (req, res, next) {
  let id = req.query.id;
  let sql = "SELECT * from menus where id =?";
  db.findFirst(sql, [id], function (result, fields) {
    res.send(rd.render(result));
  });

});
router.post('/edit', function (req, res, next) {
  let body = req.body.data;
  let id = req.body.id;
  var obj = JSON.parse(body);
  let params = [obj.pid, obj.name, obj.url, obj.icon, obj.display, id]
  console.log(body)
  let sql = "update menus set pid=?,name=?,url=?,icon=?,display=? where id =?";
  db.findFirst(sql, params, function (result, fields) {
    res.send(rd.renderSuccess("修改成功"));
  });

});
router.post('/display', function (req, res, next) {
  let id = req.body.id;
  let display = req.body.display;
  if (display == "启用") {
    display = "禁用";
  } else {
    display = "启用";
  }
  console.log(display)
  let sql = "update menus set display=? where id=? ";
  db.query(sql, [display, id], function (result, fields) {
    console.log('更新成功')
    res.send(rd.renderMsg("状态修改成功", { display: display }))
  });
});


router.get('/role_menu', function (req, res, next) {
  let id=req.query.id;
    let sql_menu = "SELECT * from menus where display='启用' ";
    db.query(sql_menu, [], function (result, fields) {
      let sql_role = "SELECT id from menus where id in (SELECT DISTINCT menuid from rolemenu where roleid=?) ";
      db.query(sql_role, [id], function (role, fields) {
        let checkedId = [];
        for (var i = 0; i < role.length; i++) {
        //  console.log(role[i].id)
          checkedId[checkedId.length] = role[i].id
        }
        res.send((rd.render(rd.authtree(result, checkedId, [1]))));
      });
    });
  });
  router.get('/role_operate_menu', function (req, res, next) {
    let roleid=req.query.roleid;
        let sql = "SELECT * from menus where id in (SELECT DISTINCT menuid from rolemenu where roleid=?) and display='启用' ";
        db.query(sql, [roleid], function (result, fields) {
          res.send(rd.toTree(result))
        });
    });
router.get('/set_role_menu', function (req, res, next) {
  let token = req.cookies.token;
  let sql_token = "select id from users where token=? ";
  db.findFirst(sql_token, [token], function (result, fields) {
    let userid = result.id;//用户id
    //删除实例
let sql="delete from rolemenu where roleid=?";
let  params =[roleid];
db.query(sql,params,function(result,fields){
    console.log('删除成功')
    res.send(rd.renderSuccess('删除成功'))
  });
});
  });

module.exports = router;