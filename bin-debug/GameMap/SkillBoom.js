// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SkillBoom = (function (_super) {
    __extends(SkillBoom, _super);
    function SkillBoom(root, pic, x, y, camp) {
        var _this = _super.call(this) || this;
        _this.typeCamp = camp;
        _this.touchChildren = false;
        _this.rootContainer = root;
        _this.boomID = 0;
        _this.reset(pic, x, y, camp);
        return _this;
    }
    SkillBoom.prototype.isEnemy = function (f) {
        return this.typeCamp != f.typeCamp;
    };
    SkillBoom.prototype.reset = function (pic, x, y, camp) {
        if (this.pic == pic && this.typeCamp == camp) {
            if (this.tw) {
                this.tw.setPaused(true);
                this.tw = undefined;
            }
            this.startX = x;
            this.startY = y;
            this.dead = false;
            this.x = x - this.width / 2;
            this.y = y - this.height;
            if (camp != 1) {
                this.tw = egret.Tween.get(this).to({ y: this.startY + 1200 }, 3000).call(this.tweenEnd, this);
            }
            else {
                this.tw = egret.Tween.get(this).to({ y: -100 }, 3000).call(this.tweenEnd, this);
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
            if (camp != 1) {
                this.tw = egret.Tween.get(this).to({ y: this.startY + 1200 }, 3000).call(this.tweenEnd, this);
            }
            else {
                this.tw = egret.Tween.get(this).to({ y: -100 }, 3000).call(this.tweenEnd, this);
            }
        }
    };
    SkillBoom.prototype.tweenEnd = function () {
        if (!this.dead) {
            if (this.tw) {
                this.tw.setPaused(true);
                this.tw = undefined;
            }
            this.rootContainer.removeBoom(this);
        }
    };
    SkillBoom.prototype.killed = function () {
        if (!this.dead) {
            this.dead = true;
            if (this.tw) {
                this.tw.setPaused(true);
                this.tw = undefined;
            }
            this.rootContainer.removeBoom(this);
        }
    };
    return SkillBoom;
}(egret.Sprite));
__reflect(SkillBoom.prototype, "SkillBoom");
//# sourceMappingURL=SkillBoom.js.map