/**
* name 
*/
module module{
	export class SelectChichenItem extends ui.race.SelectChichenItemUI{

		public chichenInfo:ChichenInfo = null;
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

		public showChichen(plantId:number):void{
			this.img_star1.visible = this.img_star2.visible = this.img_star3.visible = false;

			var plantInfo:PlantInfo = RaceManager.instance.getPlantInfoById(plantId);

			this.chichenInfo = this._index < plantInfo.chichenInfoList.length ? plantInfo.chichenInfoList[this._index] : null;

			if(this.chichenInfo != null){
				this.img_no.visible = false;
				this.img_icon.visible = this.img_food.visible = this.img_hatbg.visible =true;
				this.img_icon.skin = this.chichenInfo.config.getURl(1);
				this.img_icon.pivot(this.img_icon.width/2 , this.img_icon.height/2);
				var ss:number = Math.min(87/this.img_icon.width , 105/this.img_icon.height);
				this.img_icon.scale(ss , ss);

				this.txt_name.text = this.chichenInfo.name;
				this.txt_level.text = "LV." + this.chichenInfo.level + "";
				
				if(this.chichenInfo.star >= 1){
					this.img_star1.visible = true;
				}
				if(this.chichenInfo.star >= 2){
					this.img_star2.visible = true;
				}
				if(this.chichenInfo.star >= 3){
					this.img_star3.visible = true;
				}

				if(this.chichenInfo.hatId > 0){
					this.img_hat.visible = true;
					this.img_hat.skin = RaceManager.instance.getHatImg(this.chichenInfo.hatId);
					var ss:number = Math.min(30/this.img_hat.width , 30/this.img_hat.height);
					this.img_hat.scale(ss , ss);
				}else{
					this.img_hat.visible = false;
				}
			}else{
				this.img_icon.visible = this.img_food.visible = this.img_star1.visible = this.img_star2.visible = this.img_star3.visible = this.img_hat.visible = this.img_hatbg.visible =false;
				this.img_no.visible = true;
				this.txt_name.text = "";
				this.txt_level.text = "";
			}
		}
	}
}