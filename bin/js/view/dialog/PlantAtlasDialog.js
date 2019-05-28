var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var module;
(function (module) {
    var PlantAtlasDialog = /** @class */ (function (_super) {
        __extends(PlantAtlasDialog, _super);
        function PlantAtlasDialog(plantId, configId) {
            if (plantId === void 0) { plantId = 0; }
            if (configId === void 0) { configId = 0; }
            var _this = _super.call(this) || this;
            _this.itemList = [];
            _this.curPlantId = 0;
            _this.addConfigId = 0;
            _this.curPlantId = plantId;
            _this.addConfigId = configId;
            _this.initView();
            _this.initEvents();
            return _this;
        }
        PlantAtlasDialog.prototype.initView = function () {
            for (var i = 1; i <= 20; i++) {
                var item = this["item" + i];
                item.index = i - 1;
                this.itemList.push(item);
            }
            if (this.curPlantId == 0) {
                this.showAtlas(module.RaceManager.instance.selectPlantId);
            }
            else {
                this.showAtlas(this.curPlantId);
            }
        };
        PlantAtlasDialog.prototype.initEvents = function () {
            this.on(laya.events.Event.ADDED, this, this.onAddss);
            this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnCloseClick);
            this.img_left.on(laya.events.Event.CLICK, this, this.onLeft);
            this.img_right.on(laya.events.Event.CLICK, this, this.onRight);
            this.btn_chichen.on(laya.events.Event.CLICK, this, this.onBtnChichenClick);
        };
        PlantAtlasDialog.prototype.removeEvents = function () {
        };
        PlantAtlasDialog.prototype.onAddss = function () {
            if (this.addConfigId > 0) {
                var plantInfo = module.RaceManager.instance.getPlantInfoById(this.curPlantId);
                var index = plantInfo.chichenIdList.indexOf(this.addConfigId);
                this.addChild(this.itemList[index]);
                this.itemList[index].showAddConfigID(this.addConfigId);
            }
        };
        PlantAtlasDialog.prototype.onBtnCloseClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        PlantAtlasDialog.prototype.onLeft = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.curPlantId -= 1;
            if (this.curPlantId <= 0) {
                this.curPlantId = 8;
            }
            this.showAtlas(this.curPlantId);
        };
        PlantAtlasDialog.prototype.onRight = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.curPlantId += 1;
            if (this.curPlantId > 8) {
                this.curPlantId = 1;
            }
            this.showAtlas(this.curPlantId);
        };
        PlantAtlasDialog.prototype.showAtlas = function (plantId) {
            this.curPlantId = plantId > 100 ? plantId - 100 : plantId;
            this.img_log.skin = module.RaceManager.instance.getLogimg(this.curPlantId);
            this.img_plant_name.skin = module.RaceManager.instance.getLogNameimg(this.curPlantId);
            console.log("--> = ", this.itemList);
            for (var i = 0; i < this.itemList.length; i++) {
                this.itemList[i].showChichen(this.curPlantId);
            }
        };
        PlantAtlasDialog.prototype.onBtnChichenClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.MyAtlasDialog();
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
            this.destroy();
        };
        PlantAtlasDialog.prototype.destroy = function () {
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return PlantAtlasDialog;
    }(ui.game.PlantAtlasDialogUI));
    module.PlantAtlasDialog = PlantAtlasDialog;
})(module || (module = {}));
//# sourceMappingURL=PlantAtlasDialog.js.map