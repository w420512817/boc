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

// 分享
$('#random .page-btn').on('click',function(){$('.share-box').removeClass('hide')});
$('.share-box').on('click',function(){$('.share-box').addClass('hide')});


// $('#welcome .page-img2').on('click',function(){loadPage('random')});
// 摇一摇
var SHAKE_THRESHOLD = 3000;  
var last_update = 0;  
var x = y = z = last_x = last_y = last_z = 0;  
function init() {  
    if (window.DeviceMotionEvent) {  
        window.addEventListener('devicemotion', deviceMotionHandler, false);  
    } else {  
        alert('not support mobile event');  
    }  
} 
// 文字
var _arr=['img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png','img/p3_8.png','img/p3_9.png','img/p3_10.png'];

function deviceMotionHandler(eventData) {  
    var acceleration = eventData.accelerationIncludingGravity;  
    var curTime = new Date().getTime();  
    if ((curTime - last_update) > 100) {  
        var diffTime = curTime - last_update;  
        last_update = curTime;  
        x = acceleration.x;  
        y = acceleration.y;  
        z = acceleration.z;  
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000; 
        if (speed > SHAKE_THRESHOLD) {
//			shake.play();	
        	setTimeout(function(){
				// alert(1);
				var _index= Math.floor((Math.random()*_arr.length));
				console.log(_index);
				$('#random .page-text img').attr('src',_arr[_index]);
				loadPage('random');
        	},500)   
	    }  
        last_x = x;  
        last_y = y;  
        last_z = z;  
    }  
}


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png','img/p3_8.png','img/p3_9.png','img/p3_10.png',
'img/p4_1.png',
'img/p3_1.jpg','img/p3_2.jpg','img/p3_3.jpg','img/p3_4.jpg','img/p3_5.jpg','img/p3_6.jpg','img/p3_7.jpg','img/p3_8.jpg','img/p3_9.jpg','img/p3_10.jpg',
// 'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg','img/bg5.jpg','img/bg6.jpg','img/bg7.jpg','img/bg8.jpg','img/bg9.jpg','img/bg10.jpg','img/bg11.jpg','img/bg12.jpg',
'img/music2.png'
];



