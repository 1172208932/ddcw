/**
* name 
*/
module module{
	export class TransitionchView extends ui.game.TransitionchViewUI implements manager.EnterFrameFace{
		public faceId:number;
		private type:number = 1;
		private t:number = 0;
		private plantFun:Laya.Handler = null;
		private topFun:Laya.Handler = null;
	
		constructor(){
			super();
		}

		public start(plantFun:Laya.Handler , topFun:Laya.Handler):void{
			this.plantFun = plantFun;
			this.topFun = topFun;
			this.visible = true;
			this.box1.x = 0;
			this.type = 1;
			this.t = 0;

			manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Curtain_RtoL");
			manager.EnterFrameManager.instance.addItem(this);
		}

		public onEnterFrame():void{
			if(this.type == 1){
				this.box1.x += 20;
				if(this.box1.x >= 1550){
					this.type = 2;
					this.plantFun.run();
				}
			}else if(this.type == 2){
				this.t += 30;
				if(this.t >= 1600){
					this.type = 3;
					this.topFun.run();
				}
			}else if(this.type == 3){
				this.box1.x += 30;
				if(this.box1.x >= 3510){
					manager.EnterFrameManager.instance.removeItem(this.faceId);
					this.visible = false;
				}
			}
		}

		public destroy():void{
			manager.EnterFrameManager.instance.removeItem(this.faceId);
			this.removeSelf();
			super.destroy();
		}
	}
}