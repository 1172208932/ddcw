/**
* name 
*/
module module{
	export class CompanyIcon extends ui.load.CompanyIconUI{
		constructor(){
			super();
			this.on(laya.events.Event.ADDED , this , this.onAdd);

			this.txt_firist.visible = false;
		}

		private onAdd():void{
			Laya.loader.load([
				// {url:manager.configManager.instance.CDN_BOOT + "gate/splash-screen-ipad.png", type:laya.net.Loader.IMAGE},
				{url:"bg/GameOverMessage.png", type:laya.net.Loader.IMAGE},
				{url:manager.configManager.instance.CDN_BOOT + "gate/logo.png", type: laya.net.Loader.IMAGE}
			], laya.utils.Handler.create(this, this.onLoadedFont));
		}

		private onLoadedFont(){
			manager.EnterFrameManager.instance.setup(); 
			RaceManager.instance.setup();

			this.goLogin();
		}

		private goLogin():void{
			manager.ModuleController.instance.changeModule(manager.ModuleController.MN_GameView);
		}

		public destroy():void{
			this.off(laya.events.Event.ADDED , this , this.onAdd);
			this.removeSelf();
			super.destroy();
		}
	}
}