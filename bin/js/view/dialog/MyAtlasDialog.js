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
    var MyAtlasDialog = /** @class */ (function (_super) {
        __extends(MyAtlasDialog, _super);
        // public static PET_NUM:string = "MyAtlasDialog"+"PET_NUM"
        function MyAtlasDialog() {
            var _this = _super.call(this) || this;
            _this.curPlantId = 0;
            _this.initView();
            _this.initEvents();
            _this.initPetNum();
            return _this;
        }
        MyAtlasDialog.prototype.initPetNum = function () {
            var newArr = [];
            var arr = [];
            for (var i = 1; i < 9; i++) {
                newArr = newArr.concat(module.RaceManager.instance.userInfo.plantInfoDic.get(i).chichenInfoList);
            }
            newArr.forEach(function (item) {
                if (item) {
                    arr.push(item);
                }
            });
            this.num_pet.text = arr.length + '/160';
        };
        MyAtlasDialog.prototype.initView = function () {
            this.list.renderHandler = new Laya.Handler(this, this.renderHandler);
            var plantId = module.RaceManager.instance.selectPlantId > 100 ? module.RaceManager.instance.selectPlantId - 100 : module.RaceManager.instance.selectPlantId;
            this.showAtlas(plantId);
        };
        MyAtlasDialog.prototype.initEvents = function () {
            this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnCloseClick);
            this.img_left.on(laya.events.Event.CLICK, this, this.onLeft);
            this.img_right.on(laya.events.Event.CLICK, this, this.onRight);
            this.btn_shu.on(laya.events.Event.CLICK, this, this.onBtnShuClick);
            manager.EventManager.instance.on(MyAtlasDialog.SELECT_CHICHEN, this, this.onItemClick);
            // manager.EventManager.instance.on(MyAtlasDialog.PET_NUM, this, this.initPetNum);
        };
        MyAtlasDialog.prototype.removeEvents = function () {
            manager.EventManager.instance.off(MyAtlasDialog.SELECT_CHICHEN, this, this.onItemClick);
            // manager.EventManager.instance.off(MyAtlasDialog.PET_NUM, this, this.initPetNum);
        };
        /**
         * 渲染回调
         * @param cell
         * @param index
         */
        MyAtlasDialog.prototype.renderHandler = function (cell, index) {
            cell.showChichen(this.list.array[index]);
        };
        MyAtlasDialog.prototype.onBtnCloseClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        MyAtlasDialog.prototype.onLeft = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.curPlantId -= 1;
            if (this.curPlantId <= 0) {
                this.curPlantId = 8;
            }
            this.showAtlas(this.curPlantId);
        };
        MyAtlasDialog.prototype.onRight = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.curPlantId += 1;
            if (this.curPlantId > 8) {
                this.curPlantId = 1;
            }
            this.showAtlas(this.curPlantId);
        };
        MyAtlasDialog.prototype.showAtlas = function (plantId) {
            this.curPlantId = plantId;
            this.img_log.skin = module.RaceManager.instance.getLogimg(plantId);
            this.img_plant_name.skin = module.RaceManager.instance.getLogNameimg(plantId);
            var plantInfo = module.RaceManager.instance.getPlantInfoById(this.curPlantId);
            var list = [];
            for (var i = 0; i < plantInfo.chichenInfoList.length; i++) {
                list.push(plantInfo.chichenInfoList[i]);
            }
            plantInfo = module.RaceManager.instance.getPlantInfoById(this.curPlantId + 100);
            if (plantInfo != null) {
                for (var i = 0; i < plantInfo.chichenInfoList.length; i++) {
                    list.push(plantInfo.chichenInfoList[i]);
                }
            }
            for (var i = list.length; i < 10; i++) {
                list.push(null);
            }
            this.list.array = list;
        };
        MyAtlasDialog.prototype.onBtnShuClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.PlantAtlasDialog();
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
            this.destroy();
        };
        MyAtlasDialog.prototype.onItemClick = function (chichenInfo) {
            if (chichenInfo != null) {
                var dialog = new module.SellChichenDialog(chichenInfo, 1);
                manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0.2);
                this.destroy();
            }
        };
        MyAtlasDialog.prototype.destroy = function () {
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        MyAtlasDialog.SELECT_CHICHEN = "MyAtlasDialog" + "SELECT_CHICHEN";
        return MyAtlasDialog;
    }(ui.game.MyAtlasDialogUI));
    module.MyAtlasDialog = MyAtlasDialog;
})(module || (module = {}));
//# sourceMappingURL=MyAtlasDialog.js.map