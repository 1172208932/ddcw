/**
* name 
*/
module module {
	export class TimeRewardDialog extends ui.game.TimeRewardDialogUI {
		private type: number = 0;
		public static GET_ICON: string = "TimeRewardDialog" + "GET_ICON"
		constructor() {
			super();
			this.updateShow();
			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			this.btn_get.on(laya.events.Event.CLICK, this, this.selectEvent);
			RaceManager.instance.on(RaceManager.CHANGE_USER_DATA, this, this.updateShow);
			RaceManager.instance.on(TimeRewardDialog.GET_ICON, this, this.onBtnGet);
			// Main.app.mwx.showBanner();
			BridgeUtil.callAppMethod("showBanner");

		}

		private onBtnClose(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		private updateShow(): void {
			var timeRewardCount = RaceManager.instance.userInfo.timeRewardCount;

			var nowDate: Date = new Date();
			var hour: number = nowDate.getHours();

			console.log("hour : " + hour);
			if (hour >= 22) {
				this.btn_get.gray = true
				this.type = 1;
			} else if (hour >= 17) {
				this.type = 2;
			} else if (hour >= 11) {
				this.type = 3;
			} else {
				this.type = 4;
				this.btn_get.gray = true
			}

			if (this.type == 4) {
				// this.txt_tip.text = "奖励开启倒计时：";
				var date: Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 11, 0, 0, 0);
			} else if (this.type == 3) {
				if (timeRewardCount == 0) {
					// this.txt_tip.text = "奖励领取倒计时：";
				} else {
					// this.txt_tip.text = "奖励开启倒计时：";
				}
				date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 17, 0, 0, 0);
			} else if (this.type == 2) {
				if (timeRewardCount == 2) {
					// this.txt_tip.text = "奖励开启倒计时：";
					date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 11, 0, 0, 0);
				} else {
					// this.txt_tip.text = "奖励领取倒计时：";
					date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 22, 0, 0, 0);
				}
			} else if (this.type == 1) {
				// this.txt_tip.text = "奖励开启倒计时：";
				date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 11, 0, 0, 0);
			}
		}


		/* 分享 */
		private onShare(): void {
			if (Main.app.shareIndex > 0) {
				return;
			}
			Main.app.shareIndex = 18;
			Main.app.shareTimestamp = new Date().getTime();

			let title, imageUrl, shjson;
			Main.app.mwx.shareurl.forEach((item) => {
				if (item.id == Main.app.shareIndex) {
					shjson = item;
					title = item.title;
					imageUrl = item.url;
				}
			});
			wx.shareAppMessage({
				title: title,
				imageUrl: imageUrl,
				query: "uid=" + Main.app.mwx.mUID + `&surl=${Main.app.shareIndex}`
			});
		}

		private selectEvent() {
			// if (Main.app.mwx.ofOlineType == 1) {
			// 	this.onShare()
			// } else {
			this.onBtnGet()
			// }
		}
		private onBtnGet(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var timeRewardCount = RaceManager.instance.userInfo.timeRewardCount;
			if (this.type == 3) {
				if (timeRewardCount == 0) {
					RaceManager.instance.userInfo.setTimeRewardCount(1);
					manager.EventManager.instance.event(RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(373, 417)), 2, 50]);
					manager.EventManager.instance.event(RightToolView.HIDE_RED)
				} else {
					Main.app.showMessage("奖励已经领取");
				}
			} else if (this.type == 2) {
				if (timeRewardCount == 2) {
					Main.app.showMessage("奖励已经领取");
				} else {
					RaceManager.instance.userInfo.setTimeRewardCount(2);
					manager.EventManager.instance.event(RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(373, 417)), 2, 50]);
					manager.EventManager.instance.event(RightToolView.HIDE_RED)
				}
			}
		}

		public destroy(): void {
			// Main.app.mwx.closeBanner();
			BridgeUtil.callAppMethod("hideBanner");

			RaceManager.instance.off(RaceManager.CHANGE_USER_DATA, this, this.updateShow);
			RaceManager.instance.off(TimeRewardDialog.GET_ICON, this, this.onBtnGet);
			this.removeSelf();
			super.destroy();
		}
	}
}