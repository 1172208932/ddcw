var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* name
*/
var module;
(function (module) {
    var DianItem = (function (_super) {
        __extends(DianItem, _super);
        function DianItem() {
            var _this = _super.call(this) || this;
            _this.id = 0;
            _this.xx = 100;
            _this.yy = 100;
            _this.rr = 40;
            _this.id = DianItem.IDS++;
            _this.input_x.on(laya.events.Event.ENTER, _this, _this.onInputX);
            _this.input_y.on(laya.events.Event.ENTER, _this, _this.onInputY);
            _this.input_r.on(laya.events.Event.ENTER, _this, _this.onInputR);
            return _this;
        }
        DianItem.prototype.onInputX = function () {
            this.change();
        };
        DianItem.prototype.onInputY = function () {
            this.change();
        };
        DianItem.prototype.onInputR = function () {
            this.change();
        };
        DianItem.prototype.change = function () {
            this.xx = Number(this.input_x.textField.text);
            this.yy = Number(this.input_y.textField.text);
            this.rr = Number(this.input_r.textField.text);
            this.event("Changsse");
        };
        return DianItem;
    }(ui.game.DianItemUI));
    DianItem.IDS = 0;
    module.DianItem = DianItem;
})(module || (module = {}));
//# sourceMappingURL=DianItem.js.map