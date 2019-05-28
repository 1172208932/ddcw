/**
* name 
*/
module module{
	export class GuidTipView2 extends ui.guid.GuidTipView2UI{
		private index:number = 0 ;
		constructor(){
			super();
			this.showTip();
			manager.EventManager.instance.on(RaceView.CLICK_CHICHEN , this , this.onClickChichen);
		}

		private onClickChichen():void{
			this.ani1.play(0 , false);

			this.index++;
			this.showTip();

			if(this.index >= 2){
				RaceManager.instance.gotoGuidStep(3);
				this.destroy();
			}
		}

		private showTip():void{
			this.img_1.visible = this.img_2.visible = false;

			switch(this.index){
				case 0:
					this.img_1.visible = true;
					break;
				case 1:
					this.img_2.visible = true;
					break;
			}
		}

		public destroy():void{
			manager.EventManager.instance.off(RaceView.CLICK_CHICHEN , this , this.onClickChichen);
			this.removeSelf();
			super.destroy();
		}
	}
}