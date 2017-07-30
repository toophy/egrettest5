// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role = (function (_super) {
    __extends(Role, _super);
    function Role(root, pic, x, y, camp) {
        var _this = _super.call(this) || this;
        _this.typeCamp = camp;
        _this.rootContainer = root;
        _this.flyID = 0;
        _this.tip = new egret.TextField();
        _this.reset(pic, x, y, camp);
        return _this;
    }
    Role.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Role.prototype.moveTo = function (toX, toY) {
        this.myTw = egret.Tween.get(this).to({ x: toX, y: toY }, 500).call(this.myTweenEnd, this);
    };
    Role.prototype.stopMove = function (x, y) {
        if (this.myTw) {
            this.myTw.setPaused(true);
            this.myTw = undefined;
        }
    };
    Role.prototype.isEnemy = function (f) {
        return this.typeCamp != f.typeCamp;
    };
    Role.prototype.reset = function (pic, x, y, camp) {
        if (this.pic == pic && this.typeCamp == camp) {
            if (this.shotBoom) {
                this.shotBoom.stop();
                this.shotBoom.removeEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
                this.shotBoom = undefined;
            }
            if (this.tw) {
                this.tw.setPaused(true);
                this.tw = undefined;
            }
            this.startX = x;
            this.startY = y;
            this.curHP = this.maxHP;
            this.dead = false;
            this.x = x - this.myWidth / 2;
            this.y = y - this.myHeight;
            if (camp != 1) {
                this.touchEnabled = false;
                this.touchChildren = false;
                this.tw = egret.Tween.get(this).to({ y: this.y + 1200 }, 6000).call(this.tweenEnd, this);
                this.shotBoom = new egret.Timer(1000, 0);
                this.shotBoom.addEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
                this.shotBoom.start();
            }
            else {
                this.touchEnabled = true;
                this.touchChildren = false;
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
            if (this.typeCamp == 1) {
                this.maxHP = 10;
            }
            else {
                this.maxHP = 3;
            }
            this.curHP = this.maxHP;
            this.dead = false;
            var bmg = new egret.Bitmap(RES.getRes(pic));
            this.x = x - bmg.width / 2;
            this.y = y - bmg.height;
            this.addChild(bmg);
            this.myWidth = bmg.width;
            this.myHeight = bmg.height;
        }
    };
    Role.prototype.tweenEnd = function () {
        if (this.shotBoom) {
            this.shotBoom.stop();
            this.shotBoom.removeEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
            this.shotBoom = undefined;
        }
        this.rootContainer.removeFlyer(this);
    };
    Role.prototype.myTweenEnd = function () {
    };
    Role.prototype.onShot = function () {
        if (!this.dead) {
            if (this.typeCamp == 1) {
                this.tip.visible = true;
                this.tip.text = "-1";
                this.tip.bold = true;
                this.tip.size = 30;
                this.tip.textColor = 0x881100;
                this.tip.x = this.width / 2;
                this.tip.y = 0;
                if (this.getChildIndex(this.tip) == -1) {
                    this.addChild(this.tip);
                }
                egret.Tween.get(this.tip).to({ y: -100 }, 1000, egret.Ease.backInOut).to({ visible: false });
            }
            this.curHP--;
            if (this.curHP <= 0) {
                this.killed();
            }
        }
    };
    Role.prototype.killed = function () {
        if (!this.dead) {
            if (this.typeCamp == 1) {
                this.tip.visible = true;
                this.tip.text = "Game Over";
                this.tip.textColor = 0x881100;
                this.tip.x = this.width / 2;
                this.tip.y = 0;
                if (this.getChildIndex(this.tip) == -1) {
                    this.addChild(this.tip);
                }
                egret.Tween.get(this.tip).to({ y: -400 }, 2000, egret.Ease.backInOut).to({ visible: false });
            }
            this.curHP = 0;
            this.dead = true;
            if (this.tw) {
                this.tw.setPaused(true);
                this.tw = undefined;
            }
            this.rootContainer.removeFlyer(this);
        }
    };
    Role.prototype.onShotBoom = function (evt) {
        if (this.typeCamp == 1) {
            this.rootContainer.createBoom(this.x + 10, this.y + this.myHeight / 2, this.typeCamp);
            this.rootContainer.createBoom(this.x + this.myWidth - 10, this.y + this.myHeight / 2, this.typeCamp);
        }
        else {
            this.rootContainer.createBoom(this.x + 12, this.y + 0 + this.myHeight * 0.95, this.typeCamp);
            this.rootContainer.createBoom(this.x + this.myWidth - 12, this.y + 0 + this.myHeight * 0.95, this.typeCamp);
        }
    };
    return Role;
}(egret.Sprite));
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map