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
'img/bg11.jpg','img/bg12.jpg','img/bg13.jpg','img/bg14.jpg','img/bg15.jpg','img/bg16.jpg','img/bg17.jpg','img/bg18.jpg','img/bg19.jpg','img/bg20.jpg',
'img/bg21.jpg','img/bg22.jpg','img/bg23.jpg','img/bg24.jpg','img/bg25.jpg','img/bg26.jpg','img/bg27.jpg','img/bg28.jpg','img/bg29.jpg','img/bg30.jpg',
'img/bg31.jpg','img/bg32.jpg','img/bg33.jpg','img/bg34.jpg',
'img/p1_1.png','img/p1_2.png','img/p1_3.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png',
'img/p4_1.png',
'img/p5_1.png','img/p5_2.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png',
'img/p7_1.png','img/p7_2.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png',
'img/p9_1.png','img/p9_2.png',
'img/p10_1.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png','img/p11_4.png',
'img/p12_1.png','img/p12_2.png',
'img/p13_1.png','img/p13_2.png','img/p13_3.png',
'img/p14_1.png','img/p14_2.png',
'img/p15_1.png','img/p15_2.png',
'img/p16_1.png','img/p16_2.png',
'img/p17_1.png',
'img/p18_1.png','img/p18_2.png','img/p18_3.png',
'img/p19_1.png','img/p19_2.png',
'img/p20_1.png','img/p20_2.png',
'img/p21_1.png',
'img/p22_1.png','img/p22_2.png',
'img/p23_1.png','img/p23_2.png',
'img/p24_1.png','img/p24_2.png',
'img/p25_1.png',
'img/p26_1.png','img/p26_2.png',
'img/p27_1.png','img/p27_2.png','img/p27_3.png','img/p27_4.png','img/p27_5.png','img/p27_6.png',
'img/p28_1.png','img/p28_2.png',
'img/p29_1.png','img/p29_2.png',
'img/p30_1.png','img/p30_2.png',
'img/p31_1.png','img/p31_2.png',
'img/p32_1.png','img/p32_2.png',
'img/p33_1.png','img/p33_2.png','img/p33_3.png','img/p33_4.png','img/p33_5.png',
'img/p34_1.png','img/p34_2.png',
'img/music2.png','img/arrow.png','img/next.png'
]
loading(loadRES, function(){


	var mySwiper = new Swiper('#swiper1', {
		observer: true,
		// noSwiping : true,
		direction: 'horizontal',
		loop: false,
		hashnav: true,
		// effect:'coverflow',
		hashnavWatchState: true,
		// pagination : '.swiper-pagination',
		// paginationType : 'progress',
		onSlideChangeEnd: function (swiper) {
			console.log(swiper.activeIndex)
			//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
			$('#swiper1 .swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
			if (swiper.activeIndex == 33) {
				$('.resize').hide();
			} else {
				$('.resize').show();
			}
		}
	})
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	//链接
	$('.b').on('click',function(){location.hash = "#slide1"});
	// 分享
	$('.swiper-slide21 .swiper21_9').on('click', function () {$('.share-box').removeClass('hide')});
	// 关闭
	$('.share-box').on('click',function(){$('.share-box').addClass('hide')});

});

