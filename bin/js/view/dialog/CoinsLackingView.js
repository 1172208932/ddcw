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
 * 送金币的弹窗
 */
var module;
(function (module) {
    var CoinsLackingView = /** @class */ (function (_super) {
        __extends(CoinsLackingView, _super);
        function CoinsLackingView() {
            var _this = _super.call(this) || this;
            _this.closeBtn.on(laya.events.Event.CLICK, _this, _this.onClose);
            _this.receiveBtn.on(laya.events.Event.CLICK, _this, _this.onReceive);
            return _this;
        }
        /* 展示界面 */
        CoinsLackingView.prototype.showCoinsLackingView = function () {
            this.popup();
            var coins = Number(Main.app.mwx.ofCoinsLessParam["number"]);
            this.coinsTxt.text = "免费领取" + coins.toString() + "金币";
        };
        /* 领取金币按钮 */
        CoinsLackingView.prototype.onReceive = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.CoinsLacking, { "type": 0 });
            if (Main.app.mwx.ofCoinsLess == 1) {
                // 直接领取
                this.getCoins();
            }
            else if (Main.app.mwx.ofCoinsLess == 2 || Main.app.mwx.ofCoinsLess == 4) {
                // 看视频领取
                if (Main.app.mwx.avShowType == false)
                    return;
                Main.app.mwx.avShowType = false;
                var self_1 = this;
                Laya.timer.once(500, self_1, function () {
                    self_1.onVideo(Main.app.mwx.ofCoinsLess);
                });
            }
            else if (Main.app.mwx.ofCoinsLess == 3) {
                // 分享领取
                this.onShare();
            }
            else {
                Main.app.showMessage("此功能暂未开放");
            }
        };
        /* 领取金币操作 */
        CoinsLackingView.prototype.getCoins = function () {
            // 修改本地保存领取的次数
            var getCoinsCount = 0;
            var storageCount = wx.getStorageSync(Main.DianDianChongWu_GetFreeCoinsCount);
            if (!!storageCount)
                getCoinsCount = storageCount;
            getCoinsCount += 1;
            wx.setStorageSync(Main.DianDianChongWu_GetFreeCoinsCount, getCoinsCount);
            // 加金币
            manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Get_coin3");
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(375, 667), 2, Number(Main.app.mwx.ofCoinsLessParam["number"])]);
            this.closeCoinsLackingView();
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.CoinsLacking, { "type": Main.app.mwx.ofCoinsLess });
        };
        /* 看视频 */
        CoinsLackingView.prototype.onVideo = function (type) {
            var self = this;
            wxCore.uo.loadingVideo(function (ok) {
                if (ok) {
                    wxCore.uo.showVideoAD(function (played) {
                        if (played) {
                            self.getCoins();
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
        CoinsLackingView.prototype.onShare = function () {
            if (Main.app.shareIndex > 0)
                return;
            Main.app.shareIndex = 14;
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
        /* 关闭按钮 */
        CoinsLackingView.prototype.onClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.closeCoinsLackingView();
        };
        /* 关闭界面 */
        CoinsLackingView.prototype.closeCoinsLackingView = function () {
            this.close("", false);
        };
        return CoinsLackingView;
    }(ui.game.CoinsLackingDialogUI));
    module.CoinsLackingView = CoinsLackingView;
})(module || (module = {}));
//# sourceMappingURL=CoinsLackingView.js.map