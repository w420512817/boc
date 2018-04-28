var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}

var browser={
    versions:function(){
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

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
			$(".load").remove();
			callback();
		}
	}
}

function dialogueTips(txt){
	var _html = '<div class="dialogue-tips" id="J_error">'+txt+'</div>';
	if($('.dialogue-tips').size()>0){
		$('.dialogue-tips').remove();
		clearTimeout(t);
	}
	$('body').append(_html);
	t = setTimeout(function(){
		$('#J_error').remove();
		clearTimeout(t);
	},1500);
}

document.ontouchmove = function(e){
	e.preventDefault();
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~音乐
// 视频
var videoList = [$("#call video").eq(0)[0]];
var currVideo = videoList[0];
var audio_con = [];
[
'media/phone.mp3', 	// 铃声
'media/02.mp3', 	// 吴老师录音
'media/music.mp3', 	// 背景音乐
'media/03.mp3' 	// 消息音效.mp3
].forEach(function(v,i){
	var mUsic = new Audio(v);
	mUsic.loop=false;
	audio_con.push(mUsic);
	mUsic=null;
});
document.addEventListener("WeixinJSBridgeReady", function () {
	audio_con.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);

//~播放指定音乐
function aUdio(cur_audio,loop){
	audio_con.forEach(function(item,_index) {
		item.pause();
	});
	audio_con[cur_audio].currentTime = 0;
	audio_con[cur_audio].play();
	if(loop){
		//~判断是否要循环
		audio_con[cur_audio].onended=function(){
			audio_con[cur_audio].currentTime = 0;
			audio_con[cur_audio].play();
		}
	}
}

//~播放视频
function playVideo(){
	$('#call .video-btn').remove();
	$(currVideo).removeClass('hide');
	currVideo.play();
}

// bgm
function playClicked(){
    if(audio_con[2].paused) {
        audio_con[2].play();
        $(".music").removeClass("off").addClass("on")
    }else{
        audio_con[2].pause();
        $(".music").removeClass("on").addClass("off");
    }

    audio_con[2].onended=function(){
		audio_con[2].currentTime = 0;
		audio_con[2].play();
	}
}
