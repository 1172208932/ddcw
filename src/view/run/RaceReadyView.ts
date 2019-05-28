/**
* name 
*/
module module{
	export class RaceReadyView extends ui.race.RaceReadyViewUI{
		private time:number = 0;

		constructor(){
			super();
			this.box_name.on(laya.events.Event.CLICK , this , this.onBtnClick);
		}

		public showMyName(name:string , yy:number):void{
			this.box_name.y = yy - 100;
		}

		public start():void{
			this.time = 3;
			this.img_time.skin = "ui/num_e_"+this.time+".png";
			Laya.timer.loop(1000 , this , this.onLoop);
		}

		private onLoop():void{
			this.time -= 1;

			if(this.time >= 0){
				this.img_time.skin = "ui/num_e_"+this.time+".png";
			}else{
				this.event(RunView.CHICHEN_RUN);
				Laya.timer.clear(this , this.onLoop);
				this.visible = false;
			}
		}

		private onBtnClick():void{
			this.event(RunView.CLICK_NAME);
		}

		public destroy():void{
			Laya.timer.clear(this , this.onLoop);
			this.removeSelf();
			super.destroy();
		}
	}
}