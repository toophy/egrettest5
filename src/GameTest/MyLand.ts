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

    // 行
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

    // 建筑
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

    // 演员
    export class CnfActorBlock {
        public shape: string;
        public color: number;
        public res: string;
        public x: number;
        public y: number;
        public width: number;
        public height: number;
    }

    export class CnfActorRow {
        public type: string;
        public data: CnfActorBlock;
    }

    export class CnfActor {
        public id: number;
        public sort: number;
        public master: string;
        public up: Array<CnfActorRow>;
        public up2: Array<CnfActorRow>;
        public middle: Array<CnfActorRow>;
        public down: Array<CnfActorRow>;
    }

    export class CnfLand {
        public citys: { [key: string]: CnfCity };
        public builds: { [key: string]: CnfBuild };
        public actors: { [key: string]: CnfActor };
    }


    // easy ai
    export class EasyAI {
        public _left: boolean = false;
        public _right: boolean = false;

        private _actor: Mecha = null;
        private _state: number = 0;
        private _lastTime: number = new Date().getTime();
        private _player: boolean = false;

        public constructor() {
        }

        public setActor(a: Mecha) {
            this._actor = a;
        }

        public getActor(): Mecha {
            return this._actor;
        }

        public enablePlayer(e: boolean) {
            this._player = e;
            if (this._player) {
                //"null":
                this._state = 0;

                this._left = false;
                this._right = false;
                this._actor.attack(false);
                this._updateMove(0);
                this._lastTime = new Date().getTime() + 1000;
            }
        }

        public update() {
            if (this._player) {
                return;
            }

            let now: number = new Date().getTime();
            if (now > this._lastTime) {

                let new_state = Math.floor(Math.random() * 8);

                if (new_state != this._state || this._state != 0) {
                    this._state = new_state;
                    switch (this._state) {
                        case 0://"null":
                            this._left = false;
                            this._right = false;
                            this._updateMove(0);
                            this._lastTime = new Date().getTime() + 1000;
                            break;
                        case 1://"left_walk":
                            this._left = true;
                            this._right = false;
                            this._updateMove(-1);
                            this._lastTime = new Date().getTime() + 3000;
                            break;
                        case 2://"right_walk":
                            this._right = true;
                            this._left = false;
                            this._updateMove(1);
                            this._lastTime = new Date().getTime() + 3000;
                            break;
                        case 3://"jump":
                            this._actor.jump();
                            this._lastTime = new Date().getTime() + 3000;
                            break;
                        case 4://
                            this._actor.switchWeaponR();
                            this._lastTime = new Date().getTime() + 500;
                            break;
                        case 5://
                            this._actor.switchWeaponL();
                            this._lastTime = new Date().getTime() + 500;
                            break;
                        case 6://
                            this._actor.attack(true);
                            this._lastTime = new Date().getTime() + 1000;
                            break;
                        case 7://
                            this._actor.attack(false);
                            this._lastTime = new Date().getTime() + 500;
                            break;
                    }
                }
            } else {
                switch (this._state) {
                    case 1://"left_walk":
                        this._left = true;
                        this._right = false;
                        this._updateMove(-1);
                        break;
                    case 2://"right_walk":
                        this._right = true;
                        this._left = false;
                        this._updateMove(1);
                        break;
                    case 3://"jump":
                        this._actor.jump();
                        break;
                    case 4://
                        break;
                }
            }
        }

        public _updateMove(dir: number): void {
            if (this._player) {
                egret.log("updateMove");
            }

            if (this._left && this._right) {
                this._actor.move(dir);
            } else if (this._left) {
                this._actor.move(-1);
            } else if (this._right) {
                this._actor.move(1);
            } else {
                this._actor.move(0);
            }
        }
    }


    export class LandView {

        private up_height: number = 240;
        private up2_height: number = 100;//66;
        private middle_height: number = 200;//76;
        private down_height: number = 100;//62;

        private cnfs: CnfLand;
        private citySprite: Array<egret.Sprite> = [];

        private _actors: Array<Mecha> = [];
        private _bullets: Array<Bullet> = [];
        private _easyActorAI: Array<EasyAI> = [];
        private _bulletSprite: egret.Sprite = null;
        private _player: Mecha = null;
        private _playerAI: EasyAI = null;

        private _viewPos: egret.Point = new egret.Point();
        private _targetViewPos: egret.Point = new egret.Point();
        private _targetViewSpeed: number = 0.1;
        private _targetViewRun: boolean = false;

        public constructor() {
            this._bulletSprite = new egret.Sprite();
        }

        private loadCityUp() {
            let cts: egret.Sprite = new egret.Sprite();
            cts.x = 0;
            cts.y = 0;
            this.citySprite.push(cts);

            let i: number = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].up, i * 1136, 0, 1136, this.up_height);
                }
                ++i;
            }

            i = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].up, i * 1136, 0, 1136, this.up_height);
                }
                ++i;
            }

            i = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.actors[p] != null) {
                    this.LoadCityActor(cts, this.cnfs.actors[p].up, i * 1136, 0, 1136, this.up_height);
                }
                ++i;
            }
        }

        private loadCityUp2() {
            let cts: egret.Sprite = new egret.Sprite();
            cts.x = 0;
            cts.y = this.up_height;
            this.citySprite.push(cts);

            let i: number = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].up2, i * 1136, 0, 1136, this.up2_height);
                }
                ++i;
            }

            i = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].up2, i * 1136, 0, 1136, this.up2_height);
                }
                ++i;
            }

            i = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.actors[p] != null) {
                    this.LoadCityActor(cts, this.cnfs.actors[p].up2, i * 1136, 0, 1136, this.up2_height);
                }
                ++i;
            }
        }

        private loadCityMiddle() {
            let cts: egret.Sprite = new egret.Sprite();
            cts.x = 0;
            cts.y = this.up_height + this.up2_height;
            this.citySprite.push(cts);

            let i: number = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].middle, i * 1136, 0, 1136, this.middle_height);
                }
                ++i;
            }

            i = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].middle, i * 1136, 0, 1136, this.middle_height);
                }
                ++i;
            }

            i = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.actors[p] != null) {
                    this.LoadCityActor(cts, this.cnfs.actors[p].middle, i * 1136, 0, 1136, this.middle_height);
                }
                ++i;
            }
        }

        private loadCityDown() {
            let cts: egret.Sprite = new egret.Sprite();
            cts.x = 0;
            cts.y = this.up_height + this.up2_height + this.middle_height;
            this.citySprite.push(cts);

            let i: number = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.citys[p] != null) {
                    this.LoadCityRow(cts, this.cnfs.citys[p].down, i * 1136, 0, 1136, this.down_height);
                }
                ++i;
            }

            i = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.builds[p] != null) {
                    this.LoadCityBuild(cts, this.cnfs.builds[p].down, i * 1136, 0, 1136, this.down_height);
                }
                ++i;
            }

            i = 0;
            for (let p in this.cnfs.citys) {
                if (this.cnfs.actors[p] != null) {
                    this.LoadCityActor(cts, this.cnfs.actors[p].down, i * 1136, 0, 1136, this.down_height);
                }
                ++i;
            }
        }

        public LoadLand(jsonData: any) {
            this.cnfs = <CnfLand>jsonData;
            this.loadCityUp();
            this.loadCityUp2();
            this.loadCityMiddle();
            this.loadCityDown();

            this._viewPos.setTo(1136 / 2, 640 / 2);
        }

        public ShowLand(s: egret.Sprite) {
            for (let i = 0; i < this.citySprite.length; ++i) {
                s.addChild(this.citySprite[i]);
            }

            // 子弹层
            s.addChild(this._bulletSprite);
        }

        public ScrollLand() {
            if (!this._targetViewRun) {
                return;
            }

            if (egret.Point.distance(this._targetViewPos, this._viewPos) > Math.abs(this._targetViewSpeed)) {
                let oldx: number = this._viewPos.x;
                this._viewPos.x = oldx + this._targetViewSpeed;
                for (let i = 0; i < this.citySprite.length; ++i) {
                    this.citySprite[i].x += (oldx - this._viewPos.x);
                }
            } else {
                this._targetViewRun = false;
                let oldx: number = this._viewPos.x;
                this._viewPos.x = this._targetViewPos.x;
                for (let i = 0; i < this.citySprite.length; ++i) {
                    this.citySprite[i].x += (oldx - this._viewPos.x);
                }
            }
        }

        public SetTargetViewPos(x: number, y: number, speed: number) {
            this._targetViewRun = true;
            this._targetViewPos.x = x;
            this._targetViewPos.y = y;
            this._targetViewPos.y = this._viewPos.y;
            if (this._viewPos.x <= this._targetViewPos.x) {
                this._targetViewSpeed = speed;
            } else {
                this._targetViewSpeed = -speed;
            }
        }

        public Update() {

            for (let i in this._easyActorAI) {
                this._easyActorAI[i].update();
            }
            for (let i in this._actors) {
                this._actors[i].update();
            }

            let i = this._bullets.length;
            while (i--) {
                const bullet = this._bullets[i];
                if (bullet.update()) {
                    this._bullets.splice(i, 1);
                }
            }
            //视口滚动
            this.ScrollLand();
        }

        public addBullet(bullet: Bullet): void {
            this._bullets.push(bullet);
        }

        public getBulletLayer(): egret.Sprite {
            return this._bulletSprite;
        }

        private randomPlayer() {
            if (this._easyActorAI.length > 0) {
                if (this._playerAI != null) {
                    this._playerAI.enablePlayer(false);
                    this._player = null;
                    this._playerAI = null;
                }

                let nextPlayer: number = Math.floor(Math.random() * this._easyActorAI.length);
                if (nextPlayer < this._easyActorAI.length) {
                    this._playerAI = this._easyActorAI[nextPlayer];
                    this._player = this._playerAI.getActor();
                    this._playerAI.enablePlayer(true);

                    let point: egret.Point = new egret.Point();
                    this._player.getPoint(point);
                    this.SetTargetViewPos(point.x, point.y, 100);
                }
            }
        }

        public _touchMove(x: number, y: number) {
            if (this._player != null) {
                this._player.aim(x, y);
            }
        }

        public _touchHandler(event: egret.TouchEvent): void {
            if (this._player != null) {
                this._player.aim(event.stageX, event.stageY);

                if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
                    this._player.attack(true);
                } else {
                    this._player.attack(false);
                }

                this.TouchNewActor(event.stageX, event.stageY);
            }
        }

        public _keyHandler(event: KeyboardEvent): void {

            const isDown: boolean = event.type == "keydown";
            if (event.keyCode == 13) {
                if (!isDown) {
                    this.randomPlayer();
                }
                return;
            }

            if (this._player == null) {
                return;
            }

            switch (event.keyCode) {
                case 37:
                case 65:
                    {
                        this._playerAI._left = isDown;
                        this._playerAI._updateMove(-1);

                        let point: egret.Point = new egret.Point();
                        this._player.getPoint(point);
                        this.SetTargetViewPos(point.x, point.y, 5);

                        egret.log("left walk");
                    }
                    break;

                case 39:
                case 68:
                    {
                        this._playerAI._right = isDown;
                        this._playerAI._updateMove(1);

                        let point: egret.Point = new egret.Point();
                        this._player.getPoint(point);
                        this.SetTargetViewPos(point.x, point.y, 5);

                        egret.log("right walk");
                    }
                    break;

                case 38:
                case 87:
                    if (isDown) {
                        this._player.jump();

                        let point: egret.Point = new egret.Point();
                        this._player.getPoint(point);
                        this.SetTargetViewPos(point.x, point.y, 5);

                        egret.log("jump");
                    }
                    break;

                case 83:
                case 40:
                    {
                        this._player.squat(isDown);
                        let point: egret.Point = new egret.Point();
                        this._player.getPoint(point);
                        this.SetTargetViewPos(point.x, point.y, 5);
                    }
                    break;

                case 81:
                    if (isDown) {
                        this._player.switchWeaponR();
                    }
                    break;

                case 69:
                    if (isDown) {
                        this._player.switchWeaponL();
                    }
                    break;

                case 32:
                    if (isDown) {
                        this._player.switchWeaponR();
                        this._player.switchWeaponL();
                    }
                    break;
            }
        }

        private TouchNewActor(x: number, y: number) {
            // 新建演员
            // 属于谁?
            let newPos:egret.Point = new egret.Point();
            this.citySprite[2].globalToLocal(x,y,newPos)
            let tmpActor: Mecha = new Mecha();
            tmpActor.setParent(this, this.citySprite[2], newPos.x , 150 /*newPos.y*/);
            tmpActor.setMoveRange(3 * 1136, 640);
            this._actors.push(tmpActor);

            let tmpActorAI: EasyAI = new EasyAI();
            tmpActorAI.setActor(tmpActor);
            this._easyActorAI.push(tmpActorAI);
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
                } else if (lc.type == "animation") {
                    let tmpActor: Mecha = new Mecha();
                    tmpActor.setParent(this, cts, x + lc.data.x, y + lc.data.y);
                    tmpActor.setMoveRange(3 * 1136, 640);
                    this._actors.push(tmpActor);
                }
            }
        }

        private LoadCityActor(cts: egret.Sprite, ctr: Array<CnfActorRow>, x: number, y: number, w: number, h: number) {
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
                } else if (lc.type == "animation") {
                    let tmpActor: Mecha = new Mecha();
                    tmpActor.setParent(this, cts, x + lc.data.x, y + lc.data.y);
                    tmpActor.setMoveRange(3 * 1136, 640);
                    this._actors.push(tmpActor);

                    let tmpActorAI: EasyAI = new EasyAI();
                    tmpActorAI.setActor(tmpActor);
                    this._easyActorAI.push(tmpActorAI);
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

