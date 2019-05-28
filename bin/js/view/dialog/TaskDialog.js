// module module {
// 	export class TaskDialog extends ui.view.taskViewUI {
// 		constructor() {
// 			super()
// 		}
// 	}
// }
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
    var TaskDialog = /** @class */ (function (_super) {
        __extends(TaskDialog, _super);
        function TaskDialog() {
            var _this = _super.call(this) || this;
            _this.configs = [0, 2, 3, 1, 2, 1];
            Main.app.mwx.showBanner();
            _this.initView();
            _this.initEvents();
            console.log(_this._childs);
            return _this;
        }
        TaskDialog.prototype.initView = function () {
            this.updateShow();
        };
        TaskDialog.prototype.initEvents = function () {
            this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
            this.TaskProgress1.on(laya.events.Event.CLICK, this, this.onBtnGet1);
            this.TaskProgress2.on(laya.events.Event.CLICK, this, this.onBtnGet2);
            this.TaskProgress3.on(laya.events.Event.CLICK, this, this.onBtnGet3);
            this.TaskProgress4.on(laya.events.Event.CLICK, this, this.onBtnGet4);
            this.TaskProgress5.on(laya.events.Event.CLICK, this, this.onBtnGet5);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_USER_DATA, this, this.updateShow);
        };
        TaskDialog.prototype.removeEvents = function () {
            module.RaceManager.instance.off(module.RaceManager.CHANGE_USER_DATA, this, this.updateShow);
        };
        TaskDialog.prototype.updateShow = function () {
            for (var i = 1; i <= 5; i++) {
                var data = module.RaceManager.instance.userInfo.getTaskData(i);
                var box_get = this["TaskProgress" + i];
                var txt_count = this["TaskTimes" + i];
                if (data == null) {
                    // txt_count.text = "(" + 0 + "/" + this.configs[i] + ")";
                    txt_count.text = "0";
                    // box_get.mouseEnabled = false
                    // box_get.disabled = true;
                }
                else {
                    if (data.count < this.configs[i]) {
                        txt_count.text = data.count.toString();
                        // txt_count.text = "(" + data.count + "/" + this.configs[i] + ")";
                        // box_get.disabled = true;
                        // box_get.mouseEnabled = false
                    }
                    else {
                        // txt_count.text = "(" + this.configs[i] + "/" + this.configs[i] + ")";
                        txt_count.text = this.configs[i].toString();
                        if (data.isGetReward == 1) {
                            //已领取
                            box_get.disabled = true;
                            box_get.skin = "view/taskBtn_3.png";
                            box_get.mouseEnabled = false;
                        }
                        else {
                            box_get.skin = "view/taskBtn_5.png";
                            box_get.mouseEnabled = true;
                            // box_get.disabled = false;
                        }
                    }
                }
            }
        };
        TaskDialog.prototype.onBtnGet1 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var data = module.RaceManager.instance.userInfo.getTaskData(1);
            if (data != null) {
                if (data.count >= this.configs[1] && data.isGetReward == 0) {
                    module.RaceManager.instance.userInfo.getTaskReward(1);
                    manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(545, 200)), 2, 50]);
                }
            }
        };
        TaskDialog.prototype.onBtnGet2 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var data = module.RaceManager.instance.userInfo.getTaskData(2);
            if (data != null) {
                if (data.count >= this.configs[2] && data.isGetReward == 0) {
                    module.RaceManager.instance.userInfo.getTaskReward(2);
                    manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(545, 360)), 2, 50]);
                }
            }
        };
        TaskDialog.prototype.onBtnGet3 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var data = module.RaceManager.instance.userInfo.getTaskData(3);
            if (data != null) {
                if (data.count >= this.configs[3] && data.isGetReward == 0) {
                    module.RaceManager.instance.userInfo.getTaskReward(3);
                    manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(545, 520)), 2, 50]);
                }
            }
        };
        TaskDialog.prototype.onBtnGet4 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var data = module.RaceManager.instance.userInfo.getTaskData(4);
            if (data != null) {
                if (data.count >= this.configs[4] && data.isGetReward == 0) {
                    module.RaceManager.instance.userInfo.getTaskReward(4);
                    manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(545, 680)), 2, 100]);
                }
                else {
                    this.onShare();
                }
            }
            else {
                this.onShare();
            }
        };
        TaskDialog.prototype.onBtnGet5 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            var data = module.RaceManager.instance.userInfo.getTaskData(5);
            if (data != null) {
                if (data.count >= this.configs[5] && data.isGetReward == 0) {
                    module.RaceManager.instance.userInfo.getTaskReward(5);
                    manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(545, 680)), 2, 100]);
                }
                else {
                    if (Main.app.mwx.ofLoginReward == 2 || Main.app.mwx.ofLoginReward == 4) {
                        // 看视频使用
                        if (Main.app.mwx.avShowType == false) {
                            return;
                        }
                        Main.app.mwx.avShowType = false;
                        var self_1 = this;
                        Laya.timer.once(500, self_1, function () {
                            self_1.onVideo(Main.app.mwx.ofLoginReward);
                        });
                    }
                }
            }
            else {
                if (Main.app.mwx.ofLoginReward == 2 || Main.app.mwx.ofLoginReward == 4) {
                    // 看视频使用
                    if (Main.app.mwx.avShowType == false) {
                        return;
                    }
                    Main.app.mwx.avShowType = false;
                    var self_2 = this;
                    Laya.timer.once(500, self_2, function () {
                        self_2.onVideo(Main.app.mwx.ofLoginReward);
                    });
                }
            }
        };
        TaskDialog.prototype.onBtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        TaskDialog.prototype.destroy = function () {
            Main.app.mwx.closeBanner();
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        /* 分享 */
        TaskDialog.prototype.onShare = function () {
            if (Main.app.shareIndex > 0) {
                return;
            }
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.DailyTaskShare, { "success": 0 });
            Main.app.shareIndex = 2;
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
        TaskDialog.prototype.onVideo = function (type) {
            var self = this;
            wxCore.uo.loadingVideo(function (ok) {
                if (ok) {
                    wxCore.uo.showVideoAD(function (played) {
                        if (played) {
                            module.RaceManager.instance.userInfo.addTaskCount(5);
                        }
                        else {
                            if (type == 4) {
                                self.onShare();
                            }
                            else {
                                Main.app.showMessage("需要观看完整视频");
                            }
                        }
                        Main.app.mwx.avShowType = true;
                    });
                }
                else {
                    if (Main.app.mwx.fhOnOff == 0) {
                        Main.app.showMessage("获取视频失败");
                    }
                    else {
                        self.onShare();
                    }
                    Main.app.mwx.avShowType = true;
                }
            });
        };
        return TaskDialog;
    }(ui.view.taskViewUI));
    module.TaskDialog = TaskDialog;
})(module || (module = {}));
//# sourceMappingURL=TaskDialog.js.map