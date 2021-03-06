
// TypeScript file
class FlySceneContainer extends egret.Sprite {

    // 根显示容器
    private rootContainer: egret.DisplayObjectContainer;
    private myFlyDragOffsetX: number;
    private myFlyDragOffsetY: number;

    private myFly: Flyer;

    private freeFly: MapNum<Flyer>;
    private enemyFly: MapNum<Flyer>;

    private freeBoom: MapNum<Boom>;
    private enemyBoom: MapNum<Boom>;
    private myBoom: MapNum<Boom>;



    public constructor(root: egret.DisplayObjectContainer) {
        super();
        this.rootContainer = root;
    }

    public createScene() {
        // 背景
        let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("bgFly_jpg"));
        bg.width = this.rootContainer.stage.stageWidth;
        bg.height = this.rootContainer.stage.stageHeight;
        this.addChild(bg);

        // 我的飞机
        this.myFly = new Flyer(this, "f1_png", this.rootContainer.stage.stageWidth / 2, this.rootContainer.stage.stageHeight, 1);
        this.addChild(this.myFly);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onFlyTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onFlyTouchEnd, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdateFrame, this);

        // 敌人
        this.freeFly = new MapNum<Flyer>();
        this.enemyFly = new MapNum<Flyer>();

        // 子弹
        this.freeBoom = new MapNum<Boom>();
        this.enemyBoom = new MapNum<Boom>();
        this.myBoom = new MapNum<Boom>();

        // let testMap: MapNum<string> = new MapNum<string>();
        // testMap.add(1, "111");
        // testMap.add(1, "222");
        // testMap.add(3, "333");
        // console.log(Object.length);
        // Object.keys(testMap.items).forEach(key => {
        //     console.log(testMap.items[key])
        // })
    }

    private onUpdateFrame(evt: egret.Event) {
        // 判断碰撞
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
        if (this.enemyFly.getCount() < 2) {
            let randCol = Math.floor(Math.random() * 6) + 1;
            this.createEnemyFly(randCol);
        }
    }

    public appendFlyer(b: Flyer) {
        if (b.typeCamp != 1) {
            this.enemyFly.add(b.flyID, b);
            this.freeFly.del(b.flyID);
        }
        this.addChild(b);
    }

    public removeFlyer(b: Flyer) {
        if (b.typeCamp != 1) {
            this.enemyFly.del(b.flyID);
             this.freeFly.add(b.flyID, b);
        }
        this.removeChild(b);
    }

    public appendBoom(b: Boom) {
        if (b.typeCamp == 1) {
            this.myBoom.add(b.boomID, b);
        } else {
            this.enemyBoom.add(b.boomID, b);
        }
        this.freeBoom.del(b.boomID);
        this.addChild(b);
    }

    public removeBoom(b: Boom) {
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
        if(!this.myFly.dead){
let pos = this.localToGlobal(this.myFly.x, this.myFly.y);
        this.myFlyDragOffsetX = evt.stageX - pos.x;
        this.myFlyDragOffsetY = evt.stageY - pos.y;

        this.rootContainer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onFlyTouchMove, this);
        }
        
    }

    private onFlyTouchMove(evt: egret.TouchEvent) {
        if(!this.myFly.dead){
        let pos = this.globalToLocal(evt.stageX - this.myFlyDragOffsetX, evt.stageY - this.myFlyDragOffsetY);
        this.myFly.moveTo(pos.x, pos.y);
        }
    }

    private onFlyTouchEnd(evt: egret.TouchEvent) {
        this.rootContainer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onFlyTouchMove, this);
    }

    public createEnemyFly(col: number): Flyer {
        let fly: Flyer = this.makeFlyer(this.rootContainer.stage.stageWidth * col * 0.15, 0, 2);
        this.appendFlyer(fly);
        return fly;
    }

    public createBoom(x: number, y: number, camp: number): Boom {
        let bl: Boom = this.makeBoom(x, y, camp);
        this.appendBoom(bl);
        return bl;
    }

    private makeFlyer(x: number, y: number, camp: number): Flyer {
        if (this.freeFly.getCount() > 0) {
            let f: Flyer = this.freeFly.items[Object.keys(this.freeFly.items)[0]];
            f.reset("f2_png", x, y, camp);
            return f;
        }

        let e: Flyer = new Flyer(this, "f2_png", x, y, camp);
        e.flyID = this.freeFly.getMaxKey() + 1;
        this.freeFly.add(e.flyID, e);
        return e;
    }

    private makeBoom(x: number, y: number, camp: number): Boom {
        if (this.freeBoom.getCount() > 0) {
            let bl: Boom = this.freeBoom.items[Object.keys(this.freeBoom.items)[0]];
            if (camp == 1) {
                bl.reset("b1_png", x, y, camp);
            } else {
                bl.reset("b2_png", x, y, camp);
            }
            return bl;
        }

        let bl: Boom;
        if (camp == 1) {
            bl = new Boom(this, "b1_png", x, y, camp);
        } else {
            bl = new Boom(this, "b2_png", x, y, camp);
        }
        bl.boomID = this.freeBoom.getMaxKey() + 1;
        this.freeBoom.add(bl.boomID, bl);
        return bl;
    }

}

class Flyer extends egret.Sprite {

    // 根显示容器
    private rootContainer: FlySceneContainer;
    public typeCamp: number;
    private curHP: number;
    private maxHP: number;
    private pic: string;
    private startX: number;
    private startY: number;
    private shotBoom: egret.Timer;
    private myWidth: number;
    private myHeight: number;
    public dead: boolean;
    public flyID: number;
    private tw: egret.Tween;
    private tip: egret.TextField;

    public constructor(root: FlySceneContainer, pic: string, x: number, y: number, camp: number) {
        super();
        this.typeCamp = camp;
        this.rootContainer = root;
        this.flyID = 0;
        this.tip = new egret.TextField();
        this.reset(pic, x, y, camp);
    }

    public moveTo(x: number, y: number) {
        this.x = x;
    }

    public isEnemy(f: Flyer): boolean {
        return this.typeCamp != f.typeCamp;
    }

    public reset(pic: string, x: number, y: number, camp: number) {
        if (this.pic == pic && this.typeCamp == camp) {
            if (this.shotBoom) {
                this.shotBoom.stop();
                this.shotBoom.removeEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
                this.shotBoom = undefined;
            }
            if (this.tw) {
                this.tw.setPaused(true);
                this.tw = undefined;
            }

            this.startX = x;
            this.startY = y;
            this.curHP = this.maxHP;
            this.dead = false;

            this.x = x - this.myWidth / 2;
            this.y = y - this.myHeight;

            if (camp != 1) {
                this.touchEnabled = false;
                this.touchChildren = false;
                this.tw = egret.Tween.get(this).to({ y: this.y + 1200 }, 6000).call(this.tweenEnd, this);

                this.shotBoom = new egret.Timer(1000, 0);
                this.shotBoom.addEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
                this.shotBoom.start();
            } else {
                this.touchEnabled = true;
                this.touchChildren = false;
                this.shotBoom = new egret.Timer(200, 0);
                this.shotBoom.addEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
                this.shotBoom.start();
            }
        } else {
            this.removeChildren();
            if (this.shotBoom) {
                this.shotBoom.stop();
                this.shotBoom.removeEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
                this.shotBoom = undefined;
            }

            this.typeCamp = camp;
            this.pic = pic;
            this.startX = x;
            this.startY = y;
            
            if (this.typeCamp==1){
                this.maxHP = 10;
            } else {
                this.maxHP = 3;
            }
            this.curHP = this.maxHP;
            
            this.dead = false;

            let bmg: egret.Bitmap = new egret.Bitmap(RES.getRes(pic));
            this.x = x - bmg.width / 2;
            this.y = y - bmg.height;
            this.addChild(bmg);

            this.myWidth = bmg.width;
            this.myHeight = bmg.height;

            if (camp != 1) {
                this.touchEnabled = false;
                this.touchChildren = false;
                this.tw = egret.Tween.get(this).to({ y: this.y + 1200 }, 6000).call(this.tweenEnd, this);

                this.shotBoom = new egret.Timer(1000, 0);
                this.shotBoom.addEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
                this.shotBoom.start();
            } else {
                this.touchEnabled = true;
                this.touchChildren = false;
                this.shotBoom = new egret.Timer(200, 0);
                this.shotBoom.addEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
                this.shotBoom.start();
            }
        }
    }

    private tweenEnd() {
        if (this.shotBoom) {
            this.shotBoom.stop();
            this.shotBoom.removeEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
            this.shotBoom = undefined;
        }
        this.rootContainer.removeFlyer(this);
    }

    public onShot() {
        if (!this.dead) {

            if (this.typeCamp == 1) {
                this.tip.visible = true;
                this.tip.text = "-1";
                this.tip.bold = true;
                this.tip.size = 30;
                this.tip.textColor = 0x881100;
                this.tip.x = this.width / 2;
                this.tip.y = 0;
                if (this.getChildIndex(this.tip) == -1) {
                    this.addChild(this.tip);
                }
                egret.Tween.get(this.tip).to({ y: -100 }, 1000, egret.Ease.backInOut).to({ visible: false });
            }

            this.curHP--;
            if (this.curHP <= 0) {
                this.killed();
            }
        }
    }

    public killed() {
        if (!this.dead) {
            if (this.typeCamp == 1) {
                this.tip.visible = true;
                this.tip.text = "Game Over";
                this.tip.textColor = 0x881100;
                this.tip.x = this.width / 2;
                this.tip.y = 0;
                if (this.getChildIndex(this.tip) == -1) {
                    this.addChild(this.tip);
                }
                egret.Tween.get(this.tip).to({ y: -400 }, 2000, egret.Ease.backInOut).to({ visible: false });
            }

            this.curHP = 0;
            this.dead = true;
            if (this.tw) {
                this.tw.setPaused(true);
                this.tw = undefined;
            }
            this.rootContainer.removeFlyer(this);
        }
    }

    private onShotBoom(evt: egret.TimerEvent) {
        if (this.typeCamp == 1) {
            this.rootContainer.createBoom(this.x + 10, this.y + this.myHeight / 2, this.typeCamp);
            this.rootContainer.createBoom(this.x + this.myWidth - 10, this.y + this.myHeight / 2, this.typeCamp);
        } else {
            this.rootContainer.createBoom(this.x + 12, this.y + 0 + this.myHeight * 0.95, this.typeCamp);
            this.rootContainer.createBoom(this.x + this.myWidth - 12, this.y + 0 + this.myHeight * 0.95, this.typeCamp);
        }
    }
}


class Boom extends egret.Sprite {

    // 根显示容器
    private rootContainer: FlySceneContainer;
    public typeCamp: number;
    private pic: string;
    private startX: number;
    private startY: number;
    public dead: boolean;
    public boomID: number;
    private tw: egret.Tween;

    public constructor(root: FlySceneContainer, pic: string, x: number, y: number, camp: number) {
        super();
        this.typeCamp = camp;
        this.touchChildren = false;
        this.rootContainer = root;
        this.boomID = 0;
        this.reset(pic, x, y, camp);
    }

    public isEnemy(f: Flyer): boolean {
        return this.typeCamp != f.typeCamp;
    }

    public reset(pic: string, x: number, y: number, camp: number) {
        if (this.pic == pic && this.typeCamp == camp) {
            if (this.tw) {
                this.tw.setPaused(true);
                this.tw = undefined;
            }
            this.startX = x;
            this.startY = y;
            this.dead = false;

            this.x = x - this.width / 2;
            this.y = y - this.height;

            if (camp != 1) {
                this.tw = egret.Tween.get(this).to({ y: this.startY + 1200 }, 3000).call(this.tweenEnd, this);
            } else {
                this.tw = egret.Tween.get(this).to({ y: -100 }, 3000).call(this.tweenEnd, this);
            }
        } else {
            this.removeChildren();

            this.typeCamp = camp;
            this.pic = pic;
            this.startX = x;
            this.startY = y;
            this.dead = false;

            let bmg: egret.Bitmap = new egret.Bitmap(RES.getRes(pic));
            this.x = x - bmg.width / 2;
            this.y = y - bmg.height;
            this.addChild(bmg);

            if (camp != 1) {
                this.tw = egret.Tween.get(this).to({ y: this.startY + 1200 }, 3000).call(this.tweenEnd, this);
            } else {
                this.tw = egret.Tween.get(this).to({ y: -100 }, 3000).call(this.tweenEnd, this);
            }
        }
    }
    private tweenEnd() {
        if (!this.dead) {
            if (this.tw) {
                this.tw.setPaused(true);
                this.tw = undefined;
            }
            this.rootContainer.removeBoom(this);
        }
    }
    public killed() {
        if (!this.dead) {
            this.dead = true;
            if (this.tw) {
                this.tw.setPaused(true);
                this.tw = undefined;
            }
            this.rootContainer.removeBoom(this);
        }
    }
}
