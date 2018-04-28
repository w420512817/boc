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
    if(next=='question01'){
		var _t1=setTimeout(function(){
			$('#question01 .page-time').fadeOut();
			clearTimeout(_t1);
		},3000);
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}
var _gametime=1; //次数
var _gameanswer=['b','c','b','c','c','a','a','b','c','b','b','a'] //答案
var flag=false;
var _selfalse='img/p3_4.png';
var _seltrue='img/p3_5.png';
$('.page-opt').on('click',function(){
	var _this=$(this);
	var index=_this.parent().attr('id').substr(-2,2);  	   //题号
	var opt=_this.attr('class').substr(-1,1);  //选项
	var panduan=_gameanswer[index-1]==opt;  //判断
	if(!flag){
		flag=true;
		console.log('题号'+index);
		console.log('选项'+opt);
		console.log(panduan);
		// 答案
		// 对
		if(panduan){
			_this.find('img').attr('src',_seltrue);
		}
		// 错
		else{
			_this.find('img').attr('src',_selfalse);
			_this.parent().find('.opt-'+_gameanswer[index-1]+' img').attr('src',_seltrue);
			_this.parent().find('.opt-'+_gameanswer[index-1]+' p').css('color','#fff');
			// $('#question'+index).find('.opt-'+_gameanswer[index]).attr('src',_seltrue);
		}
		_this.find('p').css('color','#fff');
		// 结果
		setTimeout(function(){
			flag=false;
			// 对
			if(panduan){
				console.log(index)
				if(index<9){
					index++;
					next='0'+index;
				}
				else{
					index++;
					next=index;
				}
				if(index>12){
					alert('全答对')
				}else{
					loadPage('question'+next);
				}
			}
			// 错
			else{
				alert('cuole')
			}
		},1000);
	}
})
//链接
// $('.b').on('click',function(){window.location.href= ""});
// 规则
$('#welcome .page-btn1').on('click',function(){$('#welcome .page-rule').removeClass('hide')});
$('#welcome .page-btn2').on('click',function(){loadPage('question01')});


// 下一题
// $('#question1 .page-opt').on('click',function(){loadPage('question2')});

// 上滑
// $('#welcome').on('swipeup', function (e) {
// 	loadPage('welcome2');
// }).on('click', function (e) {
// 	loadPage('welcome2');
// });
// 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 关闭
$('#welcome .page-rule').on('click',function(){$('#welcome .page-rule').addClass('hide')});
// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});
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
// 'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_10.png','img/p1_11.png','img/p1_12.png',
'img/music2.png','img/bg1.jpg'
];

loading(loadRES, function () {
	// loadPage('welcome');
	loadPage('question01');
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