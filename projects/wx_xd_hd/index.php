﻿<!DOCTYPE html>
<html>
<head>
<?php include_once 'inc/head.php'; ?>
<body style="overflow:hidden" class="app">
<div class="loading" id="loading">
    <div class="load_img">
    	<div style="position:relative; z-index:11"><img src="images/1.png"></div>
        <div class="ren_tiao"><img src="images/2.png"></div>
    </div>
    <p>Loading...<span class="loadText">0</span>%</p>    
    <div class="boc"><img src="images/boc.png"></div>
</div>
<div class="music on" onClick="playClicked(this)"></div>
<audio src="media/1.mp3" id="audio_player" loop=""></audio>

<div class="swiper-container hide">
    <div class="swiper-wrapper">
    	<div class="swiper-slide page">
            <div class="dbj"><img src="images/bj.png"></div>
            <div class="old ani dbj"><img src="images/old.png"></div>
            <div class="xh ani"><img src="images/xh.png"></div>
            <div class="logo ani"><img src="images/logo.png"></div>
            <div class="merry ani"><img src="images/merry.png"></div>
            <div class="hand ani"><img src="images/hand.png"></div>
            <div class="btns"><div class="fl start"><img src="images/btn1.png"></div><div class="fr guize"><img src="images/btn2.png"></div></div>     
        </div>
        <div class="swiper-slide page">
            <div class="dbj"><img src="images/shu.png"></div>
            <div class="xh ani"><img src="images/xh.png"></div>
            <div class="logo ani"><img src="images/logo.png"></div>
            <div class="title_cz ani">
            	<div class="old1 ani"><img src="images/old.png" style="position: relative;z-index: 1;"><div class="hand ani"><img src="images/hand.png"></div></div>
                
                <div class="title">     
                    <div class="main2"><div class="yao"><img src="images/start-handle.png"></div>
                        <div class="container">
                            <div class="num num1">
                                <div class="num-con num-con1">
                                    <div class="num-img"></div>
                                    <div class="num-img"></div>
                                </div>
                            </div>
                            <div class="num num2">
                                <div class="num-con num-con2">
                                    <div class="num-img"></div>
                                    <div class="num-img"></div>
                                </div>
                            </div>
                            <div class="num num3">
                                <div class="num-con num-con3">
                                    <div class="num-img"></div>
                                    <div class="num-img"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main3">
                        <div class="container">
                            <div class="main3-btn"><img src="images/cj.png"></div>
                            <div class="main4-btn hide"><img src="images/again.png"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="gz_box hide">
	<img src="images/gz.png">
    <div class="close"><img src="images/close.png"></div>
</div> 
 
        
<div class="img_box1 hide">
    <div class="dbj"><img src="images/shu.png"></div>
    <div class="xh ani"><img src="images/xh.png"></div>
    <div class="logo ani"><img src="images/logo.png"></div>
    <div class="title_cz ani">
        <div class="old1 ani"><img src="images/old.png" style="position: relative;z-index: 1;"><div class="hand ani"><img src="images/hand.png"></div></div>
        <div class="title">
            <div class="main4">
            	<div class="yao"><img src="images/start-handle.png"></div>
                <div class="xiaoren"><img src="images/xr.png"></div>
                <div class="container">
                    <div class="congrat">
                        <h1>恭喜您获得圣诞老人准备的</h1>
                        <h1 class="jiang">充电暖手宝1个</h1>
                        <h1>请填写个人信息领取奖品</h1>
                    </div>
                    <div class="form_box contactus_box">
                        <form>
                        <div class="group">
                        <span>姓名：</span><label><input type="text" placeholder=""></label>
                        </div>
                        <div class="group">
                        <span>联系方式：</span><label><input type="text" placeholder=""></label>
                        </div>
                        </form>
                        <div class="tijiao"><img src="images/tj.png"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="img_box2 hide">
    <div class="dbj"><img src="images/shu.png"></div>
    <div class="xh ani"><img src="images/xh.png"></div>
    <div class="logo ani"><img src="images/logo.png"></div>
    <div class="share_fei ani"><img src="images/share.png"></div>
    <div class="title_cz ani">
        <div class="old1 ani"><img src="images/old.png" style="position: relative;z-index: 1;"><div class="hand ani"><img src="images/hand.png"></div></div>
        <div class="title">     
            <div class="main4"><div class="yao"><img src="images/start-handle.png"></div>
                <div class="container">
                    <div class="congrat">
                        <img src="images/add.png">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="js/zepto.min.js"></script>
<script src="js/main.js"></script>

<script src="js/swiper3.1.0.jquery.min.js"></script>
<script src="js/swiper3.1.js"></script>
<script src="js/preloadjs-0.6.0.min.js"></script>
<script type="text/javascript" src="js/jquery-1.7.2-min.js"></script>
<script type="text/javascript" src="js/easing.js"></script>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="js/wxsdk.js"></script>


<script type="text/javascript">
reset();
$(".main3-btn").click(function () {
	$(".yao").addClass("y");
	if(!flag){
		flag=true;
		reset();
		letGo();
		setTimeout(function () {
			flag=false;
			if(index==2){
				$(".fix,.pop-form").show();
			}else{
				$(".img_box1").removeClass("hide");
				$(".swiper-container").addClass("hide");
				$(".pop-text span").text(""+String(7-TextNum1)+(8-TextNum2))
			}
		},2800);
		index++;
	}
});

var flag=false;
var index=0;
var TextNum1
var TextNum2
var TextNum3

function letGo(){
	TextNum1=parseInt(Math.random()*5)//随机数
	TextNum2=parseInt(Math.random()*5)
	TextNum3=parseInt(Math.random()*5)
setTimeout(function () {
	var num1=[0,-55,-112,-167,-222][1];//在这里随机
	var num2=[0,-55,-112,-167,-222][2];
	var num3=[0,-55,-112,-167,-222][3];
	//1是３个铃铛
	//２是３个礼物
	//３是３个圣诞树
	//４是３袜子
	//５是３个圣诞老人
	$(".num-con1").animate({"top":-280},400,"linear", function () {
		$(this).css("top",0).animate({"top":num1},1000,"linear");
	});
	$(".num-con2").animate({"top":-280},400,"linear", function () {
		$(this).css("top",0).animate({"top":num2},1200,"linear");
	});
	$(".num-con3").animate({"top":-280},400,"linear", function () {
		$(this).css("top",0).animate({"top":num3},1300,"linear");
	});
},100);
}
function reset(){
	$(".num-con1").css({"top":0});
	$(".num-con2").css({"top":-167});
	$(".num-con3").css({"top":-222});
}
</script>
</body>
</html>
