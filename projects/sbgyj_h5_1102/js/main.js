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
// playClicked();

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


// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});
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
		// loadPage('welcome2');
		dialogueTips('提交成功！');
	}
});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png',
'img/music2.png','img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
});