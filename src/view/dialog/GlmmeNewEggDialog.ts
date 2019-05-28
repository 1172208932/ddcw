/**
* name 
*/
module module {
	export class GlmmeNewEggDialog extends ui.game.GlmmeNewEggDialogUI {
		private plantId: number = 0;
		constructor(plantId: number) {
			super();
			// Main.app.mwx.showBanner();
			BridgeUtil.callAppMethod("showBanner");
			this.plantId = plantId;
			this.img_egg.skin = "ui/egg_" + this.plantId + ".png";
			this.btn_ok.on(laya.events.Event.CLICK, this, this.onBtnOk);
		}

		private onBtnOk(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.resetPlantExp(this.plantId);
			RaceManager.instance.addEgg(this.plantId);
			this.destroy();
		}

		public destroy(): void {
			BridgeUtil.callAppMethod("hideBanner");
			// Main.app.mwx.closeBanner();
			this.removeSelf();
			super.destroy();
		}
	}
}