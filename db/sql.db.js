
let mysql = require('mysql');//引入mysql模块
let cfg = require('../config/appcfg');  //引入数据库配置模块中的数据

//向外暴露方法
module.exports = {
    query: function (sql, params, callback) {
        
        var connection = mysql.createConnection(cfg.mysql);
        connection.connect(function (err) {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            }
            connection.query(sql, params, function (err, results, fields) {
                if (err) {
                    console.log('数据操作失败');
                    throw err;
                }
                callback && callback(results, fields);
                connection.end(function (err) {
                    if (err) {
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    },
    paging: function (pageNumber,pageSize,sql, params, callback) {
        
        var connection = mysql.createConnection(cfg.mysql);
        connection.connect(function (err) {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            }
            if (pageNumber=undefined|| pageNumber == null || pageNumber == "") {
                pageNumber = 1;
            }
            if (pageSize=undefined|| pageSize == null || pageSize == "") {
                pageSize = 10;
            }
            let limt = " limit ?,? ";
            params[params.length] = (pageNumber - 1) * pageSize;
            params[params.length] = pageSize;
            connection.query(sql + limt, params, function (err, results, fields) {
                if (err) {
                    console.log('数据操作失败');
                    throw err;
                }
                callback && callback(results, fields);
                connection.end(function (err) {
                    if (err) {
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    },
    
    findFirst: function (sql, params, callback) {
        
        var connection = mysql.createConnection(cfg.mysql);
        connection.connect(function (err) {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            }
            //开始数据操作
            //传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
            connection.query(sql, params, function (err, results, fields) {
                if (err) {
                    console.log('数据操作失败');
                    throw err;
                }
                callback && callback(results[0], fields);
                connection.end(function (err) {
                    if (err) {
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    },
    findToken: function (sql, params, callback) {
        
        var connection = mysql.createConnection(cfg.mysql);
        connection.connect(function (err) {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            }
            connection.query(sql, params, function (err, results, fields) {
                if (err) {
                    console.log('数据操作失败');
                    throw err;
                }
                callback && callback(results.length>0?true:false, fields);
                connection.end(function (err) {
                    if (err) {
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    },

};

