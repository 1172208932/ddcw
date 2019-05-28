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
    var Point = laya.maths.Point;
    var CoinItem = /** @class */ (function (_super) {
        __extends(CoinItem, _super);
        function CoinItem() {
            return _super.call(this) || this;
        }
        CoinItem.prototype.initView = function () {
            this.type = 2;
            this.img = new laya.ui.Image("ui/coin.png");
            this.img.pivot(33, 50);
            this.addChild(this.img);
        };
        /**鸡被点中了 */
        CoinItem.prototype.handClickOk = function () {
            module.RaceManager.instance.removeCoinFromPlant(this.coin);
        };
        /**是否点击中 */
        CoinItem.prototype.collision = function (pos) {
            if (Math.pow(this.x - pos.x, 2) + Math.pow(this.y - 22 - pos.y, 2) <= Math.pow(50, 2)) {
                return true;
            }
            else {
                return false;
            }
        };
        /**飞行数据 */
        CoinItem.prototype.getFlyData = function () {
            var pos = new Point(this.x, this.y);
            return [pos, 2, 1, [this.coin]];
        };
        return CoinItem;
    }(module.ChichenItem));
    module.CoinItem = CoinItem;
})(module || (module = {}));
//# sourceMappingURL=CoinItem.js.map