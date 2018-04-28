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

var mySwiper = new Swiper('#swiper1',{
	init: false,
	nextButton: '#imglist .page-next',
	prevButton: '#imglist .page-prev',
	// onSlideChange: function (swiper) {
	// 	if (swiper.isEnd) {
	// 		$('#imglist .page-next').hide();
	// 	} else {
	// 		$('#imglist .page-next').show();
	// 	}
	// 	if (swiper.isBeginning) {
	// 		$('#imglist .page-prev').hide();
	// 	} else {
	// 		$('#imglist .page-prev').show();
	// 	}
	// },
});

function loadPage(next) {
	$('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
	if(next=='welcome2'){
		$("body").bind("touchmove",function(event){event.preventDefault();});
	}
	if(next=='list'){
		mySwiper.init();
	}
    if(next=='end'){
		// 随机
		var _index= Math.floor(Math.random()*4);
		console.log(_index);
		if(_index==0){
			// 100
			$('#end .page-text img').attr('src','img/p6_3.png');
		}
		else if(_index==1){
			// 200
			$('#end .page-text img').attr('src','img/p6_4.png');
		}
		else if(_index==2){
			// 500
			$('#end .page-text img').attr('src','img/p6_5.png');
		}
		else{
			// 失败
			$('#end .page-text img').attr('src','img/p7_1.png');
			$('#end .page-img img').attr('src','img/p7_2.png');
			$('#end .page-btn').addClass('hide');
		}
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

//链接
$('#welcome').on('swipeup', function () {
	loadPage('welcome2');
}).on('click', function () {
	loadPage('welcome2');
});
// $('#welcome').on('click',function(){loadPage('welcome2')});
$('#welcome2 .page-btn1').on('click',function(){loadPage('list')});
$('#welcome2 .page-btn2').on('click',function(){$('#welcome2 .page-rule').removeClass('hide')});
$('#list .page-back').on('click',function(){loadPage('welcome2')});
$('#list .page-btn').on('click',function(){loadPage('form')});
$('#prize').on('click',function(){loadPage('end')});
$('#end .page-btn').on('click',function(){$('#end .page-rule').removeClass('hide')});


// 关闭
$('.page-rule').on('click',function(){$('.page-rule').addClass('hide')});
$('.share-box').on('click',function(){
	$('.share-box').addClass('hide');
	// 分享成功跳转最后一页
	loadPage('prize');
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
		$('#form .page-tip').removeClass('hide');
	}
});
// 分享
$('#form .page-tip').on('click',function(){$('#form .page-tip').addClass('hide');$('.share-box').removeClass('hide')});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png','img/p6_5.png',
'img/p7_1.png','img/p7_2.png',
'img/music2.png','img/bg1.jpg','img/lr.png','img/share_box.png'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('list');
});

