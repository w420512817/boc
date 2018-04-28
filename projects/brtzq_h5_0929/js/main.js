//禁止窗口的默认滑动
document.ontouchmove = function (e) {
	e.preventDefault();
}

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

var arr=[  //随机图
	'img/p3_6_01.png','img/p3_6_02.png','img/p3_6_04.png','img/p3_6_05.png','img/p3_6_06.png','img/p3_6_07.png','img/p3_6_08.png','img/p3_6_09.png','img/p3_6_10.png',
	'img/p3_6_11.png','img/p3_6_12.png','img/p3_6_13.png','img/p3_6_14.png','img/p3_6_15.png','img/p3_6_16.png'
	];
var _name=null; //姓名

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next=='end'){
		// 生成随机图
		var index = Math.floor((Math.random()*arr.length));
		// console.log(arr[index]);
		$('#random-img').attr('src',arr[index]);
		$('#uname').html(_name);
		$('#uname2').html('');
		// 位置
		var _num=$('#random-img').attr('src').slice(9,11);
		console.log(_num);
		console.log(_name);
		if(_num=='01'||_num=='12'){$('#uname').css({top:'32%',left:'40%'});}
		if(_num=='02'){$('#uname').css({top:'29%',left:'52%'});}
		if(_num=='04'||_num=='13'){$('#uname').css({top:'30%',left:'40%'});}
		if(_num=='05'){$('#uname').css({top:'24%',left:'49%'});}
		if(_num=='06'){$('#uname').css({top:'19%',left:'40%'});}
		if(_num=='07'){$('#uname').css({top:'17%',left:'17%'});$('#uname2').html(_name).css({top:'53%',left:'17%'});}
		if(_num=='08'){$('#uname').css({top:'24%',left:'40%'});$('#uname2').html(_name).css({top:'44%',left:'40%'});}
		if(_num=='09'){$('#uname').css({top:'30%',left:'40%'});}
		if(_num=='10'){$('#uname').css({top:'22%',left:'40%'});}
		if(_num=='11'){$('#uname').css({top:'25%',left:'40%'});}
		if(_num=='14'){$('#uname').css({top:'40%',left:'40%'});}
		if(_num=='15'){$('#uname').css({top:'48%',left:'40%'});}
		if(_num=='16'){$('#uname').css({top:'42%',left:'40%'});}
		// 截图
		var _t1=setTimeout(function(){
			html2canvas($("#end .page-img")[0], {
				onrendered: function (canvas) {
					$("#end .page-img2 img").attr('src', canvas.toDataURL("image/jpeg"));
				}
			});
		clearTimeout(_t1);
		},500);
	}
	
}
// 滑页
$('#welcome').on('swipeup', function (e) {
	loadPage('welcome2');
}).on('click', function (e) {
	loadPage('welcome2');
});
// 链接
// page3
$('#end .page-btn1').on('click',function(){loadPage('end')})
$('#end .page-btn2').on('click',function(){loadPage('welcome');})
// $('#end .page-btn3').on('click',function(){window.location.href="http://wx.brtpawn.com/wechat-mobile/?code=0610zPLg1dEKyw03hBPg1I7YLg10zPLU&state=";})
// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-name').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		_name=$('#info-name').val();
		loadPage('end');
	}
});

// 随机
// $('.welcome2 .page-btn').on('click', function () {
// 	var arr=['img/t1.png','img/t2.png','img/t3.png','img/t4.png','img/t5.png','img/t6.png','img/t7.png','img/t8.png','img/t9.png'];
// 	var index = Math.floor((Math.random()*arr.length));
// 	console.log(arr[index]);
// 	// loadPage(arr[index]);
// 	loadPage('letter1');
// 	$('.letter1 .page-paper img').attr('src',arr[index]);
// });

var loadRES = ['img/icon/boc.png',
// 'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_10.png','img/p1_11.png','img/p1_12.png',
'img/music.png','img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('welcome2');
});


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