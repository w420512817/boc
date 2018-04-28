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
// $('.b').on('click',function(){window.location.href= ""});
$('.welcome .page-btn,.welcome .page-btn2').on('click',function(){loadPage('form')});
$('.form .page-btn').on('click',function(){loadPage('game')});
// 关闭
$('.page-close').on('click',function(){
	$(this).parents('.page-success').hide();
	$(this).parents('.page-error').hide();
});

var _num=1; //次数
$("#startbtn").rotate({
	bind:{
		click:function(){
			if(_num>0){
				var a = 30; // 特等奖30 一等奖90 二等奖210 三等奖270 谢谢参与150 330
				$("#disk").rotate({
					duration:3000,
					angle: 0,
					animateTo:1440+a,
					easing: $.easing.easeOut,
					callback: function(){
						setTimeout(function(){
							if(a == 30){
								$('.page-success').show().find('.page-bg>img').attr('src','img/p3_11.png');
							}else if(a == 90){
								$('.page-success').show().find('.page-bg>img').attr('src','img/p3_4.png');
							}else if(a == 150||a==330){
								$('.page-error').show().find('.page-bg>img').attr('src','img/p3_1.png');
							}else if(a == 210){
								$('.page-success').show().find('.page-bg>img').attr('src','img/p3_9.png');
							}else if(a == 270){
								$('.page-success').show().find('.page-bg>img').attr('src','img/p3_10.png');
							}

						});
					}
				});
				_num--;
			}else{
				$('.page-error').show().find('.page-bg>img').attr('src','img/p3_3.png');
			}
			
		}
	}
});

// 中奖提交
$('#formsucc-submit').on('click', function () {
	var _check = true;
	if ($('#formsucc-add').val() == '') {
		dialogueTips('请填写收货地址……');
		_check = false;
	}
	if ($('#formsucc-phone').val() == '') {
		dialogueTips('请填写联系方式……');
		_check = false;
	}
	if ($('#formsucc-name').val() == '') {
		dialogueTips('请填写姓名……');
		_check = false;
	}
	if (_check) {
		dialogueTips('提交成功！');
		setTimeout(function(){
			$('.page-success').hide();
			$('.page-error').show().find('.page-bg>img').attr('src','img/p3_3.png');
		},1500);
	}
});

// 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 关闭
// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});

var loadRES = ['img/icon/boc.png',
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg',
'img/p1_1.png',
'img/p2_1.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png','img/p3_8.png','img/p3_9.png','img/p3_10.png','img/p3_11.png'
];



