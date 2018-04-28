//禁止窗口的默认滑动
document.ontouchmove = function (e) {
	e.preventDefault();
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

var mySwiper = new Swiper('.swiper-container', {
	// speed:
	nextButton: '#page-items-box .box-right',
	prevButton: '#page-items-box .box-left',
	onSlideChange: function (swiper) {
		if (swiper.isEnd) {
			$('#page-items-box .box-right').hide();
		} else {
			$('#page-items-box .box-right').show();
		}
		if (swiper.isBeginning) {
			$('#page-items-box .box-left').hide();
		} else {
			$('#page-items-box .box-left').show();
		}
	},
	// autoplay: 5000,//可选选项，自动滑动
	onInit: function (swiper) {
		$('#page-items-box').addClass('hide');
	}
})

function loadPage(next) {
	if (next == 'items') {
		var _timer = setTimeout(function () {
			$('#items .page-items1').css('animation','shan 1.5s linear infinite both');
			$('#items .page-items2').css('animation','shan 1.5s .5s linear infinite both');
			$('#items .page-items3').css('animation','shan 1.5s linear infinite both');
			$('#items .page-items4').css('animation','shan 1.5s .5s linear infinite both');
			clearTimeout(_timer);
		}, 1500);
	}
	$('#' + next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');

}
// 链接
// page1
$('#welcome .page-next').on('swipeup', function (e) {
	loadPage('items');
});
$('#welcome .page-next').on('click', function (e) {
	loadPage('items');
});
// page2
$('#items .page-items').on('click', function () {
	$('#page-items-box').removeClass('hide');

	var _page = $(this).data('type'); // 当前页面
	$('#page-items-box').removeClass('hide');
	mySwiper.update();
	mySwiper.slideTo(_page, 300, true);
	// console.log(_item)
	// $('.'+_item).removeClass('hide').siblings('.sub-item-box').addClass('hide');
});
$('.page-items-box').on('click', '.box-close', function () {
		$('#page-items-box').addClass('hide');
	})
	// 报名
	.on('click', '.box-next', function () {
		loadPage('end');
	})


// 分享
$('.a').on('click', function () {
	$('.share-box').removeClass('hide')
});
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
		$('.share-box').fadeIn();
	}
});
$('#end .page-form-btn2').on('click',function(){
	window.location.href="http://j.map.baidu.com/Sj5OL";
})

// $('#J_language').on('taphold',function(){
// 	console.log(111)
// })

var loadRES = ['img/icon/boc.png',
	'img/p1_1.png', 'img/p1_2.png', 'img/p1_3.png', 'img/p1_4.png', 'img/p1_5.png', 'img/p1_6.png', 'img/p1_7.png', 'img/p1_8.png', 'img/p1_9.png', 'img/p1_10.png', 'img/p1_11.png', 'img/p1_12.png', 'img/p1_13.png', 'img/p1_14.png',
	'img/p2_1.png', 'img/p2_2.png', 'img/p2_3.png', 'img/p2_4.png', 'img/p2_5.png',
	'img/p3_1.png', 'img/p3_2.png', 'img/p3_3.png', 'img/p3_4.png', 'img/p3_5.png', 'img/p3_6.png',
	'img/p4_1.png', 'img/p4_2.png', 'img/p4_3.png', 'img/p4_4.png', 'img/p4_5.png', 'img/p4_6.png', 'img/p4_7.png', 'img/p4_8.png',
	'img/p5_1.png', 'img/p5_2.png', 'img/p5_3.png', 'img/p5_4.png', 'img/p5_5.png', 'img/p5_6.png', 'img/p5_7.png',
	'img/music.png'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('end');
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