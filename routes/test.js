 
var express = require('express');
let cfg = require('../config/appcfg');
let db = require('../db/sql.async.db');
let rd = require('../tools/render');
var router = express.Router();



 router.get('/', async function (req, res, next) {

     let sql="select username from users where id=?"
     let s = await db.findSingle(sql,[1000]);
     let sql2="select password from users where username=?"
     let sf = await db.findSingle(sql2,[s]);
     res.send(sf);

})

module.exports = router;