var express = require('express');
var router = express.Router();
var redis = require('../routes/redis');

router.get('/', function (req, res, next) {
  redis.client.set("key1", "value1", function (error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log(results);
      res.json(results);
    }
    redis.client.end(true);    //操作完成，关闭redis连接
  });

  // redis.client.hmset('myname', { name:'msq', truename: 'MaQun ' }, function(err,results) {
  //     if (err) {
  //               console.log(err);
  //           } else {
  //               console.log(results);
  //                res.json(results);
  //           }
  //     redis.client.end(true);    //操作完成，关闭redis连接
  //     });

});
router.get('/msg', function (req, res, next) {
  res.type('html');
  res.render('msg', { title: req.cookies.token });
});
module.exports = router;