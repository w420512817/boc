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

var windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	$body = $("body");
if (windowWidth > 640) {
	$body.height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$body.height(windowHeight);
}

var $detail = $('#detail');

function loadPage(next) {
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
    // if(next == 'ranking' || next == 'vote' || next == 'master' || next == 'signUp' next == 'signUp'){
    // 	$("body").unbind("touchmove");
    // }else{
    // 	$("body").bind("touchmove",function(event){event.preventDefault();});
    // }

    if(next == 'index' || next == 'detail'){
    	$('.back-index').hide();
    }else{
    	$('.back-index').show();
    }

}

$('.link-load').on('click',function(){
	var _this = $(this),
		_next = $(this).attr('nextHash');
	if(_this.hasClass('close-dialogue')){
		_this.parents('.dialogue').hide();
	}
	//~~~程序：跳转详情页时，获取数据，填充
    if(_next == 'detail'){
	    var _id = 2;
    	var data = {
    		name:'李白',
    		no:111,
    		count:234,
    		img:'img/img25.png,img/img26.png',
    		intro:'我的照片可爱优雅'
    	}
    	$detail.find('#name').html('ID:'+data.no+' '+data.name);
    	$detail.find('#count').html(data.count+'票');

    	var _img = data.img.split(',');
    	if(_img.length>1){
	    	var _imghtml = '<div class="swiper-container"><div class="swiper-wrapper">';
	    	for(var i=0;i<_img.length;i++){
	    		_imghtml += '<div class="swiper-slide" style="background:url('+_img[i]+') no-repeat center center/contain"><img src="img/item-blank.png" /></div>';
	    	}
	    	_imghtml += '</div></div>';
	    	$detail.find('#photo').html(_imghtml);
    		var t = setTimeout(function(){
    			mySwiper = new Swiper ('.swiper-container', {});
    			clearTimeout(t);
    		})
    	}else{

    		_imghtml = '<p class="swiper-slide" style="background:url('+data.img+') no-repeat center center/contain"><img src="img/item-blank.png" /></p>';
    		$detail.find('#photo').html(_imghtml);
    	}
    	$detail.find('#introduce').html(data.intro);

    }
	loadPage(_next);
});
$('.close').on('click',function(){
	$(this).parents('.dialogue').hide();
});

var loadRES = ['img/boc.png','img/img01.png','img/img05.png','img/img04.png','img/img06.png','img/img07.png','img/img08.png','img/logo.png','img/img12.png','img/img02.png','img/img16.png','img/img13.png','img/img14.png','img/img15.png','img/img09.png','img/img10.png','img/img11.png','img/img17.png','img/img18.png','img/img20.png','img/img21.png','img/img22.png','img/img23.png','img/img24.png','img/img25.png','img/img26.png','img/img27.png','img/img28.png','img/img29.png','img/img30.png']




loading(loadRES,function(){
	loadPage('index');

});




var _run = true,
	_rePhone = /^1[3|4|5|7|8][0-9]{9}$/;

//~上传图片
$('input[name=photo]').on('change',function(){
	var _img = 'img/img04.png';
	$(this).parents('.upload-mod').css({'background':'#fff url('+_img+') no-repeat center center','background-size':'contain'});
});
//~上传凭证
$('input[name=certificate]').on('change',function(){
	var _img = 'img/img04.png';
	$(this).parents('li.upload-certificate').css({'background':'#fff url('+_img+') no-repeat center center','background-size':'contain'});
});


$('#J_signUp').on('click',function(){
	$('#signUpForm input').blur();
	if(signUpForm.name.value == ''){
		dialogueTips('请填写姓名');
	}else if(signUpForm.tel.value == ''){
		dialogueTips('请填写电话');
	}else if(!_rePhone.test(signUpForm.tel.value)){
		dialogueTips('电话号码格式错误');
	}else if(signUpForm.photo.value == ''){
		dialogueTips('请上传照片');
	}else if(signUpForm.intro.value==''){
		dialogueTips('请填写您想说的话');
	}else if($('input[name=musical]:checked').length == 0){
		dialogueTips('请至少选择一项乐器');
	}else{
		if(_run){
			_run = false;

			_run = true;
			$('#D_signUp').show();


		}else{
			dialogueTips('正在报名……')
		}
	}
});

$('.musical-mod input[type="checkbox"]').on('change',function(){
	if($(this).prop('checked')){
		$(this).parents('label').addClass('current');
	}else{
		$(this).parents('label').removeClass('current');
	}
})

//~~投票
$('.vote-operate').on('click',function(event){
	event.stopPropagation();
	// $("body").unbind("touchmove");
	var _this = $(this);
	var _id = $(this).attr('id'); 		//~投票id
	if(_run){
		_run = false;

		_run = true;
		//~如果投票成功
		var _number = 500, //~当前票数
			_frequency = 3; 	// 剩余次数
		_this.parents('.vote-wrap').find('.count').html(_number+'票');
		$('#D_vote').find('strong').html(_frequency);
		$('#D_vote').show();



		//~~如果次数到达上限
		// dialogueTips('您的投票次数达到上限');

	}else{
		dialogueTips('正在投票……');
	}
})