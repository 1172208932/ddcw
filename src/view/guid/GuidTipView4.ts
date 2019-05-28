/**
* name 
*/
module module{
	export class GuidTipView4 extends ui.guid.GuidTipView4UI{
		public static CHANGE_TIP4:string = "GuidTipView4" + "CHANGE_TIP4";

		private index:number = 0;

		constructor(){
			super();
			this.showTip();
			RaceManager.instance.on(RaceManager.CLOSE_GUID_TIP4 , this , this.onClose);
			manager.EventManager.instance.on(GuidTipView4.CHANGE_TIP4 , this , this.onChange);
		}

		private onChange():void{
			this.index++;
			this.showTip();
		}

		private showTip():void{
			this.box1.visible = this.box2.visible = false;

			switch(this.index){
				case 0:
					this.box1.visible = true;
					break;
				case 1:
					this.box2.visible = true;
					break;
			}
		}

		private onClose():void{
			this.destroy();
		}

		public destroy():void{
			RaceManager.instance.off(RaceManager.CLOSE_GUID_TIP4 , this , this.onClose);
			manager.EventManager.instance.off(GuidTipView4.CHANGE_TIP4 , this , this.onChange);
			this.removeSelf();
			super.destroy();
		}
	}
}