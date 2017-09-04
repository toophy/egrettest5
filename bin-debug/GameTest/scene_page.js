// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 
var tgame;
(function (tgame) {
    var ScenePage = (function (_super) {
        __extends(ScenePage, _super);
        function ScenePage() {
            return _super.call(this) || this;
        }
        ScenePage.prototype.SetScene = function (s) {
            this._scene = s;
        };
        ScenePage.prototype.GetScene = function () {
            return this._scene;
        };
        ScenePage.prototype.AddObj = function (s) {
            if (this._objsName.get(s.GetName()) == null) {
                this._objsName.add(s.GetName(), s);
                this._objsIndex.add(s.GetIndex(), s);
                return true;
            }
            return false;
        };
        ScenePage.prototype.DelObj = function (name) {
            var os = this._objsName.get(name);
            if (os != null) {
                this._objsIndex.del(os.GetIndex());
                this._objsName.del(name);
                return true;
            }
            return false;
        };
        return ScenePage;
    }(tgame.Base));
    tgame.ScenePage = ScenePage;
    __reflect(ScenePage.prototype, "tgame.ScenePage");
})(tgame || (tgame = {}));
//# sourceMappingURL=scene_page.js.map