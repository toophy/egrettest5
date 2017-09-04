// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tgame;
(function (tgame) {
    // 陆地可视化
    // 根据服务器发来的配置, 自动组织成一块陆地, 所有东西都会变动
    var ViewLand = (function () {
        function ViewLand() {
        }
        ViewLand.prototype.LoadLand = function (l) {
            this.UnloadLand();
            this._landID = l;
            // 从 LandConfig 初始化 _sprite
            // 一点点初始化
            // 初始化 岛屿
            // 初始化 上 中 下 岛屿地块
            // 各块的图片, 依次放置在 _sprite 里面
            // 按照顺序(index)
            // 
            // 从系统的角度, 每一片陆地才是一个最小显示模块
            // 从玩家的角度, 每一个岛屿上的元素都是自己的杰作
            // 从旁观者角度, 每一个场景都是奇观
            // 
            // 1. 每片岛屿是一个 sprite
            //    1.1 上中下各是一个 sprite
            // 2. 演员和建筑物
            //    2.1 建筑物层位于 上 和 中之间
            //    2.2 演员层位于 中 和 下之间
        };
        ViewLand.prototype.UnloadLand = function () {
            if (this._landID > 0) {
                this._sprite.removeChildren();
                this._landID = 0;
            }
        };
        return ViewLand;
    }());
    tgame.ViewLand = ViewLand;
    __reflect(ViewLand.prototype, "tgame.ViewLand");
})(tgame || (tgame = {}));
//# sourceMappingURL=ViewLand.js.map