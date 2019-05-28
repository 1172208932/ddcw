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
 * 开蛋方式的界面
 */
var module;
(function (module) {
    var LocalStorage = laya.net.LocalStorage;
    var HatchNowView = /** @class */ (function (_super) {
        __extends(HatchNowView, _super);
        function HatchNowView() {
            var _this = _super.call(this) || this;
            _this._eggInfo = null;
            _this._coin = 0;
            _this.txt_coin = null;
            _this.txt_coin = new module.FontClip("ui/num_a_", 10, 25, 180, 40, "center");
            _this.txt_coin.scale(0.7, 0.7);
            _this.btn_ok.addChild(_this.txt_coin);
            if (Main.app.mwx.ofOpenType == 1) {
                _this.btn_ok.on(laya.events.Event.CLICK, _this, _this.onBtnOk);
            }
            else {
                _this.btn_ok.on(laya.events.Event.CLICK, _this, _this.onBtnOkCoin);
                _this.imgType.skin = 'ui/Atlas_0.png';
            }
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            _this.btn_open.on(laya.events.Event.CLICK, _this, _this.HowOpenEgg);
            module.RaceManager.instance.on(module.RaceManager.OPENEGGFREE, _this, _this.onBtnOpen);
            return _this;
        }
        HatchNowView.prototype.show = function (info, coin) {
            this.visible = true;
            this._coin = coin;
            this._eggInfo = info;
            this.txt_coin.text = Main.app.mwx.ofOpenType == 1 ? "1" : coin + "";
            // this.txt_coin.text = "1";			
            this.ani1.play(0, true);
            Laya.timer.once(3000, this, this.hide);
        };
        HatchNowView.prototype.hide = function () {
            this.visible = false;
            this.ani1.stop();
            Laya.timer.clear(this, this.hide);
        };
        HatchNowView.prototype.onBtnClose = function (play) {
            if (play === void 0) { play = true; }
            if (play)
                manager.SoundPlayMgr.instance.playButtonClick();
            this.visible = false;
            this.ani1.stop();
            Laya.timer.clear(this, this.hide);
        };
        /* 使用羽毛开蛋 */
        HatchNowView.prototype.onBtnOk = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.wing >= 1) { //zxx this._coin
                console.log("-----> ", this._eggInfo);
                module.RaceManager.instance.openEgg(this._eggInfo);
                module.RaceManager.instance.addWing(-1);
                this.onBtnClose(false);
            }
            else {
                module.RaceManager.instance.showShop();
                // Main.app.showMessage("您的羽毛不足");
                // Main.app.showCoinsLackingView();
            }
            this.onBtnClose(false);
        };
        /*使用金币开蛋*/
        HatchNowView.prototype.onBtnOkCoin = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.coin >= this._coin) {
                console.log("-----> ", this._eggInfo);
                module.RaceManager.instance.openEgg(this._eggInfo);
                module.RaceManager.instance.addCoin(this._coin * -1);
                this.onBtnClose(false);
            }
            else {
                Main.app.showMessage("您的金币不足");
                Main.app.showCoinsLackingView();
            }
            this.onBtnClose(false);
        };
        /* 免费开蛋 */
        HatchNowView.prototype.HowOpenEgg = function () {
            // 判断是否是同一天，同一天之内需要判断免费次数是否用尽，新的一天需要重置免费次数个当天时间戳。
            var saveTime = LocalStorage.getItem(Main.DianDianChongWu_NowDay3);
            //  wx.getStorageSync(Main.DianDianChongWu_NowDay3);
            if (saveTime == Main.app.mwx.nowday) {
                var freeVideo = Number(LocalStorage.getItem(Main.DianDianChongWu_FreeVideo));
                // wx.getStorageSync(Main.DianDianChongWu_FreeVideo);
                console.log(freeVideo, Main.app.mwx.openEggFree);
                if (!!freeVideo && freeVideo >= Main.app.mwx.openEggFree) {
                    Main.app.showMessage("免费次数已用尽");
                    return;
                }
            }
            else {
                LocalStorage.setItem(Main.DianDianChongWu_NowDay3, Main.app.mwx.nowday);
                LocalStorage.setItem(Main.DianDianChongWu_FreeVideo, 1 + "");
                // wx.setStorageSync(Main.DianDianChongWu_NowDay3, Main.app.mwx.nowday);
                // wx.setStorageSync(Main.DianDianChongWu_FreeVideo, 1);
            }
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.OpenEggFree, { "type": 0 });
            // 满足开蛋条件，执行开蛋操作。
            var type = 0;
            var Times = Main.app.mwx.m_nOpenEggTimes;
            if (Times < Main.app.mwx.OpenEggTypeList.length) {
                if (Main.app.mwx.fhOnOff == 0) {
                    type = 2;
                }
                else {
                    var obj = Main.app.mwx.OpenEggTypeList[Times];
                    type = Number(obj["gamebox"]);
                }
                if (type == 1) {
                    // 直接使用
                    this.onBtnOpen();
                }
                else if (type == 2 || type == 4) {
                    // 看视频使用
                    if (Main.app.mwx.avShowType == false) {
                        return;
                    }
                    Main.app.mwx.avShowType = false;
                    var self_1 = this;
                    Laya.timer.once(500, self_1, function () {
                        self_1.onVideo(type);
                    });
                }
                else if (type == 3) {
                    // 分享使用
                    this.onShare();
                }
                else {
                    // 暂不支持
                    Main.app.showMessage("功能暂未开放");
                }
            }
            else {
                // 看视频使用
                if (Main.app.mwx.avShowType == false) {
                    return;
                }
                Main.app.mwx.avShowType = false;
                var self_2 = this;
                Laya.timer.once(500, self_2, function () {
                    self_2.onVideo(2);
                });
            }
        };
        /* 看视频 */
        HatchNowView.prototype.onVideo = function (type) {
            var self = this;
            wxCore.uo.loadingVideo(function (ok) {
                if (ok) {
                    wxCore.uo.showVideoAD(function (played) {
                        if (played) {
                            self.onBtnOpen();
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
        HatchNowView.prototype.onShare = function () {
            if (Main.app.shareIndex > 0) {
                return;
            }
            Main.app.shareIndex = 10;
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
        /* 开蛋操作 */
        HatchNowView.prototype.onBtnOpen = function () {
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.OpenEggFree, { "type": 1 });
            var freeVideo = Number(LocalStorage.getItem(Main.DianDianChongWu_FreeVideo));
            //  wx.getStorageSync(Main.DianDianChongWu_FreeVideo);
            freeVideo++;
            // wx.setStorageSync(Main.DianDianChongWu_FreeVideo, freeVideo);
            LocalStorage.setItem(Main.DianDianChongWu_FreeVideo, freeVideo + '');
            Main.app.mwx.m_nOpenEggTimes++;
            Main.app.mwx.SetUserValue("OpenEggTimes", Main.app.mwx.m_nOpenEggTimes);
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.openEgg(this._eggInfo);
            this.onBtnClose(false);
        };
        HatchNowView.prototype.destroy = function () {
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return HatchNowView;
    }(ui.game.HatchNowViewUI));
    module.HatchNowView = HatchNowView;
})(module || (module = {}));
//# sourceMappingURL=HatchNowView.js.map