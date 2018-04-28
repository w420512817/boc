
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
			$(".load").remove();
			callback();
		}
	}
}

function dialogueTips(txt) {
	var _html = '<div class="dialogue-tips" id="J_error">' + txt + '</div>';
	if ($('.dialogue-tips').size() > 0) {
		$('.dialogue-tips').remove();
		clearTimeout(t);
	}
	$('body').append(_html);
	t = setTimeout(function () {
		$('#J_error').remove();
		clearTimeout(t);
	}, 1500);
}

var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}

// document.addEventListener("WeixinJSBridgeReady", function () {
// 	audio_player.play();
// }, false);

function playClicked() {
	if (audio_player.paused) {
		audio_player.play();
		$(".music").removeClass("off").addClass("on")
	} else {
		audio_player.pause();
		$(".music").removeClass("on").addClass("off")
	}
}
// playClicked();

function loadPage(next) {
	scrollTo(0,0);
    $('#'+next).removeClass("hide").addClass("animate").siblings('.pagel').addClass('hide').removeClass('animate');
 //    if(next=='welcome'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('welcome2');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

// 点击放大
$('#hangzhou a').on('click',function(){
	wx.previewImage({
		current: $('.big img').attr('src'),
		urls: [$('.big img').attr('src')]
		// urls: ['img/bg53.jpg']
		// urls: ['img/p1_2.png']
	});
})

//链接
$('#welcome .page-btn1').on('click',function(){window.location.href= "aboutrc.html"});
$('#welcome .page-btn2').on('click',function(){window.location.href= "southeast.html"});
// 目录
$('#home .icon3,#home .btn1').on('click',function(){window.location.href= "01hz.html"});
$('#home .icon1,#home .btn2').on('click',function(){window.location.href= "02hf.html"});
$('#home .icon6,#home .btn3').on('click',function(){window.location.href= "03nb.html"});
$('#home .icon13,#home .btn4').on('click',function(){window.location.href= "04xm.html"});
$('#home .icon5,#home .btn5').on('click',function(){window.location.href= "05sx.html"});
$('#home .icon2,#home .btn6').on('click',function(){window.location.href= "06hz.html"});
$('#home .icon7,#home .btn7').on('click',function(){window.location.href= "07zs.html"});
$('#home .icon4,#home .btn8').on('click',function(){window.location.href= "08jx.html"});
$('#home .icon9,#home .btn9').on('click',function(){window.location.href= "09tz.html"});
$('#home .icon11,#home .btn10').on('click',function(){window.location.href= "10pt.html"});
$('#home .icon12,#home .btn11').on('click',function(){window.location.href= "11qz.html"});
$('#home .icon8,#home .btn12').on('click',function(){window.location.href= "12jh.html"});

// 杭州
$('#hangzhou .btn1').on('click',function(){loadPage('hz_lanshan')});
$('#hz_lanshan')
.on('click','.page-call',function(){window.location.href="tel:0571-58981111"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.079498,119.958874&title=融创富春壹号院&content=浙江省杭州市富阳区大桥北路238号&output=html"})

$('#hangzhou .btn2').on('click',function(){loadPage('hz_shijintai')});
$('#hz_shijintai')
.on('click','.page-call',function(){window.location.href="tel:0571-61116999"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.249679,119.722613&title=融创金成十锦台&content=杭州市临安区锦北街道马溪路与竹林街交叉口&output=html"})

$('#hangzhou .btn3').on('click',function(){loadPage('hz_xishanyuanshu')});
$('#hz_xishanyuanshu')
.on('click','.page-call',function(){window.location.href="tel:0571-85858800"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.249808,119.989362&title=溪山院墅&content=杭州市余杭区闲林街道闲富北路&output=html"})

$('#hangzhou .btn4').on('click',function(){loadPage('hz_jiangnanfu')});
$('#hz_jiangnanfu')
.on('click','.page-call',function(){window.location.href="tel:0571-85858899"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.249245,119.973588&title=融创金成江南府&content=余杭天目山西路与上和路交叉口南&output=html"})

$('#hangzhou .btn5').on('click',function(){loadPage('hz_weilaihai')});
$('#hz_weilaihai')
.on('click','.page-call',function(){window.location.href="tel:0571-88690999"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.251667,119.992365&title=融创金成未来海&content=杭州市余杭区闲富北路与上和路交叉口南250米路东&output=html"})

$('#hangzhou .btn6').on('click',function(){loadPage('hz_xijiantang')});
$('#hz_xijiantang')
.on('click','.page-call',function(){window.location.href="tel:0571-87671000"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.256807,120.039658&title=融创溪涧堂&content=浙江省杭州市余杭区宋家湾路与丰岭路交汇处&output=html"})

$('#hangzhou .btn7').on('click',function(){loadPage('hz_yiheyuan')});
$('#hz_yiheyuan')
.on('click','.page-call',function(){window.location.href="tel:0571-86009191"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.310975,120.129017&title=融创宜和园&content=杭州市拱墅区登云路505号&output=html"})

$('#hangzhou .btn8').on('click',function(){loadPage('hz_jiuzhangtai')});
$('#hz_jiuzhangtai')
.on('click','.page-call',function(){window.location.href="tel:0571-86009191"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.316002,120.218278&title=玖樟台&content=杭州市江干区双凉环路及南都路口西侧&output=html"})

$('#hangzhou .btn9').on('click',function(){loadPage('hz_yongqingfu')});
$('#hz_yongqingfu')
.on('click','.page-call',function(){window.location.href="tel:0571-86009191"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.282172,120.224511&title=融创涌清府&content=浙江省杭州市江干区运河东路与严家弄路交叉口西南侧&output=html"})

$('#hangzhou .btn10').on('click',function(){loadPage('hz_xindazhongxin')});
$('#hz_xindazhongxin')
.on('click','.page-call',function(){window.location.href="tel:0571-87608888"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.234233,120.230894&title=信达中心杭州壹号院&content=浙江省杭州市滨江区科技馆街与飞虹路交叉口&output=html"})

$('#hangzhou .btn11').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.237426,120.251346&title=旭辉奥体都会山&content=书音路与奔竞大道交叉口东150米&output=html"});

$('#hangzhou .btn12').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.236928,120.253315&title=融创时代奥城&content=浙江省杭州市萧山区宁围街道利一金鸡路杭州奥体博览城&output=html"});

$('#hangzhou .btn13').on('click',function(){loadPage('hz_houchaofu')});
$('#hz_houchaofu')
.on('click','.page-call',function(){window.location.href="tel:0571-86009191"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.230025,120.191853&title=融创大家钱江候潮府&content=浙江省杭州市上城区侯潮府&output=html"})

$('#hangzhou .btn14').on('click',function(){loadPage('hz_wanghaichao')});
$('#hz_wanghaichao')
.on('click','.page-call',function(){window.location.href="tel:0571-28000077"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.199726,120.285497&title=融创望海潮&content=浙江省杭州市萧山区宁税路888号附近&output=html"})

$('#hangzhou .btn15').on('click',function(){loadPage('hz_yinshidai')});
$('#hz_yinshidai')
.on('click','.page-call',function(){window.location.href="tel:0571-82825858"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.202323,120.339743&title=融创印时代&content=浙江省杭州市萧山区建设四路与枫香路交叉口&output=html"})

$('#hangzhou .btn16').on('click',function(){loadPage('hz_weifengzhicheng')});
$('#hz_weifengzhicheng')
.on('click','.page-call',function(){window.location.href="tel:0571-61797888"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.086467,120.048949&title=融创微风之城&content=东桥路169号&output=html"})

$('#hangzhou .btn17').on('click',function(){loadPage('hz_donglinfu')});
$('#hz_donglinfu')
.on('click','.page-call',function(){window.location.href="tel:0571-28876699"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.197217,120.466075&title=融创东麟府售楼处&content=杭州市萧山区政通路200&output=html"})

$('#hangzhou .btn18').on('click',function(){loadPage('hz_yingtexuefu')});
$('#hz_yingtexuefu')
.on('click','.page-call',function(){window.location.href="tel:0571-85858558"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.252628,119.961122&title=融创金成英特学府&content=天目山西路与城东路交叉口西南角&output=html"})

$('#hangzhou .btn19').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.304376,120.06952&title=融创河滨之城&content=浙江省杭州市西湖区余杭塘路与五常港路交汇处&output=html"});

$('#hangzhou .btn20').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.27635,120.048295&title=绿城西溪融庄&content=荆长大道30号(文二西路口南侧)&output=html"});

$('#hangzhou .btn21').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.250187,119.988082&title=西溪.海&content=浙江省杭州市余杭区天目山西路闲林以西&output=html"});

$('#hangzhou .btn22').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.234661,120.195695&title=望江府&content=杭州市杭州市钱江路389号&output=html"});

$('#hangzhou .btn23').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.217368,120.21187&title=杭州印&content=浙江省杭州市滨江区泰安路杭州印&output=html"});

$('#hangzhou .btn24').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.194195,120.15378&title=世茂之西湖&content=浙江省杭州市滨江区江南大道与西环路交叉口&output=html"});

$('#hangzhou .btn25').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.203569,120.338813&title=融创东南海&content=浙江省杭州市萧山区建设四路&output=html"});

$('#hangzhou .btn26').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.14839,120.071303&title=融创瑷骊山&content=望江山路1号&output=html"});

$('#hangzhou .btn27').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.079498,119.958874&title=融创富春壹号院&content=浙江省杭州市富阳区大桥北路238号&output=html"});

$('#hangzhou .btn28').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.087124,120.050401&title=莱蒙水榭山&content=东洲街道东桥路169号&output=html"});

$('#hangzhou .btn29').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=30.346491,120.123738&title=融创瑷颐湾&content=浙江省杭州市拱墅区杭行路&output=html"});

$('#hangzhou').siblings().find('.page-back').on('click',function(){loadPage('hangzhou')});

// 合肥
$('#hefei .btn1').on('click',function(){loadPage('hf_yihaoyuan')});
$('#hf_yihaoyuan')
.on('click','.page-call',function(){window.location.href="tel:0551-65858666"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=31.820661,117.243318&title=融创合肥壹号院&content=天鹅湖路与齐云山路交汇处东南角&output=html"})

$('#hefei .btn2').on('click',function(){loadPage('hf_zhengwu')});
$('#hf_zhengwu')
.on('click','.page-call',function(){window.location.href="tel:0551-65195555"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=31.824669,117.256409&title=融创信达政务壹号&content=安徽省合肥市蜀山区南二环路辅路&output=html"})

$('#hefei .btn3').on('click',function(){loadPage('hf_jiuzhangtai')});
$('#hf_jiuzhangtai')
.on('click','.page-call',function(){window.location.href="tel:0551-68996999"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=31.803141,117.189711&title=融创.玖樟台&content=安徽省合肥市肥西县铭传路与香樟大道交叉口东北角&output=html"})

$('#hefei .btn4').on('click',function(){loadPage('hf_rongchuang')});
$('#hf_rongchuang')
.on('click','.page-call',function(){window.location.href="tel:0551-63536999"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=31.79971,117.216603&title=融创城&content=安徽省合肥市蜀山区笔峰路332号&output=html"})

$('#hefei .btn5').on('click',function(){loadPage('hf_wanda')});
$('#hf_wanda')
.on('click','.page-call',function(){window.location.href="tel:0551-65368888"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=31.710835,117.316055&title=合肥万达城&content=安徽省合肥市包河区包河大道与环湖大道交口西北角&output=html"})

$('#hefei .btn6').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=31.964762,117.275505&title=融科梧桐里&content=安徽省合肥市长丰县阜阳路与金宁路交汇处&output=html"});

$('#hefei .btn7').on('click',function(){window.location.href="http://api.map.baidu.com/marker?location=31.807853,117.21735&title=融科·九重锦吉庆街&content=政务区习友路与茂荫路交汇处西南角&output=html"});

$('#hefei').siblings().find('.page-back').on('click',function(){loadPage('hefei')});

// 宁波
$('#ningbo .btn1').on('click',function(){loadPage('nb_yishu')});
$('#nb_yishu')
.on('click','.page-call',function(){window.location.href="tel:0574-87965555"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=29.88536,121.607627&title=宁波融创逸树&content=沧海路和通途路交叉口&output=html"})

$('#ningbo .btn2').on('click',function(){loadPage('nb_ningbofu')});
$('#nb_ningbofu')
.on('click','.page-call',function(){window.location.href="tel:0574-87552888"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=29.876563,121.629478&title=融创信达宁波府&content=浙江省宁波市鄞州区东部新城启新路与会展路交界处&output=html"})

$('#ningbo .btn3').on('click',function(){loadPage('nb_yuewan')});
$('#nb_yuewan')
.on('click','.page-call',function(){window.location.href="tel:0574-87186888"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=29.900463,121.64051&title=融创东投悦湾&content=浙江省宁波市鄞州区聚贤路与甬江大道交界处&output=html"})

$('#ningbo .btn4').on('click',function(){loadPage('nb_yongningfu')});
$('#nb_yongningfu')
.on('click','.page-call',function(){window.location.href="tel:0574-87857888"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=29.819496,121.592437&title=宁波融创涌宁府&content=鄞县大道166号附近&output=html"})

$('#ningbo').siblings().find('.page-back').on('click',function(){loadPage('ningbo')});
// 厦门
$('#xiamen .btn1').on('click',function(){loadPage('xm_dongnanfu')});
$('#xm_dongnanfu')
.on('click','.page-call',function(){window.location.href="tel:0592-8280999"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=24.568042,118.257427&title=融创东南府&content=厦门市翔安区南部新城洪钟大道与翔安西路交界处西北侧&output=html"})

$('#xiamen .btn2').on('click',function(){loadPage('xm_datongfu')});
$('#xm_datongfu')
.on('click','.page-call',function(){window.location.href="tel:0592-5770999"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=24.714914,118.153401&title=融创大同府&content=厦门市同安区同集北路1080号&output=html"})

$('#xiamen').siblings().find('.page-back').on('click',function(){loadPage('xiamen')});
// 绍兴
$('#shaoxing .btn1').on('click',function(){loadPage('sx_yuezhoufu')});
$('#sx_yuezhoufu')
.on('click','.page-call',function(){window.location.href="tel:0575-81506666"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=29.98139,120.59744&title=融创越州府&content=浙江省绍兴市越城区京都花园北门公交站旁边&output=html"})

$('#shaoxing').siblings().find('.page-back').on('click',function(){loadPage('shaoxing')});
// 湖州
$('#huzhou .btn1').on('click',function(){loadPage('hz_huzhoufu')});
$('#hz_huzhoufu')
.on('click','.page-call',function(){window.location.href="tel:0572-2929777"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.868216,120.099274&title=湖州府&content=湖州市吴兴区环城西路345号&output=html"})

$('#huzhou .btn2').on('click',function(){loadPage('hz_moganxigu')});
$('#hz_moganxigu')
.on('click','.page-call',function(){window.location.href="tel:0572-8088828"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.580028,119.989849&title=融创莫干溪谷&content=湖州市德清县&output=html"})

$('#huzhou .btn3').on('click',function(){loadPage('hz_taihuyin')});
$('#hz_taihuyin')
.on('click','.page-call',function(){window.location.href="tel:0572-2969888"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.949403,120.122824&title=太湖印展示中心&content=浙江省湖州市吴兴区太湖旅游度假区浮霞路698号&output=html"})

$('#huzhou .btn4').on('click',function(){loadPage('hz_xishanchenyuan')});
$('#hz_xishanchenyuan')
.on('click','.page-call',function(){window.location.href="tel:0572-2991888"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.863803,120.16781&title=融创西山宸院&content=浙江省湖州市吴兴区吴兴大道与乌山路交叉口&output=html"})

$('#huzhou').siblings().find('.page-back').on('click',function(){loadPage('huzhou')});
// 舟山
$('#zhoushan .btn1').on('click',function(){loadPage('zs_shanhaidaguan')});
$('#zs_shanhaidaguan')
.on('click','.page-call',function(){window.location.href="tel:0580-6888999"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=29.991086,122.34044&title=山海大观&content=普陀区东港街道海珠路普陀小学东侧300米&output=html"})

$('#zhoushan').siblings().find('.page-back').on('click',function(){loadPage('zhoushan')});
// 嘉兴
$('#jiaxing .btn1').on('click',function(){loadPage('jx_jiangnanyue')});
$('#jx_jiangnanyue')
.on('click','.page-call',function(){window.location.href="tel:021-57361000"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.836214,121.089069&title=融创江南悦&content=新埭镇虹桥路与平兴公路交汇处&output=html"})

$('#jiaxing .btn2').on('click',function(){loadPage('jx_haiyuefu')});
$('#jx_haiyuefu')
.on('click','.page-call',function(){window.location.href="tel:0573-85858523"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=30.727943,121.017243&title=融创海越府&content=嘉兴市平湖市经开区新兴二路与平成路交汇处东北角&output=html"})

$('#jiaxing').siblings().find('.page-back').on('click',function(){loadPage('jiaxing')});
// 台州
$('#taizhou .btn1').on('click',function(){loadPage('tz_xishanchenyuan')});
$('#tz_xishanchenyuan')
.on('click','.page-call',function(){window.location.href="tel:0576-80299898"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=28.575505,121.346932&title=融创溪山宸院&content=灵山西街488号&output=html"})

$('#taizhou').siblings().find('.page-back').on('click',function(){loadPage('taizhou')});
// 莆田	
$('#putian .btn1').on('click',function(){loadPage('pt_lanxidaguan')});
$('#pt_lanxidaguan')
.on('click','.page-call',function(){window.location.href="tel:0594-2129666"})
.on('click','.page-link',function(){window.location.href="http://api.map.baidu.com/marker?location=25.41726,119.019083&title=融创兰溪大观&content=天坂街&output=html"})

$('#putian').siblings().find('.page-back').on('click',function(){loadPage('putian')});











// 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 关闭
// $('.share-box').on('click',function(){$('.share-box').addClass('hide')});
// 提交
// $('#form-submit').on('click', function () {
// 	var _check = true;
// 	if ($('#info-phone').val() == '') {
// 		dialogueTips('请输入电话……');
// 		_check = false;
// 	}
// 	if ($('#info-name').val() == '') {
// 		dialogueTips('请输入姓名……');
// 		_check = false;
// 	}

// 	if (_check) {
// 		loadPage('welcome2');
// 	}
// });



