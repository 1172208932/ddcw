/**
* name
*/
var core;
(function (core) {
    var Dictionary = laya.utils.Dictionary;
    var XmlFileUtils = (function () {
        function XmlFileUtils() {
        }
        /**登录配置 */
        XmlFileUtils.prototype.onLoadedConfigXML = function (xml) {
        };
        /**模块配置 */
        XmlFileUtils.prototype.onLoadedModuleXML = function (xml) {
            var nodes = xml.getElementsByTagName("module");
            var dic = new Dictionary();
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var data = new core.ModuleConfigData();
                data.name = node.getAttribute("name");
                data.source = node.getAttribute("source");
                dic.set(data.name, data);
            }
            manager.configManager.instance.moduleConfigDic = dic;
        };
        /**资源配置 */
        XmlFileUtils.prototype.onLoadResourceXML = function (xml) {
            if (xml == undefined)
                return;
            var ress = xml.getElementsByTagName("res");
            var dic = new Dictionary();
            for (var i = 0; i < ress.length; i++) {
                var speek = ress[i];
                var data = new core.ResourceConfigData();
                data.oldUrl = speek.getAttribute("oldUrl");
                data.md5Url = speek.getAttribute("newUrl");
                dic.set(data.oldUrl, data);
            }
            manager.configManager.instance.resourceConfigDic = dic;
        };
        Object.defineProperty(XmlFileUtils, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new XmlFileUtils();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return XmlFileUtils;
    }());
    XmlFileUtils._instance = null;
    core.XmlFileUtils = XmlFileUtils;
})(core || (core = {}));
//# sourceMappingURL=XmlFileUtils.js.map