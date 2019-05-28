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
 * 底部菜单栏
 */
var module;
(function (module) {
    var BottomView = /** @class */ (function (_super) {
        __extends(BottomView, _super);
        function BottomView() {
            var _this = _super.call(this) || this;
            _this.gridItems = new Array();
            _this.initView();
            _this.initEvents();
            return _this;
        }
        BottomView.prototype.initView = function () {
            for (var i = 1; i <= 6; i++) {
                var item = this["grid" + i];
                item.index = i;
                this.gridItems.push(item);
            }
            // let arr = []
            var plantId = module.RaceManager.instance.selectPlantId;
            //  > 100 ? RaceManager.instance.selectPlantId - 100 : RaceManager.instance.selectPlantId;
            var petNum = module.RaceManager.instance.userInfo.plantInfoDic.get(plantId).chichenInfoList;
            // petNum.forEach(item => {
            // 	if (item) {
            // 		arr.push(item)
            // 	}
            // })
            this.img_ji2.skin = module.RaceManager.instance.getLogimg(plantId);
            this.img_gate_text.skin = module.RaceManager.instance.getLogNameimg(plantId);
            this.text_garden.text = petNum.length + '/10';
            if (petNum.length == 0) {
                this.text_garden.text = '1/10';
            }
        };
        BottomView.prototype.initEvents = function () {
            // this.btn_run.on(laya.events.Event.CLICK, this, this.onBtnRunClick);
            this.btn_gate.on(laya.events.Event.CLICK, this, this.onBtnGateClick);
            module.RaceManager.instance.on(module.RaceManager.ADD_EGG, this, this.onAddEgg);
            manager.EventManager.instance.on(BottomView.UNLOCK, this, this.initView);
        };
        BottomView.prototype.removeEvents = function () {
            module.RaceManager.instance.off(module.RaceManager.ADD_EGG, this, this.onAddEgg);
            manager.EventManager.instance.off(BottomView.UNLOCK, this, this.initView);
        };
        BottomView.prototype.onAddEgg = function () {
            for (var i = 0; i < this.gridItems.length; i++) {
                this.gridItems[i].updateSlot();
            }
        };
        /* 点击去比赛按钮 */
        BottomView.prototype.onBtnRunClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.getPlantInfo().getChichenCount() > 0) {
                var dialog = new module.StartRaceDialog();
                manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
                // 埋点统计
                Main.app.mwx.dataLog(dtLogConfig.RaceClick, { "success": 0 });
            }
        };
        BottomView.prototype.onBtnGateClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            manager.EventManager.instance.event("OPEN_SELECTGATEDIALOG");
            var dialog = new module.SelectGateDialog();
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
        };
        BottomView.prototype.destroy = function () {
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        BottomView.UNLOCK = "BottomView" + "UNLOCK"; // 
        return BottomView;
    }(ui.game.BottomViewUI));
    module.BottomView = BottomView;
})(module || (module = {}));
//# sourceMappingURL=BottomView.js.map