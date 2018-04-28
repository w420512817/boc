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

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next=='card1'||next=='card2'||next=='card3'||next=='card4'||next=='card5'){
		$('.resize').removeClass('hide');
		// $("body").unbind("touchmove");
	}else{
		$('.resize').addClass('hide');
		// $("body").bind("touchmove",function(event){event.preventDefault();});
	}
	if(next=='game'){
		var _t1=setTimeout(function(){
			choujiang();
			clearTimeout(_t1);
		},1000);
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
$('#welcome .page-btn1').on('click',function(){loadPage('card1')});
$('#welcome .page-btn2').on('click',function(){$('#welcome .page-rule').removeClass('hide')});
$('#welcome2 .page-btn').on('click',function(){loadPage('game')});

// 上滑
$('#card1').on('swipeup', function (e) {
	loadPage('card2');
}).on('swipedown',function(){
	loadPage('welcome');
}).on('click', function (e) {
	loadPage('card2');
});
$('#card2').on('swipeup', function (e) {
	loadPage('card3');
}).on('swipedown',function(){
	loadPage('card1');
}).on('click', function (e) {
	loadPage('card3');
});
$('#card3').on('swipeup', function (e) {
	loadPage('card4');
}).on('swipedown',function(){
	loadPage('card2');
}).on('click', function (e) {
	loadPage('card4');
});
$('#card4').on('swipeup', function (e) {
	loadPage('card5');
}).on('swipedown',function(){
	loadPage('card3');
}).on('click', function (e) {
	loadPage('card5');
});
$('#card5').on('swipeup', function (e) {
	loadPage('game');
}).on('swipedown',function(){
	loadPage('card4');
}).on('click', function (e) {
	loadPage('game');
});
// 返回首页
$('#game .page-btn2').on('click',function(){loadPage('welcome')});
$('#game .page-btn3').on('click',function(){window.location.href="index.html"});

var _arr1=['img/p7_6.png','img/p7_7.png','img/p7_8.png','img/p7_9.png','img/p7_10.png']; //大
var _arr2=['img/p7_12.png','img/p7_14.png','img/p7_16.png','img/p7_18.png','img/p7_20.png']; //小
// 翻牌
$('#game .page-cardb').on('click',function(){
	if($('#game .page-cardb img').attr('src')=='img/p7_5.png'){
		// 随机
		var _index= Math.floor(Math.random()*5);
		console.log(_index);
		$('#game .page-cardb').css('animation','rotate1 .5s ease both');
		var _t1=setTimeout(function(){
			$('#game .page-cardb img').attr('src',_arr1[_index]);
			$('#game .page-card'+_index+' img').attr('src',_arr2[_index]);
			$('#game .page-cardb').css('animation','rotate2 .5s ease both');
			// 抽奖
			// choujiang();
			clearTimeout(_t1);
		},500);
	}else{
		$('#game .page-tip1').removeClass('hide');
	}
});

// 召集助力
$('#game .page-btn1').on('click',function(){$('.share-box').removeClass('hide')});
var _arr3=['电饭煲 1个','面包机 1个','沐浴套装 1套'];
var _index2; 
// 点击抽奖
function choujiang(){
	// 集齐
	if($('#game .page-card0 img').attr('src')=='img/p7_12.png'&&
	$('#game .page-card1 img').attr('src')=='img/p7_14.png'&&
	$('#game .page-card2 img').attr('src')=='img/p7_16.png'&&
	$('#game .page-card3 img').attr('src')=='img/p7_18.png'&&
	$('#game .page-card4 img').attr('src')=='img/p7_20.png'){
		$('#game .page-btn1 img').attr('src','img/p8_6.png');
		$('#game .page-btn1').unbind().on('click',function(){
			if(_index2==null){
				// 随机
				_index2= Math.floor(Math.random()*4);
				console.log(_index2);
				// 未中奖
				if(_index2==3){
					$('#game .page-tip2 img').attr('src','img/p8_7.png');
				}
				// 中奖
				else{
					$('#game .page-tip2 img').attr('src','img/p8_8.png');
					$('#game .page-tip2 p').text(_arr3[_index2]);
				}
			}
			$('#game .page-tip2').removeClass('hide');
		});
	}
}
// 关闭
$('#welcome .page-rule').on('click',function(){$('#welcome .page-rule').addClass('hide')});
$('.share-box').on('click',function(){$('.share-box').addClass('hide')});
$('#game .page-tip1').on('click',function(){$('#game .page-tip1').addClass('hide')});
$('#game .page-tip2').on('click',function(){
	$('#game .page-tip2').addClass('hide');
	$('#game .page-btn1 img').attr('src','img/p8_9.png');
});




var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p1_6.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png','img/p6_5.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png','img/p7_5.png','img/p7_6.png','img/p7_7.png','img/p7_8.png','img/p7_9.png','img/p7_10.png',
'img/p7_11.png','img/p7_12.png','img/p7_13.png','img/p7_14.png','img/p7_15.png','img/p7_16.png','img/p7_17.png','img/p7_18.png','img/p7_19.png','img/p7_20.png','img/p7_21.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png','img/p8_6.png','img/p8_7.png','img/p8_8.png','img/p8_9.png',
'img/music2.png','img/bg1.jpg','img/share_box.png',
];

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