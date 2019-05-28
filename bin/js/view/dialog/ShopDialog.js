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
    var ShopDialog = /** @class */ (function (_super) {
        __extends(ShopDialog, _super);
        function ShopDialog() {
            var _this = _super.call(this) || this;
            _this.img_1.skin = manager.configManager.instance.CDN_BOOT + "gate/shop-banners_0.png";
            _this.img_2.skin = manager.configManager.instance.CDN_BOOT + "gate/shop-banners_1.png";
            _this.img_3.skin = manager.configManager.instance.CDN_BOOT + "gate/shop-banners_2.png";
            _this.img_4.skin = manager.configManager.instance.CDN_BOOT + "gate/shop-banners_3.png";
            _this.img_5.skin = manager.configManager.instance.CDN_BOOT + "gate/shop-banners_3.png";
            _this.onChangeCoin();
            _this.onChangeWing();
            module.RaceManager.instance.on(module.RaceManager.CHANGE_COIN, _this, _this.onChangeCoin);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_WING, _this, _this.onChangeWing);
            _this.btn_to_coin.on(laya.events.Event.CLICK, _this, _this.onBtnToCoin);
            _this.btn_to_wing.on(laya.events.Event.CLICK, _this, _this.onBtnToWing);
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            if (Main.app.is_wx) {
                console.log("3001=", Number(Main.app.mwx.ShopPrize.get(3001['count'])));
                _this.yuanbtn6.on(laya.events.Event.CLICK, _this, _this.shopWing, [3001, Number(Main.app.mwx.ShopPrize.get(3001)['count'])]);
                _this.yuanbtn30.on(laya.events.Event.CLICK, _this, _this.shopWing, [3002, Number(Main.app.mwx.ShopPrize.get(3002)['count'])]);
                _this.yuanbtn118.on(laya.events.Event.CLICK, _this, _this.shopWing, [3003, Number(Main.app.mwx.ShopPrize.get(3003)['count'])]);
                _this.yuanbtn328.on(laya.events.Event.CLICK, _this, _this.shopWing, [3004, Number(Main.app.mwx.ShopPrize.get(3004)['count'])]);
                _this.yuanbtn648.on(laya.events.Event.CLICK, _this, _this.shopWing, [3005, Number(Main.app.mwx.ShopPrize.get(3005)['count'])]);
                // 判断是否充值未完成，提示用户
                var rb = wx.getStorageSync("pay_rmb_list");
                if (Number(rb) > 0) {
                    Main.app.mwx.PrePay(rb);
                }
            }
            return _this;
        }
        ShopDialog.prototype.onChangeCoin = function () {
            if (module.RaceManager.instance.userInfo.coin >= 600) {
                this.img_bg1.skin = "ui/paperwhite2.png";
            }
            else {
                this.img_bg1.skin = "ui/paperwhite3.png";
            }
        };
        ShopDialog.prototype.onChangeWing = function () {
            if (module.RaceManager.instance.userInfo.wing >= 1) {
                this.img_bg2.skin = "ui/paperwhite2.png";
            }
            else {
                this.img_bg2.skin = "ui/paperwhite3.png";
            }
        };
        /* 金币换羽毛 */
        ShopDialog.prototype.onBtnToCoin = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.coin >= 600) {
                module.RaceManager.instance.addCoin(-600);
                manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new Point(270, 195)), 3, 1]);
            }
            else {
                Main.app.showMessage("您的金币不足");
                Main.app.showCoinsLackingView();
            }
        };
        /* 羽毛换金币 */
        ShopDialog.prototype.onBtnToWing = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.wing >= 1) {
                module.RaceManager.instance.addWing(-1);
                manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new Point(525, 195)), 2, 300]);
            }
            else {
                Main.app.showMessage("您的羽毛不足");
                Main.app.showFeatherLackingView();
            }
        };
        ShopDialog.prototype.onBtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        ShopDialog.prototype.destroy = function () {
            module.RaceManager.instance.off(module.RaceManager.CHANGE_COIN, this, this.onChangeCoin);
            module.RaceManager.instance.off(module.RaceManager.CHANGE_WING, this, this.onChangeWing);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        // id是要购买的物品id，rmb是物品需要的人民币
        ShopDialog.prototype.shopWing = function (id, rmb) {
            var that = this;
            var quantity = rmb * 10;
            console.log("充值金币数量", quantity);
            var rb = wx.getStorageSync("pay_rmb_list");
            if (Number(rb) > 0) {
                wx.showToast({
                    title: '上次充值还未完成,请重新登陆',
                    icon: "none",
                    image: "",
                    duration: 3000
                });
                return;
            }
            console.log("开始进入支付");
            wx.requestMidasPayment({
                mode: 'game',
                env: 0,
                offerId: '1450019594',
                currencyType: 'CNY',
                buyQuantity: quantity,
                platform: "android",
                zoneId: "1",
                success: function () {
                    Main.app.mwx.PrePay(id);
                },
                fail: function (_a) {
                    var errMsg = _a.errMsg, errCode = _a.errCode;
                    // Main.app.mwx.PrePay(id);
                    console.log("支付失败");
                    // 支付失败
                    // if (GameMain.mUid == 1000001){
                    // html.PrePay(rmb);
                    // }
                    // console.log(errMsg, errCode);
                    if (errCode == -2 || errCode == 1) {
                        wx.showToast({
                            title: '充值失败:用户取消支付',
                            icon: "none",
                            image: "",
                            duration: 5000
                        });
                    }
                    else {
                        wx.showToast({
                            title: '充值失败:' + errCode,
                            icon: "none",
                            image: "",
                            duration: 5000
                        });
                    }
                }
            });
        };
        return ShopDialog;
    }(ui.game.ShopDialogUI));
    module.ShopDialog = ShopDialog;
})(module || (module = {}));
//# sourceMappingURL=ShopDialog.js.map