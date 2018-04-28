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

//首页随机跳转
$('.welcome .page-btn').on('click', function () {
	var arr=['img/t1.png','img/t2.png','img/t3.png','img/t4.png','img/t5.png','img/t6.png','img/t7.png','img/t8.png','img/t9.png'];
	var index = Math.floor((Math.random()*arr.length));
	console.log(arr[index]);
	// loadPage(arr[index]);
	loadPage('letter1');
	$('.letter1 .page-paper img').attr('src',arr[index]);
});
$('.page2-btn').on('click',function(){
	$('.page-share').removeClass('hide');
})
// 伪placeholder
// $('.page2-paper .t-name').on('click',function(){
// 	if($(this).text()=='老师的名字'){$(this).text('');
// 	$('.t-name').focus();}
// }).on('blur',function(){
// 	if($(this).text()==''){$(this).text('老师的名字');}
// });
// $('.page2-paper .t-txt').on('click',function(){
// 	if($(this).find('p').text()=='你想对恩师说的话：'){
// 		$(this).find('p').remove();
// 		$(this).focus();
// 	}
// }).on('blur',function(){
// 	if($(this).text()==''){
// 		$(this).append('<p>你想对恩师说的话：</p>');
// 	}
// });

// 提交
// $('.page2-btn').on('click', function () {
// 	var _check = true;
// 	if ($(this).siblings('.page2-paper').find('.t-txt').text() == ''||$(this).siblings('.page2-paper').find('.t-txt').find('p').text() == '你想对恩师说的话：') {
// 		dialogueTips('请输入内容……');
// 		_check = false;
// 	}
// 	if ($(this).siblings('.page2-paper').find('.t-name').text() == ''||$(this).siblings('.page2-paper').find('.t-name').text() == '老师的名字') {
// 		dialogueTips('请输入姓名……');
// 		_check = false;
// 	}
// 	if (_check) {
// 		// alert('成功');
// 		$(this).parents('.container').find('.page-share').removeClass('hide');
// 	}
// });

// $('#J_language').on('taphold',function(){
// 	console.log(111)
// })

var loadRES = ['img/boc.png',
'img/p1_01.png','img/p1_02.png','img/p1_03.png','img/p1_04.png','img/p1_05.png',
'img/p2_01.png','img/p2_02.png','img/p2_03.png','img/p2_05.png','img/p2_06.png','img/p2_07.png',
'img/t1.png','img/t2.png','img/t3.png','img/t4.png','img/t5.png','img/t6.png','img/t7.png','img/t8.png','img/t9.png',
'img/units-icons.png'
];

// loading(loadRES, function () {
// 	loadPage('welcome');
// });