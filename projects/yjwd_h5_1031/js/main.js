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
		$('.load-line span').width(percent+'%');
		if (percent == 100 && callback) {
			if($('.loading .load-img4').length>0){
				$('.loading .load-line').css('animation','fadeOut 1.5s ease both');
				$('.loading p').css('animation','fadeOut 1.5s ease both');
				$('.loading .load-img3 span').css('animation','widthAdd 1s .5s linear both');
				$('.loading .load-img4').css('animation','fadeIn 1.5s .5s linear both');
				$('.loading .load-img4').on('click',function(){
					currVideo.play();
					$(".load").remove();
				});
				callback();
			}else{
				var _t1=setTimeout(function(){
					$(".load").remove();
					callback();
				clearTimeout(_t1);
				},2000);
			}
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
// playClicked();
// 判断视频是否自动播放
var _checkVideo = false;
// var browser={
//     versions:function(){
//         var u = navigator.userAgent,
//             app = navigator.appVersion;
//         return {
//             trident: u.indexOf('Trident') > -1,
//             presto: u.indexOf('Presto') > -1,
//             webKit: u.indexOf('AppleWebKit') > -1,
//             gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
//             mobile: !!u.match(/AppleWebKit.*Mobile.*/),
//             ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
//             android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
//             iPhone: u.indexOf('iPhone') > -1 ,
//             iPad: u.indexOf('iPad') > -1,
//             webApp: u.indexOf('Safari') == -1,
//             weixin: u.indexOf('MicroMessenger') > -1,
//             qq: u.match(/\sQQ/i) == " qq"
//         };
//     }(),
//     language:(navigator.browserLanguage || navigator.language).toLowerCase()
// }
// if((browser.versions.weixin && browser.versions.ios) || (!browser.versions.weixin && browser.versions.android)){
// 	_checkVideo = true;
// 	$('.play-btn').remove();
// }


var _run = true;
//~播放视频
var videoList = [$("#pagevideo video").eq(0)[0]],
	currVideo = videoList[0];
document.addEventListener("WeixinJSBridgeReady", function () {
	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);

function video(){
	
	// $(".music").addClass('hide');
	// audio_player.pause();

	if(_checkVideo){
		if(currVideo.currentTime == 0){
			currVideo.load();
			currVideo.play();
		}else{
			currVideo.currentTime = 0;
			currVideo.play();
		}
	}else{
		//~手动播放
		$('.play-btn').show().on('click',function(){
			if(_run){
				_run = false;
				$('.play-btn').hide();
				currVideo.currentTime = 0;
				currVideo.play();
			}
		})
	}
	currVideo.addEventListener('ended',function(){
		loadPage('upload');
		// alert(1);
	});
}

function loadPage(next) {
	$('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
	if(next=='pagevideo'){
		video();

	}if(next=='upload'){
		$(".music").removeClass('hide');
		playClicked();
	}
    if(next=='end'){
		// $('#change .page-img4').clone('true');
		// var tag=$('#change .page-img4').clone('true').html();
		// $('#end .page-img1').append(tag);
		$(".music").removeClass('hide');
		var _t2=setTimeout(function(){
			$('#end .page-box').fadeOut();
			// html2canvas($("#end .new")[0], {
			// onrendered: function (canvas) {
			// 	$('#end .new').append('<div class="page-img4"><img src="'+canvas.toDataURL("image/jpeg")+'"></div>')
			// 	// $("#end .page-img4 img").attr('src', canvas.toDataURL("image/jpeg"));
			// }
			// });
		clearTimeout(_t2);
		},2500);
	}
	// if(next=='change'){
	// 	$('.operate-layer').show();
	// }else{
	// 	$('.operate-layer').hide();
	// }
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}
// 链接
// 上传
// $('#upload .page-btn').on('click',function(){
	
// 	loadPage('change');
// })
// 修改
$('#change .page-btn1').on('click',function(){
	// $('#upload .page-img1 img').attr('src','img/p1_1.png');
	$('#upload .page-img1').css({
		'backgroundImage':'url()'
	});
	$('#upload .page-img1 img').css('visibility','visible');
	$('#upload .page-file').show();
	$('#info-name').val('');
	loadPage('upload');
})


var _coverImg = new Image();

$('#change .page-btn2').on('click',function(){
	// html2canvas($("#change .new")[0], {
	// 	onrendered: function (canvas) {
	// 		$("#end .page-img1 img").attr('src', canvas.toDataURL("image/jpeg"));
	// 	}
	// });
	// var _t3=setTimeout(function(){
		// 	loadPage('end');
		// 	clearTimeout(_t3);
		// },500);
		// 0.5
		$(".music").addClass('hide');

		// var w = $("#change .new").width();
		// var h = $("#change .new").height();
		
		// //要将 canvas 的宽高设置成容器宽高的 2 倍
		// var canvas = document.createElement("canvas");
		// canvas.width = w * 2;
		// canvas.height = h * 2;
		// canvas.style.width = w + "px";
		// canvas.style.height = h + "px";
		// var context = canvas.getContext("2d");
		// //然后将画布缩放，将图像放大两倍画到画布上
		// context.scale(2,2);
		// var _t2=setTimeout(function(){
		
		// 	html2canvas($("#change .new")[0], {
		// 		canvas: canvas,
		// 		onrendered: function(canvas) {
		// 			var img = canvas.toDataURL();
		// 			$('#end .page-img1 img').attr('src',img);
		// 			alert(2);
		// 			alert($('#end .page-img1 img').attr('src'));
		// 		}
		// 	});
		// 	alert(1);
		// 	loadPage('end');
		// 	clearTimeout(_t2);
		// },1000);

		_coverImg.onload = function(){
			html2canvas($("#change .new")[0]).then(function (e) {
				var ctx = e.toDataURL();
				$('#end .page-img1 img').attr('src',ctx);
				alert(1);
				loadPage('end');
			});
		}
	// var tag=$('#change .page-img4').clone('true').html();
	// $('#end .page-img1').append(tag);
	// loadPage('end');

})
// end
$('#end .page-btn1').on('click',function(){window.location.href="https://m.yunjiweidian.com/yunjibuyer/subject/index/"});
// 分享
$('#end .page-btn2').on('click',function(){$('.share-box').removeClass('hide')});
//关闭
$('.share-box').on('click', function () {$('.share-box').addClass('hide');});
//end2
// 分享
$('#end2 .page-btn1').on('click',function(){window.location.href="index.html"});
$('#end2 .page-btn2').on('click',function(){$('.share-box').removeClass('hide')});




// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-name').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	console.log($('#upload .page-img1 ').css('backgroundImage'));
	if ($('#upload .page-img1 ').css('backgroundImage') == 'none') {
		dialogueTips('请先上传照片……');
		_check = false;
	}
	// if ($('#upload .page-img1 img').attr('src') == 'img/p1_1.png') {
	// 	dialogueTips('请先上传照片……');
	// 	_check = false;
	// }
	if (_check) {
		$('.page-name').text($('#info-name').val());
		loadPage('change');
	}
});


var loadRES = ['img/icon/boc.png',
'img/p0_1.png','img/p0_2.png','img/p0_3.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png',
'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png',
'img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png',
'img/music2.png','img/bg0.jpg'
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
				_coverImg.src = data;
				// previewSrc = 'img/p2_1.png';
				// $("#upload .page-img1 img").attr("src", previewSrc);
				$('#upload .page-img1 img').css('visibility','hidden');
				$("#upload .page-img1 ").css({
					'backgroundImage': 'url('+previewSrc+')',
					// 'backgroundRepeat':'no-repeat',
					// 'backgroundPosition':'center center',
					// 'backgroundSize':'auto 100%'
				});
				$("#change .page-img1 ").css('backgroundImage','url('+previewSrc+')');
				// $("#change .page-img1 img").attr("src", previewSrc);
				// $("#end .page-img1 img").attr("src", previewSrc);
				// $(".photo-layer img").attr("src", previewSrc);
				// $('.photo-layer').show();
				// $('#preview .page-photo').css({'background': 'transparent'}).find('img').css({'visibility': 'hidden'}).next('input').hide();
				// $('.operate-layer').show();
				$('#upload .page-file').hide();
			});
		};
		reader.readAsDataURL(imgFile.files[0]);
	}
  });
  
  //图片调整
  var pinchRotateImg = $("#change .page-img4 img")[0];
  Transform(pinchRotateImg);
  new AlloyFinger(pinchRotateImg, {
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
