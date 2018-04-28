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
    
}

// 跳转 随机奖
//  $('.welcome .page-boxc').on('click',function(){
// 	var arr1=['.page-error','.page-succ-money','.page-succ-big'],
// 	arr2=['img/p12_108.png','img/p12_166.png','img/p12_188.png','img/p12_288.png','img/p12_1888.png'],
// 	arr3=['img/p14_1.png','img/p14_2.png','img/p14_3.png'];
// 	var index1= Math.floor((Math.random()*arr1.length)),
// 		index2= Math.floor((Math.random()*arr2.length)),
// 		index3= Math.floor((Math.random()*arr3.length));
// 	 loadPage('welcome2');
// 	 if(arr1[index1]=='.page-succ-money'){
// 			$('.page-succ-money img').eq(0).attr('src',arr2[index2]);
// 			$('.page-succ-money').removeClass('hide');
// 		}else if(arr1[index1]=='.page-succ-big'){
// 			$('.page-succ-big img').attr('src',arr3[index3]); 
// 			$('.page-succ-big').removeClass('hide');
// 		}else if(arr1[index1]=='.page-error'){
// 			$('.page-error').removeClass('hide');
// 		}
//  })
//  跳转表单
$('.page-succ-big').on('click',function(){
	$(this).hide().siblings('.page-succ-form').removeClass('hide');
})

// 提交 
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('input[name="f-phone"]').val() == '') {
		dialogueTips('请输入手机……');
		_check = false;
	}
	if ($('input[name="f-name"]').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		$('.page-succ-form').hide();
		// 跳转提示
		$('.page-succ-finish').removeClass('hide');
	}
});

// $('#J_language').on('taphold',function(){
// 	console.log(111)
// })
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

var arr1=['.page-error','.page-succ-money','.page-succ-big'],
arr2=['img/p12_108.png','img/p12_166.png','img/p12_188.png','img/p12_288.png','img/p12_1888.png'],
arr3=['img/p14_1.png','img/p14_2.png','img/p14_3.png'];
var index1= Math.floor((Math.random()*arr1.length)),
	index2= Math.floor((Math.random()*arr2.length)),
	index3= Math.floor((Math.random()*arr3.length));

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
				loadPage('welcome2');
				if(arr1[index1]=='.page-succ-money'){
					   $('.page-succ-money img').eq(0).attr('src',arr2[index2]);
					   $('.page-succ-money').removeClass('hide');
				   }else if(arr1[index1]=='.page-succ-big'){
					   $('.page-succ-big img').attr('src',arr3[index3]); 
					   $('.page-succ-big').removeClass('hide');
				   }else if(arr1[index1]=='.page-error'){
					   $('.page-error').removeClass('hide');
				   }
        	},1000)   
	    }  
        last_x = x;  
        last_y = y;  
        last_z = z;  
    }  
}


var loadRES = ['img/boc.png',
'img/p1.png','img/p2.png','img/p3.png','img/p4.png','img/p5.png','img/p6.png','img/p7.png','img/p8.png','img/p9.png','img/p10.png','img/p11.png',
'img/p12_108.png','img/p12_166.png','img/p12_188.png','img/p12_288.png','img/p12_1888.png','img/p13.png',
'img/p14_1.png','img/p14_2.png','img/p14_3.png','img/p15.png','img/p16.png','img/p17.png'
];

loading(loadRES, function () {
	loadPage('welcome');
	init();
});