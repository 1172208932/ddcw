/**
 * 宠物喂食界面
 */
module module {
	import Point = laya.maths.Point;
	export class MealFoodView extends ui.game.MealFoodViewUI {
		private txt_food:FontClip = null;
		private isStarted:boolean = false;
		private itemList:Array<FoodFlyItem> = [];

		constructor() {
			super();
			this.initView();
			this.initEvents();
		}

		private initView():void {
			var b:number = Math.round((Laya.stage.width - 220 * 3)/4);
			this.box_1.x = b;
			this.box_2.x = this.box_1.x + this.box_1.width + b;
			this.box_3.x = this.box_2.x + this.box_2.width + b;

			this.txt_food = new FontClip("ui/num_a_", 80, 35, 160, 36, "center");
			this.txt_food.scale(0.8, 0.8);
			this.box.addChild(this.txt_food);
			this.onShowFood();
		}

		private initEvents():void {
			this.btn_buy_coin.on(laya.events.Event.CLICK, this, this.onBtnbuyCoin);
			this.btn_buy_wing.on(laya.events.Event.CLICK, this, this.onBtnBuyWing);
			this.btn_look.on(laya.events.Event.CLICK, this, this.HowGetApple);
			RaceManager.instance.on(RaceManager.LOOKTOMEALAPPLE, this, this.onBtnLook);
			RaceManager.instance.on(RaceManager.CHANGE_FOOD, this, this.onShowFood);
		}

		private removeEvents():void {
			RaceManager.instance.off(RaceManager.CHANGE_FOOD, this, this.onShowFood);
			RaceManager.instance.off(RaceManager.LOOKTOMEALAPPLE, this, this.onBtnLook);
		}

		private onShowFood():void {
			this.txt_food.text = RaceManager.instance.userInfo.apple + "";
		}

		/* 金币购买苹果 */
		private onBtnbuyCoin():void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if (this.isStarted == false) {
				if (RaceManager.instance.userInfo.coin >= 50) {
					RaceManager.instance.addCoin(-50);
					this.flyFood(1, 100);
				} else {
					if (Main.app.getReceiveFreeCoins() >= Main.app.mwx.ofCoinsLessParam["time"]) {
						RaceManager.instance.showShop();
					} else {
						Main.app.showCoinsLackingView();
					}
				}
			}
		}

		private onBtnLook():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			this.flyFood(2 , 200);
			// 埋点统计
			Main.app.mwx.dataLog(dtLogConfig.GetFoodsFree, {"type":Main.app.mwx.ofFeedPat});
		}
		
		public HowGetApple() {
			// 埋点统计
			Main.app.mwx.dataLog(dtLogConfig.GetFoodsFree, {"type":0});

			if (Main.app.mwx.ofFeedPat == 1) {
				// 直接使用
				this.onBtnLook();
			} else if (Main.app.mwx.ofFeedPat == 2 || Main.app.mwx.ofFeedPat == 4) {
				// 看视频使用
				if (Main.app.mwx.avShowType == false) {
					return;
				}
				Main.app.mwx.avShowType = false;
				let self = this;
				Laya.timer.once(500, self, ()=>{
					self.onVideo(Main.app.mwx.ofFeedPat);
				});
			} else if (Main.app.mwx.ofFeedPat == 3) {
				// 分享使用
				this.onShare();
			} else {
				// 暂不支持
				Main.app.showMessage("功能暂未开放");
			}
		}
		
		/* 看视频 */
		private onVideo(type:number):void {
			let self = this;
			wxCore.uo.loadingVideo((ok:boolean) => {
                if (ok) {
                    wxCore.uo.showVideoAD((played:boolean) => {
                        if (played) {
							self.onBtnLook();
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
		private onShare():void {
			if (Main.app.shareIndex > 0) {
				return;
			}
			Main.app.shareIndex = 4;
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
                title : title,
                imageUrl : imageUrl,
                query : "uid=" + Main.app.mwx.mUID + `&surl=${Main.app.shareIndex}`
            });
        }

		/* 羽毛买苹果 */
		private onBtnBuyWing():void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if (this.isStarted == false) {
				if (RaceManager.instance.userInfo.wing >= 1) {
					RaceManager.instance.addWing(-1);
					this.flyFood(3, 1200);
				} else {
					Main.app.showMessage("您的羽毛不足");
					if (Main.app.getReceiveFreeFeather() >= Number(Main.app.mwx.ofFeatherLessParam["time"])) {
						RaceManager.instance.showShop();
					} else {
						Main.app.showFeatherLackingView();
					}
				}
			}
		}

		private endPos:Point = null;
		private beginPos:Point = null;
		private count:number = 100;
		private oneScore:number = 0;
		public flyFood(type:number, score:number):void {
			this.endPos = new Point(this.box.x + 46 , this.box.y + 46);
			this.beginPos = new Point(this["box_" + type].x + 46, this["box_" + type].y + 46);

			this.count = 50;
			this.oneScore = score / 50;
			this.onLoop();
			Laya.timer.loop(200, this, this.onLoop);
		}

		private onLoop():void {
			for (var i:number = 0 ; i < 10 ; i ++) {
				this.addFlyItem(this.beginPos, this.endPos, this.oneScore, i);
			}
			this.count -= 10;
			if (this.count <= 0) {
				Laya.timer.clear(this, this.onLoop);
			}
		}

		private addFlyItem(beginPos:Point, endPos:Point, score:number, delay:number):void {
			var sc:number = 0.1 + Math.random() * 0.3;
			var length:number = ((Math.random() * 2 >= 1) ? 100 : -100) * (Math.random() * 2);

			var item:FoodFlyItem = new FoodFlyItem(score);
			item.cp.push(beginPos);
			var p:Point = core.Utils.getBezier2TP(beginPos, endPos, length, sc);
			item.cp.push(p);
			item.cp.push(endPos);
			item.maxt = Math.floor(beginPos.distance(endPos.x, endPos.y) / 10);
			item.wT = item.maxt * 10;
			item.x = beginPos.x;
			item.y = beginPos.y;
			item.delay = delay;
			this.addChild(item);
			this.itemList.push(item);

			this.startFly();
		}

		private startFly():void {
			if (this.isStarted == false) {
				this.isStarted = true;
				Laya.timer.loop(20, this, this.enterFrame);
			}
		}

		private enterFrame():void {
			var isAllEnd:boolean = true;
			for (var i:number = 0; i < this.itemList.length; i ++) {
				if (this.itemList[i].isEnd == false) {
					this.itemList[i].delay -= 1;
					isAllEnd = false;
					if (this.itemList[i].delay <= 0) {
						this.itemList[i].moveTo();
						// 一个水滴飞完成
						if (this.itemList[i].isEnd) {
							RaceManager.instance.changeFood(this.itemList[i].score);
						}
					}
				} else {
					this.itemList[i].destroy();
				}
			}
			if (isAllEnd) {
				Laya.timer.clear(this, this.enterFrame);
				this.isStarted = false;
				this.itemList.splice(0, this.itemList.length);
			}
		}

		public destroy():void {
			Laya.timer.clearAll(this);
			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}
	}
}