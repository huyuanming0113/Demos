	function trim(text) {
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		return text == null ?
			"" :
			(text + "").replace(rtrim, "");
	};
	function Template(tmpl) {
		var regEx = new RegExp("/\\*([\\S\\s]*)\\*/", "mg");
		tmpl = tmpl + "";
		var matches = tmpl.match(regEx) || [];
		var result = [];
		for (var i = 0; i < matches.length; i++) {
			result.push(matches[i].replace(regEx, "$1"));
		}
		return trim(result.join(""));
	};