/**
* name 
*/
module module {
	import Dictionary = laya.utils.Dictionary;
	import LocalStorage = laya.net.LocalStorage;

	export class UserInfo {
		public IDS: number = 100;

		public static USER_OPENID: string = "CHICHENS_" + "USER_OPENID3";
		public static USERINFO: string = "CHICHENS_" + "USERINFO11";
		public static OFFLINETIME: string = "CHICHENS_" + "OFFLINETIME";

		/**用户ID */
		public uerId: number = 0;

		/**openID */
		public openID: string = "";

		/**苹果数量 */
		public apple: number = 0;

		/**金币数量 */
		public coin: number = 0;

		/**羽毛数量 */
		public wing: number = 0;



		/**已经开启的孵化格子序号 */
		public openSlotIndexs: Array<number> = [];

		/**开启的场地ID */
		public openGateIds: Array<number> = [];

		/**场地数据 */
		public plantInfoDic: Dictionary = new Dictionary();

		/**带孵化的蛋数据 */
		public eggInfoList: Array<EggInfo> = new Array<EggInfo>();

		/**已经创建的蛋的数量 */
		public createEggCount1: number = 0;

		public createEggCount2: number = 0;
		public createEggCount3: number = 0;
		public createEggCount4: number = 0;
		public createEggCount5: number = 0;
		public createEggCount6: number = 0;
		public createEggCount7: number = 0;
		public createEggCount8: number = 0;

		public firstGift: number = 0;


		/**新手引导步骤 */
		public guidStep: number = 1;

		public guid_run: number = 0;

		/**上次完成的时间点 */
		private _loginRewardTime: number = 0;
		/**已领取完了第几天 */
		public loginRewardDay: number = 0;
		/**今天领取了几次，每天可以领取两次 */
		public loginRewardCount: number = 0;
		/**是否看了视频 */
		public loginLookVideo: number = 0;

		/**时间奖励上次领取的时间 */
		private _timeRewardTime: number = 0;
		/**今天领取的次数 */
		public timeRewardCount: number = 0;

		/**开启加速的时间 */
		private _jiaShuTime: number = 0;
		/**加速持续时间--单位：分钟*/
		public _jiaShuingTime: number = 10
		/**加速剩余时间 */
		public jiashuDownTime: number = 0;

		/**上次做任务的时间 */
		private _taskTime: number = 0;
		/**任务数据 */
		public taskDatas: Array<any> = [];

		/**每日特价的上次购买时间 */
		public dayTime: number = 0;
		/**飞行视频宝箱上次出现的时间 */
		private _flyVideoTime: number = 0;
		//不用存 ,飞行宝箱的剩余时间
		public flyVideDownTime: number = 0;

		/**邀请好友的数量 */
		public invitationCount: number = 0;
		/**已领取奖励的序号 */
		public invitationRewardCount: number = 0;

		/**离线时间 */
		public offLineTime: number = 0;
		// 孵蛋时间数组--单位秒
		public broodArr: Array<number> = [30, 120, 300, 420, 600, 900, 1200, 1500, 1800, 2700, 3600, 7200]

		public AllUserData: any
		constructor() {

			this._jiaShuingTime = Main.app.mwx.nDoubleSpeedTime
			console.log("加速时间", this._jiaShuingTime)

		}

		/** */
		public changeApple(value: number): void {
			this.apple += value;
			if (this.apple % 100 == 0) {
				this.addLocalUserInfo();
				console.log("苹果改变 偏差100")
			}
		}

		/* 金币数值改变 */
		public changeCoin(value: number): void {
			this.coin += value;
			if (this.coin % 50 == 0) {
				this.addLocalUserInfo();
			}
		}

		/** */
		public changeWing(value: number): void {
			this.wing += value;
			this.addLocalUserInfo();
		}

		/**添加一个蛋 */
		public addEgg(plantId: number): EggInfo {
			var index: number = this.findNullSlot();
			var info: EggInfo = new EggInfo();
			info.plantId = plantId;
			info.slotIndex = index;

			for (var i = 1; i < 9; i++) {
				if (plantId == i) {
					info.setTime(this.broodArr[this['createEggCount' + i] > this.broodArr.length - 1 ? this.broodArr.length - 1 : this['createEggCount' + i]] * 1000)
					this['createEggCount' + i] += 1
				}
			}





			this.eggInfoList.push(info);
			// this.createEggCount += 1;
			this.addLocalUserInfo();

			return info;
		}

		/**移除一个蛋 */
		public removeEgg(eggInfo: EggInfo): void {
			for (var i: number = 0; i < this.eggInfoList.length; i++) {
				if (this.eggInfoList[i].eggId == eggInfo.eggId) {
					this.eggInfoList.splice(i, 1);
					break;
				}
			}
			// wx.postMessage({
			//         type: "send", mark: this.eggInfoList.length, level: 0, best:this.eggInfoList.length, user: Main.app.mwx.mUser
			//     });
			this.addLocalUserInfo();
		}

		/**这个格子是否开启 */
		public isOpenSlot(index: number): boolean {
			return this.openSlotIndexs.indexOf(index) >= 0;
		}

		/**查找这个格子上是否有蛋  */
		public getEggInfoByIndex(index: number): EggInfo {
			for (var i: number = 0; i < this.eggInfoList.length; i++) {
				if (this.eggInfoList[i].slotIndex == index) {
					return this.eggInfoList[i];
				}
			}
			return null;
		}

		/**找一个空格子 */
		public findNullSlot(): number {
			for (var i: number = 0; i < this.openSlotIndexs.length; i++) {
				if (this.getEggInfoByIndex(this.openSlotIndexs[i]) == null) {
					return this.openSlotIndexs[i];
				}
			}
			return 0;
		}

		/**找到一个未开启的格子 */
		public findCloseSlot(): number {
			for (var i: number = 1; i <= 6; i++) {
				if (this.openSlotIndexs.indexOf(i) < 0) {
					return i;
				}
			}
			return 0;
		}

		/**开启一个格子 */
		public openEggSlot(index: number): void {
			if (this.openSlotIndexs.indexOf(index) < 0) {
				this.openSlotIndexs.push(index);
				this.addLocalUserInfo();
			}
		}

		/**保存玩家的openID */
		public saveOpenID(): void {
			LocalStorage.setItem(UserInfo.USER_OPENID, this.openID);
		}

		/**获取OpenID */
		public getLocalOpenId(): string {
			var dataStr: string = LocalStorage.getItem(UserInfo.USER_OPENID);
			if (dataStr != null && dataStr != "") {
				this.openID = dataStr;
			}
			return dataStr;
		}

		/**保存基础数据 */
		public addLocalUserInfo(): void {
			var list: Array<string> = [];

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

			list.push(this.firstGift.toString())
			LocalStorage.setItem(UserInfo.USERINFO, list.join("$"));
			// manager.ResVersionMgr.instance.saveData(this.uerId, list.join("$"));
			this.AllUserData = list.join("$")
		}

		public UpDateUserValue() {
			if (this.AllUserData != null) {
				Main.app.mwx.SetUserValue("AllUserValue", this.AllUserData);
			}
		}

		/**格式化任务 */
		private getTaskDataString(): string {
			var list: Array<string> = [];
			for (var i: number = 0; i < this.taskDatas.length; i++) {
				list.push(this.taskDatas[i].id + "-" + this.taskDatas[i].count + "-" + this.taskDatas[i].isGetReward);
			}
			return list.length == 0 ? "null" : list.join("|");
		}

		/**格式化蛋 */
		private getEggInfoString(): string {
			var list: Array<string> = [];
			for (var i: number = 0; i < this.eggInfoList.length; i++) {
				list.push(this.eggInfoList[i].toString());
			}
			return list.length == 0 ? "null" : list.join(",");
		}

		/**格式化产地 */
		private getPlantInfoString(): string {
			var list: Array<string> = [];
			for (var i: number = 0; i < this.plantInfoDic.values.length; i++) {
				list.push(this.plantInfoDic.values[i].toString());
			}
			return list.join("*");
		}

		/**获取保存的通关信息 */
		public getLocalStorage(): void {
			var dataStr: string = LocalStorage.getItem(UserInfo.USERINFO);
			if (dataStr != null && dataStr != "") {
				var datas: Array<string> = dataStr.split("$");

				//基本信息
				var ds: Array<string> = datas[0].split(",");
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
				for (var i: number = 0; i < ds.length; i++) {
					if (this.openSlotIndexs.indexOf(Number(ds[i])) < 0) {
						this.openSlotIndexs.push(Number(ds[i]));
					}
				}

				/**开启的场地ID */
				ds = datas[2].split(",");
				for (var i: number = 0; i < ds.length; i++) {
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
				this.jiaShuTime = 0;//ds.length >= 3 ? Number(ds[2]) : 0;

				/**任务 */
				ds = datas[5].split(",");
				if (ds[1] == "null") {
				} else {
					var es: Array<string> = ds[1].split("|");
					for (var i: number = 0; i < es.length; i++) {
						var fs: Array<string> = es[i].split("-")
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

				} else {
					ds = datas[8].split(",");
					for (var i: number = 0; i < ds.length; i++) {
						var info: EggInfo = new EggInfo();
						info.decode(ds[i]);
						this.eggInfoList.push(info);
					}
				}

				/**场地数据 */
				ds = datas[9].split("*");

				for (var i: number = 0; i < ds.length; i++) {
					es = ds[i].split(",");
					var plantInfo: PlantInfo = this.plantInfoDic.get(Number(es[0]));
					if (es.length > 5) {
						plantInfo.decode_ExpGrowCount(Number(es[5]));
					}
					plantInfo.decode_info(es[1]);
					plantInfo.decode_haveID(es[2]);
					plantInfo.decode_coin(es[3]);
					plantInfo.decode_chichen(es[4]);
				}

				this.firstGift = Number(datas[10])

			} else {
				this.uerId = 11031;
				this.openID = new Date().getTime() + "";
				this.coin = 500;
				this.wing = 0;
				this.openSlotIndexs = [1, 2];
				this.openGateIds = [1];
			}

			this.getOffLineTime();
		}

		/**解析用户数据 */
		public decodeUserData(dataStr: string): void {
			if (dataStr != null && dataStr != "") {
				var datas: Array<string> = dataStr.split("$");

				if (dataStr == "fail") {
					//基本信息
					var ds: Array<string> = datas[0].split(",");
					this.uerId = Number(ds[0]);
					this.openID = ds[1];
					this.coin = 500;
					this.wing = 0;
					this.openSlotIndexs = [1, 2];
					this.openGateIds = [1];
					console.log("解析用户数据length = 1")

					this.addLocalUserInfo();
				}

				if (datas.length == 1) {
					//基本信息
					var ds: Array<string> = datas[0].split(",");
					this.uerId = Number(ds[0]);
					this.openID = ds[1];
					this.coin = 500;
					this.wing = 0;
					this.openSlotIndexs = [1, 2];
					this.openGateIds = [1];
					console.log("解析用户数据length = 1")

					this.addLocalUserInfo();
				} else {
					//基本信息
					console.log("解析用户数据length 》 1")
					var ds: Array<string> = datas[0].split(",");
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
					for (var i: number = 0; i < ds.length; i++) {
						if (this.openSlotIndexs.indexOf(Number(ds[i])) < 0) {
							this.openSlotIndexs.push(Number(ds[i]));
						}
					}

					if (this.openSlotIndexs.length <= 2) {
						this.openSlotIndexs = [1, 2];
					}

					/**开启的场地ID */
					ds = datas[2].split(",");
					for (var i: number = 0; i < ds.length; i++) {
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
					this.jiaShuTime = 0;//ds.length >= 3 ? Number(ds[2]) : 0;

					/**任务 */
					ds = datas[5].split(",");
					if (ds[1] == "null") {
					} else {
						var es: Array<string> = ds[1].split("|");
						for (var i: number = 0; i < es.length; i++) {
							var fs: Array<string> = es[i].split("-")
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

					} else {
						ds = datas[8].split(",");
						for (var i: number = 0; i < ds.length; i++) {
							var info: EggInfo = new EggInfo();
							info.decode(ds[i]);
							this.eggInfoList.push(info);
						}
					}

					/**场地数据 */
					ds = datas[9].split("*");
					for (var i: number = 0; i < ds.length; i++) {
						es = ds[i].split(",");
						var plantInfo: PlantInfo = this.plantInfoDic.get(Number(es[0]));
						if (es.length > 5) {
							plantInfo.decode_ExpGrowCount(Number(es[5]));
						}
						plantInfo.decode_info(es[1]);
						plantInfo.decode_haveID(es[2]);
						plantInfo.decode_coin(es[3]);
						plantInfo.decode_chichen(es[4]);
					}
					this.firstGift = Number(datas[10])
					// 已经解锁过的宠物数据解析完成之后，汇报离屏页做好友排行。
					wx.postMessage({
						type: "send", mark: Main.app.unlockPetCount, level: 0, best: Main.app.unlockPetCount, user: Main.app.mwx.mUser
					});
				}

				this.saveOpenID();
			}

			this.getOffLineTime();
		}

		public saveOffLineTime(): void {
			LocalStorage.setItem(UserInfo.OFFLINETIME, new Date().getTime() + "");
		}

		public getOffLineTime(): void {
			var dataStr: string = LocalStorage.getItem(UserInfo.OFFLINETIME);
			if (dataStr != null && dataStr != "") {
				this.offLineTime = Number(dataStr);
			} else {
				this.offLineTime = 0;
			}
		}

		/**建造秘密花园 */
		public buildCarden(plantId: number, chichenInfo: ChichenInfo): PlantInfo {
			var plantInfo: PlantInfo = this.plantInfoDic.get(plantId + 100);
			plantInfo.exp = this.plantInfoDic.get(plantId).exp;
			chichenInfo.plantId = plantInfo.plantId;
			plantInfo.addChichen(chichenInfo);
			this.openGateIds.push(plantInfo.plantId);
			this.addLocalUserInfo();
			return plantInfo;
		}

		/**设置看了登录奖励的视频 */
		public setLoginLookVideo(value: boolean): void {
			this.loginLookVideo = 1;
			RaceManager.instance.event(RaceManager.CHANGE_USER_DATA);
			this.addLocalUserInfo();
		}

		/**设置今天领取了几次登录奖励 */
		public setLoginRewardCount(value: number): void {
			if (this.loginRewardCount == 0) {
				this.loginRewardDay += 1;
				this._loginRewardTime = new Date().getTime();
			}

			this.loginRewardCount = value;
			RaceManager.instance.event(RaceManager.CHANGE_USER_DATA);
			this.addLocalUserInfo();
		}

		/**设置上次领取的时间点 */
		public set loginRewardTime(value: number) {
			this._loginRewardTime = value;

			var prevDate: Date = new Date();
			prevDate.setTime(this._loginRewardTime);
			var nowDate: Date = new Date();

			if (prevDate.getMonth() < nowDate.getMonth()) {
				this.loginRewardCount = 0;
				this.loginLookVideo = 0;
			} else {
				if (prevDate.getDate() < nowDate.getDate()) {
					this.loginRewardCount = 0;
					this.loginLookVideo = 0;
				}
			}
		}

		/**登录奖励是否领取完成 */
		public checkLoginRewardComplete(): boolean {
			if (this.loginRewardCount < 2) {
				return false;
			} else {
				return true;
			}
		}

		/**时间奖励的领取次数 */
		public setTimeRewardCount(value: number): void {
			this.timeRewardCount = value;
			this._timeRewardTime = new Date().getTime();
			RaceManager.instance.event(RaceManager.CHANGE_USER_DATA);
			this.addLocalUserInfo();
		}

		public set timeRewardTime(value: number) {
			this._timeRewardTime = value;

			var prevDate: Date = new Date();
			prevDate.setTime(this._timeRewardTime);
			var nowDate: Date = new Date();

			if (prevDate.getMonth() < nowDate.getMonth()) {
				this.timeRewardCount = 0;
			} else {
				if (prevDate.getDate() < nowDate.getDate()) {
					this.timeRewardCount = 0;
				}
			}
		}

		/**时间奖励今天是否领取完毕 */
		public checkTimeRewardComplete(): boolean {
			if (this.timeRewardCount >= 2 || new Date().getHours() >= 22) {
				return true;
			} else {
				return false;
			}
		}

		/**设置上次的任务时间 */
		public set taskTime(value: number) {
			this._taskTime = value;

			var prevDate: Date = new Date();
			prevDate.setTime(this._taskTime);
			var nowDate: Date = new Date();

			if (prevDate.getMonth() < nowDate.getMonth()) {
				this.taskDatas = [];
			} else {
				if (prevDate.getDate() < nowDate.getDate()) {
					this.taskDatas = [];
				}
			}
		}

		/**获取任务数据 */
		public getTaskData(id: number): any {
			for (var i: number = 0; i < this.taskDatas.length; i++) {
				if (this.taskDatas[i].id == id) {
					return this.taskDatas[i];
				}
			}
			return null;
		}

		/**获取任务奖励 */
		public getTaskReward(id: number): void {
			var data: any = this.getTaskData(id);
			if (data != null) {
				data.isGetReward = 1;
				RaceManager.instance.event(RaceManager.CHANGE_USER_DATA);
			}
		}

		/**增加任务完成次数 */
		public addTaskCount(id: number): void {
			var data: any = this.getTaskData(id);
			if (data == null) {
				data = { id: id, count: 0, isGetReward: 0 };
				this.taskDatas.push(data);
			}

			data.count += 1;
			this._taskTime = new Date().getTime();
			RaceManager.instance.event(RaceManager.CHANGE_USER_DATA);
			this.addLocalUserInfo();
		}

		/**检查任务是否全部完成 */
		public chengTaskComplete(): boolean {
			for (var i: number = 1; i <= 4; i++) {
				var data: any = this.getTaskData(i);
				if (data == null) {
					return false;
				} else {
					if (data.isGetReward == 0) {
						return false;
					}
				}
			}
			return true;
		}

		/**设置最新的购买时间 */
		public setDayTime(value: number): void {
			this.dayTime = value;
			RaceManager.instance.event(RaceManager.CHANGE_USER_DATA);
			this.addLocalUserInfo();
		}

		/**今日特价是否完成 */
		public checkDayTimeComplete(): boolean {
			var prevDate: Date = new Date(this.dayTime);
			var nowDate: Date = new Date();
			if (prevDate.getFullYear() < nowDate.getFullYear()) {
				return false;
			}
			else {
				if (prevDate.getMonth() < nowDate.getMonth()) {
					return false;
				} else {
					if (prevDate.getMonth() < nowDate.getMonth()) {
						return false;
					} else {
						return true;
					}
				}
			}


		}
		/**增加邀请数量 */
		public addInvitationCount(value: number): void {
			this.invitationCount += value;
			RaceManager.instance.event(RaceManager.CHANGE_USER_DATA);
			this.addLocalUserInfo();
		}

		/**增加邀请领奖数量 */
		public addinvitationRewardCount(value: number): void {
			this.invitationRewardCount += value;
			console.log("已领取人数=", this.invitationRewardCount)
			// this.invitationCount = 0;
			RaceManager.instance.event(RaceManager.CHANGE_USER_DATA);
			this.addLocalUserInfo();
		}

		public checkInvitationComplete(): boolean {
			return this.invitationRewardCount >= 50;
		}

		/**设置飞行宝箱出现的时间 */
		public set flyVideoTime(value: number) {
			this._flyVideoTime = value;
			this.flyVideDownTime = 0;//30 * 60 * 1000 - (new Date().getTime() - this._flyVideoTime);
		}

		public set jiaShuTime(value: number) {
			this._jiaShuTime = value;
			this.jiashuDownTime = this._jiaShuingTime * 60 * 1000 - (new Date().getTime() - this._jiaShuTime);
		}
	}
}