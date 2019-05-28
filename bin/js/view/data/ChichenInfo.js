/**
* name
*/
var module;
(function (module) {
    var ChichenInfo = /** @class */ (function () {
        ///////////////////////////////////////////////////////////////////
        function ChichenInfo(value, plantId) {
            this.id = 0;
            /**配置ID */
            this.configId = 0;
            /**所在场地ID */
            this.plantId = 0;
            /**名字 */
            this.name = "";
            /**体重 */
            this.weight = 0;
            /**等级 */
            this._level = 1;
            /**星级 */
            this.star = 0;
            /**喂食的经验 */
            this.mealExp = 0;
            /**帽子ID */
            this.hatId = 0;
            /** */
            this.xx = 0;
            this.yy = 0;
            //////////////////////////////不用存///////////////////////////////
            this._config = null;
            /**状态 */
            this.state = 1;
            this.time = 2000;
            this.t1 = 0;
            this.max = 0;
            this.cp = new Array();
            this.cpIndex = 1;
            this.moveCp = new Array();
            this.movet1 = 1;
            this.moveMax = 0;
            /**被点中多少次后，进入睡眠 */
            this.goSleepCount = 40;
            /**自动加金币和经验的时间 */
            this.addCoinExpTime = 0;
            this.attenuationTime = 0; // 自动加金币衰减时间
            this.id = module.RaceManager.instance.userInfo.IDS++;
            this.plantId = plantId;
            this.weight = this.getWeight(1);
            this.name = module.RaceManager.instance.chichenNames[Math.floor(Math.random() * module.RaceManager.instance.chichenNames.length)];
            this._config = value;
            this.configId = this._config != null ? this._config.configId : 0;
            this.checkCoinExpTime();
        }
        ChichenInfo.prototype.checkCoinExpTime = function () {
            // 初始化宠物自动加经验和金币衰减时间
            // 如果是新的一天，重置时间。不是新的一天，取本地保存的值。
            if (Main.app.is_wx) {
                var saveTime = wx.getStorageSync(Main.DianDianChongWu_NowDay2);
                if (saveTime == Main.app.mwx.nowday) {
                    var coinexpTime = wx.getStorageSync(Main.DianDianChongWu_ADD_COINEXP_TIME);
                    if (!!coinexpTime) {
                        this.addCoinExpTime = coinexpTime + Math.round((Math.random() * module.RaceManager.instance.addCoinExpMaxTime + 1) * 1000);
                    }
                    else {
                        this.addCoinExpTime = Math.round((Math.random() * module.RaceManager.instance.addCoinExpMaxTime + 1) * 1000);
                    }
                    var attTime = wx.getStorageSync(Main.DianDianChongWu_DDCW_ATTENUATION_TIME);
                    if (!!attTime)
                        this.attenuationTime = attTime;
                }
                else {
                    this.addCoinExpTime = Math.round((Math.random() * module.RaceManager.instance.addCoinExpMaxTime + 1) * 1000);
                    this.attenuationTime = 0;
                }
                wx.setStorageSync(Main.DianDianChongWu_NowDay2, Main.app.mwx.nowday);
            }
            else {
                this.addCoinExpTime = Math.round((Math.random() * module.RaceManager.instance.addCoinExpMaxTime + 1) * 1000);
                this.attenuationTime = 0;
            }
        };
        Object.defineProperty(ChichenInfo.prototype, "config", {
            get: function () {
                return this._config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChichenInfo.prototype, "level", {
            get: function () {
                return this._level;
            },
            set: function (value) {
                if (this._level != value) {
                    this.weight = this.getWeight(value);
                }
                this._level = value;
            },
            enumerable: true,
            configurable: true
        });
        ChichenInfo.prototype.getWeithStr = function () {
            var a = Math.floor(this.weight);
            var b = Math.floor(this.weight * 100 % 100);
            return a + "d" + b + "k";
        };
        ChichenInfo.prototype.getWeight = function (value) {
            switch (value) {
                case 1:
                    return 0.5 + (Math.floor((Math.random() * (0.85 - 0.5)) * 100) / 100);
                case 2:
                    return 1.5 + (Math.floor((Math.random() * (1.85 - 1.5)) * 100) / 100);
                case 3:
                    return 2.5 + (Math.floor((Math.random() * (2.85 - 2.5)) * 100) / 100);
                case 4:
                    return 3.5 + (Math.floor((Math.random() * (3.85 - 3.5)) * 100) / 100);
                case 5:
                    return 4.5 + (Math.floor((Math.random() * (4.85 - 4.5)) * 100) / 100);
                case 6:
                    return 5.5 + (Math.floor((Math.random() * (5.85 - 5.5)) * 100) / 100);
                case 7:
                    return 6.5 + (Math.floor((Math.random() * (6.85 - 6.5)) * 100) / 100);
                case 8:
                    return 7.5 + (Math.floor((Math.random() * (7.85 - 7.5)) * 100) / 100);
                case 9:
                    return 8.5 + (Math.floor((Math.random() * (8.85 - 8.5)) * 100) / 100);
                case 10:
                    return 9.5 + (Math.floor((Math.random() * (9.85 - 9.5)) * 100) / 100);
            }
        };
        Object.defineProperty(ChichenInfo.prototype, "scale", {
            get: function () {
                return this.config.getScale(this._level);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChichenInfo.prototype, "money", {
            get: function () {
                return (this.star + 1) * (this._level * 10);
            },
            enumerable: true,
            configurable: true
        });
        ChichenInfo.prototype.getExp = function () {
            return this.star + 1;
        };
        /* 自动产金币和经验的CD没帧减掉30ms，加速期间如果CD大于3s的，重置为3s。 */
        ChichenInfo.prototype.changeAddCoinExpTime = function (value) {
            if (module.RaceManager.instance.userInfo.jiashuDownTime > 0) {
                if (this.addCoinExpTime > 5 * 1000) {
                    var num = Math.round(Math.random() * 2000);
                    this.addCoinExpTime = 3 * 1000 + num;
                }
            }
            this.addCoinExpTime -= value;
        };
        /* 重置自动产金币和经验的时间，加速期间为3sCD。 */
        ChichenInfo.prototype.resetAddCoinExpTime = function () {
            if (module.RaceManager.instance.userInfo.jiashuDownTime > 0) {
                this.addCoinExpTime = 3 * 1000;
            }
            else {
                this.addCoinExpTime = (module.RaceManager.instance.addCoinExpMaxTime + this.attenuationTime) * 1000;
            }
            if (Main.app.is_wx) {
                wx.setStorageSync(Main.DianDianChongWu_ADD_COINEXP_TIME, this.addCoinExpTime);
            }
        };
        ChichenInfo.prototype.resetAttenuationTime = function () {
            this.attenuationTime += 1;
            if (Main.app.is_wx) {
                wx.setStorageSync(Main.DianDianChongWu_DDCW_ATTENUATION_TIME, this.attenuationTime);
            }
        };
        ChichenInfo.prototype.toString = function () {
            return this.id + "-" + this.configId + "-" + this.plantId + "-" + this.name + "-" + this.weight + "-" + this._level + "-" + this.star + "-" + this.mealExp + "-" + this.xx + "-" + this.yy + "-" + this.hatId;
        };
        ChichenInfo.prototype.decode = function (value) {
            var ss = value.split("-");
            this.id = Number(ss[0]);
            this.configId = Number(ss[1]);
            this.plantId = Number(ss[2]);
            this.name = ss[3];
            this.weight = Number(ss[4]);
            this._level = Number(ss[5]);
            this.star = Number(ss[6]);
            this.mealExp = Number(ss[7]);
            this.xx = Number(ss[8]);
            this.yy = Number(ss[9]);
            this.hatId = ss.length >= 11 ? Number(ss[10]) : 0; //Math.floor(Math.random() * 11 + 1);//
            if (this.star == 3) {
                this.level = 10;
            }
            this._config = module.RaceManager.instance.chichenConfigDic.get(this.configId);
        };
        ChichenInfo.IDS = 1;
        /**站立中*/
        ChichenInfo.STATE_STAND = 1;
        /**吃东西 */
        ChichenInfo.STATE_EAT = 2;
        /**漫步 */
        ChichenInfo.STATE_WALK = 3;
        /**狂躁中 */
        ChichenInfo.STATE_RUN = 4;
        /**睡眠中 */
        ChichenInfo.STATE_SLEEP = 5;
        /**喂食 */
        ChichenInfo.STATE_MEAL = 6;
        /**惊吓 */
        ChichenInfo.STATE_HOCK = 7;
        /**喂食时吃东西 */
        ChichenInfo.STATE_MEAL_EAT = 8;
        return ChichenInfo;
    }());
    module.ChichenInfo = ChichenInfo;
})(module || (module = {}));
//# sourceMappingURL=ChichenInfo.js.map