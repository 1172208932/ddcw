/**
* name 
*/
module module{
	import Point = laya.maths.Point;

	export class FoodFlyItem extends laya.ui.Image{
		public type:number = 0;
		public score:number = 0;
		public data:Array<any> = null;

		public isEnd:boolean = false;

		public cp:Array<Point> = new Array<Point>();

		public maxt:number = 0;

		public t1:number = 1;

		public wT:number = 0;

		public t2:number = 1;

		public delay:number = 0 ;

		constructor(score:number , type:number = 0){
			super();

			this.score = score;
			this.type = type;

			if(this.type == 0){
				this.skin = "ui/Atlas_2.png";
				this.pivotX = 32;
				this.pivotY = 37;
				this.scaleX = this.scaleY = 0.8;
			}else if(this.type == 2){
				this.skin = "ui/Atlas_0.png";
				this.pivotX = 40;
				this.pivotY = 42;
				this.scaleX = this.scaleY = 0.6;
			}else if(this.type == 3){
				this.skin = "ui/Atlas_1.png";
				this.pivotX = 32;
				this.pivotY = 41;
				this.scaleX = this.scaleY = 0.7;
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