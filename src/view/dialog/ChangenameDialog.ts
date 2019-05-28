/**
* name 
*/
module module{
	export class ChangenameDialog extends ui.game.ChangenameDialogUI{
		private chichenInfo:ChichenInfo = null;

		constructor(info:ChichenInfo){
			super();

			this.chichenInfo = info;
			this.input_name.textField.text = this.chichenInfo.name;

			this.btn_cancel.on(laya.events.Event.CLICK , this , this.onBtnCancelClick);
			this.btn_ok.on(laya.events.Event.CLICK , this , this.onBtnOkClick);
		}

		private onBtnCancelClick():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		private onBtnOkClick():void{
			manager.SoundPlayMgr.instance.playButtonClick();

			RaceManager.instance.changeName(this.chichenInfo , this.input_name.textField.text);

			this.destroy();
		}

		public destroy():void{
			this.removeSelf();
			super.destroy();
		}
	}
}