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
var module;
(function (module) {
    var GetChickenView = /** @class */ (function (_super) {
        __extends(GetChickenView, _super);
        function GetChickenView() {
            var _this = _super.call(this) || this;
            _this.setEvents();
            _this.setChickenSkin();
            Laya.Tween.clearAll(_this.box_get);
            _this.tween1(_this.box_get);
            return _this;
        }
        // 缓动
        GetChickenView.prototype.tween1 = function (btn, delay) {
            if (delay === void 0) { delay = 0; }
            Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween2, [btn]), delay);
        };
        GetChickenView.prototype.tween2 = function (btn) {
            Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween3, [btn]));
        };
        GetChickenView.prototype.tween3 = function (btn) {
            Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween4, [btn]));
        };
        GetChickenView.prototype.tween4 = function (btn) {
            Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween1, [btn]), 2000);
        };
        GetChickenView.prototype.setChickenSkin = function () {
            var beforeDatTime = new Date(new Date().setHours(0, 0, 0)).getTime();
            var nextDayTime = new Date(new Date().setHours(23, 59, 59)).getTime();
            switch (Main.app.mwx.m_getChicken) {
                case 49:
                    break;
                case 47:
                    this.chickenSkin.skin = 'pngs/0319/47-01.png';
                    if (Main.app.mwx.m_getChickenTime < nextDayTime && Main.app.mwx.m_getChickenTime > beforeDatTime) {
                        this.chickenSkin.skin = 'pngs/0319/47-01.png';
                        this.chickenText.skin = 'pngs/0319/btn_3.png';
                        this.box_get.mouseEnabled = false;
                    }
                    break;
                case 77:
                    this.chickenSkin.skin = 'pngs/0319/77-01.png';
                    if (Main.app.mwx.m_getChickenTime < nextDayTime && Main.app.mwx.m_getChickenTime > beforeDatTime) {
                        this.chickenSkin.skin = 'pngs/0319/77-01.png';
                        this.chickenText.skin = 'pngs/0319/btn_3.png';
                        this.box_get.mouseEnabled = false;
                    }
                    break;
                default:
                    this.box_get.visible = false;
                    break;
            }
        };
        /*领取宠物*/
        GetChickenView.prototype.getChicken = function () {
            var getTimes = new Date().getTime();
            switch (Main.app.mwx.m_getChicken) {
                case 49:
                    module.RaceManager.instance.getFirstChichenInfo(49);
                    Main.app.mwx.SetUserValue("GetChichen", 47);
                    Main.app.mwx.SetUserValue("GetChickenTime", getTimes);
                    this.chickenSkin.skin = 'pngs/0319/47-01.png';
                    this.chickenText.skin = 'pngs/0319/btn_3.png';
                    this.box_get.mouseEnabled = false;
                    break;
                case 47:
                    module.RaceManager.instance.getFirstChichenInfo(47);
                    Main.app.mwx.SetUserValue("GetChichen", 77);
                    Main.app.mwx.SetUserValue("GetChickenTime", getTimes);
                    this.chickenSkin.skin = 'pngs/0319/77-01.png';
                    this.chickenText.skin = 'pngs/0319/btn_3.png';
                    this.box_get.mouseEnabled = false;
                    break;
                case 77:
                    module.RaceManager.instance.getFirstChichenInfo(77);
                    Main.app.mwx.SetUserValue("GetChickenTime", getTimes);
                    Main.app.mwx.SetUserValue("GetChichen", 0);
                    this.box_get.visible = false;
                    break;
            }
        };
        /*点击判断*/
        GetChickenView.prototype.select = function () {
            this.getChicken();
            // if (Main.app.mwx.ofGetType == 1) {
            //     this.onShare()
            // } else {
            //     // 看视频使用
            //     if (Main.app.mwx.avShowType == false) {
            //         return;
            //     }
            //     Main.app.mwx.avShowType = false;
            //     let self = this;
            //     Laya.timer.once(500, self, () => {
            //         self.onVideo(Main.app.mwx.ofLoginReward);
            //     });
            // }
        };
        /* 分享 */
        GetChickenView.prototype.onShare = function () {
            if (Main.app.shareIndex > 0) {
                return;
            }
            Main.app.shareIndex = 17;
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
        GetChickenView.prototype.onVideo = function (type) {
            var self = this;
            wxCore.uo.loadingVideo(function (ok) {
                if (ok) {
                    wxCore.uo.showVideoAD(function (played) {
                        if (played) {
                            self.getChicken();
                            self.toServer(2, 1);
                        }
                        else {
                            self.toServer(2, 0);
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
        GetChickenView.prototype.toServer = function (type, isfinih) {
            var data = {};
            data['uid'] = Main.app.mwx.mUID;
            data['from_type'] = type;
            data['is_sucess'] = isfinih;
            util.server('free_pet', null, data);
        };
        GetChickenView.prototype.setEvents = function () {
            this.box_get.on(laya.events.Event.CLICK, this, this.select);
            module.RaceManager.instance.on(module.RaceManager.GTE_CHICKEN, this, this.getChicken);
        };
        return GetChickenView;
    }(ui.game.GetChickenViewUI));
    module.GetChickenView = GetChickenView;
})(module || (module = {}));
//# sourceMappingURL=GetChickenView.js.map