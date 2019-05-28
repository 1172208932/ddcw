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
    var ChichenItem = /** @class */ (function (_super) {
        __extends(ChichenItem, _super);
        function ChichenItem() {
            var _this = _super.call(this) || this;
            _this.box = null;
            _this.img = null;
            _this.hatImg = null;
            _this.sleepAni = null;
            _this.shanAni = null;
            _this.isBeginShow = false;
            _this._data = null;
            _this._coin = null;
            _this.moveScale = 1;
            _this.type = 1;
            _this._imgIndex = 0;
            _this.initView();
            return _this;
        }
        ChichenItem.prototype.initView = function () {
            this.type = 1;
            this.box = new laya.ui.Component();
            this.addChild(this.box);
            this.img = new laya.ui.Image("");
            this.box.addChild(this.img);
        };
        Object.defineProperty(ChichenItem.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.x = this._data.xx;
                this.y = this._data.yy;
                this.scale(this._data.scale, this._data.scale);
                this.loadImg();
                this.showShanAni();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChichenItem.prototype, "coin", {
            get: function () {
                return this._coin;
            },
            set: function (value) {
                this._coin = value;
            },
            enumerable: true,
            configurable: true
        });
        /**升级后，更新鸡的大小 */
        ChichenItem.prototype.updateChichen = function () {
            this.scale(this._data.scale, this._data.scale);
            this.showShanAni();
            this.changeToMealEat();
        };
        ChichenItem.prototype.showShanAni = function () {
            if (this._data.star > 0) {
                if (this.shanAni != null) {
                    var star = Number(this.shanAni.name);
                    if (this._data.star == star) {
                        return;
                    }
                    else {
                        this.shanAni.destroy();
                        this.shanAni = null;
                    }
                }
                this.shanAni = new laya.display.Animation();
                this.shanAni.loadAnimation(manager.ResVersionMgr.instance.getMd5Url("ani/buling" + this._data.star + ".ani"));
                this.shanAni.pos(0, -50);
                this.shanAni.name = this._data.star + "";
                this.addChild(this.shanAni);
                this.shanAni.scale(0.5, 0.5);
                this.shanAni.play(Math.floor(Math.random() * 40), true);
            }
        };
        /**是否点击中 */
        ChichenItem.prototype.collision = function (pos) {
            if (this._data.state == module.ChichenInfo.STATE_SLEEP) {
                return false;
            }
            else {
                var r = 10 + Math.max(this._data.config.getWidth(1) / 2, this._data.config.getHeight(1) / 2) * this._data.scale;
                if (Math.pow(this.x - pos.x, 2) + Math.pow((this.y - r) - pos.y, 2) <= Math.pow(r, 2)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        /**飞行数据 */
        ChichenItem.prototype.getFlyData = function () {
            var r = Math.min(this._data.config.getWidth(1) / 2, this._data.config.getHeight(1) / 2) * this._data.scale;
            var pos = new Point(this.x, this.y - r);
            return [pos, 1, this._data.getExp(), [this._data.plantId, this._data.star]];
        };
        ChichenItem.prototype.getAddCoinData = function () {
            var r = Math.min(this._data.config.getWidth(1) / 2, this._data.config.getHeight(1) / 2) * this._data.scale;
            var pos = new Point(this.x, this.y - r);
            return [pos, 2, 1, [this.coin]];
        };
        ChichenItem.prototype.getAddExpData = function () {
            var r = Math.min(this._data.config.getWidth(1) / 2, this._data.config.getHeight(1) / 2) * this._data.scale;
            var pos = new Point(this.x, this.y - r);
            return [pos, 11, 1, [this._data.plantId, this._data.star]];
        };
        ChichenItem.prototype.loadImg = function () {
            Laya.loader.load(this._data.config.getFileUrls(), laya.utils.Handler.create(this, this.onLoadedImage));
        };
        ChichenItem.prototype.onLoadedImage = function () {
            this.changeToStand();
            this.showState();
            this.isBeginShow = true;
        };
        ChichenItem.prototype.onEnterFrame = function () {
            if (this.isBeginShow == false)
                return;
            this._data.time -= 30;
            this._data.changeAddCoinExpTime(30);
            switch (this._data.state) {
                case module.ChichenInfo.STATE_STAND:
                    this.compress_stand();
                    break;
                case module.ChichenInfo.STATE_EAT:
                    this.compress_eat();
                    break;
                case module.ChichenInfo.STATE_WALK:
                    this.compress_walk();
                    break;
                case module.ChichenInfo.STATE_RUN:
                    this.compress_run();
                    break;
                case module.ChichenInfo.STATE_SLEEP:
                    this.compress_sleep();
                    break;
                case module.ChichenInfo.STATE_MEAL:
                    this.compress_meal();
                    break;
                case module.ChichenInfo.STATE_HOCK:
                    this.compress_shock();
                    break;
                case module.ChichenInfo.STATE_MEAL_EAT:
                    this.compress_meal_eat();
                    break;
            }
        };
        /**鸡被点中了 */
        ChichenItem.prototype.handClickOk = function () {
            this._data.goSleepCount -= 1;
            if (this._data.goSleepCount <= 0) {
                this.changeToSleep();
            }
            else {
                if (this._data.state == module.ChichenInfo.STATE_RUN) {
                    this.changeToRun();
                }
                else {
                    var rand = Math.floor(Math.random() * 100);
                    if (rand < 30) {
                        this.changeToRun();
                        // }else if(rand < 60){
                        // 	this.changeToWalk();
                        // }
                    }
                    else {
                        this.changeToShock();
                    }
                }
                this.addCoin();
            }
            this.showState();
        };
        /**开始喂食，鸡走到位置上去 */
        ChichenItem.prototype.startMeal = function (index) {
            this.changeToMeal(module.RaceManager.instance.mealPoss[index]);
        };
        /**喂食结束 */
        ChichenItem.prototype.mealEnd = function () {
            this.changeToWalk();
            this.showState();
        };
        /* 被点中了是否掉落金币 */
        ChichenItem.prototype.addCoin = function () {
            var rand = Math.floor(Math.random() * 100);
            if (rand < 20) {
                module.RaceManager.instance.addCoinInPlant(this._data.plantId, new Point(this.x, this.y));
            }
        };
        /**站立时变形*/
        ChichenItem.prototype.compress_stand = function () {
            if (this._data.cpIndex == 1) {
                var p = core.Utils.PointOnCubicBezier1_2(this._data.cp[0], this._data.cp[1], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    this._data.t1 = 1;
                    this._data.cpIndex = 2;
                }
            }
            else {
                p = core.Utils.PointOnCubicBezier1_2(this._data.cp[1], this._data.cp[2], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    if (this._data.time <= 0) {
                        this.changeStateBySelf();
                    }
                    else {
                        this._data.t1 = 1;
                        this._data.cpIndex = 1;
                    }
                }
            }
        };
        /**吃东西时变形*/
        ChichenItem.prototype.compress_eat = function () {
            if (this._data.cpIndex == 1) {
                this._data.t1 += 1;
                if (this._data.t1 >= this._data.max) {
                    this.changeChichenSkin(2);
                    this._data.cpIndex = 2;
                    this._data.t1 = 0;
                }
            }
            else {
                this._data.t1 += 1;
                if (this._data.t1 >= this._data.max) {
                    this.changeChichenSkin(1);
                    this._data.cpIndex = 1;
                    this._data.t1 = 0;
                    if (this._data.time <= 0) {
                        this.changeStateBySelf();
                    }
                }
            }
        };
        /**行走时变形*/
        ChichenItem.prototype.compress_walk = function () {
            if (this._data.movet1 <= this._data.moveMax) {
                var p = core.Utils.PointOnCubicBezier1_2(this._data.moveCp[0], this._data.moveCp[1], this._data.movet1 / this._data.moveMax);
                this.setPos(p.x, p.y);
                this._data.movet1 += 1;
            }
            if (this._data.cpIndex == 1) {
                p = core.Utils.PointOnCubicBezier1_2(this._data.cp[0], this._data.cp[1], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    this._data.t1 = 1;
                    this._data.cpIndex = 2;
                }
            }
            else {
                p = core.Utils.PointOnCubicBezier1_2(this._data.cp[1], this._data.cp[2], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    if (this._data.movet1 > this._data.moveMax) {
                        this.changeStateBySelf();
                    }
                    else {
                        this._data.t1 = 1;
                        this._data.cpIndex = 1;
                    }
                }
            }
        };
        /**跑时变形*/
        ChichenItem.prototype.compress_run = function () {
            if (this._data.movet1 <= this._data.moveMax) {
                var p = core.Utils.PointOnCubicBezier1_2(this._data.moveCp[0], this._data.moveCp[1], this._data.movet1 / this._data.moveMax);
                this.setPos(p.x, p.y);
                this._data.movet1 += 1;
                this.box.scale(1 * this.moveScale, 1);
                if (this._data.movet1 > this._data.moveMax) {
                    if (this._data.time <= 0) {
                        this.changeStateBySelf();
                    }
                    else {
                        this._data.moveCp = [];
                        this._data.moveCp.push(new Point(this.x, this.y));
                        this._data.moveCp.push(module.RaceManager.instance.getNextPos());
                        this._data.movet1 = 1;
                        this._data.moveMax = Math.floor(this._data.moveCp[0].distance(this._data.moveCp[1].x, this._data.moveCp[1].y) / 5);
                        if (this._data.moveCp[0].x <= this._data.moveCp[1].x) {
                            this.moveScale = -1;
                        }
                        else {
                            this.moveScale = 1;
                        }
                    }
                }
            }
            if (this._data.cpIndex == 1) {
                this._data.t1 += 1;
                if (this._data.t1 >= this._data.max) {
                    this.changeChichenSkin(5);
                    this._data.cpIndex = 2;
                    this._data.t1 = 0;
                }
            }
            else {
                this._data.t1 += 1;
                if (this._data.t1 >= this._data.max) {
                    this.changeChichenSkin(6);
                    this._data.cpIndex = 1;
                    this._data.t1 = 0;
                }
            }
        };
        /**睡眠时变形*/
        ChichenItem.prototype.compress_sleep = function () {
            if (this._data.cpIndex == 1) {
                var p = core.Utils.PointOnCubicBezier1_2(this._data.cp[0], this._data.cp[1], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    this._data.t1 = 1;
                    this._data.cpIndex = 2;
                }
            }
            else {
                p = core.Utils.PointOnCubicBezier1_2(this._data.cp[1], this._data.cp[2], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    if (this._data.time <= 0) {
                        this._data.goSleepCount = 40;
                        this.changeStateBySelf();
                    }
                    else {
                        this._data.t1 = 1;
                        this._data.cpIndex = 1;
                    }
                }
            }
        };
        /**喂食时变形*/
        ChichenItem.prototype.compress_meal = function () {
            if (this._data.movet1 <= this._data.moveMax) {
                var p = core.Utils.PointOnCubicBezier1_2(this._data.moveCp[0], this._data.moveCp[1], this._data.movet1 / this._data.moveMax);
                this.setPos(p.x, p.y);
                this._data.movet1 += 1;
            }
            if (this._data.cpIndex == 1) {
                p = core.Utils.PointOnCubicBezier1_2(this._data.cp[0], this._data.cp[1], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    this._data.t1 = 1;
                    this._data.cpIndex = 2;
                }
            }
            else {
                p = core.Utils.PointOnCubicBezier1_2(this._data.cp[1], this._data.cp[2], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    this._data.t1 = 1;
                    this._data.cpIndex = 1;
                }
            }
        };
        /**喂食时吃东西时变形*/
        ChichenItem.prototype.compress_meal_eat = function () {
            if (this._data.cpIndex == 1) {
                this._data.t1 += 1;
                if (this._data.t1 >= this._data.max) {
                    this.changeChichenSkin(2);
                    this._data.cpIndex = 2;
                    this._data.t1 = 0;
                }
            }
            else {
                this._data.t1 += 1;
                if (this._data.t1 >= this._data.max) {
                    this.changeChichenSkin(1);
                    this._data.cpIndex = 1;
                    this._data.t1 = 0;
                    if (this._data.time <= 0) {
                        this.changeToMeal(null);
                    }
                }
            }
        };
        /**惊吓时变形*/
        ChichenItem.prototype.compress_shock = function () {
            if (this._data.cpIndex == 1) {
                this._data.t1 += 1;
                if (this._data.t1 >= this._data.max) {
                    this.changeChichenSkin(3);
                    this._data.cpIndex = 2;
                    this._data.t1 = 0;
                }
            }
            else {
                this._data.t1 += 1;
                if (this._data.t1 >= this._data.max) {
                    this.changeChichenSkin(1);
                    this._data.cpIndex = 1;
                    this._data.t1 = 0;
                    if (this._data.time <= 0) {
                        this.changeToStand();
                    }
                }
            }
        };
        /**动物自己改变状态 */
        ChichenItem.prototype.changeStateBySelf = function () {
            var arr = [module.ChichenInfo.STATE_STAND, module.ChichenInfo.STATE_EAT, module.ChichenInfo.STATE_WALK];
            var state = arr[Math.floor(Math.random() * arr.length)];
            if (state == module.ChichenInfo.STATE_STAND) {
                this.changeToStand();
            }
            else if (state == module.ChichenInfo.STATE_EAT) {
                this.changeToEat();
            }
            else if (state == module.ChichenInfo.STATE_WALK) {
                this.changeToWalk();
            }
            this.showState();
        };
        /**进入站立状态 */
        ChichenItem.prototype.changeToStand = function () {
            this._data.state = module.ChichenInfo.STATE_STAND;
            this._data.time = 2000 + Math.floor(Math.random() * 2000);
            this._data.t1 = Math.floor(Math.random() * 20);
            this._data.max = 20;
            this._data.cp = [];
            this._data.cp.push(new Point(1, 1));
            this._data.cp.push(new Point(1.1, 0.9));
            this._data.cp.push(new Point(1, 1));
            this._data.cpIndex = 1;
        };
        /**进入吃东西状态 */
        ChichenItem.prototype.changeToEat = function () {
            this._data.state = module.ChichenInfo.STATE_EAT;
            this._data.time = 2000 + Math.floor(Math.random() * 2000);
            this._data.t1 = 1;
            this._data.max = 20;
            this._data.cpIndex = 1;
        };
        /**进入走状态 */
        ChichenItem.prototype.changeToWalk = function () {
            this._data.state = module.ChichenInfo.STATE_WALK;
            this._data.t1 = 0;
            this._data.max = 8;
            this._data.cp = [];
            this._data.cp.push(new Point(1, 1));
            this._data.cp.push(new Point(1.2, 0.8));
            this._data.cp.push(new Point(1, 1));
            this._data.cpIndex = 1;
            this._data.moveCp = [];
            this._data.moveCp.push(new Point(this.x, this.y));
            this._data.moveCp.push(module.RaceManager.instance.getNextPos());
            this._data.movet1 = 1;
            this._data.moveMax = Math.floor(this._data.moveCp[0].distance(this._data.moveCp[1].x, this._data.moveCp[1].y) / 1);
            if (this._data.moveCp[0].x <= this._data.moveCp[1].x) {
                this.moveScale = -1;
            }
            else {
                this.moveScale = 1;
            }
        };
        /**进入跑状态 */
        ChichenItem.prototype.changeToRun = function () {
            this._data.state = module.ChichenInfo.STATE_RUN;
            this._data.time = 8000 + Math.floor(Math.random() * 5000);
            this._data.t1 = 1;
            this._data.max = 5;
            this._data.cpIndex = 1;
            this._data.moveCp = [];
            this._data.moveCp.push(new Point(this.x, this.y));
            this._data.moveCp.push(module.RaceManager.instance.getNextPos());
            this._data.movet1 = 1;
            this._data.moveMax = Math.floor(this._data.moveCp[0].distance(this._data.moveCp[1].x, this._data.moveCp[1].y) / 5);
            if (this._data.moveCp[0].x <= this._data.moveCp[1].x) {
                this.moveScale = -1;
            }
            else {
                this.moveScale = 1;
            }
            this.showState();
        };
        /**进入睡眠状态 */
        ChichenItem.prototype.changeToSleep = function () {
            this._data.state = module.ChichenInfo.STATE_SLEEP;
            this._data.time = 7000;
            this._data.t1 = 0;
            this._data.max = 20;
            this._data.cp = [];
            this._data.cp.push(new Point(1, 1));
            this._data.cp.push(new Point(1.1, 0.9));
            this._data.cp.push(new Point(1, 1));
            this._data.cpIndex = 1;
            this.showState();
        };
        /**进入惊吓状态 */
        ChichenItem.prototype.changeToShock = function () {
            this._data.state = module.ChichenInfo.STATE_HOCK;
            this._data.time = 400;
            this._data.t1 = 1;
            this._data.max = 5;
            this._data.cpIndex = 1;
            this.showState();
        };
        /**进入喂食状态 */
        ChichenItem.prototype.changeToMeal = function (nextPos) {
            this._data.state = module.ChichenInfo.STATE_MEAL;
            this._data.t1 = Math.floor(Math.random() * 10);
            this._data.max = 10;
            this._data.cp = [];
            this._data.cp.push(new Point(1, 1));
            this._data.cp.push(new Point(1.1, 0.9));
            this._data.cp.push(new Point(1, 1));
            this._data.cpIndex = 1;
            if (nextPos != null) {
                this._data.moveCp = [];
                this._data.moveCp.push(new Point(this.x, this.y));
                this._data.moveCp.push(nextPos);
                this._data.movet1 = 1;
                this._data.moveMax = Math.floor(this._data.moveCp[0].distance(this._data.moveCp[1].x, this._data.moveCp[1].y) / 5);
                if (this._data.moveCp[0].x <= this._data.moveCp[1].x) {
                    this.moveScale = -1;
                }
                else {
                    this.moveScale = 1;
                }
            }
            this.showState();
        };
        /**喂食进入吃东西状态 */
        ChichenItem.prototype.changeToMealEat = function () {
            if (this._data.state == module.ChichenInfo.STATE_MEAL && this._data.movet1 <= this._data.moveMax)
                return; //还未跑到位置上
            if (this._data.state == module.ChichenInfo.STATE_MEAL_EAT) {
                this._data.time = 2000; //延迟时间
            }
            else {
                this._data.state = module.ChichenInfo.STATE_MEAL_EAT;
                this._data.time = 2000;
                this._data.t1 = 1;
                this._data.max = 20;
                this._data.cpIndex = 1;
                this.showState();
            }
        };
        ChichenItem.prototype.showState = function () {
            switch (this._data.state) {
                case module.ChichenInfo.STATE_STAND:
                    this.changeChichenSkin(1);
                    this.hideSleepAni();
                    break;
                case module.ChichenInfo.STATE_EAT:
                    this.changeChichenSkin(1);
                    this.hideSleepAni();
                    break;
                case module.ChichenInfo.STATE_WALK:
                    this.changeChichenSkin(1);
                    this.hideSleepAni();
                    break;
                case module.ChichenInfo.STATE_RUN:
                    this.changeChichenSkin(5);
                    this.hideSleepAni();
                    break;
                case module.ChichenInfo.STATE_SLEEP:
                    this.changeChichenSkin(7);
                    this.showSleepAni();
                    break;
                case module.ChichenInfo.STATE_MEAL:
                    this.changeChichenSkin(1);
                    this.hideSleepAni();
                    break;
                case module.ChichenInfo.STATE_HOCK:
                    // this.changeChichenSkin(4);
                    this.changeChichenSkin(1);
                    this.hideSleepAni();
                    break;
                case module.ChichenInfo.STATE_MEAL_EAT:
                    this.changeChichenSkin(1);
                    this.hideSleepAni();
                    break;
            }
        };
        ChichenItem.prototype.changeChichenSkin = function (index) {
            this._imgIndex = index;
            this.img.skin = this._data.config.getURl(index);
            this.img.x = this._data.config.getWidth(index) / 2 * -1;
            this.img.y = this._data.config.getHeight(index) * -1;
            this.updateHat(index);
        };
        ChichenItem.prototype.updateHat = function (index) {
            if (this._data.hatId == 0) {
                if (this.hatImg != null) {
                    this.hatImg.destroy();
                    this.hatImg = null;
                }
            }
            else {
                if (this.hatImg == null) {
                    this.hatImg = new laya.ui.Image(module.RaceManager.instance.getHatImg(this._data.hatId));
                }
                else {
                    this.hatImg.skin = module.RaceManager.instance.getHatImg(this._data.hatId);
                }
                this.hatImg.pivot(this.hatImg.width / 2, this.hatImg.height / 2);
                this.img.addChild(this.hatImg);
                this.hatImg.pos(module.RaceManager.instance.getHatx(this._data.configId, this._data.hatId, index), module.RaceManager.instance.getHaty(this._data.configId, this._data.hatId, index));
            }
        };
        ChichenItem.prototype.changeHat = function () {
            if (this._imgIndex != 0) {
                this.updateHat(this._imgIndex);
            }
        };
        ChichenItem.prototype.showSleepAni = function () {
            if (this.sleepAni == null) {
                this.sleepAni = new laya.display.Animation();
                this.sleepAni.loadAnimation(manager.ResVersionMgr.instance.getMd5Url("ani/SleepAni.ani"));
                this.sleepAni.pos(0, -30);
                this.addChild(this.sleepAni);
            }
            this.sleepAni.visible = true;
            this.sleepAni.play(0, true);
        };
        ChichenItem.prototype.hideSleepAni = function () {
            if (this.sleepAni != null) {
                this.sleepAni.stop();
                this.sleepAni.visible = false;
            }
        };
        ChichenItem.prototype.setPos = function (xx, yy) {
            this.data.xx = xx;
            this.data.yy = yy;
            this.pos(xx, yy);
        };
        return ChichenItem;
    }(laya.ui.Component));
    module.ChichenItem = ChichenItem;
})(module || (module = {}));
//# sourceMappingURL=ChichenItem.js.map