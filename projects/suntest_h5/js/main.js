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
playClicked();

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next=='welcome'){
		var _t1=setTimeout(function(){
			$('#welcome .page-img3').css('animation','yao1 3s linear infinite both');
			clearTimeout(_t1);
		},2200);
	}
    if(next=='answer2'){
		var _t1=setTimeout(function(){
			$('#answer2 .page-img11').css('animation','yao1 3s linear infinite both');
			$('#answer2 .page-img12').css('animation','scale1 3s linear infinite both');
			clearTimeout(_t1);
		},2500);
	}
    if(next=='answer3'){
		var _t1=setTimeout(function(){
			$('#answer3 .page-img2').css('animation','scale1 3s linear infinite both');
			$('#answer3 .page-img3').css('animation','scale1 3s linear infinite both');
			clearTimeout(_t1);
		},3000);
	}
    if(next=='answer4'){
		var _t1=setTimeout(function(){
			$('#answer4 .page-img6').css('animation','yao1 3s linear infinite both');
			$('#answer4 .page-img7').css('animation','scale1 3s linear infinite both');
			clearTimeout(_t1);
		},1500);
	}
    if(next=='answer5'){
		var _t1=setTimeout(function(){
			$('#answer5 .page-img6').css('animation','scale1 3s linear infinite both');
			$('#answer5 .page-img9').css('animation','scale1 3s linear infinite both');
			clearTimeout(_t1);
		},2000);
	}
    if(next=='answer6'){
		var _t1=setTimeout(function(){
			$('#answer6 .page-img6').css('animation','scale1 3s linear infinite both');
			$('#answer6 .page-img7').css('animation','scale1 3s linear infinite both');
			clearTimeout(_t1);
		},2000);
	}
    if(next=='end'){
		$('.tip-box').removeClass('hide');
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 		clearTimeout(_t1);
	// 	},3000);
	// }
}
// 链接
$('#welcome .page-img14').on('click',function(){
	// $('#welcome .page-img14').css('animation','sao 1.5s ease-in-out both');
	// var _t1=setTimeout(function(){
		loadPage('question1');
// 		clearTimeout(_t1);
// 	},1500);
});
$('#question1 .page-img8').on('click',function(){loadPage('question2')});
$('#question2 .page-img7').on('click',function(){loadPage('question2m')});
$('#question2m .page-img7').on('click',function(){loadPage('question3')});

$('#question3 .img-btn').on('click',function(){
	var _index = Math.floor((Math.random()*(7-1)+1));
	console.log(_index);
	loadPage('answer'+_index);
});


// $('#question3 .page-img5').on('click',function(){loadPage('answer1')});
// $('#question3 .page-img6').on('click',function(){loadPage('answer2')});
// $('#question3 .page-img7').on('click',function(){loadPage('answer3')});
// $('#question3 .page-img8').on('click',function(){loadPage('answer4')});
// $('#question3 .page-img9').on('click',function(){loadPage('answer5')});
// $('#question3 .page-img10').on('click',function(){loadPage('answer6')});

$('#answer1 .page-img1').on('click',function(){loadPage('form')});
$('#answer2 .page-img8').on('click',function(){loadPage('form')});
$('#answer3 .page-img7').on('click',function(){loadPage('form')});
$('#answer4 .page-img8').on('click',function(){loadPage('form')});
$('#answer5 .page-img7').on('click',function(){loadPage('form')});
$('#answer6 .page-img8').on('click',function(){loadPage('form')});


//关闭
$('.tip-box').on('click', function () {$('.tip-box').addClass('hide');})
// 分享
$('#end .page-img4').on('click', function () {$('.share-box').removeClass('hide');});
// 关闭
$('.share-box').on('click', function () {$('.share-box').addClass('hide');});


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
		// $('.tip-box').removeClass('hide');
		loadPage('end');
	}
});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_10.png',
'img/p1_11.png','img/p1_12.png','img/p1_13.png','img/p1_14.png','img/p1_15.png','img/p1_16.png','img/p1_17.png','img/p1_18.png','img/p1_19.png','img/p1_20.png','img/p1_21.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png','img/p2_11.png','img/p2_12.png','img/p2_13.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png','img/p3_8.png','img/p3_9.png','img/p3_10.png','img/p3_11.png','img/p3_12.png','img/p3_13.png','img/p3_14.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png','img/p4_7.png','img/p4_8.png','img/p4_9.png','img/p4_10.png','img/p4_11.png','img/p4_12.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png','img/p5_7.png','img/p5_8.png','img/p5_9.png','img/p5_10.png','img/p5_11.png','img/p5_12.png','img/p5_13.png','img/p5_14.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png','img/p6_5.png','img/p6_6.png','img/p6_7.png','img/p6_8.png','img/p6_9.png','img/p6_10.png','img/p6_11.png','img/p6_12.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png','img/p7_5.png','img/p7_6.png','img/p7_7.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png','img/p8_6.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png','img/p9_4.png','img/p9_5.png','img/p9_6.png',
'img/p10_1.png','img/p10_2.png','img/p10_3.png','img/p10_4.png','img/p10_5.png','img/p10_6.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png','img/p11_4.png','img/p11_5.png','img/p11_6.png','img/p11_7.png','img/p11_8.png','img/p11_9.png','img/p11_10.png',
'img/p12_1.png','img/p12_2.png','img/p12_3.png','img/p12_4.png','img/p12_5.png',
'img/music2.png',
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('question2m');
});

