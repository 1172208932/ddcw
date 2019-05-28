/**
* name 
*/
module module{
	import Point = laya.maths.Point;

	export class LoginAwardDialog extends ui.game.LoginAwardDialogUI{
		constructor(){
			super();
			this.initView();
			this.initEvents();
		}

		private initView():void{
			this.clip_c.skin = manager.configManager.instance.CDN_BOOT + "gate/clip_reward-pic.png";
			this.updateShow();
		}

		private initEvents():void{
			this.btn_close.on(laya.events.Event.CLICK , this , this.onbtnClose);
			this.btn_look.on(laya.events.Event.CLICK , this , this.HowGetSecondGift);
			this.img_egg1.on(laya.events.Event.CLICK , this , this.onBtnGet1);
			this.img_egg2.on(laya.events.Event.CLICK , this , this.onBtnGet2);
			this.img_egg3.on(laya.events.Event.CLICK , this , this.onBtnGet3);

			RaceManager.instance.on(RaceManager.CHANGE_USER_DATA , this , this.updateShow);
			RaceManager.instance.on(RaceManager.LOOKTOSECONDGIFE , this , this.onLook)
		}

		private removeEvents():void{
			RaceManager.instance.off(RaceManager.CHANGE_USER_DATA , this , this.updateShow);
			RaceManager.instance.off(RaceManager.LOOKTOSECONDGIFE , this , this.onLook)
		}

		private updateShow():void{
			var loginRewardDay:number = RaceManager.instance.userInfo.loginRewardDay;

			this.img_get1.visible = loginRewardDay >= 1;
			this.img_get2.visible = loginRewardDay >= 2;
			this.img_get3.visible = loginRewardDay >= 3;
			this.img_get4.visible = loginRewardDay >= 4;
			this.img_get5.visible = loginRewardDay >= 5;
			this.img_get6.visible = loginRewardDay >= 6;
			this.img_get7.visible = loginRewardDay >= 7;

			var loginRewardCount:number = RaceManager.instance.userInfo.loginRewardCount;
			var loginLookVideo:boolean = RaceManager.instance.userInfo.loginLookVideo == 1;

			if(loginRewardCount == 0){
				this.img_tip2.visible = false;
				this.img_tip.visible = true;
				this.box_look.visible = false;
				this.img_egg1.visible = this.img_egg2.visible = this.img_egg3.visible = this.img_tip.visible = true;
				this.ani2.play(0 , true);
				this.ani3.play(0 , true);
				this.ani4.play(0 , true);
			}else if(loginRewardCount == 1){
				if(loginLookVideo == false){
					this.img_tip2.visible = true;
					this.img_tip.visible = false;
					this.box_look.visible = true;
					this.img_egg1.visible = this.img_egg2.visible = this.img_egg3.visible = this.img_tip.visible = false;
					this.ani2.stop();
					this.ani2.stop();
					this.ani2.stop();
				}else{
					this.img_tip2.visible = false;
				this.img_tip.visible = true;
					this.box_look.visible = false;
					this.img_egg1.visible = this.img_egg2.visible = this.img_egg3.visible = this.img_tip.visible = true;
					this.ani2.play(0 , true);
					this.ani3.play(0 , true);
					this.ani4.play(0 , true);
				}
			}else{
				this.img_tip2.visible = false;
				this.img_tip.visible = true;
				this.box_look.visible = false;
				this.img_egg1.visible = this.img_egg2.visible = this.img_egg3.visible = this.img_tip.visible = true;
				this.ani2.gotoAndStop(10);
				this.ani3.gotoAndStop(10);
				this.ani4.gotoAndStop(10);
				this.img_egg1.disabled = true;
				this.img_egg2.disabled = true;
				this.img_egg3.disabled = true;
			}
		}

		private onLook():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.userInfo.setLoginLookVideo(true);
		}



		private onBtnGet1():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.userInfo.setLoginRewardCount(RaceManager.instance.userInfo.loginRewardCount + 1);
			manager.EventManager.instance.event(RaceView.FLY_MONEY , [this.localToGlobal(new Point(165 , 690)) , 2 , 100]);
		}

		private onBtnGet2():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.userInfo.setLoginRewardCount(RaceManager.instance.userInfo.loginRewardCount + 1);
			var count:number = RaceManager.instance.userInfo.loginRewardDay + 1 == 7 ?  4 : 1;
			manager.EventManager.instance.event(RaceView.FLY_MONEY , [this.localToGlobal(new Point(330 , 690)) , 3 , count]);
		}

		private onBtnGet3():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			RaceManager.instance.userInfo.setLoginRewardCount(RaceManager.instance.userInfo.loginRewardCount + 1);
			manager.EventManager.instance.event(RaceView.FLY_MONEY , [this.localToGlobal(new Point(500 , 690)) , 2 , 100]);
		}

		private onbtnClose():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			this.destroy();
		}

		public destroy():void{
			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}

		public HowGetSecondGift() {
			if (Main.app.mwx.ofSignTwice == 1) {
				// 直接使用
				this.onLook();
			} else if (Main.app.mwx.ofSignTwice == 2 || Main.app.mwx.ofSignTwice == 4) {
				// 看视频使用
				if (Main.app.mwx.avShowType == false) {
					return;
				}
				Main.app.mwx.avShowType = false;
				let self = this;
				Laya.timer.once(500, self, ()=>{
					self.onVideo(Main.app.mwx.ofSignTwice);
				});
			} else if (Main.app.mwx.ofSignTwice == 3) {
				// 分享使用
				this.onShare();
			} else {
				// 暂不支持
				Main.app.showMessage("功能暂未开放");
			}
		}

		/* 看视频 */
		private onVideo(type:number):void {
			let self = this;
			wxCore.uo.loadingVideo((ok:boolean) => {
                if (ok) {
                    wxCore.uo.showVideoAD((played:boolean) => {
                        if (played) {
							self.onLook();
                        } else {
							if (type == 4) {
								self.onShare();
							} else {
								Main.app.showMessage("需要观看完整视频");
							}
                        }
						Main.app.mwx.avShowType = true;
                    });
                } else {
					if (Main.app.mwx.fhOnOff == 0) {
						Main.app.showMessage("获取视频失败");
					} else {
						self.onShare();
					}
					Main.app.mwx.avShowType = true;
                }
            });
		}
		
		/* 分享 */
		private onShare():void {
			if (Main.app.shareIndex > 0) {
				return;
			}
			Main.app.shareIndex = 5;
			Main.app.shareTimestamp = new Date().getTime();

			let title, imageUrl, shjson;
            Main.app.mwx.shareurl.forEach((item) => {
                if (item.id == Main.app.shareIndex) {
                    shjson = item;
                    title = item.title;
                    imageUrl = item.url;
                }
            });
            wx.shareAppMessage({
                title : title,
                imageUrl : imageUrl,
                query : "uid=" + Main.app.mwx.mUID + `&surl=${Main.app.shareIndex}`
            });
        }
	}
}