var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var TestContainer = (function (_super) {
    __extends(TestContainer, _super);
    function TestContainer(root) {
        var _this = _super.call(this) || this;
        _this.rootContainer = root;
        return _this;
    }
    TestContainer.prototype.createScene = function () {
        var _this = this;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x336699, 100);
        bg.graphics.drawRect(0, 0, this.rootContainer.stage.stageWidth, this.rootContainer.stage.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        var sprite1 = new egret.Sprite();
        sprite1.x = 100;
        sprite1.y = 100;
        sprite1.width = 250;
        sprite1.height = 400;
        // sprite1.scrollRect = new egret.Rectangle(0, 0, 250, 400);
        // sprite1.cacheAsBitmap = true;
        // sprite1.scaleX = 1.5;
        // sprite1.scaleY = 2.0;
        var cicle = new egret.Shape();
        cicle.graphics.beginFill(0x336600, 90);
        cicle.anchorOffsetX = 0;
        cicle.anchorOffsetY = 0;
        cicle.graphics.drawCircle(0, 0, 30);
        cicle.graphics.endFill();
        cicle.touchEnabled = true;
        cicle.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        cicle.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchStop, this);
        sprite1.addChild(cicle);
        var cicle2 = new egret.Shape();
        cicle2.graphics.beginFill(0x556622, 90);
        cicle2.anchorOffsetX = 0;
        cicle2.anchorOffsetY = 0;
        cicle2.graphics.drawCircle(60, 100, 30);
        cicle2.graphics.endFill();
        cicle2.touchEnabled = true;
        cicle2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        cicle2.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchStop, this);
        sprite1.addChild(cicle2);
        var text1 = new egret.TextField();
        text1.text = "第一行字";
        text1.size = 16;
        text1.x = 0;
        text1.y = 60;
        text1.touchEnabled = true;
        text1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchText1, this);
        sprite1.addChild(text1);
        var textLine = new egret.Shape();
        textLine.graphics.lineStyle(2, 0x773300); // 5像素粗细， 颜色
        textLine.graphics.drawRect(text1.x, text1.y, text1.width, text1.height);
        textLine.graphics.endFill(); //结束绘图
        sprite1.addChild(textLine);
        var spriteLine = new egret.Shape();
        spriteLine.graphics.lineStyle(2, 0x770000); // 5像素粗细， 颜色
        spriteLine.graphics.drawRect(sprite1.x, sprite1.y, sprite1.width, sprite1.height);
        spriteLine.graphics.endFill(); //结束绘图
        this.addChild(spriteLine);
        this.addChild(sprite1);
        var bmp1 = new egret.Bitmap(RES.getRes("ctm_jpg"));
        bmp1.x = 0;
        bmp1.y = 190;
        bmp1.width = sprite1.width;
        bmp1.height = sprite1.height - 90;
        sprite1.addChild(bmp1);
        // let renderTexture:egret.RenderTexture = new egret.RenderTexture();
        // renderTexture.drawToTexture(sprite1);
        // renderTexture.saveToFile("image/png","a/sprite1.png",new egret.Rectangle(0,0,sprite1.width,sprite1.height));
        var hitRslt = bmp1.hitTestPoint(sprite1.x + 10, sprite1.y + 91);
        if (hitRslt) {
            var text2 = new egret.TextField();
            text2.text = "hit ok";
            text2.x = 100;
            text2.y = 30;
            text2.strokeColor = 0x000000;
            text2.stroke = 2;
            sprite1.addChild(text2);
        }
        else {
            var text3 = new egret.TextField();
            text3.text = "hit failed";
            text3.x = 100;
            text3.y = 30;
            text3.strokeColor = 0x000000;
            text3.stroke = 1;
            sprite1.addChild(text3);
        }
        egret.log("bmp1 index =%d", sprite1.getChildIndex(bmp1));
        var urlreq = new egret.URLRequest("http://httpbin.org/user-agent");
        var urlloader = new egret.URLLoader();
        urlloader.addEventListener(egret.Event.COMPLETE, function (evt) {
            egret.log("%s", evt.target.data);
        }, this);
        urlloader.load(urlreq);
        this.dragStageStart = new egret.Point(0, 0);
        this.updateCicleTimer = new egret.Timer(1000, 30);
        this.updateCicleTimer.addEventListener(egret.TimerEvent.TIMER, function () {
            var x = Math.floor(Math.random() * 200);
            var y = Math.floor(Math.random() * 200);
            var color = (Math.floor(Math.random() * 254) + 1) | (Math.floor(Math.random() * 254) + 1) << 8 | (Math.floor(Math.random() * 254) + 1) << 16;
            var c = new egret.Shape();
            c.graphics.beginFill(color, 100);
            c.graphics.drawCircle(x, y, 10);
            c.graphics.endFill();
            _this.addChild(c);
        }, this);
        this.updateCicleTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () { egret.log("timer end"); }, this);
        this.updateCicleTimer.start();
    };
    TestContainer.prototype.onTouchText1 = function (evt) {
        var text1 = evt.currentTarget;
        text1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchText1, this);
        if (Math.floor(Math.random() * 100) < 50) {
            text1.textColor = 0x001133;
            var sound = RES.getRes("天鹅湖-柴可夫斯基 - 新雅室内乐_mp3");
            var soundChannel = sound.play(0, 1);
        }
        else {
            text1.textColor = 0x006633;
        }
    };
    TestContainer.prototype.onTouchStart = function (evt) {
        this.dragObj = evt.currentTarget;
        var dragPos = this.dragObj.parent.localToGlobal(this.dragObj.x, this.dragObj.y);
        this.dragOffsetX = evt.stageX - dragPos.x;
        this.dragOffsetY = evt.stageY - dragPos.y;
        // this.dragStageStart.x = evt.stageX - this.dragObj.parent.x;
        // this.dragStageStart.y = evt.stageY - this.dragObj.parent.y;
        this.dragObj.parent.addChild(this.dragObj);
        this.rootContainer.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        egret.log("start");
    };
    TestContainer.prototype.onTouchStop = function (evt) {
        this.rootContainer.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        egret.log("stop");
    };
    TestContainer.prototype.onTouchMove = function (evt) {
        var dragPos = this.dragObj.parent.globalToLocal(evt.stageX - this.dragOffsetX, evt.stageY - this.dragOffsetY);
        this.dragObj.x = dragPos.x;
        this.dragObj.y = dragPos.y;
        // this.dragObj.parent.scrollRect.x = evt.stageX - this.dragStageStart.x - this.dragObj.parent.x;
        // this.dragObj.parent.scrollRect.y = evt.stageY - this.dragStageStart.y - this.dragObj.parent.y;
    };
    return TestContainer;
}(egret.Sprite));
__reflect(TestContainer.prototype, "TestContainer");
//# sourceMappingURL=TestContainer.js.map