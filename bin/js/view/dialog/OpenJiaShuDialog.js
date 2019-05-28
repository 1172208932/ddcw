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
    var OpenJiaShuDialog = /** @class */ (function (_super) {
        __extends(OpenJiaShuDialog, _super);
        function OpenJiaShuDialog() {
            var _this = _super.call(this) || this;
            // Main.app.mwx.showBanner();
            BridgeUtil.callAppMethod("showBanner");
            var jst = module.RaceManager.instance.userInfo._jiaShuingTime.toString().split('');
            if (jst.length <= 1) {
                _this.yiwei.skin = "ui/num_f_" + jst[0] + ".png";
                _this.yiwei.visible = true;
                _this.shiwei.visible = false;
                _this.gewei.visible = false;
            }
            else {
                _this.shiwei.skin = "ui/num_f_" + jst[0] + ".png";
                _this.gewei.skin = "ui/num_f_" + jst[1] + ".png";
                _this.yiwei.visible = false;
                _this.shiwei.visible = true;
                _this.gewei.visible = true;
            }
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            _this.btn_ok.on(laya.events.Event.CLICK, _this, _this.howJiaSu);
            module.RaceManager.instance.on(module.RaceManager.SHARETOOPENJIASU, _this, _this.onBtnOk);
            return _this;
        }
        Object.defineProperty(OpenJiaShuDialog, "Inst", {
            get: function () {
                if (this._inst == null) {
                    this._inst = new OpenJiaShuDialog();
                    console.log("又重开一次");
                }
                return this._inst;
            },
            enumerable: true,
            configurable: true
        });
        OpenJiaShuDialog.prototype.onBtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.event(module.RaceManager.OPENDOUBLEDISABLED);
            this.destroy();
        };
        OpenJiaShuDialog.prototype.onBtnOk = function () {
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.OpenSBXiaoLv, { "type": Main.app.mwx.ofDoubleReword });
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.openJiaShu();
            this.destroy();
        };
        OpenJiaShuDialog.prototype.destroy = function () {
            // Main.app.mwx.closeBanner();
            BridgeUtil.callAppMethod("hideBanner");
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        OpenJiaShuDialog.prototype.howJiaSu = function () {
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.OpenSBXiaoLv, { "type": 0 });
            // if (Main.app.mwx.ofDoubleReword == 1) {
            // 	// 直接使用
            this.onBtnOk();
            // } else if (Main.app.mwx.ofDoubleReword == 2 || Main.app.mwx.ofDoubleReword == 4) {
            // 	// 看视频使用
            // 	if (Main.app.mwx.avShowType == false) {
            // 		return;
            // 	}
            // 	Main.app.mwx.avShowType = false;
            // 	let self = this;
            // 	Laya.timer.once(500, self, () => {
            // 		self.onVideo(Main.app.mwx.ofDoubleReword);
            // 	});
            // } else if (Main.app.mwx.ofDoubleReword == 3) {
            // 	// 分享使用
            // 	this.onShare();
            // } else {
            // 	// 暂不支持
            // 	Main.app.showMessage("功能暂未开放");
            // }
        };
        /* 看视频 */
        OpenJiaShuDialog.prototype.onVideo = function (type) {
            var self = this;
            wxCore.uo.loadingVideo(function (ok) {
                if (ok) {
                    wxCore.uo.showVideoAD(function (played) {
                        if (played) {
                            self.onBtnOk();
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
        OpenJiaShuDialog.prototype.onShare = function () {
            if (Main.app.shareIndex > 0) {
                return;
            }
            Main.app.shareIndex = 3;
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
        OpenJiaShuDialog._inst = null;
        return OpenJiaShuDialog;
    }(ui.game.OpenJiaShuDialogUI));
    module.OpenJiaShuDialog = OpenJiaShuDialog;
})(module || (module = {}));
//# sourceMappingURL=OpenJiaShuDialog.js.map