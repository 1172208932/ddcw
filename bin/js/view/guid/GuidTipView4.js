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
    var GuidTipView4 = /** @class */ (function (_super) {
        __extends(GuidTipView4, _super);
        function GuidTipView4() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.showTip();
            module.RaceManager.instance.on(module.RaceManager.CLOSE_GUID_TIP4, _this, _this.onClose);
            manager.EventManager.instance.on(GuidTipView4.CHANGE_TIP4, _this, _this.onChange);
            return _this;
        }
        GuidTipView4.prototype.onChange = function () {
            this.index++;
            this.showTip();
        };
        GuidTipView4.prototype.showTip = function () {
            this.box1.visible = this.box2.visible = false;
            switch (this.index) {
                case 0:
                    this.box1.visible = true;
                    break;
                case 1:
                    this.box2.visible = true;
                    break;
            }
        };
        GuidTipView4.prototype.onClose = function () {
            this.destroy();
        };
        GuidTipView4.prototype.destroy = function () {
            module.RaceManager.instance.off(module.RaceManager.CLOSE_GUID_TIP4, this, this.onClose);
            manager.EventManager.instance.off(GuidTipView4.CHANGE_TIP4, this, this.onChange);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        GuidTipView4.CHANGE_TIP4 = "GuidTipView4" + "CHANGE_TIP4";
        return GuidTipView4;
    }(ui.guid.GuidTipView4UI));
    module.GuidTipView4 = GuidTipView4;
})(module || (module = {}));
//# sourceMappingURL=GuidTipView4.js.map