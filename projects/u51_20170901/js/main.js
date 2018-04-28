var _t;


function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    if(next == 'phone'){
    	aUdio(0,true);
    }else if(next == 'call'){
    	aUdio(1,true);
    	var _i = 1,		// 计时
    		_m = 0, 	// 分
    		_s = 0; 	// 秒
		_t = setInterval(function(){
			if(_i==60){
				_m ++ ;
				_s = 0;
				_i = 1;
			}else{
				_s = _i;
				_i ++;
			}
			$('#call .cut-down').html( ((_m<10)?'0'+_m:_m) + ':' + ((_s<10)?'0'+_s:_s) );
    	},1000);
    }else if(next == 'intro'){
		playClicked();
		$('.music').removeClass('hide');
    }
}

$('.link-load').on('click',function(){
	var _next = $(this).attr('nextHash');
	loadPage(_next);
});

//~挂断电话
$('#call .img02').on('click',function(){
	clearInterval(_t);
	audio_con[1].pause();
	$('#call .video').removeClass('hide');

	//~自动播放
	if((browser.versions.weixin && browser.versions.ios) || (!browser.versions.weixin && browser.versions.android)){
		playVideo();
		document.addEventListener("WeixinJSBridgeReady", function () {
			videoList.forEach(function(v,i){
				v.load();
				v.play();
				v.pause();
			});
			playVideo();
		}, false);
	}
	//~点击播放
	$('#call .video').on('click',function(){
		if($(currVideo).hasClass('hide')){
			playVideo();
		}
	});
	currVideo.addEventListener('ended', function () {
		aUdio(3,false);
		var _tv = setTimeout(function(){
			$('#call .welcome').removeClass('hide');
			clearTimeout(_tv);
		},300)
	}, false);
});

var _run = true,
	_rePhone = /^1[3|4|5|7|8][0-9]{9}$/;
$('#signUp .btn').on('click',function(){
	$('#form input').blur();
		var _tel = $('input[name="tel"]').val(),		// 手机号
			_name = $('input[name="name"]').val();		// 姓名
		if (_name == ''){
			dialogueTips('请填写姓名');
		}else if(_tel == ''){
			dialogueTips('请填写手机号')
		}else if(!_rePhone.test(_tel)){
			dialogueTips('手机号码格式错误');
		}else{
			if(_run){
				_run = false;
				//==ajax
				_run = true;
				// 成功
				$('#succ').removeClass('hide').addClass('animate');

			}else{
				dialogueTips('正在提交……');
			}
		}
})

var loadRES = ['img/boc.png','img/img09.png','img/img10.png','img/img11.png','img/img12.png','img/img13.png','img/btn.png','img/img14.png','img/img01.png','img/img07.png','img/img08.png','img/img01.png','img/img02.png','img/img05.png'];

loading(loadRES,function(){
	// 第一屏打电话
	loadPage('phone');
	document.addEventListener("WeixinJSBridgeReady", function (){
		audio_con[0].play();
	}, false);
	audio_con[0].onended=function(){
		audio_con[0].currentTime = 0;
		audio_con[0].play();
	}

	// loadPage('signUp');
	// 索引
	// signUp 报名表单
});