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
    var Tween = Laya.Tween;
    var SmallLoadingView = /** @class */ (function (_super) {
        __extends(SmallLoadingView, _super);
        function SmallLoadingView(isShowLoading) {
            var _this = _super.call(this) || this;
            _this.isShowLoading = false;
            _this.tween = null;
            _this.isShowLoading = isShowLoading;
            _this.initView();
            return _this;
        }
        SmallLoadingView.prototype.initView = function () {
            this.width = Laya.stage.width;
            if (this.isShowLoading) {
            }
            else {
                if (this.loadMc != null) {
                    this.loadMc.visible = false;
                }
            }
            this.bg.visible = false;
        };
        SmallLoadingView.prototype.showBg = function () {
            if (this.loadMc != null) {
                this.loadMc.visible = false;
            }
            this.bg.visible = true;
            this.bg.alpha = 1;
        };
        SmallLoadingView.prototype.tweenDestory = function () {
            this.tween = Tween.to(this.bg, { alpha: 0 }, 800, null, laya.utils.Handler.create(this, this.onTweenComplete));
        };
        SmallLoadingView.prototype.onTweenComplete = function () {
            this.bg.alpha = 0;
            if (this.tween != null) {
                Tween.clear(this.tween);
                this.tween = null;
            }
            this.destroy();
        };
        SmallLoadingView.prototype.destroy = function () {
            if (this.loadMc != null) {
                this.loadMc.removeSelf();
                this.loadMc = null;
            }
            this.removeSelf();
        };
        return SmallLoadingView;
    }(ui.smallload.SmallLoadingViewUI));
    module.SmallLoadingView = SmallLoadingView;
})(module || (module = {}));
//# sourceMappingURL=SmallLoadingView.js.map