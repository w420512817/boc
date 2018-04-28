//禁止窗口的默认滑动
// document.ontouchmove = function (e) {
// 	e.preventDefault();
// }
$("body").bind("touchmove",function(event){event.preventDefault();});


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

// 长图
$('.swiper2_2').on('click',function(){$('#bgl-1').fadeIn();$("body").unbind("touchmove");});
$('.swiper2_3').on('click',function(){$('#bgl-2').fadeIn();$("body").unbind("touchmove");});
$('.swiper2_4').on('click',function(){$('#bgl-3').fadeIn();$("body").unbind("touchmove");});
$('.swiper2_5').on('click',function(){$('#bgl-4').fadeIn();$("body").unbind("touchmove");});

//返回
$('.back').on('click', function () {
	$('.pagel').fadeOut();
	location.hash = "#slide2";
	$("body").bind("touchmove",function(event){event.preventDefault();});
})

var loadRES = ['img/icon/boc.png',
'img/p1.png','img/p2.png','img/p3.png','img/p4.png','img/p5.png',
'img/bg0_1.jpg','img/bg0_2.jpg','img/bg0_3.jpg',
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg',
'img/bgl1.jpg','img/bgl2.jpg','img/bgl3.jpg','img/bgl4.jpg',
'img/music.png','img/click.png','img/next.png',
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
			if (swiper.activeIndex == 5) {
				$('.resize').hide();
			} else {
				$('.resize').show();
			}
		}
	})
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	// 分享
	// $('.swiper-slide21 .swiper21_9').on('click', function () {
	// 	$('.share-box').removeClass('hide');
	// });

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