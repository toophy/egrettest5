// TypeScript file


class Zhangai extends egret.Sprite {

    // 根显示容器
    private rootContainer: GameMapContainer;
    private startX: number;
    private startY: number;
    private zhangAi: MapStr<egret.Shape>;

    public constructor(root: GameMapContainer) {
        super();
        this.touchChildren = false;
        this.rootContainer = root;
        this.zhangAi = new MapStr<egret.Shape>();
    }

    public append(name: string, x, y, w, h: number) {
        if (!this.zhangAi.has(name)) {
            let sp: egret.Shape = new egret.Shape();
            sp.graphics.lineStyle(1, 0x00000);
            sp.graphics.drawRect(0, 0, w, h);
            sp.graphics.endFill();
            sp.x = x;
            sp.y = y;
            this.zhangAi.add(name, sp);
            this.addChild(sp);
        }
    }

    public remove(name: string) {
        if (this.zhangAi.has(name)) {
            this.removeChild(this.zhangAi.get(name));
            this.zhangAi.del(name);
        }
    }

    public hitTest(s: egret.Sprite): boolean {
        let zhang = Object.keys(this.zhangAi.items);
        for (let i of zhang) {
            if (GameUtil.hitTest(s, this.zhangAi.get(i))) {
                return true;
            }
        }
        return false;
    }
}
