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
    }
}