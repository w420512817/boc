//禁止窗口的默认滑动
document.ontouchmove = function (e) {
	e.preventDefault();
}

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
'img/p1_1.png','img/p1_2.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png',
'img/p3_1.png','img/p3_2.png',
'img/p4_1.png','img/p4_2.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png',
'img/p7_1.png','img/p7_2.png',
'img/p8_1.png','img/p8_2.png',
'img/p9_1.png','img/p9_2.png',
'img/p9_1.png','img/p9_2.png',
'img/p10_1.png','img/p10_2.png',
'img/p10_1.png','img/p10_2.png',
'img/p11_1.png','img/p11_2.png',
'img/p11_1.png','img/p11_2.png',
'img/p12_1.png','img/p12_2.png',
'img/p12_1.png','img/p12_2.png',
'img/p13_1.png','img/p13_2.png',
'img/p13_1.png','img/p13_2.png',
'img/p14_1.png','img/p14_2.png',
'img/p14_1.png','img/p14_2.png',
'img/p15_1.png','img/p15_2.png',
'img/p15_1.png','img/p15_2.png',
'img/p16_1.png','img/p16_2.png',
'img/p16_1.png','img/p16_2.png',
'img/p17_1.png','img/p17_2.png',
'img/p17_1.png','img/p17_2.png',
'img/p18_1.png','img/p18_2.png',
'img/p18_1.png','img/p18_2.png',
'img/p19_1.png','img/p19_2.png',
'img/p19_1.png','img/p19_2.png',
'img/p20_1.png','img/p20_2.png',
'img/p20_1.png','img/p20_2.png',
'img/p21_1.png','img/p21_2.png',
'img/p21_1.png','img/p21_2.png',
'img/p22_1.png','img/p22_2.png',
'img/p23_1.png','img/p23_2.png',
'img/p24_1.png','img/p23_2.png',
'img/p25_1.png','img/p23_2.png',
'img/units-icons.png','img/top.png','img/bottom.png'
]
loading(loadRES, function(){


	var mySwiper = new Swiper('#swiper1', {
		observer: true,
		noSwiping : true,
		direction: 'vertical',
		loop: false,
		hashnav: true,
		effect:'fade',
		hashnavWatchState: true,
		onInit: function(swiper){
			if (swiper.activeIndex == 0) {
				$('.resize').hide();
				$('.resizet').hide();
			} 
		},
		// onTouchStart: function(swiper,even){
		// 	location.hash = "#slide2";
		// },
		onSlideChangeEnd: function (swiper) {
			console.log(swiper.activeIndex)
			//	       alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
			$('#swiper1 .swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
			
			if(swiper.activeIndex == 1){
				$('.resize').hide();
				$('.resizet').hide();
			}
			else if(swiper.activeIndex == 2){
				$('.resize').hide();
				$('.resizet').hide();
			}
			else if(swiper.activeIndex == 3){
				$('.resizet').hide();
				$('.resize').show();
			}
			else if(swiper.activeIndex == 5){
				$('.resize').hide();
				$('.resizet').hide();
			}
			else if(swiper.activeIndex == 6){
				$('.resize').show();
				$('.resizet').hide();
			}
			else if(swiper.activeIndex == 11){
				$('.resize').hide();
				$('.resizet').hide();
			}
			else if(swiper.activeIndex == 12){
				$('.resize').show();
				$('.resizet').hide();
			}
			else if(swiper.activeIndex == 14){
				$('.resize').hide();
				$('.resizet').hide();
			}
			else if(swiper.activeIndex == 15){
				$('.resize').show();
				$('.resizet').hide();
			}
			else if(swiper.activeIndex == 20){
				$('.resize').hide();
				$('.resizet').hide();
			}
			else if(swiper.activeIndex == 21){
				$('.resize').show();
				$('.resizet').hide();
			}else if (swiper.activeIndex == 24) {
				$('.resize').hide();
				$('.resizet').hide();
			}
			else {
				$('.resize').show();
				$('.resizet').show();
			}
		}
	})
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	// 导航
	$('.swiper2_3').on('click', function () {
		$(this).addClass('on');
		var _timer = setTimeout(function(){
			location.hash = "#slide3";
			$('.swiper2_3').removeClass('on');
			clearTimeout(_timer);
		},500);
	});
	$('.swiper2_4').on('click', function () {
		$(this).addClass('on');
		var _timer = setTimeout(function(){
			location.hash = "#slide4";
			$('.swiper2_4').removeClass('on');
			clearTimeout(_timer);
		},500);
	});
	$('.swiper2_5').on('click', function () {
		$(this).addClass('on');
		var _timer = setTimeout(function(){
			location.hash = "#slide7";
			$('.swiper2_5').removeClass('on');
			clearTimeout(_timer);
		},500);
	});
	$('.swiper2_6').on('click', function () {
		$(this).addClass('on');
		var _timer = setTimeout(function(){
			location.hash = "#slide13";
			$('.swiper2_6').removeClass('on');
			clearTimeout(_timer);
		},500);
	});
	$('.swiper2_7').on('click', function () {
		$(this).addClass('on');
		var _timer = setTimeout(function(){
			location.hash = "#slide16";
			$('.swiper2_7').removeClass('on');
			clearTimeout(_timer);
		},500);
	});
	$('.swiper2_8').on('click', function () {
		$(this).addClass('on');
		var _timer = setTimeout(function(){
			location.hash = "#slide22";
			$('.swiper2_8').removeClass('on');
			clearTimeout(_timer);
		},500);
	});
	// $('.swiper3_2').on('click', function () {
	// 	location.hash = "#slide2";
	// });
	$('.homeb').on('click', function () {
		location.hash = "#slide2";
	});
	$('.homet').on('click', function () {
		location.hash = "#slide2";
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