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
// var browser={
//     versions:function(){
//         var u = navigator.userAgent,
//             app = navigator.appVersion;
//         return {
//             trident: u.indexOf('Trident') > -1,
//             presto: u.indexOf('Presto') > -1,
//             webKit: u.indexOf('AppleWebKit') > -1,
//             gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
//             mobile: !!u.match(/AppleWebKit.*Mobile.*/),
//             ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
//             android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
//             iPhone: u.indexOf('iPhone') > -1 ,
//             iPad: u.indexOf('iPad') > -1,
//             webApp: u.indexOf('Safari') == -1,
//             weixin: u.indexOf('MicroMessenger') > -1,
//             qq: u.match(/\sQQ/i) == " qq"
//         };
//     }(),
//     language:(navigator.browserLanguage || navigator.language).toLowerCase()
// }
// if((browser.versions.weixin && browser.versions.ios) || (!browser.versions.weixin && browser.versions.android)){
// 	currVideo.play();
	
// 	// alert(1)
// 	$('.play-btn').remove();
// 	document.addEventListener("WeixinJSBridgeReady", function () {
// 		audio_player.load();
// 		audio_player.play();
// 		audio_player.pause();
// 		videoList.forEach(function(v,i){
// 			v.load();
// 			v.play();
// 			v.pause();
// 		});
// 		currVideo.play();
// 	}, false);
// }else{
// 	$('.play-btn').removeClass('hide');
// }

// $(".music").removeClass("on").addClass("off");



function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next=='line'){
		currVideo.play();
		currVideo.addEventListener('ended',function(){
			loadPage('welcome2')
		});
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}


//链接
// $('.b').on('click',function(){window.location.href= ""});
$('#welcome ').on('click',function(){loadPage('line')});
// 分享1
$('#welcome2 .page-btn1').on('click',function(){loadPage('share1')});
$('#share1 .page-back').on('click',function(){loadPage('welcome2')});
$('#share1 .page-btn').on('click',function(){loadPage('share2')});
// 分享2
$('#welcome2 .page-btn2').on('click',function(){loadPage('share2')});
$('#share2 .page-back').on('click',function(){loadPage('welcome2')});
$('#share2 .page-btn').on('click',function(){loadPage('share1')});
// 点燃
$('#welcome2 .page-tip').on('click',function(){
	$('#welcome2 .page-fire').removeClass('hide');
	$('#welcome2 .page-tip').addClass('hide');
});

// 上滑
// $('#welcome').on('swipeup', function (e) {
// 	loadPage('welcome2');
// }).on('click', function (e) {
// 	loadPage('welcome2');
// });
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
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg',
'img/p1_1.png','img/p1_2.png','img/p1_3.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png',
'img/p3_1.png',
'img/p4_1.png',
'img/music2.png'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('welcome2');
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