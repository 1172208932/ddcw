/**
* name 
*/
module module {
	export class GuidTipView extends ui.guid.GuidTipViewUI{
		private index:number = 0;

		constructor(index:number = 0){
			super();
			this.index = index;
			this.showTip();
			this.on(laya.events.Event.CLICK, this, this.onClick);
		}	

		private onClick():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			this.ani1.play(0 , false);

			this.index ++;
			this.showTip();

			if (this.index > 3 && this.index < 10) {
				RaceManager.instance.gotoGuidStep(2);
				this.destroy();
			} else if (this.index >= 12){
				RaceManager.instance.gotoGuidStep(6);
				this.destory();
			}
		}

		private showTip():void{
			this.box1.visible = this.box2.visible = this.box3.visible = this.box4.visible = this.box5.visible = this.box6.visible = false;

			switch(this.index){
				case 0:
					this.box1.visible = true;
					break;
				case 1:
					this.box2.visible = true;
					break;
				case 2:
					this.box3.visible = true;
					break;
				case 3:
					this.box4.visible = true;
					break;
				case 10:
					this.box5.visible = true;
					break;
				case 11:
					this.box6.visible = true;
					break;
			}
		}

		public destory():void{
			this.removeSelf();
			super.destroy();
		}
	}
}