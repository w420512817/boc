//禁止窗口的默认滑动
// document.ontouchmove = function (e) {
// 	e.preventDefault();
// }
// $("body").bind("touchmove",function(event){event.preventDefault();});


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
// playClicked();

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

// 提示
$('.tipbox').on('click',function(){
	// $('body').css('overflow','auto');
	// $("body").unbind("touchmove");
	$('.tipbox').fadeOut();
	$('.page01').addClass('animate');
});

var loadRES = ['img/icon/boc.png',
'img/img2/bg1.jpg','img/img2/bg2.jpg','img/img2/bg3.jpg','img/img2/bg4.jpg','img/img2/bg5.jpg',
'img/img2/p1_1.png','img/img2/p1_2.png','img/img2/p1_3.png',
'img/img2/p2_1.png','img/img2/p2_2.png','img/img2/p2_3.png','img/img2/p2_4.png',
'img/img2/p3_1.png','img/img2/p3_2.png','img/img2/p3_3.png','img/img2/p3_4.png','img/img2/p3_5.png','img/img2/p3_6.png','img/img2/p3_7.png','img/img2/p3_8.png','img/img2/p3_9.png','img/img2/p3_10.png','img/img2/p3_11.png','img/img2/p3_12.png','img/img2/p3_13.png',
'img/img2/p4_1.png','img/img2/p4_2.png','img/img2/p4_3.png',
'img/img2/p5_1.png','img/img2/p5_2.png','img/img2/p5_3.png','img/img2/p5_4.png','img/img2/p5_5.png','img/img2/p5_6.png','img/img2/p5_7.png','img/img2/p5_8.png','img/img2/p5_9.png','img/img2/p5_10.png',
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
		console.log(windowHeight)



	var _t1=setTimeout(function(){
		$('.tipbox').fadeOut();
		$('.page01').addClass('animate');
		clearTimeout(_t1);
	},2000);

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
		if(_top>_top5){
			$('.resize').addClass('hide');
		}else{
			$('.resize').removeClass('hide');
		}
		
	})

});

