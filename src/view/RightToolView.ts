/**
 * 右边的菜单界面
 */
module module {
	export class RightToolView extends ui.game.RightToolViewUI {
		public static HIDE_RED: string = "RightToolView" + "HIDE_RED"
		private type: number = 0;
		constructor() {
			super();
			this.updateShow();

			this.btn_timereward.on(laya.events.Event.CLICK, this, this.onBtnTimeReward);
			this.btn_task.on(laya.events.Event.CLICK, this, this.onBtnTask);
			this.btn_buy.on(laya.events.Event.CLICK, this, this.onBtnBuy);
			this.btn_shar.on(laya.events.Event.CLICK, this, this.onBtnShare);
			this.btn_rank.on(laya.events.Event.CLICK, this, this.onRank);
			RaceManager.instance.on(RaceManager.CHANGE_USER_DATA, this, this.updateShow);
			manager.EventManager.instance.on(RightToolView.HIDE_RED, this, this.hideRed);
			Laya.Tween.clearAll(this.btn_shar);
			this.tween1(this.btn_shar);

			this.setRed()

		}

		public setRed() {
			var nowDate: Date = new Date();
			var hour: number = nowDate.getHours();

			console.log("hour : " + hour);
			if (hour >= 22) {
				this.redPoint.visible = false
				this.type = 1;
			} else if (hour >= 17) {
				this.type = 2;
			} else if (hour >= 11) {
				this.type = 3;
			} else {
				this.redPoint.visible = false
				this.type = 4;
			}

			var timeRewardCount = RaceManager.instance.userInfo.timeRewardCount;
			if (this.type == 3) {
				if (timeRewardCount == 0) {
					this.redPoint.visible = true
				} else {
					this.redPoint.visible = false
				}
			} else if (this.type == 2) {
				if (timeRewardCount == 2) {
					this.redPoint.visible = false
				} else {
					this.redPoint.visible = true
				}
			}
		}
		public hideRed() {
			this.redPoint.visible = false
		}
		// 缓动
		public tween1(btn, delay: number = 0) {
			Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween2, [btn]), delay);
		}
		public tween2(btn) {
			Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween3, [btn]));
		}
		public tween3(btn) {
			Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween4, [btn]));
		}
		public tween4(btn) {
			Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween1, [btn]), 2000);
		}
		private updateShow(): void {
			var by: number = 0;
			if (RaceManager.instance.userInfo.chengTaskComplete() == false && Main.app.mwx.mFHKeep) {
				this.btn_task.visible = true;
				this.btn_task.y = by;
				by += 154;
			} else {
				this.btn_task.visible = false;
			}

			if (RaceManager.instance.userInfo.checkInvitationComplete() == false && Main.app.mwx.mFHKeep) {
				this.btn_shar.visible = true;
				this.btn_shar.y = by;
				by += 54;
			} else {
				this.btn_shar.visible = false;
			}

			if (RaceManager.instance.userInfo.checkDayTimeComplete() == true) {
				this.btn_buy.visible = true;
				this.btn_buy.y = by;
				by += 104;
			} else {
				this.btn_buy.visible = false;
			}

			// this.btn_rank.visible = true;
			// this.btn_rank.y = by;
			// by += 104;

			if (RaceManager.instance.userInfo.checkTimeRewardComplete() == false) {
				this.btn_timereward.visible = true;
				this.btn_timereward.y = by;
				by += 104;
			} else {
				this.btn_timereward.visible = false;
			}

			this.height = by;
		}

		/* 好友排行 */
		private onRank(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var dialog: RankDialog = new RankDialog();
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
		}
		// 在线礼包
		private onBtnTimeReward(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var dialog: TimeRewardDialog = new TimeRewardDialog();
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
		}
		// 任务按钮
		private onBtnTask(): void {
			manager.SoundPlayMgr.instance.playButtonClick();//点击音效
			var dialog: TaskDialog = new TaskDialog();//新建实例
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);//
		}
		// 每日礼包
		private onBtnBuy(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var dialog: DayBuyDialog = new DayBuyDialog();
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
		}
		// 邀请
		private onBtnShare(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var dialog: InvitationFriendDialog = new InvitationFriendDialog();
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
		}

		public destroy(): void {
			RaceManager.instance.off(RaceManager.CHANGE_USER_DATA, this, this.updateShow);
			this.removeSelf();
			super.destroy();
		}
	}
}