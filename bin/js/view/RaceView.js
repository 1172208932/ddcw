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
    var RaceView = /** @class */ (function (_super) {
        __extends(RaceView, _super);
        function RaceView() {
            var _this = _super.call(this) || this;
            _this.flyWaterAction = null;
            _this.flyMoneyAction = null;
            _this.transitionchView = null;
            _this.runView = null;
            _this.leftBox = [_this.toolView, _this.leftBtnsView, _this.eatApple, _this.lastGate];
            _this.leftX = [0, 0, 0, 25];
            _this.rightX = [648, 650, 648, 650, 622];
            _this.rightBox = [_this.rightToolView, _this.rightBtnsView, _this.promotionView, _this.nextGate, _this.playGame];
            _this.isHide = false;
            _this.initView();
            _this.initEvents();
            _this.checkLeftBoxStatus();
            _this.checkSaleStatus();
            if (Main.app.mwx.ofMoveAni)
                _this.addAni();
            return _this;
        }
        RaceView.prototype.addAni = function () {
            Laya.timer.once(Main.app.mwx.ofMoveAniTime * 1000, this, this.moveAni);
        };
        RaceView.prototype.moveAni = function () {
            this.isHide = true;
            this.leftBox.map(function (item) {
                Laya.Tween.to(item, { x: -137 }, 500);
            });
            this.rightBox.map(function (item) {
                Laya.Tween.to(item, { x: 760 }, 500);
            });
        };
        RaceView.prototype.addShowAni = function () {
            var _this = this;
            Laya.timer.clear(this, this.moveAni);
            if (this.isHide) {
                this.isHide = false;
                this.leftBox.map(function (item, index) {
                    Laya.Tween.clearAll(item);
                    Laya.Tween.to(item, { x: _this.leftX[index] }, 500, Laya.Ease.elasticOut);
                });
                this.rightBox.map(function (item, index) {
                    Laya.Tween.clearAll(item);
                    Laya.Tween.to(item, { x: _this.rightX[index] }, 500, Laya.Ease.elasticOut);
                });
            }
        };
        /* 根据后台和客户端平台判断是否隐藏游戏盒子 */
        RaceView.prototype.checkLeftBoxStatus = function () {
            // if (Main.app.mwx.ofOpenBox == 0 && Main.app.is_wx == false) {
            // 	this.leftBtnsView.visible = false;
            // } else {
            // 	var onoff: number = 0;
            // 	if (wxCore.uo.mPhone["platform"] == "ios") {
            // 		onoff = Number(Main.app.mwx.ofOpenBoxParam["ios"]);
            // 	} else if (wxCore.uo.mPhone["platform"] == "android") {
            // 		onoff = Number(Main.app.mwx.ofOpenBoxParam["android"]);
            // 	} else {
            // 		onoff = 1;
            // 	}
            // 	this.leftBtnsView.visible = (onoff == 1) ? true : false;
            // }
        };
        /* 根据后台和客户端平台判断促销活动是否显示 */
        RaceView.prototype.checkSaleStatus = function () {
            this.promotionView.showPromotionView();
            // if (Main.app.is_wx) {
            // 	if ((Main.app.mwx.firstGoods["open"] == 0 && Main.app.mwx.secondGoods["open"] == 0) || wxCore.uo.mPhone["platform"] == "ios") {
            // 		this.promotionView.visible = false;
            // 	} else {
            // 		this.promotionView.showPromotionView();
            // 	}
            // } else {
            // 	this.promotionView.visible = false
            // 	this.rightToolView.visible = false
            // }
        };
        RaceView.prototype.initView = function () {
            var sp = new laya.ui.Component();
            this.addChild(sp);
            this.flyWaterAction = new module.FlyWaterAction(sp);
            this.flyMoneyAction = new module.FlyMoneyAction();
            this.topView.y += RaceView.TOP;
            this.toolView.y += RaceView.TOP;
            this.rightToolView.y += RaceView.TOP;
            this.mealTipView.y += RaceView.TOP;
        };
        RaceView.prototype.initEvents = function () {
            if (Main.app.mwx.ofMoveAni) {
                this.on(laya.events.Event.MOUSE_DOWN, this, this.addShowAni);
            }
            if (Main.app.mwx.ofMoveAni) {
                this.on(laya.events.Event.MOUSE_UP, this, this.addAni);
            }
            this.on(laya.events.Event.ADDED, this, this.onAddeds);
            module.RaceManager.instance.on(module.RaceManager.GOTO_PLANT, this, this.onGotoPlant);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_GUID_STEP, this, this.onChangeGuidStep);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_GUID_RUN, this, this.onChangeGuidRun);
            module.RaceManager.instance.on(module.RaceManager.SHOW_SELECTPLANT_GUID, this, this.onShowSelectPlantGuid);
            manager.EventManager.instance.on(module.ToolView.GOTO_MEAL, this, this.onGotoMeal);
            manager.EventManager.instance.on(RaceView.FLY_WATER, this, this.onFlyWater);
            manager.EventManager.instance.on(RaceView.SHOW_HATCH_NOW, this, this.onShowHatchNowView);
            manager.EventManager.instance.on(module.ToolView.CLOSE_MEAL, this, this.onCloseMeal);
            manager.EventManager.instance.on(RaceView.GOTO_RUN, this, this.onGotoRun);
            manager.EventManager.instance.on(RaceView.CLOSE_RUN, this, this.onCloseRun);
            manager.EventManager.instance.on(RaceView.FLY_MONEY, this, this.onFlyMoney);
            manager.EventManager.instance.on(RaceView.CONTROL_FALSE, this, this.controlFalse);
            manager.EventManager.instance.on(RaceView.CONTROL_TRUE, this, this.controlTrue);
        };
        RaceView.prototype.removeEvents = function () {
            module.RaceManager.instance.off(module.RaceManager.GOTO_PLANT, this, this.onGotoPlant);
            module.RaceManager.instance.off(module.RaceManager.CHANGE_GUID_STEP, this, this.onChangeGuidStep);
            module.RaceManager.instance.off(module.RaceManager.CHANGE_GUID_RUN, this, this.onChangeGuidRun);
            module.RaceManager.instance.off(module.RaceManager.SHOW_SELECTPLANT_GUID, this, this.onShowSelectPlantGuid);
            manager.EventManager.instance.off(module.ToolView.GOTO_MEAL, this, this.onGotoMeal);
            manager.EventManager.instance.off(RaceView.FLY_WATER, this, this.onFlyWater);
            manager.EventManager.instance.off(RaceView.SHOW_HATCH_NOW, this, this.onShowHatchNowView);
            manager.EventManager.instance.off(module.ToolView.CLOSE_MEAL, this, this.onCloseMeal);
            manager.EventManager.instance.off(RaceView.GOTO_RUN, this, this.onGotoRun);
            manager.EventManager.instance.off(RaceView.CLOSE_RUN, this, this.onCloseRun);
            manager.EventManager.instance.off(RaceView.FLY_MONEY, this, this.onFlyMoney);
            manager.EventManager.instance.off(RaceView.CONTROL_FALSE, this, this.controlFalse);
            manager.EventManager.instance.off(RaceView.CONTROL_TRUE, this, this.controlTrue);
        };
        RaceView.prototype.controlFalse = function () {
            // this.toolView.visible = false
            // this.getChickenView.visible = false
            this.promotionView.visible = false;
            // this.rightBtnsView.visible = false
            this.eatApple.visible = false;
            // this.leftBtnsView.visible = false
            this.playGame.visible = false;
        };
        RaceView.prototype.controlTrue = function () {
            // this.toolView.visible = true
            // this.getChickenView.visible = true
            this.checkSaleStatus();
            // if (Main.app.is_wx)
            // 	this.leftBtnsView.visible = true
            this.eatApple.visible = true;
            // this.rightBtnsView.visible = true
            this.playGame.visible = true;
        };
        RaceView.prototype.onAddeds = function () {
            // 离线奖励界面 暂时关闭
            // if (RaceManager.instance.userInfo.guidStep >= 6) {
            // var offLineCoint:number = RaceManager.instance.getOffLineCoin();
            // if (offLineCoint > 0) {
            // 	var view:OffLineRewardsDialog = new OffLineRewardsDialog(offLineCoint);
            // 	this.addChild(view);
            // }
            // }
            // 这里关掉login界面
            wxCore.uo.clear();
            // Main.app.mwx.NewGetMyShare();
        };
        RaceView.prototype.initData = function () {
            this.plantView.initData();
            this.topView.initData();
            this.showGuid();
        };
        RaceView.prototype.onGotoPlant = function () {
            if (this.transitionchView == null) {
                this.transitionchView = new module.TransitionchView();
                this.addChildAt(this.transitionchView, 12);
            }
            this.transitionchView.start(Laya.Handler.create(this, this.changePlant), Laya.Handler.create(this, this.changTop));
        };
        RaceView.prototype.changePlant = function () {
            this.plantView.changePlant();
            if (module.RaceManager.instance.isOpenGate(module.RaceManager.instance.selectPlantId)) {
                this.unlockGateView.visible = false;
                Main.app.mwx.closeBanner();
            }
            else {
                this.unlockGateView.visible = true;
                Main.app.mwx.showBanner();
                this.unlockGateView.start();
            }
        };
        RaceView.prototype.changTop = function () {
            this.topView.initData();
            this.toolView.updatePlant();
        };
        RaceView.prototype.onFlyWater = function (bPos, type, score, data) {
            if (this.flyWaterAction.expPos == null) {
                this.flyWaterAction.expPos = this.topView.getExpIconPos();
                this.flyWaterAction.coinPos = this.topView.getCoinIconPos();
                this.flyWaterAction.wingPos = this.topView.getWingIconPos();
            }
            this.flyWaterAction.flyWater(bPos, type, score, data);
        };
        RaceView.prototype.onFlyMoney = function (bPos, type, score) {
            if (this.flyMoneyAction.expPos == null) {
                this.flyMoneyAction.expPos = this.topView.getExpIconPos();
                this.flyMoneyAction.coinPos = this.topView.getCoinIconPos();
                this.flyMoneyAction.wingPos = this.topView.getWingIconPos();
            }
            this.flyMoneyAction.flyFood(bPos, type, score);
        };
        /* 显示开蛋方式的界面 */
        RaceView.prototype.onShowHatchNowView = function (info, coin, pos) {
            console.log(pos);
            if (pos.x == 4) {
                pos.x = 45;
            }
            this.hatchNowView.x = pos.x - 76;
            this.hatchNowView.show(info, coin);
        };
        RaceView.prototype.onGotoMeal = function () {
            this.mealFoodView.visible = true;
            this.mealTipView.visible = true;
            this.bottomView.visible = false;
            this.plantView.onGotoMeal();
        };
        RaceView.prototype.onCloseMeal = function () {
            this.mealFoodView.visible = false;
            this.mealTipView.visible = false;
            this.bottomView.visible = true;
            this.plantView.onCloseMeal();
        };
        RaceView.prototype.onGotoRun = function () {
            if (this.transitionchView == null) {
                this.transitionchView = new module.TransitionchView();
                this.addChildAt(this.transitionchView, 12);
            }
            this.transitionchView.start(Laya.Handler.create(this, this.changeToRun), Laya.Handler.create(this, this.changRunTop));
        };
        RaceView.prototype.onCloseRun = function () {
            this.runView.destroy();
            manager.EventManager.instance.event(module.BottomView.UNLOCK);
            this.checkSaleStatus();
            // this.getChickenView.visible = true
            // if (Main.app.is_wx)
            // 	this.leftBtnsView.visible = true
            this.eatApple.visible = true;
            this.playGame.visible = true;
            this.toolView.visible = true;
            this.bottomView.visible = true;
            this.raceBottomView.visible = false;
            if (Main.app.is_wx) {
                this.rightToolView.visible = true;
            }
            this.plantView.show();
            this.topView.closeRun();
        };
        RaceView.prototype.changeToRun = function () {
            this.plantView.hide();
            this.runView = new module.RunView();
            this.addChildAt(this.runView, 0);
        };
        RaceView.prototype.changRunTop = function () {
            this.nextGate.visible = false;
            this.lastGate.visible = false;
            this.promotionView.visible = false;
            // this.getChickenView.visible = false
            this.leftBtnsView.visible = false;
            this.eatApple.visible = false;
            this.playGame.visible = false;
            this.toolView.visible = false;
            this.bottomView.visible = false;
            this.rightToolView.visible = false;
            this.raceBottomView.visible = true;
            this.topView.showRun();
        };
        /**显示新手引导 */
        RaceView.prototype.showGuid = function () {
            // this.getChickenView.visible = false
            // 第一步省略，直接进入第二步。
            if (module.RaceManager.instance.userInfo.guidStep == 1) {
                // var view:GuidTipView = new GuidTipView();
                // view.pos(Laya.stage.width / 2, Laya.stage.height / 2);
                // this.addChild(view);
                module.RaceManager.instance.gotoGuidStep(2);
            }
            else if (module.RaceManager.instance.userInfo.guidStep == 2) {
                var view2 = new module.GuidTipView2();
                view2.pos(Laya.stage.width / 2, 300 + RaceView.TOP);
                this.addChild(view2);
            }
            else if (module.RaceManager.instance.userInfo.guidStep == 3) {
                var view3 = new module.GuidTipView3();
                view3.pos(480, 70 + RaceView.TOP);
                this.addChild(view3);
            }
            else if (module.RaceManager.instance.userInfo.guidStep == 4) {
                var view4 = new module.GuidTipView4();
                view4.pos(0, Laya.stage.height - 284);
                this.addChildAt(view4, 4);
            }
            else if (module.RaceManager.instance.userInfo.guidStep == 5) {
                var view5 = new module.GuidTipView(10);
                view5.pos(Laya.stage.width / 2, Laya.stage.height / 2);
                this.addChild(view5);
            }
            else {
                // this.getChickenView.visible = true
            }
        };
        RaceView.prototype.onChangeGuidStep = function () {
            this.showGuid();
        };
        RaceView.prototype.onChangeGuidRun = function () {
            var arrow = new module.GuidArrowView();
            arrow.setGuidRun(1);
            this.bottomView.addChild(arrow);
        };
        RaceView.prototype.onShowSelectPlantGuid = function () {
            var isFirstShowDownArrow = wx.getStorageSync(Main.DianDianChongWu_ShowDownArrow);
            if (!isFirstShowDownArrow) {
                var arrow = new module.GuidArrowView();
                arrow.setGuidRun5();
                this.bottomView.addChild(arrow);
                wx.setStorageSync(Main.DianDianChongWu_ShowDownArrow, "1");
            }
        };
        RaceView.prototype.destroy = function () {
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        RaceView.FLY_WATER = "RaceView_" + "FLY_WATER";
        RaceView.SHOW_HATCH_NOW = "RaceView_" + "SHOW_HATCH_NOW";
        RaceView.CLICK_CHICHEN = "RaceView_" + "CLICK_CHICHEN";
        RaceView.GOTO_RUN = "RaceView_" + "GOTO_RUN";
        RaceView.CLOSE_RUN = "RaceView_" + "CLOSE_RUN";
        RaceView.FLY_MONEY = "RaceView_" + "FLY_MONEY";
        RaceView.CONTROL_FALSE = "RaceView_" + "CONTROL_FALSE";
        RaceView.CONTROL_TRUE = "RaceView_" + "CONTROL_TRUE";
        RaceView.TOP = 70;
        return RaceView;
    }(ui.game.RaceViewUI));
    module.RaceView = RaceView;
})(module || (module = {}));
//# sourceMappingURL=RaceView.js.map