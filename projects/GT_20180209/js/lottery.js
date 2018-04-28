/**
 * 注意：本插件运用了rem屏幕适配方案，一律采用rem作为单位，若项目中不是采用这种方案的，main.css中修改样式，此段代码不会影响功能使用，仅会影响控件样式
 */

(function (win, doc, $) {
    var defaultOpt = {
        rotateNum: 5, //转盘转动圈数
        body: "", //大转盘整体的选择符或zepto对象
        btn: '',
        disabledHandler: function () {
            //禁止抽奖时回调
        },
        clickCallback: function () {
            //点击抽奖按钮,再次回调中实现访问后台获取抽奖结果,拿到抽奖结果后显示抽奖画面
        },
        LotteryjsHandler: function (deg) {
            //抽奖结束回调
        }
    };

    function Lotteryjs(opts) {
        this.opts = $.extend(true, {}, defaultOpt, opts);
        this.doing = false;
        this.init();
    }

    Lotteryjs.prototype.setOpts = function (opts) {
        this.opts = $.extend(true, {}, defaultOpt, opts);
        this.init();
    };
    Lotteryjs.prototype.init = function () {
        var self = this;
        //转盘需要转动的角度
        this.defNum = this.opts.rotateNum * 360;
        //点击抽奖
        $('.inner').on('click', function () {
            if ($(this).hasClass('start') && !self.doing) {
                self.opts.clickCallback.call(self);
            } else {
                var key = $(this).hasClass('no-start') ? "noStart" : $(this).hasClass('completed') ? "completed" : "illegal";
                self.opts.disabledHandler(key);
            }
        });

        $(this.opts.outer).get(0).addEventListener('webkitTransitionEnd', function () {

            self.doing = false;

            var deg = $(self.opts.body).attr('data-deg');

            if (self.opts.direction == 0) {
                $(self.opts.body).attr('data-deg', 360 - deg);
                $(self.opts.outer).css({
                    '-webkit-transition': 'none',
                    'transition': 'none',
                    '-webkit-transform': 'rotate(' + (deg) + 'deg)',
                    'transform': 'rotate(' + (deg) + 'deg)'
                });
                self.opts.LotteryjsHandler(360 - deg);
            } else {
                $(self.opts.body).attr('data-deg', deg);
                $(self.opts.outer).css({
                    '-webkit-transition': 'none',
                    'transition': 'none',
                    '-webkit-transform': 'rotate(' + (-deg) + 'deg)',
                    'transform': 'rotate(' + (-deg) + 'deg)'
                });
                self.opts.LotteryjsHandler(deg);
            }


        });


    };
    Lotteryjs.prototype.goLotteryjs = function (_deg) {

        if (this.doing) {
            return;
        }
        var deg = _deg + this.defNum;
        var realDeg = this.opts.direction == 0 ? deg : -deg;
        this.doing = true;
        $(this.opts.body).find(this.opts.btn).addClass('doing');
        $(this.opts.body).find(this.opts.outer).css({
            '-webkit-transition': 'all 5s',
            'transition': 'all 5s',
            '-webkit-transform': 'rotate(' + (realDeg) + 'deg)',
            'transform': 'rotate(' + (realDeg) + 'deg)'
        });
        $(this.opts.body).attr('data-deg', _deg);

    };
    win.Lotteryjs = Lotteryjs;

})(window, document, $);