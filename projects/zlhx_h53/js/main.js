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
// playClicked();

function loadPage(next) {
	if(next=='welcome'){
		playClicked();
		setTimeout(function(){
			loadPage('nav');
		},3000);
	}
	else if(next=='nav'){
		audio_player.play();
	}else{
		audio_player.pause();
		$(".music").removeClass("on").addClass("off")
	}
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    
}

// 链接
// 首页
$('#index .index-item2').on('click',function(){loadPage('welcome')});

// 导航
$('#nav .nav-icon1').on('click',function(){loadPage('parlour')});
$('#nav .nav-icon2').on('click',function(){loadPage('balcony')});
$('#nav .nav-icon3').on('click',function(){loadPage('suite')});
$('#nav .nav-icon4').on('click',function(){loadPage('bedroom')});
// 返回
$('.page-back').on('click',function(){loadPage('nav')});


function pause(n){
    $("#audio"+n)[0].pause();
    // $("#a"+n).hide();
    clearInterval(t);
    $("#intext"+n).text('');
  }
//   function showfloor(n){
//     $('.J-floor').hide();
//     $("#index3"+n).show();
//   }
  var t;
  var canJ = true;
  function play(n){
    if(!canJ){
      return;
	}
	
    $("#audio"+n)[0].play();
    $("#audio"+n)[0].currentTime = 0;
    // $(".page").hide();
	// $("#a"+n).show();
	loadPage('a'+n);
    var inputValue=$("#text"+n).val();
    var i = 0;
    var str = "";
    t = setInterval(function(){
      str+=inputValue.charAt(i);
      console.log(str);
      console.log(i);
      $("#intext"+n).text(str);
      i++;
      if(i>=inputValue.length){
        clearInterval(t);
      }
    },150);
  }

// $('#J_language').on('taphold',function(){
// 	console.log(111)
// })

var loadRES = ['img/boc.png',
'img/units-icons.png'
];

loading(loadRES, function () {
	// loadPage('index');
	loadPage('welcome');
});


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