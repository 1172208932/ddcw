/**
* name 
*/
module module{
	export class GuidTipView3 extends ui.guid.GuidTipView3UI{
		constructor(){
			super();
			RaceManager.instance.on(RaceManager.CLOSE_GUID_TIP3 , this , this.onClose);
		}

		private onClose():void{
			this.destroy();
		}

		public destroy():void{
			RaceManager.instance.off(RaceManager.CLOSE_GUID_TIP3 , this , this.onClose);
			this.removeSelf();
			super.destroy();
		}
	}
}