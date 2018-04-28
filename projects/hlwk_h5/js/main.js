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
var loadRES = ['img/boc.png',
'img/p0_01.png','img/p0_02.png','img/p0_03.png','img/p0_04.png','img/p0_05.png','img/p0_06.png','img/p0_07.png','img/p0_08.png','img/p0_09.png','img/p0_10.png','img/p0_11.png','img/p0_12.png','img/p0_13.png','img/p0_14.png','img/p0_15.png',
'img/p1_01.png','img/p1_02.png',
'img/p2_01.png',
'img/p3_01.png','img/p3_02.png','img/p3_03.png','img/p3_04.png','img/p3_06.png',
'img/p4_01.png','img/p4_03.png','img/p4_05.png',
'img/p6_01.png','img/p6_02.png','img/p6_06.png',
'img/p7_01.png','img/p7_04.png',
'img/p8_03.jpg','img/p8_04.png','img/p8_05.png',
'img/p9_02.png','img/p9_03.png','img/p9_04.png',
'img/p10_01.png','img/p10_02.jpg','img/p10_03.jpg',
'img/p11_02.png','img/p11_03.png',
'img/p12_01.png','img/p12_02.png','img/p12_03.png',
'img/web-swipe-tip.png'
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
