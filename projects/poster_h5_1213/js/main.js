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
// playClicked();

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next=='end'){
		var w = $("#end").width();
		var h = $("#end").height();
		
		//要将 canvas 的宽高设置成容器宽高的 2 倍
		var canvas = document.createElement("canvas");
		canvas.width = w * 2;
		canvas.height = h * 2;
		canvas.style.width = w + "px";
		canvas.style.height = h + "px";
		var context = canvas.getContext("2d");
		//然后将画布缩放，将图像放大两倍画到画布上
		context.scale(2,2);
		var _t2=setTimeout(function(){
			html2canvas($("#end")[0], {
				canvas: canvas,
				onrendered: function(canvas) {
					var img = canvas.toDataURL();
					// alert(img);
					$('#end .page-img2 img').attr('src',img);
					$('#end .info-title').addClass('hide');
					$('#end .info-text').addClass('hide');
				}
			});
			clearTimeout(_t2);
		},200);
	}
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}


//伪placeholder
$('#info-title').on('click',function(){
	if($(this).val()=='输入你是哪里人'){
		$(this).val('');
		$('#info-title').focus();
	}
}).on('blur',function(){
	if($(this).val()==''){$(this).val('输入你是哪里人');}
});
$('#info-text').on('click',function(){
	if($(this).val()=='输入您最想对家乡说的话'){
		$(this).val('');
		$('#info-text').focus();
	}
}).on('blur',function(){
	if($(this).val()==''){$(this).val('输入您最想对家乡说的话');}
});

// 链接
//===上传照片
$('#welcome input[type="file"]').on('change', function () {
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
				// $("#welcome .page-photo").css("backgroundImage", 'url('+previewSrc+')');
				$("#welcome .page-photo>img").attr("src", previewSrc);
				// $(".show-box .show-img1").css("backgroundImage", 'url('+previewSrc+')');
				$(".show-box .show-img1 img").attr("src",previewSrc);
				// $("#end .page-img1").css("backgroundImage", 'url('+previewSrc+')');
				$("#end .page-img1 img").attr("src",previewSrc);
				// $("#end .page-img1 img").attr("src",previewSrc);
			});
		};
		reader.readAsDataURL(imgFile.files[0]);
	}
  });
var _arr=[
	'走遍大江南北<br>月依然故乡明',
	'乡音是最美的歌谣<br>把家的思念都挂在嘴上',
	'如果回忆是一条小河流<br>逆流而上可否一解乡愁'
]
// 预览
$('#welcome .page-btn1').on('click',function(){
	if($('#info-title').val()==''||$('#info-title').val()=='输入你是哪里人'){
		$('.info-title').text('');
	}else{
		$('.info-title').text($('#info-title').val());
	}
	if($('#info-text').val()==''||$('#info-text').val()=='输入您最想对家乡说的话'){
		var _index = Math.floor(Math.random()*3);
		console.log('随机数'+_index);
		$('.info-text').html(_arr[_index]);
	}else{
		$('.info-text').html($('#info-text').val());
	}
	$('.show-box').removeClass('hide');
});
//关闭
$('.show-box').on('click', function () {
	$('.show-box').addClass('hide');
});

// 分享
$('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 生成
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-title').val() == '输入你是哪里人') {
		dialogueTips('请输入你是哪里人……');
		_check = false;
	}
	if (_check) {
		$('.info-title').text($('#info-title').val());
		if($('#info-text').val()==''||$('#info-text').val()=='输入您最想对家乡说的话'){
			var _index = Math.floor(Math.random()*3);
			console.log('随机数'+_index);
			$('.info-text').html(_arr[_index]);
		}else{
			$('.info-text').html($('#info-text').val());
		}

		loadPage('end');
	}
});


var loadRES = ['img/icon/boc.png',
'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png',
'img/music2.png','img/bg1.jpg'
];

loading(loadRES, function () {
	loadPage('welcome');
	// loadPage('end');
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