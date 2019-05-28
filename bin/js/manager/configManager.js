/**
* name
*/
var manager;
(function (manager) {
    var Dictionary = laya.utils.Dictionary;
    /**配置文件管理器 */
    var configManager = /** @class */ (function () {
        function configManager() {
            ////////////////////////////////////////////下面三个不能有任何变动（在打包工具中会修改这里）///////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            this.hallIp = "testddcw.chinaxwz.cn"; //
            this.CDN_BOOT = "https://tcdn.wanzhushipin.cn/xcx/chichens/DDCW/";
            /**模块的资源表 */
            this.moduleConfigDic = null;
            /**资源配置表 */
            this.resourceConfigDic = new Dictionary();
        }
        configManager.prototype.setup = function () {
            this.moduleConfigDic = new Dictionary();
            this.moduleConfigDic.set("CompanyIcon", { name: "CompanyIcon", source: "smallload.json" });
            this.moduleConfigDic.set("LoginView", { name: "LoginView", source: "login.json" });
            this.moduleConfigDic.set("GameView", { name: "GameView", source: "ui.json,tupian.json,font.json,caidai.json,run.json,view.json" });
            this.starProgress();
        };
        /* 进度条 */
        configManager.prototype.starProgress = function () {
            if (Main.app.pView == null) {
                Main.app.pView = new module.ProgressView();
                Main.app.pView.zOrder = 2000;
                Laya.stage.addChild(Main.app.pView);
            }
            Main.app.pView.startProgress();
        };
        /**获取模块的资源数组 */
        configManager.prototype.getModuleConfigSource = function (name) {
            return this.getSource(this.moduleConfigDic.get(name).source);
        };
        configManager.prototype.getSource = function (source) {
            var arr = source.split(",");
            var fileUrls = new Array();
            for (var i = 0; i < arr.length; i++) {
                fileUrls.push({ url: manager.ResVersionMgr.instance.getMd5Url("res/atlas/" + arr[i] + ""), type: laya.net.Loader.ATLAS });
            }
            return fileUrls;
        };
        Object.defineProperty(configManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new configManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        configManager._instance = null;
        return configManager;
    }());
    manager.configManager = configManager;
})(manager || (manager = {}));
//# sourceMappingURL=configManager.js.map