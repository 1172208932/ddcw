/**
* name 
*/
module module{
	import Point = laya.maths.Point;

	export class CoinItem extends ChichenItem{
		constructor(){
			super();
		}

		protected initView():void{
			this.type = 2;
			
			this.img = new laya.ui.Image("ui/coin.png");
			this.img.pivot(33 , 50)
			this.addChild(this.img);
		}

		
		/**鸡被点中了 */
		public handClickOk():void{
			RaceManager.instance.removeCoinFromPlant(this.coin);
		}

		/**是否点击中 */
		public collision(pos:Point):boolean{
			if( Math.pow(this.x - pos.x , 2) + Math.pow(this.y - 22 - pos.y , 2) <= Math.pow(50 , 2)){
				return true;
			}else{
				return false;
			}
		}

		/**飞行数据 */
		public getFlyData():Array<any>{
			var pos:Point = new Point(this.x , this.y);
			return [pos , 2 , 1 , [this.coin]];
		}
	}
}