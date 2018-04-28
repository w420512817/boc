//禁止窗口的默认滑动
document.ontouchmove = function (e) {
	e.preventDefault();
}
// $("body").bind("touchmove",function(event){event.preventDefault();});
// $("body").unbind("touchmove");


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
			img.onload = function () {
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
			$(".load").remove();
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

var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}

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
	$('.play-btn').remove();
}
// else if(browser.versions.weixin && browser.versions.android){
	// _checkVideo = true;
	// $('.img-circle').show();
// }

var _run = true;
//~播放视频
var videoList = [$("#music-page1 video").eq(0)[0]],
	currVideo = videoList[0];
document.addEventListener("WeixinJSBridgeReady", function () {
	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);

function video(){
	
	$(".music").addClass('hide');
	audio_player.pause();

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
	currVideo.addEventListener('ended',function(){
		loadPage('list');
		// alert(1);
	});
}

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');

	if(next=='music-page1'){
		// alert('1')
		video();
	}
	if(next=='list'){
		audio_player.play();
		$(".music").removeClass('hide');
		// stopAudio_con();
		var _t1=setTimeout(function(){
			loadPage('end');
		clearTimeout(_t1);
		},5000);
	}

}
// 链接
$('#welcome ').on('swipeup', function (e) {
	loadPage('music-page1');
}).on('click', function (e) {
	loadPage('music-page1');
});
// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});

var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png','img/p7_5.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png','img/p8_6.png','img/p8_7.png','img/p8_8.png','img/p8_9.png','img/p8_10.png',
'img/music2.png',
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('music-page1');
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