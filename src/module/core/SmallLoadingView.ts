/**
* name 
*/
module module{
	import Tween = Laya.Tween;

	export class SmallLoadingView extends ui.smallload.SmallLoadingViewUI{
		private isShowLoading:boolean = false;
		private tween:Tween = null;
		private loadMc:laya.display.Animation;

		constructor(isShowLoading:boolean){
			super();
			this.isShowLoading = isShowLoading;
			this.initView();
		}

		private initView():void{
			this.width = Laya.stage.width;

			if(this.isShowLoading){
				
			}else{
				if(this.loadMc != null){ 
					this.loadMc.visible = false;
				}
			}
			this.bg.visible = false;
		}

		public showBg():void{
			if(this.loadMc != null){ 
				this.loadMc.visible = false;
			}
			this.bg.visible = true;
			this.bg.alpha = 1;
		}

		public tweenDestory():void{
			this.tween = Tween.to(this.bg , {alpha : 0 }, 800 , null , laya.utils.Handler.create(this , this.onTweenComplete));
		}

		private onTweenComplete():void{
			this.bg.alpha = 0;
			if(this.tween != null){
				Tween.clear(this.tween);
				this.tween = null;
			}
			this.destroy();
		}

		public destroy():void{
			if(this.loadMc != null){ 
				this.loadMc.removeSelf();
				this.loadMc = null;
			}
			this.removeSelf();
		}
	}
}