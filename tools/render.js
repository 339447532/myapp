let rd={};
/**********************前端返回json格式带msg*************************/
rd.renderMsg=function(msg,record){
    var j = {};
    j.code=0;
    j.msg=msg;
    j.count=record.length;
    j.data=record;
    return j;
}

/**********************前端返回json格式*************************/
rd.render=function(record){
    var j = {};
    j.code=0;
    j.msg="";
    j.count=record.length;
    j.data=record;
    return j;
}
/**********************前端返回成功json格式*************************/
rd.renderSuccess=function(msg){
    var j = {};
    j.code=0;
    j.msg=msg;
    j.count=0;
    j.data=[];
    return j;
}


rd.renderPaging=function(record,count){
    var j = {};
    j.code=0;
    j.msg="";
    j.count=count;
    j.data=record;
    return j;
}
/**********************前端返回成功失败格式*************************/
rd.renderFail=function(msg){
    var j = {};
    j.code=-1;
    j.msg=msg;
    j.count=0;
    j.data=[];
    return j;
}
/**********************前端返回成功失败格式*************************/
rd.renderLoginFail=function(msg){
    var j = {};
    j.code=-5;
    j.msg=msg;
    j.count=0;
    j.data=[];
    return j;
}
rd.authtree=function(list,checkedId,disabledId){
    var j = {};
     j.list=list;
     j.checkedId=checkedId;
     j.disabledId=disabledId;
     return j;
}
rd.toTree=function(data) {
        // 删除 所有 children,以防止多次调用
        data.forEach(function (item) {
            delete item.children;
        });
  
      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {};
      data.forEach(function (item) {
          map[item.id] = item;
      });
  //        console.log(map);
      var val = [];
      data.forEach(function (item) {
          // 以当前遍历项，的pid,去map对象中找到索引的id
          var parent = map[item.pid];
          // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
          if (parent) {
              (parent.children || ( parent.children = [] )).push(item);
          } else {
              //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
              val.push(item);
          }
      });
      return val;
  }

module.exports = rd;