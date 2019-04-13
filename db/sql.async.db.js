
   let mysql  = require( 'mysql' );
   let cfg = require('../config/appcfg');  //引入数据库配置模块中的数据
   let pool  = mysql.createPool(cfg.Promise);
  //将结果已对象数组返回
  var query=( sql , params )=>{
      return new Promise(function(resolve,reject){
          pool.getConnection(function(err,connection){
              if(err){
                  reject(err);
                  return; 
              }
              connection.query( sql , params , function(error,res){
                  connection.release();
                  if(error){
                      reject(error);
                      return;
                  }
                  resolve(res);
              });
          });
      });
  };
    //将结果已对象数组分页
    var paging=( pageNumber,pageSize,sql , params )=>{
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                if(err){
                    reject(err);
                    return; 
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
                console.log(sql + limt+params)
                connection.query(sql + limt , params , function(error,res){
                    connection.release();
                    if(error){
                        reject(error);
                        return;
                    }
                    resolve(res);
                });
            });
        });
    };
  //返回一个对象
  var findFirst=( sql , params )=>{
      return new Promise(function(resolve,reject){
          pool.getConnection(function(err,connection){
              if(err){
                  reject(err);
                  return; 
              }
              connection.query( sql , params , function(error,res){
                  connection.release();
                  if(error){
                      reject(error);
                      return;
                  }
                  resolve( res[0] || null );
              });
          });
      });
  };
  //返回单个查询结果
  var findSingle=(sql , params )=>{
      return new Promise(function(resolve,reject){
          pool.getConnection(function(err,connection){
              if(err){
                  reject(err);
                  return; 
              }
              connection.query( sql , params , function(error,res){
                  connection.release();
                  if(error){
                      reject( error );
                      return;
                  }
                  for( let i in res[0] )
                  {
                      resolve( res[0][i] || null );
                      return;
                  }
                  resolve(null);
              });
          });
          
      });
      
  }
  //执行代码，返回执行结果
  var execute=(sql , params )=>{
      return new Promise(function(resolve,reject){
          pool.getConnection(function(err,connection){
              if(err){
                  reject(err);
                  return; 
              }
              connection.query( sql , params , function(error,res){
                  connection.release();
                  if(error){
                      reject(error);
                      return;
                  }
                  resolve( res );
              });
          });
      });
  }
 
  
  //模块导出
  module.exports = {
      query       :query ,
      paging      : paging,
      findFirst   : findFirst ,
      findSingle  : findSingle ,
      execute : execute ,
    }
