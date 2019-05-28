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
    var PlantAltasItem = /** @class */ (function (_super) {
        __extends(PlantAltasItem, _super);
        function PlantAltasItem() {
            var _this = _super.call(this) || this;
            _this._index = 0;
            return _this;
        }
        Object.defineProperty(PlantAltasItem.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
            },
            enumerable: true,
            configurable: true
        });
        PlantAltasItem.prototype.showChichen = function (plantId) {
            var plantInfo = module.RaceManager.instance.getPlantInfoById(plantId);
            var configId = plantInfo.chichenIdList[this._index];
            // var temp = plantInfo.chichenIdList.concat(RaceManager.instance.SPECIFIC_CONFIG);
            // var configId:number = temp[this._index];
            var isHave = plantInfo.isHaveChichenIds(configId);
            // console.log("1 = ", plantInfo);
            // console.log("2 = ", configId);
            if (isHave) {
                var info = module.RaceManager.instance.chichenConfigDic.get(configId);
                this.img_no.visible = false;
                this.img_icon.visible = true;
                this.img_icon.skin = info.getURl(1);
            }
            else {
                this.img_icon.visible = false;
                this.img_no.visible = true;
            }
        };
        PlantAltasItem.prototype.showAddConfigID = function (configId) {
            var info = module.RaceManager.instance.chichenConfigDic.get(configId);
            this.img_no.visible = false;
            Laya.loader.load([{ url: info.getURl(1), type: laya.net.Loader.IMAGE }], laya.utils.Handler.create(this, this.onLoadedImage, [configId]));
        };
        PlantAltasItem.prototype.onLoadedImage = function (configId) {
            var info = module.RaceManager.instance.chichenConfigDic.get(configId);
            this.img_icon.visible = true;
            this.img_icon.skin = info.getURl(1);
            this.img_icon.pivot(info.getWidth(1) / 2, info.getHeight(1) / 2);
            var ss = Math.min(125 / info.getWidth(1), 125 / info.getHeight(1));
            this.img_icon.scale(3, 3);
            Laya.Tween.to(this.img_icon, { scaleX: ss, scaleY: ss }, 300, null, null, 100);
            this.ani.play(0, false);
        };
        return PlantAltasItem;
    }(ui.game.PlantAltasItemUI));
    module.PlantAltasItem = PlantAltasItem;
})(module || (module = {}));
//# sourceMappingURL=PlantAltasItem.js.map