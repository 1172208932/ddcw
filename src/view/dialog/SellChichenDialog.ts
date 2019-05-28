/**
* name 
*/
module module {
	export class SellChichenDialog extends ui.game.SellChichenDialogUI {
		public static SELL_CHICHEN: string = "SellChichenDialog" + "SELL_CHICHEN";

		public chichenInfo: ChichenInfo = null;
		private txt_coin: FontClip;
		private type: number = 0;
		private txt_weight: FontClip = null;

		constructor(chichenInfo: ChichenInfo, type: number = 1) {
			super();
			this.type = 1;
			this.chichenInfo = chichenInfo;
			this.initView();


			Main.app.mwx.showBanner();

			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			this.btn_sell.on(laya.events.Event.CLICK, this, this.onBtnSell);
			this.btn_changename.on(laya.events.Event.CLICK, this, this.onBtnChangeName);
			this.btn_share.on(laya.events.Event.CLICK, this, this.onShare);
			RaceManager.instance.on(RaceManager.UPGRADE_CHICHEN, this, this.onUpdateChichen);
			manager.EventManager.instance.on(SellChichenDialog.SELL_CHICHEN, this, this.onSell);
		}

		private initView(): void {
			// this.img_logo.skin = manager.configManager.instance.CDN_BOOT + "gate/logo.png";
			this.img_logo.skin = "view/logo.png"

			if (RaceManager.instance.getPlantInfoById(this.chichenInfo.plantId).getChichenCount() == 1) {
				this.box_sell.visible = false;
				this.box_share.x = 222;
			}

			this.txt_weight = new FontClip("ui/num_c_", 285, 246, 100, 24, "left");
			this.addChild(this.txt_weight);
			this.txt_weight.text = this.chichenInfo.getWeithStr();

			this.img_chichen.skin = this.chichenInfo.config.getURl(6);
			this.img_plant.skin = RaceManager.instance.getCornerimg(this.chichenInfo.plantId);

			this.txt_coin = new FontClip("ui/num_a_", 20, 65, 140, 36, "right");
			this.txt_coin.scale(0.8, 0.8)
			this.box_sell.addChild(this.txt_coin);
			this.txt_coin.text = this.chichenInfo.money + "";

			this.txt_name.text = this.chichenInfo.name;

			if (this.chichenInfo.star >= 1) {
				this.img_star1.visible = true;
			}
			if (this.chichenInfo.star >= 2) {
				this.img_star2.visible = true;
			}
			if (this.chichenInfo.star >= 3) {
				this.img_star3.visible = true;
			}
		}

		private onUpdateChichen(info: ChichenInfo): void {
			if (info.id == this.chichenInfo.id) {
				this.txt_name.text = this.chichenInfo.name;
			}
		}

		private onBtnClose(): void {
			manager.SoundPlayMgr.instance.playButtonClick();

			this.destroy();

			if (this.type == 1) {
				var dialog: MyAtlasDialog = new MyAtlasDialog();
				manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
			}
		}

		private onBtnSell(): void {
			manager.SoundPlayMgr.instance.playButtonClick();

			var dialog: SellConfirmChichenDialog = new SellConfirmChichenDialog(this.chichenInfo.money);
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0.6);
		}

		private onSell(): void {
			this.btn_sell.disabled = true;

			RaceManager.instance.sellChichen(this.chichenInfo);

			this.onBtnClose();
		}

		private onBtnChangeName(): void {
			manager.SoundPlayMgr.instance.playButtonClick();

			var dialog: ChangenameDialog = new ChangenameDialog(this.chichenInfo);
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
		}

		public destroy(): void {
			Main.app.mwx.closeBanner();

			Laya.timer.clear(this, this.onBtnClose);
			RaceManager.instance.off(RaceManager.UPGRADE_CHICHEN, this, this.onUpdateChichen);
			manager.EventManager.instance.off(SellChichenDialog.SELL_CHICHEN, this, this.onSell);
			this.removeSelf();
			super.destroy();
		}

		/* 分享 */
		private onShare(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if (Main.app.shareIndex > 0) {
				return;
			}
			Main.app.shareIndex = 9;
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