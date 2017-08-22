// TypeScript file

namespace tgame {

    export class Scene extends Base {
        private _pagesName: MapStr<ScenePage>;
        private _pagesIndex: MapNum<ScenePage>;

        public constructor() {
            super();
        }
    }
}

