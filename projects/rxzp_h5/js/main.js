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
var loadRES = ['img/icon/boc.png',
'img/p01_01.png','img/p01_02.png','img/p01_03.png','img/p01_04.png','img/p01_05.png','img/p01_06.png',
'img/p02_01.png','img/p02_02.png','img/p02_03.png','img/p02_04.png',
'img/p03_01.png','img/p03_02.png','img/p03_03.png','img/p03_04.png',
'img/p04_01.png','img/p04_02.png','img/p04_03.png','img/p04_04.png','img/p04_05.png',
'img/p05_01.png','img/p05_02.png','img/p05_03.png',
'img/p06_01.png','img/p06_02.png','img/p06_03.png','img/p06_04.png','img/p06_05.png','img/p06_06.png','img/p06_07.png','img/p06_08.png',
'img/p07_01.png','img/p07_02.png','img/p07_03.png',
'img/p08_01.png','img/p08_02.png','img/p08_03.png',
'img/p09_01.png','img/p09_02.png','img/p09_03.png',
'img/p10_01.png','img/p10_02.png','img/p10_03.png','img/p10_04.png','img/p10_05.png','img/p10_06.png','img/p10_07.png','img/p10_08.png','img/p10_09.png','img/p10_10.png','img/p10_11.png',
'img/p11_02.png','img/p11_03.png','img/p11_04.png','img/p11_05.png','img/p11_06.png','img/p11_07.png',
'img/p12_01.png','img/p12_02.png','img/p12_03.png',
'img/units-icons.png','img/web-swipe-tip.png'
]
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
