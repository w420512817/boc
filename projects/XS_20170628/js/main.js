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

var loadRES = ['img/boc.png','img/img01.png','img/img02.png','img/img08.png','img/img09.png','img/img13.jpg','img/dialogue-close.png','img/dialogue-img.png','img/dialogue-share.png','img/img10.png','img/img10-blank.png','img/img14.png','img/img15.png','img/img16.png','img/img17.png','img/img18.png','img/img19.png','img/img20.png','img/submit-btn.png'];


var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}


var posterCanvas = $("#posterCanvas")[0];
var context = posterCanvas.getContext('2d');




var offscreenCanvas = document.createElement('canvas');
var offscreenContext = offscreenCanvas.getContext('2d');
offscreenCanvas.width = posterCanvas.width;
offscreenCanvas.height = posterCanvas.height;

var MINIMUM_SCALE = 1.0;
var MAXIMUM_SCALE = 3.0;
var manifestoCurr = 0;
var scale = 1.0;
var backFlag = false;


var coverImg = new Image();
coverImg.src = "img/poster-cover.png";

var reader = new FileReader();


loading(loadRES,function(){
	loadPage('welcome');
});

$('.link-load').on('click',function(){
	var _next = $(this).attr('nextHash');
	loadPage(_next);
});



$('#end .img01').on('click',function(){
  $('#D_share').show();
});
$('#D_share').on('click',function(){
  $('#D_share').hide();
});
$('#index .btn').on('click',function(){
	$('#D_rule').show();
});
$('#D_rule .img02').on('click',function(){
	$('#D_rule').hide();
});

var $scaleSlider = $(".zoom-block input");


var scale = 1.0;

//~~~~~上传图片
$("#J_upload").on("change", function(){
  if($(this).val() == ''){
    uploadImg.src = '';
  }else{
  	var _this = $(this),
  		imgFile = $(this)[0];
  		$preview = $(this).parents(".upload-mod"); 	// 图片预览区域
  		var	orientation;
  		scale = 1.0;
      dialogueTips('正在上传……');

      if (imgFile.files[0]){
      	// Exif.js 读取图像的元数据。获取图像的数据，能兼容尚未支持提供 EXIF 数据的浏览器获取到元数据。
      	EXIF.getData(imgFile.files[0], function () {
  	        orientation = EXIF.getTag(this, 'Orientation');
  	    });
  	    reader.onload = function (e){
  	    	getImgData(this.result,orientation,function (data) {
            uploadImg = new Image();
            uploadImg.src = data;
            $preview.css('background', 'url(' + data + ') no-repeat 50% 50% / contain');
            $preview.find('p.animate').hide();
            dialogueTips('上传成功！');
            var _timer = setTimeout(function(){
              loadPage('adjustment');
              clearTimeout(_timer);
            },1500);
  	      });
  	    }
  	    reader.readAsDataURL(imgFile.files[0]);
      }
    }
});

//~~~~~照片缩放调节
$scaleSlider.on("change", function () {
    scale = $(this).val();
    if(scale < MINIMUM_SCALE) {
      scale = MINIMUM_SCALE;
    }else if (scale > MAXIMUM_SCALE) {
      scale = MAXIMUM_SCALE;
    }
    drawScaled();
});

//~~~~~图片缩放后确定
$('#J_ok').on('click',function(){
  backFlag = true;
  drawInit();
  setTimeout(function () {
    $("#preview .preview-mod img,#end .preview-mod img").attr("src", posterCanvas.toDataURL("image/jpeg", 1.0));
  }, 60);
  loadPage('preview');
})


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


// 调整照片
function drawScaled() {
  var sw = posterCanvas.width * scale;
  var sh = posterCanvas.height * scale;
  context.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
  context.fillStyle = "#fff";
  context.fillRect(0, 0, posterCanvas.width, posterCanvas.height);
  context.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height, -sw / 2 + posterCanvas.width / 2, -sh / 2 + posterCanvas.height / 2, sw, sh);
  context.drawImage(coverImg, 0, 0, posterCanvas.width, posterCanvas.height);
};


function drawInit(){
    var drawImageFuc = function drawImageFuc() {
      if (backFlag) {
        drawScaled();
        backFlag = false;
      }else{
        //ios 上面 canvas drawImage 方法绘制是情况很复杂 ～～～FUCK
        context.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
        offscreenContext.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
        if (uploadImg.width > uploadImg.height) {
          //按宽度缩放图片
          context.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
          offscreenContext.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
        } else if (uploadImg.width < uploadImg.height) {
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

function loadPage(next) {
 	if(next == 'adjustment'){
 		if(typeof uploadImg.src == 'undefined'){
 			dialogueTips('请先上传图片');
 			return false;
 		}else{
 			$scaleSlider.val(1.0);
 			drawInit();
 		}
 	}else if(next == 'upload'){
    // 重新上传
    scale = 1.0;
    $('#upload').find('.upload-mod').css({'background':''})
        .find('p.animate').show();
    $("#J_upload").val('');
  }
	$('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');

}
