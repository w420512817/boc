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
$('.user-box .user-img').css('backgroundImage','url(img/ceshi.png)');
// 链接
$('#welcome').on('click',function(){loadPage('home')});
// 按钮
$('.page-btn-l').on('click',function(){$('#rule').removeClass('hide');});
// $('.page-btn-c').on('click',function(){loadPage('join')});
$('.page-btn-c').on('click',function(){window.location.href="join.html"});
$('.page-btn-r').on('click',function(){$('#list').removeClass('hide');});
// 搜索
$('.page-search button').on('click',function(e){e.preventDefault();;alert('搜索中...');});
// home
// $('#home .page-userlist .user-box').on('click',function(){loadPage('detail')});
$('#home .page-userlist .user-box').on('click',function(){window.location.href="detail.html"});
// detail
// 查看大图
$('#detail .user-box .user-img').on('click',function(){$('.big-img').removeClass('hide');});
$('.big-img').on('click',function(){$('.big-img').addClass('hide')});
// 投票
$('#detail .user-box .user-vote').on('click',function(){dialogueTips('成功！')});
// 规则
// $('#rule .page-text').on('click', function () {$('#rule').addClass('hide')});
$('#rule .page-back').on('click', function () {$('#rule').addClass('hide')});
// 排行榜
// $('#list').on('click', function () {$('#list').addClass('hide')});
$('#list .page-back').on('click', function () {$('#list').addClass('hide')});
// join
// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	// console.log($('#join .page-file').attr('data-val'));
	if ($('#join .page-file').attr('data-val') !== 'true') {
		dialogueTips('请先上传图片……');
		_check = false;
	}
	else if ($('#info-name').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	else if ($('#info-phone').val() == '') {
		dialogueTips('请输入电话……');
		_check = false;
	}
	else {
		var _fileImg=$('#join .page-file').css('backgroundImage'),
			_fileName=$('#info-name').val();
		$('#end .user-box .user-img').css('backgroundImage',_fileImg);
		$('#end .user-box p span').eq(1).text(_fileName);
		loadPage('end');
	}
});
// end
$('#end .page-btn-c').on('click',function(){window.location.href="index.html"});

// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});

var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png','img/p1_9.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png',
'img/p3_1.png',
'img/p4_1.png','img/p4_2.png',
'img/p5_1.png','img/p5_2.png',
'img/p6_1.png',

'img/music2.png','img/bg1.jpg'
];



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
				// $("#join .page-file").attr("src", previewSrc);
				$('#join .page-file').css({
					'backgroundImage':'url('+previewSrc+')'
				});
				$('#join .page-file').attr('data-val','true');
				// $('.operate-layer').show();
				
			});
		};
		reader.readAsDataURL(imgFile.files[0]);
	}
  });
  
  //图片调整
//   var pinchRotateImg = $("#upload .page-img1 img")[0];
//   Transform(pinchRotateImg);
//   new AlloyFinger($('.operate-layer')[0], {
// 	//   rotate: function rotate(evt) {
// 	// 	  pinchRotateImg.rotateZ += evt.angle;
// 	//   },
// 	  multipointStart: function multipointStart() {
// 		  initScale = pinchRotateImg.scaleX;
// 	  },
// 	  pinch: function pinch(evt) {
// 		  pinchRotateImg.scaleX = pinchRotateImg.scaleY = initScale * evt.scale;
// 	  },
// 	  pressMove: function pressMove(evt) {
// 		  pinchRotateImg.translateX += evt.deltaX;
// 		  pinchRotateImg.translateY += evt.deltaY;
// 		  evt.preventDefault();
// 	  }
//   });


  
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

