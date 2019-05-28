/**
* name 
*/
module module{
	export class GuidTipView5 extends ui.guid.GuidTipView5UI{
		private index:number = 0;

		constructor(index:number = 0){
			super();
			this.index = index;
			this.pos(375 , 235 + RaceView.TOP);
			this.showTip();
			this.on(laya.events.Event.CLICK , this , this.onClick);
		}	

		private onClick():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			this.ani1.play(0 , false);

			this.index++;
			this.showTip();

			if(this.index >= 2){
				this.destroy();
			}
		}

		private showTip():void{
			this.box_1.visible = this.box_2.visible = false;

			switch(this.index){
				case 0:
					this.box_1.visible = true;
					break;
				case 1:
					this.box_2.visible = true;
					break;
			}
		}

		public destory():void{
			this.removeSelf();
			super.destroy();
		}
	}
}