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

// document.addEventListener("WeixinJSBridgeReady", function () {
// 	audio_player.play();
// }, false);

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

var _run = true;
//~播放视频
var videoList = [$("#welcome video").eq(0)[0]],
	currVideo = videoList[0];
document.addEventListener("WeixinJSBridgeReady", function () {
	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);
// 点击播放
$('.play-btn').on('click',function(){
	playClicked();
	$('.play-btn').addClass('hide');
	currVideo.currentTime = 0;
	currVideo.play();
	$('#welcome video').on('click',function(){
		playpause();
	});
});
currVideo.addEventListener('ended',function(){
	loadPage('welcome2');
});
// 暂停/播放
function playpause() {
	if (currVideo.paused) {
		currVideo.play();
	} else {
		currVideo.pause();
	}
}
//重播
$('#welcome2').on('click',function(){
	// $('.play-btn').removeClass('hide');
	loadPage('welcome');
	currVideo.currentTime = 0;
	currVideo.play();
});

function loadPage(next) {
	$('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
//    if(next=="welcome"){
// 		audio_player.pause();
// 		$(".music").removeClass("on").addClass("off")
//    }
	// else if(next=='welcome2'){
		// 	var _t1=setTimeout(function(){
			// 		loadPage('list1');
			// 	clearTimeout(_t1);
			// 	},3000);
			// }
}
	
var loadRES = ['img/icon/boc.png',
'img/p1_1.jpg','img/p1_2.jpg',
'img/music2.png','img/video-playBtn.png'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('welcome2');
});
