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
    var FoodFlyItem = /** @class */ (function (_super) {
        __extends(FoodFlyItem, _super);
        function FoodFlyItem(score, type) {
            if (type === void 0) { type = 0; }
            var _this = _super.call(this) || this;
            _this.type = 0;
            _this.score = 0;
            _this.data = null;
            _this.isEnd = false;
            _this.cp = new Array();
            _this.maxt = 0;
            _this.t1 = 1;
            _this.wT = 0;
            _this.t2 = 1;
            _this.delay = 0;
            _this.score = score;
            _this.type = type;
            if (_this.type == 0) {
                _this.skin = "ui/Atlas_2.png";
                _this.pivotX = 32;
                _this.pivotY = 37;
                _this.scaleX = _this.scaleY = 0.8;
            }
            else if (_this.type == 2) {
                _this.skin = "ui/Atlas_0.png";
                _this.pivotX = 40;
                _this.pivotY = 42;
                _this.scaleX = _this.scaleY = 0.6;
            }
            else if (_this.type == 3) {
                _this.skin = "ui/Atlas_1.png";
                _this.pivotX = 32;
                _this.pivotY = 41;
                _this.scaleX = _this.scaleY = 0.7;
            }
            return _this;
        }
        /**向终点移动 */
        FoodFlyItem.prototype.moveTo = function () {
            var tpos = core.Utils.PointOnCubicBezier2(this.cp, this.t1 / this.maxt);
            this.x = tpos.x;
            this.y = tpos.y;
            this.t1++;
            if (this.t1 > this.maxt) {
                this.isEnd = true;
            }
        };
        return FoodFlyItem;
    }(laya.ui.Image));
    module.FoodFlyItem = FoodFlyItem;
})(module || (module = {}));
//# sourceMappingURL=FoodFlyItem.js.map