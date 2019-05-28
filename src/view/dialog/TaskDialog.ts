// module module {
// 	export class TaskDialog extends ui.view.taskViewUI {
// 		constructor() {
// 			super()
// 		}
// 	}
// }

/**
* name 
*/
module module {
	export class TaskDialog extends ui.view.taskViewUI {
		private configs: Array<number> = [0, 2, 3, 1, 2, 1];
		constructor() {
			super();
			Main.app.mwx.showBanner();
			this.initView();
			this.initEvents();
			console.log(this._childs)
		}

		private initView(): void {
			this.updateShow();
		}

		private initEvents(): void {
			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			this.TaskProgress1.on(laya.events.Event.CLICK, this, this.onBtnGet1);
			this.TaskProgress2.on(laya.events.Event.CLICK, this, this.onBtnGet2);
			this.TaskProgress3.on(laya.events.Event.CLICK, this, this.onBtnGet3);
			this.TaskProgress4.on(laya.events.Event.CLICK, this, this.onBtnGet4);
			this.TaskProgress5.on(laya.events.Event.CLICK, this, this.onBtnGet5);

			RaceManager.instance.on(RaceManager.CHANGE_USER_DATA, this, this.updateShow);
		}

		private removeEvents(): void {
			RaceManager.instance.off(RaceManager.CHANGE_USER_DATA, this, this.updateShow);
		}

		private updateShow(): void {
			for (var i: number = 1; i <= 5; i++) {
				var data: any = RaceManager.instance.userInfo.getTaskData(i);

				var box_get: Laya.Image = this["TaskProgress" + i];
				var txt_count: Laya.Label = this["TaskTimes" + i]

				if (data == null) {
					// txt_count.text = "(" + 0 + "/" + this.configs[i] + ")";
					txt_count.text = "0"
					// box_get.mouseEnabled = false
					// box_get.disabled = true;
				} else {
					if (data.count < this.configs[i]) {
						txt_count.text = data.count.toString();
						// txt_count.text = "(" + data.count + "/" + this.configs[i] + ")";
						// box_get.disabled = true;
						// box_get.mouseEnabled = false
					} else {
						// txt_count.text = "(" + this.configs[i] + "/" + this.configs[i] + ")";
						txt_count.text = this.configs[i].toString()
						if (data.isGetReward == 1) {
							//已领取
							box_get.disabled = true;
							box_get.skin = "view/taskBtn_3.png"
							box_get.mouseEnabled = false
						} else {
							box_get.skin = "view/taskBtn_5.png"
							box_get.mouseEnabled = true
							// box_get.disabled = false;
						}
					}
				}
			}
		}

		private onBtnGet1(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var data: any = RaceManager.instance.userInfo.getTaskData(1);

			if (data != null) {
				if (data.count >= this.configs[1] && data.isGetReward == 0) {
					RaceManager.instance.userInfo.getTaskReward(1);
					manager.EventManager.instance.event(RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(545, 200)), 2, 50]);
				}
			}
		}

		private onBtnGet2(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var data: any = RaceManager.instance.userInfo.getTaskData(2);

			if (data != null) {
				if (data.count >= this.configs[2] && data.isGetReward == 0) {
					RaceManager.instance.userInfo.getTaskReward(2);
					manager.EventManager.instance.event(RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(545, 360)), 2, 50]);
				}
			}
		}

		private onBtnGet3(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var data: any = RaceManager.instance.userInfo.getTaskData(3);

			if (data != null) {
				if (data.count >= this.configs[3] && data.isGetReward == 0) {
					RaceManager.instance.userInfo.getTaskReward(3);
					manager.EventManager.instance.event(RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(545, 520)), 2, 50]);
				}
			}
		}

		private onBtnGet4(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var data: any = RaceManager.instance.userInfo.getTaskData(4);

			if (data != null) {
				if (data.count >= this.configs[4] && data.isGetReward == 0) {
					RaceManager.instance.userInfo.getTaskReward(4);
					manager.EventManager.instance.event(RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(545, 680)), 2, 100]);
				} else {
					this.onShare();
				}
			} else {
				this.onShare();
			}
		}

		private onBtnGet5(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var data: any = RaceManager.instance.userInfo.getTaskData(5);

			if (data != null) {
				if (data.count >= this.configs[5] && data.isGetReward == 0) {
					RaceManager.instance.userInfo.getTaskReward(5);
					manager.EventManager.instance.event(RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(545, 680)), 2, 100]);
				} else {
					if (Main.app.mwx.ofLoginReward == 2 || Main.app.mwx.ofLoginReward == 4) {
						// 看视频使用
						if (Main.app.mwx.avShowType == false) {
							return;
						}
						Main.app.mwx.avShowType = false;
						let self = this;
						Laya.timer.once(500, self, () => {
							self.onVideo(Main.app.mwx.ofLoginReward);
						});
					}
				}
			} else {
				if (Main.app.mwx.ofLoginReward == 2 || Main.app.mwx.ofLoginReward == 4) {
					// 看视频使用
					if (Main.app.mwx.avShowType == false) {
						return;
					}
					Main.app.mwx.avShowType = false;
					let self = this;
					Laya.timer.once(500, self, () => {
						self.onVideo(Main.app.mwx.ofLoginReward);
					});
				}
			}

		}

		private onBtnClose(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		public destroy(): void {
			Main.app.mwx.closeBanner();
			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}

		/* 分享 */
		private onShare(): void {
			if (Main.app.shareIndex > 0) {
				return;
			}
			// 埋点统计
			Main.app.mwx.dataLog(dtLogConfig.DailyTaskShare, { "success": 0 });

			Main.app.shareIndex = 2;
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
		private onVideo(type: number): void {
			let self = this;
			wxCore.uo.loadingVideo((ok: boolean) => {
				if (ok) {
					wxCore.uo.showVideoAD((played: boolean) => {
						if (played) {
							module.RaceManager.instance.userInfo.addTaskCount(5);
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
	}
}