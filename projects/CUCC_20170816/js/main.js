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

document.ontouchmove = function(e){
	e.preventDefault();
}


var audio_con = [];
['media/bgm.mp3','media/phone.mp3'].forEach(function(v,i){
	var mUsic = new Audio(v);
	mUsic.loop=true;
	audio_con.push(mUsic);
	mUsic=null;
});
document.addEventListener("WeixinJSBridgeReady", function () {
	audio_con.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	})
}, false);

audio_con[0].play();
document.addEventListener("WeixinJSBridgeReady", function (){
	audio_con[0].play();
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

var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}

var loadRES = ['img/boc.png','img/logo.png','img/logo2.png','img/img08.png','img/img09.png','img/img07.png','img/img04.png','img/img05.png','img/img06.png','img/img01.png','img/img02.png','img/img03.png','img/img10.png','img/img11.png','img/img12.png','img/img13.png','img/img14.png','img/img15.png','img/img16.png','img/img17.png','img/img18.png','img/img19.png','img/img20.png','img/img21.png','img/img22.png','img/img23.png','img/img24.png','img/img25.png','img/img26.png','img/img27.png','img/img28.png','img/img29.png','img/img30.png','img/img31.png','img/img32.png','img/img33.png','img/img34.png','img/img35.png','img/img36.png','img/img37.png','img/img38.png','img/img39.png','img/img40.png','img/img43.jpg','img/img41.png','img/img42.jpg','img/img44.png','img/img45.png','img/img46.png','img/img47.png'];


var _re = 1732/1030;
var _re2 = 1658/1030;
$('#page02 .img02').css({'width':$(window).height()*_re})
$('#page01 .img01').css({'width':$(window).height()*_re})
$('#page01 .img04').css({'height':$(window).height()})

$('#page01 .img05').on('click',function(){
	$('#page01').fadeOut();
	loadPage('page02');
})

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
   	if(next == 'page02'){
   		var _timer = setTimeout(function(){
    		$('#page02 .img01').addClass('out');
	   		$('#page02 .img02').addClass('show');
	   		$('#page02 .logo2').removeClass('hide').addClass('animate');
	   		$('#page02 .logo-l').fadeOut();
	   		var _t = setTimeout(function(){
	    		$('#page02').fadeOut().addClass('hide').removeClass('animate');
	    		loadPage('slide05');
	    		$('.resize').removeClass('hide');
    			clearTimeout(_t)
	   		},4800);
	   		clearTimeout(_timer)
	   	},1000);
    }
}

$('.swiper-slide').on('swipeup',function(e){
	event.stopPropagation();
	var _next = $(this).attr('nextHash');
	if(_next != ''){
		loadPage(_next);
		if(_next == 'slide01'){
			audio_con[0].pause();
			audio_con[1].currentTime = 0;
			audio_con[1].play();
			$('.resize').hide()
		}
	}
}).on('swipedown',function(e){
	var _prev = $(this).attr('prevHash');
	if(_prev != ''){
		loadPage(_prev);
		if(_prev == 'slide02'){
			$('.resize').show();
				audio_con[1].pause();
				if($('.music').hasClass('on')){
					audio_con[0].play();
				}
		}
	}
});



loading(loadRES,function(){
	loadPage('page01');
});