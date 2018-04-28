"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bocJS = function () {
  function bocJS() {
    _classCallCheck(this, bocJS);

    this.consoleLogo();
    this.rotateScreen();
    this.smartScale();
  }

  _createClass(bocJS, [{
    key: "loadAssets",
    value: function loadAssets(imgArr, callback) {
      if (imgArr.constructor === Array && imgArr.length > 0) {
        (function () {
          var imgAmount = imgArr.length;
          var loadAmount = 0;
          var percent = void 0;
          var updateProgress = function updateProgress() {
            loadAmount++;
            percent = Math.round(loadAmount * 100 / imgAmount);
            $("#load-progress").text(percent + "%");
            if (percent == 100 && callback) {
              $("#loading").fadeOut(function () {
                $(this).remove();
              });
              callback();
            }
          };
          for (var j = 0; j < imgAmount; j++) {
            var img = new Image();
            img.src = imgArr[j];
            if (img.complete) {
              updateProgress();
              continue;
            }
            img.onload = updateProgress;
          }
        })();
      } else {
        alert("载入图片资源出错喽!");
      }
    }
  }, {
    key: "playSound",
    value: function playSound(args) {
      if (args.constructor === Object) {
        (function () {
          var $music = $('<div id="bgMusic" class="music mute"><audio src="' + args.resource + '" autoplay loop preload="auto"></audio></div>');
          $("body>script").eq(0).before($music);
          var audio = $music.find("audio")[0];
          audio.load();
          if (audio) {
            if (args.autoplay) {
              document.addEventListener("WeixinJSBridgeReady", function () {
                $music.trigger("click");
              }, false);
            }
            $music.on("click", function () {
              if (audio.paused) {
                audio.play();
                $(this).addClass("mute");
              } else {
                audio.pause();
                $(this).removeClass("mute");
              }
            });
          } else {
            alert("音乐资源出错喽!");
          }
        })();
      }
    }
  }, {
    key: "smartScale",
    value: function smartScale() {
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();
      var $body = $("body");
      if (windowWidth > 640) {
        $body.height(windowHeight).width(windowHeight * 320 / 504);
      } else {
        $body.height(windowHeight);
        //windowWidth / windowHeight > 320 / 504 ? $body.height(windowWidth * 504 / 320) : $body.height(windowHeight);
      }
    }
  }, {
    key: "dialog",
    value: function dialog(args) {
      var dhtml = null;
      var $dialogLayer = null;
      var type = args.type || "alert";
      var title = args.title || '';
      var content = args.content || "弹窗内容，告知当前页面信息等";
      var confirmEvent = args.confirmEvent || null;
      var cancelEvent = args.cancelEvent || null;
      switch (type) {
        case "confirm":
          dhtml = '<div class="dialog-layer"><div class="dialog-body"><div class="dialog-title">' + title + '</div><div class="dialog-content">' + content + '</div><div class="dialog-btn"><span class="primary">确定</span><span class="cancel">取消</span></div></div>';
          break;
        case "alert":
          dhtml = '<div class="dialog-layer"><div class="dialog-body"><div class="dialog-title">' + title + '</div><div class="dialog-content">' + content + '</div><div class="dialog-btn single"><span class="primary">确定</span></div></div>';
          break;
      }
      $dialogLayer = $(".dialog-layer");
      if ($dialogLayer.length > 0) {
        $(".dialog-content").html(content);
        $(".dialog-layer").removeClass("hide");
      } else {
        $("body>script").eq(0).before(dhtml);
        $dialogLayer = $(".dialog-layer");
        $(".primary").on("tap", function () {
          confirmEvent ? confirmEvent() : $(".dialog-layer").addClass("hide");
          return false;
        });
        $(".cancel").on("tap", function () {
          cancelEvent ? cancelEvent() : $(".dialog-layer").addClass("hide");
          return false;
        });
      }
    }
  }, {
    key: "rotateScreen",
    value: function rotateScreen() {
      function orientationChange() {
        var $overlay = $(".overlay");
        var rotateTipsHTML = '<div class="overlay"><div class="inner"><div class="hint-img"></div><p>为了获得良好的显示效果，请旋转手机（竖屏）浏览！</p></div></div>';
        switch (window.orientation) {
          case 0:
          case 180:
            $overlay.remove();
            break;
          case -90:
          case 90:
            $("body>script").eq(0).before(rotateTipsHTML);
            break;
        }
      }
      orientationChange();
      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, false);
    }
  }, {
    key: "version",
    value: function version() {
      console.log("version: 0.0.5");
    }
  }, {
    key: "consoleLogo",
    value: function consoleLogo() {
      var logo = ' ___  ___   _____      _____ ___ \n' + '| _ )/ _ \\ / __\\ \\    / / __| _ ) \n' + '| _ \\ (_) | (__ \\ \\/\\/ /| _|| _ \\ \n' + '|___/\\___/ \\___| \\_/\\_/ |___|___/ \n\n';
      window.console && console.info && console.info(logo, "来自博采网络：http://www.bocweb.cn/");
    }
  }]);

  return bocJS;
}();

;

window.onload = function () {
  var app = new bocJS();
  var $choosePage = $(".choose");
  var $editPhoto = $(".edit-photo");
  var $lotteryPage = $(".lottery");
  var $photo = $(".edit-photo-box img");
  var $manifesto = $("#manifesto");
  var $posterManifesto = $(".poster-manifesto");
  var $shareMask = $(".share");
  var $waitingMask = $(".waiting");
  var pinchRotateImg = $photo[0];
  var initScale = 1;
  var manifestoList = ['江北区奋斗青年\n给自己的小目标是先赚1个亿', '江东区最炫牛人\n交朋友不看钱反正都没我有钱', '北仓街头小超人\n身披正义小斗篷脚踏风火轮', '镇海区靠谱典范\n萝莉御姐或正太来者不拒', '鄞州区低调大人物\n堪比北京朝阳区先进群众', '海曙区新晋网红\n盛世美颜人气爆棚无人能比'];
  var curr = 0;
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    onTransitionEnd: function onTransitionEnd(swiper) {
      $(".swiper-slide").removeClass("enter").eq(swiper.activeIndex).addClass("enter");
    }
  });
  app.switch = 0;
  app.loadPage = function (curr, next, callback) {
    curr.removeClass("enter").addClass("leave");
    if (curr.css("animation-name") != 'none') {
      curr.on("webkitAnimationEnd animationend", function () {
        $(this).removeClass("leave").addClass("hide").off("webkitAnimationEnd animationend");
        next.removeClass("hide").addClass("enter");
        callback && callback();
      });
    } else {
      curr.removeClass("leave").addClass("hide").off("webkitAnimationEnd animationend");
      next.removeClass("hide").addClass("enter");
      callback && callback();
    }
  };

  app.loadMask = function (mask, callback) {
    mask.removeClass("hide").addClass("enter");
    callback && callback();
  };

  app.unLoadMask = function (mask, callback) {
    mask.removeClass("enter").addClass("hide");
    callback && callback();
  };
  /*用于矫正ios上面照片的角度问题 （艹艹艹艹艹）
  @param {string} img 图片的base64
  @param {int} dir exif获取的方向信息
  @param {function} next 回调方法，返回校正方向后的base64
  */
  app.getImgData = function (img, dir, next) {
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
  };
  app.wechatShare = function () {
    var hrefUrl = window.location.href;
    var dataForWeixin = {
      img: "http://wx.bocweb.cn/huangguoqing/SUNAC9/images/share-img.jpg",
      linkurl: "http://wx.bocweb.cn/huangguoqing/SUNAC9/",
      desc: "恭喜入选时代封面人物！",
      title: "恭喜入选时代封面人物！"
    };

    $.ajax({
      url: "http://wx.bocweb.cn/index.php?welcome/getwxsdk",
      type: "post",
      data: {
        pageUrl: hrefUrl
      },
      dataType: 'json',
      success: function success(data) {
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
          // 所有要调用的 API 都要加到这个列表中
        });
      }
    });
    wx.ready(function () {
      // 2. 分享接口
      // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
      wx.onMenuShareAppMessage({
        title: dataForWeixin.title,
        desc: dataForWeixin.desc,
        link: dataForWeixin.linkurl,
        imgUrl: dataForWeixin.img,
        trigger: function trigger(res) {},
        success: function success(res) {
          //alert('已分享');
          app.shareSucceed();
        },
        cancel: function cancel(res) {
          //alert('已取消');
        },
        fail: function fail(res) {
          //alert(JSON.stringify(res));
        }
      });

      // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
      wx.onMenuShareTimeline({
        title: dataForWeixin.title,
        link: dataForWeixin.linkurl,
        imgUrl: dataForWeixin.img,
        trigger: function trigger(res) {
          // alert('用户点击分享到朋友圈');
        },
        success: function success(res) {
          //alert('已分享');
          app.shareSucceed();
        },
        cancel: function cancel(res) {
          //alert('已取消');
        },
        fail: function fail(res) {
          //alert(JSON.stringify(res));
        }
      });

      wx.onMenuShareQQ({
        title: dataForWeixin.title,
        desc: dataForWeixin.desc,
        link: dataForWeixin.linkurl,
        imgUrl: dataForWeixin.img,
        trigger: function trigger(res) {
          //alert('用户点击分享到QQ');
        },
        complete: function complete(res) {
          //alert(JSON.stringify(res));
        },
        success: function success(res) {
          //alert('已分享');
          app.shareSucceed();
        },
        cancel: function cancel(res) {
          //alert('已取消');
        },
        fail: function fail(res) {
          //alert(JSON.stringify(res));
        }
      });

      // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
      wx.onMenuShareWeibo({
        title: dataForWeixin.title,
        desc: dataForWeixin.desc,
        link: dataForWeixin.linkurl,
        imgUrl: dataForWeixin.img,
        trigger: function trigger(res) {
          //alert('用户点击分享到微博');
        },
        complete: function complete(res) {
          // alert(JSON.stringify(res));
        },
        success: function success(res) {
          //alert('已分享');
          app.shareSucceed();
        },
        cancel: function cancel(res) {
          // alert('已取消');
        },
        fail: function fail(res) {
          // alert(JSON.stringify(res));
        }
      });
    });
  };
  //摇一摇
  app.shake = function (callback) {
    var SHAKE_THRESHOLD = 3000;
    var last_update = 0;
    var x = 0;
    var y = 0;
    var z = 0;
    var last_x = 0;
    var last_y = 0;
    var last_z = 0;
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
      alert('您的手机不支持摇一摇');
    }

    function deviceMotionHandler(eventData) {
      var acceleration = eventData.accelerationIncludingGravity;
      var curTime = new Date().getTime();
      if (curTime - last_update > 100) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
          app.switch && callback && callback();
        }
      }
      last_x = x;
      last_y = y;
      last_z = z;
    }
  };
  //设置海报宣言
  app.setManifesto = function () {
    var defaultManifesto = ['江北区奋斗青年<br>给自己的小目标是<br>先赚1个亿', '江东区最炫牛人<br>交朋友不看钱反正<br>都没我有钱', '北仓街头小超人<br>身披正义小斗篷<br>脚踏风火轮', '镇海区靠谱典范<br>萝莉御姐或正太<br>来者不拒', '鄞州区低调大人物<br>堪比北京朝阳区<br>先进群众', '海曙区新晋网红<br>盛世美颜人气爆棚<br>无人能比'];
    var userset = $manifesto.val();
    if (userset === manifestoList[curr]) {
      $posterManifesto.html("<span class='wechatName'>土老帽</span><br><span>" + defaultManifesto[curr] + "</span>");
    } else {
      $posterManifesto.html("<span class='wechatName'>土老帽</span><br><span>" + userset + "</span>");
    }
  };
  //RetinaCanvas
  app.RetinaCanvas = function (source) {
    var offscreenCanvas = document.createElement('canvas');
    var offscreenContext = offscreenCanvas.getContext('2d');
    var cwps = source;
    offscreenCanvas.width = 3*cwps.width;
    offscreenCanvas.height = 3*cwps.height;
    offscreenContext.drawImage(source, 0, 0, cwps.width, cwps.height, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
    return offscreenCanvas;
  };
  //分享成功后回调函数
  app.shareSucceed = function () {
    var $lotteryResult = $(".lottery-img");
    var $resultImg = $lotteryResult.find("img");
    app.unLoadMask($shareMask, function () {
      app.loadPage($editPhoto, $lotteryPage, function () {

        //摇一摇代码
        app.switch = 1;
        app.shake(function () {
          //判断红包是否摇完
          if (false) {
            $resultImg.attr("src", "images/lottery-img-3.png");
          } else {
            $lotteryResult.addClass("lucky").attr("data-amount", "19.9");
            $resultImg.attr("src", "images/lottery-img-2.png");
          }
        });
      });
    });
  };
  $(".p6-btn").on("tap", function () {
    $(".swiper-container").addClass("hide");
    $(".touch-container").removeClass("hide");
    return false;
  });
  //上传照片
  $("#choose-photo").on("change", function () {
    var imgFile = $(this)[0];
    var $preview = $(this).parents(".input-col");
    var previewSrc = null;
    var reader = new FileReader();
    var orientation;
    //EXIF js 可以读取图片的元信息 https://github.com/exif-js/exif-js
    EXIF.getData(imgFile.files[0], function () {
      orientation = EXIF.getTag(this, 'Orientation');
    });
    reader.onload = function (e) {
      app.getImgData(this.result, orientation, function (data) {
        //这里可以使用校正后的图片data了
        previewSrc = data;
        $preview.css("background", "url(" + previewSrc + ") no-repeat 50% 50% / contain");
        $photo.attr("src", previewSrc);
        app.loadPage($choosePage, $editPhoto, app.setManifesto);
      });
    };

    // reader.onload = function(evt) {
    //   previewSrc = evt.target.result;
    //   $preview.css("background", "url(" + previewSrc + ") no-repeat 50% 50% / contain");
    //   $photo.attr("src", previewSrc);
    //   app.loadPage($choosePage, $editPhoto);
    // }
    reader.readAsDataURL(imgFile.files[0]);
  });
  //更换图片, 调整按钮
  $(".upload-row .btn-col >button").on("tap", function () {
    var $preview = $(".upload-row .input-col");
    app.setManifesto();
    if ($(this).hasClass("change-btn")) {
      $preview.removeAttr("style").find("#choose-photo").val("").trigger("click");
    } else if ($(this).hasClass("edit-btn")) {
      app.loadPage($choosePage, $editPhoto);
    }
    return false;
  });
  //更换宣言
  $manifesto.text(manifestoList[curr]);
  $(".change-manifesto").on("tap", function () {
    curr++;
    $manifesto.val(manifestoList[curr]);
    curr > 4 && (curr = 0);
  });
  //图片调整
  Transform(pinchRotateImg);
  new AlloyFinger($(".operate-layer")[0], {
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
  //生成海报
  $(".chooseForm-submit").on("tap", function () {
    app.setManifesto();
    app.loadPage($choosePage, $editPhoto, function () {
      $(".preview-watermark").addClass("hide");
      $(".photo-watermark").removeClass("hide");
      $(".operate-layer").addClass("hide");
      html2canvas($(".edit-photo")[0]).then(function (canvas) {
        var image = new Image();
        image.src = app.RetinaCanvas(canvas).toDataURL("image/png");
        $(".finalPhoto").append(image).removeClass("hide");
        $waitingMask.addClass("hide");
        $(".share-btn-finger").removeClass("hide");
      });
      setTimeout(function () {
        $waitingMask.removeClass("hide");
      }, 20);
    });
    return false;
  });
  //照片调整结束后确定
  $(".preview-ok").on("tap", function () {
    app.loadPage($editPhoto, $choosePage);
    return false;
  });
  //打开分享
  $(".share-btn").on("tap", function () {
    app.loadMask($shareMask);
    return false;
  });
  $shareMask.on("click", function () {
    app.unLoadMask($shareMask);
  });
  $("#loading").fadeOut(function () {
    $(this).remove();
    $(".swiper-slide").eq(0).addClass("enter");
  });
  app.wechatShare();
};