var HttpRequest = Laya.HttpRequest;
var wxMinPro = /** @class */ (function () {
    function wxMinPro() {
        this.isFirstLaunch = false; // 是否是第一次登录游戏
        this.nowday = ""; // 服务器返回当天0点的时间戳
        this.mOpenid = "";
        this.mUID = 0;
        this.mADKeep = 0;
        this.mCards = 0; //复活卡
        this.mCards_max = 5;
        this.m_getChicken = 49; //zxx 领取哪个小鸡
        this.m_getChickenTime = 0; //zxx 上次领取小鸡的时间
        this.m_strAllUserData = null;
        //今日分享拿到金币的次数
        this.m_nShareCountTimes = 0;
        //已经开启蛋的次数
        this.m_nOpenEggTimes = 0;
        // 充值所得物品数量
        this.mDiamonds = 0;
        //是否没有初始时间
        this.isNoTime = true;
        //今日是否重置时间
        this.IsRestFlyBoxTime = 0;
        //存放user_data
        this.userdataDic = new Laya.Dictionary();
        this.statUrl = ''; //统计url
        this.mHttpCall = null;
        this.urlConfig = {
            'app': { url: "1.0.1/cw/login?", key: '1.0.1' },
            'check': { url: "1.0.1/cw/check?", key: '1.0.1' },
            'login': { url: "1.0.1/cw/login?", key: '1.0.1' },
            'login2': { url: "1.0.1/cw/login2?", key: '1.0.1' },
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
        };
        this.mLoginType = 0; // 0 - 使用check进行登陆(可能是首次), 1 - 不用check直接登陆.
        this.mUser = {};
        this.mSaveImage = "";
        this.mLaunch = null;
        //当前挑战的题目--只有返回了才会改
        this.mrelayID = 0;
        this.mChallengeID = 0;
        //当前分享的题目--只要有新题出来，都会改
        this.mShareID = 0;
        this.mChallenge = null;
        this.mMarks = [0, 0, 0, 0];
        this.mQR = 0;
        this.mQRs = {};
        this.mLogined = false;
        // 首页按钮未加载完成时禁用
        this.buttonType = false;
        // 更多游戏列表
        this.mMoreGames = [];
        // 随机展示广告
        this.btnMoreGame = {};
        // 复活卡数量
        this.rebirthCardNum = 0;
        // 游戏进行中的 音乐控制---false非游戏中退出,true游戏中退出
        this.gameMusicControl = false;
        // onshow执行了没
        this.showType = false;
        // 分享进入 识别
        this.surl = null;
        // 用户皮肤
        this.userSkin = null;
        // 皮肤状态列表
        // 分享文案图片
        this.shareurl = [];
        // 人物无敌
        this.wudi = false;
        // 每日邀请用户列表
        this.userShares = null;
        // 每日任务 情况
        this.taskInfo = null;
        // 用户道具总列表
        this.toolList = null;
        // 金币加成
        this.jbjc = 1;
        // 分数加成
        this.fsjc = 1;
        //开局使用道具
        this.openSth = 1; //1:金币卡2：分数卡3：美猴王体验卡
        // 中间开始标记
        this.zjMark = 0;
        this.refCallCt = 0;
        this.lastCall = null;
        // 体验标记
        this.tyType = false;
        this.tyNum = 1;
        // 礼包红点控制
        this.getlb = false;
        /**
             * 是否调用隐藏banner
             */
        this.mIsInvokeRemoveCustomBannerAd = false;
        /**
         * 默认banner
         */
        this.mCustomBanner = null;
        this.mCustomBannerAdList = null;
        this.mOnOff = null;
        this.mWeiXinVersion = null;
        this.mReturnAppid = null;
        this.mReturnUrl = null;
        // 小游戏跳转开关
        this.jumpType = false;
        this.isTheGame = false;
        // 游戏标识
        this.GameId = null;
        //菜单位置
        this.menuLayout = null;
        // 月亮皮肤列表
        this.ylSkin = [0, 12, 14, 5, 8, 20, 9, 16];
        // 游戏盒子
        this.games_box = [];
        this.firstShareArr = [];
        this.newUser = false;
        // 开启方式列表
        this.OpenEggTypeList = [];
        // 开启方式列表
        this.ShopPrize = new Laya.Dictionary();
        this.boxList = new Laya.Dictionary();
        //视频播放状态
        this.avShowType = true;
        //离线收益每分钟的金币
        this.nOffLineCoins = 0;
        //离线收益总时间
        this.nOffLineTimes = 0;
        //收益衰弱开始的金币数
        this.nBeginDecodeNums = 0;
        //双倍效率加速时间
        this.nDoubleSpeedTime = 0;
        this.onoff = []; // 开关数组
        this.ofOpenBox = 0; // 游戏盒子开关
        this.ofOpenBoxParam = null; // 游戏盒子开关参数
        this.openEggFree = 0; // 每日免费开蛋次数
        this.shareTimeArray = []; // 分享的时间限制数组 
        this.fhOnOff = 0; // 总开关 审核版本为0 正式上线为1
        this.ofCoinsBox = 0; // 大量金币宝箱的开关（首页悬浮）
        this.ofSignTwice = 0; // 每日签到第二份礼物的开关
        this.ofOfflineReword = 0; // 离线奖励开关
        this.ofDoubleReword = 0; // 双倍效率开关
        this.ofFeedPat = 0; // 喂宠物
        this.ofLoginReward = 0; // 每日领取羽毛的开关
        this.ofLoginRewardParam = null;
        this.ofCoinsLess = 0; // 金币不足的开关
        this.ofCoinsLessParam = null;
        this.ofFeatherLess = 0; // 羽毛不足的开关
        this.ofFeatherLessParam = null;
        this.ofLuck = 0; // 幸运弹窗开关
        this.ofLuckCount = 0;
        this.ofLuckParam = null;
        this.ofIconTime = 0; // 导流icon多少s后切换游戏
        this.ofBuyScene = 0;
        this.ofOlineType = 0;
        this.ofItemCost = 30;
        this.ofDiscount = 0;
        this.ofBack = 0;
        this.ofMoveAni = 0;
        this.ofMoveAniTime = 5;
        this.ofStartFeaStartNumther = null; //初始羽毛设置
        this.itemList = []; // 道具列表
        this.firstGoods = null; // 一元好礼商品
        this.secondGoods = null; // 折扣优惠商品
        // 数据埋点接口相关属性
        this.dtValues = [];
        this.dtLogUrl = "";
        /* 充值相关 */
        this.mPayTryCount = 5;
        this.initWX();
    }
    /* 右上角菜单 */
    wxMinPro.prototype.initWX = function () {
        this.getLoginServer();
    };
    wxMinPro.prototype.getLoginServer = function () {
        var params = [];
        params['openid'] = "001";
        //  BridgeUtil.callAppMethod("getOpenId");
        this.appServer(Main.app.urlConfig["app"], params, this.onLaunchSuccess);
    };
    /* 网络请求 */
    wxMinPro.prototype.appServer = function (rpc, params, callback, ecbck) {
        if (ecbck === void 0) { ecbck = null; }
        this.mHttpCall = new Laya.HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, onHttpRequestError);
        var str = util.getServer() + rpc['url'] + util.getUrlParams(params, rpc['key']);
        console.log(str);
        this.mHttpCall.send(str, null, 'get', 'text');
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
            this.mHttpCall = null;
        }
        function onHttpRequestError(e) {
            if (ecbck != null) {
                ecbck();
            }
            this.mHttpCall = null;
        }
    };
    /**
     * 游戏启动必然调用的一个接口
     */
    wxMinPro.prototype.onLauch = function (isFirstLoad) {
        if (isFirstLoad === void 0) { isFirstLoad = true; }
        Main.app.mwx.isFirstLaunch = isFirstLoad;
        var params = {};
        params['platform'] = (wxCore.uo.mPhone["platform"] == "ios") ? 2 : 1;
        params['uid'] = wxCore.uo.mWeUser['uid'];
        params['name'] = Base64.encodeURI(wxCore.uo.mWeUser['nickName']);
        params['avatar'] = Base64.encodeURI(wxCore.uo.mWeUser['avatarUrl']);
        params['ver'] = Main.app.currentversion;
        if (wxCallBack.mAdId != "")
            params['adid'] = wxCallBack.mAdId;
        if (wxCallBack.mSurl != "")
            params['surl'] = wxCallBack.mSurl;
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
        Main.app.mwx.server(Main.app.mwx.urlConfig["lauch"], params, Main.app.mwx.onLaunchSuccess, null);
    };
    /* 登录成功 */
    wxMinPro.prototype.onLaunchSuccess = function (ret) {
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
    };
    /* 处理登录后服务器返回的数据 */
    wxMinPro.prototype.onLoginResult = function (ret) {
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
                Main.app.mwx.PointFirst = '新用户';
            }
            else {
                Main.app.mwx.PointFirst = '老用户';
            }
            Main.app.mwx.statUrl = ret["dt_values"][0]['param'];
            Main.app.mwx.GameId = ret["gameid"];
            Main.app.mwx.mUID = ret['uid'];
            Main.app.mwx.mUser["coins"] = ret["coins"];
            Main.app.mwx.userShares = ret["user_shares"];
            Main.app.mwx.taskInfo = ret["task_info"];
            Main.app.mwx.games_box = ret["games_box"];
            Main.app.mwx.mCustomBannerAdList = ret["games_ad"];
            Main.app.mwx.mMarks[0] = Number(ret['marks']['mark']);
            Main.app.mwx.mMarks[1] = Number(ret['marks']['mark1']);
            Main.app.mwx.mMarks[2] = Number(ret['marks']['mark2']);
            Main.app.mwx.mMarks[3] = Number(ret['marks']['mark3']);
            Main.app.mwx.mUser['mark'] = Math.floor(Main.app.mwx.mMarks[0]);
            // 设置用户默认皮肤
            ret["user_data"].forEach(function (item) {
                Main.app.mwx.userdataDic.set(item.key, item.values);
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
                        var prevDate = new Date();
                        prevDate.setTime(Number(Main.app.mwx.m_tEnoughTime));
                        if (Main.app.mwx.userdataDic.get("IsRestFlyBoxTime") == 0 || Main.app.mwx.userdataDic.get("IsRestFlyBoxTime") == null) {
                            // 说明今天已经还没更改过次数
                        }
                        else {
                            return;
                        }
                        var nowDate = new Date();
                        if (prevDate.getUTCFullYear() < nowDate.getUTCFullYear()) {
                            Main.app.mwx.m_nShareCountTimes = 0;
                            Main.app.mwx.SetUserValue("ShareCountTimes", 0);
                            Main.app.mwx.SetUserValue("IsRestFlyBoxTime", 1);
                        }
                        else if (prevDate.getMonth() < nowDate.getMonth()) {
                            Main.app.mwx.m_nShareCountTimes = 0;
                            Main.app.mwx.SetUserValue("ShareCountTimes", 0);
                            Main.app.mwx.SetUserValue("IsRestFlyBoxTime", 1);
                        }
                        else {
                            if (prevDate.getDate() < nowDate.getDate()) {
                                Main.app.mwx.m_nShareCountTimes = 0;
                                Main.app.mwx.SetUserValue("ShareCountTimes", 0);
                                Main.app.mwx.SetUserValue("IsRestFlyBoxTime", 1);
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
                Main.app.mwx.userSkin = parseInt(ret['use_item']) + 2001;
            }
            Main.app.mwx.itemList = ret["item_list"];
            Main.app.mwx.checkItem();
            Main.app.mwx.shareurl = ret["shareurl"];
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
            Main.app.initGame();
        }
    };
    /* 处理游戏道具列表 */
    wxMinPro.prototype.checkItem = function () {
        for (var i = 0; i < Main.app.mwx.itemList.length; i++) {
            var item = Main.app.mwx.itemList[i];
            if (Number(item["id"]) == 9001) {
                Main.app.mwx.firstGoods = item; // 一元好礼商品
            }
            else if (Number(item["id"]) == 9002) {
                Main.app.mwx.secondGoods = item; // 打折优惠的商品
            }
            else {
                // 先不处理
            }
        }
    };
    /* 处理商店商品信息 */
    wxMinPro.prototype.checkShopList = function () {
        Main.app.mwx.toolList.forEach(function (item) {
            Number(item.id) == 2101 ? Main.app.mwx.jbjc = (Number(JSON.parse(item.other)["goldadd"]) + 100) / 100 : '';
            Number(item.id) == 2103 ? Main.app.mwx.fsjc = (Number(JSON.parse(item.other)["numadd"]) + 100) / 100 : '';
            if (Number(item.id) > 8000 && Number(item.id) < 9000 && !!Number(item.gamebox)) {
                Main.app.mwx.OpenEggTypeList.push(item);
            }
            if (Number(item.id) > 3000 && Number(item.id) < 4000 && !!Number(item.gamebox)) {
                item["other"] = JSON.parse(item["other"]);
                var obj = {};
                obj["itemid"] = item["other"]["use_item"];
                obj["count"] = item["other"]["count"];
                obj["id"] = item["id"];
                Main.app.mwx.ShopPrize.set(obj["id"], obj);
            }
            if (Number(item.id) > 5000 && Number(item.id) < 6000 && !!Number(item.gamebox)) {
                item["other"] = JSON.parse(item["other"]);
                var obj = {};
                obj["itemid"] = item["other"]["itemid"];
                obj["gamebox"] = item["gamebox"];
                obj["id"] = item["id"];
                Main.app.mwx.boxList.set(item["other"]["num"], obj);
            }
            if (Number(item.id) == 7004) {
                item['other'] = JSON.parse(item['other']);
                Main.app.mwx.nOffLineTimes = item['other']['time'];
            }
            if (Number(item.id) == 7003) {
                item['other'] = JSON.parse(item['other']);
                Main.app.mwx.nOffLineCoins = item['other']['coins'];
            }
            if (Number(item.id) == 7002) {
                var other = JSON.parse(item['other']);
                Main.app.mwx.nBeginDecodeNums = Number(other['coins']);
            }
            if (Number(item.id) == 7001) {
                item['other'] = JSON.parse(item['other']);
                Main.app.mwx.nDoubleSpeedTime = item['other']['time'];
            }
        });
    };
    /* 处理启动参数 */
    wxMinPro.prototype.dealQuery = function (res) {
        console.log("启动参数 = ", res);
        Main.app.mwx.mLaunch = res;
        if (!!res['query']['Invite'] && Main.app.mwx.mUID > 0) {
            Main.app.mwx.shareIn(res['query']['uid'], res['query']['taskid']);
        }
    };
    /* 增加用户任务完成次数 */
    wxMinPro.prototype.TaskAdd = function (taskId, type, taskcount) {
        if (type === void 0) { type = 0; }
        if (taskcount === void 0) { taskcount = 1; }
        var params = [];
        params['uid'] = Main.app.mwx.mUID;
        params["taskid"] = taskId;
        params["taskcount"] = taskcount;
        Main.app.mwx.server(Main.app.mwx.urlConfig["TaskAdd"], params, onResult);
        function onResult(ret) {
            if (ret['code'] == 0) {
                for (var i = 0; i < Main.app.mwx.taskInfo.length; i++) {
                    if (Main.app.mwx.taskInfo[i]["id"] == taskId) {
                        Main.app.mwx.taskInfo[i]["over_count"] = taskcount != 1 ? taskcount : parseInt(Main.app.mwx.taskInfo[i]["over_count"]) + taskcount;
                    }
                }
            }
        }
    };
    wxMinPro.prototype.checkOnOff = function () {
        for (var i = 0; i < Main.app.mwx.onoff.length; i++) {
            var obj = Main.app.mwx.onoff[i];
            if (obj["key"] == "of_open_box") {
                Main.app.mwx.ofOpenBox = Number(obj["value"]);
                Main.app.mwx.ofOpenBoxParam = JSON.parse(String(obj["param"]));
            }
            else if (obj["key"] == "of_open_egg") {
                var param = JSON.parse(String(obj["param"]));
                Main.app.mwx.openEggFree = Number(param["time"]);
            }
            else if (obj["key"] == "of_share_time" && Number(obj["value"]) == 1) {
                Main.app.mwx.shareTimeArray = String(obj["param"]).split(",");
            }
            else if (obj["key"] == "of_coins_box") {
                Main.app.mwx.ofCoinsBox = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
            }
            else if (obj["key"] == "of_sign_twice") {
                Main.app.mwx.ofSignTwice = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
            }
            else if (obj["key"] == "of_offline_reword") {
                Main.app.mwx.ofOfflineReword = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
            }
            else if (obj["key"] == "of_double_reword") {
                Main.app.mwx.ofDoubleReword = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
            }
            else if (obj["key"] == "of_feed_pat") {
                Main.app.mwx.ofFeedPat = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
            }
            else if (obj["key"] == "of_login_reword") {
                Main.app.mwx.ofLoginReward = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
                Main.app.mwx.ofLoginRewardParam = JSON.parse(String(obj["param"]));
            }
            else if (obj["key"] == "of_gold_less") {
                Main.app.mwx.ofCoinsLess = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
                Main.app.mwx.ofCoinsLessParam = JSON.parse(String(obj["param"]));
            }
            else if (obj["key"] == "of_feather_less") {
                Main.app.mwx.ofFeatherLess = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
                Main.app.mwx.ofFeatherLessParam = JSON.parse(String(obj["param"]));
            }
            else if (obj["key"] == "of_icon_time") {
                var param = JSON.parse(String(obj["param"]));
                Main.app.mwx.ofIconTime = Number(param["time"]) * 1000;
            }
            else if (obj["key"] == "of_click_coins") {
                Main.app.mwx.ofLuck = Main.app.mwx.fhOnOff == 0 ? 2 : Number(obj["value"]);
                Main.app.mwx.ofLuckParam = JSON.parse(String(obj["param"]));
                Main.app.mwx.ofLuckCount = Number(Main.app.mwx.ofLuckParam["click"]);
            }
            else if (obj["key"] == "of_icon_get") {
                Main.app.mwx.ofGetType = Number(obj["value"]);
            }
            else if (obj["key"] == "of_open_feather") {
                Main.app.mwx.ofOpenType = Number(obj["value"]);
                Main.app.mwx.ofStartFeaStartNumther = JSON.parse(String(obj["param"]));
            }
            else if (obj["key"] == "of_ad_size") {
                Main.app.mwx.ofAdSize = Number(JSON.parse(String(obj["param"]))['size']);
            }
            else if (obj["key"] == 'of_buy_scene') {
                Main.app.mwx.ofBuyScene = Number(obj["value"]);
            }
            else if (obj["key"] == "of_start_coins") {
                Main.app.mwx.startCoins = Number(JSON.parse(String(obj["param"]))['coins']);
            }
            else if (obj["key"] == "of_online_rewards") {
                Main.app.mwx.ofOlineType = Number(obj["value"]);
            }
            else if (obj["key"] == 'of_item_cost') {
                Main.app.mwx.ofItemCost = Number(JSON.parse(String(obj["param"]))['gold']);
            }
            else if (obj["key"] == 'of_discount') {
                Main.app.mwx.ofDiscount = Number(obj["value"]);
            }
            else if (obj["key"] == 'of_background') {
                Main.app.mwx.ofBack = Number(obj["value"]);
            }
            else if (obj["key"] == 'of_sidebar_cartoon') {
                Main.app.mwx.ofMoveAni = Number(obj["value"]);
                Main.app.mwx.ofMoveAniTime = Number(JSON.parse(String(obj["param"]))['time']);
            }
        }
    };
    wxMinPro.prototype.checkDTValues = function () {
        for (var i = 0; i < Main.app.mwx.dtValues.length; i++) {
            var item = Main.app.mwx.dtValues[i];
            if (item["key"] == "dt_log_url") {
                Main.app.mwx.dtLogUrl = String(item["param"]);
            }
        }
    };
    /* 更多好玩的游戏 */
    wxMinPro.prototype.initMore = function (btn, type, isIndex) {
        if (isIndex === void 0) { isIndex = false; }
        var obj = MoreGame.GetIndexRandom(Main.app.mwx.games_box);
        if (!!obj) {
            btn.name = obj.gameid;
            if (isIndex) {
                btn.skin = obj.url_btn;
                btn.visible = true;
            }
            else {
                btn.skin = obj.url_result;
            }
        }
        else {
            btn.visible = false;
            btn.skin = "";
        }
    };
    /* 获取需要展示的更多好玩游戏 */
    wxMinPro.prototype.getMoreUrl = function (id) {
        for (var i = 0; i < Main.app.mwx.games_box.length; i++) {
            if (Number(id) == Number(Main.app.mwx.games_box[i]['gameid']))
                return Main.app.mwx.games_box[i];
        }
        return null;
    };
    /* 更多好玩游戏点击统计 */
    wxMinPro.prototype.reportADHit = function (id) {
        var params = [];
        params['uid'] = Main.app.mwx.mUID;
        params['id'] = id;
        Main.app.mwx.server(Main.app.mwx.urlConfig["data"], params, null);
    };
    /* banner广告点击统计 */
    wxMinPro.prototype.reportData = function (type) {
        var params = [];
        params['uid'] = Main.app.mwx.mUID;
        params['type'] = type;
        Main.app.mwx.server(Main.app.mwx.urlConfig["ad"], params, null);
    };
    /* 获取用户签到情况 */
    wxMinPro.prototype.GetUserQD = function (type) {
        if (type === void 0) { type = true; }
        wx.showLoading({
            title: "正在加载...",
            mask: 'ture',
        });
        var params = [];
        params['uid'] = Main.app.mwx.mUID;
        Main.app.mwx.server(Main.app.mwx.urlConfig["GetUserQD"], params, onResult);
        function onResult(ret) {
            if (ret['code'] == 0) {
                Main.app.mwx.mUser["toQd"] = true;
                for (var k in ret["qd"]) {
                    if (!!k.split('_')[1] && k.split('_')[1].length == 1) {
                        ret["qd"][k] == ret["nowDay"] ? Main.app.mwx.mUser["toQd"] = false : '';
                    }
                }
                // 获取签到天数
                var day = void 0;
                for (var k in ret["qd"]) {
                    if (ret["qd"][k] == ret["nowDay"]) {
                        day = k.split('_')[1];
                    }
                }
                // 没签到则展示签到界面
                if (!Main.app.mwx.mUser["toQd"]) {
                    if (!!type) {
                        console.log("gameClub.hide1");
                    }
                }
                Main.app.mwx.buttonType = true;
                wx.hideLoading({});
            }
        }
    };
    /* 获取邀请关系 */
    wxMinPro.prototype.NewGetMyShare = function () {
        var params = [];
        params["uid"] = Main.app.mwx.mUID;
        Main.app.mwx.server(Main.app.mwx.urlConfig["GetMyShare"], params, onResult);
        function onResult(ret) {
            if (ret["code"] == 0) {
                var length = 0;
                Main.app.mwx.userShares = Number(ret["data"]);
                if (Main.app.mwx.userShares >= 50) {
                    length = 50;
                }
                else if (Main.app.mwx.userShares > 0 && Main.app.mwx.userShares < 50) {
                    length = Main.app.mwx.userShares;
                }
                module.RaceManager.instance.userInfo.invitationCount = length;
            }
        }
    };
    /* 建立邀请关系 */
    wxMinPro.prototype.shareIn = function (fid, taskid) {
        var params = [];
        params['uid'] = Main.app.mwx.mUID;
        params['fid'] = fid;
        params["taskid"] = 101;
        Main.app.mwx.server(Main.app.mwx.urlConfig["shareInFriend"], params, null);
    };
    /* 服务器存值 */
    wxMinPro.prototype.SetUserValue = function (key, value) {
        var params = [];
        params['uid'] = Main.app.mwx.mUID;
        params['dt_key'] = key;
        params['dt_value'] = value;
        Main.app.mwx.server(Main.app.mwx.urlConfig['SetUserValue'], params, null);
    };
    /* 数据埋点统计 */
    wxMinPro.prototype.dataLog = function (keyname, clos) {
        var mobile = (wxCore.uo.mPhone["platform"] == "ios") ? 2 : 1;
        var urlStr = Main.app.mwx.dtLogUrl;
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
        function onResult(e) {
            request = null;
        }
        function onHttpRequestError(e) {
            request = null;
        }
    };
    /* 视频广告信息 */
    wxMinPro.prototype.getAvObj = function (wxadurl) {
        wxadurl.forEach(function (item) {
            item.id == 1 ? Main.app.adArr["main"]["banner"] = item["unitid"] :
                item.id == 12 ? Main.app.adArr["main"]["videoAd"] = item["unitid"] : "";
        });
        Main.app.mwx.loadAv(Main.app, Main.app.adArr["main"]["videoAd"]);
    };
    /* 初始化视频 */
    wxMinPro.prototype.loadAv = function (that, code) {
        that = Main.app;
        if (Main.app.mSDKVersion >= "2.0.4") {
            try {
                that["videoAd"] = wx.createRewardedVideoAd({
                    adUnitId: Main.app.adArr["main"]["videoAd"]
                });
                that["videoAd"].onError(function (res) {
                    console.log(res.errMsg);
                    that["videoAd"] = null;
                });
                that["videoAd"].load();
            }
            catch (err) {
                console.log("读取广告失败");
                that["videoAd"] = null;
            }
        }
    };
    /* 看视频回调 */
    wxMinPro.prototype.showingAv = function (that, shareBack, callBack, callBack2, callBack3) {
        if (callBack2 === void 0) { callBack2 = null; }
        if (callBack3 === void 0) { callBack3 = null; }
        if (!Main.app.mwx.avShowType) {
            return;
        }
        Main.app.mwx.avShowType = false;
        // 延迟0.5s是因为广告还没有完全onClose的时候再次点击播放视频，会导致视频广告show不出来。
        Laya.timer.once(500, Main.app.mwx, Main.app.mwx.showingVideo, [that, shareBack, callBack, callBack2, callBack3]);
    };
    wxMinPro.prototype.showingVideo = function (that, shareBack, callBack, callBack2, callBack3) {
        if (callBack2 === void 0) { callBack2 = null; }
        if (callBack3 === void 0) { callBack3 = null; }
        if (Main.app.mSDKVersion >= "2.0.4" && !!Main.app["videoAd"]) {
            try {
                Main.app["videoAd"].show(function () {
                }).catch(function (err) { return function () {
                    Main.app.mwx.avShowType = true;
                    if (!!shareBack.method) {
                        shareBack.run();
                    }
                    else {
                        Main.app.showMessage("视频获取失败");
                    }
                }; });
            }
            catch (err) {
                Main.app.mwx.avShowType = true;
                if (!!shareBack.method) {
                    shareBack.run();
                }
                else {
                    Main.app.showMessage("视频获取失败");
                }
            }
            Main.app["videoAd"].onError(function () {
                Main.app.mwx.avShowType = true;
                if (!!shareBack.method) {
                    shareBack.run();
                }
                else {
                    Main.app.showMessage("视频获取失败");
                }
            });
            Main.app["videoAd"].onClose(function (res) {
                Main.app.mwx.avShowType = true;
                if (Main.app.mSDKVersion >= "2.1.0") {
                    if (res["isEnded"] == true) {
                        callBack.run();
                        Main.app["videoAd"].offClose();
                    }
                    else {
                        Main.app["videoAd"].offClose();
                        if (!!callBack2) {
                            callBack2.run();
                        }
                    }
                }
                else {
                    callBack.run();
                    Main.app["videoAd"].offClose();
                }
            });
        }
        else {
            Main.app.mwx.avShowType = true;
            if (!!shareBack.method) {
                shareBack.run();
            }
            else {
                Main.app.showMessage("视频获取失败");
            }
            if (!!callBack3) {
                callBack3.run();
            }
        }
    };
    /* 展示banner广告 */
    wxMinPro.prototype.showBanner = function () {
        var that = Main.app;
        // banner条广告
        console.log(Main.app.mSDKVersion);
        if (Main.app.mSDKVersion >= "2.0.4") {
            console.log(Main.app.mSDKVersion);
            if (that["banner"] == null) {
                that["banner"] = wx.createBannerAd({
                    adUnitId: Main.app.adArr["main"]["banner"],
                    style: {
                        left: 0,
                        top: Main.app.mScreenHeight - 107,
                        width: Main.app.mScreenWidth * Main.app.mwx.ofAdSize
                    }
                });
                var top_1 = Main.app.mScreenHeight == 812 ? 20 : 0;
                that["banner"].onResize(function (res) {
                    that["banner"].style.top = Main.app.mScreenHeight - that["banner"].style.realHeight - top_1;
                    that["banner"].style.left = (Main.app.mScreenWidth - that["banner"].style.realWidth) / 2;
                });
                that["banner"].onLoad(function () {
                    console.log('banner 广告加载成功4');
                    Main.app.mwx.reportData(0);
                });
                that["banner"].onError(function () {
                    console.log("banner\u52A0\u8F7D\u5931\u8D25");
                    that["banner"] = null;
                    Laya.Handler.create(that, Main.app.mwx.addCustomBannerAd, [Main.app]).run();
                });
            }
            if (!Main.app.bannerShowType) {
                that["banner"].show();
                that.bannerShowType = true;
            }
        }
    };
    /* 关闭banner广告 */
    wxMinPro.prototype.closeBanner = function () {
        if (!!Main.app.bannerShowType) {
            if (!!Main.app.banner) {
                Main.app.banner.hide();
            }
            Main.app.bannerShowType = false;
        }
        if (!!Main.app.mCustomBanner) {
            Main.app.mwx.removeCustomBannerAd(Main.app);
        }
    };
    /* 当微信banner广告为空时，显示自己的广告。 */
    wxMinPro.prototype.addCustomBannerAd = function (that) {
        if (Main.app.mwx.mCustomBannerAdList.length == 0) {
            return;
        }
        var __this = that;
        __this.mIsInvokeRemoveCustomBannerAd = false;
        var index = Math.floor(Math.random() * Main.app.mwx.mCustomBannerAdList.length);
        var url = Main.app.mwx.mCustomBannerAdList[index]["url"];
        var appid = Main.app.mwx.mCustomBannerAdList[index]["appid"];
        var path = Main.app.mwx.mCustomBannerAdList[index]["path"];
        // 1->跳转小程序 0->不可跳转
        var third = Number(Main.app.mwx.mCustomBannerAdList[index]["third"]);
        var id = Main.app.mwx.mCustomBannerAdList[index]["id"];
        if (__this.mCustomBanner == null) {
            __this.mCustomBanner = new Laya.Image();
            __this.mCustomBanner.zOrder = 1000;
        }
        __this.mCustomBanner.loadImage(url, 0, 0, 0, 0, Laya.Handler.create(__this, function () {
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
    };
    wxMinPro.prototype.onCustomBannerClick = function (third, id, appid, path, e) {
        e.stopPropagation();
        if (third == 0)
            return;
        var goAppid = path.split("=")[1];
        gameBox.showBoxPage(goAppid, Main.app.mwx.games_box, '宠物蛋蛋', 10000);
        return;
    };
    wxMinPro.prototype.removeCustomBannerAd = function (that) {
        that.mIsInvokeRemoveCustomBannerAd = true;
        if (that.mCustomBanner != null) {
            that.mCustomBanner.off(Events.CLICK, that, that.onCustomBannerClick);
            Laya.stage.removeChild(that.mCustomBanner);
            that.mCustomBanner = null;
        }
    };
    /* 和微信右上角按钮对齐 */
    wxMinPro.prototype.getMenuTop = function (btn) {
        var get1 = function () {
            var h2 = Main.app.mScreenHeight / 1334;
            var w = Main.app.mScreenWidth / 750;
            if (Main.app.mScreenHeight != 812) {
                btn.y = 20 / h2 - 30;
            }
            else if (Main.app.mScreenHeight == 812) {
                btn.y = 94;
            }
        };
        if (Main.app.mSDKVersion < '2.1.0') {
            get1();
        }
        else {
            if (!Main.app.mwx.menuLayout) {
                Main.app.mwx.menuLayout = wx.getMenuButtonBoundingClientRect();
                console.log(Main.app.mwx.menuLayout);
            }
            if (!Main.app.mwx.menuLayout || !Main.app.mwx.menuLayout.top) {
                get1();
            }
            else {
                var h = Main.app.mwx.menuLayout.height;
                var t = Main.app.mwx.menuLayout.top;
                var center_y = (t + h / 2) * Laya.stage.height / wxCore.uo.mPhone['screenHeight'];
                btn.y = center_y - btn.height / 2;
            }
        }
    };
    /* 充值成功，提交服务器加金币。 */
    wxMinPro.prototype.PrePay = function (rmb, success, fail) {
        if (success === void 0) { success = null; }
        if (fail === void 0) { fail = null; }
        function onResult(e) {
            var ret = util.getJSON(e);
            console.log("充值结果 = ", ret);
            if (ret.code == 0) {
                wx.removeStorageSync("pay_rmb_list");
                Main.app.mwx.mPayTryCount = 5;
                Main.app.showMessage("充值成功+" + ret.addcoins + "羽毛");
                if (success)
                    success.run();
                // 增加羽毛
                manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(0, 0), 3, Number(ret.addcoins)]);
            }
            else {
                if (Main.app.mwx.mPayTryCount > 0) {
                    Main.app.mwx.mPayTryCount -= 1;
                    Laya.timer.once(1500, Main.app.mwx, Main.app.mwx.PrePay, [rmb]);
                }
                else {
                    wx.removeStorageSync("pay_rmb_list");
                    Main.app.mwx.mPayTryCount = 5;
                    Main.app.showMessage("充值失败，请再次支付：" + ret.code);
                    if (fail)
                        fail.run();
                }
            }
        }
        wx.setStorageSync("pay_rmb_list", rmb);
        var _HttpCall = null;
        _HttpCall = new HttpRequest();
        _HttpCall.once(Laya.Event.COMPLETE, Main.app.mwx, onResult);
        _HttpCall.once(Laya.Event.ERROR, Main.app.mwx, function () {
            console.log("回调失败");
        });
        wx.login({
            success: function (res) {
                var params = [];
                params['uid'] = Main.app.mwx.mUID;
                params['code'] = res.code;
                params['itemid'] = rmb;
                var str = util.getServer() + Main.app.mwx.urlConfig["PrePay"]["url"] + util.getUrlParams(params, "1.0.1");
                _HttpCall.send(str, null, 'get', 'text');
            },
            fail: function (res) {
                (function () {
                    console.log("支付后登录失败");
                });
            }
        });
    };
    /* 网络请求 */
    wxMinPro.prototype.server = function (rpc, params, callback, ecbck) {
        if (ecbck === void 0) { ecbck = null; }
        Main.app.mwx.mHttpCall = new Laya.HttpRequest();
        Main.app.mwx.mHttpCall.once(Laya.Event.COMPLETE, Main.app.mwx, onResult);
        Main.app.mwx.mHttpCall.once(Laya.Event.ERROR, Main.app.mwx, onHttpRequestError);
        var str = util.getServer() + rpc['url'] + util.getUrlParams(params, rpc['key']);
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
    /* 请求报错 */
    wxMinPro.prototype.onHttpRequestError = function (e) {
        console.log("请求报错");
        wx.hideLoading({});
        Main.app.mwx.mHttpCall = null;
        console.log("onHttpRequestError:" + e);
    };
    /* 获取返回小程序appid */
    wxMinPro.prototype.initReturn = function () {
        var pid = Main.app.mwx.mLaunch['query']['pid'];
        if (pid == null || typeof (pid) == "undefined" || pid == "") {
            pid = laya.wx.mini.MiniLocalStorage.getItem("pid");
        }
        if (pid == null || typeof (pid) == "undefined" || pid == "") {
            Main.app.mwx.mReturnAppid = "";
            Main.app.mwx.mReturnUrl = "";
        }
        else {
            if (Number(pid) == 8) {
                Main.app.mwx.mReturnAppid = "";
                Main.app.mwx.mReturnUrl = "";
            }
            else {
                Main.app.mwx.mReturnAppid = pid;
                Main.app.mwx.mReturnUrl = "pages/index/index?";
            }
            laya.wx.mini.MiniLocalStorage.setItem("pid", Main.app.mwx.mReturnAppid);
        }
    };
    return wxMinPro;
}());
//# sourceMappingURL=wxMinPro.js.map