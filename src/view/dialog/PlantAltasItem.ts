/**
* name 
*/
module module{
	export class PlantAltasItem extends ui.game.PlantAltasItemUI{
		private _index:number = 0;

		constructor(){
			super();
		}

		public set index(value:number){
			this._index = value;
		}

		public get index():number{
			return this._index;
		}

		public showChichen(plantId:number):void {
			var plantInfo:PlantInfo = RaceManager.instance.getPlantInfoById(plantId);
			var configId:number = plantInfo.chichenIdList[this._index];
			// var temp = plantInfo.chichenIdList.concat(RaceManager.instance.SPECIFIC_CONFIG);
			// var configId:number = temp[this._index];
			var isHave:Boolean = plantInfo.isHaveChichenIds(configId);
			// console.log("1 = ", plantInfo);
			// console.log("2 = ", configId);
			if (isHave) {
				var info:ChichenConfig = RaceManager.instance.chichenConfigDic.get(configId);
				this.img_no.visible = false;
				this.img_icon.visible = true;
				this.img_icon.skin = info.getURl(1);
			} else {
				this.img_icon.visible = false;
				this.img_no.visible = true;
			}
		}

		public showAddConfigID(configId:number):void{
			var info:ChichenConfig = RaceManager.instance.chichenConfigDic.get(configId);
			this.img_no.visible = false;
			Laya.loader.load([ { url: info.getURl(1) , type: laya.net.Loader.IMAGE } ] , laya.utils.Handler.create(this, this.onLoadedImage , [configId]));
		}

		private onLoadedImage(configId:number):void{
			var info:ChichenConfig = RaceManager.instance.chichenConfigDic.get(configId);
			this.img_icon.visible = true;
			this.img_icon.skin = info.getURl(1);
			this.img_icon.pivot(info.getWidth(1)/2 , info.getHeight(1)/2);
			var ss:number = Math.min(125/info.getWidth(1) , 125/info.getHeight(1));

			this.img_icon.scale(3 , 3);
			Laya.Tween.to(this.img_icon , {scaleX:ss , scaleY:ss} , 300 , null , null , 100);

			this.ani.play(0 , false);
		}
	}
}