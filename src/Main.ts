//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    private updateCicleTimer: egret.Timer;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        let bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x336699, 100);
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);

        let sprite1: egret.Sprite = new egret.Sprite();
        sprite1.x = 100;
        sprite1.y = 100;
        sprite1.width = 250;
        sprite1.height = 400;
        // sprite1.scrollRect = new egret.Rectangle(0, 0, 250, 400);
        // sprite1.cacheAsBitmap = true;
        // sprite1.scaleX = 1.5;
        // sprite1.scaleY = 2.0;

        let cicle: egret.Shape = new egret.Shape();
        cicle.graphics.beginFill(0x336600, 90);
        cicle.anchorOffsetX = 0;
        cicle.anchorOffsetY = 0;
        cicle.graphics.drawCircle(0, 0, 30);
        cicle.graphics.endFill();

        cicle.touchEnabled = true;
        cicle.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        cicle.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchStop, this);
        sprite1.addChild(cicle);

        let cicle2: egret.Shape = new egret.Shape();
        cicle2.graphics.beginFill(0x556622, 90);
        cicle2.anchorOffsetX = 0;
        cicle2.anchorOffsetY = 0;
        cicle2.graphics.drawCircle(60, 100, 30);
        cicle2.graphics.endFill();

        cicle2.touchEnabled = true;
        cicle2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        cicle2.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchStop, this);
        sprite1.addChild(cicle2);



        let text1: egret.TextField = new egret.TextField();
        text1.text = "第一行字";
        text1.size = 16;
        text1.x = 0;
        text1.y = 60;

        text1.touchEnabled = true;
        text1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchText1, this);
        sprite1.addChild(text1);




        let textLine: egret.Shape = new egret.Shape();
        textLine.graphics.lineStyle(2, 0x773300);     // 5像素粗细， 颜色
        textLine.graphics.drawRect(text1.x, text1.y, text1.width, text1.height);
        textLine.graphics.endFill();                  //结束绘图
        sprite1.addChild(textLine);


        let spriteLine: egret.Shape = new egret.Shape();
        spriteLine.graphics.lineStyle(2, 0x770000);     // 5像素粗细， 颜色
        spriteLine.graphics.drawRect(sprite1.x, sprite1.y, sprite1.width, sprite1.height);
        spriteLine.graphics.endFill();                  //结束绘图
        this.addChild(spriteLine);


        this.addChild(sprite1);

        let bmp1: egret.Bitmap = new egret.Bitmap(RES.getRes("ctm_jpg"));
        bmp1.x = 0;
        bmp1.y = 190;
        bmp1.width = sprite1.width;
        bmp1.height = sprite1.height - 90;
        sprite1.addChild(bmp1);

        // let renderTexture:egret.RenderTexture = new egret.RenderTexture();
        // renderTexture.drawToTexture(sprite1);
        // renderTexture.saveToFile("image/png","a/sprite1.png",new egret.Rectangle(0,0,sprite1.width,sprite1.height));

        let hitRslt = bmp1.hitTestPoint(sprite1.x + 10, sprite1.y + 91);
        if (hitRslt) {
            let text2: egret.TextField = new egret.TextField();
            text2.text = "hit ok";
            text2.x = 100;
            text2.y = 30;
            text2.strokeColor = 0x000000;
            text2.stroke = 2;
            sprite1.addChild(text2);
        } else {
            let text3: egret.TextField = new egret.TextField();
            text3.text = "hit failed";
            text3.x = 100;
            text3.y = 30;
            text3.strokeColor = 0x000000;
            text3.stroke = 1;
            sprite1.addChild(text3);
        }

        egret.log("bmp1 index =%d", sprite1.getChildIndex(bmp1));

        let urlreq: egret.URLRequest = new egret.URLRequest("http://httpbin.org/user-agent");
        let urlloader: egret.URLLoader = new egret.URLLoader();
        urlloader.addEventListener(egret.Event.COMPLETE, function (evt: egret.Event): void {
            egret.log("%s", evt.target.data);
        }, this);
        urlloader.load(urlreq);

        this.dragStageStart = new egret.Point(0, 0);


        this.updateCicleTimer = new egret.Timer(1000, 30);
        this.updateCicleTimer.addEventListener(egret.TimerEvent.TIMER, () => {
            let x = Math.floor(Math.random() * 200);
            let y = Math.floor(Math.random() * 200);
            let color = (Math.floor(Math.random() * 254) + 1) * (Math.floor(Math.random() * 254) + 1) * (Math.floor(Math.random() * 254) + 1);
            let c:egret.Shape = new egret.Shape();
            c.graphics.beginFill(color, 100);
            c.graphics.drawCircle(x, y, 10);
            c.graphics.endFill();
            this.addChild(c);
        }, this);

        this.updateCicleTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => { egret.log("timer end") }, this);
        this.updateCicleTimer.start();


        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
    }

    private onTouchText1(evt: egret.Event) {
        let text1: egret.TextField = evt.currentTarget;
        text1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchText1, this);

        if (Math.floor(Math.random() * 100) < 50) {
            text1.textColor = 0x001133;
            let sound: egret.Sound = RES.getRes("天鹅湖-柴可夫斯基 - 新雅室内乐_mp3");
            let soundChannel: egret.SoundChannel = sound.play(0, 1);
        } else {
            text1.textColor = 0x006633;
        }
    }

    private dragOffsetX: number;
    private dragOffsetY: number;
    private dragObj: egret.Shape;
    private dragStageStart: egret.Point;

    private onTouchStart(evt: egret.TouchEvent) {
        this.dragObj = evt.currentTarget;
        let dragPos = this.dragObj.parent.localToGlobal(this.dragObj.x, this.dragObj.y);
        this.dragOffsetX = evt.stageX - dragPos.x;
        this.dragOffsetY = evt.stageY - dragPos.y;

        // this.dragStageStart.x = evt.stageX - this.dragObj.parent.x;
        // this.dragStageStart.y = evt.stageY - this.dragObj.parent.y;

        this.dragObj.parent.addChild(this.dragObj);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        egret.log("start");


    }

    private onTouchStop(evt: egret.TouchEvent) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        egret.log("stop");
    }

    private onTouchMove(evt: egret.TouchEvent) {
        let dragPos = this.dragObj.parent.globalToLocal(evt.stageX - this.dragOffsetX, evt.stageY - this.dragOffsetY);
        this.dragObj.x = dragPos.x;
        this.dragObj.y = dragPos.y;

        // this.dragObj.parent.scrollRect.x = evt.stageX - this.dragStageStart.x - this.dragObj.parent.x;
        // this.dragObj.parent.scrollRect.y = evt.stageY - this.dragStageStart.y - this.dragObj.parent.y;
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}


