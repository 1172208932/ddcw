/**
* name 
*/
module module {
	export class OpenJiaShuDialog extends ui.game.OpenJiaShuDialogUI {

		public static _inst: OpenJiaShuDialog = null;
		public static get Inst(): OpenJiaShuDialog {
			if (this._inst == null) {
				this._inst = new OpenJiaShuDialog();
				console.log("又重开一次");
			}
			return this._inst;
		}

		constructor() {
			super();
			// Main.app.mwx.showBanner();
			BridgeUtil.callAppMethod("showBanner");

			let jst = RaceManager.instance.userInfo._jiaShuingTime.toString().split('')
			if (jst.length <= 1) {
				this.yiwei.skin = `ui/num_f_${jst[0]}.png`

				this.yiwei.visible = true
				this.shiwei.visible = false
				this.gewei.visible = false
			}
			else {
				this.shiwei.skin = `ui/num_f_${jst[0]}.png`
				this.gewei.skin = `ui/num_f_${jst[1]}.png`

				this.yiwei.visible = false
				this.shiwei.visible = true
				this.gewei.visible = true
			}

			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			this.btn_ok.on(laya.events.Event.CLICK, this, this.howJiaSu);

			RaceManager.instance.on(RaceManager.SHARETOOPENJIASU, this, this.onBtnOk)
		}


		private onBtnClose(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.event(RaceManager.OPENDOUBLEDISABLED);
			this.destroy();
		}

		public onBtnOk(): void {
			// 埋点统计
			// Main.app.mwx.dataLog(dtLogConfig.OpenSBXiaoLv, { "type": Main.app.mwx.ofDoubleReword });

			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.openJiaShu();
			this.destroy();
		}

		public destroy(): void {
			// Main.app.mwx.closeBanner();
			BridgeUtil.callAppMethod("hideBanner");
			this.removeSelf();
			super.destroy();
		}

		public howJiaSu() {
			// 埋点统计
			// Main.app.mwx.dataLog(dtLogConfig.OpenSBXiaoLv, { "type": 0 });

			// if (Main.app.mwx.ofDoubleReword == 1) {
			// 	// 直接使用
			this.onBtnOk();
			// } else if (Main.app.mwx.ofDoubleReword == 2 || Main.app.mwx.ofDoubleReword == 4) {
			// 	// 看视频使用
			// 	if (Main.app.mwx.avShowType == false) {
			// 		return;
			// 	}
			// 	Main.app.mwx.avShowType = false;
			// 	let self = this;
			// 	Laya.timer.once(500, self, () => {
			// 		self.onVideo(Main.app.mwx.ofDoubleReword);
			// 	});
			// } else if (Main.app.mwx.ofDoubleReword == 3) {
			// 	// 分享使用
			// 	this.onShare();
			// } else {
			// 	// 暂不支持
			// 	Main.app.showMessage("功能暂未开放");
			// }
		}

		/* 看视频 */
		private onVideo(type: number): void {
			let self = this;
			wxCore.uo.loadingVideo((ok: boolean) => {
				if (ok) {
					wxCore.uo.showVideoAD((played: boolean) => {
						if (played) {
							self.onBtnOk();
						} else {
							if (type == 4) {
								self.onShare();
							} else {
								Main.app.showMessage("需要观看完整视频");
							}
						}
						Main.app.mwx.avShowType = true;
					});
				} else {
					if (Main.app.mwx.fhOnOff == 0) {
						Main.app.showMessage("获取视频失败");
					} else {
						self.onShare();
					}
					Main.app.mwx.avShowType = true;
				}
			});
		}

		/* 分享 */
		private onShare(): void {
			if (Main.app.shareIndex > 0) {
				return;
			}
			Main.app.shareIndex = 3;
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
	}
}