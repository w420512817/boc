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
// playClicked();


function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next=='welcome'){
		var _t1=setTimeout(function(){
			loadPage('welcome2');
		clearTimeout(_t1);
		},2000);
	}
	if(next=='welcome'||next=='welcome2'){
		audio_player.play();
		$(".music").removeClass("off").addClass("on");
	}else{
		audio_player.pause();
		$(".music").removeClass("on").addClass("off");
	}
	if(next=='welcome2'){
		var mySwiper = new Swiper('#swiper1', {
			observer: true,
			nextButton: '#page-items-box .box-right',
			prevButton: '#page-items-box .box-left',
			onSlideChange: function (swiper) {
				if (swiper.isEnd) {
					$('#page-items-box .box-right').hide();
				} else {
					$('#page-items-box .box-right').show();
				}
				if (swiper.isBeginning) {
					$('#page-items-box .box-left').hide();
				} else {
					$('#page-items-box .box-left').show();
				}
			}
		})
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

// 链接
// $('#page-items-box .items-1 .page-icon1').on('click',function(){loadPage('room1')});
// $('#page-items-box .items-2 .page-icon1').on('click',function(){loadPage('room2')});
// $('#page-items-box .items-2 .page-icon2').on('click',function(){loadPage('room3')});
// $('#page-items-box .items-2 .page-icon3').on('click',function(){loadPage('room4')});
// $('#page-items-box .items-3 .page-icon1').on('click',function(){loadPage('room5')});
// $('#page-items-box .items-3 .page-icon2').on('click',function(){loadPage('room6')});
// 返回
$('.page-rback').on('click',function(){loadPage('welcome2')});

function pause(n){
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
  
  $("#audio"+n)[0].play();
  $("#audio"+n)[0].currentTime = 0;
  // $(".page").hide();
  // $("#a"+n).show();
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
  },350);
}


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png',
'img/p4_1.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png','img/p5_7.png','img/p5_8.png',
'img/p6_1.png',
'img/p7_1.png',
'img/p8_1.png','img/p8_2.png',
'img/p9_1.png',
'img/p10_1.png','img/p10_2.png',
'img/music2.png','img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('welcome2');

});
