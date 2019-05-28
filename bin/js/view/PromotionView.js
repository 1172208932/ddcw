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
 * 右边的菜单栏
 */
var module;
(function (module) {
    var PromotionView = /** @class */ (function (_super) {
        __extends(PromotionView, _super);
        function PromotionView() {
            var _this = _super.call(this) || this;
            _this.goodsType = 1; // 商品类型，用来标记当前购买的商品。1是一元好礼 2是折扣优惠
            _this.ani1.play(0, true);
            return _this;
        }
        PromotionView.prototype.showPromotionView = function () {
            this.on(Laya.Event.MOUSE_DOWN, this, this.onBuy);
            this.txt0.visible = false;
            this.box1.visible = false;
            this.box2.visible = false;
            this.box4.visible = false;
            this.box4.visible = false;
            // 是否是首次参与 0还未参与 1已经参与
            if (Main.app.mwx.firstGoods["count"] == 0 && Main.app.mwx.ofDiscount == 1) {
                this.goodsType = 1;
                this.firstShow();
            }
            else {
                if (Main.app.mwx.secondGoods["count"] == 0) {
                    this.goodsType = 2;
                    this.secondShow();
                }
                else {
                    this.visible = false;
                    this.ani1.stop();
                }
            }
        };
        PromotionView.prototype.firstShow = function () {
            this.txt1.skin = "pngs/promotion/txt1.png";
            var count = Number(Main.app.mwx.firstGoods["coins"]);
            if (count < 10) {
                this.box1.visible = true;
                this.first1.skin = this.getNumberSkin(count);
                console.log(this.first1.skin);
            }
            else if (count >= 10 && count < 100) {
                this.box2.visible = true;
                this.first2.skin = this.getNumberSkin(count);
                this.second2.skin = this.getNumberSkin(count);
            }
            else if (count >= 100 && count < 1000) {
                this.box3.visible = true;
                this.first3.skin = this.getNumberSkin(count);
                this.second3.skin = this.getNumberSkin(count);
                this.third3.skin = this.getNumberSkin(count);
            }
            else {
                this.txt0.visible = true;
                this.txt0.text = count.toString() + "羽毛";
            }
        };
        PromotionView.prototype.secondShow = function () {
            this.txt1.skin = "pngs/promotion/" + Main.app.mwx.secondGoods["name"] + ".png";
            var other = JSON.parse(String(Main.app.mwx.secondGoods["other"]));
            var coast = Number(other["count"]);
            var yumao = Number(Main.app.mwx.secondGoods["coins"]);
            if (yumao > 9 || coast > 9) {
                this.txt0.visible = true;
                this.txt0.text = coast.toString() + "元" + yumao.toString() + "羽毛";
            }
            else {
                this.box4.visible = true;
                this.first4.skin = this.getNumberSkin(coast);
                this.second4.skin = this.getNumberSkin(yumao);
            }
        };
        /* 点击购买操作 */
        PromotionView.prototype.onBuy = function () {
            console.log("点击购买");
            var rb = wx.getStorageSync("pay_rmb_list");
            if (Number(rb) > 0) {
                Main.app.showMessage("上次充值还未完成，请重新登陆！");
                return;
            }
            console.log("开始支付");
            this.off(Laya.Event.MOUSE_DOWN, this, this.onBuy);
            // 请求支付
            var quantity = 0;
            var goodsID = 0;
            var success = new Laya.Handler(this, this.buySuccess);
            var fail = new Laya.Handler(this, this.buyFail);
            if (this.goodsType == 1) {
                var other = JSON.parse(String(Main.app.mwx.firstGoods["other"]));
                quantity = Number(other["count"]) * 10;
                goodsID = Number(Main.app.mwx.firstGoods["id"]);
            }
            else {
                var other = JSON.parse(String(Main.app.mwx.secondGoods["other"]));
                quantity = Number(other["count"]) * 10;
                goodsID = Number(Main.app.mwx.secondGoods["id"]);
            }
            var self = this;
            wx.requestMidasPayment({
                mode: 'game',
                env: 0,
                offerId: '1450019594',
                currencyType: 'CNY',
                buyQuantity: quantity,
                platform: "android",
                zoneId: "1",
                success: function () {
                    Main.app.mwx.PrePay(goodsID, success, fail);
                },
                fail: function (_a) {
                    var errMsg = _a.errMsg, errCode = _a.errCode;
                    if (errCode == -2 || errCode == 1) {
                        Main.app.showMessage("充值失败：用户取消支付");
                    }
                    else {
                        Main.app.showMessage("充值失败：" + errCode);
                    }
                    self.on(Laya.Event.MOUSE_DOWN, self, self.onBuy);
                }
            });
        };
        PromotionView.prototype.buySuccess = function () {
            if (this.goodsType == 1) {
                Main.app.mwx.firstGoods["count"] = Number(Main.app.mwx.firstGoods["count"]) + 1;
            }
            else {
                Main.app.mwx.secondGoods["count"] = Number(Main.app.mwx.secondGoods["count"]) + 1;
            }
            this.showPromotionView();
        };
        PromotionView.prototype.buyFail = function () {
            console.log("购买失败");
            this.on(Laya.Event.MOUSE_DOWN, this, this.onBuy);
        };
        PromotionView.prototype.getNumberSkin = function (num) {
            return "pngs/promotion/" + num + ".png";
        };
        return PromotionView;
    }(ui.view.PromotionViewUI));
    module.PromotionView = PromotionView;
})(module || (module = {}));
//# sourceMappingURL=PromotionView.js.map