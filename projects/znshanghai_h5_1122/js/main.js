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
				$('.play-btn').show();
			});
			callback();
		}
	}
}

// 一键导航
$('.swiper-slide14 .swiper14_6').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.87987,120.72708&title=中南闻荷府&content=嘉兴市秀洲区王江泾运河东路&output=html"});

var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png','img/p3_8.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png',

'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png','img/p7_5.png','img/p7_6.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png','img/p9_4.png','img/p9_5.png',
'img/p10_1.png','img/p10_2.png','img/p10_3.png','img/p10_4.png','img/p10_5.png','img/p10_6.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png','img/p11_4.png','img/p11_5.png',
'img/p12_1.png','img/p12_2.png','img/p12_3.png',
'img/p13_1.png','img/p13_2.png','img/p13_3.png','img/p13_4.png','img/p13_5.png','img/p13_6.png',
'img/p14_1.png','img/p14_2.png','img/p14_3.png','img/p14_4.png','img/p14_5.png','img/p14_6.png',
'img/music2.png','img/next.png'
]


loading(loadRES, function(){

	
var mySwiper = new Swiper('#swiper1', {
	observer: true,
	// noSwiping : true,
	direction: 'vertical',
	loop: false,
	hashnav: true,
	effect:'cube',
	hashnavWatchState: true,
	// init: false,
	onSlideChangeEnd: function (swiper) {
		console.log(swiper.activeIndex)
		//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
		$('#swiper1 .swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
			if (swiper.activeIndex == 13) {
				$('.resize').hide();
			} else {
				$('.resize').show();
			}
	}
})
$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	
});
