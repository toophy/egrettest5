// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tgame;
(function (tgame) {
    var SceneSet = (function (_super) {
        __extends(SceneSet, _super);
        function SceneSet() {
            return _super.call(this) || this;
        }
        SceneSet.prototype.SetStage = function (s) {
            this._stage = s;
        };
        SceneSet.prototype.GetStage = function () {
            return this._stage;
        };
        SceneSet.prototype.AddScene = function (s) {
            if (this._scenesName.get(s.GetName()) == null) {
                this._scenesName.add(s.GetName(), s);
                this._scenesIndex.add(s.GetIndex(), s);
                return true;
            }
            return false;
        };
        SceneSet.prototype.DelScene = function (name) {
            var os = this._scenesName.get(name);
            if (os != null) {
                this._scenesIndex.del(os.GetIndex());
                this._scenesName.del(name);
                return true;
            }
            return false;
        };
        return SceneSet;
    }(tgame.Base));
    tgame.SceneSet = SceneSet;
    __reflect(SceneSet.prototype, "tgame.SceneSet");
})(tgame || (tgame = {}));
//# sourceMappingURL=scene_set.js.map