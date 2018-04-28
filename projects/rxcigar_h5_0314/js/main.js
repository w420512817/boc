//禁止窗口的默认滑动
document.ontouchmove = function (e) {
	e.preventDefault();
}
// $("body").bind("touchmove",function(event){event.preventDefault();});
// $("body").unbind("touchmove");

$('body').height($(window).height())

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

// 提交
// $('#form-submit').on('click', function () {
// 	var _check = true;
// 	if ($('#info-phone').val() == '') {
// 		dialogueTips('请输入电话……');
// 		_check = false;
// 	}
// 	if ($('#info-name').val() == '') {
// 		dialogueTips('请输入姓名……');
// 		_check = false;
// 	}

// 	if (_check) {
// 		loadPage('welcome2');
// 	}
// });


var loadRES = ['img/icon/boc.png',
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg','img/bg5.jpg','img/bg6.jpg','img/bg7.jpg','img/bg8.jpg','img/bg9.jpg','img/bg10.jpg',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_5.png',
'img/p2_1.png','img/p2_2.png',
'img/p3_1.png',
'img/p4_1.png',
'img/p5_1.png',
'img/p6_1.png','img/p6_2.png',
'img/p7_1.png','img/p7_2.png',
'img/p8_1.png','img/p8_2.png',
'img/p9_1.png','img/p9_2.png',
'img/p10_1.png','img/p10_2.png','img/p10_3.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png','img/p11_4.png',
'img/p12_1.png','img/p12_2.png','img/p12_3.png',
'img/music2.png','img/arrow.png','img/next.png',
]
loading(loadRES, function(){


	var mySwiper = new Swiper('#swiper1', {
		observer: true,
		// noSwiping : true,
		direction: 'vertical',
		loop: false,
		hashnav: true,
		// effect:'fade',
		hashnavWatchState: true,
		onSlideChangeEnd: function (swiper) {
			console.log(swiper.activeIndex)
			//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
			$('#swiper1 .swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
			if (swiper.activeIndex == 11) {
				$('.resize').hide();
			} else {
				$('.resize').show();
			}
		}
	})
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	//链接
	$('.swiper11_3').on('click',function(){window.location.href="tel:0575-83396666"});
	$('.swiper11_4').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=29.565404,120.832471&title=官河南路与杨港路交叉口&content=浙江省绍兴市嵊州市杨港路(嵊州国际会展中心西北)&output=html"});
	// 分享
	// $('.swiper-slide21 .swiper21_9').on('click', function () {$('.share-box').removeClass('hide')});
	// 关闭
	// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});

});

