/**
* name 
*/
module module {
	export class UnlockGateView extends ui.game.UnlockGateViewUI {
		private money: number = 0;
		private txt_wing: FontClip = null;

		constructor() {
			super();

			this.txt_wing = new FontClip("ui/num_a_", 95, 80, 150, 36, "right");
			this.txt_wing.scale(0.8, 0.8)
			this.box.addChild(this.txt_wing);

			this.btn_unlock.on(laya.events.Event.CLICK, this, this.onUnLock);
			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			// BridgeUtil.callAppMethod("showBanner");


		}

		public start(): void {
			this.img_log.skin = RaceManager.instance.getLogimg(RaceManager.instance.selectPlantId);
			this.img_plant_name.skin = RaceManager.instance.getLogNameimg(RaceManager.instance.selectPlantId);

			this.money = RaceManager.instance.getPlantInfo().money;
			this.txt_wing.text = this.money + "";
		}

		private onUnLock(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if (RaceManager.instance.userInfo.wing >= this.money) {
				RaceManager.instance.unLockPlant(RaceManager.instance.selectPlantId);
				this.visible = false;
				// manager.EventManager.instance.event(BottomView.UNLOCK);
			} else {
				Main.app.showMessage("您的羽毛不足");
				if (Main.app.is_wx) {
					if (Main.app.getReceiveFreeFeather() >= Number(Main.app.mwx.ofFeatherLessParam["time"])) {
						RaceManager.instance.showShop();
					} else {
						Main.app.showFeatherLackingView();
					}
				}
			}
			// Main.app.mwx.closeBanner();
			BridgeUtil.callAppMethod("hideBanner");

		}

		private onBtnClose(): void {
			BridgeUtil.callAppMethod("hideBanner");

			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.gotoGate(RaceManager.instance.prevGateId);

		}
	}
}