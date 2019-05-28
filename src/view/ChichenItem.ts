/**
* name 
*/
module module{
	import Point = laya.maths.Point;

	export class ChichenItem extends laya.ui.Component{
		private box:laya.ui.Component = null;
		protected img:laya.ui.Image = null;
		protected hatImg:laya.ui.Image = null;
		protected sleepAni:laya.display.Animation = null;
		protected shanAni:laya.display.Animation = null;

		private isBeginShow:boolean = false;
		private _data:ChichenInfo = null;
		private _coin:CoinInfo = null;

		private moveScale:number = 1;
		public type:number = 1;

		constructor(){
			super();
			this.initView();
		}

		protected initView():void{
			this.type = 1;

			this.box = new laya.ui.Component();
			this.addChild(this.box);

			this.img = new laya.ui.Image("");
			this.box.addChild(this.img);
		}

		public set data(value:ChichenInfo){
			this._data = value;

			this.x = this._data.xx;
			this.y = this._data.yy;
			this.scale(this._data.scale , this._data.scale);
			this.loadImg();
			this.showShanAni();
		}

		public get data():ChichenInfo{
			return this._data;
		}

		public set coin(value:CoinInfo){
			this._coin = value;
		}

		public get coin():CoinInfo{
			return this._coin;
		}

		/**升级后，更新鸡的大小 */
		public updateChichen():void{
			this.scale(this._data.scale , this._data.scale);
			this.showShanAni();
			this.changeToMealEat();
		}

		private showShanAni():void{
			if(this._data.star > 0){
				if(this.shanAni != null){
					var star:number = Number(this.shanAni.name);
					if(this._data.star == star){
						return;
					}else{
						this.shanAni.destroy();
						this.shanAni = null;
					}
				}

				this.shanAni = new laya.display.Animation();
				this.shanAni.loadAnimation(manager.ResVersionMgr.instance.getMd5Url("ani/buling" + this._data.star + ".ani"));
				this.shanAni.pos(0 , -50);
				this.shanAni.name = this._data.star + "";
				this.addChild(this.shanAni);
				this.shanAni.scale(0.5 , 0.5);
				this.shanAni.play(Math.floor(Math.random() * 40) , true);
			}
		}

		/**是否点击中 */
		public collision(pos:Point):boolean{
			if(this._data.state == ChichenInfo.STATE_SLEEP){
				return false;
			}else{
				var r:number = 10 + Math.max(this._data.config.getWidth(1)/2 , this._data.config.getHeight(1)/2) * this._data.scale;
				if( Math.pow(this.x - pos.x , 2) + Math.pow((this.y - r) - pos.y , 2) <= Math.pow(r , 2)){
					return true;
				}else{
					return false;
				}
			}
		}

		/**飞行数据 */
		public getFlyData():Array<any>{
			var r:number = Math.min(this._data.config.getWidth(1)/2 , this._data.config.getHeight(1)/2) * this._data.scale;
			var pos:Point = new Point(this.x , this.y - r);

			return [pos , 1 , this._data.getExp() , [this._data.plantId , this._data.star]];
		}

		public getAddCoinData():Array<any>{
			var r:number = Math.min(this._data.config.getWidth(1)/2 , this._data.config.getHeight(1)/2) * this._data.scale;
			var pos:Point = new Point(this.x , this.y - r);

			return [pos , 2 , 1 , [this.coin]];
		}

		public getAddExpData():Array<any>{
			var r:number = Math.min(this._data.config.getWidth(1)/2 , this._data.config.getHeight(1)/2) * this._data.scale;
			var pos:Point = new Point(this.x , this.y - r);

			return [pos , 11 , 1 , [this._data.plantId , this._data.star]];
		}

		private loadImg():void{
			Laya.loader.load(this._data.config.getFileUrls() , laya.utils.Handler.create(this, this.onLoadedImage));   
		}

		private onLoadedImage():void{
			this.changeToStand();
			this.showState();
			this.isBeginShow = true;
		}

		public onEnterFrame():void{
			if(this.isBeginShow == false) return;

			this._data.time -= 30;
			this._data.changeAddCoinExpTime(30);

			switch(this._data.state){
				case ChichenInfo.STATE_STAND:
					this.compress_stand();
					break;
				case ChichenInfo.STATE_EAT:
					this.compress_eat();
					break;
				case ChichenInfo.STATE_WALK:
					this.compress_walk();
					break;
				case ChichenInfo.STATE_RUN:
					this.compress_run();
					break;
				case ChichenInfo.STATE_SLEEP:
					this.compress_sleep();
					break;
				case ChichenInfo.STATE_MEAL:
					this.compress_meal();
					break;
				case ChichenInfo.STATE_HOCK:
					this.compress_shock();
					break;
				case ChichenInfo.STATE_MEAL_EAT:
					this.compress_meal_eat();
					break;
			}
		}

		/**鸡被点中了 */
		public handClickOk():void{
			this._data.goSleepCount -= 1;

			if(this._data.goSleepCount <= 0){
				this.changeToSleep();
			}else{
				if(this._data.state == ChichenInfo.STATE_RUN){
					this.changeToRun();
				}else{
					var rand:number = Math.floor(Math.random() * 100);
					if(rand < 30){
						this.changeToRun();
					// }else if(rand < 60){
					// 	this.changeToWalk();
					// }
					}else{
						this.changeToShock();
					}
				}
				this.addCoin();
			}
			this.showState();
		}

		/**开始喂食，鸡走到位置上去 */
		public startMeal(index:number):void{
			this.changeToMeal(RaceManager.instance.mealPoss[index]);
		}

		/**喂食结束 */
		public mealEnd():void{
			this.changeToWalk();
			this.showState();
		}

		/* 被点中了是否掉落金币 */
		private addCoin():void {
			var rand:number = Math.floor(Math.random() * 100);
			if (rand < 20) {
				RaceManager.instance.addCoinInPlant(this._data.plantId, new Point(this.x, this.y));
			}
		}

		/**站立时变形*/
		private compress_stand():void{
			if(this._data.cpIndex == 1){
				var p:Point = core.Utils.PointOnCubicBezier1_2(this._data.cp[0] , this._data.cp[1] , this._data.t1/this._data.max);
				this.box.scale(p.x * this.moveScale , p.y);
				this._data.t1 += 1;
				if(this._data.t1 > this._data.max){
					this._data.t1 = 1;
					this._data.cpIndex = 2;
				}
			}else{
				p = core.Utils.PointOnCubicBezier1_2(this._data.cp[1] , this._data.cp[2] , this._data.t1/this._data.max);
				this.box.scale(p.x * this.moveScale , p.y);
				this._data.t1 += 1;
				if(this._data.t1 > this._data.max){
					if(this._data.time <= 0){
						this.changeStateBySelf();
					}else{
						this._data.t1 = 1;
						this._data.cpIndex = 1;
					}
				}
			}
		}

		/**吃东西时变形*/
		private compress_eat():void{
			if(this._data.cpIndex == 1){
				this._data.t1 += 1;
				if(this._data.t1 >= this._data.max){
					this.changeChichenSkin(2);
					this._data.cpIndex = 2;
					this._data.t1 = 0;
				}
			}else{
				this._data.t1 += 1;
				if(this._data.t1 >= this._data.max){
					this.changeChichenSkin(1);
					this._data.cpIndex = 1;
					this._data.t1 = 0;

					if(this._data.time <= 0){
						this.changeStateBySelf();
					}
				}
			}
		}

		/**行走时变形*/
		private compress_walk():void{
			if(this._data.movet1 <= this._data.moveMax){
				var p:Point = core.Utils.PointOnCubicBezier1_2(this._data.moveCp[0] , this._data.moveCp[1] , this._data.movet1/this._data.moveMax);
				this.setPos(p.x , p.y);
				this._data.movet1 += 1;
			}

			if(this._data.cpIndex == 1){
				p = core.Utils.PointOnCubicBezier1_2(this._data.cp[0] , this._data.cp[1] , this._data.t1/this._data.max);
				this.box.scale(p.x * this.moveScale, p.y);
				this._data.t1 += 1;
				if(this._data.t1 > this._data.max){
					this._data.t1 = 1;
					this._data.cpIndex = 2;
				}
			}else{
				p = core.Utils.PointOnCubicBezier1_2(this._data.cp[1] , this._data.cp[2] , this._data.t1/this._data.max);
				this.box.scale(p.x * this.moveScale, p.y);
				this._data.t1 += 1;
				if(this._data.t1 > this._data.max){
					if(this._data.movet1 > this._data.moveMax){
						this.changeStateBySelf();
					}else{
						this._data.t1 = 1;
						this._data.cpIndex = 1;
					}
				}
			}
		}

		/**跑时变形*/
		private compress_run():void{
			if(this._data.movet1 <= this._data.moveMax){
				var p:Point = core.Utils.PointOnCubicBezier1_2(this._data.moveCp[0] , this._data.moveCp[1] , this._data.movet1/this._data.moveMax);
				this.setPos(p.x , p.y);
				this._data.movet1 += 1;
				this.box.scale(1 * this.moveScale, 1);

				if(this._data.movet1 > this._data.moveMax){
					if(this._data.time <= 0){
						this.changeStateBySelf();
					}else{
						this._data.moveCp = [];
						this._data.moveCp.push(new Point(this.x , this.y));
						this._data.moveCp.push( RaceManager.instance.getNextPos() );
						this._data.movet1 = 1;
						this._data.moveMax = Math.floor(this._data.moveCp[0].distance(this._data.moveCp[1].x , this._data.moveCp[1].y)/5);

						if(this._data.moveCp[0].x <= this._data.moveCp[1].x){
							this.moveScale = -1;
						}else{
							this.moveScale = 1;
						}
					}
				}
			}

			if(this._data.cpIndex == 1){
				this._data.t1 += 1;
				if(this._data.t1 >= this._data.max){
					this.changeChichenSkin(5);
					this._data.cpIndex = 2;
					this._data.t1 = 0;
				}
			}else{
				this._data.t1 += 1;
				if(this._data.t1 >= this._data.max){
					this.changeChichenSkin(6);
					this._data.cpIndex = 1;
					this._data.t1 = 0;
				}
			}
		}

		/**睡眠时变形*/
		private compress_sleep():void{
			if(this._data.cpIndex == 1){
				var p:Point = core.Utils.PointOnCubicBezier1_2(this._data.cp[0] , this._data.cp[1] , this._data.t1/this._data.max);
				this.box.scale(p.x * this.moveScale , p.y);
				this._data.t1 += 1;
				if(this._data.t1 > this._data.max){
					this._data.t1 = 1;
					this._data.cpIndex = 2;
				}
			}else{
				p = core.Utils.PointOnCubicBezier1_2(this._data.cp[1] , this._data.cp[2] , this._data.t1/this._data.max);
				this.box.scale(p.x * this.moveScale , p.y);
				this._data.t1 += 1;
				if(this._data.t1 > this._data.max){
					if(this._data.time <= 0){
						this._data.goSleepCount = 40;
						this.changeStateBySelf();
					}else{
						this._data.t1 = 1;
						this._data.cpIndex = 1;
					}
				}
			}
		}

		/**喂食时变形*/
		private compress_meal():void{
			if(this._data.movet1 <= this._data.moveMax){
				var p:Point = core.Utils.PointOnCubicBezier1_2(this._data.moveCp[0] , this._data.moveCp[1] , this._data.movet1/this._data.moveMax);
				this.setPos(p.x , p.y);
				this._data.movet1 += 1;
			}

			if(this._data.cpIndex == 1){
				p = core.Utils.PointOnCubicBezier1_2(this._data.cp[0] , this._data.cp[1] , this._data.t1/this._data.max);
				this.box.scale(p.x * this.moveScale, p.y);
				this._data.t1 += 1;
				if(this._data.t1 > this._data.max){
					this._data.t1 = 1;
					this._data.cpIndex = 2;
				}
			}else{
				p = core.Utils.PointOnCubicBezier1_2(this._data.cp[1] , this._data.cp[2] , this._data.t1/this._data.max);
				this.box.scale(p.x * this.moveScale, p.y);
				this._data.t1 += 1;
				if(this._data.t1 > this._data.max){
					this._data.t1 = 1;
					this._data.cpIndex = 1;
				}
			}
		}

		/**喂食时吃东西时变形*/
		private compress_meal_eat():void{
			if(this._data.cpIndex == 1){
				this._data.t1 += 1;
				if(this._data.t1 >= this._data.max){
					this.changeChichenSkin(2);
					this._data.cpIndex = 2;
					this._data.t1 = 0;
				}
			}else{
				this._data.t1 += 1;
				if(this._data.t1 >= this._data.max){
					this.changeChichenSkin(1);
					this._data.cpIndex = 1;
					this._data.t1 = 0;

					if(this._data.time <= 0){
						this.changeToMeal(null);
					}
				}
			}
		}

		/**惊吓时变形*/
		private compress_shock():void{
			if(this._data.cpIndex == 1){
				this._data.t1 += 1;
				if(this._data.t1 >= this._data.max){
					this.changeChichenSkin(3);
					this._data.cpIndex = 2;
					this._data.t1 = 0;
				}
			}else{
				this._data.t1 += 1;
				if(this._data.t1 >= this._data.max){
					this.changeChichenSkin(1);
					this._data.cpIndex = 1;
					this._data.t1 = 0;

					if(this._data.time <= 0){
						this.changeToStand();
					}
				}
			}
		}


		/**动物自己改变状态 */
		private changeStateBySelf():void{
			var arr:Array<number> = [ChichenInfo.STATE_STAND , ChichenInfo.STATE_EAT , ChichenInfo.STATE_WALK];
			var state:number = arr[ Math.floor(Math.random() * arr.length) ];
			if(state == ChichenInfo.STATE_STAND){
				this.changeToStand();
			}else if(state == ChichenInfo.STATE_EAT){
				this.changeToEat();
			}else if(state == ChichenInfo.STATE_WALK){
				this.changeToWalk();
			}
			this.showState();
		}

		/**进入站立状态 */
		private changeToStand():void{
			this._data.state = ChichenInfo.STATE_STAND;

			this._data.time = 2000 + Math.floor(Math.random() * 2000);
			this._data.t1 = Math.floor(Math.random() * 20);
			this._data.max = 20;
			this._data.cp = [];
			this._data.cp.push(new Point(1 , 1));
			this._data.cp.push(new Point(1.1 , 0.9));
			this._data.cp.push(new Point(1 , 1));
			this._data.cpIndex = 1;
		}

		/**进入吃东西状态 */
		private changeToEat():void{
			this._data.state = ChichenInfo.STATE_EAT;

			this._data.time = 2000 + Math.floor(Math.random() * 2000);
			this._data.t1 = 1;
			this._data.max = 20;
			this._data.cpIndex = 1;
		}

		/**进入走状态 */
		private changeToWalk():void{
			this._data.state = ChichenInfo.STATE_WALK;

			this._data.t1 = 0;
			this._data.max = 8;
			this._data.cp = [];
			this._data.cp.push(new Point(1 , 1));
			this._data.cp.push(new Point(1.2 , 0.8));
			this._data.cp.push(new Point(1 , 1));
			this._data.cpIndex = 1;

			this._data.moveCp = [];
			this._data.moveCp.push(new Point(this.x , this.y));
			this._data.moveCp.push( RaceManager.instance.getNextPos() );
			this._data.movet1 = 1;
			this._data.moveMax = Math.floor(this._data.moveCp[0].distance(this._data.moveCp[1].x , this._data.moveCp[1].y)/1);

			if(this._data.moveCp[0].x <= this._data.moveCp[1].x){
				this.moveScale = -1;
			}else{
				this.moveScale = 1;
			}
		}

		/**进入跑状态 */
		private changeToRun():void{
			this._data.state = ChichenInfo.STATE_RUN;

			this._data.time = 8000 + Math.floor(Math.random() * 5000);
			this._data.t1 = 1;
			this._data.max = 5;
			this._data.cpIndex = 1;

			this._data.moveCp = [];
			this._data.moveCp.push(new Point(this.x , this.y));
			this._data.moveCp.push( RaceManager.instance.getNextPos() );
			this._data.movet1 = 1;
			this._data.moveMax = Math.floor(this._data.moveCp[0].distance(this._data.moveCp[1].x , this._data.moveCp[1].y)/5);

			if(this._data.moveCp[0].x <= this._data.moveCp[1].x){
				this.moveScale = -1;
			}else{
				this.moveScale = 1;
			}

			this.showState();
		}

		/**进入睡眠状态 */
		private changeToSleep():void{
			this._data.state = ChichenInfo.STATE_SLEEP;

			this._data.time = 7000;
			this._data.t1 = 0;
			this._data.max = 20;
			this._data.cp = [];
			this._data.cp.push(new Point(1 , 1));
			this._data.cp.push(new Point(1.1 , 0.9));
			this._data.cp.push(new Point(1 , 1));
			this._data.cpIndex = 1;

			this.showState();
		}

		/**进入惊吓状态 */
		private changeToShock():void{
			this._data.state = ChichenInfo.STATE_HOCK;

			this._data.time = 400;
			this._data.t1 = 1;
			this._data.max = 5;
			this._data.cpIndex = 1;

			this.showState();
		}

		/**进入喂食状态 */
		private changeToMeal(nextPos:Point):void{
			this._data.state = ChichenInfo.STATE_MEAL;

			this._data.t1 = Math.floor(Math.random() * 10);
			this._data.max = 10;
			this._data.cp = [];
			this._data.cp.push(new Point(1, 1));
			this._data.cp.push(new Point(1.1, 0.9));
			this._data.cp.push(new Point(1, 1));
			this._data.cpIndex = 1;

			if (nextPos != null) {
				this._data.moveCp = [];
				this._data.moveCp.push(new Point(this.x, this.y));
				this._data.moveCp.push(nextPos);
				this._data.movet1 = 1;
				this._data.moveMax = Math.floor(this._data.moveCp[0].distance(this._data.moveCp[1].x, this._data.moveCp[1].y) / 5);

				if (this._data.moveCp[0].x <= this._data.moveCp[1].x) {
					this.moveScale = -1;
				} else {
					this.moveScale = 1;
				}
			}

			this.showState();
		}

		/**喂食进入吃东西状态 */
		private changeToMealEat():void{
			if(this._data.state == ChichenInfo.STATE_MEAL && this._data.movet1 <= this._data.moveMax) return; //还未跑到位置上

			if(this._data.state == ChichenInfo.STATE_MEAL_EAT){
				this._data.time = 2000; //延迟时间
			}else{
				this._data.state = ChichenInfo.STATE_MEAL_EAT;

				this._data.time = 2000;
				this._data.t1 = 1;
				this._data.max = 20;
				this._data.cpIndex = 1;

				this.showState();
			}
		}

		private showState():void{
			switch(this._data.state){
				case ChichenInfo.STATE_STAND:
					this.changeChichenSkin(1);
					this.hideSleepAni();
					break;
				case ChichenInfo.STATE_EAT:
					this.changeChichenSkin(1);
					this.hideSleepAni();
					break;
				case ChichenInfo.STATE_WALK:
					this.changeChichenSkin(1);
					this.hideSleepAni();
					break;
				case ChichenInfo.STATE_RUN:
					this.changeChichenSkin(5);
					this.hideSleepAni();
					break;
				case ChichenInfo.STATE_SLEEP:
					this.changeChichenSkin(7);
					this.showSleepAni();
					break;
				case ChichenInfo.STATE_MEAL:
					this.changeChichenSkin(1);
					this.hideSleepAni();
					break;
				case ChichenInfo.STATE_HOCK:
					// this.changeChichenSkin(4);
					this.changeChichenSkin(1);
					this.hideSleepAni();
					break;
				case ChichenInfo.STATE_MEAL_EAT:
					this.changeChichenSkin(1);
					this.hideSleepAni();
					break;
			}
		}

		public changeChichenSkin(index:number):void{
			this._imgIndex = index;
			this.img.skin = this._data.config.getURl(index);
			this.img.x = this._data.config.getWidth(index)/2 * -1;
			this.img.y = this._data.config.getHeight(index) * -1;

			this.updateHat(index);
		}

		private _imgIndex:number = 0;
		public updateHat(index:number):void{
			if(this._data.hatId == 0){
				if(this.hatImg != null){
					this.hatImg.destroy();
					this.hatImg = null;
				}
			}else{
				if(this.hatImg == null){
					this.hatImg = new laya.ui.Image(RaceManager.instance.getHatImg(this._data.hatId));
				}else{
					this.hatImg.skin = RaceManager.instance.getHatImg(this._data.hatId);
				}

				this.hatImg.pivot(this.hatImg.width/2 , this.hatImg.height/2);
				this.img.addChild(this.hatImg);
				this.hatImg.pos(RaceManager.instance.getHatx(this._data.configId , this._data.hatId , index) , RaceManager.instance.getHaty(this._data.configId , this._data.hatId , index));
			}
		}

		public changeHat():void{
			if(this._imgIndex != 0){
				this.updateHat(this._imgIndex);
			}
		}

		private showSleepAni():void{
			if(this.sleepAni == null){
				this.sleepAni = new laya.display.Animation();
				this.sleepAni.loadAnimation(manager.ResVersionMgr.instance.getMd5Url("ani/SleepAni.ani"));
				this.sleepAni.pos(0 , -30);
				this.addChild(this.sleepAni);
			}
			this.sleepAni.visible = true;
			this.sleepAni.play(0 , true);
		}

		private hideSleepAni():void{
			if(this.sleepAni != null){
				this.sleepAni.stop();
				this.sleepAni.visible = false;
			}
		}

		public setPos(xx: number, yy: number): void{
			this.data.xx = xx;
			this.data.yy = yy;
			this.pos(xx , yy);
		}
	}
}