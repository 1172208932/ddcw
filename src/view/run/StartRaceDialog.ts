/**
* name 
*/
module module {
	export class StartRaceDialog extends ui.race.StartRaceDialogUI {
		constructor() {
			super();
			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			this.btn_play.on(laya.events.Event.CLICK, this, this.onBtnPlay);
			Main.app.mwx.showBanner();
			if (RaceManager.instance.guidRun == 1) {
				var arrow: GuidArrowView = new GuidArrowView();
				arrow.setGuidRun2();
				this.addChild(arrow);
				RaceManager.instance.event(RaceManager.CHANGE_GUID_RUN_COMPLETE);
			}
		}

		private onBtnClose(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		/* 点击开始按钮 */
		private onBtnPlay(): void {
			// 埋点统计
			Main.app.mwx.dataLog(dtLogConfig.RaceClick, { "success": 1 });

			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.event(RaceManager.RightButtonVisiable, [false]);
			if (RaceManager.instance.userInfo.coin >= 20) {
				RaceManager.instance.addCoin(-20);
				manager.EventManager.instance.event(RaceView.GOTO_RUN);
			} else {
				if (Main.app.getReceiveFreeCoins() >= Main.app.mwx.ofCoinsLessParam["time"]) {
					RaceManager.instance.showShop();
				} else {
					Main.app.showCoinsLackingView();
				}
			}
			this.destroy();
		}

		public destroy(): void {
			Main.app.mwx.closeBanner();
			this.removeSelf();
			super.destroy();
		}
	}
}