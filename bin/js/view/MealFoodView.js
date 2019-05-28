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
 * 宠物喂食界面
 */
var module;
(function (module) {
    var Point = laya.maths.Point;
    var MealFoodView = /** @class */ (function (_super) {
        __extends(MealFoodView, _super);
        function MealFoodView() {
            var _this = _super.call(this) || this;
            _this.txt_food = null;
            _this.isStarted = false;
            _this.itemList = [];
            _this.endPos = null;
            _this.beginPos = null;
            _this.count = 100;
            _this.oneScore = 0;
            _this.initView();
            _this.initEvents();
            return _this;
        }
        MealFoodView.prototype.initView = function () {
            var b = Math.round((Laya.stage.width - 220 * 3) / 4);
            this.box_1.x = b;
            this.box_2.x = this.box_1.x + this.box_1.width + b;
            this.box_3.x = this.box_2.x + this.box_2.width + b;
            this.txt_food = new module.FontClip("ui/num_a_", 80, 35, 160, 36, "center");
            this.txt_food.scale(0.8, 0.8);
            this.box.addChild(this.txt_food);
            this.onShowFood();
        };
        MealFoodView.prototype.initEvents = function () {
            this.btn_buy_coin.on(laya.events.Event.CLICK, this, this.onBtnbuyCoin);
            this.btn_buy_wing.on(laya.events.Event.CLICK, this, this.onBtnBuyWing);
            this.btn_look.on(laya.events.Event.CLICK, this, this.HowGetApple);
            module.RaceManager.instance.on(module.RaceManager.LOOKTOMEALAPPLE, this, this.onBtnLook);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_FOOD, this, this.onShowFood);
        };
        MealFoodView.prototype.removeEvents = function () {
            module.RaceManager.instance.off(module.RaceManager.CHANGE_FOOD, this, this.onShowFood);
            module.RaceManager.instance.off(module.RaceManager.LOOKTOMEALAPPLE, this, this.onBtnLook);
        };
        MealFoodView.prototype.onShowFood = function () {
            this.txt_food.text = module.RaceManager.instance.userInfo.apple + "";
        };
        /* 金币购买苹果 */
        MealFoodView.prototype.onBtnbuyCoin = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (this.isStarted == false) {
                if (module.RaceManager.instance.userInfo.coin >= 50) {
                    module.RaceManager.instance.addCoin(-50);
                    this.flyFood(1, 100);
                }
                else {
                    if (Main.app.getReceiveFreeCoins() >= Main.app.mwx.ofCoinsLessParam["time"]) {
                        module.RaceManager.instance.showShop();
                    }
                    else {
                        Main.app.showCoinsLackingView();
                    }
                }
            }
        };
        MealFoodView.prototype.onBtnLook = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.flyFood(2, 200);
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.GetFoodsFree, { "type": Main.app.mwx.ofFeedPat });
        };
        MealFoodView.prototype.HowGetApple = function () {
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.GetFoodsFree, { "type": 0 });
            if (Main.app.mwx.ofFeedPat == 1) {
                // 直接使用
                this.onBtnLook();
            }
            else if (Main.app.mwx.ofFeedPat == 2 || Main.app.mwx.ofFeedPat == 4) {
                // 看视频使用
                if (Main.app.mwx.avShowType == false) {
                    return;
                }
                Main.app.mwx.avShowType = false;
                var self_1 = this;
                Laya.timer.once(500, self_1, function () {
                    self_1.onVideo(Main.app.mwx.ofFeedPat);
                });
            }
            else if (Main.app.mwx.ofFeedPat == 3) {
                // 分享使用
                this.onShare();
            }
            else {
                // 暂不支持
                Main.app.showMessage("功能暂未开放");
            }
        };
        /* 看视频 */
        MealFoodView.prototype.onVideo = function (type) {
            var self = this;
            wxCore.uo.loadingVideo(function (ok) {
                if (ok) {
                    wxCore.uo.showVideoAD(function (played) {
                        if (played) {
                            self.onBtnLook();
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
        MealFoodView.prototype.onShare = function () {
            if (Main.app.shareIndex > 0) {
                return;
            }
            Main.app.shareIndex = 4;
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
        /* 羽毛买苹果 */
        MealFoodView.prototype.onBtnBuyWing = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (this.isStarted == false) {
                if (module.RaceManager.instance.userInfo.wing >= 1) {
                    module.RaceManager.instance.addWing(-1);
                    this.flyFood(3, 1200);
                }
                else {
                    Main.app.showMessage("您的羽毛不足");
                    if (Main.app.getReceiveFreeFeather() >= Number(Main.app.mwx.ofFeatherLessParam["time"])) {
                        module.RaceManager.instance.showShop();
                    }
                    else {
                        Main.app.showFeatherLackingView();
                    }
                }
            }
        };
        MealFoodView.prototype.flyFood = function (type, score) {
            this.endPos = new Point(this.box.x + 46, this.box.y + 46);
            this.beginPos = new Point(this["box_" + type].x + 46, this["box_" + type].y + 46);
            this.count = 50;
            this.oneScore = score / 50;
            this.onLoop();
            Laya.timer.loop(200, this, this.onLoop);
        };
        MealFoodView.prototype.onLoop = function () {
            for (var i = 0; i < 10; i++) {
                this.addFlyItem(this.beginPos, this.endPos, this.oneScore, i);
            }
            this.count -= 10;
            if (this.count <= 0) {
                Laya.timer.clear(this, this.onLoop);
            }
        };
        MealFoodView.prototype.addFlyItem = function (beginPos, endPos, score, delay) {
            var sc = 0.1 + Math.random() * 0.3;
            var length = ((Math.random() * 2 >= 1) ? 100 : -100) * (Math.random() * 2);
            var item = new module.FoodFlyItem(score);
            item.cp.push(beginPos);
            var p = core.Utils.getBezier2TP(beginPos, endPos, length, sc);
            item.cp.push(p);
            item.cp.push(endPos);
            item.maxt = Math.floor(beginPos.distance(endPos.x, endPos.y) / 10);
            item.wT = item.maxt * 10;
            item.x = beginPos.x;
            item.y = beginPos.y;
            item.delay = delay;
            this.addChild(item);
            this.itemList.push(item);
            this.startFly();
        };
        MealFoodView.prototype.startFly = function () {
            if (this.isStarted == false) {
                this.isStarted = true;
                Laya.timer.loop(20, this, this.enterFrame);
            }
        };
        MealFoodView.prototype.enterFrame = function () {
            var isAllEnd = true;
            for (var i = 0; i < this.itemList.length; i++) {
                if (this.itemList[i].isEnd == false) {
                    this.itemList[i].delay -= 1;
                    isAllEnd = false;
                    if (this.itemList[i].delay <= 0) {
                        this.itemList[i].moveTo();
                        // 一个水滴飞完成
                        if (this.itemList[i].isEnd) {
                            module.RaceManager.instance.changeFood(this.itemList[i].score);
                        }
                    }
                }
                else {
                    this.itemList[i].destroy();
                }
            }
            if (isAllEnd) {
                Laya.timer.clear(this, this.enterFrame);
                this.isStarted = false;
                this.itemList.splice(0, this.itemList.length);
            }
        };
        MealFoodView.prototype.destroy = function () {
            Laya.timer.clearAll(this);
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return MealFoodView;
    }(ui.game.MealFoodViewUI));
    module.MealFoodView = MealFoodView;
})(module || (module = {}));
//# sourceMappingURL=MealFoodView.js.map