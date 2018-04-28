document.ontouchmove = function(e){
	e.preventDefault();
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
		if (percent == 100 && callback) {
			var _t = setTimeout(function(){
				$("#loading").remove();
				callback();
				clearTimeout(_t);
			},2000)
		}
	}
}


// 判断视频是否自动播放
var _checkVideo = false;
var browser={
    versions:function(){
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
            iPhone: u.indexOf('iPhone') > -1 ,
            iPad: u.indexOf('iPad') > -1,
            webApp: u.indexOf('Safari') == -1,
            weixin: u.indexOf('MicroMessenger') > -1,
            qq: u.match(/\sQQ/i) == " qq"
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
if((browser.versions.weixin && browser.versions.ios) || (!browser.versions.weixin && browser.versions.android)){
	_checkVideo = true;
//	$('#video .play-btn').remove();
}


//~视频预加载
var videoList = [$("#video video").eq(0)[0],$("#video video").eq(1)[0],$("#video video").eq(2)[0],$("#video video").eq(3)[0],$("#video video").eq(4)[0],$("#video video").eq(5)[0]];
// 音乐
var audio_con = [];
['media/01.mp3', 	// 01电影放映机
 'media/02.mp3', 	// 02倒计时
 'media/03.mp3', 	// 03视频出字幕
 'media/04.mp3', 	// 未中奖
 'media/05.mp3' 	// 中奖
].forEach(function(v,i){
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
	});
	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
	$('#video .video-mod').addClass('hide');
}, false);

//~播放指定音乐
function aUdio(cur_audio){
	audio_con.forEach(function(item,_index) {
		item.pause();
	});
	audio_con[cur_audio].currentTime = 0;
	audio_con[cur_audio].play();
}
//~停止所有音乐
function stopAudio_con(){
	audio_con.forEach(function(item,_index) {
		item.pause();
	});
}

var _ID = 0, 		 // 当前播放的视频id
	_run = true, 	 // 视频是否在播放中-防止点击重新播放
	_result = true,  // 用于判断是否参加抽奖，true-允许抽奖，false-不允许抽奖，如果不允许抽奖，需要填充中奖结果
	_check = true,   // 判断ajax是否执行
	_prize = 1;  	 // 中奖结果；1-一等奖，2-二等奖；3-三等奖；4-未中奖

//~播放视频
function video(id){
	var $mod = $('#video').find('.video-mod').eq(id);

	$('#video').find('.video-mod').addClass('hide');
	$mod.removeClass('hide');

	var currVideo = videoList[id];
	// if(_checkVideo){
	// 	// alert(currVideo.currentTime)
	// 	if(currVideo.currentTime == 0){
	// 		currVideo.load();
	// 		currVideo.play();
	// 	}else{
	// 		currVideo.currentTime = 0;
	// 		currVideo.play();
	// 	}
	// }else{
		//~手动播放
		$mod.find('.play-btn').show();
		$mod.on('touchend',function(){
			if(_run){
				_run = false;
				$(this).find('.play-btn').hide();
				currVideo.currentTime = 0;
				currVideo.play();
			}
		})
	// }

	//~视频结束，判断音乐是否播放，取消禁止滑页
	currVideo.addEventListener('ended',function(){
		if(id==0){
			//~定军山 结束后跳转到脸谱页面
			loadPage('facebook');
			if(!_checkVideo){
				$('#video').find('.play-btn').show();
			}
		}else{
			aUdio(2);
			// console.log(_ID)
			//~其他视频，结束后显示当前弹框
			$('#video .video-end-popup .img01 img').eq(_ID-1).removeClass('hide').siblings().addClass('hide');
			$('#video .video-end-popup').removeClass('hide').addClass('animate');
		}
		_run = true;
	});
}




function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');

    if(next == 'cutDown'){
    	aUdio(1);
    	//~第一页倒计时
    	$('#cutDown p.time01').addClass('animate');
    	var _i = 1;
    	var _t1 = setInterval(function(){
    		$('#cutDown p.time0'+_i).remove();
    		_i ++ ;
    		$('#cutDown p.time0'+_i).addClass('animate');
    		if(_i==4){
    			clearInterval(_i);
    			stopAudio_con();
    			loadPage('video');
    		}
    	},1000);
    }else if(next == 'video'){
    	video(_ID);
    }else if(next == 'luck'){
    	stopAudio_con();
    	$('#luck .result').addClass('hide');

    	//~~抽奖程序写这里
    	if(_result){
    		if(_check){
    			_check = false;
	    		// $.ajax({
	    			// type:'',
	    			// success:function(data){
	    				// _prize = RandomNumBoth(1,4); // 返回中奖结果：1-一等奖 2-二等奖 3-三等奖 4-未中奖
	    				_result = false; //~~false-不允许参加抽奖了
	    								 //~~true -还允许参加抽奖
	    				_check = true;
	    				if(_prize < 4){
	    					// 中奖
				    		aUdio(4);

				    		var _code = 'ABCDE123', 	// 兑换码
				    			_status = true; 		// true-兑换码可用，false-兑换码失效
				    		if(_status){
					    		$('#luck .redeem-code').html('兑换码：'+_code);
					    	}else{
					    		$('#luck .redeem-code').html('兑换码：<span style="color:#999898">已失效</span>');
					    	}
					    	$('#luck .result0'+_prize).removeClass('hide').addClass('animate');
				    		var _timer = setTimeout(function(){
								html2canvas($("#luck")[0], {
									onrendered: function(canvas) {
										$("#luck").html('<img style="visibility:visible" src="'+canvas.toDataURL("image/jpeg")+'" />');
										$('.popup-info').removeClass('hide').addClass('animate');

									}
								});
								clearTimeout(_timer);
							},2000);
	    				}else{
	    					// 未中奖
    						aUdio(3);
	    				}
	    			// }
	    		// });
    		}else{
    			dialogueTips('正在抽奖……');
    		}
    	}else{
    		//~如果从规则页面，返回抽奖结果页
    		$('.popup-info').removeClass('hide').addClass('animate');
	    }
    }else if(next == 'end' || next == 'rule'){
    	$('.popup-info').removeClass('animate').addClass('hide');
    }
}



$('.link-load').on('click',function(){
	var _next = $(this).attr('nextHash');
	stopAudio_con();
	if(_next == 'video'){
		// 脸谱页面，点击选择
		_ID = $(this).data('id');
	}else if(_next == 'facebook'){
		// 重新选择
		$('#video .video-end-popup').addClass('hide'); 				// 视频结束的弹层
		$('#luck .result').addClass('hide').removeClass('animate'); // 清除未中奖样式
	}
	loadPage(_next);
});

var loadRES = ['img/img01.png','img/img02.png','img/img03.png','img/img46.png','img/img04.png','img/img05.png','img/img06.png','img/img07.png','img/video01.jpg','img/video02.jpg','img/video03.jpg','img/video04.jpg','img/video05.jpg','img/video06.jpg','img/img08.png','img/img13.png','img/img09.png','img/img14.png','img/img10.png','img/img15.png','img/img11.png','img/img16.png','img/img12.png','img/img17.png','img/img18.png','img/img19.png','img/img22.png','img/img23.png','img/img24.png','img/img25.png','img/img20.png','img/img21.png','img/img26.png','img/img27.png','img/img28.png','img/img29.png','img/img30.png','img/img31.png','img/img32.png','img/img33.png','img/img34.png','img/img35.png','img/img36.png','img/img39.png','img/img40.png','img/img41.png'];

//~初始化
var _WIDTH = $(window).width(),_HEIGHT = $(window).height(),
	_Y = _HEIGHT-_WIDTH;
var _screen = true; // true-竖屏，false-横屏
if(_WIDTH > _HEIGHT){
	//~一进页面就是横屏
	_screen = false;
	$('body').css('background','#fff url(img/img48.jpg) no-repeat center 0/auto 100%').html('')
}else{
	//~一进页面就是竖屏
	if (_WIDTH > 640) {
		$("body").height(_HEIGHT).width(_HEIGHT * 320 / 504);
	} else {
		$("body").height(_HEIGHT);
	}
	$('.video-mod').css({'width':_HEIGHT,'height':_WIDTH,'transform':'rotate(90deg) translateY('+_Y/2+'px) translateX('+_Y/2+'px)'});
	$('.video-mod video').css({'width':_HEIGHT,'height':_WIDTH});

	//~~loading页面的背景音乐
	audio_con[0].play();
	document.addEventListener("WeixinJSBridgeReady", function () {
		audio_con[0].play();
	}, false);
	loading(loadRES,function(){
		loadPage('cutDown');
	});
}

//判断手机横竖屏状态：
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
    if (window.orientation === 180 || window.orientation === 0) {
        if(!_screen){
        	window.location.href = './';
        }else{
        	$('.window-tips').hide();
        }
    }
    if (window.orientation === 90 || window.orientation === -90 ){
        $('.window-tips').show();
    }
}, false);



//~~模拟中奖结果，可删
function RandomNumBoth(Min,Max){
	var Range = Max - Min;
	var Rand = Math.random();
	var num = Min + Math.round(Rand * Range);
	return num;
}

