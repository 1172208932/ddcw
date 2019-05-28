/**
* name 
*/
module module {
	import Point = laya.maths.Point;

	export class ChichenInfo {
		public static IDS: number = 1;
		/**站立中*/
		public static STATE_STAND: number = 1;
		/**吃东西 */
		public static STATE_EAT: number = 2;
		/**漫步 */
		public static STATE_WALK: number = 3;
		/**狂躁中 */
		public static STATE_RUN: number = 4;
		/**睡眠中 */
		public static STATE_SLEEP: number = 5;
		/**喂食 */
		public static STATE_MEAL: number = 6;
		/**惊吓 */
		public static STATE_HOCK: number = 7;
		/**喂食时吃东西 */
		public static STATE_MEAL_EAT: number = 8;

		public id: number = 0;
		/**配置ID */
		public configId: number = 0;
		/**所在场地ID */
		public plantId: number = 0;
		/**名字 */
		public name: string = "";
		/**体重 */
		public weight: number = 0;
		/**等级 */
		private _level: number = 1;
		/**星级 */
		public star: number = 0;
		/**喂食的经验 */
		public mealExp: number = 0;
		/**帽子ID */
		public hatId: number = 0;

		/** */
		public xx: number = 0;

		public yy: number = 0;

		//////////////////////////////不用存///////////////////////////////
		private _config: ChichenConfig = null;

		/**状态 */
		public state: number = 1;

		public time: number = 2000;

		public t1: number = 0;

		public max: number = 0;

		public cp: Array<Point> = new Array<Point>();

		public cpIndex: number = 1;

		public moveCp: Array<Point> = new Array<Point>();

		public movet1: number = 1;

		public moveMax: number = 0;

		/**被点中多少次后，进入睡眠 */
		public goSleepCount: number = 40;

		/**自动加金币和经验的时间 */
		public addCoinExpTime: number = 0;
		public attenuationTime: number = 0; // 自动加金币衰减时间
		///////////////////////////////////////////////////////////////////

		constructor(value: ChichenConfig, plantId: number) {
			this.id = RaceManager.instance.userInfo.IDS++;
			this.plantId = plantId;
			this.weight = this.getWeight(1);
			this.name = RaceManager.instance.chichenNames[Math.floor(Math.random() * RaceManager.instance.chichenNames.length)];
			this._config = value;
			this.configId = this._config != null ? this._config.configId : 0;
			this.checkCoinExpTime();
		}

		private checkCoinExpTime(): void {
			// 初始化宠物自动加经验和金币衰减时间
			// 如果是新的一天，重置时间。不是新的一天，取本地保存的值。
			if (Main.app.is_wx) {
				var saveTime: string = wx.getStorageSync(Main.DianDianChongWu_NowDay2);
				if (saveTime == Main.app.mwx.nowday) {
					var coinexpTime: number = wx.getStorageSync(Main.DianDianChongWu_ADD_COINEXP_TIME);
					if (!!coinexpTime) {
						this.addCoinExpTime = coinexpTime + Math.round((Math.random() * RaceManager.instance.addCoinExpMaxTime + 1) * 1000);
					} else {
						this.addCoinExpTime = Math.round((Math.random() * RaceManager.instance.addCoinExpMaxTime + 1) * 1000);
					}
					var attTime: number = wx.getStorageSync(Main.DianDianChongWu_DDCW_ATTENUATION_TIME);
					if (!!attTime) this.attenuationTime = attTime;
				} else {
					this.addCoinExpTime = Math.round((Math.random() * RaceManager.instance.addCoinExpMaxTime + 1) * 1000);
					this.attenuationTime = 0;
				}
				wx.setStorageSync(Main.DianDianChongWu_NowDay2, Main.app.mwx.nowday);
			} else {
				this.addCoinExpTime = Math.round((Math.random() * RaceManager.instance.addCoinExpMaxTime + 1) * 1000);
				this.attenuationTime = 0;
			}

		}

		public get config(): ChichenConfig {
			return this._config;
		}

		public set level(value: number) {
			if (this._level != value) {
				this.weight = this.getWeight(value);
			}
			this._level = value;
		}

		public get level(): number {
			return this._level;
		}

		public getWeithStr(): string {
			var a: number = Math.floor(this.weight);
			var b: number = Math.floor(this.weight * 100 % 100);
			return a + "d" + b + "k";
		}

		private getWeight(value: number): number {
			switch (value) {
				case 1:
					return 0.5 + (Math.floor((Math.random() * (0.85 - 0.5)) * 100) / 100);
				case 2:
					return 1.5 + (Math.floor((Math.random() * (1.85 - 1.5)) * 100) / 100);
				case 3:
					return 2.5 + (Math.floor((Math.random() * (2.85 - 2.5)) * 100) / 100);
				case 4:
					return 3.5 + (Math.floor((Math.random() * (3.85 - 3.5)) * 100) / 100);
				case 5:
					return 4.5 + (Math.floor((Math.random() * (4.85 - 4.5)) * 100) / 100);
				case 6:
					return 5.5 + (Math.floor((Math.random() * (5.85 - 5.5)) * 100) / 100);
				case 7:
					return 6.5 + (Math.floor((Math.random() * (6.85 - 6.5)) * 100) / 100);
				case 8:
					return 7.5 + (Math.floor((Math.random() * (7.85 - 7.5)) * 100) / 100);
				case 9:
					return 8.5 + (Math.floor((Math.random() * (8.85 - 8.5)) * 100) / 100);
				case 10:
					return 9.5 + (Math.floor((Math.random() * (9.85 - 9.5)) * 100) / 100);
			}
		}

		public get scale(): number {
			return this.config.getScale(this._level);
		}

		public get money(): number {
			return (this.star + 1) * (this._level * 10);
		}

		public getExp(): number {
			return this.star + 1;
		}

		/* 自动产金币和经验的CD没帧减掉30ms，加速期间如果CD大于3s的，重置为3s。 */
		public changeAddCoinExpTime(value: number): void {
			if (RaceManager.instance.userInfo.jiashuDownTime > 0) {
				if (this.addCoinExpTime > 5 * 1000) {
					var num = Math.round(Math.random() * 2000);
					this.addCoinExpTime = 3 * 1000 + num;
				}
			}
			this.addCoinExpTime -= value;
		}

		/* 重置自动产金币和经验的时间，加速期间为3sCD。 */
		public resetAddCoinExpTime(): void {
			if (RaceManager.instance.userInfo.jiashuDownTime > 0) {
				this.addCoinExpTime = 3 * 1000;
			} else {
				this.addCoinExpTime = (RaceManager.instance.addCoinExpMaxTime + this.attenuationTime) * 1000;
			}
			if (Main.app.is_wx) {
				wx.setStorageSync(Main.DianDianChongWu_ADD_COINEXP_TIME, this.addCoinExpTime);
			}

		}

		public resetAttenuationTime(): void {
			this.attenuationTime += 1;
			if (Main.app.is_wx) {
				wx.setStorageSync(Main.DianDianChongWu_DDCW_ATTENUATION_TIME, this.attenuationTime);
			}
		}

		public toString(): string {
			return this.id + "-" + this.configId + "-" + this.plantId + "-" + this.name + "-" + this.weight + "-" + this._level + "-" + this.star + "-" + this.mealExp + "-" + this.xx + "-" + this.yy + "-" + this.hatId;
		}

		public decode(value: string): void {
			var ss: Array<string> = value.split("-");
			this.id = Number(ss[0]);
			this.configId = Number(ss[1]);
			this.plantId = Number(ss[2]);
			this.name = ss[3];
			this.weight = Number(ss[4]);
			this._level = Number(ss[5]);
			this.star = Number(ss[6]);
			this.mealExp = Number(ss[7]);
			this.xx = Number(ss[8]);
			this.yy = Number(ss[9]);
			this.hatId = ss.length >= 11 ? Number(ss[10]) : 0;//Math.floor(Math.random() * 11 + 1);//

			if (this.star == 3) {
				this.level = 10;
			}

			this._config = RaceManager.instance.chichenConfigDic.get(this.configId);
		}
	}
}