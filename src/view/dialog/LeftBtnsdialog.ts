/**
 * 左边抽屉按钮视图
 */
module module {
    export class LeftBtnsDialog extends ui.view.leftBtnsViewUI {
        constructor() {
            super();
            this.initEvents();
        }

        private initEvents() {
            this.sfBtn.on(Laya.Event.MOUSE_DOWN, this, this.onSs);
        }
    
        // 神手游戏
        public onSs():void {
            if (Main.app.mwx.buttonType) {
                gameBox.showBoxPage("", Main.app.mwx.games_box, "宠物蛋蛋");
                Main.app.TiaoZhuanIndex = 1;
                // 埋点统计
                Main.app.mwx.dataLog(dtLogConfig.ChouTiIcon, {"success":0});
            }
        }

        private setVolume() {
            if (laya.media.SoundManager.muted) {
                laya.media.SoundManager.muted = false;
                laya.media.SoundManager.setMusicVolume(1);
                laya.media.SoundManager.setSoundVolume(1);
            } else {  
                laya.media.SoundManager.muted = true;
                laya.media.SoundManager.setMusicVolume(0);
                laya.media.SoundManager.setSoundVolume(0);
            }
        } 
    }
}
