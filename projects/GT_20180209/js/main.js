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
			img.onload = function() {
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
			$(".load").fadeOut(function(){
				callback();
			});			
		}
	}
}

// 黑色小弹框
function dialogueTips(txt){
	var _html = '<div class="dialogue-tips" id="J_error">'+txt+'</div>';
	if($('.dialogue-tips').size()>0){
		$('.dialogue-tips').remove();
		clearTimeout(t);
	}
	$('body').append(_html);
	t = setTimeout(function(){
		$('#J_error').remove();
		clearTimeout(t);
	},1500);
}


function loadPage(next) {
    $('#'+next).fadeIn(function(){
    	$(this).removeClass("hide").addClass("animate");
    }).siblings('.page').fadeOut(function(){
    	$(this).addClass('hide').removeClass('animate');
    });
}

var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}

document.ontouchmove = function(e){
	e.preventDefault();
}

// music
document.addEventListener("WeixinJSBridgeReady", function () {
	audio_player.play();
}, false);
function playClicked(){
	if(audio_player.paused) {
		audio_player.play();
		$(".music").removeClass("off").addClass("on")
	}else{
		audio_player.pause();
		$(".music").removeClass("on").addClass("off")
	}
}
playClicked();


$('#welcome').on('swipeup',function(){
	loadPage('welcome02')
})

var _run = true,
	_rePhone = /^1[3|4|5|7|8][0-9]{9}$/;

// 点击抽奖
$('#welcome02 .img04').on('click',function(){
	// 判断是否关注公众号
	var _checkCode = true;
	if(_checkCode){
		loadPage('signup');
	}else{
		$('#D_code').show();
	}
	
});

$('#D_code').on('click',function(){
	$(this).hide();
})

//~~~提交姓名电话
$('#J_submit').on('click',function(){
	$('#signup input').blur();
	var _tel = $('input[name="tel"]').val(),		// 手机号
		_name = $('input[name="name"]').val();		// 姓名
	if (_name == ''){
		dialogueTips('请填写姓名');
	}else if(_tel == ''){
		dialogueTips('请填写手机号')
	}else if(!_rePhone.test(_tel)){
		dialogueTips('手机号码格式错误');
	}else{
		if(_run){
			_run = false;
			//==ajax
			_run = true;


			// 成功
			loadPage('luck');

		}else{
			dialogueTips('正在提交……');
		}
	}
});


$("#startbtn").rotate({
	bind:{
		click:function(){
			var a = 30; // 30-特等奖 90-一等奖 150-二等奖 210-三等奖 270-感恩奖 330-元宵快乐
			 $("#disk").rotate({
				 	duration:3000,
				 	angle: 0,
        			animateTo:1440+a,
					easing: $.easing.easeOut,
					callback: function(){

						// 机会用完了
						// $('#D_share').show();
						// return false;

						// 不在抽奖时间内
						// $('#D_time').show();
						// return false;

						setTimeout(function(){
							var _prizeID = '';
							// 元宵快乐不用弹框
					        if(a == 30){
					        	_prizeID = 1;
					        }else if(a == 90){
					        	_prizeID = 2;
					        }else if(a == 150){
					        	_prizeID = 3;
					        }else if(a == 210){
					        	_prizeID = 4;
					        }else if(a == 270){
					        	_prizeID = 5;
					        }

					        if(_prizeID!=''){
					        	$('#D_result').find('.prize-img').attr('class','prize-img prize-'+(_prizeID-1));
					        	$('#D_result').show();
					        }
						});
					}
			 });
		}
	}
});

// $('#D_time').show();

// var Mains = {
//     data: ["特等奖","一等奖","二等奖","三等奖","感恩奖","元宵快乐"],
//     whichAward: function (deg) {
//         if (deg == 30)   { 			// 特等奖
//             return 5;
//         } else if (deg == 90) { 	// 一等奖
//             return 4;
//         } else if (deg == 150) { 	// 二等奖
//             return 3;
//         } else if (deg == 210) { 	// 三等奖
//             return 2;
//         } else if (deg == 270) { 	// 感恩奖
//             return 1;
//         } else if (deg == 330) { 	// 元宵快乐
//             return 0;
//         }
//     },
//     randomFun: function () {
//         // return 'noStart';//~~~~~~返回的角度
//         return 30;//~~~~~~返回的角度
//     }
// }

// var Lotteryjs = new Lotteryjs({
//     rotateNum: 3, 	//转盘转动圈数
//     body: "#box", 	//大转盘整体的选择符或zepto对象
//     outer: '.outer',
//     btn: '.inner',
//     direction: 0, //0为顺时针转动,1为逆时针转动
//     disabledHandler: function(key) {
//     	switch (key) {
//     		case "noStart":
//     			alert("活动尚未开始");
//     			break;
//     		case "completed":
//     			alert("活动已结束");
//     			break;
//             }
//         },
//     clickCallback: function () {
//         // 调用随机度数
//         var s = Mains.randomFun();
//         this.goLotteryjs(s);
//     },
//     LotteryjsHandler: function (angle) {
//         //angle 返回度数
//         var id = Mains.whichAward(angle);

//         console.log(id);
//         console.log("恭喜您获得:" + Mains.data[id]);

//         // 元宵快乐不用弹框
//         if(id != 5){
//         	$('#D_result').find('.prize-img').attr('class','prize-img prize-'+id);
//         	$('#D_result').show();
//         }
//     }
// });


$('#D_result').find('.close').on('click',function(){
	$('#D_result').hide();
});

$('#D_share,#D_time,#D_code').on('click',function(){
	$(this).hide();
});

//~~~领取奖品
$('#J_getPrize').on('click',function(){
	$('input[name="addr"]').find('input').blur();
	if($('input[name="addr"]').val() == ''){
		dialogueTips('请输入地址');
	}else{
		if(_run){
			_run = false;
			//~~~~~~~提交成功
			dialogueTips('提交成功！');
			var _timer = setTimeout(function(){
				$('#D_result').hide();
			},1500);
			_run = true;
		}else{
			dialogueTips('正在提交……');
		}
	}
})


var loadRES = ['img/boc.png','img/img01.png','img/img02.png','img/img03.png','img/img04.png','img/lottery-arrow.png','img/lottery.png','img/img05.png','img/img07.png','img/img09.png','img/img10.png','img/img11.png','img/img12.png','img/img13.png','img/img14.png','img/img15.png','img/img16.png','img/layer-code.png','img/lottery.png','img/prize-1.png','img/prize-2.png','img/prize-3.png','img/prize-4.png','img/prize-5.png'];
loading(loadRES,function(){
	// loadPage('luck');
	loadPage('welcome');
});