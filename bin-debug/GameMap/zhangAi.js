// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Zhangai = (function (_super) {
    __extends(Zhangai, _super);
    function Zhangai(root) {
        var _this = _super.call(this) || this;
        _this.touchChildren = false;
        _this.rootContainer = root;
        _this.zhangAi = new MapStr();
        return _this;
    }
    Zhangai.prototype.append = function (name, x, y, w, h) {
        if (!this.zhangAi.has(name)) {
            var sp = new egret.Shape();
            sp.graphics.lineStyle(1, 0x00000);
            sp.graphics.drawRect(0, 0, w, h);
            sp.graphics.endFill();
            sp.x = x;
            sp.y = y;
            this.zhangAi.add(name, sp);
            this.addChild(sp);
        }
    };
    Zhangai.prototype.remove = function (name) {
        if (this.zhangAi.has(name)) {
            this.removeChild(this.zhangAi.get(name));
            this.zhangAi.del(name);
        }
    };
    Zhangai.prototype.hitTest = function (s) {
        var zhang = Object.keys(this.zhangAi.items);
        for (var _i = 0, zhang_1 = zhang; _i < zhang_1.length; _i++) {
            var i = zhang_1[_i];
            if (GameUtil.hitTest(s, this.zhangAi.get(i))) {
                return true;
            }
        }
        return false;
    };
    return Zhangai;
}(egret.Sprite));
__reflect(Zhangai.prototype, "Zhangai");
//# sourceMappingURL=zhangAi.js.map