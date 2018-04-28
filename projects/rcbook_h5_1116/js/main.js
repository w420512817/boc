//禁止窗口的默认滑动
// document.ontouchmove = function (e) {
// 	e.preventDefault();
// }
$("body").bind("touchmove",function(event){event.preventDefault();});
// $("body").unbind("touchmove");

$('body').height($(window).height())

//music
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
			$(".loading").fadeOut(function() {
				$(this).remove();
			});
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

// 换一批
$('.swiper-slide7 .swiper7_2').on('click',function(){
	$('.swiper-slide7 .box_small').css('animation','rota1 1s ease both');
	$('.swiper-slide7 .box_big').css('animation','rota1 1s ease both');
	var _t1 = setTimeout(function(){
		// 更换图片

		$('.swiper-slide7 .box_big').css('animation','rota2 1s ease both');
		$('.swiper-slide7 .box_small').css('animation','rota2 1s ease both');
		clearTimeout(_t1);
	},1000);
});
// 下一页
$('.swiper-slide7 .swiper7_3 .box_small').on('click',function(){
	$('.swiper-slide8 .swiper8_3>img').attr('src',$(this).find('img').attr('src'));
	location.hash = "#slide8";
});
$('.swiper-slide7 .swiper7_3 .box_big').on('click',function(){
	$('.swiper-slide8 .swiper8_3>img').attr('src',$(this).find('img').attr('src'));
	location.hash = "#slide8";
});
// 点赞
$('.swiper-slide8 .swiper8_3 .zan').on('click',function(){
	if($(this).hasClass('current')){
		console.log('已经点过')
	}else{
		$(this).addClass('current')
		var _zanNum=$('.swiper8_3 .zan+span').text();
		_zanNum++;
		$('.swiper8_3 .zan+span').text(_zanNum);
	}
});

//我也要留言
$('.swiper-slide8 .swiper8_2').on('click',function(){
	location.hash = "#slide9";
});

// 排行榜
$('.swiper-slide8 .swiper8_8').on('click',function(){
	$('.list_box').removeClass('hide');
	$("body").unbind("touchmove");
});

// 返回
$('.list_box .list_btn').on('click',function(){
	$('.list_box').addClass('hide');
	$("body").bind("touchmove",function(event){event.preventDefault();});
});

//选择模板
$('.swiper-slide9 .swiper9_2').on('click',function(){
	var _imgsrc=$('#swiper2 .swiper-slide-active img').attr('src');
	$('.swiper-slide10 .swiper10_4>img').attr('src',_imgsrc);
	location.hash = "#slide10";
	$('#swiper1 .swiper-slide10').addClass('enter').siblings().removeClass('enter');
});

// 提示
$('.swiper-slide10 .swiper10_4 .form_text').on('click',function(){
	$('.swiper-slide10 .swiper10_4 .form_tip').addClass('hide');
}).on('focus',function(){
	$('.swiper-slide10 .swiper10_4 .form_tip').addClass('hide');
});
// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-text').val() == '') {
		dialogueTips('请输入留言……');
		_check = false;
	}
	if (_check) {
		location.hash = "#slide11";
		$('#swiper1 .swiper-slide11').addClass('enter').siblings().removeClass('enter');
	}
});
// $('.swiper-slide10 .swiper10_2').on('click',function(){
// 	location.hash = "#slide11";
// });

var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_6.png',
'img/p3_1.png','img/p3_2.png',
'img/p4_1.png','img/p4_2.png',
'img/p5_1.png','img/p5_2.png',
'img/p6_1.png','img/p6_2.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png',
'img/p8_1.png','img/p8_2.png','img/p8_3.png','img/p8_4.png','img/p8_5.png','img/p8_6.png','img/p8_7.png','img/p8_8.png','img/p8_9.png',
'img/p10_1.png','img/p10_2.png',
'img/p11_1.png',
'img/p12_1.png','img/p12_2.png','img/p12_3.png',
'img/music.png','img/next.png',
]
loading(loadRES, function(){


	var mySwiper = new Swiper('#swiper1', {
		observer: true,
		// noSwiping : true,
		direction: 'vertical',
		loop: false,
		hashnav: true,
		// effect:'fade',
		hashnavWatchState: true,
		onSlideChangeEnd: function (swiper) {
			console.log(swiper.activeIndex)
			//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
			$('#swiper1 .swiper-wrapper>.swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
			if (swiper.activeIndex >= 6) {
				$('.resize').hide();
			} else {
				$('.resize').show();
			}
		}
	});
	$('#swiper1 .swiper-slide').eq(0).addClass('enter');
	// 分享
	$('.swiper-slide21 .swiper21_9').on('click', function () {
		$('.share-box').removeClass('hide');
	});
	
	var swiper = new Swiper('#swiper2',{
		direction: 'horizontal',
		loop:true,
		centeredSlides : true,
		slidesPerView:2,
		noSwiping:false
		// paginationClickable:true,
		// onInit:function(swiper){
			// 	swiper.slides[2].className="swiper-slide swiper-slide-active";//第一次打开不要动画
			// 	},
			// breakpoints: { 
				//         668: {
					//             slidesPerView: 1,
					//          }
					//     }
		});

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