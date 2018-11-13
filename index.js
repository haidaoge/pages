(function($) {
	var methods = {
		init: function(options) {
      $(this).empty();
      $(this).off("click", "#hpage a");
			// 默认选项
			var defaults = {
				elem: $(this),
				counts: 0,
				curr: 1,
				offset: 15,
			};
			// 使用settings合并拓展选项
			var obj = $.extend({}, defaults, options);
			// 计算分页
			obj.pages = Math.ceil(obj.counts / obj.offset);
			// 小于一页不分页
			if(obj.pages < 2) {
				return this;
			}
			obj.limit = obj.pages > 9 ? 9 : obj.pages;
			// 生成分页元素
			var html = '<ul id="hpage" class="pagination">'+
					   '<li class="disabled"><a href="javascript:;" data-index="first">首页</a></li>'+
					   '<li class="disabled"><a href="javascript:;" data-index="prev">«</a></li>'+
					   '<li class="active"><a href="javascript:;" data-index="1">1</a></li>';
			for(var i = 2; i <= obj.limit; i++) {
				html += '<li><a href="javascript:;" data-index="'+ i +'">'+ i +'</a></li>';
			}
			html += '<li><a href="javascript:;" data-index="next">»</a></li>'+
				    '<li><a href="javascript:;" data-index="last">尾页</a></li></ul>';

			// 分页元素视图化
			obj.elem.html(html);
			obj.elem.hPage("method", obj);
		},
		method: function(obj) {
			$(this).on("click", "#hpage a", function() {
				var curr = $(this).attr("data-index");
				obj.index = $("#hpage a").index($(this));
				$("#hpage li").removeClass("active disabled");
				switch (curr) {
					case "first": 
						if(obj.curr != 1){
							obj.curr = 1;
							obj.callback(obj);
						}
						obj.elem.hPage("update", obj);
						break;
					case "prev": 
						if(obj.curr > 1) {
							obj.curr --;
							obj.callback(obj);
						}
						obj.elem.hPage("update", obj);
						break;
					case "next": 
						if(obj.curr < obj.pages) {
							obj.curr ++;
							obj.callback(obj);
						}
						obj.elem.hPage("update", obj);
						break;
					case "last": 
						if(obj.curr != obj.pages) {
							obj.curr = obj.pages;
							obj.callback(obj);
						}
							obj.elem.hPage("update", obj);
						break;
					default: 
						obj.curr = curr * 1; 
						obj.callback(obj);
						obj.elem.hPage("update", obj);
				}
			});
		},
		update: function(obj) {
			var curr = obj.curr,
				index = obj.index,
				start = 1,
				end = obj.pages,
				html = '';
			if (obj.pages > 9) {
				start = curr - 5 > 0 ? curr - 4 : 1;
				end = curr + 4 > obj.pages ? obj.pages : curr + 4;
				// 首页
				if(index == 0) {
					start = 1;
					end = 9;
				}
				//尾页
				if(index == 12) {
					start = obj.pages - 8;
					end  = obj.pages;
				}
				// 点击区域在数字1-5 或者 最后4页之前 或者 前5页
				if((index > 1 && index < 7) || (index == 11 && curr <= obj.pages - 5) || curr <= 5) {
					index = curr - start + 2;
					end = start + 8;
				//点击区域在数字6-9 或者 最后4页之前 或者 最后4页
				}else if((index >= 7 && index < 11) || (index == 1 && curr <= obj.pages - 5) || curr > obj.pages - 5) {
					index = curr - end + 10;
					start = end - 8;
				}
			} else {
				start = 1;
				end = obj.pages;
				if((index == 1 && curr != 1) || (index == obj.limit + 2 && curr != obj.pages)) {
					index = curr + 1;
				} 
			}
			html += '<ul id="hpage" class="pagination">'+
		   			'<li ><a href="javascript:;" data-index="first">首页</a></li>'+
		   			'<li ><a href="javascript:;" data-index="prev">«</a></li>';
		   	for(var i = start; i <= end; i++) {
		   		html += '<li><a href="javascript:;" data-index="'+ i +'">'+ i +'</a></li>';
		   	}
		   	html += '<li><a href="javascript:;" data-index="next">»</a></li>'+
	    			'<li><a href="javascript:;" data-index="last">尾页</a></li></ul>';
	    	obj.elem.html(html);
	    	if (index > 1 && index <= obj.pages) {
	    		$("#hpage li").eq(index).addClass("active");
	    	}							
	    	if (curr == 1 || index == 0) {
	    		$("#hpage li").eq(2).addClass("active");
				$("#hpage li").eq(0).addClass("disabled");
				$("#hpage li").eq(1).addClass("disabled");
			}
			if (curr == obj.pages || index == obj.limit + 2) {
				$("#hpage li").eq(obj.limit + 1).addClass("active");
				$("#hpage li").eq(obj.limit + 2).addClass("disabled");
				$("#hpage li").eq(obj.limit + 3).addClass("disabled");
			}
		}
	};
	$.fn.hPage = function() {
		// 获取传入的方法，切勿用function(method){}来实现，否则会毁掉一切
		var method = arguments[0];
		// 方法调用
		if(methods[method]) {
			// 如果存在，获取方法名
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if (typeof method === 'object' || !method) {
			//如果没有传入方法名，则默认调用init方法，参数为arguments
			method = methods.init;
		} else {
			// 否则提示错误
			$.error('Method' + method + 'does not exist no jQuery.hPage');
		}
		// 用apply方法调用方法，并传入参数
		return method.apply(this, arguments);
	};

})(jQuery);


