var loadRES = ['img/boc.png','img/logo.png','img/img01.png','img/img02.png','img/img03.png','img/img04.png','img/img05.png','img/img06.png','img/img07.png','img/img08.png','img/img09.png','img/img10.png','img/img11.png','img/img12.png','img/img15.png','img/img13.png','img/img14.png','img/img21.png','img/img20.png','img/img19.png','img/img17.png','img/img22.png','img/img23.png','img/img24.png'];

loading(loadRES,function(){
	loadPage('welcome');

	// 索引：
	// upload：上传图片
	// preview：预览，生成二维码
	// signUp：提交表单
});


//~~~~~~~提交表单
var _run = true,
	_rePhone = /^1[3|4|5|7|8][0-9]{9}$/;

$('#J_submit').on('touchend',function(){
	$('#login input').blur();
	var _tel = $('input[name="tel"]').val(),		// 手机号
		_name = $('input[name="name"]').val();		// 姓名
	if (_name == ''){
		dialogueTips('请填写姓名');
	}else if(_tel == ''){
		dialogueTips('请填写手机号')
	}else if(!_rePhone.test(_tel)){
		dialogueTips('手机号码格式错误');
	}else{
		if(_run){
			_run = false;
			//==ajax
			_run = true;

			dialogueTips('提交成功！');

		}else{
			dialogueTips('正在提交……');
		}
	}
});


function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next == 'preview'){
    	//~生成海报
    	if($('#upload textarea').val()!=''){
    		$('#preview .txt').html($('#upload textarea').val());
    	}else{
    		$('#preview .txt').html('我在B1馆d17展位发现梦回·敦煌飞天，纤腰弄明月，长袖舞春风，春风十里遇见你，齐奏笙与簧');
    	}

    	if($('#upload input[type="file"]').val()==''){
    		$('#preview .preview-mod').html('<img src="img/img25.png" />');
    	}else{
    		drawInit();
    	}


		//~二维码
		var qrcode= $('#code').qrcode('http://wx.bocweb.cn/dingmaoyan/iccie_20170904/index.html').hide();
		var canvas=qrcode.find('canvas').get(0);
		$('#code').html('<img src="'+canvas.toDataURL('image/jpg')+'"/>').show();

    	//~截图
    	var _t = setTimeout(function(){
	    	html2canvas($("#preview")[0], {
				onrendered: function(canvas) {
					$("#preview").html('<img src="'+canvas.toDataURL("image/jpeg")+'" />');
					$("#preview").append('<p class="img01 link-load" nextHash="signUp" title="点靓文博"><img src="img/img18.png" /></p>');
				}
			});
			clearTimeout(_t);
    	},2000);
    }
}


//~~~~~~~翻页控制
$('.slide-page').on('swipeup',function(e){
	var _page = $(this).attr('nextHash');
	if(_page != ''){
		loadPage(_page);
	}
}).on('swipedown',function(e){
	var _prev = $(this).attr('prevHash');
	if(_prev != ''){
		loadPage(_prev);
	}
});
$('.page').on('click','.link-load',function(){
	var _next = $(this).attr('nextHash');
	loadPage(_next);
});



//~~~~~~~上传图片
var posterCanvas = $("#posterCanvas")[0];
var context = posterCanvas.getContext('2d');
var offscreenCanvas = document.createElement('canvas');
var offscreenContext = offscreenCanvas.getContext('2d');
offscreenCanvas.width = posterCanvas.width;
offscreenCanvas.height = posterCanvas.height;

var scale = 1.0;
var backFlag = false;

var coverImg = new Image();
coverImg.src = "img/img16.png";

var reader = new FileReader();
var uploadImg = {};

$('#upload input[type="file"]').on('change',function(){
	var _this = $(this);
	if(_this.val() != ''){
  		imgFile = $(this)[0];
  		$preview = $(this).parents(".upload-mod"); 	// 图片预览区域
  		var	orientation;
      	dialogueTips('正在上传……');

      	if (imgFile.files[0]){
      		EXIF.getData(imgFile.files[0], function () {
  	        	orientation = EXIF.getTag(this, 'Orientation');
	  	    });
  		    reader.onload = function (e){
  	    		getImgData(this.result,orientation,function (data) {
  	    			uploadImg = new Image();
		            uploadImg.src = data;
  	    			$preview.css({'background':'url(' + data + ') no-repeat center center','background-size':'contain'});
  	      		});
  	      	}
  	    }
  	    reader.readAsDataURL(imgFile.files[0]);
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


function drawInit(){
    var drawImageFuc = function drawImageFuc() {
      if (backFlag) {
        drawScaled();
        backFlag = false;
      }else{
        //ios 上面 canvas drawImage 方法绘制是情况很复杂 ～～～FUCK
        context.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
        offscreenContext.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
        // if (uploadImg.width > uploadImg.height) {
        //   //按宽度缩放图片
        //   context.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
        //   offscreenContext.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
        // } else if (uploadImg.width < uploadImg.height) {
        //   alert(2)
        //   //按高度缩放图片
        //   context.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, (posterCanvas.width - uploadImg.width * posterCanvas.height / uploadImg.height) / 2, 0, uploadImg.width * posterCanvas.height / uploadImg.height, posterCanvas.height);
        //   offscreenContext.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, (posterCanvas.width - uploadImg.width * posterCanvas.height / uploadImg.height) / 2, 0, uploadImg.width * posterCanvas.height / uploadImg.height, posterCanvas.height);
        // } else
        if (uploadImg.width === uploadImg.height) {
          //正方形
          if (uploadImg.width <= posterCanvas.width) {
            context.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, -uploadImg.width / 2 + posterCanvas.width / 2, -uploadImg.height / 2 + posterCanvas.height / 2, uploadImg.width, uploadImg.height);
            offscreenContext.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, -uploadImg.width / 2 + posterCanvas.width / 2, -uploadImg.height / 2 + posterCanvas.height / 2, uploadImg.width, uploadImg.height);
          } else {
            context.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
            offscreenContext.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
          }
        }else{
          //按宽度缩放图片
          context.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
          offscreenContext.drawImage(uploadImg, 0, 0, uploadImg.width, uploadImg.height, 0, (posterCanvas.height - posterCanvas.width * uploadImg.height / uploadImg.width) / 2, posterCanvas.width, posterCanvas.width * uploadImg.height / uploadImg.width);
        }
        context.drawImage(coverImg, 0, 0, posterCanvas.width, posterCanvas.height);
      }
    };
    setTimeout(drawImageFuc, 50);
};