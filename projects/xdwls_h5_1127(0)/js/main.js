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


var mySwiper = new Swiper('#swiper1', {
	observer: true,
	loop: false,
	hashnav: true,
	hashnavWatchState: true,
	pagination: '.swiper-pagination',
	onSlideChangeEnd: function (swiper) {
		console.log(swiper.activeIndex)
		//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
		
	}
})

var mySwiper2 = new Swiper('#swiper2', {
	observer: true,
	direction: 'vertical',
	loop: false,
	hashnav: true,
	hashnavWatchState: true,
	onSlideChangeEnd: function (swiper) {
		console.log(swiper.activeIndex)
		//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
		$('#swiper2 .swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
		if (swiper.activeIndex == 3) {
			$('.resize').hide();
		} else {
			$('.resize').show();
		}
	}
})

var mySwiper3 = new Swiper('#swiper3', {
	observer: true,
	direction: 'horizontal',
	loop: false,
	hashnav: true,
	hashnavWatchState: true,
	onSlideChangeEnd: function (swiper) {
		console.log(swiper.activeIndex)
		//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
		$('#swiper3 .swiper-slide').eq(swiper.activeIndex).addClass('enter').siblings().removeClass('enter');
		if (swiper.activeIndex == 11) {
			$('.resize2').hide();
		}
		else if (swiper.activeIndex == 0) {
			$('.resize2').hide();
		}
		else {
			$('.resize2').show();
		}
	}
})

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    // if(next=='welcome'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('index');
	// 	clearTimeout(_t1);
	// 	},1500);
	// }
    if(next=='ground2'){
		mySwiper.init();
	}
    if(next=='design'){
		mySwiper2.init();
		$('#swiper2 .swiper-slide').eq(0).addClass('enter');
	}
    if(next=='house'){
		mySwiper3.init();
		$('#swiper3 .swiper-slide').eq(0).addClass('enter');
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

// 链接
$('#welcome').on('swipeup',function(){loadPage('index')})
.on('click',function(){loadPage('index')});


$('#index .list1').on('click',function(){window.location.href="item1.html"});
$('#index .list2').on('click',function(){window.location.href="item2.html"});
$('#index .list3').on('click',function(){window.location.href="item3.html"});
$('#index .list4').on('click',function(){window.location.href="item4.html"});
$('#index .list5').on('click',function(){window.location.href="item5.html"});
$('#index .list6').on('click',function(){window.location.href="item6.html"});

// nav1
$('.page-nav').on('click','.bbtn1',function(){loadPage('ground1')});
$('.page-nav').on('click','.bbtn2',function(){loadPage('ground2')});
$('.page-nav').on('click','.bbtn3',function(){loadPage('ground3')});
$('.page-nav').on('click','.bbtn4',function(){loadPage('ground4')});
// nav2
$('.page-nav').on('click','.bbtnl',function(){loadPage('garden1')});
$('.page-nav').on('click','.bbtnr',function(){loadPage('garden2')});


$('#ground3 .page-btn1').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.233351,120.195251&title=信达滨江壹品售楼处&content=杭州市上城区闻潮路与钱江路交叉口&output=html"});
$('#ground3 .page-btn2').on('click',function(){window.location.href="tel:0571-86088880"});

// 户型
$('#house .swiper-slide .page-back').on('click',function(){mySwiper3.slideTo(0, 300,true)});

// $('#house .houselist').on('click','.img2',function(){location.hash = "#slide1";});
$('#house .houselist').on('click','.img2',function(){mySwiper3.slideTo(1, 300,true)});
// $('#house .houselist').on('click','.img3',function(){location.hash = "#slide2";});
$('#house .houselist').on('click','.img3',function(){mySwiper3.slideTo(2, 300,true)});
// $('#house .houselist').on('click','.img4',function(){location.hash = "#slide3";});
$('#house .houselist').on('click','.img4',function(){mySwiper3.slideTo(3, 300,true)});
// $('#house .houselist').on('click','.img5',function(){location.hash = "#slide4";});
$('#house .houselist').on('click','.img5',function(){mySwiper3.slideTo(4, 300,true)});
// $('#house .houselist').on('click','.img6',function(){location.hash = "#slide5";});
$('#house .houselist').on('click','.img6',function(){mySwiper3.slideTo(5, 300,true)});
// $('#house .houselist').on('click','.img7',function(){location.hash = "#slide6";});
$('#house .houselist').on('click','.img7',function(){mySwiper3.slideTo(6, 300,true)});
// $('#house .houselist').on('click','.img8',function(){location.hash = "#slide7";});
$('#house .houselist').on('click','.img8',function(){mySwiper3.slideTo(7, 300,true)});
// $('#house .houselist').on('click','.img9',function(){location.hash = "#slide8";});
$('#house .houselist').on('click','.img9',function(){mySwiper3.slideTo(8, 300,true)});
// $('#house .houselist').on('click','.img10',function(){location.hash = "#slide9";});
$('#house .houselist').on('click','.img10',function(){mySwiper3.slideTo(9, 300,true)});
// $('#house .houselist').on('click','.img11',function(){location.hash = "#slide10";});
$('#house .houselist').on('click','.img11',function(){mySwiper3.slideTo(10, 300,true)});
// $('#house .houselist').on('click','.img12',function(){location.hash = "#slide11";});
$('#house .houselist').on('click','.img12',function(){mySwiper3.slideTo(11, 300,true)});

// 点击放大a2
$('#house .house3 .page-btn').on('click',function(){
	var arr=['img/a21.jpg','img/a22.jpg','img/a23.jpg','img/a24.jpg','img/a25.jpg',];
	var _arrImg=[];
	for(var i=0;i<arr.length;i++){
		_arrImg[i]='http://wx.bocweb.cn/wangjiaqi/xdwls_h5_1127/'+arr[i]
	}
	console.log(_arrImg);
	wx.previewImage({
		current: _arrImg[0],
		urls: _arrImg
	});
});
$('#house .house4 .page-btn').on('click',function(){
	var arr=['img/a31.jpg','img/a32.jpg','img/a33.jpg','img/a34.jpg'];
	var _arrImg=[];
	for(var i=0;i<arr.length;i++){
		_arrImg[i]='http://wx.bocweb.cn/wangjiaqi/xdwls_h5_1127/'+arr[i]
	}
	console.log(_arrImg);
	wx.previewImage({
		current: _arrImg[0],
		urls: _arrImg
	});
});
$('#house .house6 .page-btn').on('click',function(){
	var arr=['img/b31.jpg','img/b32.jpg','img/b33.jpg','img/b34.jpg','img/b35.jpg',];
	var _arrImg=[];
	for(var i=0;i<arr.length;i++){
		_arrImg[i]='http://wx.bocweb.cn/wangjiaqi/xdwls_h5_1127/'+arr[i]
	}
	console.log(_arrImg);
	wx.previewImage({
		current: _arrImg[0],
		urls: _arrImg
	});
});
$('#house .house9 .page-btn').on('click',function(){
	var arr=['img/c21.jpg','img/c22.jpg','img/c23.jpg','img/c24.jpg','img/c25.jpg','img/c26.jpg'];
	var _arrImg=[];
	for(var i=0;i<arr.length;i++){
		_arrImg[i]='http://wx.bocweb.cn/wangjiaqi/xdwls_h5_1127/'+arr[i]
	}
	console.log(_arrImg);
	wx.previewImage({
		current: _arrImg[0],
		urls: _arrImg
	});
});
$('#house .house11 .page-btn').on('click',function(){
	var arr=['img/c31.jpg','img/c32.jpg','img/c33.jpg','img/c34.jpg','img/c35.jpg','img/c36.jpg'];
	var _arrImg=[];
	for(var i=0;i<arr.length;i++){
		_arrImg[i]='http://wx.bocweb.cn/wangjiaqi/xdwls_h5_1127/'+arr[i]
	}
	console.log(_arrImg);
	wx.previewImage({
		current: _arrImg[0],
		urls: _arrImg
	});
});


// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});

var loadRES = ['img/icon/boc.png',
// 'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_10.png','img/p1_11.png','img/p1_12.png',
'img/music2.png','img/bg1.jpg'
];



