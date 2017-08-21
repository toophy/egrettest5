
// TypeScript file
class GameMapContainer extends egret.Sprite {

    // 根显示容器
    public rootContainer: egret.DisplayObjectContainer;
    private myFlyDragOffsetX: number;
    private myFlyDragOffsetY: number;

    private myFly: Role;

    private freeFly: MapNum<Role>;
    private enemyFly: MapNum<Role>;

    private freeBoom: MapNum<SkillBoom>;
    private enemyBoom: MapNum<SkillBoom>;
    private myBoom: MapNum<SkillBoom>;

    private zhangAi: Zhangai;


    //
    public static GROUND: number = 100;
    public static G: number = 0.6;
    public static instance: GameMapContainer = null;

    public factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();

    private _left: boolean = false;
    private _right: boolean = false;
    private _player: Mecha = null;
    private _bullets: Array<Bullet> = [];

    private _grounds: Array<egret.Bitmap> = [];

    public constructor(root: egret.DisplayObjectContainer) {
        super();
        this.rootContainer = root;

        GameMapContainer.instance = this;

        //      this._resourceConfigURL = "resource/CoreElement.json";
    }

    public createScene() {
        // 背景
        let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("nbg_4_png"));
        //bg.width = this.rootContainer.stage.stageWidth;
        //bg.height = this.rootContainer.stage.stageHeight;
        bg.y = this.rootContainer.stage.stageHeight - bg.height;
        this.addChild(bg);
        this._grounds.push(bg);

        // 背景
        let bg3: egret.Bitmap = new egret.Bitmap(RES.getRes("nbg_2_png"));
        //bg3.width = this.rootContainer.stage.stageWidth;
        // bg3.height = this.rootContainer.stage.stageHeight;
        bg3.y = this.rootContainer.stage.stageHeight - bg3.height - 50;
        this.addChild(bg3);
        this._grounds.push(bg3);


        GameMapContainer.GROUND = this.rootContainer.stage.stageHeight - 50;
        this.factory.parseDragonBonesData(RES.getRes("dragonBonesData"));
        this.factory.parseTextureAtlasData(RES.getRes("textureDataA"), RES.getRes("textureA"));
        // mouse move        
        let onTouchMove = egret.sys.TouchHandler.prototype.onTouchMove;
        egret.sys.TouchHandler.prototype.onTouchMove = function (x: number, y: number, touchPointID: number): void {
            onTouchMove.call(this, x, y, touchPointID);
            GameMapContainer.instance._player.aim(x, y);
        }
        this._player = new Mecha();

        // 我的飞机
        this.myFly = new Role(this, "f1_png", this.rootContainer.stage.stageWidth / 2, this.rootContainer.stage.stageHeight, 1);
        this.addChild(this.myFly);

        // 背景
        let bg4: egret.Bitmap = new egret.Bitmap(RES.getRes("nbg_3_png"));
        //bg4.width = this.rootContainer.stage.stageWidth;
        //bg4.height = this.rootContainer.stage.stageHeight;
        bg4.y = this.rootContainer.stage.stageHeight - bg4.height;
        this.addChild(bg4);
        this._grounds.push(bg4);




        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onFlyTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onFlyTouchEnd, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdateFrame, this);

        document.addEventListener("keydown", this._keyHandler);
        document.addEventListener("keyup", this._keyHandler);

        // 敌人
        this.freeFly = new MapNum<Role>();
        this.enemyFly = new MapNum<Role>();

        // 子弹
        this.freeBoom = new MapNum<SkillBoom>();
        this.enemyBoom = new MapNum<SkillBoom>();
        this.myBoom = new MapNum<SkillBoom>();

        // 动态障碍
        // this.zhangAi = new Zhangai(this);

        // this.zhangAi.append("a", 0, 200, 700, 100);
        // this.zhangAi.append("b", 0, 500, 700, 100);
        // this.zhangAi.append("c1", 0, 800, 100, 100);
        // this.zhangAi.append("c2", 200, 800, 200, 100);
        // this.addChild(this.zhangAi);

        // let testMap: MapNum<string> = new MapNum<string>();
        // testMap.add(1, "111");
        // testMap.add(1, "222");
        // testMap.add(3, "333");
        // console.log(Object.length);
        // Object.keys(testMap.items).forEach(key => {
        //     console.log(testMap.items[key])
        // })
    }

    public addBullet(bullet: Bullet): void {
        this._bullets.push(bullet);
    }

    private _touchHandler(event: egret.TouchEvent): void {
        this._player.aim(event.stageX, event.stageY);

        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            this._player.attack(true);
        } else {
            this._player.attack(false);
        }
    }

    private _moveGrounds(s:number){
       for (let i of this._grounds) {
           if(s==1){
               i.x += 2*s;
           } else if(s==-1){
               i.x += 2*s;
           }
       }
    }

    private _keyHandler(event: KeyboardEvent): void {
        const isDown: boolean = event.type == "keydown";
        switch (event.keyCode) {
            case 37:
            case 65:
                GameMapContainer.instance._left = isDown;
                GameMapContainer.instance._updateMove(-1);
                GameMapContainer.instance._moveGrounds(1);
                break;

            case 39:
            case 68:
                GameMapContainer.instance._right = isDown;
                GameMapContainer.instance._updateMove(1);
                GameMapContainer.instance._moveGrounds(-1);
                break;

            case 38:
            case 87:
                if (isDown) {
                    GameMapContainer.instance._player.jump();
                }
                break;

            case 83:
            case 40:
                GameMapContainer.instance._player.squat(isDown);
                break;

            case 81:
                if (isDown) {
                    GameMapContainer.instance._player.switchWeaponR();
                }
                break;

            case 69:
                if (isDown) {
                    GameMapContainer.instance._player.switchWeaponL();
                }
                break;

            case 32:
                if (isDown) {
                    GameMapContainer.instance._player.switchWeaponR();
                    GameMapContainer.instance._player.switchWeaponL();
                }
                break;
        }
    }

    private _updateMove(dir: number): void {
        if (this._left && this._right) {
            this._player.move(dir);
        } else if (this._left) {
            this._player.move(-1);
        } else if (this._right) {
            this._player.move(1);
        } else {
            this._player.move(0);
        }
    }

    private onUpdateFrame(evt: egret.Event) {

        this._player.update();

        let i = this._bullets.length;
        while (i--) {
            const bullet = this._bullets[i];
            if (bullet.update()) {
                this._bullets.splice(i, 1);
            }
        }

        dragonBones.WorldClock.clock.advanceTime(-1);

        // 判断碰撞
        // 我的飞机碰撞墙壁
        if (this.zhangAi) {
            if (this.zhangAi.hitTest(this.myFly)) {
                // 停止飞机移动
                this.myFly.stopMove(this.myFly.x, this.myFly.y);
            }
        }


        // 我的飞机子弹
        let myBooms = Object.keys(this.myBoom.items);
        for (let i of myBooms) {
            let enemyFlys = Object.keys(this.enemyFly.items);
            for (let j of enemyFlys) {
                if (GameUtil.hitTest(this.myBoom.items[i], this.enemyFly.items[j])) {
                    this.enemyFly.items[j].onShot();
                    this.myBoom.items[i].killed();
                    break;
                }
            }
        }

        // 敌方飞机子弹
        let enemyBooms = Object.keys(this.enemyBoom.items);
        for (let i of enemyBooms) {
            if (GameUtil.hitTest(this.enemyBoom.items[i], this.myFly)) {
                this.myFly.onShot();
                this.enemyBoom.items[i].killed();
            }
        }

        // 飞机不够多, 再生产
        // if (this.enemyFly.getCount() < 2) {
        //     let randCol = Math.floor(Math.random() * 6) + 1;
        //     this.createEnemyFly(randCol);
        // }
    }

    public appendFlyer(b: Role) {
        if (b.typeCamp != 1) {
            this.enemyFly.add(b.flyID, b);
            this.freeFly.del(b.flyID);
        }
        this.addChild(b);
    }

    public removeFlyer(b: Role) {
        if (b.typeCamp != 1) {
            this.enemyFly.del(b.flyID);
            this.freeFly.add(b.flyID, b);
        }
        this.removeChild(b);
    }

    public appendBoom(b: SkillBoom) {
        if (b.typeCamp == 1) {
            this.myBoom.add(b.boomID, b);
        } else {
            this.enemyBoom.add(b.boomID, b);
        }
        this.freeBoom.del(b.boomID);
        this.addChild(b);
    }

    public removeBoom(b: SkillBoom) {
        if (b.typeCamp == 1) {
            if (this.myBoom.has(b.boomID)) {
                this.myBoom.del(b.boomID);
                this.freeBoom.add(b.boomID, b);
                this.removeChild(b);
            }
        } else {
            if (this.enemyBoom.has(b.boomID)) {
                this.enemyBoom.del(b.boomID);
                this.freeBoom.add(b.boomID, b);
                this.removeChild(b);
            }
        }
    }


    private onFlyTouchBegin(evt: egret.TouchEvent) {
        // if (!this.myFly.dead) {
        //     let pos = this.localToGlobal(this.myFly.x, this.myFly.y);
        //     this.myFlyDragOffsetX = evt.stageX - pos.x;
        //     this.myFlyDragOffsetY = evt.stageY - pos.y;

        //     this.rootContainer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onFlyTouchMove, this);
        // }
    }

    private onFlyTouchMove(evt: egret.TouchEvent) {
        // if (!this.myFly.dead) {
        //     let pos = this.globalToLocal(evt.stageX - this.myFlyDragOffsetX, evt.stageY - this.myFlyDragOffsetY);
        //     this.myFly.moveTo(pos.x, pos.y);
        // }
    }

    private onFlyTouchEnd(evt: egret.TouchEvent) {
        //this.rootContainer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onFlyTouchMove, this);
        if (!this.myFly.dead) {
            let pos = this.globalToLocal(evt.stageX, evt.stageY);
            if (this.zhangAi && !this.zhangAi.hitTest(this.myFly)) {
                this.myFly.moveTo(pos.x, pos.y);
            }
        }
    }

    public createEnemyFly(col: number): Role {
        let fly: Role = this.makeFlyer(this.rootContainer.stage.stageWidth * col * 0.15, 0, 2);
        this.appendFlyer(fly);
        return fly;
    }

    public createBoom(x: number, y: number, camp: number): SkillBoom {
        let bl: SkillBoom = this.makeBoom(x, y, camp);
        this.appendBoom(bl);
        return bl;
    }

    private makeFlyer(x: number, y: number, camp: number): Role {
        if (this.freeFly.getCount() > 0) {
            let f: Role = this.freeFly.items[Object.keys(this.freeFly.items)[0]];
            f.reset("f2_png", x, y, camp);
            return f;
        }

        let e: Role = new Role(this, "f2_png", x, y, camp);
        e.flyID = this.freeFly.getMaxKey() + 1;
        this.freeFly.add(e.flyID, e);
        return e;
    }

    private makeBoom(x: number, y: number, camp: number): SkillBoom {
        if (this.freeBoom.getCount() > 0) {
            let bl: SkillBoom = this.freeBoom.items[Object.keys(this.freeBoom.items)[0]];
            if (camp == 1) {
                bl.reset("b1_png", x, y, camp);
            } else {
                bl.reset("b2_png", x, y, camp);
            }
            return bl;
        }

        let bl: SkillBoom;
        if (camp == 1) {
            bl = new SkillBoom(this, "b1_png", x, y, camp);
        } else {
            bl = new SkillBoom(this, "b2_png", x, y, camp);
        }
        bl.boomID = this.freeBoom.getMaxKey() + 1;
        this.freeBoom.add(bl.boomID, bl);
        return bl;
    }

}
