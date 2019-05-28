/**
* name 
*/
module module {
	export class SellConfirmChichenDialog extends ui.game.SellConfirmChichenDialogUI {
		constructor(coin: number) {
			super();

			var txt_coin: FontClip = new FontClip("ui/num_a_", 295, 255, 150, 36, "left");
			txt_coin.scale(0.8, 0.8)
			this.addChild(txt_coin);
			txt_coin.text = "" + coin;

			this.btn_cancel.on(laya.events.Event.CLICK, this, this.onBtnCancel);
			this.btn_ok.on(laya.events.Event.CLICK, this, this.onBtnOk);
		}

		private onBtnCancel(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		private onBtnOk(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			manager.EventManager.instance.event(SellChichenDialog.SELL_CHICHEN);
			manager.EventManager.instance.event(BottomView.UNLOCK);
			this.destroy();
		}

		public destroy(): void {
			this.removeSelf();
			super.destroy();
		}
	}
}