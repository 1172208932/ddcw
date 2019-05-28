/**
* name 
*/
module module {
	export class PlantAtlasDialog extends ui.game.PlantAtlasDialogUI {
		private itemList: Array<PlantAltasItem> = [];
		private curPlantId: number = 0;
		private addConfigId: number = 0;

		constructor(plantId: number = 0, configId: number = 0) {
			super();
			this.curPlantId = plantId;
			this.addConfigId = configId;
			
			this.initView();
			this.initEvents();
		}

		private initView(): void {
			for (var i: number = 1; i <= 20; i++) {
				var item: PlantAltasItem = this["item" + i];
				item.index = i - 1;
				this.itemList.push(item);
			}

			if (this.curPlantId == 0) {
				this.showAtlas(RaceManager.instance.selectPlantId);
			} else {
				this.showAtlas(this.curPlantId);
			}
		}

		private initEvents(): void {
			this.on(laya.events.Event.ADDED, this, this.onAddss);
			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnCloseClick);
			this.img_left.on(laya.events.Event.CLICK, this, this.onLeft);
			this.img_right.on(laya.events.Event.CLICK, this, this.onRight);
			this.btn_chichen.on(laya.events.Event.CLICK, this, this.onBtnChichenClick);
		}

		private removeEvents(): void {

		}

		private onAddss(): void {
			if (this.addConfigId > 0) {
				var plantInfo: PlantInfo = RaceManager.instance.getPlantInfoById(this.curPlantId);
				var index: number = plantInfo.chichenIdList.indexOf(this.addConfigId);
				this.addChild(this.itemList[index]);
				this.itemList[index].showAddConfigID(this.addConfigId);
			}
		}

		private onBtnCloseClick(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		private onLeft(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.curPlantId -= 1;
			if (this.curPlantId <= 0) {
				this.curPlantId = 8;
			}
			this.showAtlas(this.curPlantId);
		}

		private onRight(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			this.curPlantId += 1;
			if (this.curPlantId > 8) {
				this.curPlantId = 1;
			}
			this.showAtlas(this.curPlantId);
		}

		private showAtlas(plantId: number): void {
			this.curPlantId = plantId > 100 ? plantId - 100 : plantId;

			this.img_log.skin = RaceManager.instance.getLogimg(this.curPlantId);
			this.img_plant_name.skin = RaceManager.instance.getLogNameimg(this.curPlantId);
			console.log("--> = ", this.itemList);
			for (var i: number = 0; i < this.itemList.length; i++) {
				this.itemList[i].showChichen(this.curPlantId);
			}
		}

		private onBtnChichenClick(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var dialog: MyAtlasDialog = new MyAtlasDialog();
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);

			this.destroy();
		}

		public destroy(): void {

			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}
	}
}