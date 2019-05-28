/**
* name 
*/
module module {
	import Point = laya.maths.Point;

	export class EggGridItem extends ui.game.EggGridItemUI implements manager.EnterFrameFace {
		public faceId: number;
		private _index: number = 0;
		private eggInfo: EggInfo = null;
		private animation: laya.display.Animation = null;
		private aniId: number = 0;
		private txt_time: FontClip = null;
		private maskimg: laya.ui.Image = null;

		constructor() {
			super();
			this.faceId = manager.EnterFrameManager.instance.id;
			this.on(laya.events.Event.CLICK, this, this.onClick);

			this.txt_time = new FontClip("ui/num_b_", 0, 78, 120, 17, "center");
			this.txt_time.scale(0.8, 0.8);
			this.addChild(this.txt_time);

			this.maskimg = new laya.ui.Image("ui/mask.png");
			this.maskimg.sizeGrid = "9,3,9,3";
			this.img_exp2.mask = this.maskimg;
		}

		public set index(value: number) {
			this._index = value;
			this.showGrid();
		}

		public get index(): number {
			return this._index;
		}

		public updateSlot(): void {
			this.showGrid();
		}

		private showGrid(): void {
			this.eggInfo = RaceManager.instance.userInfo.getEggInfoByIndex(this._index);

			if (RaceManager.instance.userInfo.isOpenSlot(this._index)) {
				this.img_lock.visible = false;

				if (this.eggInfo != null) {
					this.img_ying.visible = false;
					this.img_exp1.visible = this.img_exp2.visible = true;

					this.downTime = this.eggInfo.time - new Date().getTime();
					this.createAni();
					if (this.downTime > 0) {
						this.img_exp1.visible = this.img_exp2.visible = true;
						manager.EnterFrameManager.instance.addItem(this);
					} else {
						this.img_exp1.visible = this.img_exp2.visible = false;
						manager.EnterFrameManager.instance.removeItem(this.faceId);
					}
				} else {
					this.removeAni();
					this.txt_time.text = "";
					this.img_ying.visible = true;
					this.img_exp1.visible = this.img_exp2.visible = false;
					manager.EnterFrameManager.instance.removeItem(this.faceId);
				}
			} else {
				this.removeAni();
				this.txt_time.text = "";
				this.img_ying.visible = this.img_lock.visible = true;
				this.img_exp1.visible = this.img_exp2.visible = false;
				manager.EnterFrameManager.instance.removeItem(this.faceId);
			}
		}

		private downTime: number = 0;

		public onEnterFrame(): void {
			if (this.downTime > 0) {
				this.downTime -= 30;

				this.maskimg.width = (this.downTime / this.eggInfo.tLength) * this.img_exp2.width;

				if (this.downTime <= 0) {
					this.animation.play(0, true, "ani_open");
					this.img_exp1.visible = this.img_exp2.visible = false;
					manager.EnterFrameManager.instance.removeItem(this.faceId);
					this.txt_time.text = "";
					manager.EventManager.instance.event(GuidTipView4.CHANGE_TIP4);
				} else {
					this.showTime();
				}
			} else {

			}
		}

		private showTime(): void {
			var s: number = Math.floor(this.downTime / 1000);

			var h: number = Math.floor(s / 3600);
			if (h > 0) {
				var m: number = Math.floor((s % 3600) / 60);
				this.txt_time.text = this.getTwoChar(h) + "a" + this.getTwoChar(m);
			} else {
				m = Math.floor(s / 60);
				s = s % 60;
				this.txt_time.text = this.getTwoChar(m) + "a" + this.getTwoChar(s);
			}
		}

		private getTwoChar(value: number): string {
			return value >= 10 ? "" + value : "0" + value;
		}

		private onClick(): void {
			manager.SoundPlayMgr.instance.playButtonClick();

			if (RaceManager.instance.userInfo.isOpenSlot(this._index)) {
				if (this.eggInfo != null) {
					if (this.downTime > 0) {
						var coin: number =
							this.downTime / 1000 >= 3600 ? 2000 ://大于一小时
								this.downTime / 1000 >= 1800 ? 750 ://大于半小时
									this.downTime / 1000 >= 600 ? 250 ://大于十分钟
										this.downTime / 1000 >= 300 ? 200 ://大于五分钟
											50
						manager.EventManager.instance.event(RaceView.SHOW_HATCH_NOW, [this.eggInfo, coin, this.localToGlobal(new Point(0, 0))]);
					} else {
						RaceManager.instance.openEgg(this.eggInfo);
						util.server('oppen_egg',null)
					}
				} else {

				}
			} else {
				var dialog: UnlockEggSlotDialog = new UnlockEggSlotDialog(this._index);
				manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, true, 0.6);
			}
		}

		private createAni(): void {
			var plantId = this.eggInfo.plantId > 100 ? this.eggInfo.plantId - 100 : this.eggInfo.plantId;
			if (this.aniId != plantId) {
				this.removeAni();

				this.animation = new laya.display.Animation();
				this.animation.loadAnimation(manager.ResVersionMgr.instance.getMd5Url("ani/eggAnis" + plantId + ".ani"));
				this.animation.pos(50, 87);
				this.addChildAt(this.animation, 2);

				if (this.downTime > 0) {
					if (RaceManager.instance.userInfo.coin >= 250) {
						this.animation.play(0, true, "ani_hatch");
					} else {
						this.animation.play(0, true, "ani_waite");
					}
				} else {
					this.animation.play(0, true, "ani_open");
				}
			}
		}

		private removeAni(): void {
			if (this.animation != null) {
				this.animation.destroy();
				this.animation = null;
			}
		}

		public destroy(): void {
			manager.EnterFrameManager.instance.removeItem(this.faceId);
			this.removeSelf();
			super.destroy();
		}
	}
}