/**
* name 
*/
module module{
	/**弹窗使用的蒙版 */
	export class BlockBackgound extends laya.ui.Component{
		private source:laya.display.Sprite = null;
		private _isBackClose:boolean = true;

		constructor(blockAp:number = 0.5){
			super();
			this.mouseEnabled = true;
			this.on(laya.events.Event.CLICK , this , this.onCloseClick);
			this.width = Laya.stage.width;
			this.height = Laya.stage.height;

			var maskimg = new laya.ui.Image("ui/mask.png");
			maskimg.sizeGrid = "9,3,9,3";
			maskimg.height = Laya.stage.height;
			maskimg.width = Laya.stage.width;
			this.addChild(maskimg);
			this.alpha = blockAp;
			
			manager.EventManager.instance.on(manager.EventManager.REMOVESOURCE_FROM_BLOCKBACKGROUND , this , this.onRemoeSource);
		}

		private removeEvents():void{
			this.off(laya.events.Event.CLICK , this , this.onCloseClick);
			manager.EventManager.instance.off(manager.EventManager.REMOVESOURCE_FROM_BLOCKBACKGROUND , this , this.onRemoeSource);
			if(this.source != null) this.source.off(laya.events.Event.REMOVED , this , this.destroy);
		}

		public set sourceView(value:laya.display.Sprite){
			this.source = value;
			this.source.on(laya.events.Event.REMOVED , this , this.destroy);
		}

		public set isBackClose(value:boolean){
			this._isBackClose = value;
		}

		private onCloseClick(){
			if(this._isBackClose){
				if(this.source != null) {
					this.source.destroy();
				}
				this.destroy();
			}
		}

		private onRemoeSource():void{
			if(this.source != null) {
				this.source.off(laya.events.Event.REMOVED , this , this.destroy);
				this.source = null;
			}
		}

		public destroy():void {
			this.removeEvents();
			this.source = null;
			if(this.parent) this.parent.removeChild(this);
			super.destroy();
		}
	}
}