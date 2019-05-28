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
    var PlayGameView = /** @class */ (function (_super) {
        __extends(PlayGameView, _super);
        function PlayGameView() {
            var _this = _super.call(this) || this;
            _this.arrow = null;
            _this.setEvents();
            return _this;
        }
        /* 设置响应事件 */
        PlayGameView.prototype.setEvents = function () {
            this.btn_run.on(laya.events.Event.CLICK, this, this.onBtnRunClick);
        };
        /* 点击去比赛按钮 */
        PlayGameView.prototype.onBtnRunClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.getPlantInfo().getChichenCount() > 0) {
                var dialog = new module.StartRaceDialog();
                manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
                // 埋点统计
                Main.app.mwx.dataLog(dtLogConfig.RaceClick, { "success": 0 });
            }
        };
        /* 移除响应事件 */
        PlayGameView.prototype.removeEvents = function () {
        };
        /* 销毁 */
        PlayGameView.prototype.destroy = function () {
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return PlayGameView;
    }(ui.game.PlayGameViewUI));
    module.PlayGameView = PlayGameView;
})(module || (module = {}));
//# sourceMappingURL=PlayGameView.js.map