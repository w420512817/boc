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
	if(next=='end'){
		var _t1=setTimeout(function(){
			html2canvas($("#end")[0], {
				onrendered: function (canvas) {
					$("#end .page-img img").attr('src', canvas.toDataURL("image/jpeg"));
				}
			});
		clearTimeout(_t1);
		},500);
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

//点击开启
$('.welcome .page-btn').on('click', function () {
	$('.welcome .page-btn').css('animation','rotateOut 1s ease both');
	// $('.welcome .page-img2').css('animation','fadeOutLeft 1s .5s ease both');
	$('.welcome .page-img2').css({
		'animation':'fan2 1s .5s ease both',
		'transformOrigin':'left center'
	});
	// $('.welcome .page-img1').css('animation','fadeOutRight 1s .5s ease both');
	$('.welcome .page-img1').css({
		'animation':'fan1 1s .7s ease both',
		'transformOrigin':'right center'
	});
	$('.welcome .page-img3').css('animation','fadeIn 1s .5s ease both');
	$('.welcome .page-ewm').css('animation','fadeIn 1s .5s ease both');

})
// 规则
$(' .page-rule').on('click', function () {
	$('.page-rule-dialog').fadeIn().siblings('.page-dialog').fadeOut();
});
// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 提交
$('#form-submit').on('click', function () {
	var _check = true,
		name=$('#info-name').val(),
		iname=$('#info-iname').val();
	if ( iname == '') {
		dialogueTips('请输入邀请人姓名……');
		_check = false;
	}
	if (name == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		loadPage('end');
		$('.end .page-txt1').text(name);
		$('.end .page-txt2').text(iname);
	}
});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png',
'img/music2.png','img/bg1.jpg'
];

// loading(loadRES, function () {
// 	loadPage('welcome');
// 	// loadPage('welcome2');
// });


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