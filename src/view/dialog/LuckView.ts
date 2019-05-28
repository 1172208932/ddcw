/**
 * 幸运奖励视图
 */
module module {
    export class LuckView extends ui.game.LuckDialogUI {
        constructor() {
            super();
            this.closeBtn.on(laya.events.Event.CLICK, this, this.onClose);
            this.receiveBtn.on(laya.events.Event.CLICK, this, this.onReceive);
        }

        /* 展示界面 */
        showLuckView(): void {
            this.height = Main.app.mScreenHeight
            this.popup();
            this.isModal = false
            // Main.app.mwx.showBanner();
            BridgeUtil.callAppMethod("showBanner");


            // 重置点击次数
            Main.app.clickCount = 0;
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.LuckyReward, { "type": 0 });
        }

        /* 领取金币按钮 */
        private onReceive(): void {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (Main.app.mwx.ofLuck == 1) {
                // 直接领取
                this.getCoins();
            } else if (Main.app.mwx.ofLuck == 2 || Main.app.mwx.ofLuck == 4) {
                // 看视频领取
                if (Main.app.mwx.avShowType == false) return;
                Main.app.mwx.avShowType = false;
                let self = this;
                Laya.timer.once(500, self, () => {
                    self.onVideo(Main.app.mwx.ofCoinsLess);
                });
            } else if (Main.app.mwx.ofLuck == 3) {
                // 分享领取
                this.onShare();
            } else {
                Main.app.showMessage("此功能暂未开放");
            }
        }

        /* 领取金币操作 */
        public getCoins(): void {
            // 修改本地保存领取的次数
            var getLuckCount: number = 0;
            var storageCount: number = wx.getStorageSync(Main.DianDianChongWu_GetLuckRewardCount);
            if (!!storageCount) getLuckCount = storageCount;
            getLuckCount += 1;
            wx.setStorageSync(Main.DianDianChongWu_GetLuckRewardCount, getLuckCount);
            // 加金币
            manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Get_coin3");
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(375, 667), 2, Number(Main.app.mwx.ofLuckParam["coins"])]);
            this.closeLuckView();
            // 埋点统计
            Main.app.mwx.dataLog(dtLogConfig.LuckyReward, { "type": Main.app.mwx.ofLuck });
        }

        /* 看视频 */
        private onVideo(type: number): void {
            let self = this;
            wxCore.uo.loadingVideo((ok: boolean) => {
                if (ok) {
                    wxCore.uo.showVideoAD((played: boolean) => {
                        if (played) {
                            self.getCoins();
                            // let data = {}
                            // data['uid'] = Main.app.mwx.mUID
                            // data['from_type'] = 2
                            // data['is_sucess'] = 1
                            // util.server('lucky_coin', null, data)
                        } else {
                            // let data = {}
                            // data['uid'] = Main.app.mwx.mUID
                            // data['from_type'] = 2
                            // data['is_sucess'] = 1
                            // util.server('lucky_coin', null, data)
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
        private onShare(): void {
            if (Main.app.shareIndex > 0) return;
            Main.app.shareIndex = 16;
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

        /* 关闭按钮 */
        private onClose(): void {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.closeLuckView();
        }

        /* 关闭界面 */
        closeLuckView(): void {
            BridgeUtil.callAppMethod("hideBanner");

            // Main.app.mwx.closeBanner();
            this.close("", false);
        }
    }
}