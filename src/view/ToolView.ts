/**
 * 左边的菜单栏
 */
module module {
	import LocalStorage = laya.net.LocalStorage;
	export class ToolView extends ui.game.ToolViewUI {
		public static CHANGE_MENU_TYPE: string = "ToolView" + "CHANGE_MENU_TYPE"; // 调整菜单栏的通知
		public static GOTO_SMALL: string = "ToolView" + "GOTO_SMALL";             // 调整上部菜单栏按钮的通知
		public static GOTO_MEAL: string = "ToolView" + "GOTO_MEAL";               // 打开喂食的通知
		public static CLOSE_MEAL: string = "ToolView" + "CLOSE_MEAL";             // 关闭喂食的通知
		public static EAT_APPLE: string = "ToolView" + "EAT_APPLE";             // 关闭喂食的通知			
		public static PET_NUM: string = "ToolView" + "PET_NUM"
		private txt_coin: FontClip = null;
		private txt_time: FontClip = null;
		private arrow: GuidArrowView = null;
		private menuType: number = 0;

		constructor() {
			super();
			// 当前场景的图标
			this.img_carden.skin = RaceManager.instance.getLogimg(1);
			// 当前场景拥有宠物的数量
			this.txt_coin = new FontClip("ui/num_b_", 0, 70, 110, 17, "center");
			this.txt_coin.scale(0.8, 0.8);
			this.box_chichen.addChild(this.txt_coin);
			// 双倍效率开启时的时间
			this.txt_time = new FontClip("ui/num_b_", -5, 70, 120, 17, "center");
			this.txt_time.scale(0.8, 0.8);
			this.box_jiashu.addChild(this.txt_time);
			if (Main.app.is_wx) {
				Laya.Tween.clearAll(this.box_reward);
				this.tween1(this.box_reward);
			} else {
				// this.box_jiashu.visible = false
				// this.box_reward.visible = false
				// this.box_free.visible = false
				// this.height = 300
			}


			this.updateJiashu();
			this.onChangeChichenNum();
			this.onChangeMenuView(1);
			this.setEvents();
			// this.setChickenSkin()



			this.initPetNum()
		}
		public initPetNum() {
			let newArr = []
			let arr = []
			for (let i = 1; i < 9; i++) {
				newArr = [...newArr, ...RaceManager.instance.userInfo.plantInfoDic.get(i).haveChichenIds]
			}

			newArr.forEach(item => {
				if (item) {
					arr.push(item)
				}
			})
			this.num_pet.text = arr.length + '/160'
			if (arr.length == 0) {
				this.num_pet.text = '1/160'
			}
		}
		// 缓动
		public tween1(btn, delay: number = 0) {
			Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween2, [btn]), delay);
		}
		public tween2(btn) {
			Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween3, [btn]));
		}
		public tween3(btn) {
			Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween4, [btn]));
		}
		public tween4(btn) {
			Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween1, [btn]), 2000);
		}
		// public setChickenSkin(): void {
		// 	switch (Main.app.mwx.m_getChicken) {
		// 		case 49:

		// 			break
		// 		case 47:
		// 			this.chickenSkin.skin = 'pngs/0319/47-01.png'
		// 			break
		// 		case 77:
		// 			this.chickenSkin.skin = 'pngs/0319/77-01.png'
		// 			break
		// 		default:
		// 			this.box_get.visible = false
		// 			break
		// 	}
		// }

		/* 更新当前场景 */
		public updatePlant(): void {
			this.onChangeMenuView(1);
			this.onChangeChichenNum();
		}

		private onBuildCardenComplete(): void {
			this.onChangeMenuView(this.menuType);
		}

		/* 更新双倍效率时间 */
		private updateJiashu(): void {
			if (RaceManager.instance.userInfo.jiashuDownTime > 0) {
				this.showTime();
				Laya.timer.loop(1000, this, this.showTime);
				this.img_jiashu.visible = false;
			} else {
				this.txt_time.text = "";
				this.img_jiashu.visible = true;
			}
		}
		/* 更新当前场景宠物数量 */
		private onChangeChichenNum(): void {
			var plantInfo: PlantInfo = RaceManager.instance.getPlantInfo();
			var count: number = plantInfo.getChichenCount();
			count = Math.min(plantInfo.maxCount, count);
			this.txt_coin.text = count + "b" + plantInfo.maxCount;
		}

		/* 更新菜单栏 */
		private onChangeMenuView(menuType: number): void {
			this.menuType = menuType;
			var plantInfo: PlantInfo = RaceManager.instance.getPlantInfo();
			var isHaveCarden: boolean = RaceManager.instance.isHaveCarden(plantInfo.plantId);
			// 是否显示花园按钮
			if (isHaveCarden) {
				this.box_carden.visible = true;
				// this.box_apple.y = 208;
				// this.box_chichen.y = 312;
				this.box_jiashu.y = 204;
				this.box_reward.y = 358;
				this.box_free.y = 412
				// if (this.box_reward.visible == false) {
				// 	this.box_free.y = 312
				// }

				// 改变当前场景图标
				var plantInfo: PlantInfo = RaceManager.instance.getPlantInfo();
				this.img_name.skin = (plantInfo.plantId > 100) ? "font/tip93.png" : "font/tip120.png";
			} else {
				this.box_carden.visible = false;
				// this.box_apple.y = 104;
				// this.box_chichen.y = 208;
				this.box_jiashu.y = 104;
				this.box_reward.y = 258;
				this.box_free.y = 312
				// if (this.box_reward.visible == false) {
				// 	this.box_free.y = 212
				// }
				// this.box_get.y = 516
			}
			this.checkDailyRewardStatus()
		}

		/* 检查每日奖励领取状态 */
		private checkDailyRewardStatus(): void {
			var isReceive: number = 0;
			var saveTime: string = LocalStorage.getItem(Main.DianDianChongWu_NowDay5);
			if (saveTime == Main.app.mwx.nowday) {
				var storageStatus: number = Number(LocalStorage.getItem(Main.DianDianChongWu_GetDailyRewardStatus))
				if (!!storageStatus) isReceive = storageStatus;
			} else {
				LocalStorage.setItem(Main.DianDianChongWu_NowDay5, Main.app.mwx.nowday);
				LocalStorage.setItem(Main.DianDianChongWu_GetDailyRewardStatus, '0');
			}


			if (isReceive == 0) {
				if (Main.app.is_wx) {
					this.height = 520;
					this.box_reward.visible = true;
					// this.featherNum.text = "1个羽毛";
					// this.box_reward.visible = false
					// String(Main.app.mwx.ofLoginRewardParam["num"])
				}
				if (this.box_carden.visible == true) {
					this.box_free.y = 412
				} else {
					this.box_free.y = 312
				}

			} else {
				this.height = 420;
				this.box_reward.visible = false;
				if (this.box_carden.visible == false) {
					this.box_free.y = 212
				} else {
					this.box_free.y = 312
				}
				// this.box_get.y = 416
			}
		}

		/* 点击每日奖励领取羽毛 */
		private onGetReward(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			// BridgeUtil.callAppMethod("showVideo", [1]);
			// 埋点统计
			// Main.app.mwx.dataLog(dtLogConfig.GetDailyReward, { "type": 0 });

			// if (Main.app.mwx.ofLoginReward == 1) {
			// 	// 直接领取
			this.onGetDailyReward();
			// } else if (Main.app.mwx.ofLoginReward == 2 || Main.app.mwx.ofLoginReward == 4) {
			// 	// 看视频使用
			// 	if (Main.app.mwx.avShowType == false) {
			// 		return;
			// 	}
			// 	Main.app.mwx.avShowType = false;
			// 	let self = this;
			// 	Laya.timer.once(500, self, () => {
			// 		self.onVideo(Main.app.mwx.ofLoginReward);
			// 	});
			// } else if (Main.app.mwx.ofLoginReward == 3) {
			// 	// 分享使用
			// 	this.onShare();
			// } else {
			// 	Main.app.showMessage("此功能暂未开放");
			// }
		}

		/* 看视频领取羽毛 */
		private onVideo(type: number): void {
			let self = this;
			wxCore.uo.loadingVideo((ok: boolean) => {
				if (ok) {
					wxCore.uo.showVideoAD((played: boolean) => {
						if (played) {
							self.onGetDailyReward();
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

		/* 分享领取羽毛 */
		private onShare(): void {
			if (Main.app.shareIndex > 0) {
				return;
			}
			Main.app.shareIndex = 13;
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
				title: title,
				imageUrl: imageUrl,
				query: "uid=" + Main.app.mwx.mUID + `&surl=${Main.app.shareIndex}`
			});
		}

		/* 执行领取每日奖励的操作(增加羽毛) */
		private onGetDailyReward(): void {
			// 埋点统计
			// Main.app.mwx.dataLog(dtLogConfig.GetDailyReward, { "type": Main.app.mwx.ofLoginReward });

			this.height = 420;
			this.box_reward.visible = false;
			// this.box_free.y -= 100
			// this.box_get.y = 520
			LocalStorage.setItem(Main.DianDianChongWu_GetDailyRewardStatus, '1');
			manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(50, 700), 3, 1]);
			// Number(Main.app.mwx.ofLoginRewardParam["num"])
			this.onChangeMenuView(1);
		}

		/* 点击双倍效率按钮 */
		private onBtnJiashu(): void {
			if (RaceManager.instance.userInfo.jiashuDownTime <= 0) {
				this.btn_jiashu.disabled = true;
				RaceManager.instance.on(RaceManager.OPENDOUBLEDISABLED, this, this.OpenDisabled);
				var dialog: OpenJiaShuDialog = new OpenJiaShuDialog();
				manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
			}
		}

		private OpenDisabled() {
			// 倒计时结束设置按钮能响应事件
			this.btn_jiashu.disabled = false;
		}

		/* 更新倒计时 */
		private showTime(): void {
			var downTime: number = RaceManager.instance.userInfo.jiashuDownTime;
			var s: number = Math.floor(downTime / 1000);

			var h: number = Math.floor(s / 3600);
			if (h > 0) {
				var m: number = Math.floor((s % 3600) / 60);
				this.txt_time.text = this.getTwoChar(h) + "a" + this.getTwoChar(m);
			} else {
				m = Math.floor(s / 60);
				s = s % 60;
				this.txt_time.text = this.getTwoChar(m) + "a" + this.getTwoChar(s);
			}

			RaceManager.instance.userInfo.jiashuDownTime -= 1000;
			if (RaceManager.instance.userInfo.jiashuDownTime <= 0) {
				// 倒计时结束
				Laya.timer.clear(this, this.showTime);
				this.txt_time.text = "";
				this.img_jiashu.visible = true;
				RaceManager.instance.event(RaceManager.OPENDOUBLEDISABLED);
			}
		}

		private getTwoChar(value: number): string {
			return value >= 10 ? "" + value : "0" + value;
		}

		/* 点击宠物图鉴按钮 */
		private onBtnShuClick(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var dialog: PlantAtlasDialog = new PlantAtlasDialog();
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
			manager.EventManager.instance.event(ToolView.GOTO_SMALL);
		}

		/* 点击喂宠物按钮 */
		private onBtnAppleClick(): void {
			// 埋点统计
			Main.app.mwx.dataLog(dtLogConfig.MeatPatClick, { "success": 1 });
			manager.EventManager.instance.event(RaceView.CONTROL_FALSE);//zxx
			manager.SoundPlayMgr.instance.playButtonClick();
			manager.EventManager.instance.event(ToolView.GOTO_MEAL);

			this.btn_close_meal.visible = true;
			this.box_shu.visible = false;
			this.box_carden.visible = false;
			// this.box_apple.visible = false;
			// this.box_chichen.visible = false;
			this.box_jiashu.visible = false;
			this.box_free.visible = false
			this.box_reward.visible = false;
			// this.box_get.visible = false
			this.height = 100; // 防止此视图当着最左边的小鸡	

			if (this.arrow != null) {
				this.arrow.destroy();
				this.arrow = null;
			}
		}

		/* 点击关闭喂宠物按钮 */
		private onBtnCloseMeal(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			manager.EventManager.instance.event(ToolView.CLOSE_MEAL);
			manager.EventManager.instance.event(RaceView.CONTROL_TRUE);//zxx

			this.btn_close_meal.visible = false;
			this.box_shu.visible = true;
			// this.box_carden.visible = true;
			// this.box_apple.visible = true;
			// this.box_chichen.visible = true;
			// if (Main.app.is_wx) {
				this.box_jiashu.visible = true;
				this.box_free.visible = true

			// }
			// 检查是否领取过每日登陆奖励
			this.checkDailyRewardStatus();
		}

		/* 点击当前场景宠物数量按钮 */
		private onBtnChichenClick(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var dialog: MyAtlasDialog = new MyAtlasDialog();
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
			manager.EventManager.instance.event(ToolView.GOTO_SMALL);
		}

		/* 点击切换场景按钮 */
		private onBtnCarden(): void {
			var plantInfo: PlantInfo = RaceManager.instance.getPlantInfo();
			if (plantInfo.plantId > 100) {
				RaceManager.instance.gotoGate(plantInfo.plantId - 100);
			} else {
				RaceManager.instance.gotoGate(plantInfo.plantId + 100);
			}
			manager.EventManager.instance.event(BottomView.UNLOCK);
		}

		/* 引导操作 */
		private onChangeGuidApple(): void {
			this.arrow = new GuidArrowView();
			this.arrow.setGuidRun4();
			// this.box_apple.addChild(this.arrow);
		}

		/* 点击每日登陆(废弃) */
		private onBtnDailyReward(): void {
			manager.SoundPlayMgr.instance.playButtonClick();
			var dialog: LoginAwardDialog = new LoginAwardDialog();
			manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
		}
		// /*点击领取宠物*/
		// public getChicken() {
		// 	switch (Main.app.mwx.m_getChicken) {
		// 		case 49:
		// 			RaceManager.instance.getFirstChichenInfo(49)
		// 			Main.app.mwx.SetUserValue("GetChichen", 47);
		// 			this.chickenSkin.skin = 'pngs/0319/47-01.png'
		// 			this.chickenText.skin = 'pngs/0319/btn_3.png'
		// 			break
		// 		case 47:
		// 			RaceManager.instance.getFirstChichenInfo(47)
		// 			Main.app.mwx.SetUserValue("GetChichen", 77);
		// 			this.chickenSkin.skin = 'pngs/0319/77-01.png'
		// 			this.chickenText.skin = 'pngs/0319/btn_3.png'
		// 			break
		// 		case 77:
		// 			RaceManager.instance.getFirstChichenInfo(77)
		// 			Main.app.mwx.SetUserValue("GetChichen", 0);
		// 			this.box_get.visible = false
		// 			break
		// 	}
		// }

		/* 设置响应事件 */
		private setEvents(): void {
			this.btn_shu.on(laya.events.Event.CLICK, this, this.onBtnShuClick);
			// this.btn_apple.on(laya.events.Event.CLICK, this, this.onBtnAppleClick);
			this.btn_chichen.on(laya.events.Event.CLICK, this, this.onBtnChichenClick);
			this.btn_close_meal.on(laya.events.Event.CLICK, this, this.onBtnCloseMeal);
			this.box_carden.on(laya.events.Event.CLICK, this, this.onBtnCarden);
			this.btn_jiashu.on(laya.events.Event.CLICK, this, this.onBtnJiashu);
			this.box_reward.on(laya.events.Event.CLICK, this, this.onGetReward);
			// this.box_get.on(laya.events.Event.CLICK, this, this.getChicken)
			manager.EventManager.instance.on(ToolView.CHANGE_MENU_TYPE, this, this.onChangeMenuView);
			RaceManager.instance.on(RaceManager.CHICHEN_COUNT_CHANGE, this, this.onChangeChichenNum);
			RaceManager.instance.on(RaceManager.BULID_CARDEN_COMPLETE, this, this.onBuildCardenComplete);
			RaceManager.instance.on(RaceManager.CHANGE_JIASHU, this, this.updateJiashu);
			// RaceManager.instance.on(RaceManager.CHANGE_GUID_APPLE, this, this.onChangeGuidApple);
			RaceManager.instance.on(RaceManager.GET_DAILY_REWARD, this, this.onGetDailyReward);
			// 废弃
			// this.btn_dailyreward.on(laya.events.Event.CLICK, this, this.onBtnDailyReward);
			manager.EventManager.instance.on(ToolView.EAT_APPLE, this, this.onBtnAppleClick);

			manager.EventManager.instance.on(ToolView.PET_NUM, this, this.initPetNum);
		}

		/* 移除响应事件 */
		private removeEvents(): void {
			manager.EventManager.instance.off(ToolView.CHANGE_MENU_TYPE, this, this.onChangeMenuView);
			manager.EventManager.instance.off(ToolView.EAT_APPLE, this, this.onBtnAppleClick);

			RaceManager.instance.off(RaceManager.CHICHEN_COUNT_CHANGE, this, this.onChangeChichenNum);
			RaceManager.instance.off(RaceManager.BULID_CARDEN_COMPLETE, this, this.onBuildCardenComplete);
			RaceManager.instance.off(RaceManager.CHANGE_JIASHU, this, this.updateJiashu);
			// RaceManager.instance.off(RaceManager.CHANGE_GUID_APPLE, this, this.onChangeGuidApple);
			RaceManager.instance.off(RaceManager.GET_DAILY_REWARD, this, this.onGetDailyReward);

			manager.EventManager.instance.off(ToolView.PET_NUM, this, this.initPetNum);
		}

		/* 销毁 */
		public destroy(): void {
			this.removeEvents();
			this.removeSelf();
			super.destroy();
		}
	}
}