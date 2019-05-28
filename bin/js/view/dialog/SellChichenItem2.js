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
    var SellChichenItem2 = /** @class */ (function (_super) {
        __extends(SellChichenItem2, _super);
        function SellChichenItem2() {
            var _this = _super.call(this) || this;
            _this.type = 0;
            _this.chichenInfo = null;
            _this.txt_coin = null;
            _this.txt_weight = null;
            _this.txt_coin = new module.FontClip("ui/num_a_", 140, 50, 100, 36, "right");
            _this.txt_coin.scale(0.8, 0.8);
            _this.box_sell.addChild(_this.txt_coin);
            _this.txt_weight = new module.FontClip("ui/num_c_", 7, 70, 100, 24, "center");
            _this.box_sell.addChild(_this.txt_weight);
            _this.btn_sell.on(laya.events.Event.CLICK, _this, _this.onBtnClick);
            _this.btn_add.on(laya.events.Event.CLICK, _this, _this.onBtnAdd);
            return _this;
        }
        SellChichenItem2.prototype.showData = function (value, type) {
            this.type = type;
            this.chichenInfo = value;
            if (this.chichenInfo != null) {
                this.box_sell.visible = true;
                this.box_add.visible = false;
                this.img_chichen.skin = this.chichenInfo.config.getURl(6);
                this.img_chichen.pivot(this.chichenInfo.config.getWidth(6) / 2, this.chichenInfo.config.getHeight(6) / 2);
                var ss = Math.min(60 / this.chichenInfo.config.getWidth(6), 60 / this.chichenInfo.config.getHeight(6));
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
            }
            else {
                this.box_sell.visible = false;
                this.box_add.visible = true;
            }
        };
        SellChichenItem2.prototype.onBtnClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.ConfirmDialog(2, null, Laya.Handler.create(this, this.onSellComplete));
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0.6);
        };
        SellChichenItem2.prototype.onBtnAdd = function () {
            manager.EventManager.instance.event(module.SellOnPlantFullDialog.ADD_CHICHEN, [this.type]);
        };
        SellChichenItem2.prototype.onSellComplete = function () {
            manager.EventManager.instance.event(module.SellOnPlantFullDialog.SELL_CHICHEN, [this.chichenInfo]);
        };
        return SellChichenItem2;
    }(ui.game.SellChichenItem2UI));
    module.SellChichenItem2 = SellChichenItem2;
})(module || (module = {}));
//# sourceMappingURL=SellChichenItem2.js.map