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



var loadRES = ['img/boc.png','img/p01-01.jpg','img/p02-01.jpg','img/p02-02.jpg','img/p02-03.jpg','img/p03.jpg','img/p04.jpg','img/p04-01.png','img/p04-02.png','img/p05.jpg','img/p05-01.jpg','img/p05-01_blank.jpg','img/p05-02.jpg','img/p05-02_blank.jpg','img/p05-03.jpg','img/p05-03_blank.jpg','img/p05-04.jpg','img/p05-04_blank.jpg','img/p05-05.jpg','img/p05-05_blank.jpg','img/p05-blank.png','img/p06.jpg','img/p07.jpg','img/p08.jpg','img/p09.jpg','img/p09-01.png','img/p09-02.png','img/p09-03.png','img/p09-04.png','img/figure01.png','img/figure02.png','img/figure03.png','img/img-icon01.png','img/img-icon02.png','img/img-icon03.png','img/img-icon04.png','img/img-icon05.png','img/p02-04.jpg','img/p02-05.jpg','img/p02-06.jpg','img/p02-07.jpg','img/figure04.png','img/figure05.png','img/figure06.png'
];

loading(loadRES,function(){

	var windowWidth = $(window).width(),
		windowHeight = $(window).height(),
		$body = $("body");
	if (windowWidth > 640) {
		$body.height(windowHeight).width(windowHeight * 320 / 504);
	} else {
		$body.height(windowHeight);
		$('.container').width(windowWidth);
	}

	


	var _top01 = $('.animate01').position().top - windowHeight,
		_top02 = $('.animate02').position().top - windowHeight,
		_top03 = $('.animate03').position().top - windowHeight,
		_top04 = $('.animate04').position().top - windowHeight;

	var _step01 = _top01 + $('.animate01').height(),	// 第2个动画
		_step02 = _top02 + $('.mod01').position().top,						// 地产
		_step03 = _top02 + $('.mod02').height(),			// 物业
		_step04 = _top02 + $('.mod03').height(),			// 酒店
		_step05 = _top02 + $('.mod04').height(),			// 商业
		_step06 = _top02 + $('.mod05').height(),			// 主题乐园
		_step07 = _top03 + $('.icon-01').height(),
		_step08 = _top03 + $('.icon-02').height(),
		_step09 = _top03 + $('.icon-03').height(),
		_step10 = _top03 + $('.icon-04').height(),
		_step11 = _top04 + $('.animate04 .list').height(); 					// 第一个动画



	$(document).scroll(function(){
		var _top = $(window).scrollTop();
		if(_top>_step11){
			if(!$('.animate04').hasClass('animate')){
				$('.animate04').addClass('animate');
			}
		}
		if(_top>_step01){
			if(!$('.animate01').hasClass('animate')){
				$('.animate01').addClass('animate');
			}
		}
		if(_top>_step02){
			if(!$('.mod01').hasClass('animate')){
				$('.animate01').on('webkitAnimationEnd animationend', function () {
					$('.mod01').addClass('animate');
				});
			}
		}
		if(_top>_step03){
			if(!$('.mod02').hasClass('animate')){
				// $('.mod01').addClass('animate');
				$('.mod01').on('webkitAnimationEnd animationend', function () {
					$('.mod02').addClass('animate');
				});
			}
		}
		if(_top>_step04){
			if(!$('.mod03').hasClass('animate')){
				$('.mod02').on('webkitAnimationEnd animationend', function () {
					$('.mod03').addClass('animate');
				});
			}
		}
		if(_top>_step05){
			if(!$('.mod04').hasClass('animate')){
				$('.mod03').on('webkitAnimationEnd animationend', function () {
					$('.mod04').addClass('animate');
				});
			}
		}
		if(_top>_step06){
			if(!$('.mod05').hasClass('animate')){
				$('.mod04').on('webkitAnimationEnd animationend', function () {
					$('.mod05').addClass('animate');
				});
			}
		}
		if(_top>_step07){
			if(!$('.icon-01').hasClass('animate')){
				$('.icon-01').addClass('animate');
			}
		}
		if(_top>_step08){
			if(!$('.icon-02').hasClass('animate')){
				$('.icon-01').on('webkitAnimationEnd animationend', function () {
					$('.icon-02').addClass('animate');
				});
			}
		}
		if(_top>_step09){
			if(!$('.icon-03').hasClass('animate')){
				$('.icon-02').on('webkitAnimationEnd animationend', function () {
					$('.icon-03').addClass('animate');
				});
			}
		}
		if(_top>_step10){
			if(!$('.icon-04').hasClass('animate')){
				$('.icon-03').on('webkitAnimationEnd animationend', function () {
					$('.icon-04').addClass('animate');
				});
			}
		}
	})


});
