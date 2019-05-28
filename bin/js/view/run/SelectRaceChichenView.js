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
    var SelectRaceChichenView = /** @class */ (function (_super) {
        __extends(SelectRaceChichenView, _super);
        function SelectRaceChichenView() {
            var _this = _super.call(this) || this;
            _this.itemList = [];
            _this.arrow = null;
            _this.initView();
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            return _this;
        }
        SelectRaceChichenView.prototype.initView = function () {
            for (var i = 1; i <= 10; i++) {
                var item = this["item" + i];
                item.index = i - 1;
                item.showChichen(module.RaceManager.instance.selectPlantId);
                this.itemList.push(item);
                item.on(laya.events.Event.CLICK, this, this.onItemClick);
            }
            if (module.RaceManager.instance.guidRun == 1) {
                this.arrow = new module.GuidArrowView();
                this.arrow.setGuidRun3();
                this.box.addChild(this.arrow);
            }
        };
        SelectRaceChichenView.prototype.show = function () {
            this.visible = true;
            for (var i = 0; i < this.itemList.length; i++) {
                this.itemList[i].showChichen(module.RaceManager.instance.selectPlantId);
            }
        };
        SelectRaceChichenView.prototype.onItemClick = function (e) {
            manager.SoundPlayMgr.instance.playButtonClick();
            var item = e.currentTarget;
            if (item.chichenInfo != null) {
                this.event(module.RunView.START_GAME, [item.chichenInfo, module.RaceManager.instance.guidRun]);
                if (this.arrow != null) {
                    module.RaceManager.instance.setGuidRunComplete();
                    this.arrow.destroy();
                    this.arrow = null;
                }
            }
        };
        SelectRaceChichenView.prototype.onBtnClose = function () {
            module.RaceManager.instance.event(module.RaceManager.RightButtonVisiable, [true]);
            manager.SoundPlayMgr.instance.playButtonClick();
            manager.EventManager.instance.event(module.RaceView.CLOSE_RUN);
        };
        return SelectRaceChichenView;
    }(ui.race.SelectRaceChichenViewUI));
    module.SelectRaceChichenView = SelectRaceChichenView;
})(module || (module = {}));
//# sourceMappingURL=SelectRaceChichenView.js.map