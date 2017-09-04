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
        public middle: CnfCityRow;
        public down: CnfCityRow;
    }

    export class CnfLand {
        public citys: { [key: string]: CnfCity };
    }

    export class LandView {
        private cnfs: CnfLand;
        private citySprite: Array<egret.Sprite>;

        public constructor() {
            this.citySprite = new Array<egret.Sprite>();
        }

        public LoadLand(jsonData: any) {
            this.cnfs = <CnfLand>jsonData;
            for (let p in this.cnfs.citys) {
                let cts: egret.Sprite = new egret.Sprite();
                if (this.cnfs.citys[p].up.type == "shape") {
                    let bg: egret.Shape = new egret.Shape();
                    bg.graphics.beginFill(this.cnfs.citys[p].up.data.color, 100);
                    bg.graphics.drawRect(0, 0, this.cnfs.citys[p].up.data.width, this.cnfs.citys[p].up.data.height);
                    bg.graphics.endFill();
                    cts.addChild(bg);
                }
                if (this.cnfs.citys[p].middle.type == "shape") {
                    let bg: egret.Shape = new egret.Shape();
                    bg.graphics.beginFill(this.cnfs.citys[p].middle.data.color, 100);
                    bg.graphics.drawRect(0, 200, this.cnfs.citys[p].middle.data.width, this.cnfs.citys[p].middle.data.height);
                    bg.graphics.endFill();
                    cts.addChild(bg);
                }
                if (this.cnfs.citys[p].down.type == "shape") {
                    let bg: egret.Shape = new egret.Shape();
                    bg.graphics.beginFill(this.cnfs.citys[p].down.data.color, 100);
                    bg.graphics.drawRect(0, 400, this.cnfs.citys[p].down.data.width, this.cnfs.citys[p].down.data.height);
                    bg.graphics.endFill();
                    cts.addChild(bg);
                }
                this.citySprite.push(cts);
            }
        }

        public ShowLand(s: egret.Sprite) {
            for (let i = 0; i < this.citySprite.length; ++i) {
                this.citySprite[i].x = i * 600;
                this.citySprite[i].y = 0;
                s.addChild(this.citySprite[i]);
            }
        }

        public ScrollLand(x: number) {
            for (let i = 0; i < this.citySprite.length; ++i) {
                this.citySprite[i].x += x;
            }
        }
    }

}

