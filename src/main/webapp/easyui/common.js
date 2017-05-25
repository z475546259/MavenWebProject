var CommonUtil = {
	data: {
		get: function(k) {
			var v = localStorage[k];
			if(v) {
				try {
					return JSON.parse(v);
				} catch(e) {
					return v;
				}
			}
			return null;
		},
		set: function(k, v) {
			if(v) {
				try {
					localStorage[k] = JSON.stringify(v);
				} catch(e) {
					localStorage[k] = v;
				}
			} else {
				this.remove(k)
			}
		},
		remove: function(k) {
			delete localStorage[k];
		},
		clear: function() {
			localStorage.clear();
		}
	}
}

function ajaxForm(form, callback) {
	form = $(form);
	if (form.form('validate')) {
		var url = form.attr('action');
		var data = form.serialize();
		wait();
		$.post(url, data, function(data, state,jqXHR) {
			closeWait();
			showMessage(data.message);
			callback(data, state,jqXHR);
		},'json');
	}
	return false;
}

function submitForm(form, callback) {
	form = $(form);
	if (form.form('validate')) {
		wait();
		form.form('submit', {
			/*onSubmit:function(){console.log("onSubmit")},
			onProgress:function(){console.log("onProgress")},
			onBeforeLoad:function(){console.log("onBeforeLoad")},
			onLoadSuccess:function(){console.log("onLoadSuccess")},
			onLoadError:function(){console.log("onLoadError")},
			onChange:function(){console.log("onChange")},*/
		    success: function(data){
		    	closeWait();
		    	data = JSON.parse(data);
				showMessage(data.message);
		        callback(data);
		    }
		});
	}
	return false;
}


function showImg(className){
	$('.'+className).hover(function(){
		var panel_w=$(window).width();
		var panel_h=$(window).height();
		var img=$(this);
		var width=img.width();
		var height=img.height();
		var position=img.offset();
		var x=position.left;
		var y=position.top;
		//alert(x+':'+y);
		$('body').append('<div id="show_img_div" style="position: absolute;z-index:10000"><img src="'+img.attr('src')+'"/></div>');
		var w =$('#show_img_div>img').width();
		var h =$('#show_img_div>img').height();
		if(x+width+w>panel_w){
			$('#show_img_div').css({'left':x-w});
		}else{
			$('#show_img_div').css({'left':x+width});
		}
		if(y+height+h>panel_h){
			$('#show_img_div').css({'top':y-h});
		}else{
			$('#show_img_div').css({'top':y+height});
		}
	},function(){
		$('#show_img_div').remove();
	});
}

$.extend($.fn.datagrid.methods, {
	autoMergeCells : function(jq, fields) {
		return jq.each(function() {
			var target = $(this);
			if (!fields) {
				fields = target.datagrid("getColumnFields");
			}
			var rows = target.datagrid("getRows");
			var i = 0, j = 0, temp = {};
			for (i; i < rows.length; i++) {
				var row = rows[i];
				j = 0;
				for (j; j < fields.length; j++) {
					var field = fields[j];
					var tf = temp[field];
					if (!tf) {
						tf = temp[field] = {};
						tf[row[field]] = [ i ];
					} else {
						var tfv = tf[row[field]];
						if (tfv) {
							tfv.push(i);
						} else {
							tfv = tf[row[field]] = [ i ];
						}
					}
				}
			}
			$.each(temp, function(field, colunm) {
				$.each(colunm, function() {
					var group = this;

					if (group.length > 1) {
						var before, after, megerIndex = group[0];
						for (var i = 0; i < group.length; i++) {
							before = group[i];
							after = group[i + 1];
							if (after && (after - before) == 1) {
								continue;
							}
							var rowspan = before - megerIndex + 1;
							if (rowspan > 1) {
								target.datagrid('mergeCells', {
									index : megerIndex,
									field : field,
									rowspan : rowspan
								});
							}
							if (after && (after - before) != 1) {
								megerIndex = after;
							}
						}
					}
				});
			});
		});
	}
});