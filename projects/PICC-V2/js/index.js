"use strict";

var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var bocJS = function() {
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
        (function() {
          var imgAmount = imgArr.length;
          var loadAmount = 0;
          var percent = void 0;
          for (var j = 0; j < imgAmount; j++) {
            var img = new Image();
            img.src = imgArr[j];
            if (img.complete) {
              update();
              continue;
            }
            img.onload = function() {
              update();
            };
          }
          var update = function update() {
            loadAmount++;
            percent = Math.round(loadAmount * 100 / imgAmount);
            $("#load-progress").text(percent);
            if (percent == 100 && callback) {
              $("#loading").fadeOut(function() {
                $(this).remove();
              });
              callback();
            }
          };
        })();
      } else {
        alert("载入图片资源出错喽!");
      }
    }
  }, {
    key: "playSound",
    value: function playSound(args) {
      if (args.constructor === Object) {
        (function() {
          var $music = $('<div id="bgMusic" class="music mute"><audio src="' + args.resource + '" loop preload="auto"></audio></div>');
          $("body>script").eq(0).before($music);
          var audio = $music.find("audio")[0];
          audio.load();
          if (audio) {
            if (args.autoplay) {
              document.addEventListener("WeixinJSBridgeReady", function() {
                $music.trigger("click");
              }, false);
            }
            $music.on("click", function() {
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
        windowWidth / windowHeight > 320 / 504 ? $body.height(windowWidth * 504 / 320) : $body.height(windowHeight);
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
        $(".primary").on("tap", function() {
          confirmEvent ? confirmEvent() : $(".dialog-layer").addClass("hide");
          return false;
        });
        $(".cancel").on("tap", function() {
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


window.onload = function() {
  window.app = new bocJS();
  var $welcomePage = $(".welcome");
  var $gamePage = $(".game");
  var $lotteryPage = $(".lottery");
  var $lotteryResult = $(".lottery-result");
  var $rulePage = $(".rule");
  var $versoPage = $(".verso");
  var $gameHint = $(".game-hint");
  var $gameFailure = $(".game-failure");
  var $gameSucceed = $(".game-succeed");
  var $gameOver = $(".game-over");

  app.keys = [];
  app.timeout = 0;
  app.timerID = undefined;
  app.Debug   = true;
  /**
   * [页面切换]
   * @param  {[type]}   curr     [当前页面jQuery对象]
   * @param  {Function} next     [要切换页面jQuery对象]
   * @param  {Function} callback [页面切换完成回调]
   * @return {[type]}            [undefined]
   */
  app.loadPage = function(curr, next, callback) {
    curr.removeClass("enter").addClass("hide");
    next.removeClass("hide").addClass("enter");
    callback && callback();
  };
  /**
   * [载入遮罩层]
   * @param  {[type]}   mask     [遮罩层jQuery对象]
   * @param  {Function} callback [遮罩层载入完毕回调]
   * @return {[type]}            [undefined]
   */
  app.loadMask = function(mask, callback) {
    mask.removeClass("hide").addClass("enter");
    callback && callback();
  };
  /**
   * [倒计时]
   * @param  {[type]} time [所用时间]
   * @return {[type]}      [function 用于清除定时器]
   */
  app.timer = function(time) {
    var time = time || 300;
    var $time = $(".status-bar .time .text");
    var timeFlag  = setInterval(function() {
      time--;
      if (time >= 0) {
        if (time.toString().length > 2) {
          $time.text("Time: " + (time.toString()).slice(0, 2) + ":" + (time.toString()).slice(2) + "0");
        } else if (time.toString().length > 1) {
          $time.text("Time: 0" + (time.toString()).slice(0, 1) + ":" + (time.toString()).slice(1) + "0");
        } else {
          $time.text("Time: 00:" + (time.toString()) + "0");
        }
      } else {
        app.timeout = true;
        clearInterval(timeFlag );
        app.loadMask($gameFailure);
        $("#bgMusic").show();
      }
    }, 100);

    return function() {
      clearInterval(timeFlag);
      timeFlag = undefined;
      $("#bgMusic").show();
    }
  };
  /**
   * [摇一摇]
   * @param  {Function} callback [摇动后的回调函数]
   * @return {[type]}            [undefined]
   */
  app.shake = function(callback) {
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
      if ((curTime - last_update) > 100) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
          callback && callback();
        }
      }
      last_x = x;
      last_y = y;
      last_z = z;
    }
  };
  /**
   * [摇一摇页面事件]
   * @return {[type]} [undefined]
   */
  app.shakeEvent = function(){
    app.shake(function(){
      if(true){  //判断机会是否用完
        $(".amount-text strong").text("50");//设置金额
        app.loadPage($lotteryPage,$lotteryResult);
      }else{
        app.loadMask($gameOver);
      }
    });
  };
  /**
   * [判断游戏是结束]
   * @return {[type]} [undefined]
   */
  app.verdict = function() {
    if (app.keys.length === 11 && !app.timeout) {
      app.Debug && console.log("gameover");
      app.timerID();
      console.log(app.timerID);
      app.loadMask($gameSucceed);
    }
  };
  /**
   * [游戏初始化事件]
   * @return {[type]} [undefined]
   */
  app.gameInit = function() {
    setTimeout(function(){
      $(".hint-box").addClass("hide");
      $(".countdown").removeClass("hide").one("webkitAnimationEnd animationend", function() {
        $gameHint.removeClass("enter").addClass("hide");
        app.timerID = app.timer();
        $("#bgMusic").hide();
        app.Debug && console.log("gameStart");
      });
    },3000);
    var $targetDot = $(".target-dot");
    $(".game-body>div").width($(".game-bg img").width()); //初始化画面宽度
    app.loadMask($gameHint);
    $(".operating .opt").on("tap", function() {
      if (!app.timeout) { //检查是否超时
        if (!$targetDot.find(".dot").eq($(this).index()).hasClass("curr")) {
          $targetDot.find(".dot").eq($(this).index()).addClass("curr");
          app.keys.push($(this).index());
          $(".status-bar .amount .text").text(app.keys.length + "/11");
          app.verdict();
        }
      }
      return false;
    });
  };
  //首页按钮
  $(".welcome-link-bar>div").on("tap", function() {
    if ($(this).hasClass("start-btn")) {
      app.loadPage($welcomePage, $gamePage, app.gameInit); //开始游戏
    } else if ($(this).hasClass("rule-btn")) {
      app.loadMask($rulePage); // 活动详情
    }
  });
  //活动详情关闭按钮
  $rulePage.find(".close-btn").on("tap", function() {
    $rulePage.removeClass("enter").addClass("hide");
    return false;
  });
  //游戏提示页手动触发游戏开始倒计时
  // $gameHint.on("tap", function() {
  //   $(".hint-box").addClass("hide");
  //   $(".countdown").removeClass("hide").one("webkitAnimationEnd animationend", function() {
  //     $gameHint.removeClass("enter").addClass("hide");
  //     app.timerID = app.timer();
  //     $("#bgMusic").hide();
  //     app.Debug && console.log("gameStart");
  //   });
  //   return false;
  // });

  //游戏失败后，再玩一次
  $(".again-btn").on("tap", function() {
    app.keys = [];
    app.timeout = 0;
    app.timerID = undefined;
    $gameFailure.removeClass("enter").addClass("hide");
    app.timerID = app.timer();
    $(".target-dot .dot").removeClass("curr");
    $(".amount .text").text("0/11");
    $("#bgMusic").hide();
    app.Debug && console.log("gameReStart");
    return false;
  });
  //游戏通过后，领取话费礼包
  $(".succeed-btn").on("tap", function() {
    $gameSucceed.removeClass("enter").addClass("hide");
    app.loadPage($gamePage, $lotteryPage,app.shakeEvent);
    return false;
  });
  //摇一摇结果页表单提交
  $lotteryResult.find(".infoForm").on("submit",function(){
    var formData = $(this).serializeArray();
    var guest    = formData[0].value.trim();
    var mobile   = formData[1].value.trim();
    var telReg   = /^0{0,1}(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])[0-9]{8}$/;
    if(guest =="" || !telReg.test(mobile)){
      app.dialog({content:"请输入正确的姓名和手机号码！"})
    }else{
      app.Debug && console.log(formData);
      app.loadPage($lotteryResult,$versoPage);
    }
    return false;
  });
  $(".motion").on("touchstart",function(){
    $(this).addClass("hide");
    return false;
  });
  //开启背景音乐
  app.playSound({
    autoplay:true,
    resource:"media/bg.mp3"
  });
  //移除loading
  $("#loading").fadeOut(function(){
    $(this).remove();
  });
  $welcomePage.addClass("enter");
};
