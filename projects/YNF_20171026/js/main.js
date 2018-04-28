var mySwiper = new Swiper ('#P_rule .swiper-container', {
	pagination : '.swiper-pagination',
	onSlideChangeEnd: function(swiper){
		if(swiper.isEnd){
			$('#P_rule .arrow-r').addClass('hide');
		}else{
			$('#P_rule .arrow-r').removeClass('hide');
		}
		if(swiper.isBeginning){
			$('#P_rule .arrow-l').addClass('hide');
		}else{
			$('#P_rule .arrow-l').removeClass('hide');
		}
	}
});

var $game = $('#game'),
	_step = 1, 								// 当前关卡
	_allStep = 3, 							// 总关卡数目
	_sec = 0, 								// 分
	_sec1 = 0, 								// 秒
	_current = 0, 							// 当前答对
	_count = _myProductArray.length; 		// 用户选择的数量
var timer;

	if(_count == 0){
		_count = 3;
	}


// 完整数组
var _blockArray = new Array();
for(var j=0;j<_productArray.length;j++){
	_blockArray.push(j);
}

function loadPage(next) {

	$('.popup').addClass('hide').removeClass('animate');

	if(next == 'game'){
		$("body").bind("touchmove",function(event){event.preventDefault();});
		$('#welcome .btn-join').attr('nexthash','game'); 		// 禁止首页跳转到选择产品页

		var _checkTimes = true;
		/*$.ajax({
			type:"POST",
			url: "welcome.php?check",
			async: false,
			dataType:'json',
			success : function(json){
				if(json.status==1){
					_checkTimes = true;
				}
			}
		});*/
		
		if(_checkTimes){
			// 如果还有次数，开始游戏
			initTips(_myProductArray); 				// 初始化tips
			_sec = 0,_sec1 = 0,_step = 1;

			_blockArray = removeTips(); 			// 获取删除tips后的数组
			initBlock(_step); 						// 初始化第一关方块
			$game.find('span.sec').html('00');
			$game.find('span.sec1').html('00');

			$('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');

			// 准备倒计时
			_current = 0;
			$readyLayer.removeClass('hide').addClass('animate');
			$readyLayer.find('.ready00').removeClass('hide');
			$readyLayer.find('.ready01').removeClass('hide').addClass('animate');
			var _i = 1;
			var _t1 = setInterval(function(){
				$readyLayer.find('.ready0'+_i).addClass('hide').removeClass('anmiate');
				_i ++ ;
				$readyLayer.find('.ready0'+_i).removeClass('hide').addClass('animate');
				if(_i==4){
					$readyLayer.find('.ready00').addClass('hide');
				}else if(_i == 5){
					clearInterval(_t1);
					$readyLayer.addClass('hide');
					$readyLayer.find('p').addClass('hide');

					_run = true;

					// 游戏计时器
					timer = setInterval(function(){
						if(_sec1 >= 100){
					        _sec1 = 0;
					        _sec ++;
					   	}
						$game.find('span.sec').html(initNum(_sec));
						$game.find('span.sec1').html(initNum(_sec1));
						_sec1 ++ ;
					},10);
				}
			},1000);
		}else{
			loadPage('welcome');
			loadPopup('P_share');
		}
	}else{
		$('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
		if(next == 'index'){
			loadPopup('P_rule');
		}else{
			$("body").bind("touchmove",function(event){event.preventDefault();});
		}
	}
}

function loadPopup(popup){
	$('#'+popup).removeClass('hide').addClass('animate');

	if(popup == 'P_rule2' || popup == 'P_tab'){
		$("body").unbind("touchmove");
	}

	if(popup == 'P_rule'){
		mySwiper.update();
		mySwiper.slideTo(0, 300,true);
	}
}





//=========================== 弹框


// 点击跳转页面
$(window).on('touchend','.link-load',function(){
	var _next = $(this).attr('nextHash');
	loadPage(_next);
	return false;
});

// 打开弹框
$('.link-popup').on('touchend',function(){
	var _popup = $(this).attr('nextHash');
	loadPopup(_popup);
	return false;
});

// 关闭分享弹框
$('#P_share').on('touchend',function(){
	$('#P_share').addClass('hide').removeClass('animate');
	return false;
});

$('.popup .close-popup').on('touchend',function(){
	var _this = $(this);
	if(_this.parents('.popup').hasClass('popup-rule2') || _this.parents('.popup').hasClass('popup-tab')){
		$("body").bind("touchmove",function(event){event.preventDefault();});
	}else{
		$("body").unbind("touchmove");
	}
	$(this).parents('.popup').addClass('hide').removeClass('animate');
	return false;
});

// 排行榜
var $P_tab = $('#P_tab');
$P_tab.on('touchend','.tab-mod li',function(){
	var _this = $(this);
	if(!_this.hasClass('current')){
		_this.addClass('current').siblings('li').removeClass('current');
		var _eq = _this.index();
		$P_tab.find('.tab-content .tab-detail').eq(_eq).removeClass('hide').siblings('div').addClass('hide');
	}
	return false;
});



//=========================== index 选择商品
var $index = $('#index');
$index.on('touchend','li.product-item .checkbox',function(){
	var _this = $(this);
	if(!_this.hasClass('current')){
		if($index.find('li .checkbox.current').length == _count){
			loadPopup('P_limit');
		}else{
			_this.addClass('current');
		}
	}else{
		_this.removeClass('current');
	}

	if($index.find('.checkbox.current').length == _count){
		$index.find('.btn-start').addClass('current');
	}else{
		$index.find('.btn-start').removeClass('current');
	}
	return false;
});

// 点击参赛 程序：确定选择商品后，保存商品id
$index.on('touchend','.btn-start.current',function(){
	_myProductArray = [];
	$index.find('li.product-item .checkbox.current').each(function(){
		var _this = $(this);
		_myProductArray.push(parseInt(_this.data('id')));
	});
	console.log('该用户选择的商品：'+_myProductArray);
	loadPage('game');
	return false;
});






//=========================== 游戏
var $readyLayer = $game.find('.ready-layer'),
	_run = true; 								// 游戏开始

$game.on('touchend','.block-list li',function(){
	var _this = $(this);
	if((!_this.hasClass('right-answer')) && (!_this.hasClass('wrong-answer')) && _run){
		if(_this.hasClass('current-item')){
			_this.addClass('right-answer');
			_current++;
			if(_current == _count){
				_run = false;
				// 完成答题
				if(_step == _allStep){
					clearInterval(timer);

					// 程序：提交成绩
	 				// console.log('秒：' + _sec)
					// console.log('毫秒：' + (_sec1-1));

					var _chckTimes = true,		// 判断是否还有机会
						_times = 0; 			// 剩余次数

					if(_chckTimes){
						// 还有机会
						$('#P_endGame').removeClass('end-times');
					}else{
						// 没有机会
						$('#P_endGame').addClass('end-times');
					}

					$('#P_endGame .left-times span').html(_times); 					// 剩余次数
					$('#P_endGame span.mine-time').html(_sec+'.'+(_sec1-1)); 		// 时间
					$('#P_endGame span.mine-ranking').html(2); 					// 排名
					$('#P_tab .txt01').html('您的成绩为：' + _sec + '.' + (_sec1-1) + '秒<br>目前排名:'+2); 					// 排行榜的弹框

					// 更新商品的排行榜
					initUlTable(_topProduct,$('#P_tab .tab-product .table-content'));

					// 更新用时排行榜
					var userData = ['小明|1.21s','小明|1.21s','小明|1.21s','小明|1.21s','小明|1.21s','小明|1.21s','小明|1.21s',];
						_userHTML = '<table width="95%" cellspacing="0" cellpadding="0" style="table-layout:fixed">';
					for(var i=0;i<userData.length;i++){
						var _icon = '',
							_item = userData[i].split('|');
						if(i<3){
							_icon = '<img src="img/ranking-icon0'+(i+1) +'.png?z=201710311404" />'
						}
						_userHTML += '<tr>'
									+ 	'<td><span>'+_item[0]+'</span></td>'
									+ 	'<td>'+_item[1]+'</td>'
									+ 	'<td>'+(i+1)+_icon+'</td>'
									+ '</tr>'
					}
					_userHTML += '</table>';
					$('#P_tab .tab-time .table-content').html(_userHTML);

					loadPopup('P_endGame');
				}else{
					// 如果没有完成答题，初始化方块，进入下一关
					_step ++;
					_run = true;
					_current = 0;
					initBlock(_step);
				}
			}
		}else{
			_this.addClass('wrong-answer');
		}
	}
	return false;
})

// 填充tips
function initTips(arry){
	var _tipsHTML = '';
	for(var _i = 0;_i<arry.length;_i++){
		_tipsHTML += '<li style="background:url(img/pro' + initNum(arry[_i]) + '-2.png?z=201710311404) no-repeat center 0/100% 100%;-webkit-mask-image: url(img/game13.png);-webkit-mask-size:cover;-webkit-mask-repeat:no-repeat;-webkit-mask-position-y:0;"><img src="img/game11.png"  /></li>'
	}
	$game.find('.product-tips').html(_tipsHTML);
}

// 填充方块
function initBlock(_step){
	var number = Math.pow(_step+2,2); 				// 方块数量

	var	_data = new Array(); 						// 列表数组
	// 把必选的三项随机放入数组位置
	var _userIndex = randomNumberArray(number);
	for(var _i = 0;_i<_count;_i++){
		_data[_userIndex[_i]] = _myProductArray[_i];
	}

	// 填充剩下的数据，如果大于19，生成可重复的数组，如果小于19，生成不重复的数据
	if(number > _productArray.length){
		for(var _i=0;_i<number;_i++){
			var _tempIndex = RandomNumBoth(0,(_blockArray.length-1)),
				_tempData = _blockArray[_tempIndex];
			if(typeof(_data[_i]) == 'undefined'){
				_data[_i] = _tempData;
			}
		}
	}else{
		var _tempData = getRandomArray(_blockArray); 	// 将不含有三个固定值的数组打乱
		for(var _i=0;_i<number;_i++){
			var _tempData = _blockArray[_i];
			if(typeof(_data[_i]) == 'undefined'){
				_data[_i] = _tempData;
			}
		}
	}

	var _html = '';
	for(var _i=0;_i<number;_i++){
		var _num = _data[_i],
			_class = '';
		for(var _j = 0;_j<_count;_j++){
			if(_myProductArray[_j] == _num){
				_class = ' class="current-item"';
			}
		}
		_html += '<li'+_class+'><img src="img/pro' + initNum(_num)+'-2.png" /><img src="img/game14.png" /><img src="img/game15.png" /></li>';
	}
	$game.find('.block-list').attr('class','block-list block-list'+_step).html(_html);
}

//~~随机数
function RandomNumBoth(Min,Max){
	var Range = Max - Min;
	var Rand = Math.random();
	var num = Min + Math.round(Rand * Range);
	return num;
}

//~~获得从0到number的打乱数组
function randomNumberArray(number){
	var originalArray = new Array; 	//原数组
	for (var i = 0;i < number;i++){
		originalArray[i]=i;
	}
	originalArray.sort(function(){ return 0.5 - Math.random();});
	return originalArray;
}

//~~将Array数组打乱返回
function getRandomArray(Array){
	var originalArray = Array;
	originalArray.sort(function(){ return 0.5 - Math.random();});
	return originalArray;
}

//~~从全部数据的数组中，删除用户数据
function removeTips(){
	var temp = [],
		temparray = [];
	for (var i = 0; i < _count; i++) {
	    temp[_myProductArray[i]] = true;
	}
	for (var i = 0; i < _blockArray.length; i++) {
	    if (!temp[_blockArray[i]]) {
	        temparray.push(_blockArray[i]);
	    }
	}
	return temparray;
}

function initNum(_num){
	return (_num<10?'0'+_num:_num);
}





//=========================== 入口
var loadRES = ['img/boc.png','img/img01.png','img/img02.png','img/img03.png','img/img04.png','img/img05.png','img/img06.png','img/img07.png','img/btn-ranking.png','img/btn-join.png','img/btn-start.png','img/btn-start2.png','img/select-bg.png','img/logo2.png','img/logo.png','img/btn-rule.png','img/select-limit.png','img/select-limit-close.png','img/ranking-tab01.png','img/ranking-tab02.png','img/ranking-tab01-current.png','img/ranking-tab02-current.png','img/ranking-tab-bg.png','img/ranking-close.png','img/rule01.png','img/rule02.png','img/rule03.png','img/rule-focus.png','img/rule-hand.png','img/rule-close.png','img/ranking-icon01.png','img/ranking-icon02.png','img/ranking-icon03.png','img/pro00-1.png','img/pro00-2.png','img/pro01-1.png','img/pro01-2.png','img/pro02-1.png','img/pro02-2.png','img/pro03-1.png','img/pro03-2.png','img/pro04-1.png','img/pro04-2.png','img/pro05-1.png','img/pro05-2.png','img/pro06-1.png','img/pro06-2.png','img/pro07-1.png','img/pro07-2.png','img/pro08-1.png','img/pro08-2.png','img/pro09-1.png','img/pro09-2.png','img/pro10-1.png','img/pro10-2.png','img/pro11-1.png','img/pro11-2.png','img/pro12-1.png','img/pro12-2.png','img/pro13-1.png','img/pro13-2.png','img/pro14-1.png','img/pro14-2.png','img/pro15-1.png','img/pro15-2.png','img/pro16-1.png','img/pro16-2.png','img/pro17-1.png','img/pro17-2.png','img/pro18-1.png','img/pro18-2.png','img/mime-share.png','img/game19.png','img/game17.png','img/game16.png','img/game20.png','img/game18.png','img/game10.png','img/game12.png','img/game07.png','img/game08.png','img/game01.png','img/game02.png','img/game03.png','img/game06.png','img/game04.png','img/game05.png','img/game09.png'];
loading(loadRES,function(){
	if(_myProductArray.length == 0){
		loadPage('welcome');
	}else{
		loadPage('game');
	}
});




