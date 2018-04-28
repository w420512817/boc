/**
 * 刮刮卡插件
 * 20170808目标：完成“刮开”动作，在第一次点击的时候获取抽奖结果
 * API：
 * 	cover： 		color/url	图层，如果为色值，填充纯色，如果为url，填充图片
 * 	ID：			生成的canvas的id
 * 	width：			宽度
 * 	height：		高度
 * 	ratio： 		刮开显示结果的比例，大于该值，取消所有图层，说明：写1的话会比较难控制是否全部刮开
 * 	resultData：	返回一个对象，其中刮奖结果的图片以img字段返回
 * 	resultOperate：	对刮奖结果的其他操作，说明：data为resultData返回的对象
 * 	endOperate：	结束刮奖后的其他操作
 * 	touchRadius： 	半径
 * @authors dmy (dmy9062@126.com)
 * @date    2017-07-06 14:26:42
 */

;(function($){

	$.fn.scratch = function(options){
		var $container = this;

		var defaluts = {
			cover:'',
			ID:'canvas',
			width:'',
			height:'',
			ratio:.5,
			resultData:function(){},
			resultOperate:function(data){},
			endOperate:function(){},
			touchRadius:parseInt(window.getComputedStyle(document.documentElement, null)["font-size"])		// 手指半径,这是为了不同分辨率上配合@media自动调节刮的宽度
		};
		var opts = $.extend(defaluts, options);

		var c1;						// 画布
		var ctx;					// 画笔
		var ismousedown = false;	// 是否按下鼠标或开始触摸
		var isOk = true;			// 是否完全刮开图层
		var isFirst = true; 		// 是否刮第一下


		var _reColor = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/, // 正则，判断是否为颜色
			oX = $container[0].offsetLeft, 					 // 容器到左侧的距离
			oY = $container[0].offsetTop; 					 // 容器到顶部的距离

		var prototype = function(){
			window.onload=function(){

				var _HTML = '<canvas style="width:100%" id="' + opts.ID + '">你的浏览器不支持canvas</canvas>';
				$container.css({'position':'relative'}).html(_HTML);

				canvas = document.getElementById(opts.ID);
				ctx = canvas.getContext("2d");

				if(!isNaN(opts.width) && !isNaN(opts.height) && opts.width!='' && opts.height!=''){
					var _re = opts.width/opts.height; 	// 长宽比例

					canvas.width = canvas.clientWidth;
					canvas.height = canvas.clientWidth / _re;

					ctx.globalCompositeOperation = "source-over";
					if(_reColor.test(opts.cover)){
						ctx.fillStyle = opts.cover;
		    			ctx.fillRect(0, 0,canvas.clientWidth,canvas.clientHeight);
		    			ctx.globalCompositeOperation = 'destination-out';
					}else{
						var _img = new Image();
						_img.onload = function() {
							ctx.drawImage(_img,0,0,canvas.clientWidth,canvas.clientHeight);
							ctx.globalCompositeOperation = 'destination-out';
						}
						_img.src = opts.cover;
					}

					canvas.addEventListener("mousemove",eventMove,false);
					canvas.addEventListener("mousedown",eventDown,false);
					canvas.addEventListener("mouseup",eventUp,false);
					canvas.addEventListener('touchstart', eventDown,false);
					canvas.addEventListener('touchend', eventUp,false);
					canvas.addEventListener('touchmove', eventMove,false);
				}else{
					console.error('参数错误:width,height')
				}
			}
		}


		//~开始滑动：判断是否第一次按下，如果是第一次按下，获取抽奖结果
		var eventDown = function(e){
			e.preventDefault();
			if(isOk){
				ismousedown = true;
				if(isFirst){
					isFirst = false;
					var _result = opts.resultData();
					$(canvas).css({'background':'url('+_result.img+') no-repeat center center/100% 100%'});
					opts.resultOperate(_result);
				}
			}
		}

		//~移动中
		var eventMove = function(e){
			e.preventDefault();
			if(ismousedown){

				//~涉及当前(引发)事件的触摸点的列表
				if(e.changedTouches){
					e=e.changedTouches[e.changedTouches.length-1];
				}

				var x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0,
					y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0;

				//画360度的弧线，就是一个圆，因为设置了ctx.globalCompositeOperation = 'destination-out'，画出来是透明的
				 ctx.beginPath();
				 ctx.arc(x, y, opts.touchRadius*1.2*2, 0, Math.PI * 2,true);

				 //下面3行代码是为了修复部分手机浏览器不支持destination-out
				 //我也不是很清楚这样做的原理是什么
				 canvas.style.display = 'none';
				 canvas.offsetHeight;
				 canvas.style.display = 'inherit';

				 ctx.fill();
			}
		}


		//~移动结束，判断比例，是否显示全部
		var eventUp = function(e){
			e.preventDefault();
			if(ismousedown){
				// 获取canvas刮开的数据
				var canvasDate = ctx.getImageData(0,0,canvas.width,canvas.height),
					canvasDateLength = (canvasDate.data.length);

				var j=0;
				for(var i=3;i < canvasDateLength; i+=4){
					if(canvasDate.data[i]==0){
						j++;
					}
				}

				if(j >= (canvasDateLength/4)*opts.ratio){
					isOk = 1;
					ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
					opts.endOperate();
				}

				ismousedown=false;
			}
		}

		return prototype();

	}
})(jQuery,window,document);