/**
* name 
*/
module module{
	export class CoinInfo{
		public static IDS:number = 10;

		public coinId:number = 0;

		public plantId:number = 0;

		public score:number = 1;

		public x:number = 0;

		public y:number = 0;

		constructor(){
			this.coinId = RaceManager.instance.userInfo.IDS++;
		}

		public toString():string{
			return this.coinId + "-" + this.plantId + "-" + this.score + "-" + this.x + "-" + this.y;
		}

		public decode(value:string):void{
			var ss:Array<string> = value.split("-");

			this.coinId = Number( ss[0] );
			this.plantId = Number( ss[1] );
			this.score = Number( ss[2] );
			this.x = Number( ss[3] );
			this.y = Number( ss[4] );
		}
	}
}