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
    var UnlockGateView = /** @class */ (function (_super) {
        __extends(UnlockGateView, _super);
        function UnlockGateView() {
            var _this = _super.call(this) || this;
            _this.money = 0;
            _this.txt_wing = null;
            _this.txt_wing = new module.FontClip("ui/num_a_", 95, 80, 150, 36, "right");
            _this.txt_wing.scale(0.8, 0.8);
            _this.box.addChild(_this.txt_wing);
            _this.btn_unlock.on(laya.events.Event.CLICK, _this, _this.onUnLock);
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            return _this;
            // BridgeUtil.callAppMethod("showBanner");
        }
        UnlockGateView.prototype.start = function () {
            this.img_log.skin = module.RaceManager.instance.getLogimg(module.RaceManager.instance.selectPlantId);
            this.img_plant_name.skin = module.RaceManager.instance.getLogNameimg(module.RaceManager.instance.selectPlantId);
            this.money = module.RaceManager.instance.getPlantInfo().money;
            this.txt_wing.text = this.money + "";
        };
        UnlockGateView.prototype.onUnLock = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.wing >= this.money) {
                module.RaceManager.instance.unLockPlant(module.RaceManager.instance.selectPlantId);
                this.visible = false;
                // manager.EventManager.instance.event(BottomView.UNLOCK);
            }
            else {
                Main.app.showMessage("您的羽毛不足");
                if (Main.app.is_wx) {
                    if (Main.app.getReceiveFreeFeather() >= Number(Main.app.mwx.ofFeatherLessParam["time"])) {
                        module.RaceManager.instance.showShop();
                    }
                    else {
                        Main.app.showFeatherLackingView();
                    }
                }
            }
            // Main.app.mwx.closeBanner();
            BridgeUtil.callAppMethod("hideBanner");
        };
        UnlockGateView.prototype.onBtnClose = function () {
            BridgeUtil.callAppMethod("hideBanner");
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.gotoGate(module.RaceManager.instance.prevGateId);
        };
        return UnlockGateView;
    }(ui.game.UnlockGateViewUI));
    module.UnlockGateView = UnlockGateView;
})(module || (module = {}));
//# sourceMappingURL=UnlockGateView.js.map