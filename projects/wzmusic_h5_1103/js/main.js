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

// 录音
// 音乐
var audio_con = [];
['media/p1/m1.mp3', 	
 'media/p1/m2.mp3', 	
 'media/p1/m3.mp3', 	
 'media/p1/m4.mp3', 	
 'media/p1/m5.mp3', 	
 'media/p1/m6.mp3', 	
 'media/p1/m7.mp3', 	
 'media/p2/tree1.mp3', 	//7
 'media/p2/tree2.mp3', 	
 'media/p2/tree3.mp3', 	
 'media/p2/tree4.mp3', 	
 'media/p2/tree5.mp3', 	
 'media/p2/tree6.mp3', 	
 'media/p2/tree7.mp3', 	//13
//  'media/music.mp3',
 'media/mfinish.mp3'
//  'media/p3/voice1.mp3', 
//  'media/p3/voice2.mp3', 
].forEach(function(v,i){
	var mUsic = new Audio(v);
	mUsic.loop=true;
	audio_con.push(mUsic);
	mUsic=null;
});
document.addEventListener("WeixinJSBridgeReady", function () {
	audio_con.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);

//~播放指定音乐
function aUdio(cur_audio){
	audio_con.forEach(function(item,_index) {
		item.pause();
	});
	audio_con[cur_audio].currentTime = 0;
	audio_con[cur_audio].play();
}
//~停止所有音乐
function stopAudio_con(){
	audio_con.forEach(function(item,_index) {
		item.pause();
	});
}

function loadPage(next) {
	$('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
	if(next=='welcome'){
		$(".music").removeClass("on").addClass("off");
		$('#welcome .page-tape img').attr('src',_tapes[0]);
		$('#welcome .page-text img').attr('src',_tapetxt[0]);
		stopAudio_con();
		var _t1=setTimeout(function(){
			$('#welcome .page-cover img').attr('src','img/p1_27.png');
			$('#welcome .page-btn2 img').attr('src','img/p1_12.png');
			clearTimeout(_t1);
			aUdio(0);
		},1000);
	}
	if(next=='text'){
		playClicked();
	}
	if(next=='welcome'||next=='text'){
		$('.resize').removeClass('hide');
	}else{
		$('.resize').addClass('hide');
	}
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

// 参数
var _tapes=['img/p1_24.png','img/p1_22.png','img/p1_20.png','img/p1_18.png','img/p1_16.png','img/p1_14.png','img/p1_26.png',],
	_tapetxt=['img/p1_23.png','img/p1_21.png','img/p1_19.png','img/p1_17.png','img/p1_15.png','img/p1_13.png','img/p1_25.png',],
	_num=0;  //当前录音
// 链接
// page1城市心声
// 上一首
$('#welcome .page-btn1').on('click',function(){
	_num--;
	if(_num<0){
		_num=_tapes.length-1;
	}
	stopAudio_con();
	// 盖打开
	$('#welcome .page-cover img').attr('src','img/p1_28.png');
	// 播放按钮
	$('#welcome .page-btn2 img').attr('src','img/p1_10.png');
	// 磁带
	$('#welcome .page-tape').css('animation','fadeOutRight 1s ease both');
	// 文字
	$('#welcome .page-text').css('animation','fadeOut 1s ease both');
	var _t2=setTimeout(function(){
		$('#welcome .page-tape img').attr('src',_tapes[_num]);
		$('#welcome .page-text img').attr('src',_tapetxt[_num]);
		$('#welcome .page-tape').css('animation','fadeInLeft 1s ease both');
		$('#welcome .page-text').css('animation','fadeInUp1 1s 1s ease both');
		clearTimeout(_t2);
		var _t3=setTimeout(function(){
			// 盖合上
			$('#welcome .page-cover img').attr('src','img/p1_27.png');
			// 播放按钮
			$('#welcome .page-btn2 img').attr('src','img/p1_12.png');
			aUdio(_num);
			clearTimeout(_t3);
		},1000);
	},1000);
	// 当前按钮
	$('#welcome .page-btn1 img').attr('src','img/p1_11.png');
	var _t1=setTimeout(function(){
		$('#welcome .page-btn1 img').attr('src','img/p1_9.png');
		clearTimeout(_t1);
	},350);
	console.log(_num);
});
// 播放
$('#welcome .page-btn2').on('click',function(){
	var _this=$(this).find('img');
	if(_this.attr('src')=='img/p1_10.png'){
		$('#welcome .page-cover img').attr('src','img/p1_27.png');
		$('#welcome .page-btn2 img').attr('src','img/p1_12.png');
	}else{
		$('#welcome .page-btn2 img').attr('src','img/p1_10.png');
	}
});
// 下一首
$('#welcome .page-btn3').on('click',function(){
	_num++;
	if(_num>=_tapes.length){
		_num=0;
	}
	stopAudio_con();
	// 盖打开
	$('#welcome .page-cover img').attr('src','img/p1_28.png');
	// 播放按钮
	$('#welcome .page-btn2 img').attr('src','img/p1_10.png');
	// 磁带
	$('#welcome .page-tape').css('animation','fadeOutLeft 1s ease both');
	// 文字
	$('#welcome .page-text').css('animation','fadeOut 1s ease both');
	var _t2=setTimeout(function(){
		$('#welcome .page-tape img').attr('src',_tapes[_num]);
		$('#welcome .page-text img').attr('src',_tapetxt[_num]);
		$('#welcome .page-tape').css('animation','fadeInRight 1s ease both');
		$('#welcome .page-text').css('animation','fadeInUp1 1s 1s ease both');
		clearTimeout(_t2);
		var _t3=setTimeout(function(){
			// 盖合上
			$('#welcome .page-cover img').attr('src','img/p1_27.png');
			// 播放按钮
			$('#welcome .page-btn2 img').attr('src','img/p1_12.png');
			aUdio(_num);
			clearTimeout(_t3);
		},1000);
	},1000);
	// 当前按钮
	$('#welcome .page-btn3 img').attr('src','img/p1_11.png');
	var _t1=setTimeout(function(){
		$('#welcome .page-btn3 img').attr('src','img/p1_9.png');
		clearTimeout(_t1);
	},350);
	console.log(_num);
});
// 下一页
$('#welcome').on('swipeup', function (e) {
	stopAudio_con();
	loadPage('text');
});
// .on('click', function (e) {
// 	stopAudio_con();
// 	loadPage('text');
// });

// page2文字
$('#text .page-img').on('swipeup', function (e) {
	loadPage('tree');
}).on('click', function (e) {
	loadPage('tree');
}).on('swipedown',function(){
	loadPage('welcome');
});
// page3树
$('#tree .page-img1').on('click',function(){audio_player.pause();$(".music").removeClass("on").addClass("off");stopAudio_con();aUdio(7);});
$('#tree .page-img2').on('click',function(){audio_player.pause();$(".music").removeClass("on").addClass("off");stopAudio_con();aUdio(8);});
$('#tree .page-img3').on('click',function(){audio_player.pause();$(".music").removeClass("on").addClass("off");stopAudio_con();aUdio(9);});
$('#tree .page-img4').on('click',function(){audio_player.pause();$(".music").removeClass("on").addClass("off");stopAudio_con();aUdio(10);});
$('#tree .page-img5').on('click',function(){audio_player.pause();$(".music").removeClass("on").addClass("off");stopAudio_con();aUdio(11);});
$('#tree .page-img6').on('click',function(){audio_player.pause();$(".music").removeClass("on").addClass("off");stopAudio_con();aUdio(12);});
$('#tree .page-img7').on('click',function(){audio_player.pause();$(".music").removeClass("on").addClass("off");stopAudio_con();aUdio(13);});
// 上一页
$('#tree').on('swipedown',function(){loadPage('text')});
// 下一页
$('#tree .page-click').on('click',function(){
	stopAudio_con();
	audio_player.play();$(".music").removeClass("off").addClass("on");
	var _t1=setTimeout(function(){
		$('#tree').css({
			'animation':'enter 2s ease both',
			'transform-origin':'center 70%'
		});
		clearTimeout(_t1);
		var _t2=setTimeout(function() {
			loadPage('voice');
			clearTimeout(_t2);
		}, 1000);
	},100);
});

// page4录音
// $('#voice .page-btn1').on('click',function(){
// 	audio_player.pause();
// 	$(".music").removeClass("on").addClass("off");
// 	$('#voice .page-box').removeClass('hide');
// 	$('#voice audio')[0].play();
// 	loadPage('voice');
// });
// 长按
	$('#voice .page-btn1').on('touchstart',function(){
		audio_player.pause();
		$(".music").removeClass("on").addClass("off");
		$('#voice .page-btn1').removeClass('off').addClass('on');
	}).on('touchend',function(){
		$('#voice .page-btn1 p').text('试听');
		$('#voice .page-btn1').removeClass('on').addClass('off');
		$('#voice .page-btn2').removeClass('hide');
		$('#voice .page-btn3').removeClass('hide');
	   });
	//    重新录制
	   $('#voice .page-btn2').on('click',function(){
		$('#voice .page-btn1 p').text('请长按录音');
	   });
	//    提交
   $('#voice .page-btn3').on('click',function(){
		$('#voice .page-box').removeClass('hide');
		$('#voice audio')[0].play();
		loadPage('voice');
   })
// 下一页
$('#voice .page-box').on('click',function(){
	loadPage('end');
	audio_player.play();$(".music").removeClass("off").addClass("on");
});

// page5
$('#end .page-list li').on('click',function(){
	audio_player.pause();$(".music").removeClass("on").addClass("off");
	var _this=$(this);
	var _listAudio=_this.find('audio')[0];
	$('#end .page-list li').each(function() {
		$(this).removeClass('on').addClass('off');
		$(this).find('audio')[0].pause();
		$(this).find('audio')[0].currentTime = 0;
	});
	_listAudio.play();
	_this.removeClass('off').addClass('on');
	_listAudio.onended=function(){
		_this.removeClass('on').addClass('off');
		audio_player.play();$(".music").removeClass("off").addClass("on");
	}
});
// 分享
$('#end .page-btn').on('click',function(){$('#end .page-box').removeClass('hide');});
$('#end .page-box').on('click',function(){$('#end .page-box').addClass('hide');});

// page6
// 录音
$('#welcome2 .page-img2').on('click',function(){
	audio_player.pause();$(".music").removeClass("on").addClass("off");
	$('#welcome2 audio')[0].play();
	$('#welcome2 audio')[0].onended=function(){
		audio_player.play();$(".music").removeClass("off").addClass("on");
	};
});
// 重新观看
$('#welcome2 .page-btn').on('click',function(){window.location.href="index.html"});

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


var loadRES = ['img/icon/boc.png','img/p0_1.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_10.png',
'img/p1_11.png','img/p1_12.png','img/p1_13.png','img/p1_14.png','img/p1_15.png','img/p1_16.png','img/p1_17.png','img/p1_18.png','img/p1_19.png','img/p1_20.png',
'img/p1_21.png','img/p1_22.png','img/p1_23.png','img/p1_24.png','img/p1_25.png','img/p1_26.png','img/p1_27.png','img/p1_28.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png','img/p3_8.png','img/p3_9.png','img/p3_10.png','img/p3_11.png','img/p3_12.png','img/p3_13.png','img/p3_14.png','img/p3_15.png','img/p3_16.png','img/p3_17.png','img/p3_18.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png','img/p5_7.png','img/p5_8.png',
'img/music2.png','img/bg1.jpg'
];


