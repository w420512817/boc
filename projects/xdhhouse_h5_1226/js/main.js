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
    if(next=='welcome2'){
		var _t1=setTimeout(function(){
			loadPage('index');
		clearTimeout(_t1);
		},2000);
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}
// 链接
$('#welcome .page-btn').on('click', function () {loadPage('welcome2')});
$('#welcome2').on('click', function () {loadPage('index')});

// 厨房
// $('#index .page-btn2').on('click', function () {loadPage('room1')});
// 电梯厅
// $('#index .page-btn3').on('click', function () {loadPage('room2')});
// 主卧
// $('#index .page-btn5').on('click', function () {loadPage('room3')});
// 客厅
// $('#index .page-btn4').on('click', function () {loadPage('room4')});
// 书房
// $('#index .page-btn1').on('click', function () {loadPage('room5')});
// 返回
$('.page-back').on('click', function () {loadPage('index')});



function pause(n){
	playClicked();
    $("#audio"+n)[0].pause();
    clearInterval(t);
    $("#intext"+n).text('');
}
var t;
var canJ = true;
function play(n){
  if(!canJ){
	return;
  }
  playClicked();
  $("#audio"+n)[0].play();
  $("#audio"+n)[0].currentTime = 0;
  loadPage('room'+n);
  var inputValue=$("#text"+n).val();
  var i = 0;
  var str = "";
  t = setInterval(function(){
	str+=inputValue.charAt(i);
	console.log(str);
	console.log(i);
	$("#intext"+n).text(str);
	i++;
	if(i>=inputValue.length){
	  clearInterval(t);
	}
  },250);
}

// 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});



var loadRES = ['img/icon/boc.png',
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg','img/bg5.jpg','img/bg6.jpg','img/bg7.jpg','img/bg8.jpg',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png',
'img/p2_1.png','img/p2_2.png',
'img/music2.png'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('index');
});

