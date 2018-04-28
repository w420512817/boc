//禁止窗口的默认滑动
// document.ontouchmove = function (e) {
// 	e.preventDefault();
// }
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
		$(".load-line span").width(percent);
		if (percent == 100 && callback) {
			setTimeout(function(){
				$(".load").remove();
				callback();
			},1000);
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

var _answer = ['一帆风顺','二龙戏珠','三羊开泰','四季平安','五谷丰登','六六大顺','七星高照','八方来财','九久安康','十全十美'];
var _quizArray = [];
var $quiz = $('#quiz');
var setTime;
var newTime;
var _truenum=0,  	//对题数
	_quizNo = 0, 	// 当前题号
	_quizAll = 5, 	// 一共需要回答几道题
	_currentCount = 3; 	// 需要回答对几道题
	

function loadPage(next) {
	$('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
	if(next=='select'){
		$("#gametime").text('30');
	}
	if(next == 'quiz'){
		// 本轮回答的题目
		_quizArray = randomNumberArray(_answer.length); // 问题列表
		_quizArray = _quizArray.slice(0,_quizAll);
		console.log(_quizArray)
		_truenum = 0;
		_quizNo = 0;
		initQuiz(_quizArray[_quizNo]);
		
		//时间

	}
    // if(next=='q1'){
	// 	$('.resize').removeClass('hide');
	
	// }
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}
// initQuiz(2)
// 倒计时

var _timer = 30;

function initQuiz(index){

	if(setTime){
		clearInterval(setTime);
	}

	$quiz.find('.page-pic img').attr('src','img/p3_'+(index+3)+'.png');
	$quiz.find('input').val('');
	$('#cursor').show();
	$("#gametime").text(_timer);

	var time=_timer;
	setTime=setInterval(function(){
		if(time<=0){
			var _thisAnswer = '';
			_thisAnswer=$quiz.find('.page-textbg input').val();
			if(_thisAnswer == _answer[_quizArray[_quizNo]]){
				_truenum ++;
			}
			clearInterval(setTime);

			if(_quizNo < (_quizAll-1)){
				_quizNo ++;
				initQuiz(_quizArray[_quizNo]);
			}else{
				// 结束回答
				if(_truenum>=_currentCount){
					$('.tip-true').removeClass('hide');
				}else{
					$('.tip-false').removeClass('hide');
				}
				
			}

			// bf
			// if(_quizNo == _quizAll){
			// 	if(_truenum>=_currentCount){
			// 		$('.tip-true').removeClass('hide');
			// 	}else{
			// 		$('.tip-false').removeClass('hide');
			// 	}
			// }else{
			// 	_quizNo++;
			// 	// initQuiz(_quizNo);
			// }
			// return;
		}else{
			
			time--;
			$("#gametime").text(time);
		}
		// else if(!$('.tip-true').hasClass('hide')||!$('.tip-false').hasClass('hide')){
		// 	clearInterval(setTime);
		// 	return;
		// }
	},1000);
}

//链接
// $('.b').on('click',function(){window.location.href= ""});
$('#welcome .page-btn').on('click',function(){loadPage('select')});

// 判断答案
$quiz.find('.page-btn2').on('click',function(){
	// 当前答题的答案
	var _thisAnswer = '';
	// $quiz.find('.page-text').each(function(){	
	// 	_thisAnswer += $(this).find('input').val();
	// });
	_thisAnswer=$quiz.find('.page-textbg input').val();

	// 判断是否正确
	if(_thisAnswer == _answer[_quizArray[_quizNo]]){
		_truenum ++;
	}
	if(_quizNo < (_quizAll-1)){
		_quizNo ++;
		initQuiz(_quizArray[_quizNo]);
	}else{
		// 结束回答
		clearInterval(setTime);
		if(_truenum>=_currentCount){
			$('.tip-true').removeClass('hide');
		}else{
			$('.tip-false').removeClass('hide');
		}
		
	}

});
// 重新填写
$quiz.find('.page-btn1').on('click',function(){$quiz.find('input').val('');});
// $quiz.find('input','',function(){
// 	$(this).val($(this).val().replace(/\s+/g,''));
// })

//~~获得从0到number的打乱数组
function randomNumberArray(number){
	var originalArray = new Array; 	//原数组
	for (var i = 0;i < number;i++){
		originalArray[i]=i;
	}
	originalArray.sort(function(){ return 0.5 - Math.random();});
	return originalArray;
}


// 选择头像
$('#select .page-img').on('click',function(){
	var _dogimg=$(this).find('img').attr('src');
	$('#quiz .page-img img').attr('src',_dogimg);
	loadPage('quiz');
});

$('#quiz input').on('focus',function(){$('#cursor').hide();})
// 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 关闭
// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});
// 再来一次
$('.tip-false .page-btn').on('click',function(){$('.tip-false').addClass('hide');loadPage('welcome');});
// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-phone').val() == '') {
		dialogueTips('请输入电话……');
		_check = false;
	}
	if ($('#info-name').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	
	if (_check) {
		dialogueTips('提交成功！');
		setTimeout(function(){
			$('.tip-true').addClass('hide');
			$('.tip-end').removeClass('hide');
		},1000);
	}
});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png','img/p3_8.png','img/p3_9.png','img/p3_10.png','img/p3_11.png','img/p3_12.png','img/p3_13.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png',
'img/music2.png','img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('quiz');
});
