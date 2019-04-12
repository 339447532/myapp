var express = require('express');
let db = require('../db/sql.db');
let rd = require('../tools/render');
var router = express.Router();

router.get('/', function (req, res, next) {

  let sql = "select * from role ";
  db.query(sql, [], function (result, fields) {
    // console.log('查询结果：');
    //  console.log(JSON.stringify(rd.toTree(result)));
    res.send(rd.render(result))
  });
});

router.get('/add', function (req, res, next) {
  let data = req.query.data;
  let obj=JSON.parse(data)
  let sql = "INSERT INTO role (name) VALUES (?) ";
  db.query( sql, [obj.name], function (result, fields) {
    res.send(rd.renderSuccess("添加成功"))
  });
});
router.get('/set', function (req, res, next) {
  let data = req.query.data;
  let roleid = req.query.roleid;
  console.log(roleid)
  let sql = "delete from rolemenu where roleid =?";
  db.query(sql, [roleid], function (result, fields) {
    console.log(data)
  });
  for (var i = 0; i < data.length; i++) {
    let sql = "INSERT INTO rolemenu (menuid, roleid) VALUES ( ?, ?);";
    db.query(sql, [data[i], roleid], function (result, fields) {
      console.log(data[i])
    });

  }
  res.send(rd.renderSuccess("提交成功"))

});
router.get('/role_user', function (req, res, next) {
  let roleid = req.query.roleid;
  let sql = "select id,realname from users where id in(SELECT userid from roleuser where roleid=?) order by realname desc ";
  db.paging(null, null, sql, [roleid], function (result, fields) {
    let sql_count = "select count(1)as count  from users where id in(SELECT userid from roleuser where roleid=?)"
    db.findFirst(sql_count, [roleid], function (count, fields) {
      res.send(rd.renderPaging(result, count.count))
    });
  });
});
router.get('/del', function (req, res, next) {
  let id = req.query.id;
  let sql = "delete from role where id=? ";

  db.query(sql, [id], function (result, fields) {
    res.send(rd.renderSuccess("删除成功"))
  });
});
router.get('/roleuser_del', function (req, res, next) {
  let roleid = req.query.roleid;
  let userid = req.query.userid;
  let sql = "delete from roleuser where userid=? and roleid=? ";

  db.query(sql, [userid, roleid], function (result, fields) {
    res.send(rd.renderSuccess("删除成功"))
  });
});
router.get('/user_add', function (req, res, next) {
  let userid = req.query.userid;
  let roleid = req.query.roleid;
  let sql = "select *  from roleuser where userid=? and roleid=? ";
  db.query(sql, [userid, roleid], function (result, fields) {
    if (result.length > 0) {
      return res.send(rd.renderFail("该用户已经存在"))
    } else {
      let sql_info = "INSERT INTO roleuser (userid, roleid) VALUES (?, ?) ";
      db.query(sql_info, [userid, roleid], function (result, fields) {
        res.send(rd.renderSuccess("添加成功"))
      });
    }
  });
});
router.get('/operate', function (req, res, next) {
  let menuid = req.query.menuid
  let roleid = req.query.roleid
  let sql = "select case when r.operateid is null then 0 else 1 end as checked  , o.* from operate o ";
  sql += " left join roleoperate r on r.operateid=o.id and r.roleid=? ";
  sql += " where o.menuid=?  ";

  db.query(sql, [roleid, menuid], function (result, fields) {
    res.send(rd.render(result))
  });

});
router.get('/set_user_operate', function (req, res, next) {
  let data = req.query.data;
  let json=JSON.parse(data);

  console.log(json)
  let menuids=json.menuid;
  let ids=json.id;
  let roleid=json.roleid;

  for(var i=0;i<menuids.length;i++){
  let sql = "delete from roleoperate where roleid =? and  menuid=?";
  db.query(sql, [roleid,menuids[i]], function (result, fields) {
    console.log(data)
  });
  }

  for(var i=0;i<ids.length;i++){
    let sp= ids[i].split(":"); 
    let menuid=sp[0];
    let operateid=sp[1];
    //console.log(operateid)
    let sql = "INSERT INTO roleoperate (roleid,operateid,menuid) VALUES (?, ?,?) ";
    db.query(sql, [roleid, operateid,menuid], function (result, fields) {
      console.log(data[i])
    });
  }
    res.send(rd.renderSuccess("保存成功"))
});


//-----------------------------------
router.get('/role_operate_2', function (req, res, next) {
  var roleid=req.query.roleid;
  var sql=" SELECT DISTINCT m.id,m.name,0 as pid from menus m ,rolemenu r  where m.id =r.menuid and r.roleid=? and display='启用' and url<>'' ";
      sql+=" UNION ";
      sql+=" select o.id,o.name,o.menuid as pid from operate o   "
  // var sql = "SELECT DISTINCT 0 as checked  ,m.id,m.name,0 as pid from menus m ,rolemenu r  where m.id =r.menuid and r.roleid=1 and display='启用' and url<>'' "
  // sql+="  UNION  "  
  // sql+="  (select case when r.operateid is null then 0 else 1 end as checked ,o.id,o.name,o.menuid as pid from operate o  "
  // sql+="  left join roleoperate r on r.operateid=o.id and r.roleid=? "
  // sql+=" where o.menuid in(SELECT DISTINCT m.id from menus m ,rolemenu r  where m.id =r.menuid and r.roleid=? and display='启用' and url<>'')) "
    db.query(sql, [roleid], function (result, fields) {  
      res.send(rd.toTree(result)) 
      });

  });
  router.get('/role_operate_checked', function (req, res, next) {
    var roleid=req.query.roleid;
    var sql="  select case when r.operateid is null then 0 else 1 end as checked ,o.id,o.name,o.menuid as pid from operate o   ";
        sql+="    left join roleoperate r on r.operateid=o.id and r.roleid= ? ";
        sql+=" where o.menuid in(SELECT DISTINCT m.id from menus m ,rolemenu r  where m.id =r.menuid and r.roleid=? and display='启用' and url<>'')  "
    // var sql = "SELECT DISTINCT 0 as checked  ,m.id,m.name,0 as pid from menus m ,rolemenu r  where m.id =r.menuid and r.roleid=1 and display='启用' and url<>'' "
    // sql+="  UNION  "  
    // sql+="  (select case when r.operateid is null then 0 else 1 end as checked ,o.id,o.name,o.menuid as pid from operate o  "
    // sql+="  left join roleoperate r on r.operateid=o.id and r.roleid=? "
    // sql+=" where o.menuid in(SELECT DISTINCT m.id from menus m ,rolemenu r  where m.id =r.menuid and r.roleid=? and display='启用' and url<>'')) "
      db.query(sql, [roleid,roleid], function (result, fields) {  
        res.send(result) 
        });
  
    });
//-------------------------
module.exports = router;