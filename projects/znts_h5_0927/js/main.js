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
			loadPage('welcome2');
		clearTimeout(_t1);
		},3000);
	}
	else if(next=='welcome2'){
		var _t1=setTimeout(function(){
			loadPage('list1');
		clearTimeout(_t1);
		},3000);
	}
	else if(next=='list1'){
		var _t1=setTimeout(function(){
			loadPage('list2');
		clearTimeout(_t1);
		},3000);
	}
	else if(next=='list2'){
		var _t1=setTimeout(function(){
			loadPage('list3');
		clearTimeout(_t1);
		},3000);
	}
	else if(next=='list3'){
		var _t1=setTimeout(function(){
			loadPage('list4');
		clearTimeout(_t1);
		},3000);
	}
	else if(next=='list4'){
		var _t1=setTimeout(function(){
			loadPage('form');
		clearTimeout(_t1);
		},3000);
	}
	
}

//关闭
$('.page-dialog').on('click', '.dialog-close', function () {
	$(this).parent('.page-dialog').fadeOut();
})
// 规则
$(' .page-rule').on('click', function () {
	$('.page-rule-dialog').fadeIn().siblings('.page-dialog').fadeOut();
});
// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-time').val() == '') {
		dialogueTips('请选择时间……');
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
		loadPage('end');
	}
});

// $('#J_language').on('taphold',function(){
// 	console.log(111)
// })

var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png',
'img/p2_1.png','img/p2_2.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png',
'img/music.png','img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('form');
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