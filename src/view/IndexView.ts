/**
* name 
*/
module module {	 
	declare var wx:any;

	export class IndexView extends ui.game.IndexViewUI {
		private openId:string = "";

		constructor() {
			super();
			this.on(laya.events.Event.ADDED, this, this.onAddeds);
			console.log("indexview ");
		}

		private onAddeds():void{
			manager.EventManager.instance.on(manager.EventManager.LOGIN_FAIL , this , this.onLoginFail);
			manager.EventManager.instance.on(manager.EventManager.LOGIN_SUCCESS , this , this.onLoginSuccess);

			this.openId = RaceManager.instance.userInfo.getLocalOpenId();
			if (this.openId == null || this.openId == "") {
				this.openId = "openId" + new Date().getTime();
			}
			this.StartOnline();
		}

		public StartOnline():void{
           this.loginWX();
        }

		public loginWX(){
			try{
				wx.login({
					success (res) {
						if (res.code) {
							console.log('wx.login : ' + res.code);
							manager.ResVersionMgr.instance.login(res.code);
						}else{
							console.log('登录失败！' + res.errMsg)
							this.onLoginFail();
						}
					}
				});
			}catch(e){
				console.log('wx.login ----------------- error!')
				this.onLoginFail();
			}
		}
 
		private onLoginSuccess(data:string):void{
			//登录成功
			RaceManager.instance.decalUserData(data);
			manager.EventManager.instance.event(GameView.GOTO_RACE_VIEW);
		}

		private onLoginFail():void{
			this.testData();
		}

		private loing(openId:string):void{
			manager.ResVersionMgr.instance.login(openId);
		}

		private testData():void{
			Laya.timer.once(2000 , this , this.onOnce);
		}

		private onOnce():void{
			RaceManager.instance.getLocalStorage();
			manager.EventManager.instance.event(GameView.GOTO_RACE_VIEW);
		}
	}
}