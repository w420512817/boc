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
    
    if(next=='page06'){
		$("body").unbind("touchmove");
		$('.resize').show();
	}
	else if(next=='page07'){
		$('.resize').hide();
	}
	else{
		$("body").bind("touchmove",function(event){event.preventDefault();});
		$('.resize').show();
	}

	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

//关闭
// $('.page-dialog').on('click', '.dialog-close', function () {
// 	$(this).parent('.page-dialog').fadeOut();
// })
// // 规则
// $(' .page-rule').on('click', function () {
// 	$('.page-rule-dialog').fadeIn().siblings('.page-dialog').fadeOut();
// });
// // 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});
// // 提交
// $('#form-submit').on('click', function () {
// 	var _check = true;
// 	if ($('#info-phone').val() == '') {
// 		dialogueTips('请输入电话……');
// 		_check = false;
// 	}
// 	if ($('#info-name').val() == '') {
// 		dialogueTips('请输入姓名……');
// 		_check = false;
// 	}

// 	if (_check) {
// 		loadPage('welcome2');
// 	}
// });


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png','img/p6_5.png','img/p6_6.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png',
'img/music2.png','img/next.png','img/bg1.jpg'
]

loading(loadRES, function () {
	loadPage('page01');
	// loadPage('page06');
});


//  <div class="page slide-page page01 " nextHash="page02" prevHash="page00"></div>


// $('.page06').on('swipeup',function(event){
// 	event.stopPropagation();
// }).on('swipedown',function(event){
// 	event.stopPropagation();
// });

$('.page06 .page-6_6').on('swipeup',function(e){
	loadPage('page07')
}).on('swipedown',function(e){
	loadPage('page05');
});

$('.page').on('swipeup',function(e){
	// 向下翻页
	if($(this).attr('nextHash') != ''){
		loadPage($(this).attr('nextHash'))
	}
}).on('swipedown',function(e){
	// 向上翻页
	if($(this).attr('prevHash') != ''){
		loadPage($(this).attr('prevHash'))
	}

});