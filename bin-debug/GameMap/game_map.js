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
        _this.factory = new dragonBones.EgretFactory();
        _this._left = false;
        _this._right = false;
        _this._player = null;
        _this._bullets = [];
        _this._grounds = [];
        _this.rootContainer = root;
        GameMapContainer.instance = _this;
        return _this;
        //      this._resourceConfigURL = "resource/CoreElement.json";
    }
    GameMapContainer.prototype.createScene = function () {
        GameMapContainer.GROUND = this.rootContainer.stage.stageHeight - 150;
        this.factory.parseDragonBonesData(RES.getRes("dragonBonesData"));
        this.factory.parseTextureAtlasData(RES.getRes("textureDataA"), RES.getRes("textureA"));
        // mouse move        
        var onTouchMove = egret.sys.TouchHandler.prototype.onTouchMove;
        egret.sys.TouchHandler.prototype.onTouchMove = function (x, y, touchPointID) {
            onTouchMove.call(this, x, y, touchPointID);
            GameMapContainer.instance._player.aim(x, y);
        };
        var data = RES.getRes("land_json");
        this._lands = new tgame.LandView();
        this._lands.LoadLand(data);
        this._lands.ShowLand(this);
        this._player = new Mecha();
        this._player.setParent(this, 0, 450);
        // 我的飞机
        // this.myFly = new Role(this, "f1_png", this.rootContainer.stage.stageWidth / 2, this.rootContainer.stage.stageHeight-120, 1);
        // this.addChild(this.myFly);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onFlyTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onFlyTouchEnd, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdateFrame, this);
        document.addEventListener("keydown", this._keyHandler);
        document.addEventListener("keyup", this._keyHandler);
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
    GameMapContainer.prototype.addBullet = function (bullet) {
        this._bullets.push(bullet);
    };
    GameMapContainer.prototype._touchHandler = function (event) {
        this._player.aim(event.stageX, event.stageY);
        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            this._player.attack(true);
        }
        else {
            this._player.attack(false);
        }
    };
    GameMapContainer.prototype._moveGrounds = function (s) {
        for (var _i = 0, _a = this._grounds; _i < _a.length; _i++) {
            var i = _a[_i];
            if (s == 1) {
                i.x += 2 * s;
            }
            else if (s == -1) {
                i.x += 2 * s;
            }
        }
        this._lands.ScrollLand(2 * s);
    };
    GameMapContainer.prototype._keyHandler = function (event) {
        var isDown = event.type == "keydown";
        switch (event.keyCode) {
            case 37:
            case 65:
                GameMapContainer.instance._left = isDown;
                GameMapContainer.instance._updateMove(-1);
                GameMapContainer.instance._moveGrounds(1);
                break;
            case 39:
            case 68:
                GameMapContainer.instance._right = isDown;
                GameMapContainer.instance._updateMove(1);
                GameMapContainer.instance._moveGrounds(-1);
                break;
            case 38:
            case 87:
                if (isDown) {
                    GameMapContainer.instance._player.jump();
                }
                break;
            case 83:
            case 40:
                GameMapContainer.instance._player.squat(isDown);
                break;
            case 81:
                if (isDown) {
                    GameMapContainer.instance._player.switchWeaponR();
                }
                break;
            case 69:
                if (isDown) {
                    GameMapContainer.instance._player.switchWeaponL();
                }
                break;
            case 32:
                if (isDown) {
                    GameMapContainer.instance._player.switchWeaponR();
                    GameMapContainer.instance._player.switchWeaponL();
                }
                break;
        }
    };
    GameMapContainer.prototype._updateMove = function (dir) {
        if (this._left && this._right) {
            this._player.move(dir);
        }
        else if (this._left) {
            this._player.move(-1);
        }
        else if (this._right) {
            this._player.move(1);
        }
        else {
            this._player.move(0);
        }
    };
    GameMapContainer.prototype.onUpdateFrame = function (evt) {
        this._lands.UpdateActor();
        this._player.update();
        var i = this._bullets.length;
        while (i--) {
            var bullet = this._bullets[i];
            if (bullet.update()) {
                this._bullets.splice(i, 1);
            }
        }
        dragonBones.WorldClock.clock.advanceTime(-1);
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
            var i_1 = myBooms_1[_i];
            var enemyFlys = Object.keys(this.enemyFly.items);
            for (var _a = 0, enemyFlys_1 = enemyFlys; _a < enemyFlys_1.length; _a++) {
                var j = enemyFlys_1[_a];
                if (GameUtil.hitTest(this.myBoom.items[i_1], this.enemyFly.items[j])) {
                    this.enemyFly.items[j].onShot();
                    this.myBoom.items[i_1].killed();
                    break;
                }
            }
        }
        // 敌方飞机子弹
        var enemyBooms = Object.keys(this.enemyBoom.items);
        for (var _b = 0, enemyBooms_1 = enemyBooms; _b < enemyBooms_1.length; _b++) {
            var i_2 = enemyBooms_1[_b];
            if (GameUtil.hitTest(this.enemyBoom.items[i_2], this.myFly)) {
                this.myFly.onShot();
                this.enemyBoom.items[i_2].killed();
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
        if (this.myFly && !this.myFly.dead) {
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
//
GameMapContainer.GROUND = 100;
GameMapContainer.G = 0.6;
GameMapContainer.instance = null;
__reflect(GameMapContainer.prototype, "GameMapContainer");
//# sourceMappingURL=game_map.js.map