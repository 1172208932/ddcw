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
 * 右边的菜单界面
 */
var module;
(function (module) {
    var RightToolView = /** @class */ (function (_super) {
        __extends(RightToolView, _super);
        function RightToolView() {
            var _this = _super.call(this) || this;
            _this.type = 0;
            _this.updateShow();
            _this.btn_timereward.on(laya.events.Event.CLICK, _this, _this.onBtnTimeReward);
            _this.btn_task.on(laya.events.Event.CLICK, _this, _this.onBtnTask);
            _this.btn_buy.on(laya.events.Event.CLICK, _this, _this.onBtnBuy);
            _this.btn_shar.on(laya.events.Event.CLICK, _this, _this.onBtnShare);
            _this.btn_rank.on(laya.events.Event.CLICK, _this, _this.onRank);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_USER_DATA, _this, _this.updateShow);
            manager.EventManager.instance.on(RightToolView.HIDE_RED, _this, _this.hideRed);
            Laya.Tween.clearAll(_this.btn_shar);
            _this.tween1(_this.btn_shar);
            _this.setRed();
            return _this;
        }
        RightToolView.prototype.setRed = function () {
            var nowDate = new Date();
            var hour = nowDate.getHours();
            console.log("hour : " + hour);
            if (hour >= 22) {
                this.redPoint.visible = false;
                this.type = 1;
            }
            else if (hour >= 17) {
                this.type = 2;
            }
            else if (hour >= 11) {
                this.type = 3;
            }
            else {
                this.redPoint.visible = false;
                this.type = 4;
            }
            var timeRewardCount = module.RaceManager.instance.userInfo.timeRewardCount;
            if (this.type == 3) {
                if (timeRewardCount == 0) {
                    this.redPoint.visible = true;
                }
                else {
                    this.redPoint.visible = false;
                }
            }
            else if (this.type == 2) {
                if (timeRewardCount == 2) {
                    this.redPoint.visible = false;
                }
                else {
                    this.redPoint.visible = true;
                }
            }
        };
        RightToolView.prototype.hideRed = function () {
            this.redPoint.visible = false;
        };
        // 缓动
        RightToolView.prototype.tween1 = function (btn, delay) {
            if (delay === void 0) { delay = 0; }
            Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween2, [btn]), delay);
        };
        RightToolView.prototype.tween2 = function (btn) {
            Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween3, [btn]));
        };
        RightToolView.prototype.tween3 = function (btn) {
            Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween4, [btn]));
        };
        RightToolView.prototype.tween4 = function (btn) {
            Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween1, [btn]), 2000);
        };
        RightToolView.prototype.updateShow = function () {
            var by = 0;
            if (module.RaceManager.instance.userInfo.chengTaskComplete() == false && Main.app.mwx.mFHKeep) {
                this.btn_task.visible = true;
                this.btn_task.y = by;
                by += 154;
            }
            else {
                this.btn_task.visible = false;
            }
            if (module.RaceManager.instance.userInfo.checkInvitationComplete() == false && Main.app.mwx.mFHKeep) {
                this.btn_shar.visible = true;
                this.btn_shar.y = by;
                by += 54;
            }
            else {
                this.btn_shar.visible = false;
            }
            if (module.RaceManager.instance.userInfo.checkDayTimeComplete() == true) {
                this.btn_buy.visible = true;
                this.btn_buy.y = by;
                by += 104;
            }
            else {
                this.btn_buy.visible = false;
            }
            // this.btn_rank.visible = true;
            // this.btn_rank.y = by;
            // by += 104;
            if (module.RaceManager.instance.userInfo.checkTimeRewardComplete() == false) {
                this.btn_timereward.visible = true;
                this.btn_timereward.y = by;
                by += 104;
            }
            else {
                this.btn_timereward.visible = false;
            }
            this.height = by;
        };
        /* 好友排行 */
        RightToolView.prototype.onRank = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.RankDialog();
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
        };
        // 在线礼包
        RightToolView.prototype.onBtnTimeReward = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.TimeRewardDialog();
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
        };
        // 任务按钮
        RightToolView.prototype.onBtnTask = function () {
            manager.SoundPlayMgr.instance.playButtonClick(); //点击音效
            var dialog = new module.TaskDialog(); //新建实例
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0); //
        };
        // 每日礼包
        RightToolView.prototype.onBtnBuy = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.DayBuyDialog();
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
        };
        // 邀请
        RightToolView.prototype.onBtnShare = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var dialog = new module.InvitationFriendDialog();
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
        };
        RightToolView.prototype.destroy = function () {
            module.RaceManager.instance.off(module.RaceManager.CHANGE_USER_DATA, this, this.updateShow);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        RightToolView.HIDE_RED = "RightToolView" + "HIDE_RED";
        return RightToolView;
    }(ui.game.RightToolViewUI));
    module.RightToolView = RightToolView;
})(module || (module = {}));
//# sourceMappingURL=RightToolView.js.map