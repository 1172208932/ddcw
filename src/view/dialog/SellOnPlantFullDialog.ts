/**
* name 
*/
module module{
	export class SellOnPlantFullDialog extends ui.game.SellOnPlantFullDialogUI{
		public static SELL_CHICHEN:string = "SellOnPlantFullDialog" + "SELL_CHICHEN";
		public static ADD_CHICHEN:string = "SellOnPlantFullDialog" + "ADD_CHICHEN";
		

		private chichenInfo:ChichenInfo = null;

		constructor(value:ChichenInfo){
			super();
			this.chichenInfo = value;
			this.initView();
		}

		private initView():void{
			this.sellList.renderHandler = new Laya.Handler(this, this.renderHandler);
			this.list1.renderHandler = new Laya.Handler(this , this.renderHandler1);
			this.list2.renderHandler = new Laya.Handler(this , this.renderHandler2);

			this.img_chichen.skin = this.chichenInfo.config.getURl(6);

			var isHaveCarden:Boolean = RaceManager.instance.isHaveCarden(this.chichenInfo.plantId);

			if(isHaveCarden == false){
				this.box_list1.visible = true;
				this.box_list2.visible = false;

				var plantInfo:PlantInfo = RaceManager.instance.getPlantInfoById(this.chichenInfo.plantId);

				var chichenInfoList:Array<ChichenInfo> = plantInfo.chichenInfoList;
				var lists:Array<any> = [];
				for(var i:number = 0 ; i < chichenInfoList.length ; i++){
					if(chichenInfoList[i].id != this.chichenInfo.id){
						lists.push(chichenInfoList[i]);
					}
				}

				this.sellList.array = lists;

				if(plantInfo.plantId == 1){

				}else{
					this.box_build.visible = false;
					this.box_keep.x = 200;
				}
			}else{
				this.box_list1.visible = false;
				this.box_list2.visible = true;
				this.box_build.visible = false;
				this.box_keep.x = 200;

				var plantId:number = this.chichenInfo.plantId > 100 ? this.chichenInfo.plantId - 100 : this.chichenInfo.plantId;
				plantInfo = RaceManager.instance.getPlantInfoById(plantId);
				var cardenInfo:PlantInfo = RaceManager.instance.getPlantInfoById(plantId + 100);

				var datas1:Array<any> = [];
				for(var i:number = 0 ; i < plantInfo.chichenInfoList.length ; i++){
					if(plantInfo.chichenInfoList[i].id != this.chichenInfo.id){
						datas1.push(plantInfo.chichenInfoList[i]);
					}
				}
				if(datas1.length < 10) datas1.unshift(null);
				this.list1.array = datas1;

				/////
				var datas2:Array<any> = [];
				for(var i:number = 0 ; i < cardenInfo.chichenInfoList.length ; i++){
					if(cardenInfo.chichenInfoList[i].id != this.chichenInfo.id){
						datas2.push(cardenInfo.chichenInfoList[i]);
					}
				}
				if(datas2.length < 10) datas2.unshift(null);
				this.list2.array = datas2;
			}

			
			this.btn_keep.on(laya.events.Event.CLICK , this , this.onClick);
			this.btn_build.on(laya.events.Event.CLICK , this , this.onBtnBuild);
			manager.EventManager.instance.on(SellOnPlantFullDialog.SELL_CHICHEN , this , this.onSellChichen);
			manager.EventManager.instance.on(SellOnPlantFullDialog.ADD_CHICHEN , this , this.onAddChichen);
		}

		/**
		 * 渲染回调
		 * @param cell 
		 * @param index 
		 */
		private renderHandler(cell:SellChichenItem, index:number):void{
			cell.showData(this.sellList.array[index]);
		}

		private renderHandler1(cell:SellChichenItem2, index:number):void{
			cell.showData(this.list1.array[index] , 1);
		}

		private renderHandler2(cell:SellChichenItem2, index:number):void{
			cell.showData(this.list2.array[index] , 2);
		}

		private onClick():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			
			RaceManager.instance.sellNewEgg();
			this.destroy();
		}

		private onSellChichen(chichenInfo:ChichenInfo):void{
			this.chichenInfo.plantId = chichenInfo.plantId;

			RaceManager.instance.sellChichen(chichenInfo);
			RaceManager.instance.addChichenToPlant(this.chichenInfo);
			this.destroy();
		}

		/* 添加宠物到其他地方 */
		private onAddChichen(type:number):void{
			var plantId:number = this.chichenInfo.plantId > 100 ? this.chichenInfo.plantId - 100 : this.chichenInfo.plantId;
			if (type == 1) {
				this.chichenInfo.plantId = plantId;
				RaceManager.instance.addChichenToPlant(this.chichenInfo);
			} else {
				this.chichenInfo.plantId = plantId + 100;
				RaceManager.instance.addChichenToPlant(this.chichenInfo);
			}
			this.destroy();
		}

		private onBtnBuild():void {
			manager.SoundPlayMgr.instance.playButtonClick();

			var dialog:BuildCardenDialog = new BuildCardenDialog(this.chichenInfo , Laya.Handler.create(this , this.onClose));
			manager.LayerManager.instace.addToLayer(dialog , manager.LayerManager.STAGE_DIALOG_LAYER , true , true , false , 0);
		}

		private onClose():void{
			this.destroy();
		}

		public destroy():void {
			manager.EventManager.instance.off(SellOnPlantFullDialog.ADD_CHICHEN, this, this.onAddChichen);
			manager.EventManager.instance.off(SellOnPlantFullDialog.SELL_CHICHEN, this, this.onSellChichen);
			this.removeSelf();
			super.destroy();
		}
	}
}