/**
* name
*/
var module;
(function (module) {
    var Point = laya.maths.Point;
    var FlyMoneyAction = /** @class */ (function () {
        function FlyMoneyAction() {
            this.expPos = null;
            this.coinPos = null;
            this.wingPos = null;
            this.isStarted = false;
            this.itemList = [];
        }
        FlyMoneyAction.prototype.getEndPos = function (type) {
            if (type == 1) {
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
        FlyMoneyAction.prototype.flyFood = function (beginPos, type, score) {
            var endPos = this.getEndPos(type);
            var list = this.getScores(score);
            for (var i = 0; i < list.length; i++) {
                this.addFlyItem(beginPos, endPos, list[i], i, type);
            }
        };
        FlyMoneyAction.prototype.getScores = function (score) {
            var list = [];
            var one = Math.floor(score / 20);
            var b = score % 20;
            for (var i = 0; i < 20 && i < score; i++) {
                if (i < b) {
                    list.push(one + 1);
                }
                else {
                    list.push(one);
                }
            }
            return list;
        };
        FlyMoneyAction.prototype.addFlyItem = function (beginPos, endPos, score, delay, type) {
            var sc = 0.4 + Math.random() * 0.3;
            var length = ((Math.random() * 2 >= 1) ? 100 : -100) * (Math.random() * 2);
            var item = new module.FoodFlyItem(score, type);
            item.cp.push(beginPos);
            var p = core.Utils.getBezier2TP(beginPos, endPos, length, sc);
            item.cp.push(p);
            item.cp.push(endPos);
            item.maxt = Math.floor(beginPos.distance(endPos.x, endPos.y) / 20);
            item.wT = item.maxt * 10;
            item.x = beginPos.x;
            item.y = beginPos.y;
            item.delay = delay;
            Laya.stage.addChild(item);
            this.itemList.push(item);
            this.startFly();
        };
        FlyMoneyAction.prototype.startFly = function () {
            if (this.isStarted == false) {
                this.isStarted = true;
                Laya.timer.loop(20, this, this.enterFrame);
            }
        };
        FlyMoneyAction.prototype.enterFrame = function () {
            var isAllEnd = true;
            for (var i = 0; i < this.itemList.length; i++) {
                if (this.itemList[i].isEnd == false) {
                    this.itemList[i].delay -= 1;
                    isAllEnd = false;
                    if (this.itemList[i].delay <= 0) {
                        this.itemList[i].moveTo();
                        if (this.itemList[i].isEnd) { //一个水滴飞完成
                            if (this.itemList[i].type == 1) {
                            }
                            else if (this.itemList[i].type == 2) {
                                module.RaceManager.instance.addCoin(this.itemList[i].score);
                            }
                            else if (this.itemList[i].type == 3) {
                                module.RaceManager.instance.addWing(this.itemList[i].score);
                                manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Get_feather1");
                            }
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
        return FlyMoneyAction;
    }());
    module.FlyMoneyAction = FlyMoneyAction;
})(module || (module = {}));
//# sourceMappingURL=FlyMoneyAction.js.map