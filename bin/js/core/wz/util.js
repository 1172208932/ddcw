/**
 *  md5 加密使用ts源码的方法
 */
var md5_hex = /** @class */ (function () {
    function md5_hex() {
    }
    md5_hex.MD5 = function (str) {
        return new MD5().hex_md5(str);
    };
    return md5_hex;
}());
/**
* util 公用的js模板;
*/
var util = /** @class */ (function () {
    function util() {
    }
    /* 获取url的参数 */
    util.getUrlParams = function (params, ver) {
        if (ver === void 0) { ver = "1.0.1"; }
        var havetick = false;
        var keys = new Array();
        for (var key in params) {
            if (typeof (params[key]) != "string" && typeof (params[key]) != "number") {
                continue;
            }
            if (key == "tick") {
                havetick = true;
            }
            var aa = key.toLocaleLowerCase();
            params[aa] = params[key];
            keys.push(aa);
        }
        if (havetick == false) {
            var date = new Date();
            params['tick'] = Math.floor(date.getTime() / 1000);
            keys.push("tick");
        }
        keys.sort(function (a, b) {
            return a > b ? 1 : -1;
        });
        // 组合
        var str = "";
        for (var index = 0; index < keys.length; index++) {
            str = str + keys[index] + "=" + params[keys[index]] + "&";
        }
        var scr = "";
        if (util.mKeys[ver] != null) {
            scr = md5_hex.MD5(str + "key=" + util.mKeys[ver]);
        }
        else {
            scr = md5_hex.MD5(str + "key=vicky");
        }
        return str + "key=" + scr;
    };
    /* 获取游戏域名 */
    util.getServer = function () {
        return "https://testxcx.wanzhushipin.cn/app_dian_diancw/";
        // return "https://mascaiyou.wanzhushipin.cn/dian_diancw/";
        // return "https://testxcx.wanzhushipin.cn/dian_diancw/";
    };
    /* 获取游戏CDN地址 */
    util.getCDN = function () {
        return "https://tcdn.wanzhushipin.cn/xcx/games/dian_diancw/";
    };
    /* JSON字符串转对象 */
    util.getJSON = function (str) {
        if (str == "" || str == null) {
            return { "code": -999 };
        }
        var len = str.indexOf("{", 0);
        str = str.substr(len, str.length - len);
        return JSON.parse(str);
    };
    /* 统计数据 */
    util.server = function (keyName, callback, data) {
        if (data === void 0) { data = null; }
        // if (oGameId != '') {
        //     GameMain.app.otherGameId = oGameId
        //     GameMain.app.wClick = keyName
        // }
        if (data == null) {
            data = {};
        }
        util.mHttpCall = new Laya.HttpRequest();
        util.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        util.mHttpCall.once(Laya.Event.ERROR, this, util.onHttpRequestError);
        var paramsData = {};
        data['is_new'] = Main.app.mwx.PointFirst;
        data['device_os_version'] = wxCore.uo.mPhone['system'];
        data['wechat_version'] = wxCore.uo.mPhone['version'];
        data['device_type'] = wxCore.uo.mPhone['model'];
        paramsData["clos"] = JSON.stringify(data);
        // if (where != '') {
        //     paramsData["clos"] = '点击游戏:' + oGameId + '，点击来源：' + where + '，is_new：' + GameMain.app.mWX.PointFirst
        // } else {
        //     paramsData["clos"] = oGameId + '，is_new：' + GameMain.app.mWX.PointFirst
        // }
        paramsData["keyname"] = keyName;
        paramsData["mobile"] = Laya.Browser.onIOS ? 2 : 1;
        paramsData['platform'] = 5;
        paramsData["uid"] = Main.app.mwx.mUID;
        paramsData["now_time"] = Main.app.getCurrTime();
        var str = Main.app.mwx.statUrl + "&" + util.getUrlParams(paramsData);
        // util.getServer() 
        util.mHttpCall.send(str, null, "get", "text");
        console.log("网络请求地址：", str);
        // 请求结果
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string") {
                ret = util.getJSON(e);
            }
            else {
                ret = util.getJSON(util.mHttpCall.data);
            }
            if (callback != null) {
                callback.runWith(ret);
            }
            util.mHttpCall = null;
        }
    };
    /* 请求错误的回调 */
    util.onHttpRequestError = function (e) {
        if (Main.app.is_wx)
            wx.hideLoading({});
        util.mHttpCall = null;
    };
    util.mKeys = {
        "1.0.1": "jODwYCj_sdoi_fd0d3e27ef",
    };
    util.mHttpCall = null;
    return util;
}());
//# sourceMappingURL=util.js.map