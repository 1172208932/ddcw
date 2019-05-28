/**
* name 
*/
module module{
	export class SellChichenItem extends ui.game.SellChichenItemUI{
		private chichenInfo:ChichenInfo = null;
		private txt_coin:FontClip = null;
		private txt_weight:FontClip = null;

		constructor(){
			super();

			this.txt_coin = new FontClip("ui/num_a_" , 423 , 36 , 100 , 36 , "right");
			this.txt_coin.scale(0.8,0.8)
			this.addChild(this.txt_coin);

			this.txt_weight = new FontClip("ui/num_c_" , 230 , 40 , 100 , 24 , "center");
			this.addChild(this.txt_weight);

			this.btn_sell.on(laya.events.Event.CLICK , this , this.onBtnClick);
		}

		public showData(value:ChichenInfo):void{
			this.chichenInfo = value;

			this.img_chichen.skin = this.chichenInfo.config.getURl(6);
			this.img_chichen.pivot(this.img_chichen.width/2 , this.img_chichen.height/2);
			var ss:number = Math.min(60/this.img_chichen.width , 60/this.img_chichen.height);
			this.img_chichen.scale(ss , ss);

			this.txt_coin.text = this.chichenInfo.money + "";
			this.txt_name.text = this.chichenInfo.name;
			this.txt_weight.text = this.chichenInfo.getWeithStr();

			this.img_star1.visible = this.img_star2.visible = this.img_star3.visible = false;
			if(this.chichenInfo.star >= 1){
				this.img_star1.visible = true;
			}
			if(this.chichenInfo.star >= 2){
				this.img_star2.visible = true;
			}
			if(this.chichenInfo.star >= 3){
				this.img_star3.visible = true;
			}
		}

		private onBtnClick():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			
			var dialog:ConfirmDialog = new ConfirmDialog(2 , null , Laya.Handler.create(this , this.onSellComplete));
			manager.LayerManager.instace.addToLayer(dialog , manager.LayerManager.STAGE_DIALOG_LAYER , true , true , false , 0.6);
		}

		private onSellComplete():void{
			manager.EventManager.instance.event(SellOnPlantFullDialog.SELL_CHICHEN , [this.chichenInfo]);
		}
	}
}