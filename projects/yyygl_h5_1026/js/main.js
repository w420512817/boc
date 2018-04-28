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

// 判断视频是否自动播放
var _checkVideo = false;
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
	_checkVideo = true;
	$('.play-btn').hide();
}
// else if(browser.versions.weixin && browser.versions.android){
	// _checkVideo = true;
	// $('.img-circle').show();
// }

// var _run = true;
//~播放视频
var videoList = [$(".swiper-slide3 video").eq(0)[0]],
	currVideo = videoList[0];
document.addEventListener("WeixinJSBridgeReady", function () {
	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);

function video(){
	
	if(_checkVideo){
		if(currVideo.currentTime == 0){
			currVideo.load();
			currVideo.play();
		}else{
			currVideo.currentTime = 0;
			currVideo.play();
		}
	}else{
		//~手动播放
		$('.play-btn').show().on('click',function(){
			if(_run){
				_run = false;
				$('.play-btn').hide();
				currVideo.currentTime = 0;
				currVideo.play();
			}
		})
	}
	// currVideo.addEventListener('ended',function(){
		// _run = true;
		// $('.play-btn').show().on('click',function(){
		// 	if(_run){
		// 		_run = false;
		// 		$('.play-btn').hide();
		// 		currVideo.currentTime = 0;
		// 		currVideo.play();
		// 	}
		// })
		// location.hash = "#slide4";
	// });
}
// 停止所有视频
function stopVideo(){
	videoList.forEach(function(v,i){
		v.pause();
	});
}

var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png',
'img/p10_1.png','img/p10_2.png','img/p10_3.png','img/p10_4.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png',
'img/p12_1.png','img/p12_2.png','img/p12_3.png',
'img/p13_1.png','img/p13_2.png','img/p13_3.png',
'img/p14_1.png','img/p14_2.png','img/p14_3.png','img/p14_4.png','img/p14_5.png','img/p14_6.png','img/p14_7.png','img/p14_8.png','img/p14_9.png','img/p14_10.png','img/p14_11.png','img/p14_12.png',
'img/music2.png','img/next.png','img/share_box.png'
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
		
			_run = true;

			if (swiper.activeIndex == 2) {
				// $(".music").addClass('hide');
				// audio_player.pause();
				video();
			}else{
				stopVideo();
				currVideo.currentTime = 0;
				// $(".music").removeClass('hide');
				// audio_player.play();
			}
			if (swiper.activeIndex == 13) {
				$('.resize').hide();
			} else {
				$('.resize').show();
			}
		}
	})
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	// 导航
	$('.swiper-slide2 .swiper2_6').on('click', function () {location.hash = "#slide3";});
	$('.swiper-slide2 .swiper2_7').on('click', function () {location.hash = "#slide4";});
	$('.swiper-slide2 .swiper2_8').on('click', function () {location.hash = "#slide7";});
	$('.swiper-slide2 .swiper2_9').on('click', function () {location.hash = "#slide10";});
	// 返回
	$('.btn-back').on('click', function () {location.hash = "#slide2";});
	// 一键导航
	$('.swiper-slide14 .swiper14_6').on('click', function () {
		window.location.href="http://api.map.baidu.com/marker?location=30.085378,120.239975&title=远洋·雁归里&content=滨江南沿风情大道往南过木尖山隧道100米&output=html";
	});
	// 分享
	$('.swiper-slide14 .swiper14_7').on('click', function () {
		$('.share-box').removeClass('hide');
	});
	$('.share-box').on('click',function(){$('.share-box').addClass('hide');})

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