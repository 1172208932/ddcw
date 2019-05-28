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
    var Event = laya.events.Event;
    var GameView = /** @class */ (function (_super) {
        __extends(GameView, _super);
        function GameView() {
            var _this = _super.call(this) || this;
            _this.faceId = 0;
            _this.raceView = null;
            _this.loginView = null;
            _this.type = 1;
            _this.initView();
            _this.initEvents();
            return _this;
        }
        GameView.prototype.initView = function () {
            manager.SoundPlayMgr.instance.playBgMusic(6);
        };
        GameView.prototype.initEvents = function () {
            //在这里对时间进行注册
            this.on(Event.ADDED, this, this.onAddeds);
            manager.EventManager.instance.on(GameView.GOTO_RACE_VIEW, this, this.onGotoRaceView);
            manager.EventManager.instance.on(GameView.GOTO_INDEX_VIEW, this, this.onGotoIndexView);
        };
        GameView.prototype.removeEvents = function () {
            this.off(Event.ADDED, this, this.onAddeds);
        };
        GameView.prototype.onAddeds = function () {
            //感觉像帧同步的事件
            manager.EnterFrameManager.instance.addItem(this);
        };
        GameView.prototype.onGotoRaceView = function () {
            var _this = this;
            // if (Main.app.is_wx) {
            if (this.raceView == null) {
                this.raceView = new module.RaceView();
                this.addChildAt(this.raceView, 0);
                Main.app.raceView = this.raceView;
            }
            this.raceView.visible = true;
            this.raceView.initData();
            // } else {
            // 	if (this.raceView == null) {
            // 		this.raceView = new RaceView();
            // 		this.addChildAt(this.raceView, 0);
            // 		Main.app.raceView = this.raceView;
            // 		this.raceView.visible = false
            // 	}
            // 	if (this.loginView == null) {
            // 		Laya.loader.load(['gate/bg_text_4.png','gate/login_bg.png','gate/login_img02.png'], laya.utils.Handler.create(this, () => {
            // 			this.loginView = new LoginView2();
            // 			this.addChildAt(this.loginView, 0);
            // 			Main.app.loginView = this.loginView
            // 			this.loginView.visible = true
            // 		}))
            // 		// Main.app.raceView = this.raceView;
            // 	}
            // }
            this.img_mask.visible = true;
            this.img_mask.alpha = 1;
            // 读条结束
            Main.app.pView.overProgress();
            Laya.timer.once(500, this, function () {
                _this.indexView.visible = false;
            });
            // this.raceView.initData();
            this.type = 1;
            //每一个子节点都会加上帧同步？
            manager.EnterFrameManager.instance.addItem(this);
        };
        GameView.prototype.onGotoIndexView = function () {
            this.img_mask.visible = true;
            this.img_mask.alpha = 1;
            this.raceView.visible = false;
            this.indexView.visible = true;
            this.type = 2;
            manager.EnterFrameManager.instance.addItem(this);
        };
        /**帧循环执行函数 */
        GameView.prototype.onEnterFrame = function () {
            this.img_mask.alpha -= 0.2;
            if (this.img_mask.alpha <= 0) {
                manager.EnterFrameManager.instance.removeItem(this.faceId);
                if (this.type == 1) {
                }
            }
        };
        GameView.prototype.destroy = function () {
            manager.EnterFrameManager.instance.removeItem(this.faceId);
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        GameView.GOTO_RACE_VIEW = "GameView" + "GOTO_RACE_VIEW";
        GameView.GOTO_INDEX_VIEW = "GameView" + "GOTO_INDEX_VIEW";
        return GameView;
    }(ui.game.GameViewUI));
    module.GameView = GameView;
})(module || (module = {}));
//# sourceMappingURL=GameView.js.map