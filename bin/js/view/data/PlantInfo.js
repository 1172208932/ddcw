/**
* name
*/
var module;
(function (module) {
    var Rectangle = laya.maths.Rectangle;
    var PlantInfo = /** @class */ (function () {
        function PlantInfo(id) {
            /**场地ID */
            this.plantId = 1;
            /**当前经验值 */
            this.exp = 0;
            /**最大容量 */
            this.maxCount = 10;
            /**经验重置次数 */
            this.expResetCount = 0;
            /**已拥有过的ID */
            this.haveChichenIds = [];
            /**在场地中的所有动物 */
            this.chichenInfoList = new Array();
            /**场地中的金币 */
            this.coinInfoList = new Array();
            /**是否正在显示秘密花园 */
            this.showCarden = 0;
            //////////////////////////////////////////不用存/////////////////////////////
            /**动物的活动范围 */
            this.rect = new Rectangle(10, 400, 750, 515);
            /**最大经验值，达到这个值后，可以出一个蛋 */
            this._maxExp = 100;
            /**开启需要的羽毛 */
            this.money = 0;
            /**可以所用的动物ID */
            this.chichenIdList = [];
            ///////////////////////////////////////////////////////////////////////////////
            /* 场地前三次开蛋需要的经验为 10 * this.chichenInfoList.length */
            /* 之后开蛋需要的经验为 30 * this.chichenInfoList.length */
            /* 此属性记录场地开蛋开了多少次 */
            this.expGrowCount = 0;
            this.isNewEgg = false;
            this.plantId = id;
        }
        /* 加经验 */
        PlantInfo.prototype.addExp = function (value) {
            var slotIndex = module.RaceManager.instance.userInfo.findNullSlot();
            if (slotIndex == 0) {
                this.exp += value / 3;
            }
            else {
                this.exp += value;
            }
        };
        /* 重置经验 */
        PlantInfo.prototype.resetExp = function () {
            this.exp = 0;
            this.isNewEgg = false;
            this.expResetCount += 1;
        };
        /**在场地中添加一个金币 */
        PlantInfo.prototype.addCoin = function (pos) {
            var info = new module.CoinInfo();
            info.x = pos.x;
            info.y = pos.y;
            info.plantId = this.plantId;
            this.coinInfoList.push(info);
            return info;
        };
        /**移除一个金币 */
        PlantInfo.prototype.removeCoin = function (coinInfo) {
            for (var i = 0; i < this.coinInfoList.length; i++) {
                if (this.coinInfoList[i].coinId == coinInfo.coinId) {
                    this.coinInfoList.splice(i, 1);
                    break;
                }
            }
        };
        /**是否可以产蛋 */
        PlantInfo.prototype.isAddEgg = function () {
            this.isNewEgg = this.exp >= this.maxExp;
            if (this.isNewEgg)
                this.addEggCount();
            return this.isNewEgg;
        };
        Object.defineProperty(PlantInfo.prototype, "maxExp", {
            // 最大经验值通过场地中的动物数量而定
            get: function () {
                if (this.expGrowCount < 3) {
                    return 10 * this.chichenInfoList.length;
                }
                return 30 * this.chichenInfoList.length;
            },
            enumerable: true,
            configurable: true
        });
        /**从蛋里面开一个鸡出来 */
        PlantInfo.prototype.createChichenByEgg = function (configID) {
            var chichenInfo = this.createChichen(configID);
            return chichenInfo;
        };
        /* 加开蛋次数 */
        PlantInfo.prototype.addEggCount = function () {
            if (this.expGrowCount > 2) {
                return;
            }
            this.expGrowCount++;
        };
        /**添加一个动物到场地中 */
        PlantInfo.prototype.addChichen = function (info) {
            this.chichenInfoList.push(info);
            info.xx = this.getX();
            info.yy = this.getY();
        };
        /**移除一个动物 */
        PlantInfo.prototype.removeChichen = function (info) {
            for (var i = 0; i < this.chichenInfoList.length; i++) {
                if (this.chichenInfoList[i].id == info.id) {
                    this.chichenInfoList.splice(i, 1);
                }
            }
        };
        /**获取在场地中的鸡的数量 */
        PlantInfo.prototype.getChichenCount = function () {
            return this.chichenInfoList.length;
        };
        PlantInfo.prototype.getChiChenInfoByConfigId = function (configId) {
            for (var j = 0; j < this.chichenInfoList.length; j++) {
                if (this.chichenInfoList[j].configId == configId) {
                    return this.chichenInfoList[j];
                }
            }
            return null;
        };
        /**是否拥有过这个鸡 */
        PlantInfo.prototype.isHaveChichenIds = function (configId) {
            return this.haveChichenIds.indexOf(configId) >= 0;
        };
        /**获取动物可以出现的位置 */
        PlantInfo.prototype.getX = function () {
            return this.rect.x + Math.floor(Math.random() * (this.rect.width));
        };
        /**获取动物可以出现的位置 */
        PlantInfo.prototype.getY = function () {
            return this.rect.y + Math.floor(Math.random() * this.rect.height);
        };
        /**创建一个动物到当前场地中 */
        PlantInfo.prototype.createChichen = function (configId) {
            return new module.ChichenInfo(module.RaceManager.instance.chichenConfigDic.get(configId), this.plantId);
        };
        Object.defineProperty(PlantInfo.prototype, "chichenIds", {
            set: function (value) {
                var ss = value.split(",");
                for (var i = 0; i < ss.length; i++) {
                    this.chichenIdList.push(Number(ss[i]));
                }
            },
            enumerable: true,
            configurable: true
        });
        PlantInfo.prototype.toString = function () {
            var list = [];
            list.push(this.plantId + "");
            list.push(this.exp + "-" + this.expResetCount);
            list.push(this.getHaveChichenidString());
            list.push(this.getCoinInfoString());
            list.push(this.getChichenInfoString());
            list.push(this.expGrowCount + ""); // 此场地产蛋次数 大于3此之后需要的经验就多了
            return list.join(",");
        };
        PlantInfo.prototype.getHaveChichenidString = function () {
            return this.haveChichenIds.length == 0 ? "null" : this.haveChichenIds.join("-");
        };
        /**格式化金币 */
        PlantInfo.prototype.getCoinInfoString = function () {
            var list = [];
            for (var i = 0; i < this.coinInfoList.length; i++) {
                list.push(this.coinInfoList[i].toString());
            }
            return list.length == 0 ? "null" : list.join("|");
        };
        /**格式化鸡 */
        PlantInfo.prototype.getChichenInfoString = function () {
            var list = [];
            for (var i = 0; i < this.chichenInfoList.length; i++) {
                list.push(this.chichenInfoList[i].toString());
            }
            return list.length == 0 ? "null" : list.join("|");
        };
        PlantInfo.prototype.decode_info = function (value) {
            var ss = value.split("-");
            this.exp = Number(ss[0]);
            this.expResetCount = ss.length >= 2 ? Number(ss[1]) : 0;
        };
        PlantInfo.prototype.decode_ExpGrowCount = function (value) {
            this.expGrowCount = value;
        };
        PlantInfo.prototype.decode_haveID = function (value) {
            if (!!value) {
                var ss = value.split("-");
                for (var i = 0; i < ss.length; i++) {
                    this.haveChichenIds.push(Number(ss[i]));
                    if (Number(ss[i]) > 0) {
                        Main.app.unlockPetCount++;
                    }
                }
            }
        };
        PlantInfo.prototype.decode_coin = function (value) {
            if (value == "null") {
            }
            else {
                var ss = value.split("|");
                for (var i = 0; i < ss.length; i++) {
                    var info = new module.CoinInfo();
                    info.decode(ss[i]);
                    this.coinInfoList.push(info);
                }
            }
        };
        PlantInfo.prototype.decode_chichen = function (value) {
            if (value == "null") {
            }
            else {
                var ss = value.split("|");
                for (var i = 0; i < ss.length; i++) {
                    var info = new module.ChichenInfo(null, 0);
                    info.decode(ss[i]);
                    this.chichenInfoList.push(info);
                    console.log(info.id + ":" + info.name);
                }
            }
        };
        return PlantInfo;
    }());
    module.PlantInfo = PlantInfo;
})(module || (module = {}));
//# sourceMappingURL=PlantInfo.js.map