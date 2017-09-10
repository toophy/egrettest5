// TypeScript file

namespace tgame {

    // 岛屿上分块
    export class IslandUpBlock {
        public backGround: string;  // 背景

        public constructor() {
        }
    }

    // 岛屿中分块
    export class IslandMiddleBlock {
        public backGround: string;  // 背景

        public constructor() {
        }
    }

    // 岛屿下分块
    export class IslandDownBlock {
        public backGround: string;  // 背景

        public constructor() {
        }
    }

    // 岛屿
    export class Island {
        private _masterID: number;                  // 主人ID
        private _islandID: number;                  // 岛屿ID
        private _version: number;                   // 版本
        private _name: string;                      // 岛屿名称
        private _upBlock: IslandUpBlock;            // 岛屿上分块
        private _middleBlock: IslandMiddleBlock;    // 岛屿中分块
        private _downBlock: IslandDownBlock;        // 岛屿下分块

        public constructor() {
        }
    }

    // 陆地配置
    export class LandConfig {
        private _masterID: number;                  // 主人ID
        private _landID: number;                    // 陆地ID
        private _version: number;                   // 版本
        private _islandIndex: MapNum<Island>;       // 岛屿(索引ID)
        private _islandName: MapStr<Island>;        // 岛屿(索引名称)
        private _islandSort: MapNum<number>;        // 岛屿排序(索引岛屿显示顺序,从左向右,从1开始)
        private _islandWidth: number;               // 岛屿宽
        private _islandUpHeight: number;            // 岛屿上分块高
        private _islandMiddleHeight: number;        // 岛屿中分块高
        private _islandDownHeight: number;          // 岛屿下分块高

        public constructor() {
        }
    }

    export class CnfRowBlock {
        public shape: string;
        public color: number;
        public res: string;
        public width: number;
        public height: number;
    }

    export class CnfCityRow {
        public type: string;
        public data: CnfRowBlock;
    }

    export class CnfCity {
        public id: number;
        public sort: number;
        public master: string;
        public up: CnfCityRow;
        public up2: CnfCityRow;
        public middle: CnfCityRow;
        public down: CnfCityRow;
    }

    export class CnfBuildBlock {
        public shape: string;
        public color: number;
        public res: string;
        public x: number;
        public y: number;
        public width: number;
        public height: number;
    }

    export class CnfBuildRow {
        public type: string;
        public data: CnfBuildBlock;
    }

    export class CnfBuild {
        public id: number;
        public sort: number;
        public master: string;
        public up: Array<CnfBuildRow>;
        public up2: Array<CnfBuildRow>;
        public middle: Array<CnfBuildRow>;
        public down: Array<CnfBuildRow>;
    }

    export class CnfLand {
        public citys: { [key: string]: CnfCity };
        public builds: { [key: string]: CnfBuild };
    }

    export class LandView {
        private cnfs: CnfLand;
        private citySprite: Array<egret.Sprite>;
        private up_height: number = 240;
        private up2_height: number = 100;//66;
        private middle_height: number = 200;//76;
        private down_height: number = 100;//62;

        public constructor() {
            this.citySprite = new Array<egret.Sprite>();
        }

        public LoadLand(jsonData: any) {
            this.cnfs = <CnfLand>jsonData;
            for (let p in this.cnfs.citys) {
                let cts: egret.Sprite = new egret.Sprite();
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
        }

        public ShowLand(s: egret.Sprite) {
            for (let i = 0; i < this.citySprite.length; ++i) {
                this.citySprite[i].x = i * 1136;
                this.citySprite[i].y = 0;
                s.addChild(this.citySprite[i]);
            }
        }

        public ScrollLand(x: number) {
            for (let i = 0; i < this.citySprite.length; ++i) {
                this.citySprite[i].x += x;
            }
        }

        private LoadCityRow(cts: egret.Sprite, ctr: CnfCityRow, x: number, y: number, w: number, h: number) {
            if (ctr == null || cts == null) {
                return;
            }

            if (ctr.type == "shape") {
                let bg: egret.Shape = new egret.Shape();
                bg.graphics.beginFill(ctr.data.color, 100);
                bg.graphics.drawRect(0, 0, ctr.data.width, ctr.data.height);
                bg.graphics.endFill();
                bg.width = w;
                bg.height = h;
                bg.x = x;
                bg.y = y;
                cts.addChild(bg);
            } else if (ctr.type == "image") {
                let bg4: egret.Bitmap = new egret.Bitmap(RES.getRes(ctr.data.res));
                bg4.width = w;
                bg4.height = h;
                bg4.x = x;
                bg4.y = y;
                cts.addChild(bg4);
            }
        }

        private LoadCityBuild(cts: egret.Sprite, ctr: Array<CnfBuildRow>, x: number, y: number, w: number, h: number) {
            if (ctr == null || cts == null) {
                return;
            }

            for (let i in ctr) {
                let lc = ctr[i]

                if (lc.type == "shape") {
                    let bg: egret.Shape = new egret.Shape();
                    bg.graphics.beginFill(lc.data.color, 100);
                    bg.graphics.drawRect(0, 0, lc.data.width, lc.data.height);
                    bg.graphics.endFill();
                    bg.x = x + lc.data.x;
                    bg.y = y + lc.data.y;
                    cts.addChild(bg);
                } else if (lc.type == "image") {
                    let bg4: egret.Bitmap = new egret.Bitmap(RES.getRes(lc.data.res));
                    bg4.x = x + lc.data.x;
                    bg4.y = y + lc.data.y;
                    cts.addChild(bg4);
                }
            }
        }

    }

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

}

