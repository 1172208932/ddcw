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
 * 选择游历到另一个花园的界面
 */
var module;
(function (module) {
    var SelectGateDialog = /** @class */ (function (_super) {
        __extends(SelectGateDialog, _super);
        function SelectGateDialog() {
            var _this = _super.call(this) || this;
            for (var i = 1; i <= 8; i++) {
                var log = _this["img_log" + i];
                log.skin = module.RaceManager.instance.getLogimg(i);
                // var logname: Laya.Image = this["img_name" + i];
                // logname.skin = RaceManager.instance.getLogNameimg(i);
                // console.log(RaceManager.instance.isOpenGate(i));
            }
            _this.btnOpen.on(laya.events.Event.CLICK, _this, _this.onBuy);
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            _this.img_log1.on(laya.events.Event.CLICK, _this, _this.onSelectGate1);
            _this.img_log2.on(laya.events.Event.CLICK, _this, _this.onSelectGate2);
            _this.img_log3.on(laya.events.Event.CLICK, _this, _this.onSelectGate3);
            _this.img_log4.on(laya.events.Event.CLICK, _this, _this.onSelectGate4);
            _this.img_log5.on(laya.events.Event.CLICK, _this, _this.onSelectGate5);
            _this.img_log6.on(laya.events.Event.CLICK, _this, _this.onSelectGate6);
            _this.img_log7.on(laya.events.Event.CLICK, _this, _this.onSelectGate7);
            _this.img_log8.on(laya.events.Event.CLICK, _this, _this.onSelectGate8);
            _this.initView();
            return _this;
        }
        SelectGateDialog.prototype.initView = function () {
            var newArr = [];
            var arr = [];
            for (var i = 1; i < 9; i++) {
                this['img_lock' + i].visible = module.RaceManager.instance.isOpenGate(i) ? false : true;
                newArr = newArr.concat(module.RaceManager.instance.userInfo.plantInfoDic.get(i).haveChichenIds);
            }
            this.num_garden.text = module.RaceManager.instance.userInfo.openGateIds.length + '/8';
            newArr.forEach(function (item) {
                if (item) {
                    arr.push(item);
                }
            });
            this.num_pet.text = arr.length + '/160';
            if (module.RaceManager.instance.userInfo.firstGift == 1 || Main.app.mwx.ofBuyScene == 0) {
                this.btnOpen.visible = false;
            }
            try {
                var res = wx.getSystemInfoSync();
                if (res.platform == "ios") {
                    this.btnOpen.visible = false;
                }
            }
            catch (e) {
                // Do something when catch error
            }
        };
        /* 森林 */
        SelectGateDialog.prototype.onSelectGate1 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.gotoGate(1);
            this.destroy();
        };
        /* 洞穴 */
        SelectGateDialog.prototype.onSelectGate2 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.gotoGate(2);
            this.destroy();
        };
        /* 地牢 */
        SelectGateDialog.prototype.onSelectGate3 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.gotoGate(3);
            this.destroy();
        };
        /* 寺庙 */
        SelectGateDialog.prototype.onSelectGate4 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.gotoGate(4);
            this.destroy();
        };
        /* 黑暗 */
        SelectGateDialog.prototype.onSelectGate5 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.gotoGate(5);
            this.destroy();
        };
        /* 冰川 */
        SelectGateDialog.prototype.onSelectGate6 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.gotoGate(6);
            this.destroy();
        };
        /* 万圣节 */
        SelectGateDialog.prototype.onSelectGate7 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.gotoGate(7);
            this.destroy();
        };
        /* 家园 */
        SelectGateDialog.prototype.onSelectGate8 = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            module.RaceManager.instance.gotoGate(8);
            this.destroy();
        };
        SelectGateDialog.prototype.onBtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        /* 点击购买操作 */
        SelectGateDialog.prototype.onBuy = function () {
            console.log("点击购买");
            var rb = wx.getStorageSync("pay_rmb_list");
            if (Number(rb) > 0) {
                Main.app.showMessage("上次充值还未完成，请重新登陆！");
                return;
            }
            console.log("开始支付");
            this.off(Laya.Event.MOUSE_DOWN, this, this.onBuy);
            // 请求支付
            var quantity = 30;
            var goodsID = 0;
            var success = new Laya.Handler(this, this.buySuccess);
            var fail = new Laya.Handler(this, this.buyFail);
            // if (this.goodsType == 1) {
            // 	var other: Object = JSON.parse(String(Main.app.mwx.firstGoods["other"]));
            // 	quantity = Number(other["count"]) * 10;
            // 	goodsID = Number(Main.app.mwx.firstGoods["id"]);
            // } else {
            // 	var other: Object = JSON.parse(String(Main.app.mwx.secondGoods["other"]));
            // 	quantity = Number(other["count"]) * 10;
            // 	goodsID = Number(Main.app.mwx.secondGoods["id"]);
            // }
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
                    // Main.app.mwx.PrePay(goodsID, success, fail);
                    self.buySuccess();
                },
                fail: function (_a) {
                    var errMsg = _a.errMsg, errCode = _a.errCode;
                    if (errCode == -2 || errCode == 1) {
                        Main.app.showMessage("充值失败：用户取消支付");
                    }
                    else {
                        Main.app.showMessage("充值失败：" + errCode);
                    }
                    self.btnOpen.on(Laya.Event.MOUSE_DOWN, self, self.onBuy);
                }
            });
        };
        SelectGateDialog.prototype.buySuccess = function () {
            var id = 1;
            var arr = [];
            for (var i = 1; i < 9; i++) {
                if (module.RaceManager.instance.isOpenGate(i) == false) {
                    arr.push(i);
                }
            }
            if (arr.indexOf(3) != -1) {
                id = 3;
                module.RaceManager.instance.unLockPlantFree(3);
            }
            else {
                id = arr[0];
                module.RaceManager.instance.unLockPlantFree(arr[0]);
            }
            this['onSelectGate' + id]();
            module.RaceManager.instance.userInfo.firstGift = 1;
            module.RaceManager.instance.userInfo.addLocalUserInfo();
        };
        SelectGateDialog.prototype.buyFail = function () {
            console.log("购买失败");
            this.btnOpen.on(Laya.Event.MOUSE_DOWN, this, this.onBuy);
        };
        SelectGateDialog.prototype.destroy = function () {
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return SelectGateDialog;
    }(ui.game.SelectGateDialogUI));
    module.SelectGateDialog = SelectGateDialog;
})(module || (module = {}));
//# sourceMappingURL=SelectGateDialog.js.map