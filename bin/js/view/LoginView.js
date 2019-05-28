var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var module;
(function (module) {
    var LoginView2 = /** @class */ (function (_super) {
        __extends(LoginView2, _super);
        function LoginView2() {
            var _this = _super.call(this) || this;
            _this.initEvent();
            return _this;
        }
        LoginView2.prototype.initEvent = function () {
            this.loginBtn.on(Laya.Event.CLICK, this, this.check);
        };
        LoginView2.prototype.check = function () {
            var _this = this;
            var answer = module.LoginInfoUserData.some(function (item, index) {
                if (_this.account.text == item['account'] && _this.passworld.text == item['passWorld']) {
                    Main.app.account = index;
                    return true;
                }
                else {
                    return false;
                }
            });
            answer || console.log('登录失败');
            answer && this.login();
        };
        LoginView2.prototype.login = function () {
            if (this.account.text.indexOf('height') != -1) {
                this.unlockAllGate();
            }
            Main.app.raceView.visible = true;
            Main.app.loginView.visible = false;
            Main.app.raceView.initData();
            module.RaceManager.instance.userInfo.wing = module.LoginInfoUserData[Main.app.account]['win'];
            module.RaceManager.instance.userInfo.coin = module.LoginInfoUserData[Main.app.account]['coin'];
            module.RaceManager.instance.userInfo.addLocalUserInfo();
            module.RaceManager.instance.event(module.RaceManager.CHANGE_WING);
            module.RaceManager.instance.event(module.RaceManager.CHANGE_COIN);
        };
        LoginView2.prototype.unlockAllGate = function () {
            var arry = [1, 2, 3, 4, 5, 6, 7, 8];
            module.RaceManager.instance.userInfo.openGateIds.map(function (value) {
                var arrIndex = arry.indexOf(value);
                if (arrIndex != -1) {
                    arry.splice(arry.indexOf(value), 1);
                }
            });
            module.RaceManager.instance.userInfo.openGateIds = [1, 2, 3, 4, 5, 6, 7, 8];
            if (arry.length) {
                arry.map(function (vule) {
                    var plantInfo = module.RaceManager.instance.getPlantInfoById(vule);
                    if (plantInfo != null) {
                        var chichenInfo = plantInfo.createChichenByEgg(module.RaceManager.instance.getChichenConfigId(plantInfo.plantId));
                        chichenInfo.xx = Laya.stage.width / 2;
                        chichenInfo.yy = plantInfo.rect.y + 50;
                        var haveChichenIds = module.RaceManager.instance.getHaveChichenIds(vule);
                        var chichenInfos = plantInfo.chichenInfoList;
                        if (haveChichenIds.indexOf(chichenInfo.configId) < 0) {
                            haveChichenIds.push(chichenInfo.configId);
                            chichenInfos.push(chichenInfo);
                        }
                    }
                });
            }
        };
        return LoginView2;
    }(ui.game.LoginView2UI));
    module.LoginView2 = LoginView2;
})(module || (module = {}));
//# sourceMappingURL=LoginView.js.map