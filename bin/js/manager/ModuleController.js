/**
* name
*/
var manager;
(function (manager) {
    /**模块，弹窗 的显示隐藏控制器 */
    var ModuleController = /** @class */ (function () {
        function ModuleController() {
            this.moduleClassDic = new laya.utils.Dictionary();
            this._curModuleView = null;
            this.smallLoadingView = null;
            this.nextModuleName = "";
            this.moduleClassDic.set(ModuleController.MN_CompanyIcon, module.CompanyIcon);
            this.moduleClassDic.set(ModuleController.MN_GameView, module.GameView);
        }
        /**
         * 显示弹框
         * @param name 弹框名字
         * @param center 弹框是否居中
         * @param blockBackgound 弹框是否需要黑色遮罩
         * @param isBackClose 点黑色遮罩弹框是否关闭
         * @param args 打开弹框传的参数
         * @param blockAp 弹框遮罩透明度
        */
        ModuleController.prototype.showDialog = function (name, center, blockBackgound, isBackClose, args, blockAp) {
            if (center === void 0) { center = false; }
            if (blockBackgound === void 0) { blockBackgound = false; }
            if (isBackClose === void 0) { isBackClose = true; }
            if (args === void 0) { args = null; }
            if (blockAp === void 0) { blockAp = 0.5; }
            var dialogClass = this.moduleClassDic.get(name);
            if (dialogClass != null) {
                var dialog = new dialogClass();
                if (args != null)
                    dialog.setData(args);
                manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, center, blockBackgound, isBackClose, blockAp);
            }
        };
        //切换场景api
        ModuleController.prototype.changeModule = function (name, isBackgound, isShowLoading) {
            if (isBackgound === void 0) { isBackgound = true; }
            if (isShowLoading === void 0) { isShowLoading = true; }
            this.nextModuleName = name;
            if (isBackgound) {
                if (this.smallLoadingView == null) {
                    this.smallLoadingView = new module.SmallLoadingView(isShowLoading);
                }
                manager.LayerManager.instace.addToLayer(this.smallLoadingView, manager.LayerManager.STAGE_TOP_LAYER);
            }
            // 获取下个场景的资源
            var sources = manager.configManager.instance.getModuleConfigSource(name);
            // 获取完成之后就加载那个界面
            Laya.loader.load(sources, Laya.Handler.create(this, this.onLoadedModule));
        };
        ModuleController.prototype.onLoadedModule = function () {
            if (this.smallLoadingView != null) {
                this.smallLoadingView.showBg();
            }
            if (this._curModuleView != null) {
                this._curModuleView.destroy();
            }
            manager.LayerManager.instace.clearLayer(manager.LayerManager.STAGE_DIALOG_LAYER);
            var moduleClass = this.moduleClassDic.get(this.nextModuleName);
            if (moduleClass != null) {
                this._curModuleView = new moduleClass();
                manager.LayerManager.instace.addToLayer(this._curModuleView, manager.LayerManager.STAGE_BOTTOM_LAYER, false, false);
            }
            if (this.smallLoadingView != null) {
                this.smallLoadingView.tweenDestory();
                this.smallLoadingView = null;
            }
        };
        Object.defineProperty(ModuleController, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new ModuleController();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        ModuleController._instance = null;
        ModuleController.MN_CompanyIcon = "CompanyIcon";
        ModuleController.MN_GameView = "GameView";
        return ModuleController;
    }());
    manager.ModuleController = ModuleController;
})(manager || (manager = {}));
//# sourceMappingURL=ModuleController.js.map