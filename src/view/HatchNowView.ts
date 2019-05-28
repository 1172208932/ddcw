/**
 * 开蛋方式的界面
 */
module module {
	import LocalStorage = laya.net.LocalStorage;
	export class HatchNowView extends ui.game.HatchNowViewUI {
		private _eggInfo: EggInfo = null;
		private _coin: number = 0;
		private txt_coin: FontClip = null;

		constructor() {
			super();

			this.txt_coin = new FontClip("ui/num_a_", 10, 25, 180, 40, "center");
			this.txt_coin.scale(0.7, 0.7);
			this.btn_ok.addChild(this.txt_coin);
			if (Main.app.mwx.ofOpenType == 1) {
				this.btn_ok.on(laya.events.Event.CLICK, this, this.onBtnOk);
			} else {
				this.btn_ok.on(laya.events.Event.CLICK, this, this.onBtnOkCoin);
				this.imgType.skin = 'ui/Atlas_0.png'
			}
			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			this.btn_open.on(laya.events.Event.CLICK, this, this.HowOpenEgg);
			RaceManager.instance.on(RaceManager.OPENEGGFREE, this, this.onBtnOpen);
		}

		public show(info: EggInfo, coin: number): void {
			this.visible = true;
			this._coin = coin;
			this._eggInfo = info;
			this.txt_coin.text = Main.app.mwx.ofOpenType == 1 ? "1" : coin + ""
			// this.txt_coin.text = "1";			
			this.ani1.play(0, true);
			Laya.timer.once(3000, this, this.hide);
		}

		public hide(): void {
			this.visible = false;
			this.ani1.stop();
			Laya.timer.clear(this, this.hide);
		}

		private onBtnClose(play: boolean = true): void {
			if (play) manager.SoundPlayMgr.instance.playButtonClick();
			this.visible = false;
			this.ani1.stop();
			Laya.timer.clear(this, this.hide);
		}

		/* 使用羽毛开蛋 */
		private onBtnOk(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if (RaceManager.instance.userInfo.wing >= 1) { //zxx this._coin
				console.log("-----> ", this._eggInfo);
				RaceManager.instance.openEgg(this._eggInfo);
				RaceManager.instance.addWing(-1);
				this.onBtnClose(false);
			} else {
				RaceManager.instance.showShop()
				// Main.app.showMessage("您的羽毛不足");
				// Main.app.showCoinsLackingView();
			}
			this.onBtnClose(false);
		}
		/*使用金币开蛋*/
		private onBtnOkCoin(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if (RaceManager.instance.userInfo.coin >= this._coin) {
				console.log("-----> ", this._eggInfo);
				RaceManager.instance.openEgg(this._eggInfo);
				RaceManager.instance.addCoin(this._coin * -1);
				this.onBtnClose(false);
			} else {
				Main.app.showMessage("您的金币不足");
				Main.app.showCoinsLackingView();
			}
			this.onBtnClose(false);
		}


		/* 免费开蛋 */
		public HowOpenEgg() {
			// 判断是否是同一天，同一天之内需要判断免费次数是否用尽，新的一天需要重置免费次数个当天时间戳。
			var saveTime: string = LocalStorage.getItem(Main.DianDianChongWu_NowDay3)
			//  wx.getStorageSync(Main.DianDianChongWu_NowDay3);
			if (saveTime == Main.app.mwx.nowday) {
				var freeVideo: number = Number(LocalStorage.getItem(Main.DianDianChongWu_FreeVideo))
				// wx.getStorageSync(Main.DianDianChongWu_FreeVideo);
				console.log(freeVideo, Main.app.mwx.openEggFree);
				if (!!freeVideo && freeVideo >= Main.app.mwx.openEggFree) {
					Main.app.showMessage("免费次数已用尽");
					return;
				}
			} else {
				LocalStorage.setItem(Main.DianDianChongWu_NowDay3, Main.app.mwx.nowday)
				LocalStorage.setItem(Main.DianDianChongWu_FreeVideo, 1+"")
				
				// wx.setStorageSync(Main.DianDianChongWu_NowDay3, Main.app.mwx.nowday);
				// wx.setStorageSync(Main.DianDianChongWu_FreeVideo, 1);
			}
			// 埋点统计
			// Main.app.mwx.dataLog(dtLogConfig.OpenEggFree, { "type": 0 });
			// 满足开蛋条件，执行开蛋操作。
			var type: number = 0;
			var Times = Main.app.mwx.m_nOpenEggTimes;
			if (Times < Main.app.mwx.OpenEggTypeList.length) {
				if (Main.app.mwx.fhOnOff == 0) {
					type = 2;
				} else {
					var obj: Object = Main.app.mwx.OpenEggTypeList[Times];
					type = Number(obj["gamebox"]);
				}
				if (type == 1) {
					// 直接使用
					this.onBtnOpen();
				} else if (type == 2 || type == 4) {
					// 看视频使用
					if (Main.app.mwx.avShowType == false) {
						return;
					}
					Main.app.mwx.avShowType = false;
					let self = this;
					Laya.timer.once(500, self, () => {
						self.onVideo(type);
					});
				} else if (type == 3) {
					// 分享使用
					this.onShare();
				} else {
					// 暂不支持
					Main.app.showMessage("功能暂未开放");
				}
			} else {
				// 看视频使用
				if (Main.app.mwx.avShowType == false) {
					return;
				}
				Main.app.mwx.avShowType = false;
				let self = this;
				Laya.timer.once(500, self, () => {
					self.onVideo(2);
				});
			}
		}

		/* 看视频 */
		private onVideo(type: number): void {
			let self = this;
			wxCore.uo.loadingVideo((ok: boolean) => {
				if (ok) {
					wxCore.uo.showVideoAD((played: boolean) => {
						if (played) {
							self.onBtnOpen();
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
			Main.app.shareIndex = 10;
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

		/* 开蛋操作 */
		private onBtnOpen(): void {
			// 埋点统计
			// Main.app.mwx.dataLog(dtLogConfig.OpenEggFree, { "type": 1 });

			var freeVideo: number = Number(LocalStorage.getItem(Main.DianDianChongWu_FreeVideo))
			//  wx.getStorageSync(Main.DianDianChongWu_FreeVideo);
			freeVideo++;
			// wx.setStorageSync(Main.DianDianChongWu_FreeVideo, freeVideo);
			LocalStorage.setItem(Main.DianDianChongWu_FreeVideo, freeVideo + '')
			Main.app.mwx.m_nOpenEggTimes++;
			Main.app.mwx.SetUserValue("OpenEggTimes", Main.app.mwx.m_nOpenEggTimes);
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.openEgg(this._eggInfo);
			this.onBtnClose(false);
		}

		public destroy(): void {
			this.removeSelf();
			super.destroy();
		}
	}
}