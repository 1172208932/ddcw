/**
* name 
*/
module module {
	import Event = laya.events.Event;
	import Point = laya.maths.Point;
	import Text = Laya.Text;

	export class GameView extends ui.game.GameViewUI implements manager.EnterFrameFace {
		public static GOTO_RACE_VIEW: string = "GameView" + "GOTO_RACE_VIEW";
		public static GOTO_INDEX_VIEW: string = "GameView" + "GOTO_INDEX_VIEW";

		public faceId: number = 0;
		private raceView: RaceView = null;
		private loginView: LoginView2 = null

		constructor() {
			super();
			this.initView();
			this.initEvents();
		}

		private initView(): void {
			manager.SoundPlayMgr.instance.playBgMusic(6);
		}

		private initEvents(): void {
			//在这里对时间进行注册
			this.on(Event.ADDED, this, this.onAddeds);
			manager.EventManager.instance.on(GameView.GOTO_RACE_VIEW, this, this.onGotoRaceView);
			manager.EventManager.instance.on(GameView.GOTO_INDEX_VIEW, this, this.onGotoIndexView);
		}

		private removeEvents(): void {
			this.off(Event.ADDED, this, this.onAddeds);
		}

		private onAddeds(): void {
			//感觉像帧同步的事件
			manager.EnterFrameManager.instance.addItem(this);
		}

		private onGotoRaceView(): void {
			// if (Main.app.is_wx) {
				if (this.raceView == null) {
					this.raceView = new RaceView();
					this.addChildAt(this.raceView, 0);
					Main.app.raceView = this.raceView;
				}
				this.raceView.visible = true;
				this.raceView.initData();
			// } else {
			// 	if (this.raceView == null) {
			// 		this.raceView = new RaceView();
			// 		this.addChildAt(this.raceView, 0);
			// 		Main.app.raceView = this.raceView;
			// 		this.raceView.visible = false
			// 	}
			// 	if (this.loginView == null) {
			// 		Laya.loader.load(['gate/bg_text_4.png','gate/login_bg.png','gate/login_img02.png'], laya.utils.Handler.create(this, () => {
			// 			this.loginView = new LoginView2();
			// 			this.addChildAt(this.loginView, 0);
			// 			Main.app.loginView = this.loginView
			// 			this.loginView.visible = true
			// 		}))
			// 		// Main.app.raceView = this.raceView;
			// 	}
			// }


			this.img_mask.visible = true;
			this.img_mask.alpha = 1;

			// 读条结束
			Main.app.pView.overProgress();
			Laya.timer.once(500, this, () => {
				this.indexView.visible = false;
			})

			// this.raceView.initData();
			this.type = 1;
			//每一个子节点都会加上帧同步？
			manager.EnterFrameManager.instance.addItem(this);
		}

		private onGotoIndexView(): void {
			this.img_mask.visible = true;
			this.img_mask.alpha = 1;
			this.raceView.visible = false;
			this.indexView.visible = true;

			this.type = 2;
			manager.EnterFrameManager.instance.addItem(this);
		}

		private type: number = 1;
		/**帧循环执行函数 */
		public onEnterFrame(): void {
			this.img_mask.alpha -= 0.2;
			if (this.img_mask.alpha <= 0) {
				manager.EnterFrameManager.instance.removeItem(this.faceId);

				if (this.type == 1) {

				}
			}
		}

		public destroy(): void {
			manager.EnterFrameManager.instance.removeItem(this.faceId);
			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}
	}
}