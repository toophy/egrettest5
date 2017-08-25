// TypeScript file

// 

namespace tgame {

    export class  ScenePage extends Base  {
        private _scene: Scene;
        private _objsName: MapStr<SceneObj>;
        private _objsIndex: MapNum<SceneObj>;

        public constructor() {
            super();
        }

        public SetScene(s:Scene){
            this._scene = s;
        }

        public GetScene():Scene{
            return this._scene;
        }

        public AddObj(s:SceneObj):boolean {
            if (this._objsName.get(s.GetName())==null) {
                this._objsName.add(s.GetName(),s);
                this._objsIndex.add(s.GetIndex(),s);
                return true;
            }
            return false;
        }

        public DelObj(name:string):boolean {
            let os = this._objsName.get(name);
            if (os!=null) {
                this._objsIndex.del(os.GetIndex());
                this._objsName.del(name);
                return true;                
            }
            return false;
        }
    }
}