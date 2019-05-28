// module module {
// 	export class InvitationFriendDialog extends ui.view.inviteViewUI {
// 		constructor() {
// 			super()
// 		}
// 	}
// }
/**
* name 
*/
module module {
	import Point = laya.maths.Point;
	export class InvitationFriendDialog extends ui.view.inviteViewUI {
		private txt_invitaCount: FontClip = null;
		private counts: Array<number> = [0, 1, 3, 5, 10, 20, 40];
		private featherNum: number = 1;
		private rewards: Array<any> = [
			{ type: 3, count: 1 },
			{ type: 3, count: 1 },
			{ type: 3, count: 1 },
			{ type: 3, count: 1 },
			{ type: 3, count: 1 },
			{ type: 3, count: 1 },
			{ type: 3, count: 1 },
		];

		constructor() {
			super();
			this.m_list.vScrollBarSkin = "";
			this.m_list.selectEnable = false;
			Main.app.mwx.showBanner();
			Main.app.mwx.NewGetMyShare();
			this.txt_invitaCount = new FontClip("ui/bigf", 400, 195, 200, 45, "left");
			this.addChild(this.txt_invitaCount);

			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			this.btn_Coin2Wings.on(laya.events.Event.CLICK, this, this.onBtnToWing);
			this.btn_Wings2Coin.on(laya.events.Event.CLICK, this, this.onBtnToCoin);

			// 邀请好友的数量
			var invitationCount: number = RaceManager.instance.userInfo.invitationCount;
			var invitationRewardCount: number = RaceManager.instance.userInfo.invitationRewardCount;
			if (invitationRewardCount > invitationCount) {
				RaceManager.instance.userInfo.invitationRewardCount = RaceManager.instance.userInfo.invitationCount;
			}

			var source: Array<number> = [];
			for (var index: number = 1; index < 51; index++) {
				let obj: number = 0;
				if (index <= invitationCount) {
					if (index <= invitationRewardCount) {
						obj = 1
					} else {
						obj = 2
					}
				} else {
					obj = 3
				}
				source.push(obj);
			}
			this.m_list.repeatX = 1
			this.m_list.repeatY = source.length;
			this.m_list.renderHandler = Laya.Handler.create(this, this.tabRenderHandler, null, false);
			this.m_list.array = source;

			this.onChangeCoin();
			this.onChangeWing();
			RaceManager.instance.on(RaceManager.CHANGE_COIN, this, this.onChangeCoin);
			RaceManager.instance.on(RaceManager.CHANGE_WING, this, this.onChangeWing);
		}

		private onChangeCoin(): void {
			if (RaceManager.instance.userInfo.coin >= 600) {
				this.bkg1.skin = "ui/paperwhite2.png";
			} else {
				this.bkg1.skin = "ui/paperwhite3.png";
			}
		}

		private onChangeWing(): void {
			if (RaceManager.instance.userInfo.wing >= 1) {
				this.bkg2.skin = "ui/paperwhite2.png";
			} else {
				this.bkg2.skin = "ui/paperwhite3.png";
			}
		}

		private tabRenderHandler(cell: Laya.Box, index: number): void {
			this.showDialog(cell, index);
		}

		// 列表类：
		public showDialog(item: Laya.Box, index: number): void {
			var btn = item.getChildByName("name").getChildByName("invitebtn") as Laya.Image
			var boxImg = item.getChildByName("name").getChildByName("Giftbox") as Laya.Image
			var number = item.getChildByName("name").getChildByName("Number") as Laya.Label
			var yuanquan = item.getChildByName("name").getChildByName("yuanquan") as Laya.Image
			var numImg = item.getChildByName("name").getChildByName("numImg") as Laya.Image
			if ((index + 1) % 3 === 0 && index != 0) {
				numImg.skin = 'ui/num_a_3.png'
				this.featherNum = 3
			} else {
				this.featherNum = 1
			}
			number.text = (index + 1).toString()
			btn.disabled = true;
			var cell = item.dataSource
			switch (cell) {
				case 1: {
					btn.skin = "view/taskBtn_3.png"
					btn.disabled = true;
					boxImg.visible = true;
					boxImg.skin = "view/boxopen.png"
					yuanquan.visible = false
				}
					break;
				case 2: {
					btn.disabled = false;
					btn.skin = "view/taskBtn_5.png"
					btn.on(laya.events.Event.CLICK, this, this.onBtnget, [item, index, this.featherNum])
					boxImg.visible = true;
					boxImg.skin = "view/boxclose.png"
					yuanquan.visible = false
				}
					break;
				case 3: {
					btn.disabled = false;
					btn.skin = "view/inviteBtn.png"
					btn.on(laya.events.Event.CLICK, this, this.onShare, [index]);
					boxImg.visible = false;
				}
					break;
				default:
					break;
			}
		}

		private onBtnget(item: Laya.Box, index: number, featherNum: number = 1): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			// 邀请好友的数量
			var invitationCount: number = RaceManager.instance.userInfo.invitationCount;
			var invitationRewardCount: number = RaceManager.instance.userInfo.invitationRewardCount;
			if (invitationRewardCount < 50) {
				// 埋点统计
				Main.app.mwx.dataLog(dtLogConfig.FeatherInviteFriend, { "type": 1 });

				manager.EventManager.instance.event(RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(0, 0)), 3, featherNum]);
				if (invitationRewardCount > invitationCount) {
					RaceManager.instance.userInfo.invitationRewardCount = RaceManager.instance.userInfo.invitationCount;
				}
				RaceManager.instance.userInfo.addinvitationRewardCount(1);
				var btn = item.getChildByName("name").getChildByName("invitebtn") as Laya.Image
				btn.skin = "view/taskBtn_3.png"
				btn.disabled = true;
				var boxImg = item.getChildByName("name").getChildByName("Giftbox") as Laya.Image
				boxImg.skin = "view/boxopen.png"

				this.m_list.array[index] = 1;
			}
		}

		private onbtnInvitation(): void {
			RaceManager.instance.userInfo.addInvitationCount(1);
		}

		private onBtnClose(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		/* 金币换羽毛 */
		private onBtnToCoin(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if (RaceManager.instance.userInfo.coin >= 600) {
				RaceManager.instance.addCoin(-600);
				manager.EventManager.instance.event(RaceView.FLY_MONEY, [this.localToGlobal(new Point(270, 195)), 3, 1]);
			} else {
				Main.app.showMessage("您的金币不足");
				Main.app.showCoinsLackingView();
			}
		}

		/* 羽毛换金币 */
		private onBtnToWing(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if (RaceManager.instance.userInfo.wing >= 1) {
				RaceManager.instance.addWing(-1);
				manager.EventManager.instance.event(RaceView.FLY_MONEY, [this.localToGlobal(new Point(525, 195)), 2, 300]);
			} else {
				Main.app.showMessage("您的羽毛不足");
				Main.app.showFeatherLackingView();
			}
		}

		/* 分享 邀请好友 */
		private onShare(taskid: number): void {
			if (Main.app.shareIndex > 0) {
				return;
			}
			Main.app.shareIndex = 11;
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
				query: "uid=" + Main.app.mwx.mUID + "&Invite=GetWing" + "&taskid=10" + taskid + `&surl=${Main.app.shareIndex}`
			});
		}

		public destroy(): void {
			Main.app.mwx.closeBanner();
			RaceManager.instance.off(RaceManager.CHANGE_COIN, this, this.onChangeCoin);
			RaceManager.instance.off(RaceManager.CHANGE_WING, this, this.onChangeWing);
			this.removeSelf();
			super.destroy();
		}
	}
}