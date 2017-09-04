
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/experimental/experimental.js",
	"libs/modules/socket/socket.js",
	"libs/modules/egret3d/egret3d.js",
	"libs/modules/dragonBones/dragonBones.js",
	"bin-debug/GameTest/util.js",
	"bin-debug/GameTest/scene_set.js",
	"bin-debug/GameMap/CoreElement.js",
	"bin-debug/GameMap/game_map.js",
	"bin-debug/GameMap/Role.js",
	"bin-debug/GameMap/SkillBoom.js",
	"bin-debug/GameMap/zhangAi.js",
	"bin-debug/GameTest/MyLand.js",
	"bin-debug/GameTest/scene_obj.js",
	"bin-debug/GameTest/scene_page.js",
	"bin-debug/GameMap/BaseTest.js",
	"bin-debug/GameTest/scene.js",
	"bin-debug/GameTest/stage.js",
	"bin-debug/FlyContainer.js",
	"bin-debug/GameTest/ViewLand.js",
	"bin-debug/KeyBoard.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/TestContainer.js",
	"bin-debug/Util.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1136,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};