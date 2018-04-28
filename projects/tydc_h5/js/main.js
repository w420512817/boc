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
    
}
//关闭
$('.page-dialog').on('click', '.dialog-close', function () {
	$(this).parent('.page-dialog').fadeOut();
})
// 规则
$(' .page-rule').on('click', function () {
	$('.page-rule-dialog').fadeIn().siblings('.page-dialog').fadeOut();
})
//排行榜
$(' .page-list').on('click', function () {
	$('.page-list-dialog').fadeIn().siblings('.page-dialog').fadeOut();
});
// 我要换新
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
		$('.page-btnl').addClass('hide');
		$('.page-btnr').css('right', '30%');
		$('.page-join-dialog').fadeOut();
		$('.page-s').find('img').attr('src', 'img/p1.png');
		$('.page-hxadd').removeClass('hide');
		$('.page-hxvalue').removeClass('hide');
	}
});

// $('#J_language').on('taphold',function(){
// 	console.log(111)
// })

var loadRES = ['img/boc.png',
'img/p01_01.png','img/p01_04.png','img/p01_05.png','img/p01_06.png','img/p01_07.png','img/p01_08.png','img/p01_09.png','img/p01_10.png','img/p01_11.png','img/p01_12.png',
'img/p02_01.png','img/p02_02.png','img/p02_03.png','img/p02_04.png','img/p01_05.png',
'img/units-icons.png'
];

