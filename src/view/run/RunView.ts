/**
* name 
*/
module module{
	import Point = laya.maths.Point;

	export class RunView extends ui.race.RunViewUI implements manager.EnterFrameFace{
		public static START_GAME:string = "RunView" + "START_GAME";
		public static CHICHEN_RUN:string = "RunView" + "CHICHEN_RUN";
		public static PLAY_AGAIN_GAME:string = "RunView" + "PLAY_AGAIN_GAME";
		public static CLICK_NAME:string = "RunView" + "CLICK_NAME";
		
		public faceId:number;

		private roadView:RoadView = null;
		private spItem:laya.ui.Component = null;

		private otherItem1:RunChichenItem = null;
		private otherItem2:RunChichenItem = null;
		private myItem:RunChichenItem = null;

		private states:number = 0;
		private runStates:number = 1;

		private chichenInfo:ChichenInfo = null;

		private bx:number = 0 ;

		constructor(){
			super();
			this.faceId = manager.EnterFrameManager.instance.id;
			this.initView();
			this.initEvents();
		}

		private initView():void{
			this.bx = Math.max(Laya.stage.height - 130 - 1169 , 130);

			this.spItem = new laya.ui.Component();
			this.addChildAt(this.spItem , 2);

			this.roadView = new RoadView();
			this.roadView.pos(0 , this.bx);
			this.addChildAt(this.roadView , 2);

			this.selectView.visible = true;
			this.creatOtherChichen();
		}

		private initEvents():void{
			this.btn_click.on(laya.events.Event.CLICK , this , this.onBtnClick);
			this.selectView.on(RunView.START_GAME , this , this.onStartGame);
			this.readyView.on(RunView.CHICHEN_RUN , this , this.onChichenRun);
			this.readyView.on(RunView.CLICK_NAME , this , this.onClickChichen);
			this.reportView.on(RunView.PLAY_AGAIN_GAME , this , this.onPlayAgain);
		}

		private removeEvents():void{

		}

		private guidRun:number = 0;

		private onStartGame(chichenInfo:ChichenInfo , guidRun:number):void{
			this.selectView.visible = false;
			this.chichenInfo = chichenInfo;
			this.guidRun = guidRun;

			if(this.myItem != null){
				this.myItem.destroy();
			}

			this.myItem = new RunChichenItem();
			this.myItem.setData (RaceManager.instance.chichenConfigDic.get(chichenInfo.configId) , chichenInfo.level + chichenInfo.star * 10 , chichenInfo.hatId);
			this.spItem.addChild(this.myItem);

			this.otherItem1.pos(Laya.stage.width/2 , this.bx + 360);
			this.myItem.pos(Laya.stage.width/2 , this.bx + 600);
			this.otherItem2.pos(Laya.stage.width/2 , this.bx + 835);

			manager.EnterFrameManager.instance.addItem(this);

			this.readyView.visible = true;
			this.readyView.showMyName(chichenInfo.name , this.bx + 600);
			this.readyView.start();
		}

		private onChichenRun():void{
			var ranks:Array<number> = this.randomRank();
			if(this.guidRun == 1){
				this.myItem.rank = 1;
				this.otherItem1.rank = 2;
				this.otherItem2.rank = 3;
			}else{
				this.myItem.rank = ranks[0];
				this.otherItem1.rank = ranks[1];
				this.otherItem2.rank = ranks[2];
			}

			this.otherItem1.changeToRun();
			this.myItem.changeToRun();
			this.otherItem2.changeToRun();

			this.otherItem1.resetSpeed();
			this.myItem.resetSpeed();
			this.otherItem2.resetSpeed();

			this.states = 1;
			this.runStates = 1;

			RaceManager.instance.userInfo.addTaskCount(2);
		}

		private onClickChichen():void{
			this.myItem.changeToShock();
		}

		private onPlayAgain():void{
			this.reportView.hide();
			this.selectView.show();

			this.roadView.x = 0;
			this.otherItem1.pos(-300 , 0);
			this.otherItem2.pos(-300 , 0);
		}

		public onEnterFrame():void{
			this.otherItem1.onEnterFrame();
			this.myItem.onEnterFrame();
			this.otherItem2.onEnterFrame();

			if(this.states == 1){
				this.run();
			}

			if(this.reportView.visible){
				this.reportView.onEnterFrame();
			}
		}

		private roadSpeed:number = 20;

		private run():void{
			if(this.runStates == 1){
				this.roadView.x -= this.roadSpeed;
				this.otherItem1.moveTo();
				this.myItem.moveTo();
				this.otherItem2.moveTo();

				var max_cx:number = Math.max(this.otherItem1.x , this.otherItem2.x , this.myItem.x);
				var finishX:number = this.roadView.x + 1024 * 9;

				if(finishX - max_cx < 600){
					this.otherItem1.setSpurtSpeed();
					this.otherItem2.setSpurtSpeed();
					this.myItem.setSpurtSpeed();
					this.runStates = 2;
				}
			}else if(this.runStates == 2){
				this.roadView.x -= this.roadSpeed;
				this.otherItem1.moveSpurt();
				this.otherItem2.moveSpurt();
				this.myItem.moveSpurt();

				var max_cx:number = this.myItem.x;//Math.max(this.otherItem1.x , this.otherItem2.x , this.myItem.x);
				var finishX:number = this.roadView.x + 1024 * 9;

				if(finishX - max_cx < 20){
					this.otherItem1.changeToSlowRun();
					this.otherItem2.changeToSlowRun();
					this.myItem.changeToSlowRun();
					this.runStates = 3;
				}
			}else if(this.runStates == 3){
				this.roadView.x -= 1;

				var max_cx:number = this.myItem.x;
				var finishX:number = this.roadView.x + 1024 * 9;

				if(finishX - max_cx < -50){
					this.otherItem1.changeToRun();
					this.myItem.changeToRun();
					this.otherItem2.changeToRun();
					this.otherItem1.setLastSpeed();
					this.otherItem2.setLastSpeed();
					this.myItem.setLastSpeed();
					this.runStates = 4;
				}
			}else if(this.runStates == 4){
				this.roadView.x -= this.roadSpeed;
				this.otherItem1.moveLast(this.roadView.getTaiX() , this.bx);
				this.otherItem2.moveLast(this.roadView.getTaiX() , this.bx);
				this.myItem.moveLast(this.roadView.getTaiX() , this.bx);

				if(this.roadView.x <= 1024 * -10){
					this.runStates = 5;
					this.states = 0;
					this.showReport();
				}
			}
		}

		private showReport():void{
			var hatid:number = this.getRandomHatid(this.myItem.hatId);
			this.reportView.showRank(this.myItem.rank , this.myItem.x , this.myItem.y , hatid);
			this.reportView.show();
			if(this.myItem.rank == 1){
				RaceManager.instance.changeHatForChichen(this.chichenInfo , hatid);
			}

			if(this.myItem.rank == 3){
				this.flyFood(1 , 10)
			}else if(this.myItem.rank == 2){
				this.flyFood(2 , 20)
			}
		}

		private creatOtherChichen():void{
			var ids:Array<number> = this.getChichenConfigId();

			this.otherItem1 = new RunChichenItem();
			this.otherItem1.setData (RaceManager.instance.chichenConfigDic.get(ids[0]) , Math.floor(Math.random() * 9 + 1) + (Math.floor(Math.random() * 4) * 10));
			this.otherItem1.pos(-300 , 0);
			this.spItem.addChild(this.otherItem1);

			this.otherItem2 = new RunChichenItem();
			this.otherItem2.setData (RaceManager.instance.chichenConfigDic.get(ids[1]) , Math.floor(Math.random() * 9 + 1) + (Math.floor(Math.random() * 4) * 10));
			this.otherItem2.pos(-300 , 0);
			this.spItem.addChild(this.otherItem2);
		}

		/**随机名次 */
		private randomRank():Array<number>{
			var list:Array<number> = [0,0,0];
			var rodio1:number = 0;
			var rodio2:number = 0;
			var rodio3:number = 0;

			if(this.myItem.level < 20){
				rodio1 = Math.floor((this.myItem.level/(this.myItem.level + 10)) * 100);
				rodio2 = Math.floor((100 - rodio1)/2);
				rodio3 = 100 - (rodio1 + rodio2);
			}else if(this.myItem.level < 30){
				rodio1 = Math.floor((this.myItem.level/30) * 100);
				rodio2 = Math.floor((100 - rodio1)/2);
				rodio3 = 100 - (rodio1 + rodio2);
			}else{
				rodio1 = 100;
				rodio2 = 0;
				rodio3 = 0;
			}

			var rand:number = Math.floor(Math.random() * 100);
			if(rand <= rodio1){
				list[0] = 1;
				list[1] = 2;
				list[2] = 3;
			}else if(rand > rodio1 && rand <= rodio1 + rodio2){
				list[1] = 1;

				var rand2:number = Math.floor(Math.random() * (rodio1 + rodio3));
				if(rand2 <= rodio1){
					list[0] = 2;
					list[2] = 3;
				}else{
					list[2] = 2;
					list[0] = 3;
				}
			}else{
				list[2] = 1;

				rand2 = Math.floor(Math.random() * (rodio1 + rodio2));
				if(rand2 <= rodio1){
					list[0] = 2;
					list[1] = 3;
				}else{
					list[1] = 2;
					list[0] = 3;
				}
			}

			return list;
		}

		private getRandomHatid(hatId:number = 0):number{
			var list:Array<number> = [];
			for(var i:number = 1 ; i <= 11 ; i++){
				if(i != hatId){
					list.push(i);
				}
			}
			return list[Math.floor(Math.random() * list.length)];
		}

		/**获取两个鸡的配置ID  */
		private getChichenConfigId():Array<number>{
			var chichenInfoList:Array<ChichenInfo> = RaceManager.instance.getPlantInfo().chichenInfoList;
			var list:Array<number> = [];

			for(var j:number = 0 ; j < chichenInfoList.length ; j++){
				list.push(chichenInfoList[j].configId);
			}

			var rets:Array<number> = [];

			do{
				var rand:number = Math.floor(Math.random() * 176) + 1;
				if(list.indexOf(rand) < 0){
					rets.push(rand);
				}
			}while(rets.length < 2)
			
			return rets;
		}

		private onBtnClick(e:laya.events.Event):void{
			var touches:Array<any> = e.touches;
			var point:Point = (touches && touches.length > 0) ? new Point(touches[0].stageX , touches[0].stageY) : new Point(e.stageX , e.stageY);

			var animation:laya.display.Animation = new laya.display.Animation();	
			animation.loadAnimation("ani/caidaiAni.ani");
			animation.pos(point.x , point.y);
			animation.scale(1.5,1.5);
			this.addChild(animation);
			animation.play(0 , false);
			animation.on(laya.events.Event.COMPLETE , this , this.onClearAni , [animation]);
		}

		private onClearAni(animation:laya.display.Animation):void{
			animation.destroy();
		}

		/////////////////////////////////////////////////////////////////////////////////////////////////
		private isStarted:boolean = false;
		private itemList:Array<FoodFlyItem> = [];

		public flyFood(type:number , score:number):void{
			var endPos:Point = new Point(520 , 50);
			var beginPos:Point = type == 1 ? new Point(Laya.stage.width/2 - 230 , Laya.stage.height - 60) : new Point(Laya.stage.width/2 , Laya.stage.height - 60);

			for(var i:number = 0 ; i < score ; i++){
				this.addFlyItem(beginPos , endPos , 1 , i*2);
			}
		}

		private addFlyItem(beginPos:Point , endPos:Point , score:number , delay:number):void{
			var sc:number = 0.1 + Math.random() * 0.3;
			var length:number = ((Math.random()*2 >= 1) ? 100 : -100) * (Math.random() * 2);

			var item:FoodFlyItem = new FoodFlyItem(score);
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
							RaceManager.instance.changeFood(this.itemList[i].score);
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

		private clearFoot():void{
			for(var i:number = 0 ; i < this.itemList.length ; i++){
				if(this.itemList[i].isEnd == false){
					RaceManager.instance.changeFood(this.itemList[i].score);
				}
				this.itemList[i].destroy();
			}
			this.isStarted = false;
			this.itemList.splice(0 , this.itemList.length);
		}

		/////////////////////////////////////////////////////////////////////////////////////////////////

		public destroy():void{
			Laya.timer.clear(this , this.enterFrame);
			manager.EnterFrameManager.instance.removeItem(this.faceId);
			this.clearFoot();
			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}
	}
}