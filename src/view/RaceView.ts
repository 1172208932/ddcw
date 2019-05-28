/**
* name 
*/
module module {
	import Point = laya.maths.Point;

	export class RaceView extends ui.game.RaceViewUI {
		public static FLY_WATER: string = "RaceView_" + "FLY_WATER";
		public static SHOW_HATCH_NOW: string = "RaceView_" + "SHOW_HATCH_NOW";
		public static CLICK_CHICHEN: string = "RaceView_" + "CLICK_CHICHEN";
		public static GOTO_RUN: string = "RaceView_" + "GOTO_RUN";
		public static CLOSE_RUN: string = "RaceView_" + "CLOSE_RUN";
		public static FLY_MONEY: string = "RaceView_" + "FLY_MONEY";
		public static CONTROL_FALSE: string = "RaceView_" + "CONTROL_FALSE";
		public static CONTROL_TRUE: string = "RaceView_" + "CONTROL_TRUE";



		private flyWaterAction: FlyWaterAction = null;
		private flyMoneyAction: FlyMoneyAction = null;
		private transitionchView: TransitionchView = null;
		private runView: RunView = null;
		private leftBox = [this.toolView, this.leftBtnsView, this.eatApple, this.lastGate]
		private leftX = [0, 0, 0, 25]
		private rightX = [648, 650, 648, 650, 622]
		private rightBox = [this.rightToolView, this.rightBtnsView, this.promotionView, this.nextGate, this.playGame]
		private isHide: Boolean = false
		public static TOP: number = 70;

		constructor() {
			super();
			this.initView();
			this.initEvents();
			this.checkLeftBoxStatus();
			this.checkSaleStatus();
			if (Main.app.mwx.ofMoveAni) this.addAni()
		}
		private addAni() {
			Laya.timer.once(Main.app.mwx.ofMoveAniTime * 1000, this, this.moveAni)
		}
		private moveAni() {
			this.isHide = true
			this.leftBox.map((item) => {
				Laya.Tween.to(item, { x: -137 }, 500)
			})
			this.rightBox.map((item) => {
				Laya.Tween.to(item, { x: 760 }, 500)
			})
		}
		private addShowAni() {
			Laya.timer.clear(this, this.moveAni)
			if (this.isHide) {
				this.isHide = false
				this.leftBox.map((item, index) => {
					Laya.Tween.clearAll(item)
					Laya.Tween.to(item, { x: this.leftX[index] }, 500, Laya.Ease.elasticOut)
				})
				this.rightBox.map((item, index) => {
					Laya.Tween.clearAll(item)
					Laya.Tween.to(item, { x: this.rightX[index] }, 500, Laya.Ease.elasticOut)
				})
			}
		}
		/* 根据后台和客户端平台判断是否隐藏游戏盒子 */
		private checkLeftBoxStatus(): void {
			// if (Main.app.mwx.ofOpenBox == 0 && Main.app.is_wx == false) {
			// 	this.leftBtnsView.visible = false;
			// } else {
			// 	var onoff: number = 0;
			// 	if (wxCore.uo.mPhone["platform"] == "ios") {
			// 		onoff = Number(Main.app.mwx.ofOpenBoxParam["ios"]);
			// 	} else if (wxCore.uo.mPhone["platform"] == "android") {
			// 		onoff = Number(Main.app.mwx.ofOpenBoxParam["android"]);
			// 	} else {
			// 		onoff = 1;
			// 	}
			// 	this.leftBtnsView.visible = (onoff == 1) ? true : false;
			// }
		}

		/* 根据后台和客户端平台判断促销活动是否显示 */
		private checkSaleStatus(): void {

			this.promotionView.showPromotionView();
			// if (Main.app.is_wx) {
			// 	if ((Main.app.mwx.firstGoods["open"] == 0 && Main.app.mwx.secondGoods["open"] == 0) || wxCore.uo.mPhone["platform"] == "ios") {
			// 		this.promotionView.visible = false;
			// 	} else {
			// 		this.promotionView.showPromotionView();
			// 	}
			// } else {
			// 	this.promotionView.visible = false
			// 	this.rightToolView.visible = false
			// }
		}

		private initView(): void {
			var sp: laya.ui.Component = new laya.ui.Component();
			this.addChild(sp);

			this.flyWaterAction = new FlyWaterAction(sp);
			this.flyMoneyAction = new FlyMoneyAction();

			this.topView.y += RaceView.TOP;
			this.toolView.y += RaceView.TOP;
			this.rightToolView.y += RaceView.TOP;
			this.mealTipView.y += RaceView.TOP;
		}

		private initEvents(): void {
			if (Main.app.mwx.ofMoveAni) { this.on(laya.events.Event.MOUSE_DOWN, this, this.addShowAni) }
			if (Main.app.mwx.ofMoveAni) { this.on(laya.events.Event.MOUSE_UP, this, this.addAni) }
			this.on(laya.events.Event.ADDED, this, this.onAddeds);
			RaceManager.instance.on(RaceManager.GOTO_PLANT, this, this.onGotoPlant);
			RaceManager.instance.on(RaceManager.CHANGE_GUID_STEP, this, this.onChangeGuidStep);
			RaceManager.instance.on(RaceManager.CHANGE_GUID_RUN, this, this.onChangeGuidRun);
			RaceManager.instance.on(RaceManager.SHOW_SELECTPLANT_GUID, this, this.onShowSelectPlantGuid);
			manager.EventManager.instance.on(ToolView.GOTO_MEAL, this, this.onGotoMeal);
			manager.EventManager.instance.on(RaceView.FLY_WATER, this, this.onFlyWater);
			manager.EventManager.instance.on(RaceView.SHOW_HATCH_NOW, this, this.onShowHatchNowView);
			manager.EventManager.instance.on(ToolView.CLOSE_MEAL, this, this.onCloseMeal);
			manager.EventManager.instance.on(RaceView.GOTO_RUN, this, this.onGotoRun);
			manager.EventManager.instance.on(RaceView.CLOSE_RUN, this, this.onCloseRun);
			manager.EventManager.instance.on(RaceView.FLY_MONEY, this, this.onFlyMoney);

			manager.EventManager.instance.on(RaceView.CONTROL_FALSE, this, this.controlFalse);
			manager.EventManager.instance.on(RaceView.CONTROL_TRUE, this, this.controlTrue);

		}

		private removeEvents(): void {
			RaceManager.instance.off(RaceManager.GOTO_PLANT, this, this.onGotoPlant);
			RaceManager.instance.off(RaceManager.CHANGE_GUID_STEP, this, this.onChangeGuidStep);
			RaceManager.instance.off(RaceManager.CHANGE_GUID_RUN, this, this.onChangeGuidRun);
			RaceManager.instance.off(RaceManager.SHOW_SELECTPLANT_GUID, this, this.onShowSelectPlantGuid);
			manager.EventManager.instance.off(ToolView.GOTO_MEAL, this, this.onGotoMeal);
			manager.EventManager.instance.off(RaceView.FLY_WATER, this, this.onFlyWater);
			manager.EventManager.instance.off(RaceView.SHOW_HATCH_NOW, this, this.onShowHatchNowView);
			manager.EventManager.instance.off(ToolView.CLOSE_MEAL, this, this.onCloseMeal);
			manager.EventManager.instance.off(RaceView.GOTO_RUN, this, this.onGotoRun);
			manager.EventManager.instance.off(RaceView.CLOSE_RUN, this, this.onCloseRun);
			manager.EventManager.instance.off(RaceView.FLY_MONEY, this, this.onFlyMoney);


			manager.EventManager.instance.off(RaceView.CONTROL_FALSE, this, this.controlFalse);
			manager.EventManager.instance.off(RaceView.CONTROL_TRUE, this, this.controlTrue);
		}
		public controlFalse(): void {
			// this.toolView.visible = false
			// this.getChickenView.visible = false
			this.promotionView.visible = false
			// this.rightBtnsView.visible = false
			this.eatApple.visible = false
			// this.leftBtnsView.visible = false
			this.playGame.visible = false
		}
		public controlTrue(): void {
			// this.toolView.visible = true
			// this.getChickenView.visible = true
			this.checkSaleStatus()
			// if (Main.app.is_wx)
			// 	this.leftBtnsView.visible = true
			this.eatApple.visible = true
			// this.rightBtnsView.visible = true
			this.playGame.visible = true
		}

		private onAddeds(): void {
			// 离线奖励界面 暂时关闭
			// if (RaceManager.instance.userInfo.guidStep >= 6) {
			// var offLineCoint:number = RaceManager.instance.getOffLineCoin();
			// if (offLineCoint > 0) {
			// 	var view:OffLineRewardsDialog = new OffLineRewardsDialog(offLineCoint);
			// 	this.addChild(view);
			// }
			// }
			// 这里关掉login界面
			wxCore.uo.clear();
			// Main.app.mwx.NewGetMyShare();
		}

		public initData(): void {
			this.plantView.initData();
			this.topView.initData();
			this.showGuid();
		}

		private onGotoPlant(): void {
			if (this.transitionchView == null) {
				this.transitionchView = new TransitionchView();
				this.addChildAt(this.transitionchView, 12);
			}
			this.transitionchView.start(Laya.Handler.create(this, this.changePlant), Laya.Handler.create(this, this.changTop));
		}

		private changePlant(): void {
			this.plantView.changePlant();
			if (RaceManager.instance.isOpenGate(RaceManager.instance.selectPlantId)) {
				this.unlockGateView.visible = false;
				Main.app.mwx.closeBanner();
			} else {
				this.unlockGateView.visible = true;
				Main.app.mwx.showBanner();

				this.unlockGateView.start();
			}
		}

		private changTop(): void {
			this.topView.initData();
			this.toolView.updatePlant();
		}

		private onFlyWater(bPos: Point, type: number, score: number, data?: Array<any>): void {
			if (this.flyWaterAction.expPos == null) {
				this.flyWaterAction.expPos = this.topView.getExpIconPos();
				this.flyWaterAction.coinPos = this.topView.getCoinIconPos();
				this.flyWaterAction.wingPos = this.topView.getWingIconPos();
			}
			this.flyWaterAction.flyWater(bPos, type, score, data);
		}

		private onFlyMoney(bPos: Point, type: number, score: number): void {
			if (this.flyMoneyAction.expPos == null) {
				this.flyMoneyAction.expPos = this.topView.getExpIconPos();
				this.flyMoneyAction.coinPos = this.topView.getCoinIconPos();
				this.flyMoneyAction.wingPos = this.topView.getWingIconPos();
			}
			this.flyMoneyAction.flyFood(bPos, type, score);
		}

		/* 显示开蛋方式的界面 */
		private onShowHatchNowView(info: EggInfo, coin: number, pos: Point): void {
			console.log(pos);
			if (pos.x == 4) { pos.x = 45 }
			this.hatchNowView.x = pos.x - 76;
			this.hatchNowView.show(info, coin);
		}

		private onGotoMeal(): void {
			this.mealFoodView.visible = true;
			this.mealTipView.visible = true;
			this.bottomView.visible = false;
			this.plantView.onGotoMeal();
		}

		private onCloseMeal(): void {
			this.mealFoodView.visible = false;
			this.mealTipView.visible = false;
			this.bottomView.visible = true;
			this.plantView.onCloseMeal();
		}

		private onGotoRun(): void {
			if (this.transitionchView == null) {
				this.transitionchView = new TransitionchView();
				this.addChildAt(this.transitionchView, 12);
			}

			this.transitionchView.start(Laya.Handler.create(this, this.changeToRun), Laya.Handler.create(this, this.changRunTop));
		}

		private onCloseRun(): void {
			this.runView.destroy();

			manager.EventManager.instance.event(BottomView.UNLOCK);

			this.checkSaleStatus()

			// this.getChickenView.visible = true
			// if (Main.app.is_wx)
			// 	this.leftBtnsView.visible = true
			this.eatApple.visible = true
			this.playGame.visible = true
			this.toolView.visible = true;
			this.bottomView.visible = true;
			this.raceBottomView.visible = false;
			if (Main.app.is_wx) {
				this.rightToolView.visible = true;
			}
			this.plantView.show();
			this.topView.closeRun();
		}

		private changeToRun(): void {
			this.plantView.hide();

			this.runView = new RunView();
			this.addChildAt(this.runView, 0);
		}

		private changRunTop(): void {
			this.nextGate.visible = false
			this.lastGate.visible = false
			this.promotionView.visible = false
			// this.getChickenView.visible = false
			this.leftBtnsView.visible = false
			this.eatApple.visible = false
			this.playGame.visible = false
			this.toolView.visible = false;
			this.bottomView.visible = false;
			this.rightToolView.visible = false;

			this.raceBottomView.visible = true;
			this.topView.showRun();
		}

		/**显示新手引导 */
		private showGuid(): void {
			// this.getChickenView.visible = false
			// 第一步省略，直接进入第二步。
			if (RaceManager.instance.userInfo.guidStep == 1) {
				// var view:GuidTipView = new GuidTipView();
				// view.pos(Laya.stage.width / 2, Laya.stage.height / 2);
				// this.addChild(view);
				RaceManager.instance.gotoGuidStep(2);
			}
			else if (RaceManager.instance.userInfo.guidStep == 2) {
				var view2: GuidTipView2 = new GuidTipView2();
				view2.pos(Laya.stage.width / 2, 300 + RaceView.TOP);
				this.addChild(view2);
			}
			else if (RaceManager.instance.userInfo.guidStep == 3) {
				var view3: GuidTipView3 = new GuidTipView3();
				view3.pos(480, 70 + RaceView.TOP);
				this.addChild(view3);
			}
			else if (RaceManager.instance.userInfo.guidStep == 4) {
				var view4: GuidTipView4 = new GuidTipView4();
				view4.pos(0, Laya.stage.height - 284);
				this.addChildAt(view4, 4);
			}
			else if (RaceManager.instance.userInfo.guidStep == 5) {
				var view5: GuidTipView = new GuidTipView(10);
				view5.pos(Laya.stage.width / 2, Laya.stage.height / 2);
				this.addChild(view5);
			}
			else {
				// this.getChickenView.visible = true
			}
		}

		private onChangeGuidStep(): void {
			this.showGuid();
		}

		private onChangeGuidRun(): void {
			var arrow: GuidArrowView = new GuidArrowView();
			arrow.setGuidRun(1);
			this.bottomView.addChild(arrow);
		}

		private onShowSelectPlantGuid(): void {
			var isFirstShowDownArrow: string = wx.getStorageSync(Main.DianDianChongWu_ShowDownArrow);
			if (!isFirstShowDownArrow) {
				var arrow: GuidArrowView = new GuidArrowView();
				arrow.setGuidRun5();
				this.bottomView.addChild(arrow);
				wx.setStorageSync(Main.DianDianChongWu_ShowDownArrow, "1");
			}
		}

		public destroy(): void {
			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}
	}
}