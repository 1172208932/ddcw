module module {
    export class LoginView2 extends ui.game.LoginView2UI {
        constructor() {
            super()
            this.initEvent()
        }
        private initEvent() {
            this.loginBtn.on(Laya.Event.CLICK, this, this.check)
        }
        private check() {
            let answer = LoginInfoUserData.some((item, index) => {
                if (this.account.text == item['account'] && this.passworld.text == item['passWorld']) {
                    Main.app.account = index
                    return true
                } else {
                    return false
                }
            })
            answer || console.log('登录失败')
            answer && this.login()
        }
        private login() {
            if (this.account.text.indexOf('height') != -1) {
                this.unlockAllGate()
            }
            Main.app.raceView.visible = true
            Main.app.loginView.visible = false
            Main.app.raceView.initData();
            RaceManager.instance.userInfo.wing = LoginInfoUserData[Main.app.account]['win']
            RaceManager.instance.userInfo.coin = LoginInfoUserData[Main.app.account]['coin']
            RaceManager.instance.userInfo.addLocalUserInfo()
            RaceManager.instance.event(RaceManager.CHANGE_WING);
            RaceManager.instance.event(RaceManager.CHANGE_COIN)
        }
        private unlockAllGate() {
            let arry = [1, 2, 3, 4, 5, 6, 7, 8]
            RaceManager.instance.userInfo.openGateIds.map(value => {
                let arrIndex = arry.indexOf(value)
                if (arrIndex != -1) {
                    arry.splice(arry.indexOf(value), 1)
                }
            })
            RaceManager.instance.userInfo.openGateIds = [1, 2, 3, 4, 5, 6, 7, 8]
            if (arry.length) {
                arry.map(vule => {
                    let plantInfo: PlantInfo = RaceManager.instance.getPlantInfoById(vule);
                    if (plantInfo != null) {
                        let chichenInfo: ChichenInfo = plantInfo.createChichenByEgg(RaceManager.instance.getChichenConfigId(plantInfo.plantId));
                        chichenInfo.xx = Laya.stage.width / 2;
                        chichenInfo.yy = plantInfo.rect.y + 50;
                        let haveChichenIds: Array<number> = RaceManager.instance.getHaveChichenIds(vule);
                        let chichenInfos: Array<ChichenInfo> = plantInfo.chichenInfoList;
                        if (haveChichenIds.indexOf(chichenInfo.configId) < 0) {
                            haveChichenIds.push(chichenInfo.configId);
                            chichenInfos.push(chichenInfo)
                        }
                    }
                })
            }
        }
    }
}