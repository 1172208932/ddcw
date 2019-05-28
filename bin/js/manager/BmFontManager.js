/**
* name
*/
var manager;
(function (manager) {
    var Text = Laya.Text;
    var BmFontManager = (function () {
        function BmFontManager() {
            //proto文件名称表 ， 新加一个proto文件，需要在这里注册，才能加载到/////////////////////////////////////////////////
            this.filenames = ["cuyuanBlue", "cuyuanGB"];
            /**字体间距 */
            this.fontSpace = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        /**获取所有 Font文件 的加载路径 */
        BmFontManager.prototype.getFileUrls = function () {
            var fileUrls = new Array();
            for (var i = 0; i < this.filenames.length; i++) {
                fileUrls.push({ url: this.getFileUrl(this.filenames[i]), type: "font" });
            }
            return fileUrls;
        };
        /**解析Font文件 */
        BmFontManager.prototype.initialize = function () {
            for (var i = 0; i < this.filenames.length; i++) {
                var bitmapFont = Laya.loader.getRes(this.getFileUrl(this.filenames[i]));
                bitmapFont.letterSpacing = this.fontSpace[i];
                Text.registerBitmapFont(this.filenames[i], bitmapFont);
            }
        };
        /**创建一个位图文本 */
        BmFontManager.prototype.createText = function (font, xx, yy, w, h, align, leading) {
            if (w === void 0) { w = 0; }
            if (h === void 0) { h = 0; }
            if (align === void 0) { align = "left"; }
            if (leading === void 0) { leading = 0; }
            var txt = new Text();
            if (w > 0)
                txt.width = w;
            if (h > 0)
                txt.height = h;
            txt.wordWrap = true;
            txt.font = font;
            txt.leading = leading;
            txt.x = xx;
            txt.y = yy;
            txt.align = align;
            return txt;
        };
        BmFontManager.prototype.getFileUrl = function (filename) {
            return manager.ResVersionMgr.instance.getMd5Url("res/font/" + filename + ".fnt");
        };
        Object.defineProperty(BmFontManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new BmFontManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return BmFontManager;
    }());
    BmFontManager.cuyuanGB = "cuyuanGB";
    BmFontManager.cuyuanBlue = "cuyuanBlue";
    BmFontManager._instance = null;
    manager.BmFontManager = BmFontManager;
})(manager || (manager = {}));
//# sourceMappingURL=BmFontManager.js.map