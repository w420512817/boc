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
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png','img/p4_7.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png','img/p6_5.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png','img/p7_5.png','img/p7_6.png','img/p7_7.png','img/p7_8.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png','img/p9_4.png','img/p9_5.png',
'img/p10_1.png','img/p10_2.png','img/p10_3.png','img/p10_4.png','img/p10_5.png','img/p10_6.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png','img/p11_4.png','img/p11_5.png','img/p11_6.png','img/p11_7.png',
'img/p12_1.png','img/p12_2.png','img/p12_3.png','img/p12_4.png',
'img/p13_1.png','img/p13_2.png','img/p13_3.png','img/p13_4.png',
'img/p14_1.png','img/p14_2.png','img/p14_3.png','img/p14_4.png','img/p14_5.png','img/p14_6.png','img/p14_7.png','img/p14_8.png','img/p14_9.png','img/p14_10.png',
'img/p15_1.png','img/p15_2.png','img/p15_3.png','img/p15_4.png','img/p15_5.png','img/p15_6.png',
'img/p16_1.png','img/p16_2.png','img/p16_3.png','img/p16_4.png','img/p16_5.png','img/p16_6.png','img/p16_7.png','img/p16_8.png',
'img/music2.png','img/next.png','img/bg1.jpg'
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
			if (swiper.activeIndex == 15) {
				$('.resize').hide();
			} else {
				$('.resize').show();
			}
		}
	})
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	// 首页
	$('.swiper-slide16 .swiper16_7').on('click', function () {
		window.location.href = "http://zh.youpengchina.com/customize/reg_index.php?wid=sbh&id=89";
		// location.hash = "#slide1";
	});
	// 分享
	$('.swiper-slide16 .swiper16_8').on('click', function () {
		$('.share-box').removeClass('hide');
	});

});


//  <div class="page slide-page page01 " nextHash="page02" prevHash="page00"></div>

// $('.slide-page ').on('swipeup',function(e){
// 	// 向下翻页
// 	if($(this).attr('nextHash') != ''){
		
// 			loadPage($(this).attr('nextHash'))
// 	}
// }).on('swipedown',function(e){
// 	// 向上翻页
// 	if($(this).attr('prevHash') != ''){
		
// 			loadPage($(this).attr('prevHash'))
// 	}
// });