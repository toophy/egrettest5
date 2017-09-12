
// TypeScript file
class GameMapContainer extends egret.Sprite {

    //
    public static GROUND: number = 100;
    public static G: number = 0.6;
    public static instance: GameMapContainer = null;

    // 根显示容器
    public rootContainer: egret.DisplayObjectContainer;

    public factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();

    private _lands: tgame.LandView;

    public constructor(root: egret.DisplayObjectContainer) {
        super();
        this.rootContainer = root;

        GameMapContainer.instance = this;

        //      this._resourceConfigURL = "resource/CoreElement.json";
    }

    public createScene() {


        GameMapContainer.GROUND = this.rootContainer.stage.stageHeight - 150;
        this.factory.parseDragonBonesData(RES.getRes("dragonBonesData"));
        this.factory.parseTextureAtlasData(RES.getRes("textureDataA"), RES.getRes("textureA"));
        // mouse move        
        let onTouchMove = egret.sys.TouchHandler.prototype.onTouchMove;
        egret.sys.TouchHandler.prototype.onTouchMove = function (x: number, y: number, touchPointID: number): void {
            onTouchMove.call(this, x, y, touchPointID);
            if (GameMapContainer.instance._lands != null) {
                GameMapContainer.instance._lands._touchMove(x, y);
            }
        }

        let data = RES.getRes("land_json");
        this._lands = new tgame.LandView();
        this._lands.LoadLand(data);
        this._lands.ShowLand(this);

        this.touchEnabled = true;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdateFrame, this);

        document.addEventListener("keydown", this._keyHandler);
        document.addEventListener("keyup", this._keyHandler);
    }

    private _touchHandler(event: egret.TouchEvent): void {
        if (GameMapContainer.instance._lands != null) {
            GameMapContainer.instance._lands._touchHandler(event);
        }
    }

    private _keyHandler(event: KeyboardEvent): void {
        if (GameMapContainer.instance._lands != null) {
            GameMapContainer.instance._lands._keyHandler(event);
        }
    }

    private onUpdateFrame(evt: egret.Event) {
        if (this._lands != null) {
            this._lands.Update();
        }
        dragonBones.WorldClock.clock.advanceTime(-1);
    }
}
