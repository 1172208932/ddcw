/**
* name 
*/
module module{
	export class GuidArrowView extends laya.ui.Component implements manager.EnterFrameFace{
		public faceId:number;

		private type:number = 1;
		private img_arrow:laya.ui.Image = null;

		constructor(){
			super();

			this.img_arrow = new laya.ui.Image("ui/arrow-yellow.png");
			this.img_arrow.pivot(64 , 26);
			this.addChild(this.img_arrow);
			//箭头
			this.img_arrow.zOrder = 10

			this.faceId = manager.EnterFrameManager.instance.id;
		}

		public setGuidRun(step:number):void {
			console.log("setGuidRun1");
			this.pos(650 , -85);
			// this.img_arrow.rotation = 90;
			this.img_arrow.scale(2.5 , 2.5);
			this.type = 1;
			manager.EnterFrameManager.instance.addItem(this);

			RaceManager.instance.on(RaceManager.CHANGE_GUID_RUN_COMPLETE , this , this.onGuidRunComplete);
		}

		public setGuidRun2():void {
			console.log("setGuidRun2");
			this.pos(325 , 785);
			this.img_arrow.rotation = -90;
			this.img_arrow.scale(2.5 , 2.5);
			this.type = 1;
			manager.EnterFrameManager.instance.addItem(this);
		}

		public setGuidRun3():void{
			console.log("setGuidRun3");
			this.pos(165 , 128);
			this.img_arrow.rotation = 90;
			this.img_arrow.scale(2.5 , 2.5);
			this.type = 1;
			manager.EnterFrameManager.instance.addItem(this);
		}

		public setGuidRun4():void{
			console.log("setGuidRun4");
			this.pos(100 , 56);
			this.img_arrow.rotation = 180;
			this.img_arrow.scale(2.5 , 2.5);
			this.type = 2;
			manager.EnterFrameManager.instance.addItem(this);
		}

		public setGuidRun5():void{
			console.log("setGuidRun5");
			this.pos(370 , 10);
			this.img_arrow.rotation = 90;
			this.img_arrow.scale(2.5 , 2.5);
			this.type = 1;
			manager.EnterFrameManager.instance.addItem(this);
			// 移除通知
			manager.EventManager.instance.on("OPEN_SELECTGATEDIALOG", this, this.onGuidRunComplete);
		}

		private t:number = 0;
		public onEnterFrame():void{
			if(this.type == 1){
				if(this.t < 20){
					this.y -= 1;
					this.t++;
				}else{
					this.y += 1;
					this.t++;
					if(this.t >= 40){
						this.t = 0;
					}
				}
			}else if(this.type == 2){
				if(this.t < 20){
					this.x -= 1;
					this.t++;
				}else{
					this.x += 1;
					this.t++;
					if(this.t >= 40){
						this.t = 0;
					}
				}
			}	
		}

		private onGuidRunComplete():void{
			this.destroy();
		}

		public destroy():void{
			RaceManager.instance.off(RaceManager.CHANGE_GUID_RUN_COMPLETE , this , this.onGuidRunComplete);
			manager.EventManager.instance.off("OPEN_SELECTGATEDIALOG" , this , this.onGuidRunComplete);
			manager.EnterFrameManager.instance.removeItem(this.faceId);
			this.removeSelf();
			super.destroy();
		}
	}
}