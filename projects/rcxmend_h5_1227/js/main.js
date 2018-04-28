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


var _run = true;
//~播放视频
var videoList = [$("#currVideo")[0],$("#currVideo2")[0]],
	currVideo = videoList[0],
	currVideo2 = videoList[1];
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
	// alert(1)
	$('.play-btn').remove();
	document.addEventListener("WeixinJSBridgeReady", function () {
		videoList.forEach(function(v,i){
			v.load();
			v.play();
			v.pause();
		});
		currVideo.play();
	}, false);
}else{
	$('.play-btn').removeClass('hide');
}

$('#currVideo,.play-btn').on('click',function(){
	$('.play-btn').addClass('hide');
	// if($(currVideo).hasClass('hide')){
	currVideo.play();
	// }
});

currVideo.addEventListener('ended',function(){
	$('#currVideo').fadeOut();
	mySwiper.init();
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
});

var mySwiper = new Swiper('#swiper1', {
	observer: true,
	// noSwiping : true,
	direction: 'vertical',
	loop: false,
	hashnav: true,
	// effect:'fade',
	hashnavWatchState: true,
	init: false,
	onSlideChangeEnd: function (swiper) {
		console.log(swiper.activeIndex)
		//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
		$('#swiper1 .swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
		if (swiper.activeIndex == 15) {
			$('.resize').hide();

			if((browser.versions.weixin && browser.versions.ios) || (!browser.versions.weixin && browser.versions.android)){
				currVideo2.play();
				$('.play-btn2').remove();
				document.addEventListener("WeixinJSBridgeReady", function () {
					videoList.forEach(function(v,i){
						v.load();
						v.play();
						v.pause();
					});
					currVideo2.play();
				}, false);
			}else{
				$('.play-btn2').removeClass('hide');
			}
			
			$('#currVideo2,.play-btn2').on('click',function(){
				$('.play-btn2').addClass('hide');
				// if($(currVideo).hasClass('hide')){
				currVideo2.play();
				// }
			});

			currVideo2.addEventListener('ended',function(){
				// $('#currVideo').fadeOut();
				$('.swiper16_3').removeClass('hide');
				$('.swiper16_2').removeClass('hide');
				$('.swiper16_1').removeClass('hide');
			});
		} else {
			$('.resize').show();
		}
	}
})

// 链接
$('.swiper-slide16 .swiper16_1').on('click',function(){window.location.href="index.html";});
// $('.swiper-slide16 .swiper16_1').on('click',function(){location.reload();});
// $('.swiper-slide16 .swiper16_1').on('click',function(){location.hash = "#slide1";});
$('.swiper-slide16 .swiper16_2').on('click',function(){$('.share-box').removeClass('hide')});
// 关闭
$('.share-box').on('click',function(){$('.share-box').addClass('hide')});

var loadRES = ['img/icon/boc.png',
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg','img/bg5.jpg','img/bg6.jpg','img/bg7.jpg','img/bg8.jpg','img/bg9.jpg',
'img/bg10.jpg','img/bg11.jpg','img/bg12.jpg','img/bg13.jpg','img/bg14.jpg','img/bg15.jpg',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png',
'img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png','img/p5_7.png','img/p5_8.png',
'img/p6_2.png','img/p6_3.png','img/p6_4.png','img/p6_5.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png','img/p7_5.png','img/p7_6.png',
'img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png','img/p8_6.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png','img/p9_4.png','img/p9_5.png',
'img/p10_2.png','img/p10_3.png','img/p10_4.png','img/p10_5.png','img/p10_6.png',
'img/p11_2.png','img/p11_3.png','img/p11_4.png','img/p11_5.png','img/p11_6.png',
'img/p12_2.png','img/p12_3.png','img/p12_4.png','img/p12_5.png','img/p12_6.png',
'img/p13_2.png','img/p13_3.png','img/p13_4.png','img/p13_5.png','img/p13_6.png',
'img/p14_1.png','img/p14_2.png','img/p14_3.png','img/p14_4.png','img/p14_5.png',
'img/p15_1.png','img/p15_2.png','img/p15_3.png','img/p15_4.png','img/p15_5.png','img/p15_6.png','img/p15_7.png',
// 'img/p16_1.png','img/p16_2.png',

'img/music2.png','img/next.png','img/video-playBtn.png','img/share_box.png'
]
loading(loadRES, function(){
	// mySwiper.init();
	// $('#swiper1 .swiper-slide').eq(0).addClass('enter');
});
