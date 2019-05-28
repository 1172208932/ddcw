var Events = Laya.Event;
var Stage = Laya.Stage;
var LocalStorage = laya.net.LocalStorage;
var Main = /** @class */ (function () {
    function Main() {
        this.coinsLackingView = null; // 金币不足时的送金币弹窗
        this.featherLackingView = null; // 羽毛不足时的送羽毛弹窗
        this.luckView = null; // 幸运奖励的弹窗
        this.mSession = 0;
        this.clickCount = 0; // 标记点击屏幕（屏幕中的宠物）的次数，次数到达定值时弹出幸运奖励的弹窗。
        this.shareIndex = 0; // 分享标记，用来标记哪一个的分享。
        this.shareTimes = 0; // 分享次数，用来记录游戏进行中分享的总次数。
        this.shareTimestamp = 0; // 分享时间戳，用来记录当次分享的时间戳。
        this.TiaoZhuanIndex = 0; // 用来区分当前点击的是倒流icon还是抽屉icon
        this.shareTime = 0;
        this.mwx = null;
        this.currentversion = "1020";
        this.unlockPetCount = 0; // 解锁过的宠物数量
        this.pView = null;
        this.raceView = null;
        this.loginView = null;
        // SDK版本
        this.mSDKVersion = "";
        this.mScreenHeight = 0;
        this.mScreenWidth = 0;
        this.mVersion = "";
        this.mSystem = "";
        this.videoAd = null;
        this.mCustomBanner = null;
        this.banner = null;
        this.bannerShowType = false;
        this.isIosX = false;
        // 是否第一次游戏
        this.firstGameType = true;
        // 音乐开关
        this.music_btn_type = true;
        //是否微信平台
        this.is_wx = false;
        //登录账号索引
        this.account = 0;
        this.urlConfig = {
            'app': { url: "1.0.1/tcw/applogin?", key: '1.0.1' }
        };
        this.adArr = {
            main: { banner: 'adunit-4790a487633995c4', videoAd: 'adunit-1a9e5233b3485516' },
            dayGift: { banner: '', videoAd: '' },
            qdView: { banner: '', videoAd: '' },
            ShareLevel: { banner1: '', banner2: '', videoAd: '' },
            Relive: { banner: '', videoAd: '' },
            ShareQunDlg: { banner: '', videoAd: '' },
            inviteView: { banner: '', videoAd: '' },
            storeView: { banner: '', videoAd: '' },
            startProp: { banner: '', videoAd1: '', videoAd2: '', videoAd3: '' },
            LivesDlg: { banner: '', videoAd: '' },
            EndView: { banner: '', videoAd: '' },
            taskView: { banner: '', videoAd: '' },
        };
        // console.log = function () { }
        // console.error = function () { }
        // console.warn = function () { }
        Main.app = this;
        Laya.MiniAdpter.init();
        var showHeight = Math.floor(Laya.Browser.height * 750 / Laya.Browser.width);
        Laya.init(750, 1334, laya.webgl.WebGL);
        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
        Laya.stage.scaleMode = "showall";
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "middle";
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        // Main.app.userId = BridgeUtil.callAppMethod("getOpenId"); //zxx app
        // Main.app.languageId = BridgeUtil.callAppMethod("getLanguageId"); //zxx app
        if (Main.app.is_wx) {
            var info = wx.getSystemInfoSync();
            Main.app.mScreenHeight = Number(info['screenHeight']);
            Main.app.mScreenWidth = Number(info['screenWidth']);
        }
        else {
        }
        Main.app.mwx = new wxMinPro(); //zxx
        // this.initGame();
    }
    Main.prototype.initGame = function () {
        manager.LayerManager.instace.setup(Laya.stage);
        manager.configManager.instance.setup();
        if (wxCore.uo == null) {
            new wxCore();
            wxCore.uo.initWX(2);
        }
        if (Main.app.is_wx) {
            // 初始化离屏页
            wx.postMessage({
                type: "init", width: Laya.stage.width, height: Laya.stage.height
            });
        }
        else {
            this.loadResource();
        }
        // 记录session
        Main.app.mSession = new Date().getTime();
    };
    Main.prototype.loadResource = function () {
        Laya.loader.load([{ url: manager.ResVersionMgr.instance.getMd5Url("res/atlas/smallload.json"), type: laya.net.Loader.ATLAS }], laya.utils.Handler.create(this, this.onLoaded));
    };
    Main.prototype.onLoaded = function () {
        manager.ModuleController.instance.changeModule(manager.ModuleController.MN_CompanyIcon, false, false);
        if (Main.app.is_wx) {
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.EnterGame, { "load": 1 });
        }
    };
    Main.prototype.showMessage = function (title, icon, image, duration) {
        if (icon === void 0) { icon = "none"; }
        if (image === void 0) { image = ""; }
        if (duration === void 0) { duration = 2000; }
        if (Main.app.is_wx) {
            wx.showToast({
                title: title,
                icon: icon,
                image: image,
                duration: duration
            });
        }
    };
    /* 金币不足时展示送金币的界面 */
    Main.prototype.showCoinsLackingView = function () {
        // 开关关闭不做操作
        if (Main.app.mwx.ofCoinsLess == 0) {
            return;
        }
        // 领取次数超过后台设置的次数，不做操作。
        var getCoinsCount = Main.app.getReceiveFreeCoins();
        if (getCoinsCount >= Number(Main.app.mwx.ofCoinsLessParam["time"])) {
            return;
        }
        // 展示领取金币弹窗
        if (Main.app.coinsLackingView == null) {
            Main.app.coinsLackingView = new module.CoinsLackingView();
        }
        Main.app.coinsLackingView.showCoinsLackingView();
    };
    /* 获取金币不足时领取金币的次数(通过弹窗领取) */
    Main.prototype.getReceiveFreeCoins = function () {
        var getCoinsCount = 0;
        var saveTime = wx.getStorageSync(Main.DianDianChongWu_NowDay6);
        if (saveTime == Main.app.mwx.nowday) {
            var storageCount = wx.getStorageSync(Main.DianDianChongWu_GetFreeCoinsCount);
            if (!!storageCount)
                getCoinsCount = storageCount;
        }
        else {
            wx.setStorageSync(Main.DianDianChongWu_NowDay6, Main.app.mwx.nowday);
            wx.setStorageSync(Main.DianDianChongWu_GetFreeCoinsCount, 0);
        }
        return getCoinsCount;
    };
    /* 羽毛不足时展示送羽毛的界面 */
    Main.prototype.showFeatherLackingView = function () {
        // 开关关闭不做操作
        if (Main.app.mwx.ofFeatherLess == 0) {
            return;
        }
        // 领取次数超过后台设置的次数，不做操作。
        if (Main.app.is_wx)
            var getFeatherCount = Main.app.getReceiveFreeFeather();
        if (getFeatherCount >= Number(Main.app.mwx.ofFeatherLessParam["time"])) {
            return;
        }
        // 展示领取金币弹窗
        if (Main.app.featherLackingView == null) {
            Main.app.featherLackingView = new module.FeatherLackingView();
        }
        Main.app.featherLackingView.showFeatherLackingView();
    };
    /* 获取羽毛不足时领取羽毛的次数(通过弹窗领取) */
    Main.prototype.getReceiveFreeFeather = function () {
        var getFeatherCount = 0;
        var saveTime = LocalStorage.getItem(Main.DianDianChongWu_NowDay7);
        // wx.getStorageSync(Main.DianDianChongWu_NowDay7);
        if (saveTime == Main.app.mwx.nowday) {
            var storageCount = Number(LocalStorage.getItem(Main.DianDianChongWu_GetFreeFeatherCount));
            //  number = wx.getStorageSync(Main.DianDianChongWu_GetFreeFeatherCount);
            if (!!storageCount)
                getFeatherCount = storageCount;
        }
        else {
            LocalStorage.setItem(Main.DianDianChongWu_NowDay7, Main.app.mwx.nowday);
            LocalStorage.setItem(Main.DianDianChongWu_GetFreeFeatherCount, "0");
            // wx.setStorageSync(Main.DianDianChongWu_NowDay7, Main.app.mwx.nowday);
            // wx.setStorageSync(Main.DianDianChongWu_GetFreeFeatherCount, 0);
        }
        return getFeatherCount;
    };
    /* 弹出幸运弹窗 */
    Main.prototype.showLuckView = function () {
        // 开关关闭不做操作
        if (Main.app.mwx.ofLuck == 0) {
            return;
        }
        // 领取次数超过后台设置的次数，不做操作。
        var getLuckCount = Main.app.getReceiveLuck();
        if (getLuckCount >= Number(Main.app.mwx.ofLuckParam["max"])) {
            return;
        }
        // 展示幸运弹窗
        if (Main.app.luckView == null) {
            Main.app.luckView = new module.LuckView();
        }
        Main.app.luckView.showLuckView();
    };
    /* 获取领取幸运奖励的次数(通过弹窗领取) */
    Main.prototype.getReceiveLuck = function () {
        var getLuckCount = 0;
        var saveTime = LocalStorage.getItem(Main.DianDianChongWu_NowDay8);
        //  wx.getStorageSync(Main.DianDianChongWu_NowDay8);
        if (saveTime == Main.app.mwx.nowday) {
            var storageCount = Number(LocalStorage.getItem(Main.DianDianChongWu_GetLuckRewardCount));
            // wx.getStorageSync(Main.DianDianChongWu_GetLuckRewardCount);
            if (!!storageCount)
                getLuckCount = storageCount;
        }
        else {
            LocalStorage.setItem(Main.DianDianChongWu_NowDay8, Main.app.mwx.nowday);
            LocalStorage.setItem(Main.DianDianChongWu_GetLuckRewardCount, "0");
            // wx.setStorageSync(Main.DianDianChongWu_NowDay8, Main.app.mwx.nowday);
            // wx.setStorageSync(Main.DianDianChongWu_GetLuckRewardCount, 0);
        }
        return getLuckCount;
    };
    Main.prototype.getGameName = function (id) {
        var gamename = "";
        for (var i = 0; i < Main.app.mwx.games_box.length; i++) {
            var item = Main.app.mwx.games_box[i];
            if (Number(item["id"]) == id) {
                gamename = String(item["name"]);
                break;
            }
        }
        return gamename;
    };
    /* 获取当前时间戳 */
    Main.prototype.getCurrTime = function () {
        var date = new Date();
        return date.getTime();
    };
    /* 网络请求 */
    Main.prototype.server = function (rpc, params, callback, ecbck) {
        if (ecbck === void 0) { ecbck = null; }
        Main.app.mwx.mHttpCall = new Laya.HttpRequest();
        Main.app.mwx.mHttpCall.once(Laya.Event.COMPLETE, Main.app.mwx, onResult);
        Main.app.mwx.mHttpCall.once(Laya.Event.ERROR, Main.app.mwx, onHttpRequestError);
        var str = util.getServer() + rpc['url'] + util.getUrlParams(params, rpc['key']);
        console.log(str);
        Main.app.mwx.mHttpCall.send(str, null, 'get', 'text');
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string") {
                ret = util.getJSON(e);
            }
            else {
                ret = util.getJSON(Main.app.mwx.mHttpCall.data);
            }
            if (callback != null)
                callback(ret);
            Main.app.mwx.mHttpCall = null;
        }
        function onHttpRequestError(e) {
            if (ecbck != null) {
                ecbck();
            }
            Main.app.mwx.mHttpCall = null;
        }
    };
    /* 处理分享获得金币（首页悬浮的宝箱每天通过分享获得的次数为5次） */
    Main.prototype.handeleGetCoinsByShare = function () {
        // 获取当前分享的次数
        var curTimes = 0;
        var saveTime = LocalStorage.getItem(Main.DianDianChongWu_NowDay4);
        //  wx.getStorageSync(Main.DianDianChongWu_NowDay4);
        if (saveTime == Main.app.mwx.nowday) {
            var storageTimes = Number(LocalStorage.getItem(Main.DianDianChongWu_GetCoinsByShare_Times));
            // wx.getStorageSync(Main.DianDianChongWu_GetCoinsByShare_Times);
            if (!!storageTimes)
                curTimes = storageTimes;
        }
        else {
            LocalStorage.setItem(Main.DianDianChongWu_NowDay4, Main.app.mwx.nowday);
            LocalStorage.setItem(Main.DianDianChongWu_GetCoinsByShare_Times, '0');
        }
        // 是否还有通过分享获得的次数
        if (curTimes < 5) {
            module.RaceManager.instance.event(module.RaceManager.LOOKTOCOUNTGOLD);
            curTimes += 1;
            LocalStorage.setItem(Main.DianDianChongWu_GetCoinsByShare_Times, curTimes + '');
            // wx.setStorageSync(Main.DianDianChongWu_GetCoinsByShare_Times, curTimes);
        }
        // 5次之后移除悬浮按钮
        if (curTimes >= 5) {
            module.RaceManager.instance.event(module.RaceManager.CLOSEFLYVIDOEITEM);
        }
    };
    Main.app = null;
    Main.DianDianChongWu_ShowDownArrow = "DDCW_ShowDownArrow"; // 本地保存游历到另一个花园的箭头，只出现一次
    // NowDay1 NowDay2 NowDay3 NowDay4 NowDay5 NowDay6 NowDay7 NowDay7 都是和各自下面的常量配对使用
    Main.DianDianChongWu_NowDay1 = "DDCW_NOW_DAY_1";
    Main.DianDianChongWu_AlreadyCoin = "ALREADY_ADD_COIN"; // 本地保存每天获取的金币数(用于计算收益开始衰减)
    Main.DianDianChongWu_NowDay2 = "DDCW_NOW_DAY_2";
    Main.DianDianChongWu_ADD_COINEXP_TIME = "DDCW_ADD_COIN_EXP_TIME"; // 本地保存每天自动获取金币和经验的时间CD
    Main.DianDianChongWu_DDCW_ATTENUATION_TIME = "DDCW_ATTENUATION_TIME"; // 本地保存每天自动获取金币和经验衰减的时间CD
    Main.DianDianChongWu_NowDay3 = "DDCW_NOW_DAY_3";
    Main.DianDianChongWu_FreeVideo = "DDCW_Free_Video"; // 本地保存每天通过免费观看视频开蛋的次数
    Main.DianDianChongWu_NowDay4 = "DDCW_NOW_DAY_4";
    Main.DianDianChongWu_GetCoinsByShare_Times = "DDCW_GetCoinsByShare_Times"; // 本地保存每天通过分享获得的金币的次数（首页漂浮的）
    Main.DianDianChongWu_NowDay5 = "DDCW_NOW_DAY_5";
    Main.DianDianChongWu_GetDailyRewardStatus = "DDCW_GetDailyRewardStatus"; // 本地保存领取每日奖励的状态
    Main.DianDianChongWu_NowDay6 = "DDCW_NOW_DAY_6";
    Main.DianDianChongWu_GetFreeCoinsCount = "DDCW_GetFreeCoinsCount"; // 本地保存每天金币不足时领取金币的次数
    Main.DianDianChongWu_NowDay7 = "DDCW_NOW_DAY_7";
    Main.DianDianChongWu_GetFreeFeatherCount = "DDCW_GetFreeFeatherCount"; // 本地保存每天羽毛不足时领取羽毛的次数
    Main.DianDianChongWu_NowDay8 = "DDCW_NOW_DAY_8";
    Main.DianDianChongWu_GetLuckRewardCount = "DDCW_GetLuckRewardCount"; // 本地保存每天领取幸运弹窗奖励的次数
    // 视频状态
    Main.avCloseType = true;
    return Main;
}());
new Main();
//# sourceMappingURL=Main.js.map