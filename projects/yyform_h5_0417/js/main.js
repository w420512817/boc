var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}

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
			img.onload = function() {
				_update();
			}
		}
	} else {
		alert("ÔØÈëÍ¼Æ¬×ÊÔ´³ö´íà¶");
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

function dialogueTips(txt){
	var _html = '<div class="dialogue-tips" id="J_error">'+txt+'</div>';
	if($('.dialogue-tips').size()>0){
		$('.dialogue-tips').remove();
		clearTimeout(t);
	}
	$('body').append(_html);
	t = setTimeout(function(){
		$('#J_error').remove();
		clearTimeout(t);
	},1500);
}

document.ontouchmove = function(e){
	e.preventDefault();
}

$('select').on('change',function(){
	var _this = $(this),
		_val = _this.val(),
		_html = _this.find('option:checked').html();
	_this.prev('p.result').html(_html);
	if(_val == ''){
		_this.prev('p.result').css({'color':'#a5a4a3'});
	}else{
		_this.prev('p.result').css({'color':'#333'});
	}
});

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
}

var _type;
var $singUp = $('#singUp');
$('#welcome .link-load').on('click',function(){
	// 倒计时
	var now = new Date();
	var endDate = new Date('2018/04/18 20:00');
	var x = parseInt((endDate - now) / 1000);
	if (x > 0) {
		dialogueTips('2018年4月18日（本周三）20:00报名正式开抢！');
	}
	else {
		loadPage('singUp')
	}
});

$('#btnback').on('click',function(){
	loadPage('welcome')
});
// 提交
var _run = true,
	_rePhone = /^1[3|4|5|7|8][0-9]{9}$/;

$singUp.find('.submit-btn').on('click',function(){
	$('#singUp input').blur();
	if (form.activity.value == ''){
		dialogueTips('请选择要参与的活动');
	}else if (form.name.value == ''){
		dialogueTips('请填写姓名');
	}else if(form.tel.value == ''){
		dialogueTips('请填写手机号')
	}else if(!_rePhone.test(form.tel.value)){
		dialogueTips('手机号码格式错误');
	}else if(form.room1.value == ''){
		dialogueTips('请填写房号');
	}else if(form.room2.value == ''){
		dialogueTips('请填写房号');
	}else if(form.room3.value == ''){
		dialogueTips('请填写房号');
	}else if(form.num.value == ''){
		dialogueTips('请选择参与人数');
	}else if(form.age.value == ''){
		dialogueTips('请选择参与儿童年龄');
	}else{
		dialogueTips('提交成功！');
		var _tt = setTimeout(function(){
			initForm();
			loadPage('welcome');
			clearTimeout(_tt);
		},1500);
	}
});

// 清空表单
function initForm(){
	$singUp.find('input').val('');
	$singUp.find('select').each(function(){
		var _this = $(this);
		_this.val('');
		_html = _this.find('option:checked').html();
		_this.prev('p.result').html(_html).css({'color':'#a5a4a3'});
	});
}

var loadRES = ['img/boc.png','img/img01_1.png','img/img01_2.png','img/img01_3.png','img/img01_4.png','img/img01.png','img/img09.png','img/img10.png','img/img11.png','img/img12.png','img/img13.png','img/img14.png','img/img15.png','img/img02.png','img/img03.png','img/img04.png','img/img05.png','img/img06.png','img/img07.png','img/img08.png'];

loading(loadRES,function(){
	loadPage('welcome');
});