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
    var GuidTipView5 = /** @class */ (function (_super) {
        __extends(GuidTipView5, _super);
        function GuidTipView5(index) {
            if (index === void 0) { index = 0; }
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.index = index;
            _this.pos(375, 235 + module.RaceView.TOP);
            _this.showTip();
            _this.on(laya.events.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        GuidTipView5.prototype.onClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.ani1.play(0, false);
            this.index++;
            this.showTip();
            if (this.index >= 2) {
                this.destroy();
            }
        };
        GuidTipView5.prototype.showTip = function () {
            this.box_1.visible = this.box_2.visible = false;
            switch (this.index) {
                case 0:
                    this.box_1.visible = true;
                    break;
                case 1:
                    this.box_2.visible = true;
                    break;
            }
        };
        GuidTipView5.prototype.destory = function () {
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return GuidTipView5;
    }(ui.guid.GuidTipView5UI));
    module.GuidTipView5 = GuidTipView5;
})(module || (module = {}));
//# sourceMappingURL=GuidTipView5.js.map