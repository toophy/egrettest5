var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        this.freeFly = new MapNum();
        this.enemyFly = new MapNum();
        // 子弹
        this.freeBoom = new MapNum();
        this.enemyBoom = new MapNum();
        this.myBoom = new MapNum();
        // let testMap: MapNum<string> = new MapNum<string>();
        // testMap.add(1, "111");
        // testMap.add(1, "222");
        // testMap.add(3, "333");
        // console.log(Object.length);
        // Object.keys(testMap.items).forEach(key => {
        //     console.log(testMap.items[key])
        // })
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
        // 
        // 飞机不够多, 再生产
        if (this.enemyFly.getCount() < 3) {
            var randCol = Math.floor(Math.random() * 6) + 1;
            this.createEnemyFly(randCol);
        }
    };
    FlySceneContainer.prototype.appendFlyer = function (b) {
        if (b.typeCamp != 1) {
            this.enemyFly.add(b.flyID, b);
        }
        this.freeFly.del(b.flyID);
        this.addChild(b);
    };
    FlySceneContainer.prototype.removeFlyer = function (b) {
        if (b.typeCamp != 1) {
            this.enemyFly.del(b.flyID);
        }
        this.freeFly.add(b.flyID, b);
        this.removeChild(b);
    };
    FlySceneContainer.prototype.appendBoom = function (b) {
        if (b.typeCamp == 1) {
            this.myBoom.add(b.boomID, b);
        }
        else {
            this.enemyBoom.add(b.boomID, b);
        }
        this.freeBoom.del(b.boomID);
        this.addChild(b);
    };
    FlySceneContainer.prototype.removeBoom = function (b) {
        if (b.typeCamp == 1) {
            this.myBoom.del(b.boomID);
        }
        else {
            this.enemyBoom.del(b.boomID);
        }
        this.freeBoom.add(b.boomID, b);
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
    FlySceneContainer.prototype.createEnemyFly = function (col) {
        var fly = this.makeFlyer(this.rootContainer.stage.stageWidth * col * 0.15, 0, 2);
        this.appendFlyer(fly);
        return fly;
    };
    FlySceneContainer.prototype.createBoom = function (x, y, camp) {
        var bl = this.makeBoom(x, y, camp);
        this.appendBoom(bl);
        return bl;
    };
    FlySceneContainer.prototype.makeFlyer = function (x, y, camp) {
        if (this.freeFly.getCount() > 0) {
            var f = this.freeFly.items[Object.keys(this.freeFly.items)[0]];
            f.reset("f2_png", x, y, camp);
            return f;
        }
        var e = new Flyer(this, "f2_png", x, y, camp);
        e.flyID = this.freeFly.getMaxKey() + 1;
        this.freeFly.add(e.flyID, e);
        return e;
    };
    FlySceneContainer.prototype.makeBoom = function (x, y, camp) {
        if (this.freeBoom.getCount() > 0) {
            var bl_1 = this.freeBoom.items[Object.keys(this.freeBoom.items)[0]];
            if (camp == 1) {
                bl_1.reset("b1_png", x, y, camp);
            }
            else {
                bl_1.reset("b2_png", x, y, camp);
            }
            return bl_1;
        }
        var bl;
        if (camp == 1) {
            bl = new Boom(this, "b1_png", x, y, camp);
        }
        else {
            bl = new Boom(this, "b2_png", x, y, camp);
        }
        bl.boomID = this.freeBoom.getMaxKey() + 1;
        this.freeBoom.add(bl.boomID, bl);
        return bl;
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
        _this.flyID = 0;
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
        if (this.pic == pic && this.typeCamp == camp) {
            if (this.shotBoom) {
                this.shotBoom.stop();
                this.shotBoom.removeEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
                this.shotBoom = undefined;
            }
            this.startX = x;
            this.startY = y;
            this.curHP = 100;
            this.maxHP = 100;
            this.dead = false;
            this.x = x - this.myWidth / 2;
            this.y = y - this.myHeight;
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
        }
        else {
            this.removeChildren();
            if (this.shotBoom) {
                this.shotBoom.stop();
                this.shotBoom.removeEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
                this.shotBoom = undefined;
            }
            this.typeCamp = camp;
            this.pic = pic;
            this.startX = x;
            this.startY = y;
            this.curHP = 100;
            this.maxHP = 100;
            this.dead = false;
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
        }
    };
    Flyer.prototype.tweenEnd = function () {
        if (this.shotBoom) {
            this.shotBoom.stop();
            this.shotBoom.removeEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
            this.shotBoom = undefined;
        }
        this.rootContainer.removeFlyer(this);
    };
    Flyer.prototype.onShotBoom = function (evt) {
        if (this.typeCamp == 1) {
            this.rootContainer.createBoom(this.x + 10, this.y + this.myHeight / 2, this.typeCamp);
            this.rootContainer.createBoom(this.x + this.myWidth - 10, this.y + this.myHeight / 2, this.typeCamp);
        }
        else {
            this.rootContainer.createBoom(this.x + 12, this.y + 0 + this.myHeight * 0.95, this.typeCamp);
            this.rootContainer.createBoom(this.x + this.myWidth - 12, this.y + 0 + this.myHeight * 0.95, this.typeCamp);
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
        _this.boomID = 0;
        _this.reset(pic, x, y, camp);
        return _this;
    }
    Boom.prototype.isEnemy = function (f) {
        return this.typeCamp != f.typeCamp;
    };
    Boom.prototype.reset = function (pic, x, y, camp) {
        if (this.pic == pic && this.typeCamp == camp) {
            this.startX = x;
            this.startY = y;
            this.dead = false;
            if (camp != 1) {
                egret.Tween.get(this).to({ y: this.startY + 1200 }, 3000).call(this.tweenEnd, this);
            }
            else {
                egret.Tween.get(this).to({ y: -100 }, 3000).call(this.tweenEnd, this);
            }
        }
        else {
            this.removeChildren();
            this.typeCamp = camp;
            this.pic = pic;
            this.startX = x;
            this.startY = y;
            this.dead = false;
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
        }
    };
    Boom.prototype.tweenEnd = function () {
        this.rootContainer.removeBoom(this);
    };
    return Boom;
}(egret.Sprite));
__reflect(Boom.prototype, "Boom");
//# sourceMappingURL=FlyContainer.js.map