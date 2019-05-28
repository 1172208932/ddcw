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
/*
* name;
*/
var module;
(function (module) {
    var ProgressView = /** @class */ (function (_super) {
        __extends(ProgressView, _super);
        function ProgressView() {
            var _this = _super.call(this) || this;
            _this.bottom = 70;
            return _this;
        }
        ProgressView.prototype.startProgress = function () {
            console.log("开始读条");
            var __this = this;
            Laya.timer.once(500, this, function () {
                Laya.timer.frameLoop(1, __this, __this.onProgress);
            });
        };
        /* 读条中 */
        ProgressView.prototype.onProgress = function () {
            console.log("读条中...");
            var w = this.progress.width;
            w = w + 10;
            if (w >= 600) {
                w = 600;
                Laya.timer.clear(this, this.onProgress);
            }
            this.progress.width = w;
        };
        ProgressView.prototype.overProgress = function () {
            var _this = this;
            console.log("读条结束");
            Laya.timer.clear(this, this.onProgress);
            this.progress.width = 640;
            Laya.timer.once(500, this, function () {
                _this.visible = false;
            });
        };
        return ProgressView;
    }(ui.view.ProgressViewUI));
    module.ProgressView = ProgressView;
})(module || (module = {}));
//# sourceMappingURL=ProgressView.js.map