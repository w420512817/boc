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
// playClicked();

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    
}
// 首页
$('.page-p01-01').on('click',function(){window.location.href="fridge.html";});
$('.page-p01-02').on('click',function(){window.location.href="washer.html";});
$('.page-p01-03').on('click',function(){window.location.href="kitchen.html";});
$('.page-p01-04').on('click',function(){window.location.href="life.html";});
// fridge
$('.page-p02-01').on('click',function(){window.location.href="http://2015evo14.pro-trend.com.cn/index.html";});
$('.page-p02-02').on('click',function(){window.location.href=" http://minisite.bosch-home.cn/wap/product/md/";});
$('.page-p02-03').on('click',function(){window.location.href="http://minisite.bosch-home.cn/wap/product/dp/";});
$('.page-p02-04').on('click',function(){window.location.href=" http://minisite.bosch-home.cn/wap/product/nf14/";});
// washer
$('.page-p03-01').on('click',function(){window.location.href=" http://minisite.bosch-home.cn/wap/product/s18/";});
$('.page-p03-02').on('click',function(){window.location.href=" http://minisite.bosch-home.cn/wap/product/f25/?from=singlemessage&isappinstalled=0";});
$('.page-p03-03').on('click',function(){window.location.href="";});
$('.page-p03-04').on('click',function(){window.location.href="http://minisite.bosch-home.cn/wap/product/t27/";});
$('.page-p03-05').on('click',function(){window.location.href=" http://minisite.bosch-home.cn/wap/product/d21/";});
// kitchen
$('.page-p04-01').on('click',function(){window.location.href=" http://minisite.bosch-home.cn/wap/product/kaset/";});
$('.page-p04-02').on('click',function(){window.location.href=" http://minisite.bosch-home.cn/wap/product/kaset/";});
$('.page-p04-03').on('click',function(){window.location.href=" http://minisite.bosch-home.cn/wap/product/kaset/";});
$('.page-p04-04').on('click',function(){window.location.href=" http://www.bosch-home.cn/products/dishwashers";});
// life
// $('.page-p05-01').on('click',function(){window.location.href="";});

// $('#J_language').on('taphold',function(){
// 	console.log(111)
// })

var loadRES = ['img/boc.png','img/p01_01.png','img/p0_01.png',
'img/p01_01.png','img/p01_02.png','img/p01_03.png','img/p01_04.png',
'img/p02_01.png','img/p02_02.png','img/p02_03.png','img/p02_04.png',
'img/p03_01.png','img/p03_02.png','img/p03_03.png','img/p03_04.png','img/p03_05.png',
'img/p04_01.png','img/p04_02.png','img/p04_03.png','img/p04_04.png',
'img/p05_01.png','img/p05_02.png','img/p05_03.png',
'img/units-icons.png'
];

loading(loadRES, function () {
	loadPage('welcome');
});

