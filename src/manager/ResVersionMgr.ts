/**
* name 
*/
module manager{
	import HttpRequest = Laya.HttpRequest;

	export class ResVersionMgr{
		private static _instance:ResVersionMgr = null;

		constructor(){
		}

		/**获取带MD5的资源路径 */
		public getMd5Url(url:string):string{
			return url;
		}

///////////////////////////////////////////////////获取APP版本号/////////////////////////////////////////////////////////////////////////////////////////////
		/**登录 */
		public login(code:string):void{
			console.log("用户数据",Main.app.mwx.m_strAllUserData)

			if(Main.app.mwx.m_strAllUserData != null)
			{
				console.log("走userdata数据")
				
			this.onLoginPhpComplete(Main.app.mwx.m_strAllUserData)
		}
		else
		{
			this.onLoginPhpComplete("fail")
		}
		
			// else
			// {
			// 	console.log("走get.php数据")				
			// 	var http:HttpRequest = new HttpRequest();   //new一个HttpRequest类
			// 	http.once(Laya.Event.COMPLETE , this , this.onLoginPhpComplete , [http.data]); //数据传输完成后，会返回一个data
			// 	http.once(Laya.Event.ERROR , this , this.onLoginPhpError, [http.data]);    //数据传输失败后返回
			// 	http.send("https://"+ configManager.instance.hallIp +"/get.php" , 'code='+code , 'post' , 'text');
			// }
			
		}

		// /**登录返回 */
		// public onLoginPhpComplete(http:HttpRequest):void{
		// 	manager.EventManager.instance.event(manager.EventManager.LOGIN_SUCCESS , [http.data]);
		// }
				/**登录返回 */
		public onLoginPhpComplete(http:string):void{
			manager.EventManager.instance.event(manager.EventManager.LOGIN_SUCCESS , [http]);
		}

		private onLoginPhpError(http:string):void{
			manager.EventManager.instance.event(manager.EventManager.LOGIN_FAIL);
		}

		/**保存数据 */
		public saveData(userid:number , data:string):void{
			var time:number = new Date().getTime();

			var http:HttpRequest = new HttpRequest();   //new一个HttpRequest类
			http.once(Laya.Event.COMPLETE , this , this.onSavePhpComplete , [http]); //数据传输完成后，会返回一个data
			http.once(Laya.Event.ERROR , this , this.onSavePhpError);    //数据传输失败后返回

			http.send("https://"+ configManager.instance.hallIp +"/save.php" , 'ts='+time+'&rid='+userid+'&data='+data , 'post' , 'text');
		}

		private onSavePhpComplete(http:HttpRequest):void{
			var data:any = http.data;
			
		}

		private onSavePhpError():void{
			
		}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		public static get instance():ResVersionMgr{
			if(this._instance == null){
				this._instance = new ResVersionMgr();
			}
			return this._instance;
		}
	}
}