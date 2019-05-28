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
    var RaceButtomView = /** @class */ (function (_super) {
        __extends(RaceButtomView, _super);
        function RaceButtomView() {
            var _this = _super.call(this) || this;
            _this.img_hat.skin = module.RaceManager.instance.getHatImg(2);
            return _this;
        }
        return RaceButtomView;
    }(ui.race.RaceButtomViewUI));
    module.RaceButtomView = RaceButtomView;
})(module || (module = {}));
//# sourceMappingURL=RaceButtomView.js.map