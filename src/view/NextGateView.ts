module module {
    export class NextGateView extends ui.game.NextGateViewUI {
        public plantId: number
        constructor() {
            super()
            this.initEvents();
            this.initView()
        }
        public initView(): void {
            this.plantId = RaceManager.instance.selectPlantId > 100 ? RaceManager.instance.selectPlantId - 100 : RaceManager.instance.selectPlantId;
            if (this.plantId == 8) {
                this.visible = false
            } else {
                this.visible = true
                this.showIcon(this.plantId + 1)
            }
            if (Main.app.mwx.ofBack == 0) {
                this.visible = false
            }
        }
        public showIcon(val: number): void {
            this.iconGrade.skin = RaceManager.instance.getLogimg(val)
            if (RaceManager.instance.isOpenGate(val)) {
                this.luckImg.visible = false
            } else {
                this.luckImg.visible = true
            }

        }
        public goGate(): void {
            manager.SoundPlayMgr.instance.playButtonClick();
            RaceManager.instance.gotoGate(this.plantId + 1);
            manager.EventManager.instance.event(BottomView.UNLOCK);
        }
        private initEvents(): void {
            this.iconGrade.on(laya.events.Event.CLICK, this, this.goGate)
            manager.EventManager.instance.on(BottomView.UNLOCK, this, this.initView);
        }

        private removeEvents(): void {
            manager.EventManager.instance.off(BottomView.UNLOCK, this, this.initView);
        }
        public destroy(): void {
            this.removeEvents();
            this.removeSelf();
            super.destroy();
        }
    }
}