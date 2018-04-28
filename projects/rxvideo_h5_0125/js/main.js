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
	$('#welcome .play-btn').remove();
}

var _run = true;
//~播放视频
var videoList = [$("#welcome video").eq(0)[0],$("#welcome2 video").eq(0)[0]];
	// currVideo = videoList[0];
document.addEventListener("WeixinJSBridgeReady", function () {
	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);

function video(id){
	currVideo = videoList[id];
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
		$('#welcome .play-btn').show().on('click',function(){
			if(_run){
				_run = false;
				$('#welcome .play-btn').hide();
				currVideo.currentTime = 0;
				currVideo.play();
			}
		})
	}
}

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next=='welcome'){
		video(0);
		// $('#currVideo1')[0].play;
		// currVideo1.play();
		// currVideo2.pause();
	}
    if(next=='welcome2'){
		currVideo.pause();
		$('#welcome2 .play-btn').show();
		currVideo2.currentTime = 0;
	}
}

//链接
// $('.b').on('click',function(){window.location.href= ""});

// 上滑
$('#welcome').on('swipeup', function (e) {
	loadPage('welcome2');
})
$('#welcome .page-img').on('click', function (e) {
	loadPage('welcome2');
});
$('#welcome2').on('swipedown',function(){
	loadPage('welcome');
});
//~手动播放
$('#welcome2 .play-btn').on('click',function(){
	$('#welcome2 .play-btn').hide();
	currVideo2.currentTime = 0;
	currVideo2.play();
})
// 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 关闭
// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});
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
'img/p1_1.png','img/p1_2.png',
'img/music2.png',
];

document.addEventListener("WeixinJSBridgeReady", function () {
	videoList[0].play();
}, false);
loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('welcome2');
});

