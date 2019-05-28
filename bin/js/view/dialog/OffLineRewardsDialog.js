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
    var OffLineRewardsDialog = /** @class */ (function (_super) {
        __extends(OffLineRewardsDialog, _super);
        function OffLineRewardsDialog(offLineCoint) {
            var _this = _super.call(this) || this;
            _this.offLineCoint = 0;
            _this.offLineCoint = offLineCoint;
            var txt_coin = new module.FontClip("ui/num_a_", 200, 235, 330, 40, "center");
            _this.box.addChild(txt_coin);
            txt_coin.text = "c" + offLineCoint;
            _this.btn_double.on(laya.events.Event.CLICK, _this, _this.HowGetDoubleOffAward);
            _this.btn_ok.on(laya.events.Event.CLICK, _this, _this.onBtnOk);
            module.RaceManager.instance.on(module.RaceManager.LOOKTODOUBLEOFFAWARD, _this, _this.onBtnDouble);
            return _this;
        }
        OffLineRewardsDialog.prototype.onBtnDouble = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.box.localToGlobal(new laya.maths.Point(350, 255)), 2, this.offLineCoint * 2]);
            this.destroy();
        };
        OffLineRewardsDialog.prototype.onBtnOk = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.box.localToGlobal(new laya.maths.Point(350, 255)), 2, this.offLineCoint]);
            this.destroy();
        };
        OffLineRewardsDialog.prototype.destroy = function () {
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        OffLineRewardsDialog.prototype.HowGetDoubleOffAward = function () {
            if (Main.app.mwx.ofOfflineReword == 1) {
                // 直接使用
                this.onBtnDouble();
            }
            else if (Main.app.mwx.ofOfflineReword == 2 || Main.app.mwx.ofOfflineReword == 4) {
                // 看视频使用
                if (Main.app.mwx.avShowType == false) {
                    return;
                }
                Main.app.mwx.avShowType = false;
                var self_1 = this;
                Laya.timer.once(500, self_1, function () {
                    self_1.onVideo(Main.app.mwx.ofOfflineReword);
                });
            }
            else if (Main.app.mwx.ofOfflineReword == 3) {
                // 分享使用
                this.onShare();
            }
            else {
                // 暂不支持
                Main.app.showMessage("功能暂未开放");
            }
        };
        /* 看视频 */
        OffLineRewardsDialog.prototype.onVideo = function (type) {
            var self = this;
            wxCore.uo.loadingVideo(function (ok) {
                if (ok) {
                    wxCore.uo.showVideoAD(function (played) {
                        if (played) {
                            self.onBtnDouble();
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
        OffLineRewardsDialog.prototype.onShare = function () {
            if (Main.app.shareIndex > 0) {
                return;
            }
            Main.app.shareIndex = 7;
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
        return OffLineRewardsDialog;
    }(ui.game.OffLineRewardViewUI));
    module.OffLineRewardsDialog = OffLineRewardsDialog;
})(module || (module = {}));
//# sourceMappingURL=OffLineRewardsDialog.js.map