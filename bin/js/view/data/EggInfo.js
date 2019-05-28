/**
* name
*/
var module;
(function (module) {
    var EggInfo = /** @class */ (function () {
        function EggInfo() {
            /**单ID */
            this.eggId = 0;
            /**所属场地ID */
            this.plantId = 0;
            /**所在格子序号 */
            this.slotIndex = 0;
            /**时间完成时间戳 */
            this.time = 0;
            /**总时长 */
            this.tLength = 0;
            this.eggId = module.RaceManager.instance.userInfo.IDS++;
        }
        EggInfo.prototype.setTime = function (value) {
            this.tLength = value;
            this.time = new Date().getTime() + this.tLength;
        };
        EggInfo.prototype.toString = function () {
            return this.eggId + "-" + this.plantId + "-" + this.slotIndex + "-" + this.time + "-" + this.tLength;
        };
        EggInfo.prototype.decode = function (value) {
            var ss = value.split("-");
            this.eggId = Number(ss[0]);
            this.plantId = Number(ss[1]);
            this.slotIndex = Number(ss[2]);
            this.time = Number(ss[3]);
            this.tLength = Number(ss[4]);
        };
        EggInfo.IDS = 10;
        return EggInfo;
    }());
    module.EggInfo = EggInfo;
})(module || (module = {}));
//# sourceMappingURL=EggInfo.js.map