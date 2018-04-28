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
    if(next=='form'){
		$('.resize').addClass('hide');
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

// 链接
$('#welcome').on('click',function(){loadPage('welcome2')});
$('#welcome').on('swipeup', function (e) {loadPage('welcome2');});
$('#welcome2').on('click',function(){loadPage('form')});
$('#welcome2').on('swipeup', function (e) {loadPage('form');});

$('#form .form-radio input').on('click',function(){
	if($(this).is(':checked')){
		$(this).parent('span').addClass('radio-on').siblings('span').removeClass('radio-on');
	}
});

// 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 白羊1 金牛2 双子3 巨蟹4 狮子5 处女6 天秤7 天蝎8 射手9 摩羯10 水瓶11 双鱼12
var _arr=['img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png','img/p5_7.png','img/p5_8.png','img/p5_9.png','img/p5_10.png','img/p5_11.png','img/p5_12.png'];
// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-name').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	else if ($('#info-birthday').val() == '') {
		dialogueTips('请选择出生年月……');
		_check = false;
	}
	else if (_check) {
		console.log($('#info-birthday').val());
		var month=$('#info-birthday').val().substr(5,2);
		var date=$('#info-birthday').val().substr(8,2);
		// console.log(month);
		// console.log(date);
		if (month == 3 && date >=21 || month == 4 && date <=19) {$('#end .page-img img').attr('src',_arr[0])} 
		if (month == 4 && date >=20 || month == 5 && date <=20) {$('#end .page-img img').attr('src',_arr[1])} 
		if (month == 5 && date >=21 || month == 6 && date <=21) {$('#end .page-img img').attr('src',_arr[2])}
		if (month == 6 && date >=22 || month == 7 && date <=22) {$('#end .page-img img').attr('src',_arr[3])}
		if (month == 7 && date >=23 || month == 8 && date <=22) {$('#end .page-img img').attr('src',_arr[4])}
		if (month == 8 && date >=23 || month == 9 && date <=22) {$('#end .page-img img').attr('src',_arr[5])}
		if (month == 9 && date >=23 || month == 10 && date <=23) {$('#end .page-img img').attr('src',_arr[6])}
		if (month == 10 && date >=24 || month == 11 && date <=22) {$('#end .page-img img').attr('src',_arr[7])}
		if (month == 11 && date >=23 || month == 12 && date <=21) {$('#end .page-img img').attr('src',_arr[8])}
		if (month == 12 && date >=22 || month == 1 && date <=19) {$('#end .page-img img').attr('src',_arr[9])} 
		if (month == 1 && date >=20 || month == 2 && date <=18) {$('#end .page-img img').attr('src',_arr[10])} 
		if (month == 2 && date >=19 || month == 3 && date <=20) {$('#end .page-img img').attr('src',_arr[11])} 
		$('#end .page-name p').html($('#info-name').val());
		loadPage('end');
	}
});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_10.png',
'img/p1_11.png','img/p1_12.png','img/p1_13.png','img/p1_14.png','img/p1_15.png','img/p1_16.png','img/p1_17.png','img/p1_18.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png','img/p2_11.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png','img/p3_8.png',
'img/p4_1.png','img/p4_2.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png','img/p5_7.png','img/p5_8.png','img/p5_9.png','img/p5_10.png','img/p5_11.png','img/p5_12.png',
'img/music2.png','img/bg1.jpg'
];


