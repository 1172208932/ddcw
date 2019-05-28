/**
* name 
*/
module module{
	import Point = laya.maths.Point;

	export class FlyMoneyAction{

		public expPos:Point = null;
		public coinPos:Point = null;
		public wingPos:Point = null;

		private isStarted:boolean = false;
		private itemList:Array<FoodFlyItem> = [];

		constructor(){

		}

		private getEndPos(type:number):Point{
			if(type == 1){
				return this.expPos;
			}else if(type == 2){
				return this.coinPos;
			}else if(type == 3){
				return this.wingPos;
			}else{
				return new Point(10 , 10);
			}
		}

		public flyFood(beginPos:Point , type:number , score:number):void{
			var endPos:Point = this.getEndPos(type);

			var list:Array<number> = this.getScores(score);
			for(var i:number = 0 ; i < list.length ; i++){
				this.addFlyItem(beginPos , endPos , list[i] , i , type);
			}
		}

		public getScores(score:number):Array<number>{
			var list:Array<number> = [];

			var one:number = Math.floor(score/20);
			var b:number = score % 20;

			for(var i:number = 0 ; i < 20 && i < score ; i++){
				if(i < b){
					list.push(one + 1);
				}else{
					list.push(one);
				}
			}
			return list;
		}

		private addFlyItem(beginPos:Point , endPos:Point , score:number , delay:number , type:number):void{
			var sc:number = 0.4 + Math.random() * 0.3;
			var length:number = ((Math.random()*2 >= 1) ? 100 : -100) * (Math.random() * 2);

			var item:FoodFlyItem = new FoodFlyItem(score , type);
			item.cp.push(beginPos);
			var p:Point = core.Utils.getBezier2TP(beginPos , endPos , length , sc);
			item.cp.push(p);
			item.cp.push(endPos);
			item.maxt = Math.floor(beginPos.distance(endPos.x , endPos.y)/20);
			item.wT = item.maxt * 10;
			item.x = beginPos.x;
			item.y = beginPos.y;
			item.delay = delay;
			Laya.stage.addChild(item);

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
			for(var i:number = 0 ; i < this.itemList.length ; i++){
				if(this.itemList[i].isEnd == false){
					this.itemList[i].delay -= 1;

					isAllEnd = false;

					if(this.itemList[i].delay <= 0){
						this.itemList[i].moveTo();

						if(this.itemList[i].isEnd){//一个水滴飞完成
							if(this.itemList[i].type == 1){
								
							}else if(this.itemList[i].type == 2){
								RaceManager.instance.addCoin(this.itemList[i].score);
							}else if(this.itemList[i].type == 3){
								RaceManager.instance.addWing(this.itemList[i].score);
								manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Get_feather1");
							}
						}
					}
				}else{
					this.itemList[i].destroy();
				}
			}

			if(isAllEnd){
				Laya.timer.clear(this , this.enterFrame);
				this.isStarted = false;
				this.itemList.splice(0 , this.itemList.length);
			}
		}
	}
}