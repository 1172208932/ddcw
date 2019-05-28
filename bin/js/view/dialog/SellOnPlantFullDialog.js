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
    var SellOnPlantFullDialog = /** @class */ (function (_super) {
        __extends(SellOnPlantFullDialog, _super);
        function SellOnPlantFullDialog(value) {
            var _this = _super.call(this) || this;
            _this.chichenInfo = null;
            _this.chichenInfo = value;
            _this.initView();
            return _this;
        }
        SellOnPlantFullDialog.prototype.initView = function () {
            this.sellList.renderHandler = new Laya.Handler(this, this.renderHandler);
            this.list1.renderHandler = new Laya.Handler(this, this.renderHandler1);
            this.list2.renderHandler = new Laya.Handler(this, this.renderHandler2);
            this.img_chichen.skin = this.chichenInfo.config.getURl(6);
            var isHaveCarden = module.RaceManager.instance.isHaveCarden(this.chichenInfo.plantId);
            if (isHaveCarden == false) {
                this.box_list1.visible = true;
                this.box_list2.visible = false;
                var plantInfo = module.RaceManager.instance.getPlantInfoById(this.chichenInfo.plantId);
                var chichenInfoList = plantInfo.chichenInfoList;
                var lists = [];
                for (var i = 0; i < chichenInfoList.length; i++) {
                    if (chichenInfoList[i].id != this.chichenInfo.id) {
                        lists.push(chichenInfoList[i]);
                    }
                }
                this.sellList.array = lists;
                if (plantInfo.plantId == 1) {
                }
                else {
                    this.box_build.visible = false;
                    this.box_keep.x = 200;
                }
            }
            else {
                this.box_list1.visible = false;
                this.box_list2.visible = true;
                this.box_build.visible = false;
                this.box_keep.x = 200;
                var plantId = this.chichenInfo.plantId > 100 ? this.chichenInfo.plantId - 100 : this.chichenInfo.plantId;
                plantInfo = module.RaceManager.instance.getPlantInfoById(plantId);
                var cardenInfo = module.RaceManager.instance.getPlantInfoById(plantId + 100);
                var datas1 = [];
                for (var i = 0; i < plantInfo.chichenInfoList.length; i++) {
                    if (plantInfo.chichenInfoList[i].id != this.chichenInfo.id) {
                        datas1.push(plantInfo.chichenInfoList[i]);
                    }
                }
                if (datas1.length < 10)
                    datas1.unshift(null);
                this.list1.array = datas1;
                /////
                var datas2 = [];
                for (var i = 0; i < cardenInfo.chichenInfoList.length; i++) {
                    if (cardenInfo.chichenInfoList[i].id != this.chichenInfo.id) {
                        datas2.push(cardenInfo.chichenInfoList[i]);
                    }
                }
                if (datas2.length < 10)
                    datas2.unshift(null);
                this.list2.array = datas2;
            }
            this.btn_keep.on(laya.events.Event.CLICK, this, this.onClick);
            this.btn_build.on(laya.events.Event.CLICK, this, this.onBtnBuild);
            manager.EventManager.instance.on(SellOnPlantFullDialog.SELL_CHICHEN, this, this.onSellChichen);
            manager.EventManager.instance.on(SellOnPlantFullDialog.ADD_CHICHEN, this, this.onAddChichen);
        };
        /**
         * 渲染回调
         * @param cell
         * @param index
         */
        SellOnPlantFullDialog.prototype.renderHandler = function (cell, index) {
            cell.showData(this.sellList.array[index]);
        };
        SellOnPlantFullDialog.prototype.renderHandler1 = function (cell, index) {
            cell.showData(this.list1.array[index], 1);
        };
        SellOnPlantFullDialog.prototype.renderHandler2 = function (cell, index) {
            cell.showData(this.list2.array[index], 2);
        };
        SellOnPlantFullDialog.prototype.onClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.sellNewEgg();
            this.destroy();
        };
        SellOnPlantFullDialog.prototype.onSellChichen = function (chichenInfo) {
            this.chichenInfo.plantId = chichenInfo.plantId;
            module.RaceManager.instance.sellChichen(chichenInfo);
            module.RaceManager.instance.addChichenToPlant(this.chichenInfo);
            this.destroy();
        };
        /* 添加宠物到其他地方 */
        SellOnPlantFullDialog.prototype.onAddChichen = function (type) {
            var plantId = this.chichenInfo.plantId > 100 ? this.chichenInfo.plantId - 100 : this.chichenInfo.plantId;
            if (type == 1) {
                this.chichenInfo.plantId = plantId;
                module.RaceManager.instance.addChichenToPlant(this.chichenInfo);
            }
            else {
                this.chichenInfo.plantId = plantId + 100;
                module.RaceManager.instance.addChichenToPlant(this.chichenInfo);
            }
            this.destroy();
        };
        SellOnPlantFullDialog.prototype.onBtnBuild = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.BuildCardenDialog(this.chichenInfo, Laya.Handler.create(this, this.onClose));
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
        };
        SellOnPlantFullDialog.prototype.onClose = function () {
            this.destroy();
        };
        SellOnPlantFullDialog.prototype.destroy = function () {
            manager.EventManager.instance.off(SellOnPlantFullDialog.ADD_CHICHEN, this, this.onAddChichen);
            manager.EventManager.instance.off(SellOnPlantFullDialog.SELL_CHICHEN, this, this.onSellChichen);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        SellOnPlantFullDialog.SELL_CHICHEN = "SellOnPlantFullDialog" + "SELL_CHICHEN";
        SellOnPlantFullDialog.ADD_CHICHEN = "SellOnPlantFullDialog" + "ADD_CHICHEN";
        return SellOnPlantFullDialog;
    }(ui.game.SellOnPlantFullDialogUI));
    module.SellOnPlantFullDialog = SellOnPlantFullDialog;
})(module || (module = {}));
//# sourceMappingURL=SellOnPlantFullDialog.js.map