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
    var MealItem = /** @class */ (function (_super) {
        __extends(MealItem, _super);
        function MealItem(chichenInfo) {
            var _this = _super.call(this) || this;
            _this.txt_weight = null;
            _this.txt_level = null;
            _this.maskimg = null;
            _this.chichenInfo = null;
            _this.level = 0;
            _this.chichenInfo = chichenInfo;
            _this.level = _this.chichenInfo.level;
            _this.txt_weight = new module.FontClip("ui/num_c_", 65, 60, 100, 24, "left");
            _this.txt_weight.scale(0.8, 0.8);
            _this.addChild(_this.txt_weight);
            _this.txt_level = new module.FontClip("ui/num_d_", -6, 32, 60, 24, "center");
            _this.addChild(_this.txt_level);
            _this.maskimg = new laya.ui.Image("ui/mask.png");
            _this.maskimg.sizeGrid = "9,3,9,3";
            _this.img_exp2.mask = _this.maskimg;
            _this.txt_name.text = chichenInfo.name;
            _this.onShowChichen();
            _this.on(laya.events.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        MealItem.prototype.onShowChichen = function () {
            this.txt_weight.text = this.chichenInfo.getWeithStr();
            this.txt_level.text = this.chichenInfo.level + "";
            if (this.chichenInfo.star == 3 && this.chichenInfo.level == 10) {
                this.maskimg.width = this.img_exp2.width;
            }
            else {
                this.maskimg.width = (this.chichenInfo.mealExp / 10) * this.img_exp2.width;
            }
            this.img_star1.visible = this.chichenInfo.star >= 1;
            this.img_star2.visible = this.chichenInfo.star >= 2;
            this.img_star3.visible = this.chichenInfo.star >= 3;
            this.img_max.visible = this.chichenInfo.star == 3 && this.chichenInfo.level == 10;
            if (this.level != this.chichenInfo.level) {
                this.ani2.visible = true;
                this.ani2.play(0, false);
                this.level = this.chichenInfo.level;
            }
        };
        MealItem.prototype.updatePos = function () {
            this.x = this.chichenInfo.xx;
            this.y = this.chichenInfo.yy;
        };
        MealItem.prototype.onClick = function () {
            module.RaceManager.instance.wealFood(this.chichenInfo); //给鸡喂食物
        };
        MealItem.prototype.updateChichen = function () {
            this.onShowChichen();
            this.ani.visible = true;
            this.ani.play(0, false);
        };
        MealItem.prototype.destroy = function () {
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return MealItem;
    }(ui.game.MealItemUI));
    module.MealItem = MealItem;
})(module || (module = {}));
//# sourceMappingURL=MealItem.js.map