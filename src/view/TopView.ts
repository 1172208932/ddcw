/**
 * 上边的菜单界面
 */
module module {
	import Point = laya.maths.Point;
	import Image = laya.ui.Image;

	export class TopView extends ui.game.TopViewUI {
		private menuType:number = 1;
		private curPlantId:number = 0;
		private maskimg:Image = null;
		private txt_coin:FontClip = null;
		private txt_wing:FontClip = null;
		private txt_food:FontClip = null;

		constructor() {
			super();
			this.initView();
			this.initEvents();
		}

		private initView():void {
			this.img_exp2.width = this.img_exp1.width;
			this.maskimg = new Image("ui/mask.png");
			this.maskimg.sizeGrid = "9,3,9,3";
			this.img_exp2.mask = this.maskimg;

			this.txt_coin = new FontClip("ui/num_a_", 5, 22, 162, 36, "center");
			this.txt_coin.scale(0.8, 0.8);
			this.box_coin.addChild(this.txt_coin);

			this.txt_wing = new FontClip("ui/num_a_", 5, 22, 138, 36, "center");
			this.txt_wing.scale(0.8, 0.8);
			this.box_wing.addChild(this.txt_wing);

			this.txt_food = new FontClip("ui/num_a_", 147.5, 22, 150, 36, "left");
			this.txt_food.scale(0.8, 0.8);
			this.box_race.addChild(this.txt_food);
			this.onShowFood();

			this.showCoin();
			this.showWing();
		}

		private initEvents(): void {
			// this.btn_menu.on(laya.events.Event.CLICK, this, this.onBtnMenu);
			this.btn_addWing.on(laya.events.Event.CLICK, this, this.onBtnAddWing);
			this.btn_addCoin.on(laya.events.Event.CLICK, this, this.onBtnAddWing);
			this.TestWings.on(laya.events.Event.CLICK, this, this.testwings)
			RaceManager.instance.on(RaceManager.CHANGE_PLANT_EXP, this, this.onChangePlantExp);
			RaceManager.instance.on(RaceManager.CHANGE_COIN, this, this.showCoin);
			RaceManager.instance.on(RaceManager.CHANGE_FOOD, this, this.onShowFood);
			RaceManager.instance.on(RaceManager.CHANGE_WING, this, this.showWing);
			manager.EventManager.instance.on(ToolView.GOTO_SMALL, this, this.onToolGotoSmall);
			manager.EventManager.instance.on(ToolView.GOTO_MEAL, this, this.onGotoMeal);
			manager.EventManager.instance.on(ToolView.CLOSE_MEAL, this, this.onCloseMeal);
		}

		private removeEvents(): void {
			RaceManager.instance.off(RaceManager.CHANGE_PLANT_EXP, this, this.onChangePlantExp);
			RaceManager.instance.off(RaceManager.CHANGE_COIN, this, this.showCoin);
			RaceManager.instance.off(RaceManager.CHANGE_FOOD, this, this.onShowFood);
			RaceManager.instance.off(RaceManager.CHANGE_WING, this, this.showWing);
			manager.EventManager.instance.off(ToolView.GOTO_SMALL, this, this.onToolGotoSmall);
			manager.EventManager.instance.off(ToolView.GOTO_MEAL, this, this.onGotoMeal);
			manager.EventManager.instance.off(ToolView.CLOSE_MEAL, this, this.onCloseMeal);
		}

		public initData(): void {
			var plantInfo: PlantInfo = RaceManager.instance.getPlantInfo();
			this.curPlantId = plantInfo.plantId;

			this.img_egg.skin = "ui/egg_" + (this.curPlantId > 100 ? this.curPlantId - 100 : this.curPlantId) + ".png";
			this.maskimg.width = (plantInfo.exp / plantInfo.maxExp) * this.img_exp2.width;
		}

		/**经验变化 */
		private onChangePlantExp(plantId: number, exp: number): void {
			if (this.curPlantId == plantId) {
				var plantInfo: PlantInfo = RaceManager.instance.getPlantInfoById(this.curPlantId);

				this.maskimg.width = (plantInfo.exp / plantInfo.maxExp) * this.img_exp2.width;

				this.ani2.play(0, false);
			}
		}

		private showCoin():void {
			if (RaceManager.instance.userInfo.coin < 10000) {
				this.txt_coin.text = RaceManager.instance.userInfo.coin + "";
			} else {
				var n:number = RaceManager.instance.userInfo.coin / 1000;
				var a = Math.floor(n);
				var b = Math.floor(n * 10) % 10;
				// this.txt_coin.text = a + (b > 0 ? "d" + b : "") + "k";
				this.txt_coin.text = a.toString() + "k";
			}
		}

		private showWing(): void {
			this.txt_wing.text = RaceManager.instance.userInfo.wing + "";
		}

		private onShowFood(): void {
			this.txt_food.text = RaceManager.instance.userInfo.apple + "";
		}

		private onBtnMenu(): void {
			if (this.menuType == 1) {
				this.img_menu.skin = "ui/img_x.png";
				this.menuType = 2;
				this.ani1.play(0, false);
			} else if (this.menuType == 2) {
				this.img_menu.skin = "ui/img_m.png";
				this.menuType = 1;
				this.ani1.play(0, false);
			}
			manager.EventManager.instance.event(ToolView.CHANGE_MENU_TYPE, [this.menuType]);
			manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Tap_menu3");
		}

		private onToolGotoSmall(): void {
			if (this.menuType != 1) {
				this.img_menu.skin = "ui/img_m.png";
				this.menuType = 1;
				this.ani1.play(0, false);
				manager.EventManager.instance.event(ToolView.CHANGE_MENU_TYPE, [this.menuType]);
			}
		}

		/* 打开喂宠物界面时响应的操作 */
		private onGotoMeal(): void {
			// this.img_menu.skin = "ui/img_m.png";
			// this.img_menu.visible = false;

			this.menuType = 0;
			this.img_weal.visible = true;
			this.img_egg.visible = this.img_exp1.visible = this.img_exp2.visible = false;
		}

		/* 关闭喂宠物界面时响应的操作 */
		private onCloseMeal(): void {
			// this.img_menu.skin = "ui/img_m.png";
			// this.img_menu.visible = true;

			this.menuType = 1;
			this.ani1.play(0, false);
			this.img_weal.visible = false;
			this.img_egg.visible = this.img_exp1.visible = this.img_exp2.visible = true;

			manager.EventManager.instance.event(ToolView.CHANGE_MENU_TYPE, [this.menuType]);
		}

		public showRun(): void {
			this.img_menu.visible = false;
			this.box_exp.visible = false;

			this.box_race.visible = true;
		}

		public closeRun(): void {
			this.img_menu.visible = true;
			this.box_exp.visible = true;

			this.box_race.visible = false;
		}

		private onBtnAddWing():void {
			// RaceManager.instance.addWing(50); // zxx  text
			RaceManager.instance.showShop();
		}

		private testwings() {
			manager.EventManager.instance.event(RaceView.FLY_MONEY , [this.localToGlobal(new laya.maths.Point(0,0)) , 3 , 100]);
		}

		public getExpIconPos(): Point {
			return this.box_exp.localToGlobal(new Point(this.img_egg.x + 32, this.img_egg.y + 36));
		}

		public getCoinIconPos(): Point {
			return this.box_coin.localToGlobal(new Point(this.img_coin.x + 28, this.img_coin.y + 29));
		}

		public getWingIconPos(): Point {
			return this.box_wing.localToGlobal(new Point(this.img_gem.x + 23, this.img_gem.y + 28));
		}

		public destroy(): void {
			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}
	}
}