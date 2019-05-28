/**
* name
*/
var module;
(function (module) {
    var Dictionary = laya.utils.Dictionary;
    var LocalStorage = laya.net.LocalStorage;
    var UserInfo = /** @class */ (function () {
        function UserInfo() {
            this.IDS = 100;
            /**用户ID */
            this.uerId = 0;
            /**openID */
            this.openID = "";
            /**苹果数量 */
            this.apple = 0;
            /**金币数量 */
            this.coin = 0;
            /**羽毛数量 */
            this.wing = 0;
            /**已经开启的孵化格子序号 */
            this.openSlotIndexs = [];
            /**开启的场地ID */
            this.openGateIds = [];
            /**场地数据 */
            this.plantInfoDic = new Dictionary();
            /**带孵化的蛋数据 */
            this.eggInfoList = new Array();
            /**已经创建的蛋的数量 */
            this.createEggCount1 = 0;
            this.createEggCount2 = 0;
            this.createEggCount3 = 0;
            this.createEggCount4 = 0;
            this.createEggCount5 = 0;
            this.createEggCount6 = 0;
            this.createEggCount7 = 0;
            this.createEggCount8 = 0;
            this.firstGift = 0;
            /**新手引导步骤 */
            this.guidStep = 1;
            this.guid_run = 0;
            /**上次完成的时间点 */
            this._loginRewardTime = 0;
            /**已领取完了第几天 */
            this.loginRewardDay = 0;
            /**今天领取了几次，每天可以领取两次 */
            this.loginRewardCount = 0;
            /**是否看了视频 */
            this.loginLookVideo = 0;
            /**时间奖励上次领取的时间 */
            this._timeRewardTime = 0;
            /**今天领取的次数 */
            this.timeRewardCount = 0;
            /**开启加速的时间 */
            this._jiaShuTime = 0;
            /**加速持续时间--单位：分钟*/
            this._jiaShuingTime = 10;
            /**加速剩余时间 */
            this.jiashuDownTime = 0;
            /**上次做任务的时间 */
            this._taskTime = 0;
            /**任务数据 */
            this.taskDatas = [];
            /**每日特价的上次购买时间 */
            this.dayTime = 0;
            /**飞行视频宝箱上次出现的时间 */
            this._flyVideoTime = 0;
            //不用存 ,飞行宝箱的剩余时间
            this.flyVideDownTime = 0;
            /**邀请好友的数量 */
            this.invitationCount = 0;
            /**已领取奖励的序号 */
            this.invitationRewardCount = 0;
            /**离线时间 */
            this.offLineTime = 0;
            // 孵蛋时间数组--单位秒
            this.broodArr = [30, 120, 300, 420, 600, 900, 1200, 1500, 1800, 2700, 3600, 7200];
            this._jiaShuingTime = Main.app.mwx.nDoubleSpeedTime;
            console.log("加速时间", this._jiaShuingTime);
        }
        /** */
        UserInfo.prototype.changeApple = function (value) {
            this.apple += value;
            if (this.apple % 100 == 0) {
                this.addLocalUserInfo();
                console.log("苹果改变 偏差100");
            }
        };
        /* 金币数值改变 */
        UserInfo.prototype.changeCoin = function (value) {
            this.coin += value;
            if (this.coin % 50 == 0) {
                this.addLocalUserInfo();
            }
        };
        /** */
        UserInfo.prototype.changeWing = function (value) {
            this.wing += value;
            this.addLocalUserInfo();
        };
        /**添加一个蛋 */
        UserInfo.prototype.addEgg = function (plantId) {
            var index = this.findNullSlot();
            var info = new module.EggInfo();
            info.plantId = plantId;
            info.slotIndex = index;
            for (var i = 1; i < 9; i++) {
                if (plantId == i) {
                    info.setTime(this.broodArr[this['createEggCount' + i] > this.broodArr.length - 1 ? this.broodArr.length - 1 : this['createEggCount' + i]] * 1000);
                    this['createEggCount' + i] += 1;
                }
            }
            this.eggInfoList.push(info);
            // this.createEggCount += 1;
            this.addLocalUserInfo();
            return info;
        };
        /**移除一个蛋 */
        UserInfo.prototype.removeEgg = function (eggInfo) {
            for (var i = 0; i < this.eggInfoList.length; i++) {
                if (this.eggInfoList[i].eggId == eggInfo.eggId) {
                    this.eggInfoList.splice(i, 1);
                    break;
                }
            }
            // wx.postMessage({
            //         type: "send", mark: this.eggInfoList.length, level: 0, best:this.eggInfoList.length, user: Main.app.mwx.mUser
            //     });
            this.addLocalUserInfo();
        };
        /**这个格子是否开启 */
        UserInfo.prototype.isOpenSlot = function (index) {
            return this.openSlotIndexs.indexOf(index) >= 0;
        };
        /**查找这个格子上是否有蛋  */
        UserInfo.prototype.getEggInfoByIndex = function (index) {
            for (var i = 0; i < this.eggInfoList.length; i++) {
                if (this.eggInfoList[i].slotIndex == index) {
                    return this.eggInfoList[i];
                }
            }
            return null;
        };
        /**找一个空格子 */
        UserInfo.prototype.findNullSlot = function () {
            for (var i = 0; i < this.openSlotIndexs.length; i++) {
                if (this.getEggInfoByIndex(this.openSlotIndexs[i]) == null) {
                    return this.openSlotIndexs[i];
                }
            }
            return 0;
        };
        /**找到一个未开启的格子 */
        UserInfo.prototype.findCloseSlot = function () {
            for (var i = 1; i <= 6; i++) {
                if (this.openSlotIndexs.indexOf(i) < 0) {
                    return i;
                }
            }
            return 0;
        };
        /**开启一个格子 */
        UserInfo.prototype.openEggSlot = function (index) {
            if (this.openSlotIndexs.indexOf(index) < 0) {
                this.openSlotIndexs.push(index);
                this.addLocalUserInfo();
            }
        };
        /**保存玩家的openID */
        UserInfo.prototype.saveOpenID = function () {
            LocalStorage.setItem(UserInfo.USER_OPENID, this.openID);
        };
        /**获取OpenID */
        UserInfo.prototype.getLocalOpenId = function () {
            var dataStr = LocalStorage.getItem(UserInfo.USER_OPENID);
            if (dataStr != null && dataStr != "") {
                this.openID = dataStr;
            }
            return dataStr;
        };
        /**保存基础数据 */
        UserInfo.prototype.addLocalUserInfo = function () {
            var list = [];
            //基本信息
            list.push(this.uerId + "," + this.openID + "," + this.wing + "," + this.coin + "," + this.apple + "," + this.guidStep + "," + this.IDS + "," + this.createEggCount1 + "," + this.guid_run + "," + this.createEggCount2 + "," + this.createEggCount3 + "," + this.createEggCount4 + "," + this.createEggCount5 + "," + this.createEggCount6 + "," + this.createEggCount7 + "," + this.createEggCount8);
            /**已经开启的孵化格子序号 */
            list.push(this.openSlotIndexs.join(","));
            /**开启的场地ID */
            list.push(this.openGateIds.join(","));
            //今日奖励
            list.push(this._loginRewardTime + "," + this.loginRewardDay + "," + this.loginRewardCount + "," + this.loginLookVideo);
            //时间奖励
            list.push(this._timeRewardTime + "," + this.timeRewardCount + "," + this._jiaShuTime);
            /**任务 */
            list.push(this._taskTime + "," + this.getTaskDataString()); // 232323 , 1-2-1 + 2-2-0
            /**每日特价的上次购买时间 */
            list.push(this.dayTime + "," + this._flyVideoTime);
            /**邀请好友的数量 */
            list.push(this.invitationCount + "," + this.invitationRewardCount);
            /**带孵化的蛋数据 */
            list.push(this.getEggInfoString()); //1-2 , 1-1
            /**场地数据 */
            list.push(this.getPlantInfoString());
            list.push(this.firstGift.toString());
            LocalStorage.setItem(UserInfo.USERINFO, list.join("$"));
            // manager.ResVersionMgr.instance.saveData(this.uerId, list.join("$"));
            this.AllUserData = list.join("$");
        };
        UserInfo.prototype.UpDateUserValue = function () {
            if (this.AllUserData != null) {
                Main.app.mwx.SetUserValue("AllUserValue", this.AllUserData);
            }
        };
        /**格式化任务 */
        UserInfo.prototype.getTaskDataString = function () {
            var list = [];
            for (var i = 0; i < this.taskDatas.length; i++) {
                list.push(this.taskDatas[i].id + "-" + this.taskDatas[i].count + "-" + this.taskDatas[i].isGetReward);
            }
            return list.length == 0 ? "null" : list.join("|");
        };
        /**格式化蛋 */
        UserInfo.prototype.getEggInfoString = function () {
            var list = [];
            for (var i = 0; i < this.eggInfoList.length; i++) {
                list.push(this.eggInfoList[i].toString());
            }
            return list.length == 0 ? "null" : list.join(",");
        };
        /**格式化产地 */
        UserInfo.prototype.getPlantInfoString = function () {
            var list = [];
            for (var i = 0; i < this.plantInfoDic.values.length; i++) {
                list.push(this.plantInfoDic.values[i].toString());
            }
            return list.join("*");
        };
        /**获取保存的通关信息 */
        UserInfo.prototype.getLocalStorage = function () {
            var dataStr = LocalStorage.getItem(UserInfo.USERINFO);
            if (dataStr != null && dataStr != "") {
                var datas = dataStr.split("$");
                //基本信息
                var ds = datas[0].split(",");
                this.uerId = Number(ds[0]);
                this.openID = ds[1];
                this.wing = Number(ds[2]);
                this.coin = Number(ds[3]);
                this.apple = Number(ds[4]);
                this.guidStep = Number(ds[5]);
                this.IDS = ds.length >= 14 ? Number(ds[6]) : 100;
                this.createEggCount1 = ds.length >= 15 ? Number(ds[7]) : 0;
                this.createEggCount2 = ds.length >= 15 ? Number(ds[9]) : 0;
                this.createEggCount3 = ds.length >= 15 ? Number(ds[10]) : 0;
                this.createEggCount4 = ds.length >= 15 ? Number(ds[11]) : 0;
                this.createEggCount5 = ds.length >= 15 ? Number(ds[12]) : 0;
                this.createEggCount6 = ds.length >= 15 ? Number(ds[13]) : 0;
                this.createEggCount7 = ds.length >= 15 ? Number(ds[14]) : 0;
                this.createEggCount8 = ds.length >= 15 ? Number(ds[15]) : 0;
                this.guid_run = ds.length >= 16 ? Number(ds[8]) : 0;
                /**已经开启的孵化格子序号 */
                ds = datas[1].split(",");
                for (var i = 0; i < ds.length; i++) {
                    if (this.openSlotIndexs.indexOf(Number(ds[i])) < 0) {
                        this.openSlotIndexs.push(Number(ds[i]));
                    }
                }
                /**开启的场地ID */
                ds = datas[2].split(",");
                for (var i = 0; i < ds.length; i++) {
                    if (this.openGateIds.indexOf(Number(ds[i])) < 0) {
                        this.openGateIds.push(Number(ds[i]));
                    }
                }
                //今日奖励
                ds = datas[3].split(",");
                this.loginRewardDay = Number(ds[1]);
                this.loginRewardCount = Number(ds[2]);
                this.loginLookVideo = Number(ds[3]);
                this.loginRewardTime = Number(ds[0]);
                //时间奖励
                ds = datas[4].split(",");
                this.timeRewardCount = Number(ds[1]);
                this.timeRewardTime = Number(ds[0]);
                this.jiaShuTime = 0; //ds.length >= 3 ? Number(ds[2]) : 0;
                /**任务 */
                ds = datas[5].split(",");
                if (ds[1] == "null") {
                }
                else {
                    var es = ds[1].split("|");
                    for (var i = 0; i < es.length; i++) {
                        var fs = es[i].split("-");
                        this.taskDatas.push({ id: Number(fs[0]), count: Number(fs[1]), isGetReward: Number(fs[2]) });
                    }
                }
                this.taskTime = Number(ds[0]);
                /**每日特价的上次购买时间 */
                ds = datas[6].split(",");
                this.dayTime = Number(ds[0]);
                this.flyVideoTime = ds.length >= 1 ? Number(ds[1]) : 0;
                /**邀请好友的数量 */
                ds = datas[7].split(",");
                this.invitationCount = Number(ds[0]);
                this.invitationRewardCount = Number(ds[1]);
                /**带孵化的蛋数据 */
                if (datas[8] == "null") {
                }
                else {
                    ds = datas[8].split(",");
                    for (var i = 0; i < ds.length; i++) {
                        var info = new module.EggInfo();
                        info.decode(ds[i]);
                        this.eggInfoList.push(info);
                    }
                }
                /**场地数据 */
                ds = datas[9].split("*");
                for (var i = 0; i < ds.length; i++) {
                    es = ds[i].split(",");
                    var plantInfo = this.plantInfoDic.get(Number(es[0]));
                    if (es.length > 5) {
                        plantInfo.decode_ExpGrowCount(Number(es[5]));
                    }
                    plantInfo.decode_info(es[1]);
                    plantInfo.decode_haveID(es[2]);
                    plantInfo.decode_coin(es[3]);
                    plantInfo.decode_chichen(es[4]);
                }
                this.firstGift = Number(datas[10]);
            }
            else {
                this.uerId = 11031;
                this.openID = new Date().getTime() + "";
                this.coin = 500;
                this.wing = 0;
                this.openSlotIndexs = [1, 2];
                this.openGateIds = [1];
            }
            this.getOffLineTime();
        };
        /**解析用户数据 */
        UserInfo.prototype.decodeUserData = function (dataStr) {
            if (dataStr != null && dataStr != "") {
                var datas = dataStr.split("$");
                if (dataStr == "fail") {
                    //基本信息
                    var ds = datas[0].split(",");
                    this.uerId = Number(ds[0]);
                    this.openID = ds[1];
                    this.coin = 500;
                    this.wing = 0;
                    this.openSlotIndexs = [1, 2];
                    this.openGateIds = [1];
                    console.log("解析用户数据length = 1");
                    this.addLocalUserInfo();
                }
                if (datas.length == 1) {
                    //基本信息
                    var ds = datas[0].split(",");
                    this.uerId = Number(ds[0]);
                    this.openID = ds[1];
                    this.coin = 500;
                    this.wing = 0;
                    this.openSlotIndexs = [1, 2];
                    this.openGateIds = [1];
                    console.log("解析用户数据length = 1");
                    this.addLocalUserInfo();
                }
                else {
                    //基本信息
                    console.log("解析用户数据length 》 1");
                    var ds = datas[0].split(",");
                    this.uerId = Number(ds[0]);
                    this.openID = ds[1];
                    this.wing = Number(ds[2]);
                    this.coin = Number(ds[3]);
                    if (this.coin == 0) {
                        this.coin = 500;
                        this.wing = 0;
                    }
                    this.apple = Number(ds[4]);
                    this.guidStep = Number(ds[5]);
                    this.IDS = ds.length >= 14 ? Number(ds[6]) : 100;
                    this.createEggCount1 = ds.length >= 15 ? Number(ds[7]) : 0;
                    this.createEggCount2 = ds.length >= 15 ? Number(ds[9]) : 0;
                    this.createEggCount3 = ds.length >= 15 ? Number(ds[10]) : 0;
                    this.createEggCount4 = ds.length >= 15 ? Number(ds[11]) : 0;
                    this.createEggCount5 = ds.length >= 15 ? Number(ds[12]) : 0;
                    this.createEggCount6 = ds.length >= 15 ? Number(ds[13]) : 0;
                    this.createEggCount7 = ds.length >= 15 ? Number(ds[14]) : 0;
                    this.createEggCount8 = ds.length >= 15 ? Number(ds[15]) : 0;
                    this.guid_run = ds.length >= 16 ? Number(ds[8]) : 0;
                    /**已经开启的孵化格子序号 */
                    ds = datas[1].split(",");
                    for (var i = 0; i < ds.length; i++) {
                        if (this.openSlotIndexs.indexOf(Number(ds[i])) < 0) {
                            this.openSlotIndexs.push(Number(ds[i]));
                        }
                    }
                    if (this.openSlotIndexs.length <= 2) {
                        this.openSlotIndexs = [1, 2];
                    }
                    /**开启的场地ID */
                    ds = datas[2].split(",");
                    for (var i = 0; i < ds.length; i++) {
                        if (this.openGateIds.indexOf(Number(ds[i])) < 0) {
                            this.openGateIds.push(Number(ds[i]));
                        }
                    }
                    if (this.openGateIds.length == 0) {
                        this.openGateIds = [1];
                    }
                    //今日奖励
                    ds = datas[3].split(",");
                    this.loginRewardDay = Number(ds[1]);
                    this.loginRewardCount = Number(ds[2]);
                    this.loginLookVideo = Number(ds[3]);
                    this.loginRewardTime = Number(ds[0]);
                    //时间奖励
                    ds = datas[4].split(",");
                    this.timeRewardCount = Number(ds[1]);
                    this.timeRewardTime = Number(ds[0]);
                    this.jiaShuTime = 0; //ds.length >= 3 ? Number(ds[2]) : 0;
                    /**任务 */
                    ds = datas[5].split(",");
                    if (ds[1] == "null") {
                    }
                    else {
                        var es = ds[1].split("|");
                        for (var i = 0; i < es.length; i++) {
                            var fs = es[i].split("-");
                            this.taskDatas.push({ id: Number(fs[0]), count: Number(fs[1]), isGetReward: Number(fs[2]) });
                        }
                    }
                    this.taskTime = Number(ds[0]);
                    /**每日特价的上次购买时间 */
                    ds = datas[6].split(",");
                    this.dayTime = Number(ds[0]);
                    this.flyVideoTime = ds.length >= 1 ? Number(ds[1]) : 0;
                    /**邀请好友的数量 */
                    ds = datas[7].split(",");
                    this.invitationCount = Number(ds[0]);
                    this.invitationRewardCount = Number(ds[1]);
                    /**带孵化的蛋数据 */
                    if (datas[8] == "null") {
                    }
                    else {
                        ds = datas[8].split(",");
                        for (var i = 0; i < ds.length; i++) {
                            var info = new module.EggInfo();
                            info.decode(ds[i]);
                            this.eggInfoList.push(info);
                        }
                    }
                    /**场地数据 */
                    ds = datas[9].split("*");
                    for (var i = 0; i < ds.length; i++) {
                        es = ds[i].split(",");
                        var plantInfo = this.plantInfoDic.get(Number(es[0]));
                        if (es.length > 5) {
                            plantInfo.decode_ExpGrowCount(Number(es[5]));
                        }
                        plantInfo.decode_info(es[1]);
                        plantInfo.decode_haveID(es[2]);
                        plantInfo.decode_coin(es[3]);
                        plantInfo.decode_chichen(es[4]);
                    }
                    this.firstGift = Number(datas[10]);
                    // 已经解锁过的宠物数据解析完成之后，汇报离屏页做好友排行。
                    wx.postMessage({
                        type: "send", mark: Main.app.unlockPetCount, level: 0, best: Main.app.unlockPetCount, user: Main.app.mwx.mUser
                    });
                }
                this.saveOpenID();
            }
            this.getOffLineTime();
        };
        UserInfo.prototype.saveOffLineTime = function () {
            LocalStorage.setItem(UserInfo.OFFLINETIME, new Date().getTime() + "");
        };
        UserInfo.prototype.getOffLineTime = function () {
            var dataStr = LocalStorage.getItem(UserInfo.OFFLINETIME);
            if (dataStr != null && dataStr != "") {
                this.offLineTime = Number(dataStr);
            }
            else {
                this.offLineTime = 0;
            }
        };
        /**建造秘密花园 */
        UserInfo.prototype.buildCarden = function (plantId, chichenInfo) {
            var plantInfo = this.plantInfoDic.get(plantId + 100);
            plantInfo.exp = this.plantInfoDic.get(plantId).exp;
            chichenInfo.plantId = plantInfo.plantId;
            plantInfo.addChichen(chichenInfo);
            this.openGateIds.push(plantInfo.plantId);
            this.addLocalUserInfo();
            return plantInfo;
        };
        /**设置看了登录奖励的视频 */
        UserInfo.prototype.setLoginLookVideo = function (value) {
            this.loginLookVideo = 1;
            module.RaceManager.instance.event(module.RaceManager.CHANGE_USER_DATA);
            this.addLocalUserInfo();
        };
        /**设置今天领取了几次登录奖励 */
        UserInfo.prototype.setLoginRewardCount = function (value) {
            if (this.loginRewardCount == 0) {
                this.loginRewardDay += 1;
                this._loginRewardTime = new Date().getTime();
            }
            this.loginRewardCount = value;
            module.RaceManager.instance.event(module.RaceManager.CHANGE_USER_DATA);
            this.addLocalUserInfo();
        };
        Object.defineProperty(UserInfo.prototype, "loginRewardTime", {
            /**设置上次领取的时间点 */
            set: function (value) {
                this._loginRewardTime = value;
                var prevDate = new Date();
                prevDate.setTime(this._loginRewardTime);
                var nowDate = new Date();
                if (prevDate.getMonth() < nowDate.getMonth()) {
                    this.loginRewardCount = 0;
                    this.loginLookVideo = 0;
                }
                else {
                    if (prevDate.getDate() < nowDate.getDate()) {
                        this.loginRewardCount = 0;
                        this.loginLookVideo = 0;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**登录奖励是否领取完成 */
        UserInfo.prototype.checkLoginRewardComplete = function () {
            if (this.loginRewardCount < 2) {
                return false;
            }
            else {
                return true;
            }
        };
        /**时间奖励的领取次数 */
        UserInfo.prototype.setTimeRewardCount = function (value) {
            this.timeRewardCount = value;
            this._timeRewardTime = new Date().getTime();
            module.RaceManager.instance.event(module.RaceManager.CHANGE_USER_DATA);
            this.addLocalUserInfo();
        };
        Object.defineProperty(UserInfo.prototype, "timeRewardTime", {
            set: function (value) {
                this._timeRewardTime = value;
                var prevDate = new Date();
                prevDate.setTime(this._timeRewardTime);
                var nowDate = new Date();
                if (prevDate.getMonth() < nowDate.getMonth()) {
                    this.timeRewardCount = 0;
                }
                else {
                    if (prevDate.getDate() < nowDate.getDate()) {
                        this.timeRewardCount = 0;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**时间奖励今天是否领取完毕 */
        UserInfo.prototype.checkTimeRewardComplete = function () {
            if (this.timeRewardCount >= 2 || new Date().getHours() >= 22) {
                return true;
            }
            else {
                return false;
            }
        };
        Object.defineProperty(UserInfo.prototype, "taskTime", {
            /**设置上次的任务时间 */
            set: function (value) {
                this._taskTime = value;
                var prevDate = new Date();
                prevDate.setTime(this._taskTime);
                var nowDate = new Date();
                if (prevDate.getMonth() < nowDate.getMonth()) {
                    this.taskDatas = [];
                }
                else {
                    if (prevDate.getDate() < nowDate.getDate()) {
                        this.taskDatas = [];
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**获取任务数据 */
        UserInfo.prototype.getTaskData = function (id) {
            for (var i = 0; i < this.taskDatas.length; i++) {
                if (this.taskDatas[i].id == id) {
                    return this.taskDatas[i];
                }
            }
            return null;
        };
        /**获取任务奖励 */
        UserInfo.prototype.getTaskReward = function (id) {
            var data = this.getTaskData(id);
            if (data != null) {
                data.isGetReward = 1;
                module.RaceManager.instance.event(module.RaceManager.CHANGE_USER_DATA);
            }
        };
        /**增加任务完成次数 */
        UserInfo.prototype.addTaskCount = function (id) {
            var data = this.getTaskData(id);
            if (data == null) {
                data = { id: id, count: 0, isGetReward: 0 };
                this.taskDatas.push(data);
            }
            data.count += 1;
            this._taskTime = new Date().getTime();
            module.RaceManager.instance.event(module.RaceManager.CHANGE_USER_DATA);
            this.addLocalUserInfo();
        };
        /**检查任务是否全部完成 */
        UserInfo.prototype.chengTaskComplete = function () {
            for (var i = 1; i <= 4; i++) {
                var data = this.getTaskData(i);
                if (data == null) {
                    return false;
                }
                else {
                    if (data.isGetReward == 0) {
                        return false;
                    }
                }
            }
            return true;
        };
        /**设置最新的购买时间 */
        UserInfo.prototype.setDayTime = function (value) {
            this.dayTime = value;
            module.RaceManager.instance.event(module.RaceManager.CHANGE_USER_DATA);
            this.addLocalUserInfo();
        };
        /**今日特价是否完成 */
        UserInfo.prototype.checkDayTimeComplete = function () {
            var prevDate = new Date(this.dayTime);
            var nowDate = new Date();
            if (prevDate.getFullYear() < nowDate.getFullYear()) {
                return false;
            }
            else {
                if (prevDate.getMonth() < nowDate.getMonth()) {
                    return false;
                }
                else {
                    if (prevDate.getMonth() < nowDate.getMonth()) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
        };
        /**增加邀请数量 */
        UserInfo.prototype.addInvitationCount = function (value) {
            this.invitationCount += value;
            module.RaceManager.instance.event(module.RaceManager.CHANGE_USER_DATA);
            this.addLocalUserInfo();
        };
        /**增加邀请领奖数量 */
        UserInfo.prototype.addinvitationRewardCount = function (value) {
            this.invitationRewardCount += value;
            console.log("已领取人数=", this.invitationRewardCount);
            // this.invitationCount = 0;
            module.RaceManager.instance.event(module.RaceManager.CHANGE_USER_DATA);
            this.addLocalUserInfo();
        };
        UserInfo.prototype.checkInvitationComplete = function () {
            return this.invitationRewardCount >= 50;
        };
        Object.defineProperty(UserInfo.prototype, "flyVideoTime", {
            /**设置飞行宝箱出现的时间 */
            set: function (value) {
                this._flyVideoTime = value;
                this.flyVideDownTime = 0; //30 * 60 * 1000 - (new Date().getTime() - this._flyVideoTime);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfo.prototype, "jiaShuTime", {
            set: function (value) {
                this._jiaShuTime = value;
                this.jiashuDownTime = this._jiaShuingTime * 60 * 1000 - (new Date().getTime() - this._jiaShuTime);
            },
            enumerable: true,
            configurable: true
        });
        UserInfo.USER_OPENID = "CHICHENS_" + "USER_OPENID3";
        UserInfo.USERINFO = "CHICHENS_" + "USERINFO11";
        UserInfo.OFFLINETIME = "CHICHENS_" + "OFFLINETIME";
        return UserInfo;
    }());
    module.UserInfo = UserInfo;
})(module || (module = {}));
//# sourceMappingURL=UserInfo.js.map