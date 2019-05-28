/**
 * 层级管理器
 */
var manager;
(function (manager) {
    var Sprite = laya.display.Sprite;
    var LayerManager = /** @class */ (function () {
        function LayerManager() {
        }
        LayerManager.prototype.setup = function (stage) {
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
        };
        LayerManager.prototype.getLayerByType = function (type) {
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
        };
        LayerManager.prototype.addToLayer = function (source, type, center, blockBackgound, isBackClose, blockAp) {
            if (center === void 0) { center = false; }
            if (blockBackgound === void 0) { blockBackgound = false; }
            if (isBackClose === void 0) { isBackClose = true; }
            if (blockAp === void 0) { blockAp = 0.5; }
            var container = this.getLayerByType(type);
            if (center) {
                source.x = (Laya.stage.width - source.width) / 2;
                source.y = (Laya.stage.height - source.height) / 2;
            }
            if (blockBackgound) {
                // 为弹窗添加透明蒙版，点击蒙版则清除此弹窗。
                var bgview = new module.BlockBackgound(blockAp);
                bgview.sourceView = source;
                bgview.isBackClose = isBackClose;
                container.addChild(bgview);
            }
            container.addChild(source);
        };
        LayerManager.prototype.clearLayer = function (type) {
            manager.EventManager.instance.event(manager.EventManager.REMOVESOURCE_FROM_BLOCKBACKGROUND);
            var container = this.getLayerByType(type);
            container.destroyChildren();
        };
        Object.defineProperty(LayerManager, "instace", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new LayerManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        LayerManager._instance = null;
        LayerManager.STAGE_TOP_LAYER = 0;
        LayerManager.STAGE_DIALOG_LAYER = 1;
        LayerManager.STAGE_DYANMIC_LAYER = 2;
        LayerManager.STAGE_BOTTOM_LAYER = 3;
        return LayerManager;
    }());
    manager.LayerManager = LayerManager;
})(manager || (manager = {}));
//# sourceMappingURL=LayerManager.js.map