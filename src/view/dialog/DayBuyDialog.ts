/**
* name 
*/
module module{
	export class DayBuyDialog extends ui.game.DayBuyDialogUI{
		constructor(){
			super();
			this.updateShow();
			this.btn_close.on(laya.events.Event.CLICK , this , this.onClose);
			this.btn_buy.on(laya.events.Event.CLICK , this , this.onBtnBuy);
			RaceManager.instance.on(RaceManager.CHANGE_USER_DATA, this , this.updateShow);
		}

		private updateShow():void{
			var dayTime:number = RaceManager.instance.userInfo.dayTime;

			var prevDate:Date = new Date(dayTime);
			var nowDate:Date = new Date();

			if(prevDate.getMonth() < nowDate.getMonth()){
				this.box_buy.disabled = false;
			}else{
				if(prevDate.getMonth() < nowDate.getMonth()){
					this.box_buy.disabled = false;
				}else{
					this.box_buy.disabled = true;
				}
			}
		}

		private onBtnBuy():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.userInfo.setDayTime(new Date().getTime());
			manager.EventManager.instance.event(RaceView.FLY_MONEY , [this.localToGlobal(new laya.maths.Point(325 , 255)) , 2 , 300]);
		}

		private onClose():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		public destroy():void{
			RaceManager.instance.off(RaceManager.CHANGE_USER_DATA , this , this.updateShow);
			this.removeSelf();
			super.destroy();
		}
	}
}