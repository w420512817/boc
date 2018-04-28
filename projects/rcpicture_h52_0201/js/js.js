/*
 * 全站公共脚本,基于jquery-2.1.1脚本库，库中已嵌入tap,transition
 */

// $('#edit').css({'height':$(window).width()*833/566})

!function(){
	if ( !window.h6app_userInfo ){
		window.h6app_userInfo = {};
	}
	if ( !h6app_userInfo.openid ){
		h6app_userInfo.openid = "openid";
	}
	if ( !h6app_userInfo.sign ){
		h6app_userInfo.sign = "sign";
	}
	/*
	 * 设备信息
	 */
	window.phone = {
		app:function(){
			var userAgent = navigator.userAgent;
		    if( userAgent.indexOf("MicroMessenger") > -1 ) {  
		        return "wx";  
		    }
		    else {
		        return "other";  
		    }
		},
		system:function(){
			var userAgent = navigator.userAgent;
			if ( userAgent.indexOf("Android") > -1 ){
				return "Android";
			}
			else if ( userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1 ){
				return "Ios";
			}
			else{
				return "Pc";
			}
		},
		ref:(function(){
			var ref = '';
			if(document.referrer.length > 0){
				ref = document.referrer;
			}
			try{
				if (ref.length == 0 && opener.location.href.length > 0){
					ref = opener.location.href;
				}
			}catch(e){}
			return ref;
		})(),
		pageName:(function(){
			var pathname = window.location.pathname;
			var pageName = pathname.split("/").pop();
			if ( pageName == "" ){
				pageName = "index.html";
			}
			return pageName;
		})()
	};
	/*
	 * 页面元素
	 */
	window.page = {
		clientWidth:document.documentElement.clientWidth>640?640:document.documentElement.clientWidth,
		clientHeight:document.documentElement.clientHeight,
		setScale:function(){
			var h = this.clientWidth*1008/640;
			if ( this.clientHeight < h ){
				page.scale = this.clientHeight/h;
				$("body").removeClass("need-move");
				$("body").addClass("need-scale");
				$(".scale").each(function(){
					this.style.transform = "scale("+ page.scale +")";
					this.style.webkitTransform = "scale("+ page.scale +")";
					this.style.height = h/page.clientHeight*100+"%";
				})
			}
			else{
				page.scale = 1;
				$("body").removeClass("need-scale");
				$("body").addClass("need-move");
				$(".scale").each(function(){
					this.style.transform = "";
					this.style.webkitTransform = "";
					this.style.height = "";
				})
			}
		},
		init:function(){
			this.setScale();
			$(window).on("resize",function(){
				page.clientWidth = document.documentElement.clientWidth>640?640:document.documentElement.clientWidth;
				page.clientHeight = document.documentElement.clientHeight;
				page.setScale();
			});
			document.addEventListener("touchmove",function(event){
				event.preventDefault();
			});
			if ( phone.app() == "wx" ){
			    if ( typeof(wx) == "object" ){
				    wx.ready(function(){
						bgm.init();
						//sound.init();
						window.onload = page.complete();
				    })
			    }
			    else{
			    	if ( typeof(WeixinJSBridge) != "undefined" ){
						bgm.init();
						//sound.init();
			    		window.onload = page.complete();
			    	}
			    	else{
						document.addEventListener("WeixinJSBridgeReady",function(){
							bgm.init();
							//sound.init();
							window.onload = page.complete();
					    },false);
			    }
			    }
			}
			else{
				bgm.init();
				//sound.init();
				window.onload = page.complete();
			}
			var html = "";
			for ( var i=0;i<game.modelData.length;i++ ){
				html += "<div class='swiper-slide' data-model='"+ game.modelData[i].id +"'><img src='images/img/"+ game.modelData[i].id +".jpg'/></div>";
			}
			$("#home").find(".swiper-wrapper").html(html);
			$("#select-swiper").find(".swiper-wrapper").html(html);
			if ( args.jump == "result" ){
				h6app_userInfo.openid = "obFweuEsWbzTcY36QFie2G86Rh-A";
				h6app_userInfo.sign = "25d40e267a33b4b56f866ec49c8b90b2";
			}
			//主线逻辑装载
			game.init();
			// window.gif = new frame("gif",300,200,"gif",33,"png",function(){
				setTimeout(function(){
					page.closePower("#text");
				},1000)
			// });
		},
		complete:function(){
			page.changePower(0,"#loading",function(){
				var img = $("body").find("img[loadsrc]");//图片数组
				var length = img.length;//图片数量
				var downImg = 0;//已下载数量
				var percent = 0;//百分比
				for ( var i=0;i<length;i++ ){
					var imgs = new Image();
					var imgDiv = img.eq(i);
					var imgsrc = imgDiv.attr("loadsrc");
					imgs.src = imgsrc;
					if(imgs.complete){
				    	imgDiv.attr("src",imgsrc).removeAttr("loadsrc");//有缓存
				    	imgDown();
					}
					else{
					    imgDiv.attr("src",imgsrc).load(function(){
					    	$(this).removeAttr("loadsrc");//无缓存
					    	imgDown();
					    })
					}
				}
				function imgDown(){
					downImg ++;
					percent = parseInt(100*downImg/length);
					// $("#loading").find(".loading-percent").width(percent+"%");
					$("#loading").find(".loading-text").html(percent+"%");
					if ( percent == 100 ){
						setTimeout(function(){
							page.loaded();
						},500)
					}
				}
			})
		},
		loaded:function(){
			if ( args.jump == "result" ){
				page.changePower("#loading","#list");
				game.listswiper.reInit();
				game.listscroll.refresh();
				game.page_size = 10;
				game.page_number = 1;
				game.order_by = "time";
				game.order_type = 1;
				$("#list").find(".fillter").find(".desc").removeClass("desc");
				$("#list").find(".fillter").find("li").removeClass("active").eq(0).addClass("active");
				game.getList();
				return false;
			}
			if ( args.jump == "upload" ){
				page.changePower("#loading","#home");
				game.homeswiper.reInit();
				return false;
			}
//			if ( args.user_openid ){
//				page.changePower("#loading","#share");
//		    	game.getInfo(args.user_openid,"share");
//				return false;
//			}
			page.changePower("#loading","#home");
			game.homeswiper.reInit();
			// page.changePower(0,"#text",function(){
				// gif.playing = true;
				// window.requestNextAnimationFrame(animate);
			// });
		},
		zIndex:100,
		changePower:function(oldDiv,newDiv,callback){
			$(newDiv).css({"display":"block","opacity":0,"visibility":"visible","zIndex":page.zIndex}).addClass("on").transition({opacity:1,complete:function(){
				page.zIndex ++;
				if ( oldDiv != 0 ){
					$(oldDiv).hide().removeClass("on");
				}
				if ( typeof(callback) == "function" ){
					callback();
				}
			}},500,"linear");
		},
		closePower:function(div,callback){
			$(div).transition({opacity:0,complete:function(){
				$(div).hide().removeClass("on");
				if ( typeof(callback) == "function" ){
					callback();
				}
			}},500,"linear")
		}
	};
	/*
	 * 主线逻辑
	 */
	window.game = {
		init:function(){
			var _this = this;
			//homeswiper
			_this.homeswiper = new Swiper("#home-swiper",{
			    slidesPerView : 5,
			    centeredSlides : true,
			    loop:false,
			    tdFlow: {
			        rotate : 30,
			        stretch :110*page.clientWidth/320,
			        depth: 210,
			        modifier : 1,
			        //shadows : true,
			    },
			    onSlideChangeEnd:function(swiper){
			    	_this.model = swiper.activeSlide().getAttribute("data-model");
			    },
			    onInit:function(swiper){
			    	_this.model = swiper.activeSlide().getAttribute("data-model");
			    }
		    });
		    //homebutton 
		    $(document).on("tap",".home-button",function(event){
		    	event.preventDefault();
		    	_this.getModel();
		    	$("#upload").find(".upload-img").html("<img src='images/img/"+ _this.model +".jpg'/>");
		    	page.changePower("#home","#upload");
		    	$("#bg").html("<img src='images/model/"+ _this.model +"/bg.png'/>");
		    	$("#fixed").html("<img src='images/model/"+ _this.model +"/fixed.png'/>");
		    });
		    //ranks 排行榜
		    $(document).on("tap",".ranks",function(event){
		    	event.preventDefault();
				page.changePower("#home","#list");
				_this.listswiper.reInit();
				_this.listscroll.refresh();
				_this.page_size = 10;
				_this.page_number = 1;
				_this.order_by = "time";
				_this.order_type = 1;
				$("#list").find(".fillter").find(".desc").removeClass("desc");
				$("#list").find(".fillter").find("li").removeClass("active").eq(0).addClass("active");
				_this.getList();
		    });
			//selectswiper
			_this.selectswiper = new Swiper("#select-swiper",{
			    slidesPerView : 3,
			    centeredSlides : true,
			    loop:false,
			    tdFlow: {
			        rotate : 0,
			        stretch :-6,
			        depth: 0,
			        modifier : 1,
			        //shadows : true,
			    },
			    onSlideChangeEnd:function(swiper){
			    	_this.model = swiper.activeSlide().getAttribute("data-model");
			    },
			    onInit:function(swiper){
			    	_this.model = swiper.activeSlide().getAttribute("data-model");
			    }
		    });
		    $(document).on("tap","#select .prev",function(event){
		    	event.preventDefault();
		    	_this.selectswiper.swipePrev();
		    });
		    $(document).on("tap","#select .next",function(event){
		    	event.preventDefault();
		    	_this.selectswiper.swipeNext();
		    });
		    //select
//		    $(document).on("tap","#select .select-button",function(event){
//		    	event.preventDefault();
//		    	_this.getModel();
//		    	$("#upload").find(".upload-img").html("<img src='images/img/"+ _this.model +".jpg'/>");
//		    	page.changePower("#select","#upload");
//		    	$("#bg").html("<img src='images/model/"+ _this.model +"/bg.png'/>");
//		    	$("#fixed").html("<img src='images/model/"+ _this.model +"/fixed.png'/>");
//		    });
			//back
			$(document).on("tap","#upload .back",function(event){
				event.preventDefault();
				page.changePower("#upload","#home");
			});
		
			//back-home
			$(document).on("tap","#result .back-home",function(event){
				event.preventDefault();
				// page.changePower("#result","#home");
				window.location.href="index.html";
			});
		    //选择图片
			// if ( phone.app() == "other" || phone.system() =="Pc" ){
				_this.init1();
				_this.init2();
			// }
			// else{
				// $(document).on("tap",".upload-button",function(event){
				// 	event.preventDefault();
				// 	wx.chooseImage({
				// 	    count: 1, // 默认9
				// 	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				// 	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				// 	    success: function (res) {
				// 	    	if ( window.__wxjs_is_wkwebview ){
				// 		    	wx.getLocalImgData({
				// 				    localId: res.localIds[0], // 图片的localID
				// 				    success: function (res) {
		        // 						delete _this.img_base64;
				// 			        	_this.img_base64 = new Image();
				// 			        	_this.img_base64.onload = function(){
				// 							page.changePower("#upload","#edit");
				// 							_this.putImg();
				// 			        	}
				// 			        	_this.img_base64.src = res.localData.replace('jgp', 'jpeg');
				// 				    }
				// 				});
				// 	    	}
				// 	    	else{
				// 		    	wx.getLocalImgData({
				// 				    localId: res.localIds[0], // 图片的localID
				// 				    success: function (res) {
		        // 						delete _this.img_base64;
				// 			        	_this.img_base64 = new Image();
				// 			        	_this.img_base64.crossOrigin = 'anonymous';
				// 			        	_this.img_base64.onload = function(){
				// 							page.changePower("#upload","#edit");
				// 							_this.putImg();
				// 			        	}
				// 			        	_this.img_base64.src = "data:image/jpeg;base64," + res.localData;
				// 				    }
				// 				});
				// 	    	}
				// 	    }
				// 	});
				// });
				// $(document).on("tap",".reupload",function(event){
				// 	event.preventDefault();
				// 	wx.chooseImage({
				// 	    count: 1, // 默认9
				// 	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				// 	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				// 	    success: function (res) {
				// 	    	if ( window.__wxjs_is_wkwebview ){
				// 		    	wx.getLocalImgData({
				// 				    localId: res.localIds[0], // 图片的localID
				// 				    success: function (res) {
		        // 						delete _this.img_base64;
				// 			        	_this.img_base64 = new Image();
				// 			        	_this.img_base64.onload = function(){
				// 							_this.putImg();
				// 			        	}
				// 			        	_this.img_base64.src = res.localData.replace('jgp', 'jpeg');
				// 				    }
				// 				});
				// 	    	}
				// 	    	else{
				// 		    	wx.getLocalImgData({
				// 				    localId: res.localIds[0], // 图片的localID
				// 				    success: function (res) {
		        // 						delete _this.img_base64;
				// 			        	_this.img_base64 = new Image();
				// 			        	_this.img_base64.crossOrigin = 'anonymous';
				// 			        	_this.img_base64.onload = function(){
				// 							_this.putImg();
				// 			        	}
				// 			        	_this.img_base64.src = "data:image/jpeg;base64," + res.localData;
				// 				    }
				// 				});
				// 	    	}
				// 	    }
				// 	});
				// })
			// };
			//submit
			$(document).on("tap","#edit .submit",function(event){
				event.preventDefault();
				if ( !_this.img_base64 ){
					windowAlert.show("请上传照片");
					return false;
				}
				if ( _this.canvas.toDataURL("image/jpeg",1) == _this.blank ){
					windowAlert.show("图片空白，请重新选择");
					return false;
				}
				// console.log($('#move')[0])
				// console.log($('#move')[0].toDataURL("image/jpeg"))

				var w = $("#edit ").width();
				var h = $("#edit ").height();
				// var _edit=document.getElementById('edit');
				// var w = _edit.getElementsByClassName('box')[0].width;
				// var h = _edit.getElementsByClassName('box')[0].height;
				// console.log(w);
				// console.log(h);
				//要将 canvas 的宽高设置成容器宽高的 2 倍
				var canvas = document.createElement("canvas");
				canvas.width = w * 2;
				canvas.height = h * 2;
				canvas.style.width = w + "px";
				canvas.style.height = h + "px";
				var context = canvas.getContext("2d");
				//然后将画布缩放，将图像放大两倍画到画布上
				context.scale(2,2);
				var _t2=setTimeout(function(){
					var _re = $(window).width() / $('#edit .box').width();
					$('#edit .box').css({'transform':'scale('+_re+')','top':'50%','margin-top':'-50%'});
					$('#edit').css('background','rgba(0,0,0,0)')
					$('#edit').find('.reupload,.tip,.submit,.back,.logo').hide()
					$('#content .content-select').hide()
					// $('#edit').css({'height':$(window).width()*833/566})
					// $('.need-move .scale').css({'height':'auto','bottom':'auto'})
					html2canvas($("#edit")[0], {
						canvas: canvas,
						onrendered: function(canvas) {
							// var img = canvas.toDataURL();
							// $('#result .box img').attr('src',img);
							// $('#result .resultImg img').attr('src',img);
							var _img = new Image();
							_img.src=canvas.toDataURL();

							var _canvas = document.createElement('canvas');
							_ctx = _canvas.getContext('2d');
							_canvas.width =  556*2;
							_canvas.height = 833*2;
							_img.onload = function(){
// 								if(_img.width / _canvas.width > _canvas.width/_canvas.height){
// alert('以长为基准')
// 								}else{
// alert('以宽度为基准')
// 								}
								// var _re = _img.width / _canvas.width;
// console.log(_canvas.width * _img.height / _img.width)
								// console.log(_canvas.width * _img.height / _img.width - _canvas.height)

								// 宽度100%
								_ctx.drawImage(_img,0, '-'+(_canvas.width * _img.height / _img.width - _canvas.height)*0.49 ,_canvas.width, (_canvas.width * _img.height / _img.width)*1.01); 

								// _ctx.drawImage(_img,0, 0 ,_canvas.height / _img.height * _img.width, _canvas.height);
								
// // // // 								// _ctx.drawImage(_img,-78,-63,(_canvas.width)*_re,(_canvas.height)*_re);
								$('#result .box img').attr('src',_canvas.toDataURL());

							}

// // // 							// var img = canvas.toDataURL();
							// $('#result .box img').attr('src',img);
						}
					});
				
					page.changePower("#edit","#result");
					clearTimeout(_t2);
				},1000);

// console.log(_this.model)
				// // _this.shengcheng();
				// _this.img = canvas.toDataURL("image/jpeg",1);
				// var _modelID = _this.model; 	// 模板号

				// // console.log(_this.img)
				// var _img = new Image();
				// _img.src = _this.img;

				// var _coverImg = new Image();
				// _coverImg.src = 'images/model/'+_modelID+'/bg.png';

				// var _coverImg2 = new Image();
				// _coverImg2.src = 'images/model/'+_modelID+'/fixed.png';

				// _modelID = _modelID-1;

				// var resultCanvas = document.createElement('canvas');
				// resultCTX = resultCanvas.getContext('2d');
				// console.log(this.modelData)
				// resultCanvas.width = this.modelData[_modelID].width;
				// resultCanvas.height = this.modelData[_modelID].height;

				// _img.onload = function(){





				// 	// resultCTX.drawImage(_img,modelData.,0,resultCanvas.width,resultCanvas.height);

				// 	// resultCTX.drawImage(img_bas_imge64,parseInt(_this.canvas.width-_this.imgAttr.imgWidth)/2,parseInt(_this.canvas.height-_this.imgAttr.imgHeight)/2,_this.imgAttr.imgWidth,_this.imgAttr.imgHeight);

				// 	resultCTX.drawImage(_img,this.modelData[_modelID].left,this.modelData[_modelID].top,this.modelData[_modelID].width,this.modelData[_modelID].width);

					
				// 	$("#img").html("<img src='"+ resultCanvas.toDataURL("image/jpeg",1) +"'/>");
				// 	page.changePower("#edit","#result");
				// }

				
			});

			//back
			$(document).on("tap","#edit .back",function(event){
				event.preventDefault();
				page.changePower("#edit","#upload");
			});
			//back
			$(document).on("tap","#result .back",function(event){
				event.preventDefault();
				page.changePower("#result","#edit");
			});
			//resultbutton
			$(document).on("tap","#result .result-button",function(event){
				event.preventDefault();
				page.changePower("#result","#list");
				_this.listswiper.reInit();
				_this.listscroll.refresh();
				_this.page_size = 10;
				_this.page_number = 1;
				_this.order_by = "time";
				_this.order_type = 1;
				$("#list").find(".fillter").find(".desc").removeClass("desc");
				$("#list").find(".fillter").find("li").removeClass("active").eq(0).addClass("active");
				_this.getList();
			});
			//listswiper
			var postData = {};
			postData.openid = h6app_userInfo.openid;
			postData.sign = h6app_userInfo.sign;
			$.ajax({
				type:"get",
				url:"http://case.html5case.cn/sunac/getTop5",
				dataType:"json",
				data:postData,
				async:true,
				success:function(data){
					if ( data.code != 1 ){
						return false;
					}
					var html = "";
					for ( var i=0;i<data.data.length;i++ ){
						html += "<div class='swiper-slide list-"+ (i+1) +"' data-model='"+ data.data[i].templet_id +"'><img src='' loadsrc='images/img/"+ data.data[i].templet_id +".jpg'/></div>";
					}
					$("#list-swiper").find(".swiper-wrapper").html(html);
					_this.listswiper = new Swiper("#list-swiper",{
					    slidesPerView : 5,
					    centeredSlides : true,
					    loop:false,
					    tdFlow: {
					        rotate : 30,
					        stretch :110*page.clientWidth/320,
					        depth: 210,
					        modifier : 1,
					        //shadows : true,
					    },
					    onTouchMove:function(swiper){
					    	_this.listscroll.enabled = false;
					    },
					    onTouchEnd:function(swiper){
					    	_this.listscroll.enabled = true;
					    }
				    });
				}
			});
		    _this.listscroll = new IScroll("#list", { probeType: 3, scrollX: false, freeScroll: true,fadeScrollbars:false,resizeScrollbars:false,shrinkScrollbars:'clip',scrollbars: true, scrollbars: 'custom' });
			_this.listscroll.on('scroll',_this.updatePosition);
			_this.listscroll.on('scrollEnd',_this.updatePosition);
		    //go-detail
		    // $(document).on("tap",".ul-list li",function(event){
		    // 	event.preventDefault();
		    // 	var openid = $(this).attr("data-openid");
		    // 	page.changePower("#list","#detail");
		    // 	_this.getInfo(openid,"his");
		    // })
			//back-home
			// $(document).on("tap","#list .back-home",function(event){
			// 	event.preventDefault();
			// 	page.changePower("#list","#home");
			// });
			//back-list
			// $(document).on("tap","#detail .back-list",function(event){
			// 	event.preventDefault();
			// 	page.changePower("#detail","#list");
			// });
			//list-digg
			$(document).on("tap","#list .digg",function(event){
				event.preventDefault();
				event.stopPropagation();
				if ( _this.busy ){
					return false;
				}
				_this.busy = true;
				var div = $(this);
				var number = Number(div.html());
				if ( $(this).hasClass("digged") ){
					var postData = {};
					postData.openid = h6app_userInfo.openid;
					postData.sign = h6app_userInfo.sign;
					postData.img_id = div.attr("data-img");
					$.ajax({
						type:"get",
						url:"http://case.html5case.cn/sunac/cancelDigg",
						data:postData,
						dataType:"json",
						async:true,
						success:function(data){
							if ( data.code != 1 ){
								windowAlert.show(data.msg);
								_this.busy = false;
								return false;
							}
							div.removeClass("digged").html(number-1);
							_this.busy = false;
						},
						error:function(){
							windowAlert.show("网络错误，请重试");
							_this.busy = false;
						}
					});
				}
				else{
					var postData = {};
					postData.openid = h6app_userInfo.openid;
					postData.sign = h6app_userInfo.sign;
					postData.img_id = div.attr("data-img");
					$.ajax({
						type:"get",
						url:"http://case.html5case.cn/sunac/digg",
						data:postData,
						dataType:"json",
						async:true,
						success:function(data){
							if ( data.code != 1 ){
								windowAlert.show(data.msg);
								_this.busy = false;
								return false;
							}
							div.addClass("digged").html(number+1);
							_this.busy = false;
						},
						error:function(){
							windowAlert.show("网络错误，请重试");
							_this.busy = false;
						}
					});
				
				}
			});
			//change order type
			$(document).on("tap",".fillter li",function(event){
				event.preventDefault();
				var index = $(this).index();
				if ( index == 0 || index == 1 ){
					switch ( index ){
						case 0:
							_this.order_by = "time";
							break;
						case 1:
							_this.order_by = "hot";
							break;
					}
					if ( $(this).hasClass("active") ){
						if ( $(this).find("span").hasClass("desc") ){
							$(this).find("span").removeClass("desc");
							_this.order_type = 1;
						}
						else{
							$(this).find("span").addClass("desc");
							_this.order_type = 2;
						}
					}
					else{
						$(this).addClass("active").siblings().removeClass("active");
						$(this).siblings().find("span").removeClass("desc");
					}
					if ( index == 0 ){
						$(".ul-list").removeClass("my-list").find(">p").siblings().remove();
					}
					else{
						$(".ul-list").addClass("my-list").find(">p").siblings().remove();
					}
					_this.page_number = 1;
					_this.getList();
				}
				else{
					if ( $(this).hasClass("active") ){
						return false;
					}
					$(this).addClass("active").siblings().removeClass("active");
					$(".ul-list").addClass("my-list").find(">p").siblings().remove();
					_this.getInfo(h6app_userInfo.openid,"my");
				}
			})
			//detail-digg
			// $(document).on("tap","#detail .detail-digg span",function(event){
			// 	event.preventDefault();
			// 	if ( _this.busy ){
			// 		return false;
			// 	}
			// 	_this.busy = true;
			// 	var div = $(this);
			// 	var number = Number(div.html());
			// 	if ( $(this).hasClass("digged") ){
			// 		var postData = {};
			// 		postData.openid = h6app_userInfo.openid;
			// 		postData.sign = h6app_userInfo.sign;
			// 		postData.img_id = _this.detailswiper.activeSlide().getAttribute("data-img");
			// 		$.ajax({
			// 			type:"get",
			// 			url:"http://case.html5case.cn/sunac/cancelDigg",
			// 			data:postData,
			// 			dataType:"json",
			// 			async:true,
			// 			success:function(data){
			// 				if ( data.code != 1 ){
			// 					windowAlert.show(data.msg);
			// 					_this.busy = false;
			// 					return false;
			// 				}
			// 				div.removeClass("digged").html(number-1);
			// 				_this.detailswiper.activeSlide().setAttribute("data-digg",number-1);
			// 				_this.detailswiper.activeSlide().setAttribute("data-isdigg",0);
			// 				_this.busy = false;
			// 				var divs = $(".ul-list").find(".digg[data-img="+ _this.detailswiper.activeSlide().getAttribute("data-img") +"]");
			// 				divs.removeClass("digged").html(number-1);
			// 			},
			// 			error:function(){
			// 				windowAlert.show("网络错误，请重试");
			// 				_this.busy = false;
			// 			}
			// 		});
			// 	}
			// 	else{
			// 		var postData = {};
			// 		postData.openid = h6app_userInfo.openid;
			// 		postData.sign = h6app_userInfo.sign;
			// 		postData.img_id = _this.detailswiper.activeSlide().getAttribute("data-img");
			// 		$.ajax({
			// 			type:"get",
			// 			url:"http://case.html5case.cn/sunac/digg",
			// 			data:postData,
			// 			dataType:"json",
			// 			async:true,
			// 			success:function(data){
			// 				if ( data.code != 1 ){
			// 					windowAlert.show(data.msg);
			// 					_this.busy = false;
			// 					return false;
			// 				}
			// 				div.addClass("digged").html(number+1);
			// 				_this.detailswiper.activeSlide().setAttribute("data-digg",number+1);
			// 				_this.detailswiper.activeSlide().setAttribute("data-isdigg",1);
			// 				_this.busy = false;
			// 				var divs = $(".ul-list").find(".digg[data-img="+ _this.detailswiper.activeSlide().getAttribute("data-img") +"]");
			// 				divs.addClass("digged").html(number+1);
			// 			},
			// 			error:function(){
			// 				windowAlert.show("网络错误，请重试");
			// 				_this.busy = false;
			// 			}
			// 		});
				
			// 	}
			// });
			//textarea
			$(document).on("keyup","#content textarea",function(){
				var textarea = $(this)[0];
				textarea.style.height = _this.currentModel.text.lineHeight*_this.ratio + "px";
				textarea.style.height = textarea.scrollHeight + 'px';
				document.getElementById("content-select").value = "请选择预置文案";
			})
			$(document).on("focus","#content textarea",function(){
				var value = this.value;
				if ( value == _this.currentModel.text.text ){
					this.value = "";
				}
			})
//			$(document).on("tap","#content textarea",function(event){
//				event.preventDefault();
//				event.stopPropagation();
//				this.focus();
//				setCaretPosition(this, this.value.length);
//			})
			$(document).on("tap","#content-select",function(event){
				event.preventDefault();
				event.stopPropagation();
				this.focus();
			})
			$(document).on("change","#content-select",function(event){
				event.preventDefault();
				var text = this.value;
				$("#content").find("textarea").val(text);
			})
			//share
			$(document).on("tap","#share .ido",function(event){
				event.preventDefault();
				page.changePower("#share","#home");
				_this.homeswiper.reInit();
				page.changePower(0,"#text",function(){
					gif.playing = true;
					window.requestNextAnimationFrame(animate);
				});
			})
			//share-digg
			$(document).on("tap","#share .share-digg",function(event){
				event.preventDefault();
				if ( _this.busy ){
					return false;
				}
				_this.busy = true;
				var div = $(this);
				if ( $(this).hasClass("share-digged") ){
					var postData = {};
					postData.openid = h6app_userInfo.openid;
					postData.sign = h6app_userInfo.sign;
					postData.img_id = div.attr("data-img");
					$.ajax({
						type:"get",
						url:"http://case.html5case.cn/sunac/cancelDigg",
						data:postData,
						dataType:"json",
						async:true,
						success:function(data){
							if ( data.code != 1 ){
								windowAlert.show(data.msg);
								_this.busy = false;
								return false;
							}
							_this.busy = false;
							div.removeClass("share-digged");
						},
						error:function(){
							windowAlert.show("网络错误，请重试");
							_this.busy = false;
						}
					});
				}else{
					var postData = {};
					postData.openid = h6app_userInfo.openid;
					postData.sign = h6app_userInfo.sign;
					postData.img_id = div.attr("data-img");
					$.ajax({
						type:"get",
						url:"http://case.html5case.cn/sunac/digg",
						data:postData,
						dataType:"json",
						async:true,
						success:function(data){
							if ( data.code != 1 ){
								windowAlert.show(data.msg);
								_this.busy = false;
								return false;
							}
							_this.busy = false;
							div.addClass("share-digged");
						},
						error:function(){
							windowAlert.show("网络错误，请重试");
							_this.busy = false;
						}
					});
				
				}
			});
			$(document).on("tap","#list .share",function(event){
				event.preventDefault();
				page.changePower(0,"#share-shade");
			})
			$(document).on("tap","#share-shade",function(event){
				event.preventDefault();
				page.closePower("#share-shade");
			})
		},
		modelData:[
			
			// {"id":1,"width":848,"height":1372,"left":0,"top":0,"round":false,
			{"id":1,"width":556,"height":833,"left":0,"top":0,"round":false,
				"text":{"text":"心有多大\n舞台，\n就有多大","fontSize":20,"lineHeight":25,"textLeft":350,"textTop":600,"length":6,"color":"#fff","textAlgin":"left","fontWeight":"bold"},
				
			},
			{"id":2,"width":456,"height":500,"left":50,"top":270,"round":false,
				"text":{"text":"以匠心作品 推动平湖生活品质发展","fontSize":18,"lineHeight":20,"textLeft":50,"textTop":780,"length":23,"color":"#585858","textAlgin":"left","fontWeight":"bold"}
			},
			// {"id":2,"width":776,"height":776,"left":36,"top":36,"round":false,
			// 	"drag":[
			// 		{"id":1,"width":298,"height":124,"left":432,"top":614}
			// 	]
			// },
			{"id":3,"width":406,"height":782,"left":130,"top":25,"round":false,
				
			},
			{"id":4,"width":407,"height":407,"left":73,"top":210,"round":true,
				"text":{"text":"爱自己 爱家人 爱朋友","fontSize":18,"lineHeight":20,"textLeft":110,"textTop":640,"length":18,"color":"#323333","textAlgin":"center","fontWeight":"bold"},
				
			},
			{"id":5,"width":556,"height":833,"left":0,"top":0,"round":false,
				"text":{"text":"只要心中有梦想 你就会与众不同","fontSize":18,"lineHeight":20,"textLeft":30,"textTop":220,"length":25,"color":"#fff","textAlgin":"center","fontWeight":"bold"}
			},
			// {"id":5,"width":752,"height":736,"left":48,"top":48,"round":false,
			// 	"text":{"text":"用伟大的作品\n赞美伟大的时代","fontSize":30,"lineHeight":44,"textLeft":220,"textTop":1114,"length":12.5,"color":"#808080","textAlgin":"center","fontWeight":"bold"}
			// },
			{"id":6,"width":556,"height":624,"left":0,"top":30,"round":false,
				"text":{"text":"我不做别人的配角，只做自己的主角","fontSize":15,"lineHeight":20,"textLeft":150,"textTop":750,"length":20,"color":"#808080","textAlgin":"left","fontWeight":"bold"}
			},
			{"id":7,"width":556,"height":833,"left":0,"top":0,"round":false,
				"text":{"text":"为平湖的明天，构筑美好的城市理想","fontSize":16,"lineHeight":20,"textLeft":30,"textTop":730,"length":28,"color":"#fff","textAlgin":"left","fontWeight":"bold"},
				
			},
			{"id":8,"width":456,"height":590,"left":50,"top":45,"round":false,
				"text":{"text":"不为凡事恼 健康快乐每一天","fontSize":18,"lineHeight":20,"textLeft":70,"textTop":720,"length":22,"color":"#2b2b2b","textAlgin":"center","fontWeight":"bold"}
			},
			{"id":9,"width":496,"height":450,"left":30,"top":30,"round":false,
				// "text":{"text":"预测未来最好的方法\n就是去创造未来","fontSize":32,"lineHeight":38,"textLeft":102,"textTop":282,"length":12.5,"color":"#585858","textAlgin":"left","fontWeight":"bold"}
			},
			{"id":10,"width":556,"height":833,"left":0,"top":0,"round":false,
				"text":{"text":"越坚持越幸运\n人生贵在坚持","fontSize":18,"lineHeight":30,"textLeft":50,"textTop":630,"length":12,"color":"#fff","textAlgin":"left","fontWeight":"bold"},
				
			},
			{"id":11,"width":456,"height":483,"left":50,"top":140,"round":false,
				"text":{"text":"我享受惬意的生活 也需要与时俱进","fontSize":15,"lineHeight":18,"textLeft":80,"textTop":700,"length":28,"color":"#fff","textAlgin":"center","fontWeight":"bold"}
			},
			{"id":12,"width":440,"height":525,"left":116,"top":308,"round":false,
				"text":{"text":"洞悉平湖的抱负与骄傲\n共同见证世界的蜕变","fontSize":18,"lineHeight":30,"textLeft":270,"textTop":190,"length":15,"color":"#0381a2","textAlgin":"left","fontWeight":"bold"}
			},
			// {"id":13,"width":745,"height":1061,"left":51,"top":43,"round":false,
			// 	"text":{"text":"小小的爱 也有力量","fontSize":32,"lineHeight":44,"textLeft":200,"textTop":1022,"length":12.5,"color":"#fff","textAlgin":"center","fontWeight":"bold"},
			// 	"drag":[
			// 		{"id":1,"width":745,"height":96,"left":51,"top":1009}
			// 	]
			// },
			// {"id":14,"width":848,"height":904,"left":0,"top":0,"round":false,
			// 	"text":{"text":"有非凡志向 才有非凡成就","fontSize":30,"lineHeight":44,"textLeft":230,"textTop":1092,"length":12.5,"color":"#808080","textAlgin":"left","fontWeight":"bold"}
			// },
			// {"id":15,"width":687,"height":668,"left":79,"top":583,"round":false,
			// 	"text":{"text":"给爸爸妈妈打CALL！","fontSize":30,"lineHeight":36,"textLeft":284,"textTop":490,"length":12.5,"color":"#808080","textAlgin":"left","fontWeight":"bold"}
			// },
			// {"id":16,"width":720,"height":792,"left":63,"top":51,"round":false,
			// 	"text":{"text":"这个世界就是靠\n有梦想的人去推动的","fontSize":28,"lineHeight":40,"textLeft":232,"textTop":1156,"length":12.5,"color":"#901d31","textAlgin":"center","fontWeight":"bold"}
			// },
			// {"id":17,"width":673,"height":717,"left":89,"top":583,"round":false,
			// 	"text":{"text":"用心用情 让美好一直发生","fontSize":28,"lineHeight":36,"textLeft":220,"textTop":390,"length":12.5,"color":"#a08075","textAlgin":"center","fontWeight":"bold"}
			// },
			// {"id":18,"width":714,"height":759,"left":69,"top":54,"round":false,
			// 	"text":{"text":"谢谢曾经努力的自己\nThanks for efforts before","fontSize":28,"lineHeight":36,"textLeft":58,"textTop":1070,"length":15.5,"color":"#585858","textAlgin":"left","fontWeight":"bold"}
			// },
			// {"id":20,"width":848,"height":1122,"left":0,"top":0,"round":false},
			// {"id":19,"width":704,"height":637,"left":71,"top":436,"round":false,
			// 	"text":{"text":"无问西东 献给每一个珍贵的你","fontSize":30,"lineHeight":46,"textLeft":196,"textTop":1194,"length":16.5,"color":"#fff","textAlgin":"left","fontWeight":"bold"},
			// 	"drag":[
			// 		{"id":1,"width":691,"height":49,"left":76,"top":1196}
			// 	]
			// }
		],
		text:[
			"请选择预置文案",
			"融创，一起2018",
			"寻找时代足迹，开启归心旅程",
			"万物有形，归心无限",
			"让我们以脚步丈量意志的强度",
			"跨越心的屏障，将爱心传递",
			"未来，为我而来",
			"自信的生命最美丽",
			"融汇时代匠心，缔造城市传奇",
			"无问西东，勇往直前",
			"有希望在的地方，痛苦也成欢乐",
			"一种引以为傲的融创范儿"
		],
		errText:["阿扁", "办理文凭", "办理证件", "暴力拆迁", "藏独", "陈水扁", "成人电影", "成人片", "出售假币", "出售枪支", "出售手枪", "春药", "催情药", "达赖", "大法", "大纪元", "大学骚乱", "戴海静", "帝国之梦", "第五代领导", "赌博", "短信群发器", "对日强硬", "恶搞晚会", "我是小狗", "反共", "反华", "反民主", "反政府", "高干子弟", "高干子女", "高校暴乱", "高校群体事件", "高校骚乱", "古方迷香", "官商勾结", "鬼村", "胡耀邦", "换妻", "黄色小电影", "昏药", "激情小电影", "佳静安定片", "监听王", "江必新", "疆独", "近親相姦", "禁书", "军长发威", "黎阳平", "李洪志", "六合彩", "六四事件", "卢跃刚", "轮奸", "麻醉钢枪", "麻醉枪", "麻醉药", "麻醉乙醚", "买卖枪支", "毛一鲜", "蒙汗药粉", "迷昏药", "迷奸药", "迷药", "拍肩神药", "盘古乐队", "前门地区改造", "枪决女犯", "枪决现场", "枪支弹药", "强奸", "强效失意药", "强硬发言", "窃听器", "窃听器材", "肉棍", "三唑仑", "色情服务", "色情小电影", "身份证生成器", "升达毕业证", "十七届常委", "手机复制", "四川大学江安校区", "宋平一句话", "台独", "特码", "天安门事件", "天鹅之旅", "通货膨胀", "投毒杀人", "透视眼镜", "退党", "无界浏览器", "西藏天葬", "西山会议", "小穴", "新唐人", "血腥图片", "摇头丸", "乙醚", "淫靡", "淫水", "远程偷拍", "张小平", "赵紫阳", "侦探设备", "真善忍", "政治风波", "中共高干", "中共激烈内斗", "中共近期权力斗争", "中共权力斗争", "中共十七布局", "中共十七常委名单", "中共十七人选", "中共心中最大的恐惧", "中国储君", "中国改革年代政治斗争", "中国高层权力斗争", "中国高层人事变动解读", "中国三大流氓职业", "中国太子", "中国政坛", "明日之星", "中国政坛", "清华帮", "盛极而衰", "中南海波澜起伏", "中南海大决战", "中南海的权力游戏", "中南海斗争", "中南海高层权力斗争", "中南海惊现东宫小朝廷", "中南海秘闻", "中南海内斗", "中南海浓云密布", "中南海权力斗争", "中央警卫局大换血", "中央派系斗争", "中央十七", "中央团系", "中央政治局推荐人选", "子女任职名单", "自杀手册", "自杀指南", "自制手枪", "总书记的红人", "物价上涨", "性药品", "性病", "胡锦涛", "***", "吴邦国", "温家宝", "贾庆林", "罗干", "李长春", "习近平", "李克强", "贺国强", "周永康", "李鹏", "朱镕基", "张德江", "汪洋", "黄华华", "刘玉浦", "朱明国", "黄龙云", "胡泽君", "朱小丹", "肖志恒", "辛国荣", "林雄", "梁伟发", "周镇宏", "许宗衡", "白天", "谭国箱", "李意珍", "王穗明", "崔晓汉", "戴北方", "李锋", "王京生", "刘应力", "吕锐锋", "王毅", "毛主席复活", "先烈的电话", "江姐问", "董存瑞问", "杨子荣问", "被阿扁推翻了", "杨白劳问", "自由门", "无界浏览", "加密浏览", "代理上网", "游行", "示威", "进京上访", "自杀", "爆炸", "炸毁", "放弃早期承诺", "声明", "中央军委扩大会议", "专业快速深户咨询", "快速办理深户咨询", "深圳红印户口咨询", "针孔摄像头", "针孔摄像机", "枪支", "蒙汗药", "爆炸物", "雷管制造技术", "炸药制作方法", "核弹制作方法", "核武器制作方法", "收视卡", "电子解码器", "发帖机", "信息群发器", "代办证件", "办证", "电视解密", "电视共享", "针孔", "窃听", "透视", "隐型耳机", "群发器", "枪", "弓弩", "迷情粉", "催情", "迷昏", "迷魂", "迷幻", "迷情", "迷魂药", "钢珠枪", "弩枪", "强力弩枪", "麻醉抢", "仿真手枪", "刚珠枪", "猎枪", "雷管制造", "炸弹", "火药", "炸弹物", "代开发票", "假币", "代开增值税", "手机改号软件", "手枪", "蒙独", "高句丽", "渤海国", "九评", "法轮", "法一轮", "太比力克", "国际公法", "國際公法", "解放军301医院", "最后的兵团", "猎头者", "保姆日记", "双面女友", "动画-小羊肖恩", "笑笑羊", "实际神", "大法洪传", "弘法会", "灵修团体", "五套法", "宇宙最高法理", "珐论大珐", "世纪大案", "世纪血腥", "伊波拉", "绝世遗言", "独臂老人", "睁开慧眼", "百志", "双面胶", "功友", "法轮功", "大陆同修", "法?轮?功", "洗瑙", "李大师", ".江浙民.", "法正人间", "法正乾坤", "正法时期", "海外护法", "洪法交流", "老虎机", "赌", "扑克", "赌球", "赌马", "三公", "外围", "赌恒指", "庄家", "赔率", "盘口", "下盘", "肖中特", "香港六合彩总公司", "香港六合彩", "香港赛马会", "香港赛马会六合网", "香港赛马会大型六合彩资讯网", "香港皇马科技有限公司", "香港捷通3C科技有限公司", "香港华典数码3C集团", "香港恒海国际科技有限公司", "香港永和电子国际科技有限公司", "香港新通豪科技有限公司", "蚁力神", "春运", "呼尔浩特枪击", "王志平", "关六如", "转让火车票", "潮州性奴", "钱东镇", "四川猎杀大熊猫案", "国家英语四级试题", "国家英语六级试题", "全国人民代表大会", "人大常委", "人大代表", "人大会议", "新生网", "天安门", "共产主义", "共产党", "中共", "反革命", "盗取", "绕过封锁", "新疆独立", "西藏独立", "民运分子", "打倒", "推翻", "多党执政", "专制", "国民党", "六四19周年", "广场上的热血", "历史的伤口", "大跃进50周年", "知识青年上山下乡运动40周年", "改革开放30周年", "出售K粉", "冰毒", "海洛因", "麻古", "毒品配方", "麻古制作方法", "麻古制作工艺", "麻古制作技术", "冰毒制作方法", "冰毒制作工艺", "冰毒制作技术", "冰毒配方讲解光盘", "吗啡", "4号", "红K", "鸦片", "甲基苯丙胺（冰毒）", "大麻", "可卡因", "曲马多", "异丙嗪", "丁丙诺啡", "地西泮", "二乙酰吗啡", "LSD", "醋酸酐", "麻黄素", "罂粟", "罂粟籽", "冰毒片", "甲基安非他明", "唠嗑药", "抢劫药", "强奸药", "马药", "麻药", "疯药", "广古", "缅古", "丙酮", "氯胺酮", "Ketamine", "盐酸氯胺酮", "盐酸", "氨水", "无水乙醇", "活性碳", "盐酸羟亚胺", "MDMA", "氢氧化钠", "赤磷", "去氧麻黄碱", "甲基苯丙胺", "盐酸去氧麻黄碱", "我们自杀吧", "渊盖苏文", "大祚荣", "太王四神记", "朱蒙", "朱蒙IN英语", "VOA采访热比娅", "完全自杀手册", "淫荡", "催眠", "叫床", "**", "女优", "好色", "妓女", "小杜", "小电影", "屄", "应召女郎", "应招", "情爱", "情网", "情色", "成人教育", "成人网站", "风流", "阴户", "阴唇", "阴茎", "阴蒂", "激情图片", "激情电影", "成人小说", "口交", "乱伦", "手淫", "做鸡", "裸体", "麻醉", "中国领导人的最强阵容", "锦涛和阿扁的对联", "日本的言论", "福娃变换角度", "毛主席和小平的对话", "自制固体火箭全过程", "我希望中国能有这样一道测试题", "中国是全球唯一绝对不能惹的国家", "刘德华与胡哥的对话", "性教育,A级片毛片下载男男影院,男男激情,看片区", "性图片区艳情小说古装情欲力作男女激情片下载", "免费艳情淫秽小说淫秽bt电影淫秽图片", "日好色女成人网bt色情电影色情小电影", "各类枪枝及防身器", "制作原子弹的方法", "香港强效迷幻GHB水", "致人大代表的信", "透视中国现代民谣", "邓小平的预言", "CT透视器银行卡复制器", "手机追踪", "西藏暴动", "手枪的制作工艺流程", "卖炸药", "《神灯》", "奥运五福娃邪恶版", "四大怪事", "文盲", "大规模反中游行", "英语四六八级", "讨薪", "共产党说反腐", "《马前课》", "李庆善", "邓善红", "官商暴利", "《花木兰》", "集资骗局", "林龙飞", "孙悟空与阿西娜的故事", "《仙笛》", "曾国华", "淫浪", "阴部", "蚁力神公司", "养殖蚂蚁", "李玉书", "环三亚甲基三硝氨", "大乌拉尔", "炸弹遥控器", "毒素", "万里大造林", "四大扯蛋", "奥运会徽车祸版", "张思卿", "大陆高干子女名单", "G点", "杨汝岱", "集体静坐", "加油机干扰器", "袭击", "秘密串联", "雷管", "黑社会", "SARS", "南通儿童福利院", "张衡生冻毙", "新疆克拉玛依火灾", "李其炎", "突厥革命", "灭亡中国", "出海保钓", "制式54式", "张宗海", "邓小平讲英语", "小口径步枪", "军用枪支", "巴西预言家", "酣乐欣", "手机跟踪定位器", "岳岐峰", "黄菊", "恐怖分子", "倒卖土地", "推翻共产党", "《推背图》", "CT透视器", "陈慕华", "李泽民", "床戏", "李纪周", "沪霸天", "布赫", "李锡铭", "厕所男女标识", "南京大屠杀", "奥运火炬吹灭", "假钞", "燃烧弹", "广州火车站", "双管猎枪", "暴政 独 裁", "万能钥匙", "古方化骨水", "差额选举", "监听器", "银行卡复制器", "万能开锁器", "手表式作弊器", "定制消失笔", "高低压三箭", "瘟假报", "胡紧掏", "奥运火炬传递", "吉瑟利努", "呼和浩特市委副书记", "http://youyuanderen.ys168.com/", "出售迷魂药", "上岛保钓", "《九jiu评》", "血本无归", "基地组织", "暴动", "流感大变种", "抗议", "陶驷驹", "中国断交", "叶选平", "二氧化碳动力气枪", "地磅干扰器", "无线影音发射器", "奥运会开幕式", "手机截听器", "总输记", "屏蔽器", "声明退出中国少先队", "十七大人大代表", "李灏", "邪恶中共", "空军会议", "赵志浩", "王忍之", "大地震", "奶头", "炸药的合成", "卢瑞华", "早泄", "八大谎言", "三反五反杀地主", "藏字石", "恐怖袭击", "奥运吉祥物", "迷昏香烟", "强震海啸", "三朝天子", "李贵鲜", "淫欲", "电子地磅解码器", "讲话摘录", "《梅花诗》", "内蒙古", "五大原则", "厉有为", "二手老虎机", "手机窃听器", "恽代英", "先烈来电", "三个三代表", "QQ:594437184", "无线监听工具", "邪党", "陈敏章", "七大谎言", "上访", "无耻语录排行榜", "廖晖", "全树仁", "中-国-共-产-党-亡", "《圣经启示录》", "毛主席复活后", "自制固体火箭", "李伯勇", "氰化钠", "伍绍祖", "葛洪升", "苦难的中国", "陈相贵", "制造炸弹", "遥控炸弹", "沙菲片", "邵奇惠", "氰化钾", "硝酸甘油炸药制造", "改革六大成绩", "监视器偷拍", "中国平安", "私下肮脏的交易", "平安保险", "中国国际战略研究网", "两会十大废话议案", "C4", "鸿泰数码科技", "张鼎丞", "张国堂", "《玛雅预言》", "魔鬼政治词典", "摘取器官", "本.拉登", "胡主席", "赌博透视器", "杀知识分子", "文革杀资产阶级", "麻醉手枪", "钢珠手枪", "手雷", "手榴弹", "乳房", "炸药配方", "毒残酷迫", "中共解体", "徐其耀", "简易炸蛋制作方法", "老胡", "李子彬", "田纪云", "五连猎枪", "乳头", "政府说为人民服务", "老温", "导弹DIY", "钱冠林", "64杀学生", "吴国庆", "自愿想退出", "少先队员", "团员", "党员", "蚁力神非法集资案", "刑讯逼供", "全国二奶大赛揭晓", "九jiu评", "秋香版", "宋平", "声明退出", "太子党名单", "代考上网文凭", "毛致用", "代考", "国外文凭", "电视剧《朱蒙》", "社保基金案", "《诸世纪》", "两性淫乱", "公安部春节晚会", "清明节", "杀手", "工字牌气枪", "胡乔木", "陈锦华", "王汉斌", "朱森林", "十大无耻发言", "外蒙古", "宁波办证", "毛主席", "女税务干部", "2008全球春节晚会", "隐身装备", "代办全国毕业学历", "十大丑陋语录", "激情下载", "陈冠希", "畲祥林冤案", "包尔汉", "六大成绩", "杜导斌", "精典黄色短信", "荒唐禁令", "全自动步枪", "吕绣莲", "麻姑", "全套艳照门", "高压麻醉枪", "福娃变乌龟", "共残拳", "骚乱", "包娼包赌", "黑索今", "杨枫", "邓宝驹", "讨要工钱", "GHB", "浩宇高等教育学历", "地震海啸", "亡国亡党", "彭定鼎", "中国印", "射精", "迷药防身药水", "朱学勤", "税务代理", "免费淫奸黄色电影", "黄色妹妹a级大片", "弹簧压气", "温云松", "原子弹", "挤踏身亡", "香港GHB水", "色粉", "按摩女", "王子淫传", "美妹", "阴囊", "操", "枪械", "子弹", "香港保钓会", "定时炸弹", "毛远新", "卢嘉锡", "曾庆红", "刘少奇", "做爱", "毛新宇", "吕秀莲", "温总理", "股灾空难", "入联公投", "《九剑》", "迷香", "最强领导人", "地下的先烈们", "友邦正通学历", "无线窃听器", "曾道人", "服务中心代办", "迷幻药", "钓鱼岛", "赌博作弊工具", "黑色11月", "天线宝宝马报","维权","漏水","差评","垃圾","暴露","裸露","违规","设计缺陷","违约","垃圾","噪音","拿地","虚假宣传","欺诈销售","贾跃亭","老贾"],
		getModel:function(){
			var _this = this;
			for ( var i=0;i<_this.modelData.length;i++ ){
				if ( _this.model == _this.modelData[i].id ){
					delete _this.currentModel;
					_this.currentModel = _this.modelData[i];
					break;
				}
			}
		},
		init1:function(){
			var _this = this;
			var div = $("#upload").find(".upload-button");
			div.find("input").remove();
			if ( phone.system() == "Android" ){
				div.append("<input type='file' accept='image/*' class='upload' />");
			}
			else{
				div.append("<input type='file' accept='image/jpg,image/jpeg,image/gif,image/png' class='upload' />");
			}
		    div.find(".upload").makeThumb({
		        // width: 848,
		        // height: 1372,
		        width: 556,
		        height: 833,
		        success: function(dataURL, tSize, file, sSize, fEvt) {
		        	delete _this.img_base64;
		        	_this.img_base64 = new Image();
		        	_this.img_base64.onload = function(){
						page.changePower("#upload","#edit");
						_this.putImg();
		        	}
	        		_this.img_base64.src = dataURL;
					_this.init1();
		        }
		    });
		},
		init2:function(){
			var _this = this;
			var div = $("#edit").find(".reupload");
			div.find("input").remove();
			if ( phone.system() == "Android" ){
				div.append("<input type='file' accept='image/*' class='upload' />");
			}
			else{
				div.append("<input type='file' accept='image/jpg,image/jpeg,image/gif,image/png' class='upload' />");
			}
		    div.find(".upload").makeThumb({
		        // width: 848,
		        // height: 1372,
		        width: 556,
		        height: 833,
		        success: function(dataURL, tSize, file, sSize, fEvt) {
		        	delete _this.img_base64;
		        	_this.img_base64 = new Image();
		        	_this.img_base64.onload = function(){
						_this.putImg();
		        	}
	        		_this.img_base64.src = dataURL;
					_this.init2();
		        }
		    });
		},
		position1:function(bigsrc){
			var _this = this;
	        var imgwidth = bigsrc.width;
	        var imgheight = bigsrc.height;
	        var parentwidth = _this.canvas.width;
	        var parentheight = _this.canvas.height;
	        if( imgwidth <= parentwidth){
	            if( parentwidth / imgwidth * imgheight >= parentheight ) {
	                imgheight = imgheight / (imgwidth / parentwidth);
	                imgwidth = parentwidth;
	            }
	            else{
	                imgwidth = imgwidth / (imgheight / parentheight);
	                imgheight = parentheight;
	            }
	        }
	        else{
	            if( parentwidth / imgwidth * imgheight <= parentheight ) {
	                imgwidth = imgwidth / (imgheight / parentheight);
	                imgheight = parentheight;
	            }
	            else{
	                imgheight = imgheight / (imgwidth / parentwidth);
	                imgwidth = parentwidth;
	            }
	        }
	        return {"width" : imgwidth, "height" : imgheight, "left" : (parentwidth - imgwidth) / 2, "top" : (parentheight - imgheight) / 2};
		},
		imgAttr:{},
		putImg:function(){
			var _this = this;
			// var width = 848;
			// var height = 1372;
			var width = 556;
			var height = 833;
			var boxwidth = $("#edit").find(".box").width();
			_this.ratio = boxwidth/width;
			if ( !_this.canvas ){
				_this.canvas = document.getElementById("canvas");
			}
			_this.canvas.width = _this.currentModel.width;
			_this.canvas.height = _this.currentModel.height;
			$(_this.canvas).css({"left":_this.currentModel.left*_this.ratio,"top":_this.currentModel.top*_this.ratio,"width":_this.currentModel.width*_this.ratio,"height":_this.currentModel.height*_this.ratio});
			$("#move").css({"left":_this.currentModel.left*_this.ratio,"top":_this.currentModel.top*_this.ratio,"width":_this.currentModel.width*_this.ratio,"height":_this.currentModel.height*_this.ratio});
			if ( !_this.ctx ){
				_this.ctx = _this.canvas.getContext("2d");
			}
			_this.blank = _this.canvas.toDataURL("image/jpeg",1);
			_this.ctx.clearRect(0,0,_this.canvas.width,_this.canvas.height);
			var rect = _this.position1(_this.img_base64);
    		_this.imgAttr.imgLeft = 0;
    		_this.imgAttr.imgTop = 0;
    		_this.imgAttr.imgScale = 1;
    		_this.imgAttr.imgRotation = 0;
    		_this.imgAttr.imgPositionX = 0;
    		_this.imgAttr.imgPositionY = 0;
    		_this.imgAttr.imgWidth = rect.width;
    		_this.imgAttr.imgHeight = rect.height;
    		_this.ctx.save();
    		if ( _this.currentModel.round ){
    			_this.ctx.fillStyle = "rgba(255,255,255,0)";
    			_this.ctx.arc(_this.canvas.width/2,_this.canvas.height/2,_this.canvas.width/2,0,2*Math.PI);
    			_this.ctx.fill();
    			_this.ctx.clip();
    		}
	        _this.ctx.drawImage(_this.img_base64,parseInt(_this.canvas.width-_this.imgAttr.imgWidth)/2,parseInt(_this.canvas.height-_this.imgAttr.imgHeight)/2,_this.imgAttr.imgWidth,_this.imgAttr.imgHeight);
    		_this.ctx.restore();
	        $("#content").remove();
	        if ( _this.currentModel.text ){
	        	var html = "";
	        	for ( var i=0;i<_this.text.length;i++ ){
	        		html += "<option value='"+ _this.text[i] +"'>"+ _this.text[i] +"</option>";
	        	}
	        	$("#move").after("<div id='content' style='left:"+ _this.currentModel.text.textLeft*_this.ratio +"px;top:"+ _this.currentModel.text.textTop*_this.ratio +"px'><textarea style='font-size:"+ _this.currentModel.text.fontSize*_this.ratio +"px;line-height:"+ _this.currentModel.text.lineHeight*_this.ratio +"px;color:"+ _this.currentModel.text.color +";width:"+ _this.currentModel.text.fontSize*_this.ratio*_this.currentModel.text.length +"px;text-align:"+ _this.currentModel.text.textAlgin +";font-weight:"+ _this.currentModel.text.fontWeight +"' maxlength='20' rows='3'>"+ _this.currentModel.text.text +"</textarea><div class='content-select'><select id='content-select'>"+ html +"</select></div></div>");
				var textarea = $("#content").find("textarea")[0];
				textarea.style.height = _this.currentModel.text.lineHeight*_this.ratio + "px";
				textarea.style.height = textarea.scrollHeight + 'px';
	        	$("#content").drag({  
	                before: function(e) {},  
	                process: function(e) {},  
	                end: function(e) {}  
	           });
	        	$(".tip").removeClass("tips");
	        }
	        else{
	        	$(".tip").addClass("tips");
	        }
	        $("#edit").find(".move").remove();
	        if ( _this.currentModel.drag ){
	        	var html = "";
	        	for ( var i=0;i<_this.currentModel.drag.length;i++ ){
	        		html += "<div class='move' style='left:"+ _this.currentModel.drag[i].left*_this.ratio +"px;top:"+ _this.currentModel.drag[i].top*_this.ratio +"px;width:"+ _this.currentModel.drag[i].width*_this.ratio +"px;height:"+ _this.currentModel.drag[i].height*_this.ratio +"px'><img src='images/model/"+ _this.model +"/"+ _this.currentModel.drag[i].id +".png'/></div>";
	        	}
	        	$("#move").after(html);
	        	$("#edit").find(".move").each(function(){
		        	$(this).drag({  
		                before: function(e) {},  
		                process: function(e) {},  
		                end: function(e) {}  
		            });
	        	})
	        }
		},
		imgarr:{},
		download:function(src,name){
			var _this = this;
			var img = new Image();
			img.crossOrigin = 'anonymous';
			img.onload = function(){
				_this.imgarr[name] = img;
				_this.complete();
			};
			img.onerror = function(){
				windowAlert.close("加载图片时发生错误");
				_this.busy = false;
			}
			img.src = src;
		},
		shengcheng:function(){
			var _this = this;
			// for ( var key in _this.imgarr ){
			// 	delete _this.imgarr[key];
			// }
			// if ( _this.busy ){
			// 	return false;
			// }
			_this.busy = true;
			windowAlert.show("正在生成...",0);
			// window.location.href=_this.canvas.toDataURL("image/jpeg",1);
			// console.log(_this.canvas)
			// console.log(_this.canvas.toDataURL("image/jpeg"));
		    // uploadToQiniu(_this.canvas.toDataURL("image/jpeg",1),function(url, shareimgsrc){
			// 	var goon = true;
				_this.download("images/model/"+ _this.model +"/bg.png","bg");
				_this.download("images/model/"+ _this.model +"/fixed.png","fixed");
				if ( _this.currentModel.drag ){
					for ( var i=0;i<_this.currentModel.drag.length;i++ ){
						_this.download("images/model/"+ _this.model +"/"+ _this.currentModel.drag[i].id +".png","drag-" + _this.currentModel.drag[i].id);
					}
				}

		    // },function(){
		    // 	windowAlert.close("上传照片时发生错误，请重试");
		    // 	_this.busy = false;
		    // });
		},
		dragdown:function(){
			var _this = this;
			if ( _this.currentModel.drag ){
				for ( var i=0;i<_this.currentModel.drag.length;i++ ){
					if ( !_this.imgarr["drag-"+_this.currentModel.drag[i].id] ){
						return false;
						break;
					}
				}
				return true;
			}
			else{
				return true;
			}
		},
		complete:function(){
			var _this = this;
			console.log(_this.dragdown())
			if ( _this.imgarr.bg && _this.imgarr.fixed && _this.dragdown() ){
				var canvas = document.createElement('canvas');
				var context = canvas.getContext("2d");
				// canvas.width = 848;
				// canvas.height = 1372;
				canvas.width = 556;
				canvas.height = 833;
				context.drawImage(_this.imgarr.bg,0,0,canvas.width,canvas.height);
				context.drawImage(_this.canvas,_this.currentModel.left,_this.currentModel.top,_this.canvas.width,_this.canvas.height);
				context.drawImage(_this.imgarr.fixed,0,0,canvas.width,canvas.height);
				if ( _this.currentModel.drag ){
					var div = $("#edit").find(".move");
					for ( var i=0;i<_this.currentModel.drag.length;i++ ){
			        	var left = parseInt(div.eq(i).position().left/_this.ratio);
			        	var top = parseInt(div.eq(i).position().top/_this.ratio);
						context.drawImage(_this.imgarr["drag-"+_this.currentModel.drag[i].id],left,top,_this.currentModel.drag[i].width,_this.currentModel.drag[i].height);
					}
				}
		        if ( _this.currentModel.text ){
		        	context.font =  _this.currentModel.text.fontWeight +" "+ _this.currentModel.text.fontSize +"px arial";
		        	context.textAlign = _this.currentModel.text.textAlgin;
		        	context.textBaseline = "top";
		        	context.fillStyle = _this.currentModel.text.color;
		        	var text = $("#content").find("textarea").val();
					if ( text.toString().indexOf("\n") > -1 ){
						var texts = text.split("\n");
						var html = "";
						for ( var i=0;i<texts.length;i++ ){
							if ( i != 0 ){
								html += "$" + texts[i];
							}
							else{
								html += texts[i];
							}
						}
						text = html;
					}
					else if( text.toString().indexOf("↵") > -1 ){
						var texts = text.split("↵");
						var html = "";
						for ( var i=0;i<texts.length;i++ ){
							if ( i != 0 ){
								html += "$" + texts[i];
							}
							else{
								html += texts[i];
							}
						}
						text = html;
					}
					if ( _this.currentModel.text.textAlgin == "center" ){
		        		var left = parseInt(parseInt($("#content").position().left/_this.ratio) + parseInt(_this.currentModel.text.fontSize*_this.currentModel.text.length)/2+4/_this.ratio);
					}
					else{
		        		var left = parseInt($("#content").position().left/_this.ratio+4/_this.ratio);
					}
		        	var top = parseInt($("#content").position().top/_this.ratio+4/_this.ratio);
		        	var out = parseInt(canvas.width - parseInt($("#content").position().left/_this.ratio) - (_this.currentModel.text.fontSize*_this.currentModel.text.length));
		        	canvasTextAutoLine(text,canvas,left,top,_this.currentModel.text.lineHeight,out);
				}
			    // uploadToQiniu(canvas.toDataURL("image/jpeg",1),function(url, shareimgsrc){
					// var postData = {};
					// postData.openid = h6app_userInfo.openid;
					// postData.sign = h6app_userInfo.sign;
					// postData.img = url;
					// postData.templet_id = _this.currentModel.id;
					// console.log(postData)
				// 	$.ajax({
				// 		type:"get",
				// 		url:"http://case.html5case.cn/sunac/submit",
				// 		data:postData,
				// 		dataType:"json",
				// 		async:true,
				// 		timeout:10000,
				// 		success:function(data){
				// 			if ( data.code != 1 ){
				// 				windowAlert.close(data.msg);
				// 				_this.busy = false;
				// 				return false;
				// 			}
							_this.img = canvas.toDataURL("image/jpeg",1);
							$("#img").html("<img src='"+ _this.img +"'/>");
				// 			_this.busy = false;
				// 			$("#tip").transition({y:0,complete:function(){
				// 				$("#tip").hide();
				// 			}},300);
				// 			page.changePower("#edit","#result");
				// 		},
				// 		error:function(){
				// 			windowAlert.close("上传照片时发生错误，请重试");
				// 			_this.busy = false;
				// 		}
				// 	});
			    // },function(){
			    // 	windowAlert.close("上传照片时发生错误，请重试");
			    // 	_this.busy = false;
			    // });
			}
		},
		// getList:function(){
		// 	var _this = this;
		// 	if ( _this.busy ){
		// 		return false;
		// 	}
		// 	var postData = {};
		// 	postData.openid = h6app_userInfo.openid;
		// 	postData.sign = h6app_userInfo.sign;
		// 	postData.page_size = _this.page_size;
		// 	postData.page_number = _this.page_number;
		// 	postData.order_by = _this.order_by;
		// 	postData.order_type = _this.order_type;
		// 	$.ajax({
		// 		type:"get",
		// 		url:"http://case.html5case.cn/sunac/rank",
		// 		dataType:"json",
		// 		data:postData,
		// 		async:true,
		// 		cache:false,
		// 		timeout:10000,
		// 		beforeSend:function(){
		// 			_this.busy = true;
		// 			$("#list").find(".ul-list").find(">p").html("正在加载...").show();
		// 		},
		// 		success:function(data){
		// 			if ( data.code != 1 ){
		// 				$("#list").find(".ul-list").find(">p").html("暂无数据").show();
		// 				_this.listscroll.refresh();
		// 				_this.busy = false;
		// 				return false;
		// 			}
		// 			_this.pagecount = Math.ceil(data.data.pagination.total_items/_this.page_size);
		// 			var list = data.data.list;
		// 			if ( list.length == 0 ){
		// 				$("#list").find(".ul-list").find(">p").html("暂无数据").show();
		// 				_this.listscroll.refresh();
		// 				_this.busy = false;
		// 				return false;
		// 			}
		// 			var html = "";
		// 			for ( var i=0;i<list.length;i++ ){
		// 				html += "<li data-openid='"+ list[i].openid +"'><img src='http://cdn.h5case.com.cn/"+ list[i].imgs.img +"'/><div class='"+ _this.isDigg(list[i].imgs.isdigg) +"' data-img='"+ list[i].imgs.img_id +"'>"+ list[i].imgs.number +"</div></li>";
		// 			}
		// 			$("#list").find(".ul-list").find(">p").before(html);
		// 			_this.busy = false;
		// 			if ( _this.page_number < _this.pagecount ){
		// 				$("#list").find(".ul-list").find(">p").html("下拉加载更多").show();
		// 			}
		// 			else{
		// 				if ( _this.page_number != 1 ){
		// 					$("#list").find(".ul-list").find(">p").html("没有了").show();
		// 				}
		// 				else{
		// 					$("#list").find(".ul-list").find(">p").html("没有了").hide();
		// 				}
		// 			}
		// 			_this.page_number++;
		// 			_this.listscroll.refresh();
		// 		},
		// 		error:function(){
		// 			_this.busy = false;
		// 			windowAlert.show("加载失败，请重试");
		// 		}
		// 	});
		// },
		getInfo:function(openid,type){
			var _this = this;
			if ( _this.busy ){
				return false;
			}
			var postData = {};
			postData.openid = h6app_userInfo.openid;
			postData.sign = h6app_userInfo.sign;
			postData.user_openid = openid;
			$.ajax({
				type:"get",
				url:"http://case.html5case.cn/Sunac/getInfo",
				dataType:"json",
				data:postData,
				async:true,
				cache:false,
				timeout:10000,
				beforeSend:function(){
					_this.busy = true;
					if ( type == "my" ){
						$("#list").find(".ul-list").find(">p").html("正在加载...").show();
					}
					else if ( type == "his" ){
						$(".detail-digg").empty();
						$("#detail-swiper").remove();
						delete _this.detailswiper;
					}
				},
				success:function(data){
					if ( data.code != 1 ){
						if ( type == "my" ){
							$("#list").find(".ul-list").find(">p").html("暂无数据").show();
							_this.listscroll.refresh();
						}
						_this.busy = false;
						return false;
					}
					if ( type == "my" ){
						var list = data.data;
						if ( list.length == 0 ){
							$("#list").find(".ul-list").find(">p").html("暂无数据").show();
							_this.listscroll.refresh();
							_this.busy = false;
							return false;
						}
						var html = "";
						for ( var i=0;i<list.length;i++ ){
							html += "<li data-openid='"+ openid +"'><img src='http://cdn.h5case.com.cn/"+ list[i].img +"'/><div class='"+ _this.isDigg(list[i].isdigg) +"' data-img='"+ list[i].img_id +"'>"+ list[i].number +"</div></li>";
						}
						$("#list").find(".ul-list").find(">p").before(html);
						_this.busy = false;
						$("#list").find(".ul-list").find(">p").html("没有了").hide();
						_this.listscroll.refresh();
					}
					else if ( type == "his" ){
						var list = data.data;
						var html = "";
						for ( var i=0;i<list.length;i++ ){
							html += "<div class='swiper-slide' data-digg='"+ list[i].number +"' data-isdigg='"+ list[i].isdigg +"' data-img='"+ list[i].img_id +"'><img src='http://cdn.h5case.com.cn/"+ list[i].img +"'/></div>";
						}
						$(".detail-digg").before("<div class='swiper-container' id='detail-swiper'><div class='swiper-wrapper'>"+ html +"</div></div>");
					    _this.detailswiper = new Swiper("#detail-swiper",{
						    slidesPerView : 5,
						    centeredSlides : true,
			    			loop:false,
						    tdFlow: {
						        rotate : 30,
						        stretch :110*page.clientWidth/320,
						        depth: 210,
						        modifier : 1,
						        //shadows : true,
						    },
						    onSlideChangeEnd:function(swiper){
						    	var number = swiper.activeSlide().getAttribute("data-digg");
						    	var isdigg = swiper.activeSlide().getAttribute("data-isdigg");
						    	$(".detail-digg").html("<span class='"+ _this.isDiggs(isdigg) +"'>"+ number +"</span>");
						    },
						    onInit:function(swiper){
						    	if ( swiper.activeSlide() ){
							    	var number = swiper.activeSlide().getAttribute("data-digg");
							    	var isdigg = swiper.activeSlide().getAttribute("data-isdigg");
							    	$(".detail-digg").html("<span class='"+ _this.isDiggs(isdigg) +"'>"+ number +"</span>");
						    	}
						    }
					    });
						_this.busy = false;
					}
					else{
						var list = data.data;
						if ( list.length == 0 ){
							page.changePower("#share","#home");
							_this.homeswiper.reInit();
							page.changePower(0,"#text",function(){
								gif.playing = true;
								window.requestNextAnimationFrame(animate);
							});
							_this.busy = false;
							return false;
						}
						var r = parseInt(Math.random()*list.length);
						$("#share").find(".upload-img").html("<img src='http://cdn.h5case.com.cn/"+ list[r].img +"'/>");
						$(".share-digg").attr("data-img",list[r].img_id);
						if ( list[r].isdigg ){
							$(".share-digg").addClass("share-digged");
						}
						_this.busy = false;
					}
				},
				error:function(){
					_this.busy = false;
					windowAlert.show("加载失败，请重试");
				}
			});
		},
		isDigg:function(isdigg){
			if ( isdigg == 1 ){
				return "digg digged";
			}
			else{
				return "digg";
			}
		},
		isDiggs:function(isdigg){
			if ( isdigg == 1 ){
				return "digged";
			}
			else{
				return "";
			}
		},
		updatePosition:function(){
			var _this = game;
			if ( _this.listscroll.y <= _this.listscroll.maxScrollY && _this.page_number <= _this.pagecount && !_this.busy && $(".fillter").find("li.active").index() != 2 ){
				_this.getList();
			}
		}
	}
	function setCaretPosition(ctrl, pos){
	    if(ctrl.setSelectionRange)
	    {
	        ctrl.focus();
	        ctrl.setSelectionRange(pos,pos);
	    }
	    else if (ctrl.createTextRange) {
	        var range = ctrl.createTextRange();
	        range.collapse(true);
	        range.moveEnd('character', pos);
	        range.moveStart('character', pos);
	        range.select();
	    }
	}
	function canvasTextAutoLine(str,canvas,initX,initY,lineHeight,out){
	    var ctx = canvas.getContext("2d"); 
	    var lineWidth = 0;
	    var canvasWidth = canvas.width-out;
	    if ( game.currentModel.text.textAlgin == "center" ){
	    	canvasWidth += canvas.width-out;
	    }
	    var lastSubStrIndex= 0; 
	    for(var i=1;i<=str.length;i++){
	    	lineWidth += ctx.measureText(str[i]).width;
        	if ( str[i] == "$" ){
        		lineWidth -= ctx.measureText(str[i]).width;
        	}
	        if( ( lineWidth >= canvasWidth-initX || str[i-1] == "$" ) && i < str.length ){
	            ctx.fillText(str.substring(lastSubStrIndex,i-1).replace("$",""),initX,initY);
	            initY += lineHeight;
            	lineWidth = ctx.measureText(str[i]).width;
            	lastSubStrIndex = i-1;
	        }
	        if( i == str.length ){
	            ctx.fillText(str.substring(lastSubStrIndex,i).replace("$",""),initX,initY);
	        }
	    }
	}
    // function uploadToQiniu(blobOrBase64, successCb, errorCb, options) {
        // var base64ToBlob = function (base64) {
        //     for (var b = window.atob(base64.split(",")[1]), c = new ArrayBuffer(b.length), d = new Uint8Array(c), e = 0; e < b.length; e++) {
        //         d[e] = b.charCodeAt(e);
        //     }
        //     return new Blob([c], {
        //         type: "image/png"
        //     });
		// };
		// console.log(111)
		// console.log(base64ToBlob)
        // var bucket = options && options['bucket'] ? options['bucket'] : 'h5case-com-cn';
        // $.ajax({
        //     type: "get",
        //     url: "http://case.html5case.cn/QiniuClient/getTokenByBucket?bucket=" + encodeURIComponent(bucket),
        //     dataType: "json",
        //     success: function (data) {
        //         var formData = new FormData();
        //         if (window.Blob && blobOrBase64 instanceof window.Blob) {
        //             formData.append('file', blobOrBase64);
        //         } else {
        //             formData.append('file', base64ToBlob(blobOrBase64));
        //         }
        //         formData.append('detectMime', 1);
        //         formData.append('token', data.uptoken);
        //         var xhr = new XMLHttpRequest();
        //         xhr.open('POST', 'http://upload.qiniu.com/');
        //         xhr.onreadystatechange = function (response) {
        //             if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
        //                 var data = JSON.parse(xhr.responseText);
        //                 if (data && data.key) {
        //                     var resourceBaseUrl = options && options['baseUrl'] ? options['baseUrl']:'http://cdn.h5case.com.cn/';
        //                     //var url = resourceBaseUrl + data.key;
        //                     var url = data.key;
        //                     if (successCb) successCb(url, data);
        //                 } else {
        //                     if (errorCb) errorCb();
        //                 }
        //             }
        //         };
        //         xhr.onerror = function () {
        //             errorCb();
        //         };
        //         xhr.send(formData);
        //     },
        //     error: function () {
        //         errorCb();
        //     }
        // });
    // }
	/*
	 * 图片调整操作
	 */
    var container = document.getElementById('move'),
    shouts = {}
    shouts['hold'] = 'You are holding me.';
    shouts['tap'] = 'You just tapped me.';
    shouts['doubletap'] = 'You just tapped me. Twice.';
    shouts['transformstart'] = 'You started transforming me.';
    shouts['transform'] = 'You are transforming me.';
    shouts['transformend'] = 'You just transformed me.';
    shouts['dragstart'] = 'You started dragging me.';
    shouts['drag'] = 'You are dragging me.';
    shouts['dragend'] = 'You just dragged me.';
    shouts['swipe'] = 'You just swiped me.';
    var hammer = new Hammer(container, {
        tap_max_interval: 700 // seems to bee needed for IE8
    });
    function shout(e){
        switch ( e.type )
        {
        	case "dragstart":
				oneX1 = e.touches[0].x;
				oneY1 = e.touches[0].y;
        		break;
        	case "drag":
				oneX2 = e.touches[0].x;
				oneY2 = e.touches[0].y;
        		game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
        		game.ctx.save();
	    		if ( game.currentModel.round ){
	    			game.ctx.fillStyle = "rgba(255,255,255,0)";
	    			game.ctx.arc(game.canvas.width/2,game.canvas.height/2,game.canvas.width/2,0,2*Math.PI);
	    			game.ctx.fill();
	    			game.ctx.clip();
	    		}
        		game.ctx.translate(game.imgAttr.imgPositionX,game.imgAttr.imgPositionY);
        		game.ctx.scale(game.imgAttr.imgScale,game.imgAttr.imgScale);
        		game.ctx.rotate(game.imgAttr.imgRotation*Math.PI/180);
        		game.ctx.translate(-game.imgAttr.imgPositionX,-game.imgAttr.imgPositionY);
        		if ( parseInt(game.canvas.width-game.imgAttr.imgWidth*game.imgAttr.imgScale)/2 + game.imgAttr.imgLeft + parseInt(oneX2-oneX1) >= 0 ){
        			game.imgAttr.imgLeft = - parseInt(oneX2-oneX1) - parseInt(game.canvas.width-game.imgAttr.imgWidth*game.imgAttr.imgScale)/2;
        		}
        		if ( parseInt(game.canvas.width-game.imgAttr.imgWidth*game.imgAttr.imgScale)/2 + game.imgAttr.imgLeft + parseInt(oneX2-oneX1) + game.imgAttr.imgWidth*game.imgAttr.imgScale <= game.canvas.width ){
        			game.imgAttr.imgLeft =  game.canvas.width - game.imgAttr.imgWidth*game.imgAttr.imgScale - parseInt(oneX2-oneX1) - parseInt(game.canvas.width-game.imgAttr.imgWidth*game.imgAttr.imgScale)/2;
        		}
        		if ( parseInt(game.canvas.height-game.imgAttr.imgHeight*game.imgAttr.imgScale)/2 + game.imgAttr.imgTop + parseInt(oneY2-oneY1) >= 0 ){
        			game.imgAttr.imgTop = - parseInt(oneY2-oneY1) - parseInt(game.canvas.height-game.imgAttr.imgHeight*game.imgAttr.imgScale)/2;
        		}
        		if ( parseInt(game.canvas.height-game.imgAttr.imgHeight*game.imgAttr.imgScale)/2 + game.imgAttr.imgTop + parseInt(oneY2-oneY1) + game.imgAttr.imgHeight*game.imgAttr.imgScale <= game.canvas.height ){
        			game.imgAttr.imgTop = game.canvas.height - game.imgAttr.imgHeight*game.imgAttr.imgScale - parseInt(oneY2-oneY1) - parseInt(game.canvas.height-game.imgAttr.imgHeight*game.imgAttr.imgScale)/2;
        		}
        		game.ctx.drawImage(game.img_base64,parseInt(game.canvas.width-game.imgAttr.imgWidth)/2+game.imgAttr.imgLeft+parseInt(oneX2-oneX1),parseInt(game.canvas.height-game.imgAttr.imgHeight)/2+game.imgAttr.imgTop+parseInt(oneY2-oneY1),game.imgAttr.imgWidth,game.imgAttr.imgHeight);
        		game.ctx.restore();
        		break;
        	case "dragend":
				game.imgAttr.imgLeft += oneX2-oneX1;
				game.imgAttr.imgTop += oneY2-oneY1;
        		game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
        		game.ctx.save();
	    		if ( game.currentModel.round ){
	    			game.ctx.fillStyle = "rgba(255,255,255,0)";
	    			game.ctx.arc(game.canvas.width/2,game.canvas.height/2,game.canvas.width/2,0,2*Math.PI);
	    			game.ctx.fill();
	    			game.ctx.clip();
	    		}
        		game.ctx.translate(game.imgAttr.imgPositionX,game.imgAttr.imgPositionY);
        		game.ctx.scale(game.imgAttr.imgScale,game.imgAttr.imgScale);
        		game.ctx.rotate(game.imgAttr.imgRotation*Math.PI/180);
        		game.ctx.translate(-game.imgAttr.imgPositionX,-game.imgAttr.imgPositionY);
        		if ( parseInt(game.canvas.width-game.imgAttr.imgWidth*game.imgAttr.imgScale)/2+game.imgAttr.imgLeft >= 0 ){
        			game.imgAttr.imgLeft = - parseInt(game.canvas.width-game.imgAttr.imgWidth*game.imgAttr.imgScale)/2;
        		}
        		if ( parseInt(game.canvas.width-game.imgAttr.imgWidth*game.imgAttr.imgScale)/2+game.imgAttr.imgLeft + game.imgAttr.imgWidth*game.imgAttr.imgScale <= game.canvas.width ){
        			game.imgAttr.imgLeft =  game.canvas.width - game.imgAttr.imgWidth*game.imgAttr.imgScale - parseInt(game.canvas.width-game.imgAttr.imgWidth*game.imgAttr.imgScale)/2;
        		}
        		if ( parseInt(game.canvas.height-game.imgAttr.imgHeight*game.imgAttr.imgScale)/2 + game.imgAttr.imgTop >= 0 ){
        			game.imgAttr.imgTop = - parseInt(game.canvas.height-game.imgAttr.imgHeight*game.imgAttr.imgScale)/2;
        		}
        		if ( parseInt(game.canvas.height-game.imgAttr.imgHeight*game.imgAttr.imgScale)/2 + game.imgAttr.imgTop + game.imgAttr.imgHeight*game.imgAttr.imgScale <= game.canvas.height ){
        			game.imgAttr.imgTop = game.canvas.height - game.imgAttr.imgHeight*game.imgAttr.imgScale - parseInt(game.canvas.height-game.imgAttr.imgHeight*game.imgAttr.imgScale)/2;
        		}
        		game.ctx.drawImage(game.img_base64,parseInt(game.canvas.width-game.imgAttr.imgWidth)/2+game.imgAttr.imgLeft,parseInt(game.canvas.height-game.imgAttr.imgHeight)/2+game.imgAttr.imgTop,game.imgAttr.imgWidth,game.imgAttr.imgHeight);
        		game.ctx.restore();
        		break;
        	case "transform":
        		game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
        		game.ctx.save();
	    		if ( game.currentModel.round ){
	    			game.ctx.fillStyle = "rgba(255,255,255,0)";
	    			game.ctx.arc(game.canvas.width/2,game.canvas.height/2,game.canvas.width/2,0,2*Math.PI);
	    			game.ctx.fill();
	    			game.ctx.clip();
	    		}
        		var scale = e.scale*game.imgAttr.imgScale;
        		var rotation = e.rotation+game.imgAttr.imgRotation;
        		game.imgAttr.imgPositionX = e.position.x;
        		game.imgAttr.imgPositionY = e.position.y;
        		game.ctx.translate(game.imgAttr.imgPositionX,game.imgAttr.imgPositionY);
        		game.ctx.scale(scale,scale);
        		game.ctx.rotate(rotation*Math.PI/180);
        		game.ctx.translate(-game.imgAttr.imgPositionX,-game.imgAttr.imgPositionY);
        		game.ctx.drawImage(game.img_base64,parseInt(game.canvas.width-game.imgAttr.imgWidth)/2+game.imgAttr.imgLeft,parseInt(game.canvas.height-game.imgAttr.imgHeight)/2+game.imgAttr.imgTop,game.imgAttr.imgWidth,game.imgAttr.imgHeight);
        		game.ctx.restore();
        		break;
        	case "transformend":
        		game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
        		game.ctx.save();
	    		if ( game.currentModel.round ){
	    			game.ctx.fillStyle = "rgba(255,255,255,0)";
	    			game.ctx.arc(game.canvas.width/2,game.canvas.height/2,game.canvas.width/2,0,2*Math.PI);
	    			game.ctx.fill();
	    			game.ctx.clip();
	    		}
        		var scale = e.scale*game.imgAttr.imgScale;
        		var rotation = e.rotation+game.imgAttr.imgRotation;
        		game.imgAttr.imgPositionX = e.position.x;
        		game.imgAttr.imgPositionY = e.position.y;
        		game.ctx.save();
        		game.ctx.translate(game.imgAttr.imgPositionX,game.imgAttr.imgPositionY);
        		game.ctx.scale(scale,scale);
        		game.ctx.rotate(rotation*Math.PI/180);
        		game.ctx.translate(-game.imgAttr.imgPositionX,-game.imgAttr.imgPositionY);
        		game.ctx.drawImage(game.img_base64,parseInt(game.canvas.width-game.imgAttr.imgWidth)/2+game.imgAttr.imgLeft,parseInt(game.canvas.height-game.imgAttr.imgHeight)/2+game.imgAttr.imgTop,game.imgAttr.imgWidth,game.imgAttr.imgHeight);
        		game.ctx.restore();
        		game.imgAttr.imgScale = e.scale*game.imgAttr.imgScale;
        		game.imgAttr.imgRotation = e.rotation+game.imgAttr.imgRotation;
        		break;
        }
    }
    var type;
    for(type in shouts) {
        hammer['on'+ type] = shout;
    }
	/*
	 * 序列帧
	 */
	window.frame = function(element,width,height,file,length,format,callback){
		this.init = function(){
			this.canvas = document.getElementById(element);
			this.context = this.canvas.getContext("2d");
			this.file = file;
			this.length = length;
			this.format = format;
			this.canvas.width = width;
			this.canvas.height = height;
			this.imglist = [];
			for ( var i=1;i<=this.length;i++ ){
				var obj = {};
				obj.src = "images/"+ this.file +"/"+ i +"." + this.format;
				this.imglist.push(obj);
			}
			this.downImg(0);
			this.thisIndex = 0;
			this.playing = false;
			animateList.push(this);
			this.callback = callback;
		};
		this.downImg = function(order){
			var img = new Image();
			img.src = this.imglist[order].src;
			var me = this;
			if ( img.complete ){
				this.imglist[order].img = img;
				this._down_complete(order,img);
			}
			else{
				img.onload = function(){
					me.imglist[order].img = img;
					me._down_complete(order,img);
				}
			}
		};
		this._down_complete = function(order,img){
			if ( order == 0 ){
				this.context.drawImage(img,0,0,this.canvas.width,this.canvas.height);
			}
			order++;
			if ( order < this.length ){
				this.downImg(order);
			}
		};
		this.draw = function(){
			var img = this.imglist[this.thisIndex].img;
			if ( img && img.complete ){
				this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
				this.context.drawImage(img,0,0,this.canvas.width,this.canvas.height);
				this.thisIndex ++;
				if ( this.thisIndex > this.length-1 ){
					this.playing = false;
					this.thisIndex = 0;
					this.callback();
				}
			}
		};
		this.init();
	};
	/*
	 * 动画优化
	 */
	window.animateList = [];
	window.animate = function(){
		var next = false;
		var start = +new Date();
		for ( var i=0;i<animateList.length;i++ ){
			if ( animateList[i].playing ){
				animateList[i].draw();
				next = true;
			}
		}
		if ( next ){
			var last = +new Date();
			if ( last-start >= 30 ){
				window.requestNextAnimationFrame(animate);
			}
			else{
				setTimeout(function(){
					window.requestNextAnimationFrame(animate);
				},30-(last-start))
			}
		}
	}
	window.requestNextAnimationFrame = (function(){
		var originalWebkitMethod,
			wrapper = undefined,
			callback = undefined,
			geckoVersion = 0,
			userAgent = navigator.userAgent,
			index = 0,
			self = this;
		if ( window.webkitRequestAnimationFrame ){
			wrapper = function(time){
				if ( time === undefined ){
					time = +new Date();
				}
				self.callback(time);
			};
			originalWebkitMethod = window.webkitRequestAnimationFrame;
			window.webkitRequestAnimationFrame = function(callback,element){
				self.callback = callback;
				originalWebkitMethod(wrapper,element);
			}
		}
		if ( window.mozRequestAnimationFrame ){
			index = userAgent.indexOf("rv:");
			if ( userAgent.indexOf("Gecko") != -1 ){
				geckoVersion = userAgent.substr(index+3,3);
				if ( geckoVersion === "2.0" ){
					window.mozRequestAnimationFrame = undefined;
				}
			}
		}
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback,element){
				var start,finish;
				window.setTimeout(function(){
					start = +new Date();
					callback(start);
					finish = +new Date();
					self.timeout = 1000/60 - ( finish - start );
				},self.timeout)
			}
	})();
	/*
	 * url参数
	 */
	window.args = function(){
		var qs = (location.search.length > 0 ? location.search.substring(1) : "");
		var args = {};
		var items = qs.length ? qs.split("&") : [];
		for ( var i=0;i<items.length;i++ ){
			var item = items[i].split("=");
			var name = decodeURIComponent(item[0]);
			var value = decodeURIComponent(item[1]);
			if ( name.length ){
				args[name] = value;
			}
		}
		return args;
	}()
	/*
	 * 冒出式弹层
	 */
	window.windowAlert = {
		show:function(text,alertTime){
			if ( typeof(autoTip) != "undefined" ){
				clearTimeout(autoTip);
			}
			$("#tip").remove();
			$("body").append("<div id='tip'><span></span></div>");
			var $tip = $("#tip");
			$tip.find("span").html(text);
			$tip.show();
			var height = $("#tip").height();
			$tip.css({bottom:-height}).transition({y:-height-16,complete:function(){
				if ( alertTime != 0 ){
					autoTip = setTimeout(function(){
						$tip.transition({y:0,complete:function(){
							$tip.hide();
						}},300);
					},1000)
				}
			}},300);
		},
		close:function(text){
			if ( typeof(autoTip) != "undefined" ){
				clearTimeout(autoTip);
			}
			var $tip = $("#tip");
			$tip.find("span").html(text);
			autoTip = setTimeout(function(){
				$tip.transition({y:0,complete:function(){
					$tip.hide();
				}},300);
			},1000)
		}
	};
	/*
	 * 正则验证
	 */
	window.checkInfo = {
		checkStr:function(value){
			if ( value == "" ){
				return true;
			}
			else{
				return false;
			}
		},
		checkTel:function(value){
			var myreg = /(((13[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
			if( myreg.test(value) ){
				return true;
			}
			else{
				return false;
			}
		},
		checkNumber:function(value){
			var myreg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
			if( myreg.test(value) ){
				return true;
			}
			else{
				return false;
			}
		},
		checkMail:function(value){
			var myreg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if( myreg.test(value) ){
				return true;
			}
			else{
				return false;
			}
		},
		checkDate:function(value){
			var myreg = /^\d{4}-(?:(?:0[13-9]|1[12])-(?:0[1-9]|[12]\d|30)|(?:0[13578]|1[02])-31|02-(?:0[1-9]|1\d|2[0-8]))|(?:(?:\d{2}(?:[13579][26]|[2468][048])|(?:[13579][26]|[2468][048])00)-02-29)$/;
			if( myreg.test(value) ){
				return true;
			}
			else{
				return false;
			}
		}
	};
	/*
	 * 背景音乐
	 */
	window.bgm = {
		playing:0,
		init:function(){
			this.music = new Audio();
			this.music.src = "bgm.mp3";
			this.music.loop = "loop";
			this.music.addEventListener("canplay",bgm.load);
			this.music.addEventListener("playing",bgm.complete);
			this.music.load();
			$("#music").on("tap",function(){
				if ( Boolean(bgm.playing) ){
					bgm.pause();
				}
				else{
					bgm.play();
				}
			})
		},
		load:function(){
			bgm.play();
			this.removeEventListener("canplay",bgm.load);
		},
		complete:function(){
			$("#music").css({"visibility":"visible",opacity:0}).transition({opacity:1},500);
			this.removeEventListener("playing",bgm.complete);
		},
		play:function(){
			this.music.play();
			this.playing = 1;
			$("#music").addClass("play");
		},
		pause:function(){
			this.music.pause();
			this.playing = 0;
			$("#music").removeClass("play");
		}
	};
	/*
	 * 音效
	 */
	window.sound = {
		list:[{"src":"js/eat.mp3","title":"eat","loop":"loop"},{"src":"js/fail.mp3","title":"fail","loop":""},{"src":"js/win.mp3","title":"win","loop":""}],
		init:function(){
			this.music = {};
			for ( var i=0;i<this.list.length;i++ ){
				var m = new Audio();
				m.src = this.list[i].src;
				m.loop = this.list[i].loop;
				m.load();
				this.music[this.list[i].title] = m;
			}
		},
		play:function(obj){
			this.pause();
			this.music[obj].play();
		},
		pause:function(){
			for ( var key in this.music ){
				this.music[key].currentTime = 0;
				this.music[key].pause();
			}
		}
	};
}();
$(function(){
	page.init();
})