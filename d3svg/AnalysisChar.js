define(function(require){
	'use strict'
	var d3 = require("d3")
	return Vue.extend({
		data : function(){
			return {
				dataset : [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ] //数据（表示矩形的宽度）
			}
		},
		ready : function(){
			this.init()
		},
		methods : {
			init : function(){
				var width = 300;  //画布的宽度
				var height = 300;   //画布的高度

				var svg = d3.select("#contentDiv")     //选择文档中的body元素
				    .append("svg")          //添加一个svg元素
				    .attr("width", width)       //设定宽度
				    .attr("height", height);    //设定高度

				var linear = d3.scale.linear()
			        .domain([0, d3.max(this.dataset)])
			        .range([0, 250]);

			    var axis = d3.svg.axis()
				     .scale(linear)      //指定比例尺
				     .orient("bottom")   //指定刻度的方向
				     .ticks(7);          //指定刻度的数量

				var rectHeight = 25;   //每个矩形所占的像素高度(包括空白)

				svg.selectAll("rect")
				    .data(this.dataset)
				    .enter()
				    .append("rect")
				    .attr("x",20)
				    .attr("y",function(d,i){
				         return i * rectHeight;
				    })
				    .attr("width",function(d){
				         return linear(d);   //在这里用比例尺
				    })
				    .attr("height",rectHeight-2)
				    .attr("fill","steelblue");

				svg.append("g")
				  	.attr("class","axis")
				  	.attr("transform","translate(20,130)")
				  	.call(axis);
			}
		},
		template: utils.template(function(){/*
			<style scoped>
				#contentDiv{
					margin-top:50px;
				}
				.axis path,
				.axis line{
				    fill: none;
				    stroke: black;
				    shape-rendering: crispEdges;
				}

				.axis text {
				    font-family: sans-serif;
				    font-size: 11px;
				}
			</style>
			<div id="contentDiv"></div>
		*/})
	})
})