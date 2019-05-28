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
 * 宠物
 */
var module;
(function (module) {
    var ChichenView = /** @class */ (function (_super) {
        __extends(ChichenView, _super);
        function ChichenView() {
            var _this = _super.call(this) || this;
            _this.imgList = new Array();
            _this.aniList = new Array();
            _this.itemList = new Array();
            _this.mealItemList = new Array();
            _this.type = 1;
            _this.AddCoinSelflyNum = 0;
            var alreadyAddCoin;
            // 如果不是新的一天，更新已获取的金币数。
            if (Main.app.is_wx) {
                var saveTime = wx.getStorageSync(Main.DianDianChongWu_NowDay1);
                if (saveTime == Main.app.mwx.nowday) {
                    alreadyAddCoin = wx.getStorageSync(Main.DianDianChongWu_AlreadyCoin);
                    if (!!alreadyAddCoin)
                        _this.AddCoinSelflyNum = alreadyAddCoin;
                }
                else {
                    wx.setStorageSync(Main.DianDianChongWu_NowDay1, Main.app.mwx.nowday);
                }
            }
            else {
                if (!!alreadyAddCoin)
                    _this.AddCoinSelflyNum = alreadyAddCoin;
            }
            return _this;
        }
        ChichenView.prototype.onEnterFrame = function () {
            for (var i = 0; i < this.itemList.length; i++) {
                var item = this.itemList[i];
                item.onEnterFrame();
                if (item.type == 1 && item.data.addCoinExpTime < 0) {
                    // manager.EventManager.instance.event(RaceView.FLY_WATER, item.getAddCoinData()); // 自动产金币关闭
                    manager.EventManager.instance.event(module.RaceView.FLY_WATER, item.getAddExpData());
                    item.data.resetAddCoinExpTime();
                    this.AddCoinSelflyNum++;
                    if (Main.app.is_wx) {
                        wx.setStorageSync(Main.DianDianChongWu_AlreadyCoin, this.AddCoinSelflyNum);
                    }
                    if (this.AddCoinSelflyNum >= Main.app.mwx.nBeginDecodeNums) {
                        item.data.resetAttenuationTime();
                    }
                }
            }
            for (var i = 0; i < this.mealItemList.length; i++) {
                this.mealItemList[i].updatePos();
            }
            this.sortSprite();
        };
        /* 排序 */
        ChichenView.prototype.sortSprite = function () {
            var list = [];
            list = list.concat(this.aniList);
            list = list.concat(this.itemList);
            list.sort(function (a, b) { return a.y < b.y ? -1 : 1; });
            for (var i = 0; i < list.length; i++) {
                this.setChildIndex(list[i], i);
            }
        };
        /* 点击 */
        ChichenView.prototype.onHandClick = function (pos) {
            var clicks = [];
            if (this.type == 1) {
                // 收集经验
                var isClick = false;
                var isClickCoin = false;
                for (var i = 0; i < this.itemList.length; i++) {
                    if (this.itemList[i].collision(pos)) {
                        if (this.itemList[i].type == 1)
                            isClick = true; // 点中动物
                        if (this.itemList[i].type == 2)
                            isClickCoin = true; // 点中动物
                        manager.EventManager.instance.event(module.RaceView.FLY_WATER, this.itemList[i].getFlyData());
                        clicks.push(this.itemList[i]);
                    }
                }
                if (isClick == true) {
                    manager.EventManager.instance.event(module.RaceView.CLICK_CHICHEN);
                    // 点中宠物，增加一次点击次数，到达一定次数弹出幸运弹窗。
                    if (Main.app.mwx.ofLuck > 0) {
                        Main.app.clickCount++;
                        if (Main.app.clickCount >= Main.app.mwx.ofLuckCount) {
                            Main.app.showLuckView();
                        }
                    }
                }
                for (var i = 0; i < clicks.length; i++) {
                    clicks[i].handClickOk();
                }
                var animation = new laya.display.Animation();
                animation.loadAnimation(manager.ResVersionMgr.instance.getMd5Url(isClickCoin ? "ani/starClickAni.ani" : "ani/light_yellow.ani"));
                animation.scale(isClickCoin ? 1 : 3, isClickCoin ? 1 : 3);
                animation.pos(pos.x, pos.y);
                this.addChild(animation);
                animation.play(0, false);
                animation.on(laya.events.Event.COMPLETE, this, this.onClearAni, [animation]);
                if (isClickCoin) {
                    manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Tap_coin1");
                }
                if (isClick) {
                    manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Tap_chichen" + Math.floor(Math.random() * 3 + 1));
                }
                if (isClick == false && isClickCoin == false) {
                    manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Tap_miss1");
                }
            }
            else if (this.type == 2) {
                // 喂食
                for (var i = 0; i < this.itemList.length; i++) {
                    if (this.itemList[i].collision(pos)) { //点中
                        if (this.itemList[i].type == 1) { //点中鸡
                            module.RaceManager.instance.wealFood(this.itemList[i].data); //给鸡喂食物
                        }
                        else {
                            manager.EventManager.instance.event(module.RaceView.FLY_WATER, this.itemList[i].getFlyData());
                            clicks.push(this.itemList[i]);
                        }
                    }
                }
                for (var i = 0; i < clicks.length; i++) {
                    clicks[i].handClickOk();
                }
            }
        };
        ChichenView.prototype.onHandMove = function (pos) {
            var clicks = [];
            for (var i = 0; i < this.itemList.length; i++) {
                if (this.itemList[i].type == 2 && this.itemList[i].collision(pos)) { //点中
                    manager.EventManager.instance.event(module.RaceView.FLY_WATER, this.itemList[i].getFlyData());
                    clicks.push(this.itemList[i]);
                }
            }
            for (var i = 0; i < clicks.length; i++) {
                clicks[i].handClickOk();
            }
        };
        /* 初始化场地中的动物 */
        ChichenView.prototype.initChichen = function () {
            var chichenInfos = module.RaceManager.instance.getPlantInfo().chichenInfoList;
            console.log("初始化场地中的动物：", chichenInfos);
            for (var i = 0; i < chichenInfos.length; i++) {
                var item = new module.ChichenItem();
                item.data = chichenInfos[i];
                this.addChild(item);
                this.itemList.push(item);
            }
            var coinInfoList = module.RaceManager.instance.getPlantInfo().coinInfoList;
            console.log("初始化场地中的金币：", coinInfoList);
            for (var i = 0; i < coinInfoList.length; i++) {
                this.addCoin(coinInfoList[i]);
            }
        };
        /**在场地中添加一个金币 */
        ChichenView.prototype.addCoin = function (coinInfo) {
            var item = new module.CoinItem();
            item.coin = coinInfo;
            item.pos(coinInfo.x, coinInfo.y);
            this.addChild(item);
            this.itemList.push(item);
        };
        /**在场地中添加一个金币 */
        ChichenView.prototype.removeCoin = function (coinInfo) {
            for (var i = 0; i < this.itemList.length; i++) {
                if (this.itemList[i].coin != null && this.itemList[i].coin.coinId == coinInfo.coinId) {
                    this.itemList[i].destroy();
                    this.itemList.splice(i, 1);
                    break;
                }
            }
        };
        /**添加一个动物 */
        ChichenView.prototype.addChichenToPlant = function (chichenInfo) {
            if (module.RaceManager.instance.getPlantInfo().plantId == chichenInfo.plantId) {
                var item = new module.ChichenItem();
                item.data = chichenInfo;
                this.addChild(item);
                this.itemList.push(item);
            }
        };
        /**移除一个动物 */
        ChichenView.prototype.removeChichenFromPlant = function (chichenInfo) {
            if (module.RaceManager.instance.getPlantInfo().plantId == chichenInfo.plantId) {
                for (var i = 0; i < this.itemList.length; i++) {
                    if (this.itemList[i].data && this.itemList[i].data.id == chichenInfo.id) {
                        this.itemList[i].destroy();
                        this.itemList.splice(i, 1);
                        break;
                    }
                }
            }
        };
        ChichenView.prototype.addAni = function (ani) {
            this.addChild(ani);
            ani.play(Math.floor(Math.random() * 20), true);
            this.aniList.push(ani);
        };
        /* 开始喂食 */
        ChichenView.prototype.onGotoMeal = function () {
            this.type = 2;
            var index = 0;
            for (var i = 0; i < this.itemList.length; i++) {
                if (this.itemList[i].type == 1) {
                    this.itemList[i].startMeal(index);
                    var mealItem = new module.MealItem(this.itemList[i].data);
                    this.addChild(mealItem);
                    this.mealItemList.push(mealItem);
                    index++;
                }
            }
        };
        /**结束喂食 */
        ChichenView.prototype.onCloseMeal = function () {
            this.type = 1;
            for (var i = 0; i < this.itemList.length; i++) {
                if (this.itemList[i].type == 1) {
                    this.itemList[i].mealEnd();
                }
            }
            for (var i = 0; i < this.mealItemList.length; i++) {
                this.mealItemList[i].destroy();
            }
            this.mealItemList.splice(0, this.mealItemList.length);
        };
        /**升级 */
        ChichenView.prototype.upgradeChihcen = function (chichenInfo) {
            if (module.RaceManager.instance.getPlantInfo().plantId == chichenInfo.plantId) {
                for (var i = 0; i < this.itemList.length; i++) {
                    if (this.itemList[i].data && this.itemList[i].data.id == chichenInfo.id) {
                        this.itemList[i].updateChichen();
                    }
                }
                for (var i = 0; i < this.mealItemList.length; i++) {
                    if (this.mealItemList[i].chichenInfo.id == chichenInfo.id) {
                        this.mealItemList[i].updateChichen();
                    }
                }
            }
        };
        ChichenView.prototype.onChangeHAt = function (chichenInfo) {
            for (var i = 0; i < this.itemList.length; i++) {
                if (this.itemList[i].data && this.itemList[i].data.id == chichenInfo.id) {
                    this.itemList[i].changeHat();
                }
            }
        };
        ChichenView.prototype.addSp = function (img) {
            this.addChild(img);
            this.imgList.push(img);
        };
        ChichenView.prototype.onClearAni = function (animation) {
            animation.destroy();
        };
        ChichenView.prototype.clearAll = function () {
            for (var i = 0; i < this.imgList.length; i++) {
                this.imgList[i].destroy();
            }
            this.imgList = new Array();
            for (var i = 0; i < this.aniList.length; i++) {
                this.aniList[i].destroy();
            }
            this.aniList = new Array();
            for (var i = 0; i < this.itemList.length; i++) {
                this.itemList[i].destroy();
            }
            this.itemList = new Array();
            for (var i = 0; i < this.mealItemList.length; i++) {
                this.mealItemList[i].destroy();
            }
            this.mealItemList = new Array();
        };
        return ChichenView;
    }(laya.ui.Component));
    module.ChichenView = ChichenView;
})(module || (module = {}));
//# sourceMappingURL=ChichenView.js.map