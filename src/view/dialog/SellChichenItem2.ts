/**
* name 
*/
module module{
	export class SellChichenItem2 extends ui.game.SellChichenItem2UI{
		private type:number = 0;
		private chichenInfo:ChichenInfo = null;
		private txt_coin:FontClip = null;
		private txt_weight:FontClip = null;

		constructor(){
			super();

			this.txt_coin = new FontClip("ui/num_a_" , 140 , 50 , 100 , 36 , "right");
			this.txt_coin.scale(0.8,0.8)
			this.box_sell.addChild(this.txt_coin);

			this.txt_weight = new FontClip("ui/num_c_" , 7 , 70 , 100 , 24 , "center");
			this.box_sell.addChild(this.txt_weight);

			this.btn_sell.on(laya.events.Event.CLICK , this , this.onBtnClick);
			this.btn_add.on(laya.events.Event.CLICK , this , this.onBtnAdd);
		}

		public showData(value:ChichenInfo , type:number):void{
			this.type = type;
			this.chichenInfo = value;

			if(this.chichenInfo != null){
				this.box_sell.visible = true;
				this.box_add.visible = false;
				this.img_chichen.skin = this.chichenInfo.config.getURl(6);
				this.img_chichen.pivot(this.chichenInfo.config.getWidth(6)/2 , this.chichenInfo.config.getHeight(6)/2);
				var ss:number = Math.min(60/this.chichenInfo.config.getWidth(6) , 60/this.chichenInfo.config.getHeight(6));
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
			}else{
				this.box_sell.visible = false;
				this.box_add.visible = true;
			}
		}

		private onBtnClick():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			
			var dialog:ConfirmDialog = new ConfirmDialog(2 , null , Laya.Handler.create(this , this.onSellComplete));
			manager.LayerManager.instace.addToLayer(dialog , manager.LayerManager.STAGE_DIALOG_LAYER , true , true , false , 0.6);
		}

		private onBtnAdd():void{
			manager.EventManager.instance.event(SellOnPlantFullDialog.ADD_CHICHEN , [this.type]);
		}

		private onSellComplete():void{
			manager.EventManager.instance.event(SellOnPlantFullDialog.SELL_CHICHEN , [this.chichenInfo]);
		}
	}
}