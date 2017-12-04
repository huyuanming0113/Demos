// JavaScript Document
$(document).ready(function() {
	$("body").delegate("#menu>ul>li","mouseenter",function(){
		$(this).parent().siblings().children(".arrow_top").fadeOut(250).css("display","none");
		$(this).parent().siblings().children(".arrow_top").children('ul').children('li').children('div.arrow_left').fadeOut(250).css("display","none");
		if($(this).next().length !== 0) {
			$(this).next().fadeIn(250).css("display","block");
		}
	}, function(e) {
		if ($(this).siblings('div.arrow_top').css('display') === 'block') {
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			var divX1 = ($(this).siblings('.arrow_top').offset().left);
			var divX2 = ($(this).siblings('.arrow_top').width()) + divX1;
			var divY1 = ($(this).siblings('.arrow_top').offset().top);
			var divY2 = ($(this).siblings('.arrow_top').height()) + divY1;
			//alert("当前鼠标位置(" + mouseX + ", " + mouseY + ") <br> " + divX1 + " " + divX2 + " " + divY1 + " " + divY2);
			
			if (!((mouseX >= divX1) && (mouseX <= divX2) && (mouseY >= divY1) && (mouseY <= divY2))) {
				$(this).siblings('div.arrow_top').css('display', "none");
				$(this).siblings('div.arrow_top').children('ul').children('li').children('div.arrow_left').css('display', 'none');
			}
			
		}
		
	});
	/*
	$('#menu>ul.menu>li>a').mouseenter(function() {
		$(this).parent().siblings().children(".arrow_top").fadeOut(250).css("display","none");
		$(this).parent().siblings().children(".arrow_top").children('ul').children('li').children('div.arrow_left').fadeOut(250).css("display","none");
		if($(this).next().length != 0) {
			$(this).next().fadeIn(250).css("display","block");
		}
	});
	*/
	$('#menu>ul.menu>li>div>ul>li>a').unbind().hover(function() {
		$(this).parent().siblings().children(".arrow_left").fadeOut(250).css("display","none");
		if($(this).next().length !== 0) {
			$(this).next().fadeIn(250).css("display","block");
		}
	});
	/*
	$('#menu>ul.menu>li>a').mouseleave(function(e) {
		if ($(this).siblings('div.arrow_top').css('display') === 'block') {
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			var divX1 = ($(this).siblings('.arrow_top').offset().left);
			var divX2 = ($(this).siblings('.arrow_top').width()) + divX1;
			var divY1 = ($(this).siblings('.arrow_top').offset().top);
			var divY2 = ($(this).siblings('.arrow_top').height()) + divY1;
			//alert("当前鼠标位置(" + mouseX + ", " + mouseY + ") <br> " + divX1 + " " + divX2 + " " + divY1 + " " + divY2);
			
			if (!((mouseX >= divX1) && (mouseX <= divX2) && (mouseY >= divY1) && (mouseY <= divY2))) {
				$(this).siblings('div.arrow_top').css('display', "none");
				$(this).siblings('div.arrow_top').children('ul').children('li').children('div.arrow_left').css('display', 'none');
			}
			
		}
		
	});
	*/
	$('#menu>ul.menu>li>div.arrow_top').unbind().hover(function(){}, function(e) {
		if ($(this).children('ul').children('li').children('div.arrow_left').css('display') === 'block') {
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			var divX1 = ($(this).children('ul').children('li').children('div.arrow_left').offset().left);
			var divX2 = ($(this).children('ul').children('li').children('div.arrow_left').width()) + divX1;
			var divY1 = ($(this).children('ul').children('li').children('div.arrow_left').offset().top);
			var divY2 = ($(this).children('ul').children('li').children('div.arrow_left').height()) + divY1;
			//alert("当前鼠标位置(" + mouseX + ", " + mouseY + ") <br> " + divX1 + " " + divX2 + " " + divY1 + " " + divY2);
			
			if (!((mouseX >= divX1) && (mouseX <= divX2) && (mouseY >= divY1) && (mouseY <= divY2))) {
				$(this).children('ul').children('li').children('div.arrow_left').css('display', "none");
				$(this).css('display', 'none');
			}
			
		} else {
			$(this).css('display', 'none');
		}
	});
	
});