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
    var SellConfirmChichenDialog = /** @class */ (function (_super) {
        __extends(SellConfirmChichenDialog, _super);
        function SellConfirmChichenDialog(coin) {
            var _this = _super.call(this) || this;
            var txt_coin = new module.FontClip("ui/num_a_", 295, 255, 150, 36, "left");
            txt_coin.scale(0.8, 0.8);
            _this.addChild(txt_coin);
            txt_coin.text = "" + coin;
            _this.btn_cancel.on(laya.events.Event.CLICK, _this, _this.onBtnCancel);
            _this.btn_ok.on(laya.events.Event.CLICK, _this, _this.onBtnOk);
            return _this;
        }
        SellConfirmChichenDialog.prototype.onBtnCancel = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        SellConfirmChichenDialog.prototype.onBtnOk = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            manager.EventManager.instance.event(module.SellChichenDialog.SELL_CHICHEN);
            manager.EventManager.instance.event(module.BottomView.UNLOCK);
            this.destroy();
        };
        SellConfirmChichenDialog.prototype.destroy = function () {
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return SellConfirmChichenDialog;
    }(ui.game.SellConfirmChichenDialogUI));
    module.SellConfirmChichenDialog = SellConfirmChichenDialog;
})(module || (module = {}));
//# sourceMappingURL=SellConfirmChichenDialog.js.map