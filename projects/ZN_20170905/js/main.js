var loadRES = ['img/img48.png','img/img04.png','img/img01.png','img/img02.png','img/img03.png','img/img05.png','img/img06.png','img/img07.png','img/img09.png','img/img10.png','img/img09-1.png','img/img10-1.png','img/img10-2.png','img/img12-1.png','img/img12-2.png','img/img11-1.png','img/img14-1.png','img/img14-2.png','img/img15-1.png','img/img15-2.png','img/img16-1.png','img/img16-2.png','img/img18-1.png','img/img18-2.png','img/img19-1.png','img/img19-2.png','img/img20-1.png','img/img20-2.png','img/img21-1.png','img/img21-2.png','img/img11.png','img/img12.png','img/img13.png','img/img14.png','img/img15.png','img/img16.png','img/img17.png','img/img18.png','img/img19.png','img/img20.png','img/img21.png','img/img22.png','img/img23.png','img/img24.png','img/img25.png','img/img26.png','img/img27.png','img/img28.png','img/img29.png','img/img30.png','img/img31.png','img/img32.png','img/img33.png','img/img34.png','img/img35.png','img/img36.png','img/img37.png','img/img38.png','img/img39.png','img/img40.png','img/img41.png','img/img42.png','img/img43.png','img/img44.png','img/img45.png','img/img46.png','img/img47.png','img/img01-1.png','img/img01-2.png','img/img01-3.png','img/img01-4.png','img/img01-5.png','img/img01-6.png','img/img01-7.png','img/img01-8.png','img/img49.png','img/img49-1.png','img/img50.png','img/img50-1.png','img/img50-2.png','img/img53-1.png','img/img53.png','img/img54.png','img/img54-1.png','img/img54-2.png','img/img10-3.png','img/img55-1.png'];


var mySwiper05 = new Swiper ('#swiper_5 .swiper-container', {
	onSlideChangeEnd: function(swiper){
		if(swiper.isEnd){
			$('#swiper_5 .btn-r').hide();
		}else{
			$('#swiper_5 .btn-r').show();
		}
		if(swiper.isBeginning){
			$('#swiper_5 .btn-l').hide();
		}else{
			$('#swiper_5 .btn-l').show();
		}
  	}
});
var mySwiper06 = new Swiper ('#swiper_6 .swiper-container', {
	onSlideChangeEnd: function(swiper){
		if(swiper.isEnd){
			$('#swiper_6 .btn-r').hide();
		}else{
			$('#swiper_6 .btn-r').show();
		}
		if(swiper.isBeginning){
			$('#swiper_6 .btn-l').hide();
		}else{
			$('#swiper_6 .btn-l').show();
		}
  	}
});
var mySwiper12 = new Swiper ('#swiper_12 .swiper-container', {
	onSlideChangeEnd: function(swiper){
		if(swiper.isEnd){
			$('#swiper_12 .btn-r').hide();
		}else{
			$('#swiper_12 .btn-r').show();
		}
		if(swiper.isBeginning){
			$('#swiper_12 .btn-l').hide();
		}else{
			$('#swiper_12 .btn-l').show();
		}
  	}
});
var mySwiper14 = new Swiper ('#swiper_14 .swiper-container', {
	onSlideChangeEnd: function(swiper){
		if(swiper.isEnd){
			$('#swiper_14 .btn-r').hide();
		}else{
			$('#swiper_14 .btn-r').show();
		}
		if(swiper.isBeginning){
			$('#swiper_14 .btn-l').hide();
		}else{
			$('#swiper_14 .btn-l').show();
		}
  	}
});
var mySwiper15 = new Swiper ('#swiper_15 .swiper-container', {
	onSlideChangeEnd: function(swiper){
		if(swiper.isEnd){
			$('#swiper_15 .btn-r').hide();
		}else{
			$('#swiper_15 .btn-r').show();
		}
		if(swiper.isBeginning){
			$('#swiper_15 .btn-l').hide();
		}else{
			$('#swiper_15 .btn-l').show();
		}
  	}
});
var mySwiper16 = new Swiper ('#swiper_16 .swiper-container', {
	onSlideChangeEnd: function(swiper){
		if(swiper.isEnd){
			$('#swiper_16 .btn-r').hide();
		}else{
			$('#swiper_16 .btn-r').show();
		}
		if(swiper.isBeginning){
			$('#swiper_16 .btn-l').hide();
		}else{
			$('#swiper_16 .btn-l').show();
		}
  	}
});
var mySwiper17 = new Swiper ('#swiper_17 .swiper-container', {
	onSlideChangeEnd: function(swiper){
		if(swiper.isEnd){
			$('#swiper_17 .btn-r').hide();
		}else{
			$('#swiper_17 .btn-r').show();
		}
		if(swiper.isBeginning){
			$('#swiper_17 .btn-l').hide();
		}else{
			$('#swiper_17 .btn-l').show();
		}
  	}
});


//~~~~~~~翻页控制
var _play = true; 							// 当有视频在播放时为false
var _page = $('.page').length; 		// 总页数
$('.page').on('swipeup',function(e){
	if(!_play){
		// 如果视频在播放，停止视频，播放背景音乐
		stopVideo();
	}
	// 向下翻页
	var _this = $(this),
		_thisPage = _this.index(); 		// 当前页面
	if(_thisPage < _page){
		var _next = _this.next('.page').attr('id');
		loadPage(_next);
	}
}).on('swipedown',function(e){
	if(!_play){
		// 如果视频在播放，停止视频，播放背景音乐
		stopVideo();
	}
	// 向上翻页
	if(_play){
		var _this = $(this),
			_thisPage = _this.index(); 		// 当前页面
		if(_thisPage > 0){
			var _next = _this.prev('.page').attr('id');
			loadPage(_next);
		}
	}
});

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
			var _t = setTimeout(function(){
				$(".load").fadeOut();
				callback();
				clearTimeout(_t);
			},1000);
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

document.ontouchmove = function(e){
	e.preventDefault();
}
var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}

//~视频
var videoList = [$("#slide11 video").eq(0)[0]];
// 音乐
var audio_con = [];
['music.mp3'].forEach(function(v,i){
	var mUsic = new Audio(v);
	mUsic.loop=true;
	audio_con.push(mUsic);
	mUsic=null;
});

// music
document.addEventListener("WeixinJSBridgeReady", function () {
	audio_con.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);
function playClicked(){
    if(audio_con[0].paused) {
        audio_con[0].play();
        $(".music").removeClass("off").addClass("on")
    }else{
        audio_con[0].pause();
        $(".music").removeClass("on").addClass("off")
    }
}
playClicked();
document.addEventListener("WeixinJSBridgeReady", function () {
	audio_con[0].play();
}, false);


//~点击播放视频
function video(id){
	if(_play){
		_play = false;
		var currVideo = videoList[id];
		// 播放视频
		currVideo.play();
		// 暂停音乐
		audio_con[0].pause();

		//~视频结束，判断音乐是否播放，取消禁止滑页
		// currVideo.addEventListener('ended',function(){
		// 	_play = true;
		// 	$('.music,.resize').show();
		// 	if(audio_con[0].paused && $(".music").hasClass("on")){
		// 		audio_con[0].play();
		// 	}
		// });
	}
}

//~停止播放视频
function stopVideo(){
	_play = true;
	videoList.forEach(function(v,i){
		console.log(v)
		console.log(i)
		v.currentTime = 0;
		v.pause();
	});
	if(audio_con[0].paused && $(".music").hasClass("on")){
		audio_con[0].play();
	}
}

$('#slide11 .img').on('click',function(){
	video(0);
});
// $('#slide12 .img03').on('click',function(){
// 	video(1);
// });


function loadPage(next) {
	if(next == 'slide18'){
		$('.resize').hide();
	}else{
		$('.resize').show();
	}

    $('#'+next).removeClass("hide").addClass("swiper-slide-active").siblings('.page').addClass('hide').removeClass('swiper-slide-active');

    if(next == 'slide04'){
    	mySwiper05.update();
    	var _eq = $('#swiper_5 .swiper-slide-active').index();
   		$('#swiper_5 .swiper-slide').eq(_eq).removeClass('swiper-slide-active');
    	var _t = setTimeout(function(){
    		$('#swiper_5 .swiper-slide').eq(_eq).addClass('swiper-slide-active');
    		clearTimeout(_t);
    	},2000);
    }else if(next == 'slide07'){
    	mySwiper06.update();
    	var _eq = $('#swiper_6 .swiper-slide-active').index();
   		$('#swiper_6 .swiper-slide').eq(_eq).removeClass('swiper-slide-active');
    	var _t = setTimeout(function(){
    		$('#swiper_6 .swiper-slide').eq(_eq).addClass('swiper-slide-active');
    		clearTimeout(_t);
    	},2000);
    }else if(next == 'slide12'){
    	mySwiper12.update();
    }else if(next == 'slide14'){
    	mySwiper14.update();
    }else if(next == 'slide15'){
    	mySwiper15.update();
    }else if(next == 'slide16'){
    	mySwiper16.update();
    }else if(next == 'slide17'){
    	mySwiper17.update();
    }
}


loading(loadRES,function(){
	loadPage('slide01');
});
