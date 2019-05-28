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
    var ConfirmDialog = /** @class */ (function (_super) {
        __extends(ConfirmDialog, _super);
        function ConfirmDialog(type, cancelFun, confirmFun) {
            if (cancelFun === void 0) { cancelFun = null; }
            if (confirmFun === void 0) { confirmFun = null; }
            var _this = _super.call(this) || this;
            _this.type = 0;
            _this.cancelFun = null;
            _this.confirmFun = null;
            _this.type = type;
            _this.cancelFun = cancelFun;
            _this.confirmFun = confirmFun;
            if (_this.type == 1) {
                _this.box_1.visible = true;
            }
            else if (_this.type == 2) {
                _this.box_2.visible = true;
            }
            else if (_this.type == 3) {
                _this.box_3.visible = true;
            }
            _this.btn_cancel.on(laya.events.Event.CLICK, _this, _this.onBtncancelClick);
            _this.btn_ok.on(laya.events.Event.CLICK, _this, _this.onBtnConfirmClick);
            return _this;
        }
        ConfirmDialog.prototype.onBtncancelClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (this.cancelFun != null) {
                this.cancelFun.run();
            }
            this.destroy();
        };
        ConfirmDialog.prototype.onBtnConfirmClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (this.confirmFun != null) {
                this.confirmFun.run();
            }
            this.destroy();
        };
        ConfirmDialog.prototype.destroy = function () {
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return ConfirmDialog;
    }(ui.game.ConfirmDialogUI));
    module.ConfirmDialog = ConfirmDialog;
})(module || (module = {}));
//# sourceMappingURL=ConfirmDialog.js.map