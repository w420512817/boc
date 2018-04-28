function loading(imgArr, callback) {
	if (imgArr.constructor === Array && imgArr.length > 0) {
		var imgAmount = imgArr.length,
			loadAmount = 0,
			percent;
		for (var i = 0; i < imgAmount; i++) {
			var img = new Image();
			img.src = imgArr[i];
			if (img.complete) {
				_update();
				continue;
			}
			img.onload = function() {
				_update();
			}
		}
	} else {
		alert("载入图片资源出错喽");
	}

	function _update() {
		loadAmount++;
		percent = Math.round(loadAmount * 100 / imgAmount);
		$("#load-progress").text(percent);
		if (percent == 100 && callback) {
			$(".loading").remove();
			callback();
		}
	}
}



var loadRES = ['img/boc.png','img/img01.png','img/img02.png','img/img03.png','img/img04.png','img/img05.png','img/img08.png','img/img06.png','img/img07.png','img/img14.png','img/img15.png']
loading(loadRES, function(){
	var windowWidth = $(window).width(),
		windowHeight = $(window).height(),
		$body = $("body");
	if (windowWidth > 640) {
		$body.height(windowHeight).width(windowHeight * 320 / 504);
	} else {
		$body.height(windowHeight);
	}

	var mySwiper = new Swiper ('.swiper-container', {
		direction: 'vertical',
		loop : false,
		noSwiping:true,
		hashnav:true,
		hashnavWatchState:true,
		onSlideChangeEnd: function(swiper){
	       	if(swiper.activeIndex == 2){
	       		$('.resize').hide();
	       	}else{
	       		$('.resize').show();
	       	}
	  	}
	});


	$('.slide02').on('swipeup',function(){
		window.location.href="./index_slide03.html"
	});


});

