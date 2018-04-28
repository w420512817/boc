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

// 链接
$('.swiper-slide5 .swiper5_4').on('click',function(){window.location.href="http://mp.weixin.qq.com/s/zqAmUJ-QnV2Ch7Y_boQ23A";})
$('.swiper-slide11 .swiper11_3').on('click',function(){window.location.href="http://mp.weixin.qq.com/s?__biz=MjM5NjU5MDUyMg==&mid=500805802&idx=1&sn=286205e014c57b0d24b9990bd47b4662&chksm=3ecbf67f09bc7f69f8f3928750db43e2ada537238312d76c0b2bd9fe186281d26b38616dfcc2#rd";})

var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png','img/p7_5.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png','img/p8_6.png','img/p8_7.png','img/p8_8.png','img/p8_9.png','img/p8_10.png','img/p8_11.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png','img/p9_4.png','img/p9_5.png','img/p9_6.png','img/p9_7.png',
'img/p10_1.png','img/p10_2.png','img/p10_3.png','img/p10_4.png','img/p10_5.png','img/p10_6.png','img/p10_7.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png','img/p11_4.png',
'img/p12_1.png','img/p12_2.png','img/p12_3.png','img/p12_4.png','img/p12_5.png','img/p12_6.png','img/p12_7.png',
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
			if (swiper.activeIndex == 11) {
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