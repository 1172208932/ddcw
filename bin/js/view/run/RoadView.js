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
    var RoadView = /** @class */ (function (_super) {
        __extends(RoadView, _super);
        function RoadView() {
            var _this = _super.call(this) || this;
            _this.tbx = 0;
            _this.initView();
            return _this;
        }
        RoadView.prototype.initView = function () {
            for (var i = 0; i < 11; i++) {
                this.createBox(i, i == 9, i == 10);
            }
        };
        RoadView.prototype.createBox = function (index, isHaveEnd, isHaveTai) {
            if (isHaveEnd === void 0) { isHaveEnd = false; }
            if (isHaveTai === void 0) { isHaveTai = false; }
            var bx = index * 1024;
            var img = new laya.ui.Image("run/hills.png");
            img.pos(15 + bx, 6);
            this.addChild(img);
            img = new laya.ui.Image("run/hills.png");
            img.pos(243 + bx, 0);
            this.addChild(img);
            img = new laya.ui.Image("run/hills.png");
            img.pos(491 + bx, 0);
            this.addChild(img);
            img = new laya.ui.Image("run/hills.png");
            img.pos(756 + bx, 2);
            this.addChild(img);
            img = new laya.ui.Image("run/back-grass.png");
            img.pos(0 + bx, 42);
            img.scale(2, 2);
            this.addChild(img);
            img = new laya.ui.Image("run/back-grass.png");
            img.pos(512 + bx, 42);
            img.scale(2, 2);
            this.addChild(img);
            img = new laya.ui.Image("run/track.png");
            img.pos(0 + bx, 145);
            img.scale(2, 2);
            this.addChild(img);
            if (isHaveTai == true) {
                this.tbx = (Laya.stage.width - 678) / 2 + bx;
                img = new laya.ui.Image("run/tai.png");
                img.pos(this.tbx, 398);
                img.scale(1.5, 1.5);
                this.addChild(img);
            }
            if (isHaveEnd == true) {
                for (var i = 0; i < 6; i++) {
                    img = new laya.ui.Image("run/finish-pattern.png");
                    img.pos(0 + bx, 175 + i * 128);
                    img.scale(2, 2);
                    this.addChild(img);
                }
            }
        };
        RoadView.prototype.getTaiX = function () {
            return this.tbx + this.x;
        };
        return RoadView;
    }(laya.ui.Component));
    module.RoadView = RoadView;
})(module || (module = {}));
//# sourceMappingURL=RoadView.js.map