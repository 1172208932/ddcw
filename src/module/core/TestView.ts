/**
* name 
*/
module module{
	export class TestView extends ui.load.TestViewUI{

		private x1:number = 125;
		private x2:number = 375;
		private x3:number = 625;

		private y1:number = 600;
		private y2:number = 900;
		private y3:number = 1200;

		private chichenID:number = 0;
		private hatID:number = 0;

		private posList:Array<Array<number>> = new Array<Array<number>>();

		constructor(){
			super();

			this.posList = ChichenConfig.HAT;

			var sp:laya.ui.Component = new laya.ui.Component();
			sp.graphics.drawLine(this.x1 , 0 , this.x1 , Laya.stage.height , "#00ff00" , 2);
			sp.graphics.drawLine(this.x2 , 0 , this.x2 , Laya.stage.height , "#00ff00" , 2);
			sp.graphics.drawLine(this.x3 , 0 , this.x3 , Laya.stage.height , "#00ff00" , 2);

			sp.graphics.drawLine(0 , this.y1 , 750 , this.y1 , "#00ff00" , 2);
			sp.graphics.drawLine(0 , this.y2 , 750 , this.y2 , "#00ff00" , 2);
			sp.graphics.drawLine(0 , this.y3 , 750 , this.y3 , "#00ff00" , 2);

			this.addChildAt(sp , 1);

			this.btn_next.on(laya.events.Event.CLICK , this , this.onBtnNext);
			this.btn_prev.on(laya.events.Event.CLICK , this , this.onBtnPrev);
			this.btn_save.on(laya.events.Event.CLICK , this , this.onBtnSave);
			for(var i:number = 1 ; i <= 11 ; i++){
				this["btn_hat" + i].on(laya.events.Event.CLICK , this , this.onBtnHat);
			}
			Laya.stage.on(laya.events.Event.KEY_DOWN , this , this.onKeyDown);
			Laya.stage.on(laya.events.Event.KEY_UP , this, this.onKeyUp);
			Laya.timer.loop(30 , this , this.move);
		}

		private onBtnNext():void{
			if(this.chichenID < 176){
				this.chichenID += 1;
			}else{
				this.chichenID = 1;
			}
			this.loadChichenImg();
		}

		private onBtnPrev():void{
			if(this.chichenID > 1){
				this.chichenID -= 1;
			}else{
				this.chichenID = 176;
			}
			this.loadChichenImg();
		}

		private onBtnHat(e:laya.events.Event):void{
			if(this.chichenID != 0){
				var id:number = Number(e.currentTarget.name);
				this.loadHatImag(id);
			}
		}

		private loadChichenImg():void{
			var config:ChichenConfig = RaceManager.instance.chichenConfigDic.get(this.chichenID);

			Laya.loader.load(config.getFileUrls() , laya.utils.Handler.create(this, this.onLoadedImage));   

			this.txt_id.text = this.chichenID + "";
		}

		private imgs:Array<laya.ui.Image> = new Array<laya.ui.Image>();
		private onLoadedImage():void{
			this.clearAll();
			this.clearhat();
			var config:ChichenConfig = RaceManager.instance.chichenConfigDic.get(this.chichenID);

			for(var index:number = 1 ; index <= 7 ; index++){
				var img:laya.ui.Image = new laya.ui.Image(  config.getURl(index) );
				img.x = config.getWidth(index)/2 * -1 + this.getBx(index);
				img.y = config.getHeight(index) * -1 + this.getBy(index);
				this.addChild(img);
				this.imgs.push(img);
			}
		}

		private clearAll():void{
			for(var i:number = 0 ; i < this.imgs.length ; i++){
				this.imgs[i].destroy();
			}
			this.imgs = new Array<laya.ui.Image>();
		}

		private clearhat():void{
			for(var i:number = 0 ; i < this.hatImgs.length ; i++){
				this.hatImgs[i].destroy();
			}
			this.hatImgs = new Array<laya.ui.Image>();
		}	

		private hatImgs:Array<laya.ui.Image> = new Array<laya.ui.Image>();
		private selectImg:laya.ui.Image = null;
		private loadHatImag(id:number):void{
			this.clearhat();
			this.hatID = id;

			for(var i:number = 1 ; i <= 7 ; i++){
				var img:laya.ui.Image = new laya.ui.Image("ui/hat_"+this.hatID+".png");
				img.name = i + "";
				this.imgs[i - 1].addChild(img);
				img.pivot(img.width/2 , img.height/2);
				img.x = this.getHatx(i);
				img.y = this.getHaty(i);
				this.hatImgs.push(img);
				img.on(laya.events.Event.CLICK , this , this.onSelectHat);
			}
		}

		private onSelectHat(e:laya.events.Event):void{
			var index:number = Number(e.currentTarget.name);
			this.selectImg = e.currentTarget as laya.ui.Image;
		}

		private getBx(index:number):number{
			switch(index){
				case 1:
					return this.x1;
				case 2:
					return this.x2;
				case 3:
					return this.x3;
				case 4:
					return this.x1;
				case 5:
					return this.x2;
				case 6:
					return this.x3;
				case 7:
					return this.x1;
			}
		}

		private getBy(index:number):number{
			switch(index){
				case 1:
					return this.y1;
				case 2:
					return this.y1;
				case 3:
					return this.y1;
				case 4:
					return this.y2;
				case 5:
					return this.y2;
				case 6:
					return this.y2;
				case 7:
					return this.y3;
			}
		}

		private getHatx(index:number){
			var arr:Array<number> = this.posList[this.chichenID - 1];
			var i:number = (this.hatID - 1) * 14 + (index - 1) * 2;
			return arr[i];
		}

		private getHaty(index:number){
			var arr:Array<number> = this.posList[this.chichenID - 1];
			var i:number = (this.hatID - 1) * 14 + (index - 1) * 2 + 1;
			return arr[i];
		}

		private saveHatX(index:number , xx:number):void{
			var arr:Array<number> = this.posList[this.chichenID - 1];
			var i:number = (this.hatID - 1) * 14 + (index - 1) * 2;
			arr[i] = xx;
		}

		private saveHatY(index:number , yy:number):void{
			var arr:Array<number> = this.posList[this.chichenID - 1];
			var i:number = (this.hatID - 1) * 14 + (index - 1) * 2 + 1;
			arr[i] = yy;
		}

		private onKeyDown(e:laya.events.Event):void{
			switch(e.keyCode){
				case 87://上
					this.upc = 1;
					break;
				case 65://左
					this.leftc = 1;
					break;
				case 83://下
					this.downc = 1;
					break;
				case 68://右
					this.rightc = 1;
					break;

				case 38://上
					this.upb = 1;
					break;
				case 37://左
					this.leftb = 1;
					break;
				case 40://下
					this.downb = 1;
					break;
				case 39://右
					this.rightb = 1;
					break;
				default:
					break;
			}
		}

		private onKeyUp(e:laya.events.Event):void{
			switch(e.keyCode){
				case 87://上
					this.upc = 0;
					break;
				case 65://左
					this.leftc = 0;
					break;
				case 83://下
					this.downc = 0;
					break;
				case 68://右
					this.rightc = 0;
					break;

				case 38://上
					this.upb = 0;
					break;
				case 37://左
					this.leftb = 0;
					break;
				case 40://下
					this.downb = 0;
					break;
				case 39://右
					this.rightb = 0;
					break;
				default:
					break;
			}
		}

		private upc:number = 0;
		private downc:number = 0;
		private leftc:number = 0;
		private rightc:number = 0;

		private upb:number = 0;
		private downb:number = 0;
		private leftb:number = 0;
		private rightb:number = 0;

		private move():void{
			if(this.upb + this.downb + this.leftb + this.rightb > 0){
				var bx:number = this.rightb - this.leftb;
				var by:number = this.downb - this.upb;

				if(this.selectImg != null){
					this.selectImg.x += bx;
					this.selectImg.y += by;

					this.saveHatX(Number(this.selectImg.name) , this.selectImg.x);
					this.saveHatY(Number(this.selectImg.name) , this.selectImg.y);
				}
			}
		}

		private onBtnSave():void{
			if(this.chichenID != 0){
				var arr:Array<number> = this.posList[this.chichenID - 1];
				console.log("/**"+(this.chichenID)+"*/ [" + arr.join(",") + "],");
			}
		}
	}
}