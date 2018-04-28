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

// 链接
$('#welcome .page-btn1').on('click',function(){$(this).siblings('.page-rule').removeClass('hide')});
$('#welcome .page-btn2').on('click',function(){loadPage('question1')});

// 问题
$('.page-check').on('click',function(){$(this).addClass('on').siblings('.page-check').removeClass('on');});
// 问题1
$('#question1 .page-check').on('click',function(){
	if($(this).hasClass('check-a')){
		var _t1=setTimeout(function(){
			loadPage('question2');
			clearTimeout(_t1);
		},500);
	}
	else{
		var _t1=setTimeout(function(){
			$('.false-box').removeClass('hide');
			clearTimeout(_t1);
		},500);
	}
});
// 问题2
$('#question2 .page-check').on('click',function(){
	var _t1=setTimeout(function(){
		loadPage('question3');
		clearTimeout(_t1);
	},500);
});
// 问题3
$('#question3 .page-check').on('click',function(){
	var _t1=setTimeout(function(){
		loadPage('question4');
		clearTimeout(_t1);
	},500);
});
// 问题4
$('#question4 .page-check').on('click',function(){
	if($(this).hasClass('check-b')){
		var _t1=setTimeout(function(){
			loadPage('question5');
			clearTimeout(_t1);
		},500);
	}
	else{
		var _t1=setTimeout(function(){
			$('.false-box').removeClass('hide');
			clearTimeout(_t1);
		},500);
	}
});
// 问题5
$('#question5 .page-check').on('click',function(){
	var _t1=setTimeout(function(){
		loadPage('question6');
		clearTimeout(_t1);
	},500);
});
// 问题6
$('#question6 .page-check').on('click',function(){
	var _t1=setTimeout(function(){
		// 提示超过100名显示
		// $('.none-box').removeClass('hide');
		// 否则填表
		loadPage('form');
		clearTimeout(_t1);
	},500);
});


//关闭
$('#welcome .page-rule').on('click',function(){$('#welcome .page-rule').addClass('hide')});
// 答错 返回第一页
$('.false-box').on('click',function(){
	$('.false-box').addClass('hide');
	$('.page-check').removeClass('on');
	loadPage('question1');
});


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
		$('.page-tip').removeClass('hide');
	}
});
$('#form .page-tip').on('click',function(){
	$('.page-tip').addClass('hide');
	$('.share-box').removeClass('hide');
});

var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png',
'img/p3_1.png',
'img/p4_1.png','img/p4_2.png',
'img/p5_1.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png',
'img/p7_1.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png','img/p9_4.png',
'img/music2.png','img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('form');
	// 第二次打开页面
	// loadPage('end');
});

