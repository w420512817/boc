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

// 音乐
var audio_con = [];
['media/music.mp3', 	
 'media/music1.mp3', 	
 'media/music2.mp3', 	
 'media/music3.mp3', 
 'media/music4.mp3', 
 'media/music5.mp3', 
].forEach(function(v,i){
	var mUsic = new Audio(v);
	mUsic.loop=true;
	audio_con.push(mUsic);
	mUsic=null;
});
document.addEventListener("WeixinJSBridgeReady", function () {
	audio_con.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);

//~播放指定音乐
function aUdio(cur_audio){
	audio_con.forEach(function(item,_index) {
		item.pause();
	});
	audio_con[cur_audio].currentTime = 0;
	audio_con[cur_audio].play();
}
//~停止所有音乐
function stopAudio_con(){
	audio_con.forEach(function(item,_index) {
		item.pause();
	});
}



function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
	// if(next=='welcome'){
	// 	aUdio(0);
	// }
	if(next=='music-page1'){
		audio_player.pause();
		$(".music").addClass('hide');
		stopAudio_con();aUdio(1);
		v1.play();
		var _t1=setTimeout(function(){
			v1.pause();
			loadPage('music-page2');
			clearTimeout(_t1);
		},5000);
	}
    if(next=='music-page2'){
		stopAudio_con();aUdio(2);
		v2.play();
		var _t1=setTimeout(function(){
			v2.pause();
			loadPage('music-page3');
		clearTimeout(_t1);
		},7500);
	}
    if(next=='music-page3'){
		stopAudio_con();aUdio(3);
		v3.play();
		var _t1=setTimeout(function(){
			v3.pause();
			loadPage('music-page4');
			clearTimeout(_t1);
		},4000);
	}
    if(next=='music-page4'){
		stopAudio_con();aUdio(4);
		v4.play();
		var _t1=setTimeout(function(){
			v4.pause();
			loadPage('music-page5');
			clearTimeout(_t1);
		},5500);
	}
    if(next=='music-page5'){
		stopAudio_con();aUdio(5);
		v5.play();
		var _t1=setTimeout(function(){
			v5.pause();
			loadPage('list');
			clearTimeout(_t1);
		},5000);
	}
    if(next=='list'){
		audio_player.play();
		$(".music").removeClass('hide');
		stopAudio_con();
		var _t1=setTimeout(function(){
			loadPage('end');
		clearTimeout(_t1);
		},5000);
	}

	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
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
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png','img/p6_5.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png','img/p7_5.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png','img/p8_6.png','img/p8_7.png','img/p8_8.png','img/p8_9.png','img/p8_10.png',
'img/music.png','img/bg1.jpg'
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