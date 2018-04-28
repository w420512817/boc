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
    if(next=='map'){
		$('.tip-hand').removeClass('hide');
		// var _width = $(window).width() * 1040 / 640;
		// $('#map .page-bg').css({width:$(window).width() * 1040 / 640});
		// $('#map .page-bg2').css({width:$(window).width() * 1040 / 640});
	}
}
// 链接
$('#welcome .page-tip').on('click',function(){loadPage('map')});
//map
$('#map .page-area1').on('click',function(){$('#map .page-position1').removeClass('hide')});
$('#map .page-area2').on('click',function(){$('#map .page-position2').removeClass('hide')});
$('#map .page-area3').on('click',function(){$('#map .page-position3').removeClass('hide')});
$('#map .page-area4').on('click',function(){$('#map .page-position4').removeClass('hide')});
$('#map .page-area5').on('click',function(){$('#map .page-position5').removeClass('hide')});
$('#map .page-area6').on('click',function(){$('#map .page-position6').removeClass('hide')});

$('#map .position-box').on('click',function(){
	$('#map .page-rain').removeClass('hide').css('animation','rain 2s linear 2 both');
	var _t1=setTimeout(function(){
		var _index = Math.floor((Math.random()*2));
		console.log(_index);
		if(_index==0){
			$('.tip-money').removeClass('hide');
		}else if(_index==1){
			$('.tip-false').removeClass('hide');
		}
		clearTimeout(_t1);
	},2000);
});

//关闭
// $('.tip-hand').on('click',function(){$('.tip-hand').addClass('hide')});
$('.tip-hand').on('click',function(){$('.tip-hand').addClass('hide')})
.on('swipe',function(){$('.tip-hand').addClass('hide')});

// 成功
$('.tip-money').on('click',function(){console.log('成功')});
// 失败
$('.tip-false').on('click',function(){console.log('关注')});
$('.tip-twice').on('click',function(){console.log('第二次')});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png',
'img/p2_0.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png',
'img/music2.png','img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('map');
});

