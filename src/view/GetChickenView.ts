module module {
    export class GetChickenView extends ui.game.GetChickenViewUI {
        constructor() {
            super();
            this.setEvents();
            this.setChickenSkin()
            Laya.Tween.clearAll(this.box_get);
            this.tween1(this.box_get);
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
        setChickenSkin(): void {
            var beforeDatTime = new Date(new Date().setHours(0, 0, 0)).getTime()
            var nextDayTime = new Date(new Date().setHours(23, 59, 59)).getTime()
            switch (Main.app.mwx.m_getChicken) {
                case 49:
                    break
                case 47:
                    this.chickenSkin.skin = 'pngs/0319/47-01.png'
                    if (Main.app.mwx.m_getChickenTime < nextDayTime && Main.app.mwx.m_getChickenTime > beforeDatTime) {
                        this.chickenSkin.skin = 'pngs/0319/47-01.png'
                        this.chickenText.skin = 'font/btn_3.png'
                        this.box_get.mouseEnabled = false
                    }

                    break
                case 77:
                    this.chickenSkin.skin = 'pngs/0319/77-01.png'
                    if (Main.app.mwx.m_getChickenTime < nextDayTime && Main.app.mwx.m_getChickenTime > beforeDatTime) {
                        this.chickenSkin.skin = 'pngs/0319/77-01.png'
                        this.chickenText.skin = 'font/btn_3.png'
                        this.box_get.mouseEnabled = false
                    }
                    break
                default:
                    this.box_get.visible = false
                    break
            }
        }
        /*领取宠物*/
        public getChicken(): void {
            var getTimes = new Date().getTime()
            switch (Main.app.mwx.m_getChicken) {
                case 49:
                    RaceManager.instance.getFirstChichenInfo(49)
                    Main.app.mwx.SetUserValue("GetChichen", 47);
                    Main.app.mwx.SetUserValue("GetChickenTime", getTimes);
                    this.chickenSkin.skin = 'pngs/0319/47-01.png'
                    this.chickenText.skin = 'font/btn_3.png'
                    this.box_get.mouseEnabled = false
                    break
                case 47:
                    RaceManager.instance.getFirstChichenInfo(47)
                    Main.app.mwx.SetUserValue("GetChichen", 77);
                    Main.app.mwx.SetUserValue("GetChickenTime", getTimes);
                    this.chickenSkin.skin = 'pngs/0319/77-01.png'
                    this.chickenText.skin = 'font/btn_3.png'
                    this.box_get.mouseEnabled = false
                    break
                case 77:
                    RaceManager.instance.getFirstChichenInfo(77)
                    Main.app.mwx.SetUserValue("GetChickenTime", getTimes);
                    Main.app.mwx.SetUserValue("GetChichen", 0);
                    this.box_get.visible = false
                    break
            }
        }
        /*点击判断*/
        public select(): void {
            this.getChicken();

            // if (Main.app.mwx.ofGetType == 1) {
            //     this.onShare()
            // } else {
            //     // 看视频使用
            //     if (Main.app.mwx.avShowType == false) {
            //         return;
            //     }
            //     Main.app.mwx.avShowType = false;
            //     let self = this;
            //     Laya.timer.once(500, self, () => {
            //         self.onVideo(Main.app.mwx.ofLoginReward);
            //     });
            // }
        }
        /* 分享 */
        private onShare(): void {
            if (Main.app.shareIndex > 0) {
                return;
            }
            Main.app.shareIndex = 17;
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
        private onVideo(type: number): void {
            let self = this;
            wxCore.uo.loadingVideo((ok: boolean) => {
                if (ok) {
                    wxCore.uo.showVideoAD((played: boolean) => {
                        if (played) {
                            self.getChicken();
                            self.toServer(2, 1)
                        } else {
                            self.toServer(2, 0)
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
        public toServer(type, isfinih) {
            let data = {}
            data['uid'] = Main.app.mwx.mUID
            data['from_type'] = type
            data['is_sucess'] = isfinih
            util.server('free_pet', null, data)
        }
        private setEvents(): void {
            this.box_get.on(laya.events.Event.CLICK, this, this.select)
            RaceManager.instance.on(RaceManager.GTE_CHICKEN, this, this.getChicken);
        }
    }
}