/**
 * 语言工具类
 *
 * 在此工具类根据LANGUAGE_ID 实现显示相应图片和文案的方法
 */
var LanguageUtil = /** @class */ (function () {
    function LanguageUtil() {
    }
    LanguageUtil.showIndexView = function (view) {
        if (LanguageUtil.LANGUAGE_ID == 1) {
            view.skin = "index/img_bg_loading_cn.jpg";
        }
        else {
            view.skin = "index/img_bg_loading.jpg";
        }
    };
    LanguageUtil.getGameCoinText = function () {
        if (LanguageUtil.LANGUAGE_ID == 1) {
            return "金币";
        }
        else {
            return "coin";
        }
    };
    /**
     * LANGUAGE_ID 在Laya.init执行之后通过调用app获取语言id方法进行赋值
     *
     * LanguageUtil.LANGUAGE_ID = BridgeUtil.callAppMethod("getLanguageId");
     *
     */
    LanguageUtil.LANGUAGE_ID = 0;
    return LanguageUtil;
}());
//# sourceMappingURL=LanguageUtil.js.map