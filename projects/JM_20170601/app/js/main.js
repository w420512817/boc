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
            $(".loading").remove();
            callback();
        }
    }
}


var loadRES = ['img/boc.png', 'img/img09.png', 'img/slide03-bg.png', 'img/img12.png', 'img/img12-blank.png', 'img/img13.png', 'img/img15.png', 'img/img14.png']
loading(loadRES, function () {
    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        $body = $("body");
    if (windowWidth > 640) {
        $body.height(windowHeight).width(windowHeight * 320 / 504);
    } else {
        $body.height(windowHeight);
    }

    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: false,
        noSwiping: true,
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
                    $(".photo-layer img").attr("src", previewSrc);
                    $('.photo-layer').show();
                    $('.upload-btn').css({'background': 'transparent'}).find('img').css({'visibility': 'hidden'}).next('input').remove();
                    $('.operate-layer').show();
                });
            };
            reader.readAsDataURL(imgFile.files[0]);
        }
    });

    var //_def = '点击输入你想说的话',
        _key = '我是';
    $('#slide03 textarea').focus(function(){
        if($(this).val() == ''){
            $(this).val(_key);
        }
    }).blur(function(){
        if($(this).val() == '我是'){
            $(this).val('');
        }
    })

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


    // 点击生成海报
    $('#J_end').on('click', function () {
        var _check = true;
        if($('#J_upload').length==1){
        	dialogueTips('请先上传照片');
        	_check = false;
        }
        if($('.txt-mod textarea').val().length==0){
        	dialogueTips('请输入您想说的话');
        	_check = false;
        }

        if (_check) {
            $('#J_end img').css({'visibility': 'hidden'});
            html2canvas(document.body).then(function (e) {
                $('.slide03').addClass('hide');
                var ctx = e.toDataURL();
                $('.msg').html('<img src=' + ctx + ' width=640 height=1030 />');
                alert('长按保存图片！');
            })
        }
    });

});

var t;
function dialogueTips(txt) {
    var _html = '<div class="dialogue-tips" id="J_error">' + txt + '</div>';
    if ($('.dialogue-tips').length > 0) {
        $('.dialogue-tips').remove();
        clearTimeout(t);
    }
    $('body').append(_html);
    t = setTimeout(function () {
        $('#J_error').remove();
        clearTimeout(t);
    }, 1500);
}


function getImgData(img, dir, next) {
    var image = new Image();
    image.onload = function () {
        var degree = 0,
            drawWidth,
            drawHeight,
            width,
            height;
        drawWidth = this.naturalWidth;
        drawHeight = this.naturalHeight;
        var maxSide = Math.max(drawWidth, drawHeight);
        if (maxSide > 1024) {
            var minSide = Math.min(drawWidth, drawHeight);
            minSide = minSide / maxSide * 1024;
            maxSide = 1024;
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
        next(canvas.toDataURL("image/jpeg", .8));
    };
    image.src = img;
}

//裁切画布
function cropCanvas(source) {
    var offscreenCanvas = document.createElement('canvas');
    var offscreenContext = offscreenCanvas.getContext('2d');
    var $cropWindow = $(".photo-layer img");
    var cwps = $('.upload-btn').position();

    cwps.width = $cropWindow.width().toFixed(2);
    cwps.height = $cropWindow.height().toFixed(2);
    cwps.top = cwps.top.toFixed(2);
    cwps.left = cwps.left.toFixed(2);
    offscreenCanvas.width = $('.upload-btn').width();
    offscreenCanvas.height = $('.upload-btn').height();
    offscreenContext.drawImage(source, cwps.left, cwps.top, cwps.width, cwps.height, 0, 0, cwps.width, cwps.height);
    return offscreenCanvas;
}