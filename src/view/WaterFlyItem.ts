/**
* name 
*/
module module{
	import Point = laya.maths.Point;

	export class WaterFlyItem extends laya.ui.Component{
		public static IDS:number = 100;
		public id:number = 100;

		public type:number = 0;
		public score:number = 0;
		public data:Array<any> = null;

		public isEnd:boolean = false;

		public cp:Array<Point> = new Array<Point>();

		public maxt:number = 0;

		public t1:number = 1;

		public wT:number = 0;

		public t2:number = 1;

		constructor(type:number , score:number , data?:Array<any>){
			super();
			this.id = WaterFlyItem.IDS++;
			
			this.type = type;
			this.score = score;
			this.data = data;

			if(type == 1){
				var animation:laya.display.Animation = new laya.display.Animation();	
				animation.loadAnimation(manager.ResVersionMgr.instance.getMd5Url("ani/fly_"+this.data[1]+".ani"));
				this.addChild(animation);
				animation.scale(0.5,0.5);
				animation.play(0 , true);
			}else if(type == 11){
				var animation:laya.display.Animation = new laya.display.Animation();	
				animation.loadAnimation(manager.ResVersionMgr.instance.getMd5Url("ani/fly_"+this.data[1]+".ani"));
				this.addChild(animation);
				animation.scale(0.5,0.5);
				animation.play(0 , true);
			}else if(type == 2){
				var img:laya.ui.Image = new laya.ui.Image("ui/coin.png");
				img.pivot(33 , 50);
				this.addChild(img);
			}
		}

		public reset(type:number , score:number , data?:Array<any>):void{
			this.type = type;
			this.score = score;
			this.data = data;

			this.isEnd = false;
			this.cp = new Array<Point>();
			this.maxt = 0;
			this.t1 = 1;
			this.wT = 0;
			this.t2 = 1;
		}

		public get key():string{
			if(this.type == 1 || this.type == 11){
				return "1-" + this.data[1];
			}else if(this.type == 2){
				return this.type + "-c";
			}
		}

		/**向终点移动 */
		public moveTo():void{
			var tpos:Point = core.Utils.PointOnCubicBezier2(this.cp , this.t1/this.maxt);
			this.x = tpos.x;
			this.y = tpos.y;
			this.t1++;
			if(this.t1 > this.maxt){
				this.isEnd = true;
			}
		}
	}
}