let cfg = require('../config/appcfg');
var redis = require('redis'),          
    client = redis.createClient(cfg.redis.config.port,cfg.redis.config.host,cfg.redis.config.opts);
    client.auth(cfg.redis.config.password,function(){
    console.log('通过认证');
});
client.on('ready',function(res){
    console.log('ready');    
});
module.exports = redis;
