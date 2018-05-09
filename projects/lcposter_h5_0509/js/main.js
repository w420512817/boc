//禁止窗口的默认滑动
document.ontouchmove = function (e) {
	e.preventDefault();
}
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
    if(next=='end'){
		var w = $("#end").width();
		var h = $("#end").height();
		
		//要将 canvas 的宽高设置成容器宽高的 2 倍
		var canvas = document.createElement("canvas");
		canvas.width = w * 2;
		canvas.height = h * 2;
		canvas.style.width = w + "px";
		canvas.style.height = h + "px";
		var context = canvas.getContext("2d");
		//然后将画布缩放，将图像放大两倍画到画布上
		context.scale(2,2);
		var _t1=setTimeout(function(){
		
			html2canvas($("#end")[0], {
				canvas: canvas,
				onrendered: function(canvas) {
					var img = canvas.toDataURL();
					$('#end .page-img img').attr('src',img);
				}
			});
			clearTimeout(_t1);
		},1000);
	// 	var _t1=setTimeout(function(){
	// 		loadPage('welcome2');
	// 	clearTimeout(_t1);
	// 	},3000);
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

//链接
// $('.b').on('click',function(){window.location.href= ""});
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

// 随机图片
var _arr=['img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png','img/p2_11.png','img/p2_12.png'];
// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-name').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		// 随机
		var _index= Math.floor(Math.random()*11);
		console.log(_arr[_index]);
		$('#end .page-box p').text($('#info-name').val());
		$('#end .page-box img').attr('src',_arr[_index]);
		loadPage('end');
	}
});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png',
'img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png','img/p2_11.png','img/p2_12.png',
'img/music2.png','img/arrow.png','img/bg1.jpg','img/bg2.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('end');
});

