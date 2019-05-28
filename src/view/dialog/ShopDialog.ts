/**
* name 
*/
module module {
	import Point = laya.maths.Point;

	export class ShopDialog extends ui.game.ShopDialogUI {
		constructor() {
			super();

			this.img_1.skin = manager.configManager.instance.CDN_BOOT + "gate/shop-banners_0.png";
			this.img_2.skin = manager.configManager.instance.CDN_BOOT + "gate/shop-banners_1.png";
			this.img_3.skin = manager.configManager.instance.CDN_BOOT + "gate/shop-banners_2.png";
			this.img_4.skin = manager.configManager.instance.CDN_BOOT + "gate/shop-banners_3.png";
			this.img_5.skin = manager.configManager.instance.CDN_BOOT + "gate/shop-banners_3.png";

			this.onChangeCoin();
			this.onChangeWing();

			RaceManager.instance.on(RaceManager.CHANGE_COIN, this, this.onChangeCoin);
			RaceManager.instance.on(RaceManager.CHANGE_WING, this, this.onChangeWing);

			this.btn_to_coin.on(laya.events.Event.CLICK, this, this.onBtnToCoin);
			this.btn_to_wing.on(laya.events.Event.CLICK, this, this.onBtnToWing);
			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			if (Main.app.is_wx) {
				console.log("3001=", Number(Main.app.mwx.ShopPrize.get(3001['count'])))
				this.yuanbtn6.on(laya.events.Event.CLICK, this, this.shopWing, [3001, Number(Main.app.mwx.ShopPrize.get(3001)['count'])]);
				this.yuanbtn30.on(laya.events.Event.CLICK, this, this.shopWing, [3002, Number(Main.app.mwx.ShopPrize.get(3002)['count'])]);
				this.yuanbtn118.on(laya.events.Event.CLICK, this, this.shopWing, [3003, Number(Main.app.mwx.ShopPrize.get(3003)['count'])]);
				this.yuanbtn328.on(laya.events.Event.CLICK, this, this.shopWing, [3004, Number(Main.app.mwx.ShopPrize.get(3004)['count'])]);
				this.yuanbtn648.on(laya.events.Event.CLICK, this, this.shopWing, [3005, Number(Main.app.mwx.ShopPrize.get(3005)['count'])]);


				// 判断是否充值未完成，提示用户
				let rb = wx.getStorageSync("pay_rmb_list");
				if (Number(rb) > 0) {
					Main.app.mwx.PrePay(rb);
				}
			}


		}

		private onChangeCoin(): void {
			if (RaceManager.instance.userInfo.coin >= 600) {
				this.img_bg1.skin = "ui/paperwhite2.png";
			} else {
				this.img_bg1.skin = "ui/paperwhite3.png";
			}
		}

		private onChangeWing(): void {
			if (RaceManager.instance.userInfo.wing >= 1) {
				this.img_bg2.skin = "ui/paperwhite2.png";
			} else {
				this.img_bg2.skin = "ui/paperwhite3.png";
			}
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

		private onBtnClose(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		public destroy(): void {
			RaceManager.instance.off(RaceManager.CHANGE_COIN, this, this.onChangeCoin);
			RaceManager.instance.off(RaceManager.CHANGE_WING, this, this.onChangeWing);

			this.removeSelf();
			super.destroy();
		}


		// id是要购买的物品id，rmb是物品需要的人民币
		public shopWing(id: number, rmb: number): void {
			let that = this;
			let quantity = rmb * 10;
			console.log("充值金币数量", quantity)

			let rb = wx.getStorageSync("pay_rmb_list");
			if (Number(rb) > 0) {
				wx.showToast({
					title: '上次充值还未完成,请重新登陆',
					icon: "none",
					image: "",
					duration: 3000
				});
				return;
			}
			console.log("开始进入支付")

			wx.requestMidasPayment({
				mode: 'game',
				env: 0, // 0 - 正式环境 ， 1 - 沙箱环境
				offerId: '1450019594',
				currencyType: 'CNY',
				buyQuantity: quantity,
				platform: "android",
				zoneId: "1",
				success() {
					Main.app.mwx.PrePay(id);
				},
				fail({ errMsg, errCode }) {
					// Main.app.mwx.PrePay(id);
					console.log("支付失败")
					// 支付失败
					// if (GameMain.mUid == 1000001){
					// html.PrePay(rmb);
					// }
					// console.log(errMsg, errCode);
					if (errCode == -2 || errCode == 1) {
						wx.showToast({
							title: '充值失败:用户取消支付',
							icon: "none",
							image: "",
							duration: 5000
						});
					} else {
						wx.showToast({
							title: '充值失败:' + errCode,
							icon: "none",
							image: "",
							duration: 5000
						});
					}
				}
			});
		}




	}
}