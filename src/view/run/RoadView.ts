/**
* name 
*/
module module{
	export class RoadView extends laya.ui.Component{
		private tbx:number = 0;
		constructor(){
			super();
			this.initView();
		}

		private initView():void{
			for(var i:number = 0 ; i < 11 ; i++){
				this.createBox(i , i == 9 , i == 10);
			}
		}

		private createBox(index:number , isHaveEnd:boolean = false , isHaveTai:boolean = false):void{
			var bx:number = index * 1024;

			var img:laya.ui.Image = new laya.ui.Image("run/hills.png");
			img.pos(15 + bx , 6);
			this.addChild(img);

			img =  new laya.ui.Image("run/hills.png");
			img.pos(243 + bx , 0);
			this.addChild(img);

			img =  new laya.ui.Image("run/hills.png");
			img.pos(491 + bx , 0);
			this.addChild(img);

			img =  new laya.ui.Image("run/hills.png");
			img.pos(756 + bx , 2);
			this.addChild(img);

			img =  new laya.ui.Image("run/back-grass.png");
			img.pos(0 + bx , 42);
			img.scale(2 , 2);
			this.addChild(img);

			img =  new laya.ui.Image("run/back-grass.png");
			img.pos(512 + bx , 42);
			img.scale(2 , 2);
			this.addChild(img);
			
			img =  new laya.ui.Image("run/track.png");
			img.pos(0 + bx , 145);
			img.scale(2 , 2);
			this.addChild(img);

			if(isHaveTai == true){
				this.tbx = (Laya.stage.width-678)/2 + bx;

				img = new laya.ui.Image("run/tai.png")
				img.pos(this.tbx , 398);
				img.scale(1.5 , 1.5);
				this.addChild(img);
			}
			
			if(isHaveEnd == true){
				for(var i:number = 0 ; i < 6 ; i++){
					img =  new laya.ui.Image("run/finish-pattern.png");
					img.pos(0 + bx , 175 + i * 128);
					img.scale(2 , 2);
					this.addChild(img);
				}
			}
		}

		public getTaiX():number{
			return this.tbx + this.x;
		}
	}
}