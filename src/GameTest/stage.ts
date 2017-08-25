// TypeScript file

namespace tgame {

    export class Stage {
        private _width: number;
        private _height: number;
        private _scenesName: MapStr<SceneSet>;
        private _scenesIndex: MapNum<SceneSet>;

        private _scrollView:egret.ScrollView = new egret.ScrollView();

        public constructor() {
            this._scrollView.bounces = false; // 禁止拖拽回弹
        }

        public SetWidth(n: number) {
            this._width = n;
            this._scrollView.width = n;
        }

        public SetHeight(n: number) {
            this._height = n;
            this._scrollView.height = n;
        }

        public GetWidth(): number {
            return this._width;
        }

        public GetHeight(): number {
            return this._height;
        }

        public AddSceneSet(s:SceneSet):boolean {
            if (this._scenesName.get(s.GetName())==null) {
                s.SetStage(this);
                this._scenesName.add(s.GetName(),s);
                this._scenesIndex.add(s.GetIndex(),s);
                return true;
            }
            return false;
        }

        public DelSceneSet(name:string):boolean {
            let os = this._scenesName.get(name);
            if (os!=null) {
                os.SetStage(null);
                this._scenesIndex.del(os.GetIndex());
                this._scenesName.del(name);
                return true;                
            }
            return false;
        }
    }
}