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
var module;
(function (module) {
    var NextGateView = /** @class */ (function (_super) {
        __extends(NextGateView, _super);
        function NextGateView() {
            var _this = _super.call(this) || this;
            _this.initEvents();
            _this.initView();
            return _this;
        }
        NextGateView.prototype.initView = function () {
            this.plantId = module.RaceManager.instance.selectPlantId > 100 ? module.RaceManager.instance.selectPlantId - 100 : module.RaceManager.instance.selectPlantId;
            if (this.plantId == 8) {
                this.visible = false;
            }
            else {
                this.visible = true;
                this.showIcon(this.plantId + 1);
            }
            if (Main.app.mwx.ofBack == 0) {
                this.visible = false;
            }
        };
        NextGateView.prototype.showIcon = function (val) {
            this.iconGrade.skin = module.RaceManager.instance.getLogimg(val);
            if (module.RaceManager.instance.isOpenGate(val)) {
                this.luckImg.visible = false;
            }
            else {
                this.luckImg.visible = true;
            }
        };
        NextGateView.prototype.goGate = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.gotoGate(this.plantId + 1);
            manager.EventManager.instance.event(module.BottomView.UNLOCK);
        };
        NextGateView.prototype.initEvents = function () {
            this.iconGrade.on(laya.events.Event.CLICK, this, this.goGate);
            manager.EventManager.instance.on(module.BottomView.UNLOCK, this, this.initView);
        };
        NextGateView.prototype.removeEvents = function () {
            manager.EventManager.instance.off(module.BottomView.UNLOCK, this, this.initView);
        };
        NextGateView.prototype.destroy = function () {
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return NextGateView;
    }(ui.game.NextGateViewUI));
    module.NextGateView = NextGateView;
})(module || (module = {}));
//# sourceMappingURL=NextGateView.js.map