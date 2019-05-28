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
    var NoSlotNewEggDialog = /** @class */ (function (_super) {
        __extends(NoSlotNewEggDialog, _super);
        function NoSlotNewEggDialog(plantId) {
            var _this = _super.call(this) || this;
            _this.plantId = 0;
            _this.plantId = plantId;
            _this.img_egg.skin = "ui/egg_" + _this.plantId + ".png";
            _this.btn_sell.on(laya.events.Event.CLICK, _this, _this.onBtnSell);
            _this.btn_hatch.on(laya.events.Event.CLICK, _this, _this.onBtnHatch);
            _this.btn_unlock.on(laya.events.Event.CLICK, _this, _this.onBtnUnlock);
            return _this;
        }
        NoSlotNewEggDialog.prototype.onBtnSell = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.ConfirmDialog(1, null, Laya.Handler.create(this, this.onSellComplete));
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0.6);
        };
        NoSlotNewEggDialog.prototype.onBtnHatch = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.wing >= 1) {
                module.RaceManager.instance.resetPlantExp(this.plantId);
                module.RaceManager.instance.fastOpenNewEgg(this.plantId);
                this.destroy();
            }
            else {
                Main.app.showMessage("您的羽毛不足");
                module.RaceManager.instance.showShop();
            }
        };
        NoSlotNewEggDialog.prototype.onBtnUnlock = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var index = module.RaceManager.instance.userInfo.findCloseSlot();
            if (index > 0) {
                var dialog = new module.UnlockEggSlotDialog(index, Laya.Handler.create(this, this.openSlotComplete));
                manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, true, 0.6);
            }
        };
        NoSlotNewEggDialog.prototype.openSlotComplete = function () {
            module.RaceManager.instance.resetPlantExp(this.plantId);
            module.RaceManager.instance.addEgg(this.plantId);
            this.destroy();
        };
        NoSlotNewEggDialog.prototype.onSellComplete = function () {
            module.RaceManager.instance.resetPlantExp(this.plantId);
            module.RaceManager.instance.sellNewEgg();
            this.destroy();
        };
        NoSlotNewEggDialog.prototype.destroy = function () {
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return NoSlotNewEggDialog;
    }(ui.game.NoSlotNewEggDialogUI));
    module.NoSlotNewEggDialog = NoSlotNewEggDialog;
})(module || (module = {}));
//# sourceMappingURL=NoSlotNewEggDialog.js.map