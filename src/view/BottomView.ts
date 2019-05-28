/**
 * 底部菜单栏
 */
module module {
	export class BottomView extends ui.game.BottomViewUI {
		private gridItems: Array<EggGridItem> = new Array<EggGridItem>();
		public static UNLOCK: string = "BottomView" + "UNLOCK";             // 

		constructor() {
			super();
			this.initView();
			this.initEvents();
		}

		public initView(): void {
			for (var i: number = 1; i <= 6; i++) {
				var item: EggGridItem = this["grid" + i];
				item.index = i;
				this.gridItems.push(item);
			}
			// let arr = []
			var plantId: number = RaceManager.instance.selectPlantId
			//  > 100 ? RaceManager.instance.selectPlantId - 100 : RaceManager.instance.selectPlantId;
			var petNum = RaceManager.instance.userInfo.plantInfoDic.get(plantId).chichenInfoList
			// petNum.forEach(item => {
			// 	if (item) {
			// 		arr.push(item)
			// 	}
			// })
			this.img_ji2.skin = RaceManager.instance.getLogimg(plantId)
			this.img_gate_text.skin = RaceManager.instance.getLogNameimg(plantId)
			this.text_garden.text = petNum.length + '/10'
			if(petNum.length == 0){
				this.text_garden.text = '1/10'
			}
		}

		private initEvents(): void {
			// this.btn_run.on(laya.events.Event.CLICK, this, this.onBtnRunClick);
			this.btn_gate.on(laya.events.Event.CLICK, this, this.onBtnGateClick);
			RaceManager.instance.on(RaceManager.ADD_EGG, this, this.onAddEgg);
			manager.EventManager.instance.on(BottomView.UNLOCK, this, this.initView);
		}

		private removeEvents(): void {
			RaceManager.instance.off(RaceManager.ADD_EGG, this, this.onAddEgg);
			manager.EventManager.instance.off(BottomView.UNLOCK, this, this.initView);
		}

		private onAddEgg(): void {
			for (var i: number = 0; i < this.gridItems.length; i++) {
				this.gridItems[i].updateSlot();
			}
		}

		/* 点击去比赛按钮 */
		private onBtnRunClick(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if (RaceManager.instance.getPlantInfo().getChichenCount() > 0) {
				var dialog: StartRaceDialog = new StartRaceDialog();
				manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
				// 埋点统计
				Main.app.mwx.dataLog(dtLogConfig.RaceClick, { "success": 0 });
			}
		}

		private onBtnGateClick(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			manager.EventManager.instance.event("OPEN_SELECTGATEDIALOG");
			var dialog: SelectGateDialog = new SelectGateDialog();
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
		}



		public destroy(): void {
			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}
	}
}