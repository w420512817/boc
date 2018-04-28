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
	var _html = '<div class="dialogue-tips" id="J_error">' + txt + '<strong>x</strong></div>';
	if ($('.dialogue-tips').size() > 0) {
		$('.dialogue-tips').remove();
		clearTimeout(t);
	}
	$('body').append(_html);
	$('.dialogue-tips strong').on('click',function(){$('.dialogue-tips').remove();});
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
    if(next=='game'){
		reset();
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}
// 初始化
function reset(){
	$("#game .page-window.window1 .imglong").css({"top":'0%'});
	$("#game .page-window.window2 .imglong").css({"top":'-100%'});
	$("#game .page-window.window3 .imglong").css({"top":'-200%'});
}
// 开始
function letGo(){
	TextNum1=Math.floor(Math.random()*10);
	TextNum2=Math.floor(Math.random()*10);
	TextNum3=Math.floor(Math.random()*10);
	console.log(TextNum1,TextNum2,TextNum3);
	setTimeout(function () {
		var num1=[0,-100,-200,-303,-405,-506,-608,-709,-809,-911][TextNum1];//在这里随机
		var num2=[0,-100,-200,-303,-405,-506,-608,-709,-809,-911][TextNum2];
		var num3=[0,-100,-200,-303,-405,-506,-608,-709,-809,-911][TextNum3];

		$(".imglong.long1").animate({"top":'-500%'},400,"linear", function () {
			$(this).css("top",0).animate({"top":num1+'%'},1000,"linear");
		});
		$(".imglong.long2").animate({"top":'-500%'},700,"linear", function () {
			$(this).css("top",0).animate({"top":num2+'%'},1200,"linear");
		});
		$(".imglong.long3").animate({"top":'-500%'},1000,"linear", function () {
			$(this).css("top",0).animate({"top":num3+'%'},1300,"linear");
		});
	},100);
}
// 摇杆
function rocker(){
	$('#game .page-rocker img').attr('src','img/p2_8.png');
	$('#game .page-rocker ').css('top','37%');
	var _t1=setTimeout(function(){
		$('#game .page-rocker img').attr('src','img/p2_7.png');
		$('#game .page-rocker ').css('top','29%');
		clearTimeout(_t1);
	},500);
}

// 链接
$('#welcome .page-btn1').on('click',function(){loadPage('game')});
// 规则
$('#welcome .page-btn2').on('click', function(){$('#welcome .page-rule').removeClass('hide')});
$('#welcome .page-rule').on('click', function(){$('#welcome .page-rule').addClass('hide')});
// 开始游戏
var flag=false;
var _index=3; //次数
var TextNum1;
var TextNum2;
var TextNum3;
$('#game .page-btn').on('click', function () {
	if(!flag){
		flag=true;
		if(_index<=0){
			dialogueTips('非常抱歉，您的三次机会已经用完，再接再厉，请明天再来哦……');
			reset();
			TextNum1=null;
			TextNum2=null;
			TextNum3=null;
		}else{
			reset();
			rocker();
			letGo();
			_index--;
		}
		setTimeout(function () {
			flag=false;
			$('#game .page-btn img').attr('src','img/p2_10.png');
			if(TextNum1==null||TextNum2==null||TextNum3==null){
				console.log('非常抱歉，您的三次机会已经用完，再接再厉，请明天再来哦……');
			}
			else if(TextNum1==TextNum2||TextNum1==TextNum3||TextNum2==TextNum3){
				// 随机奖品
				var _prize=Math.floor(Math.random()*2);
				if(_prize==0){
					$('#game .page-form .page-text img').attr('src','img/p3_4.png');
				}else{
					$('#game .page-form .page-text img').attr('src','img/p3_5.png');
				}
				$('#game .page-form').removeClass('hide');
			}
		},2800);
	}
});

// 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});

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
		// dialogueTips('成功！');
		$('#game .page-tip').removeClass('hide');
		$('#game .page-form').addClass('hide');
	}
});

// 关闭
$('#game .page-tip .page-lamp').on('click',function(){$('#game .page-tip').addClass('hide')});

var loadRES = ['img/icon/boc.png',
'img/p0_1.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png','img/p2_11.png','img/p2_12.png','img/p2_13.png','img/p2_14.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png',
'img/music2.png'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('game');
});

