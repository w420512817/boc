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
// playClicked();

// 音乐
// var audio_con = [];
// ['media/m1.mp3', 	
//  'media/m2.mp3',
// ].forEach(function(v,i){
// 	var mUsic = new Audio(v);
// 	mUsic.loop=true;
// 	audio_con.push(mUsic);
// 	mUsic=null;
// });
// document.addEventListener("WeixinJSBridgeReady", function () {
// 	audio_con.forEach(function(v,i){
// 		v.load();
// 		v.play();
// 		v.pause();
// 	});
// }, false);

// //~播放指定音乐
// function aUdio(cur_audio){
// 	audio_con.forEach(function(item,_index) {
// 		item.pause();
// 	});
// 	audio_con[cur_audio].currentTime = 0;
// 	audio_con[cur_audio].play();
//		// audio_con[cur_audio].onended=function(){
//		// 	func();
//		// }
// }
// //~停止所有音乐
// function stopAudio_con(){
// 	audio_con.forEach(function(item,_index) {
// 		item.pause();
// 	});
// }


function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next=='music1'){
		// var _t1=setTimeout(function(){
			m1.play();
			m1.onended=function(){
				$('#music1 .dialog').removeClass('hide');
			}
			// clearTimeout(_t1);
		// },1500);
	}
    if(next=='music2'){
		// var _t2=setTimeout(function(){
			m2.play();
			m2.onended=function(){
				$('#music2 .dialog').removeClass('hide');
			}
			// clearTimeout(_t2);
		// },1500);
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}
// 首页
$('#scratch').scratch({
	// cover:'#ccc',
	cover:'img/p1_1.png',
	// ID:'canvas',
	// width:518,
	width:640,
	height:1030,
	// height:244,
	ratio:.99,
	touchRadius:20,
	resultData:function(){
		//~~ajax的话要注意加上 async:false
		var data = {
			img:'img/p1_2.png',
			id:'00001'
		}
		return data;
	},
	resultOperate:function(data){
		console.log('奖品id:'+data.id);
	},
	endOperate:function(){
		console.log('结束啦！');
		var _t3=setTimeout(function(){
			loadPage('welcome2');
			clearTimeout(_t3);
		},1000);
	}
});
// 链接
// welcome2
$('#welcome2 .page-btn').on('click',function(){loadPage('music1')});
//music1
$('#music1 .dialog .page-back').on('click',function(){$('#music1 .dialog').addClass('hide');m1.currentTime = 0;m1.play();});
// $('#music1 .dialog .page-choosea').on('click',function(){$('#music1 .tip-true').removeClass('hide');$('#music1 .tip-true').on('click',function(){loadPage('music2')});});
$('#music1 .dialog .page-choosea').on('click',function(){loadPage('music2')});
$('#music1 .dialog .page-chooseb').on('click',function(){$('#music1 .tip-false').removeClass('hide')});
$('#music1 .dialog .page-choosec').on('click',function(){$('#music1 .tip-false').removeClass('hide')});
$('#music1 .dialog .page-choosed').on('click',function(){$('#music1 .tip-false').removeClass('hide')});
//music2
$('#music2 .dialog .page-back').on('click',function(){$('#music2 .dialog').addClass('hide');m2.currentTime = 0;m2.play();});
$('#music2 .dialog .page-choosea').on('click',function(){$('#music2 .tip-false').removeClass('hide')});
$('#music2 .dialog .page-chooseb').on('click',function(){$('#music2 .tip-true').removeClass('hide');$('#music2 .tip-true').on('click',function(){loadPage('welcome3')});});
$('#music2 .dialog .page-choosec').on('click',function(){$('#music2 .tip-false').removeClass('hide')});
$('#music2 .dialog .page-choosed').on('click',function(){$('#music2 .tip-false').removeClass('hide')});
// welcome3
$('#welcome3 .page-btn').on('click',function(){loadPage('form')});
// form
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
		loadPage('end');
	}
});
$('#form .page-btn2').on('click',function(){$('.tip-way').removeClass('hide')});
// end
// 分享
$('#end .page-btn1').on('click',function(){$('.share-box').removeClass('hide')});
$('#end .page-btn2').on('click',function(){$('.tip-exchange').removeClass('hide')});

//关闭
$('.tip-false').on('click',function(){$('.tip-false').addClass('hide')});
$('.tip-true').on('click',function(){$('.tip-true').addClass('hide')});
$('.tip-way').on('click',function(){$('.tip-way').addClass('hide')});
$('.tip-exchange').on('click',function(){$('.tip-exchange').addClass('hide')});
$('.share-box').on('click',function(){$('.share-box').addClass('hide')});

var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png',
'img/p4_1.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png',
'img/p7_1.png',
'img/p8_1.png',
'img/p9_1.png','img/p9_2.png','img/p9_3.png','img/p9_4.png','img/p9_5.png','img/p9_6.png','img/p9_7.png','img/p9_8.png',
'img/p10_1.png','img/p10_2.png','img/p10_3.png','img/p10_4.png','img/p10_5.png',
'img/p11_1.png','img/p11_2.png','img/p11_3.png','img/p11_4.png','img/p11_5.png','img/p11_6.png',
'img/p12_1.png',
'img/p13_1.png',
'img/p14_1.png',
'img/music2.png','img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('welcome3');
});

