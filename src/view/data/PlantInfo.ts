/**
* name 
*/
module module {
	import Rectangle = laya.maths.Rectangle;
	import Point = laya.maths.Point;

	export class PlantInfo {
		/**场地ID */
		public plantId: number = 1;

		/**当前经验值 */
		public exp: number = 0;

		/**最大容量 */
		public maxCount: number = 10;

		/**经验重置次数 */
		public expResetCount: number = 0;

		/**已拥有过的ID */
		public haveChichenIds: Array<number> = [];
		/**在场地中的所有动物 */
		public chichenInfoList: Array<ChichenInfo> = new Array<ChichenInfo>();
		/**场地中的金币 */
		public coinInfoList: Array<CoinInfo> = new Array<CoinInfo>();

		/**是否正在显示秘密花园 */
		public showCarden: number = 0;

		//////////////////////////////////////////不用存/////////////////////////////

		/**动物的活动范围 */
		public rect: Rectangle = new Rectangle(10, 400, 750, 515);

		/**最大经验值，达到这个值后，可以出一个蛋 */
		public _maxExp: number = 100;

		/**开启需要的羽毛 */
		public money: number = 0;

		/**可以所用的动物ID */
		public chichenIdList: Array<number> = [];

		///////////////////////////////////////////////////////////////////////////////

		/* 场地前三次开蛋需要的经验为 10 * this.chichenInfoList.length */
		/* 之后开蛋需要的经验为 30 * this.chichenInfoList.length */
		/* 此属性记录场地开蛋开了多少次 */
		public expGrowCount:number = 0;

		constructor(id: number) {
			this.plantId = id;
		}

		/* 加经验 */
		public addExp(value:number):void {
			var slotIndex: number = RaceManager.instance.userInfo.findNullSlot();
			if (slotIndex == 0) {
				this.exp += value / 3;
			} else {
				this.exp += value;
			}
		}

		/* 重置经验 */
		public resetExp(): void {
			this.exp = 0;
			this.isNewEgg = false;
			this.expResetCount += 1;
		}

		/**在场地中添加一个金币 */
		public addCoin(pos: Point): CoinInfo {
			var info: CoinInfo = new CoinInfo();
			info.x = pos.x;
			info.y = pos.y;
			info.plantId = this.plantId;
			this.coinInfoList.push(info);
			return info;
		}

		/**移除一个金币 */
		public removeCoin(coinInfo: CoinInfo): void {
			for (var i: number = 0; i < this.coinInfoList.length; i++) {
				if (this.coinInfoList[i].coinId == coinInfo.coinId) {
					this.coinInfoList.splice(i, 1);
					break;
				}
			}
		}

		public isNewEgg: boolean = false;
		/**是否可以产蛋 */
		public isAddEgg(): boolean {
			this.isNewEgg = this.exp >= this.maxExp;
			if (this.isNewEgg) this.addEggCount();
			return this.isNewEgg;
		}

		// 最大经验值通过场地中的动物数量而定
		public get maxExp():number {
			if (this.expGrowCount < 3) {
				return 10 * this.chichenInfoList.length;
			}
			return 30 * this.chichenInfoList.length;
		}

		/**从蛋里面开一个鸡出来 */
		public createChichenByEgg(configID:number):ChichenInfo {
			var chichenInfo: ChichenInfo = this.createChichen(configID);
			return chichenInfo;
		}

		/* 加开蛋次数 */
		public addEggCount():void {
			if (this.expGrowCount > 2) {
				return;
			}
			this.expGrowCount ++;
		}

		/**添加一个动物到场地中 */
		public addChichen(info: ChichenInfo): void {
			this.chichenInfoList.push(info);
			info.xx = this.getX();
			info.yy = this.getY();
		}

		/**移除一个动物 */
		public removeChichen(info: ChichenInfo): void {
			for (var i: number = 0; i < this.chichenInfoList.length; i++) {
				if (this.chichenInfoList[i].id == info.id) {
					this.chichenInfoList.splice(i, 1);
				}
			}
		}

		/**获取在场地中的鸡的数量 */
		public getChichenCount(): number {
			return this.chichenInfoList.length;
		}

		public getChiChenInfoByConfigId(configId: number): ChichenInfo {
			for (var j: number = 0; j < this.chichenInfoList.length; j++) {
				if (this.chichenInfoList[j].configId == configId) {
					return this.chichenInfoList[j];
				}
			}
			return null;
		}

		/**是否拥有过这个鸡 */
		public isHaveChichenIds(configId: number): boolean {
			return this.haveChichenIds.indexOf(configId) >= 0;
		}

		/**获取动物可以出现的位置 */
		public getX(): number {
			return this.rect.x + Math.floor(Math.random() * (this.rect.width));
		}

		/**获取动物可以出现的位置 */
		public getY(): number {
			return this.rect.y + Math.floor(Math.random() * this.rect.height);
		}

		/**创建一个动物到当前场地中 */
		private createChichen(configId: number): ChichenInfo {
			return new ChichenInfo(RaceManager.instance.chichenConfigDic.get(configId), this.plantId);
		}

		public set chichenIds(value: string) {
			var ss: Array<string> = value.split(",");
			for (var i: number = 0; i < ss.length; i++) {
				this.chichenIdList.push(Number(ss[i]));
			}
		}

		public toString(): string {
			var list: Array<string> = [];

			list.push(this.plantId + "");

			list.push(this.exp + "-" + this.expResetCount);

			list.push(this.getHaveChichenidString());

			list.push(this.getCoinInfoString());

			list.push(this.getChichenInfoString());

			list.push(this.expGrowCount + ""); // 此场地产蛋次数 大于3此之后需要的经验就多了

			return list.join(",");
		}

		private getHaveChichenidString(): string {
			return this.haveChichenIds.length == 0 ? "null" : this.haveChichenIds.join("-");
		}

		/**格式化金币 */
		private getCoinInfoString(): string {
			var list: Array<string> = [];
			for (var i: number = 0; i < this.coinInfoList.length; i++) {
				list.push(this.coinInfoList[i].toString());
			}
			return list.length == 0 ? "null" : list.join("|");
		}

		/**格式化鸡 */
		private getChichenInfoString(): string {
			var list: Array<string> = [];
			for (var i: number = 0; i < this.chichenInfoList.length; i++) {
				list.push(this.chichenInfoList[i].toString());
			}
			return list.length == 0 ? "null" : list.join("|");
		}

		public decode_info(value:string):void {
			var ss:Array<string> = value.split("-");
			this.exp = Number(ss[0]);
			this.expResetCount = ss.length >= 2 ? Number(ss[1]) : 0;
		}

		decode_ExpGrowCount(value:number):void {
			this.expGrowCount = value;
		}

		public decode_haveID(value:string): void {
			if (!!value) {
				var ss:Array<string> = value.split("-");
				for (var i:number = 0; i < ss.length; i ++) {
					this.haveChichenIds.push(Number(ss[i]));
					if (Number(ss[i]) > 0) {
						Main.app.unlockPetCount ++;
					}
				}
			}
		}

		public decode_coin(value: string): void {
			if (value == "null") {
			} else {
				var ss: Array<string> = value.split("|");
				for (var i: number = 0; i < ss.length; i++) {
					var info: CoinInfo = new CoinInfo();
					info.decode(ss[i]);
					this.coinInfoList.push(info);
				}
			}
		}

		public decode_chichen(value: string): void {
			if (value == "null") {
			} else {
				var ss: Array<string> = value.split("|");
				for (var i: number = 0; i < ss.length; i++) {
					var info: ChichenInfo = new ChichenInfo(null, 0);
					info.decode(ss[i]);
					this.chichenInfoList.push(info);
					console.log(info.id + ":" + info.name)
				}
			}
		}
	}
}