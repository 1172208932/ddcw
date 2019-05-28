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
    var SellChichenDialog = /** @class */ (function (_super) {
        __extends(SellChichenDialog, _super);
        function SellChichenDialog(chichenInfo, type) {
            if (type === void 0) { type = 1; }
            var _this = _super.call(this) || this;
            _this.chichenInfo = null;
            _this.type = 0;
            _this.txt_weight = null;
            _this.type = 1;
            _this.chichenInfo = chichenInfo;
            _this.initView();
            Main.app.mwx.showBanner();
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            _this.btn_sell.on(laya.events.Event.CLICK, _this, _this.onBtnSell);
            _this.btn_changename.on(laya.events.Event.CLICK, _this, _this.onBtnChangeName);
            _this.btn_share.on(laya.events.Event.CLICK, _this, _this.onShare);
            module.RaceManager.instance.on(module.RaceManager.UPGRADE_CHICHEN, _this, _this.onUpdateChichen);
            manager.EventManager.instance.on(SellChichenDialog.SELL_CHICHEN, _this, _this.onSell);
            return _this;
        }
        SellChichenDialog.prototype.initView = function () {
            // this.img_logo.skin = manager.configManager.instance.CDN_BOOT + "gate/logo.png";
            this.img_logo.skin = "view/logo.png";
            if (module.RaceManager.instance.getPlantInfoById(this.chichenInfo.plantId).getChichenCount() == 1) {
                this.box_sell.visible = false;
                this.box_share.x = 222;
            }
            this.txt_weight = new module.FontClip("ui/num_c_", 285, 246, 100, 24, "left");
            this.addChild(this.txt_weight);
            this.txt_weight.text = this.chichenInfo.getWeithStr();
            this.img_chichen.skin = this.chichenInfo.config.getURl(6);
            this.img_plant.skin = module.RaceManager.instance.getCornerimg(this.chichenInfo.plantId);
            this.txt_coin = new module.FontClip("ui/num_a_", 20, 65, 140, 36, "right");
            this.txt_coin.scale(0.8, 0.8);
            this.box_sell.addChild(this.txt_coin);
            this.txt_coin.text = this.chichenInfo.money + "";
            this.txt_name.text = this.chichenInfo.name;
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
        SellChichenDialog.prototype.onUpdateChichen = function (info) {
            if (info.id == this.chichenInfo.id) {
                this.txt_name.text = this.chichenInfo.name;
            }
        };
        SellChichenDialog.prototype.onBtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
            if (this.type == 1) {
                var dialog = new module.MyAtlasDialog();
                manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
            }
        };
        SellChichenDialog.prototype.onBtnSell = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.SellConfirmChichenDialog(this.chichenInfo.money);
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0.6);
        };
        SellChichenDialog.prototype.onSell = function () {
            this.btn_sell.disabled = true;
            module.RaceManager.instance.sellChichen(this.chichenInfo);
            this.onBtnClose();
        };
        SellChichenDialog.prototype.onBtnChangeName = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.ChangenameDialog(this.chichenInfo);
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
        };
        SellChichenDialog.prototype.destroy = function () {
            Main.app.mwx.closeBanner();
            Laya.timer.clear(this, this.onBtnClose);
            module.RaceManager.instance.off(module.RaceManager.UPGRADE_CHICHEN, this, this.onUpdateChichen);
            manager.EventManager.instance.off(SellChichenDialog.SELL_CHICHEN, this, this.onSell);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        /* 分享 */
        SellChichenDialog.prototype.onShare = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (Main.app.shareIndex > 0) {
                return;
            }
            Main.app.shareIndex = 9;
            Main.app.shareTimestamp = new Date().getTime();
            var title, imageUrl, shjson;
            Main.app.mwx.shareurl.forEach(function (item) {
                if (item.id == Main.app.shareIndex) {
                    shjson = item;
                    title = item.title;
                    imageUrl = item.url;
                }
            });
            wx.shareAppMessage({
                title: title,
                imageUrl: imageUrl,
                query: "uid=" + Main.app.mwx.mUID + ("&surl=" + Main.app.shareIndex)
            });
        };
        SellChichenDialog.SELL_CHICHEN = "SellChichenDialog" + "SELL_CHICHEN";
        return SellChichenDialog;
    }(ui.game.SellChichenDialogUI));
    module.SellChichenDialog = SellChichenDialog;
})(module || (module = {}));
//# sourceMappingURL=SellChichenDialog.js.map