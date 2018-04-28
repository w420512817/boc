//禁止窗口的默认滑动
document.ontouchmove = function (e) {
	e.preventDefault();
}
// $("body").bind("touchmove",function(event){event.preventDefault();});
// $("body").unbind("touchmove");

$('body').height($(window).height())

//music
// document.addEventListener("WeixinJSBridgeReady", function () {
// 	audio_player.play();
// }, false);

function playClicked() {
	if (audio_player.paused) {
		audio_player.play();
		$(".music").removeClass("off").addClass("on")
	} else {
		audio_player.pause();
		$(".music").removeClass("on").addClass("off")
	}
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
		alert("载入图片资源出错喽");
	}

	function _update() {
		loadAmount++;
		percent = Math.round(loadAmount * 100 / imgAmount);
		$("#load-progress").text(percent);
		if (percent == 100 && callback) {
			$(".loading").fadeOut(function() {
				$(this).remove();
			});
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

$('.swiper-slide5 .swiper5_6').on('click',function(){
	$('.swiper5_7').removeClass('hide');
});

// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	console.log($('#info-add1').val());
	if ($('#info-date').val() == '') {
		dialogueTips('请选择接车日期……');
		_check = false;
	}
	if ($('#info-add2').val() == '') {
		dialogueTips('请输入送达点……');
		_check = false;
	}
	if ($('#info-add1').val() == '0') {
		dialogueTips('请选择接车点……');
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
		dialogueTips('报名成功！');
		// alert('成功');
		var _t1=setTimeout(function(){
			location.hash = "#slide6";
			clearTimeout(_t1);
		},1500);
	}
});

var _run = true;
//~播放视频
var videoList = [$("#currVideo")[0]],
	currVideo = videoList[0];
document.addEventListener("WeixinJSBridgeReady", function () {

	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);


// 判断视频是否自动播放
var browser={
    versions:function(){
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
            iPhone: u.indexOf('iPhone') > -1 ,
            iPad: u.indexOf('iPad') > -1,
            webApp: u.indexOf('Safari') == -1,
            weixin: u.indexOf('MicroMessenger') > -1,
            qq: u.match(/\sQQ/i) == " qq"
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
if((browser.versions.weixin && browser.versions.ios) || (!browser.versions.weixin && browser.versions.android)){
	currVideo.play();
	
	// alert(1)
	$('.play-btn').remove();
	document.addEventListener("WeixinJSBridgeReady", function () {
		audio_player.load();
		audio_player.play();
		audio_player.pause();
		videoList.forEach(function(v,i){
			v.load();
			v.play();
			v.pause();
		});
		currVideo.play();
	}, false);
}else{
	$('.play-btn').removeClass('hide');
}

$(".music").removeClass("on").addClass("off");

$('#currVideo,.play-btn').on('click',function(){
	$('.play-btn').addClass('hide');
	// if($(currVideo).hasClass('hide')){
	currVideo.play();
	// }
});

currVideo.addEventListener('ended',function(){
	$('#currVideo').fadeOut();
	mySwiper.init();
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	audio_player.currentTime = 0;
	audio_player.play();
	$(".music").removeClass("off").addClass("on");
});

var mySwiper = new Swiper('#swiper1', {
	observer: true,
	// noSwiping : true,
	direction: 'vertical',
	loop: false,
	hashnav: true,
	// effect:'fade',
	hashnavWatchState: true,
	init: false,
	onSlideChangeEnd: function (swiper) {
		console.log(swiper.activeIndex)
		//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
		$('#swiper1 .swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
		if (swiper.activeIndex == 4||swiper.activeIndex == 5) {
			$('.resize').hide();
		} else {
			$('.resize').show();
		}
	}
})
// $('#swiper1 .swiper-slide').eq(0).addClass('enter');
//链接
// $('.b').on('click',function(){location.hash = "#slide1"});
// 分享
// $('.swiper-slide21 .swiper21_9').on('click', function () {$('.share-box').removeClass('hide')});
// 关闭
// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png','img/p4_7.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png','img/p5_7.png','img/p5_8.png','img/p5_9.png','img/p5_10.png','img/p5_11.png','img/p5_12.png','img/p5_13.png','img/p5_14.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png','img/p6_5.png','img/p6_6.png','img/p6_7.png','img/p6_8.png',
'img/music2.png','img/next.png','img/bg1.jpg','img/bg2.jpg','img/bg3.jpg'
]
loading(loadRES, function(){
	
	// mySwiper.init();
});

