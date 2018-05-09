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

// var windowWidth = $(window).width(),
// 	windowHeight = $(window).height(),
// 	$body = $("body");
// if (windowWidth > 640) {
// 	$body.height(windowHeight).width(windowHeight * 320 / 504);
// } else {
// 	$body.height(windowHeight);
// }

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
// playClicked();

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
 //    if(next=='welcome'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('welcome2');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

//链接
// 苏州
$('#welcome .btn5').on('click',function(){window.location.href= "item1.html"});
$('#item1 .btn2').on('click',function(){window.location.href= "http://mp.weixin.qq.com/s/0U2t1vdxGwTlOvqleaIW3g"});
$('#item1 .btn3').on('click',function(){window.location.href= "http://mp.weixin.qq.com/s/FkG0f9fRD3SfbVpm6Pqljw"});
$('#item1 .btn5').on('click',function(){window.location.href= "http://mp.weixin.qq.com/s/QzmE0qhlAR-wexOwtQ0gQg"});
$('#item1 .btn6').on('click',function(){window.location.href= "https://c.eqxiu.com/s/VF2ZPdPn?eqrcode=1&share_level=2&from_user=af00c299-ef44-4185-8c8b-641865b97f15&from_id=1f943c85-8d49-4ef5-b35f-2389c5a3d77e&share_time=1522412226760&from=singlemessage&isappinstalled=0"});
// 昆山
$('#welcome .btn8').on('click',function(){window.location.href= "item2.html"});
$('#item2 .btn1').on('click',function(){window.location.href= "http://u4364282.viewer.maka.im/pcviewer/Y0HYCXGL"});
$('#item2 .btn2').on('click',function(){window.location.href= "http://u5280087.viewer.maka.im/pcviewer/BI9KE3FS"});


$('#welcome .btn4').on('click',function(){window.location.href= "item3.html"});
// 泰兴
$('#welcome .btn3').on('click',function(){window.location.href= "item4.html"});
$('#item4 .btn1').on('click',function(){window.location.href= "http://mp.weixin.qq.com/s?__biz=MzUyNjQzODA1Mg==&tempkey=OTUxX3pXUXNmVnBPNGlBWmdyc2hoUHM4b3hGLVJWeUhQUkhmMTltZ1BZWldmWnZtQlJYczVKVWZocURhZmNaUV9zeE9RYWJRRVMtV1ZUSmtpV3k3YkRUakhNS1daUmk3XzJzcm51aE1wRVdDMW05aXA3aDVUUmZIanhSR2dDa2VubEROdnlOMm5fZGxEdkNmVzJQMDRrdGFPWlNtYXp3WFdKa1BsVUg1dFF%2Bfg%3D%3D&chksm=7a0f9a5a4d78134ca502d27bb1bc63414e8cac8e00dd8ddba1a3a8ba95167642913c8a8d09f0&mpshare=1&scene=1&srcid=0404SY6u6UrcPgH0bbZivhAh#wechat_redirect"});
$('#item4 .btn2').on('click',function(){window.location.href= "http://u6735941.viewer.maka.im/k/KYBRWU7Y?from=timeline&isappinstalled=0"});

// 上滑
// $('#welcome').on('swipeup', function (e) {
// 	loadPage('welcome2');
// }).on('click', function (e) {
// 	loadPage('welcome2');
// });
// 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 关闭
// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});
// 提交
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
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png',
'img/p2_11.png','img/p2_12.png','img/p2_13.png','img/p2_14.png','img/p2_15.png','img/p2_16.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png',
'img/p4_1.png','img/p4_2.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png',
'img/music2.png','img/arrow.png','img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg','img/bg5.jpg'
];

