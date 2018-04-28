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
	
}

// 链接
//首页
$('#welcome-btn1').on('click',function(){
	// loadPage('form-car');
	window.location.href="form_car.html";
});
$('#welcome-btn2').on('click',function(){
	// loadPage('form-other');
	window.location.href="form_other.html";
});
// 我的随手拍 往期记录
$('.form-link').on('click',function(){
	// loadPage('form-record');
	window.location.href="form_record.html";
});
// 列表更多
$('#form-record .form-tips-info').on('click',function(){
	// loadPage('form-record-more');
	window.location.href="form_record_more.html";
})
// 列表返回
$('.form-record .form-btn-back').on('click',function(){
	// loadPage('form-record');
	// window.location.href="index.html";
	window.location.href=history.back(-1);
})
// 列表详情返回
$('.form-record-more .form-btn-back').on('click',function(){
	// loadPage('form-record');
	window.location.href="form_record.html";
})
// 顶部返回首页
$('.form-back').on('click',function(){
	window.location.href="index.html";
})

// 上传图片
//page2
$('#form-car-img').on('change','li input[name="form-car-file"]',function(){
	var _img = 'img/wxpic.png';
	$(this).parent().css({'background':' url('+_img+') no-repeat center center','background-size':'contain'});
	// $(this).siblings('img').css('opacity',0);
	if(($(this).parent('li').index()+1)==$('#form-car-img li').length && $('#form-car-img li').length<=8){
		$('#form-car-img').append('<li><img src="img/p2_11.png" ><input type="file" name="form-car-file"></li>');
	}
})
//page3
$('#form-other-img').on('change','li input[name="form-other-file"]',function(){
	var _img = 'img/wxpic.png';
	$(this).parent().css({'background':' url('+_img+') no-repeat center center','background-size':'contain'});
	if(($(this).parent('li').index()+1)==$('#form-other-img li').length && $('#form-other-img li').length<=8){
		$('#form-other-img').append('<li><img src="img/p2_11.png" ><input type="file" name="form-other-file"></li>');
	}
})
// ~~提交
// page2
$('#form-car-submit').on('click','img', function () {
	
	var _check = true;
	if ($('#form-car-myphone').val() == '') {
		dialogueTips('请输入手机号……');
		_check = false;
	}
	if ($('#form-car-myname').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		// loadPage('form-record');
		window.location.href="form_record.html";
	}
});
// page3
$('#form-other-submit').on('click','img', function () {
	
	var _check = true;
	if ($('#form-other-myphone').val() == '') {
		dialogueTips('请输入手机号……');
		_check = false;
	}
	if ($('#form-other-myname').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if ($('#form-other-city').val() == '0') {
		dialogueTips('请选择城市……');
		_check = false;
	}
	if (_check) {
		// loadPage('form-record');
		window.location.href="form_record.html";
	}
});


var loadRES = ['img/boc.png',
 'img/p1_01.png', 'img/p1_02.png', 'img/p1_03.png', 'img/p1_05.png', 'img/p1_09.png','img/p1_13.png','img/p1_17.png','img/p1_21.png','img/p1_24.png','img/p1_27.png','img/p1_30.png','img/p1_33.png','img/p1_36.png','img/p1_38.png',
 'img/p2_01.png', 'img/p2_02.png', 'img/p2_03.png', 'img/p2_04.png', 'img/p2_05.png','img/p2_06.png','img/p2_08.png','img/p2_09.png','img/p2_10.png','img/p2_11.png',
 'img/p3_07.png', 
 'img/p4_01.png',
 'img/wxpic.png',
];


