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
 * 右边的更多游戏;
 */
var module;
(function (module) {
    var RightBtnsDialog = /** @class */ (function (_super) {
        __extends(RightBtnsDialog, _super);
        function RightBtnsDialog() {
            var _this = _super.call(this) || this;
            _this.init();
            _this.initEvents();
            return _this;
        }
        RightBtnsDialog.prototype.init = function () {
            this.showGG();
            // 旋转动画
            Laya.Tween.clearAll(this.moreGame);
            this.tween1(this.moreGame);
            // 开启定时切换游戏
            if (Main.app.mwx.ofIconTime > 0) {
                Laya.timer.loop(Main.app.mwx.ofIconTime, this, this.showGG);
            }
        };
        RightBtnsDialog.prototype.initEvents = function () {
            this.moreGame.on(Laya.Event.MOUSE_DOWN, this, this.showMore, [this.moreGame]);
            module.RaceManager.instance.on(module.RaceManager.RightButtonVisiable, this, this.setRightBtnVisiable);
        };
        RightBtnsDialog.prototype.setRightBtnVisiable = function (show) {
            this.visible = show;
        };
        // 展示广告
        RightBtnsDialog.prototype.showMore = function (btn) {
            if (Main.app.mwx.buttonType) {
                var obj = Main.app.mwx.getMoreUrl(btn.name);
                if (obj == null) {
                    return;
                }
                Main.app.mwx.reportADHit(btn.name);
                gameBox.showBoxPage(obj["appid"], Main.app.mwx.games_box, "宠物蛋蛋");
                Main.app.TiaoZhuanIndex = 2;
                // 埋点统计
                Main.app.mwx.dataLog(dtLogConfig.DaoLiuIcon, { "success": 0 });
            }
        };
        RightBtnsDialog.prototype.showGG = function () {
            this.moreGame.visible = true;
            // Main.app.mwx.initMore(this.moreGame, "btn", true);
        };
        // 缓动
        RightBtnsDialog.prototype.tween1 = function (btn, delay) {
            if (delay === void 0) { delay = 0; }
            Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween2, [btn]), delay);
        };
        RightBtnsDialog.prototype.tween2 = function (btn) {
            Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween3, [btn]));
        };
        RightBtnsDialog.prototype.tween3 = function (btn) {
            Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween4, [btn]));
        };
        RightBtnsDialog.prototype.tween4 = function (btn) {
            Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween1, [btn]), 2000);
        };
        return RightBtnsDialog;
    }(ui.view.rightBtnsViewUI));
    module.RightBtnsDialog = RightBtnsDialog;
})(module || (module = {}));
//# sourceMappingURL=RightBtnsDialog.js.map