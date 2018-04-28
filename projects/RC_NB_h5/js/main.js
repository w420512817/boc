//console.log(new Date().getTime())
var W, H, DW, DH, S, N;
var isRunning = false; //是否开始运行了
/**
 * 页面加载完了开始实例化
 */
var App;
(function(App) {
	var config;
	(function(config) {
		window.addEventListener("resize", function() {
			if (!isRunning) {
				return;
			}
			showAll(N);
		});
		/**
		 * 页面加载完了开始实例化配置项(以json格式配置)
		 * @scaleMode 适配模式两种：showAll：保持原有比例不会变形；exactFit：铺满屏幕，有可能会变形
		 * @width 设计图比例的宽度
		 * @width 设计图比例的高度
		 * @name 最外层div的id名字("#name")或者 class的名字(".name")默认为.app
		 */
		function runApp(options) {
			if (isRunning) {
				return;
			}
			isRunning = false;
			if (!options) {
				options = {
					scaleMode: "showAll",
					width: "640",
					height: "1030",
					name: ".app"
				};
			}
			W = options.width;
			H = options.height;
			S = options.scaleMode;
			N = options.name == undefined || options.name == "" || options.name == null ? ".app" : options.name;
			showAll(N);
		}

		function showAll(name) {
			if (W / H < window.innerWidth / window.innerHeight) {
				DW = Math.floor((window.innerHeight / H) * W * 100) / 100;
				DH = Math.floor(window.innerHeight * 100) / 100;
				$(name).css({
					overflow: " hidden",
					position: "absolute",
					width: DW,
					height: DH,
					left: Math.floor((window.innerWidth - DW) / 2 * 100) / 100,
					top: "0px",
					bottom: "0px"
				});
			} else {
				DW = Math.floor(window.innerWidth * 100) / 100;
				DH = Math.floor((window.innerWidth / W) * H * 100) / 100;
				$(name).css({
					overflow: " hidden",
					position: "absolute",
					width: DW,
					height: DH,
					left: "0px",
					right: "0px",
					top: Math.floor((window.innerHeight - DH) / 2 * 100) / 100
				});
			}
			FontSize();
		}

		function FontSize() {
			$('.html').css({
				fontSize: Math.round((16 / 1030) * DH),
				lineHeight: '1em',
			})
		}
		App.runApp = runApp;
	})(config = App.config || (App.config = {}));
})(App || (App = {}));

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
			img.onload = function() {
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
			$(".loading").fadeOut(function() {
				$(this).remove();
			});
			callback();
		}
	}
}
var loadRES = ['images/icon/boc.png','images/t01.png','images/t02.png','images/t03.png','images/t04.png','images/t05.png','images/t06.png','images/t07.png','images/t08.png','images/t09.png'
,'images/t10.png','images/t11.png','images/t12.png','images/t13.png','images/t14.png','images/t15.png','images/t16.png','images/t17.png','images/t18.png','images/t19.png','images/t20.png'
,'images/t21.png','images/t22.png','images/t23.png','images/t24.png','images/t25.png','images/t26.png','images/t27.png','images/t28.png','images/t29.png','images/t30.png','images/t31.png'
,'images/t32.png','images/t33.png','images/t34.png','images/t35.png','images/t36.png','images/t37.png','images/t38.png','images/t39.png','images/t40.png','images/t41.png']
loading(loadRES, start)

function start() {
	$('.page').addClass('animated');
}

//实例化容器app
App.runApp({
	scaleMode: "showAll",
	width: "640",
	height: "1030",
	name: ".app"
});

tagP();
onresize = tagP;

function tagP() {
	//loading
//	IP('.spinner div', '', '', 30, 30, 's');
}
