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
    var GuidTipView2 = /** @class */ (function (_super) {
        __extends(GuidTipView2, _super);
        function GuidTipView2() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.showTip();
            manager.EventManager.instance.on(module.RaceView.CLICK_CHICHEN, _this, _this.onClickChichen);
            return _this;
        }
        GuidTipView2.prototype.onClickChichen = function () {
            this.ani1.play(0, false);
            this.index++;
            this.showTip();
            if (this.index >= 2) {
                module.RaceManager.instance.gotoGuidStep(3);
                this.destroy();
            }
        };
        GuidTipView2.prototype.showTip = function () {
            this.img_1.visible = this.img_2.visible = false;
            switch (this.index) {
                case 0:
                    this.img_1.visible = true;
                    break;
                case 1:
                    this.img_2.visible = true;
                    break;
            }
        };
        GuidTipView2.prototype.destroy = function () {
            manager.EventManager.instance.off(module.RaceView.CLICK_CHICHEN, this, this.onClickChichen);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return GuidTipView2;
    }(ui.guid.GuidTipView2UI));
    module.GuidTipView2 = GuidTipView2;
})(module || (module = {}));
//# sourceMappingURL=GuidTipView2.js.map