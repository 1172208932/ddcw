/**
* name 
*/
module module{
	import Point = laya.maths.Point;

	export class RunChichenItem extends laya.ui.Component{
		private box:laya.ui.Component = null;
		protected img:laya.ui.Image = null;
		protected hatImg:laya.ui.Image = null;

		private isBeginShow:boolean = false;
		private _data:ChichenConfig = null;

		private moveScale:number = 1;

		public t1:number = 0;

		public max:number = 0;

		public cp:Array<Point> = new Array<Point>();

		public cpIndex:number = 1;

		public state:number = 0;

		public level:number = 0;

		public hatId:number = 0;

		constructor(){
			super();
			this.initView();
		}

		protected initView():void{
			this.box = new laya.ui.Component();
			this.addChild(this.box);

			this.img = new laya.ui.Image("ui/01-01.png");
			this.box.addChild(this.img);

			this.initRect();
		}

		public setData(value:ChichenConfig , level:number , hatId:number = 0){
			this._data = value;
			this.level = level;
			this.hatId = hatId;

			var l:number = level % 10 == 0 ? 10 : level % 10;
			this.scale(-1 * value.getScale(l) , value.getScale(l));
			this.loadImg();
		}

		public get data():ChichenConfig{
			return this._data;
		}

		private loadImg():void{
			Laya.loader.load(this._data.getFileUrls() , laya.utils.Handler.create(this, this.onLoadedImage));   
		}

		private onLoadedImage():void{
			this.changeToStand();
			this.isBeginShow = true;
		}

		private time:number = 0;

		public onEnterFrame():void{
			if(this.isBeginShow == false) return;

			this.time -= 30;

			switch(this.state){
				case ChichenInfo.STATE_STAND:
					this.compress_stand();
					break;
				case ChichenInfo.STATE_RUN:
					this.compress_run();
					break;
				case ChichenInfo.STATE_HOCK:
					this.compress_shock();
					break;
			}
		}


		/**站立时变形*/
		private compress_stand():void{
			if(this.cpIndex == 1){
				var p:Point = core.Utils.PointOnCubicBezier1_2(this.cp[0] , this.cp[1] , this.t1/this.max);
				this.box.scale(p.x * this.moveScale , p.y);
				this.t1 += 1;
				if(this.t1 > this.max){
					this.t1 = 1;
					this.cpIndex = 2;
				}
			}else{
				p = core.Utils.PointOnCubicBezier1_2(this.cp[1] , this.cp[2] , this.t1/this.max);
				this.box.scale(p.x * this.moveScale , p.y);
				this.t1 += 1;
				if(this.t1 > this.max){
					this.t1 = 1;
					this.cpIndex = 1;
				}
			}
		}

		/**跑时变形*/
		private compress_run():void{
			if(this.cpIndex == 1){
				this.t1 += 1;
				if(this.t1 >= this.max){
					this.changeChichenSkin(5);
					this.cpIndex = 2;
					this.t1 = 0;
				}
			}else{
				this.t1 += 1;
				if(this.t1 >= this.max){
					this.changeChichenSkin(6);
					this.cpIndex = 1;
					this.t1 = 0;
				}
			}
		}

		/**惊吓时变形*/
		private compress_shock():void{
			if(this.cpIndex == 1){
				this.t1 += 1;
				if(this.t1 >= this.max){
					this.changeChichenSkin(3);
					this.cpIndex = 2;
					this.t1 = 0;
				}
			}else{
				this.t1 += 1;
				if(this.t1 >= this.max){
					this.changeChichenSkin(1);
					this.cpIndex = 1;
					this.t1 = 0;

					if(this.time <= 0){
						this.changeToStand();
					}
				}
			}
		}

		/**进入站立状态 */
		public changeToStand():void{
			this.state = ChichenInfo.STATE_STAND;

			this.t1 = 0;
			this.max = 20;
			this.cp = [];
			this.cp.push(new Point(1 , 1));
			this.cp.push(new Point(1.1 , 0.9));
			this.cp.push(new Point(1 , 1));
			this.cpIndex = 1;

			this.showState();
		}

		/**进入跑状态 */
		public changeToRun():void{
			this.state = ChichenInfo.STATE_RUN;

			this.t1 = 1;
			this.max = 5;
			this.cpIndex = 1;

			this.showState();
		}

		/**进入惊吓状态 */
		public changeToShock():void{
			if(this.state == ChichenInfo.STATE_STAND){
				this.state = ChichenInfo.STATE_HOCK;

				this.time = 400;
				this.t1 = 1;
				this.max = 5;
				this.cpIndex = 1;

				this.showState();
			}else if(this.state == ChichenInfo.STATE_HOCK){
				this.time = 400;
			}
		}

		public changeToSlowRun():void{
			this.max = 50;
		}

		private showState():void{
			switch(this.state){
				case ChichenInfo.STATE_STAND:
					this.changeChichenSkin(1);
					break;
				case ChichenInfo.STATE_RUN:
					this.changeChichenSkin(5);
					break;
				case ChichenInfo.STATE_HOCK:
					this.changeChichenSkin(1);
					break;
			}
		}

		public changeChichenSkin(index:number):void{
			this.img.skin = this._data.getURl(index);
			this.img.x = this._data.getWidth(index)/2 * -1;
			this.img.y = this._data.getHeight(index) * -1;

			this.updateHat(index);
		}

		public updateHat(index:number):void{
			if(this.hatId == 0){
				if(this.hatImg != null){
					this.hatImg.destroy();
					this.hatImg = null;
				}
			}else{
				if(this.hatImg == null){
					this.hatImg = new laya.ui.Image(RaceManager.instance.getHatImg(this.hatId));
				}else{
					this.hatImg.skin = RaceManager.instance.getHatImg(this.hatId);
				}

				this.hatImg.pivot(this.hatImg.width/2 , this.hatImg.height/2);
				this.img.addChild(this.hatImg);
				this.hatImg.pos(RaceManager.instance.getHatx(this._data.configId , this.hatId , index) , RaceManager.instance.getHaty(this._data.configId , this.hatId , index));
			}
		}
		//////////////////////////////////////////////////////////////////////////////////////////////////////
		public rank:number = 0;

		private bx:number = 0;
		private x1:number = 0;
		private x2:number = 0;
		private ex:number = 0;
		private cx:number = 0;

		private lastType:number = 1;

		public speed:number = 0;

		public mTime:number = 0;

		private initRect():void{
			this.bx = 50;
			this.ex = Math.floor(Laya.stage.width - 50);
			this.cx = Math.floor(Laya.stage.width/2);
			this.x1 = Math.floor((this.ex - this.bx)/3 + this.bx);
			this.x2 = Math.floor(this.ex - ((this.ex - this.bx)/3));
		}

		private roadSpeed:number = 20;

		public resetSpeed():void{
			if(this.x <= this.x1){
				this.speed = Math.floor(Math.random() * 8) + this.roadSpeed;
			}else if(this.x > this.x1 && this.x < this.x2){
				this.speed = Math.floor(Math.random() * 8) * (Math.random() * 2 < 1 ? 1 : -1) + this.roadSpeed;
			}else if(this.x >= this.x2){
				this.speed = Math.floor(Math.random() * 8 * -1) + this.roadSpeed;
			}
			this.mTime = Math.floor(Math.random() * 30) + 50;
		}

		public moveTo():void{
			this.mTime -= 1;
			this.x += (this.speed - this.roadSpeed);

			if(this.mTime <= 0){
				this.resetSpeed();
			}else{
				if(Math.abs(this.bx - this.x) < 5 || Math.abs(this.ex - this.x) < 5){
					this.resetSpeed();
				}
			}
		}

		public setSpurtSpeed():void{
			if(this.rank == 1){
				if(this.x < this.x2){
					var b:number = Math.ceil((this.x2 - this.x)/20);
					this.speed = b + this.roadSpeed;
				}else{
					this.speed = this.roadSpeed;
				}
			}else if(this.rank == 2){
				if(this.x > this.cx){
					b = Math.ceil( (this.x - this.cx)/20 );
					this.speed = this.roadSpeed - b;
				}else if(this.x < this.cx){
					b = Math.ceil( (this.cx - this.x)/20 );
					this.speed = this.roadSpeed + b;
				}else{
					this.speed = this.roadSpeed;
				}
			}else if(this.rank == 3){
				if(this.x > this.x1){
					b = Math.ceil( (this.x - this.x1)/20 );
					this.speed = this.roadSpeed - b;
				}else{
					this.speed = this.roadSpeed;
				}
			}

			this.mTime = 20;
		}

		public moveSpurt():void{
			this.mTime -= 1;
			this.x += (this.speed - this.roadSpeed);

			if(this.mTime <= 0){
				this.speed = this.roadSpeed;
				this.mTime = 100000;
			}
		}

		public setLastSpeed():void{
			this.speed = 40;
			this.lastType = 1;
		}

		public moveLast(tx:number , by:number):void{
			if(this.lastType == 1){
				this.x += (this.speed - this.roadSpeed);

				if(this.x > Laya.stage.width + 150){
					this.changeToStand();

					if(this.rank == 1){
						this.pos(tx + 340 , by + 430);
					}else if(this.rank == 2){
						this.pos(tx + 115 , by + 545);
					}else if(this.rank == 3){
						this.pos(tx + 565 , by + 585);
					}

					this.lastType = 2;
				}
			}else{
				this.x -= this.roadSpeed;
			}
		}

		public setPos(xx: number, yy: number): void{
			this.pos(xx , yy);
		}
	}
}