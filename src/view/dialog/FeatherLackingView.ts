/**
 * 送羽毛的弹窗
 */
module module {
	import LocalStorage = laya.net.LocalStorage;
    export class FeatherLackingView extends ui.game.FeatherLackingDialogUI {
        constructor() {
            super();
            this.closeBtn.on(laya.events.Event.CLICK, this, this.onClose);
            this.receiveBtn.on(laya.events.Event.CLICK, this, this.onReceive);
        }

        /* 展示界面 */
        showFeatherLackingView(): void {
            this.popup();
            var feather: number = Number(Main.app.mwx.ofFeatherLessParam["number"]);
            this.featherTxt.text = "免费领取" + feather.toString() + "羽毛";
        }

        /* 领取羽毛按钮 */
        private onReceive(): void {
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.FeatherLacking, {"type":0});

            manager.SoundPlayMgr.instance.playButtonClick();
            // if (Main.app.mwx.ofFeatherLess == 1) {
            //     // 直接领取
            this.getFeather();
            // } else if (Main.app.mwx.ofFeatherLess == 2 || Main.app.mwx.ofFeatherLess == 4) {
            //     // 看视频领取
            //     if (Main.app.mwx.avShowType == false) return;
            // 	Main.app.mwx.avShowType = false;
            // 	let self = this;
            // 	Laya.timer.once(500, self, ()=>{
            // 		self.onVideo(Main.app.mwx.ofFeatherLess);
            // 	});
            // } else if (Main.app.mwx.ofFeatherLess == 3) {
            //     // 分享领取
            //     this.onShare();
            // } else {
            //     Main.app.showMessage("此功能暂未开放");
            // }
        }

        /* 领取金币操作 */
        public getFeather(): void {
            // 修改本地保存领取的次数
            var getFeatherCount: number = 0;
            var storageCount: number = Number(LocalStorage.getItem(Main.DianDianChongWu_GetFreeFeatherCount)) 
            // wx.getStorageSync(Main.DianDianChongWu_GetFreeFeatherCount);
            if (!!storageCount) getFeatherCount = storageCount;
            getFeatherCount += 1;
            LocalStorage.setItem(Main.DianDianChongWu_GetFreeFeatherCount, getFeatherCount+'')
            // wx.setStorageSync(Main.DianDianChongWu_GetFreeFeatherCount, getFeatherCount);
            // 加羽毛
            manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [new laya.maths.Point(375, 667), 3, Number(Main.app.mwx.ofFeatherLessParam["number"])]);
            this.closeFeatherLackingView();
            // 埋点统计
            // Main.app.mwx.dataLog(dtLogConfig.FeatherLacking, { "type": Main.app.mwx.ofFeatherLess });
        }

        /* 看视频 */
        private onVideo(type: number): void {
            let self = this;
            wxCore.uo.loadingVideo((ok: boolean) => {
                if (ok) {
                    wxCore.uo.showVideoAD((played: boolean) => {
                        if (played) {
                            self.getFeather();
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
        private onShare(): void {
            if (Main.app.shareIndex > 0) return;
            Main.app.shareIndex = 15;
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
            this.closeFeatherLackingView();
        }

        /* 关闭界面 */
        closeFeatherLackingView(): void {
            this.close("", false);
        }
    }
}