// TypeScript file

namespace tgame {

    export class Base {
        private _name: string;
        private _index: number;
        private _pos: egret.Point;

        public constructor() {
        }

        public SetName(n: string) {
            this._name = n;
        }

        public GetName(): string {
            return this._name;
        }

        public SetIndex(n: number) {
            this._index = n;
        }

        public GetIndex(): number {
            return this._index;
        }

        public SetPos(x: number, y: number) {
            this._pos.x = x;
            this._pos.y = y;
        }

        public GetPos(): egret.Point {
            return this._pos;
        }
    }
}

