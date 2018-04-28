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
			$(".load").remove();
			callback();
		}
	}
}

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

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next == 'welcome'){
    	var _t1 = setTimeout(function(){
    		loadPage('welcome2');
    		clearTimeout(_t1);
    	},4000);
    }else if(next == 'welcome2'){
    	var _t2 = setTimeout(function(){
    		loadPage('welcome3');
    		clearTimeout(_t2);
    	},7000);
    }else if(next == 'welcome3'){
    	var _t3 = setTimeout(function(){
    		loadPage('quiz');
    		clearTimeout(_t3);
    	},4000);
    }else if(next == 'quiz'){
    	getQuiz(_nowQuiz);
    }
}


//~~老师信息，头像+后台输入语，用中文逗号隔开
var _info = ['img/demo.png	','尊敬的叶宏伟老师，这是一份来自浙大CCE的问答采访，我们将会对采编内容整理发布，欢迎您分享更多'];

//~~问题列表
var _quiz = ['是什么原因让您选择创业？','讲一讲您的创业经历吧','一路走来一定有很多事情让您记忆深刻，要不要分享一下？','没关系您还可以分享更多','就您的成功经验，对创业者有哪些建议？','留一下您最喜欢的一句话吧！','对我们采编的内容有什么要求或补充呢？'],
	_nowQuiz = 0, 	// 当前题号
	_nowType = 0, 	//~0-文字回答，1-语音回答
	_answer = []; 	// 答案

//~填充老师信息
$('#welcome2 .img01').css({'background':'url('+_info[0]+') no-repeat center center','background-size':'contain'});
var _infoArry = _info[1].split('，');
for(var i=0;i<_infoArry.length;i++){
	$('#welcome2 .img02').append('<p>'+_infoArry[i]+'</p>');
}

//~填充问题
$('#welcome3 .img01 span').html(_quiz.length);

var $quiz = $('#quiz');

// ~根据题号，填充问题
function getQuiz(index){
	var _index = index + 1;
	$quiz.find('.no').html(_index>10 ? _index:'0'+_index);
	$quiz.find('.txt').html(_quiz[index]);

	$quiz.find('.answer-txt').removeClass('hide');
	$quiz.find('.answer-language').addClass('hide');
	$quiz.find('.language-btn').removeClass('animate');
	$quiz.find('.quiz-type span').eq(0).addClass('current').siblings('span').removeClass('current');
	$quiz.find('textarea').val('');
	_nowType = 0;
}

//~切换回答方式
$('.quiz-type span').on('click',function(){
	var _this = $(this);
	if(!_this.hasClass('current')){
		_this.addClass('current').siblings('span').removeClass('current');
		_nowType = _this.data('val');
		if(_nowType == 0){
			$quiz.find('.answer-txt').removeClass('hide');
			$quiz.find('.answer-language').addClass('hide');
			$quiz.find('.language-btn').removeClass('animate');
		}else{
			$quiz.find('.answer-txt').addClass('hide');
			$quiz.find('.answer-language').removeClass('hide');
			$quiz.find('.language-btn').addClass('animate');
		}
	}
});

// ~~提交
$('#J_submit').on('click',function(){
	var _check = true;
	if(_nowType == 0){
		if($('#quiz textarea').val() == ''){
			dialogueTips('请输入内容……');
			_check = false;
		}
	}
	if(_check){
		_answer.push($('#quiz textarea').val());
		if(_nowQuiz == (_quiz.length-1)){
			console.log('完成！回答是：'+_answer)
			loadPage('end');
		}else{
			console.log('下一题');
			_nowQuiz ++ ;
			getQuiz(_nowQuiz);
		}
	}
});

// $('#J_language').on('taphold',function(){
// 	console.log(111)
// })

var loadRES = ['img/boc.png','img/img05.png','img/img01.png','img/img02.png','img/img03.png','img/img04.png','img/img06.png','img/img08.png','img/img07.png','img/img10.png','img/img11.png','img/img12.png','img/img15.png','img/img13.png','img/img14.png','img/img16.png','img/img17.png','img/img18.png','img/img30.png','img/img27.png','img/img28.png','img/img29.png','img/img31.png','img/img23.png','img/img24.png','img/img25.png','img/img26.png','img/img19.jpg','img/img21.png','img/img20.png','img/img22.png'];


loading(loadRES,function(){
	loadPage('welcome');
});