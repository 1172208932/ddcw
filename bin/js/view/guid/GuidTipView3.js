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
    var GuidTipView3 = /** @class */ (function (_super) {
        __extends(GuidTipView3, _super);
        function GuidTipView3() {
            var _this = _super.call(this) || this;
            module.RaceManager.instance.on(module.RaceManager.CLOSE_GUID_TIP3, _this, _this.onClose);
            return _this;
        }
        GuidTipView3.prototype.onClose = function () {
            this.destroy();
        };
        GuidTipView3.prototype.destroy = function () {
            module.RaceManager.instance.off(module.RaceManager.CLOSE_GUID_TIP3, this, this.onClose);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return GuidTipView3;
    }(ui.guid.GuidTipView3UI));
    module.GuidTipView3 = GuidTipView3;
})(module || (module = {}));
//# sourceMappingURL=GuidTipView3.js.map