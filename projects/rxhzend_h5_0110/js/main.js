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
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png','img/p3_8.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png','img/p4_7.png','img/p4_8.png','img/p4_9.png','img/p4_10.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png','img/p7_5.png','img/p7_6.png','img/p7_7.png','img/p7_8.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png','img/p9_4.png','img/p9_5.png',
'img/p10_1.png','img/p10_2.png','img/p10_3.png','img/p10_4.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png','img/p11_4.png','img/p11_5.png','img/p11_6.png',
'img/p12_1.png','img/p12_2.png','img/p12_3.png','img/p12_4.png',
'img/p13_1.png','img/p13_2.png','img/p13_3.png','img/p13_4.png',
'img/p14_1.png','img/p14_2.png','img/p14_3.png','img/p14_4.png','img/p14_5.png',
'img/p15_1.png','img/p15_2.png','img/p15_3.png','img/p15_4.png','img/p15_5.png',
'img/p16_1.png','img/p16_2.png','img/p16_3.png','img/p16_4.png',
'img/p17_1.png','img/p17_2.png','img/p17_3.png','img/p17_4.png',
'img/p18_1.png','img/p18_2.png','img/p18_3.png','img/p18_4.png','img/p18_5.png',
'img/p19_1.png','img/p19_2.png','img/p19_3.png',
// 'img/p20_1.png','img/p20_2.png',
'img/music2.png','img/next.png','img/bg1.jpg','img/bg6.jpg','img/bg12.jpg','img/bg19.jpg'
]
loading(loadRES, function(){


	var mySwiper = new Swiper('#swiper1', {
		observer: true,
		// noSwiping : true,
		// direction: 'vertical',
		loop: false,
		hashnav: true,
		// effect:'fade',
		// effect:'cube',
		hashnavWatchState: true,
		onSlideChangeEnd: function (swiper) {
			console.log(swiper.activeIndex)
			//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
			$('#swiper1 .swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
			if (swiper.activeIndex == 18) {
				$('.resize').hide();
			} else {
				$('.resize').show();
			}
			if(swiper.activeIndex == 3){
				var _t1=setTimeout(function(){
				$('.swiper4_2').css('animation','qiehuan31 6s ease infinite both');
				$('.swiper4_3').css('animation','qiehuan32 6s ease infinite both');
				$('.swiper4_4').css('animation','qiehuan33 6s ease infinite both');
				$('.swiper4_7').css('animation','qiehuan21 4s ease infinite both');
				$('.swiper4_8').css('animation','qiehuan22 4s ease infinite both');
				$('.swiper4_9').css('animation','qiehuan21 4s ease infinite both');
				$('.swiper4_10').css('animation','qiehuan22 4s ease infinite both');
				clearTimeout(_t1);
			},2000);
			}
			if(swiper.activeIndex == 4){
				var _t2=setTimeout(function(){
					$('.swiper5_3').css('animation','qiehuan21 4s ease infinite both');
					$('.swiper5_4').css('animation','qiehuan22 4s ease infinite both');
					clearTimeout(_t2);
				},2000);
			}
			if(swiper.activeIndex == 6){
				var _t3=setTimeout(function(){
					$('.swiper7_4').css('animation','qiehuan21 4s ease infinite both');
					$('.swiper7_5').css('animation','qiehuan22 4s ease infinite both');
					clearTimeout(_t3);
				},2000);
			}
		}
	})
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	// if($('.swiper-slide4').hasClass('swiper-slide-active')){
	// 	var _t1=setTimeout(function(){
	// 		$('.swiper4_2').css('animation','qiehuan31 6s ease infinite both');
	// 		$('.swiper4_3').css('animation','qiehuan32 6s ease infinite both');
	// 		$('.swiper4_4').css('animation','qiehuan33 6s ease infinite both');
	// 		$('.swiper4_7').css('animation','qiehuan21 4s ease infinite both');
	// 		$('.swiper4_8').css('animation','qiehuan22 4s ease infinite both');
	// 		$('.swiper4_9').css('animation','qiehuan21 4s ease infinite both');
	// 		$('.swiper4_10').css('animation','qiehuan22 4s ease infinite both');
	// 		clearTimeout(_t1);
	// 	},2000);
	// }
	// if($('.swiper-slide5').hasClass('swiper-slide-active')){
	// 	var _t2=setTimeout(function(){
	// 		$('.swiper5_3').css('animation','qiehuan21 4s ease infinite both');
	// 		$('.swiper5_4').css('animation','qiehuan22 4s ease infinite both');
	// 		clearTimeout(_t2);
	// 	},2000);
	// }
	// if($('.swiper-slide7').hasClass('swiper-slide-active')){
	// 	var _t3=setTimeout(function(){
	// 		$('.swiper7_4').css('animation','qiehuan21 4s ease infinite both');
	// 		$('.swiper7_5').css('animation','qiehuan22 4s ease infinite both');
	// 		clearTimeout(_t3);
	// 	},2000);
	// }
	//链接
	// $('.b').on('click',function(){location.hash = "#slide1"});
	// 分享
	// $('.swiper-slide21 .swiper21_9').on('click', function () {$('.share-box').removeClass('hide')});
	// 关闭
	// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});

});
