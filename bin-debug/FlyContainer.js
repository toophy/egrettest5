// export class GameUtil
//     {
//         /**基于矩形的碰撞检测*/
//         public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
//         {
//             var rect1:egret.Rectangle = obj1.getBounds();
//             var rect2:egret.Rectangle = obj2.getBounds();
//             rect1.x = obj1.x;
//             rect1.y = obj1.y;
//             rect2.x = obj2.x;
//             rect2.y = obj2.y;
//             return rect1.intersects(rect2);
//         }
//     }
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Map = (function () {
    function Map() {
        this.items = {};
    }
    Map.prototype.add = function (key, value) {
        this.items[key] = value;
    };
    Map.prototype.has = function (key) {
        return key in this.items;
    };
    Map.prototype.get = function (key) {
        return this.items[key];
    };
    Map.prototype.del = function (key) {
        if (this.has(key)) {
            this.items[key] = null;
        }
    };
    return Map;
}());
__reflect(Map.prototype, "Map");
// TypeScript file
var FlySceneContainer = (function (_super) {
    __extends(FlySceneContainer, _super);
    function FlySceneContainer(root) {
        var _this = _super.call(this) || this;
        _this.rootContainer = root;
        return _this;
    }
    FlySceneContainer.prototype.createScene = function () {
        // 背景
        var bg = new egret.Bitmap(RES.getRes("bgFly_jpg"));
        bg.width = this.rootContainer.stage.stageWidth;
        bg.height = this.rootContainer.stage.stageHeight;
        this.addChild(bg);
        // 我的飞机
        this.myFly = new Flyer(this, "f1_png", this.rootContainer.stage.stageWidth / 2, this.rootContainer.stage.stageHeight, 1);
        this.addChild(this.myFly);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onFlyTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onFlyTouchEnd, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdateFrame, this);
        // 敌人
        this.enemyFly = new Array();
        for (var i = 1; i < 6; i++) {
            this.makeEnemyFly(i);
        }
        this.enemyBoom = new Array();
        this.myBoom = new Array();
        var testMap = new Map();
        testMap.add("aa", "111");
        testMap.add("bb", "222");
        testMap.del("aa");
    };
    FlySceneContainer.prototype.onUpdateFrame = function (evt) {
        // 判断碰撞
        // 我的飞机子弹
        //     子弹都是矩形, 绘制矩形范围
        //     我的子弹, 碰撞敌方飞机
        // 敌方飞机子弹
        //     敌方子弹, 碰撞我的飞机
        //     矩形碰撞函数
        // 飞机碰撞
    };
    FlySceneContainer.prototype.appendBoom = function (b) {
        if (b.typeCamp == 1) {
            this.myBoom.push(b);
        }
        else {
            this.enemyBoom.push(b);
        }
        this.addChild(b);
    };
    FlySceneContainer.prototype.removeBoom = function (b) {
        if (b.typeCamp == 1) {
            this.myBoom.push(b);
        }
        else {
            this.enemyBoom.push(b);
        }
        this.removeChild(b);
    };
    FlySceneContainer.prototype.onFlyTouchBegin = function (evt) {
        var pos = this.localToGlobal(this.myFly.x, this.myFly.y);
        this.myFlyDragOffsetX = evt.stageX - pos.x;
        this.myFlyDragOffsetY = evt.stageY - pos.y;
        this.rootContainer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onFlyTouchMove, this);
    };
    FlySceneContainer.prototype.onFlyTouchMove = function (evt) {
        var pos = this.globalToLocal(evt.stageX - this.myFlyDragOffsetX, evt.stageY - this.myFlyDragOffsetY);
        this.myFly.moveTo(pos.x, pos.y);
    };
    FlySceneContainer.prototype.onFlyTouchEnd = function (evt) {
        this.rootContainer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onFlyTouchMove, this);
    };
    FlySceneContainer.prototype.makeEnemyFly = function (col) {
        var e = new Flyer(this, "f2_png", this.rootContainer.stage.stageWidth * col * 0.15, 0, 2);
        this.enemyFly.push(e);
        this.addChild(e);
    };
    return FlySceneContainer;
}(egret.Sprite));
__reflect(FlySceneContainer.prototype, "FlySceneContainer");
var Flyer = (function (_super) {
    __extends(Flyer, _super);
    function Flyer(root, pic, x, y, camp) {
        var _this = _super.call(this) || this;
        _this.typeCamp = camp;
        _this.rootContainer = root;
        _this.reset(pic, x, y, camp);
        return _this;
    }
    Flyer.prototype.moveTo = function (x, y) {
        this.x = x;
    };
    Flyer.prototype.isEnemy = function (f) {
        return this.typeCamp != f.typeCamp;
    };
    Flyer.prototype.reset = function (pic, x, y, camp) {
        this.removeChildren();
        if (this.shotBoom) {
            this.shotBoom.removeEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
        }
        this.typeCamp = camp;
        this.pic = pic;
        this.startX = x;
        this.startY = y;
        this.curHP = 100;
        this.maxHP = 100;
        var bmg = new egret.Bitmap(RES.getRes(pic));
        this.x = x - bmg.width / 2;
        this.y = y - bmg.height;
        this.addChild(bmg);
        this.myWidth = bmg.width;
        this.myHeight = bmg.height;
        var sRect = new egret.Shape();
        sRect.graphics.lineStyle(1, 0x00ff00);
        sRect.graphics.drawRect(0, 0, this.myWidth, this.myHeight);
        sRect.graphics.endFill();
        this.addChild(sRect);
        if (camp != 1) {
            this.touchChildren = false;
            egret.Tween.get(this).to({ y: this.y + 1200 }, 6000).call(this.tweenEnd, this);
            this.shotBoom = new egret.Timer(500, 0);
            this.shotBoom.addEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
            this.shotBoom.start();
        }
        else {
            this.shotBoom = new egret.Timer(200, 0);
            this.shotBoom.addEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
            this.shotBoom.start();
        }
    };
    Flyer.prototype.tweenEnd = function () {
        this.reset(this.pic, this.startX, this.startY, this.typeCamp);
    };
    Flyer.prototype.onShotBoom = function (evt) {
        if (this.typeCamp == 1) {
            var bl = new Boom(this.rootContainer, "b1_png", this.x + 10, this.y + this.myHeight / 2, this.typeCamp);
            this.rootContainer.addChild(bl);
            var br = new Boom(this.rootContainer, "b1_png", this.x + this.myWidth - 10, this.y + this.myHeight / 2, this.typeCamp);
            this.rootContainer.addChild(br);
        }
        else {
            var bl = new Boom(this.rootContainer, "b2_png", this.x + 12, this.y + 0 + this.myHeight * 0.95, this.typeCamp);
            this.rootContainer.addChild(bl);
            var br = new Boom(this.rootContainer, "b2_png", this.x + this.myWidth - 12, this.y + 0 + this.myHeight * 0.95, this.typeCamp);
            this.rootContainer.addChild(br);
        }
    };
    return Flyer;
}(egret.Sprite));
__reflect(Flyer.prototype, "Flyer");
var Boom = (function (_super) {
    __extends(Boom, _super);
    function Boom(root, pic, x, y, camp) {
        var _this = _super.call(this) || this;
        _this.typeCamp = camp;
        _this.touchChildren = false;
        _this.rootContainer = root;
        _this.reset(pic, x, y, camp);
        return _this;
    }
    Boom.prototype.isEnemy = function (f) {
        return this.typeCamp != f.typeCamp;
    };
    Boom.prototype.reset = function (pic, x, y, camp) {
        this.removeChildren();
        this.typeCamp = camp;
        this.pic = pic;
        this.startX = x;
        this.startY = y;
        var bmg = new egret.Bitmap(RES.getRes(pic));
        this.x = x - bmg.width / 2;
        this.y = y - bmg.height;
        this.addChild(bmg);
        var sRect = new egret.Shape();
        sRect.graphics.lineStyle(1, 0x0000ff);
        sRect.graphics.drawRect(0, 0, bmg.width, bmg.height);
        sRect.graphics.endFill();
        this.addChild(sRect);
        if (camp != 1) {
            egret.Tween.get(this).to({ y: this.startY + 1200 }, 3000).call(this.tweenEnd, this);
        }
        else {
            egret.Tween.get(this).to({ y: -100 }, 3000).call(this.tweenEnd, this);
        }
    };
    Boom.prototype.tweenEnd = function () {
        this.rootContainer.removeChild(this);
    };
    return Boom;
}(egret.Sprite));
__reflect(Boom.prototype, "Boom");
//# sourceMappingURL=FlyContainer.js.map