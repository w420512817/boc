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


var t1;
function loadPage(next) {
	$('#' + next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
	console.log(next);
	if (next == 'success') {
		calc();
		t1 = setInterval(calc, 500);
		console.log(t1);
	}
	 if (next == 'push') {
		clearInterval(t1);
		var t2 = setTimeout(function () {
			$('#push .page-btn').css('animation', 'shan 1.5s linear infinite both');
			clearTimeout(t2);
		}, 1500);
	}
	 if (next == 'end') {
		$('#end .end-id').text(_num);
		var t3 = setTimeout(function () {
			html2canvas($("#end")[0], {
				onrendered: function (canvas) {
					$("#end .page-img img").attr('src', canvas.toDataURL("image/jpeg"));
				}
			});
			clearTimeout(t3);
		}, 1000);
	}

}

// 倒计时
function calc() {
	var now = new Date();
	// var endDate=new Date('2017/9/30 20:00');
	var endDate = new Date('2017/9/21 0:00');
	var x = parseInt((endDate - now) / 1000);
	if (x > 0) {
		var d = parseInt(x / 86400);
		var h = parseInt(x % 86400 / 3600);
		h = h < 10 ? '0' + h : h;
		var m = parseInt(x % 3600 / 60);
		m = m < 10 ? '0' + m : m;
		var s = parseInt(x % 60);
		s = s < 10 ? '0' + s : s;
		if (d > 0) {
			time.innerHTML = time.innerHTML.indexOf(':') != -1 ? d + '天' + h + ' ' + m + ' ' + s : d + '天' + h + ':' + m + ':' + s;
		} else {
			time.innerHTML = time.innerHTML.indexOf(':') != -1 ? h + ' ' + m + ' ' + s : h + ':' + m + ':' + s;
		}
		
	}else {
		loadPage('push');
	}
}
// 链接
// page1
// 规则
$('#welcome .page-btn').on('click', function () {
	$('.page-rule').fadeIn();
});
//关闭 下一页
$('.page-rule img').eq(1).on('click', function () {
	$('.page-rule').fadeOut();
	loadPage('login');
})
// page2
// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-yzm').val() == '') {
		dialogueTips('请输入验证码……');
		_check = false;
	}
	if ($('#info-phone').val() == '') {
		dialogueTips('请输入电话……');
		_check = false;
	}
	if ($('#info-name').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		// 验证
		if ($('#info-yzm').val() == '1') {
			loadPage('success');
		} else {
			loadPage('error');
		}
	}
});
// page3 error
$('#error .page-btn').on('click', function () {
	$('#login #info-name').val('');
	$('#login #info-phone').val('');
	$('#login #info-yzm').val('');
	loadPage('login');
});
// page5
// 抽
$('#push .page-btn').on('click', function () {
	loadPage('end');
});



//~~~程序 车位序列号
var _num = 'sdfrxc34';


var loadRES = ['img/icon/boc.png',
	'img/p1_1.png', 'img/p1_2.png', 'img/p1_3.png', 'img/p1_4.png', 'img/p1_5.png', 'img/p1_6.png',
	'img/p2_1.png', 'img/p2_2.png', 'img/p2_3.png', 'img/p2_5.png',
	'img/p3_1.png', 'img/p3_2.png', 'img/p3_3.png',
	'img/p4_1.png', 'img/p4_2.png', 'img/p4_3.png', 'img/p4_4.png',
	'img/p5_1.png', 'img/p5_2.png', 'img/p5_3.png',
	'img/p6_1.png', 'img/p6_2.png',
	// 'img/p2_01.png','img/p02_02.png','img/p02_03.png','img/p02_04.png','img/p01_05.png',
	'img/music.png', 'img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('success');
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