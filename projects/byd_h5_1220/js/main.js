//禁止窗口的默认滑动
// document.ontouchmove = function (e) {
// 	e.preventDefault();
// }
// $("body").bind("touchmove",function(event){event.preventDefault();});
// $("body").unbind("touchmove");

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
    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');
 //    if(next=='welcome'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('welcome2');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
	// else if(next=='welcome2'){
	// 	var _t1=setTimeout(function(){
	// 		loadPage('list1');
	// 	clearTimeout(_t1);
	// 	},3000);
	// }
}

var categories=[
	{"id":10,"name":'浙江省',"children":[
		{"id":101,"name":'金华市',"children":[
			{"id":1011,"name":"东阳迪远汽车销售有限公司"},
			{"id":1012,"name":"金华市鑫迪汽车销售有限公司"},
			{"id":1013,"name":"金华亚通汽车销售有限公司"},
			{"id":1014,"name":"义乌市迪远汽车销售服务有限公司"},
			{"id":1015,"name":"义乌市利邦汽车销售服务有限公司"},
			{"id":1016,"name":"永康市亚通汽车销售服务有限公司"},
			{"id":1017,"name":"浦江县利邦汽车销售服务有限公司"}
		]},
		{"id":102,"name":'丽水市',"children":[
			{"id":1021,"name":"丽水市万迪汽车销售服务有限公司"}
		]},
		{"id":103,"name":'衢州市',"children":[
			{"id":1031,"name":"衢州迪远汽车销售有限公司"}
		]},
		{"id":104,"name":'台州市',"children":[
			{"id":1041,"name":"台州凯特汽车贸易有限公司"},
			{"id":1042,"name":"台州恒特汽车服务有限公司"},
			{"id":1043,"name":"台州市大禹汽车贸易有限公司"},
			{"id":1044,"name":"台州恒之迪汽车服务有限公司"},
			{"id":1045,"name":"台州市鑫迪汽车销售服务有限公司"}
		]},
		{"id":105,"name":'温州市',"children":[
			{"id":1051,"name":"温州正迪汽车有限公司"},
			{"id":1052,"name":"温州欧龙机电有限公司"}
		]},
		{"id":106,"name":'瑞安市',"children":[
			{"id":1061,"name":"浙江中南汽车贸易有限公司"},
			{"id":1062,"name":"瑞安市铭迪汽车销售服务有限公司"}
		]},
		{"id":107,"name":'乐清市',"children":[
			{"id":1071,"name":"乐清市鸿胜汽车服务有限公司"}
		]},
		{"id":108,"name":'苍南县',"children":[
			{"id":1081,"name":"苍南华正汽车销售服务有限公司"}
		]},
		{"id":109,"name":'永嘉县',"children":[
			{"id":1091,"name":"温州嘉迪新能源汽车有限公司"}
		]},
		{"id":1010,"name":'平阳县',"children":[
			{"id":10101,"name":"平阳鸿志汽车销售有限公司"}
		]},
		{"id":1011,"name":'绍兴市',"children":[
			{"id":10111,"name":"绍兴市迪远汽车销售有限公司"},
			{"id":10112,"name":"绍兴市科能汽车销售服务有限公司"},
			{"id":10113,"name":"绍兴上虞浩通商贸有限公司"},
			{"id":10114,"name":"诸暨科大汽车销售服务有限公司"},
		]},
		{"id":1012,"name":'湖州市',"children":[
			{"id":10121,"name":"长兴宝迪汽车销售服务有限公司"}
		]},
		{"id":1013,"name":'嘉兴市',"children":[
			{"id":10131,"name":"海宁海昌汽车维修装饰有限公司"},
			{"id":10132,"name":"嘉兴正浩汽车销售有限公司"},
			{"id":10133,"name":"嘉兴市桥银经贸有限公司"}
		]},
		{"id":1014,"name":'杭州市',"children":[
			{"id":10141,"name":"杭州保捷汽车有限公司"},
			{"id":10142,"name":"杭州瑞通汽车销售有限公司"},
			{"id":10143,"name":"浙江迪信汽车销售服务有限公司"},
			{"id":10144,"name":"杭州卓御汽车销售有限公司上城分公司"},
			{"id":10145,"name":"浙江亚迪汽车销售服务有限公司"},
			{"id":10146,"name":"杭州卓御汽车销售有限公司"},
			{"id":10147,"name":"杭州卓御汽车销售有限公司萧山分公司"},
			{"id":10148,"name":"浙江国旺汽车销售服务有限公司"},
		]},
		{"id":1015,"name":'宁波市',"children":[
			{"id":10151,"name":"慈溪新慈鑫汽车销售服务有限公司"},
			{"id":10152,"name":"宁波中腾汽车销售服务有限公司"},
			{"id":10153,"name":"宁波迪之杰新能源汽车销售服务有限公司"},
			{"id":10154,"name":"宁波市中诚汽车销售有限公司宁海分公司"},
			{"id":10155,"name":"宁波洛兹汽车销售服务有限公司"},
			{"id":10156,"name":"宁波舜迪汽车销售服务有限公司"},
			{"id":10157,"name":"宁波甬迪汽车销售服务有限公司"}
		]}
	]},
	{"id":20,"name":'江苏省',"children":[
		{"id":201,"name":'无锡市',"children":[
			{"id":2011,"name":"无锡市越迪汽车销售有限公司"}
		]},
		{"id":202,"name":'常州市',"children":[
			{"id":2021,"name":"常州市盛世新景汽车销售有限公司"},
			{"id":2022,"name":"常州长铃比亚迪销售有限公司"}
		]},
		{"id":203,"name":'江阴市',"children":[
			{"id":2031,"name":'江阴市同创汽车销售有限公司'}
		]},
		{"id":204,"name":'昆山市',"children":[
			{"id":2041,"name":'昆山市仁合新能源汽车销售有限公司'}
		]},
		{"id":205,"name":'苏州市',"children":[
			{"id":2051,"name":'吴江日升汽车销售服务有限公司'},
			{"id":2052,"name":'张家港市全顺汽车销售服务有限公司'},
			{"id":2053,"name":'张家港泰丰汽车销售服务有限公司'},
			{"id":2054,"name":'苏州市才富汽车服务有限公司'}
		]},
		{"id":206,"name":'张家港市',"children":[
			{"id":2061,"name":'张家港泰丰汽车销售服务有限公司'}
		]},
		{"id":207,"name":'南京市',"children":[
			{"id":2071,"name":'江苏雨田都灵汽车销售服务有限公司'},
			{"id":2072,"name":'江苏恒佳新能源汽车销售服务有限公司'},
			{"id":2073,"name":'南京盛世新景汽车销售服务有限公司'},
		]},
		{"id":208,"name":'徐州市',"children":[
			{"id":2081,"name":'徐州平迪汽车销售服务有限公司'}
		]},
		{"id":209,"name":'扬州市',"children":[
			{"id":2091,"name":'扬州新大华汽车销售服务有限公司'}
		]},
		{"id":2010,"name":'镇江市',"children":[
			{"id":20101,"name":'镇江弘帆汽车销售服务有限公司'}
		]},
		{"id":2011,"name":'宿迁市',"children":[
			{"id":20111,"name":'宿迁大智汽车贸易有限公司宿迁分公司'}
		]},
		{"id":2012,"name":'泰州市',"children":[
			{"id":20121,"name":'泰州市三泰汽车贸易有限公司'}
		]},
		{"id":2013,"name":'盐城市',"children":[
			{"id":20131,"name":'盐城市洪兆连汽车贸易有限公司'}
		]},
		{"id":2014,"name":'泰州市',"children":[
			{"id":20141,"name":'泰州大亚汽车销售服务有限公司'}
		]},
		{"id":2015,"name":'南通市',"children":[
			{"id":20151,"name":'弘仁南通汽车销售服务有限公司'},
			{"id":20152,"name":'锐豪南通汽车销售服务有限公司'}
		]},
		{"id":2016,"name":'海门市',"children":[
			{"id":20161,"name":'海门市海迪汽车销售有限公司'}
		]},
		{"id":2017,"name":'如皋市',"children":[
			{"id":20171,"name":'如皋市东方汽车摩托车有限公司'}
		]},
		{"id":2018,"name":'连云港市',"children":[
			{"id":20181,"name":'连云港市苍梧汽车销售有限公司'}
		]},
		{"id":2019,"name":'泰兴市',"children":[
			{"id":20191,"name":'泰州市烔圣新能源汽车销售服务有限公司'}
		]}
	]},
	{"id":30,"name":'安徽省',"children":[
		{"id":301,"name":'滁州市',"children":[
			{"id":3011,"name":"滁州东和泰昌汽车销售服务有限公司"}
		]},
		{"id":302,"name":'安庆市',"children":[
			{"id":3021,"name":"安庆市鑫晨汽车贸易有限公司"},
			{"id":3022,"name":"安徽中迪汽车销售服务有限公司"}
		]},
		{"id":303,"name":'阜阳市',"children":[
			{"id":3031,"name":"阜阳海迪汽车销售服务有限公司"}
		]},
		{"id":304,"name":'六安市',"children":[
			{"id":3041,"name":"安徽金迪汽车销售服务有限公司"}
		]},
		{"id":305,"name":'合肥市',"children":[
			{"id":3051,"name":"安徽省骏迪汽车销售有限公司"},
			{"id":3052,"name":"安徽翔迪汽车销售服务有限公司"},
			{"id":3053,"name":"合肥新迪汽车销售服务有限公司"}
		]},
		{"id":306,"name":'马鞍山市',"children":[
			{"id":3061,"name":"马鞍山市顺迪汽车销售服务有限公司"}
		]},
		{"id":307,"name":'亳州市',"children":[
			{"id":3071,"name":"亳州市新梦迪汽车销售有限责任公司"}
		]},
		{"id":308,"name":'宣城市',"children":[
			{"id":3081,"name":"宣城丰迪汽车销售服务有限公司"}
		]},
		{"id":309,"name":'无为县',"children":[
			{"id":3091,"name":"无为县永安汽车配件制造有限公司"}
		]},
		{"id":3010,"name":'淮北市',"children":[
			{"id":30101,"name":"淮北市迪安特汽车销售服务有限公司"}
		]},
		{"id":3011,"name":'铜陵市',"children":[
			{"id":30111,"name":"铜陵市汽车销售有限责任公司"}
		]},
		{"id":3012,"name":'蚌埠市',"children":[
			{"id":30121,"name":"蚌埠市汇通汽车销售有限公司"}
		]},
		{"id":3013,"name":'芜湖市',"children":[
			{"id":30131,"name":"芜湖友林汽车销售集团有限公司"}
		]}
	]},
	{"id":40,"name":'福建省',"children":[
		{"id":401,"name":'龙岩市',"children":[
			{"id":4011,"name":"福建龙迪鑫汽车销售有限公司"}
		]},
		{"id":402,"name":'莆田市',"children":[
			{"id":4021,"name":"莆田市亿豪汽车贸易有限公司"}
		]},
		{"id":403,"name":'厦门市',"children":[
			{"id":4031,"name":"厦门市佳凯盛汽车贸易有限公司"},
			{"id":4032,"name":"厦门市盛世开元汽车销售有限公司"}
		]},
		{"id":404,"name":'泉州市',"children":[
			{"id":4041,"name":"福建省国安锦轮汽车贸易有限责任公司"},
			{"id":4042,"name":"福建省粤迪汽车销售有限公司"},
			{"id":4043,"name":"泉州鸿鑫汽车销售服务有限公司"}
		]},
		{"id":405,"name":'漳州市',"children":[
			{"id":4051,"name":"漳州华骏天捷比亚迪4S店"}
		]},
		{"id":406,"name":'三明市',"children":[
			{"id":4061,"name":"三明市万通经贸有限公司"}
		]},
		{"id":407,"name":'福州市',"children":[
			{"id":4071,"name":"福建省美嘉鑫迪贸易有限公司"}
		]}
	]}
	];
// 联动
function createSel(cts){
	var sel1=document.getElementById('select1'),
	 	sel2=document.getElementById('select2'),
		sel3=document.getElementById('select3');
	for(var i=0;i<cts.length;i++){
		sel1.add(new Option(cts[i].name,cts[i].id));
	}
	sel1.onchange=function(){
		var i=this.selectedIndex;
		if(i=='0'){
			sel2.innerHTML='<option value="">市</option>';
			sel3.innerHTML='<option value="">当地门店</option>';
		}else{
			var child1=cts[i-1].children;
			var child2=child1[i-1].children;
			console.log(child1);
			console.log(child2);
			sel2.innerHTML='';
			sel3.innerHTML='';
			for(var i=0,u=child1.length;i<u;i++){
				sel2.add(new Option(child1[i].name,child1[i].id));
			}
			for(var i=0,u=child2.length;i<u;i++){
				sel3.add(new Option(child2[i].name,child2[i].id));
			}
			sel2.onchange=function(){
				var i=this.selectedIndex;
				var child2=child1[i].children;
				console.log(child2);
				sel3.innerHTML='';
				for(var i=0,u=child2.length;i<u;i++){
					sel3.add(new Option(child2[i].name,child2[i].id));
				}
			}
		}
		
		// while(category.lastChild!=this){category.removeChild(category.lastChild);}
		// if(cate.children){createSel(cate.children);}
	}
}
function createSel2(cts){
	var sel4=document.getElementById('select4'),
	 	sel5=document.getElementById('select5'),
		sel6=document.getElementById('select6');
	for(var i=0;i<cts.length;i++){
		sel4.add(new Option(cts[i].name,cts[i].id));
	}
	sel4.onchange=function(){
		var i=this.selectedIndex;
		if(i=='0'){
			sel5.innerHTML='<option value="">市</option>';
			sel6.innerHTML='<option value="">当地门店</option>';
		}else{
			var child1=cts[i-1].children;
			var child2=child1[i-1].children;
			console.log(child1);
			console.log(child2);
			sel5.innerHTML='';
			sel6.innerHTML='';
			for(var i=0,u=child1.length;i<u;i++){
				sel5.add(new Option(child1[i].name,child1[i].id));
			}
			for(var i=0,u=child2.length;i<u;i++){
				sel6.add(new Option(child2[i].name,child2[i].id));
			}
			sel5.onchange=function(){
				var i=this.selectedIndex;
				var child2=child1[i].children;
				console.log(child2);
				sel6.innerHTML='';
				for(var i=0,u=child2.length;i<u;i++){
					sel6.add(new Option(child2[i].name,child2[i].id));
				}
			}
		}
	}
}
// 分享
// $('.a').on('click',function(){$('.share-box').removeClass('hide')});
// 提交
$('#form-submit').on('click', function () {
	var _check = true;
	if ($('#info-phone').val() == '') {
		dialogueTips('请输入电话……');
		_check = false;
	}
	if ($('#info-name').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		dialogueTips('成功！');
	}
});
// 提交2
$('#form-submit2').on('click', function () {
	var _check = true;
	if ($('#info-phone2').val() == '') {
		dialogueTips('请输入电话……');
		_check = false;
	}
	if ($('#info-name2').val() == '') {
		dialogueTips('请输入姓名……');
		_check = false;
	}
	if (_check) {
		dialogueTips('成功！');
	}
});


var loadRES = ['img/icon/boc.png',
'img/bg1.jpg','img/bg2.jpg','img/bg3.jpg',
'img/p1_1.png','img/p1_2.png','img/p1_3.png',
'img/music2.png'
];

loading(loadRES, function () {
	loadPage('welcome');
	createSel(categories);
	createSel2(categories);
});

