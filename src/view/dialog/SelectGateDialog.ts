/**
 * 选择游历到另一个花园的界面
 */
module module {
	export class SelectGateDialog extends ui.game.SelectGateDialogUI {
		constructor() {
			super();

			for (var i: number = 1; i <= 8; i++) {
				var log: Laya.Image = this["img_log" + i];
				log.skin = RaceManager.instance.getLogimg(i);

				// var logname: Laya.Image = this["img_name" + i];
				// logname.skin = RaceManager.instance.getLogNameimg(i);

				// console.log(RaceManager.instance.isOpenGate(i));
			}
			this.btnOpen.on(laya.events.Event.CLICK, this, this.onBuy)
			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			this.img_log1.on(laya.events.Event.CLICK, this, this.onSelectGate1);
			this.img_log2.on(laya.events.Event.CLICK, this, this.onSelectGate2);
			this.img_log3.on(laya.events.Event.CLICK, this, this.onSelectGate3);
			this.img_log4.on(laya.events.Event.CLICK, this, this.onSelectGate4);
			this.img_log5.on(laya.events.Event.CLICK, this, this.onSelectGate5);
			this.img_log6.on(laya.events.Event.CLICK, this, this.onSelectGate6);
			this.img_log7.on(laya.events.Event.CLICK, this, this.onSelectGate7);
			this.img_log8.on(laya.events.Event.CLICK, this, this.onSelectGate8);
			this.initView()
		}
		public initView(): void {
			let newArr = []
			let arr = []
			for (let i = 1; i < 9; i++) {
				this['img_lock' + i].visible = RaceManager.instance.isOpenGate(i) ? false : true
				newArr = [...newArr, ...RaceManager.instance.userInfo.plantInfoDic.get(i).haveChichenIds]
			}
			this.num_garden.text = RaceManager.instance.userInfo.openGateIds.length + '/8'

			newArr.forEach(item => {
				if (item) {
					arr.push(item)
				}
			})
			this.num_pet.text = arr.length + '/160'
			if (RaceManager.instance.userInfo.firstGift == 1 || Main.app.mwx.ofBuyScene == 0) {
				this.btnOpen.visible = false
			}
			try {
				var res = wx.getSystemInfoSync()
				if (res.platform == "ios") {
					this.btnOpen.visible = false
				}
			} catch (e) {
				// Do something when catch error
			}

		}
		/* 森林 */
		private onSelectGate1(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.gotoGate(1);
			this.destroy();
		}

		/* 洞穴 */
		private onSelectGate2(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.gotoGate(2);
			this.destroy();
		}

		/* 地牢 */
		private onSelectGate3(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.gotoGate(3);
			this.destroy();
		}

		/* 寺庙 */
		private onSelectGate4(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.gotoGate(4);
			this.destroy();
		}

		/* 黑暗 */
		private onSelectGate5(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.gotoGate(5);
			this.destroy();
		}

		/* 冰川 */
		private onSelectGate6(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.gotoGate(6);
			this.destroy();
		}

		/* 万圣节 */
		private onSelectGate7(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.gotoGate(7);
			this.destroy();
		}

		/* 家园 */
		private onSelectGate8(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.gotoGate(8);
			this.destroy();
		}

		private onBtnClose(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}
		/* 点击购买操作 */
		private onBuy(): void {
			console.log("点击购买")
			var rb = wx.getStorageSync("pay_rmb_list");
			if (Number(rb) > 0) {
				Main.app.showMessage("上次充值还未完成，请重新登陆！")
				return;
			}
			console.log("开始支付");
			this.off(Laya.Event.MOUSE_DOWN, this, this.onBuy);
			// 请求支付
			var quantity = 30;
			var goodsID = 0;
			var success: Laya.Handler = new Laya.Handler(this, this.buySuccess);
			var fail: Laya.Handler = new Laya.Handler(this, this.buyFail);
			// if (this.goodsType == 1) {
			// 	var other: Object = JSON.parse(String(Main.app.mwx.firstGoods["other"]));
			// 	quantity = Number(other["count"]) * 10;
			// 	goodsID = Number(Main.app.mwx.firstGoods["id"]);
			// } else {
			// 	var other: Object = JSON.parse(String(Main.app.mwx.secondGoods["other"]));
			// 	quantity = Number(other["count"]) * 10;
			// 	goodsID = Number(Main.app.mwx.secondGoods["id"]);
			// }
			let self = this;
			wx.requestMidasPayment({
				mode: 'game',
				env: 0, // 0 - 正式环境， 1 - 沙箱环境
				offerId: '1450019594',
				currencyType: 'CNY',
				buyQuantity: quantity,
				platform: "android",
				zoneId: "1",
				success() {
					// Main.app.mwx.PrePay(goodsID, success, fail);
					self.buySuccess()
				},
				fail({errMsg, errCode}) {
					if (errCode == -2 || errCode == 1) {
						Main.app.showMessage("充值失败：用户取消支付");
					} else {
						Main.app.showMessage("充值失败：" + errCode);
					}
					self.btnOpen.on(Laya.Event.MOUSE_DOWN, self, self.onBuy);
				}
			});
		}

		private buySuccess(): void {
			let id: number = 1
			let arr = []
			for (let i = 1; i < 9; i++) {
				if (RaceManager.instance.isOpenGate(i) == false) {
					arr.push(i)
				}
			}
			if (arr.indexOf(3) != -1) {
				id = 3
				RaceManager.instance.unLockPlantFree(3)
			} else {
				id = arr[0]
				RaceManager.instance.unLockPlantFree(arr[0])
			}
			this['onSelectGate' + id]()
			RaceManager.instance.userInfo.firstGift = 1
			RaceManager.instance.userInfo.addLocalUserInfo()
		}

		private buyFail(): void {
			console.log("购买失败");
			this.btnOpen.on(Laya.Event.MOUSE_DOWN, this, this.onBuy);
		}
		public destroy(): void {
			this.removeSelf();
			super.destroy();
		}
	}
}