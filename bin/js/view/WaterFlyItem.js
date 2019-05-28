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
    var WaterFlyItem = /** @class */ (function (_super) {
        __extends(WaterFlyItem, _super);
        function WaterFlyItem(type, score, data) {
            var _this = _super.call(this) || this;
            _this.id = 100;
            _this.type = 0;
            _this.score = 0;
            _this.data = null;
            _this.isEnd = false;
            _this.cp = new Array();
            _this.maxt = 0;
            _this.t1 = 1;
            _this.wT = 0;
            _this.t2 = 1;
            _this.id = WaterFlyItem.IDS++;
            _this.type = type;
            _this.score = score;
            _this.data = data;
            if (type == 1) {
                var animation = new laya.display.Animation();
                animation.loadAnimation(manager.ResVersionMgr.instance.getMd5Url("ani/fly_" + _this.data[1] + ".ani"));
                _this.addChild(animation);
                animation.scale(0.5, 0.5);
                animation.play(0, true);
            }
            else if (type == 11) {
                var animation = new laya.display.Animation();
                animation.loadAnimation(manager.ResVersionMgr.instance.getMd5Url("ani/fly_" + _this.data[1] + ".ani"));
                _this.addChild(animation);
                animation.scale(0.5, 0.5);
                animation.play(0, true);
            }
            else if (type == 2) {
                var img = new laya.ui.Image("ui/coin.png");
                img.pivot(33, 50);
                _this.addChild(img);
            }
            return _this;
        }
        WaterFlyItem.prototype.reset = function (type, score, data) {
            this.type = type;
            this.score = score;
            this.data = data;
            this.isEnd = false;
            this.cp = new Array();
            this.maxt = 0;
            this.t1 = 1;
            this.wT = 0;
            this.t2 = 1;
        };
        Object.defineProperty(WaterFlyItem.prototype, "key", {
            get: function () {
                if (this.type == 1 || this.type == 11) {
                    return "1-" + this.data[1];
                }
                else if (this.type == 2) {
                    return this.type + "-c";
                }
            },
            enumerable: true,
            configurable: true
        });
        /**向终点移动 */
        WaterFlyItem.prototype.moveTo = function () {
            var tpos = core.Utils.PointOnCubicBezier2(this.cp, this.t1 / this.maxt);
            this.x = tpos.x;
            this.y = tpos.y;
            this.t1++;
            if (this.t1 > this.maxt) {
                this.isEnd = true;
            }
        };
        WaterFlyItem.IDS = 100;
        return WaterFlyItem;
    }(laya.ui.Component));
    module.WaterFlyItem = WaterFlyItem;
})(module || (module = {}));
//# sourceMappingURL=WaterFlyItem.js.map