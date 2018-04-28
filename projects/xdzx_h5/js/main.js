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
	$('#' + next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
	// if(next == 'registration-finish'||next == 'appointment-ybf-finish'||next == 'drinkbar-call-finish'||next == 'drinkbar-order-finish'||next == 'appointment-adviser-finish'){
    // 	var _t1 = setTimeout(function(){
    // 		loadPage('welcome');
    // 		clearTimeout(_t1);
	// 	},2000);
	// }
	// if(next=='appointment-adviser'){
		// var liwidth = $('.appointment-adviser .adviser-list li').width();
		// var linum = $('.appointment-adviser li').size();
		// console.log(liwidth);
		// $('.appointment-adviser .adviser-list ul').width(liwidth * linum + 'px');
	// }
}
// 下拉选项
$('.form-select').on('click', function () {
	$(this).toggleClass('select-active');
});
// 选择时间
$('.form-input ').on('click','.form-input-date',function(){
	$(this).siblings('input[type="date"]').focus();
	$(this).hide();
	// $(this).siblings('input[type="date"]').blur();
})
// 链接
// 首页
$('#welcome .welcome-list ')
.on('click', 'li:nth-child(1)', function () {window.location.href="circuit.html";})
.on('click', 'li:nth-child(2)', function () {window.location.href="registration.html";})
.on('click', 'li:nth-child(3)', function () {window.location.href="appointment.html";})
.on('click', 'li:nth-child(4)', function () {window.location.href="drinkbar.html";});
// page3 到访登记
$('#registration').on('click', '.welcome-logo-bottom img:nth-child(2)', function () {window.location.href="index.html";})
.on('click', '.btn-confirm', function () {
	var _check = true;
	if ($(this).siblings('.form-registration-yzm').find('input').val() == '') {
		dialogueTips('请输入验证码……');
		_check = false;
	}
	if ($(this).siblings('.form-registration-phone').find('input').val() == '') {
		dialogueTips('请输入手机号……');
		_check = false;
	}
	if ($(this).siblings('.form-registration-name').find('input').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		//到访登记完成
		loadPage('registration-finish');
		var _t1 = setTimeout(function(){
			window.location.href="registration.html";
			clearTimeout(_t1);
		},2000);
	}
})

// page2 参观流程
$('#circuit').on('click', '.back-btn', function () {window.location.href="index.html";});
//page5 一键预约
$('#appointment').on('click', '.welcome-logo-bottom img:nth-child(2)', function () {window.location.href="index.html";});
$('#appointment .appointment-list')
.on('click', 'li:nth-child(1)', function () {window.location.href="appointment_adviser.html";})
.on('click', 'li:nth-child(2)', function () {window.location.href="appointment_ybf.html";})
.on('click', 'li:nth-child(3)', function () {window.location.href="appointment_area.html";});
//page6 一键预约 样板房预约
$('#appointment-ybf').on('click', '.welcome-logo-bottom img:nth-child(2)', function () {window.location.href="appointment.html";})
.on('click', '.btn-confirm', function () {
	var _check = true;
	if ($(this).siblings('.form-ybfnum').find('select').val()=='') {
		dialogueTips('请选择样参观人数……');
		_check = false;
	}
	if ($(this).siblings('.form-ybf').find('select').val()=='') {
		dialogueTips('请选择样板房……');
		_check = false;
	}
	if (_check) {
		// 样板房预约确认
		loadPage('appointment-ybf-finish');
		var _t1 = setTimeout(function(){
			window.location.href="appointment_ybf.html";
			clearTimeout(_t1);
		},2000);
	}
});
//page8 一键预约 场地预约
$('#appointment-area').on('click', '.welcome-logo-bottom img:nth-child(2)', function () {window.location.href="appointment.html";})
.on('click', '.btn-confirm', function () {
	var _check = true;
	if ($(this).siblings('.form-area-purpose').find('select').val() == '') {
			dialogueTips('请选择用途……');
			_check = false;
		}
	if ($(this).siblings('.form-area-time').find('input').val() == '') {
			dialogueTips('请选择时间……');
			_check = false;
		}
	if ($(this).siblings('.form-area-phone').find('input').val() == '') {
		dialogueTips('请输入手机号……');
		_check = false;
	}
	if ($(this).siblings('.form-area-name').find('input').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		// 预约成功
		loadPage('appointment-adviser-finish');
		var _t1 = setTimeout(function(){
			window.location.href="appointment_area.html";
			clearTimeout(_t1);
		},2000);
	}
	
});
//page9 一键预约 置业顾问预约
$('#appointment-adviser').on('click', '.welcome-logo-bottom img:nth-child(2)', function () {window.location.href="appointment.html";});
$('#appointment-adviser .adviser-list').on('click', 'li', function () {window.location.href="appointment_adviser_items.html";});


//page10  一键预约 置业顾问预约 置业顾问预约详细
$('#appointment-adviser-items').on('click', '.welcome-logo-bottom img:nth-child(2)', function () {window.location.href="appointment_adviser.html";})
.on('click', '.btn-confirm', function () {
	var _check = true;
	if ($(this).siblings('.form-adviser-items-time2').find('select').val() == '') {
		dialogueTips('请选择时段……');
		_check = false;
	}
	if ($(this).siblings('.form-adviser-items-time').find('input').val() == '') {
		dialogueTips('请选择时间……');
		_check = false;
	}
	if (_check) {
		// 置业顾问预约成功
		loadPage('appointment-adviser-finish')
		var _t1 = setTimeout(function(){
			window.location.href="appointment_adviser.html";
			clearTimeout(_t1);
		},2000);
	}
});
//page11 水吧服务
$('#drinkbar').on('click', '.welcome-logo-bottom img:nth-child(2)', function () {window.location.href="index.html";});
$('#drinkbar .drinkbar-list').on('click', 'li:nth-child(1)', function () {window.location.href="drinkbar_call.html";})
.on('click', 'li:nth-child(2)', function () {window.location.href="drinkbar_order.html";})
//page12 水吧服务 一键呼叫
$('#drinkbar-call').on('click', '.welcome-logo-bottom img:nth-child(2)', function () {window.location.href="drinkbar.html";})
.on('click', '.btn-confirm', function () {
	var _check = true;
	if ($(this).siblings('.form-callid').find('input').val() == '') {
		dialogueTips('请输入桌牌号……');
		_check = false;
	}
	if (_check) {
		//呼叫成功
		loadPage('drinkbar-call-finish');
		var _t1 = setTimeout(function(){
			window.location.href="drinkbar_call.html";
			clearTimeout(_t1);
		},2000);
	}
});
//page14 水吧服务 自助点单
$('#drinkbar-order').on('click', '.welcome-logo-bottom img:nth-child(2)', function () {window.location.href="drinkbar.html";})
.on('click', '.btn-confirm', function () {
	var _check = true;
	if (!$(this).siblings('.order-list').find('p').hasClass('active')) {
		dialogueTips('请选择种类……');
		_check = false;
	}
	// if ($(this).siblings('.order-list').find('input[type="checkbox"]:checked').length =='0') {
	// 	dialogueTips('请选择种类……');
	// 	_check = false;
	// }
	if ($(this).siblings('.form-orderid').find('input').val() == '') {
		dialogueTips('请输入桌牌号……');
		_check = false;
	}
	if (_check) {
		// 点单成功
		loadPage('drinkbar-order-finish');
		var _t1 = setTimeout(function(){
			window.location.href="drinkbar_order.html";
			clearTimeout(_t1);
		},2000);
	}
});

// page14自助点单
$('#drinkbar-order .order-list .list-body p').on('click', '.list-info', function () {
	$(this).parents('p').toggleClass('active');
	if ($(this).parents('p').hasClass('active')) {
		$(this).find('input').attr('checked', 'checked');
		$(this).siblings('.list-num').css('display', 'block');
	} else {
		$(this).find('input').removeAttr('checked');
		$(this).siblings('.list-num').css('display', 'none');
	}
});
$('#drinkbar-order .order-list .list-body p .list-num').on('click', 'strong', function () {
	var _num = $(this).siblings('input').val();
	if ($(this).html() == '-') {
		_num <= 1 ? _num : _num--;
	} else if ($(this).html() == '+') {
		_num++;
	}
	$(this).siblings('input').val(_num);
});



var loadRES = ['img/boc.png',
	'img/p01_01.png', 'img/p01_02.png', 'img/p01_03.png', 'img/p01_04.png', 'img/p01_05.png', 'img/p01_06.png', 'img/p01_07.png', 'img/p01_08.png', 'img/p01_09.png', 'img/p01_10.png', 'img/p01_11.png',
	'img/p03_01.png', 'img/p03_02.png', 'img/p03_03.png', 'img/p03_04.png', 'img/p03_05.png',
	'img/p04_01.png', 'img/p04_02.png', 'img/p04_03.png', 'img/p04_04.png', 'img/p04_05.png',
	'img/p05_01.png', 'img/p05_02.png', 'img/p05_03.png', 'img/p05_04.png', 'img/p05_05.png', 'img/p05_06.png', 'img/p05_07.png',
	'img/p06_01.png', 'img/p06_02.png',
	'img/p07_01.png', 'img/p07_02.png',
	'img/p08_01.png', 'img/p08_02.png',
	'img/p09_01.png', 'img/p09_02.png', 'img/p09_03.png', 'img/p09_04.png', 'img/p09_05.png', 'img/p09_06.png', 'img/p09_07.png',
	'img/p10_01.png', 'img/p10_02.png',
	'img/p11_01.png', 'img/p11_02.png', 'img/p11_03.png', 'img/p11_04.png', 'img/p11_05.png',
	'img/p12_01.png',
	'img/p13_01.png', 'img/p13_02.png', 'img/p13_03.png',
	'img/p14_01.png',
	'img/p15_01.png', 'img/p15_02.png', 'img/p15_03.png',
];


// loading(loadRES, function () {
// 	loadPage('welcome');
// });