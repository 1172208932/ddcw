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
    var SellChichenItem = /** @class */ (function (_super) {
        __extends(SellChichenItem, _super);
        function SellChichenItem() {
            var _this = _super.call(this) || this;
            _this.chichenInfo = null;
            _this.txt_coin = null;
            _this.txt_weight = null;
            _this.txt_coin = new module.FontClip("ui/num_a_", 423, 36, 100, 36, "right");
            _this.txt_coin.scale(0.8, 0.8);
            _this.addChild(_this.txt_coin);
            _this.txt_weight = new module.FontClip("ui/num_c_", 230, 40, 100, 24, "center");
            _this.addChild(_this.txt_weight);
            _this.btn_sell.on(laya.events.Event.CLICK, _this, _this.onBtnClick);
            return _this;
        }
        SellChichenItem.prototype.showData = function (value) {
            this.chichenInfo = value;
            this.img_chichen.skin = this.chichenInfo.config.getURl(6);
            this.img_chichen.pivot(this.img_chichen.width / 2, this.img_chichen.height / 2);
            var ss = Math.min(60 / this.img_chichen.width, 60 / this.img_chichen.height);
            this.img_chichen.scale(ss, ss);
            this.txt_coin.text = this.chichenInfo.money + "";
            this.txt_name.text = this.chichenInfo.name;
            this.txt_weight.text = this.chichenInfo.getWeithStr();
            this.img_star1.visible = this.img_star2.visible = this.img_star3.visible = false;
            if (this.chichenInfo.star >= 1) {
                this.img_star1.visible = true;
            }
            if (this.chichenInfo.star >= 2) {
                this.img_star2.visible = true;
            }
            if (this.chichenInfo.star >= 3) {
                this.img_star3.visible = true;
            }
        };
        SellChichenItem.prototype.onBtnClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.ConfirmDialog(2, null, Laya.Handler.create(this, this.onSellComplete));
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0.6);
        };
        SellChichenItem.prototype.onSellComplete = function () {
            manager.EventManager.instance.event(module.SellOnPlantFullDialog.SELL_CHICHEN, [this.chichenInfo]);
        };
        return SellChichenItem;
    }(ui.game.SellChichenItemUI));
    module.SellChichenItem = SellChichenItem;
})(module || (module = {}));
//# sourceMappingURL=SellChichenItem.js.map