//禁止窗口的默认滑动
// document.ontouchmove = function (e) {
// 	e.preventDefault();
// }
// $("body").bind("touchmove",function(event){event.preventDefault();});
// $("body").unbind("touchmove");

// $('body').height($(window).height())

//music
document.addEventListener("WeixinJSBridgeReady", function () {
	audio_player.play();
}, false);

function playClicked() {
	if (audio_player.paused) {
		audio_player.play();
		$(".music").removeClass("off").addClass("on")
	} else {
		audio_player.pause();
		$(".music").removeClass("on").addClass("off")
	}
}
playClicked();

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
			$(".loading").fadeOut(function() {
				$(this).remove();
			});
			callback();
		}
	}
}

function dialogueTips(txt) {
	var _html = '<div class="dialogue-tips" id="J_error">' + txt + '</div>';
	if ($('.dialogue-tips').size() > 0) {
		$('.dialogue-tips').remove();
		clearTimeout(t);
	}
	$('body').append(_html);
	t = setTimeout(function () {
		$('#J_error').remove();
		clearTimeout(t);
	}, 1500);
}


var loadRES = ['img/icon/boc.png',
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg','img/bg5.jpg','img/bg6.jpg','img/bg7.jpg','img/bg8.jpg','img/bg9.jpg','img/bg10.jpg',
'img/bg11.jpg','img/bg12.jpg','img/bg13.jpg','img/bg14.jpg','img/bg15.jpg','img/bg16.jpg','img/bg17.jpg',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png',
'img/p2_1.png','img/p2_2.png',
'img/p3_1.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png','img/p4_7.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png',
'img/p6_1.png','img/p6_3.png',
'img/p7_1.png','img/p7_2.png',
'img/p8_1.png','img/p8_2.png','img/p8_4.png',
'img/p9_1.png','img/p9_3.png',
'img/p10_1.png','img/p10_2.png',
'img/p11_1.png','img/p11_2.png',
'img/p12_1.png','img/p12_2.png',
'img/p13_1.png','img/p13_2.png','img/p13_3.png','img/p13_4.png',
'img/p14_1.png','img/p14_2.png','img/p14_3.png',
'img/p15_1.png','img/p15_2.png','img/p15_3.png',
'img/p16_1.png','img/p16_2.png','img/p16_3.png',
'img/p17_1.png',
'img/music2.png','img/next.png'
]
loading(loadRES, function(){

	var windowWidth = $(window).width(),
		windowHeight = $(window).height(),
		$body = $("body");
	if (windowWidth > 640) {
		$body.height(windowHeight).width(windowHeight * 320 / 504);
	} else {
		$body.height(windowHeight);
		$('.pagelong').width(windowWidth);
	}

	var _top2 = $('.page02').position().top-windowHeight,
		_top3 = $('.page03').position().top-windowHeight,
		_top4 = $('.page04').position().top-windowHeight,
		_top5 = $('.page05').position().top-windowHeight;
		_top6 = $('.page06').position().top-windowHeight;
		_top7 = $('.page07').position().top-windowHeight;
		_top8 = $('.page08').position().top-windowHeight;
		_top9 = $('.page09').position().top-windowHeight;
		_top10 = $('.page10').position().top-windowHeight;
		_top11 = $('.page11').position().top-windowHeight;
		_top12 = $('.page12').position().top-windowHeight;
		_top13 = $('.page13').position().top-windowHeight;
		_top14 = $('.page14').position().top-windowHeight;
		_top15 = $('.page15').position().top-windowHeight;
		_top16 = $('.page16').position().top-windowHeight;
		_top17 = $('.page17').position().top-windowHeight;
		console.log(windowHeight)

	// var _step01 = _top01 + $('.animate01').height();	// 第2个动画
	// 	_step02 = _top02 + $('.mod01').position().top,						// 地产
	// 	_step03 = _top02 + $('.mod02').height(),			// 物业
	// 	_step04 = _top02 + $('.mod03').height(),			// 酒店
	// 	_step05 = _top02 + $('.mod04').height(),			// 商业
	// 	_step06 = _top02 + $('.mod05').height(),			// 主题乐园
	// 	_step07 = _top03 + $('.icon-01').height(),
	// 	_step08 = _top03 + $('.icon-02').height(),
	// 	_step09 = _top03 + $('.icon-03').height(),
	// 	_step10 = _top03 + $('.icon-04').height(),
	// 	_step11 = _top04 + $('.animate04 .list').height(); 					// 第一个动画



	$(document).scroll(function(){
		var _top = $(window).scrollTop();
		console.log(_top)
		if(_top>_top2){
			if(!$('.page02').hasClass('animate')){
				$('.page02').addClass('animate');
			}
		}
		if(_top>_top3){
			if(!$('.page03').hasClass('animate')){
				$('.page03').addClass('animate');
			}
		}
		if(_top>_top4){
			if(!$('.page04').hasClass('animate')){
				$('.page04').addClass('animate');
			}
		}
		if(_top>_top5){
			if(!$('.page05').hasClass('animate')){
				$('.page05').addClass('animate');
			}
		}
		if(_top>_top6){
			if(!$('.page06').hasClass('animate')){
				$('.page06').addClass('animate');
			}
		}
		if(_top>_top7){
			if(!$('.page07').hasClass('animate')){
				$('.page07').addClass('animate');
			}
		}
		if(_top>_top8){
			if(!$('.page08').hasClass('animate')){
				$('.page08').addClass('animate');
			}
		}
		if(_top>_top9){
			if(!$('.page09').hasClass('animate')){
				$('.page09').addClass('animate');
			}
		}
		if(_top>_top10){
			if(!$('.page10').hasClass('animate')){
				$('.page10').addClass('animate');
			}
		}
		if(_top>_top11){
			if(!$('.page11').hasClass('animate')){
				$('.page11').addClass('animate');
			}
		}
		if(_top>_top12){
			if(!$('.page12').hasClass('animate')){
				$('.page12').addClass('animate');
			}
		}
		if(_top>_top13){
			if(!$('.page13').hasClass('animate')){
				$('.page13').addClass('animate');
			}
		}
		if(_top>_top14){
			if(!$('.page14').hasClass('animate')){
				$('.page14').addClass('animate');
			}
		}
		if(_top>_top15){
			if(!$('.page15').hasClass('animate')){
				$('.page15').addClass('animate');
			}
		}
		if(_top>_top16){
			if(!$('.page16').hasClass('animate')){
				$('.page16').addClass('animate');
			}
		}
		if(_top>_top17){
			if(!$('.page17').hasClass('animate')){
				$('.page17').addClass('animate');
			}
		}
		if(_top>_top17){
			$('.resize').addClass('hide');
		}else{
			$('.resize').removeClass('hide');
		}
		
	})

});

