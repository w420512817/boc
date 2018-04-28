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
		$("#load-progress2").width(percent+'%');
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
['media/m1.mp3', 	
 'media/m2.mp3',
 'media/m3.mp3',
 'media/m4.mp3'
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
}, false);

//~播放指定音乐
function aUdio(cur_audio){
	audio_con.forEach(function(item,_index) {
		item.pause();
	});
	audio_con[cur_audio].currentTime = 0;
	audio_con[cur_audio].play();
		// audio_con[cur_audio].onended=function(){
		// 	func();
		// }
}
//~停止所有音乐
function stopAudio_con(){
	audio_con.forEach(function(item,_index) {
		item.pause();
	});
}



function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next=='game1'){
		audio_player.pause();
		$(".music").removeClass("on").addClass("off");
		aUdio(0);
			// 常量
		var _TOP = $('.page-box').position().top, 	// 顶部
		_LEFT = $('.page-box').position().left, 	// 左侧
		_HEIGHT = $('.page-box').height(); 		// 宽高
		var _ARRAY = [_TOP+'|'+(_TOP+_HEIGHT)+'|'+_LEFT+'|'+(_LEFT+_HEIGHT)];

function puzzle(item){
	// 兼容pc鼠标事件、移动端触控事件
	var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
		hasTouch = 'ontouchstart' in window && !isTouchPad,
		START_EV = hasTouch ? 'touchstart' : 'mousedown',
		MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
		END_EV = hasTouch ? 'touchend' : 'mouseup',
		CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup';
	var allObj = document.querySelectorAll(item);
	console.log(allObj)
	for(var i=0;i<allObj.length;i++){
		(function (i) {
			var obj = allObj[i];
			var _this = obj;
			// 获取该元素对应的位置区间
			var _id = $(obj).attr('id'),
				_area = _ARRAY[0].split('|');

			var startTop,startLeft,					 				// 当前坐标
				endTop,endLeft, 									// 结束坐标
				moveTop,moveLeft; 									// 位移

			// 获取起始坐标
			obj.addEventListener(START_EV,function(event){
				startTop = (hasTouch ? event.targetTouches[0].pageY:event.clientY);
				startLeft = (hasTouch ? event.targetTouches[0].pageX:event.clientX);
			},false);

			// 移动
			obj.addEventListener(MOVE_EV,function(event){
				endTop = (hasTouch?event.targetTouches[0].pageY:event.clientY);
				endLeft = (hasTouch?event.targetTouches[0].pageX:event.clientX);
				moveTop = endTop-startTop;
				moveLeft = endLeft-startLeft;
				$(_this).css({'transform':'translateY('+moveTop+'px) translateX('+moveLeft+'px)'});
			},false);

			// 结束移动
			obj.addEventListener(END_EV,function(event){
				if(endTop>_area[0] && endTop<_area[1] && endLeft>_area[2] && endLeft<_area[3] ){
					console.log('位置正确');

					if($(obj).hasClass('current-answer')){
						$(obj).siblings('.page-true').removeClass('hide');
					}else{
						$('.false-box').removeClass('hide');
					}
					$(_this).css({'transform':'translateY(0px) translateX(0px)'});
					// $(_this).remove();
					// $('#block').find('span[data-puzzle="'+_id+'"]').css('visibility','hidden');
					// $('#img').find('img.'+_id).remove();
					// console.log($('#img').find('img').size())
					// if($('#img').find('img').size() == 1){
					// 	console.log('完成');
					// 	loadPage('welcome');
					// }
				}else{
					$(_this).css({'transform':'translateY(0px) translateX(0px)'});
				}
			},false);

			function bodyScroll(event){
				event.preventDefault();
			}

			obj.removeEventListener(END_EV,bodyScroll,false);
			obj.removeEventListener(MOVE_EV,bodyScroll,false);
			obj.removeEventListener(START_EV,bodyScroll,false);
		})(i);
	}
}
	puzzle('.page-option');
	}
    if(next=='game2'){
		audio_player.pause();
		$(".music").removeClass("on").addClass("off");
		stopAudio_con();
		aUdio(1);
	}
    if(next=='game3'){
		audio_player.pause();
		$(".music").removeClass("on").addClass("off");
		stopAudio_con();
		aUdio(2);
	}
    if(next=='game4'){
		audio_player.pause();
		$(".music").removeClass("on").addClass("off");
		stopAudio_con();
		aUdio(3);
	}
    if(next=='lucky'){
		audio_player.play();
		$(".music").removeClass("off").addClass("on")
		stopAudio_con();
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

// 链接
$('#welcome .page-btn').on('click',function(){loadPage('index')});
// 开始
$('#index .page-btn1').on('click', function () {loadPage('game1')});
// 规则
$('#index .page-btn2').on('click', function () {$('.rule-box').removeClass('hide');});
// 我的奖品
$('#index .page-btn3').on('click', function () {$('.prize-box').removeClass('hide');});
$('#end .page-btn1').on('click', function () {$('.prize-box').removeClass('hide');});
//关闭
$('.rule-box').on('click', function () {$('.rule-box').addClass('hide')});
$('.prize-box').on('click', function () {$('.prize-box').addClass('hide')});
$('.share-box').on('click', function () {$('.share-box').addClass('hide')});

$('.false-box').on('click', function () {$('.false-box').addClass('hide');loadPage('game1')});

// 选项
// $('#game1 .page-option').on('click',function(){
// 	if($(this).hasClass('option-b')){
// 		$('#game1 .page-true').removeClass('hide');
// 	}else{
// 		$('.false-box').removeClass('hide');
// 	}
// });
$('#game1 .page-true').on('click',function(){$('#game1 .page-true').addClass('hide');loadPage('game2')});

// $('#game2 .page-option').on('click',function(){
// 	if($(this).hasClass('option-c')){
// 		$('#game2 .page-true').removeClass('hide');
// 	}else{
// 		$('.false-box').removeClass('hide');
// 	}
// });
$('#game2 .page-true').on('click',function(){$('#game2 .page-true').addClass('hide');loadPage('game3')});

// $('#game3 .page-option').on('click',function(){
// 	if($(this).hasClass('option-a')){
// 		$('#game3 .page-true').removeClass('hide');
// 	}else{
// 		$('.false-box').removeClass('hide');
// 	}
// });
$('#game3 .page-true').on('click',function(){$('#game3 .page-true').addClass('hide');loadPage('game4')});

// $('#game4 .page-option').on('click',function(){
// 	if($(this).hasClass('option-d')){
// 		$('#game4 .page-true').removeClass('hide');
// 	}else{
// 		$('.false-box').removeClass('hide');
// 	}
// });
$('#game4 .page-true').on('click',function(){$('#game4 .page-true').addClass('hide');loadPage('lucky')});

// 抽奖
$('#lucky .page-img').on('click',function(){
	var _index = Math.floor(Math.random()*2);
	console.log('随机数'+_index);
	if(_index==0){
		loadPage('lucky-false');
	}
	else if(_index==1){
		loadPage('lucky-true');
	}
});

// 门票兑换
$('#lucky-true .page-btn').on('click',function(){loadPage('form')});

// 分享
$('#lucky-false .page-btn').on('click',function(){$('.share-box').removeClass('hide')});
$('#end .page-btn2').on('click',function(){$('.share-box').removeClass('hide')});

// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-phone').val() == '') {
		dialogueTips('请输入电话……');
		_check = false;
	}
	if ($('#info-name').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		loadPage('end');
	}
});



var loadRES = ['img/icon/boc.png',
'img/bg0.jpg','img/bg1.jpg','img/bg3.jpg','img/bg4.jpg','img/bg5.jpg','img/bg6.jpg','img/bg7.jpg',
'img/p0_1.png','img/p0_2.png','img/p0_3.png','img/p0_4.png','img/p0_5.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png','img/p3_8.png','img/p3_9.png','img/p3_10.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png','img/p4_7.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png','img/p5_7.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png','img/p6_5.png','img/p6_6.png','img/p6_7.png',
'img/p7_1.png','img/p7_2.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png',
'img/p10_1.png','img/p10_2.png','img/p10_3.png','img/p10_4.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png',
'img/music2.png','img/share_box.png'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('game1');

});

