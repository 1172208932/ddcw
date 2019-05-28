/**
 * 飞水滴到花朵上
* name 
*/
module module{
	import Point = laya.maths.Point;
	import Dictionary = laya.utils.Dictionary;

	export class FlyWaterAction{
		private contentView:laya.ui.Component = null;
		
		private isStarted:boolean = false;

		public itemList:Array<WaterFlyItem> = new Array<WaterFlyItem>();

		public expPos:Point = null;
		public coinPos:Point = null;
		public wingPos:Point = null;

		constructor(view:laya.ui.Component){
			this.contentView = view;
		}

		private initEvents():void{
			
		}

		private removeEvents():void{
			
		}

		private getEndPos(type:number):Point{
			if(type == 1 || type == 11){
				return this.expPos;
			}else if(type == 2){
				return this.coinPos;
			}else if(type == 3){
				return this.wingPos;
			}else{
				return new Point(10 , 10);
			}
		}

		public getkey(type:number , data?:Array<any>):string{
			if(type == 1 || type == 11){
				return "1-" + data[1];
			}else if(type == 2){
				return type + "-c";
			}
		}

		private hideDic:laya.utils.Dictionary = new laya.utils.Dictionary();
		private addToHide(item:WaterFlyItem):void{
			var key:string = item.key;

			var list:Array<WaterFlyItem> = this.hideDic.get(key);
			if(list == null){
				list = new Array<WaterFlyItem>();
				this.hideDic.set(key , list);
			}
			list.push(item);
		}

		private findItem(type:number , score:number , data?:Array<any>):WaterFlyItem{
			var item:WaterFlyItem = null;
			var key:string = this.getkey(type , data);

			var list:Array<WaterFlyItem> = this.hideDic.get(key);
			if(list != null && list.length > 0){
				item = list.shift();
				item.reset(type , score , data);
			}else{
				item = new WaterFlyItem(type , score , data);
			}
			return item;
		}

		/**飞 一个 水滴到 花朵上 */
		public flyWater(beginPos:Point, type:number, score:number, data?:Array<any>):void {
			// 限制同时存在的动画数量
			if (this.itemList.length >= 10) {
				return;
			}
			var endPos:Point = this.getEndPos(type);
			var sy:number = -100;
			var sc:number = 0.5 + Math.random() * 0.3;
			var length:number = ((Math.random()*2 >= 1) ? 200 : -200) * (Math.random() * 2);

			var item:WaterFlyItem = this.findItem(type , score , data);
			item.cp.push(beginPos);
			var p:Point = core.Utils.getBezier2TP(beginPos , endPos , length , sc);
			item.cp.push(p);
			item.cp.push(endPos);
			item.maxt = Math.floor(beginPos.distance(endPos.x , endPos.y)/20);
			item.wT = item.maxt * 10;
			item.x = beginPos.x;
			item.y = beginPos.y;
			this.contentView.addChild(item);

			this.itemList.push(item);
			this.startFly();
		}

		private startFly():void{
			if(this.isStarted == false){
				this.isStarted = true;
				Laya.timer.loop(20 , this , this.enterFrame);
			}
		}

		private enterFrame():void{
			var isAllEnd:boolean = true;
			var endIds:Array<number> = [];

			for(var i:number = 0 ; i < this.itemList.length ; i++){
				if(this.itemList[i].isEnd == false){
					isAllEnd = false;

					this.itemList[i].moveTo();

					if(this.itemList[i].isEnd){//一个水滴飞完成
						if(this.itemList[i].type == 1){
							RaceManager.instance.addExp(this.itemList[i].score , this.itemList[i].data);
							manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Fill_bar2");
						}else if(this.itemList[i].type == 2){
							RaceManager.instance.addCoin(this.itemList[i].score);
							manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Get_coin3");
						}else if(this.itemList[i].type == 11){
							RaceManager.instance.addExpByTime(this.itemList[i].score , this.itemList[i].data);
							manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Fill_bar2");
						}
					}
				}else{
					endIds.push(this.itemList[i].id);
				}
			}

			for(var i:number = 0 ; i < endIds.length ; i++){
				for(var j:number = 0 ; j < this.itemList.length ; j++){
					if(this.itemList[j].id == endIds[i]){
						this.itemList[j].removeSelf();
						this.addToHide(this.itemList[j]);
						this.itemList.splice(j , 1);
					}
				}
			}

			if(isAllEnd){
				this.itemList.splice(0 , this.itemList.length);
			}
		}

		public destroy():void{
			this.removeEvents();
		}
	}
}