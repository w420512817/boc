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

// 链接
// $('#welcome .page-icon1').on('click',function(){$('.pl-1').fadeIn();});
// $('#welcome .page-icon2').on('click',function(){$('.pl-2').fadeIn();});
// $('#welcome .page-icon3').on('click',function(){$('.pl-3').fadeIn();});
$('#welcome .page-img2').on('click',function(){window.location.href="xindacenter.html";});
$('#welcome .page-icon1').on('click',function(){window.location.href="xinda.html";});
$('#welcome .page-icon2').on('click',function(){window.location.href="rongchuang.html";});
$('#welcome .page-icon3').on('click',function(){window.location.href="binjiang.html";});
$('#welcome .page-icon4').on('click',function(){window.location.href="tel:0571-8760-8888";});
// $('#welcome .page-icon5').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.3078718,120.131249&title=杭州博采网络科技股份有限公司&content=莫干山路841弄23号中博文化创意园E座6层&output=html";});
// $('#welcome .page-icon5').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=120.230537,30.2352&title=信达中心杭州壹号院&content=浙江省杭州市滨江区科技馆街与飞虹路交叉口&output=html";});
$('#welcome .page-icon5').on('click',function(){window.location.href="https://map.baidu.com/mobile/webapp/place/detail/qt=s&wd=%E4%BF%A1%E8%BE%BE%E4%B8%AD%E5%BF%83%E6%9D%AD%E5%B7%9E%E5%A3%B9%E5%8F%B7%E9%99%A2&newmap=1&ie=utf-8&c=180&uid=b0b7ef8a79de07b95fd4fe7a/i=0&showall=1&pos=0&da_ref=listclk&da_qrtp=11&da_adtp=&da_log=&da_adquery=%E4%BF%A1%E8%BE%BE%E4%B8%AD%E5%BF%83%E6%9D%AD%E5%B7%9E%E5%A3%B9%E5%8F%B7%E9%99%A2&da_adtitle=%E4%BF%A1%E8%BE%BE%E4%B8%AD%E5%BF%83%E6%9D%AD%E5%B7%9E%E5%A3%B9%E5%8F%B7%E9%99%A2&da_adindus=&detail_from=list&vt=map/?fromhash=1";});

//关闭
$('.back').on('click', function () {
	$('.pagel').fadeOut();
})
// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});
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
		loadPage('welcome2');
	}
});

// $('#J_language').on('taphold',function(){
// 	console.log(111)
// })

var loadRES = ['img/icon/boc.png',
'img/p1.png','img/p2.png','img/p3.png','img/p4.png','img/p5.png','img/p6.png','img/p7.png',
'img/bg1.jpg','img/bg2.jpg','img/bg3_1.jpg','img/bg3_2.jpg','img/bg3_3.jpg','img/bg3_4.jpg','img/bg3_5.jpg',
'img/music.png'
];

loading(loadRES, function () {
	loadPage('welcome');
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