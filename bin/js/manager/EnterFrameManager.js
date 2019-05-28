/**
* name
*/
var manager;
(function (manager) {
    var Dictionary = laya.utils.Dictionary;
    var EnterFrameManager = /** @class */ (function () {
        function EnterFrameManager() {
            this.itemDic = new Dictionary();
        }
        EnterFrameManager.prototype.setup = function () {
            Laya.timer.loop(20, this, this.enterFrame);
        };
        /**帧更新 */
        EnterFrameManager.prototype.enterFrame = function () {
            for (var i = 0; i < this.itemDic.values.length; i++) {
                var item = this.itemDic.values[i];
                if (item != null) {
                    item.onEnterFrame();
                }
            }
        };
        EnterFrameManager.prototype.addItem = function (item) {
            this.itemDic.set(item.faceId, item);
        };
        EnterFrameManager.prototype.removeItem = function (faceId) {
            if (this.itemDic.get(faceId) != null) {
                this.itemDic.remove(faceId);
            }
        };
        Object.defineProperty(EnterFrameManager.prototype, "id", {
            get: function () {
                return EnterFrameManager.IDS++;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnterFrameManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new EnterFrameManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        EnterFrameManager._instance = null;
        EnterFrameManager.IDS = 1;
        return EnterFrameManager;
    }());
    manager.EnterFrameManager = EnterFrameManager;
})(manager || (manager = {}));
//# sourceMappingURL=EnterFrameManager.js.map