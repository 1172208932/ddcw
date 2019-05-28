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
    var GuidTipView = /** @class */ (function (_super) {
        __extends(GuidTipView, _super);
        function GuidTipView(index) {
            if (index === void 0) { index = 0; }
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.index = index;
            _this.showTip();
            _this.on(laya.events.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        GuidTipView.prototype.onClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.ani1.play(0, false);
            this.index++;
            this.showTip();
            if (this.index > 3 && this.index < 10) {
                module.RaceManager.instance.gotoGuidStep(2);
                this.destroy();
            }
            else if (this.index >= 12) {
                module.RaceManager.instance.gotoGuidStep(6);
                this.destory();
            }
        };
        GuidTipView.prototype.showTip = function () {
            this.box1.visible = this.box2.visible = this.box3.visible = this.box4.visible = this.box5.visible = this.box6.visible = false;
            switch (this.index) {
                case 0:
                    this.box1.visible = true;
                    break;
                case 1:
                    this.box2.visible = true;
                    break;
                case 2:
                    this.box3.visible = true;
                    break;
                case 3:
                    this.box4.visible = true;
                    break;
                case 10:
                    this.box5.visible = true;
                    break;
                case 11:
                    this.box6.visible = true;
                    break;
            }
        };
        GuidTipView.prototype.destory = function () {
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return GuidTipView;
    }(ui.guid.GuidTipViewUI));
    module.GuidTipView = GuidTipView;
})(module || (module = {}));
//# sourceMappingURL=GuidTipView.js.map