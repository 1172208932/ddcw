/**
* name
*/
var module;
(function (module) {
    var CoinInfo = /** @class */ (function () {
        function CoinInfo() {
            this.coinId = 0;
            this.plantId = 0;
            this.score = 1;
            this.x = 0;
            this.y = 0;
            this.coinId = module.RaceManager.instance.userInfo.IDS++;
        }
        CoinInfo.prototype.toString = function () {
            return this.coinId + "-" + this.plantId + "-" + this.score + "-" + this.x + "-" + this.y;
        };
        CoinInfo.prototype.decode = function (value) {
            var ss = value.split("-");
            this.coinId = Number(ss[0]);
            this.plantId = Number(ss[1]);
            this.score = Number(ss[2]);
            this.x = Number(ss[3]);
            this.y = Number(ss[4]);
        };
        CoinInfo.IDS = 10;
        return CoinInfo;
    }());
    module.CoinInfo = CoinInfo;
})(module || (module = {}));
//# sourceMappingURL=CoinInfo.js.map