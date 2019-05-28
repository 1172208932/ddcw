/**
 * 语言工具类
 * 
 * 在此工具类根据LANGUAGE_ID 实现显示相应图片和文案的方法
 */
class LanguageUtil {

    /**
     * LANGUAGE_ID 在Laya.init执行之后通过调用app获取语言id方法进行赋值
     * 
     * LanguageUtil.LANGUAGE_ID = BridgeUtil.callAppMethod("getLanguageId");
     * 
     */
    public static LANGUAGE_ID: number = 0;

    public static showIndexView(view: Laya.Image): void {
        if (LanguageUtil.LANGUAGE_ID == 1) {
            view.skin = "index/img_bg_loading_cn.jpg"
        } else {
            view.skin = "index/img_bg_loading.jpg"
        }
    }

    public static getGameCoinText(): string {
        if (LanguageUtil.LANGUAGE_ID == 1) {
            return "金币";
        } else {
            return "coin";
        }
    }




}
