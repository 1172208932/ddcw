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
 * 左边抽屉按钮视图
 */
var module;
(function (module) {
    var LeftBtnsDialog = /** @class */ (function (_super) {
        __extends(LeftBtnsDialog, _super);
        function LeftBtnsDialog() {
            var _this = _super.call(this) || this;
            _this.initEvents();
            return _this;
        }
        LeftBtnsDialog.prototype.initEvents = function () {
            this.sfBtn.on(Laya.Event.MOUSE_DOWN, this, this.onSs);
        };
        // 神手游戏
        LeftBtnsDialog.prototype.onSs = function () {
            if (Main.app.mwx.buttonType) {
                gameBox.showBoxPage("", Main.app.mwx.games_box, "宠物蛋蛋");
                Main.app.TiaoZhuanIndex = 1;
                // 埋点统计
                Main.app.mwx.dataLog(dtLogConfig.ChouTiIcon, { "success": 0 });
            }
        };
        LeftBtnsDialog.prototype.setVolume = function () {
            if (laya.media.SoundManager.muted) {
                laya.media.SoundManager.muted = false;
                laya.media.SoundManager.setMusicVolume(1);
                laya.media.SoundManager.setSoundVolume(1);
            }
            else {
                laya.media.SoundManager.muted = true;
                laya.media.SoundManager.setMusicVolume(0);
                laya.media.SoundManager.setSoundVolume(0);
            }
        };
        return LeftBtnsDialog;
    }(ui.view.leftBtnsViewUI));
    module.LeftBtnsDialog = LeftBtnsDialog;
})(module || (module = {}));
//# sourceMappingURL=LeftBtnsdialog.js.map