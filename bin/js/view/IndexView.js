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
/**
* name
*/
var module;
(function (module) {
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView() {
            var _this = _super.call(this) || this;
            _this.openId = "";
            _this.on(laya.events.Event.ADDED, _this, _this.onAddeds);
            console.log("indexview ");
            return _this;
        }
        IndexView.prototype.onAddeds = function () {
            manager.EventManager.instance.on(manager.EventManager.LOGIN_FAIL, this, this.onLoginFail);
            manager.EventManager.instance.on(manager.EventManager.LOGIN_SUCCESS, this, this.onLoginSuccess);
            this.openId = module.RaceManager.instance.userInfo.getLocalOpenId();
            if (this.openId == null || this.openId == "") {
                this.openId = "openId" + new Date().getTime();
            }
            this.StartOnline();
        };
        IndexView.prototype.StartOnline = function () {
            this.loginWX();
        };
        IndexView.prototype.loginWX = function () {
            try {
                wx.login({
                    success: function (res) {
                        if (res.code) {
                            console.log('wx.login : ' + res.code);
                            manager.ResVersionMgr.instance.login(res.code);
                        }
                        else {
                            console.log('登录失败！' + res.errMsg);
                            this.onLoginFail();
                        }
                    }
                });
            }
            catch (e) {
                console.log('wx.login ----------------- error!');
                this.onLoginFail();
            }
        };
        IndexView.prototype.onLoginSuccess = function (data) {
            //登录成功
            module.RaceManager.instance.decalUserData(data);
            manager.EventManager.instance.event(module.GameView.GOTO_RACE_VIEW);
        };
        IndexView.prototype.onLoginFail = function () {
            this.testData();
        };
        IndexView.prototype.loing = function (openId) {
            manager.ResVersionMgr.instance.login(openId);
        };
        IndexView.prototype.testData = function () {
            Laya.timer.once(2000, this, this.onOnce);
        };
        IndexView.prototype.onOnce = function () {
            module.RaceManager.instance.getLocalStorage();
            manager.EventManager.instance.event(module.GameView.GOTO_RACE_VIEW);
        };
        return IndexView;
    }(ui.game.IndexViewUI));
    module.IndexView = IndexView;
})(module || (module = {}));
//# sourceMappingURL=IndexView.js.map