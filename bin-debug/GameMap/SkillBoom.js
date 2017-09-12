// TypeScript file
// class SkillBoom extends egret.Sprite {
//     // 根显示容器
//     private rootContainer: GameMapContainer;
//     public typeCamp: number;
//     private pic: string;
//     private startX: number;
//     private startY: number;
//     public dead: boolean;
//     public boomID: number;
//     private tw: egret.Tween;
//     public constructor(root: GameMapContainer, pic: string, x: number, y: number, camp: number) {
//         super();
//         this.typeCamp = camp;
//         this.touchChildren = false;
//         this.rootContainer = root;
//         this.boomID = 0;
//         this.reset(pic, x, y, camp);
//     }
//     public isEnemy(f: Role): boolean {
//         return this.typeCamp != f.typeCamp;
//     }
//     public reset(pic: string, x: number, y: number, camp: number) {
//         if (this.pic == pic && this.typeCamp == camp) {
//             if (this.tw) {
//                 this.tw.setPaused(true);
//                 this.tw = undefined;
//             }
//             this.startX = x;
//             this.startY = y;
//             this.dead = false;
//             this.x = x - this.width / 2;
//             this.y = y - this.height;
//             if (camp != 1) {
//                 this.tw = egret.Tween.get(this).to({ y: this.startY + 1200 }, 3000).call(this.tweenEnd, this);
//             } else {
//                 this.tw = egret.Tween.get(this).to({ y: -100 }, 3000).call(this.tweenEnd, this);
//             }
//         } else {
//             this.removeChildren();
//             this.typeCamp = camp;
//             this.pic = pic;
//             this.startX = x;
//             this.startY = y;
//             this.dead = false;
//             let bmg: egret.Bitmap = new egret.Bitmap(RES.getRes(pic));
//             this.x = x - bmg.width / 2;
//             this.y = y - bmg.height;
//             this.addChild(bmg);
//             if (camp != 1) {
//                 this.tw = egret.Tween.get(this).to({ y: this.startY + 1200 }, 3000).call(this.tweenEnd, this);
//             } else {
//                 this.tw = egret.Tween.get(this).to({ y: -100 }, 3000).call(this.tweenEnd, this);
//             }
//         }
//     }
//     private tweenEnd() {
//         if (!this.dead) {
//             if (this.tw) {
//                 this.tw.setPaused(true);
//                 this.tw = undefined;
//             }
//             this.rootContainer.removeBoom(this);
//         }
//     }
//     public killed() {
//         if (!this.dead) {
//             this.dead = true;
//             if (this.tw) {
//                 this.tw.setPaused(true);
//                 this.tw = undefined;
//             }
//             this.rootContainer.removeBoom(this);
//         }
//     }
// }
//# sourceMappingURL=SkillBoom.js.map