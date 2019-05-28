/**
 * 比赛结果界面
 */
module module {
	export class RaceReportView extends ui.race.RaceReportViewUI {
		private t:number = 0;
		private d:number = 1;

		constructor() {
			super();
			this.btn_close.on(laya.events.Event.CLICK, this, this.onBtnClose);
			this.btn_play.on(laya.events.Event.CLICK, this, this.onBtnPlay);
			if (!Main.app.mwx.mFHKeep) {
				this.btn_shareall.visible = false;
			} else {
				this.btn_shareall.visible = true;
				this.btn_share.on(laya.events.Event.CLICK, this, this.toShare);
			}
		}

		/* 再玩一次 */
		private onBtnPlay():void {
			manager.SoundPlayMgr.instance.playButtonClick();
			if(RaceManager.instance.userInfo.coin >= 20){
				RaceManager.instance.addCoin(-20);
				this.event(RunView.PLAY_AGAIN_GAME);
			} else {
				RaceManager.instance.showShop();
			}
		}

		/* 关闭界面 */
		private onBtnClose():void{
			RaceManager.instance.event(RaceManager.RightButtonVisiable, [true]);

			manager.SoundPlayMgr.instance.playButtonClick();
			manager.EventManager.instance.event(RaceView.CLOSE_RUN);
		}

		public show():void {
			this.visible = true;
			Laya.timer.loop(500, this, this.onAddAni);
		}

		public hide():void {
			this.visible = false;
			Laya.timer.clear(this, this.onAddAni);
		}

		public showRank(rank:number, xx:number, yy:number, hatid:number = 0):void {
			this.box_reward.x = xx;
			this.box_reward.y = yy - 130 - 120;

			this.img_rank.skin = "ui/rank_"+rank+".png";

			if (rank == 1) {
				this.img_reward.skin = RaceManager.instance.getHatImg(hatid);
			} else {
				this.img_reward.skin = "ui/Atlas_2.png";
			}
			this.img_reward.pivot(this.img_reward.width / 2 , this.img_reward.height / 2);
			var ss:number = Math.min(130 / this.img_reward.width , 130 / this.img_reward.height);
			this.img_reward.scale(ss, ss);

			this.t = 0;
			this.d = 1;
		}

		public onEnterFrame():void {
			if (this.d == 1) {
				this.t ++;
				this.box_reward.y -= 2;
				if (this.t > 10) {
					this.d = 2;
					this.t = 0;
				}
			} else {
				this.t ++;
				this.box_reward.y += 2;
				if (this.t > 10) {
					this.d = 1;
					this.t = 0;
				}
			}
		}

		private onAddAni():void {
			var animation:laya.display.Animation = new laya.display.Animation();	
			animation.loadAnimation("ani/caidaiAni.ani");
			animation.x = 50 + Math.floor(Math.random() * 650);
			animation.y = 150 + Math.floor(Math.random() * 500);
			animation.scale(1.5,1.5);
			this.addChild(animation);
			animation.play(0 , false);
			animation.on(laya.events.Event.COMPLETE, this, this.onClearAni, [animation]);
		}

		private onClearAni(animation:laya.display.Animation):void {
			animation.destroy();
		}

		public destroy():void {
			Laya.timer.clear(this, this.onAddAni);
			this.removeSelf();
			super.destroy();
		}
		
		/* 分享 */ 
		private toShare():void {
			manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(353, 1102), 2, 100]);
			// if (Main.app.shareIndex > 0) {
			// 	return;
			// }
			// // 埋点统计
			// Main.app.mwx.dataLog(dtLogConfig.RaceResultShare, {"success":0});
			
			// Main.app.shareIndex = 8;
			// Main.app.shareTimestamp = new Date().getTime();

			// let title, imageUrl, shjson;
            // Main.app.mwx.shareurl.forEach((item) => {
            //     if (item.id == Main.app.shareIndex) {
            //         shjson = item;
            //         title = item.title;
            //         imageUrl = item.url;
            //     }
            // });
            // wx.shareAppMessage({
            //     title : title,
            //     imageUrl : imageUrl,
            //     query : "uid=" + Main.app.mwx.mUID + `&surl=${Main.app.shareIndex}`
            // });
        }
	}
}