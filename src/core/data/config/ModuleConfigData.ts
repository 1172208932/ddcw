/**
* name 
*/
module core{
	export class ModuleConfigData{
		public name:string = "";

		public source:string = "";

		constructor(){
		}

		public getSource():Array<any>{
			var arr = this.source.split(",");
			var fileUrls:Array<any> = new Array<any>();
			for(var i:number = 0 ; i < arr.length ; i++){
				fileUrls.push({url:manager.ResVersionMgr.instance.getMd5Url("res/atlas/"+arr[i]+"") , type:laya.net.Loader.ATLAS});
			}
			return fileUrls;
		}
	}
}