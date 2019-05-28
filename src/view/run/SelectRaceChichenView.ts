/**
* name 
*/
module module{
	export class SelectRaceChichenView extends ui.race.SelectRaceChichenViewUI{
		private itemList:Array<SelectChichenItem> = [];
		private arrow:GuidArrowView = null;

		constructor(){
			super();
			this.initView();
			this.btn_close.on(laya.events.Event.CLICK , this , this.onBtnClose);
		}

		private initView():void{
			for(var i:number = 1 ; i <= 10 ; i++){
				var item:SelectChichenItem = this["item"+ i];
				item.index = i - 1;
				item.showChichen(RaceManager.instance.selectPlantId);
				this.itemList.push(item);
				item.on(laya.events.Event.CLICK , this , this.onItemClick);
			}

			if(RaceManager.instance.guidRun == 1){
				this.arrow = new GuidArrowView();
				this.arrow.setGuidRun3();
				this.box.addChild(this.arrow);
			}
		}

		public show():void{
			this.visible = true;
			for(var i:number = 0 ; i < this.itemList.length ; i++){
				 this.itemList[i].showChichen(RaceManager.instance.selectPlantId);
			}
		}

		private onItemClick(e:laya.events.Event):void{
			manager.SoundPlayMgr.instance.playButtonClick();

			var item:SelectChichenItem = e.currentTarget as SelectChichenItem;

			if(item.chichenInfo != null){
				this.event(RunView.START_GAME , [item.chichenInfo , RaceManager.instance.guidRun]);
				if(this.arrow != null){
					RaceManager.instance.setGuidRunComplete();
					this.arrow.destroy();
					this.arrow = null;
				}
			}
		}

		private onBtnClose():void{
			RaceManager.instance.event(RaceManager.RightButtonVisiable, [true]);

			manager.SoundPlayMgr.instance.playButtonClick();
			manager.EventManager.instance.event(RaceView.CLOSE_RUN);
		}
	}
}