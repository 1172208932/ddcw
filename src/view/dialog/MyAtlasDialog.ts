/**
* name 
*/
module module{
	export class MyAtlasDialog extends ui.game.MyAtlasDialogUI{
		public static SELECT_CHICHEN:string = "MyAtlasDialog" + "SELECT_CHICHEN"
		private curPlantId:number = 0;
		// public static PET_NUM:string = "MyAtlasDialog"+"PET_NUM"

		constructor(){
			super();
			this.initView();
			this.initEvents();
			this.initPetNum()
		}
		public initPetNum():void{
			let newArr = []
			let arr = []
			for (let i = 1; i < 9; i++) {
				newArr = [...newArr, ...RaceManager.instance.userInfo.plantInfoDic.get(i).chichenInfoList]
			}

			newArr.forEach(item => {
				if (item) {
					arr.push(item)
				}
			})
			this.num_pet.text = arr.length + '/160'
		}
		private initView():void{
			this.list.renderHandler = new Laya.Handler(this, this.renderHandler);
			var plantId:number = RaceManager.instance.selectPlantId > 100 ? RaceManager.instance.selectPlantId - 100 : RaceManager.instance.selectPlantId;
			this.showAtlas(plantId);
		}

		private initEvents():void{
			this.btn_close.on(laya.events.Event.CLICK , this , this.onBtnCloseClick);
			this.img_left.on(laya.events.Event.CLICK , this , this.onLeft);
			this.img_right.on(laya.events.Event.CLICK , this , this.onRight);
			this.btn_shu.on(laya.events.Event.CLICK , this , this.onBtnShuClick);
			manager.EventManager.instance.on(MyAtlasDialog.SELECT_CHICHEN , this , this.onItemClick);

			// manager.EventManager.instance.on(MyAtlasDialog.PET_NUM, this, this.initPetNum);
		}

		private removeEvents():void{
			manager.EventManager.instance.off(MyAtlasDialog.SELECT_CHICHEN , this , this.onItemClick);
			// manager.EventManager.instance.off(MyAtlasDialog.PET_NUM, this, this.initPetNum);
			
		}

		/**
		 * 渲染回调
		 * @param cell 
		 * @param index 
		 */
		private renderHandler(cell:MyAtlasItem, index:number):void{
			cell.showChichen(this.list.array[index]);
		}


		private onBtnCloseClick():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		private onLeft():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			this.curPlantId -= 1;
			if(this.curPlantId <= 0){
				this.curPlantId = 8;
			}
			this.showAtlas(this.curPlantId);
		}

		private onRight():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			this.curPlantId += 1;
			if(this.curPlantId > 8){
				this.curPlantId = 1;
			}
			this.showAtlas(this.curPlantId);
		}

		private showAtlas(plantId:number):void{
			this.curPlantId = plantId;

			this.img_log.skin = RaceManager.instance.getLogimg(plantId);
			this.img_plant_name.skin = RaceManager.instance.getLogNameimg(plantId);

			var plantInfo:PlantInfo = RaceManager.instance.getPlantInfoById(this.curPlantId);
			var list:Array<ChichenInfo> = [];
			for(var i:number = 0 ; i < plantInfo.chichenInfoList.length ; i++){
				list.push(plantInfo.chichenInfoList[i]);
			}

			plantInfo = RaceManager.instance.getPlantInfoById(this.curPlantId + 100);
			if(plantInfo != null){
				for(var i:number = 0 ; i < plantInfo.chichenInfoList.length ; i++){
					list.push(plantInfo.chichenInfoList[i]);
				}
			}

			for(var i:number = list.length ; i < 10 ; i++){
				list.push(null);
			}

			this.list.array = list;
		}

		private onBtnShuClick():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			
			var dialog:PlantAtlasDialog = new PlantAtlasDialog();
			manager.LayerManager.instace.addToLayer(dialog , manager.LayerManager.STAGE_DIALOG_LAYER , true , true , false , 0);

			this.destroy();
		}

		private onItemClick(chichenInfo:ChichenInfo):void{
			if(chichenInfo != null){
				var dialog:SellChichenDialog = new SellChichenDialog(chichenInfo , 1);
				manager.LayerManager.instace.addToLayer(dialog , manager.LayerManager.STAGE_DIALOG_LAYER , true , true , false , 0.2);

				this.destroy();
			}
		}

		public destroy():void{
			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}
	}
}