/**
* name 
*/
module module{
	export class MealItem extends ui.game.MealItemUI{
		private txt_weight:FontClip = null;
		private txt_level:FontClip = null;
		private maskimg:laya.ui.Image = null;
		public chichenInfo:ChichenInfo = null;

		private level:number = 0;

		constructor(chichenInfo:ChichenInfo){
			super();
			this.chichenInfo = chichenInfo;
			this.level = this.chichenInfo.level;

			this.txt_weight = new FontClip("ui/num_c_" , 65 , 60 , 100 , 24 , "left");
			this.txt_weight.scale(0.8 , 0.8);
			this.addChild(this.txt_weight);

			this.txt_level = new FontClip("ui/num_d_" , -6 , 32 , 60 , 24 , "center");
			this.addChild(this.txt_level);

			this.maskimg = new laya.ui.Image("ui/mask.png");
			this.maskimg.sizeGrid = "9,3,9,3";
			this.img_exp2.mask = this.maskimg;

			this.txt_name.text = chichenInfo.name;

			this.onShowChichen();

			this.on(laya.events.Event.CLICK, this, this.onClick);
		}

		private onShowChichen():void{
			this.txt_weight.text = this.chichenInfo.getWeithStr();
			this.txt_level.text = this.chichenInfo.level + "";
			if (this.chichenInfo.star == 3 && this.chichenInfo.level == 10){
				this.maskimg.width = this.img_exp2.width;
			} else {
				this.maskimg.width = (this.chichenInfo.mealExp/10) * this.img_exp2.width;
			}
			

			this.img_star1.visible = this.chichenInfo.star >= 1;
			this.img_star2.visible = this.chichenInfo.star >= 2;
			this.img_star3.visible = this.chichenInfo.star >= 3;
			this.img_max.visible = this.chichenInfo.star == 3 && this.chichenInfo.level == 10;

			if (this.level != this.chichenInfo.level) {
				this.ani2.visible = true;
				this.ani2.play(0, false);
				this.level = this.chichenInfo.level;
			}
		}

		public updatePos():void{
			this.x = this.chichenInfo.xx;
			this.y = this.chichenInfo.yy;
		}

		private onClick():void{
			RaceManager.instance.wealFood(this.chichenInfo);//给鸡喂食物
		}

		public updateChichen():void{
			this.onShowChichen();

			this.ani.visible = true;
			this.ani.play(0 , false);
		}

		public destroy():void{
			this.removeSelf();
			super.destroy();
		}
	}
}