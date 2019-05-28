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
 * 上边的菜单界面
 */
var module;
(function (module) {
    var Point = laya.maths.Point;
    var Image = laya.ui.Image;
    var TopView = /** @class */ (function (_super) {
        __extends(TopView, _super);
        function TopView() {
            var _this = _super.call(this) || this;
            _this.menuType = 1;
            _this.curPlantId = 0;
            _this.maskimg = null;
            _this.txt_coin = null;
            _this.txt_wing = null;
            _this.txt_food = null;
            _this.initView();
            _this.initEvents();
            return _this;
        }
        TopView.prototype.initView = function () {
            this.img_exp2.width = this.img_exp1.width;
            this.maskimg = new Image("ui/mask.png");
            this.maskimg.sizeGrid = "9,3,9,3";
            this.img_exp2.mask = this.maskimg;
            this.txt_coin = new module.FontClip("ui/num_a_", 5, 22, 162, 36, "center");
            this.txt_coin.scale(0.8, 0.8);
            this.box_coin.addChild(this.txt_coin);
            this.txt_wing = new module.FontClip("ui/num_a_", 5, 22, 138, 36, "center");
            this.txt_wing.scale(0.8, 0.8);
            this.box_wing.addChild(this.txt_wing);
            this.txt_food = new module.FontClip("ui/num_a_", 147.5, 22, 150, 36, "left");
            this.txt_food.scale(0.8, 0.8);
            this.box_race.addChild(this.txt_food);
            this.onShowFood();
            this.showCoin();
            this.showWing();
        };
        TopView.prototype.initEvents = function () {
            // this.btn_menu.on(laya.events.Event.CLICK, this, this.onBtnMenu);
            this.btn_addWing.on(laya.events.Event.CLICK, this, this.onBtnAddWing);
            this.btn_addCoin.on(laya.events.Event.CLICK, this, this.onBtnAddWing);
            this.TestWings.on(laya.events.Event.CLICK, this, this.testwings);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_PLANT_EXP, this, this.onChangePlantExp);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_COIN, this, this.showCoin);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_FOOD, this, this.onShowFood);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_WING, this, this.showWing);
            manager.EventManager.instance.on(module.ToolView.GOTO_SMALL, this, this.onToolGotoSmall);
            manager.EventManager.instance.on(module.ToolView.GOTO_MEAL, this, this.onGotoMeal);
            manager.EventManager.instance.on(module.ToolView.CLOSE_MEAL, this, this.onCloseMeal);
        };
        TopView.prototype.removeEvents = function () {
            module.RaceManager.instance.off(module.RaceManager.CHANGE_PLANT_EXP, this, this.onChangePlantExp);
            module.RaceManager.instance.off(module.RaceManager.CHANGE_COIN, this, this.showCoin);
            module.RaceManager.instance.off(module.RaceManager.CHANGE_FOOD, this, this.onShowFood);
            module.RaceManager.instance.off(module.RaceManager.CHANGE_WING, this, this.showWing);
            manager.EventManager.instance.off(module.ToolView.GOTO_SMALL, this, this.onToolGotoSmall);
            manager.EventManager.instance.off(module.ToolView.GOTO_MEAL, this, this.onGotoMeal);
            manager.EventManager.instance.off(module.ToolView.CLOSE_MEAL, this, this.onCloseMeal);
        };
        TopView.prototype.initData = function () {
            var plantInfo = module.RaceManager.instance.getPlantInfo();
            this.curPlantId = plantInfo.plantId;
            this.img_egg.skin = "ui/egg_" + (this.curPlantId > 100 ? this.curPlantId - 100 : this.curPlantId) + ".png";
            this.maskimg.width = (plantInfo.exp / plantInfo.maxExp) * this.img_exp2.width;
        };
        /**经验变化 */
        TopView.prototype.onChangePlantExp = function (plantId, exp) {
            if (this.curPlantId == plantId) {
                var plantInfo = module.RaceManager.instance.getPlantInfoById(this.curPlantId);
                this.maskimg.width = (plantInfo.exp / plantInfo.maxExp) * this.img_exp2.width;
                this.ani2.play(0, false);
            }
        };
        TopView.prototype.showCoin = function () {
            if (module.RaceManager.instance.userInfo.coin < 10000) {
                this.txt_coin.text = module.RaceManager.instance.userInfo.coin + "";
            }
            else {
                var n = module.RaceManager.instance.userInfo.coin / 1000;
                var a = Math.floor(n);
                var b = Math.floor(n * 10) % 10;
                // this.txt_coin.text = a + (b > 0 ? "d" + b : "") + "k";
                this.txt_coin.text = a.toString() + "k";
            }
        };
        TopView.prototype.showWing = function () {
            this.txt_wing.text = module.RaceManager.instance.userInfo.wing + "";
        };
        TopView.prototype.onShowFood = function () {
            this.txt_food.text = module.RaceManager.instance.userInfo.apple + "";
        };
        TopView.prototype.onBtnMenu = function () {
            if (this.menuType == 1) {
                this.img_menu.skin = "ui/img_x.png";
                this.menuType = 2;
                this.ani1.play(0, false);
            }
            else if (this.menuType == 2) {
                this.img_menu.skin = "ui/img_m.png";
                this.menuType = 1;
                this.ani1.play(0, false);
            }
            manager.EventManager.instance.event(module.ToolView.CHANGE_MENU_TYPE, [this.menuType]);
            manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Tap_menu3");
        };
        TopView.prototype.onToolGotoSmall = function () {
            if (this.menuType != 1) {
                this.img_menu.skin = "ui/img_m.png";
                this.menuType = 1;
                this.ani1.play(0, false);
                manager.EventManager.instance.event(module.ToolView.CHANGE_MENU_TYPE, [this.menuType]);
            }
        };
        /* 打开喂宠物界面时响应的操作 */
        TopView.prototype.onGotoMeal = function () {
            // this.img_menu.skin = "ui/img_m.png";
            // this.img_menu.visible = false;
            this.menuType = 0;
            this.img_weal.visible = true;
            this.img_egg.visible = this.img_exp1.visible = this.img_exp2.visible = false;
        };
        /* 关闭喂宠物界面时响应的操作 */
        TopView.prototype.onCloseMeal = function () {
            // this.img_menu.skin = "ui/img_m.png";
            // this.img_menu.visible = true;
            this.menuType = 1;
            this.ani1.play(0, false);
            this.img_weal.visible = false;
            this.img_egg.visible = this.img_exp1.visible = this.img_exp2.visible = true;
            manager.EventManager.instance.event(module.ToolView.CHANGE_MENU_TYPE, [this.menuType]);
        };
        TopView.prototype.showRun = function () {
            this.img_menu.visible = false;
            this.box_exp.visible = false;
            this.box_race.visible = true;
        };
        TopView.prototype.closeRun = function () {
            this.img_menu.visible = true;
            this.box_exp.visible = true;
            this.box_race.visible = false;
        };
        TopView.prototype.onBtnAddWing = function () {
            // RaceManager.instance.addWing(50); // zxx  text
            module.RaceManager.instance.showShop();
        };
        TopView.prototype.testwings = function () {
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(0, 0)), 3, 100]);
        };
        TopView.prototype.getExpIconPos = function () {
            return this.box_exp.localToGlobal(new Point(this.img_egg.x + 32, this.img_egg.y + 36));
        };
        TopView.prototype.getCoinIconPos = function () {
            return this.box_coin.localToGlobal(new Point(this.img_coin.x + 28, this.img_coin.y + 29));
        };
        TopView.prototype.getWingIconPos = function () {
            return this.box_wing.localToGlobal(new Point(this.img_gem.x + 23, this.img_gem.y + 28));
        };
        TopView.prototype.destroy = function () {
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return TopView;
    }(ui.game.TopViewUI));
    module.TopView = TopView;
})(module || (module = {}));
//# sourceMappingURL=TopView.js.map