/**
* name 
*/
module module {
	export class UnlockEggSlotDialog extends ui.game.UnlockEggSlotDialogUI {
		private index: number = 0;
		private money: number = 0;
		private txt_wing: FontClip = null;
		private callBackFun: Laya.Handler = null;

		constructor(index: number, callBackFun: Laya.Handler = null) {
			super();
			this.index = index;
			this.callBackFun = callBackFun;
			this.money = RaceManager.instance.soltMoneys[RaceManager.instance.userInfo.openSlotIndexs.length + 1];

			this.txt_wing = new FontClip("ui/num_a_", 148, 525, 150, 36, "right");
			this.txt_wing.scale(0.8, 0.8)
			this.addChild(this.txt_wing);
			this.txt_wing.text = this.money + "";

			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			this.btn_unlock.on(laya.events.Event.CLICK, this, this.onBtnUnlock);
			// Main.app.mwx.showBanner();
			BridgeUtil.callAppMethod("showBanner");


		}

		private onBtnClose(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		/* 点击羽毛开蛋槽按钮 */
		private onBtnUnlock(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if (RaceManager.instance.userInfo.wing >= this.money) {
				RaceManager.instance.unlockEggSlot(this.index, this.money);
				this.destroy();
				if (this.callBackFun != null) {
					this.callBackFun.run();
				}
			} else {
				Main.app.showMessage("您的羽毛不足");
				if (Main.app.getReceiveFreeFeather() >= Number(Main.app.mwx.ofFeatherLessParam["time"])) {
					RaceManager.instance.showShop();
				} else {
					Main.app.showFeatherLackingView();
				}
			}
		}

		public destroy(): void {
			// Main.app.mwx.closeBanner();
			BridgeUtil.callAppMethod("hideBanner");

			this.removeSelf();
			super.destroy();
		}
	}
}