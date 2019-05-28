/**
 * 微信登陆流程相关接口，一些默认接口，必须要有。
 */
class wxCallBack {
    public static mIF: Object = {
        "login": { "url": "1.0.1/cw/login?", "key": "1.0.1", "tips": "登录服务" },
        "userinfo": { "url": "1.0.1/cw/userinfo?", "key": "1.0.1", "tips": "更新用户信息" },
        "lauch": { "url": "1.0.1/cw/lauch?", "key": "1.0.1", "tips": "游戏启动必然调用的接口" },
    };

    /**
     * 记录从广告进入时带来的adid
     */
    public static mAdId: string = "";

    /**
     * 记录分享标签
     */
    public static mSurl: string = "";

    /**
     * 跳转标识
     */
    public static isJumped: boolean = false;

    constructor() {

    }

    /**
     * 必须有这个接口，提交当前版本号。
     */
    public version(): string {
        return Main.app.currentversion;
    }

    /**
     * 授权按钮偏移量，根据游戏设置，默认160
     */
    public loginBtnPos(): number {
        return 160;
    }

    /**
     * 可以自定义显示界面，或者返回true,显示默认登陆界面，默认登陆界面资源在 login目录下
     * 返回 true = 正常显示默认登陆模板
     *     false = 不显示默认登陆背景，自定义设计显示界面
     * 
     * 这里可以做一些下载资源得事情。异步操作都可以，不要做同步阻塞操作
     *             
     */
    public onBefore(): boolean {
        this.dealAdId(wxCore.uo.launch());
        this.dealSurl(wxCore.uo.launch());
        return true;
    }

    /**
     * 底层显示后，如果有其他层需要显示，在这里处理
     * 注意底层zorder=0,在这里显示的其他内容，不应该再设置底图
     */
    public onShow(): void {

    }

    /**
     * 针对广告跳转需求，不跳转返回时重新设置界面
     */
    public onReShow(): void {

    }

    /**
     * 登陆成功后
     * @param user 用户数据=uid,openid,name,avatar
     * @param ret  服务端登陆返回
     * 返回 true = 继续登陆微信
     *     false = 中断登陆过程，后续需要自己调用wxCore.uo.getUserInfo来继续被中断微信登陆过程
     *             为广告设计，需要自己调用init()
     */
    public onLogin(user: Object, ret: Object): boolean {
        this.onGameSetting();
        if (Main.app.mwx == null) {
            Main.app.mwx = new wxMinPro();
        }
        Main.app.mwx.newUser = !!ret["newbie"];
        Main.app.mwx.mOpenid = ret['openid'];
        Main.app.mwx.mUID = ret['uid'];
        Main.app.mwx.mUser = user;
        return true;
    }

    /**
     * @param frist true=第一次进入游戏
     * @param last 上一次进入小程序带过来的参数 = null表示小程序第一次启动
     * @param cur  本次进入小程序呆过来的参数
     * 
     * 传递last过来是用来比较本次进入和上次进去的参数差别，个别游戏需要这个参数来判断
     */
    public onEnterGame(frist: boolean, last: Object, mLaunch: Object): void {
        //这里开始游戏逻辑。显示游戏面板。当游戏面板完全显示后，记得调用 wxCore.uo.clear()清理登陆面板
        if (frist == true) {
            console.log("冷启动");
            Main.app.mwx.mUID = wxCore.uo.getUserID();
            Main.app.mwx.onLauch(frist);
        } else {
            console.log("热启动");
            wxCallBack.mAdId = "";
            wxCallBack.mSurl = "";
            // 跳过之后不跳，直接进入授权页
            if (wxCallBack.isJumped && wxCore.uo.mWeUser['nickName'] == null) {
                console.log("跳过之后不跳，直接进入授权页。");
                wxCore.uo.getUserInfo();
            }
            // 处理adid和分享标签分享标签
            this.dealAdId(mLaunch);
            this.dealSurl(mLaunch);
            Main.app.mwx.onLauch(frist);
        }
        // 处理点进游戏的参数
        Main.app.mwx.dealQuery(mLaunch);
        // 处理分享操作
        if (Main.app.shareIndex > 0) {
            this.checkShareAction();
        }
    }

    /* 游戏进入后台被调用 */
    public onHideGame(): void {
        // 更新玩家游戏数据
        module.RaceManager.instance.userInfo.UpDateUserValue()
    }

    /* 处理adid */
    private dealAdId(launch: Object) {
        if (typeof (launch["query"]) != "undefined" && typeof (launch['query']['channel']) != "undefined") {
            wxCallBack.mAdId = String(launch["query"]["channel"]);
        }
        if (typeof (launch["query"]) != "undefined" && typeof (launch['query']['adid']) != "undefined") {
            wxCallBack.mAdId = String(launch["query"]["adid"]);
        }
    }

    /* 处理分享标签 */
    private dealSurl(launch: Object) {
        if (typeof (launch["query"]) != "undefined" && typeof (launch['query']['surl']) != "undefined") {
            wxCallBack.mSurl = launch['query']['surl'];
        }
    }

    /* 游戏一些常规设置 */
    private onGameSetting(): void {
        Laya.Browser.window.sharedCanvas.width = Laya.stage.width;
        Laya.Browser.window.sharedCanvas.height = Laya.stage.height;

        var info = wx.getSystemInfoSync();
        Main.app.mSDKVersion = info['SDKVersion'];
        Main.app.mScreenHeight = Number(info['screenHeight']);
        Main.app.mScreenWidth = Number(info['screenWidth']);
        Main.app.mSystem = info['system'];
        Main.app.mVersion = info['version'];
        wx.setKeepScreenOn({ keepScreenOn: true });
        wx.showShareMenu({ withShareTicket: true });
    }

    /* 处理分享操作 */
    private checkShareAction(): void {
        var currentTimestamp = new Date().getTime();
        var limit: number = 3000;
        if (Main.app.mwx.shareTimeArray.length > Main.app.shareTimes) {
            limit = Number(Main.app.mwx.shareTimeArray[Main.app.shareTimes]);
        }
        if (currentTimestamp - Main.app.shareTimestamp < limit) {
            // 重置标记
            if (Main.app.shareIndex == 17) {
                let data = {}
                data['uid'] = Main.app.mwx.mUID
                data['from_type'] = 1
                data['is_sucess'] = 0
                util.server('free_pet', null, data)
            }
            // if (Main.app.shareIndex == 16){
            //     let data = {}
            //     data['uid'] = Main.app.mwx.mUID
            //     data['from_type'] = 1
            //     data['is_sucess'] = 0
            //     util.server('lucky_coin', null, data)
            // }
            Main.app.shareIndex = 0;
            Main.app.showMessage("分享到群生效");
            return;
        }
        // 分享成功的操作
        if (Main.app.shareIndex == 2) {
            // 分享增加一次任务次数
            module.RaceManager.instance.userInfo.addTaskCount(4);
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.DailyTaskShare, { "success": 1 });
        } else if (Main.app.shareIndex == 3) {
            // 分享获得双倍加速
            module.RaceManager.instance.event(module.RaceManager.SHARETOOPENJIASU);
        } else if (Main.app.shareIndex == 4) {
            // 分享获得喂食中的苹果
            module.RaceManager.instance.event(module.RaceManager.LOOKTOMEALAPPLE);
        } else if (Main.app.shareIndex == 5) {
            // 分享获得签到的第二份礼物
            module.RaceManager.instance.event(module.RaceManager.LOOKTOSECONDGIFE);
        } else if (Main.app.shareIndex == 6) {
            // 分享获得首页悬浮宝箱的金币
            this.handeleGetCoinsByShare();
        } else if (Main.app.shareIndex == 7) {
            // 分享获得离线奖励的金币
            module.RaceManager.instance.event(module.RaceManager.LOOKTODOUBLEOFFAWARD);
        } else if (Main.app.shareIndex == 8) {
            // 埋点统计 比赛结束的分享
            Main.app.mwx.dataLog(dtLogConfig.RaceResultShare, { "success": 1 });
        } else if (Main.app.shareIndex == 10) {
            // 分享获得免费开蛋
            module.RaceManager.instance.event(module.RaceManager.OPENEGGFREE);
        } else if (Main.app.shareIndex == 11) {
            // 埋点统计 邀请好友 获得羽毛
            Main.app.mwx.dataLog(dtLogConfig.FeatherInviteFriend, { "type": 0 });
        } else if (Main.app.shareIndex == 12) {
            // 获得新蛋分享得金币
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(0, 0), 2, 30]);
            module.RaceManager.instance.event(module.RaceManager.CLOSEEGGOPENING);
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.GetNewEggShare, { "success": 1 });
        } else if (Main.app.shareIndex == 13) {
            // 每日登陆通过分享获得羽毛
            module.RaceManager.instance.event(module.RaceManager.GET_DAILY_REWARD);
        } else if (Main.app.shareIndex == 14) {
            // 金币不足时免费领取金币
            Main.app.coinsLackingView.getCoins();
        } else if (Main.app.shareIndex == 15) {
            // 羽毛不足时免费领取羽毛
            Main.app.featherLackingView.getFeather();
        } else if (Main.app.shareIndex == 16) {
            // 幸运弹窗领取金币
            // let data = {}
            // data['uid'] = Main.app.mwx.mUID
            // data['from_type'] = 1
            // data['is_sucess'] = 1
            // util.server('lucky_coin', null, data)
            Main.app.luckView.getCoins();
        } else if (Main.app.shareIndex == 17) {
            module.RaceManager.instance.event(module.RaceManager.GTE_CHICKEN);
            let data = {}
            data['uid'] = Main.app.mwx.mUID
            data['from_type'] = 1
            data['is_sucess'] = 1
            util.server('free_pet', null, data)
        }else if(Main.app.shareIndex == 18){
             module.RaceManager.instance.event(module.TimeRewardDialog.GET_ICON);
        }
        // 重置标记
        Main.app.shareIndex = 0;
    }

    /* 处理分享获得金币（首页悬浮的宝箱每天通过分享获得的次数为5次） */
    private handeleGetCoinsByShare(): void {
        // 获取当前分享的次数
        var curTimes: number = 0;
        var saveTime: string = wx.getStorageSync(Main.DianDianChongWu_NowDay4);
        if (saveTime == Main.app.mwx.nowday) {
            var storageTimes: number = wx.getStorageSync(Main.DianDianChongWu_GetCoinsByShare_Times);
            if (!!storageTimes) curTimes = storageTimes;
        } else {
            wx.setStorageSync(Main.DianDianChongWu_NowDay4, Main.app.mwx.nowday);
            wx.setStorageSync(Main.DianDianChongWu_GetCoinsByShare_Times, 0);
        }
        // 是否还有通过分享获得的次数
        if (curTimes < 5) {
            module.RaceManager.instance.event(module.RaceManager.LOOKTOCOUNTGOLD);
            curTimes += 1;
            wx.setStorageSync(Main.DianDianChongWu_GetCoinsByShare_Times, curTimes);
        }
        // 5次之后移除悬浮按钮
        if (curTimes >= 5) {
            module.RaceManager.instance.event(module.RaceManager.CLOSEFLYVIDOEITEM);
        }
    }
}
