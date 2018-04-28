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
    
}

// 展开
$('#welcome .page-ul.ul-1').on('click',function(){
	// 上
	if($(this).hasClass('ro')){
		$(this).removeClass('ro').nextUntil('.page-ul.ul-2').addClass('out');
	}
	// 下
	else{
		if($('.page-li1').hasClass('out')){
			$(this).addClass('ro').nextUntil('.page-ul.ul-2').removeClass('out');
		}else{
			$(this).addClass('ro').nextUntil('.page-ul.ul-2').removeClass('hide');
		}
	}
})
$('#welcome .page-ul.ul-2').on('click',function(){
	// 上
	if($(this).hasClass('ro')){
		$(this).removeClass('ro').nextAll('.page-li2').addClass('out');
	}
	// 下
	else{
		if($('.page-li2').hasClass('out')){
			$(this).addClass('ro').nextAll('.page-li2').removeClass('out');
		}else{
			$(this).addClass('ro').nextAll('.page-li2').removeClass('hide');
		}
	}
});
// 链接
// 首页
// 一级
$('#welcome .page-li1.li-11').on('click',function(){window.location.href="wz_menu1.html";});
$('#welcome .page-li1.li-12').on('click',function(){window.location.href="wz_menu2.html";});
$('#welcome .page-li1.li-13').on('click',function(){window.location.href="wz_menu3.html";});
$('#welcome .page-li1.li-14').on('click',function(){window.location.href="wz_menu4.html";});
$('#welcome .page-li2.li-21').on('click',function(){window.location.href="sx_menu1.html";});
$('#welcome .page-li2.li-22').on('click',function(){window.location.href="sx_menu2.html";});
// 二级
// 龙湾首府
$('#list11 .page-btn1').on('click',function(){window.location.href="wz_menu1_item1.html";});
// 温州龙湾
$('#list12 .page-btn1').on('click',function(){window.location.href="wz_menu2_item1.html";});
$('#list12 .page-btn2').on('click',function(){window.location.href="wz_menu2_item3.html";});
$('#list12 .page-btn3').on('click',function(){window.location.href="wz_menu2_item2.html";});
// 温州瓯海
$('#list13 .page-btn1').on('click',function(){window.location.href="wz_menu3_item1.html";});
// 温州v8
$('#list14 .page-btn1').on('click',function(){window.location.href="wz_menu4_item1.html";});
// 绍兴袍江
$('#list21 .page-btn1').on('click',function(){window.location.href="sx_menu1_item1.html";});
// 绍兴诸暨
$('#list22 .page-btn1').on('click',function(){window.location.href="sx_menu2_item1.html";});
$('#list22 .page-btn2').on('click',function(){window.location.href="sx_menu2_item2.html";});

var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_10.png','img/p1_11.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png',
// 'img/music.png','img/bg1.jpg'
];

// loading(loadRES, function () {
// 	loadPage('welcome');
// 	// loadPage('list');
// });

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