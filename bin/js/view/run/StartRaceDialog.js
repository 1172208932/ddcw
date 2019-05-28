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
    var StartRaceDialog = /** @class */ (function (_super) {
        __extends(StartRaceDialog, _super);
        function StartRaceDialog() {
            var _this = _super.call(this) || this;
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            _this.btn_play.on(laya.events.Event.CLICK, _this, _this.onBtnPlay);
            Main.app.mwx.showBanner();
            if (module.RaceManager.instance.guidRun == 1) {
                var arrow = new module.GuidArrowView();
                arrow.setGuidRun2();
                _this.addChild(arrow);
                module.RaceManager.instance.event(module.RaceManager.CHANGE_GUID_RUN_COMPLETE);
            }
            return _this;
        }
        StartRaceDialog.prototype.onBtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        /* 点击开始按钮 */
        StartRaceDialog.prototype.onBtnPlay = function () {
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.RaceClick, { "success": 1 });
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.event(module.RaceManager.RightButtonVisiable, [false]);
            if (module.RaceManager.instance.userInfo.coin >= 20) {
                module.RaceManager.instance.addCoin(-20);
                manager.EventManager.instance.event(module.RaceView.GOTO_RUN);
            }
            else {
                if (Main.app.getReceiveFreeCoins() >= Main.app.mwx.ofCoinsLessParam["time"]) {
                    module.RaceManager.instance.showShop();
                }
                else {
                    Main.app.showCoinsLackingView();
                }
            }
            this.destroy();
        };
        StartRaceDialog.prototype.destroy = function () {
            Main.app.mwx.closeBanner();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return StartRaceDialog;
    }(ui.race.StartRaceDialogUI));
    module.StartRaceDialog = StartRaceDialog;
})(module || (module = {}));
//# sourceMappingURL=StartRaceDialog.js.map