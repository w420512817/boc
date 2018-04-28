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

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next=='page05'||next=='page07'||next=='page08'){
		$('.resize').addClass('hide');
	}

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


$('.page').on('swipeup',function(e){
// $('.page').on('click',function(e){
	// 向下翻页
	if($(this).attr('nextHash') != ''){
		
			loadPage($(this).attr('nextHash'))
	}
}).on('swipedown',function(e){
	// 向上翻页
	if($(this).attr('prevHash') != ''){
		
			loadPage($(this).attr('prevHash'))
	}
});

// 首页
//链接
$('#page05 .page-btn').on('click',function(){
	// 未关注
	// loadPage('page06');
	// 关注
	loadPage('page07');
})
// 分享
$('#page08 .page-btn1').on('click',function(){$('.share-box').removeClass('hide')});
// 排行榜
$('#page08 .page-btn2').on('click',function(){$('.page-list').removeClass('hide')})
// 首页
$('#page08 .page-btn3').on('click',function(){window.location.href= "index.html"});

// 关闭
$('.share-box').on('click',function(){$('.share-box').addClass('hide')});
$('#page08 .page-back').on('click',function(){$('.page-list').addClass('hide')});
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
	if ($('#info-text').val() == '') {
		dialogueTips('请输入留言……');
		_check = false;
	}
	if (_check) {
		loadPage('page08');
		$('#page08 .page-formtext').val($('#info-text').val());
	}
});
// 分享页
// 点赞
var _flg=true;
$('#page08 .dianzan').on('click',function(){
	if(_flg){
		var add=Number($('#page08 .page-num').text())+1;
		$('#page08 .page-num').text(add);
		_flg=false;
	}else{
		dialogueTips('您已点过赞了')
	}
});

var loadRES = ['img/icon/boc.png',
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg','img/bg5.jpg','img/bg6.jpg','img/bg7.jpg','img/bg8.jpg','img/bg9.jpg',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png','img/p5_7.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png','img/p8_6.png','img/p8_7.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png','img/p9_4.png','img/p9_5.png',
'img/music2.png','img/arrow.png','img/video-playBtn.png'
];
