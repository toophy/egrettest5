// TypeScript file

namespace tgame {
    export class SceneSet extends Base {
        private _stage: Stage;
        private _scenesName: MapStr<Scene>;
        private _scenesIndex: MapNum<Scene>;

        public constructor() {
            super();
        }

        public SetStage(s:Stage){
            this._stage = s;
        }

        public GetStage():Stage{
            return this._stage;
        }
        
        public AddScene(s:Scene):boolean {
            if (this._scenesName.get(s.GetName())==null) {
                this._scenesName.add(s.GetName(),s);
                this._scenesIndex.add(s.GetIndex(),s);
                return true;
            }
            return false;
        }

        public DelScene(name:string):boolean {
            let os = this._scenesName.get(name);
            if (os!=null) {
                this._scenesIndex.del(os.GetIndex());
                this._scenesName.del(name);
                return true;                
            }
            return false;
        }

    }
}