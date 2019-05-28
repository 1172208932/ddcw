/**
* name
*/
var core;
(function (core) {
    var ModuleConfigData = /** @class */ (function () {
        function ModuleConfigData() {
            this.name = "";
            this.source = "";
        }
        ModuleConfigData.prototype.getSource = function () {
            var arr = this.source.split(",");
            var fileUrls = new Array();
            for (var i = 0; i < arr.length; i++) {
                fileUrls.push({ url: manager.ResVersionMgr.instance.getMd5Url("res/atlas/" + arr[i] + ""), type: laya.net.Loader.ATLAS });
            }
            return fileUrls;
        };
        return ModuleConfigData;
    }());
    core.ModuleConfigData = ModuleConfigData;
})(core || (core = {}));
//# sourceMappingURL=ModuleConfigData.js.map