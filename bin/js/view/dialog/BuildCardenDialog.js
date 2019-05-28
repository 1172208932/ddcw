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
 * 扩建花园的界面
 */
var module;
(function (module) {
    var BuildCardenDialog = /** @class */ (function (_super) {
        __extends(BuildCardenDialog, _super);
        function BuildCardenDialog(chichenInfo, callBackFun) {
            var _this = _super.call(this) || this;
            _this.chichenInfo = null;
            _this.callBackFun = null;
            _this.chichenInfo = chichenInfo;
            _this.callBackFun = callBackFun;
            _this.img_log.skin = module.RaceManager.instance.getLogimg(_this.chichenInfo.plantId);
            _this.btn_build.on(laya.events.Event.CLICK, _this, _this.onBtnBuild);
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            return _this;
        }
        BuildCardenDialog.prototype.onBtnBuild = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.wing >= 20) {
                if (this.callBackFun != null) {
                    this.callBackFun.run();
                }
                module.RaceManager.instance.buildCarden(this.chichenInfo.plantId, this.chichenInfo);
                this.destroy();
            }
            else {
                Main.app.showMessage("您的羽毛不足");
                module.RaceManager.instance.showShop();
            }
        };
        BuildCardenDialog.prototype.onBtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        BuildCardenDialog.prototype.destroy = function () {
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return BuildCardenDialog;
    }(ui.game.BuildCardenDialogUI));
    module.BuildCardenDialog = BuildCardenDialog;
})(module || (module = {}));
//# sourceMappingURL=BuildCardenDialog.js.map