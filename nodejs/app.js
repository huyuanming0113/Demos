// var http = require('http'),
// 	urls = ['shapeshed.com','www.bbc.co.uk','edition.cnn.com'];

// function fetchPage(url){
// 	var start = new Date();
// 	http.get({ host:url },function(res){
// 		console.log("Got response from: "+ url);
// 		console.log('Request took:',new Date()-start,'ms');
// 	})
// }

// for (var i = 0; i < urls.length; i++) {
// 	fetchPage(urls[i])
// };


// function haveBreakfast(food,drink,callback){
// 	console.log('Having breakfast of ' + food + ',' + drink)
// 	if(callback && typeof(callback) === "function"){
// 		callback()
// 	}
// }
// haveBreakfast('toast','coffee',function(){
// 	console.log('Finished breakfast.Time to go work!')
// })


// var fs = require('fs'),
// 	http = require('http')

// http.get({ host:'shapeshed.com' },function(res){
// 	console.log('Got a response from shapeshed.com')
// }).on('error',function(e){
// 	console.log('There was an error from shapeshed.com')
// })

// fs.readFile('file1.txt','utf8',function(err,data){
// 	if(err) throw error
// 	console.log('File 1 read!')
// })

// http.get({ host:'www.bbc.co.uk' },function(res){
// 	console.log('Got a response from bbc.co.uk')
// }).on('error',function(e){
// 	console.log('There was an error from bbc.co.uk')
// })

// fs.readFile('file2.txt','utf8',function(err,data){
// 	if(err) throw error
// 	console.log('File 2 read!')
// })


// function sleep(milliseconds){
// 	var start = new Date().getTime()
// 	while((new Date().getTime() - start)<milliseconds){}
// }

// function fetchPage(){
// 	console.log('fetching page')
// 	sleep(2000)
// 	console.log('data returned from requesting page')
// }

// function fetchApi(){
// 	console.log('fetching api')
// 	sleep(2000)
// 	console.log('data returned from the api')
// }

// fetchPage()
// fetchApi()


var http = require('http')

function fetchPage(){
	console.log('fetching page')
	http.get({ host:'trafficjamapp.herokuapp.com',path:'/?delay=2000' },function(res){
		console.log('data returned from requesting page')
	}).on('error',function(e){
		console.log('There was an error' + e)
	})
}

function fetchApi(){
	console.log('fetching api')
	http.get({ host:'trafficjamapp.herokuapp.com',path:'/?delay=2000' },function(res){
		console.log('data returned from the api')
	}).on('error',function(e){
		console.log('There was an error' + e)
	})
}

fetchPage()
fetchApi()