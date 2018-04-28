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

document.ontouchmove = function(e){
	e.preventDefault();
}

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
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

var loadRES = ['img/boc.png','img/img03-01.png','img/img03-02.png','img/img03-03.png','img/img03-04.png','img/img03-05.png','img/img03-06.png','img/img03-07.png','img/img03-08.png','img/img03-09.png','img/img03-10.png','img/img03-11.png','img/img03-12.png','img/img03-13.png','img/img03-blank.png','img/img01.jpg','img/img02.png','img/img07.png','img/img08.png','img/img06.png','img/img16.png','img/img17.png','img/img18.png','img/img11.png','img/img12.png','img/img13.png','img/img14.png','img/img15.png','img/img10.png','img/img09.png','img/img19.png','img/img20.png','img/img21.png','img/img22.png','img/img24.png','img/img25.png','img/img26.png','img/img27.png','img/img30-01.png','img/img30-02.png','img/img30-03.png','img/img30-04.png','img/img30-05.png','img/img30-06.png','img/img30-blank.png','img/img28.png','img/img29.png','img/img31.png','img/img32.png','img/img33.png','img/img36.png','img/img34.png','img/img35.png','img/img37.png','img/img38.png','img/img39.png','img/img40.png','img/img42.png','img/img43.png','img/img44.png','img/img45.png','img/img47.png','img/img48.png','img/img49.png','img/img50.png','img/img51.png','img/img52.png','img/img53.png','img/img54.png','img/img55.png','img/img56.png','img/img57.png','img/img58.png','img/img59.png','img/img60.png','img/img62.png','img/img63.png','img/img64.png','img/img65.png','img/img66.png','img/img68.png','img/img69.png','img/img71.png','img/img72.png','img/img74.png','img/img75.png','img/img76.png','img/img79.png','img/img72.png','img/img80.png','img/img06.png','img/img07.png','img/img81.png','img/img82.png','img/img83.png','img/img90.jpg','img/img89-01.png','img/img89-02.png','img/img89-03.png','img/img89-04.png','img/img89-05.png','img/img89-06.png','img/img89-07.png','img/img89-08.png','img/img89-09.png','img/img89-10.png','img/img89-11.png','img/img89-12.png','img/img89-13.png','img/img89-14.png','img/img89-15.png','img/img95.png','img/img94-01.png','img/img94-02.png','img/img94-03.png','img/img94-04.png'];

loading(loadRES,function(){

	var windowWidth = $(window).width(),
		windowHeight = $(window).height(),
		$body = $("body");
	if (windowWidth > 640) {
		$body.height(windowHeight).width(windowHeight * 320 / 504);
	} else {
		$body.height(windowHeight);
	}



	loadPage('index');

	//=========拼图
	// 常量
	var _TOP = $('.all-puzzle').position().top, 	// 顶部
		_LEFT = $('.all-puzzle').position().left, 	// 左侧
		_HEIGHT = $('.all-puzzle').height()/2; 		// 宽高
	var _ARRAY = [_TOP+'|'+(_TOP+_HEIGHT)+'|'+_LEFT+'|'+(_LEFT+_HEIGHT),
					(_TOP+_HEIGHT) + '|' + (_TOP+_HEIGHT*2) +'|' + _LEFT + '|'+(_LEFT+_HEIGHT),
					(_TOP+_HEIGHT)+'|'+(_TOP+_HEIGHT*2) +'|' + (_LEFT+_HEIGHT)+'|' +(_LEFT+_HEIGHT*2),
					_TOP+'|'+(_TOP+_HEIGHT) +'|' + (_LEFT+_HEIGHT)+'|' +(_LEFT+_HEIGHT*2) ];

	function puzzle(item){
		// 兼容pc鼠标事件、移动端触控事件
		var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
			hasTouch = 'ontouchstart' in window && !isTouchPad,
			START_EV = hasTouch ? 'touchstart' : 'mousedown',
			MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
			END_EV = hasTouch ? 'touchend' : 'mouseup',
			CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup';
		var allObj = document.querySelectorAll(item);

		for(var i=0;i<allObj.length;i++){
			(function (i) {
				var obj = allObj[i];
				var _this = obj;

				// 获取该元素对应的位置区间
				var _id = $(obj).attr('id'),
					_area = _ARRAY[i].split('|');

				var startTop,startLeft,					 				// 当前坐标
					endTop,endLeft, 									// 结束坐标
					moveTop,moveLeft; 									// 位移

				// 获取起始坐标
				obj.addEventListener(START_EV,function(event){
					startTop = (hasTouch ? event.targetTouches[0].pageY:event.clientY);
					startLeft = (hasTouch ? event.targetTouches[0].pageX:event.clientX);
				},false);

				// 移动
				obj.addEventListener(MOVE_EV,function(event){
					endTop = (hasTouch?event.targetTouches[0].pageY:event.clientY);
					endLeft = (hasTouch?event.targetTouches[0].pageX:event.clientX);
					moveTop = endTop-startTop;
					moveLeft = endLeft-startLeft;
					$(_this).css({'transform':'translateY('+moveTop+'px) translateX('+moveLeft+'px)'});
				},false);

				// 结束移动
				obj.addEventListener(END_EV,function(event){
					if(endTop>_area[0] && endTop<_area[1] && endLeft>_area[2] && endLeft<_area[3] ){
						console.log('位置正确');
						$(_this).remove();
						$('#block').find('span[data-puzzle="'+_id+'"]').css('visibility','hidden');
						$('#img').find('img.'+_id).remove();
						console.log($('#img').find('img').size())
						if($('#img').find('img').size() == 1){
							console.log('完成');
							loadPage('welcome');
						}
					}else{
						$(_this).css({'transform':'translateY(0px) translateX(0px)'});
					}
				},false);

				function bodyScroll(event){
				    event.preventDefault();
				}

				obj.removeEventListener(END_EV,bodyScroll,false);
				obj.removeEventListener(MOVE_EV,bodyScroll,false);
				obj.removeEventListener(START_EV,bodyScroll,false);
			})(i);
		}
	}

	puzzle('.puzzle');



	$('#J_hand').on('touchend',function(){
		$('#welcome').addClass('entry');
		$('.welcome.entry .img01').on('webkitAnimationEnd animationend', function (){
			$('#welcome').addClass('hide').removeClass('animate');
			$('#page').removeClass('hide')

			var mySwiper = new Swiper ('.swiper-container', {
				direction: 'vertical',
				loop : false,
				hashnav:true,
				hashnavWatchState:true,
				initialSlide:0,
				onSlideChangeEnd: function(swiper){
					console.log(swiper.activeIndex);
			    	if(swiper.activeIndex == 23){
			    		$('.resize').hide();
			        }else{
			        	$('.resize').show();
			        }

			        if(swiper.activeIndex>2 && swiper.activeIndex<22){
			        	$('.close').removeClass('hide');
			        }else{
			        	$('.close').addClass('hide');
			        }

			        if(swiper.activeIndex==0 || swiper.activeIndex==1 || swiper.activeIndex==2 || swiper.activeIndex==22 || swiper.activeIndex==23){
			        	$('.resize,.music').addClass('white');
			        }else{
			        	$('.resize,.music').removeClass('white');
			        }
			  	},
			  	onInit:function(){
			  		$('.resize').show();
			  		location.hash='#slide01';
			  	}
			});

			$('.nav-item').on('touchend',function(){
				location.hash='#'+$(this).attr('nextHash');
			})

			$('.resize').on('touchend',function(){
				mySwiper.slideNext();
			});
			$('.close').on('touchend',function(){
				location.hash='#slide03';
			});
		});
	});

});