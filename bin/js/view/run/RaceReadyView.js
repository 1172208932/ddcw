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
    var RaceReadyView = /** @class */ (function (_super) {
        __extends(RaceReadyView, _super);
        function RaceReadyView() {
            var _this = _super.call(this) || this;
            _this.time = 0;
            _this.box_name.on(laya.events.Event.CLICK, _this, _this.onBtnClick);
            return _this;
        }
        RaceReadyView.prototype.showMyName = function (name, yy) {
            this.box_name.y = yy - 100;
        };
        RaceReadyView.prototype.start = function () {
            this.time = 3;
            this.img_time.skin = "ui/num_e_" + this.time + ".png";
            Laya.timer.loop(1000, this, this.onLoop);
        };
        RaceReadyView.prototype.onLoop = function () {
            this.time -= 1;
            if (this.time >= 0) {
                this.img_time.skin = "ui/num_e_" + this.time + ".png";
            }
            else {
                this.event(module.RunView.CHICHEN_RUN);
                Laya.timer.clear(this, this.onLoop);
                this.visible = false;
            }
        };
        RaceReadyView.prototype.onBtnClick = function () {
            this.event(module.RunView.CLICK_NAME);
        };
        RaceReadyView.prototype.destroy = function () {
            Laya.timer.clear(this, this.onLoop);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return RaceReadyView;
    }(ui.race.RaceReadyViewUI));
    module.RaceReadyView = RaceReadyView;
})(module || (module = {}));
//# sourceMappingURL=RaceReadyView.js.map