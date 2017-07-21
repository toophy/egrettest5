// export class GameUtil
//     {
//         /**基于矩形的碰撞检测*/
//         public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
//         {
//             var rect1:egret.Rectangle = obj1.getBounds();
//             var rect2:egret.Rectangle = obj2.getBounds();
//             rect1.x = obj1.x;
//             rect1.y = obj1.y;
//             rect2.x = obj2.x;
//             rect2.y = obj2.y;
//             return rect1.intersects(rect2);
//         }
//     }

class Map<T> {
    private items: { [key: string]: T };

    constructor() {
        this.items = {};
    }

    add(key: string, value: T): void {
        this.items[key] = value;
    }

    has(key: string): boolean {
        return key in this.items;
    }

    get(key: string): T {
        return this.items[key];
    }

    del(key: string){
        if ( this.has(key) ){
            this.items[key] = null;
        }
    }
}

// TypeScript file
class FlySceneContainer extends egret.Sprite {

    // 根显示容器
    private rootContainer: egret.DisplayObjectContainer;
    private myFlyDragOffsetX: number;
    private myFlyDragOffsetY: number;
    private myFly: Flyer;
    private enemyFly: Flyer[];
    private enemyBoom: Boom[];
    private myBoom: Boom[];

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
        this.enemyFly = new Array<Flyer>();
        for (let i: number = 1; i < 6; i++) {
            this.makeEnemyFly(i);
        }
        this.enemyBoom = new Array<Boom>();
        this.myBoom = new Array<Boom>();

        let testMap:Map<string> = new Map<string>();
        testMap.add("aa","111");
        testMap.add("bb","222");
        testMap.del("aa");


    }

    private onUpdateFrame(evt: egret.Event) {
        // 判断碰撞
        // 我的飞机子弹
        //     子弹都是矩形, 绘制矩形范围
        //     我的子弹, 碰撞敌方飞机
        // 敌方飞机子弹
        //     敌方子弹, 碰撞我的飞机
        //     矩形碰撞函数
        // 飞机碰撞
    }

    public appendBoom(b:Boom) {
        if ( b.typeCamp==1 ){
            this.myBoom.push(b);
        } else {
            this.enemyBoom.push(b);
        }
        this.addChild(b);
    }

    public removeBoom(b:Boom){
        if ( b.typeCamp==1 ){
            this.myBoom.push(b);
        } else {
            this.enemyBoom.push(b);
        }
        this.removeChild(b);
    }


    private onFlyTouchBegin(evt: egret.TouchEvent) {
        let pos = this.localToGlobal(this.myFly.x, this.myFly.y);
        this.myFlyDragOffsetX = evt.stageX - pos.x;
        this.myFlyDragOffsetY = evt.stageY - pos.y;

        this.rootContainer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onFlyTouchMove, this);
    }

    private onFlyTouchMove(evt: egret.TouchEvent) {
        let pos = this.globalToLocal(evt.stageX - this.myFlyDragOffsetX, evt.stageY - this.myFlyDragOffsetY);
        this.myFly.moveTo(pos.x, pos.y);
    }

    private onFlyTouchEnd(evt: egret.TouchEvent) {
        this.rootContainer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onFlyTouchMove, this);
    }

    private makeEnemyFly(col: number) {
        let e: Flyer = new Flyer(this, "f2_png", this.rootContainer.stage.stageWidth * col * 0.15, 0, 2);
        this.enemyFly.push(e);
        this.addChild(e);
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

    public constructor(root: FlySceneContainer, pic: string, x: number, y: number, camp: number) {
        super();
        this.typeCamp = camp;
        this.rootContainer = root;
        this.reset(pic, x, y, camp);
    }

    public moveTo(x: number, y: number) {
        this.x = x;
    }

    public isEnemy(f: Flyer): boolean {
        return this.typeCamp != f.typeCamp;
    }

    public reset(pic: string, x: number, y: number, camp: number) {
        this.removeChildren();
        if (this.shotBoom) {
            this.shotBoom.removeEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
        }

        this.typeCamp = camp;
        this.pic = pic;
        this.startX = x;
        this.startY = y;
        this.curHP = 100;
        this.maxHP = 100;

        let bmg: egret.Bitmap = new egret.Bitmap(RES.getRes(pic));
        this.x = x - bmg.width / 2;
        this.y = y - bmg.height;
        this.addChild(bmg);

        this.myWidth = bmg.width;
        this.myHeight = bmg.height;

        let sRect: egret.Shape = new egret.Shape();
        sRect.graphics.lineStyle(1, 0x00ff00);
        sRect.graphics.drawRect(0, 0, this.myWidth, this.myHeight);
        sRect.graphics.endFill();
        this.addChild(sRect);

        if (camp != 1) {
            this.touchChildren = false;
            egret.Tween.get(this).to({ y: this.y + 1200 }, 6000).call(this.tweenEnd, this);

            this.shotBoom = new egret.Timer(500, 0);
            this.shotBoom.addEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
            this.shotBoom.start();
        } else {
            this.shotBoom = new egret.Timer(200, 0);
            this.shotBoom.addEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
            this.shotBoom.start();
        }
    }

    private tweenEnd() {
        this.reset(this.pic, this.startX, this.startY, this.typeCamp);
    }

    private onShotBoom(evt: egret.TimerEvent) {
        if (this.typeCamp == 1) {
            let bl: Boom = new Boom(this.rootContainer, "b1_png", this.x + 10, this.y + this.myHeight / 2, this.typeCamp);
            this.rootContainer.addChild(bl);

            let br: Boom = new Boom(this.rootContainer, "b1_png", this.x + this.myWidth - 10, this.y + this.myHeight / 2, this.typeCamp);
            this.rootContainer.addChild(br);
        } else {
            let bl: Boom = new Boom(this.rootContainer, "b2_png", this.x + 12, this.y + 0 + this.myHeight * 0.95, this.typeCamp);
            this.rootContainer.addChild(bl);

            let br: Boom = new Boom(this.rootContainer, "b2_png", this.x + this.myWidth - 12, this.y + 0 + this.myHeight * 0.95, this.typeCamp);
            this.rootContainer.addChild(br);
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

    public constructor(root: FlySceneContainer, pic: string, x: number, y: number, camp: number) {
        super();
        this.typeCamp = camp;
        this.touchChildren = false;
        this.rootContainer = root;
        this.reset(pic, x, y, camp);
    }

    public isEnemy(f: Flyer): boolean {
        return this.typeCamp != f.typeCamp;
    }

    public reset(pic: string, x: number, y: number, camp: number) {
        this.removeChildren();

        this.typeCamp = camp;
        this.pic = pic;
        this.startX = x;
        this.startY = y;

        let bmg: egret.Bitmap = new egret.Bitmap(RES.getRes(pic));
        this.x = x - bmg.width / 2;
        this.y = y - bmg.height;
        this.addChild(bmg);

        let sRect: egret.Shape = new egret.Shape();
        sRect.graphics.lineStyle(1, 0x0000ff);
        sRect.graphics.drawRect(0, 0, bmg.width, bmg.height);
        sRect.graphics.endFill();
        this.addChild(sRect);

        if (camp != 1) {
            egret.Tween.get(this).to({ y: this.startY + 1200 }, 3000).call(this.tweenEnd, this);
        } else {
            egret.Tween.get(this).to({ y: -100 }, 3000).call(this.tweenEnd, this);
        }
    }
    private tweenEnd() {
        this.rootContainer.removeChild(this);
    }
}
