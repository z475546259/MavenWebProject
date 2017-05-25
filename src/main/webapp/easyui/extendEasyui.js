var rexPhone = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
var rexMobile = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
$.extend($.fn.validatebox.defaults.rules, {
    phoneRex: {
        validator: function(value) {
            var rex = /^0?(1[0-9][0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
            var rex2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
            if (rex.test(value) || rex2.test(value)) {
                return true;
            } else {
                return false;
            }
        },
        message: '请输入正确电话号码格式'
    },
    zipCodeRex: {
        validator: function(value) {
            var rex = /^[1-9][0-9]{5}$/;
            if (rex.test(value)) {
                return true;
            } else {
                return false;
            }
        },
        message: '邮编格式有误'
    },
    zoneRex: {
        validator: function(value) {
            var rex = /(0[1-9]{2,3})/;
            if (rex.test(value)) {
                return true;
            } else {
                return false;
            }
        },
        message: '电话区号有误'
    },
    text: {
        validator: function(value) {
            return isNaN(value);
        },
        message: '请输入文本内容！'
    },
    number: {
        validator: function(value) {
            return !isNaN(value);
        },
        message: '请输入数字！'
    },
    sn: {
        validator: function(value) {
            return value.length == 12;
        },
        message: '设备SN为12位'
    },
    deviceAddress: {
        validator: function(value) {
            return /^[0-9a-fA-F]{8}$/i.test(value);
        },
        message: '地址只能由0-9,a(A)-f(F)组成,且长度只能为8'
    },
    idCard: { // 验证身份证
        validator: function(value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message: '身份证号码格式不正确'
    },
    checkPsd: { // 验证密码是否含有空格以及特殊字符
        validator: function(value) {
            var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
            var result = !containSpecial.test(value);
            return result;
        },
        message: '密码不能含有特殊字符及空格！'
    },
    calenderTo: {
        validator: function(value) {
            var dateFrom = $('#seach_dateFrom').datebox('getValue');
            if (dateFrom != null && dateFrom != "") {
                if (value < dateFrom) {
                    return false;
                }
                return true;
            }
            return true;
        },
        message: '结束时间应该大于开始时间！'
    },
    calenderFrom: {
        validator: function(value) {
            var dateTo = $('#seach_dateTo').datebox('getValue');
            if (dateTo != null && dateTo != "") {
                if (value > dateTo) {
                    return false;
                }
                return true;
            }
            return true;
        },
        message: '开始时间应该小于结束时间！'
    },
    checkName: {
        validator: function(value) {
            return /^[\u4E00-\u9FA5]{2,20}$/i.test(value);
        },
        message: '只能是汉字,范围在2-20之间!'
    },
    checkLoginName: {
        validator: function(value) {
            return /^[a-zA-Z\u4E00-\u9FA5]([A-Za-z0-9\u4E00-\u9FA5]){1,20}$/i.test(value);
        },
        message: '不能以数字开头,只能由字母、数字、汉字组成,范围在2-20之间!'
    },
    radio: {
        validator: function (value, param) {
            var frm = param[0], groupname = param[1], ok = false;
            $('input[name="' + groupname + '"]', document[frm]).each(function () { //查找表单中所有此名称的radio
                if (this.checked) { ok = true; return false; }
            });
            return ok
        },
        message: '需要选择一项！'
    },
    checkbox: {
        validator: function (value, param) {
            var frm = param[0], groupname = param[1], checkNum = 0;
            $('input[name="' + groupname + '"]', document[frm]).each(function () { //查找表单中所有此名称的checkbox
                if (this.checked) checkNum++;
            });

            return checkNum > 0 && checkNum < 4;
        },
        message: '选择1~3项！'
    }
    ,regex: {
        validator: function (value, param) {
            var regex = param[0];
            var re = new RegExp(regex);
            return re.test(value);
        },
        message: '{1}'
    }
    ,mobile: {
    	validator: function (value, param) {
    		return /^1[34578]\d{9}$/.test(value);
    	},
    	message: '手机号码格式有误，正确示例（13811112222）'
    }
});
function loadFilter(data,root,first){
	return loadFilter0(data,true,root,first);
}
function loadFilter0(data,isClosed,root,first){
	data = data.data;
	var arr=[];
	
	if(first) arr.push(first);
	
	var parentArr=[];
	$.each(data,function(k,v){
		v.text = v.text||v.name;
		//if(isClosed) v.state = 'closed';
		if(!v.pid){//一级菜单
			arr.push(v);
		} else {
			var pa = parentArr[v.pid];
			if(!pa){
				pa=[];
				parentArr[v.pid] = pa;
			}
			pa.push(v);
		}
	});
	
	$.each(data,function(k,v){
		var temp = parentArr[v.id];
		if(temp){
			v.children = temp;
			v.checked=false;
			if(isClosed) v.state = v.state||'closed';
		//} else {
			//v.state = v.state||'closed';
		}
	});
	
	
	if(root){
		root.children=arr;
		return [root];
	}
	return arr;
}

function updateTreegridRow(eo,row) {
	eo.treegrid('update', {
        id: row.id,
        row:row
    });
}

function updateDatagridRow(eo,index,row) {
	eo.datagrid('updateRow', {
		index: index,
        row:row
    });
}

function editInline(eo,id) {
    if (!checkEdit(eo)) {
    	eo.isEdit = true;
    	eo.treegrid('beginEdit', id);
    }
}

function showMessage(message){
	$.messager.show({
	    title: '提示消息',
	    msg: message,
	    timeout: 5000
	});
}

function wait(title,message){
	$.messager.progress({
	    title:title||'Please waiting',
	    msg:message||'Loading data...'
	});
}
function closeWait(){
	$.messager.progress('close');
}
function getComboboxArr(s,e){
	var arr=[];
	for(var i=s;i<=e;i++){
		arr.push({id:i,text:i});
	}
	return arr;
}
function checkEdit(eo){
	if (eo.isEdit) {
        $.messager.show({
            title: '提示消息',
            msg: '当前有正在编辑的行,请先保存！',
            timeout: 5000,
            showType: 'slide'
        });
    }
	return eo.isEdit;
}

function getInlineEditHtml(eo,row){
	var e = '&nbsp;<a  href="javascript:saveRow('+eo+',' + row.id + ')" title="保存"><img src="images/pencil_go.png"></a>';
    var d = '&nbsp;<a  href="javascript:cancelRow('+eo+',' + row.id + ')" title="取消" class="easyui-tooltip"><img src="images/arrow_undo.png"></a>';
    return e + d;
}

function saveRow(eo, id) {
	eo.isEdit = false;
	eo.treegrid('endEdit', id);
}
function cancelRow(eo, id) {
	eo.isEdit = false;
	eo.treegrid('cancelEdit', id);
}

function _delete(url,params,callBack,index) {
	if(typeof params == 'number') params={id:params};
    $.messager.confirm('确认对话框', '你确定要删除该信息',
	    function(r) {
	        if (r) {
	            $.post(url,params
            		,function(data) {
            			callBack(params,data,index);
		                showMessage(data.message);
		            }
	            ,'json');
	        }
	    }
    );
}