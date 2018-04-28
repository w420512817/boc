var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}

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
			$(".load").remove();
			callback();
		}
	}
}

function dialogueTips(txt){
	var _html = '<div class="dialogue-tips" id="J_error">'+txt+'</div>';
	if($('.dialogue-tips').size()>0){
		$('.dialogue-tips').remove();
		clearTimeout(t);
	}
	$('body').append(_html);
	t = setTimeout(function(){
		$('#J_error').remove();
		clearTimeout(t);
	},1500);
}

// music
document.addEventListener("WeixinJSBridgeReady", function () {
	audio_player.play();
}, false);
function playClicked(){
	if(audio_player.paused) {
		audio_player.play();
		$(".music").removeClass("off").addClass("on")
	}else{
		audio_player.pause();
		$(".music").removeClass("on").addClass("off")
	}
}
playClicked();



var _productArray = ['盈透美肌黑面膜|三种植物精粹,三重水润膜力',
					'新美白嫩肤面膜|真正的美白面膜,有权威美白特证',
					'嫩肌酵素黑面膜|来自南极的天然酵素,助你抗初老',
					'鲜嫩美莓面膜|天然水果精粹,三款周期护理',
					'水润茶萃微囊黑面膜|只要一片.水润一天',
					'小金瓶精油亮颜黑面膜|橙花精油,给肌肤带来水润力量',
					'V7伪妆素颜霜|原来你素颜也这么漂亮',
					'玉润雪肌黑白膜|昼弹润,夜补水,给你不一样的呵护',
					'水漾冰川面膜|纯净冰川水,解肌肤之渴',
					'安瓶黑面膜|肌肤“急救站”,1片=1安瓶精华液',
					'水润茶萃微囊洁面乳|舒润清洁,温和不紧绷',
					'水润茶萃微囊精华液|“隐形”面膜,补水更要锁住水',
					'水润茶萃微囊眼霜|还你一双明眸媚眼',
					'水润茶萃微囊滋养乳|清润补水,补水不油腻',
					'水润茶萃滋养面霜|实力保湿,水润整天',
					'一吻定情咬唇膏|kiss一下,美唇即刻拥有',
					'亮采金桂花眼膜贴|淡化黑眼圈,补充眼周水分',
					'晶亮红石榴面膜|当“红宝石”遇见“小灯泡”,照亮你的肌肤',
					'玫瑰滋养面膜|如沐玫瑰清泉,远离干渴沙漠肌'];


function initUlList(list,$mod){
	var _listHTML = '<ul class="product-list">';
	for(var _i=0;_i<list.length;_i++){

		var _data = list[_i].split('|'),
			_index = _data[0], 								// 序号
			_number = _data[1], 							// 种草人数
			_item = _productArray[_index].split('|');
		_listHTML += '<li class="product-item clearfix">'
						+ '<div class="pro-img">'
							+ '<img src="img/pro'+(_index<10?'0'+_index:_index)+'-1.png?z=201710311404" />'
							+ '<span>TOP' + (_i+1) + '</span>'
						+ '</div>'
						+ '<div class="pro-infto">'
							+ '<p>'+_item[0]+'</p>'
							+ '<p>'+_item[1]+'</p>'
							+ '<p>'+ _number + '人种草</p>'
						+ '</div>'
						+ '<p data-id="' + _index + '" class="checkbox"><img src="img/select-checkbox.png" /></p>'
					+ '</li>'
	}
	_listHTML += '</ul>';
	$mod.html(_listHTML);
}

function initUlTable(list,$mod){
	var _topHTML = '<table width="100%" cellspacing="0" cellpadding="0" style="table-layout:fixed">'; 	// 排行榜list
	for(var _i=0;_i<list.length;_i++){

		var _data = list[_i].split('|'),
			_index = _data[0], 								// 序号
			_number = _data[1], 							// 种草人数
			_item = _productArray[_index].split('|');

		var _iconHTML = '<span>TOP'+(_i+1) + '</span>';
		if(_i < 3){
			_iconHTML = '<span><img src="img/ranking-icon0' + (_i+1) + '.png" /></span>'+_iconHTML;
		}

		_topHTML += '<tr class="td-top' + (_i+1) + '">'
						+ '<td class="td-top" width="13%">' + _iconHTML + '</td>'
						+ '<td class="td-img" width="23%">'
							+ '<img src="img/pro'+(_index<10?'0'+_index:_index)+'-1.png" />'
						+ '</td>'
						+ '<td class="td-infto">'
							+ '<p>'+_item[0]+'</p>'
							+ '<p>'+_item[1]+'</p>'
							+ '<p>'+ _number + '人种草</p>'
						+ '</td>'
					+ '</tr>';
	}
	_topHTML += '</table>';
	$mod.html(_topHTML);
}

