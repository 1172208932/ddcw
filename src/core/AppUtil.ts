class AppUtil {
    public mHttpCall: HttpRequest = null;
    public m_getChicken: number = 49//zxx 领取哪个小鸡
    public m_getChickenTime: number = 0 //zxx 上次领取小鸡的时间
    constructor() {
        this.getLoginServer()

    }
    public getLoginServer() {
        var params: Object = [];
        params['openid'] = "001"
        //  BridgeUtil.callAppMethod("getOpenId");
        this.server(Main.app.urlConfig[`app`], params, this.onLaunchAppSuccess);
    }
    public onLaunchAppSuccess(ret) {
        if (ret["code"] == 0) {
            Main.app.mwx.nowday = String(ret["nowday"]);

            ret["user_data"].forEach(item => {
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
        console.log(ret, "登录成功")
    }
    /* 网络请求 */
    public server(rpc: Object, params: any, callback: Function, ecbck: Function = null): void {
        this.mHttpCall = new Laya.HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, onHttpRequestError);

        let str = util.getServer() + rpc['url'] + util.getUrlParams(params, rpc['key']);
        console.log(str)
        this.mHttpCall.send(str, null, 'get', 'text');

        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string") {
                ret = util.getJSON(e);
            } else {
                ret = util.getJSON(Main.app.mwx.mHttpCall.data);
            }
            if (callback != null) callback(ret);
            this.mHttpCall = null;
        }
        function onHttpRequestError(e: any): void {
            if (ecbck != null) {
                ecbck();
            }
            this.mHttpCall = null;
        }
    }
}