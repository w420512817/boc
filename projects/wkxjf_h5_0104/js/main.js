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
'img/bg1.png','img/bg2.png','img/bg3.png','img/bg4.png','img/bg5.png','img/bg6.png','img/bg7.png','img/bg8.png','img/bg9.png','img/bg10.png',
'img/p0_1.png','img/p0_2.png','img/p0_3.png','img/p0_4.png','img/p0_5.png','img/p0_6.png','img/p0_7.png','img/p0_8.png','img/p0_9.png','img/p0_10.png',
'img/p0_11.png','img/p0_12.png','img/p0_13.png','img/p0_14.png','img/p0_15.png','img/p0_16.png','img/p0_17.png','img/p0_18.png','img/p0_19.png','img/p0_20.png','img/p0_21.png','img/p0_22.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_10.png',
'img/p1_11.png','img/p1_12.png','img/p1_13.png','img/p1_14.png','img/p1_15.png','img/p1_16.png','img/p1_17.png','img/p1_18.png','img/p1_19.png','img/p1_20.png',
'img/p1_21.png','img/p1_22.png','img/p1_23.png','img/p1_24.png','img/p1_25.png','img/p1_27.png','img/p1_29.png','img/p1_30.png',
'img/p1_32.png','img/p1_33.png','img/p1_34.png','img/p1_35.png','img/p1_36.png','img/p1_37.png','img/p1_38.png','img/p1_39.png','img/p1_40.png',
'img/p1_41.png','img/p1_42.png','img/p1_43.png','img/p1_44.png','img/p1_45.png','img/p1_46.png','img/p1_47.png','img/p1_48.png','img/p1_49.png','img/p1_50.png',
'img/p1_51.png','img/p1_52.png','img/p1_53.png',
'img/music2.png','img/next.png'
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
	// $('.b').on('click',function(){location.hash = "#slide1"});
	// 分享
	// $('.swiper-slide21 .swiper21_9').on('click', function () {$('.share-box').removeClass('hide')});
	// 关闭
	// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});

});

