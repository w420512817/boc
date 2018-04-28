$(function(){
    // 页面加载
    var complete=[true,false,false,false,false,false];
    var manifest = [
        {src:'images/boc.png'},{src:'images/bj.png'},{src:'images/close.png'},{src:'images/units-icons.png'},{src:'images/name.png'},{src:'images/name1.png'},{src:'images/tel.png'},{src:'images/btn1.png'},{src:'images/btn2.png'},{src:'images/btn3.png'},{src:'images/ewm.png'},{src:'images/gz.png'},{src:'images/tijiao.png'},{src:'images/top01.png'},{src:'images/top02.png'},{src:'images/top03.png'},{src:'images/top04.png'},{src:'images/top11.png'},{src:'images/top12.png'},{src:'images/top13.png'},{src:'images/name.png'},{src:'images/name1.png'},{src:'images/cjbj.png'},{src:'images/logo.png'},{src:'images/bd1.png'},{src:'images/bd.png'},{src:'images/1.png'},{src:'images/2.png'}]
    loader = new createjs.LoadQueue(false);
    loader.on('complete', loaderComplete);
    loader.on('progress', loaderProgress);
    loader.loadManifest(manifest);
    
    function loaderProgress(event) {
        $('.loadText').text(Math.floor(event.progress * 100));
    }
    //loading结束
    function loaderComplete() {
        $(".loading").addClass('hide');
		$(".swiper-container").removeClass("hide");		
		$(".swiper-slide:first-child").addClass("anime");
		$(".swiper-slide:not(:first-child)").find(".ani").addClass("hidden");
		
		var mySwiper = new Swiper ('.swiper-container', {
			direction: 'vertical',
			loop: false,
			onSlideChangeEnd: function(swiper){
				if(mySwiper.activeIndex==0){
					mySwiper.lockSwipes();
					//mySwiper.lockSwipeToPrev();
				}
				if(mySwiper.activeIndex==1){
					//mySwiper.lockSwipes();
					//$(".page1").removeClass("hide");
					//$(".page2").addClass("hide");
					//$(".videosp")[0].pause();
					//$(".page1_1").removeClass("hide");	
					//mySwiper.lockSwipeToPrev();
				} 
				if(mySwiper.activeIndex==2){
					//mySwiper.lockSwipes();
					//$(".page1_1").removeClass("hide");	
					$(".page1_2 ").removeClass("de");	
					$(".page1").removeClass("hide");
					//$(".page2").addClass("hide");
					//mySwiper.lockSwipeToPrev();
				}	
				if(mySwiper.activeIndex==3){
					//mySwiper.lockSwipes();
					//$(".page1").removeClass("hide");
				   //$(".page1_1").removeClass("hide");	
					//$(".page2").addClass("hide");
					$(".page4").addClass("hide");	
					$(".page3").removeClass("hide");
					//mySwiper.lockSwipeToPrev();
				} 
				$(".swiper-slide:eq("+swiper.previousIndex +")").find(".ani").addClass("hidden");
				$(".swiper-slide:eq("+swiper.activeIndex+")").find(".ani").removeClass("hidden").end().addClass("anime").siblings().removeClass("anime");
			}	
							
		}); 
		mySwiper.lockSwipes();	
		$(".start").on("click",function(){
			mySwiper.unlockSwipes();
			$(".img1_box").addClass("hide");
			
			$(".img2_box").removeClass("hide");		
			mySwiper.slideTo(1, 0, true);	
		})
		// 规则img_box2
		$(".guize").on("click",function(){
			$(".gz_box").removeClass("hide");									 
		})
		$(".close").on("click",function(){
			$(".gz_box").addClass("hide");									 
		})
		$(".main3-btn").on("click",function(){
			// mySwiper.unlockSwipes();
			// $(".img1_box").addClass("hide");
			// $(".img2_box").removeClass("hide");		
			//mySwiper.slideTo(2, 0, true);	
		})
		// 提交
		$(".tijiao").on("click",function(){
			$(".yao").addClass("y");							 	
			$(".img_box1").addClass("hide");
			$(".img_box2").removeClass("hide");									 
		})
		
		
    } 
});
		
//music
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



//window.onload=function(){
	//$("#loading").addClass("loaded");
    //弹出框
//};


$("body,.u-pageLoading,.dati,.dati_suc").css('height', document.documentElement.clientHeight);

var windowWidth = $(window).width();
var windowHeight = $(window).height();
var $body = $("body");
if (windowWidth > 640) {
$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
$body.height(windowHeight);
//windowWidth/windowHeight > 320/504 ? $body.height(windowWidth*504/320) : $body.height(windowHeight);
}


$("body").on("webkitAnimationEnd",".page4 .top61",function(){
	setTimeout(function(){
        $(".page4").addClass("hide");	
		$(".page3").removeClass("hide");
    },1200);
			
});	
