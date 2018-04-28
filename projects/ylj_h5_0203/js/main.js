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
		$('#load-line span').width(percent+'%');
		if (percent == 100 && callback) {
			setTimeout(function(){
				$(".load").remove();
				callback();
			},2000);
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

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
 //    if(next=='welcome'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('welcome2');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

//链接
// $('.b').on('click',function(){window.location.href= ""});
$('#welcome .page-btn').on('click',function(){loadPage('picture')});

$('#picture .page-btn2').on('click',function(){
	$('#picture .page-btn2').addClass('on');
	setTimeout(function(){
		// 随机0-4
		var _index= Math.floor(Math.random()*5);
		console.log(_index);
		if(_index=='0'){loadPage('end1');}
		else if(_index=='1'){loadPage('end2');}
		else if(_index=='2'){loadPage('end3');}
		else if(_index=='3'){loadPage('end4');}
		else if(_index=='4'){loadPage('end5');}
	},1000);
});
// 上滑
// $('#welcome').on('swipeup', function (e) {
// 	loadPage('welcome2');
// }).on('click', function (e) {
// 	loadPage('welcome2');
// });
// 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 关闭
// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});
// 提交
// $('#form-submit').on('click', function () {
// 	var _check = true;
// 	if ($('#info-phone').val() == '') {
// 		dialogueTips('请输入电话……');
// 		_check = false;
// 	}
// 	if ($('#info-name').val() == '') {
// 		dialogueTips('请输入姓名……');
// 		_check = false;
// 	}

// 	if (_check) {
// 		loadPage('welcome2');
// 	}
// });


var loadRES = ['img/icon/boc.png',
'img/p0_1.png','img/p0_2.png','img/p0_3.png','img/p0_4.png','img/p0_5.png','img/p0_6.png','img/p0_7.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png','img/p2_11.png','img/p2_12.png',
'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png',
'img/p4_1.png','img/p4_2.png','img/p4_3.png',
'img/p5_1.png','img/p5_2.png','img/p5_3.png',
'img/p6_1.png','img/p6_2.png','img/p6_3.png',
'img/p7_1.png','img/p7_2.png','img/p7_3.png',
'img/music2.png','img/bg0.jpg','img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('end5');
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
				// $(".photo-layer img").attr("src", previewSrc);
				$('#picture .page-img5').removeClass('hide');
				$("#picture .page-img5 img").attr("src", previewSrc);
				$('#picture .page-img6').removeClass('hide');
				$('#picture .page-btn2').removeClass('hide');
				$('.operate-layer').show();
			});
		};
		reader.readAsDataURL(imgFile.files[0]);
	}
  });
  
  //图片调整
  var pinchRotateImg = $("#picture .page-img5 img")[0];
  Transform(pinchRotateImg);
  new AlloyFinger($('.operate-layer')[0], {
	  rotate: function rotate(evt) {
		  pinchRotateImg.rotateZ += evt.angle;
	  },
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