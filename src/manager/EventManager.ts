/**
* name 
*/
module manager{
	/**事件全局发送 ， 接受管理器 
	 * 可在它身上 发送 事件 到其他模块
	 * 可在它身上 接受 其他模块发送的事件
	*/
	export class EventManager extends laya.events.EventDispatcher{
		private static _instance:EventManager = null;

		public static REMOVESOURCE_FROM_BLOCKBACKGROUND:string = "EventManager" + "REMOVESOURCE_FROM_BLOCKBACKGROUND";

		public static LOGIN_SUCCESS:string = "EventManager" + "LOGIN_SUCCESS";
		public static LOGIN_FAIL:string = "EventManager" + "LOGIN_FAIL";

		constructor(){
			super();
		}

		public static get instance():EventManager{
			if(this._instance == null){
				this._instance = new EventManager();
			}
			return this._instance;
		}
	}
}