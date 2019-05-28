
import HttpRequest = Laya.HttpRequest;

class wxMinPro {
    public isFirstLaunch: boolean = false; // 是否是第一次登录游戏
    public nowday: string = ""; // 服务器返回当天0点的时间戳
    public mOpenid: string = "";
    public mUID: number = 0;
    public mADKeep: number = 0;
    public mCards: number = 0; //复活卡
    public mCards_max: number = 5;
    public m_getChicken: number = 49//zxx 领取哪个小鸡
    public m_getChickenTime: number = 0 //zxx 上次领取小鸡的时间
    public m_strAllUserData: string = null
    //今日分享拿到金币的次数
    public m_nShareCountTimes: number = 0
    //上次分享拿金币拿满5次的时间
    public m_tEnoughTime: Date
    //已经开启蛋的次数
    public m_nOpenEggTimes = 0
    // 充值所得物品数量
    public mDiamonds = 0
    //是否没有初始时间
    public isNoTime = true;
    //今日是否重置时间
    public IsRestFlyBoxTime = 0
    public startCoins
    //存放user_data
    public userdataDic: Laya.Dictionary = new Laya.Dictionary()

    public statUrl: string = '';                 //统计url
    public mHttpCall: HttpRequest = null;
    public urlConfig = {

        'app': { url: `1.0.1/cw/login?`, key: '1.0.1' },

        'check': { url: `1.0.1/cw/check?`, key: '1.0.1' },
        'login': { url: `1.0.1/cw/login?`, key: '1.0.1' },
        'login2': { url: `1.0.1/cw/login2?`, key: '1.0.1' },
        "report": { url: "1.0.1/cw/report?", key: "1.0.1" },
        "addCard": { url: "1.0.1/cw/addCard?", key: "1.0.1" },
        "queryCards": { url: "1.0.1/cw/queryCards?", key: "1.0.1" },
        "data": { url: "1.0.1/cw/data?", key: "1.0.1" },
        "challenge": { url: "1.0.1/cw/challenge?", key: "1.0.1" },
        "rank": { url: "1.0.1/cw/rank?", key: "1.0.1" },
        "addMyCard": { url: "1.0.1/cw/addMyCard?", key: "1.0.1" },
        "mymark": { url: "1.0.1/cw/mymark?", key: "1.0.1" },
        "ad": { url: "1.0.1/cw/ad?", key: "1.0.1" },
        "GetUserQD": { url: "1.0.1/cw/GetUserQD?", key: "1.0.1" },
        "SetUserQD": { url: "1.0.1/cw/SetUserQD?", key: "1.0.1" },
        "OverTask": { url: "1.0.1/cw/OverTask?", key: "1.0.1" },
        "Coins": { url: "1.0.1/cw/Coins?", key: "1.0.1" },
        "TaskAdd": { url: "1.0.1/cw/TaskAdd?", key: "1.0.1" },
        "GetMyShare": { url: "1.0.1/cw/GetMyShare?", key: "1.0.1" },
        "shareIn": { url: "1.0.1/cw/shareIn?", key: "1.0.1" },
        "SetUserValue": { url: "1.0.1/tcw/SetUserValue?", key: "1.0.1" },
        "BuyItem": { url: "1.0.1/cw/BuyItem?", key: "1.0.1" },
        "UseItem": { url: "1.0.1/cw/UseItem?", key: "1.0.1" },
        "ChangeTCt": { url: "1.0.1/cw/ChangeTCt?", key: "1.0.1" },
        "AddShareQ": { url: "1.0.1/cw/AddShareQ?", key: "1.0.1" },
        "BtnTotle": { url: "1.0.1/cw/BtnTotle?", key: "1.0.1" },
        "TaskRef": { url: "1.0.1/cw/TaskRef?", key: "1.0.1" },
        "ItemTotle": { url: '1.0.1/cw/ItemTotle?', key: "1.0.1" },
        "lauch": { "url": "1.0.1/cw/lauch?", "key": "1.0.1", "tips": "游戏启动必然调用的接口" },
        "PrePay": { url: '1.0.1/cw/PrePay?', key: "1.0.1" },
        "shareInFriend": { url: "1.0.1/cw/shareInFriend?", key: "1.0.1" },



    }
    public mLoginType: number = 0;  // 0 - 使用check进行登陆(可能是首次), 1 - 不用check直接登陆.
    public mUser: Object = {};
    public mSaveImage: string = "";
    public mLaunch: Object = null;
    //当前挑战的题目--只有返回了才会改
    public mrelayID: number = 0;
    public mChallengeID: number = 0;
    //当前分享的题目--只要有新题出来，都会改
    public mShareID: number = 0;
    public mChallenge: Object = null;
    public mMarks: Array<number> = [0, 0, 0, 0];

    public mQR: number = 0;
    public mQRs: Object = {};

    public mLogined: boolean = false;
    // 分享开关
    public mFHKeep: boolean;
    // 首页按钮未加载完成时禁用
    public buttonType: boolean = false;
    // 更多游戏列表
    public mMoreGames: Array<any> = [];
    // 随机展示广告
    public btnMoreGame: Object = {};
    // 复活卡数量
    public rebirthCardNum: number = 0;
    // 游戏进行中的 音乐控制---false非游戏中退出,true游戏中退出
    public gameMusicControl = false;
    // onshow执行了没
    public showType: boolean = false;
    // 分享进入 识别
    public surl = null

    // 用户皮肤
    public userSkin: number = null;

    // 皮肤状态列表

    // 分享文案图片
    public shareurl: Array<any> = []
    // 人物无敌
    public wudi: boolean = false

    // 每日邀请用户列表
    public userShares = null
    // 每日任务 情况
    public taskInfo = null
    // 用户道具总列表
    public toolList = null
    // 金币加成
    public jbjc: number = 1
    // 分数加成
    public fsjc: number = 1
    //开局使用道具
    public openSth = 1//1:金币卡2：分数卡3：美猴王体验卡
    // 中间开始标记
    public zjMark: number = 0
    public refCallCt: number = 0;
    public lastCall: Object = null;
    // 体验标记
    public tyType: boolean = false;
    public tyNum: number = 1;
    // 礼包红点控制
    public getlb: boolean = false
    /**
         * 是否调用隐藏banner
         */
    public mIsInvokeRemoveCustomBannerAd: boolean = false;

    /**
     * 默认banner
     */
    public mCustomBanner: Laya.Image = null;

    public mCustomBannerAdList = null
    public mOnOff = null
    public mWeiXinVersion = null
    public mReturnAppid = null
    public mReturnUrl = null
    // 小游戏跳转开关
    public jumpType: boolean = false
    public isTheGame = false
    // 游戏标识
    public GameId = null
    //菜单位置
    public menuLayout = null
    // 月亮皮肤列表
    public ylSkin = [0, 12, 14, 5, 8, 20, 9, 16]
    // 游戏盒子
    public games_box: Array<any> = [];
    public firstShareArr: Array<any> = []
    public newUser: boolean = false

    // 开启方式列表
    public OpenEggTypeList: Array<any> = []

    // 开启方式列表
    public ShopPrize: Laya.Dictionary = new Laya.Dictionary();

    public boxList: Laya.Dictionary = new Laya.Dictionary();
    //视频播放状态
    public avShowType: boolean = true;

    //离线收益每分钟的金币
    public nOffLineCoins: number = 0;
    //离线收益总时间
    public nOffLineTimes: number = 0;
    //收益衰弱开始的金币数
    public nBeginDecodeNums: number = 0;
    //双倍效率加速时间
    public nDoubleSpeedTime: number = 0;

    public PointFirst: any;                   // 是否是新用户 
    public onoff: Array<any> = [];         // 开关数组
    public ofOpenBox: number = 0;          // 游戏盒子开关
    public ofOpenBoxParam: Object = null;  // 游戏盒子开关参数

    public openEggFree: number = 0;  // 每日免费开蛋次数
    public shareTimeArray: Array<any> = []; // 分享的时间限制数组 

    public fhOnOff: number = 0;    // 总开关 审核版本为0 正式上线为1
    public ofCoinsBox: number = 0; // 大量金币宝箱的开关（首页悬浮）
    public ofSignTwice: number = 0; // 每日签到第二份礼物的开关
    public ofOfflineReword: number = 0; // 离线奖励开关
    public ofDoubleReword: number = 0;  // 双倍效率开关
    public ofFeedPat: number = 0;  // 喂宠物
    public ofLoginReward: number = 0; // 每日领取羽毛的开关
    public ofLoginRewardParam: Object = null;
    public ofCoinsLess: number = 0; // 金币不足的开关
    public ofCoinsLessParam: Object = null;
    public ofFeatherLess: number = 0; // 羽毛不足的开关
    public ofFeatherLessParam: Object = null;
    public ofLuck: number = 0; // 幸运弹窗开关
    public ofLuckCount: number = 0;
    public ofLuckParam: Object = null;
    public ofIconTime: number = 0; // 导流icon多少s后切换游戏
    public ofGetType: number //领取鸡崽子方式
    public ofBuyScene: number = 0;
    public ofOlineType: number = 0
    public ofItemCost: number = 30
    public ofDiscount: number = 0
    public ofBack: number = 0
    public ofMoveAni: number = 0
    public ofMoveAniTime: number = 5

    public ofAdSize
    public ofOpenType: number // 开鸡蛋的方式
    public ofStartFeaStartNumther: Object = null//初始羽毛设置

    public itemList: Array<Object> = []; // 道具列表
    public firstGoods: Object = null;    // 一元好礼商品
    public secondGoods: Object = null;   // 折扣优惠商品
    // 数据埋点接口相关属性
    public dtValues: Array<Object> = [];
    public dtLogUrl: string = "";

    constructor() {
        this.initWX();
    }

    /* 右上角菜单 */
    public initWX(): void {
        this.getLoginServer()

    }
    public getLoginServer() {
        var params: Object = [];
        params['openid'] = "001"
        //  BridgeUtil.callAppMethod("getOpenId");
        this.appServer(Main.app.urlConfig[`app`], params, this.onLaunchSuccess);
    }

    /* 网络请求 */
    public appServer(rpc: Object, params: any, callback: Function, ecbck: Function = null): void {
        this.mHttpCall = new Laya.HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, onHttpRequestError);

        let str = util.getServer() + rpc['url'] + util.getUrlParams(params, rpc['key']);
        console.log(str)
        this.mHttpCall.send(str, null, 'get', 'text');

        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string") {
                ret = util.getJSON(e);
            } else {
                ret = util.getJSON(Main.app.mwx.mHttpCall.data);
            }
            if (callback != null) callback(ret);
            this.mHttpCall = null;
        }
        function onHttpRequestError(e: any): void {
            if (ecbck != null) {
                ecbck();
            }
            this.mHttpCall = null;
        }
    }
    /**
     * 游戏启动必然调用的一个接口
     */
    public onLauch(isFirstLoad: boolean = true): void {
        Main.app.mwx.isFirstLaunch = isFirstLoad;
        let params: Object = {};
        params['platform'] = (wxCore.uo.mPhone["platform"] == "ios") ? 2 : 1;
        params['uid'] = wxCore.uo.mWeUser['uid'];
        params['name'] = Base64.encodeURI(wxCore.uo.mWeUser['nickName']);
        params['avatar'] = Base64.encodeURI(wxCore.uo.mWeUser['avatarUrl']);
        params['ver'] = Main.app.currentversion;
        if (wxCallBack.mAdId != "") params['adid'] = wxCallBack.mAdId;
        if (wxCallBack.mSurl != "") params['surl'] = wxCallBack.mSurl;
        if (typeof (wxCore.uo.launch()['query']['uid']) != "undefined") {
            params['target'] = wxCore.uo.launch()['query']['uid'];
            params['seuid'] = wxCore.uo.launch()['query']['uid'];
        }
        if (typeof (wxCore.uo.launch()['query']['type']) != "undefined") {
            params['type'] = wxCore.uo.launch()['query']['type'];
        }
        if (typeof (wxCore.uo.launch()['query']['id']) != "undefined") {
            params['id'] = wxCore.uo.launch()['query']['id'];
        }
        Main.app.mwx.server(Main.app.mwx.urlConfig[`lauch`], params, Main.app.mwx.onLaunchSuccess, null);
    }

    /* 登录成功 */
    private onLaunchSuccess(ret): void {
        console.log("登录成功：", ret);
        // 处理数据
        Main.app.mwx.onLoginResult(ret);
        // 处理第一次进入游戏的情况
        if (Main.app.mwx.isFirstLaunch && Main.app.is_wx) {
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.EnterGame, { "load": 0 });
            // 初始化视频广告
            wxCore.uo.initVideoAD("adunit-88d2e662d3940515");
            // 加载资源
            Main.app.loadResource();
        }
    }

    /* 处理登录后服务器返回的数据 */
    private onLoginResult(ret: any) {
        if (ret["code"] == 0) {
            Main.app.mwx.buttonType = true;
            Main.app.mwx.nowday = String(ret["nowday"]);
            Main.app.mwx.fhOnOff = Number(ret["fh_onoff"]);
            Main.app.mwx.onoff = ret["on_off"];
            Main.app.mwx.checkOnOff();
            Main.app.mwx.dtValues = ret["dt_values"];
            Main.app.mwx.checkDTValues();
            Main.app.mwx.toolList = ret["item_list"];
            Main.app.mwx.checkShopList();

            if (ret['nowday'] == ret['regday']) {
                Main.app.mwx.PointFirst = '新用户'
            } else {
                Main.app.mwx.PointFirst = '老用户'
            }
            Main.app.mwx.statUrl = ret["dt_values"][0]['param'];
            Main.app.mwx.GameId = ret[`gameid`];

            Main.app.mwx.mUID = ret['uid'];
            Main.app.mwx.mUser[`coins`] = ret[`coins`]
            Main.app.mwx.userShares = ret[`user_shares`]
            Main.app.mwx.taskInfo = ret[`task_info`]
            Main.app.mwx.games_box = ret[`games_box`]
            Main.app.mwx.mCustomBannerAdList = ret[`games_ad`]

            Main.app.mwx.mMarks[0] = Number(ret['marks']['mark']);
            Main.app.mwx.mMarks[1] = Number(ret['marks']['mark1']);
            Main.app.mwx.mMarks[2] = Number(ret['marks']['mark2']);
            Main.app.mwx.mMarks[3] = Number(ret['marks']['mark3']);
            Main.app.mwx.mUser['mark'] = Math.floor(Main.app.mwx.mMarks[0]);

            // 设置用户默认皮肤
            ret["user_data"].forEach(item => {
                Main.app.mwx.userdataDic.set(item.key, item.values)
                if (item.key == "AllUserValue") {
                    if (!!item.values) {
                        Main.app.mwx.m_strAllUserData = item.values;
                    }
                }
                if (item.key == 'GetChichen') {
                    if (!!item.values) {
                        Main.app.mwx.m_getChicken = Number(item.values);
                    }
                }
                if (item.key == 'GetChickenTime') {
                    if (!!item.values) {
                        Main.app.mwx.m_getChickenTime = Number(item.values);
                    }
                }

                if (item.key == "IsRestFlyBoxTime") {
                    if (!!item.values) {
                        Main.app.mwx.IsRestFlyBoxTime = Number(item.values);
                    }
                }
                if (item.key == "LastEnoughTime") {
                    if (!!item.values) {
                        Main.app.mwx.m_tEnoughTime = item.values;
                        Main.app.mwx.isNoTime = false;
                        var prevDate: Date = new Date()
                        prevDate.setTime(Number(Main.app.mwx.m_tEnoughTime))

                        if (Main.app.mwx.userdataDic.get("IsRestFlyBoxTime") == 0 || Main.app.mwx.userdataDic.get("IsRestFlyBoxTime") == null) {
                            // 说明今天已经还没更改过次数
                        } else {
                            return;
                        }
                        var nowDate: Date = new Date();
                        if (prevDate.getUTCFullYear() < nowDate.getUTCFullYear()) {
                            Main.app.mwx.m_nShareCountTimes = 0
                            Main.app.mwx.SetUserValue("ShareCountTimes", 0)
                            Main.app.mwx.SetUserValue("IsRestFlyBoxTime", 1)
                        } else if (prevDate.getMonth() < nowDate.getMonth()) {
                            Main.app.mwx.m_nShareCountTimes = 0
                            Main.app.mwx.SetUserValue("ShareCountTimes", 0)
                            Main.app.mwx.SetUserValue("IsRestFlyBoxTime", 1)
                        } else {
                            if (prevDate.getDate() < nowDate.getDate()) {
                                Main.app.mwx.m_nShareCountTimes = 0
                                Main.app.mwx.SetUserValue("ShareCountTimes", 0)
                                Main.app.mwx.SetUserValue("IsRestFlyBoxTime", 1)
                            }
                        }
                    }
                }
                if (item.key == "ShareCountTimes") {
                    if (!!item.values) {
                        Main.app.mwx.m_nShareCountTimes = item.values;
                    }
                }
                if (item.key == "OpenEggTimes") {
                    if (!!item.values) {
                        Main.app.mwx.m_nOpenEggTimes = item.values;
                    }
                }


            });

            if (Main.app.mwx.isNoTime) {
                Main.app.mwx.m_tEnoughTime = new Date();
            }

            if (!Main.app.mwx.userSkin) {
                Main.app.mwx.userSkin = parseInt(ret['use_item']) + 2001
            }

            Main.app.mwx.itemList = ret["item_list"];
            Main.app.mwx.checkItem();
            Main.app.mwx.shareurl = ret[`shareurl`];

            // 广告开关
            Main.app.mwx.mADKeep = Number(ret['ad_onoff']);
            // 分享开关
            Main.app.mwx.mFHKeep = ret['fh_onoff'] == 1 ? true : false;
            // 更多游戏列表
            Main.app.mwx.mMoreGames = ret['games'];
            // 邀请礼
            // if (!!Main.app.mwx.mLaunch['query'][`Invite`]) {
            //     Main.app.mwx.shareIn(Main.app.mwx.mLaunch['query'][`uid`], Main.app.mwx.mLaunch['query'][`taskid`])
            // }
            Main.app.initGame()
        }
    }

    /* 处理游戏道具列表 */
    private checkItem(): void {
        for (var i = 0; i < Main.app.mwx.itemList.length; i++) {
            var item: Object = Main.app.mwx.itemList[i];
            if (Number(item["id"]) == 9001) {
                Main.app.mwx.firstGoods = item;  // 一元好礼商品
            } else if (Number(item["id"]) == 9002) {
                Main.app.mwx.secondGoods = item; // 打折优惠的商品
            } else {
                // 先不处理
            }
        }
    }

    /* 处理商店商品信息 */
    private checkShopList(): void {
        Main.app.mwx.toolList.forEach(item => {
            Number(item.id) == 2101 ? Main.app.mwx.jbjc = (Number(JSON.parse(item.other)[`goldadd`]) + 100) / 100 : ''
            Number(item.id) == 2103 ? Main.app.mwx.fsjc = (Number(JSON.parse(item.other)[`numadd`]) + 100) / 100 : ''
            if (Number(item.id) > 8000 && Number(item.id) < 9000 && !!Number(item.gamebox)) {
                Main.app.mwx.OpenEggTypeList.push(item)
            }
            if (Number(item.id) > 3000 && Number(item.id) < 4000 && !!Number(item.gamebox)) {
                item[`other`] = JSON.parse(item[`other`])
                let obj = {}
                obj[`itemid`] = item[`other`][`use_item`]
                obj[`count`] = item[`other`][`count`]
                obj[`id`] = item[`id`]
                Main.app.mwx.ShopPrize.set(obj[`id`], obj);
            }
            if (Number(item.id) > 5000 && Number(item.id) < 6000 && !!Number(item.gamebox)) {
                item[`other`] = JSON.parse(item[`other`])
                let obj = {}
                obj[`itemid`] = item[`other`][`itemid`]
                obj[`gamebox`] = item[`gamebox`]
                obj[`id`] = item[`id`]
                Main.app.mwx.boxList.set(item[`other`][`num`], obj)
            }
            if (Number(item.id) == 7004) {
                item['other'] = JSON.parse(item['other'])
                Main.app.mwx.nOffLineTimes = item['other']['time']
            }
            if (Number(item.id) == 7003) {
                item['other'] = JSON.parse(item['other'])
                Main.app.mwx.nOffLineCoins = item['other']['coins']
            }
            if (Number(item.id) == 7002) {
                var other: Object = JSON.parse(item['other']);
                Main.app.mwx.nBeginDecodeNums = Number(other['coins']);
            }
            if (Number(item.id) == 7001) {
                item['other'] = JSON.parse(item['other'])
                Main.app.mwx.nDoubleSpeedTime = item['other']['time']
            }
        });
    }


    /* 处理启动参数 */
    public dealQuery(res: any): void {
        console.log("启动参数 = ", res);
        Main.app.mwx.mLaunch = res;
        if (!!res['query']['Invite'] && Main.app.mwx.mUID > 0) {
            Main.app.mwx.shareIn(res['query']['uid'], res['query']['taskid']);
        }
    }

    /* 增加用户任务完成次数 */
    public TaskAdd(taskId, type = 0, taskcount = 1): void {
        let params: Object = [];
        params['uid'] = Main.app.mwx.mUID;
        params[`taskid`] = taskId;
        params[`taskcount`] = taskcount;
        Main.app.mwx.server(Main.app.mwx.urlConfig[`TaskAdd`], params, onResult);

        function onResult(ret: any): void {
            if (ret['code'] == 0) {
                for (let i = 0; i < Main.app.mwx.taskInfo.length; i++) {
                    if (Main.app.mwx.taskInfo[i][`id`] == taskId) {
                        Main.app.mwx.taskInfo[i][`over_count`] = taskcount != 1 ? taskcount : parseInt(Main.app.mwx.taskInfo[i][`over_count`]) + taskcount
                    }
                }
            }
        }
    }

    private checkOnOff(): void {
        for (var i = 0; i < Main.app.mwx.onoff.length; i++) {
            var obj: Object = Main.app.mwx.onoff[i];
            if (obj["key"] == "of_open_box") {
                Main.app.mwx.ofOpenBox = Number(obj["value"]);
                Main.app.mwx.ofOpenBoxParam = JSON.parse(String(obj["param"]));
            } else if (obj["key"] == "of_open_egg") {
                var param: Object = JSON.parse(String(obj["param"]));
                Main.app.mwx.openEggFree = Number(param["time"]);
            } else if (obj["key"] == "of_share_time" && Number(obj["value"]) == 1) {
                Main.app.mwx.shareTimeArray = String(obj["param"]).split(",");
            } else if (obj["key"] == "of_coins_box") {
                Main.app.mwx.ofCoinsBox = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
            } else if (obj["key"] == "of_sign_twice") {
                Main.app.mwx.ofSignTwice = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
            } else if (obj["key"] == "of_offline_reword") {
                Main.app.mwx.ofOfflineReword = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
            } else if (obj["key"] == "of_double_reword") {
                Main.app.mwx.ofDoubleReword = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
            } else if (obj["key"] == "of_feed_pat") {
                Main.app.mwx.ofFeedPat = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
            } else if (obj["key"] == "of_login_reword") {
                Main.app.mwx.ofLoginReward = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
                Main.app.mwx.ofLoginRewardParam = JSON.parse(String(obj["param"]));
            } else if (obj["key"] == "of_gold_less") {
                Main.app.mwx.ofCoinsLess = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
                Main.app.mwx.ofCoinsLessParam = JSON.parse(String(obj["param"]));
            } else if (obj["key"] == "of_feather_less") {
                Main.app.mwx.ofFeatherLess = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
                Main.app.mwx.ofFeatherLessParam = JSON.parse(String(obj["param"]));
            } else if (obj["key"] == "of_icon_time") {
                var param: Object = JSON.parse(String(obj["param"]));
                Main.app.mwx.ofIconTime = Number(param["time"]) * 1000;
            } else if (obj["key"] == "of_click_coins") {
                Main.app.mwx.ofLuck = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
                Main.app.mwx.ofLuckParam = JSON.parse(String(obj["param"]));
                Main.app.mwx.ofLuckCount = Number(Main.app.mwx.ofLuckParam["click"]);
            } else if (obj["key"] == "of_icon_get") {
                Main.app.mwx.ofGetType = Number(obj["value"]);
            } else if (obj["key"] == "of_open_feather") {
                Main.app.mwx.ofOpenType = Number(obj["value"])
                Main.app.mwx.ofStartFeaStartNumther = JSON.parse(String(obj["param"]))
            } else if (obj["key"] == "of_ad_size") {
                Main.app.mwx.ofAdSize = Number(JSON.parse(String(obj["param"]))['size'])
            } else if (obj["key"] == 'of_buy_scene') {
                Main.app.mwx.ofBuyScene = Number(obj["value"]);
            } else if (obj["key"] == "of_start_coins") {
                Main.app.mwx.startCoins = Number(JSON.parse(String(obj["param"]))['coins'])
            } else if (obj["key"] == "of_online_rewards") {
                Main.app.mwx.ofOlineType = Number(obj["value"])
            } else if (obj["key"] == 'of_item_cost') {
                Main.app.mwx.ofItemCost = Number(JSON.parse(String(obj["param"]))['gold'])
            } else if (obj["key"] == 'of_discount') {
                Main.app.mwx.ofDiscount = Number(obj["value"])
            } else if (obj["key"] == 'of_background') {
                Main.app.mwx.ofBack = Number(obj["value"])
            } else if (obj["key"] == 'of_sidebar_cartoon') {
                Main.app.mwx.ofMoveAni = Number(obj["value"])
                Main.app.mwx.ofMoveAniTime = Number(JSON.parse(String(obj["param"]))['time'])
            }
        }
    }

    private checkDTValues(): void {
        for (var i = 0; i < Main.app.mwx.dtValues.length; i++) {
            var item: Object = Main.app.mwx.dtValues[i];
            if (item["key"] == "dt_log_url") {
                Main.app.mwx.dtLogUrl = String(item["param"]);
            }
        }
    }

    /* 更多好玩的游戏 */
    public initMore(btn: Laya.Image, type: string, isIndex: boolean = false): void {
        let obj = MoreGame.GetIndexRandom(Main.app.mwx.games_box);
        if (!!obj) {
            btn.name = obj.gameid;
            if (isIndex) {
                btn.skin = obj.url_btn;
                btn.visible = true;
            } else {
                btn.skin = obj.url_result;
            }
        } else {
            btn.visible = false;
            btn.skin = "";
        }
    }

    /* 获取需要展示的更多好玩游戏 */
    public getMoreUrl(id: string): Object {
        for (var i = 0; i < Main.app.mwx.games_box.length; i++) {
            if (Number(id) == Number(Main.app.mwx.games_box[i]['gameid']))
                return Main.app.mwx.games_box[i];
        }
        return null;
    }

    /* 更多好玩游戏点击统计 */
    public reportADHit(id: string): void {
        let params: Object = [];
        params['uid'] = Main.app.mwx.mUID;
        params['id'] = id;
        Main.app.mwx.server(Main.app.mwx.urlConfig["data"], params, null);
    }

    /* banner广告点击统计 */
    public reportData(type: number): void {
        let params: Object = [];
        params['uid'] = Main.app.mwx.mUID;
        params['type'] = type;
        Main.app.mwx.server(Main.app.mwx.urlConfig["ad"], params, null);
    }

    /* 获取用户签到情况 */
    public GetUserQD(type = true): void {
        wx.showLoading({
            title: "正在加载...",
            mask: 'ture',
        });

        let params: Object = [];
        params['uid'] = Main.app.mwx.mUID;
        Main.app.mwx.server(Main.app.mwx.urlConfig["GetUserQD"], params, onResult);

        function onResult(ret: any): void {
            if (ret['code'] == 0) {
                Main.app.mwx.mUser["toQd"] = true;
                for (let k in ret["qd"]) {
                    if (!!k.split('_')[1] && k.split('_')[1].length == 1) {
                        ret["qd"][k] == ret[`nowDay`] ? Main.app.mwx.mUser[`toQd`] = false : ''
                    }
                }
                // 获取签到天数
                let day;
                for (let k in ret["qd"]) {
                    if (ret["qd"][k] == ret["nowDay"]) {
                        day = k.split('_')[1];
                    }
                }
                // 没签到则展示签到界面
                if (!Main.app.mwx.mUser[`toQd`]) {
                    if (!!type) {
                        console.log(`gameClub.hide1`)
                    }
                }
                Main.app.mwx.buttonType = true;
                wx.hideLoading({});
            }
        }
    }

    /* 获取邀请关系 */
    public NewGetMyShare(): void {
        let params: Object = [];
        params["uid"] = Main.app.mwx.mUID;
        Main.app.mwx.server(Main.app.mwx.urlConfig["GetMyShare"], params, onResult);

        function onResult(ret: any): void {
            if (ret["code"] == 0) {
                var length = 0;
                Main.app.mwx.userShares = Number(ret["data"]);
                if (Main.app.mwx.userShares >= 50) {
                    length = 50
                } else if (Main.app.mwx.userShares > 0 && Main.app.mwx.userShares < 50) {
                    length = Main.app.mwx.userShares
                }
                module.RaceManager.instance.userInfo.invitationCount = length;
            }
        }
    }

    /* 建立邀请关系 */
    public shareIn(fid, taskid): void {
        let params: Object = [];
        params['uid'] = Main.app.mwx.mUID;
        params['fid'] = fid;
        params["taskid"] = 101;
        Main.app.mwx.server(Main.app.mwx.urlConfig["shareInFriend"], params, null);
    }

    /* 服务器存值 */
    public SetUserValue(key, value): void {
        let params: Object = [];
        params['uid'] = Main.app.mwx.mUID;
        params['dt_key'] = key;
        params['dt_value'] = value;
        Main.app.mwx.server(Main.app.mwx.urlConfig['SetUserValue'], params, null);
    }

    /* 数据埋点统计 */
    public dataLog(keyname: string, clos: Object): void {
        let mobile = (wxCore.uo.mPhone["platform"] == "ios") ? 2 : 1;
        let urlStr = Main.app.mwx.dtLogUrl;
        urlStr += "&platform=5";
        urlStr += "&uid=" + Main.app.mwx.mUID;
        urlStr += "&login_session=" + Main.app.mSession;
        urlStr += "&now_time=" + new Date().getTime();
        urlStr += "&mobile=" + mobile;
        urlStr += "&keyname=" + keyname.trim();
        urlStr += "&clos=" + JSON.stringify(clos);

        var request = new Laya.HttpRequest();
        request.once(Laya.Event.COMPLETE, Main.app.mwx, onResult);
        request.once(Laya.Event.ERROR, Main.app.mwx, onHttpRequestError);
        request.send(urlStr, null, 'get', 'text');
        function onResult(e: any): void {
            request = null;
        }
        function onHttpRequestError(e: any): void {
            request = null;
        }
    }

    /* 视频广告信息 */
    public getAvObj(wxadurl): void {
        wxadurl.forEach(item => {
            item.id == 1 ? Main.app.adArr[`main`][`banner`] = item[`unitid`] :
                item.id == 12 ? Main.app.adArr[`main`][`videoAd`] = item[`unitid`] : ""
        });
        Main.app.mwx.loadAv(Main.app, Main.app.adArr[`main`][`videoAd`])
    }

    /* 初始化视频 */
    public loadAv(that, code): void {
        that = Main.app
        if (Main.app.mSDKVersion >= "2.0.4") {
            try {
                that[`videoAd`] = wx.createRewardedVideoAd({
                    adUnitId: Main.app.adArr[`main`][`videoAd`]
                });
                that[`videoAd`].onError(function (res) {
                    console.log(res.errMsg);
                    that[`videoAd`] = null;
                });
                that[`videoAd`].load();
            }
            catch (err) {
                console.log("读取广告失败");
                that[`videoAd`] = null;
            }
        }
    }

    /* 看视频回调 */
    public showingAv(that, shareBack: Laya.Handler, callBack: Laya.Handler, callBack2: Laya.Handler = null, callBack3: Laya.Handler = null): void {
        if (!Main.app.mwx.avShowType) {
            return;
        }
        Main.app.mwx.avShowType = false;
        // 延迟0.5s是因为广告还没有完全onClose的时候再次点击播放视频，会导致视频广告show不出来。
        Laya.timer.once(500, Main.app.mwx, Main.app.mwx.showingVideo, [that, shareBack, callBack, callBack2, callBack3]);
    }

    private showingVideo(that, shareBack: Laya.Handler, callBack: Laya.Handler, callBack2: Laya.Handler = null, callBack3: Laya.Handler = null): void {
        if (Main.app.mSDKVersion >= "2.0.4" && !!Main.app["videoAd"]) {
            try {
                Main.app["videoAd"].show(() => {

                }).catch(err => function () {
                    Main.app.mwx.avShowType = true;
                    if (!!shareBack.method) {
                        shareBack.run();
                    } else {
                        Main.app.showMessage("视频获取失败");
                    }
                });
            } catch (err) {
                Main.app.mwx.avShowType = true;
                if (!!shareBack.method) {
                    shareBack.run();
                } else {
                    Main.app.showMessage("视频获取失败");
                }
            }
            Main.app["videoAd"].onError(() => {
                Main.app.mwx.avShowType = true;
                if (!!shareBack.method) {
                    shareBack.run();
                } else {
                    Main.app.showMessage("视频获取失败");
                }
            });
            Main.app["videoAd"].onClose((res) => {
                Main.app.mwx.avShowType = true;
                if (Main.app.mSDKVersion >= "2.1.0") {
                    if (res["isEnded"] == true) {
                        callBack.run();
                        Main.app["videoAd"].offClose();
                    } else {
                        Main.app["videoAd"].offClose()
                        if (!!callBack2) {
                            callBack2.run();
                        }
                    }
                } else {
                    callBack.run();
                    Main.app["videoAd"].offClose();
                }
            });
        } else {
            Main.app.mwx.avShowType = true;
            if (!!shareBack.method) {
                shareBack.run();
            } else {
                Main.app.showMessage("视频获取失败");
            }
            if (!!callBack3) {
                callBack3.run();
            }
        }
    }

    /* 展示banner广告 */
    public showBanner(): void {
        let that = Main.app
        // banner条广告
        console.log(Main.app.mSDKVersion);
        if (Main.app.mSDKVersion >= "2.0.4") {
            console.log(Main.app.mSDKVersion);
            if (that[`banner`] == null) {
                that[`banner`] = wx.createBannerAd({
                    adUnitId: Main.app.adArr[`main`][`banner`],
                    style: {
                        left: 0,
                        top: Main.app.mScreenHeight - 107,
                        width: Main.app.mScreenWidth * Main.app.mwx.ofAdSize
                    }
                });
                let top = Main.app.mScreenHeight == 812 ? 20 : 0
                that[`banner`].onResize(res => {
                    that[`banner`].style.top = Main.app.mScreenHeight - that[`banner`].style.realHeight - top;
                    that[`banner`].style.left = (Main.app.mScreenWidth - that[`banner`].style.realWidth) / 2;
                });
                that[`banner`].onLoad(() => {
                    console.log('banner 广告加载成功4');
                    Main.app.mwx.reportData(0);
                });
                that[`banner`].onError(() => {
                    console.log(`banner加载失败`);
                    that[`banner`] = null
                    Laya.Handler.create(that, Main.app.mwx.addCustomBannerAd, [Main.app]).run()
                })

            }
            if (!Main.app.bannerShowType) {
                that[`banner`].show();
                that.bannerShowType = true
            }
        }
    }

    /* 关闭banner广告 */
    public closeBanner(): void {
        if (!!Main.app.bannerShowType) {
            if (!!Main.app.banner) {
                Main.app.banner.hide();
            }
            Main.app.bannerShowType = false
        }
        if (!!Main.app.mCustomBanner) {
            Main.app.mwx.removeCustomBannerAd(Main.app)
        }
    }

    /* 当微信banner广告为空时，显示自己的广告。 */
    public addCustomBannerAd(that): void {
        if (Main.app.mwx.mCustomBannerAdList.length == 0) {
            return;
        }
        let __this = that;
        __this.mIsInvokeRemoveCustomBannerAd = false;
        var index: number = Math.floor(Math.random() * Main.app.mwx.mCustomBannerAdList.length);
        var url: string = Main.app.mwx.mCustomBannerAdList[index]["url"];
        var appid: string = Main.app.mwx.mCustomBannerAdList[index]["appid"];
        var path: string = Main.app.mwx.mCustomBannerAdList[index]["path"];
        // 1->跳转小程序 0->不可跳转
        var third: number = Number(Main.app.mwx.mCustomBannerAdList[index]["third"]);
        var id: string = Main.app.mwx.mCustomBannerAdList[index]["id"];
        if (__this.mCustomBanner == null) {
            __this.mCustomBanner = new Laya.Image();
            __this.mCustomBanner.zOrder = 1000;
        }
        __this.mCustomBanner.loadImage(url, 0, 0, 0, 0, Laya.Handler.create(__this, () => {
            // 如果此时调用过隐藏banner函数，则不将banner添加到stage
            if (__this.mIsInvokeRemoveCustomBannerAd) {
                return;
            }
            __this.mCustomBanner.anchorX = 0.5;
            __this.mCustomBanner.x = Laya.stage.width / 2;
            __this.mCustomBanner.bottom = Main.app.mScreenHeight > 800 ? 34 : 0;
            __this.mCustomBanner.scaleX = (Laya.stage.width / __this.mCustomBanner.width);
            __this.mCustomBanner.scaleY = (Laya.stage.width / __this.mCustomBanner.width);
            Laya.stage.addChild(__this.mCustomBanner);
            __this.mCustomBanner.on(Events.CLICK, __this, Main.app.mwx.onCustomBannerClick, [third, id, appid, path]);
        }));
    }

    public onCustomBannerClick(third: number, id: string, appid: string, path: string, e: Laya.Event): void {
        e.stopPropagation();
        if (third == 0)
            return;
        let goAppid = path.split("=")[1]
        gameBox.showBoxPage(goAppid, Main.app.mwx.games_box, '宠物蛋蛋', 10000);
        return;
    }

    public removeCustomBannerAd(that): void {
        that.mIsInvokeRemoveCustomBannerAd = true;
        if (that.mCustomBanner != null) {
            that.mCustomBanner.off(Events.CLICK, that, that.onCustomBannerClick);
            Laya.stage.removeChild(that.mCustomBanner);
            that.mCustomBanner = null
        }
    }

    /* 和微信右上角按钮对齐 */
    public getMenuTop(btn): void {
        let get1 = () => {
            var h2 = Main.app.mScreenHeight / 1334;
            var w = Main.app.mScreenWidth / 750;
            if (Main.app.mScreenHeight != 812) {
                btn.y = 20 / h2 - 30;
            } else if (Main.app.mScreenHeight == 812) {
                btn.y = 94;
            }
        }
        if (Main.app.mSDKVersion < '2.1.0') {
            get1()
        } else {
            if (!Main.app.mwx.menuLayout) {
                Main.app.mwx.menuLayout = wx.getMenuButtonBoundingClientRect()
                console.log(Main.app.mwx.menuLayout)
            }
            if (!Main.app.mwx.menuLayout || !Main.app.mwx.menuLayout.top) {
                get1()
            } else {
                let h = Main.app.mwx.menuLayout.height;
                let t = Main.app.mwx.menuLayout.top;

                let center_y = (t + h / 2) * Laya.stage.height / wxCore.uo.mPhone['screenHeight'];
                btn.y = center_y - btn.height / 2;
            }
        }
    }

    /* 充值相关 */
    private mPayTryCount: number = 5;
    /* 充值成功，提交服务器加金币。 */
    public PrePay(rmb, success: Laya.Handler = null, fail: Laya.Handler = null) {
        function onResult(e: any): void {
            let ret: any = util.getJSON(e);
            console.log("充值结果 = ", ret);
            if (ret.code == 0) {
                wx.removeStorageSync("pay_rmb_list");
                Main.app.mwx.mPayTryCount = 5;
                Main.app.showMessage("充值成功+" + ret.addcoins + "羽毛");
                if (success) success.run();
                // 增加羽毛
                manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(0, 0), 3, Number(ret.addcoins)]);
            } else {
                if (Main.app.mwx.mPayTryCount > 0) {
                    Main.app.mwx.mPayTryCount -= 1;
                    Laya.timer.once(1500, Main.app.mwx, Main.app.mwx.PrePay, [rmb]);
                } else {
                    wx.removeStorageSync("pay_rmb_list");
                    Main.app.mwx.mPayTryCount = 5;
                    Main.app.showMessage("充值失败，请再次支付：" + ret.code);
                    if (fail) fail.run();
                }
            }
        }

        wx.setStorageSync("pay_rmb_list", rmb);
        var _HttpCall = null;
        _HttpCall = new HttpRequest();
        _HttpCall.once(Laya.Event.COMPLETE, Main.app.mwx, onResult);
        _HttpCall.once(Laya.Event.ERROR, Main.app.mwx, () => {
            console.log("回调失败");
        });
        wx.login({
            success: function (res) {
                let params: Object = [];
                params['uid'] = Main.app.mwx.mUID;
                params['code'] = res.code;
                params['itemid'] = rmb;
                let str = util.getServer() + Main.app.mwx.urlConfig["PrePay"]["url"] + util.getUrlParams(params, "1.0.1");
                _HttpCall.send(str, null, 'get', 'text');
            },
            fail(res) {
                () => {
                    console.log("支付后登录失败");
                }
            }
        });
    }

    /* 网络请求 */
    private server(rpc: Object, params: any, callback: Function, ecbck: Function = null): void {
        Main.app.mwx.mHttpCall = new Laya.HttpRequest();
        Main.app.mwx.mHttpCall.once(Laya.Event.COMPLETE, Main.app.mwx, onResult);
        Main.app.mwx.mHttpCall.once(Laya.Event.ERROR, Main.app.mwx, onHttpRequestError);

        let str = util.getServer() + rpc['url'] + util.getUrlParams(params, rpc['key']);
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

    /* 请求报错 */
    private onHttpRequestError(e: any): void {
        console.log("请求报错")
        wx.hideLoading({});
        Main.app.mwx.mHttpCall = null;
        console.log("onHttpRequestError:" + e);
    }

    /* 获取返回小程序appid */
    public initReturn(): void {
        var pid: string = Main.app.mwx.mLaunch['query']['pid'];
        if (pid == null || typeof (pid) == "undefined" || pid == "") {
            pid = laya.wx.mini.MiniLocalStorage.getItem("pid");
        }
        if (pid == null || typeof (pid) == "undefined" || pid == "") {
            Main.app.mwx.mReturnAppid = "";
            Main.app.mwx.mReturnUrl = "";
        } else {
            if (Number(pid) == 8) {
                Main.app.mwx.mReturnAppid = "";
                Main.app.mwx.mReturnUrl = "";
            } else {
                Main.app.mwx.mReturnAppid = pid;
                Main.app.mwx.mReturnUrl = "pages/index/index?";
            }
            laya.wx.mini.MiniLocalStorage.setItem("pid", Main.app.mwx.mReturnAppid);
        }
    }
}