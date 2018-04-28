$(function() {
	var pageIndex = 0;
	var Status = 50;
	var direction = "static";
	var mySwiper = new Swiper('.swiper-container', {
		initialSlide: 0,
		direction: "horizontal",
		onInit: function(swiper) {
			$(".swiper-slide").eq(swiper.activeIndex).find(".animate").css("display", "block");
			pageIndex = swiper.activeIndex;
			Status = 50;
		},
		onSlideChangeEnd: function(swiper) {
			var index = swiper.activeIndex;
			var prevIndex = swiper.previousIndex;
			$(".swiper-slide").eq(prevIndex).find(".animate").css("display", "none")
			$(".swiper-slide").eq(index).find(".animate").css("display", "block");
			pageIndex = index;
			Status = 50;
			if (index == 6) {
				$("#mask").show();
			}
			// console.log(Status);
		},
		noSwiping: true,
		noSwipingClass: 'stop-swiping'
		
	});
	// 点击进入下一页
	$(".page1 .img7").click(function(){
		mySwiper.slideNext();
	});
	$('.page6 .img6_7').on('click',function(){
		$('.img6_4').attr('src','img/6-5.png');
		$('.img6_8').attr('src','img/6-9.png');
	});
	$('.page6 .img6_6').on('click',function(){
		$('.img6_4').attr('src','img/6-4.png');
		$('.img6_8').attr('src','img/6-8.png');
	});
	// 页面上下滑动
	(function() {
		//创建一个新的hammer对象并且在初始化时指定要处理的dom元素
		var hammertime = new Hammer(document.getElementById("wrap"));
		hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
		var isMove = false;

		hammertime.on("swipeup", function(e) {//left
			direction = "up";
			movePage();
		});
		hammertime.on("swipedown", function(e) {//right
			direction = "down";
			movePage();
		});

		var curSlide, up, down;

		function movePage() {
			// console.log(direction);
			curSlide = $(".swiper-slide").eq(pageIndex)
			up = curSlide.find(".up");
			down = curSlide.find(".down");

			switch (true) {
				case +Status == 0 && direction == "down":
					up.css("height", "50%");
					Status = 50;
					break;

				case +Status == 50 && direction == "down":
					up.css("height", "100%");
					Status = 100;
					break;

				case +Status == 100 && direction == "up":
					up.css("height", "50%");
					Status = 50;
					break;

				case +Status == 50 && direction == "up":
					up.css("height", "0%");
					Status = 0;
					break;
			}
			
			if (!isMove) {
				isMove = true;
				up.addClass("ease");
				setTimeout(function() {
					up.removeClass("ease");
					isMove = false;
					if (Status == 0) {
						down.find(".img_down0").fadeOut();
						down.find(".animate_down").show();
						curSlide.find(".down_tip1").hide();
						curSlide.find(".img0").fadeOut();
					} else if (Status == 100) {
						up.find(".img_up0").fadeOut();
						up.find(".animate_up").show();
						curSlide.find(".up_tip1").hide();
						curSlide.find(".img0").fadeOut();
					} else {
						down.find(".img_down0").fadeIn();
						down.find(".animate_down").hide();
						up.find(".img_up0").fadeIn();
						up.find(".animate_up").hide();
						curSlide.find(".down_tip1").show();
						curSlide.find(".up_tip1").show();
						curSlide.find(".img0").fadeIn();
					}
				}, 500)
			}

		}
	})();
	

	// 最后一页手势事件
	// (function() {
	// 	var page5 = $(".page5");
	// 	var hammertime1 = new Hammer($("#mask")[0]);
	// 	//为该dom元素指定触屏移动事件
	// 	hammertime1.add(new Hammer.Pinch());

	// 	//添加事件
	// 	hammertime1.on("pinchout", function(e) {
	// 		page5.find(".img5_1").fadeOut();
	// 		page5.find(".img5_2").fadeOut();
	// 		page5.find(".arrow_tip").hide();
	// 		$("#mask").hide();
	// 		page5.find(".img6").show();
	// 	});
	// 	hammertime1.on("pinchin", function(e) {

	// 	});
	// })();


	//分享
	// PlusNums("BiGuiYuan.F.170424");
	// Share("香颂传世，缔造双面生活", "http://wx.bocweb.cn/wangjiaqi/wlc_h5/", "http://wx.bocweb.cn/wangjiaqi/wlc_h5/img/share.jpg", "复式精工水岸华宅华美出场，玩转生活空间，尽享双面趣味。");
	window.wxShare && window.wxShare({
		title: "香颂传世，缔造双面生活", //分享标题
		desc: "复式精工水岸华宅华美出场，玩转生活空间，尽享双面趣味。", //分享描述
		linkurl: "http://wx.bocweb.cn/wangjiaqi/wlc_h5/", //分享链接
		img: "http://wx.bocweb.cn/wangjiaqi/wlc_h5/img/share.jpg" //分享图片
	});
});


// document.addEventListener("touchmove", function(ev) {
// 	ev.preventDefault();
// })

