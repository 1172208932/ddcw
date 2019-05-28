/**
 * 扩建花园的界面
 */
module module {
	export class BuildCardenDialog extends ui.game.BuildCardenDialogUI {
		private chichenInfo:ChichenInfo = null;
		private callBackFun:Laya.Handler = null;

		constructor(chichenInfo:ChichenInfo, callBackFun:Laya.Handler) {
			super();
			this.chichenInfo = chichenInfo;
			this.callBackFun = callBackFun;
			this.img_log.skin = RaceManager.instance.getLogimg(this.chichenInfo.plantId);
			this.btn_build.on(laya.events.Event.CLICK, this, this.onBtnBuild);
			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
		}

		private onBtnBuild():void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if (RaceManager.instance.userInfo.wing >= 20){
				if (this.callBackFun != null) {
					this.callBackFun.run();
				}
				RaceManager.instance.buildCarden(this.chichenInfo.plantId, this.chichenInfo);
				this.destroy();
			} else {
				Main.app.showMessage("您的羽毛不足");
				RaceManager.instance.showShop();
			}
		}

		private onBtnClose():void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		public destroy():void {
			this.removeSelf();
			super.destroy();
		}
	}
}