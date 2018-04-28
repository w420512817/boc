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
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg','img/bg5.jpg','img/bg6.jpg','img/bg7.jpg','img/bg8.jpg','img/bg9.jpg','img/bg10.jpg',
'img/bg11.jpg','img/bg12.jpg','img/bg13.jpg','img/bg14.jpg','img/bg15.jpg','img/bg16.jpg','img/bg17.jpg','img/bg18.jpg','img/bg19.jpg','img/bg20.jpg',
'img/p0_2.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png',
'img/p3_1.png','img/p3_2.png',
'img/p4_1.png','img/p4_2.png',
'img/p5_1.png','img/p5_2.png',
'img/p6_1.png','img/p6_2.png',
'img/p7_1.png',
'img/p8_1.png',
'img/p9_1.png',
'img/p10_1.png',
'img/p11_1.png',
'img/p12_1.png',
'img/p13_1.png',
'img/p14_1.png',
'img/p15_1.png',
'img/p16_1.png',
'img/p17_1.png',
'img/p18_1.png',
'img/p19_1.png',
'img/p20_1.png',
'img/p21_1.png',
'img/p22_1.png',
'img/p23_1.png',
'img/p24_1.png',
'img/p25_1.png',
'img/p26_1.png',
'img/p27_1.png',
'img/p28_1.png','img/p28_2.png','img/p28_3.png',
'img/music2.png','img/next.png','img/prev.png',
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
			if (swiper.activeIndex == 27) {
				$('.resize').hide();
				$('.resize2').show();
			} 
			else if (swiper.activeIndex == 0||swiper.activeIndex == 1) {
				$('.resize').show();
				$('.resize2').hide();
			} 
			else {
				$('.resize').show();
				$('.resize2').show();
			}
			if(swiper.activeIndex == 0||swiper.activeIndex == 1||swiper.activeIndex == 2){
			// if(3<swiper.activeIndex < 28){
				$('.btn-back').hide();
			}else{
				$('.btn-back').show();
			}
			
		}
	})
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	// 提示
	$('.swiper0_1').on('click', function () {location.hash = "#slide1";});
	// 归心提示
	$('.swiper1_2').on('click', function () {$('.tip-box').removeClass('hide');});
	// 关闭
	$('.tip-close').on('click', function () {$('.tip-box').addClass('hide')});
	// 返回
	$('.btn-back').on('click',function(){location.hash="#slide2"})
	// 导航
	$('.swiper2_2').on('click', function () {location.hash = "#slide3";});
	$('.swiper2_3').on('click', function () {location.hash = "#slide6";});
	$('.swiper2_4').on('click', function () {location.hash = "#slide12";});
	$('.swiper2_5').on('click', function () {location.hash = "#slide18";});
	$('.swiper2_6').on('click', function () {location.hash = "#slide23";});
	$('.swiper2_7').on('click', function () {});
	
	// 分享
	// $('.swiper-slide21 .swiper21_9').on('click', function () {
	// 	$('.share-box').removeClass('hide');
	// });

});

