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
    var TimeRewardDialog = /** @class */ (function (_super) {
        __extends(TimeRewardDialog, _super);
        function TimeRewardDialog() {
            var _this = _super.call(this) || this;
            _this.type = 0;
            _this.updateShow();
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            _this.btn_get.on(laya.events.Event.CLICK, _this, _this.selectEvent);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_USER_DATA, _this, _this.updateShow);
            module.RaceManager.instance.on(TimeRewardDialog.GET_ICON, _this, _this.onBtnGet);
            // Main.app.mwx.showBanner();
            BridgeUtil.callAppMethod("showBanner");
            return _this;
        }
        TimeRewardDialog.prototype.onBtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        TimeRewardDialog.prototype.updateShow = function () {
            var timeRewardCount = module.RaceManager.instance.userInfo.timeRewardCount;
            var nowDate = new Date();
            var hour = nowDate.getHours();
            console.log("hour : " + hour);
            if (hour >= 22) {
                this.btn_get.gray = true;
                this.type = 1;
            }
            else if (hour >= 17) {
                this.type = 2;
            }
            else if (hour >= 11) {
                this.type = 3;
            }
            else {
                this.type = 4;
                this.btn_get.gray = true;
            }
            if (this.type == 4) {
                // this.txt_tip.text = "奖励开启倒计时：";
                var date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 11, 0, 0, 0);
            }
            else if (this.type == 3) {
                if (timeRewardCount == 0) {
                    // this.txt_tip.text = "奖励领取倒计时：";
                }
                else {
                    // this.txt_tip.text = "奖励开启倒计时：";
                }
                date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 17, 0, 0, 0);
            }
            else if (this.type == 2) {
                if (timeRewardCount == 2) {
                    // this.txt_tip.text = "奖励开启倒计时：";
                    date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 11, 0, 0, 0);
                }
                else {
                    // this.txt_tip.text = "奖励领取倒计时：";
                    date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 22, 0, 0, 0);
                }
            }
            else if (this.type == 1) {
                // this.txt_tip.text = "奖励开启倒计时：";
                date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 11, 0, 0, 0);
            }
        };
        /* 分享 */
        TimeRewardDialog.prototype.onShare = function () {
            if (Main.app.shareIndex > 0) {
                return;
            }
            Main.app.shareIndex = 18;
            Main.app.shareTimestamp = new Date().getTime();
            var title, imageUrl, shjson;
            Main.app.mwx.shareurl.forEach(function (item) {
                if (item.id == Main.app.shareIndex) {
                    shjson = item;
                    title = item.title;
                    imageUrl = item.url;
                }
            });
            wx.shareAppMessage({
                title: title,
                imageUrl: imageUrl,
                query: "uid=" + Main.app.mwx.mUID + ("&surl=" + Main.app.shareIndex)
            });
        };
        TimeRewardDialog.prototype.selectEvent = function () {
            // if (Main.app.mwx.ofOlineType == 1) {
            // 	this.onShare()
            // } else {
            this.onBtnGet();
            // }
        };
        TimeRewardDialog.prototype.onBtnGet = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var timeRewardCount = module.RaceManager.instance.userInfo.timeRewardCount;
            if (this.type == 3) {
                if (timeRewardCount == 0) {
                    module.RaceManager.instance.userInfo.setTimeRewardCount(1);
                    manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(373, 417)), 2, 50]);
                    manager.EventManager.instance.event(module.RightToolView.HIDE_RED);
                }
                else {
                    Main.app.showMessage("奖励已经领取");
                }
            }
            else if (this.type == 2) {
                if (timeRewardCount == 2) {
                    Main.app.showMessage("奖励已经领取");
                }
                else {
                    module.RaceManager.instance.userInfo.setTimeRewardCount(2);
                    manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(373, 417)), 2, 50]);
                    manager.EventManager.instance.event(module.RightToolView.HIDE_RED);
                }
            }
        };
        TimeRewardDialog.prototype.destroy = function () {
            // Main.app.mwx.closeBanner();
            BridgeUtil.callAppMethod("hideBanner");
            module.RaceManager.instance.off(module.RaceManager.CHANGE_USER_DATA, this, this.updateShow);
            module.RaceManager.instance.off(TimeRewardDialog.GET_ICON, this, this.onBtnGet);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        TimeRewardDialog.GET_ICON = "TimeRewardDialog" + "GET_ICON";
        return TimeRewardDialog;
    }(ui.game.TimeRewardDialogUI));
    module.TimeRewardDialog = TimeRewardDialog;
})(module || (module = {}));
//# sourceMappingURL=TimeRewardDialog.js.map