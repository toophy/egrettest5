// TypeScript file

namespace tgame {
    export class SceneSet extends Base {
        private _scenesName: MapStr<Scene>;
        private _scenesIndex: MapNum<Scene>;

        public constructor() {
            super();
        }
    }
}