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
    var CnfLand = (function () {
        function CnfLand() {
        }
        return CnfLand;
    }());
    tgame.CnfLand = CnfLand;
    __reflect(CnfLand.prototype, "tgame.CnfLand");
    var LandView = (function () {
        function LandView() {
            this.citySprite = new Array();
        }
        LandView.prototype.LoadLand = function (jsonData) {
            this.cnfs = jsonData;
            for (var p in this.cnfs.citys) {
                var cts = new egret.Sprite();
                if (this.cnfs.citys[p].up.type == "shape") {
                    var bg = new egret.Shape();
                    bg.graphics.beginFill(this.cnfs.citys[p].up.data.color, 100);
                    bg.graphics.drawRect(0, 0, this.cnfs.citys[p].up.data.width, this.cnfs.citys[p].up.data.height);
                    bg.graphics.endFill();
                    cts.addChild(bg);
                }
                if (this.cnfs.citys[p].middle.type == "shape") {
                    var bg = new egret.Shape();
                    bg.graphics.beginFill(this.cnfs.citys[p].middle.data.color, 100);
                    bg.graphics.drawRect(0, 200, this.cnfs.citys[p].middle.data.width, this.cnfs.citys[p].middle.data.height);
                    bg.graphics.endFill();
                    cts.addChild(bg);
                }
                if (this.cnfs.citys[p].down.type == "shape") {
                    var bg = new egret.Shape();
                    bg.graphics.beginFill(this.cnfs.citys[p].down.data.color, 100);
                    bg.graphics.drawRect(0, 400, this.cnfs.citys[p].down.data.width, this.cnfs.citys[p].down.data.height);
                    bg.graphics.endFill();
                    cts.addChild(bg);
                }
                this.citySprite.push(cts);
            }
        };
        LandView.prototype.ShowLand = function (s) {
            for (var i = 0; i < this.citySprite.length; ++i) {
                this.citySprite[i].x = i * 600;
                this.citySprite[i].y = 0;
                s.addChild(this.citySprite[i]);
            }
        };
        LandView.prototype.ScrollLand = function (x) {
            for (var i = 0; i < this.citySprite.length; ++i) {
                this.citySprite[i].x += x;
            }
        };
        return LandView;
    }());
    tgame.LandView = LandView;
    __reflect(LandView.prototype, "tgame.LandView");
})(tgame || (tgame = {}));
//# sourceMappingURL=MyLand.js.map