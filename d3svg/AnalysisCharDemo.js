define(function(require){
	'use strict'
	var d3 = require("d3")
	return Vue.extend({
		data : function(){
			return {
				dqData : [{
  					mean:0.0393,
  					dP:[['GROUP01',-0.0435,-50],['GROUP10',-0.2651,-90]],
  					distMin:0,
  					distMax:15,
  					dist:[[17,0,1,4,9,1,3,2,4,0,0,0,1,0,19,0,0,0,0,1,0,1,0,0,7,5,10,6,3,1,0,27,2,2,2,0,0,0,1,0,0,0,74,2,5,5,-100],[68,1,8,21,24,1,4,3,9,0,0,0,0,2,49,0,2,1,2,0,0,5,0,0,29,8,30,7,27,0,1,118,4,4,3,0,1,0,0,1,0,0,157,3,14,27,539],[227,2,12,52,69,7,26,7,15,0,2,0,1,13,136,0,0,4,3,7,0,17,0,0,75,20,66,14,61,0,11,351,4,13,16,0,1,0,4,5,1,0,414,10,21,58,1436],[597,7,25,192,171,6,32,9,40,0,1,1,3,12,236,1,4,4,9,3,0,20,0,0,132,21,101,22,125,3,10,818,9,42,18,1,1,2,8,2,1,0,886,12,60,101,3026],[1202,15,51,428,321,6,50,8,86,0,3,2,7,30,420,1,3,3,18,15,1,29,0,0,253,24,140,42,180,2,15,1544,10,56,31,0,0,1,7,6,1,0,1476,18,86,201,5134],[2004,29,97,853,540,8,71,14,111,1,2,3,14,49,613,1,3,1,37,22,1,46,0,0,369,14,138,48,264,1,12,2332,5,73,46,0,0,2,14,6,0,0,2254,33,167,325,7948],[2862,19,110,1290,745,5,88,31,135,1,6,3,15,61,786,0,4,1,46,27,0,57,0,0,480,6,172,39,355,4,12,3118,3,119,51,1,1,0,11,2,0,0,3147,52,219,436,11030],[3501,22,131,1665,859,4,82,27,171,0,1,0,22,83,990,1,3,0,58,29,0,33,0,1,594,9,241,64,449,0,2,3569,2,172,60,0,0,3,8,4,1,1,4263,57,231,543,13899],[3861,14,139,2032,961,5,72,27,169,0,5,1,24,99,1212,0,1,0,59,19,0,17,0,0,666,2,234,56,477,1,4,3860,2,269,60,1,0,0,4,1,0,0,5216,59,308,543,15850],[3890,5,131,1923,876,1,76,15,145,0,2,0,24,85,1100,0,2,0,56,14,0,12,0,0,695,3,199,46,544,1,1,4142,0,281,75,1,0,1,3,2,0,0,5888,92,325,480,16586],[3381,7,106,1760,844,1,38,16,110,0,1,0,15,73,1027,0,3,1,42,14,0,11,0,0,694,0,179,74,487,0,0,4242,0,291,76,0,0,1,0,1,0,0,6525,91,369,429,16540],[2667,6,93,1465,724,1,31,16,103,0,2,0,6,47,893,0,1,0,20,12,0,11,0,0,647,0,137,47,450,1,0,4233,1,185,50,0,0,0,1,0,0,0,6471,75,332,305,15198],[2155,1,60,1075,653,0,24,9,63,0,0,0,6,44,740,0,0,0,17,3,0,3,0,0,482,1,102,48,374,0,1,4056,0,136,40,0,0,0,2,1,0,0,6372,90,259,233,13687],[1584,3,49,810,473,0,15,9,54,0,0,0,6,30,573,0,0,0,11,6,0,1,1,0,405,0,76,35,314,0,0,3489,0,92,37,2,0,0,0,0,0,0,5768,51,218,158,11340],[1220,0,33,581,377,0,13,5,27,0,0,0,4,31,433,0,0,0,5,1,0,1,0,0,309,0,47,27,241,0,0,3140,0,57,29,0,0,0,1,0,0,0,5194,50,222,101,9343],[864,0,22,437,280,0,8,7,17,0,0,0,7,20,283,0,0,0,4,2,0,1,0,0,213,0,31,28,179,0,0,2651,0,22,22,0,0,0,0,0,0,0,4678,42,178,77,7284],[660,0,12,357,225,0,7,3,26,0,0,0,0,17,210,0,0,0,5,2,0,1,0,0,171,0,15,17,174,0,0,2175,0,19,17,0,0,0,0,1,0,0,3868,11,133,50,5607],[460,0,14,290,174,0,1,2,17,0,0,0,1,12,146,0,0,0,0,1,0,0,0,0,127,0,15,12,141,0,0,1720,1,11,16,0,0,0,0,1,0,0,3134,10,114,33,4066],[345,1,10,230,142,0,1,2,12,0,0,0,1,5,92,0,0,0,0,0,0,0,0,0,99,0,8,10,97,0,0,1268,0,5,10,0,0,0,0,0,0,0,2549,11,89,17,2967],[264,0,12,192,97,0,1,0,3,0,0,0,0,6,60,0,0,0,0,1,0,0,0,0,73,0,6,9,85,0,0,1020,0,4,9,0,0,0,0,0,0,0,1959,5,66,11,2169],[205,0,11,183,81,0,1,0,2,0,0,0,2,3,44,0,0,0,0,0,0,0,0,0,65,0,5,5,68,0,0,754,0,1,4,0,0,0,0,0,0,0,1500,4,46,9,1617],[168,0,4,190,62,0,0,1,4,0,0,0,0,4,32,0,0,0,0,0,0,0,0,0,49,0,2,6,47,0,0,579,0,2,3,0,0,0,0,0,0,0,1110,2,40,6,1124],[127,0,5,208,38,0,0,0,4,0,0,0,0,2,24,0,0,0,0,0,0,0,0,0,48,0,4,3,44,0,0,427,0,3,3,0,0,0,0,0,0,0,830,0,25,8,851],[110,0,5,168,28,0,0,1,2,0,0,0,1,4,13,0,0,0,0,0,0,0,0,0,36,0,2,2,22,0,0,374,0,2,6,0,0,0,0,0,0,0,584,0,16,2,688],[108,0,8,123,25,0,0,0,0,0,0,0,0,1,11,0,0,0,0,0,0,0,0,0,37,0,3,2,23,0,0,306,0,0,3,0,0,0,0,0,0,0,383,1,9,2,536],[78,0,4,128,9,0,0,0,2,0,0,0,1,0,3,0,0,0,0,0,0,0,0,0,28,0,0,1,27,0,0,262,0,1,0,0,0,0,0,0,0,0,272,2,12,4,456],[57,0,0,87,11,0,2,0,2,0,0,0,0,1,5,0,0,0,0,0,0,0,0,0,24,0,4,4,15,0,0,181,0,0,3,0,0,0,0,0,0,0,203,1,4,1,403],[48,0,3,74,12,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,21,0,0,0,12,0,0,166,0,0,1,0,0,0,0,0,0,0,142,0,6,3,388],[47,0,1,59,9,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,17,0,0,0,9,0,0,145,0,0,2,0,0,0,0,0,0,0,112,2,4,2,319],[29,0,0,61,3,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,11,0,0,0,8,0,0,135,0,0,0,0,0,0,0,0,0,0,65,0,2,1,305],[24,0,0,36,8,0,0,0,1,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,13,0,0,0,3,0,0,124,0,0,0,0,0,0,0,0,0,0,46,0,1,0,298],[19,0,2,41,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,4,0,0,103,0,0,0,0,0,0,0,0,0,0,43,0,1,1,250],[13,0,2,24,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,3,0,0,84,0,0,0,0,0,0,0,0,0,0,29,0,0,0,209],[14,0,1,15,2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,3,0,0,1,2,0,0,62,0,0,0,0,0,0,0,0,0,0,14,0,0,0,195],[11,0,1,13,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0,46,0,1,1,0,0,0,0,0,0,0,16,0,1,0,154],[7,0,0,9,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,1,0,0,54,0,0,0,0,0,0,0,0,0,0,6,0,0,0,136],[8,0,0,14,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,43,0,0,0,0,0,0,0,0,0,0,5,1,0,0,108],[4,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,35,0,0,0,0,0,0,0,0,0,0,2,0,0,0,84],[9,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,27,0,0,0,0,0,0,0,0,0,0,8,0,0,0,70],[8,0,0,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,32,0,0,0,0,0,0,0,0,0,0,3,0,1,0,39],[4,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,25,0,0,0,0,0,0,0,0,0,0,3,0,2,0,41],[10,0,1,19,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,7,0,0,1,0,0,0,177,0,0,0,0,0,0,0,0,0,0,9,0,0,0,174]]
  				}]
			}
		},
		ready : function(){
			this.init()
		},
		methods : {
			init : function(){
				var that = this
				function distQuant(data, id){
					function getPoints(_, i){		return _.map(function(d,j){ return {x:j, y:d[i]};});	}
					/* function to return 0 for all attributes except k-th attribute.*/
					function getPointsZero(_, i, k){		return _.map(function(d,j){ return {x:j, y:(i==k ? d[i] : 0 )};});	}
					function toComma(x) {    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
					var width=400, height=300, margin=20;
					var colors = ["#7D74FE","#7DFF26"];
					function draw(type){
						var maxT = d3.max(data[type].map(function(d){ return d3.sum(d); }));
						function tW(d){ return x(d*(data[type].length - 1)/50); }
						function tH(d){ return y(d*maxT/50); }
						var svg =d3.select("#"+id).select("."+type);
						//x and y axis maps.
						var x = d3.scale.linear().domain([0, data[type].length - 1]).range([0, width]);
						var y = d3.scale.linear().domain([0, maxT]).range([height, 0]);
						//draw yellow background for graph.
						svg.append("rect").attr("x",0).attr("y",0).attr("width",width).attr("height",height).style("fill","rgb(235,235,209)");
						// draw vertical lines of the grid.
						svg.selectAll(".vlines").data(d3.range(51)).enter().append("line").attr("class","vlines")
							.attr("x1",tW).attr("y1",0)
							.attr("x2", tW).attr("y2",function(d,i){ return d%10 ==0 && d!=50? height+12: height;});
						//draw horizontal lines of the grid.
						svg.selectAll(".hlines").data(d3.range(51)).enter().append("line").attr("class","hlines")
							.attr("x1",function(d,i){ return d%10 ==0 && d!= 50? -12: 0;})
							.attr("y1",tH).attr("x2", width).attr("y2",tH);
						// make every 10th line in the grid darker.	
						svg.selectAll(".hlines").filter(function(d){ return d%10==0}).style("stroke-opacity",0.7);
						svg.selectAll(".vlines").filter(function(d){ return d%10==0}).style("stroke-opacity",0.7);
						function getHLabel(d,i){
							if(type=="dist"){ // for distribution graph use the min and max to get the 5 label values.
								var r= data.distMin+i*(data.distMax-data.distMin)/5; 
								return Math.round(r*100)/100;
							}else{ // for quantile graph, use label 20, 40, 60, and 80.
								return (i*20)+' %';
							}	
						}
						function getVLabel(d,i){
							if(type=="dist"){ // for dist use the maximum for sum of frequencies and divide it into 5 pieces.
								return Math.round(maxT*i/5);
							}else{ // for quantile graph, use percentages in increments of 20%.
								return (i*20)+' %';
							}	
						}
						// add horizontal axis labels
						svg.append("g").attr("class","hlabels")
							.selectAll("text").data(d3.range(41).filter(function(d){ return d%10==0})).enter().append("text")
							.text(getHLabel).attr("x",function(d,i){ return tW(d)+5;}).attr("y",height+14);	
						// add vertical axes labels.
						svg.append("g").attr("class","vlabels")
							.selectAll("text").data(d3.range(41).filter(function(d){ return d%10==0 })).enter().append("text")
							.attr("transform",function(d,i){ return "translate(-10,"+(tH(d)-14)+")rotate(-90)";})
							.text(getVLabel).attr("x",-10).attr("y",function(d){ return 5;});	
						var area = d3.svg.area().x(function(d) { return x(d.x); })
							.y0(function(d) { return y(d.y0); })
							.y1(function(d) { return y(d.y0 + d.y); })
							.interpolate("basis");
						var layers = d3.layout.stack().offset("zero")(data.dP.map(function(d,i){ return getPoints(data[type], i);}));
						svg.selectAll("path").data(layers).enter().append("path").attr("d", area)
							.style("fill", function(d,i) { return colors[i]; })
							.style("stroke", function(d,i) { return colors[i]; });
						//draw a white rectangle to hide and to show some statistics.
						var stat = svg.append("g").attr("class","stat");
						stat.append("rect").attr("x",-margin).attr("y",-margin)
							.attr("width",width+2*margin).attr("height",margin).style("fill","white");
						// show sum and mean in statistics
						if(type=="dist"){
							stat.append("text").attr("class","count").attr("x",20).attr("y",-6)
								.text(function(d){ 
									var sum = d3.sum(data.dP.map(function(s){ return s[2];})); 
									return "Count: " +toComma(sum)+" / "+toComma(sum)+" ( 100 % )";
								});
							stat.append("text").attr("class","mean").attr("x",250).attr("y",-6)
								.text(function(d){ return "Mean: " +data.mean;});
						}
					}
					function transitionIn(type, p){
						var maxT = d3.max(data[type].map(function(d){ return d3.sum(d); }));
						var max  = d3.max(data[type].map(function(d){ return d[p]; }));
						var x = d3.scale.linear().domain([0, data[type].length - 1]).range([0, width]);
						var y = d3.scale.linear().domain([0, max]).range([height, 0]);
						function tW(d){ return x(d*(data[type].length - 1)/50); }
						function tH(d){ return y(d*maxT/50); }
						var area = d3.svg.area().x(function(d) { return x(d.x); })
							.y0(function(d) { return y(d.y0); })
							.y1(function(d) { return y(d.y0 + d.y); })
							.interpolate("basis");
						var layers = d3.layout.stack().offset("zero")(data.dP.map(function(d,i){ return getPointsZero(data[type], i, p);}));
						var svg = d3.select("#"+id).select("."+type);
						//transition all the lines, labels, and areas.
						svg.selectAll("path").data(layers).transition().duration(500).attr("d", area);
						svg.selectAll(".vlines").transition().duration(500).attr("x1",tW).attr("x2", tW);			
						svg.selectAll(".hlines").transition().duration(500).attr("y1",tH).attr("y2",tH);						
						svg.selectAll(".vlabels").selectAll("text").transition().duration(500)
							.attr("transform",function(d,i){ return "translate(-10,"+(tH(d)-14)+")rotate(-90)";});	
						//update the statistics rect for distribution graph.
						if(type=="dist"){
							svg.select(".stat").select(".count")
								.text(function(d){ 
									var sumseg = data.dP[p][2]; 
									var sum = d3.sum(data.dP.map(function(s){ return s[2];})); 
									return "Count: " +toComma(sumseg)+" / "+toComma(sum)+" ( "+Math.round(100*sumseg/sum)+" % )";
								});
							svg.select(".stat").select(".mean").text(function(d){ return "Mean: " +data.dP[p][1];});
						}
					}
					function transitionOut(type){
						var maxT = d3.max(data[type].map(function(d){ return d3.sum(d); }));
						function tW(d){ return x(d*(data[type].length - 1)/50); }
						function tH(d){ return y(d*maxT/50); }
						var x = d3.scale.linear().domain([0, data[type].length - 1]).range([0, width]);
						var y = d3.scale.linear().domain([0, maxT]).range([height, 0]);
						var area = d3.svg.area().x(function(d) { return x(d.x); })
							.y0(function(d) { return y(d.y0); })
							.y1(function(d) { return y(d.y0 + d.y); })
							.interpolate("basis");
						var layers = d3.layout.stack().offset("zero")(data.dP.map(function(d,i){ return getPoints(data[type], i);}));
						// transition the lines, areas, and labels.
						var svg = d3.select("#"+id).select("."+type);		
						svg.selectAll("path").data(layers).transition().duration(500).attr("d", area);			
						svg.selectAll(".vlines").transition().duration(500).attr("x1",tW).attr("x2", tW);			
						svg.selectAll(".hlines").transition().duration(500).attr("y1",tH).attr("y2",tH);			
						svg.selectAll(".vlabels").selectAll("text").transition().duration(500)
							.attr("transform",function(d,i){ return "translate(-10,"+(tH(d)-14)+")rotate(-90)";});	
						// for distribution graph, update the statistics rect.
						if(type=="dist"){
							svg.select(".stat").select(".count")
								.text(function(d){ 
									var sum = d3.sum(data.dP.map(function(s){ return s[2];})); 
									return "Count: " +toComma(sum)+" / "+toComma(sum)+" ( 100 % )";
								});
							svg.select(".stat").select(".mean").text(function(d){ return "Mean: " +data.mean;});
						}
					}
					function mouseoverLegend(_,p){	
						transitionIn("dist", p);
						transitionIn("quant", p);
					}
					function mouseoutLegend(){	
						transitionOut("dist");
						transitionOut("quant");
					}
					// add title.
					d3.select("#"+id).append("h3").text(data.title);
					// add svg and set attributes for distribution.
					d3.select("#"+id).append("svg").attr("width",width+2*margin).attr("height",height+2*margin)
						.append("g").attr("transform","translate("+margin+","+margin+")").attr("class","dist");
					//add svg and set attributes for quantil.
					d3.select("#"+id).append("svg").attr("width",width+2*margin).attr("height",height+2*margin)
						.append("g").attr("transform","translate("+margin+","+margin+")").attr("class","quant");
					// Draw the two graphs.
					draw("dist");
					draw("quant");
					// draw legends.
					var legRow = d3.select("#"+id).append("div").attr("class","legend")
						.append("table").selectAll("tr").data(data.dP).enter().append("tr").append("td");
					legRow.append("div").style("background",function(d,i){ return colors[i];})
						.on("mouseover",mouseoverLegend).on("mouseout",mouseoutLegend).style("cursor","pointer");
					legRow.append("span").text(function(d){ return d[0];})
						.on("mouseover",mouseoverLegend).on("mouseout",mouseoutLegend).style("cursor","pointer");	
				}
				function drawAll(data, id){
					var seg = d3.select("#"+id).selectAll("div").data(d3.range(data.length)).enter()
						.append("div").attr("id",function(d,i){ return "segment"+i;}).attr("class","distquantdiv");
					d3.range(data.length).forEach(function(d,i){ distQuant(that.dqData[i], "segment"+i );});
				}
				drawAll(this.dqData, "contentDiv");
			}
		},
		template: utils.template(function(){/*
			<style scoped>
				#contentDiv{
					width:100%;
					margin-top:50px;
					overflow:hidden;
				}
				path{
					fill-opacity:0.8;
					stroke-opacity:0;
				}
				.vlines, .hlines{
					stroke:rgb(150,148,109);
					shape-rendering:crispEdges;
					stroke-width:1px;
					stroke-opacity:0.3;
				}
				.hlabels line, .vlabels line{
					stroke:rgb(150,148,109);
					shape-rendering:crispEdges;
					stroke-width:1px;
					stroke-opacity:0.7;
				}
				.hlabels text, .vlabels text{
					color:rgb(150,148,109);
					font-size:12px;
				}
				body{
					width:1150px;
					margin:10px auto;
				}
				svg{
					display:inline;
					float:left;
				}
				.legend{
					display:inline-block;
					margin:10px;
					margin-top:30px;
					margin-left:0;
					max-height:280px;
					min-width:190px;
					overflow:auto;
				}
				.legend table{
					border-collapse:collapse;
					border-spacing:0;
				}
				.legend tr, .legend td, .legend div{
					margin:0;
					padding:0;
				}
				.legend div{
					width:20px;
					height:20px;
					float: left;
				}
				.legend span{
					padding: 0 5px;
					margin:0
				}
				.legend tr:hover{
					background:silver;
				}
				.distquantdiv{
					clear:both;
					overflow:hidden;
				}
				.distquantdiv h3{
					padding-left: 40px;
					margin-bottom:0;
				}
				.stat{
					font-size:12px;
				}
			</style>
			<div id="contentDiv"></div>
		*/})
	})
})