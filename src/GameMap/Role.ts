// TypeScript file

class Role extends egret.Sprite {

    // 根显示容器
    private rootContainer: GameMapContainer;
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
    private myTw: egret.Tween;
    private tip: egret.TextField;

    public constructor(root: GameMapContainer, pic: string, x: number, y: number, camp: number) {
        super();
        this.typeCamp = camp;
        this.rootContainer = root;
        this.flyID = 0;
        this.tip = new egret.TextField();
        this.reset(pic, x, y, camp);
    }

    public setPos(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public moveTo(toX: number, toY: number) {
        this.myTw = egret.Tween.get(this).to({ x: toX, y: toY }, 500).call(this.myTweenEnd, this);
    }

    public stopMove(x: number, y: number) {
        if (this.myTw) {
            this.myTw.setPaused(true);
            this.myTw = undefined;
        }
    }

    public isEnemy(f: Role): boolean {
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

            if (this.typeCamp == 1) {
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

            // if (camp != 1) {
            //     this.touchEnabled = false;
            //     this.touchChildren = false;
            //     this.tw = egret.Tween.get(this).to({ y: this.y + 1200 }, 6000).call(this.tweenEnd, this);

            //     this.shotBoom = new egret.Timer(1000, 0);
            //     this.shotBoom.addEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
            //     this.shotBoom.start();
            // } else {
            //     this.touchEnabled = true;
            //     this.touchChildren = false;
            //     this.shotBoom = new egret.Timer(200, 0);
            //     this.shotBoom.addEventListener(egret.TimerEvent.TIMER, this.onShotBoom, this);
            //     this.shotBoom.start();
            // }
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

    private myTweenEnd() {

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
