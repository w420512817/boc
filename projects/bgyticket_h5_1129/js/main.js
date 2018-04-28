//禁止窗口的默认滑动
// document.ontouchmove = function (e) {
// 	e.preventDefault();
// }
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
['prize.mp3'
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
}

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
 //    if(next=='welcome'){
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

// 链接
$('#welcome .page-text').on('click',function(){loadPage('index')});

var _gameNum=3;
// 滑动
$('#index .page-tip')
// .on('swipeleft',function(){
// })
// .on('click',function(){
.on('swiperight',function(){
	$('#index .page-tip').addClass('hide');
	$('#index .page-anim1').removeClass('hide');
	var _t1=setTimeout(function(){
		
		$('#index .page-anim1').addClass('hide');
		$('#index .page-anim2').removeClass('hide');
		var _t2=setTimeout(function(){
			$('#index .page-anim2').addClass('hide');
			// $('#audio1')[0].play();
			aUdio(0);
			// 随机
			_gameNum--;
			var _index = Math.floor(Math.random()*6);
			console.log('随机数'+_index);
			if(_index==0){
				$('#index .page-none').removeClass('hide');
			}
			else if(_index==1){
				$('#index .page-prize').removeClass('hide');
				$('#index .page-prize>img').attr('src','img/p3_8.png');
			}
			else if(_index==2){
				$('#index .page-prize').removeClass('hide');
				$('#index .page-prize>img').attr('src','img/p3_9.png');
			}
			else if(_index==3){
				$('#index .page-prize').removeClass('hide');
				$('#index .page-prize>img').attr('src','img/p3_10.png');
			}
			else if(_index==4){
				$('#index .page-prize').removeClass('hide');
				$('#index .page-prize>img').attr('src','img/p3_11.png');
			}
			else if(_index==5){
				$('#index .page-prize').removeClass('hide');
				$('#index .page-prize>img').attr('src','img/p3_12.png');
			}
			console.log('次数'+_gameNum);
			clearTimeout(_t2);
		},1600);
		clearTimeout(_t1);
	},2000);
});

// 重新抽
$('#index .page-none').on('click',function(){
	$('#index .page-none').addClass('hide');
	if(_gameNum<=0){
		$('#index .page-share').removeClass('hide');
	}else{
		$('#index .page-tip').removeClass('hide');
	}
	// console.log(_gameNum);
});

// 领奖
$('#index .page-prize .page-btn1').on('click',function(){$('#index .page-form').removeClass('hide')});
// 关闭
$('#index .page-form .page-close').on('click',function(){$('#index .page-form').addClass('hide')});
// 放弃重新抽
$('#index .page-prize .page-btn2').on('click',function(){
	$('#index .page-prize').addClass('hide');
	// _gameNum--;
	if(_gameNum<=0){
		$('#index .page-share').removeClass('hide');
	}else{
		$('#index .page-tip').removeClass('hide');
	}
	// console.log(_gameNum);
});

// 分享继续抽
$('#index .page-share .page-btn').on('click',function(){
	// $('#index .page-share ul li div').each(function(){
	// 	if($(this).css('backgroundImage')=='url(img/p4_4.png)'){
	// 		console.log('失败');
	// 	}
	// });

	if($(this).find('img').attr('src')=='img/p4_2.png'){
		_gameNum=1;
		$('#index .page-share').addClass('hide');
		$('#index .page-tip').removeClass('hide');
		$(this).find('img').attr('src','img/p4_3.png');
	}else{
		dialogueTips('请邀请好友……');
	}
});

// 分享
$('#index .page-share .page-list li ').on('click',function(){$('.share-box').removeClass('hide')});
$('.share-box').on('click',function(){$('.share-box').addClass('hide')});
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
		dialogueTips('成功！');
	}
});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png','img/p2_11.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png','img/p3_8.png','img/p3_9.png','img/p3_10.png','img/p3_11.png','img/p3_12.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png',
'img/music2.png','img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('index');
});

