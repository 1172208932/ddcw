var AppUtil = /** @class */ (function () {
    function AppUtil() {
        this.mHttpCall = null;
        this.m_getChicken = 49; //zxx 领取哪个小鸡
        this.m_getChickenTime = 0; //zxx 上次领取小鸡的时间
        this.getLoginServer();
    }
    AppUtil.prototype.getLoginServer = function () {
        var params = [];
        params['openid'] = "001";
        //  BridgeUtil.callAppMethod("getOpenId");
        this.server(Main.app.urlConfig["app"], params, this.onLaunchAppSuccess);
    };
    AppUtil.prototype.onLaunchAppSuccess = function (ret) {
        if (ret["code"] == 0) {
            Main.app.mwx.nowday = String(ret["nowday"]);
            ret["user_data"].forEach(function (item) {
                if (item.key == 'GetChichen') {
                    if (!!item.values) {
                        Main.app.mwx.m_getChicken = Number(item.values);
                    }
                }
                if (item.key == 'GetChickenTime') {
                    if (!!item.values) {
                        Main.app.mwx.m_getChickenTime = Number(item.values);
                    }
                }
                if (item.key == "IsRestFlyBoxTime") {
                    if (!!item.values) {
                        Main.app.mwx.IsRestFlyBoxTime = Number(item.values);
                    }
                }
            });
        }
        console.log(ret, "登录成功");
    };
    /* 网络请求 */
    AppUtil.prototype.server = function (rpc, params, callback, ecbck) {
        if (ecbck === void 0) { ecbck = null; }
        this.mHttpCall = new Laya.HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, onHttpRequestError);
        var str = util.getServer() + rpc['url'] + util.getUrlParams(params, rpc['key']);
        console.log(str);
        this.mHttpCall.send(str, null, 'get', 'text');
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string") {
                ret = util.getJSON(e);
            }
            else {
                ret = util.getJSON(Main.app.mwx.mHttpCall.data);
            }
            if (callback != null)
                callback(ret);
            this.mHttpCall = null;
        }
        function onHttpRequestError(e) {
            if (ecbck != null) {
                ecbck();
            }
            this.mHttpCall = null;
        }
    };
    return AppUtil;
}());
//# sourceMappingURL=AppUtil.js.map