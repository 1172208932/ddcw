
/**
 * 右边的更多游戏;
 */
module module {
    export class RightBtnsDialog extends ui.view.rightBtnsViewUI {

        constructor() {
            super()
            this.init()
            this.initEvents()
        }

        private init() {
            this.showGG();
            // 旋转动画
            Laya.Tween.clearAll(this.moreGame);
            this.tween1(this.moreGame);
            // 开启定时切换游戏
            if (Main.app.mwx.ofIconTime > 0) {
                Laya.timer.loop(Main.app.mwx.ofIconTime, this, this.showGG);
            }
        }

        private initEvents() {
            this.moreGame.on(Laya.Event.MOUSE_DOWN, this, this.showMore, [this.moreGame]);
            RaceManager.instance.on(RaceManager.RightButtonVisiable, this, this.setRightBtnVisiable);
        }

        private setRightBtnVisiable(show:boolean):void {
            this.visible = show;
        }

        // 展示广告
        public showMore(btn:Laya.Image) {
            if (Main.app.mwx.buttonType) {
                var obj:Object = Main.app.mwx.getMoreUrl(btn.name);
                if (obj == null) {
                    return;
                }
                Main.app.mwx.reportADHit(btn.name);
                gameBox.showBoxPage(obj["appid"], Main.app.mwx.games_box, "宠物蛋蛋");
                Main.app.TiaoZhuanIndex = 2;
                // 埋点统计
                Main.app.mwx.dataLog(dtLogConfig.DaoLiuIcon, {"success":0});
            }
        }

        public showGG():void {
            this.moreGame.visible = true;
            // Main.app.mwx.initMore(this.moreGame, "btn", true);
        }
    
        // 缓动
        public tween1(btn:Laya.Image, delay:number = 0) {
            Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween2, [btn]), delay);
        }
        public tween2(btn: Laya.Image) {
            Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween3, [btn]));
        }
        public tween3(btn: Laya.Image) {
            Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween4, [btn]));
        }
        public tween4(btn: Laya.Image) {
            Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween1, [btn]), 2000);
        }
    }
}
