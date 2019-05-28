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
    var SellItem = (function (_super) {
        __extends(SellItem, _super);
        function SellItem() {
            var _this = _super.call(this) || this;
            _this.chichenInfo = null;
            return _this;
        }
        SellItem.prototype.showData = function (value) {
            // this.chichenInfo = value;
            // this.img_chichen.skin = this.chichenInfo.config.getURl(6);
            // this.img_star1.visible = this.img_star2.visible = this.img_star3.visible = false;
            // if(this.chichenInfo.star >= 1){
            // 	this.img_star1.visible = true;
            // }
            // if(this.chichenInfo.star >= 2){
            // 	this.img_star2.visible = true;
            // }
            // if(this.chichenInfo.star >= 3){
            // 	this.img_star3.visible = true;
            // }
        };
        return SellItem;
    }(ui.game.SellItemUI));
    module.SellItem = SellItem;
})(module || (module = {}));
//# sourceMappingURL=SellItem.js.map