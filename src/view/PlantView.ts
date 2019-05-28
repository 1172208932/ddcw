/**
* name 
*/
module module {
	import Event = laya.events.Event;
	import Point = laya.maths.Point;
	import LocalStorage = laya.net.LocalStorage;
	export class PlantView extends ui.game.PlantViewUI implements manager.EnterFrameFace {
		public faceId: number;

		private sp_decal: laya.ui.Component = null;
		private chichenView: ChichenView = null;
		private sp_top: laya.ui.Component = null;
		private handImg: laya.ui.Image = null;

		/**场地上的配饰图片 */
		private decalImgs: Array<laya.ui.Image> = new Array<laya.ui.Image>();

		constructor() {
			super();
			this.faceId = manager.EnterFrameManager.instance.id;
			this.initView();
			this.initEvents();
		}

		private initView(): void {
			this.sp_decal = new laya.ui.Component();
			this.addChild(this.sp_decal);

			this.chichenView = new ChichenView();
			this.addChild(this.chichenView);

			this.sp_top = new laya.ui.Component();
			this.addChild(this.sp_top);

			this.handImg = new laya.ui.Image("ui/btn_touming.png");
			this.handImg.width = Laya.stage.width;
			this.handImg.height = Laya.stage.height;
			this.addChild(this.handImg);
			this.handImg.on(Event.CLICK, this, this.onHandClick);
			this.handImg.on(Event.MOUSE_DOWN, this, this.onHandMouseDown);
			this.handImg.on(Event.MOUSE_UP, this, this.onHandMouseUp);
		}

		private initEvents(): void {
			manager.EventManager.instance.on(RaceView.CLICK_CHICHEN, this, this.onClickChichen);
			RaceManager.instance.on(RaceManager.ADD_COIN_IN_PLANT, this, this.onAddCoinInPlant);
			RaceManager.instance.on(RaceManager.REMOVE_COIN_FROM_PLANT, this, this.onRemoveCoinFromPlant);
			RaceManager.instance.on(RaceManager.ADD_CHICHEN_TO_PLANT, this, this.onAddChichenToPlant);
			RaceManager.instance.on(RaceManager.REMOVE_CHICHEN_FROM_PLANT, this, this.onRemoveChichenFromPlant);
			RaceManager.instance.on(RaceManager.UPGRADE_CHICHEN, this, this.onUpgradeChichen);
			RaceManager.instance.on(RaceManager.CHANGE_CHICHEN_HAT, this, this.onChangeHAt);
		}

		private removeEvents(): void {
			manager.EventManager.instance.off(RaceView.CLICK_CHICHEN, this, this.onClickChichen);
			RaceManager.instance.off(RaceManager.ADD_COIN_IN_PLANT, this, this.onAddCoinInPlant);
			RaceManager.instance.off(RaceManager.REMOVE_COIN_FROM_PLANT, this, this.onRemoveCoinFromPlant);
			RaceManager.instance.off(RaceManager.ADD_CHICHEN_TO_PLANT, this, this.onAddChichenToPlant);
			RaceManager.instance.off(RaceManager.REMOVE_CHICHEN_FROM_PLANT, this, this.onRemoveChichenFromPlant);
			RaceManager.instance.off(RaceManager.UPGRADE_CHICHEN, this, this.onUpgradeChichen);
			RaceManager.instance.off(RaceManager.CHANGE_CHICHEN_HAT, this, this.onChangeHAt);
		}

		private onHandClick(e: Event): void {
			var touches: Array<any> = e.touches;
			var point: Point = (touches && touches.length > 0) ? new Point(touches[0].stageX, touches[0].stageY) : new Point(e.stageX, e.stageY);

			this.chichenView.onHandClick(point);
		}

		/**按下 */
		private onHandMouseDown(e: Event): void {
			this.handImg.on(Event.MOUSE_MOVE, this, this.onHandMouseMove);//开启滑动检查
		}

		/**移动 */
		private onHandMouseMove(e: Event): void {
			var touches: Array<any> = e.touches;
			var point: Point = (touches && touches.length > 0) ? new Point(touches[0].stageX, touches[0].stageY) : new Point(e.stageX, e.stageY);

			this.chichenView.onHandMove(point);
		}

		/**弹起 */
		private onHandMouseUp(e: Event): void {
			this.handImg.off(Event.MOUSE_MOVE, this, this.onHandMouseMove);
		}

		/**初始化场地 */
		public initData(): void {
			this.initDecal();
			this.initChichen();
			manager.EnterFrameManager.instance.addItem(this);
		}

		public show(): void {
			this.visible = true;
			manager.EnterFrameManager.instance.addItem(this);
		}

		public hide(): void {
			this.visible = false;
			manager.EnterFrameManager.instance.removeItem(this.faceId);
		}

		/**改变场地 */
		public changePlant(): void {
			this.clearAll();

			this.initDecal();
			this.initChichen();
			this.showCardentip();
		}

		public onEnterFrame(): void {
			this.chichenView.onEnterFrame();
			this.shakeView();
			// if (Main.app.is_wx) {
				this.checkFlyVideo();
			// }
		}

		/**初始化场地图片 */
		private initDecal(): void {
			var decals: Array<any> = RaceManager.instance.getMapData();

			for (var i: number = 0; i < decals.length; i++) {
				var data: any = decals[i];

				var ps: Array<string> = data.P.split(",");
				var type: number = Number(ps[0]);
				var layer: number = ps.length >= 2 ? Number(ps[1]) : 0;
				var sx: number = ps.length >= 3 ? Number(ps[2]) : 0;
				var sy: number = ps.length >= 4 ? Number(ps[3]) : 0;

				if (type == 0) {
					this.bg.skin = manager.configManager.instance.CDN_BOOT + "map/" + data.U + ".png";
				} else if (type == 1) {
					var img: laya.ui.Image = new laya.ui.Image(manager.configManager.instance.CDN_BOOT + "map/" + data.U + ".png");
					this.addImage(data.U + ".png", layer, sx, sy, img, data);
				} else if (type == 2) {
					var ani: laya.display.Animation = new laya.display.Animation();
					ani.loadAnimation(manager.ResVersionMgr.instance.getMd5Url(data.U));
					this.addAnimation(ani, layer, sx, sy, data);
				}
			}
		}

		/**初始化场地中的动物 */
		private initChichen(): void {
			this.chichenView.initChichen();
		}

		/**添加一个图片 */
		private addImage(url: string, layer: number, sx: number, sy: number, img: laya.ui.Image, data: any): void {
			if (layer == 1) {
				this.sp_decal.addChild(img);
			} else if (layer == 2) {
				this.chichenView.addSp(img);
			} else if (layer == 3) {
				this.sp_top.addChild(img);
			}
			var size: Array<number> = RaceManager.instance.getMapImageSize(url);

			img.scale(sx, sy);
			var w: number = Math.abs(sx) * size[0];
			var h: number = Math.abs(sy) * size[1];
			var a: number = sx < 0 ? w : 0;

			if (data.x != undefined) {
				img.x = data.x;
			} else {
				if (data.L != undefined) {
					img.x = data.L + a;
				} else if (data.R != undefined) {
					img.x = Laya.stage.width - data.R - w + a;
				} else if (data.CX != undefined) {
					img.x = (Laya.stage.width - w) / 2 + data.CX;
				}
			}

			if (data.y != undefined) {
				img.y = data.y;
			} else {
				if (data.T != undefined) {
					img.y = data.T;
				} else if (data.B != undefined) {
					img.y = Laya.stage.height - data.B - h;
				} else if (data.CY != undefined) {
					img.y = (Laya.stage.height - h) / 2 + data.CY;
				}
			}

			this.decalImgs.push(img);
		}

		/**添加一个场地动画 */
		private addAnimation(ani: laya.display.Animation, layer: number, sx: number, sy: number, data: any): void {
			if (layer == 1) {
				this.sp_decal.addChild(ani);
			} else if (layer == 2) {
				this.chichenView.addAni(ani);
			} else if (layer == 3) {
				this.sp_top.addChild(ani);
			}

			ani.scale(sx, sy);

			if (data.x != undefined) {
				ani.x = data.x;
			} else {
				if (data.L != undefined) {
					ani.x = data.L;
				} else if (data.R != undefined) {
					ani.x = Laya.stage.width - data.R;
				} else if (data.CX != undefined) {
					ani.x = (Laya.stage.width) / 2 + data.CX;
				}
			}

			if (data.y != undefined) {
				ani.y = data.y;
			} else {
				if (data.T != undefined) {
					ani.y = data.T;
				} else if (data.B != undefined) {
					ani.y = Laya.stage.height - data.B;
				} else if (data.CY != undefined) {
					ani.y = (Laya.stage.height) / 2 + data.CY;
				}
			}
		}

		private showCardentip(): void {
			var plantInfo: PlantInfo = RaceManager.instance.getPlantInfo();
			if (plantInfo.plantId > 100 && RaceManager.instance.isShowTip) {
				RaceManager.instance.isShowTip = false;
				var view: GuidTipView5 = new GuidTipView5();
				this.addChild(view);
			}
		}

		public clearAll(): void {
			for (var i: number = 0; i < this.decalImgs.length; i++) {
				this.decalImgs[i].destroy();
			}
			this.decalImgs = [];

			this.chichenView.clearAll();
		}

		/**在场地中添加一个金币 */
		private onAddCoinInPlant(coinInfo: CoinInfo): void {
			this.chichenView.addCoin(coinInfo);
		}

		/**移除一个金币 */
		private onRemoveCoinFromPlant(coinInfo: CoinInfo): void {
			this.chichenView.removeCoin(coinInfo);
		}

		/**添加一个动物 */
		private onAddChichenToPlant(chichenInfo: ChichenInfo): void {
			this.chichenView.addChichenToPlant(chichenInfo);
		}

		/**移除一个动物 */
		private onRemoveChichenFromPlant(chichenInfo: ChichenInfo): void {
			this.chichenView.removeChichenFromPlant(chichenInfo);
		}

		public onGotoMeal(): void {
			this.chichenView.onGotoMeal();
		}

		public onCloseMeal(): void {
			this.chichenView.onCloseMeal();
		}

		/**升级 */
		private onUpgradeChichen(chichenInfo: ChichenInfo): void {
			this.chichenView.upgradeChihcen(chichenInfo);
		}

		private onChangeHAt(chichenInfo: ChichenInfo): void {
			this.chichenView.onChangeHAt(chichenInfo);
		}

		/**检查是否放飞行宝箱 */
		private checkFlyVideo(): void {
			var curTimes: number = 0;
			var saveTime: string = LocalStorage.getItem(Main.DianDianChongWu_NowDay4)
			if (saveTime == Main.app.mwx.nowday) {
				var storageTimes: number = Number(LocalStorage.getItem(Main.DianDianChongWu_GetCoinsByShare_Times))
				if (!!storageTimes) curTimes = storageTimes;
			} else {
				LocalStorage.setItem(Main.DianDianChongWu_NowDay4, Main.app.mwx.nowday)
				LocalStorage.setItem(Main.DianDianChongWu_GetCoinsByShare_Times, '0')
			}
			if (Main.app.mwx.ofCoinsBox == 3 && curTimes >= 5) {
				return;
			}
			// 条件满足时展示悬浮的大量金币按钮
			if (this.visible == true ) {
				RaceManager.instance.userInfo.flyVideDownTime -= 30;
				if (RaceManager.instance.userInfo.flyVideDownTime < 0) {
					var item: FlyVideoItem = new FlyVideoItem();
					this.addChild(item);
					RaceManager.instance.userInfo.flyVideDownTime = 100 * 24 * 60 * 60 * 1000;
				}
			}
		}

		/**抖动偏移值 X */
		private shakeX: Array<number> = [0, 5, 0, -5, 0, 5, 0, -5, 0];
		/**抖动偏移值 Y */
		private shakeY: Array<number> = [0, 5, 0, -5, 0, -5, 0, 5, 0];

		private shakeType: number = 0;
		private shakeIndex: number = 0;

		private shakeView(): void {
			if (this.shakeType == 1) {
				this.x = this.shakeX[this.shakeIndex];
				this.y = this.shakeY[this.shakeIndex];

				this.shakeIndex++;
				if (this.shakeIndex >= this.shakeX.length) {
					this.shakeIndex = 0;
					this.shakeType = 0;
				}
			}
		}

		private onClickChichen(): void {
			this.shakeType = 1;
		}

		public destroy(): void {
			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}
	}
}