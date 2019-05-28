/**
 *
 * @author huangjianmeng
 * 应用交互桥
 * 2.0去掉Laya.Browser.onAndriod
 */
var BridgeUtil = /** @class */ (function () {
    function BridgeUtil() {
    }
    /**
     * 创建应用桥对象
     */
    BridgeUtil.createBridge = function () {
        var bridge;
        if (Laya.Browser.onIOS) {
            bridge = Laya.PlatformClass.createClass("JSBridge");
        }
        else {
            // bridge = Laya.PlatformClass.createClass("demo.JSBridge");
        }
        return bridge;
    };
    /**
     * 构建方法名
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
     * ts调用app方法 (2.0去掉Laya.Browser.onAndriod)
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
        else if (methodName == "getOpenId") {
            // 此处为方便浏览器调试 模拟返回固定测试值 testOpenId
            console.log(BridgeUtil.LOG_TAG + "getOpenId return testOpenId by browser");
            return "testOpenId";
        }
        else if (methodName == "getLanguageId") {
            // 此处为方便浏览器调试 模拟返回固定测试值 0
            console.log(BridgeUtil.LOG_TAG + "getLanguageId return 0 by browser");
            return 0;
        }
    };
    /**
     * app调用ts的静态方法 展示插屏回掉
     * @param videoType  视频来源（皮肤，续命，加倍等）
     * @param isWatchFullVideo 是否看完视频
     */
    BridgeUtil.InterstitialAd = function (videoType, isWatchFullVideo) {
        //TODO 游戏端实现相应逻辑
        switch (videoType) {
            case 1:
                BridgeUtil.callAppMethod("showVideo", [1]);
                break;
            case 2:
                BridgeUtil.callAppMethod("showVideo", [2]);
                break;
            case 3:
                BridgeUtil.callAppMethod("showVideo", [3]);
                break;
            case 4:
                BridgeUtil.callAppMethod("showVideo", [4]);
                break;
            case 5:
                BridgeUtil.callAppMethod("showVideo", [5]);
                break;
            case 6:
                BridgeUtil.callAppMethod("showVideo", [6]);
                break;
            case 7:
                BridgeUtil.callAppMethod("showVideo", [7]);
                break;
            case 8:
                BridgeUtil.callAppMethod("showVideo", [8]);
                break;
            case 9:
                BridgeUtil.callAppMethod("showVideo", [9]);
                break;
            case 10:
                BridgeUtil.callAppMethod("showVideo", [10]);
                break;
        }
    };
    /**
     * app调用ts的静态方法 关闭视频回掉
     * @param videoType  视频来源（皮肤，续命，加倍等）
     * @param isWatchFullVideo 是否看完视频
     */
    BridgeUtil.closeVideoCallback = function (videoType, isWatchFullVideo) {
        //TODO 游戏端实现相应逻辑
        switch (videoType) {
            case 1:
                module.RaceManager.instance.event(module.RaceManager.SHARETOOPENJIASU);
                break;
            case 2:
                BridgeUtil.callAppMethod("showVideo", [2]);
                break;
            case 3:
                Main.app.luckView.getCoins();
                break;
            case 4:
                module.RaceManager.instance.event(module.RaceManager.GET_DAILY_REWARD);
                break;
            case 5:
                module.RaceManager.instance.event(module.RaceManager.LOOKTOMEALAPPLE); //喂宠物界面的视频按钮
                break;
            case 6:
                Main.app.handeleGetCoinsByShare(); // 游戏上方大量金币的宝箱
                break;
            case 7:
                module.RaceManager.instance.userInfo.addTaskCount(5); //每日任务中视频按钮
                break;
            case 8:
                module.RaceManager.instance.event(module.RaceManager.OPENEGGFREE); //立即获取中宠物免费打开的按钮 免费开蛋
                break;
            case 9:
                manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(0, 0), 2, 30]);
                module.RaceManager.instance.event(module.RaceManager.CLOSEEGGOPENING); // 获得新蛋分享得金币
                break;
            case 10:
                manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(353, 1102), 2, 100]); //小游戏比赛后的分享按钮改为视频
                break;
        }
    };
    /**
     * app调用ts的静态方法 分享回掉
     * @param shareType 分享来源（皮肤，续命，加倍等）
     * @param isSuccess 是否成功分享
     */
    BridgeUtil.shareCallback = function (shareType, isSuccess) {
        //TODO 游戏端实现相应逻辑
    };
    BridgeUtil.testCallMethod = function () {
        // 显示插屏
        BridgeUtil.callAppMethod("showInterstitialAd");
        // 隐藏banner
        BridgeUtil.callAppMethod("hideBanner");
        // 显示banner
        BridgeUtil.callAppMethod("showBanner");
        /**
         * 调用app 播放激励视频
         * 播放视频 参数代表来源（皮肤，续命，加倍等）
         * 用户关闭视频后app端会回调BridgeUtil的closeVideoCallback方法
         * closeVideoCallback接收的参数videoType由BridgeUtil.callAppMethod("showVideo", [1])传入的参数决定
         *
         */
        BridgeUtil.callAppMethod("showVideo", [1]);
        /**
         * 调用app 分享方法
         * 分享 参数代表来源（皮肤，续命，加倍等）
         * 用户分享过后app会回调shareCallback方法
         * shareCallback接收的参数shareType由BridgeUtil.callAppMethod("share", [1])传入的参数决定
         *
         */
        BridgeUtil.callAppMethod("share", [1]);
        //获取用户id
        var userId = BridgeUtil.callAppMethod("getOpenId");
        //获取语言id 0 中文 1英文 其他待定
        var languageId = BridgeUtil.callAppMethod("getLanguageId");
    };
    BridgeUtil.myTest = function () {
        alert("game_start");
    };
    BridgeUtil.LOG_TAG = "BridgeUtil:";
    return BridgeUtil;
}());
//# sourceMappingURL=BridgeUtil.js.map