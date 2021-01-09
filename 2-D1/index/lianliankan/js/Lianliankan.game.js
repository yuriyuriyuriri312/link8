// JavaScript Lianliankan game

// 在全局变量中声明144张图片
var lianliankanGame = {};

$(function (){
	// 检查浏览器版本信息，并设置音效
	checkBrowser();
	
	// 暂停按钮可点击设置
	$("#pauseToContinue").removeAttr("disabled");
	// 刷新按钮可点击设置
	$("#refreshGame").removeAttr("disabled");
});


/*
 * 游戏主函数
 */
function playGame (difficult){
	// 游戏数据初始化（重置）
	resetGame(difficult);
	
	//  给每张牌一个随机-0.5~0.5之间的数，对其排序，达到洗牌效果
   	lianliankanGame.deck.sort(shuffle);
	
	// 复制144张图片
	for (var i=0;i<143;i++){
		// :first-child,子节点过滤器，用于选择给定父元素的首个子节点
		$(".img:first-child").clone().appendTo("#imgs");
	}
    // 初始化每张图片的位置
    $("#imgs").children().each(function(index){
	   // 让纸牌以18×8的形式对齐
		$(this).css({
			// 余数作为列的计数
			"left" : ($(this).width())*(index % 18),
			// 商作为行的计数
			"top" : ($(this).height())*Math.floor(index / 18)
		});
		
		// 从已打乱过的图片中获取图案
	  	var pattern = lianliankanGame.deck.pop();
		// 应用图片的图案，并让其可见，同时取消初始背景图
	  	$(this).find(".photo").addClass(""+pattern).removeClass("bg_img");
		
		// data-pattern 为自定义属性，用来访问自定义数据
		$(this).attr("data-pattern",pattern);
		
		// 在DOM元素中保存索引以便知道下一个图片是什么
		$(this).attr("data-img-index",index);
		
		// 监听每张纸牌的DIV元素的单击事件
	  	$(this).click(selectCard);
	});
}


/* 
 * 获取浏览器版本信息
 * 注：建议使用非IE、safari浏览器，以便达到最佳游戏效果
 */
var plan = "Plan_A";
function checkBrowser() {
	// 根据浏览器版本信息获取配置方案
	if($.browser.msie) {
		if ($.browser.version >= 9.0) {
			plan = "Plan_B";
			$("#imgs").css({left:"36px",top:"41px"});
			$("#popup").css({left:"36px",top:"41px"});
			alert("该浏览器不支持部分CSS3技术，可能会造成游戏布局错位等影响。\n若您想体验最佳游戏效果，建议您更换为其他（非IE）浏览器后继续游戏！\n谢谢您的支持！");
		}
		else {
			plan = "Plan_None";
			alert("由于您的浏览器可能版本过低，若您想体验最佳游戏效果，建议您升级版本，或者更换为其他（非IE）浏览器后继续游戏！\n谢谢您的支持！");
		}
	}
	else if($.browser.safari) { 
		plan = "Plan_None";
		alert("该浏览器不支持部分HTML5技术，若您想体验最佳游戏效果，建议您更换为其他（非IE）浏览器后继续游戏！\n谢谢您的支持！");
	}
	else {
		plan = "Plan_A";
	}
	// 设置背景音效
	if (plan == "Plan_B") {
		$("#audio_bg").attr("src","audio/Plan_B/bg.mp3");
	}
	else if (plan == "Plan_A") {
		$("#audio_bg").attr("src","audio/Plan_A/bg.ogg");
	}
}


/*
 * 设置音效切换效果
 * audioType:声音文件类型，用于判断背景音效切换或其他音效切换
 * audioName:用于切换的音效名称
 */
var closeAudio = false;  // 关闭音效
var closeBack = false;  // 关闭背景音
function audioSwitching (audioType,audioName) {
	if (audioType == "audio_bg" && closeBack == false) {
		// 背景音效切换
		if (plan == "Plan_B") {
			$("#audio_bg").attr("src","audio/Plan_B/" + audioName + ".mp3");
		}
		else if (plan == "Plan_A") {
			$("#audio_bg").attr("src","audio/Plan_A/" + audioName + ".ogg");
		}
	}
	else if (audioType == "audio_other" && closeAudio == false) {
		// 其他音效切换
		if (plan == "Plan_B") {
			$("#audio_other").attr("src","audio/Plan_B/" + audioName + ".mp3");
		}
		else if (plan == "Plan_A") {
			$("#audio_other").attr("src","audio/Plan_A/" + audioName + ".ogg");
		}
	}
	else if (audioType == "audio_alarm") {
		// 提醒音效设置
		if (plan == "Plan_B") {
			$("#audio_alarm").attr("src","audio/Plan_B/" + audioName + ".mp3");
		}
		else if (plan == "Plan_A") {
			$("#audio_alarm").attr("src","audio/Plan_A/" + audioName + ".ogg");
		}
	}
}


/*
 * 初始化图片信息
 */
var difficulty = 12;
function initImgs() {
	var imgs = new Array();
	
	// 从34张图片中随机产生N个图片
	while(true) {
		var temp = Math.floor(Math.random()*36+1);
		var tag = true;
		
		if (imgs.length == 0) {
			imgs.push(temp);
		}
		else {
			/* 遍历数组，看随机数是否重复 */
			$.each(imgs,function() {
				if (this == temp) {
					tag = false;
					return false;
				}
			});
			if (tag) {
				imgs.push(temp);
			}
		}
		/* 数组元素个数达到指定值时，终止循环 */
		//关卡：12、18、24(简单、普通、困难)
		if (imgs.length == difficulty)
			break;
	}
	
	var temp = "";
	/* 遍历数组，设置背景图路径 */
	for (var i=0;i<imgs.length;i++) {
		imgs[i] = "img_"+imgs[i];
		temp+=imgs[i]+"\n";
	}
	
	// 将N个图片凑对成总共144个图片
	lianliankanGame.deck = new Array();
	while(true) {
		$(imgs).each(function() {
			lianliankanGame.deck.push(this);
		});
		if (lianliankanGame.deck.length == 144) {
			break;
		}
	}
}


/*
 * 打乱图片（使用shuffle函数，返回-0.5~0.5之间的一个随机数字）
 */
function shuffle(){
	return 0.5-Math.random();
}


/*
 * 单击图片时，调用检测函数
 */
var lastIndex = ""; // 上一张图片的索引
var imgChecked = false;  // 设置同张图片是否被选中
function selectCard(){
	// 如果该图片已经移除或者处于暂停状态，则return
	if ($(this).attr("class").indexOf("img-removed") > -1 || pause == false) {
		return;
	}
	
	// 设置点击音效
	audioSwitching ("audio_other","choose");
	// 添加图片被选中的标记类
	$(this).addClass("img-flipped");
	
	// 取消所有图片的style样式
	$(".photo").each(function(){
		$(this).attr("style",null);
	});
	
	// 判断是否重复点击同一张图片
	if ($(this).attr("data-img-index") != lastIndex || imgChecked == false) {
		imgChecked = true;
		// 获取背景图信息
		var urlTemp = $(this).children(".photo").css("background-image");
		var pos_sta = urlTemp.lastIndexOf("images") + 7;
		var pos_end = urlTemp.lastIndexOf(".");
		urlTemp = "url(images/"+urlTemp.substring(pos_sta,pos_end)+"_over.gif)";
		// 设置被点击图片
		$(this).children(".photo").css("background-image",urlTemp);
	}
	else if ($(this).attr("data-img-index") == lastIndex && imgChecked) {
		imgChecked = false;
		$(this).removeClass("img-flipped");
	}
	
	// 检测两张已选中的图案
	if ($(".img-flipped").size() == 2) {
		checkPattern(this);
	}
	
	// 设置这一轮被点击图片的索引及对象
	lastIndex = $(this).attr("data-img-index");
}


/*
 * 检查两张点击的图片是否相等
 */
function isMatchPattern(){
	var imgs = $(".img-flipped");
	// data 用来访问代码中定义的自定义数据
	var pattern = $(imgs[0]).data("pattern");
	var anotherPattern = $(imgs[1]).data("pattern");
	// 获取图片位置
	var pos_1 = parseInt($(imgs[0]).attr("data-img-index"));
	var pos_2 = parseInt($(imgs[1]).attr("data-img-index"));
	
	
	if (pattern == anotherPattern) {
		// 获得行号和列号
		var rows = Math.floor(pos_1/18);
		var cols = pos_1%18;
		
		// 判断满足条件的图片，并返回true
		if (pos_2%18 == cols) {
			// 同列相同的情况
			if (cols == 0 || cols == 17) {
				// 第一列和最后一列
				return true;
			}
			else if (Math.abs(pos_1 - pos_2) == 18) {
				// 相邻两张图片
				return true;
			}
		}
		else if (Math.floor(pos_2/18) == rows) {
			// 同行相同的情况
			if (rows == 0 || rows == 7) {
				// 第一行和最后一行
				return true;
			}
			else if (Math.abs(pos_1 - pos_2) == 1) {
				// 相邻两张图片
				return true;
			}
		}
		// 不相邻的情况
		return check(imgs[0],imgs[1]);
	}
	else {
		return false;
	}
}


/*
 * 判断不相邻两张相同图片是否连通（该函数思路及部分代码引自周宇）
 */
function check(startImg,stopImg){
	// 获得两张图片的坐标值
	var row_1 = Math.floor(parseInt($(startImg).attr("data-img-index")/18));
	var row_2 = Math.floor(parseInt($(stopImg).attr("data-img-index")/18));
	var col_1 = Math.floor(parseInt($(startImg).attr("data-img-index")%18));
	var col_2 = Math.floor(parseInt($(stopImg).attr("data-img-index")%18));
	
	// （交换图片位置）
	if(col_1 > col_2){
		var temp = col_1;
		col_1 = col_2;
		col_2 = temp;
		
		temp = row_1;
		row_1 = row_2;
		row_2 = temp;
	}
		
	// 设置矩形图片列表
	var rectangleList = new Array();
	var row = 0;
	for (var i=0;i<8;i++) {
		rectangleList[i] = new Array();
	}
	var col = 0;
	$(".img").each(function() {
		// 设置下标
		if (col >= 18) {
			col = 0;
			row++;
		}
		// 设置二维数组
		rectangleList[row][col] = this;
		col++;
    });
	
	// 水平方向的判定
	for(var i=0;i<8;i++) {
		// 判断此行是否为空
		var noImgs = true;
		for(var j=col_1;j<=col_2;j++){
			if($(rectangleList[i][j]).attr("class").indexOf("img-removed") > -1) {/* 判断改图片是否为空 */}
			else {
				if((i == row_1 && j == col_1) || (i == row_2 && j == col_2)) {/* 判断是否为选中的图片本身 */}
				else {
					// 图片不为空时返回
					noImgs = false;
					break;
				}
			}
		}
		// 判断选中的两点对应的第一行或最后一行的另外两点是否为空白
		if ($(rectangleList[i][col_1]).attr("class").indexOf("img-removed") > -1 
			&& $(rectangleList[i][col_2]).attr("class").indexOf("img-removed") > -1 
			&& (i == 0 || i == 7)) {
			noImgs = true;
		}
		// 判断选中的两点对应的第一行或最后一行的另外两点之一是否为空白
		if ((($(rectangleList[i][col_1]).attr("class").indexOf("img-removed") > -1&&rectangleList[i][col_2] == rectangleList[row_2][col_2])
		|| ($(rectangleList[i][col_2]).attr("class").indexOf("img-removed") > -1&&rectangleList[i][col_1] == rectangleList[row_1][col_1]))
			&& (i == 0 || i == 7)) {
			noImgs = true;
		}
		// 如果为空，则两点是否和该行相连
		if(noImgs) {
			if(checkCol(rectangleList,col_1,row_1,i) && checkCol(rectangleList,col_2,row_2,i)) {
				return true;
			}
		}
	}
	
	if(row_1 > row_2){
		var temp = col_1;
		col_1 = col_2;
		col_2 = temp;
		
		temp = row_1;
		row_1 = row_2;
		row_2 = temp;
	}
	
	// 垂直方向的判定
	for(var i=0;i<18;i++){
		// 判断此列是否为空
		var noImgs = true;
		for(var j=row_1;j<=row_2;j++) {
			if($(rectangleList[j][i]).attr("class").indexOf("img-removed") > -1) {/* 判断改图片是否为空 */}
			else{
				if((i == col_1 && j == row_1) || (i == col_2 && j == row_2)) {/* 判断是否为选中的图片本身 */}
				else {
					// 图片不为空时返回
					noImgs = false;
					break;
				}
			}
			
		}
		// 判断选中的两点对应的第一列或最后一列的另外两点是否为空白
		if ($(rectangleList[row_1][i]).attr("class").indexOf("img-removed") > -1 
			&& $(rectangleList[row_2][i]).attr("class").indexOf("img-removed") > -1 
			&& (i == 0 || i == 17)) {
			noImgs = true;
		}
		// 判断选中的两点对应的第一列或最后一列的另外两点之一是否为空白
		if ((($(rectangleList[row_1][i]).attr("class").indexOf("img-removed") > -1&&rectangleList[row_2][i] == rectangleList[row_2][col_2])
		|| ($(rectangleList[row_2][i]).attr("class").indexOf("img-removed") > -1&&rectangleList[row_1][i] == rectangleList[row_1][col_1]))
			&& (i == 0 || i == 17)) {
			noImgs = true;
		}
		// 如果为空，则两点是否和该行相连
		if(noImgs){
			if(checkRow(rectangleList,row_1,col_1,i) && checkRow(rectangleList,row_2,col_2,i)) {
				return true;
			}	
		}
	}
	return false;
}


/*
 * 判断同一列的两点是否相连（该函数思路及部分代码引自周宇）
 */
function checkCol(rectangleList,col,row_1,row_2) {
	// 交换图片位置
	if(row_1 > row_2){
		var temp = row_1;
		row_1 = row_2;
		row_2 = temp;
	}
	row_1 = parseInt(row_1) + 1;
	for(var i=row_1;i<row_2;i++) {
		if($(rectangleList[i][col]).attr("class").indexOf("img-removed") == -1) {
			// 判断改图片是否不为空
			return false;
		}
	}
	return true;
}


/*
 * 判断同一行的两点是否相连（该函数思路及部分代码引自周宇）
 */
function checkRow(rectangleList,row,col_1,col_2) {
	// 交换图片位置
	if(col_1 > col_2){
		var temp = col_1;
		col_1 = col_2;
		col_2 = temp;
	}
	col_1 = parseInt(col_1) + 1;
	for(var i=col_1;i<col_2;i++) {
		if ($(rectangleList[row][i]).attr("class").indexOf("img-removed") == -1) {
			// 判断改图片是否不为空
			return false;
		}
	}
	return true;
}


/*
 * 当两张图片都选中的时候，将执行下面的函数，控制删除图片还是将前一张图片复原
 */
function checkPattern(obj) {
	if (isMatchPattern()){
		// 设置消除音效
		audioSwitching ("audio_other","disappear1");
		//  将 img-removed 类添加到已配对的两张图片，开始转换
		$(".img-flipped").removeClass("img-flipped").addClass("img-removed");
		
		//  检测所有图片是否都移除并显示游戏结束画面
		if ($(".img").length == 0 || $(".img-removed").length == 144) {
			gameover(true);
		}
	}
	else {
		//  将 img-removed 类移除，使图片恢复原样
		$(".img-flipped").removeClass("img-flipped");
		$(obj).addClass("img-flipped");
	}
}


/*
 * 计算游戏时间
 */
function countTimer() {
	lianliankanGame.elapsedTime--;
	//  计算花费时间的分钟数和秒数
	var minute = Math.floor(lianliankanGame.elapsedTime / 60);
	var second = lianliankanGame.elapsedTime % 60;
	
	// 设置自动随机刷新（不计入手动刷新次数）
	if (second % 15 == Math.floor(Math.random()*5) && lianliankanGame.elapsedTime % 2 == 0) {
		refreshGame("auto");
	}
	//  如果分钟数和秒数小于10时添加填充的0
	if (minute < 10) minute = "0" + minute;
	if (second < 10) second = "0" + second;
	
	//  显示花费时间
	$("#elapsed-time").html(minute+":"+second);
	if (minute == 0 && second == 10) {
		// 设置提醒音效
		audioSwitching ("audio_alarm","alarm");
	}
	if (minute == 0 && second == 0) {
		gameover(false);
	}
}


/*
 * 暂停（继续）游戏
 */
var pause = false; // 游戏是否暂停
var pauseCount = 0; // 游戏暂停次数
function pauseToContinue() {
	if (pauseCount == (difficulty/6-2)) {
		// 同一局中只能暂停...次
		$("#pauseToContinue").attr("disabled","true");
	}
	if (pause) {
		//  暂停计时器
		clearInterval(lianliankanGame.timer);
		$("#pauseToContinue").html("继续");
		pause = false;
		pauseCount++;
		
		// 设置暂停（继续）音效
		audioSwitching ("audio_other","choose");
	}
	else {
		//  启动定时器
		lianliankanGame.timer = setInterval(countTimer,1000);
		$("#pauseToContinue").html("暂停（"+(difficulty/6-2-pauseCount)+"）");
		pause = true;
		
		if (pauseCount != 0) {
			// 设置继续音效
			audioSwitching ("audio_other","item2");
		}
	}
}


/*
 * 刷新游戏
 */
var refreshCount = 0; // 游戏刷新次数
function refreshGame(type) {
	// 设置重置（刷新）音效
	audioSwitching ("audio_alarm","item1");
	
	if (type == "auto") {}
	else {
		if (refreshCount == (difficulty/6-3)) {
			// 同一局中只能刷新...次
			$("#refreshGame").attr("disabled","true");
		}
		// 重写刷新按钮内容
		$("#refreshGame").html("刷新（"+(difficulty/6-3-refreshCount)+"）");
		refreshCount++;
	}
	
	var newObj = new Array();
	// 清空所有图片元素并添加进临时数组
	$("#imgs").children().each(function(){
		newObj.push(this);
		$(this).remove();
	});
	
	// 打乱所有图片位置
	newObj.sort(shuffle);
	// 刷新每张图片的位置
    $(newObj).each(function(index){
		$(this).appendTo("#imgs");
		// 让纸牌以18×8的形式对齐
		$(this).css({
			// 余数作为列的计数
			"left" : ($(this).width())*(index % 18),
			// 商作为行的计数
			"top" : ($(this).height())*Math.floor(index / 18)
		});
		// 设置刷新后的索引值
		$(this).attr("data-img-index",index);
		
		// 监听每张纸牌的DIV元素的单击事件
	  	$(this).click(selectCard);
	});
}


/*
 * 设置背景、音效的开启关闭
 */
function soundSet(type) {
	if (type == "ef") {
		if (closeAudio) {
			// 关闭音效
			closeAudio = false;
			$("#ef_audio").css("background-image","url(images/game_bg/au_close.png)");
		}
		else {
			// 开启音效
			closeAudio = true;
			$("#ef_audio").css("background-image","url(images/game_bg/au_open.png)");
		}
	}
	else if (type == "bg") {
		if (closeBack) {
			// 关闭背景
			closeBack = false;
			$("#bg_audio").css("background-image","url(images/game_bg/bg_close.png)");
			document.getElementById("audio_bg").play();
		}
		else {
			// 开启背景
			closeBack = true;
			$("#bg_audio").css("background-image","url(images/game_bg/bg_open.png)");
			document.getElementById("audio_bg").pause();
		}
	}
	// 设置点击音效
	audioSwitching ("audio_other","choose");
}


/*
 * 重置游戏设置
 */
function resetGame(difficult) {
	// 设置难易度
	difficulty = parseInt(difficult);
	// 隐藏菜单
	$("#popup").addClass("hide");
	
	// 设置重置（刷新）音效
	audioSwitching ("audio_other","item1");
	// 设置游戏背景音乐
	audioSwitching ("audio_bg","back2new");
	
	// 重置暂停标记
	pause = false;
	// 清空暂停次数
	pauseCount = 0;
	// 暂停按钮可点击设置
	$("#pauseToContinue").removeAttr("disabled");
	
	// 清空刷新次数
	refreshCount = 0;
	// 重写刷新按钮内容
	$("#refreshGame").html("刷新（"+(difficulty/6-2-refreshCount)+"）");
	// 刷新按钮可点击设置
	$("#refreshGame").removeAttr("disabled");
	
	// 初始化图片信息
	initImgs();
	
	// 将花费时间重置为:
	lianliankanGame.elapsedTime = 200 - ((600 - difficulty*30) / 60);
	
	// 启动定时器
	pauseToContinue();
}


/*
 * 游戏结束
 */
function gameover(isWin){
	//  停止计时器
	clearInterval(lianliankanGame.timer);
	
	//  显示游戏结束弹出框
	if (isWin) {
		$("#isWin").html(" &nbsp;胜 利 !");
		// 设置胜利音效
		audioSwitching ("audio_alarm","win");
	}
	else {
		$("#isWin").html(" &nbsp;失 败 !");
		// 设置失败音效
		audioSwitching ("audio_alarm","lose");
	}
	
	// 清空所有图片元素
	$("#imgs").children().each(function(){
		$(this).remove();
	});
	// 重置游戏初始图片
	$("#imgs").append("<div class='img'><div class='photo bg_img'></div></div>");
	
	// 设置背景音乐
	audioSwitching ("audio_bg","bg");
	// 显示菜单
	$("#popup").removeClass("hide");
	
	// 暂停按钮可点击设置
	$("#pauseToContinue").removeAttr("disabled");
	// 刷新按钮可点击设置
	$("#refreshGame").removeAttr("disabled");
}