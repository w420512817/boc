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

document.addEventListener("WeixinJSBridgeReady", function () {
	audio_player.play();
}, false);

function playClicked() {
	if (audio_player.paused) {
		audio_player.play();
		$(".music").removeClass("off").addClass("on")
	} else {
		audio_player.pause();
		$(".music").removeClass("on").addClass("off")
	}
}
playClicked();
// 录音切换
// var mySwiper = new Swiper('.swiper-container', {
// speed:
// nextButton: '#page-items-box .box-right',
// prevButton: '#page-items-box .box-left',
// onSlideChange: function (swiper) {
// if (swiper.isEnd) {
// 	$('#page-items-box .box-right').hide();
// } else {
// 	$('#page-items-box .box-right').show();
// }
// if (swiper.isBeginning) {
// 	$('#page-items-box .box-left').hide();
// } else {
// 	$('#page-items-box .box-left').show();
// }
// },
// autoplay: 5000,//可选选项，自动滑动
// onInit: function (swiper) {
// $('#page-items-box').addClass('hide');
// }
// })
// 录音
// 音乐
var audio_con = [];
['media/record1.m4a', 	
 'media/record2.m4a', 	
 'media/record3.m4a', 	
].forEach(function(v,i){
	var mUsic = new Audio(v);
	mUsic.loop=true;
	audio_con.push(mUsic);
	mUsic=null;
});
document.addEventListener("WeixinJSBridgeReady", function () {
	audio_con.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
}, false);

//~播放指定音乐
function aUdio(cur_audio){
	audio_con.forEach(function(item,_index) {
		item.pause();
	});
	audio_con[cur_audio].currentTime = 0;
	audio_con[cur_audio].play();
}
//~停止所有音乐
function stopAudio_con(){
	audio_con.forEach(function(item,_index) {
		item.pause();
	});
}


function loadPage(next) {
	$('#' + next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
	if (next == 'welcome') {
		$('.resize').removeClass('hide');
	}
	else{
		$('.resize').addClass('hide');
	}
	if(next=='record1'){stopAudio_con();aUdio(0);$('.resize').removeClass('hide');}
	if(next=='record2'){stopAudio_con();aUdio(1);$('.resize').removeClass('hide');}
	if(next=='record3'){stopAudio_con();aUdio(2);$('.resize').removeClass('hide');}
	if(next=='letter'){stopAudio_con();}
	if(next=='move'){
		var t2 = setTimeout(function () {
			loadPage('share')
			clearTimeout(t2);
		}, 5000);
	}
	if(next=='move2'){
		var t3 = setTimeout(function () {
			loadPage('open')
			clearTimeout(t3);
		}, 3000);
	}
	if(next=='open'){
		var t4=setTimeout(function() {
			$('#open .page-img2').css('animation','fadeOutDown 1s ease both');
			clearTimeout(t4);
		}, 2000);
	}

}

// 链接
// page1
$('#welcome').on('swipeup', function (e) {
	loadPage('record1');
}).on('click', function (e) {
	loadPage('record1');
});
$('#record1 .page-tape').on('swipeup', function (e) {
	loadPage('letter');
}).on('click', function (e) {
	loadPage('letter');
});
$('#record2 .page-tape').on('swipeup', function (e) {
	loadPage('letter');
}).on('click', function (e) {
	loadPage('letter');
});
$('#record3 .page-tape').on('swipeup', function (e) {
	loadPage('letter');
}).on('click', function (e) {
	loadPage('letter');
});

// page2-4
$('.record-btn1').on('click', function () {
	stopAudio_con();
	$('.record-btn2').removeClass('btn-on');
	$('.record-btn3').removeClass('btn-on');
	$('.record-btn4').removeClass('btn-on');
});
$('.record-btn2').on('click', function () {
	$('.record-btn2').addClass('btn-on');
	$('.record-btn3').removeClass('btn-on');
	$('.record-btn4').removeClass('btn-on');
	loadPage('record1');
});
$('.record-btn3').on('click', function () {
	$('.record-btn2').removeClass('btn-on');
	$('.record-btn3').addClass('btn-on');
	$('.record-btn4').removeClass('btn-on');
	loadPage('record2');
});
$('.record-btn4').on('click', function () {
	$('.record-btn2').removeClass('btn-on');
	$('.record-btn3').removeClass('btn-on');
	$('.record-btn4').addClass('btn-on');
	loadPage('record3')
	// audio_record3.play();
});
// page5
$('#letter').on('swipedown', function (e) {
	loadPage('record1');
});
// 伪placeholder
$('#info-name').on('click',function(){
	if($(this).text()=='(输入名字)'){
		$(this).text('');
		$('#info-name').focus();
	}
}).on('blur',function(){
	if($(this).text()==''){$(this).text('(输入名字)');}
});
$('#info-text').on('click',function(){
	if($(this).text()=='你想对TA说：'){
		$(this).text('');
		$('#info-text').focus();
	}
}).on('blur',function(){
	if($(this).text()==''){$(this).text('你想对TA说：');}
});
// page8
$('#welcome2 .page-btn').on('click',function(){loadPage('move2')});

// page10
$('#open .page-btn1').on('click',function(){$('.share-box').fadeIn();});
$('#open .page-btn2').on('click',function(){window.location.href="index.html";});
// 分享
	$('.share-box').on('click',function(){$('.share-box').fadeOut();})
// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-text').text() == ''||$('#info-text').text() == '你想对TA说：') {
		dialogueTips('请输入内容……');
		_check = false;
	}
	if ($('#info-name').text() == ''||$('#info-name').text() == '(输入名字)') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		$('#letter .page-btn').addClass('hide');
		var t1 = setTimeout(function () {
			html2canvas($("#letter")[0], {
				onrendered: function (canvas) {
					loadPage('move');
					$("#move .page-img1 img").attr('src', canvas.toDataURL("image/jpeg"));
				}
			});
			clearTimeout(t1);
		}, 500);
		// $('#letter .page-img').removeClass('hide');
	}
	
	
});

// $('#J_language').on('taphold',function(){
// 	console.log(111)
// })

var loadRES = ['img/icon/boc.png',
	'img/p0_1.png','img/p0_2.png','img/p0_3.png',
	'img/p1_1.png','img/p1_2.png','img/p1_3.png','img/p1_4.png','img/p1_5.png','img/p1_6.png','img/p1_7.png','img/p1_8.png',
	'img/p2_1.png','img/p2_2.png','img/p2_3.png','img/p2_4.png','img/p2_5.png','img/p2_6.png','img/p2_7.png','img/p2_8.png','img/p2_9.png','img/p2_10.png','img/p2_11.png','img/p2_12.png','img/p2_13.png','img/p2_14.png','img/p2_15.png','img/p2_16.png','img/p2_17.png','img/p2_18.png','img/p2_19.png','img/p2_20.png','img/p2_21.png',
	'img/p3_1.png','img/p3_2.png','img/p3_3.png','img/p3_4.png','img/p3_5.png','img/p3_6.png','img/p3_7_1.png','img/p3_8_2.png','img/p3_10.png','img/p3_11.png','img/p3_12.png','img/p3_13.png','img/p3_14.png','img/p3_15.png',
	'img/p4_1.png','img/p4_2.png','img/p4_3.png',
	'img/music2.png', 'img/next.png'
];

// loading(loadRES, function () {
	// loadPage('welcome');
	// loadPage('letter');
// });


//  <div class="page slide-page page01 " nextHash="page02" prevHash="page00"></div>

// $('.slide-page ').on('swipeup',function(e){
// 	// 向下翻页
// 	if($(this).attr('nextHash') != ''){

// 			loadPage($(this).attr('nextHash'))
// 	}
// }).on('swipedown',function(e){
// 	// 向上翻页
// 	if($(this).attr('prevHash') != ''){

// 			loadPage($(this).attr('prevHash'))
// 	}
// });