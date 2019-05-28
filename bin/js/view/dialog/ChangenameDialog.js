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
    var ChangenameDialog = /** @class */ (function (_super) {
        __extends(ChangenameDialog, _super);
        function ChangenameDialog(info) {
            var _this = _super.call(this) || this;
            _this.chichenInfo = null;
            _this.chichenInfo = info;
            _this.input_name.textField.text = _this.chichenInfo.name;
            _this.btn_cancel.on(laya.events.Event.CLICK, _this, _this.onBtnCancelClick);
            _this.btn_ok.on(laya.events.Event.CLICK, _this, _this.onBtnOkClick);
            return _this;
        }
        ChangenameDialog.prototype.onBtnCancelClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        ChangenameDialog.prototype.onBtnOkClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.changeName(this.chichenInfo, this.input_name.textField.text);
            this.destroy();
        };
        ChangenameDialog.prototype.destroy = function () {
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return ChangenameDialog;
    }(ui.game.ChangenameDialogUI));
    module.ChangenameDialog = ChangenameDialog;
})(module || (module = {}));
//# sourceMappingURL=ChangenameDialog.js.map