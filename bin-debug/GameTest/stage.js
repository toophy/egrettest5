// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tgame;
(function (tgame) {
    var Stage = (function () {
        function Stage() {
            this._scrollView = new egret.ScrollView();
            this._scrollView.bounces = false; // 禁止拖拽回弹
        }
        Stage.prototype.SetWidth = function (n) {
            this._width = n;
            this._scrollView.width = n;
        };
        Stage.prototype.SetHeight = function (n) {
            this._height = n;
            this._scrollView.height = n;
        };
        Stage.prototype.GetWidth = function () {
            return this._width;
        };
        Stage.prototype.GetHeight = function () {
            return this._height;
        };
        Stage.prototype.AddSceneSet = function (s) {
            if (this._scenesName.get(s.GetName()) == null) {
                s.SetStage(this);
                this._scenesName.add(s.GetName(), s);
                this._scenesIndex.add(s.GetIndex(), s);
                return true;
            }
            return false;
        };
        Stage.prototype.DelSceneSet = function (name) {
            var os = this._scenesName.get(name);
            if (os != null) {
                os.SetStage(null);
                this._scenesIndex.del(os.GetIndex());
                this._scenesName.del(name);
                return true;
            }
            return false;
        };
        return Stage;
    }());
    tgame.Stage = Stage;
    __reflect(Stage.prototype, "tgame.Stage");
})(tgame || (tgame = {}));
//# sourceMappingURL=stage.js.map