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
    var UnlockEggSlotDialog = /** @class */ (function (_super) {
        __extends(UnlockEggSlotDialog, _super);
        function UnlockEggSlotDialog(index, callBackFun) {
            if (callBackFun === void 0) { callBackFun = null; }
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.money = 0;
            _this.txt_wing = null;
            _this.callBackFun = null;
            _this.index = index;
            _this.callBackFun = callBackFun;
            _this.money = module.RaceManager.instance.soltMoneys[module.RaceManager.instance.userInfo.openSlotIndexs.length + 1];
            _this.txt_wing = new module.FontClip("ui/num_a_", 148, 525, 150, 36, "right");
            _this.txt_wing.scale(0.8, 0.8);
            _this.addChild(_this.txt_wing);
            _this.txt_wing.text = _this.money + "";
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            _this.btn_unlock.on(laya.events.Event.CLICK, _this, _this.onBtnUnlock);
            // Main.app.mwx.showBanner();
            BridgeUtil.callAppMethod("showBanner");
            return _this;
        }
        UnlockEggSlotDialog.prototype.onBtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        /* 点击羽毛开蛋槽按钮 */
        UnlockEggSlotDialog.prototype.onBtnUnlock = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.wing >= this.money) {
                module.RaceManager.instance.unlockEggSlot(this.index, this.money);
                this.destroy();
                if (this.callBackFun != null) {
                    this.callBackFun.run();
                }
            }
            else {
                Main.app.showMessage("您的羽毛不足");
                if (Main.app.getReceiveFreeFeather() >= Number(Main.app.mwx.ofFeatherLessParam["time"])) {
                    module.RaceManager.instance.showShop();
                }
                else {
                    Main.app.showFeatherLackingView();
                }
            }
        };
        UnlockEggSlotDialog.prototype.destroy = function () {
            // Main.app.mwx.closeBanner();
            BridgeUtil.callAppMethod("hideBanner");
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return UnlockEggSlotDialog;
    }(ui.game.UnlockEggSlotDialogUI));
    module.UnlockEggSlotDialog = UnlockEggSlotDialog;
})(module || (module = {}));
//# sourceMappingURL=UnlockEggSlotDialog.js.map