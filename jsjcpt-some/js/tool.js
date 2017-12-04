-function(){
	//###########################
	//字符串模板引擎
	//###########################
	/*
		模板格式：
		<<for (var k in this.data){ >>
		<<this.data[k]>>
		<< } >>
	*/
	window.templateEngine = function(html, options){
		var re = /<<([^>>]+)?>>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
		var add = function(line, js) {
			js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
				(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
			return add;
		}
		while(match = re.exec(html)) {
			add(html.slice(cursor, match.index))(match[1], true);
			cursor = match.index + match[0].length;
		}
		add(html.substr(cursor, html.length - cursor));
		code += 'return r.join("");';
		return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
	}
	//###########################
	//利用注释获得模板
	//###########################
	window.template = function(tmpl) {
		var regEx = new RegExp("/\\*([\\S\\s]*)\\*/", "mg");
		tmpl = tmpl + "";
		var matches = tmpl.match(regEx) || [];
		var result = [];
		for (var i = 0; i < matches.length; i++) {
			result.push(matches[i].replace(regEx, "$1"));
		}
		return result.join("");
	};
	window.getData = function(url,data,callback,errCallback){
		var self = this;
		$.ajax({
			url : url,
			data : data,
			type : "post",
			success : function(data){
				if(typeof data === "string"){
					try{
						data = JSON.parse(data);
					}catch(e){
						if(data.indexOf("function access()")!== -1){
							var url = location.href;
							url = encodeURIComponent(url);
							location.href = "/grms/login?redirect="+url;
						}else{
							var sign = confirm("未知错误，是否刷新重试?");
							if(sign){
								location.reload();
							}
						}
						return false;
					}
				}
				if(data.statCode !== 1){
					errCallback && errCallback(data);
					return false;
				}
				if(callback){
					callback(data.data);
				}
			},
			error : function(){
				errCallback && errCallback();
			}
		});
	};
}();