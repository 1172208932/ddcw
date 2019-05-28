/**
* name 
*/
module module{
	export class OffLineRewardsDialog extends ui.game.OffLineRewardViewUI{
		private offLineCoint:number = 0;

		constructor(offLineCoint:number){
			super();
			this.offLineCoint = offLineCoint;

			var txt_coin:FontClip = new FontClip("ui/num_a_" , 200 , 235 , 330 , 40 , "center");
			this.box.addChild(txt_coin);
			txt_coin.text = "c" + offLineCoint;

			this.btn_double.on(laya.events.Event.CLICK , this , this.HowGetDoubleOffAward);
			this.btn_ok.on(laya.events.Event.CLICK , this , this.onBtnOk);
			RaceManager.instance.on(RaceManager.LOOKTODOUBLEOFFAWARD,this,this.onBtnDouble)
		}

		private onBtnDouble():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			manager.EventManager.instance.event(RaceView.FLY_MONEY , [this.box.localToGlobal(new laya.maths.Point(350 , 255)) , 2 , this.offLineCoint * 2]);
			this.destroy();
		}

		private onBtnOk():void{
			manager.SoundPlayMgr.instance.playButtonClick();
			manager.EventManager.instance.event(RaceView.FLY_MONEY , [this.box.localToGlobal(new laya.maths.Point(350 , 255)) , 2 , this.offLineCoint]);
			this.destroy();
		}

		public destroy():void{
			this.removeSelf();
			super.destroy();
		}
		
		public HowGetDoubleOffAward() {
			if (Main.app.mwx.ofOfflineReword == 1) {
				// 直接使用
				this.onBtnDouble();
			} else if (Main.app.mwx.ofOfflineReword == 2 || Main.app.mwx.ofOfflineReword == 4) {
				// 看视频使用
				if (Main.app.mwx.avShowType == false) {
					return;
				}
				Main.app.mwx.avShowType = false;
				let self = this;
				Laya.timer.once(500, self, ()=>{
					self.onVideo(Main.app.mwx.ofOfflineReword);
				});
			} else if (Main.app.mwx.ofOfflineReword == 3) {
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
							self.onBtnDouble();
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
			Main.app.shareIndex = 7;
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