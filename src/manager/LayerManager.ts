/**
 * 层级管理器
 */
module manager {
	import Component = laya.ui.Component;
	import Sprite = laya.display.Sprite;
	export class LayerManager {
		private static _instance:LayerManager = null;

		private stageTopLayer:Sprite;
		private stageDialogLayer:Sprite;
		private stageDynamicLayer:Sprite;
		private stageBottomLayer:Sprite;
		
		public static STAGE_TOP_LAYER:number = 0;
		public static STAGE_DIALOG_LAYER:number = 1;
		public static STAGE_DYANMIC_LAYER:number = 2;
		public static STAGE_BOTTOM_LAYER:number = 3;

		constructor() {

		}

		public setup(stage:Laya.Stage):void{
			this.stageTopLayer = new Sprite();

			this.stageDialogLayer = new Sprite();
			// this.stageDialogLayer.width = stage.width;
			// this.stageDialogLayer.height = stage.height;

			this.stageDynamicLayer = new Sprite();

			this.stageBottomLayer = new Sprite();
			this.stageBottomLayer.width = stage.width;
			this.stageBottomLayer.height = stage.height;

			stage.addChild(this.stageBottomLayer);
			stage.addChild(this.stageDynamicLayer);
			stage.addChild(this.stageDialogLayer);
			stage.addChild(this.stageTopLayer);
		}

		public getLayerByType(type:number):Sprite {
			switch (type) {
				case LayerManager.STAGE_TOP_LAYER:
					return this.stageTopLayer;
				case LayerManager.STAGE_DIALOG_LAYER:
					return this.stageDialogLayer;
				case LayerManager.STAGE_DYANMIC_LAYER:
					return this.stageDynamicLayer;
				case LayerManager.STAGE_BOTTOM_LAYER:
					return this.stageBottomLayer;
			}
			return null;
		}

		public addToLayer(source:Sprite, type:number, center:boolean = false, blockBackgound:boolean = false, isBackClose:boolean = true, blockAp:number = 0.5):void {
			var container:Sprite = this.getLayerByType(type);
			if (center) {
				source.x = (Laya.stage.width - source.width) / 2;
				source.y = (Laya.stage.height - source.height) / 2;
			}
			if (blockBackgound) {
				// 为弹窗添加透明蒙版，点击蒙版则清除此弹窗。
				var bgview:module.BlockBackgound = new module.BlockBackgound(blockAp);
				bgview.sourceView = source;
				bgview.isBackClose = isBackClose;
				container.addChild(bgview);
			}
			container.addChild(source);
		}

		public clearLayer(type:number):void {
			manager.EventManager.instance.event(manager.EventManager.REMOVESOURCE_FROM_BLOCKBACKGROUND);
			var container:Sprite = this.getLayerByType(type);
			container.destroyChildren();
		}

		public static get instace():LayerManager{
			if(this._instance == null){
				this._instance = new LayerManager();
			}
			return this._instance;
		}
	}
}