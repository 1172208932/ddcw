import Events = Laya.Event
import Stage = Laya.Stage;
import LocalStorage = laya.net.LocalStorage;

class Main {

    public static app: Main = null;
    public static DianDianChongWu_ShowDownArrow = "DDCW_ShowDownArrow";                 // 本地保存游历到另一个花园的箭头，只出现一次
    // NowDay1 NowDay2 NowDay3 NowDay4 NowDay5 NowDay6 NowDay7 NowDay7 都是和各自下面的常量配对使用
    public static DianDianChongWu_NowDay1 = "DDCW_NOW_DAY_1";
    public static DianDianChongWu_AlreadyCoin = "ALREADY_ADD_COIN";                     // 本地保存每天获取的金币数(用于计算收益开始衰减)
    public static DianDianChongWu_NowDay2 = "DDCW_NOW_DAY_2";
    public static DianDianChongWu_ADD_COINEXP_TIME = "DDCW_ADD_COIN_EXP_TIME";          // 本地保存每天自动获取金币和经验的时间CD
    public static DianDianChongWu_DDCW_ATTENUATION_TIME = "DDCW_ATTENUATION_TIME";      // 本地保存每天自动获取金币和经验衰减的时间CD
    public static DianDianChongWu_NowDay3 = "DDCW_NOW_DAY_3";
    public static DianDianChongWu_FreeVideo = "DDCW_Free_Video";                        // 本地保存每天通过免费观看视频开蛋的次数
    public static DianDianChongWu_NowDay4 = "DDCW_NOW_DAY_4";
    public static DianDianChongWu_GetCoinsByShare_Times = "DDCW_GetCoinsByShare_Times"; // 本地保存每天通过分享获得的金币的次数（首页漂浮的）
    public static DianDianChongWu_NowDay5 = "DDCW_NOW_DAY_5";
    public static DianDianChongWu_GetDailyRewardStatus = "DDCW_GetDailyRewardStatus";   // 本地保存领取每日奖励的状态
    public static DianDianChongWu_NowDay6 = "DDCW_NOW_DAY_6";
    public static DianDianChongWu_GetFreeCoinsCount = "DDCW_GetFreeCoinsCount";         // 本地保存每天金币不足时领取金币的次数
    public static DianDianChongWu_NowDay7 = "DDCW_NOW_DAY_7";
    public static DianDianChongWu_GetFreeFeatherCount = "DDCW_GetFreeFeatherCount";     // 本地保存每天羽毛不足时领取羽毛的次数
    public static DianDianChongWu_NowDay8 = "DDCW_NOW_DAY_8";
    public static DianDianChongWu_GetLuckRewardCount = "DDCW_GetLuckRewardCount";       // 本地保存每天领取幸运弹窗奖励的次数

    public coinsLackingView: module.CoinsLackingView = null;       // 金币不足时的送金币弹窗
    public featherLackingView: module.FeatherLackingView = null;   // 羽毛不足时的送羽毛弹窗
    public luckView: module.LuckView = null;                       // 幸运奖励的弹窗

    public mSession: number = 0;
    public clickCount: number = 0;      // 标记点击屏幕（屏幕中的宠物）的次数，次数到达定值时弹出幸运奖励的弹窗。
    public shareIndex: number = 0;      // 分享标记，用来标记哪一个的分享。
    public shareTimes: number = 0;      // 分享次数，用来记录游戏进行中分享的总次数。
    public shareTimestamp: number = 0;  // 分享时间戳，用来记录当次分享的时间戳。
    public TiaoZhuanIndex: number = 0;  // 用来区分当前点击的是倒流icon还是抽屉icon

    public shareTime: number = 0
    public mwx: wxMinPro = null;
    public currentversion: string = "1020";
    public unlockPetCount: number = 0;      // 解锁过的宠物数量
    public pView: module.ProgressView = null;
    public raceView: module.RaceView = null;
    public loginView: module.LoginView2 = null
    // SDK版本
    public mSDKVersion: string = "";
    public mScreenHeight: number = 0;
    public mScreenWidth: number = 0;
    public mVersion: string = "";
    public mSystem: string = ""
    public videoAd = null;
    public mCustomBanner = null
    public banner = null
    public bannerShowType = false
    public isIosX = false;
    // 是否第一次游戏
    public firstGameType = true
    // 音乐开关
    public music_btn_type = true;
    //是否微信平台
    public is_wx = false;
    //登录账号索引
    public account: number = 0

    public appUserId
    public languageId
    public urlConfig = {
        'app': { url: `1.0.1/tcw/applogin?`, key: '1.0.1' }
    }
    public adArr: Object = {
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
    }
    // 视频状态
    public static avCloseType: boolean = true;

    constructor() {
        // console.log = function () { }
        // console.error = function () { }
        // console.warn = function () { }
        Main.app = this;
        Laya.MiniAdpter.init();
        var showHeight: number = Math.floor(Laya.Browser.height * 750 / Laya.Browser.width);
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
        } else {
        }
        Main.app.mwx = new wxMinPro();//zxx

        // this.initGame();
    }
    public initGame() {
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
        } else {
            this.loadResource()
        }

        // 记录session
        Main.app.mSession = new Date().getTime();
    }

    loadResource(): void {
        Laya.loader.load([{ url: manager.ResVersionMgr.instance.getMd5Url("res/atlas/smallload.json"), type: laya.net.Loader.ATLAS }],
            laya.utils.Handler.create(this, this.onLoaded));
    }

    private onLoaded(): void {
        manager.ModuleController.instance.changeModule(manager.ModuleController.MN_CompanyIcon, false, false);
        if (Main.app.is_wx) {
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.EnterGame, { "load": 1 });
        }
    }

    showMessage(title: string, icon: string = "none", image: string = "", duration: number = 2000): void {
        if (Main.app.is_wx) {
            wx.showToast({
                title: title,
                icon: icon,
                image: image,
                duration: duration
            });
        }

    }

    /* 金币不足时展示送金币的界面 */
    showCoinsLackingView(): void {
        // 开关关闭不做操作
        if (Main.app.mwx.ofCoinsLess == 0) {
            return;
        }
        // 领取次数超过后台设置的次数，不做操作。
        var getCoinsCount: number = Main.app.getReceiveFreeCoins();
        if (getCoinsCount >= Number(Main.app.mwx.ofCoinsLessParam["time"])) {
            return;
        }
        // 展示领取金币弹窗
        if (Main.app.coinsLackingView == null) {
            Main.app.coinsLackingView = new module.CoinsLackingView();
        }
        Main.app.coinsLackingView.showCoinsLackingView();
    }

    /* 获取金币不足时领取金币的次数(通过弹窗领取) */
    getReceiveFreeCoins(): number {
        var getCoinsCount: number = 0;
        var saveTime: string = wx.getStorageSync(Main.DianDianChongWu_NowDay6);
        if (saveTime == Main.app.mwx.nowday) {
            var storageCount: number = wx.getStorageSync(Main.DianDianChongWu_GetFreeCoinsCount);
            if (!!storageCount) getCoinsCount = storageCount;
        } else {
            wx.setStorageSync(Main.DianDianChongWu_NowDay6, Main.app.mwx.nowday);
            wx.setStorageSync(Main.DianDianChongWu_GetFreeCoinsCount, 0);
        }
        return getCoinsCount;
    }

    /* 羽毛不足时展示送羽毛的界面 */
    showFeatherLackingView(): void {
        // 开关关闭不做操作
        if (Main.app.mwx.ofFeatherLess == 0) {
            return;
        }
        // 领取次数超过后台设置的次数，不做操作。
        if (Main.app.is_wx)
            var getFeatherCount: number = Main.app.getReceiveFreeFeather();
        if (getFeatherCount >= Number(Main.app.mwx.ofFeatherLessParam["time"])) {
            return;
        }
        // 展示领取金币弹窗
        if (Main.app.featherLackingView == null) {
            Main.app.featherLackingView = new module.FeatherLackingView();
        }
        Main.app.featherLackingView.showFeatherLackingView();
    }

    /* 获取羽毛不足时领取羽毛的次数(通过弹窗领取) */
    getReceiveFreeFeather(): number {
        var getFeatherCount: number = 0;
        var saveTime: string = LocalStorage.getItem(Main.DianDianChongWu_NowDay7)
        // wx.getStorageSync(Main.DianDianChongWu_NowDay7);

        if (saveTime == Main.app.mwx.nowday) {
            var storageCount = Number(LocalStorage.getItem(Main.DianDianChongWu_GetFreeFeatherCount))
            //  number = wx.getStorageSync(Main.DianDianChongWu_GetFreeFeatherCount);
            if (!!storageCount) getFeatherCount = storageCount;
        } else {
            LocalStorage.setItem(Main.DianDianChongWu_NowDay7, Main.app.mwx.nowday)
            LocalStorage.setItem(Main.DianDianChongWu_GetFreeFeatherCount, "0")
            // wx.setStorageSync(Main.DianDianChongWu_NowDay7, Main.app.mwx.nowday);
            // wx.setStorageSync(Main.DianDianChongWu_GetFreeFeatherCount, 0);
        }
        return getFeatherCount;
    }

    /* 弹出幸运弹窗 */
    showLuckView(): void {
        // 开关关闭不做操作
        if (Main.app.mwx.ofLuck == 0) {
            return;
        }
        // 领取次数超过后台设置的次数，不做操作。
        var getLuckCount: number = Main.app.getReceiveLuck();
        if (getLuckCount >= Number(Main.app.mwx.ofLuckParam["max"])) {
            return;
        }
        // 展示幸运弹窗
        if (Main.app.luckView == null) {
            Main.app.luckView = new module.LuckView();
        }
        Main.app.luckView.showLuckView();
    }

    /* 获取领取幸运奖励的次数(通过弹窗领取) */
    getReceiveLuck(): number {
        var getLuckCount: number = 0;
        var saveTime: string = LocalStorage.getItem(Main.DianDianChongWu_NowDay8)
        //  wx.getStorageSync(Main.DianDianChongWu_NowDay8);
        if (saveTime == Main.app.mwx.nowday) {
            var storageCount: number = Number(LocalStorage.getItem(Main.DianDianChongWu_GetLuckRewardCount))
            // wx.getStorageSync(Main.DianDianChongWu_GetLuckRewardCount);
            if (!!storageCount) getLuckCount = storageCount;
        } else {
            LocalStorage.setItem(Main.DianDianChongWu_NowDay8, Main.app.mwx.nowday)
            LocalStorage.setItem(Main.DianDianChongWu_GetLuckRewardCount, "0")

            // wx.setStorageSync(Main.DianDianChongWu_NowDay8, Main.app.mwx.nowday);
            // wx.setStorageSync(Main.DianDianChongWu_GetLuckRewardCount, 0);
        }
        return getLuckCount;
    }

    getGameName(id: number): string {
        var gamename: string = "";
        for (var i = 0; i < Main.app.mwx.games_box.length; i++) {
            var item: Object = Main.app.mwx.games_box[i];
            if (Number(item["id"]) == id) {
                gamename = String(item["name"]);
                break;
            }
        }
        return gamename;
    }
    /* 获取当前时间戳 */
    public getCurrTime(): number {
        var date: Date = new Date();
        return date.getTime();
    }
    /* 网络请求 */
    public server(rpc: Object, params: any, callback: Function, ecbck: Function = null): void {
        Main.app.mwx.mHttpCall = new Laya.HttpRequest();
        Main.app.mwx.mHttpCall.once(Laya.Event.COMPLETE, Main.app.mwx, onResult);
        Main.app.mwx.mHttpCall.once(Laya.Event.ERROR, Main.app.mwx, onHttpRequestError);

        let str = util.getServer() + rpc['url'] + util.getUrlParams(params, rpc['key']);
        console.log(str)
        Main.app.mwx.mHttpCall.send(str, null, 'get', 'text');

        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string") {
                ret = util.getJSON(e);
            } else {
                ret = util.getJSON(Main.app.mwx.mHttpCall.data);
            }
            if (callback != null) callback(ret);
            Main.app.mwx.mHttpCall = null;
        }
        function onHttpRequestError(e: any): void {
            if (ecbck != null) {
                ecbck();
            }
            Main.app.mwx.mHttpCall = null;
        }
    }
    /* 处理分享获得金币（首页悬浮的宝箱每天通过分享获得的次数为5次） */
    public handeleGetCoinsByShare(): void {
        // 获取当前分享的次数
        var curTimes: number = 0;
        var saveTime: string = LocalStorage.getItem(Main.DianDianChongWu_NowDay4)
        //  wx.getStorageSync(Main.DianDianChongWu_NowDay4);
        if (saveTime == Main.app.mwx.nowday) {
            var storageTimes: number = Number(LocalStorage.getItem(Main.DianDianChongWu_GetCoinsByShare_Times))
            // wx.getStorageSync(Main.DianDianChongWu_GetCoinsByShare_Times);
            if (!!storageTimes) curTimes = storageTimes;
        } else {
            LocalStorage.setItem(Main.DianDianChongWu_NowDay4, Main.app.mwx.nowday)
            LocalStorage.setItem(Main.DianDianChongWu_GetCoinsByShare_Times, '0')
        }
        // 是否还有通过分享获得的次数
        if (curTimes < 5) {
            module.RaceManager.instance.event(module.RaceManager.LOOKTOCOUNTGOLD);
            curTimes += 1;
            LocalStorage.setItem(Main.DianDianChongWu_GetCoinsByShare_Times, curTimes + '')
            // wx.setStorageSync(Main.DianDianChongWu_GetCoinsByShare_Times, curTimes);
        }
        // 5次之后移除悬浮按钮
        if (curTimes >= 5) {
            module.RaceManager.instance.event(module.RaceManager.CLOSEFLYVIDOEITEM);
        }
    }
}
new Main();