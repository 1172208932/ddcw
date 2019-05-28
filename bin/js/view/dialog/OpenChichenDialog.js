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
    var OpenChichenDialog = /** @class */ (function (_super) {
        __extends(OpenChichenDialog, _super);
        function OpenChichenDialog(chichenInfo) {
            var _this = _super.call(this) || this;
            _this.chichenInfo = null;
            _this.txt_weight = null;
            _this.chichenInfo = chichenInfo;
            _this.initView();
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            _this.btn_changename.on(laya.events.Event.CLICK, _this, _this.onBtnChangeName);
            if (!Main.app.mwx.mFHKeep) {
                _this.btn_share.visible = false;
                _this.lose1.visible = false;
                _this.lose2.visible = false;
                _this.lose3.visible = false;
                _this.lose4.visible = false;
                _this.lose5.visible = false;
            }
            else {
                _this.btn_share.visible = true;
                _this.btn_share.on(laya.events.Event.CLICK, _this, _this.onshare);
            }
            module.RaceManager.instance.on(module.RaceManager.UPGRADE_CHICHEN, _this, _this.onUpdateChichen);
            module.RaceManager.instance.on(module.RaceManager.CLOSEEGGOPENING, _this, _this.onBtnClose);
            return _this;
        }
        OpenChichenDialog.prototype.initView = function () {
            BridgeUtil.callAppMethod("showBanner");
            // this.img_logo.skin = manager.configManager.instance.CDN_BOOT + "gate/logo.png";
            this.img_logo.skin = "view/logo.png";
            this.img_chichen.skin = this.chichenInfo.config.getURl(6);
            this.img_plant.skin = module.RaceManager.instance.getCornerimg(this.chichenInfo.plantId);
            this.txt_name.text = this.chichenInfo.name;
            this.txt_weight = new module.FontClip("ui/num_c_", 360, 277, 100, 24, "left");
            this.addChild(this.txt_weight);
            this.txt_weight.text = this.chichenInfo.getWeithStr();
        };
        OpenChichenDialog.prototype.onUpdateChichen = function (info) {
            if (info.id == this.chichenInfo.id) {
                this.txt_name.text = this.chichenInfo.name;
            }
        };
        OpenChichenDialog.prototype.onBtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var isHaveCarden = module.RaceManager.instance.isHaveCarden(this.chichenInfo.plantId);
            if (isHaveCarden == false) {
                if (module.RaceManager.instance.getPlantInfoById(this.chichenInfo.plantId).getChichenCount() < 10) {
                    module.RaceManager.instance.addChichenToPlant(this.chichenInfo);
                }
                else {
                    var dialog = new module.SellOnPlantFullDialog(this.chichenInfo);
                    manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
                }
            }
            else {
                var selectPlantId = module.RaceManager.instance.selectPlantId;
                var plantId = this.chichenInfo.plantId > 100 ? this.chichenInfo.plantId - 100 : this.chichenInfo.plantId;
                var plantInfo = module.RaceManager.instance.getPlantInfoById(plantId);
                var cardenInfo = module.RaceManager.instance.getPlantInfoById(plantId + 100);
                if (selectPlantId == plantInfo.plantId) { //当前显示的是森林
                    if (plantInfo.getChichenCount() >= 10) { //森林满了
                        var dialog = new module.SellOnPlantFullDialog(this.chichenInfo);
                        manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
                    }
                    else {
                        this.chichenInfo.plantId = plantId;
                        module.RaceManager.instance.addChichenToPlant(this.chichenInfo);
                    }
                }
                else if (selectPlantId == cardenInfo.plantId) { //当前显示的花园
                    if (cardenInfo.getChichenCount() >= 10) { //花园满了
                        var dialog = new module.SellOnPlantFullDialog(this.chichenInfo);
                        manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
                    }
                    else {
                        this.chichenInfo.plantId = plantId + 100;
                        module.RaceManager.instance.addChichenToPlant(this.chichenInfo);
                    }
                }
                else {
                    if (plantInfo.getChichenCount() >= 10) { //森林满了
                        var dialog = new module.SellOnPlantFullDialog(this.chichenInfo);
                        manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
                    }
                    else {
                        this.chichenInfo.plantId = plantId;
                        module.RaceManager.instance.addChichenToPlant(this.chichenInfo);
                    }
                }
            }
            this.destroy();
        };
        OpenChichenDialog.prototype.onBtnChangeName = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.ChangenameDialog(this.chichenInfo);
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
        };
        OpenChichenDialog.prototype.destroy = function () {
            BridgeUtil.callAppMethod("hideBanner");
            module.RaceManager.instance.off(module.RaceManager.CLOSEEGGOPENING, this, this.onBtnClose);
            module.RaceManager.instance.off(module.RaceManager.UPGRADE_CHICHEN, this, this.onUpdateChichen);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        OpenChichenDialog.prototype.onshare = function () {
            if (Main.app.shareIndex > 0) {
                return;
            }
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.GetNewEggShare, { "success": 0 });
            Main.app.shareIndex = 12;
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
        return OpenChichenDialog;
    }(ui.game.OpenChichenDialogUI));
    module.OpenChichenDialog = OpenChichenDialog;
})(module || (module = {}));
//# sourceMappingURL=OpenChichenDialog.js.map