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
    var GlmmeNewEggDialog = /** @class */ (function (_super) {
        __extends(GlmmeNewEggDialog, _super);
        function GlmmeNewEggDialog(plantId) {
            var _this = _super.call(this) || this;
            _this.plantId = 0;
            // Main.app.mwx.showBanner();
            BridgeUtil.callAppMethod("showBanner");
            _this.plantId = plantId;
            _this.img_egg.skin = "ui/egg_" + _this.plantId + ".png";
            _this.btn_ok.on(laya.events.Event.CLICK, _this, _this.onBtnOk);
            return _this;
        }
        GlmmeNewEggDialog.prototype.onBtnOk = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.resetPlantExp(this.plantId);
            module.RaceManager.instance.addEgg(this.plantId);
            this.destroy();
        };
        GlmmeNewEggDialog.prototype.destroy = function () {
            BridgeUtil.callAppMethod("hideBanner");
            // Main.app.mwx.closeBanner();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return GlmmeNewEggDialog;
    }(ui.game.GlmmeNewEggDialogUI));
    module.GlmmeNewEggDialog = GlmmeNewEggDialog;
})(module || (module = {}));
//# sourceMappingURL=GlmmeNewEggDialog.js.map