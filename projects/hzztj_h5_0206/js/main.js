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
var _gametime=2; //次数
var _gameanswer=['b','c','b','c','c','a','a','b','c','b','b','a'] //答案
var flag=false;
var _selfalse='img/p3_4.png';
var _seltrue='img/p3_5.png';
$('.page-opt').on('click',function(){
	var _this=$(this);
	var index=_this.parent().attr('id').substr(-2,2);  	   //题号
	var opt=_this.attr('class').substr(-1,1);  //选项
	var panduan=_gameanswer[index-1]==opt;  //判断
	var next=index;	    //下一题
	if(next<9){
		next++;
		next='0'+next;
	}
	else{
		next++;
	}
	if(!flag){
		flag=true;
		console.log('当前题号'+index);
		console.log('选项'+opt);
		console.log(panduan);
		console.log('下一题'+next)
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
				if(next<=12){
					loadPage('question'+next);
				}else{
					// 全对
					$('.tip-box2').removeClass('hide');
				}
			}
			// 错
			else{
				_gametime--;
				console.log('次数'+_gametime);
				// alert('cuole')
				// 分享
				if(_gametime==1){
					$('.tip-box1').removeClass('hide');
					$('.tip-box1 img').attr('src','img/p4_1.png');
					// 判断分享
					// 分享成功
					fenxiang(next);
				}
				// 再次
				else{
					console.log('当前错题号--------'+index);
					if(index<=2){
						$('.tip-box1 img').attr('src','img/p4_2.png');
					}
					// 青铜
					else if(index<=4){
						$('.tip-box1 img').attr('src','img/p4_3.png');
					}
					// 黄金
					else if(index<=8){
						$('.tip-box1 img').attr('src','img/p4_4.png');
						$('.tip-box1 p').text(index-1);
					}
					// 白金
					else if(index<=11){
						$('.tip-box1 img').attr('src','img/p4_5.png');
						$('.tip-box1 p').text(index-1);
					}
					// 12题错
					else if(index<=12){
						$('.tip-box1 img').attr('src','img/p4_6.png');
						$('.tip-box1 p').text(index-1);
					}
					$('.tip-box1').removeClass('hide');
				}
			}
		},1000);
	}
})
// 判断分享
function fenxiang(num){
	console.log(num)
	setTimeout(function(){
		// 分享成功
		if(num==13){
			$('.tip-box2').removeClass('hide');
		}else{
			loadPage('question'+num);
			$('.tip-box1').addClass('hide');
		}
		// 分享失败
		
	},3000);
}
//链接
// $('.b').on('click',function(){window.location.href= ""});
// 规则
$('#welcome .page-btn1').on('click',function(){$('#welcome .page-rule').removeClass('hide')});
$('#welcome .page-btn2').on('click',function(){loadPage('question01')});


// 分享
$('.tip-box1').on('click',function(){$('.share-box').removeClass('hide')});
// 抽奖
$('.tip-box2').on('click',function(){
	$('.tip-box2').addClass('hide');
	$('.tip-box1').removeClass('hide');
	var _index= Math.floor(Math.random()*2);
	console.log('随机'+_index);
	// 中奖
	if(_index==0){
		$('.tip-box1 img').attr('src','img/p5_2.png');
		// 金额
		$('.tip-box1 p').css({
			'width':'15%',
			'color':'#faddb3',
			'top':'58%',
			'left':'38%'
		}).text('8.88');
	}
	// 空
	else{
		$('.tip-box1 img').attr('src','img/p5_1.png');
	}
});

// 关闭
$('#welcome .page-rule').on('click',function(){$('#welcome .page-rule').addClass('hide')});
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
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png','img/p2_11.png','img/p2_12.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png','img/p4_7.png',
'img/p5_1.png','img/p5_2.png',
'img/music2.png','img/bg1.jpg','img/bg2.jpg','img/bg3.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('question12');
});

