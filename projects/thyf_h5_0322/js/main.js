//禁止窗口的默认滑动
// document.ontouchmove = function (e) {
// 	e.preventDefault();
// }
// $("body").bind("touchmove",function(event){event.preventDefault();});
// $("body").unbind("touchmove");

$('body').height($(window).height());

// var audio_player=document.getElementById('audio_player');
//music
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

// 音乐
var audio_con = [];
[
'media/music.mp3',  //背景
'media/m1.mp3', 	//电视-西游记
 'media/m2.mp3', 	//自行车铃声-婚纱照
 'media/m3.mp3', 	//收音机-恰似你的温柔
 'media/m4.mp3', 	//军装-走步声
 'media/m5.mp3', 	//粮票-粮油店
 'media/m6.mp3', 	//饭盒-餐厅声音
 'media/m7.mp3'    //手风琴- 喀秋莎
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
// 点击
$('.pagel1').on('click',function(){
	audio_player.pause();
	$(".music").removeClass("on").addClass("off")
	stopAudio_con();
	aUdio(1);
	$('.black-box').find('img:nth-child(1)').attr('src','img/p3_3.png');
	$('.black-box').fadeIn();
	$('.pagel .tip1').css('top','78%');
});
$('.pagel2').on('click',function(){
	audio_player.pause();
	$(".music").removeClass("on").addClass("off")
	stopAudio_con();
	aUdio(2);
	$('.black-box').find('img:nth-child(1)').attr('src','img/p3_4.png');
	$('.black-box').fadeIn();
	$('.pagel .tip1').css('top','128%');
});
$('.pagel3').on('click',function(){
	audio_player.pause();
	$(".music").removeClass("on").addClass("off")
	stopAudio_con();
	aUdio(3);
	$('.black-box').find('img:nth-child(1)').attr('src','img/p4_4.png');
	$('.black-box').fadeIn();
	$('.pagel .tip1').css('top','159%');
});
$('.pagel4').on('click',function(){
	audio_player.pause();
	$(".music").removeClass("on").addClass("off")
	stopAudio_con();
	aUdio(4);
	$('.black-box').find('img:nth-child(1)').attr('src','img/p4_5.png');
	$('.black-box').fadeIn();
	$('.pagel .tip1').css('top','190%');
});
$('.pagel5').on('click',function(){
	audio_player.pause();
	$(".music").removeClass("on").addClass("off")
	stopAudio_con();
	aUdio(5);
	$('.black-box').find('img:nth-child(1)').attr('src','img/p4_6.png');
	$('.black-box').fadeIn();
	$('.pagel .tip1').css('top','238%');
});
$('.pagel6').on('click',function(){
	audio_player.pause();
	$(".music").removeClass("on").addClass("off")
	stopAudio_con();
	aUdio(6);
	$('.black-box').find('img:nth-child(1)').attr('src','img/p5_3.png');
	$('.black-box').fadeIn();
	$('.pagel .tip1').css('top','281%');
});
$('.pagel7').on('click',function(){
	audio_player.pause();
	$(".music").removeClass("on").addClass("off")
	stopAudio_con();
	aUdio(7);
	$('.black-box').find('img:nth-child(1)').attr('src','img/p5_4.png');
	$('.black-box').fadeIn();
	$('.pagel .tip1').css('top','37%');
});
// 下一页
$('.pagel .tip2').on('click',function(){
	location.hash = "#slide6";
	// $('.pagel ').addClass('hide');
	$('.pagel ').fadeOut();
});

// 关闭
$('.black-box')
.on('click','img:nth-child(2)',function(){
	$(this).parent('.black-box').fadeOut();
	stopAudio_con();
	audio_player.play();
	$(".music").removeClass("off").addClass("on");
	if($(this).parent().find('img:nth-child(3)').hasClass('hide')){
		$(this).parent().find('img:nth-child(3)').removeClass('hide')
	}
})
// 暂停
.on('click','img:nth-child(3)',function(){
	stopAudio_con();
	$(this).addClass('hide');
});

var mySwiper = new Swiper('#swiper1', {
	observer: true,
	noSwiping : true,
	direction: 'vertical',
	loop: false,
	hashnav: true,
	effect:'fade',
	init: false,
	hashnavWatchState: true,
	onSlideChangeEnd: function (swiper) {
		console.log(swiper.activeIndex)
		//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
		$('#swiper1 .swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
		// if (swiper.activeIndex == 6||swiper.activeIndex == 5||swiper.activeIndex == 1) {
		// 	$('.resize').hide();
		// } else {
		// 	$('.resize').show();
		// }
		if(swiper.activeIndex == 1){
			var _t1=setTimeout(function(){
				location.hash = "#slide3";
				// mySwiper.slideNext();
				// $('.pagel').removeClass('hide');
				// $('.pagel').fadeIn();
				clearTimeout(_t1);
			},3800);
		}
		if(swiper.activeIndex == 2){
			var _t2=setTimeout(function(){
				$('.pagel').fadeIn();
				clearTimeout(_t2);
			},2000);
		}
	}
})
$('#swiper1 .swiper-slide').eq(0).addClass('enter');
//链接
$('.swiper-slide1').on('click',function(){location.hash = "#slide2"});
$('.swiper-slide6').on('click',function(){location.hash = "#slide7"});
// 分享
// $('.swiper-slide21 .swiper21_9').on('click', function () {$('.share-box').removeClass('hide')});
// 关闭
// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});

var loadRES = ['img/icon/boc.png',
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg6.jpg','img/bg7.jpg',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png',
'img/p2_1.png','img/p2_2.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png','img/p6_5.png','img/p6_6.png','img/p6_7.png','img/p6_8.png','img/p6_9.png','img/p6_10.png','img/p6_11.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png',
'img/music2.png','img/arrow.png','img/next.png'
]

loading(loadRES, function(){
	mySwiper.init();
	
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