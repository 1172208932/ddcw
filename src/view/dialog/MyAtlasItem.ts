/**
* name 
*/
module module{
	export class MyAtlasItem extends ui.game.MyAtlasItemUI{
		public chichenInfo:ChichenInfo = null;
		private txt_weight:FontClip = null;

		constructor(){
			super();
			this.txt_weight = new FontClip("ui/num_c_" , 97 , 59 , 100 , 24 , "left");
			this.addChild(this.txt_weight);
			this.on(laya.events.Event.CLICK , this , this.onItemClick);
		}

		public showChichen(info:ChichenInfo):void{
			this.chichenInfo = info;
			this.img_star1.visible = this.img_star2.visible = this.img_star3.visible = false;

			if(this.chichenInfo != null){
				this.img_no.visible = false;
				this.img_icon.visible = this.img_look.visible = this.img_hatbg.visible =true;
				this.img_icon.skin = this.chichenInfo.config.getURl(1);
				// this.img_icon.pivot(this.img_icon.width/2 , this.img_icon.height/2);
				this.img_icon.pivot(info.config.getWidth(1)/2 , info.config.getHeight(1)/2);
				var ss:number = Math.min(87/this.img_icon.width , 105/this.img_icon.height);
				this.img_icon.scale(ss , ss);

				this.txt_name.text = this.chichenInfo.name;
				this.txt_weight.text = this.chichenInfo.getWeithStr();
				
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
				this.img_icon.visible = this.img_look.visible = this.img_star1.visible = this.img_star2.visible = this.img_star3.visible = this.img_hat.visible = this.img_hatbg.visible = false;
				this.img_no.visible = true;
				this.txt_name.text = "";
				this.txt_weight.text = "";
			}
		}

		private onItemClick(e:laya.events.Event):void{
			if(this.chichenInfo != null){
				manager.EventManager.instance.event(MyAtlasDialog.SELECT_CHICHEN , [this.chichenInfo]);
			}
		}

	}
}