/**
* name 
*/
module module{
	export class NoSlotNewEggDialog extends ui.game.NoSlotNewEggDialogUI{
		private plantId:number = 0;

		constructor(plantId:number){
			super();
			this.plantId = plantId;
			this.img_egg.skin = "ui/egg_"+this.plantId+".png";
			this.btn_sell.on(laya.events.Event.CLICK , this , this.onBtnSell);
			this.btn_hatch.on(laya.events.Event.CLICK , this , this.onBtnHatch);
			this.btn_unlock.on(laya.events.Event.CLICK , this , this.onBtnUnlock);
		}

		private onBtnSell():void{
			manager.SoundPlayMgr.instance.playButtonClick();

			var dialog:ConfirmDialog = new ConfirmDialog(1 , null , Laya.Handler.create(this , this.onSellComplete));
			manager.LayerManager.instace.addToLayer(dialog , manager.LayerManager.STAGE_DIALOG_LAYER , true , true , false , 0.6);
		}

		private onBtnHatch():void{
			manager.SoundPlayMgr.instance.playButtonClick();			

			if(RaceManager.instance.userInfo.wing >= 1){
				RaceManager.instance.resetPlantExp(this.plantId);
				RaceManager.instance.fastOpenNewEgg(this.plantId);

				this.destroy();
			}else{
				Main.app.showMessage("您的羽毛不足");
				RaceManager.instance.showShop();
			}
		}

		private onBtnUnlock():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			var index:number = RaceManager.instance.userInfo.findCloseSlot();
			if (index > 0){
				var dialog:UnlockEggSlotDialog = new UnlockEggSlotDialog(index , Laya.Handler.create(this, this.openSlotComplete));
				manager.LayerManager.instace.addToLayer(dialog , manager.LayerManager.STAGE_DIALOG_LAYER, true, true, true, 0.6);
			}
		}

		private openSlotComplete():void{
			RaceManager.instance.resetPlantExp(this.plantId);
			RaceManager.instance.addEgg(this.plantId);
			this.destroy();
		}

		private onSellComplete():void{
			RaceManager.instance.resetPlantExp(this.plantId);
			RaceManager.instance.sellNewEgg();
			this.destroy();
		}

		public destroy():void{
			this.removeSelf();
			super.destroy();
		}
	}
}