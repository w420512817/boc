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
// playClicked();

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next=='welcome2'){
		$('.tip-box1').removeClass('hide');
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}
// 关闭
$('.tip-box1').on('click',function(){$('.tip-box1').addClass('hide')});
// 链接
// 到访登记
$('#welcome1 .page-btn1').on('click',function(){window.location.href="register2.html"})
$('#welcome1 .page-btn2').on('click',function(){loadPage('register-form');})
// $('#register-form .page-submit').on('click',function(){loadPage('register-end');})
// 提交
$('#register-submit').on('click', function () {
	var _check = true;
	if ($('#register-name').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}else if ($('#register-phone').val() == '') {
		dialogueTips('请输入手机……');
		_check = false;
	}else{
		loadPage('register-end');
	}
});
// 提交2
$('#register2-submit').on('click', function () {
	var _check = true;
	if ($('#register2-name').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}else if ($('#register2-phone').val() == '') {
		dialogueTips('请输入联系方式……');
		_check = false;
	}else{
		loadPage('register-end');
	}
});
// 预约首页
$('#welcome2 .page-btn1').on('click',function(){window.location.href="servicebespeak.html"});
$('#welcome2 .page-btn2').on('click',function(){window.location.href="ybfbespeak.html"});
// 服务预约
// 提交
$('#service-submit').on('click', function () {
	var _check = true;
	if ($('#service-date').val() == '') {
		dialogueTips('请选择到访日期……');
		_check = false;
	}else if ($('#service-time').val() == '') {
		dialogueTips('请选择时间段……');
		_check = false;
	}else if ($('#service-number').val() == '') {
		dialogueTips('请选择到访人数……');
		_check = false;
	}else{
		loadPage('service-end');
	}
});
// 样板房预约
// $('#ybf-form .form-ybf-type label input').on('click',function(){
// 	console.log($(this).is(':checked'));
// });
// 提交
$('#ybf-submit').on('click', function () {
	var _check = true;
	if ($('#ybf-number').val() == '') {
		dialogueTips('请选择到访人数……');
		_check = false;
	}else{
		loadPage('ybf-end');
	}
});
// 通用
$('.form-checkbox-title').on('click',function(){
	$(this).toggleClass('on');
	// if($(this).hasClass('on')){
	// 	$(this).removeClass('on');
	// }else{
	// 	$(this).addClass('on');
	// }
	$(this).siblings('.form-checkbox-body').toggle();
	// if($(this).siblings('.form-checkbox-body').css('display')=='none'){
	// 	$(this).siblings('.form-checkbox-body').show();
	// }else{
	// 	$(this).siblings('.form-checkbox-body').hide();
	// }
});
// form-checkbox
$('.form-checkbox-body label').on('click','input[type="checkbox"]',function(){
	// 多选
	$(this).parents('label').toggleClass('on');
});
// form-radio
$('.form-checkbox-body label').on('click','input[type="radio"]',function(){
	var a=$(this).parent('label').text();
	// console.log($(this).is(':checked'));
	// 单选
	if($(this).is(':checked')){
		$(this).parents('label').addClass('on');
		$(this).parents('label').siblings().removeClass('on');
	}
	// else{
		// 	$(this).parents('label').removeClass('on');
		// }
	$(this).parents('.form-checkbox-body').hide();
	$(this).parents('.form-checkbox').find('.form-checkbox-title').removeClass('on').find('p').text(a);
});

// 后台首页
$('#list .page-list .register-box').on('click',function(){window.location.href="after-register.html"});
$('#list .page-list .service-box').on('click',function(){window.location.href="after-service.html"});
$('#list .page-list .ybf-box').on('click',function(){window.location.href="after-ybf.html"});
// 到访登记
// 提交
$('#registerback-submit').on('click', function () {
	var _check = true;
	if ($('#register-reception').val() == '') {
		dialogueTips('请选择接待指派……');
		_check = false;
	}else{
		dialogueTips('成功！');
	}
});
// 服务预约
$('#aservice .page-btn1').on('click',function(){alert('确认')});
$('#aservice .page-btn2').on('click',function(){alert('取消')});
$('#aservice .page-btn3').on('click',function(){alert('一键呼叫')});
// 样板房预约
$('#aybf .page-btn').on('click',function(){alert('点击确认')});


// 日期伪placeholder
$('input[type="date"]').on('change',function(){
	if($(this).val()!==''){
		$(this).siblings('.form-date-info').hide();
	}
});

// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});



var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_10.png',
'img/p1_11.png','img/p1_12.png','img/p1_13.png','img/p1_14.png','img/p1_15.png','img/p1_16.png','img/p1_17.png','img/p1_18.png','img/p1_19.png',
'img/p1_21.png','img/p1_22.png','img/p1_23.png','img/p1_24.png','img/p1_25.png','img/p1_26.png','img/p1_27.png','img/p1_28.png','img/p1_29.png',
'img/music2.png'
];


