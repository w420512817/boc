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

//~播放视频
var videoList = [$("#currVideo")[0]];
var	currVideo = videoList[0];
document.addEventListener("WeixinJSBridgeReady", function () {
	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);

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
	$('.play-btn').addClass('hide');
}else{
	$('.play-btn').removeClass('hide');
}

$('#currVideo,.play-btn').on('click',function(){
	$('.play-btn').addClass('hide');
	currVideo.play();
});

currVideo.addEventListener('ended',function(){
	currVideo.currentTime = 0;
	$('.play-btn').removeClass('hide');
});

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    // if(next=='welcome'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('welcome2');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

//链接
// $('.b').on('click',function(){window.location.href= ""});
// 上滑
// $('#welcome').on('swipeup', function (e) {
// 	loadPage('welcome2');
// }).on('click', function (e) {
// 	loadPage('welcome2');
// });
// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 关闭
$('.share-box').on('click',function(){$('.share-box').addClass('hide')});
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
// 'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_10.png',
// 'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png',
// 'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png',
// 'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png',
// 'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png',
'img/arrow.png','img/video-playBtn.png'
];
document.addEventListener("WeixinJSBridgeReady", function () {
	videoList[0].play();
}, false);
loading(loadRES, function () {
	loadPage('welcome');
});

