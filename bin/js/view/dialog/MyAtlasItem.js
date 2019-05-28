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
    var MyAtlasItem = /** @class */ (function (_super) {
        __extends(MyAtlasItem, _super);
        function MyAtlasItem() {
            var _this = _super.call(this) || this;
            _this.chichenInfo = null;
            _this.txt_weight = null;
            _this.txt_weight = new module.FontClip("ui/num_c_", 97, 59, 100, 24, "left");
            _this.addChild(_this.txt_weight);
            _this.on(laya.events.Event.CLICK, _this, _this.onItemClick);
            return _this;
        }
        MyAtlasItem.prototype.showChichen = function (info) {
            this.chichenInfo = info;
            this.img_star1.visible = this.img_star2.visible = this.img_star3.visible = false;
            if (this.chichenInfo != null) {
                this.img_no.visible = false;
                this.img_icon.visible = this.img_look.visible = this.img_hatbg.visible = true;
                this.img_icon.skin = this.chichenInfo.config.getURl(1);
                // this.img_icon.pivot(this.img_icon.width/2 , this.img_icon.height/2);
                this.img_icon.pivot(info.config.getWidth(1) / 2, info.config.getHeight(1) / 2);
                var ss = Math.min(87 / this.img_icon.width, 105 / this.img_icon.height);
                this.img_icon.scale(ss, ss);
                this.txt_name.text = this.chichenInfo.name;
                this.txt_weight.text = this.chichenInfo.getWeithStr();
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
                this.img_icon.visible = this.img_look.visible = this.img_star1.visible = this.img_star2.visible = this.img_star3.visible = this.img_hat.visible = this.img_hatbg.visible = false;
                this.img_no.visible = true;
                this.txt_name.text = "";
                this.txt_weight.text = "";
            }
        };
        MyAtlasItem.prototype.onItemClick = function (e) {
            if (this.chichenInfo != null) {
                manager.EventManager.instance.event(module.MyAtlasDialog.SELECT_CHICHEN, [this.chichenInfo]);
            }
        };
        return MyAtlasItem;
    }(ui.game.MyAtlasItemUI));
    module.MyAtlasItem = MyAtlasItem;
})(module || (module = {}));
//# sourceMappingURL=MyAtlasItem.js.map