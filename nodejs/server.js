var http = require('http')
http.createServer(function(req,res){
	res.writeHead(301,{
		'Location' : 'http://www.homestarrunner.com/sbsite/'
	})
	res.end()
}).listen(3000,'127.0.0.1')
console.log('Sever running at http://127.0.0.1:3000/')

node
> var url = require('url')
undefined
> var requestURL = 'http://example.com:1234/pathname?query=string#hash'
undefined
> url.parse(requestURL).hostname
'example.com'
> url.parse(requestURL).port
'1234'
> url.parse(requestURL).pathname
'/pathname'
> url.parse(requestURL).query
'query=string'