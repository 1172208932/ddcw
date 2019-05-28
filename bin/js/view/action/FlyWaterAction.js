/**
 * 飞水滴到花朵上
* name
*/
var module;
(function (module) {
    var Point = laya.maths.Point;
    var FlyWaterAction = /** @class */ (function () {
        function FlyWaterAction(view) {
            this.contentView = null;
            this.isStarted = false;
            this.itemList = new Array();
            this.expPos = null;
            this.coinPos = null;
            this.wingPos = null;
            this.hideDic = new laya.utils.Dictionary();
            this.contentView = view;
        }
        FlyWaterAction.prototype.initEvents = function () {
        };
        FlyWaterAction.prototype.removeEvents = function () {
        };
        FlyWaterAction.prototype.getEndPos = function (type) {
            if (type == 1 || type == 11) {
                return this.expPos;
            }
            else if (type == 2) {
                return this.coinPos;
            }
            else if (type == 3) {
                return this.wingPos;
            }
            else {
                return new Point(10, 10);
            }
        };
        FlyWaterAction.prototype.getkey = function (type, data) {
            if (type == 1 || type == 11) {
                return "1-" + data[1];
            }
            else if (type == 2) {
                return type + "-c";
            }
        };
        FlyWaterAction.prototype.addToHide = function (item) {
            var key = item.key;
            var list = this.hideDic.get(key);
            if (list == null) {
                list = new Array();
                this.hideDic.set(key, list);
            }
            list.push(item);
        };
        FlyWaterAction.prototype.findItem = function (type, score, data) {
            var item = null;
            var key = this.getkey(type, data);
            var list = this.hideDic.get(key);
            if (list != null && list.length > 0) {
                item = list.shift();
                item.reset(type, score, data);
            }
            else {
                item = new module.WaterFlyItem(type, score, data);
            }
            return item;
        };
        /**飞 一个 水滴到 花朵上 */
        FlyWaterAction.prototype.flyWater = function (beginPos, type, score, data) {
            // 限制同时存在的动画数量
            if (this.itemList.length >= 10) {
                return;
            }
            var endPos = this.getEndPos(type);
            var sy = -100;
            var sc = 0.5 + Math.random() * 0.3;
            var length = ((Math.random() * 2 >= 1) ? 200 : -200) * (Math.random() * 2);
            var item = this.findItem(type, score, data);
            item.cp.push(beginPos);
            var p = core.Utils.getBezier2TP(beginPos, endPos, length, sc);
            item.cp.push(p);
            item.cp.push(endPos);
            item.maxt = Math.floor(beginPos.distance(endPos.x, endPos.y) / 20);
            item.wT = item.maxt * 10;
            item.x = beginPos.x;
            item.y = beginPos.y;
            this.contentView.addChild(item);
            this.itemList.push(item);
            this.startFly();
        };
        FlyWaterAction.prototype.startFly = function () {
            if (this.isStarted == false) {
                this.isStarted = true;
                Laya.timer.loop(20, this, this.enterFrame);
            }
        };
        FlyWaterAction.prototype.enterFrame = function () {
            var isAllEnd = true;
            var endIds = [];
            for (var i = 0; i < this.itemList.length; i++) {
                if (this.itemList[i].isEnd == false) {
                    isAllEnd = false;
                    this.itemList[i].moveTo();
                    if (this.itemList[i].isEnd) { //一个水滴飞完成
                        if (this.itemList[i].type == 1) {
                            module.RaceManager.instance.addExp(this.itemList[i].score, this.itemList[i].data);
                            manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Fill_bar2");
                        }
                        else if (this.itemList[i].type == 2) {
                            module.RaceManager.instance.addCoin(this.itemList[i].score);
                            manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Get_coin3");
                        }
                        else if (this.itemList[i].type == 11) {
                            module.RaceManager.instance.addExpByTime(this.itemList[i].score, this.itemList[i].data);
                            manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Fill_bar2");
                        }
                    }
                }
                else {
                    endIds.push(this.itemList[i].id);
                }
            }
            for (var i = 0; i < endIds.length; i++) {
                for (var j = 0; j < this.itemList.length; j++) {
                    if (this.itemList[j].id == endIds[i]) {
                        this.itemList[j].removeSelf();
                        this.addToHide(this.itemList[j]);
                        this.itemList.splice(j, 1);
                    }
                }
            }
            if (isAllEnd) {
                this.itemList.splice(0, this.itemList.length);
            }
        };
        FlyWaterAction.prototype.destroy = function () {
            this.removeEvents();
        };
        return FlyWaterAction;
    }());
    module.FlyWaterAction = FlyWaterAction;
})(module || (module = {}));
//# sourceMappingURL=FlyWaterAction.js.map