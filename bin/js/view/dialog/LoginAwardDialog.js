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
    var Point = laya.maths.Point;
    var LoginAwardDialog = /** @class */ (function (_super) {
        __extends(LoginAwardDialog, _super);
        function LoginAwardDialog() {
            var _this = _super.call(this) || this;
            _this.initView();
            _this.initEvents();
            return _this;
        }
        LoginAwardDialog.prototype.initView = function () {
            this.clip_c.skin = manager.configManager.instance.CDN_BOOT + "gate/clip_reward-pic.png";
            this.updateShow();
        };
        LoginAwardDialog.prototype.initEvents = function () {
            this.btn_close.on(laya.events.Event.CLICK, this, this.onbtnClose);
            this.btn_look.on(laya.events.Event.CLICK, this, this.HowGetSecondGift);
            this.img_egg1.on(laya.events.Event.CLICK, this, this.onBtnGet1);
            this.img_egg2.on(laya.events.Event.CLICK, this, this.onBtnGet2);
            this.img_egg3.on(laya.events.Event.CLICK, this, this.onBtnGet3);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_USER_DATA, this, this.updateShow);
            module.RaceManager.instance.on(module.RaceManager.LOOKTOSECONDGIFE, this, this.onLook);
        };
        LoginAwardDialog.prototype.removeEvents = function () {
            module.RaceManager.instance.off(module.RaceManager.CHANGE_USER_DATA, this, this.updateShow);
            module.RaceManager.instance.off(module.RaceManager.LOOKTOSECONDGIFE, this, this.onLook);
        };
        LoginAwardDialog.prototype.updateShow = function () {
            var loginRewardDay = module.RaceManager.instance.userInfo.loginRewardDay;
            this.img_get1.visible = loginRewardDay >= 1;
            this.img_get2.visible = loginRewardDay >= 2;
            this.img_get3.visible = loginRewardDay >= 3;
            this.img_get4.visible = loginRewardDay >= 4;
            this.img_get5.visible = loginRewardDay >= 5;
            this.img_get6.visible = loginRewardDay >= 6;
            this.img_get7.visible = loginRewardDay >= 7;
            var loginRewardCount = module.RaceManager.instance.userInfo.loginRewardCount;
            var loginLookVideo = module.RaceManager.instance.userInfo.loginLookVideo == 1;
            if (loginRewardCount == 0) {
                this.img_tip2.visible = false;
                this.img_tip.visible = true;
                this.box_look.visible = false;
                this.img_egg1.visible = this.img_egg2.visible = this.img_egg3.visible = this.img_tip.visible = true;
                this.ani2.play(0, true);
                this.ani3.play(0, true);
                this.ani4.play(0, true);
            }
            else if (loginRewardCount == 1) {
                if (loginLookVideo == false) {
                    this.img_tip2.visible = true;
                    this.img_tip.visible = false;
                    this.box_look.visible = true;
                    this.img_egg1.visible = this.img_egg2.visible = this.img_egg3.visible = this.img_tip.visible = false;
                    this.ani2.stop();
                    this.ani2.stop();
                    this.ani2.stop();
                }
                else {
                    this.img_tip2.visible = false;
                    this.img_tip.visible = true;
                    this.box_look.visible = false;
                    this.img_egg1.visible = this.img_egg2.visible = this.img_egg3.visible = this.img_tip.visible = true;
                    this.ani2.play(0, true);
                    this.ani3.play(0, true);
                    this.ani4.play(0, true);
                }
            }
            else {
                this.img_tip2.visible = false;
                this.img_tip.visible = true;
                this.box_look.visible = false;
                this.img_egg1.visible = this.img_egg2.visible = this.img_egg3.visible = this.img_tip.visible = true;
                this.ani2.gotoAndStop(10);
                this.ani3.gotoAndStop(10);
                this.ani4.gotoAndStop(10);
                this.img_egg1.disabled = true;
                this.img_egg2.disabled = true;
                this.img_egg3.disabled = true;
            }
        };
        LoginAwardDialog.prototype.onLook = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.userInfo.setLoginLookVideo(true);
        };
        LoginAwardDialog.prototype.onBtnGet1 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.userInfo.setLoginRewardCount(module.RaceManager.instance.userInfo.loginRewardCount + 1);
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new Point(165, 690)), 2, 100]);
        };
        LoginAwardDialog.prototype.onBtnGet2 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.userInfo.setLoginRewardCount(module.RaceManager.instance.userInfo.loginRewardCount + 1);
            var count = module.RaceManager.instance.userInfo.loginRewardDay + 1 == 7 ? 4 : 1;
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new Point(330, 690)), 3, count]);
        };
        LoginAwardDialog.prototype.onBtnGet3 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.userInfo.setLoginRewardCount(module.RaceManager.instance.userInfo.loginRewardCount + 1);
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new Point(500, 690)), 2, 100]);
        };
        LoginAwardDialog.prototype.onbtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        LoginAwardDialog.prototype.destroy = function () {
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        LoginAwardDialog.prototype.HowGetSecondGift = function () {
            if (Main.app.mwx.ofSignTwice == 1) {
                // 直接使用
                this.onLook();
            }
            else if (Main.app.mwx.ofSignTwice == 2 || Main.app.mwx.ofSignTwice == 4) {
                // 看视频使用
                if (Main.app.mwx.avShowType == false) {
                    return;
                }
                Main.app.mwx.avShowType = false;
                var self_1 = this;
                Laya.timer.once(500, self_1, function () {
                    self_1.onVideo(Main.app.mwx.ofSignTwice);
                });
            }
            else if (Main.app.mwx.ofSignTwice == 3) {
                // 分享使用
                this.onShare();
            }
            else {
                // 暂不支持
                Main.app.showMessage("功能暂未开放");
            }
        };
        /* 看视频 */
        LoginAwardDialog.prototype.onVideo = function (type) {
            var self = this;
            wxCore.uo.loadingVideo(function (ok) {
                if (ok) {
                    wxCore.uo.showVideoAD(function (played) {
                        if (played) {
                            self.onLook();
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
        /* 分享 */
        LoginAwardDialog.prototype.onShare = function () {
            if (Main.app.shareIndex > 0) {
                return;
            }
            Main.app.shareIndex = 5;
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
        return LoginAwardDialog;
    }(ui.game.LoginAwardDialogUI));
    module.LoginAwardDialog = LoginAwardDialog;
})(module || (module = {}));
//# sourceMappingURL=LoginAwardDialog.js.map