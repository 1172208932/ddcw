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
 * 送羽毛的弹窗
 */
var module;
(function (module) {
    var LocalStorage = laya.net.LocalStorage;
    var FeatherLackingView = /** @class */ (function (_super) {
        __extends(FeatherLackingView, _super);
        function FeatherLackingView() {
            var _this = _super.call(this) || this;
            _this.closeBtn.on(laya.events.Event.CLICK, _this, _this.onClose);
            _this.receiveBtn.on(laya.events.Event.CLICK, _this, _this.onReceive);
            return _this;
        }
        /* 展示界面 */
        FeatherLackingView.prototype.showFeatherLackingView = function () {
            this.popup();
            var feather = Number(Main.app.mwx.ofFeatherLessParam["number"]);
            this.featherTxt.text = "免费领取" + feather.toString() + "羽毛";
        };
        /* 领取羽毛按钮 */
        FeatherLackingView.prototype.onReceive = function () {
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.FeatherLacking, {"type":0});
            manager.SoundPlayMgr.instance.playButtonClick();
            // if (Main.app.mwx.ofFeatherLess == 1) {
            //     // 直接领取
            this.getFeather();
            // } else if (Main.app.mwx.ofFeatherLess == 2 || Main.app.mwx.ofFeatherLess == 4) {
            //     // 看视频领取
            //     if (Main.app.mwx.avShowType == false) return;
            // 	Main.app.mwx.avShowType = false;
            // 	let self = this;
            // 	Laya.timer.once(500, self, ()=>{
            // 		self.onVideo(Main.app.mwx.ofFeatherLess);
            // 	});
            // } else if (Main.app.mwx.ofFeatherLess == 3) {
            //     // 分享领取
            //     this.onShare();
            // } else {
            //     Main.app.showMessage("此功能暂未开放");
            // }
        };
        /* 领取金币操作 */
        FeatherLackingView.prototype.getFeather = function () {
            // 修改本地保存领取的次数
            var getFeatherCount = 0;
            var storageCount = Number(LocalStorage.getItem(Main.DianDianChongWu_GetFreeFeatherCount));
            // wx.getStorageSync(Main.DianDianChongWu_GetFreeFeatherCount);
            if (!!storageCount)
                getFeatherCount = storageCount;
            getFeatherCount += 1;
            LocalStorage.setItem(Main.DianDianChongWu_GetFreeFeatherCount, getFeatherCount + '');
            // wx.setStorageSync(Main.DianDianChongWu_GetFreeFeatherCount, getFeatherCount);
            // 加羽毛
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(375, 667), 3, Number(Main.app.mwx.ofFeatherLessParam["number"])]);
            this.closeFeatherLackingView();
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.FeatherLacking, { "type": Main.app.mwx.ofFeatherLess });
        };
        /* 看视频 */
        FeatherLackingView.prototype.onVideo = function (type) {
            var self = this;
            wxCore.uo.loadingVideo(function (ok) {
                if (ok) {
                    wxCore.uo.showVideoAD(function (played) {
                        if (played) {
                            self.getFeather();
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
        FeatherLackingView.prototype.onShare = function () {
            if (Main.app.shareIndex > 0)
                return;
            Main.app.shareIndex = 15;
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
        FeatherLackingView.prototype.onClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.closeFeatherLackingView();
        };
        /* 关闭界面 */
        FeatherLackingView.prototype.closeFeatherLackingView = function () {
            this.close("", false);
        };
        return FeatherLackingView;
    }(ui.game.FeatherLackingDialogUI));
    module.FeatherLackingView = FeatherLackingView;
})(module || (module = {}));
//# sourceMappingURL=FeatherLackingView.js.map