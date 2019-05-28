module module {
    export class EatApple extends ui.game.EatAppleUI {
        private arrow: GuidArrowView = null;

        constructor() {
            super()
            this.setEvents();
        }
        /* 设置响应事件 */
        private setEvents(): void {
            this.btn_apple.on(laya.events.Event.CLICK, this, this.onBtnAppleClick);
            // this.box_get.on(laya.events.Event.CLICK, this, this.getChicken)
            RaceManager.instance.on(RaceManager.CHANGE_GUID_APPLE, this, this.onChangeGuidApple);
        }
        /* 引导操作 */
        private onChangeGuidApple(): void {
            this.arrow = new GuidArrowView();
            this.arrow.setGuidRun4();
            this.box_apple.addChild(this.arrow);
        }
        /* 点击喂宠物按钮 */
        private onBtnAppleClick(): void {
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.MeatPatClick, { "success": 1 });

            // manager.SoundPlayMgr.instance.playButtonClick();
            // manager.EventManager.instance.event(ToolView.GOTO_MEAL);
            // this.btn_close_meal.visible = true;
            // this.box_apple.visible = false;
            // // this.box_get.visible = false

            if (this.arrow != null) {
                this.arrow.destroy();
                this.arrow = null;
            }
            // manager.EventManager.instance.event(RaceView.CONTROL_FALSE);


            manager.EventManager.instance.event(ToolView.EAT_APPLE);
        }
        /* 移除响应事件 */
        private removeEvents(): void {
            RaceManager.instance.off(RaceManager.CHANGE_GUID_APPLE, this, this.onChangeGuidApple);

        }
        /* 销毁 */
        public destroy(): void {
            this.removeEvents();
            this.removeSelf();
            super.destroy();
        }
    }
}