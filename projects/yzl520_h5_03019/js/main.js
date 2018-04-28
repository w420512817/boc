//禁止窗口的默认滑动
document.ontouchmove = function (e) {
	e.preventDefault();
}
// $("body").bind("touchmove",function(event){event.preventDefault();});
// $("body").unbind("touchmove");

$('body').height($(window).height())

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
// playClicked();

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

var _run = true;
//~播放视频
var videoList = [$("#currVideo")[0]],
	currVideo = videoList[0];
document.addEventListener("WeixinJSBridgeReady", function () {

	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);


// 判断视频是否自动播放
var browser={
    versions:function(){
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
            iPhone: u.indexOf('iPhone') > -1 ,
            iPad: u.indexOf('iPad') > -1,
            webApp: u.indexOf('Safari') == -1,
            weixin: u.indexOf('MicroMessenger') > -1,
            qq: u.match(/\sQQ/i) == " qq"
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
if((browser.versions.weixin && browser.versions.ios) || (!browser.versions.weixin && browser.versions.android)){
	currVideo.play();
	// audio_player.play();
	// $(".music").removeClass("off").addClass("on")
	// alert(1)
	$('.play-btn').remove();
	//music
	// document.addEventListener("WeixinJSBridgeReady", function () {
	// 	audio_player.play();
	// }, false);
	document.addEventListener("WeixinJSBridgeReady", function () {
		audio_player.load();
		audio_player.play();
		audio_player.pause();
		videoList.forEach(function(v,i){
			v.load();
			v.play();
			v.pause();
		});
		// audio_player.play();
		// $(".music").removeClass("off").addClass("on")
		currVideo.play();
	}, false);
}else{
	$('.play-btn').removeClass('hide');
	$(".music").removeClass("on").addClass("off")
}

// 开始视频
$('.play-btn').on('click',function(){
	
	$('.play-btn').addClass('hide');

	// audio_player.play();
	// $(".music").removeClass("off").addClass("on")
	currVideo.play();
});

currVideo.addEventListener('ended',function(){
	document.addEventListener("WeixinJSBridgeReady", function () {
		audio_player.play();
	}, false);
	audio_player.play();
	$(".music").removeClass("off").addClass("on");
	$('.videobtn').fadeIn()
});
// 结束视频
$('.videobtn').on('click',function(){
	$('.videobox').fadeOut();
	mySwiper.init();
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
})

var mySwiper = new Swiper('#swiper1', {
	// autoplay:4000,
	// autoplayStopOnLast : true,
	observer: true,
	// noSwiping : true,
	direction: 'vertical',
	hashnav: true,
	// effect:'fade',
	hashnavWatchState: true,
	init: false,
	onSlideChangeEnd: function (swiper) {
		console.log(swiper.activeIndex)
		//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
		$('#swiper1 .swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
		if (swiper.activeIndex == 16) {
			$('.resize').hide();
		} else {
			$('.resize').show();
		}
		if(swiper.activeIndex == 14){
			$('.swiper14_3,.swiper14_4,.swiper14_5,.swiper14_6,.swiper14_7,.swiper14_8').removeClass('big');
		}
	}
})

// 点击

$('.swiper14_3,.swiper14_4,.swiper14_5,.swiper14_6,.swiper14_7,.swiper14_8').on('click',function(e){
	if($(this).siblings().hasClass('big')){
		$(this).siblings().removeClass('big');
		$(this).addClass('big');
	}else{
		if($(this).hasClass('big')){
			$(this).removeClass('big');
		}else{
			$(this).addClass('big');
		}
	}
})

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
'img/bg1.jpg','img/bg5.jpg','img/bg6.jpg','img/bg7.jpg','img/bg8.jpg','img/bg14.jpg','img/bg15.jpg',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png',
'img/p6_1.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png','img/p8_6.png',
'img/p9_1.png','img/p9_2.png',
'img/p10_1.png','img/p10_2.png','img/p10_3.png','img/p10_4.png','img/p10_5.png','img/p10_6.png','img/p10_7.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png','img/p11_4.png','img/p11_5.png','img/p11_6.png','img/p11_7.png','img/p11_8.png',
'img/p12_1.png','img/p12_2.png','img/p12_3.png','img/p12_4.png','img/p12_5.png','img/p12_6.png','img/p12_7.png','img/p12_8.png','img/p12_9.png','img/p12_10.png','img/p12_11.png',
'img/p13_1.png','img/p13_2.png','img/p13_3.png',
'img/p14_1.png','img/p14_2.png','img/p14_3.png','img/p14_4.png','img/p14_5.png','img/p14_6.png','img/p14_7.png','img/p14_8.png','img/p14_9.png',
'img/p15_1.png','img/p15_2.png','img/p15_3.png','img/p15_4.png','img/p15_5.png','img/p15_6.png','img/p15_7.png','img/p15_8.png',
'img/p16_1.png','img/p16_2.png','img/p16_3.png','img/p16_4.png','img/p16_5.png',
'img/p17_1.png','img/p17_2.png','img/p17_3.png',
'img/music2.png','img/arrow.png','img/next.png',
]
loading(loadRES, function(){
	// mySwiper.init();
});

