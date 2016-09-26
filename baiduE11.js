/**
 * 
 */
$(document).ready(function(){
	$(".header0").css({"text-align":"center"});
	$(".header0 span").css({"float":"left"});
	/*两列相同*/
	var leftHeight=$(".left-height").height();
	var rightHeight=$(".right-height").height();
	if(leftHeight<rightHeight){
		$(".left-height").height(rightHeight);
	}else{
		$(".right-height").height(leftHeight).toggle();
	}
	
	$(window).resize(function(){
		leftHeight=$(".left-height").height();
		rightHeight=$(".right-height").height();
		var windowH=$(window).width();
		if(windowH < 1200){
			$(".left-height img").css({"width":"100%"});
			$(".left-height img").css({"height":"100%"});
			if(windowH < 993){
				$(".header0").css({"text-align":"center"});
				$(".header0 span").css({"float":"left"});
				$(".left-height img").css({"height":"auto"});
				$(".left-height img").css({"width":"auto"});
		
			}
		}
		
		var imgh=($("html").css("font-size"));
		$(".left-height img").css({"height":(rightHeight-4*(parseInt(imgh)))});
		
	})
	
	
	/***/
	var leftHeight0=$(".left-height0").height();
	var rightHeight0=$(".right-height0").height();
	if(leftHeight0<rightHeight0){
		$(".left-height0").height(rightHeight0);
	}else{
		$(".right-height0").height(leftHeight0);
	}
	/********/
	/*子元素成父元素一半*/
	var halfHeight=($(".half-height").parent().height())/2;
	$(".half-height").height(halfHeight);
	/********/
	/*使得图片高等于单元格高度
		/*module-content-col的padding*/
	
	
	
});
