function login_ajax(url, data) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (data) {
            var obj = eval('(' + data + ')');         
            if (obj.code == 0) {
            	 window.location ="index.html";
            	
            } else if (obj.code == -1) {
                layer.alert(obj.msg, {
                    title: '提示'
                });
                reloadCode();      
            } 
            return obj
        },
        error: function (data) {
            layer.alert("接口错误", {
                title: '提示'
            });
            reloadCode();
        }

    });
   
}


function set_ajax(url, data) {
	var result=null;
    $.ajax({
        type: "get",
        url: url+'?token='+$.cookie('token'),
        async:false,
        data: data,
        success: function (data) {
            var obj = eval('(' + data + ')');          
            if (obj.code == 0) {
            	result=obj.data
            	return result            
            	
            } else if (obj.code == -1) {
                layer.alert(obj.msg, {
                    title: '提示'
                });
              
            }
            else if (obj.code == -5) {    
                layer.msg(obj.msg, {icon: 5});         
                window.location.href ="http://localhost:3000"; 
                    
            }
            return obj
        },
        error: function (data) {
            layer.alert("接口错误", {
                title: '提示'
            });
           
        }

    });
    return result
   
}


function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
     if(r!=null)return  unescape(r[2]); return null;
}

