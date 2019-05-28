/**
 * 首页漂浮的大量金币
 */
module module {
	import Point = laya.maths.Point;
	export class FlyVideoItem extends ui.game.FlyVideoItemUI implements manager.EnterFrameFace {
		public faceId: number;
		private videoCoins: number = 50;
		private count: number = 0;
		private path: Array<Point> = [];
		private dir: number = 1;
		private t: number = 0;
		private max: number = 0;

		constructor() {
			super();
			this.faceId = manager.EnterFrameManager.instance.id;
			this.pos(-200, Math.floor(Math.random() * 200 + 100 + RaceView.TOP));
			this.initPath();
			// 点击大量金币获得大量金币
			this.on(laya.events.Event.CLICK, this, this.HowGetCountGold);
			this.on(laya.events.Event.ADDED, this, this.onAddss);
			RaceManager.instance.on(RaceManager.LOOKTOCOUNTGOLD, this, this.onClick, [50]);
			RaceManager.instance.on(RaceManager.CLOSEFLYVIDOEITEM, this, this.destroy);
		}

		private initPath(): void {
			this.path = [];
			var bpos: Point = new Point(this.x, this.y);
			var epos: Point = new Point(0, 0);
			if (this.dir == 1) {
				epos.setTo(Laya.stage.width + 200, Math.floor(Math.random() * 200 + 100 + RaceView.TOP));
				this.dir = 2;
			} else {
				epos.setTo(-200, Math.floor(Math.random() * 200 + 100 + RaceView.TOP));
				this.dir = 1;
			}

			this.path.push(bpos);
			this.path.push(core.Utils.getBezier2TP(bpos, epos, 100, 0.5));
			this.path.push(epos);
			this.max = Math.floor(this.path[1].distance(this.x, this.y) / 1);
			this.t = 1;
			this.count += 1;
		}

		private onAddss(): void {
			manager.EnterFrameManager.instance.addItem(this);
		}

		public onEnterFrame(): void {
			var p: Point = core.Utils.PointOnCubicBezier2(this.path, this.t / this.max);
			this.pos(p.x, p.y);
			this.t++;
			if (this.t > this.max) {
				this.initPath();
			}
		}

		private onClick(coinsnum: number): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.lookVideoComplete(coinsnum);
			// 埋点统计
			// Main.app.mwx.dataLog(dtLogConfig.FlyBoxClick, { "type": Main.app.mwx.ofCoinsBox });
		}

		public destroy(): void {
			manager.EnterFrameManager.instance.removeItem(this.faceId);
			this.removeSelf();
			super.destroy();
		}

		public HowGetCountGold() {
			// 埋点统计
			// Main.app.mwx.dataLog(dtLogConfig.FlyBoxClick, { "type": 0 });

			// if (Main.app.mwx.ofCoinsBox == 1) {
				// 直接使用
				this.onClick(this.videoCoins);
			// } else if (Main.app.mwx.ofCoinsBox == 2 || Main.app.mwx.ofCoinsBox == 4) {
			// 	// 看视频使用
			// 	if (Main.app.mwx.avShowType == false) {
			// 		return;
			// 	}
			// 	Main.app.mwx.avShowType = false;
			// 	let self = this;
			// 	Laya.timer.once(500, self, () => {
			// 		self.onVideo(Main.app.mwx.ofCoinsBox);
			// 	});
			// } else if (Main.app.mwx.ofCoinsBox == 3) {
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
							self.onClick(self.videoCoins);
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
			Main.app.shareIndex = 6;
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