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
    var DayBuyDialog = /** @class */ (function (_super) {
        __extends(DayBuyDialog, _super);
        function DayBuyDialog() {
            var _this = _super.call(this) || this;
            _this.updateShow();
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onClose);
            _this.btn_buy.on(laya.events.Event.CLICK, _this, _this.onBtnBuy);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_USER_DATA, _this, _this.updateShow);
            return _this;
        }
        DayBuyDialog.prototype.updateShow = function () {
            var dayTime = module.RaceManager.instance.userInfo.dayTime;
            var prevDate = new Date(dayTime);
            var nowDate = new Date();
            if (prevDate.getMonth() < nowDate.getMonth()) {
                this.box_buy.disabled = false;
            }
            else {
                if (prevDate.getMonth() < nowDate.getMonth()) {
                    this.box_buy.disabled = false;
                }
                else {
                    this.box_buy.disabled = true;
                }
            }
        };
        DayBuyDialog.prototype.onBtnBuy = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.userInfo.setDayTime(new Date().getTime());
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(325, 255)), 2, 300]);
        };
        DayBuyDialog.prototype.onClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        DayBuyDialog.prototype.destroy = function () {
            module.RaceManager.instance.off(module.RaceManager.CHANGE_USER_DATA, this, this.updateShow);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return DayBuyDialog;
    }(ui.game.DayBuyDialogUI));
    module.DayBuyDialog = DayBuyDialog;
})(module || (module = {}));
//# sourceMappingURL=DayBuyDialog.js.map