'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {
  var AppBase = function () {
    function AppBase() {
      _classCallCheck(this, AppBase);

      this.telReg = /^0{0,1}(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])[0-9]{8}$/;
      this.logo();
      this.screenFit();
    }

    _createClass(AppBase, [{
      key: 'preloadImg',
      value: function preloadImg(args) {
        if (args.imgList && args.imgList instanceof Array) {
          var count = 0;
          var total = args.imgList.length;
          var loadedList = [];
          var update = function update() {
            count++;
            args.progress && args.progress((count * 100 / total).toFixed());
            count === total && args.complete && args.complete(loadedList);
          };
          args.imgList.forEach(function (item, index) {
            loadedList[index] = new Image();
            loadedList[index].src = item;
            loadedList[index].onload = update;
            loadedList[index].onerror = update;
          });
        } else {
          window.console && console.warn && console.warn('请传入正确的参数! ->Object');
        }
      }
    }, {
      key: 'music',
      value: function music(opts) {
        if (opts && opts instanceof Object && opts.url) {
          var musicNode = document.createElement('div');
          var audioNode = document.createElement('audio');
          musicNode.className = opts.autoplay ? 'music' : 'music mute';
          audioNode.setAttribute('src', opts.url);
          opts.autoplay && !this.wechat() && audioNode.setAttribute('autoplay', 'autoplay');
          opts.loop && audioNode.setAttribute('loop', 'loop');
          audioNode.setAttribute('preload', 'auto');
          musicNode.appendChild(audioNode);
          document.body.appendChild(musicNode);
          if (opts.autoplay && this.wechat()) {
            document.addEventListener("WeixinJSBridgeReady", function () {
              audioNode.play();
              musicNode.classList.remove('mute');
            }, false);
          }
          var handleEvent = function handleEvent() {
            if (audioNode.paused) {
              audioNode.play();
              musicNode.classList.remove('mute');
            } else {
              audioNode.pause();
              musicNode.classList.add('mute');
            }
          };
          musicNode.addEventListener('ontouchstart' in window && !this.chromeDesktop() ? "touchend" : "click", handleEvent, false);
        } else {
          window.console && console.warn && console.warn('请传入正确的参数! ->Object');
        }
      }
    }, {
      key: 'screenFit',
      value: function screenFit() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var body = document.querySelector('body');
        if (windowWidth > 640) {
          body.style.height = windowHeight + 'px';
          body.style.width = windowHeight * 320 / 504 + 'px';
        } else {
          body.style.height = windowHeight + 'px';
        }
      }
    }, {
      key: 'dialog',
      value: function dialog(args) {
        if (args && args instanceof Object) {
          var message = args.message || '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内';
          var osType = this.os();
          var dialogNode = document.createElement('div');
          dialogNode.className = 'dialog';
          if (args.title) {
            dialogNode.className = 'dialog confirm ' + osType;
            dialogNode.innerHTML = '<div class="dialog-body"><div class="dialog-title">' + args.title + '</div><div class="dialog-message">' + message + '</div><div class="dialog-btn-bar "><button class="dialog-default-btn" type="button">取消</button><button class="dialog-primary-btn" type="button">确定</button></div></div>';
          } else {
            dialogNode.className = 'dialog alert ' + osType;
            dialogNode.innerHTML = '<div class="dialog-body"><div class="dialog-message">' + message + '</div><div class="dialog-btn-bar "><button class="dialog-primary-btn" type="button">确定</button></div></div>';
          }
          document.body.appendChild(dialogNode);
          var dialog = document.querySelector(".dialog");
          var defaultBtn = document.querySelector(".dialog-default-btn");
          var primaryBtn = document.querySelector(".dialog-primary-btn");
          defaultBtn && defaultBtn.addEventListener('ontouchstart' in window && !this.chromeDesktop() ? "touchend" : "click", function (e) {
            e.stopPropagation();
            e.preventDefault();
            document.body.removeChild(dialog);
            args.cancel && args.cancel();
          }, false);
          primaryBtn && primaryBtn.addEventListener('ontouchstart' in window && !this.chromeDesktop() ? "touchend" : "click", function (e) {
            e.stopPropagation();
            e.preventDefault();
            document.body.removeChild(dialog);
            args.ok && args.ok();
          }, false);
        } else {
          window.console && console.warn && console.warn('请传入正确的参数! ->Object');
        }
      }
    }, {
      key: 'wechat',
      value: function wechat() {
        return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
      }
    }, {
      key: 'chromeDesktop',
      value: function chromeDesktop() {
        var agent = navigator.userAgent.toLowerCase();
        var isChromeDesktop = agent.indexOf('chrome') > -1 && (agent.indexOf('windows') > -1 || agent.indexOf('macintosh') > -1 || agent.indexOf('linux') > -1) && agent.indexOf('mobile') < 0 && agent.indexOf('android') < 0;
        return isChromeDesktop;
      }
    }, {
      key: 'os',
      value: function os() {
        return (/Android/gi.test(navigator.userAgent) ? 'android' : 'ios'
        );
      }
    }, {
      key: 'logo',
      value: function logo() {
        var logo = ' ___  ___   _____      _____ ___ \n' + '| _ )/ _ \\ / __\\ \\    / / __| _ ) \n' + '| _ \\ (_) | (__ \\ \\/\\/ /| _|| _ \\ \n' + '|___/\\___/ \\___| \\_/\\_/ |___|___/ \n\n';
        window.console && console.info && console.info(logo, '来自博采网络：http://www.bocweb.cn/', '(ver: 0.1)');
      }
    }]);

    return AppBase;
  }();

  window.AppBase || (window.AppBase = AppBase);
})();

$(function () {
  var app = new AppBase();
  var $p1 = $('.p1');
  var $p2 = $('.p2');
  var $p3 = $('.p3');

  var imgList = ["images/bg-cover.png", "images/bg.jpg", "images/blur.png", "images/keys1-1.png", "images/keys1-2.png", "images/keys1-3.png", "images/keys1-4.png", "images/keys2-1.png", "images/keys2-2.png", "images/keys2-3.png", "images/keys2-4.png", "images/keys3-1.png", "images/keys3-2.png", "images/keys3-3.png", "images/keys3-4.png", "images/keys4-1.png", "images/keys4-2.png", "images/keys4-3.png", "images/keys4-4.png", "images/keys5-1.png", "images/keys5-2.png", "images/keys5-3.png", "images/keys5-4.png", "images/keys6-1.png", "images/keys6-2.png", "images/keys6-3.png", "images/keys6-4.png", "images/loading.gif", "images/logo.png", "images/p1-border-empty.jpg", "images/p1-btn.png", "images/p1-t1.png", "images/p1-t2-1.png", "images/p1-t2-2.png", "images/p1-t2-3.png", "images/p1-t3.png", "images/p3-btn-1.png", "images/p3-btn-2.png", "images/r1.png", "images/r2.png", "images/r3.png", "images/r4.png", "images/share-line.png", "images/subject-1.png", "images/subject-2.png", "images/subject-3.png", "images/subject-4.png", "images/subject-5.png", "images/subject-6.png"];

  var $subject = $('.subject img');
  var $keys = $('.keys-list .key');

  var $resultText = $('.result-text img');

  var $share = $('.share');

  app.index = 1;
  app.total = 0;
  app.scoreData = [{
    serial: 1,
    list: [100, 80, 20, 50]
  }, {
    serial: 2,
    list: [90, 50, 80, 100]
  }, {
    serial: 3,
    list: [60, 100, 20, 80]
  }, {
    serial: 4,
    list: [80, 10, 60, 100]
  }, {
    serial: 5,
    list: [30, 80, 50, 100]
  }, {
    serial: 6,
    list: [80, 10, 50, 100]
  }];

  app.cutTo = function (page, cb) {
    page.removeClass('hide').addClass('enter').siblings('.page').removeClass('enter').addClass('hide');
    cb && cb();
  };

  app.showMask = function (mask, cb) {
    mask.removeClass('hide').addClass('enter');
    cb && cb();
  };

  app.hideMask = function (mask, cb) {
    mask.removeClass('enter').addClass('hide');
    cb && cb();
  };

  app.reset = function () {
    app.index = 1;
    app.total = 0;
    app.cutTo($p1);
    $('.bg-border,.p1').addClass('enter');
  };
  app.topic = function (index) {
    [1, 2, 3, 5].indexOf(index) != -1 ? $('.keys-list').addClass('s1') : $('.keys-list').removeClass('s1');
    $subject.attr('src', 'images/subject-' + index + '.png');
    $keys.each(function (idx, el) {
      $(this).find('img').attr('src', 'images/keys' + index + '-' + (idx + 1) + '.png');
    });
  };

  $('.p1-btn').on('tap', function () {
    app.topic(app.index);
    $('.bg-border,.p1').removeClass('enter');
    app.cutTo($p2);
    return false;
  });

  $keys.on('tap', function () {
    if (app.index < 6) {
      var thisIndex = $(this).index();
      app.total += app.scoreData[app.index - 1].list[thisIndex];
      app.index++;
      $p2.removeClass('enter').addClass('leave').on('webkitAnimationEnd animationend', function () {
        $p2.removeClass('leave').addClass('enter');
        app.topic(app.index);
      });
    } else {
      if (app.total >= 500 && app.total < 600) {
        $resultText.attr('src', 'images/r4.png');
      } else if (app.total >= 400 && app.total < 499) {
        $resultText.attr('src', 'images/r1.png');
      } else if (app.total >= 300 && app.total < 399) {
        $resultText.attr('src', 'images/r2.png');
      } else if (app.total < 299) {
        $resultText.attr('src', 'images/r3.png');
      }
      app.cutTo($p3);
    }
    return false;
  });

  $('.p3 .btn-bar>div').on('tap', function () {
    if ($(this).hasClass('p3-btn-1')) {
      app.reset();
    } else if ($(this).hasClass('p3-btn-2')) {
      app.showMask($share);
    }
    return false;
  });

  $share.on('click', function () {
    app.hideMask($share);
    return false;
  });

  app.preloadImg({
    imgList: imgList,
    complete: function complete() {
      app.music({
        autoplay : true,
        loop     : true,
        url      : 'media/bg.mp3'
      });
      $('.bg-border,.p1').addClass('enter');
      $('.loading').fadeOut('fast', function () {
        $(this).remove();
      });
    }
  });
});