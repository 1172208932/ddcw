/**
* name 
*/
module module{
	export class ConfirmDialog extends ui.game.ConfirmDialogUI{
		private type:number = 0;
		private cancelFun:Laya.Handler = null;
		private confirmFun:Laya.Handler = null;

		constructor(type:number , cancelFun:Laya.Handler = null , confirmFun:Laya.Handler = null){
			super();

			this.type = type;
			this.cancelFun = cancelFun;
			this.confirmFun = confirmFun;

			if(this.type == 1){
				this.box_1.visible = true;
			}else if(this.type == 2){
				this.box_2.visible = true;
			}else if(this.type == 3){
				this.box_3.visible = true;
			}

			this.btn_cancel.on(laya.events.Event.CLICK , this , this.onBtncancelClick);
			this.btn_ok.on(laya.events.Event.CLICK , this , this.onBtnConfirmClick);
		}

		private onBtncancelClick():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			if(this.cancelFun != null){
				this.cancelFun.run();
			}

			this.destroy();
		}

		private onBtnConfirmClick():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			if(this.confirmFun != null){
				this.confirmFun.run();
			}

			this.destroy();
		}

		public destroy():void{
			this.removeSelf();
			super.destroy();
		}
	}
}