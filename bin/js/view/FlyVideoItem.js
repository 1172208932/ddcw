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
 * 首页漂浮的大量金币
 */
var module;
(function (module) {
    var Point = laya.maths.Point;
    var FlyVideoItem = /** @class */ (function (_super) {
        __extends(FlyVideoItem, _super);
        function FlyVideoItem() {
            var _this = _super.call(this) || this;
            _this.videoCoins = 50;
            _this.count = 0;
            _this.path = [];
            _this.dir = 1;
            _this.t = 0;
            _this.max = 0;
            _this.faceId = manager.EnterFrameManager.instance.id;
            _this.pos(-200, Math.floor(Math.random() * 200 + 100 + module.RaceView.TOP));
            _this.initPath();
            // 点击大量金币获得大量金币
            _this.on(laya.events.Event.CLICK, _this, _this.HowGetCountGold);
            _this.on(laya.events.Event.ADDED, _this, _this.onAddss);
            module.RaceManager.instance.on(module.RaceManager.LOOKTOCOUNTGOLD, _this, _this.onClick, [50]);
            module.RaceManager.instance.on(module.RaceManager.CLOSEFLYVIDOEITEM, _this, _this.destroy);
            return _this;
        }
        FlyVideoItem.prototype.initPath = function () {
            this.path = [];
            var bpos = new Point(this.x, this.y);
            var epos = new Point(0, 0);
            if (this.dir == 1) {
                epos.setTo(Laya.stage.width + 200, Math.floor(Math.random() * 200 + 100 + module.RaceView.TOP));
                this.dir = 2;
            }
            else {
                epos.setTo(-200, Math.floor(Math.random() * 200 + 100 + module.RaceView.TOP));
                this.dir = 1;
            }
            this.path.push(bpos);
            this.path.push(core.Utils.getBezier2TP(bpos, epos, 100, 0.5));
            this.path.push(epos);
            this.max = Math.floor(this.path[1].distance(this.x, this.y) / 1);
            this.t = 1;
            this.count += 1;
        };
        FlyVideoItem.prototype.onAddss = function () {
            manager.EnterFrameManager.instance.addItem(this);
        };
        FlyVideoItem.prototype.onEnterFrame = function () {
            var p = core.Utils.PointOnCubicBezier2(this.path, this.t / this.max);
            this.pos(p.x, p.y);
            this.t++;
            if (this.t > this.max) {
                this.initPath();
            }
        };
        FlyVideoItem.prototype.onClick = function (coinsnum) {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.lookVideoComplete(coinsnum);
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.FlyBoxClick, { "type": Main.app.mwx.ofCoinsBox });
        };
        FlyVideoItem.prototype.destroy = function () {
            manager.EnterFrameManager.instance.removeItem(this.faceId);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        FlyVideoItem.prototype.HowGetCountGold = function () {
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.FlyBoxClick, { "type": 0 });
            // if (Main.app.mwx.ofCoinsBox == 1) {
            // 直接使用
            this.onClick(this.videoCoins);
            // } else if (Main.app.mwx.ofCoinsBox == 2 || Main.app.mwx.ofCoinsBox == 4) {
            // 	// 看视频使用
            // 	if (Main.app.mwx.avShowType == false) {
            // 		return;
            // 	}
            // 	Main.app.mwx.avShowType = false;
            // 	let self = this;
            // 	Laya.timer.once(500, self, () => {
            // 		self.onVideo(Main.app.mwx.ofCoinsBox);
            // 	});
            // } else if (Main.app.mwx.ofCoinsBox == 3) {
            // 	// 分享使用
            // 	this.onShare();
            // } else {
            // 	// 暂不支持
            // 	Main.app.showMessage("功能暂未开放");
            // }
        };
        /* 看视频 */
        FlyVideoItem.prototype.onVideo = function (type) {
            var self = this;
            wxCore.uo.loadingVideo(function (ok) {
                if (ok) {
                    wxCore.uo.showVideoAD(function (played) {
                        if (played) {
                            self.onClick(self.videoCoins);
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
        FlyVideoItem.prototype.onShare = function () {
            if (Main.app.shareIndex > 0) {
                return;
            }
            Main.app.shareIndex = 6;
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
        return FlyVideoItem;
    }(ui.game.FlyVideoItemUI));
    module.FlyVideoItem = FlyVideoItem;
})(module || (module = {}));
//# sourceMappingURL=FlyVideoItem.js.map