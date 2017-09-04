// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tgame;
(function (tgame) {
    var Base = (function () {
        function Base() {
        }
        Base.prototype.SetName = function (n) {
            this._name = n;
        };
        Base.prototype.GetName = function () {
            return this._name;
        };
        Base.prototype.SetIndex = function (n) {
            this._index = n;
        };
        Base.prototype.GetIndex = function () {
            return this._index;
        };
        Base.prototype.SetPos = function (x, y) {
            this._pos.x = x;
            this._pos.y = y;
        };
        Base.prototype.GetPos = function () {
            return this._pos;
        };
        return Base;
    }());
    tgame.Base = Base;
    __reflect(Base.prototype, "tgame.Base");
})(tgame || (tgame = {}));
//# sourceMappingURL=util.js.map