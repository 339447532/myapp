	 /*使用模块加载的方式 加载文件*/
	 layui.config({
        base: '../../admin/lib/'
    }).extend({
        treetable: 'treetable-lay/treetable'
    }).use(['layer', 'table', 'treetable'], function () {
        var $ = layui.jquery;
        var table = layui.table;
        var layer = layui.layer;
        var treetable = layui.treetable;

        // 渲染表格
        var renderTable = function () {//树桩表格参考文档：https://gitee.com/whvse/treetable-lay
            layer.load(2);
            treetable.render({
                treeColIndex: 1,//树形图标显示在第几列
                treeSpid: 0,//最上级的父级id
                treeIdName: 'id',//id字段的名称
                treePidName: 'pid',//pid字段的名称
                treeDefaultClose: false,//是否默认折叠
                treeLinkage: true,//父级展开时是否自动展开所有子级
                elem: '#permissionTable',
                url: 'http://localhost:3000/menu/list',
                page: false,
                cols: [[
                    {type: 'id', title: '编号'},
                    {field: 'name', title: '资源名称'},
                    {field: 'url', title: '资源路径'},
                    {field: 'icon', title: '资源简介'},
                    {field: 'pid', title: '排序'},
                    {field: 'display', title: '类型',
                    	templet: function(d){
                    		if(d.resType==0){
                    			return '菜单';
                    		}else{
                    			return '按钮';
                    		}
                        }	
                    },
                    {templet: complain, title: '操作'}
                ]],
                done: function () {
                    layer.closeAll('loading');
                }
            });
        };

        renderTable();
        
		//触发三个button按钮
        $('#btn-expand').click(function () {
            treetable.expandAll('#permissionTable');
        });

        $('#btn-fold').click(function () {
            treetable.foldAll('#permissionTable');
        });

        $('#btn-refresh').click(function () {
            renderTable();
        });
		
        
        function complain(d){//操作中显示的内容
        	if(d.permissionUrl!=null){
        		return [
                        '<a class="operation" lay-event="edit" href="javascript:void(0)" onclick="editDepartment(\''+ d.permissionId + '\')" title="编辑">',
            	     	'<i class="layui-icon layui-icon-edit"></i></a>',
            	     	'<a class="operation" lay-event="" href="javascript:void(0)" onclick="delDepartment(\''+ d.permissionId + '\')" title="删除">',
            	     	'<i class="layui-icon layui-icon-delete" ></i></a>',
            	     	].join('');
        	}else{
        		return '';
        	}
        	
        }
        //监听工具条
        table.on('tool(permissionTable)', function (obj) {
            var data = obj.data;
            var layEvent = obj.event;
			if(data.permissionName!=null){
				if (layEvent === 'del') {
	                layer.msg('删除' + data.id);
	            } else if (layEvent === 'edit') {
	                layer.msg('修改' + data.id);
	            }
			}
        });
		});