/**
* name 
*/
module module {
	export class OpenChichenDialog extends ui.game.OpenChichenDialogUI {
		private chichenInfo: ChichenInfo = null;
		private txt_weight: FontClip = null;

		constructor(chichenInfo: ChichenInfo) {
			super();
			this.chichenInfo = chichenInfo;
			this.initView();

			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			this.btn_changename.on(laya.events.Event.CLICK, this, this.onBtnChangeName);
			if (!Main.app.mwx.mFHKeep) {
				this.btn_share.visible = false
				this.lose1.visible = false
				this.lose2.visible = false
				this.lose3.visible = false
				this.lose4.visible = false
				this.lose5.visible = false
			} else {
				this.btn_share.visible = true;
				this.btn_share.on(laya.events.Event.CLICK, this, this.onshare);
			}
			RaceManager.instance.on(RaceManager.UPGRADE_CHICHEN, this, this.onUpdateChichen);
			RaceManager.instance.on(RaceManager.CLOSEEGGOPENING, this, this.onBtnClose)
		}

		private initView(): void {
			BridgeUtil.callAppMethod("showBanner");
			// this.img_logo.skin = manager.configManager.instance.CDN_BOOT + "gate/logo.png";
			this.img_logo.skin = "view/logo.png"
			this.img_chichen.skin = this.chichenInfo.config.getURl(6);
			this.img_plant.skin = RaceManager.instance.getCornerimg(this.chichenInfo.plantId);
			this.txt_name.text = this.chichenInfo.name;

			this.txt_weight = new FontClip("ui/num_c_", 360, 277, 100, 24, "left");
			this.addChild(this.txt_weight);
			this.txt_weight.text = this.chichenInfo.getWeithStr();
		}

		private onUpdateChichen(info: ChichenInfo): void {
			if (info.id == this.chichenInfo.id) {
				this.txt_name.text = this.chichenInfo.name;
			}
		}

		private onBtnClose(): void {
			manager.SoundPlayMgr.instance.playButtonClick();

			var isHaveCarden: Boolean = RaceManager.instance.isHaveCarden(this.chichenInfo.plantId);

			if (isHaveCarden == false) {
				if (RaceManager.instance.getPlantInfoById(this.chichenInfo.plantId).getChichenCount() < 10) {
					RaceManager.instance.addChichenToPlant(this.chichenInfo);
				} else {
					var dialog: SellOnPlantFullDialog = new SellOnPlantFullDialog(this.chichenInfo);
					manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
				}
			} else {
				var selectPlantId: number = RaceManager.instance.selectPlantId;

				var plantId: number = this.chichenInfo.plantId > 100 ? this.chichenInfo.plantId - 100 : this.chichenInfo.plantId;
				var plantInfo: PlantInfo = RaceManager.instance.getPlantInfoById(plantId);
				var cardenInfo: PlantInfo = RaceManager.instance.getPlantInfoById(plantId + 100);

				if (selectPlantId == plantInfo.plantId) {//当前显示的是森林
					if (plantInfo.getChichenCount() >= 10) { //森林满了
						var dialog: SellOnPlantFullDialog = new SellOnPlantFullDialog(this.chichenInfo);
						manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
					} else {
						this.chichenInfo.plantId = plantId;
						RaceManager.instance.addChichenToPlant(this.chichenInfo);
					}
				} else if (selectPlantId == cardenInfo.plantId) {//当前显示的花园
					if (cardenInfo.getChichenCount() >= 10) { //花园满了
						var dialog: SellOnPlantFullDialog = new SellOnPlantFullDialog(this.chichenInfo);
						manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
					} else {
						this.chichenInfo.plantId = plantId + 100;
						RaceManager.instance.addChichenToPlant(this.chichenInfo);
					}
				} else {
					if (plantInfo.getChichenCount() >= 10) { //森林满了
						var dialog: SellOnPlantFullDialog = new SellOnPlantFullDialog(this.chichenInfo);
						manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
					} else {
						this.chichenInfo.plantId = plantId;
						RaceManager.instance.addChichenToPlant(this.chichenInfo);
					}
				}
			}

			this.destroy();
		}

		private onBtnChangeName(): void {
			manager.SoundPlayMgr.instance.playButtonClick();

			var dialog: ChangenameDialog = new ChangenameDialog(this.chichenInfo);
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
		}

		public destroy(): void {
			BridgeUtil.callAppMethod("hideBanner");
			RaceManager.instance.off(RaceManager.CLOSEEGGOPENING, this, this.onBtnClose);
			RaceManager.instance.off(RaceManager.UPGRADE_CHICHEN, this, this.onUpdateChichen);
			this.removeSelf();
			super.destroy();
		}

		public onshare() {
			if (Main.app.shareIndex > 0) {
				return;
			}
			// 埋点统计
			Main.app.mwx.dataLog(dtLogConfig.GetNewEggShare, { "success": 0 });
			Main.app.shareIndex = 12;
			Main.app.shareTimestamp = new Date().getTime();

			let title, imageUrl, shjson;
			Main.app.mwx.shareurl.forEach((item) => {
				if (item.id == Main.app.shareIndex) {
					shjson = item;
					title = item.title;
					imageUrl = item.url;
				}
			});
			wx.shareAppMessage({
				title: title,
				imageUrl: imageUrl,
				query: "uid=" + Main.app.mwx.mUID + `&surl=${Main.app.shareIndex}`
			});
		}
	}
}