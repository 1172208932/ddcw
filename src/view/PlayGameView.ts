module module {
    export class PlayGameView extends ui.game.PlayGameViewUI {
        private arrow: GuidArrowView = null;

        constructor() {
            super()
            this.setEvents();
        }
        /* 设置响应事件 */
        private setEvents(): void {
            this.btn_run.on(laya.events.Event.CLICK, this, this.onBtnRunClick);
        }
        /* 点击去比赛按钮 */
        private onBtnRunClick(): void {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (RaceManager.instance.getPlantInfo().getChichenCount() > 0) {
                var dialog: StartRaceDialog = new StartRaceDialog();
                manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
                // 埋点统计
                Main.app.mwx.dataLog(dtLogConfig.RaceClick, { "success": 0 });
            }
        }
        /* 移除响应事件 */
        private removeEvents(): void {

        }
        /* 销毁 */
        public destroy(): void {
            this.removeEvents();
            this.removeSelf();
            super.destroy();
        }
    }
}