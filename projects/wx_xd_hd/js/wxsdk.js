 var hrefUrl=window.location.href;
 var dataForWeixin = {
      img     : "http://wx.bocweb.cn/zhouyun/wx_xd_hd/share.jpg",
      linkurl : "http://wx.bocweb.cn/zhouyun/wx_xd_hd/",
      desc    : "信达·香格里邀您来领圣诞礼物啦！",
      title   : "接好啦！“圣诞老人”正在派送礼物中…",
 };

$.ajax({
	url:"http://wx.bocweb.cn/index.php?welcome/getwxsdk",
	type:"post",
	data:{pageUrl:hrefUrl},
  dataType:'json',
	success:function(data){
		wx.config({
		    debug: false,
		    appId: data.appId,
		    timestamp: data.timestamp,
		    nonceStr: data.nonceStr,
		    signature: data.signature,
		    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage',
		    'onMenuShareQQ','onMenuShareWeibo']
			// 所有要调用的 API 都要加到这个列表中
		});
	}
});
  wx.ready(function () {
  // 2. 分享接口
  // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage({
      title: dataForWeixin.title,
      desc: dataForWeixin.desc,
      link: dataForWeixin.linkurl,
      imgUrl: dataForWeixin.img,
      trigger: function (res) {
        
      },
      success: function (res) {
        //alert('已分享');
      },
      cancel: function (res) {
        //alert('已取消');
      },
      fail: function (res) {
        //alert(JSON.stringify(res));
      }
    });


  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
      title: dataForWeixin.title,
      link: dataForWeixin.linkurl,
      imgUrl: dataForWeixin.img,
      trigger: function (res) {
       // alert('用户点击分享到朋友圈');
      },
      success: function (res) {
        //alert('已分享');
      },
      cancel: function (res) {
        //alert('已取消');
      },
      fail: function (res) {
        //alert(JSON.stringify(res));
      }
    });

    wx.onMenuShareQQ({
      title: dataForWeixin.title,
      desc: dataForWeixin.desc,
      link: dataForWeixin.linkurl,
      imgUrl: dataForWeixin.img,
      trigger: function (res) {
        //alert('用户点击分享到QQ');
      },
      complete: function (res) {
        //alert(JSON.stringify(res));
      },
      success: function (res) {
        //alert('已分享');
      },
      cancel: function (res) {
       //alert('已取消');
      },
      fail: function (res) {
        //alert(JSON.stringify(res));
      }
    });
  
  // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareWeibo({
      title: dataForWeixin.title,
      desc: dataForWeixin.desc,
      link: dataForWeixin.linkurl,
      imgUrl: dataForWeixin.img,
      trigger: function (res) {
        //alert('用户点击分享到微博');
      },
      complete: function (res) {
       // alert(JSON.stringify(res));
      },
      success: function (res) {
        //alert('已分享');
      },
      cancel: function (res) {
       // alert('已取消');
      },
      fail: function (res) {
       // alert(JSON.stringify(res));
      }
    });
  });
