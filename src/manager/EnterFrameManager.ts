/**
* name 
*/
module manager {
	import Dictionary = laya.utils.Dictionary;

	export class EnterFrameManager {
		private static _instance:EnterFrameManager = null;
		public static IDS:number = 1;
		public itemDic:Dictionary = new Dictionary();

		constructor() {

		}

		public setup():void {
			Laya.timer.loop(20, this, this.enterFrame);
		}

		/**帧更新 */
		public enterFrame():void {
			for (var i:number = 0; i < this.itemDic.values.length; i ++){
				var item:EnterFrameFace = this.itemDic.values[i];
				if (item != null) {
					item.onEnterFrame();
				}
			}
		}

		public addItem(item:EnterFrameFace):void{
			this.itemDic.set(item.faceId , item);
		}

		public removeItem(faceId:number):void{
			if(this.itemDic.get(faceId) != null){
				this.itemDic.remove(faceId);
			}
		}

		public get id():number{
			return EnterFrameManager.IDS++;
		}

		public static get instance():EnterFrameManager{
			if(this._instance == null){
				this._instance = new EnterFrameManager();
			}
			return this._instance;
		}
	}
}