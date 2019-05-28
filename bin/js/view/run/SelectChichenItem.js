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
    var SelectChichenItem = /** @class */ (function (_super) {
        __extends(SelectChichenItem, _super);
        function SelectChichenItem() {
            var _this = _super.call(this) || this;
            _this.chichenInfo = null;
            _this._index = 0;
            return _this;
        }
        Object.defineProperty(SelectChichenItem.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
            },
            enumerable: true,
            configurable: true
        });
        SelectChichenItem.prototype.showChichen = function (plantId) {
            this.img_star1.visible = this.img_star2.visible = this.img_star3.visible = false;
            var plantInfo = module.RaceManager.instance.getPlantInfoById(plantId);
            this.chichenInfo = this._index < plantInfo.chichenInfoList.length ? plantInfo.chichenInfoList[this._index] : null;
            if (this.chichenInfo != null) {
                this.img_no.visible = false;
                this.img_icon.visible = this.img_food.visible = this.img_hatbg.visible = true;
                this.img_icon.skin = this.chichenInfo.config.getURl(1);
                this.img_icon.pivot(this.img_icon.width / 2, this.img_icon.height / 2);
                var ss = Math.min(87 / this.img_icon.width, 105 / this.img_icon.height);
                this.img_icon.scale(ss, ss);
                this.txt_name.text = this.chichenInfo.name;
                this.txt_level.text = "LV." + this.chichenInfo.level + "";
                if (this.chichenInfo.star >= 1) {
                    this.img_star1.visible = true;
                }
                if (this.chichenInfo.star >= 2) {
                    this.img_star2.visible = true;
                }
                if (this.chichenInfo.star >= 3) {
                    this.img_star3.visible = true;
                }
                if (this.chichenInfo.hatId > 0) {
                    this.img_hat.visible = true;
                    this.img_hat.skin = module.RaceManager.instance.getHatImg(this.chichenInfo.hatId);
                    var ss = Math.min(30 / this.img_hat.width, 30 / this.img_hat.height);
                    this.img_hat.scale(ss, ss);
                }
                else {
                    this.img_hat.visible = false;
                }
            }
            else {
                this.img_icon.visible = this.img_food.visible = this.img_star1.visible = this.img_star2.visible = this.img_star3.visible = this.img_hat.visible = this.img_hatbg.visible = false;
                this.img_no.visible = true;
                this.txt_name.text = "";
                this.txt_level.text = "";
            }
        };
        return SelectChichenItem;
    }(ui.race.SelectChichenItemUI));
    module.SelectChichenItem = SelectChichenItem;
})(module || (module = {}));
//# sourceMappingURL=SelectChichenItem.js.map