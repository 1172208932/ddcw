/**
* name 
*/
module module{
	export class EggInfo{
		public static IDS:number = 10;

		/**单ID */
		public eggId:number = 0;

		/**所属场地ID */
		public plantId:number = 0;

		/**所在格子序号 */
		public slotIndex:number = 0;

		/**时间完成时间戳 */
		public time:number = 0;
		/**总时长 */
		public tLength:number = 0;

		constructor(){
			this.eggId = RaceManager.instance.userInfo.IDS++;
		}

		public setTime(value:number):void{
			this.tLength = value;
			this.time = new Date().getTime() + this.tLength;
		}	

		public toString():string{
			return this.eggId + "-" + this.plantId + "-" + this.slotIndex + "-" + this.time + "-" + this.tLength;
		}
		
		public decode(value:string):void{
			var ss:Array<string> = value.split("-");
			this.eggId = Number( ss[0] );
			this.plantId = Number( ss[1] );
			this.slotIndex = Number( ss[2] );
			this.time = Number( ss[3] );
			this.tLength = Number( ss[4] );
		}
	}
}