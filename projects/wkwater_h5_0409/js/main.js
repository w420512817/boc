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


var _num=1; //助力人数
var _arr=['img/p4_7.png','img/p4_8.png','img/p4_9.png','img/p4_10.png','img/p4_11.png','img/p4_12.png','img/p4_13.png','img/p4_14.png','img/p4_15.png','img/p4_16.png','img/p4_17.png','img/p4_18.png','img/p4_19.png','img/p4_20.png','img/p4_21.png','img/p4_22.png',] //15种状态
function loadPage(next) {
	$('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
	if(next=='welcome5'){
		$('.resize').addClass('hide');
	}
	// // 再次进入
	// if(next=='tree'){
	// 	$('#tree .page-text').removeClass('hide');
	// 	$('#tree .page-btn').addClass('hide');
	// 	$('#tree .page-img1,#tree .page-img2').addClass('hide');
	// 	$('#tree .page-img3').removeClass('hide');
	// 	$('#tree .page-img3 img').attr('src',_arr[_num]);
	// 	$('#sharePeople').text(_num);
	// 	// 助力完成
	// 	if(_num==15){
	// 		$('#tree .page-tip2').fadeIn();
	// 	}
	// }
 
}

//链接
$('.b').on('click',function(){window.location.href= ""});
// 上滑
$('#welcome')
.on('swipeup', function () {loadPage('welcome2')})
.on('click', function () {loadPage('welcome2')});

$('#welcome2').on('swipedown',function(){loadPage('welcome')})
.on('swipeup', function () {loadPage('welcome3')})
.on('click', function () {loadPage('welcome3')});

$('#welcome3').on('swipedown',function(){loadPage('welcome2')})
.on('swipeup', function () {loadPage('tree')})
.on('click','.page-btn', function () {loadPage('tree')});

// 栽种树苗
$('#tree .page-btn').on('click',function(){
	// $('.page-pot').addClass('potani');
	$('.page-pot').fadeIn();
	$('#tree .page-img2').fadeIn();
	var _t1=setTimeout(function(){
		$('#tree .page-tip1').fadeIn();
		$('#tree .page-btn').addClass('hide');

		$('#tree .page-text').removeClass('hide')
		clearTimeout(_t1);
	},3000);
});
//领取 
$('#tree .page-tip2 img').on('click',function(){loadPage('end')})


$('#tree').on('swipedown',function(){loadPage('welcome3')})
.on('swipeup', function () {loadPage('welcome4')})
// .on('click', function (e) {e.stopPropagation();e.preventDefault();loadPage('welcome4')});

$('#welcome4').on('swipedown',function(){loadPage('tree')})
.on('swipeup', function () {loadPage('welcome5')})
.on('click', function () {loadPage('welcome5')});

$('#welcome5').on('swipedown',function(){loadPage('welcome4')});

$('#end')
.on('swipeup', function () {loadPage('welcome4')})
// .on('click', function () {loadPage('welcome4')});


// 点击浇水
$('#tree1 .page-btn').on('click',function(){
	
	$('.page-pot').fadeIn();
	
	var _t1=setTimeout(function(){
		$('#tree1 .page-tip3').fadeIn();
		clearTimeout(_t1);
	},2000);
});
$('#tree1 .page-tip3 img').on('click',function(){window.location.href="index.html"});
// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 关闭
$('#tree .page-tip1').on('click',function(){$('#tree .page-tip1').fadeOut()});
$('.share-box').on('click',function(){$('.share-box').addClass('hide')});
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


var loadRES = ['img/icon/boc.png',
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg','img/bg7.jpg',
'img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png',
'img/p2_1.png','img/p2_2.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_7.png','img/p4_8.png','img/p4_9.png','img/p4_10.png',
'img/p4_11.png','img/p4_12.png','img/p4_13.png','img/p4_14.png','img/p4_15.png','img/p4_16.png','img/p4_17.png','img/p4_18.png','img/p4_19.png','img/p4_20.png',
'img/p4_21.png','img/p4_22.png','img/p4_23.png','img/p4_24.png','img/p4_25.png','img/p4_26.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png','img/p5_4.png','img/p5_5.png','img/p5_6.png','img/p5_7.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png','img/p6_4.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png','img/p7_4.png',
'img/music2.png','img/arrow.png'
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