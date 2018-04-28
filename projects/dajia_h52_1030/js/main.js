//禁止窗口的默认滑动
document.ontouchmove = function (e) {
	e.preventDefault();
}
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

var mySwiper = new Swiper('#swiper1',{
	nextButton: '#imglist .page-next',
	prevButton: '#imglist .page-prev',
	// onSlideChange: function (swiper) {
	// 	if (swiper.isEnd) {
	// 		$('#imglist .page-next').hide();
	// 	} else {
	// 		$('#imglist .page-next').show();
	// 	}
	// 	if (swiper.isBeginning) {
	// 		$('#imglist .page-prev').hide();
	// 	} else {
	// 		$('#imglist .page-prev').show();
	// 	}
	// },
});
// 点击放大
$('#imglist .swiper-slide .page-img img').on('click',function(){
	var _this = $(this);
	
		wx.previewImage({
			current: _this.attr('src'),
			urls: [ _this.attr('src')]
		});
})
function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    // if(next=='welcome'){
		// var _t1=setTimeout(function(){
		// 	loadPage('welcome2');
		// clearTimeout(_t1);
		// },4000);
	// }
	if(next=='welcome'||next=='welcome2'||next=='welcome3'){
		$('.resize').removeClass('hide');
	}else{
		$('.resize').addClass('hide');
	}
	if(next == 'imglist'){
		mySwiper.update();
	}

	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
	// if(next=='end'){
	// 	var _t3=setTimeout(function(){
	// 		html2canvas($("#end .page-img")[0], {
	// 			onrendered: function (canvas) {
	// 				$("#end .page-img img").eq(1).attr('src', canvas.toDataURL("image/jpeg"));
	// 			}
	// 		});
	// 		clearTimeout(_t3);
	// 	},1000);
	// }
}

// 链接
$('#welcome').on('swipeup', function (e) {
	loadPage('welcome2');
}).on('click', function (e) {
	loadPage('welcome2');
});
$('#welcome2').on('swipeup', function (e) {
	loadPage('welcome3');
}).on('click', function (e) {
	loadPage('welcome3');
});
$('#welcome3').on('swipeup', function (e) {
	loadPage('list');
}).on('click', function (e) {
	loadPage('list');
});
// list
$('#list .page-btn1').on('click',function(){loadPage('upload');});
$('#list .page-btn2').on('click',function(){loadPage('imglist');});
//upload
//伪placeholder
$('#info-txt').on('click',function(){
	$('#upload strong').addClass('hide');
	if($(this).text()=='点击编辑文字，分享你的故事（限50个字）'){
		$(this).text('');
		$('#info-txt').focus();
	}
}).on('blur',function(){
	if($(this).text()==''){$(this).text('点击编辑文字，分享你的故事（限50个字）');}
	$(this).css('border','none');
});
$('#info-name').on('click',function(){
	if($(this).text()=='点击编辑'){
		$(this).text('');
		$('#info-name').focus();
	}
}).on('blur',function(){
	if($(this).text()==''){$(this).text('点击编辑');}
	$(this).css('border','none');
});

// imglist
$('#imglist .page-btn').on('click',function(){loadPage('list');})

// end
$('#end .page-btn1').on('click',function(){
	loadPage('list');
	$('#upload .page-btn').removeClass('hide');
	$('#upload .page-text').removeClass('hide');
	$('.operate-layer').hide();
});
// 分享
$('#end .page-btn2').on('click',function(){$('.share-box').removeClass('hide')});
$('.share-box').on('click',function(){$('.share-box').addClass('hide')});

// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-name').text() == '点击编辑'||$('#info-name').text() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if ($('#info-txt').text() == '点击编辑文字，分享你的故事（限50个字）'||$('#info-txt').text() == '') {
		dialogueTips('请输入你的故事……');
		_check = false;
	}else if($('#info-txt').text().length>50){
		dialogueTips('仅限50个字……');
		_check = false;
	}
	// if($('.photo-layer img').attr('src')==''){
	if($('.operate-layer').is(':hidden')){
		dialogueTips('请先上传照片');
		_check = false;
	  }
	if (_check) {
		$('#upload .page-btn').addClass('hide');
		// $('#upload .page-text').addClass('hide');
		// html2canvas(document.body).then(function (e) {
		// 	var ctx = e.toDataURL();
		// 	$('#end .page-img img').attr('src',ctx);
		// 	loadPage('end');
		// })
		// html2canvas($("#upload")[0], {
		// 	onrendered: function (canvas) {
		// 		$("#end .page-img img").attr('src', canvas.toDataURL("image/jpeg"));
		// 	}
		// });
		
		// html2canvas($("#upload")[0]).then(function (e) {
		// 	var ctx = e.toDataURL();
		// 	$('#end .page-img img').attr('src',ctx);
		// 	// loadPage('end');
		// });
		var w = $("#upload").width();
		var h = $("#upload").height();
		
		//要将 canvas 的宽高设置成容器宽高的 2 倍
		var canvas = document.createElement("canvas");
		canvas.width = w * 2;
		canvas.height = h * 2;
		canvas.style.width = w + "px";
		canvas.style.height = h + "px";
		var context = canvas.getContext("2d");
		//然后将画布缩放，将图像放大两倍画到画布上
		context.scale(2,2);
		
		html2canvas($("#upload")[0], {
			canvas: canvas,
			onrendered: function(canvas) {
				var img = canvas.toDataURL();
				$('#end .page-img img').attr('src',img);
			}
		});
		

		var _t2=setTimeout(function(){
			loadPage('end');
			clearTimeout(_t2);
		},1000);
	}
});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png','img/p1_11.png','img/p1_12.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png',
'img/p3_1.png','img/p3_2.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png','img/p4_4.png','img/p4_5.png','img/p4_6.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png',
'img/p6_1.png','img/p6_2.png',
'img/p7_2.png','img/p7_3.png',
'img/music2.png','img/bg0.jpg'
];

loading(loadRES, function () {
	// loadPage('welcome');
	loadPage('imglist');
});


//===上传照片
$('#J_upload').on('change', function () {
	var imgFile = $(this)[0],
		orientation,
		reader = new FileReader();
	if (imgFile.files[0]) {
		EXIF.getData(imgFile.files[0], function () {
			orientation = EXIF.getTag(this, 'Orientation');
		});
		reader.onload = function (e) {
			getImgData(this.result, orientation, function (data) {
				previewSrc = data;
				$("#upload .page-img1 img").attr("src", previewSrc);
				// $(".photo-layer img").attr("src", previewSrc);
				// $('.photo-layer').show();
				// $('#preview .page-photo').css({'background': 'transparent'}).find('img').css({'visibility': 'hidden'}).next('input').hide();
				$('.operate-layer').show();
				
			});
		};
		reader.readAsDataURL(imgFile.files[0]);
	}
  });
  
  //图片调整
  var pinchRotateImg = $("#upload .page-img1 img")[0];
  Transform(pinchRotateImg);
  new AlloyFinger($('.operate-layer')[0], {
	//   rotate: function rotate(evt) {
	// 	  pinchRotateImg.rotateZ += evt.angle;
	//   },
	  multipointStart: function multipointStart() {
		  initScale = pinchRotateImg.scaleX;
	  },
	  pinch: function pinch(evt) {
		  pinchRotateImg.scaleX = pinchRotateImg.scaleY = initScale * evt.scale;
	  },
	  pressMove: function pressMove(evt) {
		  pinchRotateImg.translateX += evt.deltaX;
		  pinchRotateImg.translateY += evt.deltaY;
		  evt.preventDefault();
	  }
  });


  
function getImgData(img, dir, next) {
    var image = new Image();
    image.onload = function () {
      var degree = 0,drawWidth,drawHeight,width,height;
      drawWidth = this.naturalWidth;
      drawHeight = this.naturalHeight;
      var maxSide = Math.max(drawWidth, drawHeight);
      if (maxSide > 1024) {
        var minSide = Math.min(drawWidth, drawHeight);
        minSide = minSide / maxSide * 1680;
        maxSide = 1680;
        if (drawWidth > drawHeight) {
          drawWidth = maxSide;
          drawHeight = minSide;
        } else {
          drawWidth = minSide;
          drawHeight = maxSide;
        }
      }
      var canvas = document.createElement('canvas');
      canvas.width = width = drawWidth;
      canvas.height = height = drawHeight;
      var context = canvas.getContext('2d');
      switch (dir) {
        case 3:
          degree = 180;
          drawWidth = -width;
          drawHeight = -height;
          break;
        case 6:
          canvas.width = height;
          canvas.height = width;
          degree = 90;
          drawWidth = width;
          drawHeight = -height;
          break;
        case 8:
          canvas.width = height;
          canvas.height = width;
          degree = 270;
          drawWidth = -width;
          drawHeight = height;
          break;
      }
      context.rotate(degree * Math.PI / 180);
      context.drawImage(this, 0, 0, drawWidth, drawHeight);
      next(canvas.toDataURL("image/png", .8));
    };
    image.src = img;
};

