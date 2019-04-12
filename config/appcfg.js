module.exports = {
    redis:{
        config:{
            "host":"192.168.99.64",
            "port":6379,
            "password":"Chucloud123$",
            "opens":{} //设置项
        
        },
        session:{
            host:"192.168.99.64",
            port:"6379",
            auth_pass:"Chucloud123$",
            db:0
        }
    },
    mysql:{
      host : '192.168.99.64',
      port : 3306,//端口号
      database : 'jx',//数据库名
      user : 'root',//数据库用户名
      password : 'zq8439899'//数据库密码
    }
}