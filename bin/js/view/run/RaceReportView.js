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
 * 比赛结果界面
 */
var module;
(function (module) {
    var RaceReportView = /** @class */ (function (_super) {
        __extends(RaceReportView, _super);
        function RaceReportView() {
            var _this = _super.call(this) || this;
            _this.t = 0;
            _this.d = 1;
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            _this.btn_play.on(laya.events.Event.CLICK, _this, _this.onBtnPlay);
            if (!Main.app.mwx.mFHKeep) {
                _this.btn_shareall.visible = false;
            }
            else {
                _this.btn_shareall.visible = true;
                _this.btn_share.on(laya.events.Event.CLICK, _this, _this.toShare);
            }
            return _this;
        }
        /* 再玩一次 */
        RaceReportView.prototype.onBtnPlay = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.coin >= 20) {
                module.RaceManager.instance.addCoin(-20);
                this.event(module.RunView.PLAY_AGAIN_GAME);
            }
            else {
                module.RaceManager.instance.showShop();
            }
        };
        /* 关闭界面 */
        RaceReportView.prototype.onBtnClose = function () {
            module.RaceManager.instance.event(module.RaceManager.RightButtonVisiable, [true]);
            manager.SoundPlayMgr.instance.playButtonClick();
            manager.EventManager.instance.event(module.RaceView.CLOSE_RUN);
        };
        RaceReportView.prototype.show = function () {
            this.visible = true;
            Laya.timer.loop(500, this, this.onAddAni);
        };
        RaceReportView.prototype.hide = function () {
            this.visible = false;
            Laya.timer.clear(this, this.onAddAni);
        };
        RaceReportView.prototype.showRank = function (rank, xx, yy, hatid) {
            if (hatid === void 0) { hatid = 0; }
            this.box_reward.x = xx;
            this.box_reward.y = yy - 130 - 120;
            this.img_rank.skin = "ui/rank_" + rank + ".png";
            if (rank == 1) {
                this.img_reward.skin = module.RaceManager.instance.getHatImg(hatid);
            }
            else {
                this.img_reward.skin = "ui/Atlas_2.png";
            }
            this.img_reward.pivot(this.img_reward.width / 2, this.img_reward.height / 2);
            var ss = Math.min(130 / this.img_reward.width, 130 / this.img_reward.height);
            this.img_reward.scale(ss, ss);
            this.t = 0;
            this.d = 1;
        };
        RaceReportView.prototype.onEnterFrame = function () {
            if (this.d == 1) {
                this.t++;
                this.box_reward.y -= 2;
                if (this.t > 10) {
                    this.d = 2;
                    this.t = 0;
                }
            }
            else {
                this.t++;
                this.box_reward.y += 2;
                if (this.t > 10) {
                    this.d = 1;
                    this.t = 0;
                }
            }
        };
        RaceReportView.prototype.onAddAni = function () {
            var animation = new laya.display.Animation();
            animation.loadAnimation("ani/caidaiAni.ani");
            animation.x = 50 + Math.floor(Math.random() * 650);
            animation.y = 150 + Math.floor(Math.random() * 500);
            animation.scale(1.5, 1.5);
            this.addChild(animation);
            animation.play(0, false);
            animation.on(laya.events.Event.COMPLETE, this, this.onClearAni, [animation]);
        };
        RaceReportView.prototype.onClearAni = function (animation) {
            animation.destroy();
        };
        RaceReportView.prototype.destroy = function () {
            Laya.timer.clear(this, this.onAddAni);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        /* 分享 */
        RaceReportView.prototype.toShare = function () {
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(353, 1102), 2, 100]);
            // if (Main.app.shareIndex > 0) {
            // 	return;
            // }
            // // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.RaceResultShare, {"success":0});
            // Main.app.shareIndex = 8;
            // Main.app.shareTimestamp = new Date().getTime();
            // let title, imageUrl, shjson;
            // Main.app.mwx.shareurl.forEach((item) => {
            //     if (item.id == Main.app.shareIndex) {
            //         shjson = item;
            //         title = item.title;
            //         imageUrl = item.url;
            //     }
            // });
            // wx.shareAppMessage({
            //     title : title,
            //     imageUrl : imageUrl,
            //     query : "uid=" + Main.app.mwx.mUID + `&surl=${Main.app.shareIndex}`
            // });
        };
        return RaceReportView;
    }(ui.race.RaceReportViewUI));
    module.RaceReportView = RaceReportView;
})(module || (module = {}));
//# sourceMappingURL=RaceReportView.js.map