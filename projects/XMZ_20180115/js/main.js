var shopData = {
    "杭州": [{shop:'国美电器'},
             {shop:'苏宁电器'},
             {shop:'五星电器'},
             {shop:'杭州古墩路西门子家电体验中心'},
             {shop:'杭州华东家电市场西门子家电体验店'},
             {shop:'杭州万象城西门子家电体验店'},
             {shop:'杭州大厦西门子家电体验店'},
             {shop:'杭州恒大建材西门子家电体验店'},
             {shop:'汇德隆广场店'},
             {shop:'汇德隆萧山店'},
             {shop:'兴达电器'}],
    "宁波": [{shop:'国美电器'},
             {shop:'苏宁电器'},
             {shop:'五星电器'},
             {shop:'宁波环城南路西门子家电体验中心'},
             {shop:'宁波慈溪西门子家电体验店'},
             {shop:'宁波民丰嵩江路店'}],
    "舟山": [{shop:'国美电器'},
             {shop:'苏宁电器'},
             {shop:'五星电器'},
             {shop:'舟山红星美凯龙西门子家电体验店'}],
    "绍兴": [{shop:'国美电器'},
             {shop:'苏宁电器'},
             {shop:'五星电器'},
             {shop:'绍兴诸暨西门子家电体验店'},
             {shop:'绍兴中兴中路西门子家电体验中心'},
             {shop:'绍兴上虞石狮西门子家电体验店'},
             {shop:'绍兴新昌西门子家电体验店'},
             {shop:'绍兴越东电气店'}],
    "金华": [{shop:'国美电器'},
             {shop:'苏宁电器'},
             {shop:'五星电器'},
             {shop:'金华八一南街西门子家电体验中心'},
             {shop:'义乌南门街西门子家电体验中心'},
             {shop:'金华万顺'}],
    "衢州": [{shop:'国美电器'},
             {shop:'苏宁电器'},
             {shop:'五星电器'},
             {shop:'衢州世纪大道西门子家电体验店'},
             {shop:'衢州普农'}],
    "温州": [{shop:'国美电器'},
             {shop:'苏宁电器'},
             {shop:'五星电器'},
             {shop:'温州乐清金茂西门子家电体验店'},
             {shop:'温州江滨路西门子家电体验中心'},
             {shop:'温州瑞安西门子家电体验店'},
             {shop:'温州瓯北西门子家电体验店'},
             {shop:'温州民丰黄龙店'}],
    "丽水": [{shop:'国美电器'},
             {shop:'苏宁电器'},
             {shop:'五星电器'},
             {shop:'丽水西门子家电体验店'},
             {shop:'丽水波音电器'}],
    "湖州": [{shop:'国美电器'},
             {shop:'苏宁电器'},
             {shop:'五星电器'},
             {shop:'湖州红星美凯龙西门子家电体验店'},
             {shop:'湖州浙北大厦湖州店'}],
    "嘉兴": [{shop:'国美电器'},
             {shop:'苏宁电器'},
             {shop:'五星电器'},
             {shop:'嘉兴纺工路西门子家电体验中心'},
             {shop:'嘉兴戴梦得体育中心店'}],
    "台州": [{shop:'国美电器'},
             {shop:'苏宁电器'},
             {shop:'五星电器'},
             {shop:'台州天台新城广场西门子家电体验店'},
             {shop:'台州黄岩装饰城西门子家电体验店'},
             {shop:'台州温岭万昌中路西门子家电体验中心'},
             {shop:'台州路桥居然之家西门子家电体验店'},
             {shop:'台州椒江红星美凯龙西门子家电体验店'},
             {shop:'台州临海恒大建材西门子家电体验店'},
             {shop:'台州椒江国商广场'}]
    };


var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}

var _videoId = 0;
if(windowHeight>=700){
    _videoId = 1;
    $('#video video').eq(0).addClass('hide');
    $('#video video').eq(1).removeClass('hide');
}

// alert(windowHeight)  724
// alert(windowWidth)   375

function loading(imgArr,callback) {
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
			$(".load").fadeOut(function(){
                callback();
            });			
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

document.ontouchmove = function(e){
	e.preventDefault();
}

// 音乐
var _musicId = 0;
var audio_con = [];
['music.mp3','music2.mp3'].forEach(function(v,i){
  var mUsic = new Audio(v);
  mUsic.loop=false;
  audio_con.push(mUsic);
  mUsic=null;
});
function playClicked(){
    if(audio_con[_musicId].paused) {
        audio_con[_musicId].play();
        $(".music").removeClass("off").addClass("on")
    }else{
        audio_con[_musicId].pause();
        $(".music").removeClass("on").addClass("off")
    }
}

// 视频
var _videoRun = false;
var videoList = [$("#video video").eq(0)[0],$("#video video").eq(1)[0]];
var currVideo = videoList[_videoId];
document.addEventListener("WeixinJSBridgeReady", function () {
	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
  audio_con.forEach(function(v,i){
    v.load();
    v.play();
    v.pause();
  });

  audio_con[0].play();
},false);
audio_con[0].play();

function aUdio(cur_audio){
    audio_con.forEach(function(v,i){
        v.pause();
    })
    audio_con[cur_audio].play();
}

// 播放结束
currVideo.addEventListener('ended',function () {
	loadPage('rule');
},false);

// 手动播放
$('#welcome .hand').on('click',function(){
    $('#welcome .video-mod').fadeOut();
    _musicId = 1;
    if($('.music').hasClass('on')){
        aUdio(1);
    }
    currVideo.play();
});


function loadPage(next) {
    $('#'+next).fadeIn(function(){
        $(this).removeClass("hide").addClass("animate");
        if(next == 'welcome'){
          var _i = 0;
          var _t = setInterval(function(){
            if(_i <= $('#welcome .gif img').length){
                _i ++;
                $('#welcome .gif img').eq(_i).fadeIn();
            }else{
                $('#welcome .hand').fadeIn();
                clearInterval(_t);
            }        
          },100);
        }
    }).siblings('.page').fadeOut(function(){
        $(this).addClass('hide').removeClass('animate');
    });
}
$('.link-load').on('click',function(){
	var _next = $(this).attr('nextHash');
	loadPage(_next);
});



$('#end .img01').on('click',function(){
	$('#end .layer-share').removeClass('hide');
})

// 上传图片
$('#singUp').find('input[type="file"]').on('change',function(){
	var _imgURL = 'img/img05.png',
		_this = $(this);
	_this.parents('.upload-mod').css({'background':'url('+_imgURL+') no-repeat center center','background-size':'contain'})
});

// 填充城市
var _cityHTML = '<option value="">请选择你的城市</option>';
for(item in shopData){
	_cityHTML += '<option value="'+item+'">'+item+'</option>';
}
$('#singUp').find('select.city').html(_cityHTML);
$('#singUp').on('change','select.city',function(){
	var _this = $(this),
		_key = _this.val();
	var _shopHTML = '<option value="">请选择门店</option>';
	$('#singUp textarea[name="addr"]').val('');
	if(_key!=''){
		_tempData = shopData[_key];
		var _shopHTML = '<option value="">请选择门店</option>';
		for(var _i = 0;_i<_tempData.length;_i++){
			_shopHTML += '<option value="'+_tempData[_i]+'" data-addr="'+_tempData[_i].addr + '">'+_tempData[_i].shop + '</option>';
		}
	}
	$('#singUp select.store').html(_shopHTML);
});

// 提交表单
var _run = true,
	_rePhone = /^1[3|4|5|7|8][0-9]{9}$/;
$('#singUp').find('.submit-btn').on('click',function(){
	var _name = form.name.value, 	// 姓名
		_tel = form.tel.value, 		// 电话
		_store = form.store.value, 	// 门店
		_city = form.city.value, 	// 城市
		_file = form.file.value; 	// 上传
	if(_name == ''){
		dialogueTips('请填写名字');
	}else if(_tel == ''){
		dialogueTips('请填写电话');
	}else if(!_rePhone.test(_tel)){
		dialogueTips('电话格式不正确');
	}else if(_city == ''){
		dialogueTips('请选择城市');
	}else if(_store == ''){
		dialogueTips('请选择门店');
	}else if(_file == ''){
		dialogueTips('请上传合照');
	}else{
		// 提交表单
		$('#end .count').html('12');
		loadPage('end');
	}
});


var loadRES = ['img/boc.png','img/img01.png','img/img02.png','img/img03.png','img/img04.png','img/img05.png','img/img06.png','img/img07.png','img/img08.png','img/img09.png','img/img10.png','img/img07.png','img/img11.png','img/img12.png','img/img13.png','img/hand.png','img/gif01.png','img/gif02.png','img/gif03.png','img/gif04.png','img/gif05.png','img/gif06.png','img/gif07.png','img/gif08.png','img/gif09.png','img/gif10.png','img/gif11.png','img/gif12.png','img/gif13.png','img/gif14.png','img/gif15.png','img/gif16.png','img/gif17.png','img/gif18.png','img/gif19.png','img/gif20.png','img/gif21.png','img/gif22.png','img/gif23.png','img/gif24.png','img/gif25.png','img/gif26.png','img/gif27.png','img/gif28.png','img/gif29.png','img/gif30.png','img/gif31.png','img/gif32.png','img/gif33.png','img/gif34.png','img/gif35.png','img/gif36.png','img/gif37.png','img/gif38.png','img/gif39.png','img/gif40.png','img/gif41.png','img/gif42.png','img/gif43.png','img/gif44.png','img/gif45.png','img/gif46.png','img/gif47.png','img/gif48.png','img/gif49.png','img/gif50.png'];

loading(loadRES,function(){
	loadPage('welcome');
});