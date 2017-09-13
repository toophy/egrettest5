// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tgame;
(function (tgame) {
    // 岛屿上分块
    var IslandUpBlock = (function () {
        function IslandUpBlock() {
        }
        return IslandUpBlock;
    }());
    tgame.IslandUpBlock = IslandUpBlock;
    __reflect(IslandUpBlock.prototype, "tgame.IslandUpBlock");
    // 岛屿中分块
    var IslandMiddleBlock = (function () {
        function IslandMiddleBlock() {
        }
        return IslandMiddleBlock;
    }());
    tgame.IslandMiddleBlock = IslandMiddleBlock;
    __reflect(IslandMiddleBlock.prototype, "tgame.IslandMiddleBlock");
    // 岛屿下分块
    var IslandDownBlock = (function () {
        function IslandDownBlock() {
        }
        return IslandDownBlock;
    }());
    tgame.IslandDownBlock = IslandDownBlock;
    __reflect(IslandDownBlock.prototype, "tgame.IslandDownBlock");
    // 岛屿
    var Island = (function () {
        function Island() {
        }
        return Island;
    }());
    tgame.Island = Island;
    __reflect(Island.prototype, "tgame.Island");
    // 陆地配置
    var LandConfig = (function () {
        function LandConfig() {
        }
        return LandConfig;
    }());
    tgame.LandConfig = LandConfig;
    __reflect(LandConfig.prototype, "tgame.LandConfig");
    // 行
    var CnfRowBlock = (function () {
        function CnfRowBlock() {
        }
        return CnfRowBlock;
    }());
    tgame.CnfRowBlock = CnfRowBlock;
    __reflect(CnfRowBlock.prototype, "tgame.CnfRowBlock");
    var CnfCityRow = (function () {
        function CnfCityRow() {
        }
        return CnfCityRow;
    }());
    tgame.CnfCityRow = CnfCityRow;
    __reflect(CnfCityRow.prototype, "tgame.CnfCityRow");
    var CnfCity = (function () {
        function CnfCity() {
        }
        return CnfCity;
    }());
    tgame.CnfCity = CnfCity;
    __reflect(CnfCity.prototype, "tgame.CnfCity");
    // 建筑
    var CnfBuildBlock = (function () {
        function CnfBuildBlock() {
        }
        return CnfBuildBlock;
    }());
    tgame.CnfBuildBlock = CnfBuildBlock;
    __reflect(CnfBuildBlock.prototype, "tgame.CnfBuildBlock");
    var CnfBuildRow = (function () {
        function CnfBuildRow() {
        }
        return CnfBuildRow;
    }());
    tgame.CnfBuildRow = CnfBuildRow;
    __reflect(CnfBuildRow.prototype, "tgame.CnfBuildRow");
    var CnfBuild = (function () {
        function CnfBuild() {
        }
        return CnfBuild;
    }());
    tgame.CnfBuild = CnfBuild;
    __reflect(CnfBuild.prototype, "tgame.CnfBuild");
    // 演员
    var CnfActorBlock = (function () {
        function CnfActorBlock() {
        }
        return CnfActorBlock;
    }());
    tgame.CnfActorBlock = CnfActorBlock;
    __reflect(CnfActorBlock.prototype, "tgame.CnfActorBlock");
    var CnfActorRow = (function () {
        function CnfActorRow() {
        }
        return CnfActorRow;
    }());
    tgame.CnfActorRow = CnfActorRow;
    __reflect(CnfActorRow.prototype, "tgame.CnfActorRow");
    var CnfActor = (function () {
        function CnfActor() {
        }
        return CnfActor;
    }());
    tgame.CnfActor = CnfActor;
    __reflect(CnfActor.prototype, "tgame.CnfActor");
    var CnfLand = (function () {
        function CnfLand() {
        }
        return CnfLand;
    }());
    tgame.CnfLand = CnfLand;
    __reflect(CnfLand.prototype, "tgame.CnfLand");
    // easy ai
    var EasyAI = (function () {
        function EasyAI() {
            this._left = false;
            this._right = false;
            this._actor = null;
            this._state = 0;
            this._lastTime = new Date().getTime();
            this._player = false;
        }
        EasyAI.prototype.setActor = function (a) {
            this._actor = a;
        };
        EasyAI.prototype.getActor = function () {
            return this._actor;
        };
        EasyAI.prototype.enablePlayer = function (e) {
            this._player = e;
            if (this._player) {
                //"null":
                this._state = 0;
                this._left = false;
                this._right = false;
                this._actor.attack(false);
                this._updateMove(0);
                this._lastTime = new Date().getTime() + 1000;
            }
        };
        EasyAI.prototype.update = function () {
            if (this._player) {
                return;
            }
            var now = new Date().getTime();
            if (now > this._lastTime) {
                var new_state = Math.floor(Math.random() * 9);
                if (new_state != this._state || this._state != 0) {
                    this._state = new_state;
                    switch (this._state) {
                        case 0:
                            this._left = false;
                            this._right = false;
                            this._updateMove(0);
                            this._lastTime = new Date().getTime() + 1000;
                            break;
                        case 1:
                            this._left = true;
                            this._right = false;
                            this._updateMove(-1);
                            this._lastTime = new Date().getTime() + 3000;
                            break;
                        case 2:
                            this._right = true;
                            this._left = false;
                            this._updateMove(1);
                            this._lastTime = new Date().getTime() + 3000;
                            break;
                        case 3:
                            this._actor.jump();
                            this._lastTime = new Date().getTime() + 3000;
                            break;
                        case 4:
                            this._actor.switchWeaponR();
                            this._lastTime = new Date().getTime() + 500;
                            break;
                        case 5:
                            this._actor.switchWeaponL();
                            this._lastTime = new Date().getTime() + 500;
                            break;
                        case 6:
                            this._actor.attack(true);
                            this._lastTime = new Date().getTime() + 1000;
                            break;
                        case 7:
                            this._actor.attack(false);
                            this._lastTime = new Date().getTime() + 500;
                            break;
                        case 8:
                            this.saySome(EasyAI._says[Math.floor(Math.random() * EasyAI._says.length)]);
                            break;
                    }
                }
            }
            else {
                switch (this._state) {
                    case 1:
                        this._left = true;
                        this._right = false;
                        this._updateMove(-1);
                        break;
                    case 2:
                        this._right = true;
                        this._left = false;
                        this._updateMove(1);
                        break;
                    case 3:
                        this._actor.jump();
                        break;
                    case 4:
                        break;
                }
            }
        };
        EasyAI.prototype._updateMove = function (dir) {
            if (this._player) {
                egret.log("updateMove");
            }
            if (this._left && this._right) {
                this._actor.move(dir);
            }
            else if (this._left) {
                this._actor.move(-1);
            }
            else if (this._right) {
                this._actor.move(1);
            }
            else {
                this._actor.move(0);
            }
        };
        EasyAI.prototype.saySome = function (s) {
            this._actor.saySome(s);
        };
        return EasyAI;
    }());
    EasyAI._says = ["呵呵呵", "哈哈哈", "嘿嘿嘿", "叽叽叽叽", "O(∩_∩)O哈哈哈~", "吼吼吼"];
    tgame.EasyAI = EasyAI;
    __reflect(EasyAI.prototype, "tgame.EasyAI");
    var LandView = (function () {
        function LandView() {
            this.up_height = 240;
            this.up2_height = 100; //66;
            this.middle_height = 200; //76;
            this.down_height = 100; //62;
            this.citySprite = [];
            this._actors = [];
            this._bullets = [];
            this._easyActorAI = [];
            this._bulletSprite = null;
            this._player = null;
            this._playerAI = null;
            this._viewPos = new egret.Point();
            this._targetViewPos = new egret.Point();
            this._targetViewSpeed = 0.1;
            this._targetViewRun = false;
            this._bulletSprite = new egret.Sprite();
        }
        LandView.prototype.loadCityUp = function () {
            var cts = new egret.Sprite();
            cts.x = 0;
            cts.y = 0;
            this.citySprite.push(cts);
            var i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].up, i * 1136, 0, 1136, this.up_height);
                }
                ++i;
            }
            i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].up, i * 1136, 0, 1136, this.up_height);
                }
                ++i;
            }
            i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.actors[p] != null) {
                    this.LoadCityActor(cts, this.cnfs.actors[p].up, i * 1136, 0, 1136, this.up_height);
                }
                ++i;
            }
        };
        LandView.prototype.loadCityUp2 = function () {
            var cts = new egret.Sprite();
            cts.x = 0;
            cts.y = this.up_height;
            this.citySprite.push(cts);
            var i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].up2, i * 1136, 0, 1136, this.up2_height);
                }
                ++i;
            }
            i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].up2, i * 1136, 0, 1136, this.up2_height);
                }
                ++i;
            }
            i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.actors[p] != null) {
                    this.LoadCityActor(cts, this.cnfs.actors[p].up2, i * 1136, 0, 1136, this.up2_height);
                }
                ++i;
            }
        };
        LandView.prototype.loadCityMiddle = function () {
            var cts = new egret.Sprite();
            cts.x = 0;
            cts.y = this.up_height + this.up2_height;
            this.citySprite.push(cts);
            var i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].middle, i * 1136, 0, 1136, this.middle_height);
                }
                ++i;
            }
            i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].middle, i * 1136, 0, 1136, this.middle_height);
                }
                ++i;
            }
            i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.actors[p] != null) {
                    this.LoadCityActor(cts, this.cnfs.actors[p].middle, i * 1136, 0, 1136, this.middle_height);
                }
                ++i;
            }
        };
        LandView.prototype.loadCityDown = function () {
            var cts = new egret.Sprite();
            cts.x = 0;
            cts.y = this.up_height + this.up2_height + this.middle_height;
            this.citySprite.push(cts);
            var i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].down, i * 1136, 0, 1136, this.down_height);
                }
                ++i;
            }
            i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].down, i * 1136, 0, 1136, this.down_height);
                }
                ++i;
            }
            i = 0;
            for (var p in this.cnfs.citys) {
                if (this.cnfs.actors[p] != null) {
                    this.LoadCityActor(cts, this.cnfs.actors[p].down, i * 1136, 0, 1136, this.down_height);
                }
                ++i;
            }
        };
        LandView.prototype.LoadLand = function (jsonData) {
            this.cnfs = jsonData;
            this.loadCityUp();
            this.loadCityUp2();
            this.loadCityMiddle();
            this.loadCityDown();
            this._viewPos.setTo(1136 / 2, 640 / 2);
        };
        LandView.prototype.ShowLand = function (s) {
            for (var i = 0; i < this.citySprite.length; ++i) {
                s.addChild(this.citySprite[i]);
            }
            // 子弹层
            s.addChild(this._bulletSprite);
        };
        LandView.prototype.ScrollLand = function () {
            if (!this._targetViewRun) {
                return;
            }
            if (egret.Point.distance(this._targetViewPos, this._viewPos) > Math.abs(this._targetViewSpeed)) {
                var oldx = this._viewPos.x;
                this._viewPos.x = oldx + this._targetViewSpeed;
                for (var i = 0; i < this.citySprite.length; ++i) {
                    this.citySprite[i].x += (oldx - this._viewPos.x);
                }
            }
            else {
                this._targetViewRun = false;
                var oldx = this._viewPos.x;
                this._viewPos.x = this._targetViewPos.x;
                for (var i = 0; i < this.citySprite.length; ++i) {
                    this.citySprite[i].x += (oldx - this._viewPos.x);
                }
            }
        };
        LandView.prototype.SetTargetViewPos = function (x, y, speed) {
            this._targetViewRun = true;
            this._targetViewPos.x = x;
            this._targetViewPos.y = y;
            this._targetViewPos.y = this._viewPos.y;
            if (this._viewPos.x <= this._targetViewPos.x) {
                this._targetViewSpeed = speed;
            }
            else {
                this._targetViewSpeed = -speed;
            }
        };
        LandView.prototype.Update = function () {
            for (var i_1 in this._easyActorAI) {
                this._easyActorAI[i_1].update();
            }
            for (var i_2 in this._actors) {
                this._actors[i_2].update();
            }
            var i = this._bullets.length;
            while (i--) {
                var bullet = this._bullets[i];
                if (bullet.update()) {
                    this._bullets.splice(i, 1);
                }
            }
            //视口滚动
            this.ScrollLand();
        };
        LandView.prototype.addBullet = function (bullet) {
            this._bullets.push(bullet);
        };
        LandView.prototype.getBulletLayer = function () {
            return this._bulletSprite;
        };
        LandView.prototype.randomPlayer = function () {
            if (this._easyActorAI.length > 0) {
                if (this._playerAI != null) {
                    this._playerAI.enablePlayer(false);
                    this._player = null;
                    this._playerAI = null;
                }
                var nextPlayer = Math.floor(Math.random() * this._easyActorAI.length);
                if (nextPlayer < this._easyActorAI.length) {
                    this._playerAI = this._easyActorAI[nextPlayer];
                    this._player = this._playerAI.getActor();
                    this._playerAI.enablePlayer(true);
                    var point = new egret.Point();
                    this._player.getPoint(point);
                    this.SetTargetViewPos(point.x, point.y, 100);
                }
            }
        };
        LandView.prototype._touchMove = function (x, y) {
            if (this._player != null) {
                this._player.aim(x, y);
            }
        };
        LandView.prototype._touchHandler = function (event) {
            if (this._player != null) {
                this._player.aim(event.stageX, event.stageY);
                if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
                    this._player.attack(true);
                }
                else {
                    this._player.attack(false);
                }
                this.TouchNewActor(event.stageX, event.stageY);
            }
        };
        LandView.prototype._keyHandler = function (event) {
            var isDown = event.type == "keydown";
            if (event.keyCode == 13) {
                if (!isDown) {
                    this.randomPlayer();
                }
                return;
            }
            if (this._player == null) {
                return;
            }
            switch (event.keyCode) {
                case 37:
                case 65:
                    {
                        this._playerAI._left = isDown;
                        this._playerAI._updateMove(-1);
                        var point = new egret.Point();
                        this._player.getPoint(point);
                        this.SetTargetViewPos(point.x, point.y, 5);
                        egret.log("left walk");
                    }
                    break;
                case 39:
                case 68:
                    {
                        this._playerAI._right = isDown;
                        this._playerAI._updateMove(1);
                        var point = new egret.Point();
                        this._player.getPoint(point);
                        this.SetTargetViewPos(point.x, point.y, 5);
                        egret.log("right walk");
                    }
                    break;
                case 38:
                case 87:
                    if (isDown) {
                        this._player.jump();
                        var point = new egret.Point();
                        this._player.getPoint(point);
                        this.SetTargetViewPos(point.x, point.y, 5);
                        egret.log("jump");
                    }
                    break;
                case 83:
                case 40:
                    {
                        this._player.squat(isDown);
                        var point = new egret.Point();
                        this._player.getPoint(point);
                        this.SetTargetViewPos(point.x, point.y, 5);
                    }
                    break;
                case 81:
                    if (isDown) {
                        this._player.switchWeaponR();
                    }
                    break;
                case 69:
                    if (isDown) {
                        this._player.switchWeaponL();
                    }
                    break;
                case 32:
                    if (isDown) {
                        this._player.switchWeaponR();
                        this._player.switchWeaponL();
                    }
                    break;
            }
        };
        LandView.prototype.TouchNewActor = function (x, y) {
            // 新建演员
            // 属于谁?
            var newPos = new egret.Point();
            this.citySprite[2].globalToLocal(x, y, newPos);
            var tmpActor = new Mecha();
            tmpActor.setParent(this, this.citySprite[2], newPos.x, 150 /*newPos.y*/);
            tmpActor.setMoveRange(3 * 1136, 640);
            this._actors.push(tmpActor);
            var tmpActorAI = new EasyAI();
            tmpActorAI.setActor(tmpActor);
            this._easyActorAI.push(tmpActorAI);
        };
        LandView.prototype.LoadCityRow = function (cts, ctr, x, y, w, h) {
            if (ctr == null || cts == null) {
                return;
            }
            if (ctr.type == "shape") {
                var bg = new egret.Shape();
                bg.graphics.beginFill(ctr.data.color, 100);
                bg.graphics.drawRect(0, 0, ctr.data.width, ctr.data.height);
                bg.graphics.endFill();
                bg.width = w;
                bg.height = h;
                bg.x = x;
                bg.y = y;
                cts.addChild(bg);
            }
            else if (ctr.type == "image") {
                var bg4 = new egret.Bitmap(RES.getRes(ctr.data.res));
                bg4.width = w;
                bg4.height = h;
                bg4.x = x;
                bg4.y = y;
                cts.addChild(bg4);
            }
        };
        LandView.prototype.LoadCityBuild = function (cts, ctr, x, y, w, h) {
            if (ctr == null || cts == null) {
                return;
            }
            for (var i in ctr) {
                var lc = ctr[i];
                if (lc.type == "shape") {
                    var bg = new egret.Shape();
                    bg.graphics.beginFill(lc.data.color, 100);
                    bg.graphics.drawRect(0, 0, lc.data.width, lc.data.height);
                    bg.graphics.endFill();
                    bg.x = x + lc.data.x;
                    bg.y = y + lc.data.y;
                    cts.addChild(bg);
                }
                else if (lc.type == "image") {
                    var bg4 = new egret.Bitmap(RES.getRes(lc.data.res));
                    bg4.x = x + lc.data.x;
                    bg4.y = y + lc.data.y;
                    cts.addChild(bg4);
                }
                else if (lc.type == "animation") {
                    var tmpActor = new Mecha();
                    tmpActor.setParent(this, cts, x + lc.data.x, y + lc.data.y);
                    tmpActor.setMoveRange(3 * 1136, 640);
                    this._actors.push(tmpActor);
                }
            }
        };
        LandView.prototype.LoadCityActor = function (cts, ctr, x, y, w, h) {
            if (ctr == null || cts == null) {
                return;
            }
            for (var i in ctr) {
                var lc = ctr[i];
                if (lc.type == "shape") {
                    var bg = new egret.Shape();
                    bg.graphics.beginFill(lc.data.color, 100);
                    bg.graphics.drawRect(0, 0, lc.data.width, lc.data.height);
                    bg.graphics.endFill();
                    bg.x = x + lc.data.x;
                    bg.y = y + lc.data.y;
                    cts.addChild(bg);
                }
                else if (lc.type == "image") {
                    var bg4 = new egret.Bitmap(RES.getRes(lc.data.res));
                    bg4.x = x + lc.data.x;
                    bg4.y = y + lc.data.y;
                    cts.addChild(bg4);
                }
                else if (lc.type == "animation") {
                    var tmpActor = new Mecha();
                    tmpActor.setParent(this, cts, x + lc.data.x, y + lc.data.y);
                    tmpActor.setMoveRange(3 * 1136, 640);
                    this._actors.push(tmpActor);
                    var tmpActorAI = new EasyAI();
                    tmpActorAI.setActor(tmpActor);
                    this._easyActorAI.push(tmpActorAI);
                }
            }
        };
        return LandView;
    }());
    tgame.LandView = LandView;
    __reflect(LandView.prototype, "tgame.LandView");
    // land 再次划分
    // 分为 页, 行, 列
    // 第一页 : 背景
    //         上 中上 中 下 四行
    // 第二页 : 建筑
    //         上 中上 中 下 四行, 一般是由中上行存在建筑
    // 第三页 : 角色
    //         上 中上 中 下 四行, 一般是由中行存在角色
    // 第四页 : 装饰
    //         上 中上 中 下 四行, 一般是下行存在装饰
    //
    // Load 一个城市的配置, 分为不同页
    //
    // 依据上面的结论, 提前划分为不同的sprite, 按照显示顺序排排队
    // 第一页 上, 第二页 上,...
    // 第一页 中上, 第二页中上 ...
})(tgame || (tgame = {}));
//# sourceMappingURL=MyLand.js.map