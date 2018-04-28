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
          var $music = $('<div id="bgMusic" class="music mute"><audio src="' + args.resource + '" preload="auto"></audio></div>');
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

$(function () {
  var app = new bocJS();
  var $tpl1 = $("#tpl-p1");
  var $tpl2 = $("#tpl-p2");
  var $tpl3 = $("#tpl-p3");
  var $tpl4 = $("#tpl-p4");
  var $tpl5 = $("#tpl-p5");
  var $tpl6 = $("#tpl-p6");
  var $tpl7 = $("#tpl-p7");
  var $tpl8 = $("#tpl-p8");
  var $tpl81 = $("#tpl-p81");
  var $tpl9 = $("#tpl-p9");
  var $tpl10 = $("#tpl-p10");
  var $tpl11 = $("#tpl-p11");
  var $tpl12 = $("#tpl-p12");
  var $tpl13 = $("#tpl-p13");
  var $tpl14 = $("#tpl-p14");
  var $tpl15 = $("#tpl-p15");
  var $tpl16 = $("#tpl-p16");
  var $container = $("#container");

  var userInputSave = {};

  var submitFlag = 0;

  var effectList = [];

  app.loadPage = function (el, callback) {
    var pageHTML = el.html();
    var $destroyPage = $container.find(".page").removeClass("enter").addClass("leave");
    if ($destroyPage.length > 0 && $destroyPage.css("animation-name") != 'none') {
      $destroyPage.one("webkitAnimationEnd animationend", function () {
        $destroyPage.remove();
        $container.append($(pageHTML).addClass("enter"));
        callback && callback();
      });
    } else {
      $destroyPage.remove();
      $container.append($(pageHTML).addClass("enter"));
      callback && callback();
    }
  };
  app.loadMask = function (mask, callback) {
    var maskHTML = mask.html();
    $container.append($(maskHTML).addClass("enter"));
    maskHTML = null;
    callback && callback();
  };
  app.unloadMask = function (mask, callback) {
    $container.find(mask).removeClass("enter").addClass("leave").on("webkitAnimationEnd animationend", function () {
      $(this).remove();
      callback && callback();
    });
  };

  app.loadEffect = function () {
    for (var i = 1; i < 16; i++) {
      var se = new Audio("media/p" + i + ".mp3");
      se.load();
      effectList.push(se);
    }
  }();
  app.playEffect = function (id) {
    effectList.forEach(function (item, index) {
      if (id === index) {
        item.play();
      } else {
        item.pause();
      }
    });
  };
  app.p14Event = function () {
    app.playEffect(14);
    $(".p14-form-box .close-btn").on("tap", function () {
      app.loadPage($tpl13, app.p13Event);
    });
    $(".form-block form").on("submit", function () {
      var formData = $(this).serializeArray();
      var telReg = /^0{0,1}(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])[0-9]{8}$/;
      if (formData[0].value.trim() === '') {
        app.dialog({ content: '请输入投保人的姓名' });
      } else if (!telReg.test(formData[1].value.trim())) {
        app.dialog({ content: '请输入正确的手机号码' });
      } else if (formData[2].value.trim() === '') {
        app.dialog({ content: '请输入家庭住址' });
      } else if (formData[3].value.trim() === '') {
        app.dialog({ content: '请输入水稻亩数' });
      } else {
        console.table(formData);
        submitFlag = 1;
        app.loadPage($tpl15, function () {
          setTimeout(function () {
            app.loadPage($tpl13, app.p13Event);
          }, 2000);
        });
      }
      return false;
    });
  };
  app.p13Event = function () {
    effectList[13].load();
    app.playEffect(13);
    $(".p13-btn-bar >div").on("tap", function () {
      if ($(this).hasClass('p13-btn-1')) {
        if (!submitFlag) {
          app.loadPage($tpl14, app.p14Event);
        }
      } else if ($(this).hasClass('p13-btn-2')) {
        app.loadMask($tpl16, function () {
          $(".share").on("tap", function () {
            app.unloadMask(".share");
            return false;
          });
        });
      }
      return false;
    });
  };
  app.p12Event = function () {
    app.playEffect(12);
    $(".p12-plate .close-btn").on("tap", function () {
      app.loadPage($tpl13, app.p13Event);
    });
  };
  app.p11Event = function () {
    app.playEffect(11);
    $(".p11-plate .close-btn").on("tap", function () {
      app.loadPage($tpl12, app.p12Event);
    });
  };
  app.p10Event = function () {
    app.playEffect(10);
    $(".p10-finger").on("tap", function () {
      app.loadPage($tpl11, app.p11Event);
    });
  };
  app.p9Event = function () {
    app.playEffect(9);
    $(".p9-plate").on("webkitAnimationEnd animationend", function () {
      setTimeout(function () {
        if ($container.find(".p9").length > 0) {
          //超时后判断页面是否跳转了
          app.loadPage($tpl10, app.p10Event);
        }
      }, 5000);
      effectList[9].addEventListener("ended", function () {
        app.loadPage($tpl10, app.p10Event);
      }, false);
    });
  };

  app.p81Event = function () {
    app.playEffect(8);
    setTimeout(function () {
      if ($container.find(".p81").length > 0) {
        //超时后判断页面是否跳转了
        app.loadPage($tpl9, app.p9Event);
      }
    }, 15000);
    effectList[8].addEventListener("ended", function () {
      app.loadPage($tpl9, app.p9Event);
    }, false);
  };
  app.p8Event = function () {
    app.playEffect(7);
    $(".p8-plate-text").on("webkitAnimationEnd animationend", function () {
      setTimeout(function () {
        if ($container.find(".p8").length > 0) {
          //超时后判断页面是否跳转了
          app.loadPage($tpl81, app.p81Event);
        }
      }, 17000);

      effectList[7].addEventListener("ended", function () {
        app.loadPage($tpl81, app.p81Event);
      }, false);
    });
  };
  app.p7Event = function () {
    app.playEffect(6);
    $(".p7-text .close-btn").on("tap", function () {
      app.loadPage($tpl8, app.p8Event);
    });
  };
  app.p6Event = function () {
    app.playEffect(5);
    $(".p6-calc").on("webkitAnimationEnd animationend", function () {
      setTimeout(function () {
        if ($container.find(".p6").length > 0) {
          //超时后判断页面是否跳转了
          app.loadPage($tpl7, app.p7Event);
        }
      }, 4000);

      effectList[5].addEventListener("ended", function () {
        app.loadPage($tpl7, app.p7Event);
      }, false);
    });
  };
  app.p5Event = function () {
    app.playEffect(4);
    $(".p5-plate").on("webkitAnimationEnd animationend", function () {
      setTimeout(function () {
        if ($container.find(".p5").length > 0) {
          //超时后判断页面是否跳转了
          app.loadPage($tpl6, app.p6Event);
        }
      }, 23000);

      effectList[4].addEventListener("ended", function () {
        app.loadPage($tpl6, app.p6Event);
      }, false);
    });
  };
  app.p4Event = function () {
    app.playEffect(3);
    $(".p4-plate").on("webkitAnimationEnd animationend", function () {
      setTimeout(function () {
        if ($container.find(".p4").length > 0) {
          //超时后判断页面是否跳转了
          app.loadPage($tpl5, app.p5Event);
        }
      }, 4000);

      effectList[3].addEventListener("ended", function () {
        app.loadPage($tpl5, app.p5Event);
      }, false);
    });
  };
  app.p3Event = function () {
    app.playEffect(2);
    $(".p3-text .close-btn").on("tap", function () {
      app.loadPage($tpl4, app.p4Event);
    });
  };
  app.p2Event = function () {
    app.playEffect(1);
    $(".p2-women").on("tap", function () {
      app.loadPage($tpl3, app.p3Event);
    });
  };
  app.p1Event = function () {
    app.playEffect(0);
    if (effectList[0].paused) {
      effectList[0].addEventListener("WeixinJSBridgeReady", function () {
        app.playEffect(0);
      }, false);
    }
    $(".p1-plate").on("webkitAnimationEnd animationend", function () {
      setTimeout(function () {
        if ($container.find(".p1").length > 0) {
          //超时后判断页面是否跳转了
          app.loadPage($tpl2, app.p2Event);
        }
      }, 8000);

      effectList[0].addEventListener("ended", function () {
        app.loadPage($tpl2, app.p2Event);
      }, false);
    });
  };
  app.loadAssets(imgList, function () {
    $("#loading").fadeOut(function () {
      $(this).remove();
    });
    app.loadPage($tpl1, app.p1Event);
  });
});