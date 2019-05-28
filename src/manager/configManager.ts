/**
* name 
*/
module manager{
	import Dictionary = laya.utils.Dictionary;

	/**配置文件管理器 */
	export class configManager{
		private static _instance:configManager = null;

		////////////////////////////////////////////下面三个不能有任何变动（在打包工具中会修改这里）///////////////////////////////////////////////////////////

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		public hallIp:string = "testddcw.chinaxwz.cn";//

		public CDN_BOOT:string = "https://tcdn.wanzhushipin.cn/xcx/chichens/DDCW/";
		

		/**模块的资源表 */
		public moduleConfigDic:Dictionary = null;
		/**资源配置表 */
		public resourceConfigDic:Dictionary = new Dictionary();

		constructor(){
			
		}

		public setup():void{
			this.moduleConfigDic = new Dictionary();
			this.moduleConfigDic.set("CompanyIcon" , {name:"CompanyIcon" , source:"smallload.json"});
			this.moduleConfigDic.set("LoginView" , {name:"LoginView" , source:"login.json"});
			this.moduleConfigDic.set("GameView" , {name:"GameView" , source:"ui.json,tupian.json,font.json,caidai.json,run.json,view.json"});
			this.starProgress();
		}

		/* 进度条 */
		private starProgress():void {
			if (Main.app.pView == null) {
				Main.app.pView = new module.ProgressView();
				Main.app.pView.zOrder = 2000;
				Laya.stage.addChild(Main.app.pView);
			}
			Main.app.pView.startProgress();
		}
		
		/**获取模块的资源数组 */
		public getModuleConfigSource(name:string):Array<any>{
			return this.getSource(this.moduleConfigDic.get(name).source);
		}

		public getSource(source:string):Array<any>{
			var arr = source.split(",");
			var fileUrls:Array<any> = new Array<any>();
			for(var i:number = 0 ; i < arr.length ; i++){
				fileUrls.push({url:manager.ResVersionMgr.instance.getMd5Url("res/atlas/"+arr[i]+"") , type:laya.net.Loader.ATLAS});
			}
			return fileUrls;
		}

		public static get instance():configManager{
			if(this._instance == null){
				this._instance = new configManager();
			}
			return this._instance;
		}
	}
}