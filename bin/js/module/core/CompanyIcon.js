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
    var CompanyIcon = /** @class */ (function (_super) {
        __extends(CompanyIcon, _super);
        function CompanyIcon() {
            var _this = _super.call(this) || this;
            _this.on(laya.events.Event.ADDED, _this, _this.onAdd);
            _this.txt_firist.visible = false;
            return _this;
        }
        CompanyIcon.prototype.onAdd = function () {
            Laya.loader.load([
                // {url:manager.configManager.instance.CDN_BOOT + "gate/splash-screen-ipad.png", type:laya.net.Loader.IMAGE},
                { url: "bg/GameOverMessage.png", type: laya.net.Loader.IMAGE },
                { url: manager.configManager.instance.CDN_BOOT + "gate/logo.png", type: laya.net.Loader.IMAGE }
            ], laya.utils.Handler.create(this, this.onLoadedFont));
        };
        CompanyIcon.prototype.onLoadedFont = function () {
            manager.EnterFrameManager.instance.setup();
            module.RaceManager.instance.setup();
            this.goLogin();
        };
        CompanyIcon.prototype.goLogin = function () {
            manager.ModuleController.instance.changeModule(manager.ModuleController.MN_GameView);
        };
        CompanyIcon.prototype.destroy = function () {
            this.off(laya.events.Event.ADDED, this, this.onAdd);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return CompanyIcon;
    }(ui.load.CompanyIconUI));
    module.CompanyIcon = CompanyIcon;
})(module || (module = {}));
//# sourceMappingURL=CompanyIcon.js.map