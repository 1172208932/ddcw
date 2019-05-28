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
    var EatApple = /** @class */ (function (_super) {
        __extends(EatApple, _super);
        function EatApple() {
            var _this = _super.call(this) || this;
            _this.arrow = null;
            _this.setEvents();
            return _this;
        }
        /* 设置响应事件 */
        EatApple.prototype.setEvents = function () {
            this.btn_apple.on(laya.events.Event.CLICK, this, this.onBtnAppleClick);
            // this.box_get.on(laya.events.Event.CLICK, this, this.getChicken)
            module.RaceManager.instance.on(module.RaceManager.CHANGE_GUID_APPLE, this, this.onChangeGuidApple);
        };
        /* 引导操作 */
        EatApple.prototype.onChangeGuidApple = function () {
            this.arrow = new module.GuidArrowView();
            this.arrow.setGuidRun4();
            this.box_apple.addChild(this.arrow);
        };
        /* 点击喂宠物按钮 */
        EatApple.prototype.onBtnAppleClick = function () {
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.MeatPatClick, { "success": 1 });
            // manager.SoundPlayMgr.instance.playButtonClick();
            // manager.EventManager.instance.event(ToolView.GOTO_MEAL);
            // this.btn_close_meal.visible = true;
            // this.box_apple.visible = false;
            // // this.box_get.visible = false
            if (this.arrow != null) {
                this.arrow.destroy();
                this.arrow = null;
            }
            // manager.EventManager.instance.event(RaceView.CONTROL_FALSE);
            manager.EventManager.instance.event(module.ToolView.EAT_APPLE);
        };
        /* 移除响应事件 */
        EatApple.prototype.removeEvents = function () {
            module.RaceManager.instance.off(module.RaceManager.CHANGE_GUID_APPLE, this, this.onChangeGuidApple);
        };
        /* 销毁 */
        EatApple.prototype.destroy = function () {
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return EatApple;
    }(ui.game.EatAppleUI));
    module.EatApple = EatApple;
})(module || (module = {}));
//# sourceMappingURL=EatApple.js.map