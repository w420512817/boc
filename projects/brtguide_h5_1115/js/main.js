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
var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_10.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_6.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png',

'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png','img/p7_5.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png','img/p9_4.png',
'img/p10_1.png','img/p10_2.png','img/p10_3.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png','img/p11_4.png',
'img/p12_1.png','img/p12_2.png','img/p12_3.png','img/p12_4.png',
'img/p13_1.png','img/p13_2.png','img/p13_3.png',
'img/p14_1.png','img/p14_2.png','img/p14_3.png',
'img/p15_1.png','img/p15_2.png','img/p15_3.png','img/p15_4.png',
'img/p16_1.png','img/p16_2.png','img/p16_3.png','img/p16_4.png','img/p16_5.png',
'img/p17_1.png','img/p17_2.png','img/p17_3.png','img/p17_4.png',
'img/p18_1.png','img/p18_2.png','img/p18_3.png',
'img/p19_1.png','img/p19_2.png','img/p19_3.png','img/p19_4.png',
'img/p20_1.png','img/p20_2.png','img/p20_3.png',
'img/p21_1.png','img/p21_2.png','img/p21_3.png','img/p21_4.png','img/p21_5.png','img/p21_6.png','img/p21_7.png','img/p21_8.png','img/p21_9.png','img/p21_10.png','img/p21_11.png','img/p21_12.png','img/p21_13.png','img/p21_14.png',
'img/music2.png','img/next.png',
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
			if (swiper.activeIndex == 21) {
				$('.resize').hide();
			} else {
				$('.resize').show();
			}
		}
	})
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	// 分享
	$('.swiper-slide21 .swiper21_9').on('click', function () {
		$('.share-box').removeClass('hide');
	});

});

