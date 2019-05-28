/**
 * 宠物
 */
module module {
	import Point = laya.maths.Point;

	export class ChichenView extends laya.ui.Component {
		private imgList: Array<laya.ui.Image> = new Array<laya.ui.Image>();
		private aniList: Array<laya.display.Animation> = new Array<laya.display.Animation>();
		private itemList: Array<ChichenItem> = new Array<ChichenItem>();
		private mealItemList: Array<MealItem> = new Array<MealItem>();

		private type: number = 1;
		private AddCoinSelflyNum = 0;

		constructor() {
			super();
			var alreadyAddCoin: number
			// 如果不是新的一天，更新已获取的金币数。
			if (Main.app.is_wx) {
				var saveTime: string = wx.getStorageSync(Main.DianDianChongWu_NowDay1);
				if (saveTime == Main.app.mwx.nowday) {
					alreadyAddCoin= wx.getStorageSync(Main.DianDianChongWu_AlreadyCoin);
					if (!!alreadyAddCoin) this.AddCoinSelflyNum = alreadyAddCoin;
				} else {
					wx.setStorageSync(Main.DianDianChongWu_NowDay1, Main.app.mwx.nowday);
				}
			} else {
				if (!!alreadyAddCoin) this.AddCoinSelflyNum = alreadyAddCoin;
			}

		}

		public onEnterFrame(): void {
			for (var i: number = 0; i < this.itemList.length; i++) {
				var item: ChichenItem = this.itemList[i];
				item.onEnterFrame();

				if (item.type == 1 && item.data.addCoinExpTime < 0) {
					// manager.EventManager.instance.event(RaceView.FLY_WATER, item.getAddCoinData()); // 自动产金币关闭
					manager.EventManager.instance.event(RaceView.FLY_WATER, item.getAddExpData());
					item.data.resetAddCoinExpTime();
					this.AddCoinSelflyNum++;
					if(Main.app.is_wx){
					wx.setStorageSync(Main.DianDianChongWu_AlreadyCoin, this.AddCoinSelflyNum);
					}
					if (this.AddCoinSelflyNum >= Main.app.mwx.nBeginDecodeNums) {
						item.data.resetAttenuationTime();
					}
				}
			}

			for (var i: number = 0; i < this.mealItemList.length; i++) {
				this.mealItemList[i].updatePos();
			}

			this.sortSprite();
		}

		/* 排序 */
		private sortSprite(): void {
			var list: Array<any> = [];
			list = list.concat(this.aniList);
			list = list.concat(this.itemList);

			list.sort((a: any, b: any) => { return a.y < b.y ? -1 : 1 });

			for (var i: number = 0; i < list.length; i++) {
				this.setChildIndex(list[i], i);
			}
		}

		/* 点击 */
		public onHandClick(pos: Point): void {
			var clicks: Array<ChichenItem> = [];
			if (this.type == 1) {

				// 收集经验
				var isClick: boolean = false;
				var isClickCoin: boolean = false;
				for (var i: number = 0; i < this.itemList.length; i++) {
					if (this.itemList[i].collision(pos)) {
						if (this.itemList[i].type == 1) isClick = true;      // 点中动物
						if (this.itemList[i].type == 2) isClickCoin = true;  // 点中动物

						manager.EventManager.instance.event(RaceView.FLY_WATER, this.itemList[i].getFlyData());
						clicks.push(this.itemList[i]);
					}
				}
				if (isClick == true) {
					manager.EventManager.instance.event(RaceView.CLICK_CHICHEN);
					// 点中宠物，增加一次点击次数，到达一定次数弹出幸运弹窗。
					if (Main.app.mwx.ofLuck > 0) {
						Main.app.clickCount++;
						if (Main.app.clickCount >= Main.app.mwx.ofLuckCount) {
							Main.app.showLuckView();
						}
					}
				}
				for (var i: number = 0; i < clicks.length; i++) {
					clicks[i].handClickOk();
				}

				var animation: laya.display.Animation = new laya.display.Animation();
				animation.loadAnimation(manager.ResVersionMgr.instance.getMd5Url(isClickCoin ? "ani/starClickAni.ani" : "ani/light_yellow.ani"));
				animation.scale(isClickCoin ? 1 : 3, isClickCoin ? 1 : 3);
				animation.pos(pos.x, pos.y);
				this.addChild(animation);
				animation.play(0, false);
				animation.on(laya.events.Event.COMPLETE, this, this.onClearAni, [animation]);

				if (isClickCoin) {
					manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Tap_coin1");
				}
				if (isClick) {
					manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Tap_chichen" + Math.floor(Math.random() * 3 + 1));
				}
				if (isClick == false && isClickCoin == false) {
					manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Tap_miss1");
				}
			} else if (this.type == 2) {
				// 喂食
				for (var i: number = 0; i < this.itemList.length; i++) {
					if (this.itemList[i].collision(pos)) {//点中
						if (this.itemList[i].type == 1) { //点中鸡
							RaceManager.instance.wealFood(this.itemList[i].data);//给鸡喂食物
						} else {
							manager.EventManager.instance.event(RaceView.FLY_WATER, this.itemList[i].getFlyData());
							clicks.push(this.itemList[i]);
						}
					}
				}

				for (var i: number = 0; i < clicks.length; i++) {
					clicks[i].handClickOk();
				}
			}
		}

		public onHandMove(pos: Point): void {
			var clicks: Array<ChichenItem> = [];

			for (var i: number = 0; i < this.itemList.length; i++) {
				if (this.itemList[i].type == 2 && this.itemList[i].collision(pos)) {//点中
					manager.EventManager.instance.event(RaceView.FLY_WATER, this.itemList[i].getFlyData());
					clicks.push(this.itemList[i]);
				}
			}

			for (var i: number = 0; i < clicks.length; i++) {
				clicks[i].handClickOk();
			}
		}

		/* 初始化场地中的动物 */
		public initChichen(): void {
			var chichenInfos: Array<ChichenInfo> = RaceManager.instance.getPlantInfo().chichenInfoList;
			console.log("初始化场地中的动物：", chichenInfos);
			for (var i: number = 0; i < chichenInfos.length; i++) {
				var item: ChichenItem = new ChichenItem();
				item.data = chichenInfos[i];
				this.addChild(item);
				this.itemList.push(item);
			}

			var coinInfoList: Array<CoinInfo> = RaceManager.instance.getPlantInfo().coinInfoList;
			console.log("初始化场地中的金币：", coinInfoList);
			for (var i: number = 0; i < coinInfoList.length; i++) {
				this.addCoin(coinInfoList[i]);
			}
		}

		/**在场地中添加一个金币 */
		public addCoin(coinInfo: CoinInfo): void {
			var item: CoinItem = new CoinItem();
			item.coin = coinInfo;
			item.pos(coinInfo.x, coinInfo.y);
			this.addChild(item);
			this.itemList.push(item);
		}

		/**在场地中添加一个金币 */
		public removeCoin(coinInfo: CoinInfo): void {
			for (var i: number = 0; i < this.itemList.length; i++) {
				if (this.itemList[i].coin != null && this.itemList[i].coin.coinId == coinInfo.coinId) {
					this.itemList[i].destroy();
					this.itemList.splice(i, 1);
					break;
				}
			}
		}

		/**添加一个动物 */
		public addChichenToPlant(chichenInfo: ChichenInfo): void {
			if (RaceManager.instance.getPlantInfo().plantId == chichenInfo.plantId) {
				var item: ChichenItem = new ChichenItem();
				item.data = chichenInfo;
				this.addChild(item);
				this.itemList.push(item);
			}
		}

		/**移除一个动物 */
		public removeChichenFromPlant(chichenInfo: ChichenInfo): void {
			if (RaceManager.instance.getPlantInfo().plantId == chichenInfo.plantId) {
				for (var i: number = 0; i < this.itemList.length; i++) {
					if (this.itemList[i].data && this.itemList[i].data.id == chichenInfo.id) {
						this.itemList[i].destroy();
						this.itemList.splice(i, 1);
						break;
					}
				}
			}
		}

		public addAni(ani: laya.display.Animation): void {
			this.addChild(ani);
			ani.play(Math.floor(Math.random() * 20), true);
			this.aniList.push(ani);
		}

		/* 开始喂食 */
		public onGotoMeal(): void {
			this.type = 2;
			var index: number = 0;
			for (var i: number = 0; i < this.itemList.length; i++) {
				if (this.itemList[i].type == 1) {
					this.itemList[i].startMeal(index);

					var mealItem: MealItem = new MealItem(this.itemList[i].data);
					this.addChild(mealItem);
					this.mealItemList.push(mealItem);

					index++;
				}
			}
		}

		/**结束喂食 */
		public onCloseMeal(): void {
			this.type = 1;

			for (var i: number = 0; i < this.itemList.length; i++) {
				if (this.itemList[i].type == 1) {
					this.itemList[i].mealEnd();
				}
			}

			for (var i: number = 0; i < this.mealItemList.length; i++) {
				this.mealItemList[i].destroy();
			}
			this.mealItemList.splice(0, this.mealItemList.length);
		}

		/**升级 */
		public upgradeChihcen(chichenInfo: ChichenInfo): void {
			if (RaceManager.instance.getPlantInfo().plantId == chichenInfo.plantId) {
				for (var i: number = 0; i < this.itemList.length; i++) {
					if (this.itemList[i].data && this.itemList[i].data.id == chichenInfo.id) {
						this.itemList[i].updateChichen();
					}
				}

				for (var i: number = 0; i < this.mealItemList.length; i++) {
					if (this.mealItemList[i].chichenInfo.id == chichenInfo.id) {
						this.mealItemList[i].updateChichen();
					}
				}
			}
		}

		public onChangeHAt(chichenInfo: ChichenInfo): void {
			for (var i: number = 0; i < this.itemList.length; i++) {
				if (this.itemList[i].data && this.itemList[i].data.id == chichenInfo.id) {
					this.itemList[i].changeHat();
				}
			}
		}

		public addSp(img: laya.ui.Image): void {
			this.addChild(img);
			this.imgList.push(img);
		}

		private onClearAni(animation: laya.display.Animation): void {
			animation.destroy();
		}

		public clearAll(): void {
			for (var i: number = 0; i < this.imgList.length; i++) {
				this.imgList[i].destroy();
			}
			this.imgList = new Array<laya.ui.Image>();

			for (var i: number = 0; i < this.aniList.length; i++) {
				this.aniList[i].destroy();
			}
			this.aniList = new Array<laya.display.Animation>();

			for (var i: number = 0; i < this.itemList.length; i++) {
				this.itemList[i].destroy();
			}
			this.itemList = new Array<ChichenItem>();

			for (var i: number = 0; i < this.mealItemList.length; i++) {
				this.mealItemList[i].destroy();
			}
			this.mealItemList = new Array<MealItem>();
		}
	}
}