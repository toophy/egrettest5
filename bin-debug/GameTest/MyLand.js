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
    var CnfLand = (function () {
        function CnfLand() {
        }
        return CnfLand;
    }());
    tgame.CnfLand = CnfLand;
    __reflect(CnfLand.prototype, "tgame.CnfLand");
    var LandView = (function () {
        function LandView() {
            this.up_height = 240;
            this.up2_height = 100; //66;
            this.middle_height = 200; //76;
            this.down_height = 100; //62;
            this.citySprite = new Array();
        }
        LandView.prototype.LoadLand = function (jsonData) {
            this.cnfs = jsonData;
            for (var p in this.cnfs.citys) {
                var cts = new egret.Sprite();
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].up, 0, 0, 1136, this.up_height);
                }
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].up, 0, 0, 1136, this.up_height);
                }
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].up2, 0, this.up_height, 1136, this.up2_height);
                }
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].up2, 0, this.up_height, 1136, this.up2_height);
                }
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].middle, 0, this.up_height + this.up2_height, 1136, this.middle_height);
                }
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].middle, 0, this.up_height + this.up2_height, 1136, this.middle_height);
                }
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].down, 0, this.up_height + this.up2_height + this.middle_height, 1136, this.down_height);
                }
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].down, 0, this.up_height + this.up2_height + this.middle_height, 1136, this.down_height);
                }
                this.citySprite.push(cts);
            }
        };
        LandView.prototype.ShowLand = function (s) {
            for (var i = 0; i < this.citySprite.length; ++i) {
                this.citySprite[i].x = i * 1136;
                this.citySprite[i].y = 0;
                s.addChild(this.citySprite[i]);
            }
        };
        LandView.prototype.ScrollLand = function (x) {
            for (var i = 0; i < this.citySprite.length; ++i) {
                this.citySprite[i].x += x;
            }
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