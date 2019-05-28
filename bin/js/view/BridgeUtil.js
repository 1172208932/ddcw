/**
 * 应用交互桥
 */
var module;
(function (module) {
    var BridgeUtil = /** @class */ (function () {
        function BridgeUtil() {
        }
        /**
         * 创建桥对象
         *
         */
        BridgeUtil.createBridge = function () {
            var bridge;
            if (Laya.Browser.onAndroid) {
                bridge = Laya.PlatformClass.createClass("demo.JSBridge");
            }
            else {
                bridge = Laya.PlatformClass.createClass("JSBridge");
            }
            return bridge;
        };
        /**
         * 构建方法名
         *
         */
        BridgeUtil.generateMethodName = function (inputName, paramCount) {
            var name = inputName;
            if (Laya.Browser.onIOS && paramCount && paramCount > 0) {
                var chartItem = "";
                name = inputName;
                for (var index = 0; index < paramCount; index++) {
                    name = name + ":";
                }
            }
            return name;
        };
        /**
         * ts调用app方法
         * @param methodName 调用的方法名
         * @param args 传给app的参数[p0,p1,p2...]
         */
        BridgeUtil.callAppMethod = function (methodName, args) {
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                var bridge = BridgeUtil.createBridge();
                if (args && args.length > 0) {
                    return bridge.call.apply(bridge, [BridgeUtil.generateMethodName(methodName, args.length)].concat(args));
                }
                else {
                    return bridge.call(methodName);
                }
            }
        };
        /**
         * app调用ts的静态方法 关闭视频回掉
         * @param videoType  视频来源（皮肤，续命，加倍等）
         * @param isWatchFullVideo 是否看完视频
         */
        BridgeUtil.closeVideoCallback = function (videoType, isWatchFullVideo) {
            //TODO 游戏端实现相应逻辑
        };
        /**
         * app调用ts的静态方法 分享回掉
         * @param shareType 分享来源（皮肤，续命，加倍等）
         * @param isSuccess 是否成功分享
         */
        BridgeUtil.shareCallback = function (shareType, isSuccess) {
            //TODO 游戏端实现相应逻辑
        };
        BridgeUtil.test = function () {
            // 显示插屏
            BridgeUtil.callAppMethod("showInterstitialAd");
            // 隐藏banner
            BridgeUtil.callAppMethod("hideBanner");
            // 显示banner
            BridgeUtil.callAppMethod("showBanner");
            // 播放视频 参数代表来源（皮肤，续命，加倍等）
            BridgeUtil.callAppMethod("showVideo", [1]);
            // 分享 参数代表来源（皮肤，续命，加倍等）
            BridgeUtil.callAppMethod("share", [1]);
            //获取用户id
            var userId = BridgeUtil.callAppMethod("getUserId");
            //获取语言id 0 中文 1英文 其他待定
            var languageId = BridgeUtil.callAppMethod("getLanguageId");
        };
        return BridgeUtil;
    }());
    module.BridgeUtil = BridgeUtil;
})(module || (module = {}));
//# sourceMappingURL=BridgeUtil.js.map