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

// 黑色小弹框
function dialogueTips(txt){
	var _html = '<div class="dialogue-tips" id="J_error">'+txt+'</div>';
	if($('.dialogue-tips').length>0){
		$('.dialogue-tips').remove();
		clearTimeout(t);
	}
	$('body').append(_html);
	t = setTimeout(function(){
		$('#J_error').remove();
		clearTimeout(t);
	},1500);
}



// document.ontouchmove = function(e){
// 	e.preventDefault();
// }

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

var uploadImg = {};

var loadRES = ['img/boc.png',
'img/p1.png','img/p2.png','img/p3.png','img/p4.png','img/p5.png','img/p6.png','img/p7.png','img/p8.png','img/p8_01.png','img/p8_02.png',
'img/p9.png','img/p9_01.png',
'img/p10.png','img/p10_01.png','img/p10_02.png','img/p10_03.png',
'img/p11.png','img/p11_01.png','img/p11_03.png',
'img/p12_01.png','img/p12_02.png','img/p12_03.png',
'img/p13.png','img/p14.png',
'img/units-icons.png'];


var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}


// var posterCanvas = $("#posterCanvas")[0];
// var context = posterCanvas.getContext('2d');




var offscreenCanvas = document.createElement('canvas');
var offscreenContext = offscreenCanvas.getContext('2d');
// offscreenCanvas.width = posterCanvas.width;
// offscreenCanvas.height = posterCanvas.height;

var MINIMUM_SCALE = 1.0;
var MAXIMUM_SCALE = 3.0;
var manifestoCurr = 0;
var scale = 1.0;
var backFlag = false;


var coverImg = new Image();
coverImg.src = "img/p11-1.png";
// coverImg.src = '';

var reader = new FileReader();


loading(loadRES,function(){
	// loadPage('welcome');
	loadPage('preview');
});

// 链接
// $('.link-load').on('click',function(){
// 	var _next = $(this).attr('nextHash');
// 	loadPage(_next);
// });
// page1
$('#welcome .page-hand').on('click',function(){
  loadPage('index');
})
// page2
// 规则
$('#index .page-btn1').on('click',function(){
  $(this).find('img').attr('src','img/s8_01.png');
  var _timer = setTimeout(function(){
    $('#D_rule').show();
    clearTimeout(_timer);
  },200);
	// $('#D_rule').show();
});
$('#D_rule .img02').on('click',function(){
  $('#D_rule').hide();
  // var _timer = setTimeout(function(){
    $("#index .page-btn1").find('img').attr('src','img/p8_01.png');
    //   clearTimeout(_timer);
    // },200);
  });
  // 下一页
$('#index .page-btn2').on('click',function(){
  $(this).find('img').attr('src','img/s8_02.png');
  var _timer = setTimeout(function(){
    loadPage('preview');
    clearTimeout(_timer);
  },200);
});
// // page3
// $('#upload .page-btn').on('click',function(){
//   loadPage('adjustment');
// });
// // page4
// $('#adjustment .page-ok').on('click',function(){
//   loadPage('preview');
// });
// page5
// 换一换
$('#preview .page-btn1').on('click',function(){
  $(this).find('img').attr('src','img/s12_01.png');
  var _timer = setTimeout(function(){
    $('#preview .page-photo input').click();
    $('#preview .page-btn1').find('img').attr('src','img/p12_01.png');
    clearTimeout(_timer);
  },200);
});
// $('#preview .page-btn2').on('click',function(){
//   loadPage('adjustment');
// });
// 生成海报
$('#preview .page-btn3').on('click',function(){
  $(this).find('img').attr('src','img/s12_03.png');
  var _check = true;
  // if($('#J_upload').length==1){
  if($('.photo-layer img').attr('src')==''){
    dialogueTips('请先上传照片');
    _check = false;
  }
  if (_check) {
    $('#J_end img').css({'visibility': 'hidden'});
    html2canvas(document.body).then(function (e) {
        // $('.slide03').addClass('hide');
        $('#preview .page-img').css('z-index','9');
        loadPage('end');
        var ctx = e.toDataURL();
        $('#end .page-img img').attr('src',ctx);
        // $('.msg').html('<img src=' + ctx + ' width=640 height=1030 />');
    })
  }
  // var _timer = setTimeout(function(){
  //   loadPage('end');
  //   clearTimeout(_timer);
  // },200);
});
// page6
// 分享
$('#end .page-btn').on('click',function(){
  $(this).find('img').attr('src','img/s13.png');
  var _timer = setTimeout(function(){
    $('#D_share').show();
    $("#end .page-btn").find('img').attr('src','img/p13.png');
    clearTimeout(_timer);
  },200);
  // $('#D_share').show();
});
$('#D_share').on('click',function(){
  $('#D_share').hide();
});



var $scaleSlider = $(".page-toobar input");
var scale = 1.0;

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
              $(".photo-layer img").attr("src", previewSrc);
              $('.photo-layer').show();
              $('#preview .page-photo').css({'background': 'transparent'}).find('img').css({'visibility': 'hidden'}).next('input').hide();
              $('.operate-layer').show();
              
          });
      };
      reader.readAsDataURL(imgFile.files[0]);
  }
});

//图片调整
var pinchRotateImg = $(".photo-layer img")[0];
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
// //~~~~~照片缩放调节
// $scaleSlider.on("change", function () {
//     scale = $(this).val();
//     if(scale < MINIMUM_SCALE) {
//       scale = MINIMUM_SCALE;
//     }else if (scale > MAXIMUM_SCALE) {
//       scale = MAXIMUM_SCALE;
//     }
//     drawScaled();
// });

//~~~~~图片缩放后确定
// $('#J_ok').on('click',function(){
//   backFlag = true;
//   drawInit();
//   setTimeout(function () {
//     $("#preview .page-img img,#end .page-img img").attr("src", posterCanvas.toDataURL("image/jpeg", 1.0));
//   }, 60);
//   loadPage('preview');
// })


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

// var _reW = 27/503;
// var _reH = 83/897;

// _x = posterCanvas.width*_reW;
// _y = posterCanvas.height*_reH;

function drawInit(){
    var drawImageFuc = function drawImageFuc() {
      if (backFlag) {
        drawScaled();
        backFlag = false;
      }else{
        //ios 上面 canvas drawImage 方法绘制是情况很复杂 ～～～FUCK
        context.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
        offscreenContext.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
        
        context.fillStyle = "#fff";
        context.fillRect(0, 0, posterCanvas.width, posterCanvas.height);

        if (uploadImg.width > uploadImg.height) {
          //按宽度缩放图片
          context.drawImage(uploadImg, 0,0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
          offscreenContext.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
        } else if (uploadImg.width < uploadImg.height) {
          console.log('-----------')
          //按高度缩放图片
          context.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, (posterCanvas.width - uploadImg.width * posterCanvas.height / uploadImg.height) / 2, 0, uploadImg.width * posterCanvas.height / uploadImg.height, posterCanvas.height);
          offscreenContext.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, (posterCanvas.width - uploadImg.width * posterCanvas.height / uploadImg.height) / 2, 0, uploadImg.width * posterCanvas.height / uploadImg.height, posterCanvas.height);
        } else if (uploadImg.width === uploadImg.height) {
          //正方形
          if (uploadImg.width <= posterCanvas.width) {
            context.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, -uploadImg.width / 2 + posterCanvas.width / 2, -uploadImg.height / 2 + posterCanvas.height / 2, uploadImg.width, uploadImg.height);
            offscreenContext.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, -uploadImg.width / 2 + posterCanvas.width / 2, -uploadImg.height / 2 + posterCanvas.height / 2, uploadImg.width, uploadImg.height);
          } else {
            context.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
            offscreenContext.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
          }
        }
        context.drawImage(coverImg, 0, 0, posterCanvas.width, posterCanvas.height);
      }
    };
    setTimeout(drawImageFuc, 50);
};

function loadPage(next){
  	$('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
}
// function loadPage(next) {
//   // 调整大小
//   if(next == 'end'){
//  		if(typeof uploadImg.src == 'undefined'){
//  			dialogueTips('请先上传图片');
//  			return false;
//  		}else{
//  			$scaleSlider.val(1.0);
//  			drawInit();
//      }
//   //  上传图片
//  	}else if(next == 'upload'){
//     // 重新上传
//     uploadImg = {};
//     scale = 1.0;
//     $('#preview').find('.page-photo').css({'background':''});
//     $('#preview').find('.page-photo img').show();
//     $("#J_upload").val('');
//   }
// 	$('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');

// }
