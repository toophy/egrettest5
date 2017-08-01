var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var GameMapContainer = (function (_super) {
    __extends(GameMapContainer, _super);
    function GameMapContainer(root) {
        var _this = _super.call(this) || this;
        _this.rootContainer = root;
        return _this;
    }
    GameMapContainer.prototype.createScene = function () {
        // 背景
        var bg = new egret.Bitmap(RES.getRes("nbg_4_png"));
        //bg.width = this.rootContainer.stage.stageWidth;
        //bg.height = this.rootContainer.stage.stageHeight;
        bg.y = this.rootContainer.stage.stageHeight - bg.height;
        this.addChild(bg);
        // 背景
        var bg3 = new egret.Bitmap(RES.getRes("nbg_2_png"));
        //bg3.width = this.rootContainer.stage.stageWidth;
        // bg3.height = this.rootContainer.stage.stageHeight;
        bg3.y = this.rootContainer.stage.stageHeight - bg3.height - 50;
        this.addChild(bg3);
        // 我的飞机
        this.myFly = new Role(this, "f1_png", this.rootContainer.stage.stageWidth / 2, this.rootContainer.stage.stageHeight, 1);
        this.addChild(this.myFly);
        // 背景
        var bg4 = new egret.Bitmap(RES.getRes("nbg_3_png"));
        //bg4.width = this.rootContainer.stage.stageWidth;
        //bg4.height = this.rootContainer.stage.stageHeight;
        bg4.y = this.rootContainer.stage.stageHeight - bg4.height;
        this.addChild(bg4);
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
        // 动态障碍
        // this.zhangAi = new Zhangai(this);
        // this.zhangAi.append("a", 0, 200, 700, 100);
        // this.zhangAi.append("b", 0, 500, 700, 100);
        // this.zhangAi.append("c1", 0, 800, 100, 100);
        // this.zhangAi.append("c2", 200, 800, 200, 100);
        // this.addChild(this.zhangAi);
        // let testMap: MapNum<string> = new MapNum<string>();
        // testMap.add(1, "111");
        // testMap.add(1, "222");
        // testMap.add(3, "333");
        // console.log(Object.length);
        // Object.keys(testMap.items).forEach(key => {
        //     console.log(testMap.items[key])
        // })
    };
    GameMapContainer.prototype.onUpdateFrame = function (evt) {
        // 判断碰撞
        // 我的飞机碰撞墙壁
        if (this.zhangAi) {
            if (this.zhangAi.hitTest(this.myFly)) {
                // 停止飞机移动
                this.myFly.stopMove(this.myFly.x, this.myFly.y);
            }
        }
        // 我的飞机子弹
        var myBooms = Object.keys(this.myBoom.items);
        for (var _i = 0, myBooms_1 = myBooms; _i < myBooms_1.length; _i++) {
            var i = myBooms_1[_i];
            var enemyFlys = Object.keys(this.enemyFly.items);
            for (var _a = 0, enemyFlys_1 = enemyFlys; _a < enemyFlys_1.length; _a++) {
                var j = enemyFlys_1[_a];
                if (GameUtil.hitTest(this.myBoom.items[i], this.enemyFly.items[j])) {
                    this.enemyFly.items[j].onShot();
                    this.myBoom.items[i].killed();
                    break;
                }
            }
        }
        // 敌方飞机子弹
        var enemyBooms = Object.keys(this.enemyBoom.items);
        for (var _b = 0, enemyBooms_1 = enemyBooms; _b < enemyBooms_1.length; _b++) {
            var i = enemyBooms_1[_b];
            if (GameUtil.hitTest(this.enemyBoom.items[i], this.myFly)) {
                this.myFly.onShot();
                this.enemyBoom.items[i].killed();
            }
        }
        // 飞机不够多, 再生产
        // if (this.enemyFly.getCount() < 2) {
        //     let randCol = Math.floor(Math.random() * 6) + 1;
        //     this.createEnemyFly(randCol);
        // }
    };
    GameMapContainer.prototype.appendFlyer = function (b) {
        if (b.typeCamp != 1) {
            this.enemyFly.add(b.flyID, b);
            this.freeFly.del(b.flyID);
        }
        this.addChild(b);
    };
    GameMapContainer.prototype.removeFlyer = function (b) {
        if (b.typeCamp != 1) {
            this.enemyFly.del(b.flyID);
            this.freeFly.add(b.flyID, b);
        }
        this.removeChild(b);
    };
    GameMapContainer.prototype.appendBoom = function (b) {
        if (b.typeCamp == 1) {
            this.myBoom.add(b.boomID, b);
        }
        else {
            this.enemyBoom.add(b.boomID, b);
        }
        this.freeBoom.del(b.boomID);
        this.addChild(b);
    };
    GameMapContainer.prototype.removeBoom = function (b) {
        if (b.typeCamp == 1) {
            if (this.myBoom.has(b.boomID)) {
                this.myBoom.del(b.boomID);
                this.freeBoom.add(b.boomID, b);
                this.removeChild(b);
            }
        }
        else {
            if (this.enemyBoom.has(b.boomID)) {
                this.enemyBoom.del(b.boomID);
                this.freeBoom.add(b.boomID, b);
                this.removeChild(b);
            }
        }
    };
    GameMapContainer.prototype.onFlyTouchBegin = function (evt) {
        // if (!this.myFly.dead) {
        //     let pos = this.localToGlobal(this.myFly.x, this.myFly.y);
        //     this.myFlyDragOffsetX = evt.stageX - pos.x;
        //     this.myFlyDragOffsetY = evt.stageY - pos.y;
        //     this.rootContainer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onFlyTouchMove, this);
        // }
    };
    GameMapContainer.prototype.onFlyTouchMove = function (evt) {
        // if (!this.myFly.dead) {
        //     let pos = this.globalToLocal(evt.stageX - this.myFlyDragOffsetX, evt.stageY - this.myFlyDragOffsetY);
        //     this.myFly.moveTo(pos.x, pos.y);
        // }
    };
    GameMapContainer.prototype.onFlyTouchEnd = function (evt) {
        //this.rootContainer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onFlyTouchMove, this);
        if (!this.myFly.dead) {
            var pos = this.globalToLocal(evt.stageX, evt.stageY);
            if (this.zhangAi && !this.zhangAi.hitTest(this.myFly)) {
                this.myFly.moveTo(pos.x, pos.y);
            }
        }
    };
    GameMapContainer.prototype.createEnemyFly = function (col) {
        var fly = this.makeFlyer(this.rootContainer.stage.stageWidth * col * 0.15, 0, 2);
        this.appendFlyer(fly);
        return fly;
    };
    GameMapContainer.prototype.createBoom = function (x, y, camp) {
        var bl = this.makeBoom(x, y, camp);
        this.appendBoom(bl);
        return bl;
    };
    GameMapContainer.prototype.makeFlyer = function (x, y, camp) {
        if (this.freeFly.getCount() > 0) {
            var f = this.freeFly.items[Object.keys(this.freeFly.items)[0]];
            f.reset("f2_png", x, y, camp);
            return f;
        }
        var e = new Role(this, "f2_png", x, y, camp);
        e.flyID = this.freeFly.getMaxKey() + 1;
        this.freeFly.add(e.flyID, e);
        return e;
    };
    GameMapContainer.prototype.makeBoom = function (x, y, camp) {
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
            bl = new SkillBoom(this, "b1_png", x, y, camp);
        }
        else {
            bl = new SkillBoom(this, "b2_png", x, y, camp);
        }
        bl.boomID = this.freeBoom.getMaxKey() + 1;
        this.freeBoom.add(bl.boomID, bl);
        return bl;
    };
    return GameMapContainer;
}(egret.Sprite));
__reflect(GameMapContainer.prototype, "GameMapContainer");
//# sourceMappingURL=game_map.js.map